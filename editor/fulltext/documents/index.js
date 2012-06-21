function(doc) {
    if (doc.type !== 'document') {
        return null;
    }

    var ret = new Document();
    ret.add(doc.title);
    ret.add(doc.description);
    ret.add(doc.tags);
    return ret;
}
