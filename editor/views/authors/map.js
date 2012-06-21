function(doc) {
    if (doc.type === "author") {
        emit(doc._id, doc);
    }
};
