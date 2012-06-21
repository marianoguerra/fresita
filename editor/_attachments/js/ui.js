var ui = {};

String.prototype.trim = function () {
    return $.trim(this);
};

ui.editor = null;
ui.isOverride = false;

ui.uniqueId = function () {
    return "dont-start-like-this-" + (new Date()).getTime();
};

ui.queryEditor = function (query) {
    return ui.editor._box.find('iframe').contents().find(query);
};

ui.getQueryEditor = function () {
    return ui.editor._box.find('iframe').contents();
};

ui.tagsFromString = function (str) {
    var values, index, tags;
    values = str.split(/\s*,\s*/);
    tags = [];

    for (index = 0; index < values.length; index += 1) {
        tags.push($.trim(values[index]));
    }

    return tags;
};

ui.init = function () {
    $('#login').dialog({'modal': true, 'width': 400, 'autoOpen': true, 'title': 'Ingresar', 'position': ['center', 'center']});
    $('#login-form').ajaxForm();

    $('#new-document').dialog({'modal': true, 'width': 600, 'autoOpen': false, 'title': 'Documento', 'position': ['center', 50]});
    $('#open-document').dialog({'modal': true, 'width': 600, 'autoOpen': false, 'title': 'Buscar Documento', 'position': ['center', 50]});
    $('#rate-document').dialog({'modal': true, 'width': 400, 'autoOpen': false, 'title': 'Calificar Documento', 'position': ['center', 50]});
    $('#about-dialog').dialog({'modal': true, 'width': 400, 'autoOpen': false, 'title': 'Acerca De', 'position': ['center', 50]});
    $('#docs-dialog').dialog({'modal': true, 'width': 600, 'autoOpen': false, 'title': 'Ayuda', 'position': ['center', 50]});
    $('#confirm-dialog').dialog({'modal': true, 'width': 600, 'autoOpen': false, 'title': 'Confirmar', 'position': ['center', 50]});
    $('#sync-repo').dialog({'modal': true, 'width': 600, 'height': 300, 'autoOpen': false, 'title': 'Sincronizar documentos', 'position': ['center', 50]});
    $('#doc-export').dialog({'modal': true, 'width': 500, 'autoOpen': false, 'title': 'Previsualizar', 'position': ['center', 50]});
    $('#conflicts').dialog({'modal': true, 'width': 900, 'height': 600, 'autoOpen': false, 'title': 'Resolver conflicto', 'position': ['center', 50]});
    $('#insert-image').dialog({'modal': true, 'width': 600, 'autoOpen': false, 'title': 'Insertar imagen', 'position': ['center', 'center']});
    $('#open-path').dialog({'modal': true, 'width': 600, 'autoOpen': false, 'title': '', 'position': ['center', 50]});
    $('#new-paragraph').dialog({'modal': true, 'width': 400, 'autoOpen': false, 'title': 'Insertar parrafo', 'position': ['center', 50]});

    $("#document-rating").slider({
     range: "min",
     value: 3,
     min: 1,
     max: 5,
     slide: function(event, ui) {
      $("#document-rate").val(ui.value);
     }
    });

    $('.send-on-enter').each(function (index, item) {
        item = $(item);
        item.keypress(ui.clickOnEnter('do-' + item.attr('id')));
    });

    $('.tabs').tabs();

    $("#document-rate").val($("#document-rating").slider("value"));
    req.get_uuids();
    ui.initEditor("wymeditor", true, '90%', '90%', "editor");
    ui.initEditor('editor-current', false, '90%', '75%', "current");
    ui.initEditor('editor-other', false, '90%', '75%', "other");

    $('#upload-form').ajaxForm();
};

