function(doc) {
    if (doc.type === "repo") {
        emit(doc._id, doc);
    }
};
