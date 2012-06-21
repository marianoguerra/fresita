function(doc) { if (doc.type !== 'category') { return null; } var ret=new Document(); ret.add(doc); return ret; }