ui.initEditor = function(id, isMain, height, editorHeight, name) {
    jQuery('#' + id).wymeditor({
        html: '',
        //stylesheet: 'styles.css',
        lang: 'es',

        classesItems: [
          {'name': 'warning', 'title': 'Advertencia', 'expr': 'p'},
          {'name': 'important', 'title': 'Importante', 'expr': 'p'},
          {'name': 'advice', 'title': 'Consejo', 'expr': 'p'},
          {'name': 'comment', 'title': 'Comentario', 'expr': 'p'},
        ],

        editorStyles: [
          {'name': '.section', 'css': 'border: 2px solid #D4DBE4; padding: 0.1em; margin: 0.1em;'},
          {'name': '.important', 'css': 'border: 2px solid #c55; padding: 1em; background: #faa url("../../../../img/editor/dialog-error.png") no-repeat top right;'},
          {'name': '.warning', 'css': 'border: 2px solid #cc5; padding: 1em; background: #ffa url("../../../../img/editor/dialog-warning.png") no-repeat top right;'},
          {'name': '.advice', 'css': 'border: 2px solid #369; padding: 1em; background: #9cf url("../../../../img/editor/dialog-information.png") no-repeat top right;'},
          {'name': '.comment', 'css': 'border: 2px dotted #aaa; padding: 1em; background: #fff url("../../../../img/editor/task-due.png") no-repeat top right;'},
          {'name': 'body', 'css': 'font-family: arial; color: #333;'},
        ],

        toolsItems: [
         {'name': 'Bold', 'title': 'Strong', 'css': 'wym_tools_strong'},
         {'name': 'Italic', 'title': 'Emphasis', 'css': 'wym_tools_emphasis'},
         {'name': 'CreateLink', 'title': 'Link', 'css': 'wym_tools_link'},
         {'name': 'Unlink', 'title': 'Unlink', 'css': 'wym_tools_unlink'},
         {'name': 'InsertOrderedList', 'title': 'Ordered_List', 'css': 'wym_tools_ordered_list'},
         {'name': 'InsertUnorderedList', 'title': 'Unordered_List', 'css': 'wym_tools_unordered_list'},
         {'name': 'Indent', 'title': 'Indent', 'css': 'wym_tools_indent'},
         {'name': 'Outdent', 'title': 'Outdent', 'css': 'wym_tools_outdent'},
         {'name': 'InsertTable', 'title': 'Table', 'css': 'wym_tools_table'},
         {'name': 'Undo', 'title': 'Undo', 'css': 'wym_tools_undo'},
         {'name': 'Redo', 'title': 'Redo', 'css': 'wym_tools_redo'},
         {'name': 'ToggleHtml', 'title': 'HTML', 'css': 'wym_tools_html'}
        ],

        postInit: function (wym) {
            if(isMain) {
                var html = h.li({'class': 'wym_tools_newbutton'},
                  h.a({'name': 'NewButton', 'href': '#', 'title': "Nuevo documento",
                    'style': 'background-image: url(img/editor/document-new.png);'},
                    "Nuevo documento")).str(),
                selection = jQuery(wym._box).find(wym._options.toolsSelector + wym._options.toolsListSelector);

                selection.append(html);

                html = h.li({'class': 'wym_tools_editbutton'},
                  h.a({'name': 'NewButton', 'href': '#', 'title': "Actualizar documento",
                    'style': 'background-image: url(img/editor/edit-doc.png);'},
                    "Actualizar documento")).str(),

                selection.append(html);

                html = h.li({'class': 'wym_tools_addnewbutton'},
                  h.a({'name': 'NewButton', 'href': '#', 'title': "A&ntilde;adir nuevo documento",
                    'style': 'background-image: url(img/editor/add-new.png);'},
                    "A&ntilde;adir nuevo documento")).str(),

                selection.append(html);

                html = h.li({'class': 'wym_tools_addexistingbutton'},
                  h.a({'name': 'NewButton', 'href': '#', 'title': "A&ntilde;adir documento existente",
                    'style': 'background-image: url(img/editor/add-existing.png);'},
                    "A&ntilde;adir documento existente")).str(),

                selection.append(html);

                html = h.li({'class': 'wym_tools_removeexistingbutton'},
                  h.a({'name': 'NewButton', 'href': '#', 'title': "Eliminar documento existente",
                    'style': 'background-image: url(img/editor/doc-remove.png);'},
                    "Eliminar documento existente")).str(),

                selection.append(html);

                html = h.li({'class': 'wym_tools_openbutton'},
                  h.a({'name': 'NewButton', 'href': '#', 'title': "Buscar documento",
                    'style': 'background-image: url(img/editor/document-open.png);'},
                     "Buscar documento")).str();

                selection.append(html);

                html = h.li({'class': 'wym_tools_savebutton'},
                  h.a({'name': 'NewButton', 'href': '#', 'title': "Guardar",
                    'style': 'background-image: url(img/editor/document-save.png);'},
                     "Guardar")).str();

                selection.append(html);

                html = h.li({'class': 'wym_tools_exportbutton'},
                  h.a({'name': 'NewButton', 'href': '#', 'title': "previsualizar",
                    'style': 'background-image: url(img/editor/document-print.png);'},
                     "Previsualizar")).str();

                selection.append(html);

                html = h.li({'class': 'wym_tools_votebutton'},
                  h.a({'name': 'NewButton', 'href': '#', 'title': "Calificar documento",
                    'style': 'background-image: url(img/editor/vote.png);'},
                     "Calificar documento")).str();

                selection.append(html);

                html = h.li({'class': 'wym_tools_syncbutton'},
                  h.a({'name': 'NewButton', 'href': '#', 'title': "Sincronizar documentos",
                    'style': 'background-image: url(img/editor/sync.png);'},
                     "Sincronizar documentos")).str();

                selection.append(html);

                html = h.li({'class': 'wym_tools_branchbutton'},
                  h.a({'name': 'NewButton', 'href': '#', 'title': "Crear ramificaci&oacute;n",
                    'style': 'background-image: url(img/editor/branch.png);'},
                     "Crear ramificaci&oacute;n")).str();

                selection.append(html);

                html = h.li({'class': 'wym_tools_imagebutton'},
                  h.a({'name': 'NewButton', 'href': '#', 'title': "Insertar imagen",
                    'style': 'background-image: url(img/editor/image.png);'},
                     "Insert image")).str();

                selection.append(html);

                html = h.li({'class': 'wym_tools_pbutton'},
                  h.a({'name': 'NewParagraph', 'href': '#', 'title': "Nuevo parrafo",
                    'style': 'background-image: url(img/editor/tab-new.png);'},
                     "Nuevo Parrafo")).str();

                selection.append(html);

                html = h.li({'class': 'wym_tools_logoutbutton'},
                  h.a({'name': 'NewButton', 'href': '#', 'title': "Cerrar sesi&oacute;n",
                    'style': 'background-image: url(img/editor/logout.png);'},
                     "Cerrar sesi&oacute;n")).str();

                selection.append(html);

                jQuery(wym._box)
                .find('li.wym_tools_newbutton a').click(function() {
                    ui.onNewClick(true);
                    return(false);
                });

                jQuery(wym._box)
                .find('li.wym_tools_editbutton a').click(function() {
                    ui.onEditClick();
                    return(false);
                });

                jQuery(wym._box)
                .find('li.wym_tools_addnewbutton a').click(function() {
                    ui.onNewClick(false);
                    return(false);
                });

                jQuery(wym._box)
                .find('li.wym_tools_addexistingbutton a').click(function() {
                    ui.onOpenClick(false);
                    return(false);
                });

                jQuery(wym._box)
                .find('li.wym_tools_removeexistingbutton a').click(function() {
                    ui.onRemoveClick();
                    return(false);
                });

                jQuery(wym._box)
                .find('li.wym_tools_openbutton a').click(function() {
                   ui.onOpenClick(true);
                    return(false);
                });

                jQuery(wym._box)
                .find('li.wym_tools_savebutton a').click(function() {
                    ui.onSaveClick();
                    return(false);
                });

                jQuery(wym._box)
                .find('li.wym_tools_exportbutton a').click(function() {
                    ui.onExportClick();
                    return(false);
                });

                jQuery(wym._box)
                .find('li.wym_tools_votebutton a').click(function() {
                   ui.onRateClick();
                    return(false);
                });

                jQuery(wym._box)
                .find('li.wym_tools_syncbutton a').click(function() {
                    ui.onSyncClick();
                    return(false);
                });

                jQuery(wym._box)
                .find('li.wym_tools_branchbutton a').click(function() {
                    ui.onBranchClick();
                    return(false);
                });

                jQuery(wym._box)
                .find('li.wym_tools_imagebutton a').click(function() {
                    ui.onInsertImageClick();
                    return(false);
                });

                jQuery(wym._box)
                .find('li.wym_tools_pbutton a').click(function() {
                    ui.newParagraph();
                    return(false);
                });

                jQuery(wym._box)
                .find('li.wym_tools_logoutbutton a').click(function() {
                    ui.logout();
                    return(false);
                });
            }

            ui[name] = wym;
            $(wym._box).css('height', editorHeight);
            $(wym._box).find(wym._options.containersSelector)
                .removeClass('wym_dropdown').addClass('wym_panel');
            $(wym._box).find(wym._options.iframeSelector).css('height', height).css('width', '102%');
        }
    });
};

ui.newParagraph = function () {
    $('#new-paragraph').dialog('open');
};

ui.insertParagraphHere = function () {
    ui.editor.insert(h.p(".").str());
    $('#new-paragraph').dialog('close');
};

ui.insertParagraphBelow = function () {
    id = ui.uniqueId();
    ui.editor.insert(h.span({'id': id, 'class': 'remove-me'}).str());
    ui.queryEditor('#' + id).parent().parent().after(h.p(".").str());
    ui.queryEditor('#' + id).remove();
    $('#new-paragraph').dialog('close');
};

ui.clickOnEnter = function (id) {
    return function (e) {
        if (e.which === 13) {
            $('#' + id).click();
        }
    };
};

ui.error = function (message) {
    $('#error-msg').html(message).fadeIn();
    setTimeout(function () {
        $('#error-msg').fadeOut();
    }, 5000);
};

ui.message = function (message) {
    $('#message-msg').html(message).fadeIn();
    setTimeout(function () {
        $('#message-msg').fadeOut();
    }, 5000);
};

ui.getSelectedDocument = function () {
    var info = {};

    id = ui.uniqueId();
    ui.editor.insert(h.span({'id': id, 'class': 'remove-me'}).str());
    info.doc = ui.queryEditor('#' + id).closest('.section');

    if (info.doc.length === 0) {
        return null;
    }

    ui.queryEditor('#' + id).remove();
    info.title = info.doc.find('h1').eq(0).html();

    return info;
};

ui.onInsertImageClick = function () {
    var doc = ui.getSelectedDocument();
    if (doc === null) {
        ui.error("no hay un documento seleccionado");
        return;
    }

    $('#img-msg').html('Imagenes en ' + doc.title);

    ui.listImages(doc);

    $('#list-images-tab').click();
    $('#insert-image').dialog('open');
};

