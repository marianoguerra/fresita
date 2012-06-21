function(doc) {
    if (doc.type === "category") {
        emit(doc._id, doc);
    }
};
