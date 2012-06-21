var model = {};

model.document = function (title, body, description, authors, tags, vote_count, vote_total, deps, confs, cats, created, styles, _id, _rev) {
    return {
        "title": title,
        "body": body,
        "description": description,
        "authors": authors,
        "tags": tags,
        "type": "document",
        "vote_count": vote_count,
        "vote_total": vote_total,
        "deps": deps,
        "confs": confs,
        "cats": cats,
        "created": created,
        "styles": styles,
        "_id": _id,
        "_rev": _rev
    };
};

model.author = function (mail, firstname, lastname, website, created, _rev) {
    return {
        "_id": mail,
        "firstname": firstname,
        "lastname": lastname,
        "website": website,
        "created": created,
        "type": "author",
        "_rev": _rev
   };
};

model.commit = function (docid, author, description, created, document) {
    return {
        "docid": docid,
        "author": author,
        "description": description,
        "document": document,
        "created": created,
        "type": "commit"
    };
};

model.repo = function (name, address, id, rev) {
    return {
        "_id": id,
        "name": name,
        "address": address,
        "type": "repo",
        "_rev": rev
    };
};

model.style = function (name, description, author, template, vars, id, rev) {
    return {
        "_id": id,
        "name": name,
        "description": description,
        "author": author,
        "template": template,
        "vars": vars,
        "type": "style",
        "_rev": rev
    };
};

model.category = function (name, allowsEmptySelection, allowsMultipleSelection, items, id, rev) {
    return {
        "_id": id,
        "name": name,
        "allowsEmptySelection": allowsEmptySelection || false,
        "allowsMultipleSelection": allowsMultipleSelection || false,
        "items": items || [],
        "type": "category",
        "_rev": rev
    };
};

model.categoryItem = function (name, description, include) {
    return {
        "name": name,
        "description": description,
    };
};
