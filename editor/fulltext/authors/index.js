function(doc) { if (doc.type !== 'author') { return null; } var ret=new Document(); ret.add(doc); return ret; }
