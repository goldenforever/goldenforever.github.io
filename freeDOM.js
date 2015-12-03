document.addEventListener("DOMContentLoaded", function() {    document.body.className += " body";    // defines source types    var tagTypes = [        { // 0 = external js            0: "script",            "type": "text/javascript",            "src": ""        },        { // 1 = external css            0: "link",            "rel": "stylesheet",            "type": "text/css",            "href": ""        },        { // 2 = meta tagTypes            0: "meta",            "name": "",            "content": ""        }    ];    // load an array of sources    function loadSources(sources) {        var tagToAdd, args, tagInfo, tagKeys, val, count;        for (var i=0; i<sources.length; i++) {            count = 0;            args = sources[i];            tagInfo = tagTypes[args[0]];            tagToAdd = document.createElement(tagInfo[0]);            tagKeys = Object.getOwnPropertyNames(tagInfo);            for (var j=0; j<tagKeys.length; j++) {                if (tagKeys[j] != 0) {                    val = tagInfo[tagKeys[j]];                    tagToAdd[tagKeys[j]] = val ? val : args[1+(count++)];                }            }            document.head.insertBefore(tagToAdd, document.head.firstChild);        }    }    var charset = document.createElement("meta");    charset.setAttribute("charset", "UTF-8");    document.head.insertBefore(charset, document.head.firstChild);    // Essential sources    loadSources([        [0,'marked.js'],        [0,'https://cdn.jsdelivr.net/jquery/3.0.0-alpha1/jquery.min.js'],        [1,'style.css'],        [2,'viewport', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no']    ]);    // Defer module    function defer(method, str) {        if (eval(str)) return method(); else setTimeout(function() { defer(method, str) }, 1);    }    defer(function() {        defer(function() {            window.onhashchange = changePage(window.location.hash.replace("#",""));            var pageCodeAddress = document.getElementsByTagName("html")[0].getAttribute("md").trim();            $.get(pageCodeAddress, function (data) {                window.markdownCode = data;                loadSources([                    [0, 'https://cdn.jsdelivr.net/highlight.js/8.9.1/highlight.min.js'],                    [0, 'https://cdnjs.cloudflare.com/ajax/libs/less.js/2.5.3/less.min.js'],                    [1, 'https://fonts.googleapis.com/css?family=Open+Sans:400,700'],                    [1, 'https://fonts.googleapis.com/css?family=Inconsolata:400,700'],                    [1, 'https://cdn.jsdelivr.net/fontawesome/4.5.0/css/font-awesome.min.css']                ]);                $('body').html(marked(data));                // Menus pre-set to first one                $('nav :first-child').trigger("click");                // If there's a hash, open it                var hash = window.location.hash.replace('#', '');                if (hash.length > 0) {                    changePage(hash);                }                defer(function() {                    $('pre code').each(function (i, block) {                        hljs.highlightBlock(block);                    });                    /* Fix #doc */                    /* Generate vertical <th> from double bar */                    var table = $('table');                    for (var i = 0; i < table.length; i++) {                        var rows = $(table[i]).find('tr');                        var cols = rows ? $(rows[0]).children().length : 0;                        var len = cols;                        var tmp = [];                        while (cols > 0) {                            tmp.push(true);                            cols--;                        }                        for (var j = 0; j < rows.length; j++) {                            var cells = $(rows[j]).children();                            for (var k = 0; k < cells.length; k++) {                                if (!tmp[k] || cells[k].innerHTML.trim().length > 0) {                                    tmp[k] = false;                                }                            }                        }                        var indices = [];                        for (var j = 0; j < len - 1; j++) {                            if (tmp[j]) indices.push(j);                        }                        //change to tr                        for (var j = 0; j < rows.length; j++) {                            for (var k = indices.length - 1; k >= 0; k--) {                                var cell = $(rows[j]).children()[indices[k]];                                $(cell).remove();                                if (indices[k] > 0) {                                    cell = $(rows[j]).children()[indices[k] - 1];                                    if (cell.tagName !== "TH") {                                        $(cell).replaceWith(cell.outerHTML.replace(/<td/, "<th").replace(/\\td>/, "\\th>"));                                    } else {                                        $(cell).addClass("doubleheader");                                    }                                }                            }                        }                    }                }, "window.hljs");            });        }, "window.marked");    }, "window.jQuery");});