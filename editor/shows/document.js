function(doc, req) {
  if (doc.body) {
      doc.body = undefined;
  }

  if (doc.template) {
      doc.template = undefined;
  }

  return {
    body : toJSON(doc),
    headers : {
      "Content-Type" : "application/json",
    }
  };
}
