function(doc) {
    if (doc.type === "style") {
        doc.template = undefined;
        emit(doc._id, doc);
    }
};
