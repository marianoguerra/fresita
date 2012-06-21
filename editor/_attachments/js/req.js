var req = {};

req.base = "";
req.id = null;
req.rev = null;
req.uuids = null;
req.user = null;

req.request = function(type, url, success, error) {
    if (url.substr(0, 1) !== "/") {
        url = req.base + url;
    }

    $.ajax({
        "type": type,
        "url": url,
        "dataType": "json",
        "success": success,
        "error": error
    });
};

req.request_data = function(type, url, data, success, error) {
    data = JSON.stringify(data);
    if (url.substr(0, 1) !== "/") {
        url = req.base + url;
    }

    $.ajax({
        "type": type,
        "contentType": "application/json",
        "url": url,
        "data": data,
        "dataType": "json",
        "success": success,
        "error": error
    });
};

// REST methods

req.post = function (url, data, success, error) {
    req.request_data("POST", url, data, success, error);
};

req.put = function (url, data, success, error) {
    req.request_data("PUT", url, data, success, error);
};

req.delete_ = function (url, success, error) {
    req.request("DELETE", url, success, error);
};

req.get = function (url, success, error) {
    req.request("GET", url, success, error);
};

// document methods

req.create = function (docobj, success, error) {
    req.post("", docobj, success, error);
};

req.update = function (docobj, success, error) {
    req.put(docobj._id, docobj, success, error);
};

req.remove = function (id, rev, success, error) {
    req.delete_(id + "?rev=" + rev, success, error);
};

req.view = function (id, success, error) {
    req.get(id, success, error);
};

req.replicate = function (dest, success, error) {
    req.post("../_replicate", {'source': dest, 'target': req.base.replace(/\//g, "")}, success, error);
};

// auth methods

req.get_user = function (success, error) {
    req.get("/_session/", success, error);
};

req.new_user = function (user, pass, success, error) {
    req.put("/_config/admins/" + user, pass, success, error);
};

req.logout = function (success, error) {
    req.delete_("/_session/" + req.user, success, error);
};

// utils

req.get_uuids = function (callback) {
    req.get('../_uuids?count=50', function (response) {
        req.uuids = response.uuids;

        if (callback) {
            callback();
        }
    }, req.get_uuids);
};

req.get_uuid = function () {
    var uuid = req.uuids.pop();

    if (req.uuids.length === 1) {
        req.get_uuids();
    }

    return uuid;
};

req.date = function (timestamp) {
    var d = new Date();
    f = function (n) {    // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    return d.getUTCFullYear()   + '/' +
        f(d.getUTCMonth() + 1) + '/' +
        f(d.getUTCDate())      + ' ' +
        f(d.getUTCHours())     + ':' +
        f(d.getUTCMinutes())   + ':' +
        f(d.getUTCSeconds())   + ' +0000';
};

// test helpers

req.test_compare_equal = function (docobj, docobj1, fields) {
    var field, index;

    for (index = 0; index < fields.length; index += 1) {
        field = fields[index];
        field1 = docobj[field];
        field2 = docobj1[field];

        if (typeof(field1) == "object") {
            field1 = JSON.stringify(field1);
            field2 = JSON.stringify(field2);
        }

        equals(field1, field2, field + ": " + field1 + " equals? " + field2);
    }
};

req.ok_cb = function(message, skip_id_and_rev) {
    return function(response) {
        if (!skip_id_and_rev && response.id && response.rev) {
            req.id = response.id;
            req.rev = response.rev;
        }
        start();
        ok(true, message);
    };
};

req.error_cb = function(message) {
    return function(response) {
        start();
        ok(false, message + ": " + response.responseText);
    };
};

