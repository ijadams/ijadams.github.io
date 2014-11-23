edia_url = 'https://laxart-media.s3.amazonaws.com/';
static_url = '/static/';
(function(window, undefined) {
    var jQuery = function(selector, context) {
            return new jQuery.fn.init(selector, context);
        },
        _jQuery = window.jQuery,
        _$ = window.$,
        document = window.document,
        rootjQuery, quickExpr = /^[^<]*(<[\w\W]+>)[^>]*$|^#([\w-]+)$/,
        isSimple = /^.[^:#\[\.,]*$/,
        rnotwhite = /\S/,
        rtrim = /^(\s|\u00A0)+|(\s|\u00A0)+$/g,
        rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,
        userAgent = navigator.userAgent,
        browserMatch, readyBound = false,
        readyList = [],
        DOMContentLoaded, toString = Object.prototype.toString,
        hasOwnProperty = Object.prototype.hasOwnProperty,
        push = Array.prototype.push,
        slice = Array.prototype.slice,
        indexOf = Array.prototype.indexOf;
    jQuery.fn = jQuery.prototype = {
        init: function(selector, context) {
            var match, elem, ret, doc;
            if (!selector) {
                return this;
            }
            if (selector.nodeType) {
                this.context = this[0] = selector;
                this.length = 1;
                return this;
            }
            if (typeof selector === "string") {
                match = quickExpr.exec(selector);
                if (match && (match[1] || !context)) {
                    if (match[1]) {
                        doc = (context ? context.ownerDocument || context : document);
                        ret = rsingleTag.exec(selector);
                        if (ret) {
                            if (jQuery.isPlainObject(context)) {
                                selector = [document.createElement(ret[1])];
                                jQuery.fn.attr.call(selector, context, true);
                            } else {
                                selector = [doc.createElement(ret[1])];
                            }
                        } else {
                            ret = buildFragment([match[1]], [doc]);
                            selector = (ret.cacheable ? ret.fragment.cloneNode(true) : ret.fragment).childNodes;
                        }
                    } else {
                        elem = document.getElementById(match[2]);
                        if (elem) {
                            if (elem.id !== match[2]) {
                                return rootjQuery.find(selector);
                            }
                            this.length = 1;
                            this[0] = elem;
                        }
                        this.context = document;
                        this.selector = selector;
                        return this;
                    }
                } else if (!context && /^\w+$/.test(selector)) {
                    this.selector = selector;
                    this.context = document;
                    selector = document.getElementsByTagName(selector);
                } else if (!context || context.jquery) {
                    return (context || rootjQuery).find(selector);
                } else {
                    return jQuery(context).find(selector);
                }
            } else if (jQuery.isFunction(selector)) {
                return rootjQuery.ready(selector);
            }
            if (selector.selector !== undefined) {
                this.selector = selector.selector;
                this.context = selector.context;
            }
            return jQuery.isArray(selector) ? this.setArray(selector) : jQuery.makeArray(selector, this);
        },
        selector: "",
        jquery: "1.4",
        length: 0,
        size: function() {
            return this.length;
        },
        toArray: function() {
            return slice.call(this, 0);
        },
        get: function(num) {
            return num == null ? this.toArray() : (num < 0 ? this.slice(num)[0] : this[num]);
        },
        pushStack: function(elems, name, selector) {
            var ret = jQuery(elems || null);
            ret.prevObject = this;
            ret.context = this.context;
            if (name === "find") {
                ret.selector = this.selector + (this.selector ? " " : "") + selector;
            } else if (name) {
                ret.selector = this.selector + "." + name + "(" + selector + ")";
            }
            return ret;
        },
        setArray: function(elems) {
            this.length = 0;
            push.apply(this, elems);
            return this;
        },
        each: function(callback, args) {
            return jQuery.each(this, callback, args);
        },
        ready: function(fn) {
            jQuery.bindReady();
            if (jQuery.isReady) {
                fn.call(document, jQuery);
            } else if (readyList) {
                readyList.push(fn);
            }
            return this;
        },
        eq: function(i) {
            return i === -1 ? this.slice(i) : this.slice(i, +i + 1);
        },
        first: function() {
            return this.eq(0);
        },
        last: function() {
            return this.eq(-1);
        },
        slice: function() {
            return this.pushStack(slice.apply(this, arguments), "slice", slice.call(arguments).join(","));
        },
        map: function(callback) {
            return this.pushStack(jQuery.map(this, function(elem, i) {
                return callback.call(elem, i, elem);
            }));
        },
        end: function() {
            return this.prevObject || jQuery(null);
        },
        push: push,
        sort: [].sort,
        splice: [].splice
    };
    jQuery.fn.init.prototype = jQuery.fn;
    jQuery.extend = jQuery.fn.extend = function() {
        var target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false,
            options, name, src, copy;
        if (typeof target === "boolean") {
            deep = target;
            target = arguments[1] || {};
            i = 2;
        }
        if (typeof target !== "object" && !jQuery.isFunction(target)) {
            target = {};
        }
        if (length === i) {
            target = this;
            --i;
        }
        for (; i < length; i++) {
            if ((options = arguments[i]) != null) {
                for (name in options) {
                    src = target[name];
                    copy = options[name];
                    if (target === copy) {
                        continue;
                    }
                    if (deep && copy && (jQuery.isPlainObject(copy) || jQuery.isArray(copy))) {
                        var clone = src && (jQuery.isPlainObject(src) || jQuery.isArray(src)) ? src : jQuery.isArray(copy) ? [] : {};
                        target[name] = jQuery.extend(deep, clone, copy);
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }
        return target;
    };
    jQuery.extend({
        noConflict: function(deep) {
            window.$ = _$;
            if (deep) {
                window.jQuery = _jQuery;
            }
            return jQuery;
        },
        isReady: false,
        ready: function() {
            if (!jQuery.isReady) {
                if (!document.body) {
                    return setTimeout(jQuery.ready, 13);
                }
                jQuery.isReady = true;
                if (readyList) {
                    var fn, i = 0;
                    while ((fn = readyList[i++])) {
                        fn.call(document, jQuery);
                    }
                    readyList = null;
                }
                if (jQuery.fn.triggerHandler) {
                    jQuery(document).triggerHandler("ready");
                }
            }
        },
        bindReady: function() {
            if (readyBound) {
                return;
            }
            readyBound = true;
            if (document.readyState === "complete") {
                return jQuery.ready();
            }
            if (document.addEventListener) {
                document.addEventListener("DOMContentLoaded", DOMContentLoaded, false);
                window.addEventListener("load", jQuery.ready, false);
            } else if (document.attachEvent) {
                document.attachEvent("onreadystatechange", DOMContentLoaded);
                window.attachEvent("onload", jQuery.ready);
                var toplevel = false;
                try {
                    toplevel = window.frameElement == null;
                } catch (e) {}
                if (document.documentElement.doScroll && toplevel) {
                    doScrollCheck();
                }
            }
        },
        isFunction: function(obj) {
            return toString.call(obj) === "[object Function]";
        },
        isArray: function(obj) {
            return toString.call(obj) === "[object Array]";
        },
        isPlainObject: function(obj) {
            if (!obj || toString.call(obj) !== "[object Object]" || obj.nodeType || obj.setInterval) {
                return false;
            }
            if (obj.constructor && !hasOwnProperty.call(obj, "constructor") && !hasOwnProperty.call(obj.constructor.prototype, "isPrototypeOf")) {
                return false;
            }
            var key;
            for (key in obj) {}
            return key === undefined || hasOwnProperty.call(obj, key);
        },
        isEmptyObject: function(obj) {
            for (var name in obj) {
                return false;
            }
            return true;
        },
        noop: function() {},
        globalEval: function(data) {
            if (data && rnotwhite.test(data)) {
                var head = document.getElementsByTagName("head")[0] || document.documentElement,
                    script = document.createElement("script");
                script.type = "text/javascript";
                if (jQuery.support.scriptEval) {
                    script.appendChild(document.createTextNode(data));
                } else {
                    script.text = data;
                }
                head.insertBefore(script, head.firstChild);
                head.removeChild(script);
            }
        },
        nodeName: function(elem, name) {
            return elem.nodeName && elem.nodeName.toUpperCase() === name.toUpperCase();
        },
        each: function(object, callback, args) {
            var name, i = 0,
                length = object.length,
                isObj = length === undefined || jQuery.isFunction(object);
            if (args) {
                if (isObj) {
                    for (name in object) {
                        if (callback.apply(object[name], args) === false) {
                            break;
                        }
                    }
                } else {
                    for (; i < length;) {
                        if (callback.apply(object[i++], args) === false) {
                            break;
                        }
                    }
                }
            } else {
                if (isObj) {
                    for (name in object) {
                        if (callback.call(object[name], name, object[name]) === false) {
                            break;
                        }
                    }
                } else {
                    for (var value = object[0]; i < length && callback.call(value, i, value) !== false; value = object[++i]) {}
                }
            }
            return object;
        },
        trim: function(text) {
            return (text || "").replace(rtrim, "");
        },
        makeArray: function(array, results) {
            var ret = results || [];
            if (array != null) {
                if (array.length == null || typeof array === "string" || jQuery.isFunction(array) || (typeof array !== "function" && array.setInterval)) {
                    push.call(ret, array);
                } else {
                    jQuery.merge(ret, array);
                }
            }
            return ret;
        },
        inArray: function(elem, array) {
            if (array.indexOf) {
                return array.indexOf(elem);
            }
            for (var i = 0, length = array.length; i < length; i++) {
                if (array[i] === elem) {
                    return i;
                }
            }
            return -1;
        },
        merge: function(first, second) {
            var i = first.length,
                j = 0;
            if (typeof second.length === "number") {
                for (var l = second.length; j < l; j++) {
                    first[i++] = second[j];
                }
            } else {
                while (second[j] !== undefined) {
                    first[i++] = second[j++];
                }
            }
            first.length = i;
            return first;
        },
        grep: function(elems, callback, inv) {
            var ret = [];
            for (var i = 0, length = elems.length; i < length; i++) {
                if (!inv !== !callback(elems[i], i)) {
                    ret.push(elems[i]);
                }
            }
            return ret;
        },
        map: function(elems, callback, arg) {
            var ret = [],
                value;
            for (var i = 0, length = elems.length; i < length; i++) {
                value = callback(elems[i], i, arg);
                if (value != null) {
                    ret[ret.length] = value;
                }
            }
            return ret.concat.apply([], ret);
        },
        guid: 1,
        proxy: function(fn, proxy, thisObject) {
            if (arguments.length === 2) {
                if (typeof proxy === "string") {
                    thisObject = fn;
                    fn = thisObject[proxy];
                    proxy = undefined;
                } else if (proxy && !jQuery.isFunction(proxy)) {
                    thisObject = proxy;
                    proxy = undefined;
                }
            }
            if (!proxy && fn) {
                proxy = function() {
                    return fn.apply(thisObject || this, arguments);
                };
            }
            if (fn) {
                proxy.guid = fn.guid = fn.guid || proxy.guid || jQuery.guid++;
            }
            return proxy;
        },
        uaMatch: function(ua) {
            var ret = {
                browser: ""
            };
            ua = ua.toLowerCase();
            if (/webkit/.test(ua)) {
                ret = {
                    browser: "webkit",
                    version: /webkit[\/ ]([\w.]+)/
                };
            } else if (/opera/.test(ua)) {
                ret = {
                    browser: "opera",
                    version: /version/.test(ua) ? /version[\/ ]([\w.]+)/ : /opera[\/ ]([\w.]+)/
                };
            } else if (/msie/.test(ua)) {
                ret = {
                    browser: "msie",
                    version: /msie ([\w.]+)/
                };
            } else if (/mozilla/.test(ua) && !/compatible/.test(ua)) {
                ret = {
                    browser: "mozilla",
                    version: /rv:([\w.]+)/
                };
            }
            ret.version = (ret.version && ret.version.exec(ua) || [0, "0"])[1];
            return ret;
        },
        browser: {}
    });
    browserMatch = jQuery.uaMatch(userAgent);
    if (browserMatch.browser) {
        jQuery.browser[browserMatch.browser] = true;
        jQuery.browser.version = browserMatch.version;
    }
    if (jQuery.browser.webkit) {
        jQuery.browser.safari = true;
    }
    if (indexOf) {
        jQuery.inArray = function(elem, array) {
            return indexOf.call(array, elem);
        };
    }
    rootjQuery = jQuery(document);
    if (document.addEventListener) {
        DOMContentLoaded = function() {
            document.removeEventListener("DOMContentLoaded", DOMContentLoaded, false);
            jQuery.ready();
        };
    } else if (document.attachEvent) {
        DOMContentLoaded = function() {
            if (document.readyState === "complete") {
                document.detachEvent("onreadystatechange", DOMContentLoaded);
                jQuery.ready();
            }
        };
    }

    function doScrollCheck() {
        if (jQuery.isReady) {
            return;
        }
        try {
            document.documentElement.doScroll("left");
        } catch (error) {
            setTimeout(doScrollCheck, 1);
            return;
        }
        jQuery.ready();
    }
    if (indexOf) {
        jQuery.inArray = function(elem, array) {
            return indexOf.call(array, elem);
        };
    }

    function evalScript(i, elem) {
        if (elem.src) {
            jQuery.ajax({
                url: elem.src,
                async: false,
                dataType: "script"
            });
        } else {
            jQuery.globalEval(elem.text || elem.textContent || elem.innerHTML || "");
        }
        if (elem.parentNode) {
            elem.parentNode.removeChild(elem);
        }
    }

    function access(elems, key, value, exec, fn, pass) {
        var length = elems.length;
        if (typeof key === "object") {
            for (var k in key) {
                access(elems, k, key[k], exec, fn, value);
            }
            return elems;
        }
        if (value !== undefined) {
            exec = exec && jQuery.isFunction(value);
            for (var i = 0; i < length; i++) {
                fn(elems[i], key, exec ? value.call(elems[i], i, fn(elems[i], key)) : value, pass);
            }
            return elems;
        }
        return length ? fn(elems[0], key) : null;
    }

    function now() {
            return (new Date).getTime();
        }
        (function() {
            jQuery.support = {};
            var root = document.documentElement,
                script = document.createElement("script"),
                div = document.createElement("div"),
                id = "script" + now();
            div.style.display = "none";
            div.innerHTML = "   <link/><table></table><a href='/a' style='color:red;float:left;opacity:.55;'>a</a><input type='checkbox'/>";
            var all = div.getElementsByTagName("*"),
                a = div.getElementsByTagName("a")[0];
            if (!all || !all.length || !a) {
                return;
            }
            jQuery.support = {
                leadingWhitespace: div.firstChild.nodeType === 3,
                tbody: !div.getElementsByTagName("tbody").length,
                htmlSerialize: !!div.getElementsByTagName("link").length,
                style: /red/.test(a.getAttribute("style")),
                hrefNormalized: a.getAttribute("href") === "/a",
                opacity: /^0.55$/.test(a.style.opacity),
                cssFloat: !!a.style.cssFloat,
                checkOn: div.getElementsByTagName("input")[0].value === "on",
                optSelected: document.createElement("select").appendChild(document.createElement("option")).selected,
                scriptEval: false,
                noCloneEvent: true,
                boxModel: null
            };
            script.type = "text/javascript";
            try {
                script.appendChild(document.createTextNode("window." + id + "=1;"));
            } catch (e) {}
            root.insertBefore(script, root.firstChild);
            if (window[id]) {
                jQuery.support.scriptEval = true;
                delete window[id];
            }
            root.removeChild(script);
            if (div.attachEvent && div.fireEvent) {
                div.attachEvent("onclick", function click() {
                    jQuery.support.noCloneEvent = false;
                    div.detachEvent("onclick", click);
                });
                div.cloneNode(true).fireEvent("onclick");
            }
            jQuery(function() {
                var div = document.createElement("div");
                div.style.width = div.style.paddingLeft = "1px";
                document.body.appendChild(div);
                jQuery.boxModel = jQuery.support.boxModel = div.offsetWidth === 2;
                document.body.removeChild(div).style.display = 'none';
                div = null;
            });
            var eventSupported = function(eventName) {
                var el = document.createElement("div");
                eventName = "on" + eventName;
                var isSupported = (eventName in el);
                if (!isSupported) {
                    el.setAttribute(eventName, "return;");
                    isSupported = typeof el[eventName] === "function";
                }
                el = null;
                return isSupported;
            };
            jQuery.support.submitBubbles = eventSupported("submit");
            jQuery.support.changeBubbles = eventSupported("change");
            root = script = div = all = a = null;
        })();
    jQuery.props = {
        "for": "htmlFor",
        "class": "className",
        readonly: "readOnly",
        maxlength: "maxLength",
        cellspacing: "cellSpacing",
        rowspan: "rowSpan",
        colspan: "colSpan",
        tabindex: "tabIndex",
        usemap: "useMap",
        frameborder: "frameBorder"
    };
    var expando = "jQuery" + now(),
        uuid = 0,
        windowData = {};
    var emptyObject = {};
    jQuery.extend({
        cache: {},
        expando: expando,
        noData: {
            "embed": true,
            "object": true,
            "applet": true
        },
        data: function(elem, name, data) {
            if (elem.nodeName && jQuery.noData[elem.nodeName.toLowerCase()]) {
                return;
            }
            elem = elem == window ? windowData : elem;
            var id = elem[expando],
                cache = jQuery.cache,
                thisCache;
            if (!name && !id) {
                return null;
            }
            if (!id) {
                id = ++uuid;
            }
            if (typeof name === "object") {
                elem[expando] = id;
                thisCache = cache[id] = jQuery.extend(true, {}, name);
            } else if (cache[id]) {
                thisCache = cache[id];
            } else if (typeof data === "undefined") {
                thisCache = emptyObject;
            } else {
                thisCache = cache[id] = {};
            }
            if (data !== undefined) {
                elem[expando] = id;
                thisCache[name] = data;
            }
            return typeof name === "string" ? thisCache[name] : thisCache;
        },
        removeData: function(elem, name) {
            if (elem.nodeName && jQuery.noData[elem.nodeName.toLowerCase()]) {
                return;
            }
            elem = elem == window ? windowData : elem;
            var id = elem[expando],
                cache = jQuery.cache,
                thisCache = cache[id];
            if (name) {
                if (thisCache) {
                    delete thisCache[name];
                    if (jQuery.isEmptyObject(thisCache)) {
                        jQuery.removeData(elem);
                    }
                }
            } else {
                try {
                    delete elem[expando];
                } catch (e) {
                    if (elem.removeAttribute) {
                        elem.removeAttribute(expando);
                    }
                }
                delete cache[id];
            }
        }
    });
    jQuery.fn.extend({
        data: function(key, value) {
            if (typeof key === "undefined" && this.length) {
                return jQuery.data(this[0]);
            } else if (typeof key === "object") {
                return this.each(function() {
                    jQuery.data(this, key);
                });
            }
            var parts = key.split(".");
            parts[1] = parts[1] ? "." + parts[1] : "";
            if (value === undefined) {
                var data = this.triggerHandler("getData" + parts[1] + "!", [parts[0]]);
                if (data === undefined && this.length) {
                    data = jQuery.data(this[0], key);
                }
                return data === undefined && parts[1] ? this.data(parts[0]) : data;
            } else {
                return this.trigger("setData" + parts[1] + "!", [parts[0], value]).each(function() {
                    jQuery.data(this, key, value);
                });
            }
        },
        removeData: function(key) {
            return this.each(function() {
                jQuery.removeData(this, key);
            });
        }
    });
    jQuery.extend({
        queue: function(elem, type, data) {
            if (!elem) {
                return;
            }
            type = (type || "fx") + "queue";
            var q = jQuery.data(elem, type);
            if (!data) {
                return q || [];
            }
            if (!q || jQuery.isArray(data)) {
                q = jQuery.data(elem, type, jQuery.makeArray(data));
            } else {
                q.push(data);
            }
            return q;
        },
        dequeue: function(elem, type) {
            type = type || "fx";
            var queue = jQuery.queue(elem, type),
                fn = queue.shift();
            if (fn === "inprogress") {
                fn = queue.shift();
            }
            if (fn) {
                if (type === "fx") {
                    queue.unshift("inprogress");
                }
                fn.call(elem, function() {
                    jQuery.dequeue(elem, type);
                });
            }
        }
    });
    jQuery.fn.extend({
        queue: function(type, data) {
            if (typeof type !== "string") {
                data = type;
                type = "fx";
            }
            if (data === undefined) {
                return jQuery.queue(this[0], type);
            }
            return this.each(function(i, elem) {
                var queue = jQuery.queue(this, type, data);
                if (type === "fx" && queue[0] !== "inprogress") {
                    jQuery.dequeue(this, type);
                }
            });
        },
        dequeue: function(type) {
            return this.each(function() {
                jQuery.dequeue(this, type);
            });
        },
        delay: function(time, type) {
            time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
            type = type || "fx";
            return this.queue(type, function() {
                var elem = this;
                setTimeout(function() {
                    jQuery.dequeue(elem, type);
                }, time);
            });
        },
        clearQueue: function(type) {
            return this.queue(type || "fx", []);
        }
    });
    var fcleanup = function(nm) {
        return nm.replace(/[^\w\s\.\|`]/g, function(ch) {
            return "\\" + ch;
        });
    };
    jQuery.event = {
        add: function(elem, types, handler, data) {
            if (elem.nodeType === 3 || elem.nodeType === 8) {
                return;
            }
            if (elem.setInterval && (elem !== window && !elem.frameElement)) {
                elem = window;
            }
            if (!handler.guid) {
                handler.guid = jQuery.guid++;
            }
            if (data !== undefined) {
                var fn = handler;
                handler = jQuery.proxy(fn);
                handler.data = data;
            }
            var events = jQuery.data(elem, "events") || jQuery.data(elem, "events", {}),
                handle = jQuery.data(elem, "handle"),
                eventHandle;
            if (!handle) {
                eventHandle = function() {
                    return typeof jQuery !== "undefined" && !jQuery.event.triggered ? jQuery.event.handle.apply(eventHandle.elem, arguments) : undefined;
                };
                handle = jQuery.data(elem, "handle", eventHandle);
            }
            handle.elem = elem;
            types = types.split(/\s+/);
            var type, i = 0;
            while ((type = types[i++])) {
                var namespaces = type.split(".");
                type = namespaces.shift();
                handler.type = namespaces.slice(0).sort().join(".");
                var handlers = events[type],
                    special = this.special[type] || {};
                if (!handlers) {
                    handlers = events[type] = {};
                    if (!special.setup || special.setup.call(elem, data, namespaces, handler) === false) {
                        if (elem.addEventListener) {
                            elem.addEventListener(type, handle, false);
                        } else if (elem.attachEvent) {
                            elem.attachEvent("on" + type, handle);
                        }
                    }
                }
                if (special.add) {
                    var modifiedHandler = special.add.call(elem, handler, data, namespaces, handlers);
                    if (modifiedHandler && jQuery.isFunction(modifiedHandler)) {
                        modifiedHandler.guid = modifiedHandler.guid || handler.guid;
                        handler = modifiedHandler;
                    }
                }
                handlers[handler.guid] = handler;
                this.global[type] = true;
            }
            elem = null;
        },
        global: {},
        remove: function(elem, types, handler) {
            if (elem.nodeType === 3 || elem.nodeType === 8) {
                return;
            }
            var events = jQuery.data(elem, "events"),
                ret, type, fn;
            if (events) {
                if (types === undefined || (typeof types === "string" && types.charAt(0) === ".")) {
                    for (type in events) {
                        this.remove(elem, type + (types || ""));
                    }
                } else {
                    if (types.type) {
                        handler = types.handler;
                        types = types.type;
                    }
                    types = types.split(/\s+/);
                    var i = 0;
                    while ((type = types[i++])) {
                        var namespaces = type.split(".");
                        type = namespaces.shift();
                        var all = !namespaces.length,
                            cleaned = jQuery.map(namespaces.slice(0).sort(), fcleanup),
                            namespace = new RegExp("(^|\\.)" + cleaned.join("\\.(?:.*\\.)?") + "(\\.|$)"),
                            special = this.special[type] || {};
                        if (events[type]) {
                            if (handler) {
                                fn = events[type][handler.guid];
                                delete events[type][handler.guid];
                            } else {
                                for (var handle in events[type]) {
                                    if (all || namespace.test(events[type][handle].type)) {
                                        delete events[type][handle];
                                    }
                                }
                            }
                            if (special.remove) {
                                special.remove.call(elem, namespaces, fn);
                            }
                            for (ret in events[type]) {
                                break;
                            }
                            if (!ret) {
                                if (!special.teardown || special.teardown.call(elem, namespaces) === false) {
                                    if (elem.removeEventListener) {
                                        elem.removeEventListener(type, jQuery.data(elem, "handle"), false);
                                    } else if (elem.detachEvent) {
                                        elem.detachEvent("on" + type, jQuery.data(elem, "handle"));
                                    }
                                }
                                ret = null;
                                delete events[type];
                            }
                        }
                    }
                }
                for (ret in events) {
                    break;
                }
                if (!ret) {
                    var handle = jQuery.data(elem, "handle");
                    if (handle) {
                        handle.elem = null;
                    }
                    jQuery.removeData(elem, "events");
                    jQuery.removeData(elem, "handle");
                }
            }
        },
        trigger: function(event, data, elem) {
            var type = event.type || event,
                bubbling = arguments[3];
            if (!bubbling) {
                event = typeof event === "object" ? event[expando] ? event : jQuery.extend(jQuery.Event(type), event) : jQuery.Event(type);
                if (type.indexOf("!") >= 0) {
                    event.type = type = type.slice(0, -1);
                    event.exclusive = true;
                }
                if (!elem) {
                    event.stopPropagation();
                    if (this.global[type]) {
                        jQuery.each(jQuery.cache, function() {
                            if (this.events && this.events[type]) {
                                jQuery.event.trigger(event, data, this.handle.elem);
                            }
                        });
                    }
                }
                if (!elem || elem.nodeType === 3 || elem.nodeType === 8) {
                    return undefined;
                }
                event.result = undefined;
                event.target = elem;
                data = jQuery.makeArray(data);
                data.unshift(event);
            }
            event.currentTarget = elem;
            var handle = jQuery.data(elem, "handle");
            if (handle) {
                handle.apply(elem, data);
            }
            var nativeFn, nativeHandler;
            try {
                if (!(elem && elem.nodeName && jQuery.noData[elem.nodeName.toLowerCase()])) {
                    nativeFn = elem[type];
                    nativeHandler = elem["on" + type];
                }
            } catch (e) {}
            var isClick = jQuery.nodeName(elem, "a") && type === "click";
            if (!bubbling && nativeFn && !event.isDefaultPrevented() && !isClick) {
                this.triggered = true;
                try {
                    elem[type]();
                } catch (e) {}
            } else if (nativeHandler && elem["on" + type].apply(elem, data) === false) {
                event.result = false;
            }
            this.triggered = false;
            if (!event.isPropagationStopped()) {
                var parent = elem.parentNode || elem.ownerDocument;
                if (parent) {
                    jQuery.event.trigger(event, data, parent, true);
                }
            }
        },
        handle: function(event) {
            var all, handlers;
            event = arguments[0] = jQuery.event.fix(event || window.event);
            event.currentTarget = this;
            var namespaces = event.type.split(".");
            event.type = namespaces.shift();
            all = !namespaces.length && !event.exclusive;
            var namespace = new RegExp("(^|\\.)" + namespaces.slice(0).sort().join("\\.(?:.*\\.)?") + "(\\.|$)");
            handlers = (jQuery.data(this, "events") || {})[event.type];
            for (var j in handlers) {
                var handler = handlers[j];
                if (all || namespace.test(handler.type)) {
                    event.handler = handler;
                    event.data = handler.data;
                    var ret = handler.apply(this, arguments);
                    if (ret !== undefined) {
                        event.result = ret;
                        if (ret === false) {
                            event.preventDefault();
                            event.stopPropagation();
                        }
                    }
                    if (event.isImmediatePropagationStopped()) {
                        break;
                    }
                }
            }
            return event.result;
        },
        props: "altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),
        fix: function(event) {
            if (event[expando]) {
                return event;
            }
            var originalEvent = event;
            event = jQuery.Event(originalEvent);
            for (var i = this.props.length, prop; i;) {
                prop = this.props[--i];
                event[prop] = originalEvent[prop];
            }
            if (!event.target) {
                event.target = event.srcElement || document;
            }
            if (event.target.nodeType === 3) {
                event.target = event.target.parentNode;
            }
            if (!event.relatedTarget && event.fromElement) {
                event.relatedTarget = event.fromElement === event.target ? event.toElement : event.fromElement;
            }
            if (event.pageX == null && event.clientX != null) {
                var doc = document.documentElement,
                    body = document.body;
                event.pageX = event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
                event.pageY = event.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
            }
            if (!event.which && ((event.charCode || event.charCode === 0) ? event.charCode : event.keyCode)) {
                event.which = event.charCode || event.keyCode;
            }
            if (!event.metaKey && event.ctrlKey) {
                event.metaKey = event.ctrlKey;
            }
            if (!event.which && event.button !== undefined) {
                event.which = (event.button & 1 ? 1 : (event.button & 2 ? 3 : (event.button & 4 ? 2 : 0)));
            }
            return event;
        },
        guid: 1E8,
        proxy: jQuery.proxy,
        special: {
            ready: {
                setup: jQuery.bindReady,
                teardown: jQuery.noop
            },
            live: {
                add: function(proxy, data, namespaces, live) {
                    jQuery.extend(proxy, data || {});
                    proxy.guid += data.selector + data.live;
                    jQuery.event.add(this, data.live, liveHandler, data);
                },
                remove: function(namespaces) {
                    if (namespaces.length) {
                        var remove = 0,
                            name = new RegExp("(^|\\.)" + namespaces[0] + "(\\.|$)");
                        jQuery.each((jQuery.data(this, "events").live || {}), function() {
                            if (name.test(this.type)) {
                                remove++;
                            }
                        });
                        if (remove < 1) {
                            jQuery.event.remove(this, namespaces[0], liveHandler);
                        }
                    }
                },
                special: {}
            },
            beforeunload: {
                setup: function(data, namespaces, fn) {
                    if (this.setInterval) {
                        this.onbeforeunload = fn;
                    }
                    return false;
                },
                teardown: function(namespaces, fn) {
                    if (this.onbeforeunload === fn) {
                        this.onbeforeunload = null;
                    }
                }
            }
        }
    };
    jQuery.Event = function(src) {
        if (!this.preventDefault) {
            return new jQuery.Event(src);
        }
        if (src && src.type) {
            this.originalEvent = src;
            this.type = src.type;
        } else {
            this.type = src;
        }
        this.timeStamp = now();
        this[expando] = true;
    };

    function returnFalse() {
        return false;
    }

    function returnTrue() {
        return true;
    }
    jQuery.Event.prototype = {
        preventDefault: function() {
            this.isDefaultPrevented = returnTrue;
            var e = this.originalEvent;
            if (!e) {
                return;
            }
            if (e.preventDefault) {
                e.preventDefault();
            }
            e.returnValue = false;
        },
        stopPropagation: function() {
            this.isPropagationStopped = returnTrue;
            var e = this.originalEvent;
            if (!e) {
                return;
            }
            if (e.stopPropagation) {
                e.stopPropagation();
            }
            e.cancelBubble = true;
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = returnTrue;
            this.stopPropagation();
        },
        isDefaultPrevented: returnFalse,
        isPropagationStopped: returnFalse,
        isImmediatePropagationStopped: returnFalse
    };
    var withinElement = function(event) {
            var parent = event.relatedTarget;
            while (parent && parent !== this) {
                try {
                    parent = parent.parentNode;
                } catch (e) {
                    break;
                }
            }
            if (parent !== this) {
                event.type = event.data;
                jQuery.event.handle.apply(this, arguments);
            }
        },
        delegate = function(event) {
            event.type = event.data;
            jQuery.event.handle.apply(this, arguments);
        };
    jQuery.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function(orig, fix) {
        jQuery.event.special[orig] = {
            setup: function(data) {
                jQuery.event.add(this, fix, data && data.selector ? delegate : withinElement, orig);
            },
            teardown: function(data) {
                jQuery.event.remove(this, fix, data && data.selector ? delegate : withinElement);
            }
        };
    });
    if (!jQuery.support.submitBubbles) {
        jQuery.event.special.submit = {
            setup: function(data, namespaces, fn) {
                if (this.nodeName.toLowerCase() !== "form") {
                    jQuery.event.add(this, "click.specialSubmit." + fn.guid, function(e) {
                        var elem = e.target,
                            type = elem.type;
                        if ((type === "submit" || type === "image") && jQuery(elem).closest("form").length) {
                            return trigger("submit", this, arguments);
                        }
                    });
                    jQuery.event.add(this, "keypress.specialSubmit." + fn.guid, function(e) {
                        var elem = e.target,
                            type = elem.type;
                        if ((type === "text" || type === "password") && jQuery(elem).closest("form").length && e.keyCode === 13) {
                            return trigger("submit", this, arguments);
                        }
                    });
                } else {
                    return false;
                }
            },
            remove: function(namespaces, fn) {
                jQuery.event.remove(this, "click.specialSubmit" + (fn ? "." + fn.guid : ""));
                jQuery.event.remove(this, "keypress.specialSubmit" + (fn ? "." + fn.guid : ""));
            }
        };
    }
    if (!jQuery.support.changeBubbles) {
        var formElems = /textarea|input|select/i;

        function getVal(elem) {
            var type = elem.type,
                val = elem.value;
            if (type === "radio" || type === "checkbox") {
                val = elem.checked;
            } else if (type === "select-multiple") {
                val = elem.selectedIndex > -1 ? jQuery.map(elem.options, function(elem) {
                    return elem.selected;
                }).join("-") : "";
            } else if (elem.nodeName.toLowerCase() === "select") {
                val = elem.selectedIndex;
            }
            return val;
        }

        function testChange(e) {
            var elem = e.target,
                data, val;
            if (!formElems.test(elem.nodeName) || elem.readOnly) {
                return;
            }
            data = jQuery.data(elem, "_change_data");
            val = getVal(elem);
            if (val === data) {
                return;
            }
            if (e.type !== "focusout" || elem.type !== "radio") {
                jQuery.data(elem, "_change_data", val);
            }
            if (elem.type !== "select" && (data != null || val)) {
                e.type = "change";
                return jQuery.event.trigger(e, arguments[1], this);
            }
        }
        jQuery.event.special.change = {
            filters: {
                focusout: testChange,
                click: function(e) {
                    var elem = e.target,
                        type = elem.type;
                    if (type === "radio" || type === "checkbox" || elem.nodeName.toLowerCase() === "select") {
                        return testChange.call(this, e);
                    }
                },
                keydown: function(e) {
                    var elem = e.target,
                        type = elem.type;
                    if ((e.keyCode === 13 && elem.nodeName.toLowerCase() !== "textarea") || (e.keyCode === 32 && (type === "checkbox" || type === "radio")) || type === "select-multiple") {
                        return testChange.call(this, e);
                    }
                },
                beforeactivate: function(e) {
                    var elem = e.target;
                    if (elem.nodeName.toLowerCase() === "input" && elem.type === "radio") {
                        jQuery.data(elem, "_change_data", getVal(elem));
                    }
                }
            },
            setup: function(data, namespaces, fn) {
                for (var type in changeFilters) {
                    jQuery.event.add(this, type + ".specialChange." + fn.guid, changeFilters[type]);
                }
                return formElems.test(this.nodeName);
            },
            remove: function(namespaces, fn) {
                for (var type in changeFilters) {
                    jQuery.event.remove(this, type + ".specialChange" + (fn ? "." + fn.guid : ""), changeFilters[type]);
                }
                return formElems.test(this.nodeName);
            }
        };
        var changeFilters = jQuery.event.special.change.filters;
    }

    function trigger(type, elem, args) {
        args[0].type = type;
        return jQuery.event.handle.apply(elem, args);
    }
    if (document.addEventListener) {
        jQuery.each({
            focus: "focusin",
            blur: "focusout"
        }, function(orig, fix) {
            jQuery.event.special[fix] = {
                setup: function() {
                    this.addEventListener(orig, handler, true);
                },
                teardown: function() {
                    this.removeEventListener(orig, handler, true);
                }
            };

            function handler(e) {
                e = jQuery.event.fix(e);
                e.type = fix;
                return jQuery.event.handle.call(this, e);
            }
        });
    }
    jQuery.each(["bind", "one"], function(i, name) {
        jQuery.fn[name] = function(type, data, fn) {
            if (typeof type === "object") {
                for (var key in type) {
                    this[name](key, data, type[key], fn);
                }
                return this;
            }
            if (jQuery.isFunction(data)) {
                thisObject = fn;
                fn = data;
                data = undefined;
            }
            var handler = name === "one" ? jQuery.proxy(fn, function(event) {
                jQuery(this).unbind(event, handler);
                return fn.apply(this, arguments);
            }) : fn;
            return type === "unload" && name !== "one" ? this.one(type, data, fn, thisObject) : this.each(function() {
                jQuery.event.add(this, type, handler, data);
            });
        };
    });
    jQuery.fn.extend({
        unbind: function(type, fn) {
            if (typeof type === "object" && !type.preventDefault) {
                for (var key in type) {
                    this.unbind(key, type[key]);
                }
                return this;
            }
            return this.each(function() {
                jQuery.event.remove(this, type, fn);
            });
        },
        trigger: function(type, data) {
            return this.each(function() {
                jQuery.event.trigger(type, data, this);
            });
        },
        triggerHandler: function(type, data) {
            if (this[0]) {
                var event = jQuery.Event(type);
                event.preventDefault();
                event.stopPropagation();
                jQuery.event.trigger(event, data, this[0]);
                return event.result;
            }
        },
        toggle: function(fn) {
            var args = arguments,
                i = 1;
            while (i < args.length) {
                jQuery.proxy(fn, args[i++]);
            }
            return this.click(jQuery.proxy(fn, function(event) {
                var lastToggle = (jQuery.data(this, "lastToggle" + fn.guid) || 0) % i;
                jQuery.data(this, "lastToggle" + fn.guid, lastToggle + 1);
                event.preventDefault();
                return args[lastToggle].apply(this, arguments) || false;
            }));
        },
        hover: function(fnOver, fnOut) {
            return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
        },
        live: function(type, data, fn) {
            if (jQuery.isFunction(data)) {
                fn = data;
                data = undefined;
            }
            jQuery(this.context).bind(liveConvert(type, this.selector), {
                data: data,
                selector: this.selector,
                live: type
            }, fn);
            return this;
        },
        die: function(type, fn) {
            jQuery(this.context).unbind(liveConvert(type, this.selector), fn ? {
                guid: fn.guid + this.selector + type
            } : null);
            return this;
        }
    });

    function liveHandler(event) {
        var stop = true,
            elems = [],
            selectors = [],
            args = arguments,
            related, match, fn, elem, j, i, data, live = jQuery.extend({}, jQuery.data(this, "events").live);
        for (j in live) {
            fn = live[j];
            if (fn.live === event.type || fn.altLive && jQuery.inArray(event.type, fn.altLive) > -1) {
                data = fn.data;
                if (!(data.beforeFilter && data.beforeFilter[event.type] && !data.beforeFilter[event.type](event))) {
                    selectors.push(fn.selector);
                }
            } else {
                delete live[j];
            }
        }
        match = jQuery(event.target).closest(selectors, event.currentTarget);
        for (i = 0, l = match.length; i < l; i++) {
            for (j in live) {
                fn = live[j];
                elem = match[i].elem;
                related = null;
                if (match[i].selector === fn.selector) {
                    if (fn.live === "mouseenter" || fn.live === "mouseleave") {
                        related = jQuery(event.relatedTarget).closest(fn.selector)[0];
                    }
                    if (!related || related !== elem) {
                        elems.push({
                            elem: elem,
                            fn: fn
                        });
                    }
                }
            }
        }
        for (i = 0, l = elems.length; i < l; i++) {
            match = elems[i];
            event.currentTarget = match.elem;
            event.data = match.fn.data;
            if (match.fn.apply(match.elem, args) === false) {
                stop = false;
                break;
            }
        }
        return stop;
    }

    function liveConvert(type, selector) {
        return ["live", type, selector.replace(/\./g, "`").replace(/ /g, "&")].join(".");
    }
    jQuery.each(("blur focus load resize scroll unload click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup error").split(" "), function(i, name) {
        jQuery.fn[name] = function(fn) {
            return fn ? this.bind(name, fn) : this.trigger(name);
        };
        if (jQuery.fnAttr) {
            jQuery.fnAttr[name] = true;
        }
    });
    if (window.attachEvent && !window.addEventListener) {
        window.attachEvent("onunload", function() {
            for (var id in jQuery.cache) {
                if (jQuery.cache[id].handle) {
                    try {
                        jQuery.event.remove(jQuery.cache[id].handle.elem);
                    } catch (e) {}
                }
            }
        });
    }
    (function() {
        var chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
            done = 0,
            toString = Object.prototype.toString,
            hasDuplicate = false,
            baseHasDuplicate = true;
        [0, 0].sort(function() {
            baseHasDuplicate = false;
            return 0;
        });
        var Sizzle = function(selector, context, results, seed) {
            results = results || [];
            var origContext = context = context || document;
            if (context.nodeType !== 1 && context.nodeType !== 9) {
                return [];
            }
            if (!selector || typeof selector !== "string") {
                return results;
            }
            var parts = [],
                m, set, checkSet, extra, prune = true,
                contextXML = isXML(context),
                soFar = selector;
            while ((chunker.exec(""), m = chunker.exec(soFar)) !== null) {
                soFar = m[3];
                parts.push(m[1]);
                if (m[2]) {
                    extra = m[3];
                    break;
                }
            }
            if (parts.length > 1 && origPOS.exec(selector)) {
                if (parts.length === 2 && Expr.relative[parts[0]]) {
                    set = posProcess(parts[0] + parts[1], context);
                } else {
                    set = Expr.relative[parts[0]] ? [context] : Sizzle(parts.shift(), context);
                    while (parts.length) {
                        selector = parts.shift();
                        if (Expr.relative[selector]) {
                            selector += parts.shift();
                        }
                        set = posProcess(selector, set);
                    }
                }
            } else {
                if (!seed && parts.length > 1 && context.nodeType === 9 && !contextXML && Expr.match.ID.test(parts[0]) && !Expr.match.ID.test(parts[parts.length - 1])) {
                    var ret = Sizzle.find(parts.shift(), context, contextXML);
                    context = ret.expr ? Sizzle.filter(ret.expr, ret.set)[0] : ret.set[0];
                }
                if (context) {
                    var ret = seed ? {
                        expr: parts.pop(),
                        set: makeArray(seed)
                    } : Sizzle.find(parts.pop(), parts.length === 1 && (parts[0] === "~" || parts[0] === "+") && context.parentNode ? context.parentNode : context, contextXML);
                    set = ret.expr ? Sizzle.filter(ret.expr, ret.set) : ret.set;
                    if (parts.length > 0) {
                        checkSet = makeArray(set);
                    } else {
                        prune = false;
                    }
                    while (parts.length) {
                        var cur = parts.pop(),
                            pop = cur;
                        if (!Expr.relative[cur]) {
                            cur = "";
                        } else {
                            pop = parts.pop();
                        }
                        if (pop == null) {
                            pop = context;
                        }
                        Expr.relative[cur](checkSet, pop, contextXML);
                    }
                } else {
                    checkSet = parts = [];
                }
            }
            if (!checkSet) {
                checkSet = set;
            }
            if (!checkSet) {
                throw "Syntax error, unrecognized expression: " + (cur || selector);
            }
            if (toString.call(checkSet) === "[object Array]") {
                if (!prune) {
                    results.push.apply(results, checkSet);
                } else if (context && context.nodeType === 1) {
                    for (var i = 0; checkSet[i] != null; i++) {
                        if (checkSet[i] && (checkSet[i] === true || checkSet[i].nodeType === 1 && contains(context, checkSet[i]))) {
                            results.push(set[i]);
                        }
                    }
                } else {
                    for (var i = 0; checkSet[i] != null; i++) {
                        if (checkSet[i] && checkSet[i].nodeType === 1) {
                            results.push(set[i]);
                        }
                    }
                }
            } else {
                makeArray(checkSet, results);
            }
            if (extra) {
                Sizzle(extra, origContext, results, seed);
                Sizzle.uniqueSort(results);
            }
            return results;
        };
        Sizzle.uniqueSort = function(results) {
            if (sortOrder) {
                hasDuplicate = baseHasDuplicate;
                results.sort(sortOrder);
                if (hasDuplicate) {
                    for (var i = 1; i < results.length; i++) {
                        if (results[i] === results[i - 1]) {
                            results.splice(i--, 1);
                        }
                    }
                }
            }
            return results;
        };
        Sizzle.matches = function(expr, set) {
            return Sizzle(expr, null, null, set);
        };
        Sizzle.find = function(expr, context, isXML) {
            var set, match;
            if (!expr) {
                return [];
            }
            for (var i = 0, l = Expr.order.length; i < l; i++) {
                var type = Expr.order[i],
                    match;
                if ((match = Expr.leftMatch[type].exec(expr))) {
                    var left = match[1];
                    match.splice(1, 1);
                    if (left.substr(left.length - 1) !== "\\") {
                        match[1] = (match[1] || "").replace(/\\/g, "");
                        set = Expr.find[type](match, context, isXML);
                        if (set != null) {
                            expr = expr.replace(Expr.match[type], "");
                            break;
                        }
                    }
                }
            }
            if (!set) {
                set = context.getElementsByTagName("*");
            }
            return {
                set: set,
                expr: expr
            };
        };
        Sizzle.filter = function(expr, set, inplace, not) {
            var old = expr,
                result = [],
                curLoop = set,
                match, anyFound, isXMLFilter = set && set[0] && isXML(set[0]);
            while (expr && set.length) {
                for (var type in Expr.filter) {
                    if ((match = Expr.leftMatch[type].exec(expr)) != null && match[2]) {
                        var filter = Expr.filter[type],
                            found, item, left = match[1];
                        anyFound = false;
                        match.splice(1, 1);
                        if (left.substr(left.length - 1) === "\\") {
                            continue;
                        }
                        if (curLoop === result) {
                            result = [];
                        }
                        if (Expr.preFilter[type]) {
                            match = Expr.preFilter[type](match, curLoop, inplace, result, not, isXMLFilter);
                            if (!match) {
                                anyFound = found = true;
                            } else if (match === true) {
                                continue;
                            }
                        }
                        if (match) {
                            for (var i = 0;
                                (item = curLoop[i]) != null; i++) {
                                if (item) {
                                    found = filter(item, match, i, curLoop);
                                    var pass = not ^ !!found;
                                    if (inplace && found != null) {
                                        if (pass) {
                                            anyFound = true;
                                        } else {
                                            curLoop[i] = false;
                                        }
                                    } else if (pass) {
                                        result.push(item);
                                        anyFound = true;
                                    }
                                }
                            }
                        }
                        if (found !== undefined) {
                            if (!inplace) {
                                curLoop = result;
                            }
                            expr = expr.replace(Expr.match[type], "");
                            if (!anyFound) {
                                return [];
                            }
                            break;
                        }
                    }
                }
                if (expr === old) {
                    if (anyFound == null) {
                        throw "Syntax error, unrecognized expression: " + expr;
                    } else {
                        break;
                    }
                }
                old = expr;
            }
            return curLoop;
        };
        var Expr = Sizzle.selectors = {
            order: ["ID", "NAME", "TAG"],
            match: {
                ID: /#((?:[\w\u00c0-\uFFFF-]|\\.)+)/,
                CLASS: /\.((?:[\w\u00c0-\uFFFF-]|\\.)+)/,
                NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF-]|\\.)+)['"]*\]/,
                ATTR: /\[\s*((?:[\w\u00c0-\uFFFF-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,
                TAG: /^((?:[\w\u00c0-\uFFFF\*-]|\\.)+)/,
                CHILD: /:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,
                POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,
                PSEUDO: /:((?:[\w\u00c0-\uFFFF-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
            },
            leftMatch: {},
            attrMap: {
                "class": "className",
                "for": "htmlFor"
            },
            attrHandle: {
                href: function(elem) {
                    return elem.getAttribute("href");
                }
            },
            relative: {
                "+": function(checkSet, part) {
                    var isPartStr = typeof part === "string",
                        isTag = isPartStr && !/\W/.test(part),
                        isPartStrNotTag = isPartStr && !isTag;
                    if (isTag) {
                        part = part.toLowerCase();
                    }
                    for (var i = 0, l = checkSet.length, elem; i < l; i++) {
                        if ((elem = checkSet[i])) {
                            while ((elem = elem.previousSibling) && elem.nodeType !== 1) {}
                            checkSet[i] = isPartStrNotTag || elem && elem.nodeName.toLowerCase() === part ? elem || false : elem === part;
                        }
                    }
                    if (isPartStrNotTag) {
                        Sizzle.filter(part, checkSet, true);
                    }
                },
                ">": function(checkSet, part) {
                    var isPartStr = typeof part === "string";
                    if (isPartStr && !/\W/.test(part)) {
                        part = part.toLowerCase();
                        for (var i = 0, l = checkSet.length; i < l; i++) {
                            var elem = checkSet[i];
                            if (elem) {
                                var parent = elem.parentNode;
                                checkSet[i] = parent.nodeName.toLowerCase() === part ? parent : false;
                            }
                        }
                    } else {
                        for (var i = 0, l = checkSet.length; i < l; i++) {
                            var elem = checkSet[i];
                            if (elem) {
                                checkSet[i] = isPartStr ? elem.parentNode : elem.parentNode === part;
                            }
                        }
                        if (isPartStr) {
                            Sizzle.filter(part, checkSet, true);
                        }
                    }
                },
                "": function(checkSet, part, isXML) {
                    var doneName = done++,
                        checkFn = dirCheck;
                    if (typeof part === "string" && !/\W/.test(part)) {
                        var nodeCheck = part = part.toLowerCase();
                        checkFn = dirNodeCheck;
                    }
                    checkFn("parentNode", part, doneName, checkSet, nodeCheck, isXML);
                },
                "~": function(checkSet, part, isXML) {
                    var doneName = done++,
                        checkFn = dirCheck;
                    if (typeof part === "string" && !/\W/.test(part)) {
                        var nodeCheck = part = part.toLowerCase();
                        checkFn = dirNodeCheck;
                    }
                    checkFn("previousSibling", part, doneName, checkSet, nodeCheck, isXML);
                }
            },
            find: {
                ID: function(match, context, isXML) {
                    if (typeof context.getElementById !== "undefined" && !isXML) {
                        var m = context.getElementById(match[1]);
                        return m ? [m] : [];
                    }
                },
                NAME: function(match, context) {
                    if (typeof context.getElementsByName !== "undefined") {
                        var ret = [],
                            results = context.getElementsByName(match[1]);
                        for (var i = 0, l = results.length; i < l; i++) {
                            if (results[i].getAttribute("name") === match[1]) {
                                ret.push(results[i]);
                            }
                        }
                        return ret.length === 0 ? null : ret;
                    }
                },
                TAG: function(match, context) {
                    return context.getElementsByTagName(match[1]);
                }
            },
            preFilter: {
                CLASS: function(match, curLoop, inplace, result, not, isXML) {
                    match = " " + match[1].replace(/\\/g, "") + " ";
                    if (isXML) {
                        return match;
                    }
                    for (var i = 0, elem;
                        (elem = curLoop[i]) != null; i++) {
                        if (elem) {
                            if (not ^ (elem.className && (" " + elem.className + " ").replace(/[\t\n]/g, " ").indexOf(match) >= 0)) {
                                if (!inplace) {
                                    result.push(elem);
                                }
                            } else if (inplace) {
                                curLoop[i] = false;
                            }
                        }
                    }
                    return false;
                },
                ID: function(match) {
                    return match[1].replace(/\\/g, "");
                },
                TAG: function(match, curLoop) {
                    return match[1].toLowerCase();
                },
                CHILD: function(match) {
                    if (match[1] === "nth") {
                        var test = /(-?)(\d*)n((?:\+|-)?\d*)/.exec(match[2] === "even" && "2n" || match[2] === "odd" && "2n+1" || !/\D/.test(match[2]) && "0n+" + match[2] || match[2]);
                        match[2] = (test[1] + (test[2] || 1)) - 0;
                        match[3] = test[3] - 0;
                    }
                    match[0] = done++;
                    return match;
                },
                ATTR: function(match, curLoop, inplace, result, not, isXML) {
                    var name = match[1].replace(/\\/g, "");
                    if (!isXML && Expr.attrMap[name]) {
                        match[1] = Expr.attrMap[name];
                    }
                    if (match[2] === "~=") {
                        match[4] = " " + match[4] + " ";
                    }
                    return match;
                },
                PSEUDO: function(match, curLoop, inplace, result, not) {
                    if (match[1] === "not") {
                        if ((chunker.exec(match[3]) || "").length > 1 || /^\w/.test(match[3])) {
                            match[3] = Sizzle(match[3], null, null, curLoop);
                        } else {
                            var ret = Sizzle.filter(match[3], curLoop, inplace, true ^ not);
                            if (!inplace) {
                                result.push.apply(result, ret);
                            }
                            return false;
                        }
                    } else if (Expr.match.POS.test(match[0]) || Expr.match.CHILD.test(match[0])) {
                        return true;
                    }
                    return match;
                },
                POS: function(match) {
                    match.unshift(true);
                    return match;
                }
            },
            filters: {
                enabled: function(elem) {
                    return elem.disabled === false && elem.type !== "hidden";
                },
                disabled: function(elem) {
                    return elem.disabled === true;
                },
                checked: function(elem) {
                    return elem.checked === true;
                },
                selected: function(elem) {
                    elem.parentNode.selectedIndex;
                    return elem.selected === true;
                },
                parent: function(elem) {
                    return !!elem.firstChild;
                },
                empty: function(elem) {
                    return !elem.firstChild;
                },
                has: function(elem, i, match) {
                    return !!Sizzle(match[3], elem).length;
                },
                header: function(elem) {
                    return /h\d/i.test(elem.nodeName);
                },
                text: function(elem) {
                    return "text" === elem.type;
                },
                radio: function(elem) {
                    return "radio" === elem.type;
                },
                checkbox: function(elem) {
                    return "checkbox" === elem.type;
                },
                file: function(elem) {
                    return "file" === elem.type;
                },
                password: function(elem) {
                    return "password" === elem.type;
                },
                submit: function(elem) {
                    return "submit" === elem.type;
                },
                image: function(elem) {
                    return "image" === elem.type;
                },
                reset: function(elem) {
                    return "reset" === elem.type;
                },
                button: function(elem) {
                    return "button" === elem.type || elem.nodeName.toLowerCase() === "button";
                },
                input: function(elem) {
                    return /input|select|textarea|button/i.test(elem.nodeName);
                }
            },
            setFilters: {
                first: function(elem, i) {
                    return i === 0;
                },
                last: function(elem, i, match, array) {
                    return i === array.length - 1;
                },
                even: function(elem, i) {
                    return i % 2 === 0;
                },
                odd: function(elem, i) {
                    return i % 2 === 1;
                },
                lt: function(elem, i, match) {
                    return i < match[3] - 0;
                },
                gt: function(elem, i, match) {
                    return i > match[3] - 0;
                },
                nth: function(elem, i, match) {
                    return match[3] - 0 === i;
                },
                eq: function(elem, i, match) {
                    return match[3] - 0 === i;
                }
            },
            filter: {
                PSEUDO: function(elem, match, i, array) {
                    var name = match[1],
                        filter = Expr.filters[name];
                    if (filter) {
                        return filter(elem, i, match, array);
                    } else if (name === "contains") {
                        return (elem.textContent || elem.innerText || getText([elem]) || "").indexOf(match[3]) >= 0;
                    } else if (name === "not") {
                        var not = match[3];
                        for (var i = 0, l = not.length; i < l; i++) {
                            if (not[i] === elem) {
                                return false;
                            }
                        }
                        return true;
                    } else {
                        throw "Syntax error, unrecognized expression: " + name;
                    }
                },
                CHILD: function(elem, match) {
                    var type = match[1],
                        node = elem;
                    switch (type) {
                        case 'only':
                        case 'first':
                            while ((node = node.previousSibling)) {
                                if (node.nodeType === 1) {
                                    return false;
                                }
                            }
                            if (type === "first") {
                                return true;
                            }
                            node = elem;
                        case 'last':
                            while ((node = node.nextSibling)) {
                                if (node.nodeType === 1) {
                                    return false;
                                }
                            }
                            return true;
                        case 'nth':
                            var first = match[2],
                                last = match[3];
                            if (first === 1 && last === 0) {
                                return true;
                            }
                            var doneName = match[0],
                                parent = elem.parentNode;
                            if (parent && (parent.sizcache !== doneName || !elem.nodeIndex)) {
                                var count = 0;
                                for (node = parent.firstChild; node; node = node.nextSibling) {
                                    if (node.nodeType === 1) {
                                        node.nodeIndex = ++count;
                                    }
                                }
                                parent.sizcache = doneName;
                            }
                            var diff = elem.nodeIndex - last;
                            if (first === 0) {
                                return diff === 0;
                            } else {
                                return (diff % first === 0 && diff / first >= 0);
                            }
                    }
                },
                ID: function(elem, match) {
                    return elem.nodeType === 1 && elem.getAttribute("id") === match;
                },
                TAG: function(elem, match) {
                    return (match === "*" && elem.nodeType === 1) || elem.nodeName.toLowerCase() === match;
                },
                CLASS: function(elem, match) {
                    return (" " + (elem.className || elem.getAttribute("class")) + " ").indexOf(match) > -1;
                },
                ATTR: function(elem, match) {
                    var name = match[1],
                        result = Expr.attrHandle[name] ? Expr.attrHandle[name](elem) : elem[name] != null ? elem[name] : elem.getAttribute(name),
                        value = result + "",
                        type = match[2],
                        check = match[4];
                    return result == null ? type === "!=" : type === "=" ? value === check : type === "*=" ? value.indexOf(check) >= 0 : type === "~=" ? (" " + value + " ").indexOf(check) >= 0 : !check ? value && result !== false : type === "!=" ? value !== check : type === "^=" ? value.indexOf(check) === 0 : type === "$=" ? value.substr(value.length - check.length) === check : type === "|=" ? value === check || value.substr(0, check.length + 1) === check + "-" : false;
                },
                POS: function(elem, match, i, array) {
                    var name = match[2],
                        filter = Expr.setFilters[name];
                    if (filter) {
                        return filter(elem, i, match, array);
                    }
                }
            }
        };
        var origPOS = Expr.match.POS;
        for (var type in Expr.match) {
            Expr.match[type] = new RegExp(Expr.match[type].source + /(?![^\[]*\])(?![^\(]*\))/.source);
            Expr.leftMatch[type] = new RegExp(/(^(?:.|\r|\n)*?)/.source + Expr.match[type].source.replace(/\\(\d+)/g, function(all, num) {
                return "\\" + (num - 0 + 1);
            }));
        }
        var makeArray = function(array, results) {
            array = Array.prototype.slice.call(array, 0);
            if (results) {
                results.push.apply(results, array);
                return results;
            }
            return array;
        };
        try {
            Array.prototype.slice.call(document.documentElement.childNodes, 0);
        } catch (e) {
            makeArray = function(array, results) {
                var ret = results || [];
                if (toString.call(array) === "[object Array]") {
                    Array.prototype.push.apply(ret, array);
                } else {
                    if (typeof array.length === "number") {
                        for (var i = 0, l = array.length; i < l; i++) {
                            ret.push(array[i]);
                        }
                    } else {
                        for (var i = 0; array[i]; i++) {
                            ret.push(array[i]);
                        }
                    }
                }
                return ret;
            };
        }
        var sortOrder;
        if (document.documentElement.compareDocumentPosition) {
            sortOrder = function(a, b) {
                if (!a.compareDocumentPosition || !b.compareDocumentPosition) {
                    if (a == b) {
                        hasDuplicate = true;
                    }
                    return a.compareDocumentPosition ? -1 : 1;
                }
                var ret = a.compareDocumentPosition(b) & 4 ? -1 : a === b ? 0 : 1;
                if (ret === 0) {
                    hasDuplicate = true;
                }
                return ret;
            };
        } else if ("sourceIndex" in document.documentElement) {
            sortOrder = function(a, b) {
                if (!a.sourceIndex || !b.sourceIndex) {
                    if (a == b) {
                        hasDuplicate = true;
                    }
                    return a.sourceIndex ? -1 : 1;
                }
                var ret = a.sourceIndex - b.sourceIndex;
                if (ret === 0) {
                    hasDuplicate = true;
                }
                return ret;
            };
        } else if (document.createRange) {
            sortOrder = function(a, b) {
                if (!a.ownerDocument || !b.ownerDocument) {
                    if (a == b) {
                        hasDuplicate = true;
                    }
                    return a.ownerDocument ? -1 : 1;
                }
                var aRange = a.ownerDocument.createRange(),
                    bRange = b.ownerDocument.createRange();
                aRange.setStart(a, 0);
                aRange.setEnd(a, 0);
                bRange.setStart(b, 0);
                bRange.setEnd(b, 0);
                var ret = aRange.compareBoundaryPoints(Range.START_TO_END, bRange);
                if (ret === 0) {
                    hasDuplicate = true;
                }
                return ret;
            };
        }

        function getText(elems) {
                var ret = "",
                    elem;
                for (var i = 0; elems[i]; i++) {
                    elem = elems[i];
                    if (elem.nodeType === 3 || elem.nodeType === 4) {
                        ret += elem.nodeValue;
                    } else if (elem.nodeType !== 8) {
                        ret += getText(elem.childNodes);
                    }
                }
                return ret;
            }
            (function() {
                var form = document.createElement("div"),
                    id = "script" + (new Date).getTime();
                form.innerHTML = "<a name='" + id + "'/>";
                var root = document.documentElement;
                root.insertBefore(form, root.firstChild);
                if (document.getElementById(id)) {
                    Expr.find.ID = function(match, context, isXML) {
                        if (typeof context.getElementById !== "undefined" && !isXML) {
                            var m = context.getElementById(match[1]);
                            return m ? m.id === match[1] || typeof m.getAttributeNode !== "undefined" && m.getAttributeNode("id").nodeValue === match[1] ? [m] : undefined : [];
                        }
                    };
                    Expr.filter.ID = function(elem, match) {
                        var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
                        return elem.nodeType === 1 && node && node.nodeValue === match;
                    };
                }
                root.removeChild(form);
                root = form = null;
            })();
        (function() {
            var div = document.createElement("div");
            div.appendChild(document.createComment(""));
            if (div.getElementsByTagName("*").length > 0) {
                Expr.find.TAG = function(match, context) {
                    var results = context.getElementsByTagName(match[1]);
                    if (match[1] === "*") {
                        var tmp = [];
                        for (var i = 0; results[i]; i++) {
                            if (results[i].nodeType === 1) {
                                tmp.push(results[i]);
                            }
                        }
                        results = tmp;
                    }
                    return results;
                };
            }
            div.innerHTML = "<a href='#'></a>";
            if (div.firstChild && typeof div.firstChild.getAttribute !== "undefined" && div.firstChild.getAttribute("href") !== "#") {
                Expr.attrHandle.href = function(elem) {
                    return elem.getAttribute("href", 2);
                };
            }
            div = null;
        })();
        if (document.querySelectorAll) {
            (function() {
                var oldSizzle = Sizzle,
                    div = document.createElement("div");
                div.innerHTML = "<p class='TEST'></p>";
                if (div.querySelectorAll && div.querySelectorAll(".TEST").length === 0) {
                    return;
                }
                Sizzle = function(query, context, extra, seed) {
                    context = context || document;
                    if (!seed && context.nodeType === 9 && !isXML(context)) {
                        try {
                            return makeArray(context.querySelectorAll(query), extra);
                        } catch (e) {}
                    }
                    return oldSizzle(query, context, extra, seed);
                };
                for (var prop in oldSizzle) {
                    Sizzle[prop] = oldSizzle[prop];
                }
                div = null;
            })();
        }
        (function() {
            var div = document.createElement("div");
            div.innerHTML = "<div class='test e'></div><div class='test'></div>";
            if (!div.getElementsByClassName || div.getElementsByClassName("e").length === 0) {
                return;
            }
            div.lastChild.className = "e";
            if (div.getElementsByClassName("e").length === 1) {
                return;
            }
            Expr.order.splice(1, 0, "CLASS");
            Expr.find.CLASS = function(match, context, isXML) {
                if (typeof context.getElementsByClassName !== "undefined" && !isXML) {
                    return context.getElementsByClassName(match[1]);
                }
            };
            div = null;
        })();

        function dirNodeCheck(dir, cur, doneName, checkSet, nodeCheck, isXML) {
            for (var i = 0, l = checkSet.length; i < l; i++) {
                var elem = checkSet[i];
                if (elem) {
                    elem = elem[dir];
                    var match = false;
                    while (elem) {
                        if (elem.sizcache === doneName) {
                            match = checkSet[elem.sizset];
                            break;
                        }
                        if (elem.nodeType === 1 && !isXML) {
                            elem.sizcache = doneName;
                            elem.sizset = i;
                        }
                        if (elem.nodeName.toLowerCase() === cur) {
                            match = elem;
                            break;
                        }
                        elem = elem[dir];
                    }
                    checkSet[i] = match;
                }
            }
        }

        function dirCheck(dir, cur, doneName, checkSet, nodeCheck, isXML) {
            for (var i = 0, l = checkSet.length; i < l; i++) {
                var elem = checkSet[i];
                if (elem) {
                    elem = elem[dir];
                    var match = false;
                    while (elem) {
                        if (elem.sizcache === doneName) {
                            match = checkSet[elem.sizset];
                            break;
                        }
                        if (elem.nodeType === 1) {
                            if (!isXML) {
                                elem.sizcache = doneName;
                                elem.sizset = i;
                            }
                            if (typeof cur !== "string") {
                                if (elem === cur) {
                                    match = true;
                                    break;
                                }
                            } else if (Sizzle.filter(cur, [elem]).length > 0) {
                                match = elem;
                                break;
                            }
                        }
                        elem = elem[dir];
                    }
                    checkSet[i] = match;
                }
            }
        }
        var contains = document.compareDocumentPosition ? function(a, b) {
            return a.compareDocumentPosition(b) & 16;
        } : function(a, b) {
            return a !== b && (a.contains ? a.contains(b) : true);
        };
        var isXML = function(elem) {
            var documentElement = (elem ? elem.ownerDocument || elem : 0).documentElement;
            return documentElement ? documentElement.nodeName !== "HTML" : false;
        };
        var posProcess = function(selector, context) {
            var tmpSet = [],
                later = "",
                match, root = context.nodeType ? [context] : context;
            while ((match = Expr.match.PSEUDO.exec(selector))) {
                later += match[0];
                selector = selector.replace(Expr.match.PSEUDO, "");
            }
            selector = Expr.relative[selector] ? selector + "*" : selector;
            for (var i = 0, l = root.length; i < l; i++) {
                Sizzle(selector, root[i], tmpSet);
            }
            return Sizzle.filter(later, tmpSet);
        };
        jQuery.find = Sizzle;
        jQuery.expr = Sizzle.selectors;
        jQuery.expr[":"] = jQuery.expr.filters;
        jQuery.unique = Sizzle.uniqueSort;
        jQuery.getText = getText;
        jQuery.isXMLDoc = isXML;
        jQuery.contains = contains;
        return;
        window.Sizzle = Sizzle;
    })();
    var runtil = /Until$/,
        rparentsprev = /^(?:parents|prevUntil|prevAll)/,
        rmultiselector = /,/,
        slice = Array.prototype.slice;
    var winnow = function(elements, qualifier, keep) {
        if (jQuery.isFunction(qualifier)) {
            return jQuery.grep(elements, function(elem, i) {
                return !!qualifier.call(elem, i, elem) === keep;
            });
        } else if (qualifier.nodeType) {
            return jQuery.grep(elements, function(elem, i) {
                return (elem === qualifier) === keep;
            });
        } else if (typeof qualifier === "string") {
            var filtered = jQuery.grep(elements, function(elem) {
                return elem.nodeType === 1;
            });
            if (isSimple.test(qualifier)) {
                return jQuery.filter(qualifier, filtered, !keep);
            } else {
                qualifier = jQuery.filter(qualifier, elements);
            }
        }
        return jQuery.grep(elements, function(elem, i) {
            return (jQuery.inArray(elem, qualifier) >= 0) === keep;
        });
    };
    jQuery.fn.extend({
        find: function(selector) {
            var ret = this.pushStack("", "find", selector),
                length = 0;
            for (var i = 0, l = this.length; i < l; i++) {
                length = ret.length;
                jQuery.find(selector, this[i], ret);
                if (i > 0) {
                    for (var n = length; n < ret.length; n++) {
                        for (var r = 0; r < length; r++) {
                            if (ret[r] === ret[n]) {
                                ret.splice(n--, 1);
                                break;
                            }
                        }
                    }
                }
            }
            return ret;
        },
        has: function(target) {
            var targets = jQuery(target);
            return this.filter(function() {
                for (var i = 0, l = targets.length; i < l; i++) {
                    if (jQuery.contains(this, targets[i])) {
                        return true;
                    }
                }
            });
        },
        not: function(selector) {
            return this.pushStack(winnow(this, selector, false), "not", selector);
        },
        filter: function(selector) {
            return this.pushStack(winnow(this, selector, true), "filter", selector);
        },
        is: function(selector) {
            return !!selector && jQuery.filter(selector, this).length > 0;
        },
        closest: function(selectors, context) {
            if (jQuery.isArray(selectors)) {
                var ret = [],
                    cur = this[0],
                    match, matches = {},
                    selector;
                if (cur && selectors.length) {
                    for (var i = 0, l = selectors.length; i < l; i++) {
                        selector = selectors[i];
                        if (!matches[selector]) {
                            matches[selector] = jQuery.expr.match.POS.test(selector) ? jQuery(selector, context || this.context) : selector;
                        }
                    }
                    while (cur && cur.ownerDocument && cur !== context) {
                        for (selector in matches) {
                            match = matches[selector];
                            if (match.jquery ? match.index(cur) > -1 : jQuery(cur).is(match)) {
                                ret.push({
                                    selector: selector,
                                    elem: cur
                                });
                                delete matches[selector];
                            }
                        }
                        cur = cur.parentNode;
                    }
                }
                return ret;
            }
            var pos = jQuery.expr.match.POS.test(selectors) ? jQuery(selectors, context || this.context) : null;
            return this.map(function(i, cur) {
                while (cur && cur.ownerDocument && cur !== context) {
                    if (pos ? pos.index(cur) > -1 : jQuery(cur).is(selectors)) {
                        return cur;
                    }
                    cur = cur.parentNode;
                }
                return null;
            });
        },
        index: function(elem) {
            if (!elem || typeof elem === "string") {
                return jQuery.inArray(this[0], elem ? jQuery(elem) : this.parent().children());
            }
            return jQuery.inArray(elem.jquery ? elem[0] : elem, this);
        },
        add: function(selector, context) {
            var set = typeof selector === "string" ? jQuery(selector, context || this.context) : jQuery.makeArray(selector),
                all = jQuery.merge(this.get(), set);
            return this.pushStack(set[0] && (set[0].setInterval || set[0].nodeType === 9 || (set[0].parentNode && set[0].parentNode.nodeType !== 11)) ? jQuery.unique(all) : all);
        },
        andSelf: function() {
            return this.add(this.prevObject);
        }
    });
    jQuery.each({
        parent: function(elem) {
            var parent = elem.parentNode;
            return parent && parent.nodeType !== 11 ? parent : null;
        },
        parents: function(elem) {
            return jQuery.dir(elem, "parentNode");
        },
        parentsUntil: function(elem, i, until) {
            return jQuery.dir(elem, "parentNode", until);
        },
        next: function(elem) {
            return jQuery.nth(elem, 2, "nextSibling");
        },
        prev: function(elem) {
            return jQuery.nth(elem, 2, "previousSibling");
        },
        nextAll: function(elem) {
            return jQuery.dir(elem, "nextSibling");
        },
        prevAll: function(elem) {
            return jQuery.dir(elem, "previousSibling");
        },
        nextUntil: function(elem, i, until) {
            return jQuery.dir(elem, "nextSibling", until);
        },
        prevUntil: function(elem, i, until) {
            return jQuery.dir(elem, "previousSibling", until);
        },
        siblings: function(elem) {
            return jQuery.sibling(elem.parentNode.firstChild, elem);
        },
        children: function(elem) {
            return jQuery.sibling(elem.firstChild);
        },
        contents: function(elem) {
            return jQuery.nodeName(elem, "iframe") ? elem.contentDocument || elem.contentWindow.document : jQuery.makeArray(elem.childNodes);
        }
    }, function(name, fn) {
        jQuery.fn[name] = function(until, selector) {
            var ret = jQuery.map(this, fn, until);
            if (!runtil.test(name)) {
                selector = until;
            }
            if (selector && typeof selector === "string") {
                ret = jQuery.filter(selector, ret);
            }
            ret = this.length > 1 ? jQuery.unique(ret) : ret;
            if ((this.length > 1 || rmultiselector.test(selector)) && rparentsprev.test(name)) {
                ret = ret.reverse();
            }
            return this.pushStack(ret, name, slice.call(arguments).join(","));
        };
    });
    jQuery.extend({
        filter: function(expr, elems, not) {
            if (not) {
                expr = ":not(" + expr + ")";
            }
            return jQuery.find.matches(expr, elems);
        },
        dir: function(elem, dir, until) {
            var matched = [],
                cur = elem[dir];
            while (cur && cur.nodeType !== 9 && (until === undefined || !jQuery(cur).is(until))) {
                if (cur.nodeType === 1) {
                    matched.push(cur);
                }
                cur = cur[dir];
            }
            return matched;
        },
        nth: function(cur, result, dir, elem) {
            result = result || 1;
            var num = 0;
            for (; cur; cur = cur[dir]) {
                if (cur.nodeType === 1 && ++num === result) {
                    break;
                }
            }
            return cur;
        },
        sibling: function(n, elem) {
            var r = [];
            for (; n; n = n.nextSibling) {
                if (n.nodeType === 1 && n !== elem) {
                    r.push(n);
                }
            }
            return r;
        }
    });
    var rclass = /[\n\t]/g,
        rspace = /\s+/,
        rreturn = /\r/g,
        rspecialurl = /href|src|style/,
        rtype = /(button|input)/i,
        rfocusable = /(button|input|object|select|textarea)/i,
        rclickable = /^(a|area)$/i,
        rradiocheck = /radio|checkbox/;
    jQuery.fn.extend({
        attr: function(name, value) {
            return access(this, name, value, true, jQuery.attr);
        },
        removeAttr: function(name, fn) {
            return this.each(function() {
                jQuery.attr(this, name, "");
                if (this.nodeType === 1) {
                    this.removeAttribute(name);
                }
            });
        },
        addClass: function(value) {
            if (jQuery.isFunction(value)) {
                return this.each(function(i) {
                    var self = jQuery(this);
                    self.addClass(value.call(this, i, self.attr("class")));
                });
            }
            if (value && typeof value === "string") {
                var classNames = (value || "").split(rspace);
                for (var i = 0, l = this.length; i < l; i++) {
                    var elem = this[i];
                    if (elem.nodeType === 1) {
                        if (!elem.className) {
                            elem.className = value;
                        } else {
                            var className = " " + elem.className + " ";
                            for (var c = 0, cl = classNames.length; c < cl; c++) {
                                if (className.indexOf(" " + classNames[c] + " ") < 0) {
                                    elem.className += " " + classNames[c];
                                }
                            }
                        }
                    }
                }
            }
            return this;
        },
        removeClass: function(value) {
            if (jQuery.isFunction(value)) {
                return this.each(function(i) {
                    var self = jQuery(this);
                    self.removeClass(value.call(this, i, self.attr("class")));
                });
            }
            if ((value && typeof value === "string") || value === undefined) {
                var classNames = (value || "").split(rspace);
                for (var i = 0, l = this.length; i < l; i++) {
                    var elem = this[i];
                    if (elem.nodeType === 1 && elem.className) {
                        if (value) {
                            var className = (" " + elem.className + " ").replace(rclass, " ");
                            for (var c = 0, cl = classNames.length; c < cl; c++) {
                                className = className.replace(" " + classNames[c] + " ", " ");
                            }
                            elem.className = className.substring(1, className.length - 1);
                        } else {
                            elem.className = "";
                        }
                    }
                }
            }
            return this;
        },
        toggleClass: function(value, stateVal) {
            var type = typeof value,
                isBool = typeof stateVal === "boolean";
            if (jQuery.isFunction(value)) {
                return this.each(function(i) {
                    var self = jQuery(this);
                    self.toggleClass(value.call(this, i, self.attr("class"), stateVal), stateVal);
                });
            }
            return this.each(function() {
                if (type === "string") {
                    var className, i = 0,
                        self = jQuery(this),
                        state = stateVal,
                        classNames = value.split(rspace);
                    while ((className = classNames[i++])) {
                        state = isBool ? state : !self.hasClass(className);
                        self[state ? "addClass" : "removeClass"](className);
                    }
                } else if (type === "undefined" || type === "boolean") {
                    if (this.className) {
                        jQuery.data(this, "__className__", this.className);
                    }
                    this.className = this.className || value === false ? "" : jQuery.data(this, "__className__") || "";
                }
            });
        },
        hasClass: function(selector) {
            var className = " " + selector + " ";
            for (var i = 0, l = this.length; i < l; i++) {
                if ((" " + this[i].className + " ").replace(rclass, " ").indexOf(className) > -1) {
                    return true;
                }
            }
            return false;
        },
        val: function(value) {
            if (value === undefined) {
                var elem = this[0];
                if (elem) {
                    if (jQuery.nodeName(elem, "option")) {
                        return (elem.attributes.value || {}).specified ? elem.value : elem.text;
                    }
                    if (jQuery.nodeName(elem, "select")) {
                        var index = elem.selectedIndex,
                            values = [],
                            options = elem.options,
                            one = elem.type === "select-one";
                        if (index < 0) {
                            return null;
                        }
                        for (var i = one ? index : 0, max = one ? index + 1 : options.length; i < max; i++) {
                            var option = options[i];
                            if (option.selected) {
                                value = jQuery(option).val();
                                if (one) {
                                    return value;
                                }
                                values.push(value);
                            }
                        }
                        return values;
                    }
                    if (rradiocheck.test(elem.type) && !jQuery.support.checkOn) {
                        return elem.getAttribute("value") === null ? "on" : elem.value;
                    }
                    return (elem.value || "").replace(rreturn, "");
                }
                return undefined;
            }
            var isFunction = jQuery.isFunction(value);
            return this.each(function(i) {
                var self = jQuery(this),
                    val = value;
                if (this.nodeType !== 1) {
                    return;
                }
                if (isFunction) {
                    val = value.call(this, i, self.val());
                }
                if (typeof val === "number") {
                    val += "";
                }
                if (jQuery.isArray(val) && rradiocheck.test(this.type)) {
                    this.checked = jQuery.inArray(self.val(), val) >= 0;
                } else if (jQuery.nodeName(this, "select")) {
                    var values = jQuery.makeArray(val);
                    jQuery("option", this).each(function() {
                        this.selected = jQuery.inArray(jQuery(this).val(), values) >= 0;
                    });
                    if (!values.length) {
                        this.selectedIndex = -1;
                    }
                } else {
                    this.value = val;
                }
            });
        }
    });
    jQuery.extend({
        attrFn: {
            val: true,
            css: true,
            html: true,
            text: true,
            data: true,
            width: true,
            height: true,
            offset: true
        },
        attr: function(elem, name, value, pass) {
            if (!elem || elem.nodeType === 3 || elem.nodeType === 8) {
                return undefined;
            }
            if (pass && name in jQuery.attrFn) {
                return jQuery(elem)[name](value);
            }
            var notxml = elem.nodeType !== 1 || !jQuery.isXMLDoc(elem),
                set = value !== undefined;
            name = notxml && jQuery.props[name] || name;
            if (elem.nodeType === 1) {
                var special = rspecialurl.test(name);
                if (name === "selected" && !jQuery.support.optSelected) {
                    var parent = elem.parentNode;
                    if (parent) {
                        parent.selectedIndex;
                        if (parent.parentNode) {
                            parent.parentNode.selectedIndex;
                        }
                    }
                }
                if (name in elem && notxml && !special) {
                    if (set) {
                        if (name === "type" && rtype.test(elem.nodeName) && elem.parentNode) {
                            throw "type property can't be changed";
                        }
                        elem[name] = value;
                    }
                    if (jQuery.nodeName(elem, "form") && elem.getAttributeNode(name)) {
                        return elem.getAttributeNode(name).nodeValue;
                    }
                    if (name === "tabIndex") {
                        var attributeNode = elem.getAttributeNode("tabIndex");
                        return attributeNode && attributeNode.specified ? attributeNode.value : rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ? 0 : undefined;
                    }
                    return elem[name];
                }
                if (!jQuery.support.style && notxml && name === "style") {
                    if (set) {
                        elem.style.cssText = "" + value;
                    }
                    return elem.style.cssText;
                }
                if (set) {
                    elem.setAttribute(name, "" + value);
                }
                var attr = !jQuery.support.hrefNormalized && notxml && special ? elem.getAttribute(name, 2) : elem.getAttribute(name);
                return attr === null ? undefined : attr;
            }
            return jQuery.style(elem, name, value);
        }
    });
    var rinlinejQuery = / jQuery\d+="(?:\d+|null)"/g,
        rleadingWhitespace = /^\s+/,
        rxhtmlTag = /(<([\w:]+)[^>]*?)\/>/g,
        rselfClosing = /^(?:area|br|col|embed|hr|img|input|link|meta|param)$/i,
        rtagName = /<([\w:]+)/,
        rtbody = /<tbody/i,
        rhtml = /<|&\w+;/,
        fcloseTag = function(all, front, tag) {
            return rselfClosing.test(tag) ? all : front + "></" + tag + ">";
        },
        wrapMap = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            area: [1, "<map>", "</map>"],
            _default: [0, "", ""]
        };
    wrapMap.optgroup = wrapMap.option;
    wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
    wrapMap.th = wrapMap.td;
    if (!jQuery.support.htmlSerialize) {
        wrapMap._default = [1, "div<div>", "</div>"];
    }
    jQuery.fn.extend({
        text: function(text) {
            if (jQuery.isFunction(text)) {
                return this.each(function(i) {
                    var self = jQuery(this);
                    return self.text(text.call(this, i, self.text()));
                });
            }
            if (typeof text !== "object" && text !== undefined) {
                return this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(text));
            }
            return jQuery.getText(this);
        },
        wrapAll: function(html) {
            if (jQuery.isFunction(html)) {
                return this.each(function(i) {
                    jQuery(this).wrapAll(html.call(this, i));
                });
            }
            if (this[0]) {
                var wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);
                if (this[0].parentNode) {
                    wrap.insertBefore(this[0]);
                }
                wrap.map(function() {
                    var elem = this;
                    while (elem.firstChild && elem.firstChild.nodeType === 1) {
                        elem = elem.firstChild;
                    }
                    return elem;
                }).append(this);
            }
            return this;
        },
        wrapInner: function(html) {
            return this.each(function() {
                var self = jQuery(this),
                    contents = self.contents();
                if (contents.length) {
                    contents.wrapAll(html);
                } else {
                    self.append(html);
                }
            });
        },
        wrap: function(html) {
            return this.each(function() {
                jQuery(this).wrapAll(html);
            });
        },
        unwrap: function() {
            return this.parent().each(function() {
                if (!jQuery.nodeName(this, "body")) {
                    jQuery(this).replaceWith(this.childNodes);
                }
            }).end();
        },
        append: function() {
            return this.domManip(arguments, true, function(elem) {
                if (this.nodeType === 1) {
                    this.appendChild(elem);
                }
            });
        },
        prepend: function() {
            return this.domManip(arguments, true, function(elem) {
                if (this.nodeType === 1) {
                    this.insertBefore(elem, this.firstChild);
                }
            });
        },
        before: function() {
            if (this[0] && this[0].parentNode) {
                return this.domManip(arguments, false, function(elem) {
                    this.parentNode.insertBefore(elem, this);
                });
            } else if (arguments.length) {
                var set = jQuery(arguments[0]);
                set.push.apply(set, this.toArray());
                return this.pushStack(set, "before", arguments);
            }
        },
        after: function() {
            if (this[0] && this[0].parentNode) {
                return this.domManip(arguments, false, function(elem) {
                    this.parentNode.insertBefore(elem, this.nextSibling);
                });
            } else if (arguments.length) {
                var set = this.pushStack(this, "after", arguments);
                set.push.apply(set, jQuery(arguments[0]).toArray());
                return set;
            }
        },
        clone: function(events) {
            var ret = this.map(function() {
                if (!jQuery.support.noCloneEvent && !jQuery.isXMLDoc(this)) {
                    var html = this.outerHTML,
                        ownerDocument = this.ownerDocument;
                    if (!html) {
                        var div = ownerDocument.createElement("div");
                        div.appendChild(this.cloneNode(true));
                        html = div.innerHTML;
                    }
                    return jQuery.clean([html.replace(rinlinejQuery, "").replace(rleadingWhitespace, "")], ownerDocument)[0];
                } else {
                    return this.cloneNode(true);
                }
            });
            if (events === true) {
                cloneCopyEvent(this, ret);
                cloneCopyEvent(this.find("*"), ret.find("*"));
            }
            return ret;
        },
        html: function(value) {
            if (value === undefined) {
                return this[0] && this[0].nodeType === 1 ? this[0].innerHTML.replace(rinlinejQuery, "") : null;
            } else if (typeof value === "string" && !/<script/i.test(value) && (jQuery.support.leadingWhitespace || !rleadingWhitespace.test(value)) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {
                try {
                    for (var i = 0, l = this.length; i < l; i++) {
                        if (this[i].nodeType === 1) {
                            cleanData(this[i].getElementsByTagName("*"));
                            this[i].innerHTML = value;
                        }
                    }
                } catch (e) {
                    this.empty().append(value);
                }
            } else if (jQuery.isFunction(value)) {
                this.each(function(i) {
                    var self = jQuery(this),
                        old = self.html();
                    self.empty().append(function() {
                        return value.call(this, i, old);
                    });
                });
            } else {
                this.empty().append(value);
            }
            return this;
        },
        replaceWith: function(value) {
            if (this[0] && this[0].parentNode) {
                if (!jQuery.isFunction(value)) {
                    value = jQuery(value).detach();
                }
                return this.each(function() {
                    var next = this.nextSibling,
                        parent = this.parentNode;
                    jQuery(this).remove();
                    if (next) {
                        jQuery(next).before(value);
                    } else {
                        jQuery(parent).append(value);
                    }
                });
            } else {
                return this.pushStack(jQuery(jQuery.isFunction(value) ? value() : value), "replaceWith", value);
            }
        },
        detach: function(selector) {
            return this.remove(selector, true);
        },
        domManip: function(args, table, callback) {
            var results, first, value = args[0],
                scripts = [];
            if (jQuery.isFunction(value)) {
                return this.each(function(i) {
                    var self = jQuery(this);
                    args[0] = value.call(this, i, table ? self.html() : undefined);
                    return self.domManip(args, table, callback);
                });
            }
            if (this[0]) {
                if (args[0] && args[0].parentNode && args[0].parentNode.nodeType === 11) {
                    results = {
                        fragment: args[0].parentNode
                    };
                } else {
                    results = buildFragment(args, this, scripts);
                }
                first = results.fragment.firstChild;
                if (first) {
                    table = table && jQuery.nodeName(first, "tr");
                    for (var i = 0, l = this.length; i < l; i++) {
                        callback.call(table ? root(this[i], first) : this[i], results.cacheable || this.length > 1 || i > 0 ? results.fragment.cloneNode(true) : results.fragment);
                    }
                }
                if (scripts) {
                    jQuery.each(scripts, evalScript);
                }
            }
            return this;

            function root(elem, cur) {
                return jQuery.nodeName(elem, "table") ? (elem.getElementsByTagName("tbody")[0] || elem.appendChild(elem.ownerDocument.createElement("tbody"))) : elem;
            }
        }
    });

    function cloneCopyEvent(orig, ret) {
        var i = 0;
        ret.each(function() {
            if (this.nodeName !== (orig[i] && orig[i].nodeName)) {
                return;
            }
            var oldData = jQuery.data(orig[i++]),
                curData = jQuery.data(this, oldData),
                events = oldData && oldData.events;
            if (events) {
                delete curData.handle;
                curData.events = {};
                for (var type in events) {
                    for (var handler in events[type]) {
                        jQuery.event.add(this, type, events[type][handler], events[type][handler].data);
                    }
                }
            }
        });
    }

    function buildFragment(args, nodes, scripts) {
        var fragment, cacheable, cached, cacheresults, doc;
        if (args.length === 1 && typeof args[0] === "string" && args[0].length < 512 && args[0].indexOf("<option") < 0) {
            cacheable = true;
            cacheresults = jQuery.fragments[args[0]];
            if (cacheresults) {
                if (cacheresults !== 1) {
                    fragment = cacheresults;
                }
                cached = true;
            }
        }
        if (!fragment) {
            doc = (nodes && nodes[0] ? nodes[0].ownerDocument || nodes[0] : document);
            fragment = doc.createDocumentFragment();
            jQuery.clean(args, doc, fragment, scripts);
        }
        if (cacheable) {
            jQuery.fragments[args[0]] = cacheresults ? fragment : 1;
        }
        return {
            fragment: fragment,
            cacheable: cacheable
        };
    }
    jQuery.fragments = {};
    jQuery.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(name, original) {
        jQuery.fn[name] = function(selector) {
            var ret = [],
                insert = jQuery(selector);
            for (var i = 0, l = insert.length; i < l; i++) {
                var elems = (i > 0 ? this.clone(true) : this).get();
                jQuery.fn[original].apply(jQuery(insert[i]), elems);
                ret = ret.concat(elems);
            }
            return this.pushStack(ret, name, insert.selector);
        };
    });
    jQuery.each({
        remove: function(selector, keepData) {
            if (!selector || jQuery.filter(selector, [this]).length) {
                if (!keepData && this.nodeType === 1) {
                    cleanData(this.getElementsByTagName("*"));
                    cleanData([this]);
                }
                if (this.parentNode) {
                    this.parentNode.removeChild(this);
                }
            }
        },
        empty: function() {
            if (this.nodeType === 1) {
                cleanData(this.getElementsByTagName("*"));
            }
            while (this.firstChild) {
                this.removeChild(this.firstChild);
            }
        }
    }, function(name, fn) {
        jQuery.fn[name] = function() {
            return this.each(fn, arguments);
        };
    });
    jQuery.extend({
        clean: function(elems, context, fragment, scripts) {
            context = context || document;
            if (typeof context.createElement === "undefined") {
                context = context.ownerDocument || context[0] && context[0].ownerDocument || document;
            }
            var ret = [];
            jQuery.each(elems, function(i, elem) {
                if (typeof elem === "number") {
                    elem += "";
                }
                if (!elem) {
                    return;
                }
                if (typeof elem === "string" && !rhtml.test(elem)) {
                    elem = context.createTextNode(elem);
                } else if (typeof elem === "string") {
                    elem = elem.replace(rxhtmlTag, fcloseTag);
                    var tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase(),
                        wrap = wrapMap[tag] || wrapMap._default,
                        depth = wrap[0],
                        div = context.createElement("div");
                    div.innerHTML = wrap[1] + elem + wrap[2];
                    while (depth--) {
                        div = div.lastChild;
                    }
                    if (!jQuery.support.tbody) {
                        var hasBody = rtbody.test(elem),
                            tbody = tag === "table" && !hasBody ? div.firstChild && div.firstChild.childNodes : wrap[1] === "<table>" && !hasBody ? div.childNodes : [];
                        for (var j = tbody.length - 1; j >= 0; --j) {
                            if (jQuery.nodeName(tbody[j], "tbody") && !tbody[j].childNodes.length) {
                                tbody[j].parentNode.removeChild(tbody[j]);
                            }
                        }
                    }
                    if (!jQuery.support.leadingWhitespace && rleadingWhitespace.test(elem)) {
                        div.insertBefore(context.createTextNode(rleadingWhitespace.exec(elem)[0]), div.firstChild);
                    }
                    elem = jQuery.makeArray(div.childNodes);
                }
                if (elem.nodeType) {
                    ret.push(elem);
                } else {
                    ret = jQuery.merge(ret, elem);
                }
            });
            if (fragment) {
                for (var i = 0; ret[i]; i++) {
                    if (scripts && jQuery.nodeName(ret[i], "script") && (!ret[i].type || ret[i].type.toLowerCase() === "text/javascript")) {
                        scripts.push(ret[i].parentNode ? ret[i].parentNode.removeChild(ret[i]) : ret[i]);
                    } else {
                        if (ret[i].nodeType === 1) {
                            ret.splice.apply(ret, [i + 1, 0].concat(jQuery.makeArray(ret[i].getElementsByTagName("script"))));
                        }
                        fragment.appendChild(ret[i]);
                    }
                }
            }
            return ret;
        }
    });

    function cleanData(elems) {
        for (var i = 0, elem, id;
            (elem = elems[i]) != null; i++) {
            if (!jQuery.noData[elem.nodeName.toLowerCase()] && (id = elem[expando])) {
                delete jQuery.cache[id];
            }
        }
    }
    var rexclude = /z-?index|font-?weight|opacity|zoom|line-?height/i,
        ralpha = /alpha\([^)]*\)/,
        ropacity = /opacity=([^)]*)/,
        rfloat = /float/i,
        rdashAlpha = /-([a-z])/ig,
        rupper = /([A-Z])/g,
        rnumpx = /^-?\d+(?:px)?$/i,
        rnum = /^-?\d/,
        cssShow = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        cssWidth = ["Left", "Right"],
        cssHeight = ["Top", "Bottom"],
        getComputedStyle = document.defaultView && document.defaultView.getComputedStyle,
        styleFloat = jQuery.support.cssFloat ? "cssFloat" : "styleFloat",
        fcamelCase = function(all, letter) {
            return letter.toUpperCase();
        };
    jQuery.fn.css = function(name, value) {
        return access(this, name, value, true, function(elem, name, value) {
            if (value === undefined) {
                return jQuery.curCSS(elem, name);
            }
            if (typeof value === "number" && !rexclude.test(name)) {
                value += "px";
            }
            jQuery.style(elem, name, value);
        });
    };
    jQuery.extend({
        style: function(elem, name, value) {
            if (!elem || elem.nodeType === 3 || elem.nodeType === 8) {
                return undefined;
            }
            if ((name === "width" || name === "height") && parseFloat(value) < 0) {
                value = undefined;
            }
            var style = elem.style || elem,
                set = value !== undefined;
            if (!jQuery.support.opacity && name === "opacity") {
                if (set) {
                    style.zoom = 1;
                    var opacity = parseInt(value, 10) + "" === "NaN" ? "" : "alpha(opacity=" + value * 100 + ")";
                    var filter = style.filter || jQuery.curCSS(elem, "filter") || "";
                    style.filter = ralpha.test(filter) ? filter.replace(ralpha, opacity) : opacity;
                }
                return style.filter && style.filter.indexOf("opacity=") >= 0 ? (parseFloat(ropacity.exec(style.filter)[1]) / 100) + "" : "";
            }
            if (rfloat.test(name)) {
                name = styleFloat;
            }
            name = name.replace(rdashAlpha, fcamelCase);
            if (set) {
                style[name] = value;
            }
            return style[name];
        },
        css: function(elem, name, force, extra) {
            if (name === "width" || name === "height") {
                var val, props = cssShow,
                    which = name === "width" ? cssWidth : cssHeight;

                function getWH() {
                    val = name === "width" ? elem.offsetWidth : elem.offsetHeight;
                    if (extra === "border") {
                        return;
                    }
                    jQuery.each(which, function() {
                        if (!extra) {
                            val -= parseFloat(jQuery.curCSS(elem, "padding" + this, true)) || 0;
                        }
                        if (extra === "margin") {
                            val += parseFloat(jQuery.curCSS(elem, "margin" + this, true)) || 0;
                        } else {
                            val -= parseFloat(jQuery.curCSS(elem, "border" + this + "Width", true)) || 0;
                        }
                    });
                }
                if (elem.offsetWidth !== 0) {
                    getWH();
                } else {
                    jQuery.swap(elem, props, getWH);
                }
                return Math.max(0, Math.round(val));
            }
            return jQuery.curCSS(elem, name, force);
        },
        curCSS: function(elem, name, force) {
            var ret, style = elem.style,
                filter;
            if (!jQuery.support.opacity && name === "opacity" && elem.currentStyle) {
                ret = ropacity.test(elem.currentStyle.filter || "") ? (parseFloat(RegExp.$1) / 100) + "" : "";
                return ret === "" ? "1" : ret;
            }
            if (rfloat.test(name)) {
                name = styleFloat;
            }
            if (!force && style && style[name]) {
                ret = style[name];
            } else if (getComputedStyle) {
                if (rfloat.test(name)) {
                    name = "float";
                }
                name = name.replace(rupper, "-$1").toLowerCase();
                var defaultView = elem.ownerDocument.defaultView;
                if (!defaultView) {
                    return null;
                }
                var computedStyle = defaultView.getComputedStyle(elem, null);
                if (computedStyle) {
                    ret = computedStyle.getPropertyValue(name);
                }
                if (name === "opacity" && ret === "") {
                    ret = "1";
                }
            } else if (elem.currentStyle) {
                var camelCase = name.replace(rdashAlpha, fcamelCase);
                ret = elem.currentStyle[name] || elem.currentStyle[camelCase];
                if (!rnumpx.test(ret) && rnum.test(ret)) {
                    var left = style.left,
                        rsLeft = elem.runtimeStyle.left;
                    elem.runtimeStyle.left = elem.currentStyle.left;
                    style.left = camelCase === "fontSize" ? "1em" : (ret || 0);
                    ret = style.pixelLeft + "px";
                    style.left = left;
                    elem.runtimeStyle.left = rsLeft;
                }
            }
            return ret;
        },
        swap: function(elem, options, callback) {
            var old = {};
            for (var name in options) {
                old[name] = elem.style[name];
                elem.style[name] = options[name];
            }
            callback.call(elem);
            for (var name in options) {
                elem.style[name] = old[name];
            }
        }
    });
    if (jQuery.expr && jQuery.expr.filters) {
        jQuery.expr.filters.hidden = function(elem) {
            var width = elem.offsetWidth,
                height = elem.offsetHeight,
                skip = elem.nodeName.toLowerCase() === "tr";
            return width === 0 && height === 0 && !skip ? true : width > 0 && height > 0 && !skip ? false : jQuery.curCSS(elem, "display") === "none";
        };
        jQuery.expr.filters.visible = function(elem) {
            return !jQuery.expr.filters.hidden(elem);
        };
    }
    var jsc = now(),
        rscript = /<script(.|\s)*?\/script>/gi,
        rselectTextarea = /select|textarea/i,
        rinput = /color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week/i,
        jsre = /=\?(&|$)/,
        rquery = /\?/,
        rts = /(\?|&)_=.*?(&|$)/,
        rurl = /^(\w+:)?\/\/([^\/?#]+)/,
        r20 = /%20/g;
    jQuery.fn.extend({
        _load: jQuery.fn.load,
        load: function(url, params, callback) {
            if (typeof url !== "string") {
                return this._load(url);
            } else if (!this.length) {
                return this;
            }
            var off = url.indexOf(" ");
            if (off >= 0) {
                var selector = url.slice(off, url.length);
                url = url.slice(0, off);
            }
            var type = "GET";
            if (params) {
                if (jQuery.isFunction(params)) {
                    callback = params;
                    params = null;
                } else if (typeof params === "object") {
                    params = jQuery.param(params, jQuery.ajaxSettings.traditional);
                    type = "POST";
                }
            }
            jQuery.ajax({
                url: url,
                type: type,
                dataType: "html",
                data: params,
                context: this,
                complete: function(res, status) {
                    if (status === "success" || status === "notmodified") {
                        this.html(selector ? jQuery("<div />").append(res.responseText.replace(rscript, "")).find(selector) : res.responseText);
                    }
                    if (callback) {
                        this.each(callback, [res.responseText, status, res]);
                    }
                }
            });
            return this;
        },
        serialize: function() {
            return jQuery.param(this.serializeArray());
        },
        serializeArray: function() {
            return this.map(function() {
                return this.elements ? jQuery.makeArray(this.elements) : this;
            }).filter(function() {
                return this.name && !this.disabled && (this.checked || rselectTextarea.test(this.nodeName) || rinput.test(this.type));
            }).map(function(i, elem) {
                var val = jQuery(this).val();
                return val == null ? null : jQuery.isArray(val) ? jQuery.map(val, function(val, i) {
                    return {
                        name: elem.name,
                        value: val
                    };
                }) : {
                    name: elem.name,
                    value: val
                };
            }).get();
        }
    });
    jQuery.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(i, o) {
        jQuery.fn[o] = function(f) {
            return this.bind(o, f);
        };
    });
    jQuery.extend({
        get: function(url, data, callback, type) {
            if (jQuery.isFunction(data)) {
                type = type || callback;
                callback = data;
                data = null;
            }
            return jQuery.ajax({
                type: "GET",
                url: url,
                data: data,
                success: callback,
                dataType: type
            });
        },
        getScript: function(url, callback) {
            return jQuery.get(url, null, callback, "script");
        },
        getJSON: function(url, data, callback) {
            return jQuery.get(url, data, callback, "json");
        },
        post: function(url, data, callback, type) {
            if (jQuery.isFunction(data)) {
                type = type || callback;
                callback = data;
                data = {};
            }
            return jQuery.ajax({
                type: "POST",
                url: url,
                data: data,
                success: callback,
                dataType: type
            });
        },
        ajaxSetup: function(settings) {
            jQuery.extend(jQuery.ajaxSettings, settings);
        },
        ajaxSettings: {
            url: location.href,
            global: true,
            type: "GET",
            contentType: "application/x-www-form-urlencoded",
            processData: true,
            async: true,
            xhr: window.XMLHttpRequest && (window.location.protocol !== "file:" || !window.ActiveXObject) ? function() {
                return new window.XMLHttpRequest();
            } : function() {
                try {
                    return new window.ActiveXObject("Microsoft.XMLHTTP");
                } catch (e) {}
            },
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                script: "text/javascript, application/javascript",
                json: "application/json, text/javascript",
                text: "text/plain",
                _default: "*/*"
            }
        },
        lastModified: {},
        etag: {},
        ajax: function(origSettings) {
            var s = jQuery.extend(true, {}, jQuery.ajaxSettings, origSettings);
            var jsonp, status, data, callbackContext = s.context || s,
                type = s.type.toUpperCase();
            if (s.data && s.processData && typeof s.data !== "string") {
                s.data = jQuery.param(s.data, s.traditional);
            }
            if (s.dataType === "jsonp") {
                if (type === "GET") {
                    if (!jsre.test(s.url)) {
                        s.url += (rquery.test(s.url) ? "&" : "?") + (s.jsonp || "callback") + "=?";
                    }
                } else if (!s.data || !jsre.test(s.data)) {
                    s.data = (s.data ? s.data + "&" : "") + (s.jsonp || "callback") + "=?";
                }
                s.dataType = "json";
            }
            if (s.dataType === "json" && (s.data && jsre.test(s.data) || jsre.test(s.url))) {
                jsonp = s.jsonpCallback || ("jsonp" + jsc++);
                if (s.data) {
                    s.data = (s.data + "").replace(jsre, "=" + jsonp + "$1");
                }
                s.url = s.url.replace(jsre, "=" + jsonp + "$1");
                s.dataType = "script";
                window[jsonp] = window[jsonp] || function(tmp) {
                    data = tmp;
                    success();
                    complete();
                    window[jsonp] = undefined;
                    try {
                        delete window[jsonp];
                    } catch (e) {}
                    if (head) {
                        head.removeChild(script);
                    }
                };
            }
            if (s.dataType === "script" && s.cache === null) {
                s.cache = false;
            }
            if (s.cache === false && type === "GET") {
                var ts = now();
                var ret = s.url.replace(rts, "$1_=" + ts + "$2");
                s.url = ret + ((ret === s.url) ? (rquery.test(s.url) ? "&" : "?") + "_=" + ts : "");
            }
            if (s.data && type === "GET") {
                s.url += (rquery.test(s.url) ? "&" : "?") + s.data;
            }
            if (s.global && !jQuery.active++) {
                jQuery.event.trigger("ajaxStart");
            }
            var parts = rurl.exec(s.url),
                remote = parts && (parts[1] && parts[1] !== location.protocol || parts[2] !== location.host);
            if (s.dataType === "script" && type === "GET" && remote) {
                var head = document.getElementsByTagName("head")[0] || document.documentElement;
                var script = document.createElement("script");
                script.src = s.url;
                if (s.scriptCharset) {
                    script.charset = s.scriptCharset;
                }
                if (!jsonp) {
                    var done = false;
                    script.onload = script.onreadystatechange = function() {
                        if (!done && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
                            done = true;
                            success();
                            complete();
                            script.onload = script.onreadystatechange = null;
                            if (head && script.parentNode) {
                                head.removeChild(script);
                            }
                        }
                    };
                }
                head.insertBefore(script, head.firstChild);
                return undefined;
            }
            var requestDone = false;
            var xhr = s.xhr();
            if (!xhr) {
                return;
            }
            if (s.username) {
                xhr.open(type, s.url, s.async, s.username, s.password);
            } else {
                xhr.open(type, s.url, s.async);
            }
            try {
                if (s.data || origSettings && origSettings.contentType) {
                    xhr.setRequestHeader("Content-Type", s.contentType);
                }
                if (s.ifModified) {
                    if (jQuery.lastModified[s.url]) {
                        xhr.setRequestHeader("If-Modified-Since", jQuery.lastModified[s.url]);
                    }
                    if (jQuery.etag[s.url]) {
                        xhr.setRequestHeader("If-None-Match", jQuery.etag[s.url]);
                    }
                }
                if (!remote) {
                    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                }
                xhr.setRequestHeader("Accept", s.dataType && s.accepts[s.dataType] ? s.accepts[s.dataType] + ", */*" : s.accepts._default);
            } catch (e) {}
            if (s.beforeSend && s.beforeSend.call(callbackContext, xhr, s) === false) {
                if (s.global && !--jQuery.active) {
                    jQuery.event.trigger("ajaxStop");
                }
                xhr.abort();
                return false;
            }
            if (s.global) {
                trigger("ajaxSend", [xhr, s]);
            }
            var onreadystatechange = xhr.onreadystatechange = function(isTimeout) {
                if (!xhr || xhr.readyState === 0) {
                    if (!requestDone) {
                        complete();
                    }
                    requestDone = true;
                    if (xhr) {
                        xhr.onreadystatechange = jQuery.noop;
                    }
                } else if (!requestDone && xhr && (xhr.readyState === 4 || isTimeout === "timeout")) {
                    requestDone = true;
                    xhr.onreadystatechange = jQuery.noop;
                    status = isTimeout === "timeout" ? "timeout" : !jQuery.httpSuccess(xhr) ? "error" : s.ifModified && jQuery.httpNotModified(xhr, s.url) ? "notmodified" : "success";
                    if (status === "success") {
                        try {
                            data = jQuery.httpData(xhr, s.dataType, s);
                        } catch (e) {
                            status = "parsererror";
                        }
                    }
                    if (status === "success" || status === "notmodified") {
                        if (!jsonp) {
                            success();
                        }
                    } else {
                        jQuery.handleError(s, xhr, status);
                    }
                    complete();
                    if (isTimeout === "timeout") {
                        xhr.abort();
                    }
                    if (s.async) {
                        xhr = null;
                    }
                }
            };
            try {
                var oldAbort = xhr.abort;
                xhr.abort = function() {
                    oldAbort.call(xhr);
                    if (xhr) {
                        xhr.readyState = 0;
                    }
                    onreadystatechange();
                };
            } catch (e) {}
            if (s.async && s.timeout > 0) {
                setTimeout(function() {
                    if (xhr && !requestDone) {
                        onreadystatechange("timeout");
                    }
                }, s.timeout);
            }
            try {
                xhr.send(type === "POST" || type === "PUT" ? s.data : null);
            } catch (e) {
                jQuery.handleError(s, xhr, null, e);
                complete();
            }
            if (!s.async) {
                onreadystatechange();
            }

            function success() {
                if (s.success) {
                    s.success.call(callbackContext, data, status, xhr);
                }
                if (s.global) {
                    trigger("ajaxSuccess", [xhr, s]);
                }
            }

            function complete() {
                if (s.complete) {
                    s.complete.call(callbackContext, xhr, status);
                }
                if (s.global) {
                    trigger("ajaxComplete", [xhr, s]);
                }
                if (s.global && !--jQuery.active) {
                    jQuery.event.trigger("ajaxStop");
                }
            }

            function trigger(type, args) {
                (s.context ? jQuery(s.context) : jQuery.event).trigger(type, args);
            }
            return xhr;
        },
        handleError: function(s, xhr, status, e) {
            if (s.error) {
                s.error.call(s.context || window, xhr, status, e);
            }
            if (s.global) {
                (s.context ? jQuery(s.context) : jQuery.event).trigger("ajaxError", [xhr, s, e]);
            }
        },
        active: 0,
        httpSuccess: function(xhr) {
            try {
                return !xhr.status && location.protocol === "file:" || (xhr.status >= 200 && xhr.status < 300) || xhr.status === 304 || xhr.status === 1223 || xhr.status === 0;
            } catch (e) {}
            return false;
        },
        httpNotModified: function(xhr, url) {
            var lastModified = xhr.getResponseHeader("Last-Modified"),
                etag = xhr.getResponseHeader("Etag");
            if (lastModified) {
                jQuery.lastModified[url] = lastModified;
            }
            if (etag) {
                jQuery.etag[url] = etag;
            }
            return xhr.status === 304 || xhr.status === 0;
        },
        httpData: function(xhr, type, s) {
            var ct = xhr.getResponseHeader("content-type") || "",
                xml = type === "xml" || !type && ct.indexOf("xml") >= 0,
                data = xml ? xhr.responseXML : xhr.responseText;
            if (xml && data.documentElement.nodeName === "parsererror") {
                throw "parsererror";
            }
            if (s && s.dataFilter) {
                data = s.dataFilter(data, type);
            }
            if (typeof data === "string") {
                if (type === "json" || !type && ct.indexOf("json") >= 0) {
                    if (/^[\],:{}\s]*$/.test(data.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
                        if (window.JSON && window.JSON.parse) {
                            data = window.JSON.parse(data);
                        } else {
                            data = (new Function("return " + data))();
                        }
                    } else {
                        throw "Invalid JSON: " + data;
                    }
                } else if (type === "script" || !type && ct.indexOf("javascript") >= 0) {
                    jQuery.globalEval(data);
                }
            }
            return data;
        },
        param: function(a, traditional) {
            var s = [];
            if (traditional === undefined) {
                traditional = jQuery.ajaxSettings.traditional;
            }

            function add(key, value) {
                value = jQuery.isFunction(value) ? value() : value;
                s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
            }
            if (jQuery.isArray(a) || a.jquery) {
                jQuery.each(a, function() {
                    add(this.name, this.value);
                });
            } else {
                jQuery.each(a, function buildParams(prefix, obj) {
                    if (jQuery.isArray(obj)) {
                        jQuery.each(obj, function(i, v) {
                            if (traditional) {
                                add(prefix, v);
                            } else {
                                buildParams(prefix + "[" + (typeof v === "object" || jQuery.isArray(v) ? i : "") + "]", v);
                            }
                        });
                    } else if (!traditional && typeof obj === "object") {
                        jQuery.each(obj, function(k, v) {
                            buildParams(prefix + "[" + k + "]", v);
                        });
                    } else {
                        add(prefix, obj);
                    }
                });
            }
            return s.join("&").replace(r20, "+");
        }
    });
    var elemdisplay = {},
        rfxtypes = /toggle|show|hide/,
        rfxnum = /^([+-]=)?([\d+-.]+)(.*)$/,
        timerId, fxAttrs = [
            ["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"],
            ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"],
            ["opacity"]
        ];
    jQuery.fn.extend({
        show: function(speed, callback) {
            if (speed != null) {
                return this.animate(genFx("show", 3), speed, callback);
            } else {
                for (var i = 0, l = this.length; i < l; i++) {
                    var old = jQuery.data(this[i], "olddisplay");
                    this[i].style.display = old || "";
                    if (jQuery.css(this[i], "display") === "none") {
                        var nodeName = this[i].nodeName,
                            display;
                        if (elemdisplay[nodeName]) {
                            display = elemdisplay[nodeName];
                        } else {
                            var elem = jQuery("<" + nodeName + " />").appendTo("body");
                            display = elem.css("display");
                            if (display === "none") {
                                display = "block";
                            }
                            elem.remove();
                            elemdisplay[nodeName] = display;
                        }
                        jQuery.data(this[i], "olddisplay", display);
                    }
                }
                for (var j = 0, k = this.length; j < k; j++) {
                    this[j].style.display = jQuery.data(this[j], "olddisplay") || "";
                }
                return this;
            }
        },
        hide: function(speed, callback) {
            if (speed != null) {
                return this.animate(genFx("hide", 3), speed, callback);
            } else {
                for (var i = 0, l = this.length; i < l; i++) {
                    var old = jQuery.data(this[i], "olddisplay");
                    if (!old && old !== "none") {
                        jQuery.data(this[i], "olddisplay", jQuery.css(this[i], "display"));
                    }
                }
                for (var j = 0, k = this.length; j < k; j++) {
                    this[j].style.display = "none";
                }
                return this;
            }
        },
        _toggle: jQuery.fn.toggle,
        toggle: function(fn, fn2) {
            var bool = typeof fn === "boolean";
            if (jQuery.isFunction(fn) && jQuery.isFunction(fn2)) {
                this._toggle.apply(this, arguments);
            } else if (fn == null || bool) {
                this.each(function() {
                    var state = bool ? fn : jQuery(this).is(":hidden");
                    jQuery(this)[state ? "show" : "hide"]();
                });
            } else {
                this.animate(genFx("toggle", 3), fn, fn2);
            }
            return this;
        },
        fadeTo: function(speed, to, callback) {
            return this.filter(":hidden").css("opacity", 0).show().end().animate({
                opacity: to
            }, speed, callback);
        },
        animate: function(prop, speed, easing, callback) {
            var optall = jQuery.speed(speed, easing, callback);
            if (jQuery.isEmptyObject(prop)) {
                return this.each(optall.complete);
            }
            return this[optall.queue === false ? "each" : "queue"](function() {
                var opt = jQuery.extend({}, optall),
                    p, hidden = this.nodeType === 1 && jQuery(this).is(":hidden"),
                    self = this;
                for (p in prop) {
                    var name = p.replace(rdashAlpha, fcamelCase);
                    if (p !== name) {
                        prop[name] = prop[p];
                        delete prop[p];
                        p = name;
                    }
                    if (prop[p] === "hide" && hidden || prop[p] === "show" && !hidden) {
                        return opt.complete.call(this);
                    }
                    if ((p === "height" || p === "width") && this.style) {
                        opt.display = jQuery.css(this, "display");
                        opt.overflow = this.style.overflow;
                    }
                    if (jQuery.isArray(prop[p])) {
                        (opt.specialEasing = opt.specialEasing || {})[p] = prop[p][1];
                        prop[p] = prop[p][0];
                    }
                }
                if (opt.overflow != null) {
                    this.style.overflow = "hidden";
                }
                opt.curAnim = jQuery.extend({}, prop);
                jQuery.each(prop, function(name, val) {
                    var e = new jQuery.fx(self, opt, name);
                    if (rfxtypes.test(val)) {
                        e[val === "toggle" ? hidden ? "show" : "hide" : val](prop);
                    } else {
                        var parts = rfxnum.exec(val),
                            start = e.cur(true) || 0;
                        if (parts) {
                            var end = parseFloat(parts[2]),
                                unit = parts[3] || "px";
                            if (unit !== "px") {
                                self.style[name] = (end || 1) + unit;
                                start = ((end || 1) / e.cur(true)) * start;
                                self.style[name] = start + unit;
                            }
                            if (parts[1]) {
                                end = ((parts[1] === "-=" ? -1 : 1) * end) + start;
                            }
                            e.custom(start, end, unit);
                        } else {
                            e.custom(start, val, "");
                        }
                    }
                });
                return true;
            });
        },
        stop: function(clearQueue, gotoEnd) {
            var timers = jQuery.timers;
            if (clearQueue) {
                this.queue([]);
            }
            this.each(function() {
                for (var i = timers.length - 1; i >= 0; i--) {
                    if (timers[i].elem === this) {
                        if (gotoEnd) {
                            timers[i](true);
                        }
                        timers.splice(i, 1);
                    }
                }
            });
            if (!gotoEnd) {
                this.dequeue();
            }
            return this;
        }
    });
    jQuery.each({
        slideDown: genFx("show", 1),
        slideUp: genFx("hide", 1),
        slideToggle: genFx("toggle", 1),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        }
    }, function(name, props) {
        jQuery.fn[name] = function(speed, callback) {
            return this.animate(props, speed, callback);
        };
    });
    jQuery.extend({
        speed: function(speed, easing, fn) {
            var opt = speed && typeof speed === "object" ? speed : {
                complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
                duration: speed,
                easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
            };
            opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration : jQuery.fx.speeds[opt.duration] || jQuery.fx.speeds._default;
            opt.old = opt.complete;
            opt.complete = function() {
                if (opt.queue !== false) {
                    jQuery(this).dequeue();
                }
                if (jQuery.isFunction(opt.old)) {
                    opt.old.call(this);
                }
            };
            return opt;
        },
        easing: {
            linear: function(p, n, firstNum, diff) {
                return firstNum + diff * p;
            },
            swing: function(p, n, firstNum, diff) {
                return ((-Math.cos(p * Math.PI) / 2) + 0.5) * diff + firstNum;
            }
        },
        timers: [],
        fx: function(elem, options, prop) {
            this.options = options;
            this.elem = elem;
            this.prop = prop;
            if (!options.orig) {
                options.orig = {};
            }
        }
    });
    jQuery.fx.prototype = {
        update: function() {
            if (this.options.step) {
                this.options.step.call(this.elem, this.now, this);
            }
            (jQuery.fx.step[this.prop] || jQuery.fx.step._default)(this);
            if ((this.prop === "height" || this.prop === "width") && this.elem.style) {
                this.elem.style.display = "block";
            }
        },
        cur: function(force) {
            if (this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null)) {
                return this.elem[this.prop];
            }
            var r = parseFloat(jQuery.css(this.elem, this.prop, force));
            return r && r > -10000 ? r : parseFloat(jQuery.curCSS(this.elem, this.prop)) || 0;
        },
        custom: function(from, to, unit) {
            this.startTime = now();
            this.start = from;
            this.end = to;
            this.unit = unit || this.unit || "px";
            this.now = this.start;
            this.pos = this.state = 0;
            var self = this;

            function t(gotoEnd) {
                return self.step(gotoEnd);
            }
            t.elem = this.elem;
            if (t() && jQuery.timers.push(t) && !timerId) {
                timerId = setInterval(jQuery.fx.tick, 13);
            }
        },
        show: function() {
            this.options.orig[this.prop] = jQuery.style(this.elem, this.prop);
            this.options.show = true;
            this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur());
            jQuery(this.elem).show();
        },
        hide: function() {
            this.options.orig[this.prop] = jQuery.style(this.elem, this.prop);
            this.options.hide = true;
            this.custom(this.cur(), 0);
        },
        step: function(gotoEnd) {
            var t = now(),
                done = true;
            if (gotoEnd || t >= this.options.duration + this.startTime) {
                this.now = this.end;
                this.pos = this.state = 1;
                this.update();
                this.options.curAnim[this.prop] = true;
                for (var i in this.options.curAnim) {
                    if (this.options.curAnim[i] !== true) {
                        done = false;
                    }
                }
                if (done) {
                    if (this.options.display != null) {
                        this.elem.style.overflow = this.options.overflow;
                        var old = jQuery.data(this.elem, "olddisplay");
                        this.elem.style.display = old ? old : this.options.display;
                        if (jQuery.css(this.elem, "display") === "none") {
                            this.elem.style.display = "block";
                        }
                    }
                    if (this.options.hide) {
                        jQuery(this.elem).hide();
                    }
                    if (this.options.hide || this.options.show) {
                        for (var p in this.options.curAnim) {
                            jQuery.style(this.elem, p, this.options.orig[p]);
                        }
                    }
                    this.options.complete.call(this.elem);
                }
                return false;
            } else {
                var n = t - this.startTime;
                this.state = n / this.options.duration;
                var specialEasing = this.options.specialEasing && this.options.specialEasing[this.prop];
                var defaultEasing = this.options.easing || (jQuery.easing.swing ? "swing" : "linear");
                this.pos = jQuery.easing[specialEasing || defaultEasing](this.state, n, 0, 1, this.options.duration);
                this.now = this.start + ((this.end - this.start) * this.pos);
                this.update();
            }
            return true;
        }
    };
    jQuery.extend(jQuery.fx, {
        tick: function() {
            var timers = jQuery.timers;
            for (var i = 0; i < timers.length; i++) {
                if (!timers[i]()) {
                    timers.splice(i--, 1);
                }
            }
            if (!timers.length) {
                jQuery.fx.stop();
            }
        },
        stop: function() {
            clearInterval(timerId);
            timerId = null;
        },
        speeds: {
            slow: 600,
            fast: 200,
            _default: 400
        },
        step: {
            opacity: function(fx) {
                jQuery.style(fx.elem, "opacity", fx.now);
            },
            _default: function(fx) {
                if (fx.elem.style && fx.elem.style[fx.prop] != null) {
                    fx.elem.style[fx.prop] = (fx.prop === "width" || fx.prop === "height" ? Math.max(0, fx.now) : fx.now) + fx.unit;
                } else {
                    fx.elem[fx.prop] = fx.now;
                }
            }
        }
    });
    if (jQuery.expr && jQuery.expr.filters) {
        jQuery.expr.filters.animated = function(elem) {
            return jQuery.grep(jQuery.timers, function(fn) {
                return elem === fn.elem;
            }).length;
        };
    }

    function genFx(type, num) {
        var obj = {};
        jQuery.each(fxAttrs.concat.apply([], fxAttrs.slice(0, num)), function() {
            obj[this] = type;
        });
        return obj;
    }
    if ("getBoundingClientRect" in document.documentElement) {
        jQuery.fn.offset = function(options) {
            var elem = this[0];
            if (!elem || !elem.ownerDocument) {
                return null;
            }
            if (options) {
                return this.each(function(i) {
                    jQuery.offset.setOffset(this, options, i);
                });
            }
            if (elem === elem.ownerDocument.body) {
                return jQuery.offset.bodyOffset(elem);
            }
            var box = elem.getBoundingClientRect(),
                doc = elem.ownerDocument,
                body = doc.body,
                docElem = doc.documentElement,
                clientTop = docElem.clientTop || body.clientTop || 0,
                clientLeft = docElem.clientLeft || body.clientLeft || 0,
                top = box.top + (self.pageYOffset || jQuery.support.boxModel && docElem.scrollTop || body.scrollTop) - clientTop,
                left = box.left + (self.pageXOffset || jQuery.support.boxModel && docElem.scrollLeft || body.scrollLeft) - clientLeft;
            return {
                top: top,
                left: left
            };
        };
    } else {
        jQuery.fn.offset = function(options) {
            var elem = this[0];
            if (!elem || !elem.ownerDocument) {
                return null;
            }
            if (options) {
                return this.each(function(i) {
                    jQuery.offset.setOffset(this, options, i);
                });
            }
            if (elem === elem.ownerDocument.body) {
                return jQuery.offset.bodyOffset(elem);
            }
            jQuery.offset.initialize();
            var offsetParent = elem.offsetParent,
                prevOffsetParent = elem,
                doc = elem.ownerDocument,
                computedStyle, docElem = doc.documentElement,
                body = doc.body,
                defaultView = doc.defaultView,
                prevComputedStyle = defaultView ? defaultView.getComputedStyle(elem, null) : elem.currentStyle,
                top = elem.offsetTop,
                left = elem.offsetLeft;
            while ((elem = elem.parentNode) && elem !== body && elem !== docElem) {
                if (jQuery.offset.supportsFixedPosition && prevComputedStyle.position === "fixed") {
                    break;
                }
                computedStyle = defaultView ? defaultView.getComputedStyle(elem, null) : elem.currentStyle;
                top -= elem.scrollTop;
                left -= elem.scrollLeft;
                if (elem === offsetParent) {
                    top += elem.offsetTop;
                    left += elem.offsetLeft;
                    if (jQuery.offset.doesNotAddBorder && !(jQuery.offset.doesAddBorderForTableAndCells && /^t(able|d|h)$/i.test(elem.nodeName))) {
                        top += parseFloat(computedStyle.borderTopWidth) || 0;
                        left += parseFloat(computedStyle.borderLeftWidth) || 0;
                    }
                    prevOffsetParent = offsetParent, offsetParent = elem.offsetParent;
                }
                if (jQuery.offset.subtractsBorderForOverflowNotVisible && computedStyle.overflow !== "visible") {
                    top += parseFloat(computedStyle.borderTopWidth) || 0;
                    left += parseFloat(computedStyle.borderLeftWidth) || 0;
                }
                prevComputedStyle = computedStyle;
            }
            if (prevComputedStyle.position === "relative" || prevComputedStyle.position === "static") {
                top += body.offsetTop;
                left += body.offsetLeft;
            }
            if (jQuery.offset.supportsFixedPosition && prevComputedStyle.position === "fixed") {
                top += Math.max(docElem.scrollTop, body.scrollTop);
                left += Math.max(docElem.scrollLeft, body.scrollLeft);
            }
            return {
                top: top,
                left: left
            };
        };
    }
    jQuery.offset = {
        initialize: function() {
            var body = document.body,
                container = document.createElement("div"),
                innerDiv, checkDiv, table, td, bodyMarginTop = parseFloat(jQuery.curCSS(body, "marginTop", true)) || 0,
                html = "<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
            jQuery.extend(container.style, {
                position: "absolute",
                top: 0,
                left: 0,
                margin: 0,
                border: 0,
                width: "1px",
                height: "1px",
                visibility: "hidden"
            });
            container.innerHTML = html;
            body.insertBefore(container, body.firstChild);
            innerDiv = container.firstChild;
            checkDiv = innerDiv.firstChild;
            td = innerDiv.nextSibling.firstChild.firstChild;
            this.doesNotAddBorder = (checkDiv.offsetTop !== 5);
            this.doesAddBorderForTableAndCells = (td.offsetTop === 5);
            checkDiv.style.position = "fixed", checkDiv.style.top = "20px";
            this.supportsFixedPosition = (checkDiv.offsetTop === 20 || checkDiv.offsetTop === 15);
            checkDiv.style.position = checkDiv.style.top = "";
            innerDiv.style.overflow = "hidden", innerDiv.style.position = "relative";
            this.subtractsBorderForOverflowNotVisible = (checkDiv.offsetTop === -5);
            this.doesNotIncludeMarginInBodyOffset = (body.offsetTop !== bodyMarginTop);
            body.removeChild(container);
            body = container = innerDiv = checkDiv = table = td = null;
            jQuery.offset.initialize = jQuery.noop;
        },
        bodyOffset: function(body) {
            var top = body.offsetTop,
                left = body.offsetLeft;
            jQuery.offset.initialize();
            if (jQuery.offset.doesNotIncludeMarginInBodyOffset) {
                top += parseFloat(jQuery.curCSS(body, "marginTop", true)) || 0;
                left += parseFloat(jQuery.curCSS(body, "marginLeft", true)) || 0;
            }
            return {
                top: top,
                left: left
            };
        },
        setOffset: function(elem, options, i) {
            if (/static/.test(jQuery.curCSS(elem, "position"))) {
                elem.style.position = "relative";
            }
            var curElem = jQuery(elem),
                curOffset = curElem.offset(),
                curTop = parseInt(jQuery.curCSS(elem, "top", true), 10) || 0,
                curLeft = parseInt(jQuery.curCSS(elem, "left", true), 10) || 0;
            if (jQuery.isFunction(options)) {
                options = options.call(elem, i, curOffset);
            }
            var props = {
                top: (options.top - curOffset.top) + curTop,
                left: (options.left - curOffset.left) + curLeft
            };
            if ("using" in options) {
                options.using.call(elem, props);
            } else {
                curElem.css(props);
            }
        }
    };
    jQuery.fn.extend({
        position: function() {
            if (!this[0]) {
                return null;
            }
            var elem = this[0],
                offsetParent = this.offsetParent(),
                offset = this.offset(),
                parentOffset = /^body|html$/i.test(offsetParent[0].nodeName) ? {
                    top: 0,
                    left: 0
                } : offsetParent.offset();
            offset.top -= parseFloat(jQuery.curCSS(elem, "marginTop", true)) || 0;
            offset.left -= parseFloat(jQuery.curCSS(elem, "marginLeft", true)) || 0;
            parentOffset.top += parseFloat(jQuery.curCSS(offsetParent[0], "borderTopWidth", true)) || 0;
            parentOffset.left += parseFloat(jQuery.curCSS(offsetParent[0], "borderLeftWidth", true)) || 0;
            return {
                top: offset.top - parentOffset.top,
                left: offset.left - parentOffset.left
            };
        },
        offsetParent: function() {
            return this.map(function() {
                var offsetParent = this.offsetParent || document.body;
                while (offsetParent && (!/^body|html$/i.test(offsetParent.nodeName) && jQuery.css(offsetParent, "position") === "static")) {
                    offsetParent = offsetParent.offsetParent;
                }
                return offsetParent;
            });
        }
    });
    jQuery.each(["Left", "Top"], function(i, name) {
        var method = "scroll" + name;
        jQuery.fn[method] = function(val) {
            var elem = this[0],
                win;
            if (!elem) {
                return null;
            }
            if (val !== undefined) {
                return this.each(function() {
                    win = getWindow(this);
                    if (win) {
                        win.scrollTo(!i ? val : jQuery(win).scrollLeft(), i ? val : jQuery(win).scrollTop());
                    } else {
                        this[method] = val;
                    }
                });
            } else {
                win = getWindow(elem);
                return win ? ("pageXOffset" in win) ? win[i ? "pageYOffset" : "pageXOffset"] : jQuery.support.boxModel && win.document.documentElement[method] || win.document.body[method] : elem[method];
            }
        };
    });

    function getWindow(elem) {
        return ("scrollTo" in elem && elem.document) ? elem : elem.nodeType === 9 ? elem.defaultView || elem.parentWindow : false;
    }
    jQuery.each(["Height", "Width"], function(i, name) {
        var type = name.toLowerCase();
        jQuery.fn["inner" + name] = function() {
            return this[0] ? jQuery.css(this[0], type, false, "padding") : null;
        };
        jQuery.fn["outer" + name] = function(margin) {
            return this[0] ? jQuery.css(this[0], type, false, margin ? "margin" : "border") : null;
        };
        jQuery.fn[type] = function(size) {
            var elem = this[0];
            if (!elem) {
                return size == null ? null : this;
            }
            return ("scrollTo" in elem && elem.document) ? elem.document.compatMode === "CSS1Compat" && elem.document.documentElement["client" + name] || elem.document.body["client" + name] : (elem.nodeType === 9) ? Math.max(elem.documentElement["client" + name], elem.body["scroll" + name], elem.documentElement["scroll" + name], elem.body["offset" + name], elem.documentElement["offset" + name]) : size === undefined ? jQuery.css(elem, type) : this.css(type, typeof size === "string" ? size : size + "px");
        };
    });
    window.jQuery = window.$ = jQuery;
})(window);﻿
(function($) {
    $.fn.hoverIntent = function(f, g) {
        var cfg = {
            sensitivity: 7,
            interval: 100,
            timeout: 0
        };
        cfg = $.extend(cfg, g ? {
            over: f,
            out: g
        } : f);
        var cX, cY, pX, pY;
        var track = function(ev) {
            cX = ev.pageX;
            cY = ev.pageY;
        };
        var compare = function(ev, ob) {
            ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
            if ((Math.abs(pX - cX) + Math.abs(pY - cY)) < cfg.sensitivity) {
                $(ob).unbind("mousemove", track);
                ob.hoverIntent_s = 1;
                return cfg.over.apply(ob, [ev]);
            } else {
                pX = cX;
                pY = cY;
                ob.hoverIntent_t = setTimeout(function() {
                    compare(ev, ob);
                }, cfg.interval);
            }
        };
        var delay = function(ev, ob) {
            ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
            ob.hoverIntent_s = 0;
            return cfg.out.apply(ob, [ev]);
        };
        var handleHover = function(e) {
            var p = (e.type == "mouseover" ? e.fromElement : e.toElement) || e.relatedTarget;
            while (p && p != this) {
                try {
                    p = p.parentNode;
                } catch (e) {
                    p = this;
                }
            }
            if (p == this) {
                return false;
            }
            var ev = jQuery.extend({}, e);
            var ob = this;
            if (ob.hoverIntent_t) {
                ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
            }
            if (e.type == "mouseover") {
                pX = ev.pageX;
                pY = ev.pageY;
                $(ob).bind("mousemove", track);
                if (ob.hoverIntent_s != 1) {
                    ob.hoverIntent_t = setTimeout(function() {
                        compare(ev, ob);
                    }, cfg.interval);
                }
            } else {
                $(ob).unbind("mousemove", track);
                if (ob.hoverIntent_s == 1) {
                    ob.hoverIntent_t = setTimeout(function() {
                        delay(ev, ob);
                    }, cfg.timeout);
                }
            }
        };
        return this.mouseover(handleHover).mouseout(handleHover);
    };
})(jQuery);;
jQuery.ui || (function($) {
    var _remove = $.fn.remove,
        isFF2 = $.browser.mozilla && (parseFloat($.browser.version) < 1.9);
    $.ui = {
        version: "@VERSION",
        plugin: {
            add: function(module, option, set) {
                var proto = $.ui[module].prototype;
                for (var i in set) {
                    proto.plugins[i] = proto.plugins[i] || [];
                    proto.plugins[i].push([option, set[i]]);
                }
            },
            call: function(instance, name, args) {
                var set = instance.plugins[name];
                if (!set || !instance.element[0].parentNode) {
                    return;
                }
                for (var i = 0; i < set.length; i++) {
                    if (instance.options[set[i][0]]) {
                        set[i][1].apply(instance.element, args);
                    }
                }
            }
        },
        contains: function(a, b) {
            return document.compareDocumentPosition ? a.compareDocumentPosition(b) & 16 : a !== b && a.contains(b);
        },
        hasScroll: function(el, a) {
            if ($(el).css('overflow') == 'hidden') {
                return false;
            }
            var scroll = (a && a == 'left') ? 'scrollLeft' : 'scrollTop',
                has = false;
            if (el[scroll] > 0) {
                return true;
            }
            el[scroll] = 1;
            has = (el[scroll] > 0);
            el[scroll] = 0;
            return has;
        },
        isOverAxis: function(x, reference, size) {
            return (x > reference) && (x < (reference + size));
        },
        isOver: function(y, x, top, left, height, width) {
            return $.ui.isOverAxis(y, top, height) && $.ui.isOverAxis(x, left, width);
        },
        keyCode: {
            BACKSPACE: 8,
            CAPS_LOCK: 20,
            COMMA: 188,
            CONTROL: 17,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            INSERT: 45,
            LEFT: 37,
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SHIFT: 16,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    };
    if (isFF2) {
        var attr = $.attr,
            removeAttr = $.fn.removeAttr,
            ariaNS = "http://www.w3.org/2005/07/aaa",
            ariaState = /^aria-/,
            ariaRole = /^wairole:/;
        $.attr = function(elem, name, value) {
            var set = value !== undefined;
            return (name == 'role' ? (set ? attr.call(this, elem, name, "wairole:" + value) : (attr.apply(this, arguments) || "").replace(ariaRole, "")) : (ariaState.test(name) ? (set ? elem.setAttributeNS(ariaNS, name.replace(ariaState, "aaa:"), value) : attr.call(this, elem, name.replace(ariaState, "aaa:"))) : attr.apply(this, arguments)));
        };
        $.fn.removeAttr = function(name) {
            return (ariaState.test(name) ? this.each(function() {
                this.removeAttributeNS(ariaNS, name.replace(ariaState, ""));
            }) : removeAttr.call(this, name));
        };
    }
    $.fn.extend({
        remove: function() {
            $("*", this).add(this).each(function() {
                $(this).triggerHandler("remove");
            });
            return _remove.apply(this, arguments);
        },
        enableSelection: function() {
            return this.attr('unselectable', 'off').css('MozUserSelect', '').unbind('selectstart.ui');
        },
        disableSelection: function() {
            return this.attr('unselectable', 'on').css('MozUserSelect', 'none').bind('selectstart.ui', function() {
                return false;
            });
        },
        scrollParent: function() {
            var scrollParent;
            if (($.browser.msie && (/(static|relative)/).test(this.css('position'))) || (/absolute/).test(this.css('position'))) {
                scrollParent = this.parents().filter(function() {
                    return (/(relative|absolute|fixed)/).test($.curCSS(this, 'position', 1)) && (/(auto|scroll)/).test($.curCSS(this, 'overflow', 1) + $.curCSS(this, 'overflow-y', 1) + $.curCSS(this, 'overflow-x', 1));
                }).eq(0);
            } else {
                scrollParent = this.parents().filter(function() {
                    return (/(auto|scroll)/).test($.curCSS(this, 'overflow', 1) + $.curCSS(this, 'overflow-y', 1) + $.curCSS(this, 'overflow-x', 1));
                }).eq(0);
            }
            return (/fixed/).test(this.css('position')) || !scrollParent.length ? $(document) : scrollParent;
        }
    });
    $.extend($.expr[':'], {
        data: function(elem, i, match) {
            return !!$.data(elem, match[3]);
        },
        focusable: function(element) {
            var nodeName = element.nodeName.toLowerCase(),
                tabIndex = $.attr(element, 'tabindex');
            return (/input|select|textarea|button|object/.test(nodeName) ? !element.disabled : 'a' == nodeName || 'area' == nodeName ? element.href || !isNaN(tabIndex) : !isNaN(tabIndex)) && !$(element)['area' == nodeName ? 'parents' : 'closest'](':hidden').length;
        },
        tabbable: function(element) {
            var tabIndex = $.attr(element, 'tabindex');
            return (isNaN(tabIndex) || tabIndex >= 0) && $(element).is(':focusable');
        }
    });

    function getter(namespace, plugin, method, args) {
        function getMethods(type) {
            var methods = $[namespace][plugin][type] || [];
            return (typeof methods == 'string' ? methods.split(/,?\s+/) : methods);
        }
        var methods = getMethods('getter');
        if (args.length == 1 && typeof args[0] == 'string') {
            methods = methods.concat(getMethods('getterSetter'));
        }
        return ($.inArray(method, methods) != -1);
    }
    $.widget = function(name, prototype) {
        var namespace = name.split(".")[0];
        name = name.split(".")[1];
        $.fn[name] = function(options) {
            var isMethodCall = (typeof options == 'string'),
                args = Array.prototype.slice.call(arguments, 1);
            if (isMethodCall && options.substring(0, 1) == '_') {
                return this;
            }
            if (isMethodCall && getter(namespace, name, options, args)) {
                var instance = $.data(this[0], name);
                return (instance ? instance[options].apply(instance, args) : undefined);
            }
            return this.each(function() {
                var instance = $.data(this, name);
                (!instance && !isMethodCall && $.data(this, name, new $[namespace][name](this, options))._init());
                (instance && isMethodCall && $.isFunction(instance[options]) && instance[options].apply(instance, args));
            });
        };
        $[namespace] = $[namespace] || {};
        $[namespace][name] = function(element, options) {
            var self = this;
            this.namespace = namespace;
            this.widgetName = name;
            this.widgetEventPrefix = $[namespace][name].eventPrefix || name;
            this.widgetBaseClass = namespace + '-' + name;
            this.options = $.extend({}, $.widget.defaults, $[namespace][name].defaults, $.metadata && $.metadata.get(element)[name], options);
            this.element = $(element).bind('setData.' + name, function(event, key, value) {
                if (event.target == element) {
                    return self._setData(key, value);
                }
            }).bind('getData.' + name, function(event, key) {
                if (event.target == element) {
                    return self._getData(key);
                }
            }).bind('remove', function() {
                return self.destroy();
            });
        };
        $[namespace][name].prototype = $.extend({}, $.widget.prototype, prototype);
        $[namespace][name].getterSetter = 'option';
    };
    $.widget.prototype = {
        _init: function() {},
        destroy: function() {
            this.element.removeData(this.widgetName).removeClass(this.widgetBaseClass + '-disabled' + ' ' + this.namespace + '-state-disabled').removeAttr('aria-disabled');
        },
        option: function(key, value) {
            var options = key,
                self = this;
            if (typeof key == "string") {
                if (value === undefined) {
                    return this._getData(key);
                }
                options = {};
                options[key] = value;
            }
            $.each(options, function(key, value) {
                self._setData(key, value);
            });
        },
        _getData: function(key) {
            return this.options[key];
        },
        _setData: function(key, value) {
            this.options[key] = value;
            if (key == 'disabled') {
                this.element[value ? 'addClass' : 'removeClass'](this.widgetBaseClass + '-disabled' + ' ' +
                    this.namespace + '-state-disabled').attr("aria-disabled", value);
            }
        },
        enable: function() {
            this._setData('disabled', false);
        },
        disable: function() {
            this._setData('disabled', true);
        },
        _trigger: function(type, event, data) {
            var callback = this.options[type],
                eventName = (type == this.widgetEventPrefix ? type : this.widgetEventPrefix + type);
            event = $.Event(event);
            event.type = eventName;
            if (event.originalEvent) {
                for (var i = $.event.props.length, prop; i;) {
                    prop = $.event.props[--i];
                    event[prop] = event.originalEvent[prop];
                }
            }
            this.element.trigger(event, data);
            return !($.isFunction(callback) && callback.call(this.element[0], event, data) === false || event.isDefaultPrevented());
        }
    };
    $.widget.defaults = {
        disabled: false
    };
    $.ui.mouse = {
        _mouseInit: function() {
            var self = this;
            this.element.bind('mousedown.' + this.widgetName, function(event) {
                return self._mouseDown(event);
            }).bind('click.' + this.widgetName, function(event) {
                if (self._preventClickEvent) {
                    self._preventClickEvent = false;
                    event.stopImmediatePropagation();
                    return false;
                }
            });
            if ($.browser.msie) {
                this._mouseUnselectable = this.element.attr('unselectable');
                this.element.attr('unselectable', 'on');
            }
            this.started = false;
        },
        _mouseDestroy: function() {
            this.element.unbind('.' + this.widgetName);
            ($.browser.msie && this.element.attr('unselectable', this._mouseUnselectable));
        },
        _mouseDown: function(event) {
            event.originalEvent = event.originalEvent || {};
            if (event.originalEvent.mouseHandled) {
                return;
            }
            (this._mouseStarted && this._mouseUp(event));
            this._mouseDownEvent = event;
            var self = this,
                btnIsLeft = (event.which == 1),
                elIsCancel = (typeof this.options.cancel == "string" ? $(event.target).parents().add(event.target).filter(this.options.cancel).length : false);
            if (!btnIsLeft || elIsCancel || !this._mouseCapture(event)) {
                return true;
            }
            this.mouseDelayMet = !this.options.delay;
            if (!this.mouseDelayMet) {
                this._mouseDelayTimer = setTimeout(function() {
                    self.mouseDelayMet = true;
                }, this.options.delay);
            }
            if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
                this._mouseStarted = (this._mouseStart(event) !== false);
                if (!this._mouseStarted) {
                    event.preventDefault();
                    return true;
                }
            }
            this._mouseMoveDelegate = function(event) {
                return self._mouseMove(event);
            };
            this._mouseUpDelegate = function(event) {
                return self._mouseUp(event);
            };
            $(document).bind('mousemove.' + this.widgetName, this._mouseMoveDelegate).bind('mouseup.' + this.widgetName, this._mouseUpDelegate);
            ($.browser.safari || event.preventDefault());
            event.originalEvent.mouseHandled = true;
            return true;
        },
        _mouseMove: function(event) {
            if ($.browser.msie && !event.button) {
                return this._mouseUp(event);
            }
            if (this._mouseStarted) {
                this._mouseDrag(event);
                return event.preventDefault();
            }
            if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
                this._mouseStarted = (this._mouseStart(this._mouseDownEvent, event) !== false);
                (this._mouseStarted ? this._mouseDrag(event) : this._mouseUp(event));
            }
            return !this._mouseStarted;
        },
        _mouseUp: function(event) {
            $(document).unbind('mousemove.' + this.widgetName, this._mouseMoveDelegate).unbind('mouseup.' + this.widgetName, this._mouseUpDelegate);
            if (this._mouseStarted) {
                this._mouseStarted = false;
                this._preventClickEvent = (event.target == this._mouseDownEvent.target);
                this._mouseStop(event);
            }
            return false;
        },
        _mouseDistanceMet: function(event) {
            return (Math.max(Math.abs(this._mouseDownEvent.pageX - event.pageX), Math.abs(this._mouseDownEvent.pageY - event.pageY)) >= this.options.distance);
        },
        _mouseDelayMet: function(event) {
            return this.mouseDelayMet;
        },
        _mouseStart: function(event) {},
        _mouseDrag: function(event) {},
        _mouseStop: function(event) {},
        _mouseCapture: function(event) {
            return true;
        }
    };
    $.ui.mouse.defaults = {
        cancel: null,
        distance: 1,
        delay: 0
    };
})(jQuery);
(function($) {
    $.widget("ui.draggable", $.extend({}, $.ui.mouse, {
        _init: function() {
            if (this.options.helper == 'original' && !(/^(?:r|a|f)/).test(this.element.css("position")))
                this.element[0].style.position = 'relative';
            (this.options.addClasses && this.element.addClass("ui-draggable"));
            (this.options.disabled && this.element.addClass("ui-draggable-disabled"));
            this._mouseInit();
        },
        destroy: function() {
            if (!this.element.data('draggable')) return;
            this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable" + " ui-draggable-dragging" + " ui-draggable-disabled");
            this._mouseDestroy();
        },
        _mouseCapture: function(event) {
            var o = this.options;
            if (this.helper || o.disabled || $(event.target).is('.ui-resizable-handle'))
                return false;
            this.handle = this._getHandle(event);
            if (!this.handle)
                return false;
            return true;
        },
        _mouseStart: function(event) {
            var o = this.options;
            this.helper = this._createHelper(event);
            this._cacheHelperProportions();
            if ($.ui.ddmanager)
                $.ui.ddmanager.current = this;
            this._cacheMargins();
            this.cssPosition = this.helper.css("position");
            this.scrollParent = this.helper.scrollParent();
            this.offset = this.element.offset();
            this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            };
            $.extend(this.offset, {
                click: {
                    left: event.pageX - this.offset.left,
                    top: event.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            });
            this.originalPosition = this._generatePosition(event);
            this.originalPageX = event.pageX;
            this.originalPageY = event.pageY;
            if (o.cursorAt)
                this._adjustOffsetFromHelper(o.cursorAt);
            if (o.containment)
                this._setContainment();
            this._trigger("start", event);
            this._cacheHelperProportions();
            if ($.ui.ddmanager && !o.dropBehaviour)
                $.ui.ddmanager.prepareOffsets(this, event);
            this.helper.addClass("ui-draggable-dragging");
            this._mouseDrag(event, true);
            return true;
        },
        _mouseDrag: function(event, noPropagation) {
            this.position = this._generatePosition(event);
            this.positionAbs = this._convertPositionTo("absolute");
            if (!noPropagation) {
                var ui = this._uiHash();
                this._trigger('drag', event, ui);
                this.position = ui.position;
            }
            if (!this.options.axis || this.options.axis != "y") this.helper[0].style.left = this.position.left + 'px';
            if (!this.options.axis || this.options.axis != "x") this.helper[0].style.top = this.position.top + 'px';
            if ($.ui.ddmanager) $.ui.ddmanager.drag(this, event);
            return false;
        },
        _mouseStop: function(event) {
            var dropped = false;
            if ($.ui.ddmanager && !this.options.dropBehaviour)
                dropped = $.ui.ddmanager.drop(this, event);
            if (this.dropped) {
                dropped = this.dropped;
                this.dropped = false;
            }
            if ((this.options.revert == "invalid" && !dropped) || (this.options.revert == "valid" && dropped) || this.options.revert === true || ($.isFunction(this.options.revert) && this.options.revert.call(this.element, dropped))) {
                var self = this;
                $(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
                    self._trigger("stop", event);
                    self._clear();
                });
            } else {
                this._trigger("stop", event);
                this._clear();
            }
            return false;
        },
        _getHandle: function(event) {
            var handle = !this.options.handle || !$(this.options.handle, this.element).length ? true : false;
            $(this.options.handle, this.element).find("*").andSelf().each(function() {
                if (this == event.target) handle = true;
            });
            return handle;
        },
        _createHelper: function(event) {
            var o = this.options;
            var helper = $.isFunction(o.helper) ? $(o.helper.apply(this.element[0], [event])) : (o.helper == 'clone' ? this.element.clone() : this.element);
            if (!helper.parents('body').length)
                helper.appendTo((o.appendTo == 'parent' ? this.element[0].parentNode : o.appendTo));
            if (helper[0] != this.element[0] && !(/(fixed|absolute)/).test(helper.css("position")))
                helper.css("position", "absolute");
            return helper;
        },
        _adjustOffsetFromHelper: function(obj) {
            if (obj.left != undefined) this.offset.click.left = obj.left + this.margins.left;
            if (obj.right != undefined) this.offset.click.left = this.helperProportions.width - obj.right + this.margins.left;
            if (obj.top != undefined) this.offset.click.top = obj.top + this.margins.top;
            if (obj.bottom != undefined) this.offset.click.top = this.helperProportions.height - obj.bottom + this.margins.top;
        },
        _getParentOffset: function() {
            this.offsetParent = this.helper.offsetParent();
            var po = this.offsetParent.offset();
            if (this.cssPosition == 'absolute' && this.scrollParent[0] != document && $.ui.contains(this.scrollParent[0], this.offsetParent[0])) {
                po.left += this.scrollParent.scrollLeft();
                po.top += this.scrollParent.scrollTop();
            }
            if ((this.offsetParent[0] == document.body) || (this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == 'html' && $.browser.msie))
                po = {
                    top: 0,
                    left: 0
                };
            return {
                top: po.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: po.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            };
        },
        _getRelativeOffset: function() {
            if (this.cssPosition == "relative") {
                var p = this.element.position();
                return {
                    top: p.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: p.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                };
            } else {
                return {
                    top: 0,
                    left: 0
                };
            }
        },
        _cacheMargins: function() {
            this.margins = {
                left: (parseInt(this.element.css("marginLeft"), 10) || 0),
                top: (parseInt(this.element.css("marginTop"), 10) || 0)
            };
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            };
        },
        _setContainment: function() {
            var o = this.options;
            if (o.containment == 'parent') o.containment = this.helper[0].parentNode;
            if (o.containment == 'document' || o.containment == 'window') this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, $(o.containment == 'document' ? document : window).width() - this.helperProportions.width - this.margins.left, ($(o.containment == 'document' ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
            if (!(/^(document|window|parent)$/).test(o.containment) && o.containment.constructor != Array) {
                var ce = $(o.containment)[0];
                if (!ce) return;
                var co = $(o.containment).offset();
                var over = ($(ce).css("overflow") != 'hidden');
                this.containment = [co.left + (parseInt($(ce).css("borderLeftWidth"), 10) || 0) + (parseInt($(ce).css("paddingLeft"), 10) || 0) - this.margins.left, co.top + (parseInt($(ce).css("borderTopWidth"), 10) || 0) + (parseInt($(ce).css("paddingTop"), 10) || 0) - this.margins.top, co.left + (over ? Math.max(ce.scrollWidth, ce.offsetWidth) : ce.offsetWidth) - (parseInt($(ce).css("borderLeftWidth"), 10) || 0) - (parseInt($(ce).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, co.top + (over ? Math.max(ce.scrollHeight, ce.offsetHeight) : ce.offsetHeight) - (parseInt($(ce).css("borderTopWidth"), 10) || 0) - (parseInt($(ce).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top];
            } else if (o.containment.constructor == Array) {
                this.containment = o.containment;
            }
        },
        _convertPositionTo: function(d, pos) {
            if (!pos) pos = this.position;
            var mod = d == "absolute" ? 1 : -1;
            var o = this.options,
                scroll = this.cssPosition == 'absolute' && !(this.scrollParent[0] != document && $.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
                scrollIsRootNode = (/(html|body)/i).test(scroll[0].tagName);
            return {
                top: (pos.top + this.offset.relative.top * mod + this.offset.parent.top * mod - ($.browser.safari && this.cssPosition == 'fixed' ? 0 : (this.cssPosition == 'fixed' ? -this.scrollParent.scrollTop() : (scrollIsRootNode ? 0 : scroll.scrollTop())) * mod)),
                left: (pos.left + this.offset.relative.left * mod + this.offset.parent.left * mod - ($.browser.safari && this.cssPosition == 'fixed' ? 0 : (this.cssPosition == 'fixed' ? -this.scrollParent.scrollLeft() : scrollIsRootNode ? 0 : scroll.scrollLeft()) * mod))
            };
        },
        _generatePosition: function(event) {
            var o = this.options,
                scroll = this.cssPosition == 'absolute' && !(this.scrollParent[0] != document && $.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
                scrollIsRootNode = (/(html|body)/i).test(scroll[0].tagName);
            if (this.cssPosition == 'relative' && !(this.scrollParent[0] != document && this.scrollParent[0] != this.offsetParent[0])) {
                this.offset.relative = this._getRelativeOffset();
            }
            var pageX = event.pageX;
            var pageY = event.pageY;
            if (this.originalPosition) {
                if (this.containment) {
                    if (event.pageX - this.offset.click.left < this.containment[0]) pageX = this.containment[0] + this.offset.click.left;
                    if (event.pageY - this.offset.click.top < this.containment[1]) pageY = this.containment[1] + this.offset.click.top;
                    if (event.pageX - this.offset.click.left > this.containment[2]) pageX = this.containment[2] + this.offset.click.left;
                    if (event.pageY - this.offset.click.top > this.containment[3]) pageY = this.containment[3] + this.offset.click.top;
                }
                if (o.grid) {
                    var top = this.originalPageY + Math.round((pageY - this.originalPageY) / o.grid[1]) * o.grid[1];
                    pageY = this.containment ? (!(top - this.offset.click.top < this.containment[1] || top - this.offset.click.top > this.containment[3]) ? top : (!(top - this.offset.click.top < this.containment[1]) ? top - o.grid[1] : top + o.grid[1])) : top;
                    var left = this.originalPageX + Math.round((pageX - this.originalPageX) / o.grid[0]) * o.grid[0];
                    pageX = this.containment ? (!(left - this.offset.click.left < this.containment[0] || left - this.offset.click.left > this.containment[2]) ? left : (!(left - this.offset.click.left < this.containment[0]) ? left - o.grid[0] : left + o.grid[0])) : left;
                }
            }
            return {
                top: (pageY - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ($.browser.safari && this.cssPosition == 'fixed' ? 0 : (this.cssPosition == 'fixed' ? -this.scrollParent.scrollTop() : (scrollIsRootNode ? 0 : scroll.scrollTop())))),
                left: (pageX - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ($.browser.safari && this.cssPosition == 'fixed' ? 0 : (this.cssPosition == 'fixed' ? -this.scrollParent.scrollLeft() : scrollIsRootNode ? 0 : scroll.scrollLeft())))
            };
        },
        _clear: function() {
            this.helper.removeClass("ui-draggable-dragging");
            if (this.helper[0] != this.element[0] && !this.cancelHelperRemoval) this.helper.remove();
            this.helper = null;
            this.cancelHelperRemoval = false;
        },
        _trigger: function(type, event, ui) {
            ui = ui || this._uiHash();
            $.ui.plugin.call(this, type, [event, ui]);
            if (type == "drag") this.positionAbs = this._convertPositionTo("absolute");
            return $.widget.prototype._trigger.call(this, type, event, ui);
        },
        plugins: {},
        _uiHash: function(event) {
            return {
                helper: this.helper,
                position: this.position,
                absolutePosition: this.positionAbs,
                offset: this.positionAbs
            };
        }
    }));
    $.extend($.ui.draggable, {
        version: "@VERSION",
        eventPrefix: "drag",
        defaults: {
            addClasses: true,
            appendTo: "parent",
            axis: false,
            cancel: ":input,option",
            connectToSortable: false,
            containment: false,
            cursor: "auto",
            cursorAt: false,
            delay: 0,
            distance: 1,
            grid: false,
            handle: false,
            helper: "original",
            iframeFix: false,
            opacity: false,
            refreshPositions: false,
            revert: false,
            revertDuration: 500,
            scope: "default",
            scroll: true,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            snap: false,
            snapMode: "both",
            snapTolerance: 20,
            stack: false,
            zIndex: false
        }
    });
    $.ui.plugin.add("draggable", "connectToSortable", {
        start: function(event, ui) {
            var inst = $(this).data("draggable"),
                o = inst.options,
                uiSortable = $.extend({}, ui, {
                    item: inst.element
                });
            inst.sortables = [];
            $(o.connectToSortable).each(function() {
                var sortable = $.data(this, 'sortable');
                if (sortable && !sortable.options.disabled) {
                    inst.sortables.push({
                        instance: sortable,
                        shouldRevert: sortable.options.revert
                    });
                    sortable._refreshItems();
                    sortable._trigger("activate", event, uiSortable);
                }
            });
        },
        stop: function(event, ui) {
            var inst = $(this).data("draggable"),
                uiSortable = $.extend({}, ui, {
                    item: inst.element
                });
            $.each(inst.sortables, function() {
                if (this.instance.isOver) {
                    this.instance.isOver = 0;
                    inst.cancelHelperRemoval = true;
                    this.instance.cancelHelperRemoval = false;
                    if (this.shouldRevert) this.instance.options.revert = true;
                    this.instance._mouseStop(event);
                    this.instance.options.helper = this.instance.options._helper;
                    if (inst.options.helper == 'original')
                        this.instance.currentItem.css({
                            top: 'auto',
                            left: 'auto'
                        });
                } else {
                    this.instance.cancelHelperRemoval = false;
                    this.instance._trigger("deactivate", event, uiSortable);
                }
            });
        },
        drag: function(event, ui) {
            var inst = $(this).data("draggable"),
                self = this;
            var checkPos = function(o) {
                var dyClick = this.offset.click.top,
                    dxClick = this.offset.click.left;
                var helperTop = this.positionAbs.top,
                    helperLeft = this.positionAbs.left;
                var itemHeight = o.height,
                    itemWidth = o.width;
                var itemTop = o.top,
                    itemLeft = o.left;
                return $.ui.isOver(helperTop + dyClick, helperLeft + dxClick, itemTop, itemLeft, itemHeight, itemWidth);
            };
            $.each(inst.sortables, function(i) {
                this.instance.positionAbs = inst.positionAbs;
                this.instance.helperProportions = inst.helperProportions;
                this.instance.offset.click = inst.offset.click;
                if (this.instance._intersectsWith(this.instance.containerCache)) {
                    if (!this.instance.isOver) {
                        this.instance.isOver = 1;
                        this.instance.currentItem = $(self).clone().appendTo(this.instance.element).data("sortable-item", true);
                        this.instance.options._helper = this.instance.options.helper;
                        this.instance.options.helper = function() {
                            return ui.helper[0];
                        };
                        event.target = this.instance.currentItem[0];
                        this.instance._mouseCapture(event, true);
                        this.instance._mouseStart(event, true, true);
                        this.instance.offset.click.top = inst.offset.click.top;
                        this.instance.offset.click.left = inst.offset.click.left;
                        this.instance.offset.parent.left -= inst.offset.parent.left - this.instance.offset.parent.left;
                        this.instance.offset.parent.top -= inst.offset.parent.top - this.instance.offset.parent.top;
                        inst._trigger("toSortable", event);
                        inst.dropped = this.instance.element;
                        inst.currentItem = inst.element;
                        this.instance.fromOutside = inst;
                    }
                    if (this.instance.currentItem) this.instance._mouseDrag(event);
                } else {
                    if (this.instance.isOver) {
                        this.instance.isOver = 0;
                        this.instance.cancelHelperRemoval = true;
                        this.instance.options.revert = false;
                        this.instance._trigger('out', event, this.instance._uiHash(this.instance));
                        this.instance._mouseStop(event, true);
                        this.instance.options.helper = this.instance.options._helper;
                        this.instance.currentItem.remove();
                        if (this.instance.placeholder) this.instance.placeholder.remove();
                        inst._trigger("fromSortable", event);
                        inst.dropped = false;
                    }
                };
            });
        }
    });
    $.ui.plugin.add("draggable", "cursor", {
        start: function(event, ui) {
            var t = $('body'),
                o = $(this).data('draggable').options;
            if (t.css("cursor")) o._cursor = t.css("cursor");
            t.css("cursor", o.cursor);
        },
        stop: function(event, ui) {
            var o = $(this).data('draggable').options;
            if (o._cursor) $('body').css("cursor", o._cursor);
        }
    });
    $.ui.plugin.add("draggable", "iframeFix", {
        start: function(event, ui) {
            var o = $(this).data('draggable').options;
            $(o.iframeFix === true ? "iframe" : o.iframeFix).each(function() {
                $('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({
                    width: this.offsetWidth + "px",
                    height: this.offsetHeight + "px",
                    position: "absolute",
                    opacity: "0.001",
                    zIndex: 1000
                }).css($(this).offset()).appendTo("body");
            });
        },
        stop: function(event, ui) {
            $("div.ui-draggable-iframeFix").each(function() {
                this.parentNode.removeChild(this);
            });
        }
    });
    $.ui.plugin.add("draggable", "opacity", {
        start: function(event, ui) {
            var t = $(ui.helper),
                o = $(this).data('draggable').options;
            if (t.css("opacity")) o._opacity = t.css("opacity");
            t.css('opacity', o.opacity);
        },
        stop: function(event, ui) {
            var o = $(this).data('draggable').options;
            if (o._opacity) $(ui.helper).css('opacity', o._opacity);
        }
    });
    $.ui.plugin.add("draggable", "scroll", {
        start: function(event, ui) {
            var i = $(this).data("draggable");
            if (i.scrollParent[0] != document && i.scrollParent[0].tagName != 'HTML') i.overflowOffset = i.scrollParent.offset();
        },
        drag: function(event, ui) {
            var i = $(this).data("draggable"),
                o = i.options,
                scrolled = false;
            if (i.scrollParent[0] != document && i.scrollParent[0].tagName != 'HTML') {
                if (!o.axis || o.axis != 'x') {
                    if ((i.overflowOffset.top + i.scrollParent[0].offsetHeight) - event.pageY < o.scrollSensitivity)
                        i.scrollParent[0].scrollTop = scrolled = i.scrollParent[0].scrollTop + o.scrollSpeed;
                    else if (event.pageY - i.overflowOffset.top < o.scrollSensitivity)
                        i.scrollParent[0].scrollTop = scrolled = i.scrollParent[0].scrollTop - o.scrollSpeed;
                }
                if (!o.axis || o.axis != 'y') {
                    if ((i.overflowOffset.left + i.scrollParent[0].offsetWidth) - event.pageX < o.scrollSensitivity)
                        i.scrollParent[0].scrollLeft = scrolled = i.scrollParent[0].scrollLeft + o.scrollSpeed;
                    else if (event.pageX - i.overflowOffset.left < o.scrollSensitivity)
                        i.scrollParent[0].scrollLeft = scrolled = i.scrollParent[0].scrollLeft - o.scrollSpeed;
                }
            } else {
                if (!o.axis || o.axis != 'x') {
                    if (event.pageY - $(document).scrollTop() < o.scrollSensitivity)
                        scrolled = $(document).scrollTop($(document).scrollTop() - o.scrollSpeed);
                    else if ($(window).height() - (event.pageY - $(document).scrollTop()) < o.scrollSensitivity)
                        scrolled = $(document).scrollTop($(document).scrollTop() + o.scrollSpeed);
                }
                if (!o.axis || o.axis != 'y') {
                    if (event.pageX - $(document).scrollLeft() < o.scrollSensitivity)
                        scrolled = $(document).scrollLeft($(document).scrollLeft() - o.scrollSpeed);
                    else if ($(window).width() - (event.pageX - $(document).scrollLeft()) < o.scrollSensitivity)
                        scrolled = $(document).scrollLeft($(document).scrollLeft() + o.scrollSpeed);
                }
            }
            if (scrolled !== false && $.ui.ddmanager && !o.dropBehaviour)
                $.ui.ddmanager.prepareOffsets(i, event);
        }
    });
    $.ui.plugin.add("draggable", "snap", {
        start: function(event, ui) {
            var i = $(this).data("draggable"),
                o = i.options;
            i.snapElements = [];
            $(o.snap.constructor != String ? (o.snap.items || ':data(draggable)') : o.snap).each(function() {
                var $t = $(this);
                var $o = $t.offset();
                if (this != i.element[0]) i.snapElements.push({
                    item: this,
                    width: $t.outerWidth(),
                    height: $t.outerHeight(),
                    top: $o.top,
                    left: $o.left
                });
            });
        },
        drag: function(event, ui) {
            var inst = $(this).data("draggable"),
                o = inst.options;
            var d = o.snapTolerance;
            var x1 = ui.offset.left,
                x2 = x1 + inst.helperProportions.width,
                y1 = ui.offset.top,
                y2 = y1 + inst.helperProportions.height;
            for (var i = inst.snapElements.length - 1; i >= 0; i--) {
                var l = inst.snapElements[i].left,
                    r = l + inst.snapElements[i].width,
                    t = inst.snapElements[i].top,
                    b = t + inst.snapElements[i].height;
                if (!((l - d < x1 && x1 < r + d && t - d < y1 && y1 < b + d) || (l - d < x1 && x1 < r + d && t - d < y2 && y2 < b + d) || (l - d < x2 && x2 < r + d && t - d < y1 && y1 < b + d) || (l - d < x2 && x2 < r + d && t - d < y2 && y2 < b + d))) {
                    if (inst.snapElements[i].snapping)(inst.options.snap.release && inst.options.snap.release.call(inst.element, event, $.extend(inst._uiHash(), {
                        snapItem: inst.snapElements[i].item
                    })));
                    inst.snapElements[i].snapping = false;
                    continue;
                }
                if (o.snapMode != 'inner') {
                    var ts = Math.abs(t - y2) <= d;
                    var bs = Math.abs(b - y1) <= d;
                    var ls = Math.abs(l - x2) <= d;
                    var rs = Math.abs(r - x1) <= d;
                    if (ts) ui.position.top = inst._convertPositionTo("relative", {
                        top: t - inst.helperProportions.height,
                        left: 0
                    }).top - inst.margins.top;
                    if (bs) ui.position.top = inst._convertPositionTo("relative", {
                        top: b,
                        left: 0
                    }).top - inst.margins.top;
                    if (ls) ui.position.left = inst._convertPositionTo("relative", {
                        top: 0,
                        left: l - inst.helperProportions.width
                    }).left - inst.margins.left;
                    if (rs) ui.position.left = inst._convertPositionTo("relative", {
                        top: 0,
                        left: r
                    }).left - inst.margins.left;
                }
                var first = (ts || bs || ls || rs);
                if (o.snapMode != 'outer') {
                    var ts = Math.abs(t - y1) <= d;
                    var bs = Math.abs(b - y2) <= d;
                    var ls = Math.abs(l - x1) <= d;
                    var rs = Math.abs(r - x2) <= d;
                    if (ts) ui.position.top = inst._convertPositionTo("relative", {
                        top: t,
                        left: 0
                    }).top - inst.margins.top;
                    if (bs) ui.position.top = inst._convertPositionTo("relative", {
                        top: b - inst.helperProportions.height,
                        left: 0
                    }).top - inst.margins.top;
                    if (ls) ui.position.left = inst._convertPositionTo("relative", {
                        top: 0,
                        left: l
                    }).left - inst.margins.left;
                    if (rs) ui.position.left = inst._convertPositionTo("relative", {
                        top: 0,
                        left: r - inst.helperProportions.width
                    }).left - inst.margins.left;
                }
                if (!inst.snapElements[i].snapping && (ts || bs || ls || rs || first))
                    (inst.options.snap.snap && inst.options.snap.snap.call(inst.element, event, $.extend(inst._uiHash(), {
                        snapItem: inst.snapElements[i].item
                    })));
                inst.snapElements[i].snapping = (ts || bs || ls || rs || first);
            };
        }
    });
    $.ui.plugin.add("draggable", "stack", {
        start: function(event, ui) {
            var o = $(this).data("draggable").options;
            var group = $.makeArray($(o.stack.group)).sort(function(a, b) {
                return (parseInt($(a).css("zIndex"), 10) || o.stack.min) - (parseInt($(b).css("zIndex"), 10) || o.stack.min);
            });
            $(group).each(function(i) {
                this.style.zIndex = o.stack.min + i;
            });
            this[0].style.zIndex = o.stack.min + group.length;
        }
    });
    $.ui.plugin.add("draggable", "zIndex", {
        start: function(event, ui) {
            var t = $(ui.helper),
                o = $(this).data("draggable").options;
            if (t.css("zIndex")) o._zIndex = t.css("zIndex");
            t.css('zIndex', o.zIndex);
        },
        stop: function(event, ui) {
            var o = $(this).data("draggable").options;
            if (o._zIndex) $(ui.helper).css('zIndex', o._zIndex);
        }
    });
})(jQuery);;
jQuery.effects || (function($) {
    $.effects = {
        version: "@VERSION",
        save: function(element, set) {
            for (var i = 0; i < set.length; i++) {
                if (set[i] !== null) element.data("ec.storage." + set[i], element[0].style[set[i]]);
            }
        },
        restore: function(element, set) {
            for (var i = 0; i < set.length; i++) {
                if (set[i] !== null) element.css(set[i], element.data("ec.storage." + set[i]));
            }
        },
        setMode: function(el, mode) {
            if (mode == 'toggle') mode = el.is(':hidden') ? 'show' : 'hide';
            return mode;
        },
        getBaseline: function(origin, original) {
            var y, x;
            switch (origin[0]) {
                case 'top':
                    y = 0;
                    break;
                case 'middle':
                    y = 0.5;
                    break;
                case 'bottom':
                    y = 1;
                    break;
                default:
                    y = origin[0] / original.height;
            };
            switch (origin[1]) {
                case 'left':
                    x = 0;
                    break;
                case 'center':
                    x = 0.5;
                    break;
                case 'right':
                    x = 1;
                    break;
                default:
                    x = origin[1] / original.width;
            };
            return {
                x: x,
                y: y
            };
        },
        createWrapper: function(element) {
            if (element.parent().is('.ui-effects-wrapper'))
                return element.parent();
            var props = {
                width: element.outerWidth(true),
                height: element.outerHeight(true),
                'float': element.css('float')
            };
            element.wrap('<div class="ui-effects-wrapper" style="font-size:100%;background:transparent;border:none;margin:0;padding:0"></div>');
            var wrapper = element.parent();
            if (element.css('position') == 'static') {
                wrapper.css({
                    position: 'relative'
                });
                element.css({
                    position: 'relative'
                });
            } else {
                var top = element.css('top');
                if (isNaN(parseInt(top, 10))) top = 'auto';
                var left = element.css('left');
                if (isNaN(parseInt(left, 10))) left = 'auto';
                wrapper.css({
                    position: element.css('position'),
                    top: top,
                    left: left,
                    zIndex: element.css('z-index')
                }).show();
                element.css({
                    position: 'relative',
                    top: 0,
                    left: 0
                });
            }
            wrapper.css(props);
            return wrapper;
        },
        removeWrapper: function(element) {
            if (element.parent().is('.ui-effects-wrapper'))
                return element.parent().replaceWith(element);
            return element;
        },
        setTransition: function(element, list, factor, value) {
            value = value || {};
            $.each(list, function(i, x) {
                unit = element.cssUnit(x);
                if (unit[0] > 0) value[x] = unit[0] * factor + unit[1];
            });
            return value;
        },
        animateClass: function(value, duration, easing, callback) {
            var cb = (typeof easing == "function" ? easing : (callback ? callback : null));
            var ea = (typeof easing == "string" ? easing : null);
            return this.each(function() {
                var offset = {};
                var that = $(this);
                var oldStyleAttr = that.attr("style") || '';
                if (typeof oldStyleAttr == 'object') oldStyleAttr = oldStyleAttr["cssText"];
                if (value.toggle) {
                    that.hasClass(value.toggle) ? value.remove = value.toggle : value.add = value.toggle;
                }
                var oldStyle = $.extend({}, (document.defaultView ? document.defaultView.getComputedStyle(this, null) : this.currentStyle));
                if (value.add) that.addClass(value.add);
                if (value.remove) that.removeClass(value.remove);
                var newStyle = $.extend({}, (document.defaultView ? document.defaultView.getComputedStyle(this, null) : this.currentStyle));
                if (value.add) that.removeClass(value.add);
                if (value.remove) that.addClass(value.remove);
                for (var n in newStyle) {
                    if (typeof newStyle[n] != "function" && newStyle[n] && n.indexOf("Moz") == -1 && n.indexOf("length") == -1 && newStyle[n] != oldStyle[n] && (n.match(/color/i) || (!n.match(/color/i) && !isNaN(parseInt(newStyle[n], 10)))) && (oldStyle.position != "static" || (oldStyle.position == "static" && !n.match(/left|top|bottom|right/)))) offset[n] = newStyle[n];
                }
                that.animate(offset, duration, ea, function() {
                    if (typeof $(this).attr("style") == 'object') {
                        $(this).attr("style")["cssText"] = "";
                        $(this).attr("style")["cssText"] = oldStyleAttr;
                    } else $(this).attr("style", oldStyleAttr);
                    if (value.add) $(this).addClass(value.add);
                    if (value.remove) $(this).removeClass(value.remove);
                    if (cb) cb.apply(this, arguments);
                });
            });
        }
    };

    function _normalizeArguments(a, m) {
        var o = a[1] && a[1].constructor == Object ? a[1] : {};
        if (m) o.mode = m;
        var speed = a[1] && a[1].constructor != Object ? a[1] : (o.duration ? o.duration : a[2]);
        speed = $.fx.off ? 0 : typeof speed === "number" ? speed : $.fx.speeds[speed] || $.fx.speeds._default;
        var callback = o.callback || ($.isFunction(a[1]) && a[1]) || ($.isFunction(a[2]) && a[2]) || ($.isFunction(a[3]) && a[3]);
        return [a[0], o, speed, callback];
    }
    $.fn.extend({
        _show: $.fn.show,
        _hide: $.fn.hide,
        __toggle: $.fn.toggle,
        _addClass: $.fn.addClass,
        _removeClass: $.fn.removeClass,
        _toggleClass: $.fn.toggleClass,
        effect: function(fx, options, speed, callback) {
            return $.effects[fx] ? $.effects[fx].call(this, {
                method: fx,
                options: options || {},
                duration: speed,
                callback: callback
            }) : null;
        },
        show: function() {
            if (!arguments[0] || (arguments[0].constructor == Number || (/(slow|normal|fast)/).test(arguments[0])))
                return this._show.apply(this, arguments);
            else {
                return this.effect.apply(this, _normalizeArguments(arguments, 'show'));
            }
        },
        hide: function() {
            if (!arguments[0] || (arguments[0].constructor == Number || (/(slow|normal|fast)/).test(arguments[0])))
                return this._hide.apply(this, arguments);
            else {
                return this.effect.apply(this, _normalizeArguments(arguments, 'hide'));
            }
        },
        toggle: function() {
            if (!arguments[0] || (arguments[0].constructor == Number || (/(slow|normal|fast)/).test(arguments[0])) || (arguments[0].constructor == Function))
                return this.__toggle.apply(this, arguments);
            else {
                return this.effect.apply(this, _normalizeArguments(arguments, 'toggle'));
            }
        },
        addClass: function(classNames, speed, easing, callback) {
            return speed ? $.effects.animateClass.apply(this, [{
                add: classNames
            }, speed, easing, callback]) : this._addClass(classNames);
        },
        removeClass: function(classNames, speed, easing, callback) {
            return speed ? $.effects.animateClass.apply(this, [{
                remove: classNames
            }, speed, easing, callback]) : this._removeClass(classNames);
        },
        toggleClass: function(classNames, speed, easing, callback) {
            return ((typeof speed !== "boolean") && speed) ? $.effects.animateClass.apply(this, [{
                toggle: classNames
            }, speed, easing, callback]) : this._toggleClass(classNames, speed);
        },
        morph: function(remove, add, speed, easing, callback) {
            return $.effects.animateClass.apply(this, [{
                add: add,
                remove: remove
            }, speed, easing, callback]);
        },
        switchClass: function() {
            return this.morph.apply(this, arguments);
        },
        cssUnit: function(key) {
            var style = this.css(key),
                val = [];
            $.each(['em', 'px', '%', 'pt'], function(i, unit) {
                if (style.indexOf(unit) > 0)
                    val = [parseFloat(style), unit];
            });
            return val;
        }
    });
    $.each(['backgroundColor', 'borderBottomColor', 'borderLeftColor', 'borderRightColor', 'borderTopColor', 'color', 'outlineColor'], function(i, attr) {
        $.fx.step[attr] = function(fx) {
            if (fx.state == 0) {
                fx.start = getColor(fx.elem, attr);
                fx.end = getRGB(fx.end);
            }
            fx.elem.style[attr] = "rgb(" + [Math.max(Math.min(parseInt((fx.pos * (fx.end[0] - fx.start[0])) + fx.start[0], 10), 255), 0), Math.max(Math.min(parseInt((fx.pos * (fx.end[1] - fx.start[1])) + fx.start[1], 10), 255), 0), Math.max(Math.min(parseInt((fx.pos * (fx.end[2] - fx.start[2])) + fx.start[2], 10), 255), 0)].join(",") + ")";
        };
    });

    function getRGB(color) {
        var result;
        if (color && color.constructor == Array && color.length == 3)
            return color;
        if (result = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(color))
            return [parseInt(result[1], 10), parseInt(result[2], 10), parseInt(result[3], 10)];
        if (result = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(color))
            return [parseFloat(result[1]) * 2.55, parseFloat(result[2]) * 2.55, parseFloat(result[3]) * 2.55];
        if (result = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(color))
            return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)];
        if (result = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(color))
            return [parseInt(result[1] + result[1], 16), parseInt(result[2] + result[2], 16), parseInt(result[3] + result[3], 16)];
        if (result = /rgba\(0, 0, 0, 0\)/.exec(color))
            return colors['transparent'];
        return colors[$.trim(color).toLowerCase()];
    }

    function getColor(elem, attr) {
        var color;
        do {
            color = $.curCSS(elem, attr);
            if (color != '' && color != 'transparent' || $.nodeName(elem, "body"))
                break;
            attr = "backgroundColor";
        } while (elem = elem.parentNode);
        return getRGB(color);
    };
    var colors = {
        aqua: [0, 255, 255],
        azure: [240, 255, 255],
        beige: [245, 245, 220],
        black: [0, 0, 0],
        blue: [0, 0, 255],
        brown: [165, 42, 42],
        cyan: [0, 255, 255],
        darkblue: [0, 0, 139],
        darkcyan: [0, 139, 139],
        darkgrey: [169, 169, 169],
        darkgreen: [0, 100, 0],
        darkkhaki: [189, 183, 107],
        darkmagenta: [139, 0, 139],
        darkolivegreen: [85, 107, 47],
        darkorange: [255, 140, 0],
        darkorchid: [153, 50, 204],
        darkred: [139, 0, 0],
        darksalmon: [233, 150, 122],
        darkviolet: [148, 0, 211],
        fuchsia: [255, 0, 255],
        gold: [255, 215, 0],
        green: [0, 128, 0],
        indigo: [75, 0, 130],
        khaki: [240, 230, 140],
        lightblue: [173, 216, 230],
        lightcyan: [224, 255, 255],
        lightgreen: [144, 238, 144],
        lightgrey: [211, 211, 211],
        lightpink: [255, 182, 193],
        lightyellow: [255, 255, 224],
        lime: [0, 255, 0],
        magenta: [255, 0, 255],
        maroon: [128, 0, 0],
        navy: [0, 0, 128],
        olive: [128, 128, 0],
        orange: [255, 165, 0],
        pink: [255, 192, 203],
        purple: [128, 0, 128],
        violet: [128, 0, 128],
        red: [255, 0, 0],
        silver: [192, 192, 192],
        white: [255, 255, 255],
        yellow: [255, 255, 0],
        transparent: [255, 255, 255]
    };
    $.easing.jswing = $.easing.swing;
    $.extend($.easing, {
        def: 'easeOutQuad',
        swing: function(x, t, b, c, d) {
            return $.easing[$.easing.def](x, t, b, c, d);
        },
        easeInQuad: function(x, t, b, c, d) {
            return c * (t /= d) * t + b;
        },
        easeOutQuad: function(x, t, b, c, d) {
            return -c * (t /= d) * (t - 2) + b;
        },
        easeInOutQuad: function(x, t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t + b;
            return -c / 2 * ((--t) * (t - 2) - 1) + b;
        },
        easeInCubic: function(x, t, b, c, d) {
            return c * (t /= d) * t * t + b;
        },
        easeOutCubic: function(x, t, b, c, d) {
            return c * ((t = t / d - 1) * t * t + 1) + b;
        },
        easeInOutCubic: function(x, t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t + 2) + b;
        },
        easeInQuart: function(x, t, b, c, d) {
            return c * (t /= d) * t * t * t + b;
        },
        easeOutQuart: function(x, t, b, c, d) {
            return -c * ((t = t / d - 1) * t * t * t - 1) + b;
        },
        easeInOutQuart: function(x, t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
            return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
        },
        easeInQuint: function(x, t, b, c, d) {
            return c * (t /= d) * t * t * t * t + b;
        },
        easeOutQuint: function(x, t, b, c, d) {
            return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
        },
        easeInOutQuint: function(x, t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
        },
        easeInSine: function(x, t, b, c, d) {
            return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
        },
        easeOutSine: function(x, t, b, c, d) {
            return c * Math.sin(t / d * (Math.PI / 2)) + b;
        },
        easeInOutSine: function(x, t, b, c, d) {
            return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
        },
        easeInExpo: function(x, t, b, c, d) {
            return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
        },
        easeOutExpo: function(x, t, b, c, d) {
            return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
        },
        easeInOutExpo: function(x, t, b, c, d) {
            if (t == 0) return b;
            if (t == d) return b + c;
            if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
            return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
        },
        easeInCirc: function(x, t, b, c, d) {
            return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
        },
        easeOutCirc: function(x, t, b, c, d) {
            return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
        },
        easeInOutCirc: function(x, t, b, c, d) {
            if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
            return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
        },
        easeInElastic: function(x, t, b, c, d) {
            var s = 1.70158;
            var p = 0;
            var a = c;
            if (t == 0) return b;
            if ((t /= d) == 1) return b + c;
            if (!p) p = d * .3;
            if (a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            } else var s = p / (2 * Math.PI) * Math.asin(c / a);
            return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        },
        easeOutElastic: function(x, t, b, c, d) {
            var s = 1.70158;
            var p = 0;
            var a = c;
            if (t == 0) return b;
            if ((t /= d) == 1) return b + c;
            if (!p) p = d * .3;
            if (a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            } else var s = p / (2 * Math.PI) * Math.asin(c / a);
            return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
        },
        easeInOutElastic: function(x, t, b, c, d) {
            var s = 1.70158;
            var p = 0;
            var a = c;
            if (t == 0) return b;
            if ((t /= d / 2) == 2) return b + c;
            if (!p) p = d * (.3 * 1.5);
            if (a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            } else var s = p / (2 * Math.PI) * Math.asin(c / a);
            if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
        },
        easeInBack: function(x, t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c * (t /= d) * t * ((s + 1) * t - s) + b;
        },
        easeOutBack: function(x, t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
        },
        easeInOutBack: function(x, t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
            return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
        },
        easeInBounce: function(x, t, b, c, d) {
            return c - $.easing.easeOutBounce(x, d - t, 0, c, d) + b;
        },
        easeOutBounce: function(x, t, b, c, d) {
            if ((t /= d) < (1 / 2.75)) {
                return c * (7.5625 * t * t) + b;
            } else if (t < (2 / 2.75)) {
                return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
            } else if (t < (2.5 / 2.75)) {
                return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
            } else {
                return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
            }
        },
        easeInOutBounce: function(x, t, b, c, d) {
            if (t < d / 2) return $.easing.easeInBounce(x, t * 2, 0, c, d) * .5 + b;
            return $.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * .5 + c * .5 + b;
        }
    });
})(jQuery);
var Scroller = function() {
    return this.initialize.apply(this, arguments);
};
Scroller.prototype = {
    defaults: {
        speed: 12,
        delay: 60,
        mouseWheel: true,
        wheelSpeed: 48,
        buttonEvent: 'mousedown',
        nextButtonHTML: '<a>more&raquo;</a>',
        prevButtonHTML: '<a>&laquo;back</a>',
        scrollbar: true,
        horizontal: false,
        animate: false,
        animateAmount: 100,
        animateSpeed: 'slow',
        paginate: false
    },
    timeoutID: 0,
    scrollCursor: 0,
    initialize: function(obj, settings) {
        var self = this;
        self.settings = jQuery.extend({}, self.defaults, settings);
        self.container = obj;
        var $container = $(self.container);
        var dir_class = self.settings.horizontal ? 'scroller-horizontal' : 'scroller-vertical';
        var dim;
        if (self.settings.horizontal) {
            self.dim = dim = {
                scrollPosition: 'scrollLeft',
                scrollLength: 'scrollWidth',
                position: 'left',
                length: 'width',
                axis: 'x',
                overflow: 'overflow-x'
            };
        } else {
            self.dim = dim = {
                scrollPosition: 'scrollTop',
                scrollLength: 'scrollHeight',
                position: 'top',
                length: 'height',
                axis: 'y',
                overflow: 'overflow-y'
            };
        }
        $container.css(dim.overflow, 'hidden').addClass('jquery-scroller ' + dir_class);
        var saved_scrollLength = self.container[dim.scrollLength];
        window.setInterval(function() {
            var cur_len = self.container[dim.scrollLength];
            if (cur_len != saved_scrollLength) {
                saved_scrollLength = cur_len;
                self.reset(self.scrollCursor);
            }
        }, 200);
        $(window).resize(function() {
            self.reset(self.scrollCursor);
        });
        $('.scroller-controls', $container.parent()).remove();
        $controls = $('<div class="scroller-controls ' + dir_class + '"></div>').insertAfter($container);
        $prev = $(self.settings.prevButtonHTML).addClass('scroller-prev').addClass('disabled').appendTo($controls);
        $next = $(self.settings.nextButtonHTML).addClass('scroller-next').appendTo($controls);
        self.prevButton = $prev[0];
        self.nextButton = $next[0];
        self.controls = $controls[0];
        if (self.settings.paginate) self.settings.animate = true;
        if (self.settings.animate) {
            if (self.settings.paginate) {
                self.settings.animateAmount = $container[dim.length]();
            }
            $(self.nextButton).click(function() {
                self.update(self.settings.animateAmount, true);
            });
            $(self.prevButton).click(function() {
                self.update(0 - self.settings.animateAmount, true);
            });
        } else {
            switch (self.settings.buttonEvent) {
                case 'mousedown':
                    $(self.nextButton).bind('mousedown', function(e) {
                        self.scrollNext()
                    }).bind('mouseup', function(e) {
                        self.stopScroll()
                    });
                    $(self.prevButton).bind('mousedown', function(e) {
                        self.scrollPrev()
                    }).bind('mouseup', function(e) {
                        self.stopScroll()
                    });
                    break;
                case 'hover':
                    $(self.nextButton).hover(function(e) {
                        self.scrollNext()
                    }, function(e) {
                        self.stopScroll()
                    });
                    $(self.prevButton).hover(function(e) {
                        self.scrollPrev()
                    }, function(e) {
                        self.stopScroll()
                    });
                    break;
            }
        }
        if (self.settings.mouseWheel)
            $container.mousewheel(function(e, delta) {
                self.wheel(e, delta);
                return false;
            });
        if (self.settings.scrollbar) {
            var $scrollbar = $('<div class="scroller-scrollbar"><div class="scroller-handle"></div></div>').appendTo($controls);
            var $handle = $('.scroller-handle', $scrollbar);
            self.scrollbar = $scrollbar[0];
            self.resetScrollbar();
            $container.bind('scrolling', function(e, animate) {
                if (self.dragging) return;
                var total_length = self.container[dim.scrollLength] - $container[dim.length]();
                var p = total_length > 0 ? (self.scrollCursor / total_length) : 0;
                var pos = (p * ($scrollbar[dim.length]() - $handle[dim.length]()));
                if (animate) {
                    var a = {}
                    a[dim.position] = pos;
                    $handle.animate(a);
                } else {
                    $handle.css(dim.position, pos);
                }
            });
            $handle.draggable({
                axis: dim.axis,
                containment: 'parent',
                start: function() {
                    self.dragging = true;
                    $handle.addClass('hover');
                },
                stop: function() {
                    self.dragging = false;
                    $handle.removeClass('hover');
                },
                drag: function(e, ui) {
                    var total_length = self.container[dim.scrollLength] - $container[dim.length]();
                    var scrollable_length = $scrollbar[dim.length]() - $handle[dim.length]();
                    var pos = parseInt($handle.css(dim.position));
                    var percentage = (pos / scrollable_length);
                    var scroll = (percentage * total_length);
                    self.scrollTo(scroll, false);
                }
            });
        }
        $container.bind('scrollbeginning', function() {
            $(self.prevButton).addClass('disabled');
            if (self.settings.animate) {
                self.stopScroll();
            }
        });
        $container.bind('scrollend', function() {
            $(self.nextButton).addClass('disabled');;
            if (self.settings.animate) {
                self.stopScroll();
            }
        });
        self.reset();
    },
    reset: function(s) {
        var self = this;
        var pos = s || 0;
        if (self.scrollNeeded()) {
            $(self.controls).show();
            $(self.container).removeClass('inactive-scroller').addClass('active-scroller');
            if (self.settings.scrollbar) {
                self.resetScrollbar();
            }
        } else {
            $(self.controls).hide()
            $(self.container).removeClass('active-scroller').addClass('inactive-scroller');
        }
        self.scrollTo(s, false);
        if (pos == 0) $(self.prevButton).addClass('disabled');
        $(self.container).trigger('scrollreset');
    },
    resetScrollbar: function() {
        var self = this;
        var dim = self.dim;
        var $controls = $(self.controls);
        var $scrollbar = $(self.scrollbar);
        $controls[dim.length]($(self.container)[dim.length]());
        $scrollbar[dim.length]($controls[dim.length]() - $next[dim.length]() - $prev[dim.length]());
        var length_r = Math.round($scrollbar[dim.length]() * ($(self.container)[dim.length]() / self.container[dim.scrollLength]));
        if (!length_r || length_r < 50) length_r = 50;
        $scrollbar.find('.scroller-handle')[dim.length](length_r);
    },
    update: function(t) {
        var self = this;
        var animate = (typeof(arguments[1]) == 'undefined') ? self.settings.animate : arguments[1];
        var s = self.scrollCursor + t;
        self.scrollTo(s, animate);
    },
    scrollTo: function(s) {
        var self = this;
        var $container = $(self.container);
        var animate = (typeof(arguments[1]) == 'undefined') ? self.settings.animate : arguments[1];
        if (typeof(s) == 'object') {
            var $$ = $(s);
            if ($$.parents().index(self.container) == -1) return;
            var offset = $$.offset()[self.dim.position] + $container[0][self.dim.scrollPosition] - $container.offset()[self.dim.position];
            s = offset;
        } else if (animate) {
            speed = self.settings.animateAmount;
            if (s >= self.scrollCursor)
                s = Math.floor(s / speed) * speed;
            else
                s = Math.ceil(s / speed) * speed;
        }
        self.scrollCursor = s;
        if (self.scrollCursor <= 0) {
            self.scrollCursor = 0;
            $container.trigger('scrollbeginning');
        } else {
            $(self.prevButton).removeClass('disabled');
        }
        var dim = self.dim;
        var scrollLength = self.container[dim.scrollLength];
        var length = $container[dim.length]();
        if (self.scrollCursor >= (scrollLength - length)) {
            self.scrollCursor = scrollLength - length;
            $container.trigger('scrollend');
        } else {
            $(self.nextButton).removeClass('disabled');
        }
        if (animate) {
            var animation_options = {
                easing: 'linear'
            };
            animation_options[dim.scrollPosition] = self.scrollCursor;
            $container.animate(animation_options, self.settings.animateSpeed);
        } else {
            self.container[dim.scrollPosition] = self.scrollCursor;
            self.scrollCursor = self.container[dim.scrollPosition];
        }
        $container.trigger('scrolling', [animate]);
    },
    scrollNeeded: function() {
        var self = this;
        var scrollLength, length;
        var $container = $(self.container);
        length = $container[self.dim.length]();
        scrollLength = self.container[self.dim.scrollLength];
        if (scrollLength > length) return true;
        return false;
    },
    stopScroll: function() {
        var self = this;
        clearTimeout(self.timeoutID);
    },
    scrollPrev: function() {
        var self = this;
        self.update(0 - self.settings.speed);
        self.timeoutID = setTimeout(function() {
            self.scrollPrev();
        }, self.settings.delay);
    },
    scrollNext: function() {
        var self = this;
        self.update(self.settings.speed);
        self.timeoutID = setTimeout(function() {
            self.scrollNext();
        }, self.settings.delay);
    },
    wheel: function(event, delta) {
        var self = this;
        if ($.browser.opera) delta = delta * -1;
        direction = (delta < 0) ? 1 : -1;
        self.update(self.settings.wheelSpeed * direction, false);
        return false;
    }
};
jQuery.fn.Scroller = function(settings) {
    return this.each(function(i, el) {
        var scroller = $.data(el, 'scroller');
        if (scroller) {
            scroller.reset();
        } else {
            scroller = new Scroller(el, settings);
            $.data(el, 'scroller', scroller);
        }
    });
};
(function($) {
    $.fn.fadeNav = function(opt) {
        var container = $(this),
            defaults = {
                caption: null,
                navigation: null,
                speed: 600,
                easing: 'swing',
                src_attr: 'href',
                slideshow: false,
                slideshow_timeout: 8000
            },
            o = $.extend({}, defaults, opt),
            cur = 0;
        var images = container.find('img').css({
            opacity: 0
        }).parent().css({
            display: 'block',
            position: 'absolute',
            top: 0,
            left: 0
        }).end();
        container.each(function() {
            var pos = $(this).css('position');
            if (pos != 'absolute' && pos != 'relative') {
                $(this).css('position', 'relative');
            }
        });
        var img_sources = $.map(images, function(img) {
            var p = $(img).parent();
            var src = p.attr(o.src_attr);
            return src || $(img).attr('src');
        });
        var nav = o.navigation || $('<div class="image-nav"></div>').appendTo(container),
            nav_container = $('<div class="nav-controls"></div>').appendTo(nav),
            prev = $('<a class="image-prev prev">&lt;</a>').appendTo(nav_container),
            count = $('<span class="count">1 of 8</span').appendTo(nav_container),
            next = $('<a class="image-next next">&gt;</a>').appendTo(nav_container),
            caption = o.caption || $('<div class="image-caption"></div>').hide().appendTo(nav);
        if (images.length < 2) nav_container.hide();
        var index = function(n) {
            return (n + images.length) % images.length
        }
        var preload = function(n) {
            n = index(n);
            var img = images.eq(n).attr('src', img_sources[n]);
        }
        var show = function(n, speed) {
            var last = cur;
            cur = index(n);
            var img = images.eq(cur);
            speed = speed == null ? o.speed : speed;
            if (!img.attr('src')) preload(cur);
            var caption_text = img.attr('alt');
            if (caption_text) caption.empty().html(caption_text).show();
            else caption.empty().hide()
            images.eq(last).stop().animate({
                opacity: 0
            }, speed, o.easing, function() {
                $(this).parent().hide();
            });
            count.text((cur + 1) + ' of ' + images.length);
            images.eq(cur).stop().parent().show().end().animate({
                opacity: 1
            }, speed, o.easing, function() {
                images.parent().css('z-index', 1);
                $(this).parent().css('z-index', 10);
                for (i = cur; i < cur + 2; i++) {
                    preload(i);
                }
                i = cur - 1;
                for (i = cur - 1; i > cur - 2; i--) {
                    preload(i);
                }
            });
        }
        preload(cur);
        $(window).load(function() {
            show(cur);
        });
        prev.click(function() {
            show(cur - 1);
            return false;
        });
        next.click(function() {
            show(cur + 1);
            return false;
        });
        if (images.length > 1) {
            images.parent().click(function() {
                show(cur + 1);
                return false;
            });
        } else {
            images.parent().css({
                cursor: 'default'
            }).click(function() {
                return false;
            });
        }
        if (o.slideshow && images.length > 1) {
            var t = setInterval(function() {
                show(cur + 1);
            }, o.slideshow_timeout);
        }
        return this;
    }
})(jQuery);
(function($) {
    jImageBox = function() {
        return this.initialize.apply(this, arguments);
    };
    jImageBox.prototype = {
        options: {
            postOpen: null
        },
        static_url: (static_url || '/'),
        initialize: function($$, options) {
            var self = this;
            self.options = $.extend(self.options, options);
            self.$$ = $$;
            $$.each(function(i, a) {
                $(a).click(function(e, fade) {
                    if (fade == null) fade = true;
                    self.open(i, fade);
                    return false;
                });
            });
        },
        open: function(index) {
            var self = this;
            self.close();
            var $link = self.$$.slice(index);
            var image_id = self.image_id = $link.attr('id').replace('image_', '');
            var $overlay = $('<div id="overlay"></div>').css({
                display: 'none'
            }).appendTo(document.body).click(self.close);
            var fadeIn = (arguments.length > 1) && arguments[1];
            if (fadeIn)
                $overlay.fadeIn(200);
            else
                $overlay.show()
            var $loading = $('<img id="fullscreenLoad" src="' + self.static_url + 'img/loadingAnimation.gif" alt="loading" >');
            $loading.hide().appendTo(document.body);
            var $fsContainer = $('<div id="fullscreenContainer"><img id="fullscreenImage" ><div id="fullscreenImageData">' + '<div id="fullscreenCaption"></div>' + '<a id="fullscreenCloseButton" href="#">X</a>' + '</div></div>').appendTo(document.body);
            $('#fullscreenCloseButton').click(self.close);
            if (self.$$.length > 1) {
                var count = self.$$.length;
                var cur = index + 1;
                $('<div id="fullscreenControls"><span id="fullscreenCount">' + cur + ' of ' + count + '</span> &nbsp;<a id="fullscreenPrev"><span>&lt;</span></a> <a id="fullscreenNext"><span>&gt;</span></a></div>').appendTo('#fullscreenContainer');
                $('#fullscreenNext, #fullscreenImage').click(function() {
                    var i = ((index + 1) + self.$$.length) % self.$$.length;
                    self.open(i);
                });
                $('#fullscreenPrev').click(function() {
                    var i = ((index - 1) + self.$$.length) % self.$$.length;
                    self.open(i);
                });
            } else {
                $('#fullscreenImage').click(self.close);
            }
            var caption = $link.attr('caption') || '';
            $('#fullscreenCaption').append(unescape(caption));
            var preload = new Image();
            if ($.browser.safari) {
                var webKitFields = RegExp("( AppleWebKit/)([^ ]+)").exec(navigator.userAgent);
                var version = parseFloat(webKitFields[2]);
                if (parseFloat(version) < 200) {
                    preload = $('<img id="fullscreenPreload" >')[0];
                    $(preload).css({
                        'position': 'absolute',
                        'top': '-5000px'
                    });
                    $(document.body).append(preload);
                }
            }
            var captionHeight = $('#fullscreenImageData').outerHeight() || 0;
            $fsContainer.hide();
            preload.onload = function() {
                var pad = parseInt($('#fullscreenImage').css('margin-left'), 10);
                var pagesize = [$(window).width(), $(window).height()];
                var x = (pagesize[0] - (pad * 2)) * .9;
                var y = (pagesize[1] - captionHeight) * .85;
                var imageWidth = preload.width;
                var imageHeight = preload.height;
                $('#fullscreenPreload').hide().remove();
                if (imageWidth > x) {
                    imageHeight = imageHeight * (x / imageWidth);
                    imageWidth = x;
                    if (imageHeight > y) {
                        imageWidth = imageWidth * (y / imageHeight);
                        imageHeight = y;
                    }
                } else if (imageHeight > y) {
                    imageWidth = imageWidth * (y / imageHeight);
                    imageHeight = y;
                    if (imageWidth > x) {
                        imageHeight = imageHeight * (x / imageWidth);
                        imageWidth = x;
                    }
                }
                $('#fullscreenImage').attr({
                    'src': preload.src
                }).css({
                    'width': imageWidth,
                    'height': imageHeight
                });
                $fsContainer.css({
                    width: (imageWidth + (pad * 2))
                });
                var t = parseInt((pagesize[1] - $fsContainer.height()) / 2);
                if (t < 0) t = 0;
                t += document.documentElement.scrollTop || document.body.scrollTop;
                var l = parseInt((pagesize[0] - $fsContainer.width()) / 2);
                $fsContainer.css({
                    'position': 'absolute',
                    'top': t + 'px',
                    'left': l + 'px'
                });
                if (self.options.postOpen) {
                    self.options.postOpen.apply(self);
                }
                $loading.remove();
                $fsContainer.show();
            };
            preload.src = self.$$.slice(index).attr('href');
            $loading.show();
            return false;
        },
        close: function() {
            var self = this;
            $('#overlay').hide().remove();
            $('#fullscreenContainer').remove();
            $('#fullscreenLoad').remove();
            return false;
        }
    }
    $.fn.jImageBox = function(options) {
        var ibox = new jImageBox(this, options);
        return this;
    }
})(jQuery);
(function($) {
    $.fn.extend({
        mousewheel: function(f) {
            if (!f.guid) f.guid = $.event.guid++;
            if (!$.event._mwCache) $.event._mwCache = [];
            return this.each(function() {
                if (this._mwHandlers) return this._mwHandlers.push(f);
                else this._mwHandlers = [];
                this._mwHandlers.push(f);
                var s = this;
                this._mwHandler = function(e) {
                    e = $.event.fix(e || window.event);
                    var delta = 0,
                        returnValue = true;
                    if (e.wheelDelta) delta = e.wheelDelta / 120;
                    if (e.detail) delta = -e.detail / 3;
                    if (window.opera) delta = -e.wheelDelta;
                    for (var i = 0; i < s._mwHandlers.length; i++)
                        if (s._mwHandlers[i])
                            if (s._mwHandlers[i].call(s, e, delta) === false) {
                                returnValue = false;
                                e.preventDefault();
                                e.stopPropagation();
                            }
                    return returnValue;
                };
                if (this.addEventListener)
                    if ($.browser.mozilla) this.addEventListener('DOMMouseScroll', this._mwHandler, false);
                    else this.addEventListener('mousewheel', this._mwHandler, false);
                else
                    $.event.add(this, 'mousewheel', this._mwHandler);
                $.event._mwCache.push($(this));
            });
        },
        unmousewheel: function(f) {
            return this.each(function() {
                if (f && this._mwHandlers) {
                    for (var i = 0; i < this._mwHandlers.length; i++)
                        if (this._mwHandlers[i] && this._mwHandlers[i].guid == f.guid)
                            delete this._mwHandlers[i];
                } else {
                    if (this.addEventListener)
                        if ($.browser.mozilla) this.removeEventListener('DOMMouseScroll', this._mwHandler, false);
                        else this.removeEventListener('mousewheel', this._mwHandler, false);
                    else
                        $.event.remove(this, 'mousewheel', this._mwHandler);
                    this._mwHandlers = this._mwHandler = null;
                }
            });
        }
    });
    $(window).bind('unload', function() {
        var els = $.event._mwCache || [];
        for (var i = 0; i < els.length; i++)
            els[i].unmousewheel();
    });
    new function(settings) {
        var $separator = settings.separator || '&';
        var $spaces = settings.spaces === false ? false : true;
        var $suffix = settings.suffix === false ? '' : '[]';
        var $prefix = settings.prefix === false ? false : true;
        var $hash = $prefix ? settings.hash === true ? "#" : "?" : "";
        jQuery.query = new function() {
            var is = function(o, t) {
                return o != undefined && o !== null && (!!t ? o.constructor == t : true);
            };
            var parse = function(path) {
                var m, rx = /\[([^[]*)\]/g,
                    match = /^(\S+?)(\[\S*\])?$/.exec(path),
                    base = match[1],
                    tokens = [];
                while (m = rx.exec(match[2])) tokens.push(m[1]);
                return [base, tokens];
            };
            var set = function(target, tokens, value) {
                var o, token = tokens.shift();
                if (typeof target != 'object') target = null;
                if (token === "") {
                    if (!target) target = [];
                    if (is(target, Array)) {
                        target.push(tokens.length == 0 ? value : set(null, tokens.slice(0), value));
                    } else if (is(target, Object)) {
                        var i = 0;
                        while (target[i++] != null);
                        target[--i] = tokens.length == 0 ? value : set(target[i], tokens.slice(0), value);
                    } else {
                        target = [];
                        target.push(tokens.length == 0 ? value : set(null, tokens.slice(0), value));
                    }
                } else if (token && token.match(/^\s*[0-9]+\s*$/)) {
                    var index = parseInt(token, 10);
                    if (!target) target = [];
                    target[index] = tokens.length == 0 ? value : set(target[index], tokens.slice(0), value);
                } else if (token) {
                    var index = token.replace(/^\s*|\s*$/g, "");
                    if (!target) target = {};
                    if (is(target, Array)) {
                        var temp = {};
                        for (var i = 0; i < target.length; ++i) {
                            temp[i] = target[i];
                        }
                        target = temp;
                    }
                    target[index] = tokens.length == 0 ? value : set(target[index], tokens.slice(0), value);
                } else {
                    return value;
                }
                return target;
            };
            var queryObject = function(a) {
                var self = this;
                self.keys = {};
                if (a.queryObject) {
                    jQuery.each(a.get(), function(key, val) {
                        self.SET(key, val);
                    });
                } else {
                    jQuery.each(arguments, function() {
                        var q = "" + this;
                        q = q.replace(/^[?#]/, '');
                        q = q.replace(/[;&]$/, '');
                        if ($spaces) q = q.replace(/[+]/g, ' ');
                        jQuery.each(q.split(/[&;]/), function() {
                            var key = this.split('=')[0];
                            var val = this.split('=')[1];
                            if (!key) return;
                            if (/^[+-]?[0-9]+\.[0-9]*$/.test(val))
                                val = parseFloat(val);
                            else if (/^[+-]?[0-9]+$/.test(val))
                                val = parseInt(val, 10);
                            val = (!val && val !== 0) ? true : val;
                            if (val !== false && val !== true && typeof val != 'number')
                                val = decodeURIComponent(val);
                            self.SET(key, val);
                        });
                    });
                }
                return self;
            };
            queryObject.prototype = {
                queryObject: true,
                has: function(key, type) {
                    var value = this.get(key);
                    return is(value, type);
                },
                GET: function(key, force_array) {
                    if (!is(key)) return this.keys;
                    var parsed = parse(key),
                        base = parsed[0],
                        tokens = parsed[1];
                    var target = this.keys[base];
                    while (target != null && tokens.length != 0) {
                        target = target[tokens.shift()];
                    }
                    if (force_array)
                        return target ? $.makeArray(target) : []
                    return target || "";
                },
                get: function(key) {
                    var target = this.GET(key);
                    if (is(target, Object))
                        return jQuery.extend(true, {}, target);
                    else if (is(target, Array))
                        return target.slice(0);
                    return target;
                },
                SET: function(key, val) {
                    var value = !is(val) ? null : val;
                    var parsed = parse(key),
                        base = parsed[0],
                        tokens = parsed[1];
                    var target = this.keys[base];
                    this.keys[base] = set(target, tokens.slice(0), value);
                    return this;
                },
                set: function(key, val) {
                    return this.copy().SET(key, val);
                },
                REMOVE: function(key) {
                    return this.SET(key, null).COMPACT();
                },
                remove: function(key) {
                    return this.copy().REMOVE(key);
                },
                EMPTY: function() {
                    var self = this;
                    jQuery.each(self.keys, function(key, value) {
                        delete self.keys[key];
                    });
                    return self;
                },
                empty: function() {
                    return this.copy().EMPTY();
                },
                copy: function() {
                    return new queryObject(this);
                },
                COMPACT: function() {
                    function build(orig) {
                        var obj = typeof orig == "object" ? is(orig, Array) ? [] : {} : orig;
                        if (typeof orig == 'object') {
                            function add(o, key, value) {
                                if (is(o, Array))
                                    o.push(value);
                                else
                                    o[key] = value;
                            }
                            jQuery.each(orig, function(key, value) {
                                if (!is(value)) return true;
                                add(obj, key, build(value));
                            });
                        }
                        return obj;
                    }
                    this.keys = build(this.keys);
                    return this;
                },
                compact: function() {
                    return this.copy().COMPACT();
                },
                toString: function() {
                    var i = 0,
                        queryString = [],
                        chunks = [],
                        self = this;
                    var addFields = function(arr, key, value) {
                        if (!is(value) || value === false) return;
                        var o = [key];
                        if (value !== true) {
                            o.push("=");
                            o.push(encodeURIComponent(value));
                        }
                        arr.push(o.join(""));
                    };
                    var build = function(obj, base) {
                        var newKey = function(key) {
                            return !base || base == "" ? [key].join("") : [base].join("");
                        };
                        jQuery.each(obj, function(key, value) {
                            if (typeof value == 'object')
                                build(value, newKey(key));
                            else
                                addFields(chunks, newKey(key), value);
                        });
                    };
                    build(this.keys);
                    if (chunks.length > 0) queryString.push($hash);
                    queryString.push(chunks.join($separator));
                    return queryString.join("");
                }
            };
            return new queryObject(location.search, location.hash);
        };
    }(jQuery.query || {});

    function gen_id() {
        var id = ""
        for (var i = 0; i < 32; i++) {
            id += Math.floor(Math.random() * 16).toString(16);
        }
        return id
    }
    jQuery.fn.uploadProgress = function() {
        return this.each(function() {
            var $form = $(this);
            if (!($form.is('form') && $form.attr('enctype') == 'multipart/form-data')) return;
            $form.submit(function() {
                var has_upload_data = false;
                var $inputs = $('input[@type=file]', this).each(function() {
                    if (this.value) has_upload_data = true;
                });
                if (!has_upload_data) return true;
                if ($.data(this, 'submitted')) return false;
                var freq = 5000;
                var id = gen_id();
                var progress_url = admin_root + 'upload_progress/';
                this.action += (this.action.indexOf('?') == -1 ? '?' : '&') + 'X-Progress-ID=' + id;
                var $progress = $('<div id="upload-progress" class="upload-progress"></div>').insertAfter($inputs.slice(0, 1)).append('<div class="progress-container"><span class="progress-info">uploading 0%</span><div class="progress-bar"></div></div>');
                $progress.show();
                $form.trigger('form-upload');

                function update_progress_info() {
                    $progress.show();
                    $.getJSON(progress_url, {
                        'X-Progress-ID': id
                    }, function(data, status) {
                        if (data) {
                            var progress = parseInt(data.uploaded) / parseInt(data.length);
                            var width = $progress.find('.progress-container').width()
                            var progress_width = width * progress;
                            $progress.find('.progress-bar').width(progress_width);
                            $progress.find('.progress-info').text('uploading ' + parseInt(progress * 100) + '%');
                        }
                        window.setTimeout(update_progress_info, freq);
                    });
                };
                window.setTimeout(update_progress_info, freq);
                $.data(this, 'submitted', true);
            });
        });
    }
    jQuery.setHash = function(hash) {
        hash = hash.replace(/^#/, '');
        var fx, node = $('#' + hash);
        if (node.length) {
            fx = $('<div></div>').css({
                position: 'absolute',
                visibility: 'hidden',
                top: $(window).scrollTop()
            }).attr('id', hash).appendTo(document.body);
            node.attr('id', '');
        }
        document.location.hash = hash;
        if (node.length) {
            fx.remove();
            node.attr('id', hash);
        }
    }
})(jQuery);
$(function() {
    $('#headline, #footer-announcement').each(function() {
        var messages = $(this).find('.announcement'),
            cur = -1,
            interval = 10000,
            speed = 700;
        var next = function() {
            if (messages.length < 2) return;
            messages.eq(cur).animate({
                opacity: 0
            }, speed, function() {
                $(this).hide().css('zIndex', 10);
            });
            cur = (cur + 1 + messages.length) % messages.length;
            messages.eq(cur).css('zIndex', 11).show().animate({
                opacity: 1
            }, speed);
        }
        $(window).bind('custom-load', function() {
            var t = setInterval(next, interval);
            $(this).hover(function() {
                clearInterval(t);
            }, function() {
                t = setInterval(next, interval);
            });
            next(0);
        });
    });
    if (window.location.path != '/') $(window).trigger('custom-load');
    $(window).load(function() {
        var el = $('#header h1 a').clone(false).addClass('hover').css({
            position: 'absolute',
            top: -99999
        }).appendTo('#header h1').remove();
    });
    $('input#id_search').bind('focus click', function() {
        $(this).select();
    });
});