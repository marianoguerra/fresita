function test_common() {
    module("common");

    test("new invalid type", function() {
        stop();
        req.create({}, req.error_cb("create error ok"), req.ok_cb("create error"));
    });
}
