/*!

Holder - 2.3.2 - client side image placeholders
(c) 2012-2014 Ivan Malopinsky / http://imsky.co

Provided under the MIT License.
Commercial use requires attribution.

*/
var Holder = Holder || {};
! function (a, b) {
  function c(a, b, c) {
    b = parseInt(b, 10), a = parseInt(a, 10);
    var d = Math.max(b, a),
      e = Math.min(b, a),
      f = 1 / 12,
      g = Math.min(.75 * e, .75 * d * f);
    return {
      height: Math.round(Math.max(c.size, g))
    }
  }

  function d(a) {
    var b = [];
    for (p in a) a.hasOwnProperty(p) && b.push(p + ":" + a[p]);
    return b.join(";")
  }

  function e(a) {
    var b = a.ctx,
      d = a.dimensions,
      e = a.template,
      f = a.ratio,
      g = a.holder,
      h = "literal" == g.textmode,
      i = "exact" == g.textmode,
      j = c(d.width, d.height, e),
      k = j.height,
      l = d.width * f,
      m = d.height * f,
      n = e.font ? e.font : "Arial,Helvetica,sans-serif";
    canvas.width = l, canvas.height = m, b.textAlign = "center", b.textBaseline = "middle", b.fillStyle = e.background, b.fillRect(0, 0, l, m), b.fillStyle = e.foreground, b.font = "bold " + k + "px " + n;
    var o = e.text ? e.text : Math.floor(d.width) + "x" + Math.floor(d.height);
    if (h) {
      var d = g.dimensions;
      o = d.width + "x" + d.height
    } else if (i && g.exact_dimensions) {
      var d = g.exact_dimensions;
      o = Math.floor(d.width) + "x" + Math.floor(d.height)
    }
    var p = b.measureText(o).width;
    return p / l >= .75 && (k = Math.floor(.75 * k * (l / p))), b.font = "bold " + k * f + "px " + n, b.fillText(o, l / 2, m / 2, l), canvas.toDataURL("image/png")
  }

  function f(a) {
    var b = a.dimensions,
      d = a.template,
      e = a.holder,
      f = "literal" == e.textmode,
      g = "exact" == e.textmode,
      h = c(b.width, b.height, d),
      i = h.height,
      j = b.width,
      k = b.height,
      l = d.font ? d.font : "Arial,Helvetica,sans-serif",
      m = d.text ? d.text : Math.floor(b.width) + "x" + Math.floor(b.height);
    if (f) {
      var b = e.dimensions;
      m = b.width + "x" + b.height
    } else if (g && e.exact_dimensions) {
      var b = e.exact_dimensions;
      m = Math.floor(b.width) + "x" + Math.floor(b.height)
    }
    var n = z({
      text: m,
      width: j,
      height: k,
      text_height: i,
      font: l,
      template: d
    });
    return "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(n)))
  }

  function g(a) {
    return r.use_canvas && !r.use_svg ? e(a) : f(a)
  }

  function h(a, b, c, d) {
    var e = c.dimensions,
      f = c.theme,
      h = c.text ? decodeURIComponent(c.text) : c.text,
      i = e.width + "x" + e.height;
    f = h ? o(f, {
      text: h
    }) : f, f = c.font ? o(f, {
      font: c.font
    }) : f, b.setAttribute("data-src", d), c.theme = f, b.holder_data = c, "image" == a ? (b.setAttribute("alt", h ? h : f.text ? f.text + " [" + i + "]" : i), (r.use_fallback || !c.auto) && (b.style.width = e.width + "px", b.style.height = e.height + "px"), r.use_fallback ? b.style.backgroundColor = f.background : (b.setAttribute("src", g({
      ctx: w,
      dimensions: e,
      template: f,
      ratio: x,
      holder: c
    })), c.textmode && "exact" == c.textmode && (v.push(b), k(b)))) : "background" == a ? r.use_fallback || (b.style.backgroundImage = "url(" + g({
      ctx: w,
      dimensions: e,
      template: f,
      ratio: x,
      holder: c
    }) + ")", b.style.backgroundSize = e.width + "px " + e.height + "px") : "fluid" == a && (b.setAttribute("alt", h ? h : f.text ? f.text + " [" + i + "]" : i), "%" == e.height.slice(-1) ? b.style.height = e.height : null != c.auto && c.auto || (b.style.height = e.height + "px"), "%" == e.width.slice(-1) ? b.style.width = e.width : null != c.auto && c.auto || (b.style.width = e.width + "px"), ("inline" == b.style.display || "" === b.style.display || "none" == b.style.display) && (b.style.display = "block"), j(b), r.use_fallback ? b.style.backgroundColor = f.background : (v.push(b), k(b)))
  }

  function i(a, b) {
    var c = {
      height: a.clientHeight,
      width: a.clientWidth
    };
    return c.height || c.width ? (a.removeAttribute("data-holder-invisible"), c) : (a.setAttribute("data-holder-invisible", !0), void b.call(this, a))
  }

  function j(b) {
    if (b.holder_data) {
      var c = i(b, a.invisible_error_fn(j));
      if (c) {
        var d = b.holder_data;
        d.initial_dimensions = c, d.fluid_data = {
          fluid_height: "%" == d.dimensions.height.slice(-1),
          fluid_width: "%" == d.dimensions.width.slice(-1),
          mode: null
        }, d.fluid_data.fluid_width && !d.fluid_data.fluid_height ? (d.fluid_data.mode = "width", d.fluid_data.ratio = d.initial_dimensions.width / parseFloat(d.dimensions.height)) : !d.fluid_data.fluid_width && d.fluid_data.fluid_height && (d.fluid_data.mode = "height", d.fluid_data.ratio = parseFloat(d.dimensions.width) / d.initial_dimensions.height)
      }
    }
  }

  function k(b) {
    var c;
    c = null == b.nodeType ? v : [b];
    for (var d in c) if (c.hasOwnProperty(d)) {
      var e = c[d];
      if (e.holder_data) {
        var f = e.holder_data,
          h = i(e, a.invisible_error_fn(k));
        if (h) {
          if (f.fluid) {
            if (f.auto) switch (f.fluid_data.mode) {
              case "width":
                h.height = h.width / f.fluid_data.ratio;
                break;
              case "height":
                h.width = h.height * f.fluid_data.ratio
            }
            e.setAttribute("src", g({
              ctx: w,
              dimensions: h,
              template: f.theme,
              ratio: x,
              holder: f
            }))
          }
          f.textmode && "exact" == f.textmode && (f.exact_dimensions = h, e.setAttribute("src", g({
            ctx: w,
            dimensions: f.dimensions,
            template: f.theme,
            ratio: x,
            holder: f
          })))
        }
      }
    }
  }

  function l(b, c) {
    for (var d = {
      theme: o(y.themes.gray, {})
    }, e = !1, f = b.length, g = 0; f > g; g++) {
      var h = b[g];
      a.flags.dimensions.match(h) ? (e = !0, d.dimensions = a.flags.dimensions.output(h)) : a.flags.fluid.match(h) ? (e = !0, d.dimensions = a.flags.fluid.output(h), d.fluid = !0) : a.flags.textmode.match(h) ? d.textmode = a.flags.textmode.output(h) : a.flags.colors.match(h) ? d.theme = a.flags.colors.output(h) : c.themes[h] ? c.themes.hasOwnProperty(h) && (d.theme = o(c.themes[h], {})) : a.flags.font.match(h) ? d.font = a.flags.font.output(h) : a.flags.auto.match(h) ? d.auto = !0 : a.flags.text.match(h) && (d.text = a.flags.text.output(h))
    }
    return e ? d : !1
  }

  function m(a, b) {
    var c = "complete",
      d = "readystatechange",
      e = !1,
      f = e,
      g = !0,
      h = a.document,
      i = h.documentElement,
      j = h.addEventListener ? "addEventListener" : "attachEvent",
      k = h.addEventListener ? "removeEventListener" : "detachEvent",
      l = h.addEventListener ? "" : "on",
      m = function (g) {
        (g.type != d || h.readyState == c) && (("load" == g.type ? a : h)[k](l + g.type, m, e), !f && (f = !0) && b.call(a, null))
      }, n = function () {
        try {
          i.doScroll("left")
        } catch (a) {
          return void setTimeout(n, 50)
        }
        m("poll")
      };
    if (h.readyState == c) b.call(a, "lazy");
    else {
      if (h.createEventObject && i.doScroll) {
        try {
          g = !a.frameElement
        } catch (o) {}
        g && n()
      }
      h[j](l + "DOMContentLoaded", m, e), h[j](l + d, m, e), a[j](l + "load", m, e)
    }
  }

  function n(a, b) {
    var a = a.match(/^(\W)?(.*)/),
      b = b || document,
      c = b["getElement" + (a[1] ? "#" == a[1] ? "ById" : "sByClassName" : "sByTagName")],
      d = c.call(b, a[2]),
      e = [];
    return null !== d && (e = d.length || 0 === d.length ? d : [d]), e
  }

  function o(a, b) {
    var c = {};
    for (var d in a) a.hasOwnProperty(d) && (c[d] = a[d]);
    for (var d in b) b.hasOwnProperty(d) && (c[d] = b[d]);
    return c
  }
  var q = {
    use_svg: !1,
    use_canvas: !1,
    use_fallback: !1
  }, r = {}, s = !1;
  canvas = document.createElement("canvas");
  var t = 1,
    u = 1,
    v = [];
  if (canvas.getContext) if (canvas.toDataURL("image/png").indexOf("data:image/png") < 0) q.use_fallback = !0;
  else var w = canvas.getContext("2d");
  else q.use_fallback = !0;
  document.createElementNS && document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect && (q.use_svg = !0, q.use_canvas = !1), q.use_fallback || (t = window.devicePixelRatio || 1, u = w.webkitBackingStorePixelRatio || w.mozBackingStorePixelRatio || w.msBackingStorePixelRatio || w.oBackingStorePixelRatio || w.backingStorePixelRatio || 1);
  var x = t / u,
    y = {
      domain: "holder.js",
      images: "img",
      bgnodes: ".holderjs",
      themes: {
        gray: {
          background: "#eee",
          foreground: "#aaa",
          size: 12
        },
        social: {
          background: "#3a5a97",
          foreground: "#fff",
          size: 12
        },
        industrial: {
          background: "#434A52",
          foreground: "#C2F200",
          size: 12
        },
        sky: {
          background: "#0D8FDB",
          foreground: "#fff",
          size: 12
        },
        vine: {
          background: "#39DBAC",
          foreground: "#1E292C",
          size: 12
        },
        lava: {
          background: "#F8591A",
          foreground: "#1C2846",
          size: 12
        }
      },
      stylesheet: ""
    };
  a.flags = {
    dimensions: {
      regex: /^(\d+)x(\d+)$/,
      output: function (a) {
        var b = this.regex.exec(a);
        return {
          width: +b[1],
          height: +b[2]
        }
      }
    },
    fluid: {
      regex: /^([0-9%]+)x([0-9%]+)$/,
      output: function (a) {
        var b = this.regex.exec(a);
        return {
          width: b[1],
          height: b[2]
        }
      }
    },
    colors: {
      regex: /#([0-9a-f]{3,})\:#([0-9a-f]{3,})/i,
      output: function (a) {
        var b = this.regex.exec(a);
        return {
          size: y.themes.gray.size,
          foreground: "#" + b[2],
          background: "#" + b[1]
        }
      }
    },
    text: {
      regex: /text\:(.*)/,
      output: function (a) {
        return this.regex.exec(a)[1]
      }
    },
    font: {
      regex: /font\:(.*)/,
      output: function (a) {
        return this.regex.exec(a)[1]
      }
    },
    auto: {
      regex: /^auto$/
    },
    textmode: {
      regex: /textmode\:(.*)/,
      output: function (a) {
        return this.regex.exec(a)[1]
      }
    }
  };
  var z = function () {
    if (window.XMLSerializer) {
      var a = new XMLSerializer,
        b = "http://www.w3.org/2000/svg",
        c = document.createElementNS(b, "svg");
      c.webkitMatchesSelector && c.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      var e = document.createElementNS(b, "rect"),
        f = document.createElementNS(b, "text"),
        g = document.createTextNode(null);
      return f.setAttribute("text-anchor", "middle"), f.appendChild(g), c.appendChild(e), c.appendChild(f),

      function (b) {
        return c.setAttribute("width", b.width), c.setAttribute("height", b.height), e.setAttribute("width", b.width), e.setAttribute("height", b.height), e.setAttribute("fill", b.template.background), f.setAttribute("x", b.width / 2), f.setAttribute("y", b.height / 2), g.nodeValue = b.text, f.setAttribute("style", d({
          fill: b.template.foreground,
          "font-weight": "bold",
          "font-size": b.text_height + "px",
          "font-family": b.font,
          "dominant-baseline": "central"
        })), a.serializeToString(c)
      }
    }
  }();
  for (var A in a.flags) a.flags.hasOwnProperty(A) && (a.flags[A].match = function (a) {
    return a.match(this.regex)
  });
  a.invisible_error_fn = function () {
    return function (a) {
      if (a.hasAttribute("data-holder-invisible")) throw new Error("Holder: invisible placeholder")
    }
  }, a.add_theme = function (b, c) {
    return null != b && null != c && (y.themes[b] = c), a
  }, a.add_image = function (b, c) {
    var d = n(c);
    if (d.length) for (var e = 0, f = d.length; f > e; e++) {
      var g = document.createElement("img");
      g.setAttribute("data-src", b), d[e].appendChild(g)
    }
    return a
  }, a.run = function (b) {
    r = o({}, q), s = !0;
    var c = o(y, b),
      d = [],
      e = [],
      f = [];
    for (null != c.use_canvas && c.use_canvas && (r.use_canvas = !0, r.use_svg = !1), "string" == typeof c.images ? e = n(c.images) : window.NodeList && c.images instanceof window.NodeList ? e = c.images : window.Node && c.images instanceof window.Node ? e = [c.images] : window.HTMLCollection && c.images instanceof window.HTMLCollection && (e = c.images), "string" == typeof c.bgnodes ? f = n(c.bgnodes) : window.NodeList && c.elements instanceof window.NodeList ? f = c.bgnodes : window.Node && c.bgnodes instanceof window.Node && (f = [c.bgnodes]), k = 0, j = e.length; j > k; k++) d.push(e[k]);
    var g = document.getElementById("holderjs-style");
    g || (g = document.createElement("style"), g.setAttribute("id", "holderjs-style"), g.type = "text/css", document.getElementsByTagName("head")[0].appendChild(g)), c.nocss || (g.styleSheet ? g.styleSheet.cssText += c.stylesheet : c.stylesheet.length && g.appendChild(document.createTextNode(c.stylesheet)));
    for (var i = new RegExp(c.domain + '/(.*?)"?\\)'), j = f.length, k = 0; j > k; k++) {
      var m = window.getComputedStyle(f[k], null).getPropertyValue("background-image"),
        p = m.match(i),
        t = f[k].getAttribute("data-background-src");
      if (p) {
        var u = l(p[1].split("/"), c);
        u && h("background", f[k], u, m)
      } else if (null != t) {
        var u = l(t.substr(t.lastIndexOf(c.domain) + c.domain.length + 1).split("/"), c);
        u && h("background", f[k], u, m)
      }
    }
    for (j = d.length, k = 0; j > k; k++) {
      var v, w;
      w = v = m = null;
      try {
        w = d[k].getAttribute("src"), attr_datasrc = d[k].getAttribute("data-src")
      } catch (x) {}
      if (null == attr_datasrc && w && w.indexOf(c.domain) >= 0 ? m = w : attr_datasrc && attr_datasrc.indexOf(c.domain) >= 0 && (m = attr_datasrc), m) {
        var u = l(m.substr(m.lastIndexOf(c.domain) + c.domain.length + 1).split("/"), c);
        u && (u.fluid ? h("fluid", d[k], u, m) : h("image", d[k], u, m))
      }
    }
    return a
  }, m(b, function () {
    window.addEventListener ? (window.addEventListener("resize", k, !1), window.addEventListener("orientationchange", k, !1)) : window.attachEvent("onresize", k), s || a.run({}), "object" == typeof window.Turbolinks && document.addEventListener("page:change", function () {
      a.run({})
    })
  }), "function" == typeof define && define.amd && define([], function () {
    return a
  }),

  function () {
    function a(a) {
      this.message = a
    }
    var b = "undefined" != typeof exports ? exports : this,
      c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    a.prototype = Error(), a.prototype.name = "InvalidCharacterError", b.btoa || (b.btoa = function (b) {
      for (var d, e, f = 0, g = c, h = ""; b.charAt(0 | f) || (g = "=", f % 1); h += g.charAt(63 & d >> 8 - 8 * (f % 1))) {
        if (e = b.charCodeAt(f += .75), e > 255) throw new a("'btoa' failed");
        d = d << 8 | e
      }
      return h
    }), b.atob || (b.atob = function (b) {
      if (b = b.replace(/=+$/, ""), 1 == b.length % 4) throw new a("'atob' failed");
      for (var d, e, f = 0, g = 0, h = ""; e = b.charAt(g++);~e && (d = f % 4 ? 64 * d + e : e, f++ % 4) ? h += String.fromCharCode(255 & d >> (6 & -2 * f)) : 0) e = c.indexOf(e);
      return h
    })
  }(), document.getElementsByClassName || (document.getElementsByClassName = function (a) {
    var b, c, d, e = document,
      f = [];
    if (e.querySelectorAll) return e.querySelectorAll("." + a);
    if (e.evaluate) for (c = ".//*[contains(concat(' ', @class, ' '), ' " + a + " ')]", b = e.evaluate(c, e, null, 0, null); d = b.iterateNext();) f.push(d);
    else for (b = e.getElementsByTagName("*"), c = new RegExp("(^|\\s)" + a + "(\\s|$)"), d = 0; d < b.length; d++) c.test(b[d].className) && f.push(b[d]);
    return f
  }), window.getComputedStyle || (window.getComputedStyle = function (a) {
    return this.el = a, this.getPropertyValue = function (b) {
      var c = /(\-([a-z]){1})/g;
      return "float" == b && (b = "styleFloat"), c.test(b) && (b = b.replace(c, function () {
        return arguments[2].toUpperCase()
      })), a.currentStyle[b] ? a.currentStyle[b] : null
    }, this
  }), Object.prototype.hasOwnProperty || (Object.prototype.hasOwnProperty = function (a) {
    var b = this.__proto__ || this.constructor.prototype;
    return a in this && (!(a in b) || b[a] !== this[a])
  })
}(Holder, window),
/*!
 * ZeroClipboard
 * The ZeroClipboard library provides an easy way to copy text to the clipboard using an invisible Adobe Flash movie and a JavaScript interface.
 * Copyright (c) 2014 Jon Rohan, James M. Greene
 * Licensed MIT
 * http://zeroclipboard.org/
 * v1.3.5
 */