ui.listImages = function(doc) {
    if (!doc) {
        doc = ui.getSelectedDocument()
        if (doc === null) {
            ui.error("no hay un documento seleccionado");
            return;
        }
    }

    var id = doc.doc.attr('id');

    req.view("_design/fresita/_show/document/" + id, function (doc) {
        var name, cont = $('#doc-images'), line, upload, iframe;
        cont.html('');

        if (doc._attachments) {
            for (name in doc._attachments) {
                line = h.li(h.a({'href': '#', 'class': 'link-btn', 'title': 'insertar',
                    'onclick': h.echo('return ui.insertImage(\'', "" + doc._id, '\', \'', name, '\');')},
                        h.img({'src': 'img/editor/ok.png', 'alt': 'insertar'})),
                    h.a({'href': '#', 'class': 'link-btn', 'title': 'abrir',
                    'onclick': h.echo('return ui.openPath(\'', req.base + doc._id + "/" + name, '\');')},
                        h.img({'src': 'img/editor/document-open.png', 'alt': 'abrir'})),
                    " " + name).str();

                cont.append(line);
            }
        }
        else {
            cont.html(h.li('No hay imagenes, adjunte una imagen primero').str());
        }

        // upload stuff
        $("input[name='_rev']").val(doc._rev);
        $("#upload-form").attr('action', req.base + doc._id);
        $('#upload-msg').html('Adjuntar archivo a ' + doc.title);

    },
    ui.errorCb("Error obteniendo informacion del documento"));

}

ui.openPath = function (path) {
    $('#open-path>iframe').attr('src', path);
    $('#open-path').dialog('open');
};

ui.insertImage = function (docId, name) {
    ui.editor.insert("<img src=\"" + req.base + docId + "/" + name + "\"/>");
    $('#insert-image').dialog('close');
};

ui.login = function () {
    var user = $('#user').val().trim(), pass = $('#pass').val().trim(),
        form = $('#login-form');


    if (user === '') {
        ui.error("Usuario vacio");
        return false;
    }

    if (pass === '') {
        ui.error("Contrase&ntilde;a vacia");
        return false;
    }

    form.ajaxSubmit({
        url: "/_session",
        success: function(resp) {
         $('#login').dialog('close');
         $('#cover').hide();
         req.user = user;
         $("#pass").val("");
        },
        error: function (resp) {
         ui.error("Usuario o contrase&ntilde;a invalidos");
        }
    });

    return false;
};

ui.logout = function () {
    req.logout();
    $('#cover').show();
    $('#login').dialog('open');
};

ui.upload = function () {
    var id = $("input[name='_id']").val(), form = $('#upload-form'), field = $('#image-file');

    if (field.val().trim() === '') {
        ui.error("Archivo no seleccionado");
        return false;
    }
    else {
        form.ajaxSubmit({
            url: req.base + id,
            success: function(resp) {
             field.val('');
             ui.message('Imagen adjuntada');
        }});
    }
};

ui.confirmDialog = function (message, onAccept, onCancel) {
    $('#confirm-message').html(message);
    ui.onConfirmAccept = ui.callAndClose(onAccept, 'confirm-dialog');
    ui.onConfirmCancel = ui.callAndClose(onCancel, 'confirm-dialog');
    $('#confirm-dialog').dialog('open');
};

ui.showConflicts = function (id, rev) {
    $('#confs-current-tab').click();
    $('#conflicts').dialog('open');
    setTimeout(function () {
            ui.openConflict(id, rev, false, 'current');
            ui.openConflict(id, rev, true, 'other');
        }, 3000);
};

ui.openConflict = function (id, rev, isAlternative, name) {
    var identifier = id;

    if (isAlternative) {
        identifier += "?rev=" + rev;
    }

    req.view(identifier, function (doc) {
            var content = h.div({'class': 'section', 'title': rev, 'id': doc._id}, doc.body).str();
            ui[name].html(content);
        },
        ui.errorCb('No se pudo abrir el documento ' + id));
};

ui.onSolve = function (name) {
    var docu = $(ui[name].xhtml()), rev, id;
    $('#conflicts').dialog('close');
    rev = docu.attr('title');
    id = docu.attr('id');

    docu.removeAttr('title');
    docu.find('.remove-me').remove();
    req.remove(id, rev, function () {
            doc.save(docu, false);
        }, ui.errorCb("Error removiendo el conflicto"));
};

ui.onFixConflicts = function () {
    req.view("_design/fresita/_view/conflicts", ui.onGetConflictsOk, ui.errorCb("Error obteniendo conflictos"));
};

ui.onGetConflictsOk = function (response) {
    var i, conflict, conflicts = response.rows, cont=$('#conflicts-list');
    cont.html('');

    if (conflicts.length === 0) {
        ui.message('No existen conflictos');
        return;
    }

    for (i = 0; i < conflicts.length; i += 1) {
        conflict = conflicts[i];

        if (conflict.value.type === "document") {
            cont.append(h.li({'id': conflict.id},
                h.button({'onclick': 'ui.showConflicts(\'' + conflict.id + '\', \'' + conflict.key[0] + '\')'}, "Resolver"),
                " " + conflict.value.name).str());
        }
    };
};

ui.onSolveCancel = function() {
    $('#conflicts').dialog('close');
}

ui.nop = function () {
};

ui.callAndClose = function (callback, id) {
    return function () {
        callback();
        $('#' + id).dialog('close');
    };
};

ui.errorCb = function (message) {
    return function () {
        ui.error(message);
    };
};

ui.messageCb = function (message) {
    return function () {
        ui.message(message);
    };
};

ui.documentAsListItemOpen = function (doc) {
    return h.li(h.a({'href': '#', 'title': 'abrir',
        'onclick': h.echo('return ui.openDocument(\'', "" + doc._id, '\')')}, doc.title), h.span({'class': 'description'}, doc.description.substr(0, 30))).str();
};

ui.formatDocumentAsItemAdd = function (containerId) {
    return function (doc) {
        return h.li(h.a({'href': '#', 'class': 'link-btn', 'title': 'agregar',
            'onclick': h.echo('return ui.addToList(\'', "" + doc._id, '\', \'', "" + doc.title, '\', \'documento\', \'', containerId, '\')')},
                h.img({'src': 'img/editor/list-add.png', 'alt': 'agregar'})), doc.title).str();
    }
};

ui.formatRepo = function (containerId) {
    return function (doc) {
        return h.li({'id': doc._id}, h.a({'href': '#', 'class': 'link-btn', 'title': 'eliminar',
                'onclick': h.echo('return ui.removeRepo(\'', "" + doc._id, '\', \'', "" + doc._rev, '\', \'', containerId, '\')')},
                    h.img({'src': 'img/editor/list-remove.png', 'alt': 'eliminar'})),
                h.a({'href': '#', 'class': 'link-btn', 'title': 'editar',
                    'onclick': h.echo('return ui.onAddRepoClick(\'', "" + doc._id, '\', \'', "" + doc._rev, '\', \'', "" + doc.name, '\', \'', "" + doc.address, '\', \'Editar Repositorio\');')},
                        h.img({'src': 'img/editor/edit.png', 'alt': 'editar'})),
                h.a({'href': '#', 'title': 'sincronizar documentos',
            'onclick': h.echo('return ui.syncRepo(\'', "" + doc.address, '\')')},
                 doc.name, ' (', doc.address, ')')).str();
    };
};

ui.formatAuthor = function (containerId) {
    return function (doc) {
        return h.li(h.a({'href': '#', 'class': 'link-btn', 'title': 'agregar',
            'onclick': h.echo('return ui.addToList(\'',
                    "" + author.toHtmlId(doc._id), '\', \'',
                    author.format(doc), '\', \'autor\', \'', containerId, '\')')},
                h.img({'src': 'img/editor/list-add.png', 'alt': 'agregar'})), author.format(doc)).str();
    };
};

