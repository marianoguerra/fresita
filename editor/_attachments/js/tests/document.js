function test_document() {
    var created = req.date();
    module("document");

    test("new document", function() {
        stop();
        var document = model.document("oh hai", "hello world", "",
            ["luismarianoguerra@gmail.com"], ["test", "hello"], 0, 0, [], [], [], ["style-id"], created);
        req.create(document, req.ok_cb("create ok"), req.error_cb("create error"));
    });

    test("new document invalid vote value", function() {
        stop();
        var document = model.document("oh hai", "hello world", "",
            ["luismarianoguerra@gmail.com"], ["test", "hello"], 1, 4, [], [], [], ["style-id"], created);
        req.create(document, req.error_cb("create error"), req.ok_cb("create ok"));
    });

    test("new document short title", function() {
        stop();
        var document = model.document("oh", "hello world", "",
            ["luismarianoguerra@gmail.com"], ["test", "hello"], 1, 4, [], [], [], ["style-id"], created);
        req.create(document, req.error_cb("create error"), req.ok_cb("create ok"));
    });

    test("new document no authors", function() {
        stop();
        var document = model.document("oh hai", "hello world", "",
            [], ["test", "hello"], 1, 4, [], [], [], ["style-id"], created);
        req.create(document, req.error_cb("create error"), req.ok_cb("create ok"));
    });

    test("new document no tags", function() {
        stop();
        var document = model.document("oh hai", "hello world", "",
            ["luismarianoguerra@gmail.com"], [], 1, 4, [], [], [], ["style-id"], created);
        req.create(document, req.error_cb("create error"), req.ok_cb("create ok"));
    });

    test("update document", function() {
        stop();
        var document = model.document("oh hai", "hello world modified", "",
            ["luismarianoguerra@gmail.com"], ["test", "hello", "lala"], 0, 0, [], [], [], ["style-id"], created, req.id, req.rev);
        req.update(document, req.ok_cb("update ok"), req.error_cb("update error"));
    });

    test("update document short title", function() {
        stop();
        var document = model.document("oh", "hello world", "",
            ["luismarianoguerra@gmail.com"], ["test", "hello"], 1, 4, [], [], [], ["style-id"], created, req.id, req.rev);
        req.update(document, req.error_cb("create error"), req.ok_cb("create ok"));
    });

    test("update document no authors", function() {
        stop();
        var document = model.document("oh hai", "hello world", "",
            [], ["test", "hello"], 1, 4, [], [], [], ["style-id"], created, req.id, req.rev);
        req.update(document, req.error_cb("create error"), req.ok_cb("create ok"));
    });

    test("update document no tags", function() {
        stop();
        var document = model.document("oh hai", "hello world", "",
            ["luismarianoguerra@gmail.com"], [], 1, 4, [], [], [], ["style-id"], created, req.id, req.rev);
        req.update(document, req.error_cb("create error"), req.ok_cb("create ok"));
    });

    test("vote document", function() {
        stop();
        var document = model.document("oh hai", "hello world modified", "",
            ["luismarianoguerra@gmail.com"], ["test", "hello", "lala"], 1, 5, [], [], [], ["style-id"], created, req.id, req.rev);
        req.update(document, req.ok_cb("vote ok"), req.error_cb("vote error"));
    });

    test("vote total incremented twice", function() {
        stop();
        var document = model.document("oh hai", "hello world modified", "",
            // try to update with two votes
            ["luismarianoguerra@gmail.com"], ["test", "hello", "lala"], 3, 15, [], [], [], ["style-id"], created, req.id, req.rev);
        req.update(document, req.error_cb("vote error"), req.ok_cb("vote ok"));
    });

    test("vote total not incremented", function() {
        stop();
        var document = model.document("oh hai", "hello world modified", "",
            // try to update with two votes
            ["luismarianoguerra@gmail.com"], ["test", "hello", "lala"], 1, 15, [], [], [], ["style-id"], created, req.id, req.rev);
        req.update(document, req.error_cb("vote error"), req.ok_cb("vote ok"));
    });

    test("big vote count", function() {
        stop();
        var document = model.document("oh hai", "hello world modified", "",
            // try to update with two votes
            ["luismarianoguerra@gmail.com"], ["test", "hello", "lala"], 2, 15, [], [], [], ["style-id"], created, req.id, req.rev);
        req.update(document, req.error_cb("vote error"), req.ok_cb("vote ok"));
    });

    test("negative vote", function() {
        stop();
        var document = model.document("oh hai", "hello world modified", "",
            // try to update with two votes
            ["luismarianoguerra@gmail.com"], ["test", "hello", "lala"], 2, 4, [], [], [], ["style-id"], created, req.id, req.rev);
        req.update(document, req.error_cb("vote error"), req.ok_cb("vote ok"));
    });

    test("get document", function() {
        stop();
        var on_get_ok = function (response) {
            var document = model.document("oh hai", "hello world modified", "",
                ["luismarianoguerra@gmail.com"], ["test", "hello", "lala"], 1, 5, [], [], [], ["style-id"], created, req.id, req.rev);
            start();
            req.test_compare_equal(document, response, ["body", "authors", "tags", "description",
                "vote_count", "vote_total", "reqs", "confs", "_id", "_rev"]);
        };
        req.view(req.id, on_get_ok, req.error_cb("get error"));
    });

    test("view document", function() {
        stop();
        req.view("_design/fresita/_view/documents", req.ok_cb("view ok", true), req.error_cb("get error"));
    });

    test("view document rating", function() {
        stop();
        req.view("_design/fresita/_view/document-rating", req.ok_cb("view ok", true), req.error_cb("get error"));
    });

    test("view tags", function() {
        stop();
        req.view("_design/fresita/_view/active-tags?group=true", req.ok_cb("view ok", true), req.error_cb("get error"));
    });

    test("search documents", function() {
        stop();
        req.view("_fti/fresita/documents?q=hai", req.ok_cb("view ok", true), req.error_cb("get error"));
    });

    test("delete document", function() {
        stop();
        req.remove(req.id, req.rev, req.ok_cb("delete ok"), req.error_cb("delete error"));
    });

}
