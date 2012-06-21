function(doc) {
  if(doc._conflicts) {
    emit(doc._conflicts, {"type": doc.type, "name": doc.title || doc.name || doc._id});
  }
}