ui.formatCategory = function (containerId) {
    return function (doc) {
        return h.li(h.a({'href': '#', 'class': 'link-btn', 'title': 'agregar',
            'onclick': h.echo('return ui.addToList(\'',
                    "" + doc._id, '\', \'',
                    doc.name, '\', \'categoria\', \'', containerId, '\')')},
                h.img({'src': 'img/editor/list-add.png', 'alt': 'agregar'})), doc.name).str();
    };
};

ui.formatStyleAdd = function (containerId) {
    return function (doc) {
        return h.li(h.a({'href': '#', 'class': 'link-btn', 'title': 'agregar',
            'onclick': h.echo('return ui.addToList(\'',
                    "" + doc._id, '\', \'',
                    doc.name, '\', \'estilo\', \'', containerId, '\')')},
                h.img({'src': 'img/editor/list-add.png', 'alt': 'agregar'})), doc.name).str();
    };
};

ui.formatStyle = function (containerId, docId) {
    return function (doc) {
        return h.li(h.a({'href': '#', 'class': 'link-btn', 'title': 'previsualizar',
            'onclick': h.echo('return ui.export(\'', "" + doc._id, '\', \'', docId, '\');')},
                h.img({'src': 'img/editor/ok.png', 'alt': 'previsualizar'})),
            h.a({'href': '#', 'class': 'link-btn', 'title': 'editar',
            'onclick': h.echo('return ui.editStyle(\'', "" + doc._id, '\');')},
                h.img({'src': 'img/editor/edit.png', 'alt': 'editar'})),
            h.a({'href': '#', 'class': 'link-btn', 'title': 'copiar',
            'onclick': h.echo('return ui.copyStyle(\'', "" + doc._id, '\');')},
                h.img({'src': 'img/editor/copy.png', 'alt': 'copiar'})),
            " " + doc.name, h.span({'class': 'description'}, doc.description.substr(0, 40))).str();
    };
};

ui.addToList = function (id, title, name, containerId) {
    var container = $('#' + containerId);

    if (container.find('#' + id).size() > 0) {
        ui.error(name + " se encuentra presente en la lista");
        return;
    }

    content = h.li({'id': id}, h.a({'href': '#', 'title': 'quitar',
        'onclick': 'ui.confirmRemove($(this).parent(), \'' + name + '\'); return false;'},
            h.img({'src': 'img/editor/list-remove.png', 'alt': 'quitar'})), title).str();
    container.append(content);
};

ui.confirmRemove = function (item, name) {
    ui.confirmDialog("Borrar " + name + '?',
        function () {
            item.remove();
        }, ui.nop);
};

ui.openDocument = function (id, child) {
    req.view(id, function (doc) { ui.onOpenDocumentOk(doc, child); },
        ui.errorCb('No se pudo abrir el documento ' + id));
};

ui.onOpenDocumentOk = function (doc, child) {
    if (child === true) {
        ui.queryEditor('#' + doc._id).html(doc.body);
    }
    else {
        var content = h.div({'class': 'section', 'id': doc._id}, doc.body).str();
        if (ui.isOverride) {
            ui.editor.html(content);
        }
        else {
            ui.editor.insert("<p>&nbsp;</p>" + content + "<p>&nbsp;</p>");
        }

        $('#open-document').dialog('close');
        $('#doc-open-results').html('');
        $('#doc-open').val('');
    }

    $(h.div(doc.body).str()).find('.section').each(function (index, item) {
        var id = $(item).attr('id');
        ui.openDocument(id, true);
    });
};

ui.addTo = function (listId, transform) {
    return function (obj) {
        $('#' + listId).append(transform(obj));
    };
};

ui.onNewDocument = function () {
    var form = $('#new-doc-form>fieldset'), uuid, values, i, type = $('#new-document-type').val(), docu, id, rev, body;

    values = ui.getNewDocumentValues();

    for (i = 0; i < values.deps.length; i += 1) {
        if ($.inArray(values.deps[i], values.confs) !== -1) {
            ui.error('Un documento es dependencia y conflicto a la vez');
            return;
        }
    }

    if (values.authors.length == 0) {
        ui.error('El documento debe contener al menos un autor');
        return;
    }


    if (type === 'new') {
        uuid = req.get_uuid();
        doc.unsaved[uuid] = model.document(values.title, "", values.description,
                values.authors, values.tags, 0, 0, values.deps, values.confs,
                values.cats, values.created, values.styles, uuid);

        if (ui.isOverride === true) {
            ui.editor.html(
                    h.div({'class': 'section', 'id': uuid}, h.h1(values.title), h.p('&nbsp;')).str());
        }
        else {
            ui.editor.insert(h.div({'class': 'section', 'id': uuid}, h.h1(values.title), h.p('&nbsp;')).str() + h.p('&nbsp;').str());
        }

        setTimeout(function () {
            ui.onSaveClick();
        }, 3000);
    }
    else {
        id = $('#new-document-id').val();
        rev = $('#new-document-rev').val();
        body = $('#new-document-body').val();
        created = $('#new-document-created').val();
        docu = model.document(values.title, body, values.description,
            values.authors, values.tags, 0, 0, values.deps, values.confs,
            values.cats, created, values.styles, id, rev);
        req.update(docu, ui.messageCb("Documento editado"), ui.errorCb("Error editando documento"));
    }

    $('#new-document').dialog('close');
};

ui.getNewDocumentValues = function () {
    var title, description, authors, tags, deps, confs, created, styles;
    title = $('#doc-title').val();
    description = $('#doc-description').val();
    tags = ui.tagsFromString($('#doc-tags').val());
    created = req.date();

    deps = [];
    $('#doc-deps-selected li').each(function (index, item) {
            deps.push($(item).attr('id'));
    });

    confs = [];
    $('#doc-conflicts-selected li').each(function (index, item) {
            confs.push($(item).attr('id'));
    });

    authors = [];
    $('#doc-authors-selected li').each(function (index, item) {
        item = $(item);
        authors.push(author.getIdFromHtmlId(item.attr('id')));
    });

    styles = [];
    $('#doc-styles-selected li').each(function (index, item) {
        item = $(item);
        styles.push(item.attr('id'));
    });

    cats = ui.getRuleValues('doc-rules-selected');

    return {'title': title, 'description': description, 'authors': authors,
        'tags': tags, 'deps': deps, 'confs': confs, 'created': created, 'cats': cats, 'styles': styles};
}

ui.clearNewDocumentValues = function () {
    ui.setDocumentValues('', '');
};

ui.onEditClick = function () {
    var id = $('.wym_iframe iframe').contents().find('.section').eq(0).attr('id');

    req.view(id, function (doc) {
        ui.setDocumentValues(doc.title, doc.description, doc.tags, doc.authors, doc.deps, doc.confs, doc.cats, doc.styles);
        $('#new-document-id').val(doc._id);
        $('#new-document-rev').val(doc._rev);
        $('#new-document-created').val(doc.created);
        $('#new-document-body').val(doc.body);
        $('#show-doc-id').val(doc._id);
        $('.edit-only').show();
    },
        ui.errorCb("Error obteniendo informacion del documento"));

    $('#new-document-title').html("Actualizar documento");
    $('#new-document-type').val("edit");
    $('#doc-authors-tab').click();
    $('#new-document').dialog('open');
};

