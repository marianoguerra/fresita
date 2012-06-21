function (doc) {
    if (doc.type === "document") {
        emit([doc.vote_total / doc.vote_count, doc._id], doc);
    }
};
