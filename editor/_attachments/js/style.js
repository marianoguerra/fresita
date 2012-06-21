var style = {};

style.search = function (query, ok_cb, error_cb) {
    req.view("_fti/fresita/styles?q=" + query, ok_cb, error_cb);
};

style.searchAll = function (ok_cb, error_cb) {
    req.view("_design/fresita/_view/styles", ok_cb, error_cb);
};