ui.setDocumentValues = function (title, desc, tags, authors, deps, confs, rules, styles) {
    var i, item, query;

    $('#doc-title').val(title);
    $('#doc-description').val(desc);
    query = $('#doc-tags');
    query.val('');

    if (tags) {
        item = '';
        if (tags.length > 0) {
            for (i = 0; i < tags.length; i += 1) {
                item += tags[i] + ', ';
            }

            query.val(item.substr(0, item.length - 2));
        }
    }

    $('#doc-author').val('');
    $('#doc-authors-results').html('');
    query = $('#doc-authors-selected');
    query.html('');

    if (authors) {
        for (i = 0; i < authors.length; i += 1) {
            item = authors[i];
            req.view(item, function (obj) {
                ui.addToList(author.toHtmlId(obj._id), author.format(obj), 'autor', 'doc-authors-selected');
            }, ui.nop);
        }
    }

    $('#doc-dep').val('');
    $('#doc-deps-results').html('');
    query = $('#doc-deps-selected');
    query.html('');

    if (deps) {
        for (i = 0; i < deps.length; i += 1) {
            item = deps[i];
            req.view(item, function (obj) {
                ui.addToList(obj._id, obj.title, 'documento', "doc-deps-selected");
            }, ui.nop);
        }
    }

    $('#doc-conflict').val('');
    $('#doc-conflicts-results').html('');
    query = $('#doc-conflicts-selected');
    query.html('');

    if (confs) {
        for (i = 0; i < confs.length; i += 1) {
            item = confs[i];
            req.view(item, function (obj) {
                ui.addToList(obj._id, obj.title, 'documento', "doc-conflicts-selected");
            }, ui.nop);
        }
    }

    $('#doc-rule').val('');
    $('#doc-rules-results').html('');
    query = $('#doc-rules-selected');
    query.html('');

    if (rules) {
        for (i = 0; i < rules.length; i += 1) {
            item = rules[i];
            ui.formatExistingRule("doc-rules-selected", item);
        }
    }

    $('#new-author-firstname').val('');
    $('#new-author-lastname').val('');
    $('#new-author-email').val('');
    $('#new-author-web').val('');
    $('#new-author-user').val('');
    $('#new-author-pass').val('');
    $('#new-author-confirm').val('');

    $('#doc-style').val('');
    $('#doc-styles-results').html('');
    query = $('#doc-styles-selected');
    query.html('');

    if (styles) {
        for (i = 0; i < styles.length; i += 1) {
            item = styles[i];
            req.view(item, function (obj) {
                ui.addToList(obj._id, obj.name, 'estilo', 'doc-styles-selected');
            }, ui.nop);
        }
    }

    ui.onNewCategoryCancel();
    ui.onNewAuthorCancel();
    ui.newDocumentBack();
    $('.edit-only').hide();
}

ui.onToggleNewDocumentMore = function () {
    var moreBtn = $('#new-doc-more-btn'), more = $('#new-doc-more'),
        form = $('#new-doc-form>fieldset');

    if (moreBtn.hasClass('more')) {
        moreBtn.html(t('Atras'));
        moreBtn.removeClass('more');
        moreBtn.addClass('less');

        form.hide();
        more.show();
    }
    else {
        ui.newDocumentBack();
    }
};

ui.newDocumentBack = function() {
    var moreBtn = $('#new-doc-more-btn'), more = $('#new-doc-more'),
        form = $('#new-doc-form>fieldset');

    moreBtn.html(t('Avanzado'));
    moreBtn.removeClass('less');
    moreBtn.addClass('more');

    more.hide();
    form.show();
};

ui.onNewClick = function (override) {
    ui.isOverride = override;
    ui.clearNewDocumentValues();
    $('#new-document-type').val("new");
    $('#new-document-title').html("Nuevo documento");
    $('#doc-authors-tab').click();
    $('#new-document').dialog('open');
};

ui.onOpenClick = function (override) {
    ui.isOverride = override;
    $('#doc-open').val('');
    $('#doc-open-results').html('');
    $('#open-document').dialog('open');
};

ui.onSyncClick = function () {
    $('#repo-name').val('');
    $('#add-repo-name').val('');
    $('#add-repo-address').val('');
    $('#sync-repo-results').html('');
    $('#sync-repos-tab').click();
    $('#sync-repo').dialog('open');
    $('#add-repo').hide();
    $('#search-repo, #sync-repo-buttons').show();
};

ui.onBranchClick = function () {
    var docu = $(ui.editor.xhtml());
    docu.find('.remove-me').remove();
    doc.save(docu, true, req.get_uuid());
    ui.message("Documento ramificado con exito");
};

ui.onAddRepoClick = function (id, rev, name, address, title) {
    $('#add-repo-title').html(title);
    $('#add-repo-id').val(id);
    $('#add-repo-rev').val(rev);
    $('#add-repo-name').val(name);
    $('#add-repo-address').val(address);
    $('#search-repo, #sync-repo-buttons').hide();
    $('#add-repo').show();
};

ui.onSearchRepo = function () {
    var query = $('#repo-name').val().trim();

    if (query === "") {
        ui.error("Busqueda vacia");
        return;
    }

    ui.startSearch("search-repo");
    repo.search(query, ui.onSearchOk("search-repo",
                "sync-repo-results", "Error obteniendo repositorios",
                ui.formatRepo('sync-repo-results')),
            ui.onSearchError("search-repo", "Error buscando repositorios"));
};

ui.onSearchAllRepos = function () {
    ui.startSearch("search-repo");
    repo.searchAll(ui.onSearchOk("search-repo",
                "sync-repo-results", "Error obteniendo repositorios",
                ui.formatRepo('sync-repo-results')),
            ui.onSearchError("search-repo", "Error buscando repositorios"));
};

ui.removeRepo = function (id, rev, containerId) {
    req.remove(id, rev, function () {
        $('#' + containerId + ' #' + id).remove();
    }, ui.errorCb('Error borrando repositorio'));
};

ui.onNewRepo = function () {
    var name = $('#add-repo-name').val().trim(),
        address = $('#add-repo-address').val().trim(),
        id = $('#add-repo-id').val().trim(),
        rev = $('#add-repo-rev').val().trim(),
        filter = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

    if (name === '') {
        ui.error('El nombre del repositorio no puede estar vacio');
        return;
    }

    if (address === '') {
        ui.error('La direcci&oacute; del repositorio no puede estar vacia');
        return;
    }

    /*if (!filter.test(address)) {
        ui.error('La direcci&oacute; no es una IP valida');
        return;
    }*/

    if (id !== '') {
        req.update(model.repo(name, address, id, rev), ui.onRepoCreateOk, ui.onRepoCreateError);
    }
    else {
        req.create(model.repo(name, address), ui.onRepoCreateOk, ui.onRepoCreateError);
    }
};

ui.onRepoCreateOk = function () {
    ui.onNewRepoCancel();
};

ui.onRepoCreateError = function () {
    ui.error('Error guardando el nuevo repositorio');
};

ui.onNewRepoCancel = function () {
    $('#add-repo').hide();
    $('#search-repo, #sync-repo-buttons').show();
};

ui.syncRepo = function (address) {
    req.replicate(address, ui.messageCb("Sincronizacion finalizada"), ui.errorCb("Error sincronizando repositorios"));
};

ui.onSearchDocumentStyles = function () {
    var query = $('#doc-style').val().trim();

    if (query === "") {
        ui.error("Busqueda vacia");
        return;
    }

    ui.startSearch("doc-styles");
    style.search(query, ui.onSearchOk("doc-styles",
                "doc-styles-results", "Error obteniendo plantillas",
                ui.formatStyleAdd('doc-styles-selected')),
            ui.onSearchError("doc-styles", "Error buscando plantillas"));
}

ui.onSearchAllDocStyles = function () {
    ui.startSearch("doc-styles");
    style.searchAll(ui.onSearchOk("doc-styles",
                "doc-styles-results", "Error obteniendo plantillas",
                ui.formatStyleAdd('doc-styles-selected')),
            ui.onSearchError("doc-styles", "Error buscando plantillas"));
};