! function (a) {
  "use strict";

  function b(a) {
    return a.replace(/,/g, ".").replace(/[^0-9\.]/g, "")
  }

  function c(a) {
    return parseFloat(b(a)) >= 10
  }
  var d, e = {
    bridge: null,
    version: "0.0.0",
    disabled: null,
    outdated: null,
    ready: null
  }, f = {}, g = 0,
    h = {}, i = 0,
    j = {}, k = null,
    l = null,
    m = function () {
      var a, b, c, d, e = "ZeroClipboard.swf";
      if (document.currentScript && (d = document.currentScript.src));
      else {
        var f = document.getElementsByTagName("script");
        if ("readyState" in f[0]) for (a = f.length; a-- && ("interactive" !== f[a].readyState || !(d = f[a].src)););
        else if ("loading" === document.readyState) d = f[f.length - 1].src;
        else {
          for (a = f.length; a--;) {
            if (c = f[a].src, !c) {
              b = null;
              break
            }
            if (c = c.split("#")[0].split("?")[0], c = c.slice(0, c.lastIndexOf("/") + 1), null == b) b = c;
            else if (b !== c) {
              b = null;
              break
            }
          }
          null !== b && (d = b)
        }
      }
      return d && (d = d.split("#")[0].split("?")[0], e = d.slice(0, d.lastIndexOf("/") + 1) + e), e
    }(),
    n = function () {
      var a = /\-([a-z])/g,
        b = function (a, b) {
          return b.toUpperCase()
        };
      return function (c) {
        return c.replace(a, b)
      }
    }(),
    o = function (b, c) {
      var d, e, f;
      return a.getComputedStyle ? d = a.getComputedStyle(b, null).getPropertyValue(c) : (e = n(c), d = b.currentStyle ? b.currentStyle[e] : b.style[e]), "cursor" !== c || d && "auto" !== d || (f = b.tagName.toLowerCase(), "a" !== f) ? d : "pointer"
    }, p = function (b) {
      b || (b = a.event);
      var c;
      this !== a ? c = this : b.target ? c = b.target : b.srcElement && (c = b.srcElement), K.activate(c)
    }, q = function (a, b, c) {
      a && 1 === a.nodeType && (a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent && a.attachEvent("on" + b, c))
    }, r = function (a, b, c) {
      a && 1 === a.nodeType && (a.removeEventListener ? a.removeEventListener(b, c, !1) : a.detachEvent && a.detachEvent("on" + b, c))
    }, s = function (a, b) {
      if (!a || 1 !== a.nodeType) return a;
      if (a.classList) return a.classList.contains(b) || a.classList.add(b), a;
      if (b && "string" == typeof b) {
        var c = (b || "").split(/\s+/);
        if (1 === a.nodeType) if (a.className) {
          for (var d = " " + a.className + " ", e = a.className, f = 0, g = c.length; g > f; f++) d.indexOf(" " + c[f] + " ") < 0 && (e += " " + c[f]);
          a.className = e.replace(/^\s+|\s+$/g, "")
        } else a.className = b
      }
      return a
    }, t = function (a, b) {
      if (!a || 1 !== a.nodeType) return a;
      if (a.classList) return a.classList.contains(b) && a.classList.remove(b), a;
      if (b && "string" == typeof b || void 0 === b) {
        var c = (b || "").split(/\s+/);
        if (1 === a.nodeType && a.className) if (b) {
          for (var d = (" " + a.className + " ").replace(/[\n\t]/g, " "), e = 0, f = c.length; f > e; e++) d = d.replace(" " + c[e] + " ", " ");
          a.className = d.replace(/^\s+|\s+$/g, "")
        } else a.className = ""
      }
      return a
    }, u = function () {
      var a, b, c, d = 1;
      return "function" == typeof document.body.getBoundingClientRect && (a = document.body.getBoundingClientRect(), b = a.right - a.left, c = document.body.offsetWidth, d = Math.round(b / c * 100) / 100), d
    }, v = function (b, c) {
      var d = {
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        zIndex: B(c) - 1
      };
      if (b.getBoundingClientRect) {
        var e, f, g, h = b.getBoundingClientRect();
        "pageXOffset" in a && "pageYOffset" in a ? (e = a.pageXOffset, f = a.pageYOffset) : (g = u(), e = Math.round(document.documentElement.scrollLeft / g), f = Math.round(document.documentElement.scrollTop / g));
        var i = document.documentElement.clientLeft || 0,
          j = document.documentElement.clientTop || 0;
        d.left = h.left + e - i, d.top = h.top + f - j, d.width = "width" in h ? h.width : h.right - h.left, d.height = "height" in h ? h.height : h.bottom - h.top
      }
      return d
    }, w = function (a, b) {
      var c = null == b || b && b.cacheBust === !0 && b.useNoCache === !0;
      return c ? (-1 === a.indexOf("?") ? "?" : "&") + "noCache=" + (new Date).getTime() : ""
    }, x = function (b) {
      var c, d, e, f = [],
        g = [],
        h = [];
      if (b.trustedOrigins && ("string" == typeof b.trustedOrigins ? g.push(b.trustedOrigins) : "object" == typeof b.trustedOrigins && "length" in b.trustedOrigins && (g = g.concat(b.trustedOrigins))), b.trustedDomains && ("string" == typeof b.trustedDomains ? g.push(b.trustedDomains) : "object" == typeof b.trustedDomains && "length" in b.trustedDomains && (g = g.concat(b.trustedDomains))), g.length) for (c = 0, d = g.length; d > c; c++) if (g.hasOwnProperty(c) && g[c] && "string" == typeof g[c]) {
        if (e = E(g[c]), !e) continue;
        if ("*" === e) {
          h = [e];
          break
        }
        h.push.apply(h, [e, "//" + e, a.location.protocol + "//" + e])
      }
      return h.length && f.push("trustedOrigins=" + encodeURIComponent(h.join(","))), "string" == typeof b.jsModuleId && b.jsModuleId && f.push("jsModuleId=" + encodeURIComponent(b.jsModuleId)), f.join("&")
    }, y = function (a, b, c) {
      if ("function" == typeof b.indexOf) return b.indexOf(a, c);
      var d, e = b.length;
      for ("undefined" == typeof c ? c = 0 : 0 > c && (c = e + c), d = c; e > d; d++) if (b.hasOwnProperty(d) && b[d] === a) return d;
      return -1
    }, z = function (a) {
      if ("string" == typeof a) throw new TypeError("ZeroClipboard doesn't accept query strings.");
      return a.length ? a : [a]
    }, A = function (b, c, d, e) {
      e ? a.setTimeout(function () {
        b.apply(c, d)
      }, 0) : b.apply(c, d)
    }, B = function (a) {
      var b, c;
      return a && ("number" == typeof a && a > 0 ? b = a : "string" == typeof a && (c = parseInt(a, 10)) && !isNaN(c) && c > 0 && (b = c)), b || ("number" == typeof N.zIndex && N.zIndex > 0 ? b = N.zIndex : "string" == typeof N.zIndex && (c = parseInt(N.zIndex, 10)) && !isNaN(c) && c > 0 && (b = c)), b || 0
    }, C = function (a, b) {
      if (a && b !== !1 && "undefined" != typeof console && console && (console.warn || console.log)) {
        var c = "`" + a + "` is deprecated. See docs for more info:\n    https://github.com/zeroclipboard/zeroclipboard/blob/master/docs/instructions.md#deprecations";
        console.warn ? console.warn(c) : console.log(c)
      }
    }, D = function () {
      var a, b, c, d, e, f, g = arguments[0] || {};
      for (a = 1, b = arguments.length; b > a; a++) if (null != (c = arguments[a])) for (d in c) if (c.hasOwnProperty(d)) {
        if (e = g[d], f = c[d], g === f) continue;
        void 0 !== f && (g[d] = f)
      }
      return g
    }, E = function (a) {
      if (null == a || "" === a) return null;
      if (a = a.replace(/^\s+|\s+$/g, ""), "" === a) return null;
      var b = a.indexOf("//");
      a = -1 === b ? a : a.slice(b + 2);
      var c = a.indexOf("/");
      return a = -1 === c ? a : -1 === b || 0 === c ? null : a.slice(0, c), a && ".swf" === a.slice(-4).toLowerCase() ? null : a || null
    }, F = function () {
      var a = function (a, b) {
        var c, d, e;
        if (null != a && "*" !== b[0] && ("string" == typeof a && (a = [a]), "object" == typeof a && "length" in a)) for (c = 0, d = a.length; d > c; c++) if (a.hasOwnProperty(c) && (e = E(a[c]))) {
          if ("*" === e) {
            b.length = 0, b.push("*");
            break
          } - 1 === y(e, b) && b.push(e)
        }
      }, b = {
        always: "always",
        samedomain: "sameDomain",
        never: "never"
      };
      return function (c, d) {
        var e, f = d.allowScriptAccess;
        if ("string" == typeof f && (e = f.toLowerCase()) && /^always|samedomain|never$/.test(e)) return b[e];
        var g = E(d.moviePath);
        null === g && (g = c);
        var h = [];
        a(d.trustedOrigins, h), a(d.trustedDomains, h);
        var i = h.length;
        if (i > 0) {
          if (1 === i && "*" === h[0]) return "always";
          if (-1 !== y(c, h)) return 1 === i && c === g ? "sameDomain" : "always"
        }
        return "never"
      }
    }(),
    G = function (a) {
      if (null == a) return [];
      if (Object.keys) return Object.keys(a);
      var b = [];
      for (var c in a) a.hasOwnProperty(c) && b.push(c);
      return b
    }, H = function (a) {
      if (a) for (var b in a) a.hasOwnProperty(b) && delete a[b];
      return a
    }, I = function () {
      try {
        return document.activeElement
      } catch (a) {}
      return null
    }, J = function () {
      var a = !1;
      if ("boolean" == typeof e.disabled) a = e.disabled === !1;
      else {
        if ("function" == typeof ActiveXObject) try {
          new ActiveXObject("ShockwaveFlash.ShockwaveFlash") && (a = !0)
        } catch (b) {}!a && navigator.mimeTypes["application/x-shockwave-flash"] && (a = !0)
      }
      return a
    }, K = function (a, b) {
      return this instanceof K ? (this.id = "" + g++, h[this.id] = {
        instance: this,
        elements: [],
        handlers: {}
      }, a && this.clip(a), "undefined" != typeof b && (C("new ZeroClipboard(elements, options)", N.debug), K.config(b)), this.options = K.config(), "boolean" != typeof e.disabled && (e.disabled = !J()), void(e.disabled === !1 && e.outdated !== !0 && null === e.bridge && (e.outdated = !1, e.ready = !1, O()))) : new K(a, b)
    };
  K.prototype.setText = function (a) {
    return a && "" !== a && (f["text/plain"] = a, e.ready === !0 && e.bridge && "function" == typeof e.bridge.setText ? e.bridge.setText(a) : e.ready = !1), this
  }, K.prototype.setSize = function (a, b) {
    return e.ready === !0 && e.bridge && "function" == typeof e.bridge.setSize ? e.bridge.setSize(a, b) : e.ready = !1, this
  };
  var L = function (a) {
    e.ready === !0 && e.bridge && "function" == typeof e.bridge.setHandCursor ? e.bridge.setHandCursor(a) : e.ready = !1
  };
  K.prototype.destroy = function () {
    this.unclip(), this.off(), delete h[this.id]
  };
  var M = function () {
    var a, b, c, d = [],
      e = G(h);
    for (a = 0, b = e.length; b > a; a++) c = h[e[a]].instance, c && c instanceof K && d.push(c);
    return d
  };
  K.version = "1.3.5";
  var N = {
    swfPath: m,
    trustedDomains: a.location.host ? [a.location.host] : [],
    cacheBust: !0,
    forceHandCursor: !1,
    zIndex: 999999999,
    debug: !0,
    title: null,
    autoActivate: !0
  };
  K.config = function (a) {
    if ("object" == typeof a && null !== a && D(N, a), "string" != typeof a || !a) {
      var b = {};
      for (var c in N) N.hasOwnProperty(c) && (b[c] = "object" == typeof N[c] && null !== N[c] ? "length" in N[c] ? N[c].slice(0) : D({}, N[c]) : N[c]);
      return b
    }
    return N.hasOwnProperty(a) ? N[a] : void 0
  }, K.destroy = function () {
    K.deactivate();
    for (var a in h) if (h.hasOwnProperty(a) && h[a]) {
      var b = h[a].instance;
      b && "function" == typeof b.destroy && b.destroy()
    }
    var c = P(e.bridge);
    c && c.parentNode && (c.parentNode.removeChild(c), e.ready = null, e.bridge = null)
  }, K.activate = function (a) {
    d && (t(d, N.hoverClass), t(d, N.activeClass)), d = a, s(a, N.hoverClass), Q();
    var b = N.title || a.getAttribute("title");
    if (b) {
      var c = P(e.bridge);
      c && c.setAttribute("title", b)
    }
    var f = N.forceHandCursor === !0 || "pointer" === o(a, "cursor");
    L(f)
  }, K.deactivate = function () {
    var a = P(e.bridge);
    a && (a.style.left = "0px", a.style.top = "-9999px", a.removeAttribute("title")), d && (t(d, N.hoverClass), t(d, N.activeClass), d = null)
  };
  var O = function () {
    var b, c, d = document.getElementById("global-zeroclipboard-html-bridge");
    if (!d) {
      var f = K.config();
      f.jsModuleId = "string" == typeof k && k || "string" == typeof l && l || null;
      var g = F(a.location.host, N),
        h = x(f),
        i = N.moviePath + w(N.moviePath, N),
        j = '      <object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" id="global-zeroclipboard-flash-bridge" width="100%" height="100%">         <param name="movie" value="' + i + '"/>         <param name="allowScriptAccess" value="' + g + '"/>         <param name="scale" value="exactfit"/>         <param name="loop" value="false"/>         <param name="menu" value="false"/>         <param name="quality" value="best" />         <param name="bgcolor" value="#ffffff"/>         <param name="wmode" value="transparent"/>         <param name="flashvars" value="' + h + '"/>         <embed src="' + i + '"           loop="false" menu="false"           quality="best" bgcolor="#ffffff"           width="100%" height="100%"           name="global-zeroclipboard-flash-bridge"           allowScriptAccess="' + g + '"           allowFullScreen="false"           type="application/x-shockwave-flash"           wmode="transparent"           pluginspage="http://www.macromedia.com/go/getflashplayer"           flashvars="' + h + '"           scale="exactfit">         </embed>       </object>';
      d = document.createElement("div"), d.id = "global-zeroclipboard-html-bridge", d.setAttribute("class", "global-zeroclipboard-container"), d.style.position = "absolute", d.style.left = "0px", d.style.top = "-9999px", d.style.width = "15px", d.style.height = "15px", d.style.zIndex = "" + B(N.zIndex), document.body.appendChild(d), d.innerHTML = j
    }
    b = document["global-zeroclipboard-flash-bridge"], b && (c = b.length) && (b = b[c - 1]), e.bridge = b || d.children[0].lastElementChild
  }, P = function (a) {
    for (var b = /^OBJECT|EMBED$/, c = a && a.parentNode; c && b.test(c.nodeName) && c.parentNode;) c = c.parentNode;
    return c || null
  }, Q = function () {
    if (d) {
      var a = v(d, N.zIndex),
        b = P(e.bridge);
      b && (b.style.top = a.top + "px", b.style.left = a.left + "px", b.style.width = a.width + "px", b.style.height = a.height + "px", b.style.zIndex = a.zIndex + 1), e.ready === !0 && e.bridge && "function" == typeof e.bridge.setSize ? e.bridge.setSize(a.width, a.height) : e.ready = !1
    }
    return this
  };
  K.prototype.on = function (a, b) {
    var c, d, f, g = {}, i = h[this.id] && h[this.id].handlers;
    if ("string" == typeof a && a) f = a.toLowerCase().split(/\s+/);
    else if ("object" == typeof a && a && "undefined" == typeof b) for (c in a) a.hasOwnProperty(c) && "string" == typeof c && c && "function" == typeof a[c] && this.on(c, a[c]);
    if (f && f.length) {
      for (c = 0, d = f.length; d > c; c++) a = f[c].replace(/^on/, ""), g[a] = !0, i[a] || (i[a] = []), i[a].push(b);
      g.noflash && e.disabled && T.call(this, "noflash", {}), g.wrongflash && e.outdated && T.call(this, "wrongflash", {
        flashVersion: e.version
      }), g.load && e.ready && T.call(this, "load", {
        flashVersion: e.version
      })
    }
    return this
  }, K.prototype.off = function (a, b) {
    var c, d, e, f, g, i = h[this.id] && h[this.id].handlers;
    if (0 === arguments.length) f = G(i);
    else if ("string" == typeof a && a) f = a.split(/\s+/);
    else if ("object" == typeof a && a && "undefined" == typeof b) for (c in a) a.hasOwnProperty(c) && "string" == typeof c && c && "function" == typeof a[c] && this.off(c, a[c]);
    if (f && f.length) for (c = 0, d = f.length; d > c; c++) if (a = f[c].toLowerCase().replace(/^on/, ""), g = i[a], g && g.length) if (b) for (e = y(b, g); - 1 !== e;) g.splice(e, 1), e = y(b, g, e);
    else i[a].length = 0;
    return this
  }, K.prototype.handlers = function (a) {
    var b, c = null,
      d = h[this.id] && h[this.id].handlers;
    if (d) {
      if ("string" == typeof a && a) return d[a] ? d[a].slice(0) : null;
      c = {};
      for (b in d) d.hasOwnProperty(b) && d[b] && (c[b] = d[b].slice(0))
    }
    return c
  };
  var R = function (b, c, d, e) {
    var f = h[this.id] && h[this.id].handlers[b];
    if (f && f.length) {
      var g, i, j, k = c || this;
      for (g = 0, i = f.length; i > g; g++) j = f[g], c = k, "string" == typeof j && "function" == typeof a[j] && (j = a[j]), "object" == typeof j && j && "function" == typeof j.handleEvent && (c = j, j = j.handleEvent), "function" == typeof j && A(j, c, d, e)
    }
    return this
  };
  K.prototype.clip = function (a) {
    a = z(a);
    for (var b = 0; b < a.length; b++) if (a.hasOwnProperty(b) && a[b] && 1 === a[b].nodeType) {
      a[b].zcClippingId ? -1 === y(this.id, j[a[b].zcClippingId]) && j[a[b].zcClippingId].push(this.id) : (a[b].zcClippingId = "zcClippingId_" + i++, j[a[b].zcClippingId] = [this.id], N.autoActivate === !0 && q(a[b], "mouseover", p));
      var c = h[this.id].elements; - 1 === y(a[b], c) && c.push(a[b])
    }
    return this
  }, K.prototype.unclip = function (a) {
    var b = h[this.id];
    if (b) {
      var c, d = b.elements;
      a = "undefined" == typeof a ? d.slice(0) : z(a);
      for (var e = a.length; e--;) if (a.hasOwnProperty(e) && a[e] && 1 === a[e].nodeType) {
        for (c = 0; - 1 !== (c = y(a[e], d, c));) d.splice(c, 1);
        var f = j[a[e].zcClippingId];
        if (f) {
          for (c = 0; - 1 !== (c = y(this.id, f, c));) f.splice(c, 1);
          0 === f.length && (N.autoActivate === !0 && r(a[e], "mouseover", p), delete a[e].zcClippingId)
        }
      }
    }
    return this
  }, K.prototype.elements = function () {
    var a = h[this.id];
    return a && a.elements ? a.elements.slice(0) : []
  };
  var S = function (a) {
    var b, c, d, e, f, g = [];
    if (a && 1 === a.nodeType && (b = a.zcClippingId) && j.hasOwnProperty(b) && (c = j[b], c && c.length)) for (d = 0, e = c.length; e > d; d++) f = h[c[d]].instance, f && f instanceof K && g.push(f);
    return g
  };
  N.hoverClass = "zeroclipboard-is-hover", N.activeClass = "zeroclipboard-is-active", N.trustedOrigins = null, N.allowScriptAccess = null, N.useNoCache = !0, N.moviePath = "ZeroClipboard.swf", K.detectFlashSupport = function () {
    return C("ZeroClipboard.detectFlashSupport", N.debug), J()
  }, K.dispatch = function (a, b) {
    if ("string" == typeof a && a) {
      var c = a.toLowerCase().replace(/^on/, "");
      if (c) for (var e = d && N.autoActivate === !0 ? S(d) : M(), f = 0, g = e.length; g > f; f++) T.call(e[f], c, b)
    }
  }, K.prototype.setHandCursor = function (a) {
    return C("ZeroClipboard.prototype.setHandCursor", N.debug), a = "boolean" == typeof a ? a : !! a, L(a), N.forceHandCursor = a, this
  }, K.prototype.reposition = function () {
    return C("ZeroClipboard.prototype.reposition", N.debug), Q()
  }, K.prototype.receiveEvent = function (a, b) {
    if (C("ZeroClipboard.prototype.receiveEvent", N.debug), "string" == typeof a && a) {
      var c = a.toLowerCase().replace(/^on/, "");
      c && T.call(this, c, b)
    }
  }, K.prototype.setCurrent = function (a) {
    return C("ZeroClipboard.prototype.setCurrent", N.debug), K.activate(a), this
  }, K.prototype.resetBridge = function () {
    return C("ZeroClipboard.prototype.resetBridge", N.debug), K.deactivate(), this
  }, K.prototype.setTitle = function (a) {
    if (C("ZeroClipboard.prototype.setTitle", N.debug), a = a || N.title || d && d.getAttribute("title")) {
      var b = P(e.bridge);
      b && b.setAttribute("title", a)
    }
    return this
  }, K.setDefaults = function (a) {
    C("ZeroClipboard.setDefaults", N.debug), K.config(a)
  }, K.prototype.addEventListener = function (a, b) {
    return C("ZeroClipboard.prototype.addEventListener", N.debug), this.on(a, b)
  }, K.prototype.removeEventListener = function (a, b) {
    return C("ZeroClipboard.prototype.removeEventListener", N.debug), this.off(a, b)
  }, K.prototype.ready = function () {
    return C("ZeroClipboard.prototype.ready", N.debug), e.ready === !0
  };
  var T = function (a, g) {
    a = a.toLowerCase().replace(/^on/, "");
    var h = g && g.flashVersion && b(g.flashVersion) || null,
      i = d,
      j = !0;
    switch (a) {
      case "load":
        if (h) {
          if (!c(h)) return void T.call(this, "onWrongFlash", {
            flashVersion: h
          });
          e.outdated = !1, e.ready = !0, e.version = h
        }
        break;
      case "wrongflash":
        h && !c(h) && (e.outdated = !0, e.ready = !1, e.version = h);
        break;
      case "mouseover":
        s(i, N.hoverClass);
        break;
      case "mouseout":
        N.autoActivate === !0 && K.deactivate();
        break;
      case "mousedown":
        s(i, N.activeClass);
        break;
      case "mouseup":
        t(i, N.activeClass);
        break;
      case "datarequested":
        if (i) {
          var k = i.getAttribute("data-clipboard-target"),
            l = k ? document.getElementById(k) : null;
          if (l) {
            var m = l.value || l.textContent || l.innerText;
            m && this.setText(m)
          } else {
            var n = i.getAttribute("data-clipboard-text");
            n && this.setText(n)
          }
        }
        j = !1;
        break;
      case "complete":
        H(f), i && i !== I() && i.focus && i.focus()
    }
    var o = i,
      p = [this, g];
    return R.call(this, a, o, p, j)
  };
  "function" == typeof define && define.amd ? define(["require", "exports", "module"], function (a, b, c) {
    return k = c && c.id || null, K
  }) : "object" == typeof module && module && "object" == typeof module.exports && module.exports && "function" == typeof a.require ? (l = module.id || null, module.exports = K) : a.ZeroClipboard = K
}(function () {
  return this
}()),
/*!
 * JavaScript for Bootstrap's docs (http://getbootstrap.com)
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under the Creative Commons Attribution 3.0 Unported License. For
 * details, see http://creativecommons.org/licenses/by/3.0/.
 */
