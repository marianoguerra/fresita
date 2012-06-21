function(doc, req) {
  var value = {};

  if (req.query.name) {
      doc.created = undefined;
      doc._revisions = undefined;
      doc.vars = undefined;
      doc.template = undefined;
      value[req.query.name] = doc;
  }
  else {
      value = {};
  }

  return {
    body : toJSON(value),
    headers : {
      "Content-Type" : "application/json",
      "X-Saludo": "dallamore, hacelo en java"
    }
  };
}
