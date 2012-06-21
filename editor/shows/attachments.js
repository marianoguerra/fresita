function(doc, req) {
  var items = [], key;


  if (doc._attachments) {
      for (key in doc._attachments) {
          items.push(doc._id + "/" + key);
      }
  }

  return {
    body : toJSON(items),
    headers : {
      "Content-Type" : "application/json",
    }
  };
}
