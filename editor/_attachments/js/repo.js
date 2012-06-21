var repo = {};

repo.search = function (query, ok_cb, error_cb) {
    req.view("_fti/fresita/repos?q=" + query, ok_cb, error_cb);
};

repo.searchAll = function (ok_cb, error_cb) {
    req.view("_design/fresita/_view/repos", ok_cb, error_cb);
};
