var author = {};

author.search = function (query, ok_cb, error_cb) {
    req.view("_fti/fresita/authors?q=" + query, ok_cb, error_cb);
};

author.searchAll = function (ok_cb, error_cb) {
    req.view("_design/fresita/_view/authors", ok_cb, error_cb);
};

author.format = function (auth) {
    return auth.lastname + ', ' + auth.firstname + ' (' + auth._id + ')';
};

author.toHtmlId = function (auth) {
    return auth.replace('@', '-at-').replace('.', '-dot-');
};

author.getIdFromHtmlId = function (id) {
    return id.replace('-at-', '@').replace('-dot-', '.');
};
