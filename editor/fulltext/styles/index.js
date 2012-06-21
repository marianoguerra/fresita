function(doc) {
    if (doc.type !== 'style') {
        return null;
    }

    var ret=new Document();
    ret.add(doc.name);
    ret.add(doc.description);
    return ret;
}
