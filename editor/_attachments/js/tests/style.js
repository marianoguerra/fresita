function test_style() {
    module("style");

    test("create", function() {
        stop();
        var style = model.style("simple", "a simple style", "luismarianoguerra@gmail.com", "<a>${a}</a>", {'a': 4});
        req.create(style, req.ok_cb("create ok"), req.error_cb("create error"));
    });

    test("create invalid name", function() {
        stop();
        var style = model.style("s", "a simple style", "luismarianoguerra@gmail.com", "<a>${a}</a>", {'a': 4});
        req.create(style, req.error_cb("create error"), req.ok_cb("create ok"));
    });

    test("create invalid description", function() {
        stop();
        var style = model.style("simple", "a", "luismarianoguerra@gmail.com", "<a>${a}</a>", {'a': 4});
        req.create(style, req.error_cb("create error"), req.ok_cb("create ok"));
    });

    test("create invalid user", function() {
        stop();
        var style = model.style("simple", "a simple style", "lu", "<a>${a}</a>", {'a': 4});
        req.create(style, req.error_cb("create error"), req.ok_cb("create ok"));
    });

    test("update", function() {
        stop();
        var style = model.style("simple.", "a simple style.", "luismarianoguerra@gmail.com", "<a>${a}</a>${b}", {'a': 4, 'b': 5});
        style._id = req.id;
        style._rev = req.rev;
        req.create(style, req.ok_cb("update ok"), req.error_cb("update error"));
    });

    test("update invalid name", function() {
        stop();
        var style = model.style("s", "a simple style", "luismarianoguerra@gmail.com", "<a>${a}</a>", {'a': 4});
        style._id = req.id;
        style._rev = req.rev;
        req.update(style, req.error_cb("update error"), req.ok_cb("update ok"));
    });

    test("update invalid description", function() {
        stop();
        var style = model.style("simple", "a", "luismarianoguerra@gmail.com", "<a>${a}</a>", {'a': 4});
        style._id = req.id;
        style._rev = req.rev;
        req.update(style, req.error_cb("update error"), req.ok_cb("update ok"));
    });

    test("update invalid user", function() {
        stop();
        var style = model.style("simple", "a simple style", "lu", "<a>${a}</a>", {'a': 4});
        style._id = req.id;
        style._rev = req.rev;
        req.update(style, req.error_cb("update error"), req.ok_cb("update ok"));
    });

    test("update missing values", function() {
        stop();
        var style = model.style("simple", "a simple style", "lu", "<a>${a}</a>", {});
        style._id = req.id;
        style._rev = req.rev;
        req.update(style, req.error_cb("update error"), req.ok_cb("update ok"));
    });

    test("delete style", function() {
        stop();
        req.remove(req.id, req.rev, req.ok_cb("delete ok"), req.error_cb("delete error"));
    });
}
