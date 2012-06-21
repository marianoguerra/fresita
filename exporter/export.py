import os
import sys
import json
import urllib2
import optparse
import threading
import subprocess

os.chdir(os.path.dirname(os.path.abspath(__file__)))

from BeautifulSoup import BeautifulSoup

class Downloader(threading.Thread):
    '''a runnable that downloads something'''

    def __init__(self, url, docid, name):
        threading.Thread.__init__(self)
        self.url = url
        self.docid = docid
        self.name = name
        self.resource = url + docid + "/" + name

    def run(self):
        print "downloading", self.resource
        content = urllib2.urlopen(self.resource).read()

        handle = file(os.path.join(self.docid, self.name), 'w')
        handle.write(content)
        handle.close()
        print self.resource, "downloaded"

class Downloads(object):
    '''a class to start threads that download stuff
    '''

    def __init__(self, url):
        self.url = url
        self.threads = []

    def download(self, directory, name):
        '''start a new thread that downloads a file "name" ans stores
        it on "directory"'''
        if not os.path.isdir(directory):
            os.mkdir(directory)

        thread = Downloader(self.url, directory, name)
        self.threads.append(thread)
        thread.start()

    def wait_all(self):
        '''wait for all the threads to finish
        '''
        for thread in self.threads:
            thread.join()

downloads = None
def get_downloads(url):
    global downloads
    if downloads is None:
        downloads = Downloads(url)

    return downloads

def export_from_ids(infile_id, style_id, name, format, url):
    '''export a document'''

    outfile = name + '.' + format
    infile = name + '.xml'
    style = name + '.xsl'

    doc_content = expand_doc(infile_id, url)
    style_content = expand_style(style_id, url)

    if style_content is None:
        (False, "Error exportando archivo, estilo no encontrado")

    file(style, 'w').write(style_content)
    file(infile, 'w').write(doc_content)

    get_downloads(url).wait_all()

    return export_from_files(infile, style, outfile, format)

def export_from_files(infile, style, outfile, format):
    '''export documentos from a file'''

    params = ["java", "-jar", "fop.jar"]

    params.append('-xml')
    clean_html_file(infile)
    params.append(infile)

    params.append('-xsl')
    params.append(style)

    params.append('-' + format)
    params.append(outfile)

    status = subprocess.call(params)

    if status != 0:
        return (False, "Error exportando archivo")

    return (True, outfile)

def clean_html_file(path):
    '''clean an html file'''
    handle = file(path)
    content = handle.read()
    handle.close()

    soup = BeautifulSoup(content,
            selfClosingTags=['area', 'base', 'basefont', 'br', 'hr', 'input', 'link', 'img', 'meta'])

    for img in soup.findAll("img"):
        src = img['src'].split("/")
        directory = src[-2]
        name = src[-1]
        img['src'] = directory + "/" + name

    handle = file(path, 'w')
    handle.write(clean_html_entities(str(soup)))
    handle.close()

def clean_html_entities(content):
    '''clean html entities'''
    return content.replace('&nbsp;', ' ')

def expand_doc(id_, url):
    '''find all the childs of this document and add them
    return a string with the final html
    '''
    try:
        doc = get_document(id_, url)
        soup = BeautifulSoup('<div class="section" id="%s">%s</div>' %
                (doc['_id'], doc['body']), selfClosingTags=['area', 'base', 'basefont', 'br', 'hr', 'input', 'link', 'img', 'meta'])
    except urllib2.HTTPError:
        return '<div class="section" id="%s">%s</div>' % (id_, "Error cargando documento")

    downloads = get_downloads(url)

    for img in soup.findAll("img"):
        src = img['src'].split("/")
        directory = src[-2]
        name = src[-1]
        img['src'] = directory + "/" + name

        downloads.download(directory, name)

    for child in soup.findAll("div", {"class" : "section"}):
        if child["id"] == id_:
            continue

        child.replaceWith(expand_doc(child['id'], url))

    return str(soup)

def expand_style(id_, url):
    '''get a style and replace all the variables in it
    return the resulting string

    return None if the style wasn't found
    '''
    try:
        doc = get_document(id_, url)
    except urllib2.HTTPError:
        return None

    if "template" not in doc or "vars" not in doc:
        return None
    else:
        template = doc["template"].encode('utf-8')

    for name, value in doc["vars"].iteritems():
        var = '${%s}' % (name.encode('utf-8'),)
        template = template.replace(var, str(value))

    return template

def get_document(id_, url):
    '''get a child content and return it'''
    return json.loads(urllib2.urlopen(url + id_).read())

def get_options():
    '''return the command line options'''
    parser = optparse.OptionParser()
    parser.add_option("-i", "--input", dest="input",
                      help="read from FILE", metavar="FILE")
    parser.add_option("-o", "--output", dest="output",
                      help="write to FILE", metavar="FILE")
    parser.add_option("-f", "--format", dest="format",
                      help="export to FORMAT")
    parser.add_option("-s", "--style", dest="style",
                      help="export using style STYLE", metavar="STYLE")
    parser.add_option("-u", "--url", dest="url",
                      help="get the documentos from the given URL (only for --type=id)",
                      metavar="URL")
    parser.add_option("-t", "--type", dest="type",
        help="'id' or 'file' depending on the source of the data (if id is used you must use the --url option)")

    return parser.parse_args()

def main(options):
    '''main method'''
    if options.type is None:
        print '--type option required'
        return

    if options.style is None:
        print '--style option required'
        return


    if options.type == "style":
        if options.url is None:
            print '--url option required for --type=style'
            return

        print expand_style(options.style, options.url)
        return

    if options.input is None:
        print '--input option required'
        return

    if options.output is None:
        print '--output option required'
        return

    if options.format is None:
        print '--format option required'
        return

    if options.type == 'id':
        if options.url is None:
            print '--url option required for --type=id'
            return

        status, message = export_from_ids(options.input, options.style, options.output, options.format, options.url)
    elif options.type == 'file':
        status, message = export_from_files(options.input, options.style, options.output, options.format)

    if status:
        print 'file saved to', message
    else:
        print message

if __name__ == '__main__':
    options, args = get_options()
    main(options)
