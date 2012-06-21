function (doc) {
    if (doc.type === "document") {
        doc.authors.forEach(function (author) {
                emit(author, 1);
        });
    }
};
