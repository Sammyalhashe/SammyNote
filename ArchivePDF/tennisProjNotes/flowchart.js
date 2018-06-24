// flowchart.js, v1.11.2
// Copyright (c)2018 Adriano Raiano (adrai).
// Distributed under MIT license
// http://adrai.github.io/flowchart.js

! function (t, i) {
  if ("object" == typeof exports && "object" == typeof module) module.exports = i(require("Raphael"));
  else if ("function" == typeof define && define.amd) define(["Raphael"], i);
  else {
    var e = i("object" == typeof exports ? require("Raphael") : t.Raphael);
    for (var r in e)("object" == typeof exports ? exports : t)[r] = e[r]
  }
}(this, function (t) {
  return function (t) {
    function i(r) {
      if (e[r]) return e[r].exports;
      var s = e[r] = {
        exports: {},
        id: r,
        loaded: !1
      };
      return t[r].call(s.exports, s, s.exports, i), s.loaded = !0, s.exports
    }
    var e = {};
    return i.m = t, i.c = e, i.p = "", i(0)
  }([function (t, i, e) {
    e(9);
    var r = e(4);
    e(15);
    var s = {
      parse: r
    };
    "undefined" != typeof window && (window.flowchart = s), t.exports = s
  }, function (t, i) {
    function e(t, i) {
      if (!t || "function" == typeof t) return i;
      var r = {};
      for (var s in i) r[s] = i[s];
      for (s in t) t[s] && ("object" == typeof r[s] ? r[s] = e(r[s], t[s]) : r[s] = t[s]);
      return r
    }

    function r(t, i) {
      if ("function" == typeof Object.create) t.super_ = i, t.prototype = Object.create(i.prototype, {
        constructor: {
          value: t,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      });
      else {
        t.super_ = i;
        var e = function () {};
        e.prototype = i.prototype, t.prototype = new e, t.prototype.constructor = t
      }
    }
    t.exports = {
      defaults: e,
      inherits: r
    }
  }, function (t, i, e) {
    function r(t, i, e) {
      this.chart = t, this.group = this.chart.paper.set(), this.symbol = e, this.connectedTo = [], this.symbolType = i.symbolType, this.flowstate = i.flowstate || "future", this.lineStyle = i.lineStyle || {}, this.key = i.key || "", this.next_direction = i.next && i.direction_next ? i.direction_next : void 0, this.text = this.chart.paper.text(0, 0, i.text), i.key && (this.text.node.id = i.key + "t"), this.text.node.setAttribute("class", this.getAttr("class") + "t"), this.text.attr({
        "text-anchor": "start",
        x: this.getAttr("text-margin"),
        fill: this.getAttr("font-color"),
        "font-size": this.getAttr("font-size")
      });
      var r = this.getAttr("font"),
        s = this.getAttr("font-family"),
        o = this.getAttr("font-weight");
      r && this.text.attr({
        font: r
      }), s && this.text.attr({
        "font-family": s
      }), o && this.text.attr({
        "font-weight": o
      }), i.link && this.text.attr("href", i.link), i.target && this.text.attr("target", i.target);
      var h = this.getAttr("maxWidth");
      if (h) {
        for (var n = i.text.split(" "), a = "", l = 0, p = n.length; l < p; l++) {
          var x = n[l];
          this.text.attr("text", a + " " + x), a += this.text.getBBox().width > h ? "\n" + x : " " + x
        }
        this.text.attr("text", a.substring(1))
      }
      if (this.group.push(this.text), e) {
        var y = this.getAttr("text-margin");
        e.attr({
          fill: this.getAttr("fill"),
          stroke: this.getAttr("element-color"),
          "stroke-width": this.getAttr("line-width"),
          width: this.text.getBBox().width + 2 * y,
          height: this.text.getBBox().height + 2 * y
        }), e.node.setAttribute("class", this.getAttr("class")), i.link && e.attr("href", i.link), i.target && e.attr("target", i.target), i.key && (e.node.id = i.key), this.group.push(e), e.insertBefore(this.text), this.text.attr({
          y: e.getBBox().height / 2
        }), this.initialize()
      }
    }
    var s = e(3),
      o = s.drawLine,
      h = s.checkLineIntersection;
    r.prototype.getAttr = function (t) {
      if (this.chart) {
        var i, e = this.chart.options ? this.chart.options[t] : void 0,
          r = this.chart.options.symbols ? this.chart.options.symbols[this.symbolType][t] : void 0;
        return this.chart.options.flowstate && this.chart.options.flowstate[this.flowstate] && (i = this.chart.options.flowstate[this.flowstate][t]), i || r || e
      }
    }, r.prototype.initialize = function () {
      this.group.transform("t" + this.getAttr("line-width") + "," + this.getAttr("line-width")), this.width = this.group.getBBox().width, this.height = this.group.getBBox().height
    }, r.prototype.getCenter = function () {
      return {
        x: this.getX() + this.width / 2,
        y: this.getY() + this.height / 2
      }
    }, r.prototype.getX = function () {
      return this.group.getBBox().x
    }, r.prototype.getY = function () {
      return this.group.getBBox().y
    }, r.prototype.shiftX = function (t) {
      this.group.transform("t" + (this.getX() + t) + "," + this.getY())
    }, r.prototype.setX = function (t) {
      this.group.transform("t" + t + "," + this.getY())
    }, r.prototype.shiftY = function (t) {
      this.group.transform("t" + this.getX() + "," + (this.getY() + t))
    }, r.prototype.setY = function (t) {
      this.group.transform("t" + this.getX() + "," + t)
    }, r.prototype.getTop = function () {
      var t = this.getY(),
        i = this.getX() + this.width / 2;
      return {
        x: i,
        y: t
      }
    }, r.prototype.getBottom = function () {
      var t = this.getY() + this.height,
        i = this.getX() + this.width / 2;
      return {
        x: i,
        y: t
      }
    }, r.prototype.getLeft = function () {
      var t = this.getY() + this.group.getBBox().height / 2,
        i = this.getX();
      return {
        x: i,
        y: t
      }
    }, r.prototype.getRight = function () {
      var t = this.getY() + this.group.getBBox().height / 2,
        i = this.getX() + this.group.getBBox().width;
      return {
        x: i,
        y: t
      }
    }, r.prototype.render = function () {
      if (this.next) {
        var t = this,
          i = this.getAttr("line-length");
        if ("right" === this.next_direction) {
          var e = this.getRight();
          this.next.isPositioned || (this.next.setY(e.y - this.next.height / 2), this.next.shiftX(this.group.getBBox().x + this.width + i), function e() {
            for (var r, s = !1, o = 0, h = t.chart.symbols.length; o < h; o++) {
              r = t.chart.symbols[o];
              var n = Math.abs(r.getCenter().x - t.next.getCenter().x);
              if (r.getCenter().y > t.next.getCenter().y && n <= t.next.width / 2) {
                s = !0;
                break
              }
            }
            s && (t.next.setX(r.getX() + r.width + i), e())
          }(), this.next.isPositioned = !0, this.next.render())
        } else if ("left" === this.next_direction) {
          var r = this.getLeft();
          this.next.isPositioned || (this.next.setY(r.y - this.next.height / 2), this.next.shiftX(-(this.group.getBBox().x + this.width + i)), function e() {
            for (var r, s = !1, o = 0, h = t.chart.symbols.length; o < h; o++) {
              r = t.chart.symbols[o];
              var n = Math.abs(r.getCenter().x - t.next.getCenter().x);
              if (r.getCenter().y > t.next.getCenter().y && n <= t.next.width / 2) {
                s = !0;
                break
              }
            }
            s && (t.next.setX(r.getX() + r.width + i), e())
          }(), this.next.isPositioned = !0, this.next.render())
        } else {
          var s = this.getBottom();
          this.next.isPositioned || (this.next.shiftY(this.getY() + this.height + i), this.next.setX(s.x - this.next.width / 2), this.next.isPositioned = !0, this.next.render())
        }
      }
    }, r.prototype.renderLines = function () {
      this.next && (this.next_direction ? this.drawLineTo(this.next, this.getAttr("arrow-text") || "", this.next_direction) : this.drawLineTo(this.next, this.getAttr("arrow-text") || ""))
    }, r.prototype.drawLineTo = function (t, i, e) {
      this.connectedTo.indexOf(t) < 0 && this.connectedTo.push(t);
      var r, s = this.getCenter().x,
        n = this.getCenter().y,
        a = this.getRight(),
        l = this.getBottom(),
        p = this.getTop(),
        x = this.getLeft(),
        y = t.getCenter().x,
        g = t.getCenter().y,
        c = t.getTop(),
        f = t.getRight(),
        d = t.getLeft(),
        m = s === y,
        u = n === g,
        b = n < g,
        _ = n > g || this === t,
        v = s > y,
        w = s < y,
        k = 0,
        B = this.getAttr("line-length"),
        A = this.getAttr("line-width");
      if (e && "bottom" !== e || !m || !b)
        if (e && "right" !== e || !u || !w)
          if (e && "left" !== e || !u || !v)
            if (e && "right" !== e || !m || !_)
              if (e && "right" !== e || !m || !b)
                if (e && "bottom" !== e || !v)
                  if (e && "bottom" !== e || !w || !b)
                    if (e && "bottom" !== e || !w)
                      if (e && "right" === e && v) r = o(this.chart, a, [{
                        x: a.x + B / 2,
                        y: a.y
                      }, {
                        x: a.x + B / 2,
                        y: c.y - B / 2
                      }, {
                        x: c.x,
                        y: c.y - B / 2
                      }, {
                        x: c.x,
                        y: c.y
                      }], i), this.rightStart = !0, t.topEnd = !0, k = a.x + B / 2;
                      else if (e && "right" === e && w) r = o(this.chart, a, [{
        x: c.x,
        y: a.y
      }, {
        x: c.x,
        y: c.y
      }], i), this.rightStart = !0, t.topEnd = !0, k = a.x + B / 2;
      else if (e && "bottom" === e && m && _) r = o(this.chart, l, [{
        x: l.x,
        y: l.y + B / 2
      }, {
        x: a.x + B / 2,
        y: l.y + B / 2
      }, {
        x: a.x + B / 2,
        y: c.y - B / 2
      }, {
        x: c.x,
        y: c.y - B / 2
      }, {
        x: c.x,
        y: c.y
      }], i), this.bottomStart = !0, t.topEnd = !0, k = l.x + B / 2;
      else if ("left" === e && m && _) {
        var X = x.x - B / 2;
        d.x < x.x && (X = d.x - B / 2), r = o(this.chart, x, [{
          x: X,
          y: x.y
        }, {
          x: X,
          y: c.y - B / 2
        }, {
          x: c.x,
          y: c.y - B / 2
        }, {
          x: c.x,
          y: c.y
        }], i), this.leftStart = !0, t.topEnd = !0, k = x.x
      } else "left" === e ? (r = o(this.chart, x, [{
        x: c.x + (x.x - c.x) / 2,
        y: x.y
      }, {
        x: c.x + (x.x - c.x) / 2,
        y: c.y - B / 2
      }, {
        x: c.x,
        y: c.y - B / 2
      }, {
        x: c.x,
        y: c.y
      }], i), this.leftStart = !0, t.topEnd = !0, k = x.x) : "top" === e && (r = o(this.chart, p, [{
        x: p.x,
        y: c.y - B / 2
      }, {
        x: c.x,
        y: c.y - B / 2
      }, {
        x: c.x,
        y: c.y
      }], i), this.topStart = !0, t.topEnd = !0, k = p.x);
      else r = o(this.chart, l, [{
        x: l.x,
        y: l.y + B / 2
      }, {
        x: l.x + (l.x - c.x) / 2,
        y: l.y + B / 2
      }, {
        x: l.x + (l.x - c.x) / 2,
        y: c.y - B / 2
      }, {
        x: c.x,
        y: c.y - B / 2
      }, {
        x: c.x,
        y: c.y
      }], i), this.bottomStart = !0, t.topEnd = !0, k = l.x + (l.x - c.x) / 2;
      else r = o(this.chart, l, [{
        x: l.x,
        y: c.y - B / 2
      }, {
        x: c.x,
        y: c.y - B / 2
      }, {
        x: c.x,
        y: c.y
      }], i), this.bottomStart = !0, t.topEnd = !0, k = l.x, c.x > k && (k = c.x);
      else r = this.leftEnd && _ ? o(this.chart, l, [{
        x: l.x,
        y: l.y + B / 2
      }, {
        x: l.x + (l.x - c.x) / 2,
        y: l.y + B / 2
      }, {
        x: l.x + (l.x - c.x) / 2,
        y: c.y - B / 2
      }, {
        x: c.x,
        y: c.y - B / 2
      }, {
        x: c.x,
        y: c.y
      }], i) : o(this.chart, l, [{
        x: l.x,
        y: c.y - B / 2
      }, {
        x: c.x,
        y: c.y - B / 2
      }, {
        x: c.x,
        y: c.y
      }], i), this.bottomStart = !0, t.topEnd = !0, k = l.x + (l.x - c.x) / 2;
      else r = o(this.chart, a, [{
        x: a.x + B / 2,
        y: a.y
      }, {
        x: a.x + B / 2,
        y: c.y - B / 2
      }, {
        x: c.x,
        y: c.y - B / 2
      }, {
        x: c.x,
        y: c.y
      }], i), this.rightStart = !0, t.topEnd = !0, k = a.x + B / 2;
      else r = o(this.chart, a, [{
        x: a.x + B / 2,
        y: a.y
      }, {
        x: a.x + B / 2,
        y: c.y - B / 2
      }, {
        x: c.x,
        y: c.y - B / 2
      }, {
        x: c.x,
        y: c.y
      }], i), this.rightStart = !0, t.topEnd = !0, k = a.x + B / 2;
      else r = o(this.chart, x, f, i), this.leftStart = !0, t.rightEnd = !0, k = f.x;
      else r = o(this.chart, a, d, i), this.rightStart = !0, t.leftEnd = !0, k = d.x;
      else r = o(this.chart, l, c, i), this.bottomStart = !0, t.topEnd = !0, k = l.x;
      if (this.lineStyle[t.key] && r && r.attr(this.lineStyle[t.key]), r) {
        for (var O = 0, L = this.chart.lines.length; O < L; O++)
          for (var M, S = this.chart.lines[O], C = S.attr("path"), T = r.attr("path"), Y = 0, P = C.length - 1; Y < P; Y++) {
            var E = [];
            E.push(["M", C[Y][1], C[Y][2]]), E.push(["L", C[Y + 1][1], C[Y + 1][2]]);
            for (var j = E[0][1], z = E[0][2], R = E[1][1], F = E[1][2], I = 0, N = T.length - 1; I < N; I++) {
              var W = [];
              W.push(["M", T[I][1], T[I][2]]), W.push(["L", T[I + 1][1], T[I + 1][2]]);
              var V = W[0][1],
                q = W[0][2],
                G = W[1][1],
                Q = W[1][2],
                J = h(j, z, R, F, V, q, G, Q);
              if (J.onLine1 && J.onLine2) {
                var $;
                q === Q ? V > G ? ($ = ["L", J.x + 2 * A, q], T.splice(I + 1, 0, $), $ = ["C", J.x + 2 * A, q, J.x, q - 4 * A, J.x - 2 * A, q], T.splice(I + 2, 0, $), r.attr("path", T)) : ($ = ["L", J.x - 2 * A, q], T.splice(I + 1, 0, $), $ = ["C", J.x - 2 * A, q, J.x, q - 4 * A, J.x + 2 * A, q], T.splice(I + 2, 0, $), r.attr("path", T)) : q > Q ? ($ = ["L", V, J.y + 2 * A], T.splice(I + 1, 0, $), $ = ["C", V, J.y + 2 * A, V + 4 * A, J.y, V, J.y - 2 * A], T.splice(I + 2, 0, $), r.attr("path", T)) : ($ = ["L", V, J.y - 2 * A], T.splice(I + 1, 0, $), $ = ["C", V, J.y - 2 * A, V + 4 * A, J.y, V, J.y + 2 * A], T.splice(I + 2, 0, $), r.attr("path", T)), I += 2, M += 2
              }
            }
          }
        this.chart.lines.push(r), (void 0 === this.chart.minXFromSymbols || this.chart.minXFromSymbols > x.x) && (this.chart.minXFromSymbols = x.x)
      }(!this.chart.maxXFromLine || this.chart.maxXFromLine && k > this.chart.maxXFromLine) && (this.chart.maxXFromLine = k)
    }, t.exports = r
  }, function (t, i) {
    function e(t, i, e) {
      var r, s, o = "M{0},{1}";
      for (r = 2, s = 2 * e.length + 2; r < s; r += 2) o += " L{" + r + "},{" + (r + 1) + "}";
      var h = [i.x, i.y];
      for (r = 0, s = e.length; r < s; r++) h.push(e[r].x), h.push(e[r].y);
      var n = t.paper.path(o, h);
      n.attr("stroke", t.options["element-color"]), n.attr("stroke-width", t.options["line-width"]);
      var a = t.options.font,
        l = t.options["font-family"],
        p = t.options["font-weight"];
      return a && n.attr({
        font: a
      }), l && n.attr({
        "font-family": l
      }), p && n.attr({
        "font-weight": p
      }), n
    }

    function r(t, i, e, r) {
      var s, o;
      "[object Array]" !== Object.prototype.toString.call(e) && (e = [e]);
      var h = "M{0},{1}";
      for (s = 2, o = 2 * e.length + 2; s < o; s += 2) h += " L{" + s + "},{" + (s + 1) + "}";
      var n = [i.x, i.y];
      for (s = 0, o = e.length; s < o; s++) n.push(e[s].x), n.push(e[s].y);
      var a = t.paper.path(h, n);
      a.attr({
        stroke: t.options["line-color"],
        "stroke-width": t.options["line-width"],
        "arrow-end": t.options["arrow-end"]
      });
      var l = t.options.font,
        p = t.options["font-family"],
        x = t.options["font-weight"];
      if (l && a.attr({
          font: l
        }), p && a.attr({
          "font-family": p
        }), x && a.attr({
          "font-weight": x
        }), r) {
        var y = !1,
          g = t.paper.text(0, 0, r),
          c = !1,
          f = e[0];
        i.y === f.y && (c = !0);
        var d = 0,
          m = 0;
        y ? (d = i.x > f.x ? i.x - (i.x - f.x) / 2 : f.x - (f.x - i.x) / 2, m = i.y > f.y ? i.y - (i.y - f.y) / 2 : f.y - (f.y - i.y) / 2, c ? (d -= g.getBBox().width / 2, m -= t.options["text-margin"]) : (d += t.options["text-margin"], m -= g.getBBox().height / 2)) : (d = i.x, m = i.y, c ? (d += t.options["text-margin"] / 2, m -= t.options["text-margin"]) : (d += t.options["text-margin"] / 2, m += t.options["text-margin"], i.y > f.y && (m -= 2 * t.options["text-margin"]))), g.attr({
          "text-anchor": "start",
          "font-size": t.options["font-size"],
          fill: t.options["font-color"],
          x: d,
          y: m
        }), l && g.attr({
          font: l
        }), p && g.attr({
          "font-family": p
        }), x && g.attr({
          "font-weight": x
        })
      }
      return a
    }

    function s(t, i, e, r, s, o, h, n) {
      var a, l, p, x, y, g = {
        x: null,
        y: null,
        onLine1: !1,
        onLine2: !1
      };
      return a = (n - o) * (e - t) - (h - s) * (r - i), 0 === a ? g : (l = i - o, p = t - s, x = (h - s) * l - (n - o) * p, y = (e - t) * l - (r - i) * p, l = x / a, p = y / a, g.x = t + l * (e - t), g.y = i + l * (r - i), l > 0 && l < 1 && (g.onLine1 = !0), p > 0 && p < 1 && (g.onLine2 = !0), g)
    }
    t.exports = {
      drawPath: e,
      drawLine: r,
      checkLineIntersection: s
    }
  }, function (t, i, e) {
    function r(t) {
      function i(t) {
        var i = t.indexOf("(") + 1,
          e = t.indexOf(")");
        return i >= 0 && e >= 0 ? t.substring(i, e) : "{}"
      }

      function e(t) {
        var i = t.indexOf("(") + 1,
          e = t.indexOf(")");
        return i >= 0 && e >= 0 ? t.substring(i, e) : ""
      }

      function r(t) {
        var i = t.indexOf("(") + 1,
          e = t.indexOf(")");
        return i >= 0 && e >= 0 ? g.symbols[t.substring(0, i - 1)] : g.symbols[t]
      }

      function y(t) {
        var i = "next",
          e = t.indexOf("(") + 1,
          r = t.indexOf(")");
        return e >= 0 && r >= 0 && (i = E.substring(e, r), i.indexOf(",") < 0 && "yes" !== i && "no" !== i && (i = "next, " + i)), i
      }
      t = t || "", t = t.trim();
      for (var g = {
          symbols: {},
          start: null,
          drawSVG: function (t, i) {
            function e(t) {
              if (g[t.key]) return g[t.key];
              switch (t.symbolType) {
                case "start":
                  g[t.key] = new o(y, t);
                  break;
                case "end":
                  g[t.key] = new h(y, t);
                  break;
                case "operation":
                  g[t.key] = new n(y, t);
                  break;
                case "inputoutput":
                  g[t.key] = new a(y, t);
                  break;
                case "subroutine":
                  g[t.key] = new l(y, t);
                  break;
                case "condition":
                  g[t.key] = new p(y, t);
                  break;
                case "parallel":
                  g[t.key] = new x(y, t);
                  break;
                default:
                  return new Error("Wrong symbol type!")
              }
              return g[t.key]
            }
            var r = this;
            this.diagram && this.diagram.clean();
            var y = new s(t, i);
            this.diagram = y;
            var g = {};
            ! function t(i, s, o) {
              var h = e(i);
              return r.start === i ? y.startWith(h) : s && o && !s.pathOk && (s instanceof p ? (o.yes === i && s.yes(h), o.no === i && s.no(h)) : s instanceof x ? (o.path1 === i && s.path1(h), o.path2 === i && s.path2(h), o.path3 === i && s.path3(h)) : s.then(h)), h.pathOk ? h : (h instanceof p ? (i.yes && t(i.yes, h, i), i.no && t(i.no, h, i)) : h instanceof x ? (i.path1 && t(i.path1, h, i), i.path2 && t(i.path2, h, i), i.path3 && t(i.path3, h, i)) : i.next && t(i.next, h, i), h)
            }(this.start), y.render()
          },
          clean: function () {
            this.diagram.clean()
          }
        }, c = [], f = 0, d = 1, m = t.length; d < m; d++)
        if ("\n" === t[d] && "\\" !== t[d - 1]) {
          var u = t.substring(f, d);
          f = d + 1, c.push(u.replace(/\\\n/g, "\n"))
        }
      f < t.length && c.push(t.substr(f));
      for (var b = 1, _ = c.length; b < _;) {
        var v = c[b];
        v.indexOf("->") < 0 && v.indexOf("=>") < 0 && v.indexOf("@>") < 0 ? (c[b - 1] += "\n" + v, c.splice(b, 1), _--) : b++
      }
      for (; c.length > 0;) {
        var w = c.splice(0, 1)[0].trim();
        if (w.indexOf("=>") >= 0) {
          var k = w.split("=>"),
            B = {
              key: k[0].replace(/\(.*\)/, ""),
              symbolType: k[1],
              text: null,
              link: null,
              target: null,
              flowstate: null,
              lineStyle: {},
              params: {}
            },
            A = k[0].match(/\((.*)\)/);
          if (A && A.length > 1)
            for (var X = A[1].split(","), O = 0; O < X.length; O++) {
              var L = X[0].split("=");
              2 == L.length && (B.params[L[0]] = L[1])
            }
          var M;
          if (B.symbolType.indexOf(": ") >= 0 && (M = B.symbolType.split(": "), B.symbolType = M.shift(), B.text = M.join(": ")), B.text && B.text.indexOf(":>") >= 0 ? (M = B.text.split(":>"), B.text = M.shift(), B.link = M.join(":>")) : B.symbolType.indexOf(":>") >= 0 && (M = B.symbolType.split(":>"), B.symbolType = M.shift(), B.link = M.join(":>")), B.symbolType.indexOf("\n") >= 0 && (B.symbolType = B.symbolType.split("\n")[0]), B.link) {
            var S = B.link.indexOf("[") + 1,
              C = B.link.indexOf("]");
            S >= 0 && C >= 0 && (B.target = B.link.substring(S, C), B.link = B.link.substring(0, S - 1))
          }
          if (B.text && B.text.indexOf("|") >= 0) {
            var T = B.text.split("|");
            B.flowstate = T.pop().trim(), B.text = T.join("|")
          }
          g.symbols[B.key] = B
        } else if (w.indexOf("->") >= 0)
          for (var Y = w.split("->"), O = 0, P = Y.length; O < P; O++) {
            var E = Y[O],
              j = e(E);
            "true" !== j && "false" !== j || (E = E.replace("true", "yes"), E = E.replace("false", "no"));
            var z = r(E),
              R = y(E),
              F = null;
            if (R.indexOf(",") >= 0) {
              var I = R.split(",");
              R = I[0], F = I[1].trim()
            }
            if (g.start || (g.start = z), O + 1 < P) {
              var N = Y[O + 1];
              z[R] = r(N), z["direction_" + R] = F, F = null
            }
          } else if (w.indexOf("@>") >= 0)
            for (var W = w.split("@>"), O = 0, P = W.length; O < P; O++)
              if (O + 1 != P) {
                var V = r(W[O]),
                  N = r(W[O + 1]);
                V.lineStyle[N.key] = JSON.parse(i(W[O + 1]))
              }
      }
      return g
    }
    var s = e(7),
      o = e(13),
      h = e(10),
      n = e(12),
      a = e(11),
      l = e(14),
      p = e(5),
      x = e(6);
    t.exports = r
  }, function (t, i, e) {
    function r(t, i) {
      i = i || {}, s.call(this, t, i), this.textMargin = this.getAttr("text-margin"), this.yes_direction = "bottom", this.no_direction = "right", this.params = i.params, i.yes && i.direction_yes && i.no && !i.direction_no ? "right" === i.direction_yes ? (this.no_direction = "bottom", this.yes_direction = "right") : "top" === i.direction_yes ? (this.no_direction = "right", this.yes_direction = "top") : (this.no_direction = "right", this.yes_direction = "bottom") : i.yes && !i.direction_yes && i.no && i.direction_no ? "right" === i.direction_no ? (this.yes_direction = "bottom", this.no_direction = "right") : (this.yes_direction = "right", this.no_direction = "bottom") : i.yes && i.direction_yes && i.no && i.direction_no && i.direction_no !== i.direction_yes ? "right" === i.direction_yes ? (this.no_direction = "bottom", this.yes_direction = "right") : "top" === i.direction_yes ? (this.no_direction = "right", this.yes_direction = "top") : (this.no_direction = "right", this.yes_direction = "bottom") : (this.yes_direction = "bottom", this.no_direction = "right"), this.yes_direction = this.yes_direction || "bottom", this.no_direction = this.no_direction || "right", this.text.attr({
        x: 2 * this.textMargin
      });
      var e = this.text.getBBox().width + 3 * this.textMargin;
      e += e / 2;
      var r = this.text.getBBox().height + 2 * this.textMargin;
      r += r / 2, r = Math.max(.5 * e, r);
      var o = e / 4,
        h = r / 4;
      this.text.attr({
        x: o + this.textMargin / 2
      });
      var a = {
          x: o,
          y: h
        },
        l = [{
          x: o - e / 4,
          y: h + r / 4
        }, {
          x: o - e / 4 + e / 2,
          y: h + r / 4 + r / 2
        }, {
          x: o - e / 4 + e,
          y: h + r / 4
        }, {
          x: o - e / 4 + e / 2,
          y: h + r / 4 - r / 2
        }, {
          x: o - e / 4,
          y: h + r / 4
        }],
        p = n(t, a, l);
      p.attr({
        stroke: this.getAttr("element-color"),
        "stroke-width": this.getAttr("line-width"),
        fill: this.getAttr("fill")
      }), i.link && p.attr("href", i.link), i.target && p.attr("target", i.target), i.key && (p.node.id = i.key), p.node.setAttribute("class", this.getAttr("class")), this.text.attr({
        y: p.getBBox().height / 2
      }), this.group.push(p), p.insertBefore(this.text), this.initialize()
    }
    var s = e(2),
      o = e(1).inherits,
      h = e(3),
      n = h.drawPath;
    o(r, s), r.prototype.render = function () {
      this.yes_direction && (this[this.yes_direction + "_symbol"] = this.yes_symbol), this.no_direction && (this[this.no_direction + "_symbol"] = this.no_symbol);
      var t = this.getAttr("line-length");
      if (this.bottom_symbol) {
        var i = this.getBottom();
        this.bottom_symbol.isPositioned || (this.bottom_symbol.shiftY(this.getY() + this.height + t), this.bottom_symbol.setX(i.x - this.bottom_symbol.width / 2), this.bottom_symbol.isPositioned = !0, this.bottom_symbol.render())
      }
      if (this.right_symbol) {
        var e = this.getRight();
        if (!this.right_symbol.isPositioned) {
          this.right_symbol.setY(e.y - this.right_symbol.height / 2), this.right_symbol.shiftX(this.group.getBBox().x + this.width + t);
          var r = this;
          ! function i() {
            for (var e, s = !1, o = 0, h = r.chart.symbols.length; o < h; o++)
              if (e = r.chart.symbols[o], !r.params["align-next"] || "no" !== r.params["align-next"]) {
                var n = Math.abs(e.getCenter().x - r.right_symbol.getCenter().x);
                if (e.getCenter().y > r.right_symbol.getCenter().y && n <= r.right_symbol.width / 2) {
                  s = !0;
                  break
                }
              }
            s && (r.right_symbol.setX(e.getX() + e.width + t), i())
          }(), this.right_symbol.isPositioned = !0, this.right_symbol.render()
        }
      }
    }, r.prototype.renderLines = function () {
      this.yes_symbol && this.drawLineTo(this.yes_symbol, this.getAttr("yes-text"), this.yes_direction), this.no_symbol && this.drawLineTo(this.no_symbol, this.getAttr("no-text"), this.no_direction)
    }, t.exports = r
  }, function (t, i, e) {
    function r(t, i) {
      var e = t.paper.rect(0, 0, 0, 0);
      i = i || {}, s.call(this, t, i, e), this.textMargin = this.getAttr("text-margin"), this.path1_direction = "bottom", this.path2_direction = "right", this.path3_direction = "top", this.params = i.params, "path1" === i.direction_next && !i[i.direction_next] && i.next && (i[i.direction_next] = i.next), "path2" === i.direction_next && !i[i.direction_next] && i.next && (i[i.direction_next] = i.next), "path3" === i.direction_next && !i[i.direction_next] && i.next && (i[i.direction_next] = i.next), i.path1 && i.direction_path1 && i.path2 && !i.direction_path2 && i.path3 && !i.direction_path3 ? "right" === i.direction_path1 ? (this.path2_direction = "bottom", this.path1_direction = "right", this.path3_direction = "top") : "top" === i.direction_path1 ? (this.path2_direction = "right", this.path1_direction = "top", this.path3_direction = "bottom") : "left" === i.direction_path1 ? (this.path2_direction = "right", this.path1_direction = "left", this.path3_direction = "bottom") : (this.path2_direction = "right", this.path1_direction = "bottom", this.path3_direction = "top") : i.path1 && !i.direction_path1 && i.path2 && i.direction_path2 && i.path3 && !i.direction_path3 ? "right" === i.direction_path2 ? (this.path1_direction = "bottom", this.path2_direction = "right", this.path3_direction = "top") : "left" === i.direction_path2 ? (this.path1_direction = "bottom", this.path2_direction = "left", this.path3_direction = "right") : (this.path1_direction = "right", this.path2_direction = "bottom", this.path3_direction = "top") : i.path1 && !i.direction_path1 && i.path2 && !i.direction_path2 && i.path3 && i.direction_path3 ? "right" === i.direction_path2 ? (this.path1_direction = "bottom", this.path2_direction = "top", this.path3_direction = "right") : "left" === i.direction_path2 ? (this.path1_direction = "bottom", this.path2_direction = "right", this.path3_direction = "left") : (this.path1_direction = "right", this.path2_direction = "bottom", this.path3_direction = "top") : (this.path1_direction = i.direction_path1, this.path2_direction = i.direction_path2, this.path3_direction = i.direction_path3), this.path1_direction = this.path1_direction || "bottom", this.path2_direction = this.path2_direction || "right", this.path3_direction = this.path3_direction || "top", this.initialize()
    }
    var s = e(2),
      o = e(1).inherits;
    o(r, s), r.prototype.render = function () {
      this.path1_direction && (this[this.path1_direction + "_symbol"] = this.path1_symbol), this.path2_direction && (this[this.path2_direction + "_symbol"] = this.path2_symbol), this.path3_direction && (this[this.path3_direction + "_symbol"] = this.path3_symbol);
      var t = this.getAttr("line-length");
      if (this.bottom_symbol) {
        var i = this.getBottom();
        this.bottom_symbol.isPositioned || (this.bottom_symbol.shiftY(this.getY() + this.height + t), this.bottom_symbol.setX(i.x - this.bottom_symbol.width / 2), this.bottom_symbol.isPositioned = !0, this.bottom_symbol.render())
      }
      if (this.top_symbol) {
        var e = this.getTop();
        this.top_symbol.isPositioned || (this.top_symbol.shiftY(this.getY() - this.top_symbol.height - t), this.top_symbol.setX(e.x + this.top_symbol.width), this.top_symbol.isPositioned = !0, this.top_symbol.render())
      }
      var r = this;
      if (this.left_symbol) {
        var s = this.getLeft();
        this.left_symbol.isPositioned || (this.left_symbol.setY(s.y - this.left_symbol.height / 2), this.left_symbol.shiftX(-(this.group.getBBox().x + this.width + t)), function i() {
          for (var e, s = !1, o = 0, h = r.chart.symbols.length; o < h; o++)
            if (e = r.chart.symbols[o], !r.params["align-next"] || "no" !== r.params["align-next"]) {
              var n = Math.abs(e.getCenter().x - r.left_symbol.getCenter().x);
              if (e.getCenter().y > r.left_symbol.getCenter().y && n <= r.left_symbol.width / 2) {
                s = !0;
                break
              }
            }
          s && (r.left_symbol.setX(e.getX() + e.width + t), i())
        }(), this.left_symbol.isPositioned = !0, this.left_symbol.render())
      }
      if (this.right_symbol) {
        var o = this.getRight();
        this.right_symbol.isPositioned || (this.right_symbol.setY(o.y - this.right_symbol.height / 2), this.right_symbol.shiftX(this.group.getBBox().x + this.width + t), function i() {
          for (var e, s = !1, o = 0, h = r.chart.symbols.length; o < h; o++)
            if (e = r.chart.symbols[o], !r.params["align-next"] || "no" !== r.params["align-next"]) {
              var n = Math.abs(e.getCenter().x - r.right_symbol.getCenter().x);
              if (e.getCenter().y > r.right_symbol.getCenter().y && n <= r.right_symbol.width / 2) {
                s = !0;
                break
              }
            }
          s && (r.right_symbol.setX(e.getX() + e.width + t), i())
        }(), this.right_symbol.isPositioned = !0, this.right_symbol.render())
      }
    }, r.prototype.renderLines = function () {
      this.path1_symbol && this.drawLineTo(this.path1_symbol, "", this.path1_direction), this.path2_symbol && this.drawLineTo(this.path2_symbol, "", this.path2_direction), this.path3_symbol && this.drawLineTo(this.path3_symbol, "", this.path3_direction)
    }, t.exports = r
  }, function (t, i, e) {
    function r(t, i) {
      i = i || {}, this.paper = new s(t), this.options = o(i, h), this.symbols = [], this.lines = [], this.start = null
    }
    var s = e(16),
      o = e(1).defaults,
      h = e(8),
      n = e(5),
      a = e(6);
    r.prototype.handle = function (t) {
      this.symbols.indexOf(t) <= -1 && this.symbols.push(t);
      var i = this;
      return t instanceof n ? (t.yes = function (e) {
        return t.yes_symbol = e, t.no_symbol && (t.pathOk = !0), i.handle(e)
      }, t.no = function (e) {
        return t.no_symbol = e, t.yes_symbol && (t.pathOk = !0), i.handle(e)
      }) : t instanceof a ? (t.path1 = function (e) {
        return t.path1_symbol = e, t.path2_symbol && (t.pathOk = !0), i.handle(e)
      }, t.path2 = function (e) {
        return t.path2_symbol = e, t.path3_symbol && (t.pathOk = !0), i.handle(e)
      }, t.path3 = function (e) {
        return t.path3_symbol = e, t.path1_symbol && (t.pathOk = !0), i.handle(e)
      }) : t.then = function (e) {
        return t.next = e, t.pathOk = !0, i.handle(e)
      }, t
    }, r.prototype.startWith = function (t) {
      return this.start = t, this.handle(t)
    }, r.prototype.render = function () {
      var t, i, e = 0,
        r = 0,
        s = 0,
        o = 0,
        h = 0,
        n = 0,
        a = 0,
        l = 0;
      for (s = 0, o = this.symbols.length; s < o; s++) t = this.symbols[s], t.width > e && (e = t.width), t.height > r && (r = t.height);
      for (s = 0, o = this.symbols.length; s < o; s++) t = this.symbols[s], t.shiftX(this.options.x + (e - t.width) / 2 + this.options["line-width"]), t.shiftY(this.options.y + (r - t.height) / 2 + this.options["line-width"]);
      for (this.start.render(), s = 0, o = this.symbols.length; s < o; s++) t = this.symbols[s], t.renderLines();
      h = this.maxXFromLine;
      var p, x;
      for (s = 0, o = this.symbols.length; s < o; s++) t = this.symbols[s], p = t.getX() + t.width, x = t.getY() + t.height, p > h && (h = p), x > n && (n = x);
      for (s = 0, o = this.lines.length; s < o; s++) {
        i = this.lines[s].getBBox(), p = i.x, x = i.y;
        var y = i.x2,
          g = i.y2;
        p < a && (a = p), x < l && (l = x), y > h && (h = y), g > n && (n = g)
      }
      var c = this.options.scale,
        f = this.options["line-width"];
      this.minXFromSymbols < a && (a = this.minXFromSymbols), a < 0 && (a -= f), l < 0 && (l -= f);
      var d = h + f - a,
        m = n + f - l;
      this.paper.setSize(d * c, m * c), this.paper.setViewBox(a, l, d, m, !0)
    }, r.prototype.clean = function () {
      if (this.paper) {
        var t = this.paper.canvas;
        t.parentNode.removeChild(t)
      }
    }, t.exports = r
  }, function (t, i) {
    t.exports = {
      x: 0,
      y: 0,
      "line-width": 3,
      "line-length": 50,
      "text-margin": 10,
      "font-size": 14,
      "font-color": "black",
      "line-color": "black",
      "element-color": "black",
      fill: "white",
      "yes-text": "yes",
      "no-text": "no",
      "arrow-end": "block",
      class: "flowchart",
      scale: 1,
      symbols: {
        start: {},
        end: {},
        condition: {},
        inputoutput: {},
        operation: {},
        subroutine: {},
        parallel: {}
      }
    }
  }, function (t, i) {
    Array.prototype.indexOf || (Array.prototype.indexOf = function (t) {
      "use strict";
      if (null === this) throw new TypeError;
      var i = Object(this),
        e = i.length >>> 0;
      if (0 === e) return -1;
      var r = 0;
      if (arguments.length > 0 && (r = Number(arguments[1]), r != r ? r = 0 : 0 !== r && r != 1 / 0 && r != -(1 / 0) && (r = (r > 0 || -1) * Math.floor(Math.abs(r)))), r >= e) return -1;
      for (var s = r >= 0 ? r : Math.max(e - Math.abs(r), 0); s < e; s++)
        if (s in i && i[s] === t) return s;
      return -1
    }), Array.prototype.lastIndexOf || (Array.prototype.lastIndexOf = function (t) {
      "use strict";
      if (null === this) throw new TypeError;
      var i = Object(this),
        e = i.length >>> 0;
      if (0 === e) return -1;
      var r = e;
      arguments.length > 1 && (r = Number(arguments[1]), r != r ? r = 0 : 0 !== r && r != 1 / 0 && r != -(1 / 0) && (r = (r > 0 || -1) * Math.floor(Math.abs(r))));
      for (var s = r >= 0 ? Math.min(r, e - 1) : e - Math.abs(r); s >= 0; s--)
        if (s in i && i[s] === t) return s;
      return -1
    }), String.prototype.trim || (String.prototype.trim = function () {
      return this.replace(/^\s+|\s+$/g, "")
    })
  }, function (t, i, e) {
    function r(t, i) {
      var e = t.paper.rect(0, 0, 0, 0, 20);
      i = i || {}, i.text = i.text || "End", s.call(this, t, i, e)
    }
    var s = e(2),
      o = e(1).inherits;
    o(r, s), t.exports = r
  }, function (t, i, e) {
    function r(t, i) {
      i = i || {}, s.call(this, t, i), this.textMargin = this.getAttr("text-margin"), this.text.attr({
        x: 3 * this.textMargin
      });
      var e = this.text.getBBox().width + 4 * this.textMargin,
        r = this.text.getBBox().height + 2 * this.textMargin,
        o = this.textMargin,
        h = r / 2,
        a = {
          x: o,
          y: h
        },
        l = [{
          x: o - this.textMargin,
          y: r
        }, {
          x: o - this.textMargin + e,
          y: r
        }, {
          x: o - this.textMargin + e + 2 * this.textMargin,
          y: 0
        }, {
          x: o - this.textMargin + 2 * this.textMargin,
          y: 0
        }, {
          x: o,
          y: h
        }],
        p = n(t, a, l);
      p.attr({
        stroke: this.getAttr("element-color"),
        "stroke-width": this.getAttr("line-width"),
        fill: this.getAttr("fill")
      }), i.link && p.attr("href", i.link), i.target && p.attr("target", i.target), i.key && (p.node.id = i.key), p.node.setAttribute("class", this.getAttr("class")), this.text.attr({
        y: p.getBBox().height / 2
      }), this.group.push(p), p.insertBefore(this.text), this.initialize()
    }
    var s = e(2),
      o = e(1).inherits,
      h = e(3),
      n = h.drawPath;
    o(r, s), r.prototype.getLeft = function () {
      var t = this.getY() + this.group.getBBox().height / 2,
        i = this.getX() + this.textMargin;
      return {
        x: i,
        y: t
      }
    }, r.prototype.getRight = function () {
      var t = this.getY() + this.group.getBBox().height / 2,
        i = this.getX() + this.group.getBBox().width - this.textMargin;
      return {
        x: i,
        y: t
      }
    }, t.exports = r
  }, function (t, i, e) {
    function r(t, i) {
      var e = t.paper.rect(0, 0, 0, 0);
      i = i || {}, s.call(this, t, i, e)
    }
    var s = e(2),
      o = e(1).inherits;
    o(r, s), t.exports = r
  }, function (t, i, e) {
    function r(t, i) {
      var e = t.paper.rect(0, 0, 0, 0, 20);
      i = i || {}, i.text = i.text || "Start", s.call(this, t, i, e)
    }
    var s = e(2),
      o = e(1).inherits;
    o(r, s), t.exports = r
  }, function (t, i, e) {
    function r(t, i) {
      var e = t.paper.rect(0, 0, 0, 0);
      i = i || {}, s.call(this, t, i, e), e.attr({
        width: this.text.getBBox().width + 4 * this.getAttr("text-margin")
      }), this.text.attr({
        x: 2 * this.getAttr("text-margin")
      });
      var r = t.paper.rect(0, 0, 0, 0);
      r.attr({
        x: this.getAttr("text-margin"),
        stroke: this.getAttr("element-color"),
        "stroke-width": this.getAttr("line-width"),
        width: this.text.getBBox().width + 2 * this.getAttr("text-margin"),
        height: this.text.getBBox().height + 2 * this.getAttr("text-margin"),
        fill: this.getAttr("fill")
      }), i.key && (r.node.id = i.key + "i");
      var o = this.getAttr("font"),
        h = this.getAttr("font-family"),
        n = this.getAttr("font-weight");
      o && r.attr({
        font: o
      }), h && r.attr({
        "font-family": h
      }), n && r.attr({
        "font-weight": n
      }), i.link && r.attr("href", i.link), i.target && r.attr("target", i.target), this.group.push(r), r.insertBefore(this.text), this.initialize()
    }
    var s = e(2),
      o = e(1).inherits;
    o(r, s), t.exports = r
  }, function (t, i, e) {
    if ("undefined" != typeof jQuery) {
      var r = e(4);
      ! function (t) {
        t.fn.flowChart = function (i) {
          return this.each(function () {
            var e = t(this),
              s = r(e.text());
            e.html(""), s.drawSVG(this, i)
          })
        }
      }(jQuery)
    }
  }, function (i, e) {
    i.exports = t
  }])
});
//# sourceMappingURL=flowchart.min.js.map