! function (a) {
  "use strict";
  a(function () {
    var b = a(window),
      c = a(document.body);
    c.scrollspy({
      target: ".bs-docs-sidebar"
    }), b.on("load", function () {
      c.scrollspy("refresh")
    }), a(".bs-docs-container [href=#]").click(function (a) {
      a.preventDefault()
    }), setTimeout(function () {
      var b = a(".bs-docs-sidebar");
      b.affix({
        offset: {
          top: function () {
            var c = b.offset().top,
              d = parseInt(b.children(0).css("margin-top"), 10),
              e = a(".bs-docs-nav").height();
            return this.top = c - e - d
          },
          bottom: function () {
            return this.bottom = a(".bs-docs-footer").outerHeight(!0)
          }
        }
      })
    }, 100), setTimeout(function () {
      a(".bs-top").affix()
    }, 100),

    function () {
      var b = a("#bs-theme-stylesheet"),
        c = a(".bs-docs-theme-toggle"),
        d = function () {
          b.attr("href", b.attr("data-href")), c.text("Disable theme preview"), localStorage.setItem("previewTheme", !0)
        };
      localStorage.getItem("previewTheme") && d(), c.click(function () {
        var a = b.attr("href");
        a && 0 !== a.indexOf("data") ? (b.attr("href", ""), c.text("Preview theme"), localStorage.removeItem("previewTheme")) : d()
      })
    }(), a(".tooltip-demo").tooltip({
      selector: '[data-toggle="tooltip"]',
      container: "body"
    }), a(".popover-demo").popover({
      selector: '[data-toggle="popover"]',
      container: "body"
    }), a(".tooltip-test").tooltip(), a(".popover-test").popover(), a(".bs-docs-popover").popover(), a("#loading-example-btn").click(function () {
      var b = a(this);
      b.button("loading"), setTimeout(function () {
        b.button("reset")
      }, 3e3)
    }), ZeroClipboard.config({
      moviePath: "/assets/flash/ZeroClipboard.swf",
      hoverClass: "btn-clipboard-hover"
    }), a(".highlight").each(function () {
      var b = a(this),
        c = b.prev(),
        d = '<div class="zero-clipboard"><span class="btn-clipboard">Copy</span></div>';
      c.hasClass("bs-example") ? c.before(d.replace(/btn-clipboard/, "btn-clipboard with-example")) : b.before(d)
    });
    var d = new ZeroClipboard(a(".btn-clipboard")),
      e = a("#global-zeroclipboard-html-bridge");
    d.on("load", function () {
      e.data("placement", "top").attr("title", "Copy to clipboard").tooltip()
    }), d.on("dataRequested", function (b) {
      var c = a(this).parent().nextAll(".highlight").first();
      b.setText(c.text())
    }), d.on("complete", function () {
      e.attr("title", "Copied!").tooltip("fixTitle").tooltip("show").attr("title", "Copy to clipboard").tooltip("fixTitle")
    }), d.on("noflash wrongflash", function () {
      e.attr("title", "Flash required").tooltip("fixTitle").tooltip("show")
    })
  })
}(jQuery);
