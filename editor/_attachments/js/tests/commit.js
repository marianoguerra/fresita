function test_commit() {
    var created = req.date(), document = model.document("oh hai", "hello world");
    module("commit");

    test("commit", function() {
        stop();
        var commit = model.commit("asddsa", "luismarianoguerra@gmail.com", "first commit", created, document);
        req.create(commit, req.ok_cb("create ok"), req.error_cb("create error"));
    });

    test("modify commit fail", function() {
        stop();
        var commit = model.commit("asddsa", "luismarianoguerra@gmail.com", "first commit modified", created, document);
        commit._id = req.id;
        commit._rev= req.rev;
        req.update(commit, req.error_cb("modify fail ok"), req.ok_cb("modify error"));
    });

    test("delete commit fail", function() {
        stop();
        req.delete_(req.id, req.error_cb("delete fail ok"), req.ok_cb("delete error"));
    });
}
