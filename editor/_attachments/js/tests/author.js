function test_author() {
    var created = req.date();
    module("author");
    test("clean authors", function() {
        stop();
        var on_view_ok = function (response) {
            var i = 0, author, authors = response.rows;

            for (; i < authors.length; i += 1) {
                author = authors[i].value;
                req.remove(author._id, author._rev);
            }

            start();
        };
        req.view("_design/fresita/_view/authors", on_view_ok, req.error_cb("get error"));
    });

    test("new author", function() {
        stop();
        var author = model.author("luismarianoguerra@gmail.com", "luis mariano", "guerr", "http://marianoguerr.com.ar", created);
        req.create(author, req.ok_cb("create ok"), req.error_cb("create error"));
    });

    test("new author short firstname", function() {
        stop();
        var author = model.author("marianoguerra@gmail.com", "lu", "guerr", "http://marianoguerr.com.ar", created);
        req.create(author, req.error_cb("create ok"), req.ok_cb("create error"));
    });

    test("new author short lastname", function() {
        stop();
        var author = model.author("marianoguerra@gmail.com", "luis mariano", "gu", "http://marianoguerr.com.ar", created);
        req.create(author, req.error_cb("create ok"), req.ok_cb("create error"));
    });

    test("update author", function() {
        stop();
        var author = model.author("luismarianoguerra@gmail.com", "Luis Mariano", "Guerra", "http://marianoguerra.com.ar", created, req.rev);
        req.update(author, req.ok_cb("update ok"), req.error_cb("update error"));
    });

    test("update author short firstname", function() {
        stop();
        var author = model.author("luismarianoguerra@gmail.com", "lu", "guerr", "http://marianoguerr.com.ar", created, req.rev);
        req.update(author, req.error_cb("update ok"), req.ok_cb("create error"));
    });

    test("update author short lastname", function() {
        stop();
        var author = model.author("luismarianoguerra@gmail.com", "luis mariano", "gu", "http://marianoguerr.com.ar", created, req.rev);
        req.update(author, req.error_cb("update ok"), req.ok_cb("create error"));
    });

    test("get author", function() {
        stop();
        var on_get_ok = function (response) {
            var author = model.author("luismarianoguerra@gmail.com", "Luis Mariano", "Guerra", "http://marianoguerra.com.ar", created, req.rev);
            start();
            req.test_compare_equal(author, response, ["firstname", "lastname", "website", "_id", "_rev"]);
        };
        req.view(req.id.replace('@', '%40'), on_get_ok, req.error_cb("get error"));
    });

    test("view authors", function() {
        stop();
        req.view("_design/fresita/_view/authors", req.ok_cb("view ok", true), req.error_cb("get error"));
    });

    test("view active authors", function() {
        stop();
        req.view("_design/fresita/_view/active-authors?group=true", req.ok_cb("view ok", true), req.error_cb("get error"));
    });

    test("search authors", function() {
        stop();
        req.view("_fti/fresita/authors?q=Mariano", req.ok_cb("view ok", true), req.error_cb("get error"));
    });


    test("delete author", function() {
        stop();
        req.remove(req.id.replace('@', '%40'), req.rev, req.ok_cb("delete ok"), req.error_cb("delete error"));
    });
}