ui.onSearchStyle = function () {
    var id = $('.wym_iframe iframe').contents().find('.section').eq(0).attr('id'),
        query = $('#style-name').val().trim();

    if (query === "") {
        ui.error("Busqueda vacia");
        return;
    }

    ui.startSearch("search-style");
    style.search(query, ui.onSearchOk("search-style",
                "doc-style-results", "Error obteniendo plantillas",
                ui.formatStyle('doc-style-results', id)),
            ui.onSearchError("search-style", "Error buscando plantillas"));
};

ui.onSearchAllStyles = function () {
    var id = $('.wym_iframe iframe').contents().find('.section').eq(0).attr('id');
    ui.startSearch("search-style");
    style.searchAll(ui.onSearchOk("search-style",
                "doc-style-results", "Error obteniendo plantillas",
                ui.formatStyle('doc-style-results', id)),
            ui.onSearchError("search-style", "Error buscando plantillas"));
};

ui.onNewStyleClick = function () {
    $('#doc-style-search, #doc-style-buttons').hide();
    $('#add-style').show();
};

ui.getStyleVars = function (prefix) {
    var vars = {}, varName, varValue;

    $('#' + prefix + '-style-values-list .style-values').each(function (i, item) {
        item = $(item);
        varName = item.find('span.style-name').html();
        varValue = item.find('span.style-value').html();
        vars[varName] = varValue;
    });

    return vars;
};

ui.onNewStyleOk = function () {
    var name = $('#add-style-name').val().trim(),
        desc = $('#add-style-description').val().trim(),
        code = $('#add-style-content').val().trim(), stl, vars;

    if (name === '') {
        ui.error('Nombre vacio');
        return;
    }

    if (desc === '') {
        ui.error('Descripcion vacia');
        return;
    }

    if (code === '') {
        ui.error('C&oacute;digo vacio');
        return;
    }

    vars = ui.getStyleVars('add');

    stl = model.style(name, desc, "luismarianoguerra@gmail.com", code, vars);
    req.create(stl, ui.onNewStyleCancel, ui.errorCb("Error creando estilo"));
};

ui.onEditStyleOk = function () {
    var name = $('#edit-style-name').val().trim(),
        desc = $('#edit-style-description').val().trim(),
        id = $('#edit-style-id').val().trim(),
        rev = $('#edit-style-rev').val().trim(),
        code = $('#edit-style-content').val().trim(), stl, vars;
    if (name === '') {
        ui.error('Nombre vacio');
        return;
    }

    if (id === '') {
        ui.error('Identificador vacio');
        return;
    }

    if (rev === '') {
        ui.error('Revision vacia');
        return;
    }

    if (desc === '') {
        ui.error('Descripcion vacia');
        return;
    }

    if (code === '') {
        ui.error('C&oacute;digo vacio');
        return;
    }

    vars = ui.getStyleVars('edit');

    stl = model.style(name, desc, "luismarianoguerra@gmail.com", code, vars, id, rev);
    req.create(stl, ui.onEditStyleCancel, ui.errorCb("Error actualizando estilo"));
};


ui.setNewStyleValues = function (name, desc, content, valname, value) {
    $('#add-style-name').val(name);
    $('#add-style-description').val(desc);
    $('#add-style-content').val(content);

    $('#add-style-values-name').val("");
    $('#add-style-values-value').val("");
    $('#add-style-values-list').html("");
};

ui.setEditStyleValues = function (name, desc, content, id, rev, vars) {
    $('#edit-style-name').val(name);
    $('#edit-style-description').val(desc);
    $('#edit-style-content').val(content);
    $('#edit-style-id').val(id);
    $('#edit-style-rev').val(rev);

    $('#edit-style-values-name').val("");
    $('#edit-style-values-value').val("");
    $('#edit-style-values-list').html("");

    for(var key in vars) {
        ui.addStyleValue('edit', key, "" + vars[key]);
    }
};

ui.onNewStyleCancel = function () {
    ui.setNewStyleValues('', '', '', '', '');

    $('#add-style').hide();
    $('#doc-style-search, #doc-style-buttons').show();
};

ui.onEditStyleCancel = function () {
    ui.setEditStyleValues('', '', '', '', '');

    $('#edit-style').hide();
    $('#doc-style-search, #doc-style-buttons').show();
};

ui.editStyle = function (id) {
    req.view(id, function (style) {
        ui.setEditStyleValues(style.name, style.description, style.template,
            style._id, style._rev, style.vars);
        $('#doc-style-search, #doc-style-buttons').hide();
        $('#edit-style').show();
        },
        ui.errorCb("Error cargando estilo"));
};

ui.copyStyle = function (id) {
    req.view(id, function (style) {
        ui.setNewStyleValues(style.name, style.description, style.template, '', '');
        ui.onNewStyleClick();
    },
        ui.errorCb("Error cargando estilo"));
};

ui.onRemoveClick = function () {
    var info = ui.getSelectedDocument();
    if (info === null) {
        ui.error("no hay un documento seleccionado");
        return;
    }

    ui.confirmDialog("Borrar documento '" + info.title + '"?',
        function () {
            info.doc.remove();
        }, ui.nop);
};

ui.onSaveClick = function () {
    var docu = $(ui.editor.xhtml());
    docu.find('.remove-me').remove();
    doc.save(docu, true);
};

ui.onExportClick = function () {
    var info = ui.getSelectedDocument();
    if (info === null) {
        ui.error("no hay un documento para exportar");
        return;
    }

    $('#style-name').val('');
    $('#doc-style-results').html('');

    $('#add-style-name').val('');
    $('#add-style-description').val('');
    $('#add-style-content').val('');

    $('#add-style-values-name').val('');
    $('#add-style-values-value').val('');
    $('#add-style-values-list').html('');

    $('#edit-style-name').val('');
    $('#edit-style-description').val('');
    $('#edit-style-content').val('');

    $('#edit-style-values-name').val('');
    $('#edit-style-values-value').val('');
    $('#edit-style-values-list').html('');

    $('#add-style-main-tab').click();
    $('#edit-style-main-tab').click();
    $('#doc-export').dialog('open');
    ui.onNewStyleCancel();
};

ui.export = function (styleId, docId) {
    var format = $('#export-format').val();
    $('#secret').attr('src', '/_export' + req.base + docId + '/' + docId + '/' + styleId + '/' + format + '/document.' + format);
    return false;
};

ui.onAboutClick = function () {
    $('#about-dialog').dialog('open');
};

ui.onDocsClick = function () {
    $('#docs-dialog').dialog('open');
};

ui.onRateClick = function () {
    var info = ui.getSelectedDocument();
    if (info === null) {
        ui.error("no hay un documento seleccionado");
        return;
    }

    $('#rate-msg').html(info.title).data('info', info);
    $('#rate-document').dialog('open');
};

ui.onRateCancel = function () {
    $('#rate-document').dialog('close');
};

ui.onRateDocument = function () {
    var rate = $('#document-rate').val().trim(),
        info = $('#rate-msg').data('info');

    doc.rate(info.doc.attr('id'), parseInt(rate), ui.nop,
            ui.errorCb('Error calificando documento'));
    $('#rate-document').dialog('close');
};

ui.onPreviewClick = function () {
    $('#preview-document').dialog('open');
};

ui.onPreviewDocument = function () {
};

ui.onSearchAuthors = function () {
    var query = $('#doc-author').val().trim();

    if (query === "") {
        ui.error("Busqueda vacia");
        return;
    }

    ui.startSearch("search-authors");
    author.search(query, ui.onSearchOk("search-authors",
                "doc-authors-results", "Error obteniendo el autor",
                ui.formatAuthor("doc-authors-selected")),
            ui.onSearchError("search-authors", "Error buscando autores"));
};

