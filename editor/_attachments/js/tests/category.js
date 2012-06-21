function test_category() {
    module("category");

    test("create category", function() {
        stop();
        var category = model.category("navegador");
        category.items.push(model.categoryItem("Internet Explorer", "Internet Explorer"));
        category.items.push(model.categoryItem("Firefox", "Mozilla Firefox"));
        category.items.push(model.categoryItem("Opera", "Opera"));

        req.create(category, req.ok_cb("create ok"), req.error_cb("create error"));
    });

    test("create category short name", function() {
        stop();
        var category = model.category("na");
        category.items.push(model.categoryItem("Internet Explorer", "Internet Explorer"));
        category.items.push(model.categoryItem("Firefox", "Mozilla Firefox"));
        category.items.push(model.categoryItem("Opera", "Opera"));

        req.create(category, req.error_cb("create error"), req.ok_cb("create ok"));
    });

    test("create category invalid allowEmptySelection", function() {
        stop();
        var category = model.category("navegador", 9);
        category.items.push(model.categoryItem("Internet Explorer", "Internet Explorer"));
        category.items.push(model.categoryItem("Firefox", "Mozilla Firefox"));
        category.items.push(model.categoryItem("Opera", "Opera"));

        req.create(category, req.error_cb("create error"), req.ok_cb("create ok"));
    });

    test("create category invalid allowMultipleSelection", function() {
        stop();
        var category = model.category("navegador", true, "true");
        category.items.push(model.categoryItem("Internet Explorer", "Internet Explorer"));
        category.items.push(model.categoryItem("Firefox", "Mozilla Firefox"));
        category.items.push(model.categoryItem("Opera", "Opera"));

        req.create(category, req.error_cb("create error"), req.ok_cb("create ok"));
    });


    test("create category few options", function() {
        stop();
        var category = model.category("navegadores");
        category.items.push(model.categoryItem("Internet Explorer", "Internet Explorer"));

        req.create(category, req.error_cb("create error"), req.ok_cb("create ok"));
    });

    test("create category short item name", function() {
        stop();
        var category = model.category("navegadores");
        category.items.push(model.categoryItem("IE", "Internet Explorer"));
        category.items.push(model.categoryItem("Firefox", "Mozilla Firefox"));
        category.items.push(model.categoryItem("Opera", "Opera"));

        req.create(category, req.error_cb("create error"), req.ok_cb("create ok"));
    });

    test("create category short item description", function() {
        stop();
        var category = model.category("navegadores");
        category.items.push(model.categoryItem("Internet Explorer", "IE"));
        category.items.push(model.categoryItem("Firefox", "Mozilla Firefox"));
        category.items.push(model.categoryItem("Opera", "Opera"));

        req.create(category, req.error_cb("create error"), req.ok_cb("create ok"));
    });

    test("create category invalid item", function() {
        stop();
        var category = model.category("navegadores");
        category.items.push(model.categoryItem("Internet Explorer", "Internet Explorer"));
        category.items.push("asd");

        req.create(category, req.error_cb("create error"), req.ok_cb("create ok"));
    });

    test("create category invalid name", function() {
        stop();
        var category = model.category(10);
        category.items.push(model.categoryItem("Internet Explorer", "Internet Explorer"));
        category.items.push(model.categoryItem("Firefox", "Mozilla Firefox"));
        category.items.push(model.categoryItem("Opera", "Opera"));

        req.create(category, req.error_cb("create error"), req.ok_cb("create ok"));
    });


    test("create category invalid item name", function() {
        stop();
        var category = model.category("navegadores");
        category.items.push(model.categoryItem(9, "Internet Explorer"));
        category.items.push(model.categoryItem("Firefox", "Mozilla Firefox"));
        category.items.push(model.categoryItem("Opera", "Opera"));

        req.create(category, req.error_cb("create error"), req.ok_cb("create ok"));
    });

    test("create category invalid item description", function() {
        stop();
        var category = model.category("navegadores");
        category.items.push(model.categoryItem("Internet explorer", 9));
        category.items.push(model.categoryItem("Firefox", "Mozilla Firefox"));
        category.items.push(model.categoryItem("Opera", "Opera"));

        req.create(category, req.error_cb("create error"), req.ok_cb("create ok"));
    });

    // update

    test("update category", function() {
        stop();
        var category = model.category("navegadores");
        category._id = req.id;
        category._rev = req.rev;
        category.items.push(model.categoryItem("MS Internet Explorer", "Internet Explorer"));
        category.items.push(model.categoryItem("Mozilla Firefox", "Mozilla Firefox"));
        category.items.push(model.categoryItem("Opera", "Opera"));

        req.update(category, req.ok_cb("update ok"), req.error_cb("update error"));
    });

    test("update category short name", function() {
        stop();
        var category = model.category("na");
        category._id = req.id;
        category._rev = req.rev;
        category.items.push(model.categoryItem("Internet Explorer", "Internet Explorer"));
        category.items.push(model.categoryItem("Firefox", "Mozilla Firefox"));
        category.items.push(model.categoryItem("Opera", "Opera"));

        req.update(category, req.error_cb("update error"), req.ok_cb("update ok"));
    });

    test("update category invalid allowEmptySelection", function() {
        stop();
        var category = model.category("navegador", 9);
        category._id = req.id;
        category._rev = req.rev;
        category.items.push(model.categoryItem("Internet Explorer", "Internet Explorer"));
        category.items.push(model.categoryItem("Firefox", "Mozilla Firefox"));
        category.items.push(model.categoryItem("Opera", "Opera"));

        req.update(category, req.error_cb("update error"), req.ok_cb("update ok"));
    });

    test("update category invalid allowMultipleSelection", function() {
        stop();
        var category = model.category("navegador", true, "true");
        category._id = req.id;
        category._rev = req.rev;
        category.items.push(model.categoryItem("Internet Explorer", "Internet Explorer"));
        category.items.push(model.categoryItem("Firefox", "Mozilla Firefox"));
        category.items.push(model.categoryItem("Opera", "Opera"));

        req.update(category, req.error_cb("update error"), req.ok_cb("update ok"));
    });


    test("update category few options", function() {
        stop();
        var category = model.category("navegadores");
        category._id = req.id;
        category._rev = req.rev;
        category.items.push(model.categoryItem("Internet Explorer", "Internet Explorer"));

        req.update(category, req.error_cb("update error"), req.ok_cb("update ok"));
    });

    test("update category short item name", function() {
        stop();
        var category = model.category("navegadores");
        category._id = req.id;
        category._rev = req.rev;
        category.items.push(model.categoryItem("IE", "Internet Explorer"));
        category.items.push(model.categoryItem("Firefox", "Mozilla Firefox"));
        category.items.push(model.categoryItem("Opera", "Opera"));

        req.update(category, req.error_cb("update error"), req.ok_cb("update ok"));
    });

    test("update category short item description", function() {
        stop();
        var category = model.category("navegadores");
        category._id = req.id;
        category._rev = req.rev;
        category.items.push(model.categoryItem("Internet Explorer", "IE"));
        category.items.push(model.categoryItem("Firefox", "Mozilla Firefox"));
        category.items.push(model.categoryItem("Opera", "Opera"));

        req.update(category, req.error_cb("update error"), req.ok_cb("update ok"));
    });

    test("update category invalid item", function() {
        stop();
        var category = model.category("navegadores");
        category._id = req.id;
        category._rev = req.rev;
        category.items.push(model.categoryItem("Internet Explorer", "Internet Explorer"));
        category.items.push("asd");

        req.update(category, req.error_cb("update error"), req.ok_cb("update ok"));
    });

    test("update category invalid name", function() {
        stop();
        var category = model.category(10);
        category._id = req.id;
        category._rev = req.rev;
        category.items.push(model.categoryItem("Internet Explorer", "Internet Explorer"));
        category.items.push(model.categoryItem("Firefox", "Mozilla Firefox"));
        category.items.push(model.categoryItem("Opera", "Opera"));

        req.update(category, req.error_cb("update error"), req.ok_cb("update ok"));
    });


    test("update category invalid item name", function() {
        stop();
        var category = model.category("navegadores");
        category._id = req.id;
        category._rev = req.rev;
        category.items.push(model.categoryItem(9, "Internet Explorer"));
        category.items.push(model.categoryItem("Firefox", "Mozilla Firefox"));
        category.items.push(model.categoryItem("Opera", "Opera"));

        req.update(category, req.error_cb("update error"), req.ok_cb("update ok"));
    });

    test("update category invalid item description", function() {
        stop();
        var category = model.category("navegadores");
        category._id = req.id;
        category._rev = req.rev;
        category.items.push(model.categoryItem("Internet explorer", false));
        category.items.push(model.categoryItem("Firefox", "Mozilla Firefox"));
        category.items.push(model.categoryItem("Opera", "Opera"));

        req.update(category, req.error_cb("update error"), req.ok_cb("update ok"));
    });

    // get

    test("get category", function() {
        stop();
        var on_get_ok = function (response) {
            var category = model.category("navegadores");
            category._id = req.id;
            category._rev = req.rev;
            category.items.push(model.categoryItem("MS Internet Explorer", "Internet Explorer"));
            category.items.push(model.categoryItem("Mozilla Firefox", "Mozilla Firefox"));
            category.items.push(model.categoryItem("Opera", "Opera"));

            start();
            req.test_compare_equal(category, response, ["name", "allowMultipleSelection", "allowEmptySelection", "items"]);
        };
        req.view(req.id, on_get_ok, req.error_cb("get error"));
    });

    test("view categories", function() {
        stop();
        req.view("_design/fresita/_view/categories", req.ok_cb("view ok", true), req.error_cb("get error"));
    });

    test("search category", function() {
        stop();
        req.view("_fti/fresita/categories?q=Navegadores", req.ok_cb("view ok", true), req.error_cb("get error"));
    });
}
