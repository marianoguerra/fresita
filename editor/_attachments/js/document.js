var doc = {};

doc.unsaved = {};

doc.MAX_SAVE_ATTEMPS = 5;

doc.search = function (query, ok_cb, error_cb) {
    req.view("_fti/fresita/documents?q=" + query, ok_cb, error_cb);
};

// newId usado para hacer branchs (salvar el documento base con otro id)
doc.save = function (base, saveChilds, newId) {
    if (saveChilds) {
        $('.section', base).each(function(index, child) {
            child = $(child);

            if (child.parents('.section').eq(0).attr('id') === base.attr('id')) {
                doc.save(child, true);
            }
        });
    }

    doc.save_document(base, 0, newId);
    base.html('');
};

doc.save_document = function (base, attemp, newId) {
    var id = base.attr('id'), content = base.html();
    attemp = attemp || 0;

    if (attemp > doc.MAX_SAVE_ATTEMPS) {
        ui.error("el documento '" + doc.get_title(content) + "'no se pudo guardar");
        return;
    }

    req.view(id, doc.on_get_latest_revision_ok(content, newId),
            doc.on_get_latest_revision_error(id, content, base, attemp, newId));
};

doc.on_get_latest_revision_ok = function (content, newId) {
    return function (docobj) {
        docobj.body = content;
        docobj.title = doc.get_title(content);

        if (newId) {
            docobj._id = newId;
            docobj._rev = undefined;
            docobj._attachments = undefined;
            req.create(docobj);
        }
        else {
            req.update(docobj);
        }

        ui.message("Documento guardado");
    }
};

doc.on_get_latest_revision_error = function (id, content, base, attemp, newId) {
    return function (response) {
        if (response.status === 404) {
            var docobj = doc.unsaved[id];
            docobj.body = content;
            docobj.title = doc.get_title(content);
            req.create(docobj, doc.on_document_create_ok, doc.on_document_create_error(base, attemp + 1, newId));
        }
        else if (response.status === 409) {
            ui.error("conflicto guardando documento '" + doc.get_title(content) + "', cambios realizados desde que fue cargado");
        }
        else {
            doc.save_document(base, attemp + 1, newId);
        }
    };
};

doc.on_document_create_ok = function () {
};

doc.on_document_create_error = function (base, attemp, newId) {
    return function (response) {
        doc.save_document(base, attemp, newId);
    };
};

doc.get_title = function (content) {
    var result = $(h.div(content).str()).find('h1').eq(0);

    if (result.length === 0) {
        return "Sin titulo";
    }

    return result.html();
};

doc.rate = function (id, rating, ok_cb, error_cb) {
    req.get(id, function (docobj) {
            docobj.vote_count += 1;
            docobj.vote_total += rating;

            req.update(docobj, ok_cb, error_cb);
        }, error_cb);
};