ui.onSearchAllAuthors = function () {
    ui.startSearch("search-authors");
    author.searchAll(ui.onSearchOk("search-authors",
                "doc-authors-results", "Error obteniendo el autor",
                ui.formatAuthor("doc-authors-selected")),
            ui.onSearchError("search-authors", "Error buscando autores"));
};

ui.onAuthorAdd = function (link) {
    $(this).find('img').attr('src', 'img/editor/list-remove.png');
};

ui.onNewAuthor = function () {
    $('#doc-authors-search').hide();
    $('#new-author').show();
};

ui.onNewAuthorCancel = function () {
    $('#new-author').hide();
    $('#doc-authors-search').show();
};

ui.onNewAuthorOk = function() {
    var firstname = $('#new-author-firstname').val().trim(),
        lastname = $('#new-author-lastname').val().trim(),
        email = $('#new-author-email').val().trim(),
        web = $('#new-author-web').val().trim(),
        user = $('#new-author-user').val().trim(),
        pass = $('#new-author-pass').val().trim(),
        confirm = $('#new-author-confirm').val().trim(),
        author;

    if (firstname === '') {
        ui.error('El nombre no puede estar vacio');
        return;
    }

    if (lastname === '') {
        ui.error('El apellido no puede estar vacio');
        return;
    }

    if (email === '') {
        ui.error('El email no puede estar vacio');
        return;
    }

    if (user === '') {
        ui.error('El usuario no puede estar vacio');
        return;
    }

    if (pass !== confirm) {
        ui.error('Las contrase&ntilde;as no coinciden');
        return;
    }

    author = model.author(email, firstname, lastname, web, req.date());
    req.create(author, ui.onNewAuthorCancel, ui.errorCb("Error guardando autor"));
    req.new_user(user, pass, ui.nop, ui.errorCb("Error creando usuario"));
};

ui.onSearchDeps = function () {
    var query = $('#doc-dep').val().trim();

    if (query === "") {
        ui.error("Busqueda vacia");
        return;
    }

    ui.startSearch("search-deps");
    doc.search(query, ui.onSearchOk("search-deps",
                "doc-deps-results", "Error obteniendo el documento",
                ui.formatDocumentAsItemAdd("doc-deps-selected")),
            ui.onSearchError("search-deps", "Error buscando documentos"));
};

ui.onSearchCats = function () {
    var query = $('#doc-cat').val().trim();

    if (query === "") {
        ui.error("Busqueda vacia");
        return;
    }

    ui.startSearch("search-cats");
    Category.search(query, ui.onSearchOk("search-cats",
                "doc-cats-results", "Error obteniendo categoria",
                ui.formatCategory("doc-cats-selected")),
            ui.onSearchError("search-cats", "Error buscando categoria"));
};

ui.onSearchs = function () {
    ui.startSearch("search-s");
};

ui.onSearchConflicts = function () {
    var query = $('#doc-conflict').val().trim();

    if (query === "") {
        ui.error("Busqueda vacia");
        return;
    }

    ui.startSearch("search-conflicts");
    doc.search(query, ui.onSearchOk("search-conflicts",
                "doc-conflicts-results", "Error obteniendo el documento",
                ui.formatDocumentAsItemAdd("doc-conflicts-selected")),
            ui.onSearchError("search-conflicts", "Error buscando documentos"));
};

ui.onSearchRules = function () {
    var query = $('#doc-rule').val().trim();

    if (query === "") {
        ui.error("Busqueda vacia");
        return;
    }

    ui.startSearch("search-rules");
    Category.search(query, ui.onSearchOk("search-rules",
                "doc-rules-results", "Error obteniendo ruleegoria",
                ui.formatRule("doc-rules-selected")),
            ui.onSearchError("search-rules", "Error buscando reglas"));
};

ui.onSearchAllRules = function () {
    ui.startSearch("search-rules");
    Category.searchAll(ui.onSearchOk("search-rules",
                "doc-rules-results", "Error obteniendo ruleegoria",
                ui.formatRule("doc-rules-selected")),
            ui.onSearchError("search-rules", "Error buscando reglas"));
};

ui.onSearchOpen = function () {
    var query = $('#doc-open').val().trim();

    if (query === "") {
        ui.error("Busqueda vacia");
        return;
    }

    ui.startSearch("search-open");
    doc.search(query, ui.onSearchOk("search-open", "doc-open-results", "Error obteniendo el documento", ui.documentAsListItemOpen),
            ui.onSearchError("search-open", "Error buscando documentos"));
};

ui.onSearchOk = function (searchId, containerId, errorMsg, itemFormatter) {
    return function (results) {
        var i = 0, uid;
        ui.stopSearch(searchId);
        $('#' + containerId).html('');

        if (results.rows.length === 0) {
            ui.message("No se encontraron resultados");
            return;
        }

        for (; i < results.rows.length; i += 1) {
            uid = results.rows[i].id;

            req.view(uid, ui.addTo(containerId, itemFormatter), ui.errorCb(errorMsg));
        }
    };
};

ui.onSearchError = function (searchId, errorMsg) {
    return function (response) {
        ui.stopSearch("search-open");
        ui.error("Error buscando documentos");
    };
};

ui.startSearch = function (id) {
    $('#' + id).children().hide().parent().prepend(h.img({'src': 'img/loading.gif', 'class': 'search-loading'}).str());
};

ui.stopSearch = function (id) {
    $('#' + id).children().show().parent().find('.search-loading').eq(0).remove();
};

ui.setUUID = function () {
    $('.wym_iframe iframe').contents().find('.section').eq(0).attr('id', req.get_uuid());
};

ui.onAddStyleValue = function (prefix) {
    var values = ui.getAddStyleValues(prefix);
    ui.clearAddStyleValues();
    ui.addStyleValue(prefix, values.name, values.value);
};

ui.addStyleValue = function (prefix, name, value) {
    if (name === '') {
        ui.error('Nombre vacio');
        return;
    }

    if (value === '') {
        ui.error('Valor vacio');
        return;
    }

    $('#' + prefix + '-style-values-list').append(
        h.div({'class': 'style-value-item'},
            h.div({'class': 'style-btns'},
                h.a({'href': '#', 'class': 'link-btn remove-btn', 'title': 'eliminar',
                    'onclick': '$(this).parent().parent().remove();' },
                        h.img({'src': 'img/editor/list-remove.png', 'alt': 'eliminar'})),
                h.a({'href': '#', 'class': 'link-btn edit-btn', 'title': 'editar',
                    'onclick': 'ui.editStyleValue($(this).parent().parent());' },
                        h.img({'src': 'img/editor/edit.png', 'alt': 'editar'})),
                h.a({'href': '#', 'class': 'link-btn ok-btn hidden', 'title': 'aceptar',
                    'onclick': 'ui.okEditStyleValue($(this).parent().parent());' },
                        h.img({'src': 'img/editor/ok.png', 'alt': 'aceptar'})),
                h.a({'href': '#', 'class': 'link-btn cancel-btn hidden', 'title': 'cancelar',
                    'onclick': 'ui.cancelEditStyleValue($(this).parent().parent());' },
                        h.img({'src': 'img/editor/cancel.png', 'alt': 'editar'}))),
            h.div({'class': 'style-values'},
                h.span({'class': 'style-name'}, name),
                h.span({'class': 'style-value'}, value),
                h.input({'type': 'text', 'class': 'style-name hidden', 'value': name}),
                h.input({'type': 'text', 'class': 'style-value hidden', 'value': value}))).str());
};

