function (newDoc, oldDoc, userCtx) {
  var i, item, fields, field, filter;
  // !code lib/validate.js

  if (userCtx.name === null) {
      forbidden("Usuario no autenticado");
  }

  if (!newDoc._deleted && oldDoc) {
      unchanged("type", oldDoc.type + " " + newDoc.type);
      unchanged("created");
  }

  if (newDoc.type == 'document') {
    require("title", "body", "description", "authors", "tags", "confs", "deps", "created", "vote_count", "vote_total", "styles");

    assert(newDoc.title.length > 5, "titulo muy corto");
    assert(newDoc.authors.length > 0, "al menos un autor requerido");
    assert(newDoc.tags.length > 0, "al menos un tag requerido");

    if (!oldDoc) {
        assert(newDoc.vote_count === 0, "los votos deben ser cero para nuevos documentos");
        assert(newDoc.vote_total === 0, "los votos deben ser cero para nuevos documentos");
    }
    else {
        count_difference = newDoc.vote_count - oldDoc.vote_count;
        vote_difference = newDoc.vote_total - oldDoc.vote_total;

        if (count_difference === 0) {
            assert(vote_difference === 0, "voto invalido (no se incremento la cuenta de votos)");
        }
        else if (count_difference === 1) {
            assert(vote_difference < 6 && vote_difference >= 0, "valor de voto invalido");
        }
        else {
            forbidden("intentando votar mas de una vez");
            }
        }
    }
    else if (newDoc.type == 'author') {
        require("firstname", "lastname", "website", "created");
        assert(newDoc.firstname.length > 2, "nombre muy corto");
        assert(newDoc.lastname.length > 2, "apellido muy corto");
    }
    else if (newDoc.type == 'category') {
        require("name", "allowsEmptySelection", "allowsMultipleSelection", "items");
        assert(typeof(newDoc.name) === 'string', "valor invalido para nombre");
        assert(newDoc.name.length > 2, "nombre muy corto");
        assert(newDoc.items.length > 1, "menos de dos opciones");
        assert(typeof(newDoc.allowsEmptySelection) === 'boolean', "valor invalido para permitir seleccion vacia");
        assert(typeof(newDoc.allowsMultipleSelection) === 'boolean', "valor invalido para permitir seleccion multiple");

        for(i in newDoc.items) {
            item = newDoc.items[i];
            assert(typeof(item) === 'object', "item de categoria invalido");
            assert(typeof(item.name) === 'string', "nombre de item de categoria invalido");
            assert(typeof(item.description) === 'string', "descripcion de item de categoria invalido");
            assert(item.name.length > 2, "nombre muy corto");
            assert(item.description.length > 2, "descripcion muy corta");
        }
    }
    else if (newDoc.type == 'style') {
        require("name", "description", "template", "vars", "author");
        unchanged("author");

        // TODO: controlar que el autor es el que esta editando

        assert(newDoc.name.length > 2, "nombre muy corto");
        assert(newDoc.author.length > 2, "autor muy corto");
        assert(newDoc.description.length > 5, "descripcion muy corta");
        assert(newDoc.template.length > 5, "plantilla invalida");

        /*fields = newDoc.template.match(/\$\{(?:[a-z][a-z0-9-]*)\}/g);

        for (i = 0; i < fields.length; i += 1) {
            field = fields[i];
            field = field.substring(2, field.length - 1);

            if (!newDoc.vars[field]) {
                forbidden("campo '" + field + "' no contiene un valor");
            }
        }*/
    }
    else if (newDoc.type == 'repo') {
        filter = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        require("name", "address");
        assert(newDoc.name.length > 1, "nombre invalido");
        //assert(filter.test(newDoc.address), "direccion invalida");
    }
    else if (newDoc.type == 'commit') {
        if (newDoc._deleted === true) {
            forbidden("no se puede borrar un commit");
        }

        if (oldDoc) {
            forbidden("no se puede modificar un commit");
        }

        require("docid", "author", "description", "document");
        assert(newDoc.document.title.length > 5, "titulo muy corto");
    }
    else if (newDoc._deleted !== true) {
        log(newDoc);
        forbidden("insertando tipo invalido" + toJSON(userCtx) + toJSON(newDoc));
    }
}
