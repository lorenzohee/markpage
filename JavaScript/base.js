/**
 * Created by Lorenzo on 2015/12/19.
 */
(function(){
    //fix ie8 bug that indexOf isn't the array function
    if (typeof Array.prototype.indexOf !== "function") {
        Array.prototype.indexOf = function (item) {
            for(var i = 0; i < this.length; i++) {
                if (this[i] === item) {
                    return i;
                }
            }
            return -1;
        };
    };
    //add lh
    function lh (els) {
        for(var i = 0; i < els.length; i++ ) {
            this[i] = els[i];
        }
        this.length = els.length;
    };
    lh.prototype.map = function (callback) {
        var results = [], i = 0;
        for ( ; i < this.length; i++) {
            results.push(callback.call(this, this[i], i));
        }
        return results;
    };
    lh.prototype.forEach = function(callback) {
        this.map(callback);
        return this;
    };
    lh.prototype.mapOne = function (callback) {
        var m = this.map(callback);
        return m.length > 1 ? m : m[0];
    };
    lh.prototype.mapOne = function (callback) {
        var m = this.map(callback);
        return m.length > 1 ? m : m[0];
    };
    //get text of dom
    lh.prototype.text = function (text) {
        if (typeof text !== "undefined") {
            return this.forEach(function (el) {
                el.innerText = text;
            });
        } else {
            return this.mapOne(function (el) {
                return el.innerText;
            });
        }
    };
    //get inner html of dom
    lh.prototype.html = function (html) {
        if (typeof html !== "undefined") {
            this.forEach(function (el) {
                el.innerHTML = html;
            });
            return this;
        } else {
            return this.mapOne(function (el) {
                return el.innerHTML;
            });
        }
    };
    //add classes to dom
    lh.prototype.addClass = function (classes) {
        var className = "";
        if (typeof classes !== "string") {
            for (var i = 0; i < classes.length; i++) {
                className += " " + classes[i];
            }
        } else {
            className = " " + classes;
        }
        return this.forEach(function (el) {
            el.className += className;
        });
    };
    // remove class
    lh.prototype.removeClass = function (clazz) {
        return this.forEach(function (el) {
            var cs = el.className.split(" "), i;
            while ( (i = cs.indexOf(clazz)) > -1) {
                cs = cs.slice(0, i).concat(cs.slice(++i));
            }
            el.className = cs.join(" ");
        });
    };
    // change the attribute
    lh.prototype.attr = function (attr, val) {
        if (typeof val !== "undefined") {
            return this.forEach(function(el) {
                el.setAttribute(attr, val);
            });
        } else {
            return this.mapOne(function (el) {
                return el.getAttribute(attr);
            });
        }
    };
    //append dom to lh
    lh.prototype.append = function (els) {
        return this.forEach(function (parEl, i) {
            els.forEach(function (childEl) {
                if (i > 0) {
                    childEl = childEl.cloneNode(true);
                }
                parEl.appendChild(childEl);
            });
        });
    };
    //append dom before the lh
    lh.prototype.prepend = function (els) {
        return this.forEach(function (parEl, i) {
            for (var j = els.length -1; j > -1; j--) {
                childEl = (i > 0) ? els[j].cloneNode(true) : els[j];
                parEl.insertBefore(childEl, parEl.firstChild);
            }
        });
    };
    //remove dom
    lh.prototype.remove = function () {
        return this.forEach(function (el) {
            return el.parentNode.removeChild(el);
        });
    };
    //add function handler
    lh.prototype.on = (function () {
        if (document.addEventListener) {
            return function (evt, fn) {
                return this.forEach(function (el) {
                    el.addEventListener(evt, fn, false);
                });
            };
        } else if (document.attachEvent)  {
            return function (evt, fn) {
                return this.forEach(function (el) {
                    el.attachEvent("on" + evt, fn);
                });
            };
        } else {
            return function (evt, fn) {
                return this.forEach(function (el) {
                    el["on" + evt] = fn;
                });
            };
        }
    }());
    //remove function handler
    lh.prototype.off = (function () {
        if (document.removeEventListener) {
            return function (evt, fn) {
                return this.forEach(function (el) {
                    el.removeEventListener(evt, fn, false);
                });
            };
        } else if (document.detachEvent)  {
            return function (evt, fn) {
                return this.forEach(function (el) {
                    el.detachEvent("on" + evt, fn);
                });
            };
        } else {
            return function (evt, fn) {
                return this.forEach(function (el) {
                    el["on" + evt] = null;
                });
            };
        }
    }());
    // get dom Object by selector
    function get(selector) {
        var els;
        if (typeof selector === "string") {
            els = document.querySelectorAll(selector);
        } else if (selector.length) {
            els = selector;
        } else {
            els = [selector];
        }
        return new lh(els);
    };
    // create dom Object
    function create(tagName, attrs) {
        var el = new lh([document.createElement(tagName)]);
        if (attrs) {
            if (attrs.className) {
                el.addClass(attrs.className);
                delete attrs.className;
            }
            if (attrs.text) {
                el.text(attrs.text);
                delete attrs.text;
            }
            for (var key in attrs) {
                if (attrs.hasOwnProperty(key)) {
                    el.attr(key, attrs[key]);
                }
            }
        }
        return el;
    }
    function test(arg){
        alert(arg);
    }
    window['lh']={};
    window['lh']['get']=get;
    window['lh']['create']=create;
    window['lh']['test1']=test;
})()