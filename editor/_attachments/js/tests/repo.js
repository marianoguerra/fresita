function test_repo() {
    module("repo");

    test("create", function() {
        stop();
        var repo = model.repo('Origin', '10.230.42.196');
        req.create(repo, req.ok_cb("create ok"), req.error_cb("create error"));
    });

    test("create empty name", function() {
        stop();
        var repo = model.repo('', '10.230.42.196');
        req.create(repo, req.error_cb("create ok"), req.ok_cb("create error"));
    });

    test("create empty address", function() {
        stop();
        var repo = model.repo('Origin', '');
        req.create(repo, req.error_cb("create ok"), req.ok_cb("create error"));
    });

    test("create incomplete address", function() {
        stop();
        var repo = model.repo('Origin', '10.230.42.');
        req.create(repo, req.error_cb("create ok"), req.ok_cb("create error"));
    });

    test("create invalid address", function() {
        stop();
        var repo = model.repo('Origin', 'not an ip');
        req.create(repo, req.error_cb("create ok"), req.ok_cb("create error"));
    });

    test("create invalid address 1", function() {
        stop();
        var repo = model.repo('Origin', '300.260.120.32');
        repo._id = req.id;
        repo._rev= req.rev;
        req.create(repo, req.error_cb("create ok"), req.ok_cb("create error"));
    });

    test("update", function() {
        stop();
        var repo = model.repo('Origin', '10.230.42.196');
        repo._id = req.id;
        repo._rev= req.rev;
        req.update(repo, req.ok_cb("update ok"), req.error_cb("update error"));
    });

    test("update empty name", function() {
        stop();
        var repo = model.repo('', '10.230.42.196');
        repo._id = req.id;
        repo._rev= req.rev;
        req.update(repo, req.error_cb("update ok"), req.ok_cb("update error"));
    });

    test("update empty address", function() {
        stop();
        var repo = model.repo('Origin', '');
        repo._id = req.id;
        repo._rev= req.rev;
        req.update(repo, req.error_cb("update ok"), req.ok_cb("update error"));
    });

    test("update incomplete address", function() {
        stop();
        var repo = model.repo('Origin', '10.230.42.');
        repo._id = req.id;
        repo._rev= req.rev;
        req.update(repo, req.error_cb("update ok"), req.ok_cb("update error"));
    });

    test("update invalid address", function() {
        stop();
        var repo = model.repo('Origin', 'not an ip');
        repo._id = req.id;
        repo._rev= req.rev;
        req.update(repo, req.error_cb("update ok"), req.ok_cb("update error"));
    });

    test("update invalid address 1", function() {
        stop();
        var repo = model.repo('Origin', '300.260.120.32');
        repo._id = req.id;
        repo._rev= req.rev;
        req.update(repo, req.error_cb("update ok"), req.ok_cb("update error"));
    });

    test("search repo", function() {
        stop();
        req.view("_fti/fresita/repos?q=Origin", req.ok_cb("view ok", true), req.error_cb("get error"));
    });

    test("delete repo", function() {
        stop();
        req.remove(req.id, req.rev, req.ok_cb("delete ok"), req.error_cb("delete error"));
    });
}