ui.getAddStyleValues = function (prefix) {
    return {'name': $('#' + prefix + '-style-values-name').val().trim(),
        'value': $('#' + prefix + '-style-values-value').val().trim()};
};

ui.clearAddStyleValues = function (prefix) {
    $('#' + prefix + '-style-values-name').val('');
    $('#' + prefix + '-style-values-value').val('');
};

ui.editStyleValue = function (cont) {
    cont.find("input.style-name").val(cont.find("span.style-name").html());
    cont.find("input.style-value").val(cont.find("span.style-value").html());

    cont.find(".edit-btn").addClass("hidden");
    cont.find(".remove-btn").addClass("hidden");
    cont.find(".ok-btn").removeClass("hidden");
    cont.find(".cancel-btn").removeClass("hidden");
    cont.find(".ok-btn").removeClass("hidden");
    cont.find(".style-values>span").addClass("hidden");
    cont.find(".style-values>input").removeClass("hidden");
};

ui.cancelEditStyleValue = function (cont) {
    cont.find(".style-values>span").removeClass("hidden");
    cont.find(".style-values>input").addClass("hidden");
    cont.find(".cancel-btn").addClass("hidden");
    cont.find(".ok-btn").addClass("hidden");
    cont.find(".edit-btn").removeClass("hidden");
    cont.find(".remove-btn").removeClass("hidden");
};

ui.okEditStyleValue = function (cont) {
    var name = cont.find("input.style-name").val().trim(),
        value = cont.find("input.style-value").val().trim();

    if (name === '') {
        ui.error('Nombre vacio');
        return;
    }

    if (value === '') {
        ui.error('Valor vacio');
        return;
    }

    cont.find("span.style-name").html(name);
    cont.find("span.style-value").html(value);

    ui.cancelEditStyleValue(cont);
};

ui.onNewCategoryClick = function () {
    $('#doc-rules-search').hide();
    $('#new-cat').show();
};

ui.onNewCategoryCancel = function () {
    $('#new-cat-option-name').val('');
    $('#new-cat-option-desc').val('');
    $('#new-cat-name').val('');
    $('#new-cat-empty').attr('checked', false);
    $('#new-cat-multiple').attr('checked', false);
    $('#new-cat-options').html('');

    $('#new-cat').hide();
    $('#doc-rules-search').show();
};

ui.onNewCategoryOk = function() {
    var cat = ui.getNewCategoryValues();

    if (cat.name.length < 3) {
        ui.error('Nombre demasiado breve');
        return;
    }

    if (cat.items.length < 2) {
        ui.error('Cantidad de opciones menor a 2');
        return;
    }

    // TODO: agregarlo a la lista?
    req.create(cat, ui.onNewCategoryCancel, ui.errorCb("Error guardando categoria"));
};

ui.onAddCategoryItem = function () {
    var name = $('#new-cat-option-name').val().trim(),
        desc = $('#new-cat-option-desc').val().trim();

    if (name.length < 3) {
        ui.error('Nombre demasiado breve');
        return;
    }

    if (desc.length < 3) {
        ui.error('Descripcion demasiado breve');
        return;
    }

    if ($('#new-cat-options .name').filter(function () { return $(this).html() == name; }).size() > 0) {
        ui.error('Opcion existente');
        return;
    }

    ui.addCategoryItem(name, desc);

    $('#new-cat-option-name').val(''),
    $('#new-cat-option-desc').val('');
};

ui.addCategoryItem = function (name, desc) {
    $('#new-cat-options').append(ui.formatCategoryItem(name, desc));
};

ui.getNewCategoryValues = function () {
    var name = $('#new-cat-name').val().trim(),
        empty = $('#new-cat-empty').attr('checked'),
        multiple = $('#new-cat-multiple').attr('checked'),
        items = ui.getCategoryItems();

    return model.category(name, empty, multiple, items);
};

ui.getCategoryItems = function () {
    var items = [];
    $('#new-cat-options li').each(function (i, item) {
        item = $(item);

        var name = item.find('.name').html(),
            desc = item.find('.desc').html();

        items.push(model.categoryItem(name, desc));
    });

    return items;
};

ui.formatCategoryItem = function (name, desc) {
    return h.li(h.a({'href': '#', 'title': 'quitar',
        'onclick': '$(this).parent().remove(); return false;'},
            h.img({'src': 'img/editor/list-remove.png', 'alt': 'quitar'})), name,
            h.span({'class': 'description'}, desc),
                h.span({'class': 'hidden name'}, name),
                h.span({'class': 'hidden desc'}, desc)).str();
};

ui.formatRule = function(contId) {
    return function (cat) {
        var ul = h.ul({'class': 'combo-list hidden'}), i;

        for (i = 0; i < cat.items.length; i += 1) {
            ul.add(h.li({'class': 'combo-item'}, h.select(h.option({"value": true}, "Incluir"),
                    h.option({"value": false}, "Excluir")), h.span({'class': 'item-name'}, cat.items[i].name)));
        }

        return h.li({'id': cat._id}, h.span({"class": "links"},
                    h.a({'href': '#', 'class': 'link-btn', 'title': 'agregar',
            'onclick': h.echo('return ui.addRuleToList($(this).parent().parent(), \'', contId, '\', \'', cat._id, '\')')},
                    h.img({'src': 'img/editor/list-add.png', 'alt': 'agregar'}))),
                cat.name, ul,
                h.span({'class': 'hidden name'}, cat.name)).str();
    }
};

ui.formatExistingRule = function(contId, cat) {
    var ul = h.ul({'class': 'combo-list'}), i, includeAttrs, excludeAttrs;


    for (i = 0; i < cat.items.length; i += 1) {
        includeAttrs = {"value": true};
        excludeAttrs = {"value": false};

        if (cat.items[i].include) {
            includeAttrs["selected"] = true;
        }
        else {
            excludeAttrs["selected"] = true;
        }

        ul.add(h.li({'class': 'combo-item'}, h.select(h.option(includeAttrs, "Incluir"),
                h.option(excludeAttrs, "Excluir")), h.span({'class': 'item-name'}, cat.items[i].name)));
    }

    $('#' + contId).append(h.li({'id': cat._id}, h.span({"class": "links"},
                h.a({'href': '#', 'class': 'link-btn', 'title': 'eliminar',
            'onclick': '$(this).parent().parent().remove();'},
                h.img({'src': 'img/editor/list-remove.png', 'alt': 'eliminar'}))),
            cat.name, ul,
            h.span({'class': 'hidden name'}, cat.name)).str());
};

ui.addRuleToList = function (row, contId, catId) {
    if ($('#' + contId + ' #' + catId).size() > 0) {
        ui.error('Categoria ya seleccionada');
        return;
    }

    var newRow = row.clone();
    newRow.find('.links').html(h.a({'href': '#', 'class': 'link-btn', 'title': 'eliminar',
            'onclick': 'ui.confirmRemove($(this).parent().parent(), \'regla de inclusi&oacute;n\');'},
                    h.img({'src': 'img/editor/list-remove.png', 'alt': 'eliminar'})).str());

    newRow.find('.combo-list').removeClass('hidden');

    $('#' + contId).append(newRow);
};

ui.getRuleValues = function (contId) {
    var rules = [];

    $('#' + contId + '>li').each(function (index, item) {
        var items = [];
        item = $(item);
        $('.combo-item', item).each(function (index, option) {
            option = $(option);
            items.push({'name': option.find('.item-name').html(), 'include': option.find('select').val() === 'true'});
        });

        rules.push({'name': item.find('.name').html(), 'id': item.attr('id'), 'items': items});
    });

    return rules;
};
