window.ajax = {};
ajax.getInstance = function () {
    if (typeof XMLHttpRequest !== 'undefined') {
        return new XMLHttpRequest();
    }

    var versions = [
        "MSXML2.XmlHttp.6.0",
        "MSXML2.XmlHttp.5.0",
        "MSXML2.XmlHttp.4.0",
        "MSXML2.XmlHttp.3.0",
        "MSXML2.XmlHttp.2.0",
        "Microsoft.XmlHttp"
    ];

    var xhr;
    for (var i = 0; i < versions.length; i++) {
        try {
            xhr = new ActiveXObject(versions[i]);
            break;
        } catch (e) {
        }
    }
    return xhr;
};

ajax.send = function (url, callback, method, data, additionalHeaders) {
    additionalHeaders = {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9"
    };

    var x = ajax.getInstance();

    x.open(method, url, true);

    x.onreadystatechange = function () {
        if (x.readyState == 4) {
            callback(x.responseText)
        }
    };

    if (method == 'POST') {
        x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    } else {
        x.setRequestHeader('Content-type', 'text/plain');
    }

    if (additionalHeaders) {
        for (var key in additionalHeaders) {
            if (additionalHeaders.hasOwnProperty(key)) {
                x.setRequestHeader(key, additionalHeaders[key]);
            }
        }


    }

    x.send(data)
};

ajax.get = function (url, data, callback) {
    let query = [];

    for (let key in data) {
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }

    ajax.send(url + (query.length ? '?' + query.join('&') : ''), callback, 'GET');
};

ajax.post = function (url, data, callback) {
    let query = [];

    for (let key in data) {
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }

    ajax.send(url, callback, 'POST', query.join('&'));
};