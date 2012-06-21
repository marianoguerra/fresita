var Category = {};

Category.search = function (query, ok_cb, error_cb) {
    req.view("_fti/fresita/categories?q=" + query, ok_cb, error_cb);
};

Category.searchAll = function (ok_cb, error_cb) {
    req.view("_design/fresita/_view/categories", ok_cb, error_cb);
};
