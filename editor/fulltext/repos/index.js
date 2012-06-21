function(doc) { if (doc.type !== 'repo') { return null; } var ret=new Document(); ret.add(doc); return ret; }
