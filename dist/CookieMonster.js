/*! For license information please see CookieMonster.js.LICENSE.txt */
(() => {
  var e = {
      877: function (e) {
        !(function (t, o) {
          'use strict';
          'object' != typeof e.exports
            ? o(t)
            : (e.exports = t.document
                ? o(t)
                : function (e) {
                    if (!e.document) throw new Error('jscolor needs a window with document');
                    return o(e);
                  });
        })('undefined' != typeof window ? window : this, function (e) {
          'use strict';
          var t,
            o,
            a,
            n,
            i =
              ((n = {
                initialized: !1,
                instances: [],
                readyQueue: [],
                register: function () {
                  void 0 !== e &&
                    e.document &&
                    e.document.addEventListener('DOMContentLoaded', n.pub.init, !1);
                },
                installBySelector: function (t, o) {
                  if (!(o = o ? n.node(o) : e.document)) throw new Error('Missing root node');
                  for (
                    var a = o.querySelectorAll(t),
                      i = new RegExp(
                        '(^|\\s)(' + n.pub.lookupClass + ')(\\s*(\\{[^}]*\\})|\\s|$)',
                        'i',
                      ),
                      r = 0;
                    r < a.length;
                    r += 1
                  ) {
                    var s, l;
                    if (
                      !(a[r].jscolor && a[r].jscolor instanceof n.pub) &&
                      (void 0 === a[r].type ||
                        'color' != a[r].type.toLowerCase() ||
                        !n.isColorAttrSupported) &&
                      (null !== (s = n.getDataAttr(a[r], 'jscolor')) ||
                        (a[r].className && (l = a[r].className.match(i))))
                    ) {
                      var c = a[r],
                        d = '';
                      null !== s
                        ? (d = s)
                        : l &&
                          (console.warn(
                            'Installation using class name is DEPRECATED. Use data-jscolor="" attribute instead.' +
                              n.docsRef,
                          ),
                          l[4] && (d = l[4]));
                      var m = null;
                      if (d.trim())
                        try {
                          m = n.parseOptionsStr(d);
                        } catch (e) {
                          console.warn(e + '\n' + d);
                        }
                      try {
                        new n.pub(c, m);
                      } catch (e) {
                        console.warn(e);
                      }
                    }
                  }
                },
                parseOptionsStr: function (e) {
                  var t = null;
                  try {
                    t = JSON.parse(e);
                  } catch (o) {
                    if (!n.pub.looseJSON)
                      throw new Error('Could not parse jscolor options as JSON: ' + o);
                    try {
                      t = new Function(
                        'var opts = (' + e + '); return typeof opts === "object" ? opts : {};',
                      )();
                    } catch (e) {
                      throw new Error('Could not evaluate jscolor options: ' + e);
                    }
                  }
                  return t;
                },
                getInstances: function () {
                  for (var e = [], t = 0; t < n.instances.length; t += 1)
                    n.instances[t] && n.instances[t].targetElement && e.push(n.instances[t]);
                  return e;
                },
                createEl: function (t) {
                  var o = e.document.createElement(t);
                  return n.setData(o, 'gui', !0), o;
                },
                node: function (t) {
                  if (!t) return null;
                  if ('string' == typeof t) {
                    var o = t,
                      a = null;
                    try {
                      a = e.document.querySelector(o);
                    } catch (e) {
                      return console.warn(e), null;
                    }
                    return a || console.warn('No element matches the selector: %s', o), a;
                  }
                  return n.isNode(t)
                    ? t
                    : (console.warn('Invalid node of type %s: %s', typeof t, t), null);
                },
                isNode: function (e) {
                  return 'object' == typeof Node
                    ? e instanceof Node
                    : e &&
                        'object' == typeof e &&
                        'number' == typeof e.nodeType &&
                        'string' == typeof e.nodeName;
                },
                nodeName: function (e) {
                  return !(!e || !e.nodeName) && e.nodeName.toLowerCase();
                },
                removeChildren: function (e) {
                  for (; e.firstChild; ) e.removeChild(e.firstChild);
                },
                isTextInput: function (e) {
                  return e && 'input' === n.nodeName(e) && 'text' === e.type.toLowerCase();
                },
                isButton: function (e) {
                  if (!e) return !1;
                  var t = n.nodeName(e);
                  return (
                    'button' === t ||
                    ('input' === t &&
                      ['button', 'submit', 'reset'].indexOf(e.type.toLowerCase()) > -1)
                  );
                },
                isButtonEmpty: function (e) {
                  switch (n.nodeName(e)) {
                    case 'input':
                      return !e.value || '' === e.value.trim();
                    case 'button':
                      return '' === e.textContent.trim();
                  }
                  return null;
                },
                isPassiveEventSupported: (function () {
                  var t = !1;
                  try {
                    var o = Object.defineProperty({}, 'passive', {
                      get: function () {
                        t = !0;
                      },
                    });
                    e.addEventListener('testPassive', null, o),
                      e.removeEventListener('testPassive', null, o);
                  } catch (e) {}
                  return t;
                })(),
                isColorAttrSupported:
                  ((a = e.document.createElement('input')),
                  !(
                    !a.setAttribute ||
                    (a.setAttribute('type', 'color'), 'color' != a.type.toLowerCase())
                  )),
                dataProp: '_data_jscolor',
                setData: function () {
                  var e = arguments[0];
                  if (3 === arguments.length) {
                    var t = e.hasOwnProperty(n.dataProp) ? e[n.dataProp] : (e[n.dataProp] = {}),
                      o = arguments[2];
                    return (t[(i = arguments[1])] = o), !0;
                  }
                  if (2 === arguments.length && 'object' == typeof arguments[1]) {
                    t = e.hasOwnProperty(n.dataProp) ? e[n.dataProp] : (e[n.dataProp] = {});
                    var a = arguments[1];
                    for (var i in a) a.hasOwnProperty(i) && (t[i] = a[i]);
                    return !0;
                  }
                  throw new Error('Invalid arguments');
                },
                removeData: function () {
                  var e = arguments[0];
                  if (!e.hasOwnProperty(n.dataProp)) return !0;
                  for (var t = 1; t < arguments.length; t += 1) {
                    var o = arguments[t];
                    delete e[n.dataProp][o];
                  }
                  return !0;
                },
                getData: function (e, t, o) {
                  if (!e.hasOwnProperty(n.dataProp)) {
                    if (void 0 === o) return;
                    e[n.dataProp] = {};
                  }
                  var a = e[n.dataProp];
                  return a.hasOwnProperty(t) || void 0 === o || (a[t] = o), a[t];
                },
                getDataAttr: function (e, t) {
                  var o = 'data-' + t;
                  return e.getAttribute(o);
                },
                setDataAttr: function (e, t, o) {
                  var a = 'data-' + t;
                  e.setAttribute(a, o);
                },
                _attachedGroupEvents: {},
                attachGroupEvent: function (e, t, o, a) {
                  n._attachedGroupEvents.hasOwnProperty(e) || (n._attachedGroupEvents[e] = []),
                    n._attachedGroupEvents[e].push([t, o, a]),
                    t.addEventListener(o, a, !1);
                },
                detachGroupEvents: function (e) {
                  if (n._attachedGroupEvents.hasOwnProperty(e)) {
                    for (var t = 0; t < n._attachedGroupEvents[e].length; t += 1) {
                      var o = n._attachedGroupEvents[e][t];
                      o[0].removeEventListener(o[1], o[2], !1);
                    }
                    delete n._attachedGroupEvents[e];
                  }
                },
                preventDefault: function (e) {
                  e.preventDefault && e.preventDefault(), (e.returnValue = !1);
                },
                captureTarget: function (e) {
                  e.setCapture && ((n._capturedTarget = e), n._capturedTarget.setCapture());
                },
                releaseTarget: function () {
                  n._capturedTarget &&
                    (n._capturedTarget.releaseCapture(), (n._capturedTarget = null));
                },
                triggerEvent: function (t, o, a, i) {
                  if (t) {
                    var r = null;
                    return (
                      'function' == typeof Event
                        ? (r = new Event(o, { bubbles: a, cancelable: i }))
                        : (r = e.document.createEvent('Event')).initEvent(o, a, i),
                      !!r && (n.setData(r, 'internal', !0), t.dispatchEvent(r), !0)
                    );
                  }
                },
                triggerInputEvent: function (e, t, o, a) {
                  e && n.isTextInput(e) && n.triggerEvent(e, t, o, a);
                },
                eventKey: function (e) {
                  var t = { 9: 'Tab', 13: 'Enter', 27: 'Escape' };
                  return 'string' == typeof e.code
                    ? e.code
                    : void 0 !== e.keyCode && t.hasOwnProperty(e.keyCode)
                    ? t[e.keyCode]
                    : null;
                },
                strList: function (e) {
                  return e ? e.replace(/^\s+|\s+$/g, '').split(/\s+/) : [];
                },
                hasClass: function (e, t) {
                  return (
                    !!t &&
                    (void 0 !== e.classList
                      ? e.classList.contains(t)
                      : -1 != (' ' + e.className.replace(/\s+/g, ' ') + ' ').indexOf(' ' + t + ' '))
                  );
                },
                addClass: function (e, t) {
                  var o = n.strList(t);
                  if (void 0 === e.classList)
                    for (a = 0; a < o.length; a += 1)
                      n.hasClass(e, o[a]) || (e.className += (e.className ? ' ' : '') + o[a]);
                  else for (var a = 0; a < o.length; a += 1) e.classList.add(o[a]);
                },
                removeClass: function (e, t) {
                  var o = n.strList(t);
                  if (void 0 === e.classList)
                    for (i = 0; i < o.length; i += 1) {
                      var a = new RegExp(
                        '^\\s*' + o[i] + '\\s*|\\s*' + o[i] + '\\s*$|\\s+' + o[i] + '(\\s+)',
                        'g',
                      );
                      e.className = e.className.replace(a, '$1');
                    }
                  else for (var i = 0; i < o.length; i += 1) e.classList.remove(o[i]);
                },
                getCompStyle: function (t) {
                  return (e.getComputedStyle ? e.getComputedStyle(t) : t.currentStyle) || {};
                },
                setStyle: function (e, t, o, a) {
                  var i = o ? 'important' : '',
                    r = null;
                  for (var s in t)
                    if (t.hasOwnProperty(s)) {
                      var l = null;
                      null === t[s]
                        ? (r || (r = n.getData(e, 'origStyle')),
                          r && r.hasOwnProperty(s) && (l = r[s]))
                        : (a &&
                            (r || (r = n.getData(e, 'origStyle', {})),
                            r.hasOwnProperty(s) || (r[s] = e.style[s])),
                          (l = t[s])),
                        null !== l && e.style.setProperty(s, l, i);
                    }
                },
                hexColor: function (e, t, o) {
                  return (
                    '#' +
                    (
                      ('0' + Math.round(e).toString(16)).substr(-2) +
                      ('0' + Math.round(t).toString(16)).substr(-2) +
                      ('0' + Math.round(o).toString(16)).substr(-2)
                    ).toUpperCase()
                  );
                },
                hexaColor: function (e, t, o, a) {
                  return (
                    '#' +
                    (
                      ('0' + Math.round(e).toString(16)).substr(-2) +
                      ('0' + Math.round(t).toString(16)).substr(-2) +
                      ('0' + Math.round(o).toString(16)).substr(-2) +
                      ('0' + Math.round(255 * a).toString(16)).substr(-2)
                    ).toUpperCase()
                  );
                },
                rgbColor: function (e, t, o) {
                  return 'rgb(' + Math.round(e) + ',' + Math.round(t) + ',' + Math.round(o) + ')';
                },
                rgbaColor: function (e, t, o, a) {
                  return (
                    'rgba(' +
                    Math.round(e) +
                    ',' +
                    Math.round(t) +
                    ',' +
                    Math.round(o) +
                    ',' +
                    Math.round(100 * (null == a ? 1 : a)) / 100 +
                    ')'
                  );
                },
                linearGradient:
                  ((o = (function () {
                    for (
                      var t = 'linear-gradient',
                        o = ['', '-webkit-', '-moz-', '-o-', '-ms-'],
                        a = e.document.createElement('div'),
                        n = 0;
                      n < o.length;
                      n += 1
                    ) {
                      var i = o[n] + t,
                        r = i + '(to right, rgba(0,0,0,0), rgba(0,0,0,0))';
                      if (((a.style.background = r), a.style.background)) return i;
                    }
                    return t;
                  })()),
                  function () {
                    return o + '(' + Array.prototype.join.call(arguments, ', ') + ')';
                  }),
                setBorderRadius: function (e, t) {
                  n.setStyle(e, { 'border-radius': t || '0' });
                },
                setBoxShadow: function (e, t) {
                  n.setStyle(e, { 'box-shadow': t || 'none' });
                },
                getElementPos: function (e, t) {
                  var o = 0,
                    a = 0,
                    i = e.getBoundingClientRect();
                  if (((o = i.left), (a = i.top), !t)) {
                    var r = n.getViewPos();
                    (o += r[0]), (a += r[1]);
                  }
                  return [o, a];
                },
                getElementSize: function (e) {
                  return [e.offsetWidth, e.offsetHeight];
                },
                getAbsPointerPos: function (e) {
                  var t = 0,
                    o = 0;
                  return (
                    void 0 !== e.changedTouches && e.changedTouches.length
                      ? ((t = e.changedTouches[0].clientX), (o = e.changedTouches[0].clientY))
                      : 'number' == typeof e.clientX && ((t = e.clientX), (o = e.clientY)),
                    { x: t, y: o }
                  );
                },
                getRelPointerPos: function (e) {
                  var t = (e.target || e.srcElement).getBoundingClientRect(),
                    o = 0,
                    a = 0;
                  return (
                    void 0 !== e.changedTouches && e.changedTouches.length
                      ? ((o = e.changedTouches[0].clientX), (a = e.changedTouches[0].clientY))
                      : 'number' == typeof e.clientX && ((o = e.clientX), (a = e.clientY)),
                    { x: o - t.left, y: a - t.top }
                  );
                },
                getViewPos: function () {
                  var t = e.document.documentElement;
                  return [
                    (e.pageXOffset || t.scrollLeft) - (t.clientLeft || 0),
                    (e.pageYOffset || t.scrollTop) - (t.clientTop || 0),
                  ];
                },
                getViewSize: function () {
                  var t = e.document.documentElement;
                  return [e.innerWidth || t.clientWidth, e.innerHeight || t.clientHeight];
                },
                RGB_HSV: function (e, t, o) {
                  (e /= 255), (t /= 255), (o /= 255);
                  var a = Math.min(Math.min(e, t), o),
                    n = Math.max(Math.max(e, t), o),
                    i = n - a;
                  if (0 === i) return [null, 0, 100 * n];
                  var r = e === a ? 3 + (o - t) / i : t === a ? 5 + (e - o) / i : 1 + (t - e) / i;
                  return [60 * (6 === r ? 0 : r), (i / n) * 100, 100 * n];
                },
                HSV_RGB: function (e, t, o) {
                  var a = (o / 100) * 255;
                  if (null === e) return [a, a, a];
                  (e /= 60), (t /= 100);
                  var n = Math.floor(e),
                    i = a * (1 - t),
                    r = a * (1 - t * (n % 2 ? e - n : 1 - (e - n)));
                  switch (n) {
                    case 6:
                    case 0:
                      return [a, r, i];
                    case 1:
                      return [r, a, i];
                    case 2:
                      return [i, a, r];
                    case 3:
                      return [i, r, a];
                    case 4:
                      return [r, i, a];
                    case 5:
                      return [a, i, r];
                  }
                },
                parseColorString: function (e) {
                  var t,
                    o = { rgba: null, format: null };
                  if ((t = e.match(/^\W*([0-9A-F]{3,8})\W*$/i))) {
                    if (8 === t[1].length)
                      (o.format = 'hexa'),
                        (o.rgba = [
                          parseInt(t[1].substr(0, 2), 16),
                          parseInt(t[1].substr(2, 2), 16),
                          parseInt(t[1].substr(4, 2), 16),
                          parseInt(t[1].substr(6, 2), 16) / 255,
                        ]);
                    else if (6 === t[1].length)
                      (o.format = 'hex'),
                        (o.rgba = [
                          parseInt(t[1].substr(0, 2), 16),
                          parseInt(t[1].substr(2, 2), 16),
                          parseInt(t[1].substr(4, 2), 16),
                          null,
                        ]);
                    else {
                      if (3 !== t[1].length) return !1;
                      (o.format = 'hex'),
                        (o.rgba = [
                          parseInt(t[1].charAt(0) + t[1].charAt(0), 16),
                          parseInt(t[1].charAt(1) + t[1].charAt(1), 16),
                          parseInt(t[1].charAt(2) + t[1].charAt(2), 16),
                          null,
                        ]);
                    }
                    return o;
                  }
                  if ((t = e.match(/^\W*rgba?\(([^)]*)\)\W*$/i))) {
                    var a,
                      n,
                      i,
                      r,
                      s = t[1].split(','),
                      l = /^\s*(\d+|\d*\.\d+|\d+\.\d*)\s*$/;
                    if (
                      s.length >= 3 &&
                      (a = s[0].match(l)) &&
                      (n = s[1].match(l)) &&
                      (i = s[2].match(l))
                    )
                      return (
                        (o.format = 'rgb'),
                        (o.rgba = [
                          parseFloat(a[1]) || 0,
                          parseFloat(n[1]) || 0,
                          parseFloat(i[1]) || 0,
                          null,
                        ]),
                        s.length >= 4 &&
                          (r = s[3].match(l)) &&
                          ((o.format = 'rgba'), (o.rgba[3] = parseFloat(r[1]) || 0)),
                        o
                      );
                  }
                  return !1;
                },
                parsePaletteValue: function (e) {
                  var t = [];
                  'string' == typeof e
                    ? e.replace(/#[0-9A-F]{3}([0-9A-F]{3})?|rgba?\(([^)]*)\)/gi, function (e) {
                        t.push(e);
                      })
                    : Array.isArray(e) && (t = e);
                  for (var o = [], a = 0; a < t.length; a++) {
                    var i = n.parseColorString(t[a]);
                    i && o.push(i);
                  }
                  return o;
                },
                containsTranparentColor: function (e) {
                  for (var t = 0; t < e.length; t++) {
                    var o = e[t].rgba[3];
                    if (null !== o && o < 1) return !0;
                  }
                  return !1;
                },
                isAlphaFormat: function (e) {
                  switch (e.toLowerCase()) {
                    case 'hexa':
                    case 'rgba':
                      return !0;
                  }
                  return !1;
                },
                scaleCanvasForHighDPR: function (t) {
                  var o = e.devicePixelRatio || 1;
                  (t.width *= o), (t.height *= o), t.getContext('2d').scale(o, o);
                },
                genColorPreviewCanvas: function (e, t, o, a) {
                  var i = Math.round(n.pub.previewSeparator.length),
                    r = n.pub.chessboardSize,
                    s = n.pub.chessboardColor1,
                    l = n.pub.chessboardColor2,
                    c = o || 2 * r,
                    d = 2 * r,
                    m = n.createEl('canvas'),
                    p = m.getContext('2d');
                  (m.width = c),
                    (m.height = d),
                    a && n.scaleCanvasForHighDPR(m),
                    (p.fillStyle = s),
                    p.fillRect(0, 0, c, d),
                    (p.fillStyle = l);
                  for (var u = 0; u < c; u += 2 * r)
                    p.fillRect(u, 0, r, r), p.fillRect(u + r, r, r, r);
                  e && ((p.fillStyle = e), p.fillRect(0, 0, c, d));
                  var h = null;
                  switch (t) {
                    case 'left':
                      (h = 0), p.clearRect(0, 0, i / 2, d);
                      break;
                    case 'right':
                      (h = c - i), p.clearRect(c - i / 2, 0, i / 2, d);
                  }
                  if (null !== h) {
                    p.lineWidth = 1;
                    for (var g = 0; g < n.pub.previewSeparator.length; g += 1)
                      p.beginPath(),
                        (p.strokeStyle = n.pub.previewSeparator[g]),
                        p.moveTo(0.5 + h + g, 0),
                        p.lineTo(0.5 + h + g, d),
                        p.stroke();
                  }
                  return { canvas: m, width: c, height: d };
                },
                genColorPreviewGradient: function (e, t, o) {
                  var a;
                  return (
                    (a =
                      t && o
                        ? [
                            'to ' + { left: 'right', right: 'left' }[t],
                            e + ' 0%',
                            e + ' ' + o + 'px',
                            'rgba(0,0,0,0) ' + (o + 1) + 'px',
                            'rgba(0,0,0,0) 100%',
                          ]
                        : ['to right', e + ' 0%', e + ' 100%']),
                    n.linearGradient.apply(this, a)
                  );
                },
                redrawPosition: function () {
                  if (n.picker && n.picker.owner) {
                    var e,
                      t,
                      o = n.picker.owner;
                    o.fixed
                      ? ((e = n.getElementPos(o.targetElement, !0)), (t = [0, 0]))
                      : ((e = n.getElementPos(o.targetElement)), (t = n.getViewPos()));
                    var a,
                      i,
                      r,
                      s = n.getElementSize(o.targetElement),
                      l = n.getViewSize(),
                      c = n.getPickerDims(o),
                      d = [c.borderW, c.borderH];
                    switch (o.position.toLowerCase()) {
                      case 'left':
                        (a = 1), (i = 0), (r = -1);
                        break;
                      case 'right':
                        (a = 1), (i = 0), (r = 1);
                        break;
                      case 'top':
                        (a = 0), (i = 1), (r = -1);
                        break;
                      default:
                        (a = 0), (i = 1), (r = 1);
                    }
                    var m = (s[i] + d[i]) / 2;
                    if (o.smartPosition)
                      p = [
                        -t[a] + e[a] + d[a] > l[a] &&
                        -t[a] + e[a] + s[a] / 2 > l[a] / 2 &&
                        e[a] + s[a] - d[a] >= 0
                          ? e[a] + s[a] - d[a]
                          : e[a],
                        -t[i] + e[i] + s[i] + d[i] - m + m * r > l[i]
                          ? -t[i] + e[i] + s[i] / 2 > l[i] / 2 && e[i] + s[i] - m - m * r >= 0
                            ? e[i] + s[i] - m - m * r
                            : e[i] + s[i] - m + m * r
                          : e[i] + s[i] - m + m * r >= 0
                          ? e[i] + s[i] - m + m * r
                          : e[i] + s[i] - m - m * r,
                      ];
                    else var p = [e[a], e[i] + s[i] - m + m * r];
                    var u = p[a],
                      h = p[i],
                      g = o.fixed ? 'fixed' : 'absolute',
                      f = (p[0] + d[0] > e[0] || p[0] < e[0] + s[0]) && p[1] + d[1] < e[1] + s[1];
                    n._drawPosition(o, u, h, g, f);
                  }
                },
                _drawPosition: function (e, t, o, a, i) {
                  var r = i ? 0 : e.shadowBlur;
                  (n.picker.wrap.style.position = a),
                    (n.picker.wrap.style.left = t + 'px'),
                    (n.picker.wrap.style.top = o + 'px'),
                    n.setBoxShadow(
                      n.picker.boxS,
                      e.shadow ? new n.BoxShadow(0, r, e.shadowBlur, 0, e.shadowColor) : null,
                    );
                },
                getPickerDims: function (e) {
                  var t = 2 * e.controlBorderWidth + e.width,
                    o = 2 * e.controlBorderWidth + e.height,
                    a = 2 * e.controlBorderWidth + 2 * n.getControlPadding(e) + e.sliderSize;
                  n.getSliderChannel(e) && (t += a), e.hasAlphaChannel() && (t += a);
                  var i = n.getPaletteDims(e, t);
                  i.height && (o += i.height + e.padding),
                    e.closeButton && (o += 2 * e.controlBorderWidth + e.padding + e.buttonHeight);
                  var r = t + 2 * e.padding,
                    s = o + 2 * e.padding;
                  return {
                    contentW: t,
                    contentH: o,
                    paddedW: r,
                    paddedH: s,
                    borderW: r + 2 * e.borderWidth,
                    borderH: s + 2 * e.borderWidth,
                    palette: i,
                  };
                },
                getPaletteDims: function (e, t) {
                  var o = 0,
                    a = 0,
                    n = 0,
                    i = 0,
                    r = 0,
                    s = e._palette ? e._palette.length : 0;
                  return (
                    s &&
                      ((a = (o = e.paletteCols) > 0 ? Math.ceil(s / o) : 0),
                      (n = Math.max(1, Math.floor((t - (o - 1) * e.paletteSpacing) / o))),
                      (i = e.paletteHeight ? Math.min(e.paletteHeight, n) : n)),
                    a && (r = a * i + (a - 1) * e.paletteSpacing),
                    { cols: o, rows: a, cellW: n, cellH: i, width: t, height: r }
                  );
                },
                getControlPadding: function (e) {
                  return Math.max(
                    e.padding / 2,
                    2 * e.pointerBorderWidth + e.pointerThickness - e.controlBorderWidth,
                  );
                },
                getPadYChannel: function (e) {
                  return 'v' === e.mode.charAt(1).toLowerCase() ? 'v' : 's';
                },
                getSliderChannel: function (e) {
                  if (e.mode.length > 2)
                    switch (e.mode.charAt(2).toLowerCase()) {
                      case 's':
                        return 's';
                      case 'v':
                        return 'v';
                    }
                  return null;
                },
                triggerCallback: function (e, t) {
                  if (e[t]) {
                    var o = null;
                    if ('string' == typeof e[t])
                      try {
                        o = new Function(e[t]);
                      } catch (e) {
                        console.error(e);
                      }
                    else o = e[t];
                    o && o.call(e);
                  }
                },
                triggerGlobal: function (e) {
                  for (var t = n.getInstances(), o = 0; o < t.length; o += 1) t[o].trigger(e);
                },
                _pointerMoveEvent: { mouse: 'mousemove', touch: 'touchmove' },
                _pointerEndEvent: { mouse: 'mouseup', touch: 'touchend' },
                _pointerOrigin: null,
                _capturedTarget: null,
                onDocumentKeyUp: function (e) {
                  -1 !== ['Tab', 'Escape'].indexOf(n.eventKey(e)) &&
                    n.picker &&
                    n.picker.owner &&
                    n.picker.owner.tryHide();
                },
                onWindowResize: function (e) {
                  n.redrawPosition();
                },
                onWindowScroll: function (e) {
                  n.redrawPosition();
                },
                onParentScroll: function (e) {
                  n.picker && n.picker.owner && n.picker.owner.tryHide();
                },
                onDocumentMouseDown: function (e) {
                  var t = e.target || e.srcElement;
                  t.jscolor && t.jscolor instanceof n.pub
                    ? t.jscolor.showOnClick && !t.disabled && t.jscolor.show()
                    : n.getData(t, 'gui')
                    ? n.getData(t, 'control') &&
                      n.onControlPointerStart(e, t, n.getData(t, 'control'), 'mouse')
                    : n.picker && n.picker.owner && n.picker.owner.tryHide();
                },
                onPickerTouchStart: function (e) {
                  var t = e.target || e.srcElement;
                  n.getData(t, 'control') &&
                    n.onControlPointerStart(e, t, n.getData(t, 'control'), 'touch');
                },
                onControlPointerStart: function (t, o, a, i) {
                  var r = n.getData(o, 'instance');
                  n.preventDefault(t), n.captureTarget(o);
                  var s = function (e, r) {
                    n.attachGroupEvent(
                      'drag',
                      e,
                      n._pointerMoveEvent[i],
                      n.onDocumentPointerMove(t, o, a, i, r),
                    ),
                      n.attachGroupEvent(
                        'drag',
                        e,
                        n._pointerEndEvent[i],
                        n.onDocumentPointerEnd(t, o, a, i),
                      );
                  };
                  if ((s(e.document, [0, 0]), e.parent && e.frameElement)) {
                    var l = e.frameElement.getBoundingClientRect(),
                      c = [-l.left, -l.top];
                    s(e.parent.window.document, c);
                  }
                  var d = n.getAbsPointerPos(t),
                    m = n.getRelPointerPos(t);
                  switch (((n._pointerOrigin = { x: d.x - m.x, y: d.y - m.y }), a)) {
                    case 'pad':
                      'v' === n.getSliderChannel(r) &&
                        0 === r.channels.v &&
                        r.fromHSVA(null, null, 100, null),
                        n.setPad(r, t, 0, 0);
                      break;
                    case 'sld':
                      n.setSld(r, t, 0);
                      break;
                    case 'asld':
                      n.setASld(r, t, 0);
                  }
                  r.trigger('input');
                },
                onDocumentPointerMove: function (e, t, o, a, i) {
                  return function (e) {
                    var a = n.getData(t, 'instance');
                    switch (o) {
                      case 'pad':
                        n.setPad(a, e, i[0], i[1]);
                        break;
                      case 'sld':
                        n.setSld(a, e, i[1]);
                        break;
                      case 'asld':
                        n.setASld(a, e, i[1]);
                    }
                    a.trigger('input');
                  };
                },
                onDocumentPointerEnd: function (e, t, o, a) {
                  return function (e) {
                    var o = n.getData(t, 'instance');
                    n.detachGroupEvents('drag'),
                      n.releaseTarget(),
                      o.trigger('input'),
                      o.trigger('change');
                  };
                },
                onPaletteSampleClick: function (e) {
                  var t = e.currentTarget,
                    o = n.getData(t, 'instance'),
                    a = n.getData(t, 'color');
                  'any' === o.format.toLowerCase() &&
                    (o._setFormat(a.format), n.isAlphaFormat(o.getFormat()) || (a.rgba[3] = 1)),
                    null === a.rgba[3] &&
                      (!0 === o.paletteSetsAlpha ||
                        ('auto' === o.paletteSetsAlpha && o._paletteHasTransparency)) &&
                      (a.rgba[3] = 1),
                    o.fromRGBA.apply(o, a.rgba),
                    o.trigger('input'),
                    o.trigger('change'),
                    o.hideOnPaletteClick && o.hide();
                },
                setPad: function (e, t, o, a) {
                  var i = n.getAbsPointerPos(t),
                    r = o + i.x - n._pointerOrigin.x - e.padding - e.controlBorderWidth,
                    s = a + i.y - n._pointerOrigin.y - e.padding - e.controlBorderWidth,
                    l = r * (360 / (e.width - 1)),
                    c = 100 - s * (100 / (e.height - 1));
                  switch (n.getPadYChannel(e)) {
                    case 's':
                      e.fromHSVA(l, c, null, null);
                      break;
                    case 'v':
                      e.fromHSVA(l, null, c, null);
                  }
                },
                setSld: function (e, t, o) {
                  var a =
                    100 -
                    (o +
                      n.getAbsPointerPos(t).y -
                      n._pointerOrigin.y -
                      e.padding -
                      e.controlBorderWidth) *
                      (100 / (e.height - 1));
                  switch (n.getSliderChannel(e)) {
                    case 's':
                      e.fromHSVA(null, a, null, null);
                      break;
                    case 'v':
                      e.fromHSVA(null, null, a, null);
                  }
                },
                setASld: function (e, t, o) {
                  var a =
                    1 -
                    (o +
                      n.getAbsPointerPos(t).y -
                      n._pointerOrigin.y -
                      e.padding -
                      e.controlBorderWidth) *
                      (1 / (e.height - 1));
                  if (a < 1) {
                    var i = e.getFormat();
                    'any' !== e.format.toLowerCase() ||
                      n.isAlphaFormat(i) ||
                      e._setFormat('hex' === i ? 'hexa' : 'rgba');
                  }
                  e.fromHSVA(null, null, null, a);
                },
                createPadCanvas: function () {
                  var e = { elm: null, draw: null },
                    t = n.createEl('canvas'),
                    o = t.getContext('2d');
                  return (
                    (e.elm = t),
                    (e.draw = function (e, a, n) {
                      (t.width = e), (t.height = a), o.clearRect(0, 0, t.width, t.height);
                      var i = o.createLinearGradient(0, 0, t.width, 0);
                      i.addColorStop(0, '#F00'),
                        i.addColorStop(1 / 6, '#FF0'),
                        i.addColorStop(2 / 6, '#0F0'),
                        i.addColorStop(0.5, '#0FF'),
                        i.addColorStop(4 / 6, '#00F'),
                        i.addColorStop(5 / 6, '#F0F'),
                        i.addColorStop(1, '#F00'),
                        (o.fillStyle = i),
                        o.fillRect(0, 0, t.width, t.height);
                      var r = o.createLinearGradient(0, 0, 0, t.height);
                      switch (n.toLowerCase()) {
                        case 's':
                          r.addColorStop(0, 'rgba(255,255,255,0)'),
                            r.addColorStop(1, 'rgba(255,255,255,1)');
                          break;
                        case 'v':
                          r.addColorStop(0, 'rgba(0,0,0,0)'), r.addColorStop(1, 'rgba(0,0,0,1)');
                      }
                      (o.fillStyle = r), o.fillRect(0, 0, t.width, t.height);
                    }),
                    e
                  );
                },
                createSliderGradient: function () {
                  var e = { elm: null, draw: null },
                    t = n.createEl('canvas'),
                    o = t.getContext('2d');
                  return (
                    (e.elm = t),
                    (e.draw = function (e, a, n, i) {
                      (t.width = e), (t.height = a), o.clearRect(0, 0, t.width, t.height);
                      var r = o.createLinearGradient(0, 0, 0, t.height);
                      r.addColorStop(0, n),
                        r.addColorStop(1, i),
                        (o.fillStyle = r),
                        o.fillRect(0, 0, t.width, t.height);
                    }),
                    e
                  );
                },
                createASliderGradient: function () {
                  var e = { elm: null, draw: null },
                    t = n.createEl('canvas'),
                    o = t.getContext('2d');
                  return (
                    (e.elm = t),
                    (e.draw = function (e, a, i) {
                      (t.width = e), (t.height = a), o.clearRect(0, 0, t.width, t.height);
                      var r = t.width / 2,
                        s = n.pub.chessboardColor1,
                        l = n.pub.chessboardColor2;
                      if (((o.fillStyle = s), o.fillRect(0, 0, t.width, t.height), r > 0))
                        for (var c = 0; c < t.height; c += 2 * r)
                          (o.fillStyle = l), o.fillRect(0, c, r, r), o.fillRect(r, c + r, r, r);
                      var d = o.createLinearGradient(0, 0, 0, t.height);
                      d.addColorStop(0, i),
                        d.addColorStop(1, 'rgba(0,0,0,0)'),
                        (o.fillStyle = d),
                        o.fillRect(0, 0, t.width, t.height);
                    }),
                    e
                  );
                },
                BoxShadow:
                  ((t = function (e, t, o, a, n, i) {
                    (this.hShadow = e),
                      (this.vShadow = t),
                      (this.blur = o),
                      (this.spread = a),
                      (this.color = n),
                      (this.inset = !!i);
                  }),
                  (t.prototype.toString = function () {
                    var e = [
                      Math.round(this.hShadow) + 'px',
                      Math.round(this.vShadow) + 'px',
                      Math.round(this.blur) + 'px',
                      Math.round(this.spread) + 'px',
                      this.color,
                    ];
                    return this.inset && e.push('inset'), e.join(' ');
                  }),
                  t),
                flags: { leaveValue: 1, leaveAlpha: 2, leavePreview: 4 },
                enumOpts: {
                  format: ['auto', 'any', 'hex', 'hexa', 'rgb', 'rgba'],
                  previewPosition: ['left', 'right'],
                  mode: ['hsv', 'hvs', 'hs', 'hv'],
                  position: ['left', 'right', 'top', 'bottom'],
                  alphaChannel: ['auto', !0, !1],
                  paletteSetsAlpha: ['auto', !0, !1],
                },
                deprecatedOpts: {
                  styleElement: 'previewElement',
                  onFineChange: 'onInput',
                  overwriteImportant: 'forceStyle',
                  closable: 'closeButton',
                  insetWidth: 'controlBorderWidth',
                  insetColor: 'controlBorderColor',
                  refine: null,
                },
                docsRef: ' See https://jscolor.com/docs/',
                pub: function (t, o) {
                  var a = this;
                  function i(e, t) {
                    if ('string' != typeof e)
                      throw new Error('Invalid value for option name: ' + e);
                    if (
                      n.enumOpts.hasOwnProperty(e) &&
                      ('string' == typeof t && (t = t.toLowerCase()),
                      -1 === n.enumOpts[e].indexOf(t))
                    )
                      throw new Error("Option '" + e + "' has invalid value: " + t);
                    if (n.deprecatedOpts.hasOwnProperty(e)) {
                      var o = e,
                        i = n.deprecatedOpts[e];
                      if (!i) throw new Error("Option '" + e + "' is DEPRECATED");
                      console.warn(
                        "Option '%s' is DEPRECATED, using '%s' instead." + n.docsRef,
                        o,
                        i,
                      ),
                        (e = i);
                    }
                    var r = 'set__' + e;
                    if ('function' == typeof a[r]) return a[r](t), !0;
                    if (e in a) return (a[e] = t), !0;
                    throw new Error('Unrecognized configuration option: ' + e);
                  }
                  function r(e) {
                    if ('string' != typeof e)
                      throw new Error('Invalid value for option name: ' + e);
                    if (n.deprecatedOpts.hasOwnProperty(e)) {
                      var t = e,
                        o = n.deprecatedOpts[e];
                      if (!o) throw new Error("Option '" + e + "' is DEPRECATED");
                      console.warn(
                        "Option '%s' is DEPRECATED, using '%s' instead." + n.docsRef,
                        t,
                        o,
                      ),
                        (e = o);
                    }
                    var i = 'get__' + e;
                    if ('function' == typeof a[i]) return a[i](value);
                    if (e in a) return a[e];
                    throw new Error('Unrecognized configuration option: ' + e);
                  }
                  function s() {
                    a._processParentElementsInDOM(),
                      n.picker ||
                        ((n.picker = {
                          owner: null,
                          wrap: n.createEl('div'),
                          box: n.createEl('div'),
                          boxS: n.createEl('div'),
                          boxB: n.createEl('div'),
                          pad: n.createEl('div'),
                          padB: n.createEl('div'),
                          padM: n.createEl('div'),
                          padCanvas: n.createPadCanvas(),
                          cross: n.createEl('div'),
                          crossBY: n.createEl('div'),
                          crossBX: n.createEl('div'),
                          crossLY: n.createEl('div'),
                          crossLX: n.createEl('div'),
                          sld: n.createEl('div'),
                          sldB: n.createEl('div'),
                          sldM: n.createEl('div'),
                          sldGrad: n.createSliderGradient(),
                          sldPtrS: n.createEl('div'),
                          sldPtrIB: n.createEl('div'),
                          sldPtrMB: n.createEl('div'),
                          sldPtrOB: n.createEl('div'),
                          asld: n.createEl('div'),
                          asldB: n.createEl('div'),
                          asldM: n.createEl('div'),
                          asldGrad: n.createASliderGradient(),
                          asldPtrS: n.createEl('div'),
                          asldPtrIB: n.createEl('div'),
                          asldPtrMB: n.createEl('div'),
                          asldPtrOB: n.createEl('div'),
                          pal: n.createEl('div'),
                          btn: n.createEl('div'),
                          btnT: n.createEl('span'),
                        }),
                        n.picker.pad.appendChild(n.picker.padCanvas.elm),
                        n.picker.padB.appendChild(n.picker.pad),
                        n.picker.cross.appendChild(n.picker.crossBY),
                        n.picker.cross.appendChild(n.picker.crossBX),
                        n.picker.cross.appendChild(n.picker.crossLY),
                        n.picker.cross.appendChild(n.picker.crossLX),
                        n.picker.padB.appendChild(n.picker.cross),
                        n.picker.box.appendChild(n.picker.padB),
                        n.picker.box.appendChild(n.picker.padM),
                        n.picker.sld.appendChild(n.picker.sldGrad.elm),
                        n.picker.sldB.appendChild(n.picker.sld),
                        n.picker.sldB.appendChild(n.picker.sldPtrOB),
                        n.picker.sldPtrOB.appendChild(n.picker.sldPtrMB),
                        n.picker.sldPtrMB.appendChild(n.picker.sldPtrIB),
                        n.picker.sldPtrIB.appendChild(n.picker.sldPtrS),
                        n.picker.box.appendChild(n.picker.sldB),
                        n.picker.box.appendChild(n.picker.sldM),
                        n.picker.asld.appendChild(n.picker.asldGrad.elm),
                        n.picker.asldB.appendChild(n.picker.asld),
                        n.picker.asldB.appendChild(n.picker.asldPtrOB),
                        n.picker.asldPtrOB.appendChild(n.picker.asldPtrMB),
                        n.picker.asldPtrMB.appendChild(n.picker.asldPtrIB),
                        n.picker.asldPtrIB.appendChild(n.picker.asldPtrS),
                        n.picker.box.appendChild(n.picker.asldB),
                        n.picker.box.appendChild(n.picker.asldM),
                        n.picker.box.appendChild(n.picker.pal),
                        n.picker.btn.appendChild(n.picker.btnT),
                        n.picker.box.appendChild(n.picker.btn),
                        n.picker.boxB.appendChild(n.picker.box),
                        n.picker.wrap.appendChild(n.picker.boxS),
                        n.picker.wrap.appendChild(n.picker.boxB),
                        n.picker.wrap.addEventListener(
                          'touchstart',
                          n.onPickerTouchStart,
                          !!n.isPassiveEventSupported && { passive: !1 },
                        ));
                    var t,
                      o,
                      i = n.picker,
                      r = !!n.getSliderChannel(a),
                      s = a.hasAlphaChannel(),
                      m = n.getPickerDims(a),
                      p = 2 * a.pointerBorderWidth + a.pointerThickness + 2 * a.crossSize,
                      u = n.getControlPadding(a),
                      h = Math.min(a.borderRadius, Math.round(a.padding * Math.PI));
                    (i.wrap.className = 'jscolor-picker-wrap'),
                      (i.wrap.style.clear = 'both'),
                      (i.wrap.style.width = m.borderW + 'px'),
                      (i.wrap.style.height = m.borderH + 'px'),
                      (i.wrap.style.zIndex = a.zIndex),
                      (i.box.className = 'jscolor-picker'),
                      (i.box.style.width = m.paddedW + 'px'),
                      (i.box.style.height = m.paddedH + 'px'),
                      (i.box.style.position = 'relative'),
                      (i.boxS.className = 'jscolor-picker-shadow'),
                      (i.boxS.style.position = 'absolute'),
                      (i.boxS.style.left = '0'),
                      (i.boxS.style.top = '0'),
                      (i.boxS.style.width = '100%'),
                      (i.boxS.style.height = '100%'),
                      n.setBorderRadius(i.boxS, h + 'px'),
                      (i.boxB.className = 'jscolor-picker-border'),
                      (i.boxB.style.position = 'relative'),
                      (i.boxB.style.border = a.borderWidth + 'px solid'),
                      (i.boxB.style.borderColor = a.borderColor),
                      (i.boxB.style.background = a.backgroundColor),
                      n.setBorderRadius(i.boxB, h + 'px'),
                      (i.padM.style.background = 'rgba(255,0,0,.2)'),
                      (i.sldM.style.background = 'rgba(0,255,0,.2)'),
                      (i.asldM.style.background = 'rgba(0,0,255,.2)'),
                      (i.padM.style.opacity = i.sldM.style.opacity = i.asldM.style.opacity = '0'),
                      (i.pad.style.position = 'relative'),
                      (i.pad.style.width = a.width + 'px'),
                      (i.pad.style.height = a.height + 'px'),
                      i.padCanvas.draw(a.width, a.height, n.getPadYChannel(a)),
                      (i.padB.style.position = 'absolute'),
                      (i.padB.style.left = a.padding + 'px'),
                      (i.padB.style.top = a.padding + 'px'),
                      (i.padB.style.border = a.controlBorderWidth + 'px solid'),
                      (i.padB.style.borderColor = a.controlBorderColor),
                      (i.padM.style.position = 'absolute'),
                      (i.padM.style.left = '0px'),
                      (i.padM.style.top = '0px'),
                      (i.padM.style.width =
                        a.padding + 2 * a.controlBorderWidth + a.width + u + 'px'),
                      (i.padM.style.height =
                        2 * a.controlBorderWidth + 2 * a.padding + a.height + 'px'),
                      (i.padM.style.cursor = 'crosshair'),
                      n.setData(i.padM, { instance: a, control: 'pad' }),
                      (i.cross.style.position = 'absolute'),
                      (i.cross.style.left = i.cross.style.top = '0'),
                      (i.cross.style.width = i.cross.style.height = p + 'px'),
                      (i.crossBY.style.position = i.crossBX.style.position = 'absolute'),
                      (i.crossBY.style.background = i.crossBX.style.background =
                        a.pointerBorderColor),
                      (i.crossBY.style.width = i.crossBX.style.height =
                        2 * a.pointerBorderWidth + a.pointerThickness + 'px'),
                      (i.crossBY.style.height = i.crossBX.style.width = p + 'px'),
                      (i.crossBY.style.left = i.crossBX.style.top =
                        Math.floor(p / 2) -
                        Math.floor(a.pointerThickness / 2) -
                        a.pointerBorderWidth +
                        'px'),
                      (i.crossBY.style.top = i.crossBX.style.left = '0'),
                      (i.crossLY.style.position = i.crossLX.style.position = 'absolute'),
                      (i.crossLY.style.background = i.crossLX.style.background = a.pointerColor),
                      (i.crossLY.style.height = i.crossLX.style.width =
                        p - 2 * a.pointerBorderWidth + 'px'),
                      (i.crossLY.style.width = i.crossLX.style.height = a.pointerThickness + 'px'),
                      (i.crossLY.style.left = i.crossLX.style.top =
                        Math.floor(p / 2) - Math.floor(a.pointerThickness / 2) + 'px'),
                      (i.crossLY.style.top = i.crossLX.style.left = a.pointerBorderWidth + 'px'),
                      (i.sld.style.overflow = 'hidden'),
                      (i.sld.style.width = a.sliderSize + 'px'),
                      (i.sld.style.height = a.height + 'px'),
                      i.sldGrad.draw(a.sliderSize, a.height, '#000', '#000'),
                      (i.sldB.style.display = r ? 'block' : 'none'),
                      (i.sldB.style.position = 'absolute'),
                      (i.sldB.style.left =
                        a.padding + a.width + 2 * a.controlBorderWidth + 2 * u + 'px'),
                      (i.sldB.style.top = a.padding + 'px'),
                      (i.sldB.style.border = a.controlBorderWidth + 'px solid'),
                      (i.sldB.style.borderColor = a.controlBorderColor),
                      (i.sldM.style.display = r ? 'block' : 'none'),
                      (i.sldM.style.position = 'absolute'),
                      (i.sldM.style.left =
                        a.padding + a.width + 2 * a.controlBorderWidth + u + 'px'),
                      (i.sldM.style.top = '0px'),
                      (i.sldM.style.width =
                        a.sliderSize +
                        2 * u +
                        2 * a.controlBorderWidth +
                        (s ? 0 : Math.max(0, a.padding - u)) +
                        'px'),
                      (i.sldM.style.height =
                        2 * a.controlBorderWidth + 2 * a.padding + a.height + 'px'),
                      (i.sldM.style.cursor = 'default'),
                      n.setData(i.sldM, { instance: a, control: 'sld' }),
                      (i.sldPtrIB.style.border = i.sldPtrOB.style.border =
                        a.pointerBorderWidth + 'px solid ' + a.pointerBorderColor),
                      (i.sldPtrOB.style.position = 'absolute'),
                      (i.sldPtrOB.style.left =
                        -(2 * a.pointerBorderWidth + a.pointerThickness) + 'px'),
                      (i.sldPtrOB.style.top = '0'),
                      (i.sldPtrMB.style.border = a.pointerThickness + 'px solid ' + a.pointerColor),
                      (i.sldPtrS.style.width = a.sliderSize + 'px'),
                      (i.sldPtrS.style.height = n.pub.sliderInnerSpace + 'px'),
                      (i.asld.style.overflow = 'hidden'),
                      (i.asld.style.width = a.sliderSize + 'px'),
                      (i.asld.style.height = a.height + 'px'),
                      i.asldGrad.draw(a.sliderSize, a.height, '#000'),
                      (i.asldB.style.display = s ? 'block' : 'none'),
                      (i.asldB.style.position = 'absolute'),
                      (i.asldB.style.left =
                        a.padding +
                        a.width +
                        2 * a.controlBorderWidth +
                        u +
                        (r ? a.sliderSize + 3 * u + 2 * a.controlBorderWidth : 0) +
                        'px'),
                      (i.asldB.style.top = a.padding + 'px'),
                      (i.asldB.style.border = a.controlBorderWidth + 'px solid'),
                      (i.asldB.style.borderColor = a.controlBorderColor),
                      (i.asldM.style.display = s ? 'block' : 'none'),
                      (i.asldM.style.position = 'absolute'),
                      (i.asldM.style.left =
                        a.padding +
                        a.width +
                        2 * a.controlBorderWidth +
                        u +
                        (r ? a.sliderSize + 2 * u + 2 * a.controlBorderWidth : 0) +
                        'px'),
                      (i.asldM.style.top = '0px'),
                      (i.asldM.style.width =
                        a.sliderSize +
                        2 * u +
                        2 * a.controlBorderWidth +
                        Math.max(0, a.padding - u) +
                        'px'),
                      (i.asldM.style.height =
                        2 * a.controlBorderWidth + 2 * a.padding + a.height + 'px'),
                      (i.asldM.style.cursor = 'default'),
                      n.setData(i.asldM, { instance: a, control: 'asld' }),
                      (i.asldPtrIB.style.border = i.asldPtrOB.style.border =
                        a.pointerBorderWidth + 'px solid ' + a.pointerBorderColor),
                      (i.asldPtrOB.style.position = 'absolute'),
                      (i.asldPtrOB.style.left =
                        -(2 * a.pointerBorderWidth + a.pointerThickness) + 'px'),
                      (i.asldPtrOB.style.top = '0'),
                      (i.asldPtrMB.style.border =
                        a.pointerThickness + 'px solid ' + a.pointerColor),
                      (i.asldPtrS.style.width = a.sliderSize + 'px'),
                      (i.asldPtrS.style.height = n.pub.sliderInnerSpace + 'px'),
                      (i.pal.className = 'jscolor-palette'),
                      (i.pal.style.display = m.palette.rows ? 'block' : 'none'),
                      (i.pal.style.position = 'absolute'),
                      (i.pal.style.left = a.padding + 'px'),
                      (i.pal.style.top =
                        2 * a.controlBorderWidth + 2 * a.padding + a.height + 'px'),
                      (i.pal.innerHTML = '');
                    for (
                      var g = n.genColorPreviewCanvas('rgba(0,0,0,0)'), f = 0, k = 0;
                      k < m.palette.rows;
                      k++
                    )
                      for (var C = 0; C < m.palette.cols && f < a._palette.length; C++, f++) {
                        var M = a._palette[f],
                          y = n.rgbaColor.apply(null, M.rgba),
                          b = n.createEl('div');
                        (b.style.width = m.palette.cellW - 2 * a.controlBorderWidth + 'px'),
                          (b.style.height = m.palette.cellH - 2 * a.controlBorderWidth + 'px'),
                          (b.style.backgroundColor = y);
                        var G = n.createEl('div');
                        (G.className = 'jscolor-palette-sample'),
                          (G.style.display = 'block'),
                          (G.style.position = 'absolute'),
                          (G.style.left =
                            (m.palette.cols <= 1
                              ? 0
                              : Math.round(
                                  C * ((m.contentW - m.palette.cellW) / (m.palette.cols - 1)) * 10,
                                ) / 10) + 'px'),
                          (G.style.top = k * (m.palette.cellH + a.paletteSpacing) + 'px'),
                          (G.style.border = a.controlBorderWidth + 'px solid'),
                          (G.style.borderColor = a.controlBorderColor),
                          (G.style.cursor = 'pointer'),
                          null !== M.rgba[3] &&
                            M.rgba[3] < 1 &&
                            ((G.style.backgroundImage = "url('" + g.canvas.toDataURL() + "')"),
                            (G.style.backgroundRepeat = 'repeat'),
                            (G.style.backgroundPosition = 'center center')),
                          n.setData(G, { instance: a, control: 'palette-sample', color: M }),
                          G.addEventListener('click', n.onPaletteSampleClick, !1),
                          G.appendChild(b),
                          i.pal.appendChild(G);
                      }
                    (i.btn.className = 'jscolor-btn-close'),
                      (i.btn.style.display = a.closeButton ? 'block' : 'none'),
                      (i.btn.style.position = 'absolute'),
                      (i.btn.style.left = a.padding + 'px'),
                      (i.btn.style.bottom = a.padding + 'px'),
                      (i.btn.style.padding = '0 15px'),
                      (i.btn.style.maxWidth = m.contentW - 2 * a.controlBorderWidth - 30 + 'px'),
                      (i.btn.style.overflow = 'hidden'),
                      (i.btn.style.height = a.buttonHeight + 'px'),
                      (i.btn.style.whiteSpace = 'nowrap'),
                      (i.btn.style.border = a.controlBorderWidth + 'px solid'),
                      (o =
                        (t = a.controlBorderColor.split(/\s+/)).length < 2
                          ? t[0]
                          : t[1] + ' ' + t[0] + ' ' + t[0] + ' ' + t[1]),
                      (i.btn.style.borderColor = o),
                      (i.btn.style.color = a.buttonColor),
                      (i.btn.style.font = '12px sans-serif'),
                      (i.btn.style.textAlign = 'center'),
                      (i.btn.style.cursor = 'pointer'),
                      (i.btn.onmousedown = function () {
                        a.hide();
                      }),
                      (i.btnT.style.lineHeight = a.buttonHeight + 'px'),
                      (i.btnT.innerHTML = ''),
                      i.btnT.appendChild(e.document.createTextNode(a.closeText)),
                      l(),
                      c(),
                      d(),
                      n.picker.owner &&
                        n.picker.owner !== a &&
                        n.removeClass(n.picker.owner.targetElement, n.pub.activeClassName),
                      (n.picker.owner = a),
                      a.container === e.document.body
                        ? n.redrawPosition()
                        : n._drawPosition(a, 0, 0, 'relative', !1),
                      i.wrap.parentNode !== a.container && a.container.appendChild(i.wrap),
                      n.addClass(a.targetElement, n.pub.activeClassName);
                  }
                  function l() {
                    var e = n.getPadYChannel(a),
                      t = Math.round((a.channels.h / 360) * (a.width - 1)),
                      o = Math.round((1 - a.channels[e] / 100) * (a.height - 1)),
                      i = 2 * a.pointerBorderWidth + a.pointerThickness + 2 * a.crossSize,
                      r = -Math.floor(i / 2);
                    switch (
                      ((n.picker.cross.style.left = t + r + 'px'),
                      (n.picker.cross.style.top = o + r + 'px'),
                      n.getSliderChannel(a))
                    ) {
                      case 's':
                        var s = n.HSV_RGB(a.channels.h, 100, a.channels.v),
                          l = n.HSV_RGB(a.channels.h, 0, a.channels.v),
                          c =
                            'rgb(' +
                            Math.round(s[0]) +
                            ',' +
                            Math.round(s[1]) +
                            ',' +
                            Math.round(s[2]) +
                            ')',
                          d =
                            'rgb(' +
                            Math.round(l[0]) +
                            ',' +
                            Math.round(l[1]) +
                            ',' +
                            Math.round(l[2]) +
                            ')';
                        n.picker.sldGrad.draw(a.sliderSize, a.height, c, d);
                        break;
                      case 'v':
                        var m = n.HSV_RGB(a.channels.h, a.channels.s, 100);
                        (c =
                          'rgb(' +
                          Math.round(m[0]) +
                          ',' +
                          Math.round(m[1]) +
                          ',' +
                          Math.round(m[2]) +
                          ')'),
                          (d = '#000'),
                          n.picker.sldGrad.draw(a.sliderSize, a.height, c, d);
                    }
                    n.picker.asldGrad.draw(a.sliderSize, a.height, a.toHEXString());
                  }
                  function c() {
                    var e = n.getSliderChannel(a);
                    if (e) {
                      var t = Math.round((1 - a.channels[e] / 100) * (a.height - 1));
                      n.picker.sldPtrOB.style.top =
                        t -
                        (2 * a.pointerBorderWidth + a.pointerThickness) -
                        Math.floor(n.pub.sliderInnerSpace / 2) +
                        'px';
                    }
                    n.picker.asldGrad.draw(a.sliderSize, a.height, a.toHEXString());
                  }
                  function d() {
                    var e = Math.round((1 - a.channels.a) * (a.height - 1));
                    n.picker.asldPtrOB.style.top =
                      e -
                      (2 * a.pointerBorderWidth + a.pointerThickness) -
                      Math.floor(n.pub.sliderInnerSpace / 2) +
                      'px';
                  }
                  function m() {
                    return n.picker && n.picker.owner === a;
                  }
                  if (
                    (o || (o = {}),
                    (this.channels = { r: 255, g: 255, b: 255, h: 0, s: 0, v: 100, a: 1 }),
                    (this.format = 'auto'),
                    (this.value = void 0),
                    (this.alpha = void 0),
                    (this.random = !1),
                    (this.onChange = void 0),
                    (this.onInput = void 0),
                    (this.valueElement = void 0),
                    (this.alphaElement = void 0),
                    (this.previewElement = void 0),
                    (this.previewPosition = 'left'),
                    (this.previewSize = 32),
                    (this.previewPadding = 8),
                    (this.required = !0),
                    (this.hash = !0),
                    (this.uppercase = !0),
                    (this.forceStyle = !0),
                    (this.width = 181),
                    (this.height = 101),
                    (this.mode = 'HSV'),
                    (this.alphaChannel = 'auto'),
                    (this.position = 'bottom'),
                    (this.smartPosition = !0),
                    (this.showOnClick = !0),
                    (this.hideOnLeave = !0),
                    (this.palette = []),
                    (this.paletteCols = 10),
                    (this.paletteSetsAlpha = 'auto'),
                    (this.paletteHeight = 16),
                    (this.paletteSpacing = 4),
                    (this.hideOnPaletteClick = !1),
                    (this.sliderSize = 16),
                    (this.crossSize = 8),
                    (this.closeButton = !1),
                    (this.closeText = 'Close'),
                    (this.buttonColor = 'rgba(0,0,0,1)'),
                    (this.buttonHeight = 18),
                    (this.padding = 12),
                    (this.backgroundColor = 'rgba(255,255,255,1)'),
                    (this.borderWidth = 1),
                    (this.borderColor = 'rgba(187,187,187,1)'),
                    (this.borderRadius = 8),
                    (this.controlBorderWidth = 1),
                    (this.controlBorderColor = 'rgba(187,187,187,1)'),
                    (this.shadow = !0),
                    (this.shadowBlur = 15),
                    (this.shadowColor = 'rgba(0,0,0,0.2)'),
                    (this.pointerColor = 'rgba(76,76,76,1)'),
                    (this.pointerBorderWidth = 1),
                    (this.pointerBorderColor = 'rgba(255,255,255,1)'),
                    (this.pointerThickness = 2),
                    (this.zIndex = 5e3),
                    (this.container = void 0),
                    (this.minS = 0),
                    (this.maxS = 100),
                    (this.minV = 0),
                    (this.maxV = 100),
                    (this.minA = 0),
                    (this.maxA = 1),
                    (this.option = function () {
                      if (!arguments.length) throw new Error('No option specified');
                      if (1 === arguments.length && 'string' == typeof arguments[0]) {
                        try {
                          return r(arguments[0]);
                        } catch (e) {
                          console.warn(e);
                        }
                        return !1;
                      }
                      if (arguments.length >= 2 && 'string' == typeof arguments[0]) {
                        try {
                          if (!i(arguments[0], arguments[1])) return !1;
                        } catch (e) {
                          return console.warn(e), !1;
                        }
                        return this.redraw(), this.exposeColor(), !0;
                      }
                      if (1 === arguments.length && 'object' == typeof arguments[0]) {
                        var e = arguments[0],
                          t = !0;
                        for (var o in e)
                          if (e.hasOwnProperty(o))
                            try {
                              i(o, e[o]) || (t = !1);
                            } catch (e) {
                              console.warn(e), (t = !1);
                            }
                        return this.redraw(), this.exposeColor(), t;
                      }
                      throw new Error('Invalid arguments');
                    }),
                    (this.channel = function (e, t) {
                      if ('string' != typeof e)
                        throw new Error('Invalid value for channel name: ' + e);
                      if (void 0 === t)
                        return this.channels.hasOwnProperty(e.toLowerCase())
                          ? this.channels[e.toLowerCase()]
                          : (console.warn('Getting unknown channel: ' + e), !1);
                      var o = !1;
                      switch (e.toLowerCase()) {
                        case 'r':
                          o = this.fromRGBA(t, null, null, null);
                          break;
                        case 'g':
                          o = this.fromRGBA(null, t, null, null);
                          break;
                        case 'b':
                          o = this.fromRGBA(null, null, t, null);
                          break;
                        case 'h':
                          o = this.fromHSVA(t, null, null, null);
                          break;
                        case 's':
                          o = this.fromHSVA(null, t, null, null);
                          break;
                        case 'v':
                          o = this.fromHSVA(null, null, t, null);
                          break;
                        case 'a':
                          o = this.fromHSVA(null, null, null, t);
                          break;
                        default:
                          return console.warn('Setting unknown channel: ' + e), !1;
                      }
                      return !!o && (this.redraw(), !0);
                    }),
                    (this.trigger = function (e) {
                      for (var t = n.strList(e), o = 0; o < t.length; o += 1) {
                        var a = t[o].toLowerCase(),
                          i = null;
                        switch (a) {
                          case 'input':
                            i = 'onInput';
                            break;
                          case 'change':
                            i = 'onChange';
                        }
                        i && n.triggerCallback(this, i),
                          n.triggerInputEvent(this.valueElement, a, !0, !0);
                      }
                    }),
                    (this.fromHSVA = function (e, t, o, a, i) {
                      if (
                        (void 0 === e && (e = null),
                        void 0 === t && (t = null),
                        void 0 === o && (o = null),
                        void 0 === a && (a = null),
                        null !== e)
                      ) {
                        if (isNaN(e)) return !1;
                        this.channels.h = Math.max(0, Math.min(360, e));
                      }
                      if (null !== t) {
                        if (isNaN(t)) return !1;
                        this.channels.s = Math.max(0, Math.min(100, this.maxS, t), this.minS);
                      }
                      if (null !== o) {
                        if (isNaN(o)) return !1;
                        this.channels.v = Math.max(0, Math.min(100, this.maxV, o), this.minV);
                      }
                      if (null !== a) {
                        if (isNaN(a)) return !1;
                        this.channels.a = this.hasAlphaChannel()
                          ? Math.max(0, Math.min(1, this.maxA, a), this.minA)
                          : 1;
                      }
                      var r = n.HSV_RGB(this.channels.h, this.channels.s, this.channels.v);
                      return (
                        (this.channels.r = r[0]),
                        (this.channels.g = r[1]),
                        (this.channels.b = r[2]),
                        this.exposeColor(i),
                        !0
                      );
                    }),
                    (this.fromRGBA = function (e, t, o, a, i) {
                      if (
                        (void 0 === e && (e = null),
                        void 0 === t && (t = null),
                        void 0 === o && (o = null),
                        void 0 === a && (a = null),
                        null !== e)
                      ) {
                        if (isNaN(e)) return !1;
                        e = Math.max(0, Math.min(255, e));
                      }
                      if (null !== t) {
                        if (isNaN(t)) return !1;
                        t = Math.max(0, Math.min(255, t));
                      }
                      if (null !== o) {
                        if (isNaN(o)) return !1;
                        o = Math.max(0, Math.min(255, o));
                      }
                      if (null !== a) {
                        if (isNaN(a)) return !1;
                        this.channels.a = this.hasAlphaChannel()
                          ? Math.max(0, Math.min(1, this.maxA, a), this.minA)
                          : 1;
                      }
                      var r = n.RGB_HSV(
                        null === e ? this.channels.r : e,
                        null === t ? this.channels.g : t,
                        null === o ? this.channels.b : o,
                      );
                      null !== r[0] && (this.channels.h = Math.max(0, Math.min(360, r[0]))),
                        0 !== r[2] &&
                          (this.channels.s = Math.max(
                            0,
                            this.minS,
                            Math.min(100, this.maxS, r[1]),
                          )),
                        (this.channels.v = Math.max(0, this.minV, Math.min(100, this.maxV, r[2])));
                      var s = n.HSV_RGB(this.channels.h, this.channels.s, this.channels.v);
                      return (
                        (this.channels.r = s[0]),
                        (this.channels.g = s[1]),
                        (this.channels.b = s[2]),
                        this.exposeColor(i),
                        !0
                      );
                    }),
                    (this.fromHSV = function (e, t, o, a) {
                      return (
                        console.warn(
                          'fromHSV() method is DEPRECATED. Using fromHSVA() instead.' + n.docsRef,
                        ),
                        this.fromHSVA(e, t, o, null, a)
                      );
                    }),
                    (this.fromRGB = function (e, t, o, a) {
                      return (
                        console.warn(
                          'fromRGB() method is DEPRECATED. Using fromRGBA() instead.' + n.docsRef,
                        ),
                        this.fromRGBA(e, t, o, null, a)
                      );
                    }),
                    (this.fromString = function (e, t) {
                      if (!this.required && '' === e.trim())
                        return this.setPreviewElementBg(null), this.setValueElementValue(''), !0;
                      var o = n.parseColorString(e);
                      return (
                        !!o &&
                        ('any' === this.format.toLowerCase() &&
                          (this._setFormat(o.format),
                          n.isAlphaFormat(this.getFormat()) || (o.rgba[3] = 1)),
                        this.fromRGBA(o.rgba[0], o.rgba[1], o.rgba[2], o.rgba[3], t),
                        !0)
                      );
                    }),
                    (this.randomize = function (e, t, o, a, n, i, r, s) {
                      void 0 === e && (e = 0),
                        void 0 === t && (t = 100),
                        void 0 === o && (o = 0),
                        void 0 === a && (a = 100),
                        void 0 === n && (n = 0),
                        void 0 === i && (i = 359),
                        void 0 === r && (r = 1),
                        void 0 === s && (s = 1),
                        this.fromHSVA(
                          n + Math.floor(Math.random() * (i - n + 1)),
                          o + Math.floor(Math.random() * (a - o + 1)),
                          e + Math.floor(Math.random() * (t - e + 1)),
                          (100 * r + Math.floor(Math.random() * (100 * (s - r) + 1))) / 100,
                        );
                    }),
                    (this.toString = function (e) {
                      switch ((void 0 === e && (e = this.getFormat()), e.toLowerCase())) {
                        case 'hex':
                          return this.toHEXString();
                        case 'hexa':
                          return this.toHEXAString();
                        case 'rgb':
                          return this.toRGBString();
                        case 'rgba':
                          return this.toRGBAString();
                      }
                      return !1;
                    }),
                    (this.toHEXString = function () {
                      return n.hexColor(this.channels.r, this.channels.g, this.channels.b);
                    }),
                    (this.toHEXAString = function () {
                      return n.hexaColor(
                        this.channels.r,
                        this.channels.g,
                        this.channels.b,
                        this.channels.a,
                      );
                    }),
                    (this.toRGBString = function () {
                      return n.rgbColor(this.channels.r, this.channels.g, this.channels.b);
                    }),
                    (this.toRGBAString = function () {
                      return n.rgbaColor(
                        this.channels.r,
                        this.channels.g,
                        this.channels.b,
                        this.channels.a,
                      );
                    }),
                    (this.toGrayscale = function () {
                      return (
                        0.213 * this.channels.r + 0.715 * this.channels.g + 0.072 * this.channels.b
                      );
                    }),
                    (this.toCanvas = function () {
                      return n.genColorPreviewCanvas(this.toRGBAString()).canvas;
                    }),
                    (this.toDataURL = function () {
                      return this.toCanvas().toDataURL();
                    }),
                    (this.toBackground = function () {
                      return n.pub.background(this.toRGBAString());
                    }),
                    (this.isLight = function () {
                      return this.toGrayscale() > 127.5;
                    }),
                    (this.hide = function () {
                      m() &&
                        (n.removeClass(a.targetElement, n.pub.activeClassName),
                        n.picker.wrap.parentNode.removeChild(n.picker.wrap),
                        delete n.picker.owner);
                    }),
                    (this.show = function () {
                      s();
                    }),
                    (this.redraw = function () {
                      m() && s();
                    }),
                    (this.getFormat = function () {
                      return this._currentFormat;
                    }),
                    (this._setFormat = function (e) {
                      this._currentFormat = e.toLowerCase();
                    }),
                    (this.hasAlphaChannel = function () {
                      return 'auto' === this.alphaChannel
                        ? 'any' === this.format.toLowerCase() ||
                            n.isAlphaFormat(this.getFormat()) ||
                            void 0 !== this.alpha ||
                            void 0 !== this.alphaElement
                        : this.alphaChannel;
                    }),
                    (this.processValueInput = function (e) {
                      this.fromString(e) || this.exposeColor();
                    }),
                    (this.processAlphaInput = function (e) {
                      this.fromHSVA(null, null, null, parseFloat(e)) || this.exposeColor();
                    }),
                    (this.exposeColor = function (e) {
                      var t = this.toString(),
                        o = this.getFormat();
                      if (
                        (n.setDataAttr(this.targetElement, 'current-color', t),
                        e & n.flags.leaveValue ||
                          !this.valueElement ||
                          (('hex' !== o && 'hexa' !== o) ||
                            (this.uppercase || (t = t.toLowerCase()),
                            this.hash || (t = t.replace(/^#/, ''))),
                          this.setValueElementValue(t)),
                        !(e & n.flags.leaveAlpha) && this.alphaElement)
                      ) {
                        var a = Math.round(100 * this.channels.a) / 100;
                        this.setAlphaElementValue(a);
                      }
                      e & n.flags.leavePreview ||
                        !this.previewElement ||
                        ((n.isTextInput(this.previewElement) ||
                          (n.isButton(this.previewElement) &&
                            !n.isButtonEmpty(this.previewElement))) &&
                          this.previewPosition,
                        this.setPreviewElementBg(this.toRGBAString())),
                        m() && (l(), c(), d());
                    }),
                    (this.setPreviewElementBg = function (e) {
                      if (this.previewElement) {
                        var t = null,
                          o = null;
                        (n.isTextInput(this.previewElement) ||
                          (n.isButton(this.previewElement) &&
                            !n.isButtonEmpty(this.previewElement))) &&
                          ((t = this.previewPosition), (o = this.previewSize));
                        var a = [];
                        if (e) {
                          a.push({
                            image: n.genColorPreviewGradient(
                              e,
                              t,
                              o ? o - n.pub.previewSeparator.length : null,
                            ),
                            position: 'left top',
                            size: 'auto',
                            repeat: t ? 'repeat-y' : 'repeat',
                            origin: 'padding-box',
                          });
                          var i = n.genColorPreviewCanvas(
                            'rgba(0,0,0,0)',
                            t ? { left: 'right', right: 'left' }[t] : null,
                            o,
                            !0,
                          );
                          a.push({
                            image: "url('" + i.canvas.toDataURL() + "')",
                            position: (t || 'left') + ' top',
                            size: i.width + 'px ' + i.height + 'px',
                            repeat: t ? 'repeat-y' : 'repeat',
                            origin: 'padding-box',
                          });
                        } else
                          a.push({
                            image: 'none',
                            position: 'left top',
                            size: 'auto',
                            repeat: 'no-repeat',
                            origin: 'padding-box',
                          });
                        for (
                          var r = { image: [], position: [], size: [], repeat: [], origin: [] },
                            s = 0;
                          s < a.length;
                          s += 1
                        )
                          r.image.push(a[s].image),
                            r.position.push(a[s].position),
                            r.size.push(a[s].size),
                            r.repeat.push(a[s].repeat),
                            r.origin.push(a[s].origin);
                        var l = {
                          'background-image': r.image.join(', '),
                          'background-position': r.position.join(', '),
                          'background-size': r.size.join(', '),
                          'background-repeat': r.repeat.join(', '),
                          'background-origin': r.origin.join(', '),
                        };
                        n.setStyle(this.previewElement, l, this.forceStyle);
                        var c = { left: null, right: null };
                        t && (c[t] = this.previewSize + this.previewPadding + 'px'),
                          (l = { 'padding-left': c.left, 'padding-right': c.right }),
                          n.setStyle(this.previewElement, l, this.forceStyle, !0);
                      }
                    }),
                    (this.setValueElementValue = function (e) {
                      this.valueElement &&
                        ('input' === n.nodeName(this.valueElement)
                          ? (this.valueElement.value = e)
                          : (this.valueElement.innerHTML = e));
                    }),
                    (this.setAlphaElementValue = function (e) {
                      this.alphaElement &&
                        ('input' === n.nodeName(this.alphaElement)
                          ? (this.alphaElement.value = e)
                          : (this.alphaElement.innerHTML = e));
                    }),
                    (this._processParentElementsInDOM = function () {
                      if (!this._parentElementsProcessed) {
                        this._parentElementsProcessed = !0;
                        var e = this.targetElement;
                        do {
                          var t = n.getCompStyle(e);
                          t.position && 'fixed' === t.position.toLowerCase() && (this.fixed = !0),
                            e !== this.targetElement &&
                              (n.getData(e, 'hasScrollListener') ||
                                (e.addEventListener('scroll', n.onParentScroll, !1),
                                n.setData(e, 'hasScrollListener', !0)));
                        } while ((e = e.parentNode) && 'body' !== n.nodeName(e));
                      }
                    }),
                    (this.tryHide = function () {
                      this.hideOnLeave && this.hide();
                    }),
                    (this.set__palette = function (e) {
                      (this.palette = e),
                        (this._palette = n.parsePaletteValue(e)),
                        (this._paletteHasTransparency = n.containsTranparentColor(this._palette));
                    }),
                    n.pub.options)
                  )
                    for (var p in n.pub.options)
                      if (n.pub.options.hasOwnProperty(p))
                        try {
                          i(p, n.pub.options[p]);
                        } catch (e) {
                          console.warn(e);
                        }
                  var u = [];
                  o.preset &&
                    ('string' == typeof o.preset
                      ? (u = o.preset.split(/\s+/))
                      : Array.isArray(o.preset)
                      ? (u = o.preset.slice())
                      : console.warn('Unrecognized preset value')),
                    -1 === u.indexOf('default') && u.push('default');
                  for (var h = u.length - 1; h >= 0; h -= 1) {
                    var g = u[h];
                    if (g)
                      if (n.pub.presets.hasOwnProperty(g)) {
                        for (var p in n.pub.presets[g])
                          if (n.pub.presets[g].hasOwnProperty(p))
                            try {
                              i(p, n.pub.presets[g][p]);
                            } catch (e) {
                              console.warn(e);
                            }
                      } else console.warn('Unknown preset: %s', g);
                  }
                  var f = ['preset'];
                  for (var p in o)
                    if (o.hasOwnProperty(p) && -1 === f.indexOf(p))
                      try {
                        i(p, o[p]);
                      } catch (e) {
                        console.warn(e);
                      }
                  if (
                    (void 0 === this.container
                      ? (this.container = e.document.body)
                      : (this.container = n.node(this.container)),
                    !this.container)
                  )
                    throw new Error('Cannot instantiate color picker without a container element');
                  if (((this.targetElement = n.node(t)), !this.targetElement)) {
                    if ('string' == typeof t && /^[a-zA-Z][\w:.-]*$/.test(t))
                      throw new Error(
                        "If '" +
                          t +
                          "' is supposed to be an ID, please use '#" +
                          t +
                          "' or any valid CSS selector.",
                      );
                    throw new Error('Cannot instantiate color picker without a target element');
                  }
                  if (this.targetElement.jscolor && this.targetElement.jscolor instanceof n.pub)
                    throw new Error('Color picker already installed on this element');
                  if (
                    ((this.targetElement.jscolor = this),
                    n.addClass(this.targetElement, n.pub.className),
                    n.instances.push(this),
                    n.isButton(this.targetElement) &&
                      ('button' !== this.targetElement.type.toLowerCase() &&
                        (this.targetElement.type = 'button'),
                      n.isButtonEmpty(this.targetElement)))
                  ) {
                    n.removeChildren(this.targetElement),
                      this.targetElement.appendChild(e.document.createTextNode(' '));
                    var k = n.getCompStyle(this.targetElement);
                    (parseFloat(k['min-width']) || 0) < this.previewSize &&
                      n.setStyle(
                        this.targetElement,
                        { 'min-width': this.previewSize + 'px' },
                        this.forceStyle,
                      );
                  }
                  if (
                    (void 0 === this.valueElement
                      ? n.isTextInput(this.targetElement) &&
                        (this.valueElement = this.targetElement)
                      : null === this.valueElement ||
                        (this.valueElement = n.node(this.valueElement)),
                    this.alphaElement && (this.alphaElement = n.node(this.alphaElement)),
                    void 0 === this.previewElement
                      ? (this.previewElement = this.targetElement)
                      : null === this.previewElement ||
                        (this.previewElement = n.node(this.previewElement)),
                    this.valueElement && n.isTextInput(this.valueElement))
                  ) {
                    var C = { onInput: this.valueElement.oninput };
                    (this.valueElement.oninput = null),
                      this.valueElement.addEventListener(
                        'keydown',
                        function (e) {
                          'Enter' === n.eventKey(e) &&
                            (a.valueElement && a.processValueInput(a.valueElement.value),
                            a.tryHide());
                        },
                        !1,
                      ),
                      this.valueElement.addEventListener(
                        'change',
                        function (e) {
                          if (!n.getData(e, 'internal')) {
                            var t = a.valueElement.value;
                            a.processValueInput(a.valueElement.value),
                              n.triggerCallback(a, 'onChange'),
                              a.valueElement.value !== t &&
                                n.triggerInputEvent(a.valueElement, 'change', !0, !0);
                          }
                        },
                        !1,
                      ),
                      this.valueElement.addEventListener(
                        'input',
                        function (e) {
                          n.getData(e, 'internal') ||
                            (a.valueElement &&
                              a.fromString(a.valueElement.value, n.flags.leaveValue),
                            n.triggerCallback(a, 'onInput'));
                        },
                        !1,
                      ),
                      C.onInput && this.valueElement.addEventListener('input', C.onInput, !1),
                      this.valueElement.setAttribute('autocomplete', 'off'),
                      this.valueElement.setAttribute('autocorrect', 'off'),
                      this.valueElement.setAttribute('autocapitalize', 'off'),
                      this.valueElement.setAttribute('spellcheck', !1);
                  }
                  this.alphaElement &&
                    n.isTextInput(this.alphaElement) &&
                    (this.alphaElement.addEventListener(
                      'keydown',
                      function (e) {
                        'Enter' === n.eventKey(e) &&
                          (a.alphaElement && a.processAlphaInput(a.alphaElement.value),
                          a.tryHide());
                      },
                      !1,
                    ),
                    this.alphaElement.addEventListener(
                      'change',
                      function (e) {
                        if (!n.getData(e, 'internal')) {
                          var t = a.alphaElement.value;
                          a.processAlphaInput(a.alphaElement.value),
                            n.triggerCallback(a, 'onChange'),
                            n.triggerInputEvent(a.valueElement, 'change', !0, !0),
                            a.alphaElement.value !== t &&
                              n.triggerInputEvent(a.alphaElement, 'change', !0, !0);
                        }
                      },
                      !1,
                    ),
                    this.alphaElement.addEventListener(
                      'input',
                      function (e) {
                        n.getData(e, 'internal') ||
                          (a.alphaElement &&
                            a.fromHSVA(
                              null,
                              null,
                              null,
                              parseFloat(a.alphaElement.value),
                              n.flags.leaveAlpha,
                            ),
                          n.triggerCallback(a, 'onInput'),
                          n.triggerInputEvent(a.valueElement, 'input', !0, !0));
                      },
                      !1,
                    ),
                    this.alphaElement.setAttribute('autocomplete', 'off'),
                    this.alphaElement.setAttribute('autocorrect', 'off'),
                    this.alphaElement.setAttribute('autocapitalize', 'off'),
                    this.alphaElement.setAttribute('spellcheck', !1));
                  var M = 'FFFFFF';
                  void 0 !== this.value
                    ? (M = this.value)
                    : this.valueElement &&
                      void 0 !== this.valueElement.value &&
                      (M = this.valueElement.value);
                  var y = void 0;
                  if (
                    (void 0 !== this.alpha
                      ? (y = '' + this.alpha)
                      : this.alphaElement &&
                        void 0 !== this.alphaElement.value &&
                        (y = this.alphaElement.value),
                    (this._currentFormat = null),
                    ['auto', 'any'].indexOf(this.format.toLowerCase()) > -1)
                  ) {
                    var b = n.parseColorString(M);
                    this._currentFormat = b ? b.format : 'hex';
                  } else this._currentFormat = this.format.toLowerCase();
                  this.processValueInput(M),
                    void 0 !== y && this.processAlphaInput(y),
                    this.random &&
                      this.randomize.apply(this, Array.isArray(this.random) ? this.random : []);
                },
              }),
              (n.pub.className = 'jscolor'),
              (n.pub.activeClassName = 'jscolor-active'),
              (n.pub.looseJSON = !0),
              (n.pub.presets = {}),
              (n.pub.presets.default = {}),
              (n.pub.presets.light = {
                backgroundColor: 'rgba(255,255,255,1)',
                controlBorderColor: 'rgba(187,187,187,1)',
                buttonColor: 'rgba(0,0,0,1)',
              }),
              (n.pub.presets.dark = {
                backgroundColor: 'rgba(51,51,51,1)',
                controlBorderColor: 'rgba(153,153,153,1)',
                buttonColor: 'rgba(240,240,240,1)',
              }),
              (n.pub.presets.small = {
                width: 101,
                height: 101,
                padding: 10,
                sliderSize: 14,
                paletteCols: 8,
              }),
              (n.pub.presets.medium = {
                width: 181,
                height: 101,
                padding: 12,
                sliderSize: 16,
                paletteCols: 10,
              }),
              (n.pub.presets.large = {
                width: 271,
                height: 151,
                padding: 12,
                sliderSize: 24,
                paletteCols: 15,
              }),
              (n.pub.presets.thin = {
                borderWidth: 1,
                controlBorderWidth: 1,
                pointerBorderWidth: 1,
              }),
              (n.pub.presets.thick = {
                borderWidth: 2,
                controlBorderWidth: 2,
                pointerBorderWidth: 2,
              }),
              (n.pub.sliderInnerSpace = 3),
              (n.pub.chessboardSize = 8),
              (n.pub.chessboardColor1 = '#666666'),
              (n.pub.chessboardColor2 = '#999999'),
              (n.pub.previewSeparator = ['rgba(255,255,255,.65)', 'rgba(128,128,128,.65)']),
              (n.pub.init = function () {
                if (!n.initialized)
                  for (
                    e.document.addEventListener('mousedown', n.onDocumentMouseDown, !1),
                      e.document.addEventListener('keyup', n.onDocumentKeyUp, !1),
                      e.addEventListener('resize', n.onWindowResize, !1),
                      e.addEventListener('scroll', n.onWindowScroll, !1),
                      n.pub.install(),
                      n.initialized = !0;
                    n.readyQueue.length;

                  )
                    n.readyQueue.shift()();
              }),
              (n.pub.install = function (e) {
                var t = !0;
                try {
                  n.installBySelector('[data-jscolor]', e);
                } catch (e) {
                  (t = !1), console.warn(e);
                }
                if (n.pub.lookupClass)
                  try {
                    n.installBySelector(
                      'input.' + n.pub.lookupClass + ', button.' + n.pub.lookupClass,
                      e,
                    );
                  } catch (e) {}
                return t;
              }),
              (n.pub.ready = function (e) {
                return 'function' != typeof e
                  ? (console.warn('Passed value is not a function'), !1)
                  : (n.initialized ? e() : n.readyQueue.push(e), !0);
              }),
              (n.pub.trigger = function (e) {
                var t = function () {
                  n.triggerGlobal(e);
                };
                n.initialized ? t() : n.pub.ready(t);
              }),
              (n.pub.hide = function () {
                n.picker && n.picker.owner && n.picker.owner.hide();
              }),
              (n.pub.chessboard = function (e) {
                return e || (e = 'rgba(0,0,0,0)'), n.genColorPreviewCanvas(e).canvas.toDataURL();
              }),
              (n.pub.background = function (e) {
                var t = [];
                t.push(n.genColorPreviewGradient(e));
                var o = n.genColorPreviewCanvas();
                return (
                  t.push(["url('" + o.canvas.toDataURL() + "')", 'left top', 'repeat'].join(' ')),
                  t.join(', ')
                );
              }),
              (n.pub.options = {}),
              (n.pub.lookupClass = 'jscolor'),
              (n.pub.installByClassName = function () {
                return (
                  console.error(
                    'jscolor.installByClassName() is DEPRECATED. Use data-jscolor="" attribute instead of a class name.' +
                      n.docsRef,
                  ),
                  !1
                );
              }),
              n.register(),
              n.pub);
          return void 0 === e.jscolor && (e.jscolor = e.JSColor = i), i;
        });
      },
    },
    t = {};
  function o(a) {
    var n = t[a];
    if (void 0 !== n) return n.exports;
    var i = (t[a] = { exports: {} });
    return e[a].call(i.exports, i, i.exports, o), i.exports;
  }
  (o.n = (e) => {
    var t = e && e.__esModule ? () => e.default : () => e;
    return o.d(t, { a: t }), t;
  }),
    (o.d = (e, t) => {
      for (var a in t)
        o.o(t, a) && !o.o(e, a) && Object.defineProperty(e, a, { enumerable: !0, get: t[a] });
    }),
    (o.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
    (() => {
      'use strict';
      class e {
        constructor(e, t, o) {
          (this.defaultValue = e), (this.type = t), (this.group = o);
        }
      }
      function t(e, t) {
        (Game.promptWrapL.className = 'framed'),
          (Game.promptL.innerHTML = `${e}<div class="optionBox"></div>`),
          Object.keys(t).forEach((e) => {
            const o = document.createElement('a');
            (o.id = `promptOption${e}`),
              (o.className = 'option'),
              (o.onclick = function () {
                PlaySound('snd/tick.mp3'), t[e][1]();
              }),
              (o.textContent = t[e][0]),
              Game.promptL.children[1].appendChild(o);
          }),
          (Game.promptAnchorL.style.display = 'block'),
          (Game.darkenL.style.display = 'block'),
          Game.promptL.focus(),
          (Game.promptOn = 1),
          Game.UpdatePrompt();
      }
      function a(e, t, o, n) {
        ((1 === Game.mods.cookieMonsterFramework.saveData[e].settings[o] || n) &&
          3 === t &&
          !1 === window.cookieMonsterFrameworkData.isInitializing) ||
        1 === t
          ? ((l('CMFlashScreen').style.backgroundColor =
              Game.mods.cookieMonsterFramework.saveData[e].settings[`Colour${o}`]),
            (l('CMFlashScreen').style.opacity = '0.5'),
            3 === t
              ? ((l('CMFlashScreen').style.display = 'inline'),
                setTimeout(() => {
                  a(e, 2, o, !0);
                }, 1e3 / Game.fps))
              : setTimeout(() => {
                  a(e, 0, o, !0);
                }, 1e3 / Game.fps))
          : 2 === t
          ? ((l('CMFlashScreen').style.opacity = '1'),
            setTimeout(() => {
              a(e, 1, o, !0);
            }, 1e3 / Game.fps))
          : 0 === t && (l('CMFlashScreen').style.display = 'none');
      }
      function n() {
        Object.keys(Game.mods.cookieMonsterFramework.saveData).forEach((e) => {
          const t = JSON.stringify(Game.mods.cookieMonsterFramework.saveData[e]),
            o = b64_to_utf8(unescape(localStorage.getItem('CookieClickerGame')).split('!END!')[0]),
            a = new RegExp(`${e}.*(;|$)`),
            n = o.match(a);
          if (null !== n) {
            const a = o.replace(n[0], `${e}:${t}`);
            localStorage.setItem('CookieClickerGame', escape(`${utf8_to_b64(a)}!END!`));
          }
        });
      }
      function i(e, t) {
        void 0 === Game.mods.cookieMonsterFramework.saveData[e].headers[t] &&
          (Game.mods.cookieMonsterFramework.saveData[e].headers[t] = 1),
          0 === Game.mods.cookieMonsterFramework.saveData[e].headers[t]
            ? (Game.mods.cookieMonsterFramework.saveData[e].headers[t] = 1)
            : (Game.mods.cookieMonsterFramework.saveData[e].headers[t] = 0),
          n();
      }
      var r = o(877),
        s = o.n(r);
      function c(e, t, o, a, n) {
        if (
          (1 === Game.mods.cookieMonsterFramework.saveData[e].settings[o] || n) &&
          !1 === window.cookieMonsterFrameworkData.isInitializing
        ) {
          const o = new Audio(t);
          Game.mods.cookieMonsterFramework.saveData[e].settings.GeneralSound
            ? (o.volume =
                (Game.mods.cookieMonsterFramework.saveData[e].settings[a] / 100) *
                (Game.volume / 100))
            : (o.volume = Game.mods.cookieMonsterFramework.saveData[e].settings[a] / 100),
            o.play();
        }
      }
      function d(e, t) {
        null !== l(`slider${e}${t}`) &&
          ((l(`slider${e}${t}right`).innerHTML = `${l(`slider${e}${t}`).value}%`),
          (Game.mods.cookieMonsterFramework.saveData[e].settings[t] = Math.round(
            l(`slider${e}${t}`).value,
          ))),
          n();
      }
      function m(e, t) {
        t.disconnect(),
          'log' === Game.onMenu
            ? (function () {
                const e = l('menu').children[1];
                if (
                  (e.insertBefore(
                    (function () {
                      const e = document.createElement('div');
                      (e.className = 'subsection'), (e.id = 'cookieMonsterFrameworkMenuSection');
                      const t = document.createElement('div');
                      (t.className = 'title'), (t.innerHTML = 'Cookie Monster Mod Family');
                      const o = document.createElement('span');
                      if (
                        ((o.style.cursor = 'pointer'),
                        (o.style.display = 'inline-block'),
                        (o.style.height = '14px'),
                        (o.style.width = '14px'),
                        (o.style.borderRadius = '7px'),
                        (o.style.textAlign = 'center'),
                        (o.style.backgroundColor = '#C0C0C0'),
                        (o.style.color = 'black'),
                        (o.style.fontSize = '13px'),
                        (o.style.verticalAlign = 'middle'),
                        (o.textContent = Game.mods.cookieMonsterFramework.saveData
                          .cookieMonsterFramework.headers.infoMenu
                          ? '-'
                          : '+'),
                        (o.onclick = function () {
                          i('cookieMonsterFramework', 'infoMenu'), Game.UpdateMenu();
                        }),
                        t.appendChild(o),
                        e.appendChild(t),
                        Game.mods.cookieMonsterFramework.saveData.cookieMonsterFramework.headers
                          .infoMenu)
                      ) {
                        const t = document.createElement('div');
                        (t.className = 'listing'),
                          (t.innerHTML =
                            '<a href="https://github.com/CookieMonsterTeam" target="blank">Cookie Monster Team</a>\noffers a suite of tools to enhance your game experience.</br>\nOriginally known from our work on the Cookie Monster add-on we are now expanding and working on new tools within the Cookie Monster Mod Family.</br>\nKeep an eye on our GitHub to see future work or use it to report bugs or feature requests!</br>\n'),
                          e.appendChild(t);
                      }
                      return e;
                    })(),
                    e.children[1],
                  ),
                  Game.mods.cookieMonsterFramework.saveData.cookieMonsterFramework.headers.infoMenu)
                ) {
                  const e = Game.mods.cookieMonsterFramework.listeners.infoMenu;
                  for (let t = 0; t < e.length; t++)
                    l('cookieMonsterFrameworkMenuSection').appendChild(e[t]());
                }
              })()
            : Game.onMenu,
          t.observe(document.getElementById('menu'), {
            attributes: !0,
            childList: !0,
            subtree: !0,
          });
      }
      function p() {}
      const u = { infoMenu: 1, optionsMenu: 1 };
      function h(e, t, o, a, i) {
        const r = JSON.parse(t);
        (Game.mods.cookieMonsterFramework.saveData[e] = (function (e, t, o) {
          const a = {},
            n = {};
          Object.keys(t).forEach((o) => {
            void 0 === e.settings || void 0 === e.settings[o]
              ? (n[o] = t[o].defaultValue)
              : (n[o] = e.settings[o]);
          }),
            (a.settings = n);
          const i = {};
          return (
            Object.keys(o).forEach((t) => {
              void 0 === e.headers || void 0 === e.headers[t]
                ? (i[t] = o[t])
                : (i[t] = e.headers[t]);
            }),
            (a.headers = i),
            Object.keys(e).forEach((t) => {
              'settings' !== t && 'headers' !== t && (a[t] = e[t]);
            }),
            void 0 === a.favouriteSettings && (a.favouriteSettings = []),
            a
          );
        })(r, o, a)),
          n(),
          i(),
          Object.keys(Game.mods.cookieMonsterFramework.saveData[e].settings).forEach((e) => {
            void 0 !== o[e].func && o[e].func();
          }),
          Game.UpdateMenu();
      }
      function g() {}
      const f = {};
      function k(e) {
        h('cookieMonsterFramework', e, f, u, g);
      }
      const C = {
          init: function () {
            (window.cookieMonsterFrameworkData = { isInitializing: !0 }),
              new MutationObserver(m).observe(document.getElementById('menu'), {
                attributes: !0,
                childList: !0,
                subtree: !0,
              }),
              (function () {
                const e = document.createElement('div');
                (e.id = 'CMFlashScreen'),
                  (e.style.width = '100%'),
                  (e.style.height = '100%'),
                  (e.style.backgroundColor = 'white'),
                  (e.style.display = 'none'),
                  (e.style.zIndex = '9999999999'),
                  (e.style.position = 'absolute'),
                  (e.style.pointerEvents = 'none'),
                  l('wrapper').appendChild(e);
              })(),
              Game.registerHook('draw', p),
              void 0 === Game.modSaveData.cookieMonsterFramework && k('{}'),
              (window.cookieMonsterFrameworkData.isInitializing = !1);
          },
          load: k,
          save: function () {
            return JSON.stringify(Game.mods.cookieMonsterFramework.saveData.cookieMonsterFramework);
          },
          listeners: { infoMenu: [], optionsMenu: [] },
          saveData: { cookieMonsterFramework: { headers: {}, settings: {} } },
        },
        M = function () {
          'undefined' == typeof cookieMonsterFrameworkData &&
            Game.registerMod('cookieMonsterFramework', C);
        },
        y = function (e) {
          Game.mods.cookieMonsterFramework.saveData[e] = {
            favouriteSettings: [],
            headers: {},
            settings: {},
          };
        },
        b = {
          createInfoListing: function (e) {
            const t = document.createElement('div');
            return (t.className = 'listing'), (t.innerHTML = e), t;
          },
          createOptionsListing: function (e, o, i, m, p) {
            const u = document.createElement('div');
            if (
              ((u.className = 'listing'),
              1 === Game.mods.cookieMonsterFramework.saveData[e].settings.FavouriteSettings &&
                u.appendChild(
                  (function (e, t, o) {
                    const a = document.createElement('a');
                    return (
                      o.includes(t)
                        ? ((a.innerText = '★'), (a.style.color = 'yellow'))
                        : (a.innerText = '☆'),
                      (a.className = 'option'),
                      (a.onclick = function () {
                        !(function (e, t) {
                          Game.mods.cookieMonsterFramework.saveData[e].favouriteSettings.includes(t)
                            ? (Game.mods.cookieMonsterFramework.saveData[e].favouriteSettings =
                                Game.mods.cookieMonsterFramework.saveData[
                                  e
                                ].favouriteSettings.filter((e) => e !== t))
                            : Game.mods.cookieMonsterFramework.saveData[e].favouriteSettings.push(
                                t,
                              ),
                            n();
                        })(e, t),
                          n(),
                          Game.UpdateMenu();
                      }),
                      (a.onmouseover = function () {
                        Game.tooltip.draw(
                          this,
                          escape(
                            '<div style="min-width: 250px; margin-bottom: 4px;"><div style="text-align: left;">Click to set this setting as favourite and show it in \'favourite\' settings at the top of the Cookie Monster Settings</div></div>',
                          ),
                        );
                      }),
                      (a.onmouseout = function () {
                        Game.tooltip.hide();
                      }),
                      a.appendChild(document.createTextNode(' ')),
                      a
                    );
                  })(e, o, Game.mods.cookieMonsterFramework.saveData[e].favouriteSettings),
                ),
              'bool' === i[o].type)
            ) {
              const t = document.createElement('a');
              i[o].toggle && 0 === Game.mods.cookieMonsterFramework.saveData[e].settings[o]
                ? (t.className = 'option off')
                : (t.className = 'option'),
                (t.id = `${e}Options${o}`),
                (t.onclick = function () {
                  !(function (e, t, o) {
                    (Game.mods.cookieMonsterFramework.saveData[e].settings[t] += 1),
                      Game.mods.cookieMonsterFramework.saveData[e].settings[t] === o[t].label.length
                        ? ((Game.mods.cookieMonsterFramework.saveData[e].settings[t] = 0),
                          o[t].toggle && (l(`${e}Options${t}`).className = 'option off'))
                        : (l(`${e}Options${t}`).className = 'option'),
                      void 0 !== o[t].func && o[t].func(),
                      n();
                  })(e, o, i),
                    Game.UpdateMenu();
                }),
                (t.textContent =
                  i[o].label[Game.mods.cookieMonsterFramework.saveData[e].settings[o]]),
                u.appendChild(t);
              const a = document.createElement('label');
              return (a.textContent = i[o].desc), (a.style.lineHeight = '1.6'), u.appendChild(a), u;
            }
            if ('vol' === i[o].type) {
              const t = document.createElement('div');
              t.className = 'sliderBox';
              const a = document.createElement('div');
              (a.style.float = 'left'), (a.innerHTML = i[o].desc), t.appendChild(a);
              const n = document.createElement('div');
              (n.id = `slider${e}${o}right`),
                (n.style.float = 'right'),
                (n.innerHTML = `${Game.mods.cookieMonsterFramework.saveData[e].settings[o]}%`),
                t.appendChild(n);
              const r = document.createElement('input');
              (r.className = 'slider'),
                (r.id = `slider${e}${o}`),
                (r.style.clear = 'both'),
                (r.type = 'range'),
                (r.min = '0'),
                (r.max = '100'),
                (r.step = '1'),
                (r.value = Game.mods.cookieMonsterFramework.saveData[e].settings[o]),
                (r.oninput = function () {
                  d(e, o), Game.UpdateMenu();
                }),
                (r.onchange = function () {
                  d(e, o), Game.UpdateMenu();
                }),
                t.appendChild(r),
                u.appendChild(t);
              const s = document.createElement('a');
              return (
                (s.className = 'option'),
                (s.onclick = function () {
                  c(
                    e,
                    Game.mods.cookieMonsterFramework.saveData[e].settings[
                      o.replace('Volume', 'SoundURL')
                    ],
                    o.replace('Volume', 'Sound'),
                    o,
                    !0,
                  );
                }),
                (s.textContent = 'Test sound'),
                u.appendChild(s),
                u
              );
            }
            if ('url' === i[o].type) {
              const a = document.createElement('span');
              (a.className = 'option'),
                (a.textContent = `${i[o].label} `),
                (a.style.lineHeight = '1.6'),
                u.appendChild(a);
              const r = document.createElement('input');
              (r.id = `${e}Options${o}`),
                (r.className = 'option'),
                (r.type = 'text'),
                (r.readOnly = !0),
                (r.value = Game.mods.cookieMonsterFramework.saveData[e].settings[o]),
                (r.style.width = '300px'),
                u.appendChild(r),
                u.appendChild(document.createTextNode(' '));
              const s = document.createElement('input');
              (s.id = `${e}Options${o}Prompt`),
                (s.className = 'option'),
                (s.type = 'text'),
                (s.value = Game.mods.cookieMonsterFramework.saveData[e].settings[o]);
              const c = document.createElement('a');
              (c.className = 'option'),
                (c.onclick = function () {
                  t(s.outerHTML, [
                    [
                      'Save',
                      function () {
                        (Game.mods.cookieMonsterFramework.saveData[e].settings[o] = l(
                          `${e}Options${o}Prompt`,
                        ).value),
                          n(),
                          Game.ClosePrompt(),
                          Game.UpdateMenu();
                      },
                    ],
                    [
                      'Cancel',
                      function () {
                        Game.ClosePrompt();
                      },
                    ],
                  ]);
                }),
                (c.textContent = 'Edit'),
                u.appendChild(c);
              const d = document.createElement('label');
              return (d.textContent = i[o].desc), (d.style.lineHeight = '1.6'), u.appendChild(d), u;
            }
            if ('colour' === i[o].type) {
              const t = document.createElement('span');
              t.className = 'option';
              const l = document.createElement('input');
              (l.id = o),
                (l.style.width = '65px'),
                (l.value = Game.mods.cookieMonsterFramework.saveData[e].settings[o]),
                t.appendChild(l),
                new r(l, {
                  hash: !0,
                  position: 'right',
                  onInput: function () {
                    (Game.mods.cookieMonsterFramework.saveData[e].settings[this.targetElement.id] =
                      this.toHEXString()),
                      m(),
                      n(),
                      Game.UpdateMenu();
                  },
                });
              const c = document.createElement('label');
              if (
                ((c.textContent = i[o].desc),
                (c.style.lineHeight = '1.6'),
                t.appendChild(c),
                o.includes('Flash'))
              ) {
                const n = document.createElement('a');
                (n.className = 'option'),
                  (n.onclick = function () {
                    a(e, 3, o.replace('Colour', ''), !0);
                  }),
                  (n.textContent = 'Test flash'),
                  t.appendChild(n);
              }
              return u.appendChild(t), s().init(), u;
            }
            if ('numscale' === i[o].type) {
              const t = document.createElement('span');
              (t.className = 'option'),
                (t.textContent = `${i[o].label} `),
                (t.style.lineHeight = '1.6'),
                u.appendChild(t);
              const a = document.createElement('input');
              (a.id = `${e}Options${o}`),
                (a.className = 'option'),
                (a.type = 'number'),
                (a.value = Game.mods.cookieMonsterFramework.saveData[e].settings[o]),
                (a.min = i[o].min),
                (a.max = i[o].max),
                (a.oninput = function () {
                  (Game.mods.cookieMonsterFramework.saveData[e].settings[o] = this.value),
                    n(),
                    p(),
                    Game.UpdateMenu();
                }),
                u.appendChild(a),
                u.appendChild(document.createTextNode(' '));
              const r = document.createElement('label');
              return (r.textContent = i[o].desc), (r.style.lineHeight = '1.6'), u.appendChild(r), u;
            }
            if ('keycode' === i[o].type) {
              const a = document.createElement('input');
              (a.id = `${e}Options${o}Prompt`),
                (a.className = 'option'),
                (a.type = 'text'),
                (a.value = Game.mods.cookieMonsterFramework.saveData[e].settings[o].displayName);
              const r = document.createElement('a');
              (r.className = 'option'),
                (r.id = `${e}Options${o}`),
                (r.onclick = function () {
                  t(a.outerHTML, []),
                    l(`${e}Options${o}Prompt`).addEventListener('keyup', (t) => {
                      !(function (e, t, o) {
                        const a = {
                          key: o.key,
                          altKey: o.altKey,
                          ctrlKey: o.ctrlKey,
                          shiftKey: o.shiftKey,
                          displayName: `${o.shiftKey ? 'Shift + ' : ''}${o.altKey ? 'Alt + ' : ''}${
                            o.ctrlKey ? 'Ctrl + ' : ''
                          }${o.key}`,
                        };
                        (Game.mods.cookieMonsterFramework.saveData[e].settings[t] = a), n();
                      })(e, o, t),
                        Game.ClosePrompt(),
                        Game.UpdateMenu();
                    });
                }),
                (r.textContent =
                  Game.mods.cookieMonsterFramework.saveData[e].settings[o].displayName),
                u.appendChild(r);
              const s = document.createElement('label');
              return (s.textContent = i[o].desc), (s.style.lineHeight = '1.6'), u.appendChild(s), u;
            }
            return u;
          },
          createOptionsSubHeader: function (e, t, o) {
            const a = document.createElement('div');
            (a.className = 'title'),
              (a.style.opacity = '0.7'),
              (a.style.fontSize = '17px'),
              a.appendChild(document.createTextNode(`${o} `));
            const n = document.createElement('span');
            return (
              (n.style.cursor = 'pointer'),
              (n.style.display = 'inline-block'),
              (n.style.height = '14px'),
              (n.style.width = '14px'),
              (n.style.borderRadius = '7px'),
              (n.style.textAlign = 'center'),
              (n.style.backgroundColor = '#C0C0C0'),
              (n.style.color = 'black'),
              (n.style.fontSize = '13px'),
              (n.style.verticalAlign = 'middle'),
              (n.textContent = Game.mods.cookieMonsterFramework.saveData[e].headers[t] ? '-' : '+'),
              (n.onclick = function () {
                i(e, t), Game.UpdateMenu();
              }),
              a.appendChild(n),
              a
            );
          },
        },
        G = function (e, t, o) {
          const a = document.createElement('div');
          (a.className = 'subsection'), (a.id = `${e}MenuSection`);
          const n = document.createElement('div');
          (n.className = 'title'), (n.style.fontSize = '18px'), (n.innerHTML = t);
          const r = document.createElement('span');
          return (
            (r.style.cursor = 'pointer'),
            (r.style.display = 'inline-block'),
            (r.style.height = '14px'),
            (r.style.width = '14px'),
            (r.style.borderRadius = '7px'),
            (r.style.textAlign = 'center'),
            (r.style.backgroundColor = '#C0C0C0'),
            (r.style.color = 'black'),
            (r.style.fontSize = '13px'),
            (r.style.verticalAlign = 'middle'),
            (r.textContent = Game.mods.cookieMonsterFramework.saveData[e].headers[o] ? '-' : '+'),
            (r.onclick = function () {
              i(e, o), Game.UpdateMenu();
            }),
            n.appendChild(r),
            a.appendChild(n),
            a
          );
        },
        v = {
          createFlash: a,
          createNotification: function (e, t, o, a) {
            1 === Game.mods.cookieMonsterFramework.saveData[e].settings[t] &&
              'hidden' === document.visibilityState &&
              !1 === window.cookieMonsterFrameworkData.isInitializing &&
              new Notification(o, {
                body: a,
                badge: 'https://orteil.dashnet.org/cookieclicker/favicon.ico',
              });
          },
          cookieMonsterPrompt: t,
          playCMSound: c,
        },
        w = { loadMod: h, saveFramework: n },
        x = class extends e {
          constructor(e, t, o, a) {
            super(e, t, o), (this.desc = a);
          }
        },
        T = class extends e {
          constructor(e, t, o, a, n, i, r) {
            super(e, t, o), (this.label = a), (this.desc = n), (this.min = i), (this.max = r);
          }
        },
        S = class extends e {
          constructor(e, t, o, a, n, i) {
            super(e, t, o), (this.label = a), (this.desc = n), (this.toggle = i);
          }
        },
        F = class extends e {
          constructor(e, t, o, a, n, i, r) {
            super(e, t, o),
              (this.label = a),
              (this.desc = n),
              (this.toggle = i),
              void 0 !== r && (this.func = r);
          }
        },
        E = class extends e {
          constructor(e, t, o, a, n) {
            super(e, t, o), (this.label = a), (this.desc = n);
            for (let e = 0; e < 101; e++) this.label[e] = `${e}%`;
          }
        };
      function B() {
        Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.WrinklerButtons &&
        Game.elderWrath
          ? ((l('PopAllNormalWrinklerButton').style.display = ''),
            (l('PopFattestWrinklerButton').style.display = ''))
          : ((l('PopAllNormalWrinklerButton').style.display = 'none'),
            (l('PopFattestWrinklerButton').style.display = 'none'));
      }
      let P,
        N,
        O,
        D,
        L,
        A,
        W,
        j,
        $,
        U,
        H,
        R,
        I,
        z,
        V,
        _,
        X,
        Q,
        q,
        Y,
        K,
        J,
        Z,
        ee,
        te,
        oe,
        ae,
        ne,
        ie,
        re,
        se,
        le,
        ce,
        de,
        me,
        pe,
        ue = 0,
        he = 0,
        ge = 0,
        fe = 0,
        ke = 0,
        Ce = 0,
        Me = 0,
        ye = 0,
        be = 0,
        Ge = 0,
        ve = 0,
        we = 0,
        xe = 0,
        Te = 0,
        Se = 0,
        Fe = 1,
        Ee = 1,
        Be = 1,
        Pe = 0,
        Ne = 0,
        Oe = 0,
        De = 0,
        Le = {},
        Ae = {},
        We = {},
        je = {},
        $e = 0,
        Ue = 0,
        He = [0, null],
        Re = 0,
        Ie = 0,
        ze = {},
        Ve = {},
        _e = {},
        Xe = {},
        Qe = {},
        qe = 0,
        Ye = 0,
        Ke = [],
        Je = 0,
        Ze = 0,
        et = [],
        tt = 0,
        ot = 0,
        at = [],
        nt = 0,
        it = 0,
        rt = [],
        st = 0,
        lt = 0,
        ct = {},
        dt = {},
        mt = 0,
        pt = 0,
        ut = 0,
        ht = [],
        gt = {},
        ft = 0,
        kt = {
          0: [0, 0, 0],
          1: [0, 0, 0],
          2: [0, 0, 0],
          3: [0, 0, 0],
          4: [0, 0, 0],
          5: [0, 0, 0],
          6: [0, 0, 0],
          7: [0, 0, 0],
          8: [0, 0, 0],
          9: [0, 0, 0],
          10: [0, 0, 0],
        },
        Ct = [],
        Mt = [],
        yt = [];
      function bt(e) {
        let t = 0;
        return (
          (Game.dragonAuras[ne].name !== e && Game.dragonAuras[ie].name !== e) || (t = 1),
          ('Reality Bending' === Game.dragonAuras[ne].name ||
            ('Reality Bending' === Game.dragonAuras[ie].name &&
              Game.dragonLevel >= Game.dragonAurasBN[e].id + 4)) &&
            (t += 0.1),
          t
        );
      }
      function Gt() {
        let e = 0.25;
        return (e *= 1 + bt('Earth Shatterer')), e;
      }
      function vt(e, t) {
        return void 0 === de[e] ? (void 0 === t ? 1 : t) : de[e];
      }
      function wt(e) {
        const t = Mt[e];
        return (!t ||
          1 !== Game.ascensionMode ||
          ('prestige' !== t.pool && 'fortune' !== t.tier)) &&
          t
          ? t.bought
          : 0;
      }
      function xt(e) {
        return Game.dragonAuras[ne].name === e || Game.dragonAuras[ie].name === e;
      }
      function Tt(e) {
        if (Game.hasGod) {
          void 0 === Ct.Temple.minigame && (Ct.Temple.minigame = Game.Objects.Temple.minigame);
          const t = Ct.Temple.minigame.gods[e];
          if (re === t.id) return 1;
          if (se === t.id) return xt('Supreme Intellect') ? 1 : 2;
          if (le === t.id) return xt('Supreme Intellect') ? 2 : 3;
        }
        return !1;
      }
      function St(e, t) {
        let o = t;
        if (
          (wt('Season savings') && (o *= 0.99),
          wt("Santa's dominion") && (o *= 0.99),
          wt('Faberge egg') && (o *= 0.99),
          wt('Divine discount') && (o *= 0.99),
          wt('Fortune #100') && (o *= 0.99),
          (o *= 1 - 0.02 * bt('Fierce Hoarder')),
          Game.hasBuff('Everything must go') && (o *= 0.95),
          Game.hasBuff('Crafty pixies') && (o *= 0.98),
          Game.hasBuff('Nasty goblins') && (o *= 1.02),
          e.fortune && wt(e.fortune.name) && (o *= 0.93),
          (o *= vt('buildingCost')),
          Ct.Temple.minigameLoaded)
        ) {
          const e = Tt('creation');
          1 === e ? (o *= 0.93) : 2 === e ? (o *= 0.95) : 3 === e && (o *= 0.98);
        }
        return o;
      }
      function Ft(e, t, o, a, n, i) {
        const r = void 0 === i ? 0 : i;
        let s = n,
          l = o,
          c = 0;
        -1 === n && (s = l), n || (s = Game.buyBulk);
        for (let o = 0; o < s; o++) {
          let o = t * Game.priceIncrease ** Math.max(0, l - a);
          (o = r ? Game.modifyBuildingPrice(e, o) : St(e, o)), (o = Math.ceil(o));
          const n = r ? e.getSellMultiplier() : Gt();
          (o = Math.floor(o * n)), l > 0 && ((c += o), (l -= 1));
        }
        return c;
      }
      const Et = ['', '', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'],
        Bt = [
          '',
          '',
          'M',
          'B',
          'Tr',
          'Quadr',
          'Quint',
          'Sext',
          'Sept',
          'Oct',
          'Non',
          'Dec',
          'Undec',
          'Duodec',
          'Tredec',
          'Quattuordec',
          'Quindec',
          'Sexdec',
          'Septendec',
          'Octodec',
          'Novemdec',
          'Vigint',
          'Unvigint',
          'Duovigint',
          'Trevigint',
          'Quattuorvigint',
        ],
        Pt = [
          '',
          'K',
          'M',
          'B',
          'T',
          'Qa',
          'Qi',
          'Sx',
          'Sp',
          'Oc',
          'No',
          'De',
          'UDe',
          'DDe',
          'TDe',
          'QaDe',
          'QiDe',
          'SxDe',
          'SpDe',
          'ODe',
          'NDe',
          'Vi',
          'UVi',
          'DVi',
          'TVi',
          'QaVi',
          'QiVi',
          'SxVi',
          'SpVi',
          'OVi',
          'NVi',
          'Tr',
          'UTr',
          'DTr',
          'TTr',
          'QaTr',
          'QiTr',
          'SxTr',
          'SpTr',
          'OTr',
          'NTr',
          'Qaa',
          'UQa',
          'DQa',
          'TQa',
          'QaQa',
          'QiQa',
          'SxQa',
          'SpQa',
          'OQa',
          'NQa',
          'Qia',
          'UQi',
          'DQi',
          'TQi',
          'QaQi',
          'QiQi',
          'SxQi',
          'SpQi',
          'OQi',
          'NQi',
          'Sxa',
          'USx',
          'DSx',
          'TSx',
          'QaSx',
          'QiSx',
          'SxSx',
          'SpSx',
          'OSx',
          'NSx',
          'Spa',
          'USp',
          'DSp',
          'TSp',
          'QaSp',
          'QiSp',
          'SxSp',
          'SpSp',
          'OSp',
          'NSp',
          'Oco',
          'UOc',
          'DOc',
          'TOc',
          'QaOc',
          'QiOc',
          'SxOc',
          'SpOc',
          'OOc',
          'NOc',
          'Noa',
          'UNo',
          'DNo',
          'TNo',
          'QaNo',
          'QiNo',
          'SxNo',
          'SpNo',
          'ONo',
          'NNo',
          'Ct',
          'UCt',
        ];
      let Nt,
        Ot,
        Dt,
        Lt,
        At,
        Wt,
        jt,
        $t,
        Ut,
        Ht,
        Rt,
        It,
        zt,
        Vt,
        _t,
        Xt,
        Qt,
        qt = [],
        Yt = [],
        Kt = [],
        Jt = {},
        Zt = Date.now(),
        eo = Date.now();
      function to(e, t, o) {
        const a =
          Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.ScaleDecimals + 1;
        if (e === 1 / 0) return 'Infinity';
        if (void 0 === e) return '0';
        if (0 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.Scale)
          return Jt.Beautify(e, t);
        if (Number.isFinite(e)) {
          if (e < 0) return `-${to(Math.abs(e))}`;
          let n = '';
          if (0 === e) return e.toString();
          if (
            e > 0.001 &&
            e < Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.ScaleCutoff
          )
            return (
              (n = Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings
                .ScaleSeparator
                ? e.toLocaleString('nl')
                : e.toLocaleString('en')),
              n
            );
          if (
            (4 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.Scale &&
              !o) ||
            4 === o
          )
            n = e.toExponential(a).toString().replace('e', 'E');
          else {
            const t = e.toExponential().toString(),
              i = Math.floor(t.slice(t.indexOf('e') + 1) / 3);
            (n = (e / Number('1e' + 3 * i)).toFixed(a)),
              (1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.Scale &&
                !o) ||
              1 === o
                ? e >= 0.01 && e < Number('1e' + 3 * Et.length)
                  ? (n += ` ${Et[i]}`)
                  : (n = to(e, 0, 4))
                : (2 ===
                    Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.Scale &&
                    !o) ||
                  2 === o
                ? e >= 0.01 && e < Number('1e' + 3 * Bt.length)
                  ? (n += ` ${Bt[i]}`)
                  : (n = to(e, 0, 4))
                : (3 ===
                    Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.Scale &&
                    !o) ||
                  3 === o
                ? e >= 0.01 && e < Number('1e' + 3 * Pt.length)
                  ? (n += ` ${Pt[i]}`)
                  : (n = to(e, 0, 4))
                : ((5 ===
                    Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.Scale &&
                    !o) ||
                    5 === o) &&
                  (n += 'E' + 3 * i);
          }
          return (
            '' === n &&
              (console.log(`Could not beautify number with Cookie Monster Beautify: ${e}`),
              (n = Jt.Beautify(e, t))),
            Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.ScaleSeparator &&
              (n = n.replace('.', ',')),
            n
          );
        }
        return (
          console.log(`Could not beautify number with Cookie Monster Beautify: ${e}`),
          Jt.Beautify(e, t)
        );
      }
      const oo = 'CMText',
        ao = 'CMBack',
        no = 'Blue',
        io = 'Green',
        ro = 'Yellow',
        so = 'Orange',
        lo = 'Red',
        co = 'Purple',
        mo = 'Gray',
        po = 'Pink',
        uo = 'Brown',
        ho = [no, io, ro, so, lo, co, po, uo, mo],
        go = [
          ['GoldCookTooltipPlaceholder', 'Calculated with Golden Switch off', '200px'],
          [
            'GoldCookDragonsFortuneTooltipPlaceholder',
            'Calculated with Golden Switch off and at least one golden cookie on-screen',
            '240px',
          ],
          [
            'PrestMaxTooltipPlaceholder',
            'The MAX prestige is calculated with the cookies gained from popping all wrinklers with Skruuia god in Diamond slot, selling all stock market goods, selling all buildings with Earth Shatterer and Reality Bending auras, and buying Chocolate egg',
            '320px',
          ],
          [
            'NextPrestTooltipPlaceholder',
            'Calculated with cookies gained from wrinklers and Chocolate egg',
            '200px',
          ],
          [
            'HeavenChipMaxTooltipPlaceholder',
            'The MAX heavenly chips is calculated with the cookies gained from popping all wrinklers with Skruuia god in Diamond slot, selling all stock market goods, selling all buildings with Earth Shatterer and Reality Bending auras, and buying Chocolate egg',
            '330px',
          ],
          [
            'ResetTooltipPlaceholder',
            'The bonus income you would get from new prestige levels unlocked at 100% of its potential and from ascension achievements if you have the same buildings/upgrades after reset',
            '370px',
          ],
          [
            'ChoEggTooltipPlaceholder',
            'The amount of cookies you would get from popping all wrinklers with Skruuia god in Diamond slot, selling all stock market goods, selling all buildings with Earth Shatterer and Reality Bending auras, and then buying Chocolate egg',
            '300px',
          ],
          ['ChainNextLevelPlaceholder', 'Cheated cookies might break this formula', '250px'],
          [
            'FavouriteSettingPlaceholder',
            "Click to set this setting as favourite and show it in 'favourite' settings at the top of the Cookie Monster Settings",
            '250px',
          ],
        ],
        fo = {};
      let ko,
        Co = 0,
        Mo = -1,
        yo = [],
        bo = function () {},
        Go = 1,
        vo = 1,
        wo = 1;
      const xo = [10, 15, 30, 60, 300, 600, 900, 1800],
        To = [1, 5, 10, 15, 30],
        So = {
          Frenzy: ro,
          'Dragon Harvest': uo,
          'Elder frenzy': io,
          Clot: lo,
          'Click frenzy': no,
          Dragonflight: po,
        };
      let Fo,
        Eo,
        Bo,
        Po,
        No,
        Oo,
        Do,
        Lo = {},
        Ao = '';
      function Wo() {
        let e,
          t = Game.buyBulk;
        1 === Game.buyMode ? (vo = t) : (t = vo),
          1 === t ? (t = Le) : 10 === t ? (t = Ae) : 100 === t && (t = We),
          l('storeBulk1').style.removeProperty('color'),
          l('storeBulk10').style.removeProperty('color'),
          l('storeBulk100').style.removeProperty('color'),
          1 === Game.buyMode
            ? 1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.BuildColour
              ? (Object.keys(t).forEach((e) => {
                  l(`productPrice${Game.Objects[e].id}`).style.color =
                    Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings[
                      `Colour${t[e].colour}`
                    ];
                }),
                (l(`storeBulk${ut}`).style.color =
                  Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.ColourGreen))
              : Object.keys(Game.Objects).forEach((e) => {
                  l(`productPrice${Game.Objects[e].id}`).style.removeProperty('color');
                })
            : -1 === Game.buyMode &&
              Object.keys(Le).forEach((e) => {
                const t = Game.Objects[e];
                (l(`productPrice${t.id}`).style.color = ''),
                  (l(`productPrice${t.id}`).innerHTML = to(
                    Ft(t, t.basePrice, t.amount, t.free, Game.buyBulk, 1),
                  ));
              }),
          1 === Game.buyMode &&
          Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.SortBuildings
            ? 1 ===
              Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.SortBuildings
              ? ((e = Object.keys(Le).map((e) => {
                  const t = {};
                  return (t.name = e), (t.pp = Le[e].pp), (t.colour = Le[e].colour), t;
                })),
                e.sort((e, t) =>
                  ho.indexOf(e.colour) === ho.indexOf(t.colour)
                    ? e.pp - t.pp
                    : ho.indexOf(e.colour) - ho.indexOf(t.colour),
                ))
              : 2 ===
                Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.SortBuildings
              ? ((e = Object.keys(t).map((e) => {
                  const o = {};
                  return (o.name = e), (o.pp = t[e].pp), (o.colour = t[e].colour), o;
                })),
                e.sort((e, t) =>
                  ho.indexOf(e.colour) === ho.indexOf(t.colour)
                    ? e.pp - t.pp
                    : ho.indexOf(e.colour) - ho.indexOf(t.colour),
                ))
              : 3 ===
                  Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings
                    .SortBuildings &&
                ((e = Object.keys(je).map((e) => {
                  const t = {};
                  return (
                    (t.name = e),
                    (t.id = Game.Objects[e].id),
                    (t.amountUntilNext = je[e].AmountNeeded),
                    (t.priceUntilNext = je[e].price),
                    t
                  );
                })),
                e.sort((e, t) => e.id - t.id),
                e.sort(
                  (e, t) =>
                    (101 !== e.amountUntilNext ? e.priceUntilNext : 1 / 0) -
                    (101 !== t.amountUntilNext ? t.priceUntilNext : 1 / 0),
                ))
            : ((e = Object.keys(Le).map((e) => {
                const t = {};
                return (t.name = e), (t.id = Game.Objects[e].id), t;
              })),
              e.sort((e, t) => e.id - t.id));
        for (let t = 0; t < e.length; t++)
          Game.Objects[e[t].name].l.style.gridRow = `${t + 2}/${t + 2}`;
      }
      function jo() {
        Object.values(document.getElementsByClassName('storeSection')).forEach((e) => {
          Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings
            .UpgradesNeverCollapse || 'products' === e.id
            ? (e.style.height = 'auto')
            : 'vaultUpgrades' === e.id
            ? ((e.style.height = ''), (e.style.minHeight = '0px'))
            : 'upgrades' === e.id
            ? ((e.style.height = ''),
              e.className.includes('hasMenu')
                ? (e.style.minHeight = '82px')
                : (e.style.minHeight = '60px'))
            : ((e.style.height = ''), (e.style.minHeight = '60px'));
        });
      }
      function $o() {
        if (Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.UpBarColour > 0) {
          let e = 0,
            t = 0,
            o = 0,
            a = 0,
            n = 0,
            i = 0,
            r = 0;
          Object.keys(Game.UpgradesInStore).forEach((s) => {
            const c = Game.UpgradesInStore[s];
            let d = !1;
            for (let e = 0; e < l(`upgrade${s}`).childNodes.length; e += 1)
              if (-1 !== l(`upgrade${s}`).childNodes[e].className.indexOf(ao)) {
                (l(`upgrade${s}`).childNodes[e].className = ao + ze[c.name].colour), (d = !0);
                break;
              }
            if (!d) {
              const e = document.createElement('div');
              (e.style.width = '10px'),
                (e.style.height = '10px'),
                (e.className = ao + ze[c.name].colour),
                l(`upgrade${s}`).appendChild(e);
            }
            ze[c.name].colour === no
              ? (e += 1)
              : ze[c.name].colour === io
              ? (t += 1)
              : ze[c.name].colour === ro
              ? (o += 1)
              : ze[c.name].colour === so
              ? (a += 1)
              : ze[c.name].colour === lo
              ? (n += 1)
              : ze[c.name].colour === co
              ? (i += 1)
              : ze[c.name].colour === mo && (r += 1);
          }),
            (l('CMUpgradeBarBlue').textContent = e),
            (l('CMUpgradeBarGreen').textContent = t),
            (l('CMUpgradeBarYellow').textContent = o),
            (l('CMUpgradeBarOrange').textContent = a),
            (l('CMUpgradeBarRed').textContent = n),
            (l('CMUpgradeBarPurple').textContent = i),
            (l('CMUpgradeBarGray').textContent = r);
        }
        const e = [];
        for (let t = 0; t < Game.UpgradesInStore.length; t += 1) {
          const o = {};
          (o.name = Game.UpgradesInStore[t].name),
            (o.price = Game.UpgradesInStore[t].basePrice),
            (o.pp = ze[o.name].pp),
            (o.colour = ze[o.name].colour),
            e.push(o);
        }
        Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.SortUpgrades
          ? e.sort((e, t) =>
              ho.indexOf(e.colour) === ho.indexOf(t.colour)
                ? e.pp - t.pp
                : ho.indexOf(e.colour) - ho.indexOf(t.colour),
            )
          : e.sort((e, t) => e.price - t.price);
        const t = function (e, t) {
          return e.findIndex((e) => e.name === t.name);
        };
        for (let o = 0; o < Game.UpgradesInStore.length; o += 1)
          l(`upgrade${o}`).style.order = t(e, Game.UpgradesInStore[o]) + 1;
      }
      function Uo(e, t) {
        let o = e;
        if (e === 1 / 0) return e;
        if (e < 0) return 'Negative time period';
        o = Math.ceil(e);
        const a = Math.floor(o / 31536e3),
          n = Math.floor((o % 31536e3) / 86400),
          i = Math.floor(((o % 31536e3) % 86400) / 3600),
          r = Math.floor((((o % 31536e3) % 86400) % 3600) / 60),
          s = Math.floor((((o % 31536e3) % 86400) % 3600) % 60);
        let l = '';
        if (0 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.TimeFormat) {
          if (o > 7776e5) return t ? 'Over 9000 days!' : '>9000d';
          (l += a > 0 ? a + (t ? (1 === a ? ' year' : ' years') : 'y') + ', ' : ''),
            (l.length > 0 || n > 0) && (l += n + (t ? (1 === n ? ' day' : ' days') : 'd') + ', '),
            (l.length > 0 || i > 0) && (l += i + (t ? (1 === i ? ' hour' : ' hours') : 'h') + ', '),
            (l.length > 0 || r > 0) &&
              (l += r + (t ? (1 === r ? ' minute' : ' minutes') : 'm') + ', '),
            (l += s + (t ? (1 === s ? ' second' : ' seconds') : 's'));
        } else if (
          1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.TimeFormat
        ) {
          if (o > 315576e4) return 'XX:XX:XX:XX:XX';
          (l += (a < 10 ? '0' : '') + a + ':'),
            (l += (n < 10 ? '0' : '') + n + ':'),
            (l += (i < 10 ? '0' : '') + i + ':'),
            (l += (r < 10 ? '0' : '') + r + ':'),
            (l += (s < 10 ? '0' : '') + s);
        } else {
          if (o > 7776e5) return t ? 'Over 9000 days!' : '>9000d';
          a > 0
            ? ((l += a + (t ? (1 === a ? ' year' : ' years') : 'y') + ', '),
              (l += n + (t ? (1 === n ? ' day' : ' days') : 'd')))
            : n > 0
            ? ((l += n + (t ? (1 === n ? ' day' : ' days') : 'd') + ', '),
              (l += i + (t ? (1 === i ? ' hour' : ' hours') : 'h')))
            : i > 0
            ? ((l += i + (t ? (1 === i ? ' hour' : ' hours') : 'h') + ', '),
              (l += r + (t ? (1 === r ? ' minute' : ' minutes') : 'm')))
            : r > 0
            ? ((l += r + (t ? (1 === r ? ' minute' : ' minutes') : 'm') + ', '),
              (l += s + (t ? (1 === s ? ' second' : ' seconds') : 's')))
            : (l += s + (t ? (1 === s ? ' second' : ' seconds') : 's'));
        }
        return l;
      }
      function Ho(e) {
        let t, o;
        return (
          e <= 0
            ? ((o =
                1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.TimeFormat
                  ? '00:00:00:00:00'
                  : 'Done!'),
              (t = io))
            : ((o = Uo(e)), (t = e > 300 ? lo : e > 60 ? so : ro)),
          { text: o, colour: t }
        );
      }
      function Ro() {
        return Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.CPSMode
          ? X
          : 0 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.CalcWrink
          ? Game.cookiesPs * (1 - Game.cpsSucked)
          : 1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.CalcWrink
          ? Game.cookiesPs * (Re + (1 - 0.05 * Ie))
          : null !== He[1] &&
            2 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.CalcWrink &&
            1 === Game.wrinklers[He[1]].type
          ? Game.cookiesPs * ((3 * Re) / Ie + (1 - 0.05 * Ie))
          : Game.cookiesPs * (Re / Ie + (1 - 0.05 * Ie));
      }
      function Io() {
        return 1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.CalcWrink
          ? $e
          : 2 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.CalcWrink
          ? He[0]
          : 0;
      }
      function zo(e, t, o) {
        const a = document.createElement('div');
        (a.id = e),
          (a.style.height = '12px'),
          (a.style.margin = '0px 10px'),
          (a.style.position = 'relative');
        const n = document.createElement('div');
        (n.style.width = '100%'),
          (n.style.height = '10px'),
          (n.style.margin = 'auto'),
          (n.style.position = 'absolute'),
          (n.style.left = '0px'),
          (n.style.top = '0px'),
          (n.style.right = '0px'),
          (n.style.bottom = '0px');
        const i = document.createElement('span');
        (i.style.display = 'inline-block'),
          (i.style.textAlign = 'right'),
          (i.style.fontSize = '10px'),
          (i.style.width = '108px'),
          (i.style.marginRight = '5px'),
          (i.style.verticalAlign = 'text-top'),
          (i.textContent = t),
          n.appendChild(i);
        for (let e = 0; e < o.length; e++) {
          const t = document.createElement('span');
          (t.id = o[e].id),
            (t.style.display = 'inline-block'),
            (t.style.height = '10px'),
            (t.style.verticalAlign = 'text-top'),
            (t.style.textAlign = 'center'),
            o.length - 1 === e &&
              ((t.style.borderTopRightRadius = '10px'), (t.style.borderBottomRightRadius = '10px')),
            void 0 !== o[e].colour && (t.className = ao + o[e].colour),
            n.appendChild(t);
        }
        const r = document.createElement('span');
        return (
          (r.id = `${e}Time`),
          (r.style.marginLeft = '5px'),
          (r.style.verticalAlign = 'text-top'),
          n.appendChild(r),
          a.appendChild(n),
          a
        );
      }
      function Vo(e) {
        if (null !== l('CMBotBar')) {
          const t = l('CMBotBar').firstChild.firstChild.childNodes[0],
            o = l('CMBotBar').firstChild.firstChild.childNodes[1],
            a = l('CMBotBar').firstChild.firstChild.childNodes[2],
            n = l('CMBotBar').firstChild.firstChild.childNodes[3],
            i = e,
            r = t.appendChild(document.createElement('td'));
          r.appendChild(
            document.createTextNode(
              `${-1 !== i.indexOf(' ') ? i.substring(0, i.indexOf(' ')) : i} (`,
            ),
          ),
            (r.appendChild(document.createElement('span')).className = 'CMTextBlue'),
            r.appendChild(document.createTextNode(')')),
            (t.lastChild.style.paddingLeft = '8px'),
            o.appendChild(document.createElement('td')),
            (o.lastChild.style.paddingLeft = '8px'),
            a.appendChild(document.createElement('td')),
            (a.lastChild.style.paddingLeft = '8px'),
            n.appendChild(document.createElement('td')),
            (n.lastChild.style.paddingLeft = '2px');
        }
      }
      function _o() {
        if (
          1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.BotBar &&
          Le &&
          1 === Game.buyMode
        ) {
          let e = 0;
          Object.keys(Le).forEach((t) => {
            let o,
              a = Game.buyBulk;
            1 === Game.buyMode ? (Go = a) : (a = Go),
              1 === a && (a = Le),
              10 === a && (a = Ae),
              100 === a && (a = We),
              (e += 1),
              (l('CMBotBar').firstChild.firstChild.childNodes[0].childNodes[
                e
              ].childNodes[1].textContent = Game.Objects[t].amount),
              (l('CMBotBar').firstChild.firstChild.childNodes[1].childNodes[e].textContent = to(
                a[t].bonus,
                2,
              )),
              (l('CMBotBar').firstChild.firstChild.childNodes[2].childNodes[e].className =
                oo + a[t].colour),
              (o = Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.PPDisplayTime
                ? Uo(Math.round(a[t].pp))
                : to(Math.round(a[t].pp), 2)),
              (l('CMBotBar').firstChild.firstChild.childNodes[2].childNodes[e].textContent = o);
            const n = Ho((Game.Objects[t].bulkPrice - (Game.cookies + Io())) / Ro());
            (l('CMBotBar').firstChild.firstChild.childNodes[3].childNodes[e].className =
              oo + n.colour),
              'Done!' === n.text && Game.cookies < Game.Objects[t].bulkPrice
                ? (l('CMBotBar').firstChild.firstChild.childNodes[3].childNodes[
                    e
                  ].textContent = `${n.text} (with Wrink)`)
                : (l('CMBotBar').firstChild.firstChild.childNodes[3].childNodes[e].textContent =
                    n.text);
          });
        }
      }
      function Xo() {
        (Game.Background.canvas.width = Game.Background.canvas.parentNode.offsetWidth),
          (Game.Background.canvas.height = Game.Background.canvas.parentNode.offsetHeight),
          (Game.LeftBackground.canvas.width = Game.LeftBackground.canvas.parentNode.offsetWidth),
          (Game.LeftBackground.canvas.height = Game.LeftBackground.canvas.parentNode.offsetHeight),
          Game.DrawBackground();
      }
      function Qo() {
        1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.BotBar &&
        1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.TimerBar &&
        1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.TimerBarPos
          ? ((l('CMBotBar').style.bottom = l('CMTimerBar').style.height),
            (l('game').style.bottom = `${
              Number(l('CMTimerBar').style.height.replace('px', '')) + 70
            }px`))
          : 1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.BotBar
          ? ((l('CMBotBar').style.bottom = '0px'), (l('game').style.bottom = '70px'))
          : 1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.TimerBar &&
            1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.TimerBarPos
          ? (l('game').style.bottom = l('CMTimerBar').style.height)
          : (l('game').style.bottom = '0px'),
          1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.TimerBar &&
          0 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.TimerBarPos
            ? (l('sectionLeft').style.top = l('CMTimerBar').style.height)
            : (l('sectionLeft').style.top = ''),
          Xo();
      }
      function qo() {
        1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.TimerBar
          ? (l('CMTimerBar').style.display = '')
          : (l('CMTimerBar').style.display = 'none'),
          Qo();
      }
      function Yo() {
        (ue = Game.dragonAura), (he = Game.dragonAura2);
      }
      function Ko(e) {
        const t = Game.Achievements[e],
          o = {};
        return (o.name = t.name), o;
      }
      function Jo(e) {
        let t = 1;
        if (
          (Object.keys(e.tieredUpgrades).forEach((o) => {
            if (!Game.Tiers[e.tieredUpgrades[o].tier].special && wt(e.tieredUpgrades[o].name)) {
              let a = 2;
              1 !== Game.ascensionMode &&
                wt(e.unshackleUpgrade) &&
                wt(Game.Tiers[e.tieredUpgrades[o].tier].unshackleUpgrade) &&
                (a += 1 === e.id ? 0.5 : 0.1 * (20 - e.id)),
                (t *= a);
            }
          }),
          Object.keys(e.synergies).forEach((o) => {
            if (wt(e.synergies[o].name)) {
              const a = e.synergies[o];
              a.buildingTie1.name === e.name
                ? (t *= 1 + 0.05 * a.buildingTie2.amount)
                : a.buildingTie2.name === e.name && (t *= 1 + 0.001 * a.buildingTie1.amount);
            }
          }),
          e.fortune && wt(e.fortune.name) && (t *= 1.07),
          e.grandma && wt(e.grandma.name) && (t *= 1 + 0.01 * Ct.Grandma.amount * (1 / (e.id - 1))),
          'object' == typeof e.tieredUpgrades.misfortune &&
            1 === e.vanilla &&
            wt(e.tieredUpgrades.misfortune.name))
        )
          switch (Game.elderWrath) {
            default:
              t *= 1;
              break;
            case 1:
              t *= 1.02;
              break;
            case 2:
              t *= 1.04;
              break;
            case 3:
              t *= 1.06;
          }
        return t;
      }
      function Zo(e) {
        const t = Game.Objects[e],
          o = {};
        return (
          'Cursor' === t.name
            ? (o.cps = function (e) {
                let t = 0;
                wt('Thousand fingers') && (t += 0.1),
                  wt('Million fingers') && (t *= 5),
                  wt('Billion fingers') && (t *= 10),
                  wt('Trillion fingers') && (t *= 20),
                  wt('Quadrillion fingers') && (t *= 20),
                  wt('Quintillion fingers') && (t *= 20),
                  wt('Sextillion fingers') && (t *= 20),
                  wt('Septillion fingers') && (t *= 20),
                  wt('Octillion fingers') && (t *= 20),
                  wt('Nonillion fingers') && (t *= 20),
                  wt('Decillion fingers') && (t *= 20),
                  wt('Unshackled cursors') && (t *= 25);
                let o = 1,
                  a = 0;
                return (
                  Object.keys(Ct).forEach((e) => {
                    'Cursor' !== Ct[e].name && (a += Ct[e].amount);
                  }),
                  (t *= a),
                  (o *= Jo(e)),
                  (o *= Game.magicCpS('Cursor')),
                  (o *= vt('cursorCps')),
                  Game.ComputeCps(
                    0.1,
                    wt('Reinforced index finger') +
                      wt('Carpal tunnel prevention cream') +
                      wt('Ambidextrous'),
                    t,
                  ) * o
                );
              })
            : 'Grandma' === t.name
            ? (o.cps = function (e) {
                let o = 1;
                if (
                  (Object.keys(Game.GrandmaSynergies).forEach((e) => {
                    wt(Game.GrandmaSynergies[e]) && (o *= 2);
                  }),
                  wt('Bingo center/Research facility') && (o *= 4),
                  wt('Ritual rolling pins') && (o *= 2),
                  wt('Naughty list') && (o *= 2),
                  wt('Elderwort biscuits') && (o *= 1.02),
                  (o *= vt('grandmaCps')),
                  wt('Cat ladies'))
                )
                  for (let e = 0; e < Game.UpgradesByPool.kitten.length; e++)
                    wt(Game.UpgradesByPool.kitten[e].name) && (o *= 1.29);
                o *= Jo(e);
                let a = 0;
                wt('One mind') && (a += 0.02 * Ct.Grandma.amount),
                  wt('Communal brainsweep') && (a += 0.02 * Ct.Grandma.amount),
                  wt('Elder Pact') && (a += 0.05 * Ct.Portal.amount);
                let n = 0;
                return (
                  Object.keys(Ct).forEach((e) => {
                    'Grandma' !== Ct[e].name && (n += Ct[e].amount);
                  }),
                  (o *= 1 + 0.01 * bt('Elder Battalion') * n),
                  (o *= Game.magicCpS(t.name)),
                  (t.baseCps + a) * o
                );
              })
            : (o.cps = function (e) {
                let t = 1;
                return (t *= Jo(e)), (t *= Game.magicCpS(e.name)), e.baseCPS * t;
              }),
          (o.baseCps = t.baseCps),
          (o.name = t.name),
          (o.tieredUpgrades = t.tieredUpgrades),
          (o.synergies = t.synergies),
          (o.fortune = t.fortune),
          (o.grandma = t.grandma),
          (o.baseCPS = t.baseCps),
          (o.id = t.id),
          (o.vanilla = t.vanilla),
          (o.unshackleUpgrade = t.unshackleUpgrade),
          o
        );
      }
      function ea(e) {
        const t = Game.Upgrades[e],
          o = {};
        return (
          (o.power = t.power),
          'function' == typeof o.power &&
            ('Sugar crystal cookies' === t.name
              ? (o.power = function () {
                  let e = 5;
                  return (
                    Object.keys(Ct).forEach((t) => {
                      Ct[t].level >= 10 && (e += 1);
                    }),
                    e
                  );
                })
              : (o.power = function () {
                  let e = 2;
                  if ((wt('Starlove') && (e = 3), Game.hasGod)) {
                    const t = Tt('seasons');
                    1 === t ? (e *= 1.3) : 2 === t ? (e *= 1.2) : 3 === t && (e *= 1.1);
                  }
                  return e;
                })),
          (o.pool = t.pool),
          (o.name = t.name),
          o
        );
      }
      function ta() {
        (Z = Game.UpgradesOwned),
          (ee = Game.pledges),
          (te = Game.AchievementsOwned),
          (oe = Game.heavenlyPower),
          (ae = Game.prestige),
          Object.keys(Game.Objects).forEach((e) => {
            const t = Game.Objects[e];
            let o = Ct[e];
            void 0 === o && ((Ct[e] = Zo(e)), (o = Ct[e]), Vo(e)),
              (o.amount = t.amount),
              (o.level = t.level),
              (o.totalCookies = t.totalCookies),
              (o.basePrice = t.basePrice),
              (o.free = t.free),
              t.minigameLoaded &&
                ('Temple' === t.name &&
                  ((re = t.minigame.slot[0]), (se = t.minigame.slot[1]), (le = t.minigame.slot[2])),
                (o.minigameLoaded = t.minigameLoaded),
                (o.minigame = t.minigame)),
              (Ct[e] = o);
          }),
          Object.keys(Game.Upgrades).forEach((e) => {
            const t = Game.Upgrades[e];
            let o = Mt[e];
            void 0 === o && ((Mt[e] = ea(e)), (o = Mt[e])), (o.bought = t.bought), (Mt[e] = o);
          }),
          Object.keys(Game.Achievements).forEach((e) => {
            const t = Game.Achievements[e];
            let o = yt[e];
            void 0 === o && ((yt[e] = Ko(e)), (o = yt[e])), (o.won = t.won), (yt[e] = o);
          }),
          Yo(),
          (ne = ue),
          (ie = he);
      }
      function oa(e) {
        const t = document.createElement('div');
        return (
          (t.style.fontWeight = 'bold'),
          (t.id = `${e}Title`),
          (t.className = 'CMTextBlue'),
          (t.textContent = e),
          t
        );
      }
      function aa(e) {
        e.appendChild(oa('Bonus Income'));
        const t = document.createElement('div');
        (t.style.marginBottom = '4px'),
          (t.style.color = 'white'),
          (t.id = 'CMTooltipIncome'),
          e.appendChild(t),
          e.appendChild(oa('Bonus Cookies per Click')),
          (e.lastChild.style.display = 'none');
        const o = document.createElement('div');
        (o.style.marginBottom = '4px'),
          (o.style.color = 'white'),
          (o.style.display = 'none'),
          (o.id = 'CMTooltipCookiePerClick'),
          e.appendChild(o),
          e.appendChild(oa('Payback Period'));
        const a = document.createElement('div');
        (a.style.marginBottom = '4px'),
          (a.id = 'CMTooltipPP'),
          e.appendChild(a),
          e.appendChild(oa('Time Left'));
        const n = document.createElement('div');
        if (((n.id = 'CMTooltipTime'), e.appendChild(n), 'b' === Bo)) {
          e.appendChild(oa('Production left till next achievement')),
            (e.lastChild.id = 'CMTooltipProductionLeftHeader');
          const t = document.createElement('div');
          (t.id = 'CMTooltipProductionLeft'), e.appendChild(t);
        }
        if ('b' === Bo) {
          e.appendChild(oa('Buildings (price / PP) left till next achievement')),
            (e.lastChild.id = 'CMTooltipNextAchievementHeader');
          const t = document.createElement('div');
          (t.id = 'CMTooltipNextAchievement'), e.appendChild(t);
        }
      }
      function na(e, t) {
        let o = '';
        return (
          (o =
            e.pp <= 0 || e.pp === 1 / 0
              ? mo
              : e.pp < pt
              ? no
              : e.pp === pt
              ? io
              : e.pp < ht[10][0]
              ? ro
              : e.pp < ht[20][0]
              ? so
              : e.pp < ht[30][0]
              ? lo
              : co),
          0 !==
            Number(
              Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings
                .PPSecondsLowerLimit,
            ) &&
            t / Ro() <
              Number(
                Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings
                  .PPSecondsLowerLimit,
              ) &&
            (o = no),
          Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings
            .PPOnlyConsiderBuyable &&
            t - Game.cookies > 0 &&
            (o = lo),
          o
        );
      }
      function ia() {
        let e = 1;
        return (
          Object.keys(Game.buffs).forEach((t) => {
            void 0 !== Game.buffs[t].multCpS && (e *= Game.buffs[t].multCpS);
          }),
          e
        );
      }
      function ra(e) {
        yt[e] &&
          0 === yt[e].won &&
          ((yt[e].won = 1), 'shadow' !== Game.Achievements[e].pool && (te += 1));
      }
      function sa() {
        me = 0;
        let e = 1;
        const t = {};
        Object.keys(Game.Objects).forEach((e) => {
          if (Game.Objects[e].minigameLoaded && Game.Objects[e].minigame.effs) {
            const o = Game.Objects[e].minigame.effs;
            Object.keys(o).forEach((e) => {
              t[e] ? (t[e] *= o[e]) : (t[e] = o[e]);
            });
          }
        }),
          (de = t),
          1 !== Game.ascensionMode &&
            (e +=
              0.01 *
              parseFloat(ae) *
              oe *
              (function () {
                let e = 0;
                if (
                  (wt('Heavenly chip secret') && (e += 0.05),
                  wt('Heavenly cookie stand') && (e += 0.2),
                  wt('Heavenly bakery') && (e += 0.25),
                  wt('Heavenly confectionery') && (e += 0.25),
                  wt('Heavenly key') && (e += 0.25),
                  (e *= 1 + 0.05 * bt('Dragon God')),
                  wt('Lucky digit') && (e *= 1.01),
                  wt('Lucky number') && (e *= 1.01),
                  wt('Lucky payout') && (e *= 1.01),
                  Game.hasGod)
                ) {
                  const t = Tt('creation');
                  1 === t ? (e *= 0.7) : 2 === t ? (e *= 0.8) : 3 === t && (e *= 0.9);
                }
                return e;
              })()),
          (e *= vt('cps')),
          wt('Heralds') && 1 !== Game.ascensionMode && (e *= 1 + 0.01 * Game.heralds),
          Object.keys(Game.cookieUpgrades).forEach((t) => {
            const o = Game.cookieUpgrades[t];
            wt(o.name) &&
              ('function' == typeof o.power
                ? (e *= 1 + 0.01 * Mt[o.name].power(Mt[o.name]))
                : (e *= 1 + 0.01 * o.power));
          }),
          wt('Specialized chocolate chips') && (e *= 1.01),
          wt('Designer cocoa beans') && (e *= 1.02),
          wt('Underworld ovens') && (e *= 1.03),
          wt('Exotic nuts') && (e *= 1.04),
          wt('Arcane sugar') && (e *= 1.05),
          wt('Increased merriness') && (e *= 1.15),
          wt('Improved jolliness') && (e *= 1.15),
          wt('A lump of coal') && (e *= 1.01),
          wt('An itchy sweater') && (e *= 1.01),
          wt("Santa's dominion") && (e *= 1.2),
          wt('Fortune #100') && (e *= 1.01),
          wt('Fortune #101') && (e *= 1.07),
          wt('Dragon scale') && (e *= 1.03);
        let o = 1;
        if (Tt) {
          let t = Tt('asceticism');
          1 === t ? (e *= 1.15) : 2 === t ? (e *= 1.1) : 3 === t && (e *= 1.05),
            (t = Tt('ages')),
            1 === t
              ? (e *= 1 + 0.15 * Math.sin((Zt / 1e3 / 10800) * Math.PI * 2))
              : 2 === t
              ? (e *= 1 + 0.15 * Math.sin((Zt / 1e3 / 43200) * Math.PI * 2))
              : 3 === t && (e *= 1 + 0.15 * Math.sin((Zt / 1e3 / 86400) * Math.PI * 2)),
            (t = Tt('decadence')),
            1 === t ? (o *= 0.93) : 2 === t ? (o *= 0.95) : 3 === t && (o *= 0.98),
            (t = Tt('industry')),
            1 === t ? (o *= 1.1) : 2 === t ? (o *= 1.06) : 3 === t && (o *= 1.03),
            (t = Tt('labor')),
            1 === t ? (o *= 0.97) : 2 === t ? (o *= 0.98) : 3 === t && (o *= 0.99);
        }
        wt("Santa's legacy") && (e *= 1 + 0.03 * (Game.santaLevel + 1));
        const a = te / 25;
        let n = 1;
        if (
          (wt("Santa's milk and cookies") && (n *= 1.05),
          (n *= 1 + 0.05 * bt('Breath of Milk')),
          Tt)
        ) {
          const e = Tt('mother');
          1 === e ? (n *= 1.1) : 2 === e ? (n *= 1.05) : 3 === e && (n *= 1.03);
        }
        n *= vt('milk');
        let i = 1;
        wt('Kitten helpers') && (i *= 1 + 0.1 * a * n),
          wt('Kitten workers') && (i *= 1 + 0.125 * a * n),
          wt('Kitten engineers') && (i *= 1 + 0.15 * a * n),
          wt('Kitten overseers') && (i *= 1 + 0.175 * a * n),
          wt('Kitten managers') && (i *= 1 + 0.2 * a * n),
          wt('Kitten accountants') && (i *= 1 + 0.2 * a * n),
          wt('Kitten specialists') && (i *= 1 + 0.2 * a * n),
          wt('Kitten experts') && (i *= 1 + 0.2 * a * n),
          wt('Kitten consultants') && (i *= 1 + 0.2 * a * n),
          wt('Kitten assistants to the regional manager') && (i *= 1 + 0.175 * a * n),
          wt('Kitten marketeers') && (i *= 1 + 0.15 * a * n),
          wt('Kitten analysts') && (i *= 1 + 0.125 * a * n),
          wt('Kitten executives') && (i *= 1 + 0.115 * a * n),
          wt('Kitten admins') && (i *= 1 + 0.11 * a * n),
          wt('Kitten angels') && (i *= 1 + 0.1 * a * n),
          wt('Fortune #103') && (i *= 1 + 0.05 * a * n),
          Object.keys(Ct).forEach((e) => {
            const t = Ct[e];
            let i = t.cps(t);
            1 !== Game.ascensionMode && (i *= (1 + 0.01 * t.level) * o),
              'Grandma' === t.name &&
                wt('Milkhelp&reg; lactose intolerance relief tablets') &&
                (i *= 1 + 0.05 * a * n),
              (me += t.amount * i);
          }),
          wt('"egg"') && (me += 9),
          (e *= i);
        let r = 1;
        if (
          (wt('Chicken egg') && (r *= 1.01),
          wt('Duck egg') && (r *= 1.01),
          wt('Turkey egg') && (r *= 1.01),
          wt('Quail egg') && (r *= 1.01),
          wt('Robin egg') && (r *= 1.01),
          wt('Ostrich egg') && (r *= 1.01),
          wt('Cassowary egg') && (r *= 1.01),
          wt('Salmon roe') && (r *= 1.01),
          wt('Frogspawn') && (r *= 1.01),
          wt('Shark egg') && (r *= 1.01),
          wt('Turtle egg') && (r *= 1.01),
          wt('Ant larva') && (r *= 1.01),
          wt('Century egg'))
        ) {
          let e = (10 * Math.floor((eo - Game.startDate) / 1e3 / 10)) / 60 / 60 / 24;
          (e = Math.min(e, 100)), (Ne = 1 + 0.1 * (1 - (1 - e / 100) ** 3)), (r *= Ne);
        }
        (e *= r),
          wt('Sugar baking') && (e *= 1 + 0.01 * Math.min(100, Game.lumps)),
          (e *= 1 + bt('Radiant Appetite'));
        const s = me * e;
        Object.keys(Game.CpsAchievements).forEach((e) => {
          s >= Game.CpsAchievements[e].threshold && ra(Game.CpsAchievements[e].name);
        }),
          (pe = s);
        const { n: l } = Game.shimmerTypes.golden,
          c = bt("Dragon's Fortune");
        for (let t = 0; t < l; t++) e *= 1 + 1.23 * c;
        const d = Game.bakeryName.toLowerCase();
        if (
          ('orteil' === d ? (e *= 0.99) : 'ortiel' === d && (e *= 0.98),
          wt('Elder Covenant') && (e *= 0.95),
          wt('Golden switch [off]'))
        ) {
          let t = 1.5;
          if (wt('Residual luck')) {
            const e = Game.goldenCookieUpgrades;
            Object.keys(e).forEach((o) => {
              wt(e[o]) && (t += 0.1);
            });
          }
          e *= t;
        }
        if (wt('Shimmering veil [off]')) {
          let t = 0.5;
          wt('Reinforced membrane') && (t += 0.1),
            wt('Delicate touch') && (t += 0.05),
            wt('Steadfast murmur') && (t += 0.05),
            wt('Glittering edge') && (t += 0.05),
            (e *= 1 + t);
        }
        wt('Magic shenanigans') && (e *= 1e3),
          wt('Occult obstruction') && (e *= 0),
          (me = Game.runModHookOnValue('cps', me)),
          (e *= ia()),
          (me *= e);
      }
      const la = [
          'Fortune #001',
          'Fortune #002',
          'Fortune #003',
          'Fortune #004',
          'Fortune #005',
          'Fortune #006',
          'Fortune #007',
          'Fortune #008',
          'Fortune #009',
          'Fortune #010',
          'Fortune #011',
          'Fortune #012',
          'Fortune #013',
          'Fortune #014',
          'Fortune #015',
          'Fortune #016',
          'Fortune #017',
          'Fortune #018',
          'Fortune #019',
          'Fortune #100',
          'Fortune #101',
          'Fortune #102',
          'Fortune #103',
          'Fortune #104',
        ],
        ca = [
          'Skull cookies',
          'Ghost cookies',
          'Bat cookies',
          'Slime cookies',
          'Pumpkin cookies',
          'Eyeball cookies',
          'Spider cookies',
        ],
        da = [
          'Christmas tree biscuits',
          'Snowflake biscuits',
          'Snowman biscuits',
          'Holly biscuits',
          'Candy cane biscuits',
          'Bell biscuits',
          'Present biscuits',
        ],
        ma = [
          'Pure heart biscuits',
          'Ardent heart biscuits',
          'Sour heart biscuits',
          'Weeping heart biscuits',
          'Golden heart biscuits',
          'Eternal heart biscuits',
          'Prism heart biscuits',
        ],
        pa = [
          'Elderwort biscuits',
          'Bakeberry cookies',
          'Duketater cookies',
          'Green yeast digestives',
          'Wheat slims',
          'Fern tea',
          'Ichor syrup',
        ];
      function ua(e) {
        return yt[e] ? yt[e].won : 0;
      }
      function ha() {
        let e = 0;
        Object.keys(Game.GrandmaSynergies).forEach((t) => {
          wt(Game.GrandmaSynergies[t]) && (e += 1);
        }),
          !ua('Elder') && e >= 7 && ra('Elder'),
          !ua('Veteran') && e >= 14 && ra('Veteran');
        let t = 0,
          o = 1,
          a = 1,
          n = 1e5;
        Object.keys(Ct).forEach((e) => {
          (t += Ct[e].amount),
            (n = Math.min(Ct[e].amount, n)),
            ua('Mathematician') ||
              (Ct[e].amount <
                Math.min(128, 2 ** (Game.ObjectsById.length - Game.Objects[e].id - 1)) &&
                (o = 0)),
            ua('Base 10') ||
              (Ct[e].amount < 10 * (Game.ObjectsById.length - Game.Objects[e].id) && (a = 0));
        }),
          n >= 1 && ra('One with everything'),
          1 === o && ra('Mathematician'),
          1 === a && ra('Base 10'),
          n >= 100 && ra('Centennial'),
          n >= 150 && ra('Centennial and a half'),
          n >= 200 && ra('Bicentennial'),
          n >= 250 && ra('Bicentennial and a half'),
          n >= 300 && ra('Tricentennial'),
          n >= 350 && ra('Tricentennial and a half'),
          n >= 400 && ra('Quadricentennial'),
          n >= 450 && ra('Quadricentennial and a half'),
          n >= 500 && ra('Quincentennial'),
          n >= 550 && ra('Quincentennial and a half'),
          n >= 600 && ra('Sexcentennial'),
          n >= 650 && ra('Sexcentennial and a half'),
          t >= 100 && ra('Builder'),
          t >= 500 && ra('Architect'),
          t >= 1e3 && ra('Engineer'),
          t >= 2500 && ra('Lord of Constructs'),
          t >= 5e3 && ra('Grand design'),
          t >= 7500 && ra('Ecumenopolis'),
          t >= 1e4 && ra('Myriad'),
          Z >= 20 && ra('Enhancer'),
          Z >= 50 && ra('Augmenter'),
          Z >= 100 && ra('Upgrader'),
          Z >= 200 && ra('Lord of Progress'),
          Z >= 300 && ra('The full picture'),
          Z >= 400 && ra("When there's nothing left to add"),
          Z >= 500 && ra('Kaizen'),
          Z >= 600 && ra('Beyond quality'),
          t >= 4e3 && Z >= 300 && ra('Polymath'),
          t >= 8e3 && Z >= 400 && ra('Renaissance baker'),
          Ct.Cursor.amount + Ct.Grandma.amount >= 777 && ra('The elder scrolls');
        let i = !0;
        Object.keys(ca).forEach((e) => {
          wt(ca[e]) || (i = !1);
        }),
          i && ra('Spooky cookies');
        let r = !0;
        if (
          (Object.keys(da).forEach((e) => {
            wt(da[e]) || (r = !1);
          }),
          r && ra('Let it snow'),
          wt('Fortune cookies'))
        ) {
          const e = Game.Tiers.fortune.upgrades;
          let t = 0;
          Object.keys(e).forEach((o) => {
            wt(e[o].name) && (t += 1);
          }),
            t >= e.length && ra('O Fortuna');
        }
      }
      function ga(e, t) {
        ta(), (Ct[e].amount += t);
        const o = Ct[e];
        'Cursor' === e
          ? (o.amount >= 1 && ra('Click'),
            o.amount >= 2 && ra('Double-click'),
            o.amount >= 50 && ra('Mouse wheel'),
            o.amount >= 100 && ra('Of Mice and Men'),
            o.amount >= 200 && ra('The Digital'),
            o.amount >= 300 && ra('Extreme polydactyly'),
            o.amount >= 400 && ra('Dr. T'),
            o.amount >= 500 && ra('Thumbs, phalanges, metacarpals'),
            o.amount >= 600 && ra('With her finger and her thumb'),
            o.amount >= 700 && ra('Gotta hand it to you'),
            o.amount >= 800 && ra("The devil's workshop"))
          : Object.keys(Game.Objects[o.name].tieredAchievs).forEach((e) => {
              o.amount >= Game.Tiers[Game.Objects[o.name].tieredAchievs[e].tier].achievUnlock &&
                ra(Game.Objects[o.name].tieredAchievs[e].name);
            });
        const a = te;
        return sa(), ha(), a !== te && sa(), me - Game.cookiesPs;
      }
      function fa(e, t, o) {
        let a = e,
          n = 0;
        for (; a < o; ) (a += 0.002 * Math.max(0.002, (a / Math.max(t, 100)) ** 0.5)), (n += 1);
        return n / Game.fps;
      }
      function ka() {
        null !== l('CMDispTooltipWarningParent') &&
          (0 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.ToolWarnPos
            ? ((l('CMDispTooltipWarningParent').style.top = 'auto'),
              (l('CMDispTooltipWarningParent').style.margin = '4px -4px'),
              (l('CMDispTooltipWarningParent').style.padding = '3px 4px'))
            : ((l('CMDispTooltipWarningParent').style.right = 'auto'),
              (l('CMDispTooltipWarningParent').style.margin = '4px'),
              (l('CMDispTooltipWarningParent').style.padding = '4px 3px')));
      }
      function Ca() {
        if ((ta(), 'none' !== l('tooltipAnchor').style.display && l('CMTooltipArea'))) {
          l('CMTooltipArea').innerHTML = '';
          const e = (function () {
            l('tooltip').firstChild.style.paddingBottom = '4px';
            const e = document.createElement('div');
            return (
              (e.style.border = '1px solid'),
              (e.style.padding = '4px'),
              (e.style.margin = '0px -4px'),
              (e.id = 'CMTooltipBorder'),
              (e.className = 'CMTextGray'),
              e
            );
          })();
          l('CMTooltipArea').appendChild(e),
            'b' === Bo
              ? (function () {
                  let e;
                  if (
                    (1 === Game.buyMode ? (wo = e) : (e = wo),
                    1 === Game.buyBulk
                      ? (e = Le)
                      : 10 === Game.buyBulk
                      ? (e = Ae)
                      : 100 === Game.buyBulk && (e = We),
                    (Fo = Game.Objects[Po].bulkPrice),
                    (Eo = e[Po].bonus),
                    1 ===
                      Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings
                        .TooltipBuildUpgrade && 1 === Game.buyMode)
                  ) {
                    if (
                      (aa(l('CMTooltipBorder')),
                      1 ===
                        Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings
                          .TooltipBuildUpgrade && 1 === Game.buyMode)
                    ) {
                      l('CMTooltipIncome').textContent = to(Eo, 2);
                      const t = Math.round((Eo / Game.cookiesPs) * 1e4);
                      Number.isFinite(t) && 0 !== t
                        ? (l('CMTooltipIncome').textContent += ` (${t / 100}% of income)`)
                        : (l('CMTooltipIncome').textContent += ` (<0${
                            Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings
                              .ScaleSeparator
                              ? ','
                              : '.'
                          }01% of income)`),
                        (l('CMTooltipBorder').className = oo + e[Po].colour),
                        Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings
                          .PPDisplayTime
                          ? (l('CMTooltipPP').textContent = Uo(e[Po].pp))
                          : (l('CMTooltipPP').textContent = to(e[Po].pp, 2)),
                        (l('CMTooltipPP').className = oo + e[Po].colour);
                      const o = Ho((Fo - (Game.cookies + Io())) / Ro());
                      (l('CMTooltipTime').textContent = o.text),
                        'Done!' === o.text && Game.cookies < e[Po].price
                          ? (l('CMTooltipTime').textContent = `${o.text} (with Wrink)`)
                          : (l('CMTooltipTime').textContent = o.text),
                        (l('CMTooltipTime').className = oo + o.colour);
                    }
                    (l('CMTooltipProductionLeftHeader').style.display = 'none'),
                      (l('CMTooltipTime').style.marginBottom = '0px');
                    for (const e of Object.keys(Game.Objects[Po].productionAchievs))
                      if (!Game.HasAchiev(Game.Objects[Po].productionAchievs[e].achiev.name)) {
                        const t = Game.Objects[Po].productionAchievs[e];
                        (l('CMTooltipTime').style.marginBottom = '4px'),
                          (l('CMTooltipProductionLeftHeader').style.display = ''),
                          (l('CMTooltipProductionLeft').className = `ProdAchievement${Po}`),
                          (l('CMTooltipProductionLeft').textContent = to(
                            t.pow - Ct[Po].totalCookies,
                            15,
                          )),
                          (l('CMTooltipProductionLeft').style.color = 'white');
                        break;
                      }
                    const t = je[Po];
                    if (t.AmountNeeded < 101) {
                      let e;
                      (l('CMTooltipProductionLeft').style.marginBottom = '4px'),
                        (l('CMTooltipNextAchievementHeader').style.display = ''),
                        (e = Game.cookiesPs
                          ? Math.max(t.price - (Game.cookies + Io()), 0) / Game.cookiesPs +
                            t.price / ga(Po, t.AmountNeeded)
                          : t.price / ga(Po, t.AmountNeeded)),
                        (l('CMTooltipNextAchievement').textContent = `${to(t.AmountNeeded)} / ${to(
                          t.price,
                        )} / `),
                        (l('CMTooltipNextAchievement').style.color = 'white');
                      const o = document.createElement('span');
                      Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings
                        .PPDisplayTime
                        ? (o.textContent = Uo(e))
                        : (o.textContent = to(e)),
                        (o.className = oo + na({ pp: e }, t.price)),
                        l('CMTooltipNextAchievement').appendChild(o);
                    } else
                      (l('CMTooltipNextAchievementHeader').style.display = 'none'),
                        (l('CMTooltipProductionLeft').style.marginBottom = '0px');
                  } else l('CMTooltipArea').style.display = 'none';
                })()
              : 'u' === Bo
              ? (function () {
                  if (
                    (aa(l('CMTooltipBorder')),
                    (Eo = ze[Game.UpgradesInStore[Po].name].bonus),
                    (Fo = Game.Upgrades[Game.UpgradesInStore[Po].name].getPrice()),
                    (No = ze[Game.UpgradesInStore[Po].name].bonusMouse),
                    1 ===
                      Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings
                        .TooltipBuildUpgrade)
                  ) {
                    l('CMTooltipIncome').textContent = to(Eo, 2);
                    const e = Math.round((Eo / Game.cookiesPs) * 1e4);
                    '0' === l('CMTooltipIncome').textContent
                      ? ((l('Bonus IncomeTitle').style.display = 'none'),
                        (l('CMTooltipIncome').style.display = 'none'),
                        (l('Payback PeriodTitle').style.display = 'none'),
                        (l('CMTooltipPP').style.display = 'none'))
                      : (Number.isFinite(e) && 0 !== e
                          ? (l('CMTooltipIncome').textContent += ` (${e / 100}% of income)`)
                          : (l('CMTooltipIncome').textContent += ` (<0${
                              Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings
                                .ScaleSeparator
                                ? ','
                                : '.'
                            }01% of income)`),
                        (l('CMTooltipBorder').className =
                          oo + ze[Game.UpgradesInStore[Po].name].colour)),
                      No &&
                        ((l('CMTooltipCookiePerClick').textContent = to(No)),
                        (l('CMTooltipCookiePerClick').style.display = 'block'),
                        (l('CMTooltipCookiePerClick').previousSibling.style.display = 'block')),
                      !Eo && No
                        ? ((l('CMTooltipPP').textContent = `${to(Fo / No)} Clicks`),
                          (l('CMTooltipPP').style.color = 'white'),
                          (l('Payback PeriodTitle').style.display = 'block'),
                          (l('CMTooltipPP').style.display = 'block'))
                        : (Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings
                            .PPDisplayTime
                            ? (l('CMTooltipPP').textContent = Uo(
                                ze[Game.UpgradesInStore[Po].name].pp,
                              ))
                            : (l('CMTooltipPP').textContent = to(
                                ze[Game.UpgradesInStore[Po].name].pp,
                                2,
                              )),
                          (l('CMTooltipPP').className =
                            oo + ze[Game.UpgradesInStore[Po].name].colour));
                    const t = Ho((Fo - (Game.cookies + Io())) / Ro());
                    if (
                      ((l('CMTooltipTime').textContent = t.text),
                      'Done!' === t.text && Game.cookies < Game.UpgradesInStore[Po].getPrice()
                        ? (l('CMTooltipTime').textContent = `${t.text} (with Wrink)`)
                        : (l('CMTooltipTime').textContent = t.text),
                      (l('CMTooltipTime').className = oo + t.colour),
                      'Chocolate egg' === Game.UpgradesInStore[Po].name)
                    ) {
                      (l('CMTooltipBorder').lastChild.style.marginBottom = '4px'),
                        l('CMTooltipBorder').appendChild(
                          oa('Cookies to be gained (Currently/Max)'),
                        );
                      const e = document.createElement('div');
                      (e.style.color = 'white'),
                        (e.textContent = `${to(0.05 * Game.cookies)} / ${to(De)}`),
                        l('CMTooltipBorder').appendChild(e);
                    }
                  } else l('CMTooltipArea').style.display = 'none';
                })()
              : 's' === Bo
              ? (function () {
                  if (
                    1 ===
                    Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.TooltipLump
                  ) {
                    const t = l('CMTooltipBorder');
                    t.appendChild(oa('Current Sugar Lump'));
                    const o = document.createElement('div');
                    (o.id = 'CMTooltipTime'), t.appendChild(o);
                    const a =
                      0 === (e = Game.lumpCurrentType)
                        ? { text: 'Normal', colour: mo }
                        : 1 === e
                        ? { text: 'Bifurcated', colour: io }
                        : 2 === e
                        ? { text: 'Golden', colour: ro }
                        : 3 === e
                        ? { text: 'Meaty', colour: so }
                        : 4 === e
                        ? { text: 'Caramelized', colour: co }
                        : { text: 'Unknown Sugar Lump', colour: lo };
                    (o.textContent = a.text), (o.className = oo + a.colour);
                  } else l('CMTooltipArea').style.display = 'none';
                  var e;
                })()
              : 'g' === Bo
              ? (function () {
                  const { minigame: e } = Game.Objects['Wizard tower'],
                    t = e.getSpellCost(e.spellsById[Po]);
                  if (
                    1 ===
                      Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings
                        .TooltipGrim &&
                    t <= e.magicM
                  ) {
                    const o = l('CMTooltipBorder');
                    o.appendChild(oa('Time Left'));
                    const a = document.createElement('div');
                    (a.id = 'CMTooltipTime'), o.appendChild(a);
                    const n = Ho(fa(e.magic, e.magicM, t));
                    if (((a.textContent = n.text), (a.className = oo + n.colour), t <= e.magic)) {
                      o.appendChild(oa('Recover Time'));
                      const a = document.createElement('div');
                      (a.id = 'CMTooltipRecover'), o.appendChild(a);
                      const n = Ho(fa(Math.max(0, e.magic - t), e.magicM, e.magic));
                      (a.textContent = n.text), (a.className = oo + n.colour);
                    }
                    if ('0' === Po) {
                      o.appendChild(oa('Cookies to be gained/lost'));
                      const e = document.createElement('div');
                      (e.id = 'x'), o.appendChild(e);
                      const t = document.createElement('span');
                      (t.style.color = '#33FF00'),
                        (t.textContent = to(
                          Math.max(Math.min(0.15 * Game.cookies, 60 * Game.cookiesPs * 30), 7),
                          2,
                        )),
                        e.appendChild(t);
                      const a = document.createElement('span');
                      (a.textContent = ' / '), e.appendChild(a);
                      const n = document.createElement('span');
                      (n.style.color = 'red'),
                        (n.textContent = to(
                          Math.min(
                            Game.cookies,
                            Math.min(0.15 * Game.cookies, 60 * Game.cookiesPs * 15) + 13,
                          ),
                          2,
                        )),
                        e.appendChild(n);
                    }
                    l('CMTooltipArea').appendChild(o);
                  } else l('CMTooltipArea').style.display = 'none';
                })()
              : 'p' === Bo
              ? (function () {
                  const { minigame: e } = Game.Objects.Farm;
                  if (
                    Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings
                      .TooltipPlots &&
                    0 !== e.plot[Po[1]][Po[0]][0]
                  ) {
                    const t =
                        e.plot[Po[1]][Po[0]][1] > e.plantsById[e.plot[Po[1]][Po[0]][0] - 1].mature,
                      o = e.plantsById[e.plot[Po[1]][Po[0]][0] - 1].name;
                    l('CMTooltipBorder').appendChild(oa('Reward (Current / Maximum)'));
                    const a = document.createElement('div');
                    (a.id = 'CMTooltipPlantReward'),
                      l('CMTooltipBorder').appendChild(a),
                      'Chocoroot' === o || 'White chocoroot' === o
                        ? (l('CMTooltipPlantReward').textContent = `${
                            t ? to(Math.min(0.03 * Game.cookies, 60 * Game.cookiesPs * 3)) : '0'
                          } / ${to(60 * Game.cookiesPs * 3)}`)
                        : 'Bakeberry' === o
                        ? (l('CMTooltipPlantReward').textContent = `${
                            t ? to(Math.min(0.03 * Game.cookies, 60 * Game.cookiesPs * 30)) : '0'
                          } / ${to(60 * Game.cookiesPs * 30)}`)
                        : 'Queenbeet' === o
                        ? (l('CMTooltipPlantReward').textContent = `${
                            t ? to(Math.min(0.04 * Game.cookies, 60 * Game.cookiesPs * 60)) : '0'
                          } / ${to(60 * Game.cookiesPs * 60)}`)
                        : 'Duketater' === o
                        ? (l('CMTooltipPlantReward').textContent = `${
                            t ? to(Math.min(0.08 * Game.cookies, 60 * Game.cookiesPs * 120)) : '0'
                          } / ${to(60 * Game.cookiesPs * 120)}`)
                        : (l('CMTooltipArea').style.display = 'none');
                  } else l('CMTooltipArea').style.display = 'none';
                })()
              : 'ha' === Bo
              ? (function () {
                  const { minigame: e } = Game.Objects.Farm;
                  if (
                    Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.TooltipLump
                  ) {
                    l('CMTooltipBorder').appendChild(oa('Cookies gained from harvesting:'));
                    let t = 0,
                      o = 0;
                    Game.keys[16] && Game.keys[17] && (o = 1);
                    for (let a = 0; a < 6; a++)
                      for (let n = 0; n < 6; n++)
                        if (e.plot[a][n][0] >= 1) {
                          const i = e.plot[a][n],
                            r = e.plantsById[i[0] - 1],
                            s = r.name;
                          let l = !0;
                          o && r.immortal && (l = !1),
                            i[1] < r.matureBase && (l = !1),
                            l && 'Bakeberry' === s
                              ? (t += Math.min(0.03 * Game.cookies, 60 * Game.cookiesPs * 30))
                              : (l && 'Chocoroot' === s) || 'White chocoroot' === s
                              ? (t += Math.min(0.03 * Game.cookies, 60 * Game.cookiesPs * 3))
                              : l && 'Queenbeet' === s
                              ? (t += Math.min(0.04 * Game.cookies, 60 * Game.cookiesPs * 60))
                              : l &&
                                'Duketater' === s &&
                                (t += Math.min(0.08 * Game.cookies, 60 * Game.cookiesPs * 120));
                        }
                    l('CMTooltipBorder').appendChild(document.createTextNode(to(t)));
                  } else l('CMTooltipArea').style.display = 'none';
                })()
              : 'wb' === Bo
              ? (function () {
                  (l('tooltip').innerHTML = ''), l('tooltip').appendChild(oa('Reward:'));
                  const e = document.createElement('div');
                  (e.id = 'CMWrinklerReward'),
                    'PopAllNormal' === Po
                      ? (e.textContent = to(Ue))
                      : 'PopFattest' === Po && (e.textContent = to(He[0])),
                    l('tooltip').appendChild(e);
                })()
              : ('pag' === Bo || ('pas' === Bo && -1 !== Po[1])) &&
                (function () {
                  if (
                    1 ===
                    Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings
                      .TooltipPantheon
                  ) {
                    const e = l('CMTooltipBorder');
                    let t;
                    (t = 'pas' === Bo ? Po[1] : Po), e.appendChild(oa('Effect in position 1:'));
                    const o = document.createElement('div');
                    if (((o.id = 'CMPantheonTooltipPosition1'), 0 !== kt[t][0])) {
                      o.textContent = to(kt[t][0]);
                      const e = Math.round((kt[t][0] / Game.cookiesPs) * 1e4);
                      Number.isFinite(e) && 0 !== e
                        ? (o.textContent += ` (${e / 100}% of income)`)
                        : (o.textContent += ` (<0${
                            Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings
                              .ScaleSeparator
                              ? ','
                              : '.'
                          }01% of income)`);
                    } else o.textContent = 'No effect to CPS';
                    e.appendChild(o), e.appendChild(oa('Effect in position 2:'));
                    const a = document.createElement('div');
                    if (((a.id = 'CMPantheonTooltipPosition2'), 0 !== kt[t][1])) {
                      a.textContent = to(kt[t][1]);
                      const e = Math.round((kt[t][1] / Game.cookiesPs) * 1e4);
                      Number.isFinite(e) && 0 !== e
                        ? (a.textContent += ` (${e / 100}% of income)`)
                        : (a.textContent += ` (<0${
                            Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings
                              .ScaleSeparator
                              ? ','
                              : '.'
                          }01% of income)`);
                    } else a.textContent = 'No effect to CPS';
                    e.appendChild(a), e.appendChild(oa('Effect in position 3:'));
                    const n = document.createElement('div');
                    if (((n.id = 'CMPantheonTooltipPosition2'), 0 !== kt[t][2])) {
                      n.textContent = to(kt[t][2]);
                      const e = Math.round((kt[t][2] / Game.cookiesPs) * 1e4);
                      Number.isFinite(e) && 0 !== e
                        ? (n.textContent += ` (${e / 100}% of income)`)
                        : (n.textContent += ` (<0${
                            Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings
                              .ScaleSeparator
                              ? ','
                              : '.'
                          }01% of income)`);
                    } else n.textContent = 'No effect to CPS';
                    e.appendChild(n), l('CMTooltipArea').appendChild(e);
                  } else l('CMTooltipArea').style.display = 'none';
                })(),
            (function () {
              if ('b' === Bo || 'u' === Bo) {
                null === document.getElementById('CMDispTooltipWarningParent') &&
                  (l('tooltipAnchor').appendChild(
                    (function () {
                      const e = document.createElement('div');
                      (e.style.position = 'absolute'),
                        (e.style.display = 'block'),
                        (e.style.left = 'auto'),
                        (e.style.bottom = 'auto'),
                        (e.id = 'CMDispTooltipWarningParent');
                      const t = function (e, t, o, a, n) {
                        const i = document.createElement('div');
                        (i.id = e),
                          (i.style.display = 'none'),
                          (i.style.transition = 'opacity 0.1s ease-out'),
                          (i.className = 'CMBorder' + t),
                          (i.style.padding = '2px'),
                          (i.style.background = '#000 url(img/darkNoise.png)');
                        const r = document.createElement('div');
                        i.appendChild(r);
                        const s = document.createElement('span');
                        (s.className = oo + t),
                          (s.style.fontWeight = 'bold'),
                          (s.textContent = o),
                          r.appendChild(s),
                          r.appendChild(document.createTextNode(a));
                        const l = document.createElement('div');
                        i.appendChild(l);
                        const c = document.createElement('span');
                        return (
                          (c.id = n),
                          l.appendChild(document.createTextNode('Deficit: ')),
                          l.appendChild(c),
                          i
                        );
                      };
                      return (
                        e.appendChild(
                          t(
                            'CMDispTooltipWarnLucky',
                            lo,
                            'Warning: ',
                            'Purchase of this item will put you under the number of Cookies required for "Lucky!"',
                            'CMDispTooltipWarnLuckyText',
                          ),
                        ),
                        (e.firstChild.style.marginBottom = '4px'),
                        e.appendChild(
                          t(
                            'CMDispTooltipWarnLuckyFrenzy',
                            ro,
                            'Warning: ',
                            'Purchase of this item will put you under the number of Cookies required for "Lucky!" (Frenzy)',
                            'CMDispTooltipWarnLuckyFrenzyText',
                          ),
                        ),
                        (e.lastChild.style.marginBottom = '4px'),
                        e.appendChild(
                          t(
                            'CMDispTooltipWarnConjure',
                            co,
                            'Warning: ',
                            'Purchase of this item will put you under the number of Cookies required for "Conjure Baked Goods"',
                            'CMDispTooltipWarnConjureText',
                          ),
                        ),
                        (e.lastChild.style.marginBottom = '4px'),
                        e.appendChild(
                          t(
                            'CMDispTooltipWarnConjureFrenzy',
                            co,
                            'Warning: ',
                            'Purchase of this item will put you under the number of Cookies required for "Conjure Baked Goods" (Frenzy)',
                            'CMDispTooltipWarnConjureFrenzyText',
                          ),
                        ),
                        (e.lastChild.style.marginBottom = '4px'),
                        e.appendChild(
                          t(
                            'CMDispTooltipWarnEdifice',
                            co,
                            'Warning: ',
                            'Purchase of this item will put you under the number of Cookies needed for "Spontaneous Edifice" to possibly give you your most expensive building"',
                            'CMDispTooltipWarnEdificeText',
                          ),
                        ),
                        (e.lastChild.style.marginBottom = '4px'),
                        e.appendChild(
                          t(
                            'CMDispTooltipWarnUser',
                            lo,
                            'Warning: ',
                            `Purchase of this item will put you under the number of Cookies equal to ${Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.ToolWarnUser} seconds of CPS`,
                            'CMDispTooltipWarnUserText',
                          ),
                        ),
                        e
                      );
                    })(),
                  ),
                  ka()),
                  0 ===
                  Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.ToolWarnPos
                    ? (l('CMDispTooltipWarningParent').style.right = '0px')
                    : (l('CMDispTooltipWarningParent').style.top = `${
                        l('tooltip').offsetHeight
                      }px`),
                  (l('CMDispTooltipWarningParent').style.width =
                    l('tooltip').offsetWidth - 6 + 'px');
                const e = Game.cookies + Io() - Fo,
                  t = Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings
                    .ToolWarnBon
                    ? Eo
                    : 0;
                let o = ke;
                if (
                  1 ===
                  Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.ToolWarnBon
                ) {
                  let e = Eo;
                  (e /= ia()), (o += (60 * e * 15) / 0.15);
                }
                if (
                  (1 ===
                    Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings
                      .ToolWarnLucky &&
                  e < o &&
                  ('b' !== Bo || 1 === Game.buyMode)
                    ? ((l('CMDispTooltipWarnLucky').style.display = ''),
                      (l('CMDispTooltipWarnLuckyText').textContent = `${to(o - e)} (${Uo(
                        (o - e) / (Ro() + t),
                      )})`))
                    : (l('CMDispTooltipWarnLucky').style.display = 'none'),
                  1 ===
                    Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings
                      .ToolWarnLuckyFrenzy)
                ) {
                  const a = 7 * o;
                  e < a && ('b' !== Bo || 1 === Game.buyMode)
                    ? ((l('CMDispTooltipWarnLuckyFrenzy').style.display = ''),
                      (l('CMDispTooltipWarnLuckyFrenzyText').textContent = `${to(a - e)} (${Uo(
                        (a - e) / (Ro() + t),
                      )})`))
                    : (l('CMDispTooltipWarnLuckyFrenzy').style.display = 'none');
                } else l('CMDispTooltipWarnLuckyFrenzy').style.display = 'none';
                if (
                  1 ===
                  Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings
                    .ToolWarnConjure
                ) {
                  const a = 2 * o;
                  e < a && ('b' !== Bo || 1 === Game.buyMode)
                    ? ((l('CMDispTooltipWarnConjure').style.display = ''),
                      (l('CMDispTooltipWarnConjureText').textContent = `${to(a - e)} (${Uo(
                        (a - e) / (Ro() + t),
                      )})`))
                    : (l('CMDispTooltipWarnConjure').style.display = 'none');
                } else l('CMDispTooltipWarnConjure').style.display = 'none';
                if (
                  1 ===
                  Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings
                    .ToolWarnConjureFrenzy
                ) {
                  const a = 2 * o * 7;
                  e < a && ('b' !== Bo || 1 === Game.buyMode)
                    ? ((l('CMDispTooltipWarnConjureFrenzy').style.display = ''),
                      (l('CMDispTooltipWarnConjureFrenzyText').textContent = `${to(a - e)} (${Uo(
                        (a - e) / (Ro() + t),
                      )})`))
                    : (l('CMDispTooltipWarnConjureFrenzy').style.display = 'none');
                } else l('CMDispTooltipWarnConjureFrenzy').style.display = 'none';
                1 ===
                  Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings
                    .ToolWarnEdifice &&
                Game.Objects['Wizard tower'].minigameLoaded &&
                xe &&
                e < xe &&
                ('b' !== Bo || 1 === Game.buyMode)
                  ? ((l('CMDispTooltipWarnEdifice').style.display = ''),
                    (l('CMDispTooltipWarnEdificeText').textContent = `${to(xe - e)} (${Uo(
                      (xe - e) / (Ro() + t),
                    )})`))
                  : (l('CMDispTooltipWarnEdifice').style.display = 'none'),
                  Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.ToolWarnUser >
                    0 &&
                  e <
                    Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings
                      .ToolWarnUser *
                      Ro() &&
                  ('b' !== Bo || 1 === Game.buyMode)
                    ? ((l('CMDispTooltipWarnUser').style.display = ''),
                      (l(
                        'CMDispTooltipWarnUser',
                      ).children[0].textContent = `Purchase of this item will put you under the number of Cookies equal to ${Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.ToolWarnUser} seconds of CPS`),
                      (l('CMDispTooltipWarnUserText').textContent = `${to(
                        Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings
                          .ToolWarnUser *
                          Ro() -
                          e,
                      )} (${Uo(
                        (Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings
                          .ToolWarnUser *
                          Ro() -
                          e) /
                          (Ro() + t),
                      )})`))
                    : (l('CMDispTooltipWarnUser').style.display = 'none');
              } else
                null !== l('CMDispTooltipWarningParent') &&
                  l('CMDispTooltipWarningParent').remove();
            })();
        } else
          null === l('CMTooltipArea') &&
            null !== l('CMDispTooltipWarningParent') &&
            l('CMDispTooltipWarningParent').remove();
      }
      function Ma() {
        if (
          Game.prefs.autosave &&
          Game.drawT % 10 == 0 &&
          'stats' === Game.onMenu &&
          Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.Stats
        ) {
          const e = document.getElementById('CMStatsAutosaveTimer');
          e && (e.innerText = Game.sayTime(60 * Game.fps - (Game.T % (60 * Game.fps)), 4));
        }
        Wo(),
          $o(),
          jo(),
          (function () {
            if (
              1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.TimerBar
            ) {
              const e = l('CMTimerBar').offsetWidth - 163,
                t = l('CMTimerBar').offsetWidth - 133;
              let o = 0;
              if (
                Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings
                  .AutosaveTimerBar &&
                Game.prefs.autosave
              ) {
                const e =
                  (60 * Game.fps - (Game.OnAscend ? 0 : Game.T % (60 * Game.fps))) / Game.fps;
                (l('CMTimerBarAutosave').style.display = ''),
                  (l('CMTimerBarAutosaveBar').style.width = `${Math.round(
                    (e * (t - 8 * Math.ceil(e).toString().length)) / 60,
                  )}px`),
                  Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings
                    .TimerBarOverlay >= 1
                    ? (l('CMTimerBarAutosaveBar').textContent = Math.ceil(e))
                    : (l('CMTimerBarAutosaveBar').textContent = ''),
                  (l('CMTimerBarAutosaveTime').textContent = Math.ceil(e)),
                  (o += 1);
              } else l('CMTimerBarAutosave').style.display = 'none';
              if (0 !== Game.shimmerTypes.golden.spawned || Game.Has('Golden switch [off]'))
                l('CMTimerBarGC').style.display = 'none';
              else {
                (l('CMTimerBarGC').style.display = ''),
                  (l('CMTimerBarGCMinBar').style.width = `${Math.round(
                    (Math.max(0, Game.shimmerTypes.golden.minTime - Game.shimmerTypes.golden.time) *
                      e) /
                      Game.shimmerTypes.golden.maxTime,
                  )}px`),
                  Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings
                    .TimerBarOverlay >= 1
                    ? (l('CMTimerBarGCMinBar').textContent = Math.ceil(
                        (Game.shimmerTypes.golden.minTime - Game.shimmerTypes.golden.time) /
                          Game.fps,
                      ))
                    : (l('CMTimerBarGCMinBar').textContent = ''),
                  Game.shimmerTypes.golden.minTime === Game.shimmerTypes.golden.maxTime
                    ? ((l('CMTimerBarGCMinBar').style.borderTopRightRadius = '10px'),
                      (l('CMTimerBarGCMinBar').style.borderBottomRightRadius = '10px'))
                    : ((l('CMTimerBarGCMinBar').style.borderTopRightRadius = ''),
                      (l('CMTimerBarGCMinBar').style.borderBottomRightRadius = '')),
                  (l('CMTimerBarGCBar').style.width = `${Math.round(
                    (Math.min(
                      Game.shimmerTypes.golden.maxTime - Game.shimmerTypes.golden.minTime,
                      Game.shimmerTypes.golden.maxTime - Game.shimmerTypes.golden.time,
                    ) *
                      e) /
                      Game.shimmerTypes.golden.maxTime,
                  )}px`),
                  Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings
                    .TimerBarOverlay >= 1
                    ? (l('CMTimerBarGCBar').textContent = Math.ceil(
                        Math.min(
                          Game.shimmerTypes.golden.maxTime - Game.shimmerTypes.golden.minTime,
                          Game.shimmerTypes.golden.maxTime - Game.shimmerTypes.golden.time,
                        ) / Game.fps,
                      ))
                    : (l('CMTimerBarGCBar').textContent = '');
                const t =
                  Math.max(
                    0,
                    (Game.shimmerTypes.golden.time - Game.shimmerTypes.golden.minTime) /
                      (Game.shimmerTypes.golden.maxTime - Game.shimmerTypes.golden.minTime),
                  ) ** 5;
                (l('CMTimerBarGCTime').textContent = `${Math.ceil(
                  (Game.shimmerTypes.golden.maxTime - Game.shimmerTypes.golden.time) / Game.fps,
                )} ${t < 0.01 ? '<' : ''}${t.toLocaleString('en', { style: 'percent' })}`),
                  (o += 1);
              }
              if ('christmas' === Game.season && 0 === Game.shimmerTypes.reindeer.spawned) {
                (l('CMTimerBarRen').style.display = ''),
                  (l('CMTimerBarRenMinBar').style.width = `${Math.round(
                    (Math.max(
                      0,
                      Game.shimmerTypes.reindeer.minTime - Game.shimmerTypes.reindeer.time,
                    ) *
                      e) /
                      Game.shimmerTypes.reindeer.maxTime,
                  )}px`),
                  Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings
                    .TimerBarOverlay >= 1
                    ? (l('CMTimerBarRenMinBar').textContent = Math.ceil(
                        (Game.shimmerTypes.reindeer.minTime - Game.shimmerTypes.reindeer.time) /
                          Game.fps,
                      ))
                    : (l('CMTimerBarRenMinBar').textContent = ''),
                  (l('CMTimerBarRenBar').style.width = `${Math.round(
                    (Math.min(
                      Game.shimmerTypes.reindeer.maxTime - Game.shimmerTypes.reindeer.minTime,
                      Game.shimmerTypes.reindeer.maxTime - Game.shimmerTypes.reindeer.time,
                    ) *
                      e) /
                      Game.shimmerTypes.reindeer.maxTime,
                  )}px`),
                  Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings
                    .TimerBarOverlay >= 1
                    ? (l('CMTimerBarRenBar').textContent = Math.ceil(
                        Math.min(
                          Game.shimmerTypes.reindeer.maxTime - Game.shimmerTypes.reindeer.minTime,
                          Game.shimmerTypes.reindeer.maxTime - Game.shimmerTypes.reindeer.time,
                        ) / Game.fps,
                      ))
                    : (l('CMTimerBarRenBar').textContent = '');
                const t =
                  Math.max(
                    0,
                    (Game.shimmerTypes.reindeer.time - Game.shimmerTypes.reindeer.minTime) /
                      (Game.shimmerTypes.reindeer.maxTime - Game.shimmerTypes.reindeer.minTime),
                  ) ** 5;
                (l('CMTimerBarRenTime').textContent = `${Math.ceil(
                  (Game.shimmerTypes.reindeer.maxTime - Game.shimmerTypes.reindeer.time) / Game.fps,
                )} ${t < 0.01 ? '<' : ''}${t.toLocaleString('en', { style: 'percent' })}`),
                  (o += 1);
              } else l('CMTimerBarRen').style.display = 'none';
              const a = {};
              (l('CMTimerBarBuffTimers').innerHTML = ''),
                Object.keys(Game.buffs).forEach((e) => {
                  if (Game.buffs[e]) {
                    const n = zo(Game.buffs[e].name, Game.buffs[e].name, [
                      { id: `${Game.buffs[e].name}Bar` },
                    ]);
                    n.style.display = '';
                    let i = '';
                    (i = void 0 !== So[Game.buffs[e].name] ? So[Game.buffs[e].name] : co),
                      (n.lastChild.children[1].className = ao + i),
                      (n.lastChild.children[1].style.color = 'black'),
                      2 ===
                      Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings
                        .TimerBarOverlay
                        ? (n.lastChild.children[1].textContent = `${Math.round(
                            (Game.buffs[e].time / Game.buffs[e].maxTime) * 100,
                          )}%`)
                        : (n.lastChild.children[1].textContent = ''),
                      (n.lastChild.children[1].style.width = `${Math.round(
                        (Game.buffs[e].time *
                          (t - 8 * Math.ceil(Game.buffs[e].time / Game.fps).toString().length)) /
                          Game.buffs[e].maxTime,
                      )}px`),
                      (n.lastChild.children[2].textContent = Math.ceil(
                        Game.buffs[e].time / Game.fps,
                      )),
                      (o += 1),
                      (a[Game.buffs[e].name] = n);
                  }
                }),
                Object.keys(a).forEach((e) => {
                  l('CMTimerBarBuffTimers').appendChild(a[e]);
                }),
                0 !== o && (l('CMTimerBar').style.height = 12 * o + 2 + 'px'),
                Do !== o && ((Do = o), Qo());
            }
          })(),
          _o(),
          Ca(),
          (function () {
            if (
              1 ===
                Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.TooltipWrink &&
              1 === Co
            ) {
              let e = !1;
              Object.keys(Game.wrinklers).forEach((t) => {
                const o = Game.wrinklers[t];
                if (o.phase > 0 && o.selected) {
                  if (((e = !0), 0 === yo[t] || void 0 === yo[t])) {
                    const e = document.createElement('div'),
                      o = document.createElement('div');
                    (o.style.minWidth = '120px'), (o.style.marginBottom = '4px');
                    const a = document.createElement('div');
                    (a.style.textAlign = 'center'),
                      (a.id = 'CMTooltipWrinkler'),
                      o.appendChild(a),
                      e.appendChild(o),
                      Game.tooltip.draw(this, escape(e.innerHTML)),
                      (Mo = t),
                      (yo[t] = 1);
                  }
                } else yo[t] = 0;
              }),
                e || Game.tooltip.hide();
            }
          })(),
          (function () {
            if (
              1 ===
                Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.TooltipWrink &&
              null !== l('CMTooltipWrinkler')
            ) {
              let { sucked: e } = Game.wrinklers[Mo],
                t = 1.1;
              if (
                (Game.Has('Sacrilegious corruption') && (t *= 1.05),
                1 === Game.wrinklers[Mo].type && (t *= 3),
                (e *= t),
                Game.Has('Wrinklerspawn') && (e *= 1.05),
                Ct.Temple.minigameLoaded)
              ) {
                const t = Game.hasGod('scorn');
                1 === t ? (e *= 1.15) : 2 === t ? (e *= 1.1) : 3 === t && (e *= 1.05);
              }
              l('CMTooltipWrinkler').textContent = to(e);
            }
          })(),
          Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.UpStats &&
            'stats' === Game.onMenu &&
            (Game.drawT - 1) % (5 * Game.fps) != 0 &&
            (Game.drawT - 1) % Game.fps == 0 &&
            Game.UpdateMenu(),
          B();
      }
      function ya() {
        P.addLatest(Game.computedMouseCps);
      }
      class ba {
        constructor(e) {
          (this.maxLength = e), (this.queue = []);
        }
        addLatest(e) {
          this.queue.push(e) > this.maxLength && this.queue.shift();
        }
        calcAverage(e) {
          let t = e;
          t > this.maxLength && (t = this.maxLength),
            t > this.queue.length && (t = this.queue.length);
          let o = 0;
          for (let e = this.queue.length - 1; e >= 0 && e > this.queue.length - 1 - t; e--)
            o += this.queue[e];
          return 0 === o ? 0 : o / t;
        }
        calcSum(e) {
          let t = e;
          return (
            t > this.maxLength && (t = this.maxLength),
            t > this.queue.length && (t = this.queue.length),
            0 === t ? 0 : this.queue.slice(-t).reduce((e, t) => e + t, 0)
          );
        }
      }
      function Ga(e) {
        'Cache' in window.CookieMonsterData || (window.CookieMonsterData.Cache = {}),
          Object.keys(e).forEach((t) => {
            const o = t.replace(/^Cache/, '');
            void 0 === e[t]
              ? (window.CookieMonsterData.Cache[o] = void 0)
              : (window.CookieMonsterData.Cache[o] = JSON.parse(JSON.stringify(e[t])));
          });
      }
      function va() {
        const e = Math.floor(Date.now() / 1e3);
        if ((Game.T / Game.fps) % 1 == 0) {
          let t = Game.cookies + ft;
          Game.cpsSucked > 0 && (t += $e), (st = Math.max(Game.cookiesEarned, t)), (t *= 0.05);
          const o = e - j,
            a = Math.max(0, Game.cookies - $) / o,
            n = Math.max(0, $e - U) / o,
            i = Math.max(0, He[0] - H) / o,
            r = Math.max(0, t - De) / o,
            s = (Game.cookieClicks - R) / o;
          for (let e = 0; e < o; e++)
            N.addLatest(a), O.addLatest(n), D.addLatest(i), L.addLatest(r), A.addLatest(s);
          (j = e), ($ = Game.cookies), (U = $e), (H = He[0]), (De = t), (R = Game.cookieClicks);
          const l =
            xo[Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.AvgCPSHist];
          (I = N.calcAverage(l)),
            (z = O.calcAverage(l)),
            (V = D.calcAverage(l)),
            (_ = L.calcAverage(l)),
            (X = I),
            1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.CalcWrink &&
              (X += z),
            2 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.CalcWrink &&
              (X += V);
          const c = Game.HasUnlocked('Chocolate egg') && !Game.Has('Chocolate egg');
          (lt =
            c || 0 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.CalcWrink
              ? I + z + (c ? _ : 0)
              : X),
            (Ve = A.calcAverage(
              To[Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.AvgClicksHist],
            ));
        }
        Ga({
          CacheRealCookiesEarned: st,
          CacheLastCPSCheck: j,
          CacheLastCookies: $,
          CacheLastWrinkCookies: U,
          CacheLastWrinkFattestCookies: H,
          CacheLastChoEgg: De,
          CacheLastClicks: R,
          CacheAverageGainBank: I,
          CacheAverageGainWrink: z,
          CacheAverageGainWrinkFattest: V,
          CacheAverageGainChoEgg: _,
          CacheAverageCPS: X,
          CacheAvgCPSWithChoEgg: lt,
          CacheAverageClicks: Ve,
        });
      }
      function wa(e, t, o, a, n) {
        let i = 0;
        for (let e = Math.max(0, o); e < Math.max(0, o + n); e++)
          i += Game.priceIncrease ** Math.max(0, e - a);
        let r = t * i;
        return (r = Game.modifyBuildingPrice(Game.Objects[e], r)), Math.ceil(r);
      }
      function xa(e, t) {
        Object.keys(e).forEach((o) => {
          if (
            Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.PPRigidelMode &&
            1 === t
          )
            e[o].colour = mo;
          else {
            e[o].colour = na(
              e[o],
              wa(o, Game.Objects[o].basePrice, Game.Objects[o].amount, Game.Objects[o].free, t),
            );
            for (
              let t = 0;
              t < Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.PPExcludeTop;
              t++
            )
              e[o].pp === ht[t][0] && (e[o].colour = mo);
          }
        });
      }
      function Ta(e, t) {
        Object.keys(e).forEach((o) => {
          const a = wa(
            o,
            Game.Objects[o].basePrice,
            Game.Objects[o].amount,
            Game.Objects[o].free,
            t,
          );
          Game.cookiesPs
            ? (e[o].pp = Math.max(a - (Game.cookies + Io()), 0) / Game.cookiesPs + a / e[o].bonus)
            : (e[o].pp = a / e[o].bonus),
            (Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.PPRigidelMode &&
              1 === t) ||
              ht.push([e[o].pp, t, a]);
        });
      }
      function Sa() {
        !(function () {
          (pt = 1 / 0),
            (ht = []),
            void 0 ===
              Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.PPExcludeTop &&
              (Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.PPExcludeTop = 0),
            Ta(Le, 1),
            Ta(Ae, 10),
            Ta(We, 100),
            ht.sort((e, t) => e[0] - t[0]);
          let e = Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.PPExcludeTop;
          if (
            Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings
              .PPOnlyConsiderBuyable
          )
            for (; ht[e][2] > Game.cookies && ((e += 1), ht.length !== e + 1); );
          (pt = ht[e][0]),
            (ut = ht[e][1]),
            xa(Le, 1),
            xa(Ae, 10),
            xa(We, 100),
            Ga({ CacheMinPP: pt, CacheMinPPBulk: ut, CachePPArray: ht });
        })(),
          Object.keys(ze).forEach((e) => {
            Game.cookiesPs
              ? (ze[e].pp =
                  Math.max(Game.Upgrades[e].getPrice() - (Game.cookies + Io()), 0) /
                    Game.cookiesPs +
                  Game.Upgrades[e].getPrice() / ze[e].bonus)
              : (ze[e].pp = Game.Upgrades[e].getPrice() / ze[e].bonus),
              Number.isNaN(ze[e].pp) && (ze[e].pp = 1 / 0),
              (ze[e].colour = na(ze[e], Game.Upgrades[e].getPrice()));
          }),
          (window.CookieMonsterData.Objects1 = JSON.parse(JSON.stringify(Le))),
          (window.CookieMonsterData.Objects10 = JSON.parse(JSON.stringify(Ae))),
          (window.CookieMonsterData.Objects100 = JSON.parse(JSON.stringify(We))),
          (window.CookieMonsterData.Upgrades = []),
          Object.entries(ze).forEach((e) => {
            window.CookieMonsterData.Upgrades[e[0]] = JSON.parse(JSON.stringify(e[1]));
          });
      }
      function Fa(e) {
        if (
          'toggle' === Game.Upgrades[e].pool ||
          (0 === Game.Upgrades[e].bought &&
            Game.Upgrades[e].unlocked &&
            'prestige' !== Game.Upgrades[e].pool)
        ) {
          ta(),
            'Shimmering veil [on]' === Mt[e].name
              ? (Mt['Shimmering veil [off]'].bought = 0)
              : 'Golden switch [on]' === Mt[e].name
              ? (Mt['Golden switch [off]'].bought = 0)
              : (Mt[e].bought = (Mt[e].bought + 1) % 2),
            Game.CountsAsUpgradeOwned(Game.Upgrades[e].pool) && (Z += 1),
            'Elder Pledge' === e
              ? ((ee += 1), ee > 0 && ra('Elder nap'), ee >= 5 && ra('Elder slumber'))
              : 'Elder Covenant' === e
              ? ra('Elder calm')
              : 'Prism heart biscuits' === e
              ? ra('Lovely cookies')
              : 'Heavenly key' === e && ra('Wholesome');
          const t = te;
          sa(), ha(), t !== te && sa();
          const o =
            (function () {
              let e = 0;
              wt('Thousand fingers') && (e += 0.1),
                wt('Million fingers') && (e *= 5),
                wt('Billion fingers') && (e *= 10),
                wt('Trillion fingers') && (e *= 20),
                wt('Quadrillion fingers') && (e *= 20),
                wt('Quintillion fingers') && (e *= 20),
                wt('Sextillion fingers') && (e *= 20),
                wt('Septillion fingers') && (e *= 20),
                wt('Octillion fingers') && (e *= 20),
                wt('Nonillion fingers') && (e *= 20),
                wt('Decillion fingers') && (e *= 20),
                wt('Unshackled cursors') && (e *= 25);
              let t = 0;
              Object.keys(Ct).forEach((e) => {
                t += Ct[e].amount;
              }),
                (t -= Ct.Cursor.amount),
                (e *= t),
                wt('Plastic mouse') && (e += 0.01 * me),
                wt('Iron mouse') && (e += 0.01 * me),
                wt('Titanium mouse') && (e += 0.01 * me),
                wt('Adamantium mouse') && (e += 0.01 * me),
                wt('Unobtainium mouse') && (e += 0.01 * me),
                wt('Eludium mouse') && (e += 0.01 * me),
                wt('Wishalloy mouse') && (e += 0.01 * me),
                wt('Fantasteel mouse') && (e += 0.01 * me),
                wt('Nevercrack mouse') && (e += 0.01 * me),
                wt('Armythril mouse') && (e += 0.01 * me),
                wt('Technobsidian mouse') && (e += 0.01 * me),
                wt('Plasmarble mouse') && (e += 0.01 * me),
                wt('Miraculite mouse') && (e += 0.01 * me),
                wt('Aetherice mouse') && (e += 0.01 * me),
                wt('Fortune #104') && (e += 0.01 * me);
              let o = 1;
              if (
                (wt("Santa's helpers") && (o *= 1.1),
                wt('Cookie egg') && (o *= 1.1),
                wt('Halo gloves') && (o *= 1.1),
                wt('Dragon claw') && (o *= 1.03),
                wt('Aura gloves') &&
                  (o *=
                    1 +
                    0.05 * Math.min(Game.Objects.Cursor.level, wt('Luminous gloves') ? 20 : 10)),
                (o *= vt('click')),
                Ct.Temple.minigameLoaded && Tt)
              ) {
                const e = Tt('labor');
                1 === e ? (o *= 1.15) : 2 === e ? (o *= 1.1) : 3 === e && (o *= 1.05);
              }
              Object.keys(Game.buffs).forEach((e) => {
                void 0 !== Game.buffs[e].multClick && (o *= Game.buffs[e].multClick);
              }),
                (o *= 1 + 0.05 * bt('Dragon Cursor'));
              let a =
                o *
                Game.ComputeCps(
                  1,
                  wt('Reinforced index finger') +
                    wt('Carpal tunnel prevention cream') +
                    wt('Ambidextrous'),
                  e,
                );
              return (
                (a = Game.runModHookOnValue('cookiesPerClick', a)),
                Game.hasBuff('Cursed finger') && (a = Game.buffs['Cursed finger'].power),
                a
              );
            })() - Game.computedMouseCps;
          return o ? [me - Game.cookiesPs, o] : [me - Game.cookiesPs];
        }
        return [];
      }
      function Ea(e) {
        const t = {};
        return (
          Object.keys(Game.Objects).forEach((o) => {
            (t[o] = {}), (t[o].bonus = ga(o, e)), 1 !== e && (Y = 1);
          }),
          t
        );
      }
      function Ba() {
        Object.keys(Game.Objects).forEach((e) => {
          (Le[e].price = wa(
            e,
            Game.Objects[e].basePrice,
            Game.Objects[e].amount,
            Game.Objects[e].free,
            1,
          )),
            (Ae[e].price = wa(
              e,
              Game.Objects[e].basePrice,
              Game.Objects[e].amount,
              Game.Objects[e].free,
              10,
            )),
            (We[e].price = wa(
              e,
              Game.Objects[e].basePrice,
              Game.Objects[e].amount,
              Game.Objects[e].free,
              100,
            )),
            (je[e].price = wa(
              e,
              Game.Objects[e].basePrice,
              Game.Objects[e].amount,
              Game.Objects[e].free,
              je[e].AmountNeeded,
            ));
        }),
          Ga({ CacheObjectsNextAchievement: je });
      }
      function Pa() {
        (Le = Ea(1)),
          (Ae = Ea(10)),
          (We = Ea(100)),
          (function () {
            ze = {};
            for (let e = 0; e < Game.UpgradesInStore.length; e++) {
              const t = Game.UpgradesInStore[e].name,
                o = Fa(t);
              'Elder Pledge' === t
                ? ((ze[t] = { bonus: Game.cookiesPs - I }),
                  1 ===
                  Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.CalcWrink
                    ? (ze[t].bonus -= z)
                    : 2 ===
                        Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings
                          .CalcWrink && (ze[t].bonus -= V),
                  Number.isFinite(ze[t].bonus) || (ze[t].bonus = 0))
                : ((ze[t] = {}), o[0] && (ze[t].bonus = o[0]), o[1] && (ze[t].bonusMouse = o[1]));
            }
          })();
      }
      function Na(e, t, o) {
        let a = 0,
          n = 0,
          i = 0,
          r = 0,
          s = 1 + Math.max(0, Math.ceil(Math.log(Game.cookies) / Math.LN10) - 10);
        for (; i < t * o; )
          (n = Math.max(e, Math.min(Math.floor((1 / 9) * 10 ** s * e * o), t * o))),
            (i = Math.max(e, Math.min(Math.floor((1 / 9) * 10 ** (s + 1) * e * o), t * o))),
            (r = Math.floor((1 / 9) * 10 ** (s + 1) * e * o)),
            (a += n),
            (s += 1);
        return [a, n, r];
      }
      function Oa() {
        let e = 60 * Se * 60 * 6 * Fe;
        const t = ia();
        t > 0 ? (e /= t) : (e = 0),
          (Ke = Na(7, e, Ee)),
          (qe = (2 * Ke[1]) / Ee),
          (Ye = Ke[2] / 60 / 60 / 6 / Fe),
          (et = Na(6, e, Be)),
          (Je = (2 * et[1]) / Be),
          (Ze = et[2] / 60 / 60 / 6 / Fe),
          (at = Na(7, 7 * e, Ee)),
          (tt = (2 * at[1]) / Ee),
          (ot = at[2] / 60 / 60 / 6 / Fe),
          (rt = Na(6, 7 * e, Be)),
          (nt = (2 * rt[1]) / Be),
          (it = rt[2] / 60 / 60 / 6 / Fe),
          Ga({
            CacheChainMaxReward: Ke,
            CacheChainRequired: qe,
            CacheChainRequiredNext: Ye,
            CacheChainWrathMaxReward: et,
            CacheChainWrathRequired: Je,
            CacheChainWrathRequiredNext: Ze,
            CacheChainFrenzyMaxReward: at,
            CacheChainFrenzyRequired: tt,
            CacheChainFrenzyRequiredNext: ot,
            CacheChainFrenzyWrathMaxReward: rt,
            CacheChainFrenzyWrathRequired: nt,
            CacheChainFrenzyWrathRequiredNext: it,
          });
      }
      function Da() {
        const e = Math.floor(Date.now() / 1e3);
        if ((Game.T / Game.fps) % 1 == 0) {
          const t = Game.HowMuchPrestige(Game.cookiesReset),
            o =
              Math.floor(Game.HowMuchPrestige(Game.cookiesReset + Game.cookiesEarned)) -
              Math.floor(t),
            a = e - Q,
            n = Math.max(0, o - q) / a;
          for (let e = 0; e < a; e++) W.addLatest(n);
          (Q = e), (q = o), (Pe = W.calcAverage(5));
        }
        Ga({ CacheLastHeavenlyCheck: Q, CacheLastHeavenlyChips: q, CacheHCPerSecond: Pe });
      }
      function La() {
        (_e = ''), (Qe = ''), (Xe = '');
        const e = [];
        Object.keys(Game.Upgrades).forEach((t) => {
          e.push(Game.Upgrades[t]);
        }),
          e.sort(function (e, t) {
            return e.order > t.order ? 1 : e.order < t.order ? -1 : 0;
          }),
          Object.keys(e).forEach((t) => {
            const o = e[t];
            if (0 === o.bought) {
              let e = '';
              (e += (function (e) {
                let t = 'crate upgrade missing';
                'prestige' === e.pool && (t += ' heavenly');
                let o = 0;
                Game.prefs.crates || (o = 1), o && (t += ' noFrame');
                let { icon: a } = e;
                e.iconFunction && (a = e.iconFunction());
                const n = `function() {return Game.crateTooltip(Game.UpgradesById[${e.id}], 'stats');}`;
                return `<div class="${t}"\n\t${Game.getDynamicTooltip(n, 'top', !0)}\n\tstyle = "${
                  a[2] ? `background-image: url(${a[2]});` : ''
                }background-position:${48 * -a[0]}px ${48 * -a[1]}px;">\n\t</div>`;
              })(o)),
                'prestige' === o.pool
                  ? (Xe += e)
                  : 'cookie' === o.pool
                  ? (Qe += e)
                  : 'toggle' !== o.pool && 'unused' !== o.pool && 'debug' !== o.pool && (_e += e);
            }
          });
      }
      function Aa() {
        if ('christmas' === Game.season) {
          let e = 60 * Game.cookiesPs;
          Game.hasBuff('Elder frenzy') && (e *= 0.5),
            Game.hasBuff('Frenzy') && (e *= 0.75),
            (Oe = Math.max(25, e)),
            Game.Has('Ho ho ho-flavored frosting') && (Oe *= 2);
        }
        Ga({ CacheSeaSpec: Oe });
      }
      function Wa() {
        (ke = (900 * Se) / 0.15), (ke *= Fe);
        const e = ia();
        e > 0 ? (ke /= e) : (ke = 0),
          (Ce = Ee * (0.15 * ke) + 13),
          (Me = Be * (0.15 * ke) + 13),
          (ye = 7 * ke),
          (be = Ee * (0.15 * ye) + 13),
          (Ge = Be * (0.15 * ye) + 13),
          (ve = 2 * ke),
          (we = 0.15 * ve),
          (xe = 0);
        let t = 0,
          o = 0;
        Object.keys(Game.Objects).forEach((e) => {
          Game.Objects[e].amount > t && (t = Game.Objects[e].amount),
            Game.Objects[e].amount > 0 && (o += 1);
        }),
          Object.keys(Game.Objects).forEach((e) => {
            (Game.Objects[e].amount < t || 1 === o) &&
              Game.Objects[e].amount < 400 &&
              2 * Game.Objects[e].price > xe &&
              ((xe = 2 * Game.Objects[e].price), (Te = e));
          }),
          Ga({
            CacheLucky: ke,
            CacheLuckyReward: Ce,
            CacheLuckyWrathReward: Me,
            CacheLuckyFrenzy: ye,
            CacheLuckyRewardFrenzy: be,
            CacheLuckyWrathRewardFrenzy: Ge,
            CacheConjure: ve,
            CacheConjureReward: we,
            CacheEdifice: xe,
            CacheEdificeBuilding: Te,
          });
      }
      function ja() {
        let e = 1,
          t = 1,
          o = 1;
        wt('Green yeast digestives') && (o *= 1.01),
          wt('Dragon fang') && (o *= 1.03),
          (e *= 1 + 0.1 * Game.auraMult('Ancestral Metamorphosis')),
          (e *= Game.eff('goldenCookieGain')),
          (t *= 1 + 0.1 * Game.auraMult('Unholy Dominion')),
          (t *= Game.eff('wrathCookieGain')),
          (Ee = o * e),
          (Be = o * t),
          (Fe = 1),
          0 === Game.shimmerTypes.golden.n && (Fe *= 1 + 1.23 * Game.auraMult("Dragon's Fortune")),
          Ga({
            CacheGoldenCookiesMult: Ee,
            CacheWrathCookiesMult: Be,
            CacheDragonsFortuneMultAdjustment: Fe,
          });
      }
      function $a(e) {
        const t = {};
        Object.keys(Game.Objects).forEach((o) => {
          if (0 !== Object.keys(je).length && je[o].TotalNeeded > Game.Objects[o].amount && !e)
            t[o] = {
              AmountNeeded: je[o].TotalNeeded - Game.Objects[o].amount,
              TotalNeeded: je[o].TotalNeeded,
              price: wa(
                o,
                Game.Objects[o].basePrice,
                Game.Objects[o].amount,
                Game.Objects[o].free,
                je[o].TotalNeeded - Game.Objects[o].amount,
              ),
            };
          else {
            const e = (function (e) {
              const t = Game.AchievementsOwned;
              let o = 100,
                a = 100;
              for (; o > -1; )
                if ((ga(e, o), te > t)) (a = o), (o -= 10);
                else {
                  if (100 === o) return 101;
                  for (o += 1; o <= a; ) {
                    if ((ga(e, o), te > t)) return o;
                    o += 1;
                  }
                }
              return 101;
            })(o);
            t[o] = {
              AmountNeeded: e,
              TotalNeeded: Game.Objects[o].amount + e,
              price: wa(
                o,
                Game.Objects[o].basePrice,
                Game.Objects[o].amount,
                Game.Objects[o].free,
                e,
              ),
            };
          }
        }),
          (je = t),
          Ga({ CacheObjectsNextAchievement: je });
      }
      function Ua() {
        ($e = 0), (Ue = 0), (He = [0, null]);
        for (let e = 0; e < Game.wrinklers.length; e++) {
          let { sucked: t } = Game.wrinklers[e],
            o = 1.1;
          if (
            (Game.Has('Sacrilegious corruption') && (o *= 1.05),
            1 === Game.wrinklers[e].type && (o *= 3),
            (t *= o),
            Game.Has('Wrinklerspawn') && (t *= 1.05),
            Ct.Temple.minigameLoaded)
          ) {
            const e = Game.hasGod('scorn');
            1 === e ? (t *= 1.15) : 2 === e ? (t *= 1.1) : 3 === e && (t *= 1.05);
          }
          ($e += t), 0 === Game.wrinklers[e].type && ((Ue += t), t > He[0] && (He = [t, e]));
        }
        Ga({ CacheWrinklersTotal: $e, CacheWrinklersNormal: Ue, CacheWrinklersFattest: He });
      }
      function Ha() {
        Yo(),
          Ua(),
          Wa(),
          ja(),
          Oa(),
          La(),
          Aa(),
          (N = new ba(xo[xo.length - 1])),
          (O = new ba(xo[xo.length - 1])),
          (D = new ba(xo[xo.length - 1])),
          (L = new ba(xo[xo.length - 1])),
          (A = new ba(To[To.length - 1])),
          (W = new ba(5)),
          (P = new ba(20 * To[To.length - 1])),
          Da(),
          $a(),
          va(),
          Pa(),
          Ba(),
          Sa();
      }
      function Ra() {
        Object.keys(Game.wrinklers).forEach((e) => {
          Game.wrinklers[e].sucked > 0 &&
            0 === Game.wrinklers[e].type &&
            (Game.wrinklers[e].hp = 0);
        });
      }
      function Ia(e, t) {
        if ('b' === e) {
          if (
            ((l('tooltip').innerHTML = Game.Objects[t].tooltip()),
            1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.TooltipAmor)
          ) {
            const e = wa(
                t,
                Game.Objects[t].basePrice,
                0,
                Game.Objects[t].free,
                Game.Objects[t].amount,
              ),
              o = e - Game.Objects[t].totalCookies;
            o > 0 &&
              (l('tooltip').innerHTML = l('tooltip')
                .innerHTML.split('so far</div>')
                .join(
                  `so far<br/>&bull; <b>${to(o)}</b> ${
                    1 === Math.floor(o) ? 'cookie' : 'cookies'
                  } left to amortize (${
                    Ho(
                      (e - Game.Objects[t].totalCookies) /
                        (Game.Objects[t].storedTotalCps * Game.globalCpsMult),
                    ).text
                  })</div>`,
                ));
          }
          -1 === Game.buyMode &&
            (l('tooltip').innerHTML = l('tooltip')
              .innerHTML.split(to(Game.Objects[t].bulkPrice))
              .join(
                to(
                  (Game.Objects[t],
                  Game.Objects[t].basePrice,
                  Game.Objects[t].amount,
                  Game.Objects[t].free,
                  Game.buyBulk,
                  1),
                ),
              ));
        } else if ('u' === e) {
          if (!Game.UpgradesInStore[t]) return '';
          l('tooltip').innerHTML = Game.crateTooltip(Game.UpgradesInStore[t], 'store');
        } else
          's' === e
            ? (l('tooltip').innerHTML = Game.lumpTooltip())
            : 'g' === e
            ? (l('tooltip').innerHTML = Game.Objects['Wizard tower'].minigame.spellTooltip(t)())
            : 'p' === e
            ? (l('tooltip').innerHTML = Game.ObjectsById[2].minigame.tileTooltip(t[0], t[1])())
            : 'ha' === e
            ? (l('tooltip').innerHTML = Game.ObjectsById[2].minigame.toolTooltip(1)())
            : 'wb' === e
            ? (l('tooltip').innerHTML = '')
            : 'pag' === e
            ? (l('tooltip').innerHTML = Game.Objects.Temple.minigame.godTooltip(t)())
            : 'pas' === e &&
              (l('tooltip').innerHTML = Game.Objects.Temple.minigame.slotTooltip(t[0])());
        if (
          ('b' === e && 1 === Game.buyMode) ||
          'u' === e ||
          's' === e ||
          'g' === e ||
          ('p' === e && !Game.keys[16]) ||
          'ha' === e ||
          'wb' === e ||
          'pag' === e ||
          ('pas' === e && -1 !== t[1])
        ) {
          const e = document.createElement('div');
          (e.id = 'CMTooltipArea'), l('tooltip').appendChild(e);
        }
        return (Bo = e), (Po = t), Ca(), l('tooltip').innerHTML;
      }
      function za() {
        1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.Favicon && It > 0
          ? ct.wrath
            ? (l('CMFavicon').href =
                'https://CookieMonsterTeam.github.io/CookieMonster/favicon/wrathCookie.ico')
            : (l('CMFavicon').href =
                'https://CookieMonsterTeam.github.io/CookieMonster/favicon/goldenCookie.ico')
          : (l('CMFavicon').href = 'https://orteil.dashnet.org/cookieclicker/favicon.ico');
      }
      function Va() {
        (Ct = []),
          Object.keys(Game.Objects).forEach((e) => {
            Ct[e] = Zo(e);
          }),
          (Mt = []),
          Object.keys(Game.Upgrades).forEach((e) => {
            Mt[e] = ea(e);
          }),
          (yt = []),
          Object.keys(Game.Achievements).forEach((e) => {
            yt[e] = Ko(e);
          }),
          ta();
      }
      function _a() {
        Game.Objects['Wizard tower'].minigameLoaded &&
          Object.keys(Game.Objects['Wizard tower'].minigame.spellsById).forEach((e) => {
            null !== l(`grimoireSpell${e}`).onmouseover &&
              ((Yt[e] = l(`grimoireSpell${e}`).onmouseover),
              (l(`grimoireSpell${e}`).onmouseover = function () {
                (Game.tooltip.dynamic = 1),
                  Game.tooltip.draw(this, () => Ia('g', `${e}`), 'this'),
                  Game.tooltip.wobble();
              }));
          });
      }
      function Xa() {
        if (!jt && Game.Objects['Wizard tower'].minigameLoaded) {
          const { minigame: e } = Game.Objects['Wizard tower'];
          (At = e.draw),
            (Game.Objects['Wizard tower'].minigame.draw = function () {
              At(),
                1 ===
                  Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.GrimoireBar &&
                  e.magic < e.magicM &&
                  Game.drawT % 5 == 0 &&
                  ((e.magicBarTextL.innerHTML += ` (${Uo(fa(e.magic, e.magicM, e.magicM))})`),
                  (e.magicBarL.style.width = '75%'));
            }),
            (jt = !0);
        }
      }
      function Qa() {
        !(function () {
          if (!Wt && Game.Objects['Wizard tower'].minigameLoaded) {
            const { minigame: e } = Game.Objects['Wizard tower'];
            (Dt = e.launch),
              (Lt = new Function(
                `return ${e.launch
                  .toString()
                  .split('=this')
                  .join("= Game.Objects['Wizard tower'].minigame")}`,
              )),
              (Game.Objects['Wizard tower'].minigame.launch = function () {
                Lt(), _a(), (jt = !1), Xa(), (Wt = !0);
              });
          }
        })(),
          Xa();
      }
      function qa() {
        if (ge !== Game.dragonLevel || ce) {
          if (
            Game.dragonLevel < 25 &&
            Game.dragonLevels[Game.dragonLevel].buy.toString().includes('sacrifice')
          ) {
            const e = Game.dragonLevels[Game.dragonLevel].buy.toString().match(/Objects\[(.*)\]/);
            let t = null !== e ? e[1] : Game.ObjectsById[Game.dragonLevel - 5].name;
            const o = Game.dragonLevels[Game.dragonLevel].buy
              .toString()
              .match(/sacrifice\((.*?)\)/)[1];
            if ('i' !== t)
              if (((t = t.replaceAll("'", '')), Game.Objects[t].amount < o))
                fe = 'Not enough buildings to sell';
              else {
                let e = 0;
                ta();
                for (let a = 0; a < o; a++) {
                  let o =
                    Ct[t].basePrice *
                    Game.priceIncrease ** Math.max(0, Ct[t].amount - 1 - Ct[t].free);
                  (o = Game.modifyBuildingPrice(Ct[t], o)),
                    (o = Math.ceil(o)),
                    (e += o),
                    (Ct[t].amount -= 1);
                }
                fe = `Cost to rebuy: ${to(e)}`;
              }
            else {
              let e = 0;
              ta(),
                Object.keys(Game.Objects).forEach((a) => {
                  if (((t = a), Game.Objects[t].amount < o)) fe = 'Not enough buildings to sell';
                  else {
                    for (let a = 0; a < o; a++) {
                      let o =
                        Ct[t].basePrice *
                        Game.priceIncrease ** Math.max(0, Ct[t].amount - 1 - Ct[t].free);
                      (o = Game.modifyBuildingPrice(Ct[t], o)),
                        (o = Math.ceil(o)),
                        (e += o),
                        (Ct[t].amount -= 1);
                    }
                    fe = `Cost to rebuy: ${to(e)}`;
                  }
                });
            }
          }
          ge = Game.dragonLevel;
        }
        Ga({ CacheLastDragonLevel: ge });
      }
      const Ya = {
          Favourite: 'Favourite Settings',
          Calculation: 'Calculation',
          Notation: 'Notation',
          Colours: 'Colours and colour coding',
          BarsDisplay: 'Infobars and visual settings',
          Tooltip: 'Tooltips',
          Statistics: 'Statistics',
          Notification: 'Notifications',
          Miscellaneous: 'Miscellaneous',
        },
        Ka = {
          NotificationGeneral: 'General Notifications',
          NotificationGC: 'Golden Cookie',
          NotificationFC: 'Fortune Cookie',
          NotificationSea: 'Season Special',
          NotificationGard: 'Garden Tick',
          NotificationMagi: 'Full Magic Bar',
          NotificationWrink: 'Wrinkler',
          NotificationWrinkMax: 'Maximum Wrinklers',
        },
        Ja = function (e) {
          if (1 === e) {
            const e = function () {
              try {
                Notification.requestPermission().then();
              } catch (e) {
                return !1;
              }
              return !0;
            };
            'Notification' in window
              ? e()
                ? Notification.requestPermission().then()
                : Notification.requestPermission()
              : console.log('This browser does not support notifications.');
          }
        };
      function Za() {
        BeautifyAll(), Game.RefreshStore(), Game.RebuildUpgrades(), _o(), Wo(), $o();
      }
      function en() {
        1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.BotBar
          ? ((l('CMBotBar').style.display = ''), _o())
          : (l('CMBotBar').style.display = 'none'),
          Qo();
      }
      const tn = {
        CPSMode: new S(
          1,
          'bool',
          'Calculation',
          ['Current cookies per second', 'Average cookies per second'],
          'Calculate times using current cookies per second or average cookies per second',
          !1,
        ),
        AvgCPSHist: new S(
          3,
          'bool',
          'Calculation',
          [
            'Average CPS in past 10s',
            'Average CPS in past 15s',
            'Average CPS in past 30s',
            'Average CPS in past 1m',
            'Average CPS in past 5m',
            'Average CPS in past 10m',
            'Average CPS in past 15m',
            'Average CPS in past 30m',
          ],
          'How much time average Cookies Per Second should consider',
          !1,
        ),
        AvgClicksHist: new S(
          0,
          'bool',
          'Calculation',
          [
            'Average clicks in past 1s',
            'Average clicks in past 5s',
            'Average clicks in past 10s',
            'Average clicks in past 15s',
            'Average clicks in past 30s',
          ],
          'How much time average Cookie Clicks should consider',
          !1,
        ),
        CalcWrink: new F(
          0,
          'bool',
          'Calculation',
          [
            'Calculate with wrinklers OFF',
            'Calculate with wrinklers ON',
            'Calculate with single fattest wrinkler ON',
          ],
          'Calculate times and average Cookies Per Second with (only the single non-shiny fattest) wrinklers',
          !0,
          () => {
            ce = !0;
          },
        ),
        Scale: new F(
          2,
          'bool',
          'Notation',
          [
            "Game's setting scale",
            'Metric',
            'Short scale',
            'Short scale (Abbreviated)',
            'Scientific notation',
            'Engineering notation',
          ],
          'Change how long numbers are formatted',
          !1,
          () => {
            Za();
          },
        ),
        ScaleDecimals: new F(
          2,
          'bool',
          'Notation',
          ['1 decimals', '2 decimals', '3 decimals'],
          'Set the number of decimals used when applicable. This only works with Cookie Monster scales and not with "Game\'s Setting Scale"',
          !1,
          () => {
            Za();
          },
        ),
        ScaleSeparator: new F(
          0,
          'bool',
          'Notation',
          ['. for decimals (standard)', '. for thousands'],
          'Set the separator used for decimals and thousands',
          !1,
          () => {
            Za();
          },
        ),
        ScaleCutoff: new T(
          999999,
          'numscale',
          'Notation',
          'Notation cut-off point: ',
          'The number from which Cookie Monster will start formatting numbers based on chosen scale. Standard is 999,999. Setting this above 999,999,999 might break certain notations',
          1,
          999999999,
        ),
        TimeFormat: new S(
          0,
          'bool',
          'Notation',
          ['Time XXd, XXh, XXm, XXs', 'Time XX:XX:XX:XX:XX', 'Time XXx, XXx'],
          'Change the time format',
          !1,
        ),
        DetailedTime: new F(
          1,
          'bool',
          'Notation',
          ['Detailed time OFF', 'Detailed time ON'],
          'Change how time is displayed in certain statistics and tooltips',
          !0,
          () => {
            1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.DetailedTime
              ? (Game.sayTime = bo)
              : (Game.sayTime = Jt.sayTime);
          },
        ),
        PPDisplayTime: new S(
          0,
          'bool',
          'Notation',
          ['PP as value (standard)', 'PP as time unit'],
          'Display PP as calculated value or as approximate time unit. Note that PP does not translate directly into a time unit and this is therefore only an approximation.',
          !1,
        ),
        BuildColour: new F(
          1,
          'bool',
          'Colours',
          ['Building colours OFF', 'Building colours ON'],
          'Colour code buildings',
          !0,
          () => {
            Wo();
          },
        ),
        PPOnlyConsiderBuyable: new S(
          0,
          'bool',
          'Colours',
          ["Don't ignore non-buyable", 'Ignore non-buyable'],
          "Makes Cookie Monster label buildings and upgrades you can't buy right now red, useful in those situations where you just want to spend your full bank 'most optimally'",
          !0,
        ),
        PPExcludeTop: new S(
          0,
          'bool',
          'Colours',
          [
            "Don't ignore any",
            'Ignore 1st best',
            'Ignore 1st and 2nd best',
            'Ignore 1st, 2nd and 3rd best',
          ],
          'Makes Cookie Monster ignore the 1st, 2nd or 3rd best buildings in labeling and colouring PP values',
          !0,
        ),
        PPRigidelMode: new S(
          0,
          'bool',
          'Colours',
          ['Rigidel mode OFF', 'Rigidel mode ON'],
          'Makes Cookie Monster ignore all "buy 1" options when colouring PP in order to stay at a total building count ending in 10 for pantheon god Rigidel',
          !0,
        ),
        PPSecondsLowerLimit: new T(
          0,
          'numscale',
          'Colours',
          'Lower limit for PP (in seconds): ',
          'If a building or upgrade costs less than the specified seconds of CPS it will also be considered optimal and label it as such ("PP is less than xx seconds of CPS"); setting to 0 ignores this option',
          0,
          1 / 0,
        ),
        ColourBlue: new x(
          '#4bb8f0',
          'colour',
          'Colours',
          'Standard colour is blue. Used to show upgrades better than best PP building, for Click Frenzy bar, and for various labels',
        ),
        ColourGreen: new x(
          '#00ff00',
          'colour',
          'Colours',
          'Standard colour is green. Used to show best PP building, for Blood Frenzy bar, and for various labels',
        ),
        ColourYellow: new x(
          '#ffff00',
          'colour',
          'Colours',
          'Standard colour is yellow. Used to show buildings within the top 10 of PP, for Frenzy bar, and for various labels',
        ),
        ColourOrange: new x(
          '#ff7f00',
          'colour',
          'Colours',
          'Standard colour is orange. Used to show buildings within the top 20 of PP, for Next Reindeer bar, and for various labels',
        ),
        ColourRed: new x(
          '#ff0000',
          'colour',
          'Colours',
          'Standard colour is Red. Used to show buildings within the top 30 of PP, for Clot bar, and for various labels',
        ),
        ColourPurple: new x(
          '#ff00ff',
          'colour',
          'Colours',
          'Standard colour is purple. Used to show buildings outside of the top 30 of PP, for Next Cookie bar, and for various labels',
        ),
        ColourGray: new x(
          '#b3b3b3',
          'colour',
          'Colours',
          'Standard colour is gray. Used to show negative or infinity PP, and for Next Cookie/Next Reindeer bar',
        ),
        ColourPink: new x(
          '#ff1493',
          'colour',
          'Colours',
          'Standard colour is pink. Used for Dragonflight bar',
        ),
        ColourBrown: new x(
          '#8b4513',
          'colour',
          'Colours',
          'Standard colour is brown. Used for Dragon Harvest bar',
        ),
        BotBar: new F(
          1,
          'bool',
          'BarsDisplay',
          ['Bottom bar OFF', 'Bottom bar ON'],
          'Building information',
          !0,
          () => {
            en();
          },
        ),
        TimerBar: new F(
          1,
          'bool',
          'BarsDisplay',
          ['Timer bar OFF', 'Timer bar ON'],
          'Bar with timers for golden cookie, season popup, Frenzy (Normal, Clot, Elder), Click Frenzy',
          !0,
          () => {
            qo();
          },
        ),
        TimerBarPos: new F(
          0,
          'bool',
          'BarsDisplay',
          ['Timer bar position (top left)', 'Timer bar position (bottom)'],
          'Placement of the timer bar',
          !1,
          () => {
            0 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.TimerBarPos
              ? ((l('CMTimerBar').style.width = '30%'),
                (l('CMTimerBar').style.bottom = ''),
                l('game').insertBefore(l('CMTimerBar'), l('sectionLeft')))
              : ((l('CMTimerBar').style.width = '100%'),
                (l('CMTimerBar').style.bottom = '0px'),
                l('wrapper').appendChild(l('CMTimerBar'))),
              Qo();
          },
        ),
        TimerBarOverlay: new S(
          2,
          'bool',
          'BarsDisplay',
          ['Timer bar overlay OFF', 'Timer bar overlay only seconds', 'Timer bar overlay full'],
          'Overlay on timers displaying seconds and/or percentage left',
          !0,
        ),
        AutosaveTimerBar: new S(
          0,
          'bool',
          'BarsDisplay',
          ['Autosave timer bar OFF', 'Autosave timer bar ON'],
          'Show a timer counting down till next autosave in the timer bar',
          !0,
        ),
        UpBarColour: new F(
          1,
          'bool',
          'BarsDisplay',
          [
            'Upgrade colours/bar OFF',
            'Upgrade colours with bar ON',
            'Upgrade colours without bar ON',
          ],
          'Colour code upgrades and optionally add a counter bar',
          !1,
          () => {
            1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.UpBarColour
              ? ((l('CMUpgradeBar').style.display = ''), $o())
              : 2 ===
                Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.UpBarColour
              ? ((l('CMUpgradeBar').style.display = 'none'), $o())
              : ((l('CMUpgradeBar').style.display = 'none'), Game.RebuildUpgrades());
          },
        ),
        UpgradeBarFixedPos: new F(
          1,
          'bool',
          'BarsDisplay',
          ['Upgrade bar fixed position OFF', 'Upgrade bar fixed position ON'],
          'Lock the upgrade bar at top of the screen to prevent it from moving ofscreen when scrolling',
          !0,
          () => {
            1 ===
            Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.UpgradeBarFixedPos
              ? ((l('CMUpgradeBar').style.position = 'sticky'),
                (l('CMUpgradeBar').style.top = '0px'))
              : (l('CMUpgradeBar').style.position = '');
          },
        ),
        SortBuildings: new F(
          0,
          'bool',
          'BarsDisplay',
          [
            'Sort buildings: default',
            'Sort buildings: PP of x1 purchase',
            'Sort buildings: PP of selected bulk mode',
            'Sort buildings: price until next achievement',
          ],
          'Sort the display of buildings in default order, by PP, or until next achievement',
          !1,
          () => {
            Wo();
          },
        ),
        SortUpgrades: new F(
          0,
          'bool',
          'BarsDisplay',
          ['Sort upgrades: default', 'Sort upgrades: PP'],
          'Sort the display of upgrades in either default order or by PP',
          !1,
          () => {
            $o();
          },
        ),
        UpgradesNeverCollapse: new F(
          0,
          'bool',
          'BarsDisplay',
          ['Upgrades always expanded OFF', 'Upgrades always expanded ON'],
          'Toggle to make the upgrades sections always expanded to the size needed to display all upgrades',
          !0,
          () => {
            jo();
          },
        ),
        DragonAuraInfo: new S(
          1,
          'bool',
          'BarsDisplay',
          ['Extra dragon aura info OFF', 'Extra dragon aura info ON'],
          'Shows information about changes in CPS and costs in the dragon aura interface.',
          !0,
        ),
        GrimoireBar: new S(
          1,
          'bool',
          'BarsDisplay',
          ['Grimoire magic meter timer OFF', 'Grimoire magic meter timer ON'],
          'A timer overlay showing how long till the Grimoire magic meter is full',
          !0,
        ),
        GCTimer: new F(
          1,
          'bool',
          'BarsDisplay',
          ['Golden cookie timer OFF', 'Golden cookie timer ON'],
          'A timer on the golden cookie when it has been spawned',
          !0,
          () => {
            1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.GCTimer
              ? Object.keys(Lo).forEach((e) => {
                  (Lo[e].style.display = 'block'),
                    (Lo[e].style.left = gt[e].l.style.left),
                    (Lo[e].style.top = gt[e].l.style.top);
                })
              : Object.keys(Lo).forEach((e) => (Lo[e].style.display = 'none'));
          },
        ),
        Favicon: new F(
          1,
          'bool',
          'BarsDisplay',
          ['Favicon OFF', 'Favicon ON'],
          'Update favicon with golden/wrath cookie',
          !0,
          () => {
            za();
          },
        ),
        WrinklerButtons: new F(
          1,
          'bool',
          'BarsDisplay',
          ['Extra wrinkler buttons OFF', 'Extra wrinkler buttons ON'],
          'Show buttons for popping wrinklers at bottom of cookie section',
          !0,
          () => {
            B();
          },
        ),
        HideSectionsButtons: new F(
          0,
          'bool',
          'BarsDisplay',
          ['Hide buildings/upgrades button OFF', 'Hide buildings/upgrades button ON'],
          'Show buttons for hiding and showing the buildings and upgrades sections in the right column',
          !0,
          () => {
            Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.HideSectionsButtons
              ? (l('CMSectionHidButtons').style.display = '')
              : (l('CMSectionHidButtons').style.display = 'none');
          },
        ),
        TooltipBuildUpgrade: new S(
          1,
          'bool',
          'Tooltip',
          ['Building/upgrade tooltip information OFF', 'Building/upgrade tooltip information ON'],
          'Extra information in building/upgrade tooltips',
          !0,
        ),
        TooltipAmor: new S(
          0,
          'bool',
          'Tooltip',
          [
            'Buildings tooltip amortization information OFF',
            'Buildings tooltip amortization information ON',
          ],
          'Add amortization information to buildings tooltip',
          !0,
        ),
        ToolWarnLucky: new S(
          1,
          'bool',
          'Tooltip',
          ['Tooltip lucky warning OFF', 'Tooltip lucky warning ON'],
          'A warning when buying if it will put the bank under the amount needed for max "Lucky!" rewards',
          !0,
        ),
        ToolWarnLuckyFrenzy: new S(
          1,
          'bool',
          'Tooltip',
          ['Tooltip lucky frenzy warning OFF', 'Tooltip lucky frenzy warning ON'],
          'A warning when buying if it will put the bank under the amount needed for max "Lucky!" (Frenzy) rewards',
          !0,
        ),
        ToolWarnConjure: new S(
          1,
          'bool',
          'Tooltip',
          ['Tooltip conjure warning OFF', 'Tooltip conjure warning ON'],
          'A warning when buying if it will put the bank under the amount needed for max "Conjure Baked Goods" rewards',
          !0,
        ),
        ToolWarnConjureFrenzy: new S(
          1,
          'bool',
          'Tooltip',
          ['Tooltip conjure frenzy warning OFF', 'Tooltip conjure frenzy warning ON'],
          'A warning when buying if it will put the bank under the amount needed for max "Conjure Baked Goods" rewards with Frenzy active',
          !0,
        ),
        ToolWarnEdifice: new S(
          1,
          'bool',
          'Tooltip',
          ['Tooltip edifice warning OFF', 'Tooltip edifice warning ON'],
          'A warning when buying if it will put the bank under the amount needed for "Spontaneous Edifice" to possibly give you your most expensive building',
          !0,
        ),
        ToolWarnUser: new T(
          0,
          'numscale',
          'Tooltip',
          'Tooltip warning at x times CPS: ',
          'Use this to show a customized warning if buying it will put the bank under the amount equal to value times cps; setting to 0 disables the function altogether',
          0,
          1 / 0,
        ),
        ToolWarnBon: new S(
          1,
          'bool',
          'Tooltip',
          [
            'Calculate tooltip warning with bonus CPS OFF',
            'Calculate tooltip warning with bonus CPS ON',
          ],
          'Calculate the warning with or without the bonus CPS you get from buying',
          !0,
        ),
        ToolWarnPos: new F(
          1,
          'bool',
          'Tooltip',
          ['Tooltip warning position (left)', 'Tooltip warning position (bottom)'],
          'Placement of the warning boxes',
          !1,
          () => {
            ka();
          },
        ),
        TooltipGrim: new S(
          1,
          'bool',
          'Tooltip',
          ['Grimoire tooltip information OFF', 'Grimoire tooltip information ON'],
          'Extra information in tooltip for grimoire',
          !0,
        ),
        TooltipWrink: new S(
          1,
          'bool',
          'Tooltip',
          ['Wrinkler tooltip OFF', 'Wrinkler tooltip ON'],
          'Shows the amount of cookies a wrinkler will give when popping it',
          !0,
        ),
        TooltipLump: new S(
          1,
          'bool',
          'Tooltip',
          ['Sugar lump tooltip OFF', 'Sugar lump tooltip ON'],
          'Shows the current Sugar Lump type in Sugar lump tooltip.',
          !0,
        ),
        TooltipPlots: new S(
          1,
          'bool',
          'Tooltip',
          ['Garden plots tooltip OFF', 'Garden plots tooltip ON'],
          'Shows a tooltip for plants that have a cookie reward.',
          !0,
        ),
        TooltipPantheon: new S(
          1,
          'bool',
          'Tooltip',
          ['Pantheon tooltip OFF', 'Pantheon tooltip ON'],
          'Shows additional info in the pantheon tooltip',
          !0,
        ),
        TooltipAscendButton: new S(
          1,
          'bool',
          'Tooltip',
          ['Show Extra Info Ascend Tooltip OFF', 'Show Extra Info Ascend Tooltip ON'],
          'Shows additional info in the ascend tooltip',
          !0,
        ),
        Stats: new S(
          1,
          'bool',
          'Statistics',
          ['Statistics OFF', 'Statistics ON'],
          'Extra Cookie Monster statistics!',
          !0,
        ),
        MissingUpgrades: new S(
          1,
          'bool',
          'Statistics',
          ['Missing upgrades OFF', 'Missing upgrades ON'],
          'Shows missing upgrades in statistics menu',
          !0,
        ),
        MissingAchievements: new S(
          0,
          'bool',
          'Statistics',
          ['Missing Achievements OFF', 'Missing Normal Achievements ON'],
          'Shows missing normal achievements in statistics menu.',
          !0,
        ),
        UpStats: new S(
          1,
          'bool',
          'Statistics',
          ['Statistics update rate (default)', 'Statistics update rate (1s)'],
          'Default rate is once every 5 seconds',
          !1,
        ),
        HeavenlyChipsTarget: new T(
          1,
          'numscale',
          'Statistics',
          'Heavenly chips target: ',
          'Use this to set a heavenly chips target that will be counted towards in the "prestige" statsistics sections',
          1,
          1 / 0,
        ),
        ShowMissedGC: new S(
          1,
          'bool',
          'Statistics',
          ['Missed GC OFF', 'Missed GC ON'],
          'Show a stat in the statistics screen that counts how many golden cookies you have missed',
          !0,
        ),
        Title: new S(
          1,
          'bool',
          'NotificationGeneral',
          ['Title OFF', 'Title ON', 'Title pinned tab highlight'],
          'Update title with colden cookie/season popup timers; pinned tab highlight only changes the title when a golden cookie/season popup spawns; "!" means that golden cookie/reindeer can spawn',
          !0,
        ),
        GeneralSound: new S(
          1,
          'bool',
          'NotificationGeneral',
          ['Consider game volume setting OFF', 'Consider game volume setting ON'],
          'Turning this toggle to "off" makes Cookie Monster no longer consider the volume setting of the base game, allowing mod notifications to play with base game volume turned down',
          !0,
        ),
        GCNotification: new F(
          0,
          'bool',
          'NotificationGC',
          ['Notification OFF', 'Notification ON'],
          'Create a notification when golden cookie spawns',
          !0,
          () => {
            Ja(Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.GCNotification);
          },
        ),
        GCFlash: new S(
          1,
          'bool',
          'NotificationGC',
          ['Flash OFF', 'Flash ON'],
          'Flash screen on golden cookie',
          !0,
        ),
        ColourGCFlash: new x(
          '#ffffff',
          'colour',
          'NotificationGC',
          'The colour of the GC flash, standard colour is white',
        ),
        GCSound: new S(
          1,
          'bool',
          'NotificationGC',
          ['Sound OFF', 'Sound ON'],
          'Play a sound on golden cookie',
          !0,
        ),
        GCVolume: new E(100, 'vol', 'NotificationGC', [], 'Volume'),
        GCSoundURL: new S(
          'https://freesound.org/data/previews/66/66717_931655-lq.mp3',
          'url',
          'NotificationGC',
          'Sound URL:',
          'URL of the sound to be played when a golden cookie spawns',
        ),
        FortuneNotification: new F(
          0,
          'bool',
          'NotificationFC',
          ['Notification OFF', 'Notification ON'],
          'Create a notification when fortune cookie is on the ticker',
          !0,
          () => {
            Ja(
              Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings
                .FortuneNotification,
            );
          },
        ),
        FortuneFlash: new S(
          1,
          'bool',
          'NotificationFC',
          ['Flash OFF', 'Flash ON'],
          'Flash screen on fortune cookie spawn',
          !0,
        ),
        ColourFortuneFlash: new x(
          '#ffffff',
          'colour',
          'NotificationFC',
          'The colour of the fortune flash, standard colour is white',
        ),
        FortuneSound: new S(
          1,
          'bool',
          'NotificationFC',
          ['Sound OFF', 'Sound ON'],
          'Play a sound on fortune cookie spawn',
          !0,
        ),
        FortuneVolume: new E(100, 'vol', 'NotificationFC', [], 'Volume'),
        FortuneSoundURL: new S(
          'https://freesound.org/data/previews/174/174027_3242494-lq.mp3',
          'url',
          'NotificationFC',
          'Sound URL:',
          'URL of the sound to be played when the ticker has a fortune cookie',
        ),
        SeaNotification: new F(
          0,
          'bool',
          'NotificationSea',
          ['Notification OFF', 'Notification ON'],
          'Create a notification on season popup',
          !0,
          () => {
            Ja(Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.SeaNotification);
          },
        ),
        SeaFlash: new S(
          1,
          'bool',
          'NotificationSea',
          ['Flash OFF', 'Flash ON'],
          'Flash screen on season popup',
          !0,
        ),
        ColourSeaFlash: new x(
          '#ffffff',
          'colour',
          'NotificationSea',
          'The colour of the season popup flash, standard colour is white',
        ),
        SeaSound: new S(
          1,
          'bool',
          'NotificationSea',
          ['Sound OFF', 'Sound ON'],
          'Play a sound on season popup',
          !0,
        ),
        SeaVolume: new E(100, 'vol', 'NotificationSea', [], 'Volume'),
        SeaSoundURL: new S(
          'https://www.freesound.org/data/previews/121/121099_2193266-lq.mp3',
          'url',
          'NotificationSea',
          'Sound URL:',
          'URL of the sound to be played when on season popup spawns',
        ),
        GardFlash: new S(
          1,
          'bool',
          'NotificationGard',
          ['Garden Tick Flash OFF', 'Flash ON'],
          'Flash screen on garden tick',
          !0,
        ),
        ColourGardFlash: new x(
          '#ffffff',
          'colour',
          'NotificationGard',
          'The colour of the garden flash, standard colour is white',
        ),
        GardSound: new S(
          1,
          'bool',
          'NotificationGard',
          ['Sound OFF', 'Sound ON'],
          'Play a sound on garden tick',
          !0,
        ),
        GardVolume: new E(100, 'vol', 'NotificationGard', [], 'Volume'),
        GardSoundURL: new S(
          'https://freesound.org/data/previews/103/103046_861714-lq.mp3',
          'url',
          'NotificationGard',
          'Garden Tick Sound URL:',
          'URL of the sound to be played when the garden ticks',
        ),
        MagicNotification: new F(
          0,
          'bool',
          'NotificationMagi',
          ['Notification OFF', 'Notification ON'],
          'Create a notification when magic reaches maximum',
          !0,
          () => {
            Ja(
              Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.MagicNotification,
            );
          },
        ),
        MagicFlash: new S(
          1,
          'bool',
          'NotificationMagi',
          ['Flash OFF', 'Flash ON'],
          'Flash screen when magic reaches maximum',
          !0,
        ),
        ColourMagicFlash: new x(
          '#ffffff',
          'colour',
          'NotificationMagi',
          'The colour of the magic flash, standard colour is white',
        ),
        MagicSound: new S(
          1,
          'bool',
          'NotificationMagi',
          ['Sound OFF', 'Sound ON'],
          'Play a sound when magic reaches maximum',
          !0,
        ),
        MagicVolume: new E(100, 'vol', 'NotificationMagi', [], 'Volume'),
        MagicSoundURL: new S(
          'https://freesound.org/data/previews/221/221683_1015240-lq.mp3',
          'url',
          'NotificationMagi',
          'Sound URL:',
          'URL of the sound to be played when magic reaches maxium',
        ),
        WrinklerNotification: new F(
          0,
          'bool',
          'NotificationWrink',
          ['Notification OFF', 'Notification ON'],
          'Create a notification when a wrinkler appears',
          !0,
          () => {
            Ja(
              Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings
                .WrinklerNotification,
            );
          },
        ),
        WrinklerFlash: new S(
          1,
          'bool',
          'NotificationWrink',
          ['Flash OFF', 'Flash ON'],
          'Flash screen when a wrinkler appears',
          !0,
        ),
        ColourWrinklerFlash: new x(
          '#ffffff',
          'colour',
          'NotificationWrink',
          'The colour of the wrinkler flash, standard colour is white',
        ),
        WrinklerSound: new S(
          1,
          'bool',
          'NotificationWrink',
          ['Sound OFF', 'Sound ON'],
          'Play a sound when a wrinkler appears',
          !0,
        ),
        WrinklerVolume: new E(100, 'vol', 'NotificationWrink', [], 'Volume'),
        WrinklerSoundURL: new S(
          'https://freesound.org/data/previews/124/124186_8043-lq.mp3',
          'url',
          'NotificationWrink',
          'Sound URL:',
          'URL of the sound to be played when a wrinkler appears',
        ),
        WrinklerMaxNotification: new F(
          0,
          'bool',
          'NotificationWrinkMax',
          ['Notification OFF', 'Notification ON'],
          'Create a notification when the maximum amount of wrinklers has appeared',
          !0,
          () => {
            Ja(
              Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings
                .WrinklerMaxNotification,
            );
          },
        ),
        WrinklerMaxFlash: new S(
          1,
          'bool',
          'NotificationWrinkMax',
          ['Flash OFF', 'Flash ON'],
          'Flash screen when the maximum amount of Wrinklers has appeared',
          !0,
        ),
        ColourWrinklerMaxFlash: new x(
          '#ffffff',
          'colour',
          'NotificationWrinkMax',
          'The colour of the maximum wrinkler flash, standard colour is white',
        ),
        WrinklerMaxSound: new S(
          1,
          'bool',
          'NotificationWrinkMax',
          ['Sound OFF', 'Sound ON'],
          'Play a sound when the maximum amount of wrinklers has appeared',
          !0,
        ),
        WrinklerMaxVolume: new E(100, 'vol', 'NotificationWrinkMax', [], 'Volume'),
        WrinklerMaxSoundURL: new S(
          'https://freesound.org/data/previews/152/152743_15663-lq.mp3',
          'url',
          'NotificationWrinkMax',
          'Sound URL:',
          'URL of the sound to be played when the maximum amount of wrinklers has appeared',
        ),
        BulkBuyBlock: new S(
          1,
          'bool',
          'Miscellaneous',
          ['Block bulk buying OFF', 'Block bulk buying ON'],
          "Block clicking bulk buying when you can't buy all. This prevents buying 7 of a building when you are in buy-10 or buy-100 mode.",
          !0,
        ),
        FavouriteSettings: new F(
          1,
          'bool',
          'Miscellaneous',
          [
            'Favourite settings section OFF',
            'Favourite settings section ON',
            'Favourite settings section ON (Locked)',
          ],
          "Show stars before each setting which allows selecting it for a 'favourites' section at the top of the Cookie Monster settings. Setting this to Locked removes the stars but shows the 'favourites' section",
          !0,
          () => {
            Game.UpdateMenu();
          },
        ),
      };
      function on() {
        let e = '';
        for (let t = 0; t < ho.length; t++)
          e += `.CMText${ho[t]} { color: ${
            Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings[`Colour${ho[t]}`]
          }; }\n`;
        for (let t = 0; t < ho.length; t++)
          e += `.CMBack${ho[t]} { background-color: ${
            Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings[`Colour${ho[t]}`]
          }; }\n`;
        for (let t = 0; t < ho.length; t++)
          e += `.CMBorder${ho[t]} { border: 1px solid ${
            Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings[`Colour${ho[t]}`]
          }; }\n`;
        (l('CMCSS').textContent = e), Wo();
      }
      function an() {
        const e = G('cookieMonsterMod', 'Cookie Monster', 'optionsMenu');
        return (
          Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.headers.optionsMenu &&
            Object.keys(Ya).forEach((t) => {
              if ('Favourite' === t) {
                if (
                  0 !==
                    Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.favouriteSettings
                      .length &&
                  Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings
                    .FavouriteSettings > 0 &&
                  (e.appendChild(b.createOptionsSubHeader('cookieMonsterMod', t, Ya[t])),
                  Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.headers[t])
                )
                  for (
                    let t = 0;
                    t <
                    Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.favouriteSettings
                      .length;
                    t++
                  )
                    e.appendChild(
                      b.createOptionsListing(
                        'cookieMonsterMod',
                        Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod
                          .favouriteSettings[t],
                        tn,
                        on,
                        Za,
                      ),
                    );
              } else
                e.appendChild(b.createOptionsSubHeader('cookieMonsterMod', t, Ya[t])),
                  Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.headers[t] &&
                    ('Notification' === t
                      ? Object.keys(Ka).forEach((t) => {
                          const o = b.createOptionsSubHeader('cookieMonsterMod', t, Ka[t]);
                          (o.style.fontSize = '15px'),
                            (o.style.opacity = '0.5'),
                            e.appendChild(o),
                            Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.headers[t] &&
                              Object.keys(tn).forEach((o) => {
                                tn[o].group === t &&
                                  e.appendChild(
                                    b.createOptionsListing('cookieMonsterMod', o, tn, on, Za),
                                  );
                              });
                        })
                      : Object.keys(tn).forEach((o) => {
                          tn[o].group === t &&
                            e.appendChild(
                              b.createOptionsListing('cookieMonsterMod', o, tn, on, Za),
                            );
                        }));
            }),
          e
        );
      }
      function nn(e, t) {
        const o = document.createElement('div');
        (o.className = 'title'),
          (o.style.padding = '0px 16px'),
          (o.style.opacity = '0.7'),
          (o.style.fontSize = '17px'),
          (o.style.fontFamily = '"Kavoon", Georgia, serif'),
          o.appendChild(document.createTextNode(`${e} `));
        const a = document.createElement('span');
        return (
          (a.style.cursor = 'pointer'),
          (a.style.display = 'inline-block'),
          (a.style.height = '14px'),
          (a.style.width = '14px'),
          (a.style.borderRadius = '7px'),
          (a.style.textAlign = 'center'),
          (a.style.backgroundColor = '#C0C0C0'),
          (a.style.color = 'black'),
          (a.style.fontSize = '13px'),
          (a.style.verticalAlign = 'middle'),
          (a.textContent = Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.headers[t]
            ? '-'
            : '+'),
          (a.onclick = function () {
            !(function (e) {
              (Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.headers[e] += 1),
                Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.headers[e] > 1 &&
                  (Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.headers[e] = 0),
                w.saveFramework();
            })(t),
              Game.UpdateMenu();
          }),
          o.appendChild(a),
          o
        );
      }
      function rn(e, t, o, a) {
        const n = document.createElement('div');
        n.className = 'listing';
        const i = document.createElement('b');
        if (((i.textContent = t), n.appendChild(i), 'withTooltip' === e)) {
          (n.className = 'listing'), n.appendChild(document.createTextNode(' '));
          const e = document.createElement('span');
          (e.onmouseout = function () {
            Game.tooltip.hide();
          }),
            (e.onmouseover = function () {
              Game.tooltip.draw(this, escape(fo[a].innerHTML));
            }),
            (e.style.cursor = 'default'),
            (e.style.display = 'inline-block'),
            (e.style.height = '10px'),
            (e.style.width = '10px'),
            (e.style.borderRadius = '5px'),
            (e.style.textAlign = 'center'),
            (e.style.backgroundColor = '#C0C0C0'),
            (e.style.color = 'black'),
            (e.style.fontSize = '9px'),
            (e.style.verticalAlign = 'bottom'),
            (e.textContent = '?'),
            n.appendChild(e);
        }
        return n.appendChild(document.createTextNode(': ')), n.appendChild(o), n;
      }
      function sn(e, t, o, a) {
        const n = document.createElement('div');
        n.className = 'listing';
        const i = document.createElement('b');
        return (
          (i.textContent = t),
          !0 === a &&
            (i.style.color =
              Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.ColourGreen),
          n.appendChild(i),
          n.appendChild(document.createTextNode(': ')),
          n.appendChild(o),
          n
        );
      }
      function ln(e) {
        const t = document.createDocumentFragment();
        t.appendChild(document.createTextNode(`${e.length} `));
        const o = document.createElement('span');
        o.onmouseout = function () {
          Game.tooltip.hide();
        };
        const a = document.createElement('div'),
          n = document.createElement('div');
        (n.style.minWidth = '140px'), (n.style.marginBottom = '4px');
        const i = document.createElement('div');
        return (
          (i.className = 'name'),
          (i.style.marginBottom = '4px'),
          (i.style.textAlign = 'center'),
          (i.textContent = 'Missing'),
          n.appendChild(i),
          Object.keys(e).forEach((t) => {
            const o = document.createElement('div');
            (o.style.textAlign = 'center'),
              o.appendChild(document.createTextNode(e[t])),
              n.appendChild(o);
          }),
          a.appendChild(n),
          (o.onmouseover = function () {
            Game.tooltip.draw(this, escape(a.innerHTML));
          }),
          (o.style.cursor = 'default'),
          (o.style.display = 'inline-block'),
          (o.style.height = '10px'),
          (o.style.width = '10px'),
          (o.style.borderRadius = '5px'),
          (o.style.textAlign = 'center'),
          (o.style.backgroundColor = '#C0C0C0'),
          (o.style.color = 'black'),
          (o.style.fontSize = '9px'),
          (o.style.verticalAlign = 'bottom'),
          (o.textContent = '?'),
          t.appendChild(o),
          t
        );
      }
      function cn(e) {
        const t = document.createElement('div');
        if (
          ((t.className = 'subsection'),
          t.appendChild(e),
          t.appendChild(nn('Lucky Cookies', 'Lucky')),
          Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.headers.Lucky &&
            t.appendChild(
              (function () {
                const e = Game.auraMult("Dragon's Fortune")
                    ? 'GoldCookDragonsFortuneTooltipPlaceholder'
                    : 'GoldCookTooltipPlaceholder',
                  t = document.createElement('div');
                t.className = 'CMStatsLuckySection';
                const o = Game.cookies + Io() < ke ? lo : io,
                  a = Game.cookies + Io() < ke ? Uo((ke - (Game.cookies + Io())) / Ro()) : '',
                  n = document.createDocumentFragment(),
                  i = document.createElement('span');
                if (
                  ((i.style.fontWeight = 'bold'),
                  (i.className = oo + o),
                  (i.textContent = to(ke)),
                  n.appendChild(i),
                  '' !== a)
                ) {
                  const e = document.createElement('small');
                  (e.textContent = ` (${a})`), n.appendChild(e);
                }
                t.appendChild(rn('withTooltip', '"Lucky!" cookies required', n, e));
                const r = Game.cookies + Io() < ye ? lo : io,
                  s = Game.cookies + Io() < ye ? Uo((ye - (Game.cookies + Io())) / Ro()) : '',
                  l = document.createDocumentFragment(),
                  c = document.createElement('span');
                if (
                  ((c.style.fontWeight = 'bold'),
                  (c.className = oo + r),
                  (c.textContent = to(ye)),
                  l.appendChild(c),
                  '' !== s)
                ) {
                  const e = document.createElement('small');
                  (e.textContent = ` (${s})`), l.appendChild(e);
                }
                t.appendChild(rn('withTooltip', '"Lucky!" cookies required (frenzy)', l, e));
                const d = Ce !== Me,
                  m = document.createElement('span');
                (m.style.fontWeight = 'bold'),
                  (m.className = oo + Ce),
                  (m.textContent = to(Ce) + (d ? ` / ${to(Me)}` : '')),
                  t.appendChild(
                    rn(
                      'withTooltip',
                      '"Lucky!" reward (max)' + (d ? ' (golden / wrath)' : ''),
                      m,
                      e,
                    ),
                  );
                const p = document.createElement('span');
                (p.style.fontWeight = 'bold'),
                  (p.className = oo + p),
                  (p.textContent = to(be) + (d ? ` / ${to(Ge)}` : '')),
                  t.appendChild(
                    rn(
                      'withTooltip',
                      '"Lucky!" reward (max) (frenzy)' + (d ? ' (golden / wrath)' : ''),
                      p,
                      e,
                    ),
                  );
                const u = Math.min(0.15 * (Game.cookies + Io()), Se * Fe * 60 * 15) + 13,
                  h = document.createElement('span');
                return (
                  (h.style.fontWeight = 'bold'),
                  (h.className = oo + h),
                  (h.textContent = to(Ee * u) + (d ? ` / ${to(Be * u)}` : '')),
                  t.appendChild(
                    rn(
                      'withTooltip',
                      '"Lucky!" reward (cur)' + (d ? ' (golden / wrath)' : ''),
                      h,
                      e,
                    ),
                  ),
                  t
                );
              })(),
            ),
          t.appendChild(nn('Chain Cookies', 'Chain')),
          Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.headers.Chain &&
            t.appendChild(
              (function () {
                const e = Game.auraMult("Dragon's Fortune")
                    ? 'GoldCookDragonsFortuneTooltipPlaceholder'
                    : 'GoldCookTooltipPlaceholder',
                  t = document.createElement('div');
                t.className = 'CMStatsChainSection';
                const o = Game.cookies + Io() < qe ? lo : io,
                  a = Game.cookies + Io() < qe ? Uo((qe - (Game.cookies + Io())) / Ro()) : '',
                  n = document.createDocumentFragment(),
                  i = document.createElement('span');
                if (
                  ((i.style.fontWeight = 'bold'),
                  (i.className = oo + o),
                  (i.textContent = to(qe)),
                  n.appendChild(i),
                  '' !== a)
                ) {
                  const e = document.createElement('small');
                  (e.textContent = ` (${a})`), n.appendChild(e);
                }
                t.appendChild(rn('withTooltip', '"Chain" cookies required', n, e));
                const r = Game.cookies + Io() < Je ? lo : io,
                  s = Game.cookies + Io() < Je ? Uo((Je - (Game.cookies + Io())) / Ro()) : '',
                  l = document.createDocumentFragment(),
                  c = document.createElement('span');
                if (
                  ((c.style.fontWeight = 'bold'),
                  (c.className = oo + r),
                  (c.textContent = to(Je)),
                  l.appendChild(c),
                  '' !== s)
                ) {
                  const e = document.createElement('small');
                  (e.textContent = ` (${s})`), l.appendChild(e);
                }
                t.appendChild(rn('withTooltip', '"Chain" cookies required (Wrath)', l, e));
                const d = Game.cookies + Io() < tt ? lo : io,
                  m = Game.cookies + Io() < tt ? Uo((tt - (Game.cookies + Io())) / Ro()) : '',
                  p = document.createDocumentFragment(),
                  u = document.createElement('span');
                if (
                  ((u.style.fontWeight = 'bold'),
                  (u.className = oo + d),
                  (u.textContent = to(tt)),
                  p.appendChild(u),
                  '' !== m)
                ) {
                  const e = document.createElement('small');
                  (e.textContent = ` (${m})`), p.appendChild(e);
                }
                t.appendChild(rn('withTooltip', '"Chain" cookies required (Frenzy)', p, e));
                const h = Game.cookies + Io() < nt ? lo : io,
                  g = Game.cookies + Io() < nt ? Uo((nt - (Game.cookies + Io())) / Ro()) : '',
                  f = document.createDocumentFragment(),
                  k = document.createElement('span');
                if (
                  ((k.style.fontWeight = 'bold'),
                  (k.className = oo + h),
                  (k.textContent = to(nt)),
                  f.appendChild(k),
                  '' !== g)
                ) {
                  const e = document.createElement('small');
                  (e.textContent = ` (${g})`), f.appendChild(e);
                }
                t.appendChild(rn('withTooltip', '"Chain" cookies required (frenzy) (Wrath)', f, e)),
                  t.appendChild(
                    rn(
                      'withTooltip',
                      '"Chain" reward (max) (golden / wrath)',
                      document.createTextNode(`${to(Ke[0])} / ${to(et[0])}`),
                      e,
                    ),
                  ),
                  t.appendChild(
                    rn(
                      'withTooltip',
                      '"Chain" reward (max) (frenzy) (golden / wrath)',
                      document.createTextNode(`${to(at[0])} / ${to(at[0])}`),
                      e,
                    ),
                  );
                const C = Math.min(60 * Game.cookiesPs * 60 * 6 * Fe, 0.5 * Game.cookies),
                  M = Na(7, C, Ee)[0],
                  y = Na(6, C, Be)[0];
                return (
                  t.appendChild(
                    rn(
                      'withTooltip',
                      '"Chain" reward (cur) (golden / wrath)',
                      document.createTextNode(`${to(M)} / ${to(y)}`),
                      e,
                    ),
                  ),
                  t.appendChild(
                    rn(
                      'withTooltip',
                      'CPS needed for next level (g / w)',
                      document.createTextNode(`${to(Ye)} / ${to(Ze)}`),
                      'ChainNextLevelPlaceholder',
                    ),
                  ),
                  t.appendChild(
                    rn(
                      'withTooltip',
                      'CPS needed for next level (frenzy) (g / w)',
                      document.createTextNode(`${to(ot)} / ${to(it)}`),
                      'ChainNextLevelPlaceholder',
                    ),
                  ),
                  t
                );
              })(),
            ),
          Game.Objects['Wizard tower'].minigameLoaded &&
            (t.appendChild(nn('Spells', 'Spells')),
            Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.headers.Spells &&
              t.appendChild(
                (function () {
                  const e = document.createElement('div');
                  e.className = 'CMStatsSpellsSection';
                  const t = Game.cookies + Io() < ve ? lo : io,
                    o = Game.cookies + Io() < ve ? Uo((ve - (Game.cookies + Io())) / Ro()) : '',
                    a = document.createDocumentFragment(),
                    n = document.createElement('span');
                  if (
                    ((n.style.fontWeight = 'bold'),
                    (n.className = oo + t),
                    (n.textContent = to(ve)),
                    a.appendChild(n),
                    '' !== o)
                  ) {
                    const e = document.createElement('small');
                    (e.textContent = ` (${o})`), a.appendChild(e);
                  }
                  e.appendChild(
                    rn(
                      'withTooltip',
                      '"Conjure Baked Goods" cookies required',
                      a,
                      'GoldCookTooltipPlaceholder',
                    ),
                  ),
                    e.appendChild(
                      rn(
                        'withTooltip',
                        '"Conjure Baked Goods" reward (max)',
                        document.createTextNode(to(we)),
                        'GoldCookTooltipPlaceholder',
                      ),
                    );
                  const i = Game.cookies + Io() < 7 * ve ? lo : io,
                    r = Math.min(0.15 * (Game.cookies + Io()), 60 * Se * 30),
                    s =
                      Game.cookies + Io() < 7 * ve
                        ? Uo((7 * ve - (Game.cookies + Io())) / Ro())
                        : '',
                    l = document.createDocumentFragment(),
                    c = document.createElement('span');
                  if (
                    ((c.style.fontWeight = 'bold'),
                    (c.className = oo + i),
                    (c.textContent = to(7 * ve)),
                    l.appendChild(c),
                    '' !== s)
                  ) {
                    const e = document.createElement('small');
                    (e.textContent = ` (${s})`), l.appendChild(e);
                  }
                  return (
                    e.appendChild(
                      rn(
                        'withTooltip',
                        '"Conjure Baked Goods" cookies required (frenzy)',
                        l,
                        'GoldCookTooltipPlaceholder',
                      ),
                    ),
                    e.appendChild(
                      rn(
                        'withTooltip',
                        '"Conjure Baked Goods" reward (max) (frenzy)',
                        document.createTextNode(to(7 * we)),
                        'GoldCookTooltipPlaceholder',
                      ),
                    ),
                    e.appendChild(
                      rn(
                        'withTooltip',
                        '"Conjure Baked Goods" reward (cur)',
                        document.createTextNode(to(r)),
                        'GoldCookTooltipPlaceholder',
                      ),
                    ),
                    xe &&
                      e.appendChild(
                        rn(
                          'withTooltip',
                          '"Spontaneous Edifice" cookies required (most expensive building)',
                          document.createTextNode(`${to(xe)} (${Te})`),
                          'GoldCookTooltipPlaceholder',
                        ),
                      ),
                    e
                  );
                })(),
              )),
          Game.Objects.Farm.minigameLoaded &&
            (t.appendChild(nn('Garden', 'Garden')),
            Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.headers.Garden &&
              t.appendChild(
                (function () {
                  const e = document.createElement('div');
                  e.className = 'CMStatsGardenSection';
                  const t = Game.cookies < 60 * Game.cookiesPs * 10 * 100 ? lo : io,
                    o = document.createElement('span');
                  (o.style.fontWeight = 'bold'),
                    (o.className = oo + t),
                    (o.textContent = to(60 * Game.cookiesPs * 10 * 100)),
                    e.appendChild(rn('basic', 'Cookies required for max reward of Bakeberry: ', o));
                  const a = Game.cookies < 60 * Game.cookiesPs * 100 ? lo : io,
                    n = document.createElement('span');
                  (n.style.fontWeight = 'bold'),
                    (n.className = oo + a),
                    (n.textContent = to(60 * Game.cookiesPs * 100)),
                    e.appendChild(rn('basic', 'Cookies required for max reward of Chocoroot: ', n));
                  const i = Game.cookies < 60 * Game.cookiesPs * 60 * 25 ? lo : io,
                    r = document.createElement('span');
                  (r.style.fontWeight = 'bold'),
                    (r.className = oo + i),
                    (r.textContent = to(60 * Game.cookiesPs * 60 * 25)),
                    e.appendChild(rn('basic', 'Cookies required for max reward of Queenbeet: ', r));
                  const s = Game.cookies < 60 * Game.cookiesPs * 15 * 100 ? lo : io,
                    l = document.createElement('span');
                  (l.style.fontWeight = 'bold'),
                    (l.className = oo + s),
                    (l.textContent = to(60 * Game.cookiesPs * 15 * 100)),
                    e.appendChild(rn('basic', 'Cookies required for max reward of Duketater: ', l));
                  const c = [];
                  return (
                    Object.keys(pa).forEach((e) => {
                      Game.HasUnlocked(pa[e]) || c.push(pa[e]);
                    }),
                    0 !== c.length &&
                      e.appendChild(rn('basic', 'Rare plant drops left to unlock', ln(c))),
                    e
                  );
                })(),
              )),
          t.appendChild(nn('Prestige', 'Prestige')),
          Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.headers.Prestige &&
            t.appendChild(
              (function () {
                const e = document.createElement('div');
                e.className = 'CMStatsPrestigeSection';
                const t = Math.floor(
                  Game.HowMuchPrestige(
                    st +
                      Game.cookiesReset +
                      $e +
                      (Game.HasUnlocked('Chocolate egg') && !Game.Has('Chocolate egg') ? De : 0),
                  ),
                );
                e.appendChild(
                  rn(
                    'withTooltip',
                    'Prestige level (cur / max)',
                    document.createTextNode(`${to(Game.prestige)} / ${to(t)}`),
                    'PrestMaxTooltipPlaceholder',
                  ),
                );
                const o = Math.max(
                    0,
                    Game.HowManyCookiesReset(t + 1) -
                      (st +
                        Game.cookiesReset +
                        $e +
                        (Game.HasUnlocked('Chocolate egg') && !Game.Has('Chocolate egg') && De
                          ? De
                          : 0)),
                  ),
                  a = document.createDocumentFragment();
                a.appendChild(document.createTextNode(to(o)));
                const n = document.createElement('small');
                (n.textContent = ` (${Uo(o / lt, 1)})`),
                  a.appendChild(n),
                  e.appendChild(
                    rn('withTooltip', 'Cookies to next level', a, 'NextPrestTooltipPlaceholder'),
                  ),
                  e.appendChild(
                    rn(
                      'withTooltip',
                      'Heavenly chips (cur / max)',
                      document.createTextNode(
                        `${to(Game.heavenlyChips)} / ${to(t - Game.prestige + Game.heavenlyChips)}`,
                      ),
                      'HeavenChipMaxTooltipPlaceholder',
                    ),
                  ),
                  e.appendChild(
                    rn(
                      'basic',
                      'Heavenly chips per second (last 5 seconds)',
                      document.createTextNode(to(Pe, 2)),
                    ),
                  );
                const i = Number(
                  Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings
                    .HeavenlyChipsTarget,
                );
                if (!Number.isNaN(i)) {
                  const t =
                    i - Math.floor(Game.HowMuchPrestige(Game.cookiesReset + Game.cookiesEarned));
                  t > 0 &&
                    (e.appendChild(
                      rn(
                        'basic',
                        'Heavenly chips to target set in settings (cur)',
                        document.createTextNode(to(t)),
                      ),
                    ),
                    e.appendChild(
                      rn(
                        'basic',
                        'Time till target (cur, current 5 second average)',
                        document.createTextNode(Uo(t / Pe)),
                      ),
                    ));
                }
                const r = (function (e) {
                    let t = Game.cookiesPs;
                    ta(),
                      0 === Mt['Heavenly key'].bought &&
                        ((Mt['Heavenly chip secret'].bought = 1),
                        (Mt['Heavenly cookie stand'].bought = 1),
                        (Mt['Heavenly bakery'].bought = 1),
                        (Mt['Heavenly confectionery'].bought = 1),
                        (Mt['Heavenly key'].bought = 1),
                        sa(),
                        (t = me),
                        ta()),
                      st >= 1e6 && ra('Sacrifice'),
                      st >= 1e9 && ra('Oblivion'),
                      st >= 1e12 && ra('From scratch'),
                      st >= 1e15 && ra('Nihilism'),
                      st >= 1e18 && ra('Dematerialize'),
                      st >= 1e21 && ra('Nil zero zilch'),
                      st >= 1e24 && ra('Transcendence'),
                      st >= 1e27 && ra('Obliterate'),
                      st >= 1e30 && ra('Negative void'),
                      st >= 1e33 && ra('To crumbs, you say?'),
                      st >= 1e36 && ra('You get nothing'),
                      st >= 1e39 && ra('Humble rebeginnings'),
                      st >= 1e42 && ra('The end of the world'),
                      st >= 1e45 && ra("Oh, you're back"),
                      st >= 1e48 && ra('Lazarus'),
                      st >= 1e51 && ra('Smurf account'),
                      st >= 1e54 && ra("If at first you don't succeed"),
                      (Mt['Heavenly chip secret'].bought = 1),
                      (Mt['Heavenly cookie stand'].bought = 1),
                      (Mt['Heavenly bakery'].bought = 1),
                      (Mt['Heavenly confectionery'].bought = 1),
                      (Mt['Heavenly key'].bought = 1),
                      (ae = e);
                    const o = te;
                    sa(), ha(), o !== te && sa();
                    const a = me - t;
                    return (ae = Game.prestige), a;
                  })(t),
                  s = document.createDocumentFragment();
                s.appendChild(document.createTextNode(to(r)));
                const l = Math.round((r / Game.cookiesPs) * 1e4);
                if (Number.isFinite(l) && 0 !== l) {
                  const e = document.createElement('small');
                  (e.textContent = ` (${l / 100}% of income)`), s.appendChild(e);
                }
                e.appendChild(
                  rn('withTooltip', 'Reset bonus income', s, 'ResetTooltipPlaceholder'),
                );
                const c = Math.floor(Game.HowMuchPrestige(Game.cookiesReset)),
                  d = Math.floor(Game.HowMuchPrestige(Game.cookiesReset + Game.cookiesEarned)),
                  m = d - c;
                if (!Game.Has('Lucky digit')) {
                  let t = 7 - (d % 10);
                  t < 0 && (t += 10);
                  const o = m + t,
                    a = d + t,
                    n = document.createDocumentFragment();
                  n.appendChild(
                    document.createTextNode(
                      `${a.toLocaleString()} / ${o.toLocaleString()} (+${t})`,
                    ),
                  ),
                    e.appendChild(rn('basic', 'Next "Lucky Digit" (total / reset)', n));
                }
                if (!Game.Has('Lucky number')) {
                  let t = 777 - (d % 1e3);
                  t < 0 && (t += 1e3);
                  const o = m + t,
                    a = d + t,
                    n = document.createDocumentFragment();
                  n.appendChild(
                    document.createTextNode(
                      `${a.toLocaleString()} / ${o.toLocaleString()} (+${t})`,
                    ),
                  ),
                    e.appendChild(rn('basic', 'Next "Lucky Number" (total / reset)', n));
                }
                if (!Game.Has('Lucky payout')) {
                  let t = 777777 - (d % 1e6);
                  t < 0 && (t += 1e6);
                  const o = m + t,
                    a = d + t,
                    n = document.createDocumentFragment();
                  n.appendChild(
                    document.createTextNode(
                      `${a.toLocaleString()} / ${o.toLocaleString()} (+${t})`,
                    ),
                  ),
                    e.appendChild(rn('basic', 'Next "Lucky Payout" (total / reset)', n));
                }
                return e;
              })(),
            ),
          Game.cpsSucked > 0 &&
            (t.appendChild(nn('Wrinklers', 'Wrink')),
            Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.headers.Wrink))
        ) {
          const e = document.createDocumentFragment();
          e.appendChild(document.createTextNode(`${to($e)} / ${to(Ue)} `));
          const o = document.createElement('a');
          (o.textContent = 'Pop All Normal'),
            (o.className = 'option'),
            (o.onclick = function () {
              Ra();
            }),
            e.appendChild(o),
            t.appendChild(rn('basic', 'Rewards of Popping (All/Normal)', e));
          const a = document.createDocumentFragment();
          a.appendChild(document.createTextNode(`${to(He[0])} `));
          const n = document.createElement('a');
          (n.textContent = 'Pop Single Fattest'),
            (n.className = 'option'),
            (n.onclick = function () {
              null !== He[1] && (Game.wrinklers[He[1]].hp = 0);
            }),
            a.appendChild(n),
            t.appendChild(
              rn(
                'basic',
                `Rewards of Popping Single Fattest Non-Shiny Wrinkler (id: ${
                  null !== He[1] ? He[1] : 'None'
                })`,
                a,
              ),
            );
        }
        if (
          (t.appendChild(
            (function () {
              const e = document.createElement('div');
              e.className = 'CMStatsSeasonSection';
              let t = !1;
              const o = [];
              Object.keys(ca).forEach((e) => {
                Game.Has(ca[e]) || (o.push(ca[e]), (t = !0));
              });
              const a = [];
              Object.keys(da).forEach((e) => {
                Game.Has(da[e]) || (a.push(da[e]), (t = !0));
              });
              const n = [];
              Object.keys(ma).forEach((e) => {
                Game.Has(ma[e]) || (n.push(ma[e]), (t = !0));
              });
              const i = [];
              Object.keys(Game.eggDrops).forEach((e) => {
                Game.HasUnlocked(Game.eggDrops[e]) || (i.push(Game.eggDrops[e]), (t = !0));
              });
              const r = [];
              Object.keys(Game.rareEggDrops).forEach((e) => {
                Game.HasUnlocked(Game.rareEggDrops[e]) || (r.push(Game.rareEggDrops[e]), (t = !0));
              });
              const s = Game.HasUnlocked('Chocolate egg') && !Game.Has('Chocolate egg'),
                l = Game.Has('Century egg');
              if (
                ('christmas' === Game.season || t || s || l) &&
                (e.appendChild(nn('Season Specials', 'Sea')),
                Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.headers.Sea)
              ) {
                if (0 !== o.length) {
                  e.appendChild(
                    sn(0, 'Halloween cookies left to buy', ln(o), 'halloween' === Game.season),
                  );
                  let t = 0.95;
                  if (
                    (Game.HasAchiev('Spooky cookies') && (t = 0.8),
                    Game.Has('Starterror') && (t *= 0.9),
                    (t *= 1 / Game.dropRateMult()),
                    Game.hasGod)
                  ) {
                    const e = Game.hasGod('seasons');
                    1 === e ? (t *= 0.9) : 2 === e ? (t *= 0.95) : 3 === e && (t *= 0.97);
                  }
                  const a = o.length / 7;
                  e.appendChild(
                    sn(
                      0,
                      'Chance of receiving a cookie from wrinkler/shiny wrinkler',
                      document.createTextNode(
                        `${to((1 - t) * a * 100)}% / ${to((1 - 0.9 * t) * a * 100)}%`,
                      ),
                      'halloween' === Game.season,
                    ),
                  );
                }
                if (0 !== a.length) {
                  e.appendChild(
                    sn(0, 'Christmas cookies left to buy', ln(a), 'christmas' === Game.season),
                  );
                  let t = 0.8;
                  if (
                    (Game.HasAchiev('Let it snow') && (t = 0.6),
                    (t *= 1 / Game.dropRateMult()),
                    Game.Has('Starsnow') && (t *= 0.95),
                    Game.hasGod)
                  ) {
                    const e = Game.hasGod('seasons');
                    1 === e ? (t *= 0.9) : 2 === e ? (t *= 0.95) : 3 === e && (t *= 0.97);
                  }
                  const o = a.length / 7;
                  e.appendChild(
                    sn(
                      0,
                      'Chance of receiving a cookie from reindeer',
                      document.createTextNode(`${to((1 - t) * o * 100)}%`),
                      'christmas' === Game.season,
                    ),
                  );
                }
                0 !== n.length &&
                  e.appendChild(
                    sn(0, 'Valentine cookies left to buy', ln(n), 'valentines' === Game.season),
                  );
                const t = function (e) {
                  let t = e * (1 / Game.dropRateMult());
                  if (
                    (Game.HasAchiev('Hide & seek champion') && (t *= 0.7),
                    Game.Has('Omelette') && (t *= 0.9),
                    Game.Has('Starspawn') && (t *= 0.9),
                    Game.hasGod)
                  ) {
                    const e = Game.hasGod('seasons');
                    1 === e ? (t *= 0.9) : 2 === e ? (t *= 0.95) : 3 === e && (t *= 0.97);
                  }
                  const o = 1 - t,
                    a = Game.eggDrops.length - i.length,
                    n = Game.rareEggDrops.length - r.length,
                    s = 0.9 * o * (1 - a / Game.eggDrops.length),
                    l = 0.1 * o * (1 - n / Game.rareEggDrops.length),
                    c =
                      0.9 * o * (a / Game.eggDrops.length) +
                      0.1 * o * (n / Game.rareEggDrops.length);
                  return [
                    s + 0.9 * c * (1 - a / Game.eggDrops.length),
                    l + 0.1 * c * (1 - n / Game.rareEggDrops.length),
                  ];
                };
                0 !== i.length &&
                  (e.appendChild(
                    sn(0, 'Normal easter eggs left to unlock', ln(i), 'easter' === Game.season),
                  ),
                  e.appendChild(
                    sn(
                      0,
                      'Chance of receiving an egg from wrinkler/golden cookie',
                      document.createTextNode(`${to(100 * t(0.98)[0])}% / ${to(100 * t(0.9)[0])}%`),
                      'easter' === Game.season,
                    ),
                  )),
                  0 !== r.length &&
                    (e.appendChild(
                      sn(0, 'Rare easter eggs left to unlock', ln(r), 'easter' === Game.season),
                    ),
                    e.appendChild(
                      sn(
                        0,
                        'Chance of receiving a rare egg from wrinkler/golden cookie',
                        document.createTextNode(
                          `${to(100 * t(0.98)[1])}% / ${to(100 * t(0.9)[1])}%`,
                        ),
                        'easter' === Game.season,
                      ),
                    )),
                  'christmas' === Game.season &&
                    e.appendChild(sn(0, 'Reindeer reward', document.createTextNode(to(Oe)), !0)),
                  s &&
                    e.appendChild(
                      rn(
                        'withTooltip',
                        'Chocolate egg cookies',
                        document.createTextNode(to(De)),
                        'ChoEggTooltipPlaceholder',
                      ),
                    ),
                  l &&
                    e.appendChild(
                      rn(
                        'basic',
                        'Century egg multiplier',
                        document.createTextNode(Math.round(1e4 * (Ne - 1)) / 100 + '%'),
                      ),
                    );
              }
              return e;
            })(),
          ),
          t.appendChild(nn('Achievements', 'Achievs')),
          Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.headers.Achievs &&
            Object.keys(Game.Objects).forEach((e) => {
              const o = je[e];
              t.appendChild(
                rn(
                  'basic',
                  e,
                  o.AmountNeeded < 101
                    ? document.createTextNode(
                        `Next achievement in ${o.AmountNeeded}, price: ${to(o.price)}`,
                      )
                    : document.createTextNode('No new achievement for next 100 buildings'),
                ),
              );
            }),
          t.appendChild(nn('Miscellaneous', 'Misc')),
          Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.headers.Misc)
        ) {
          if (
            (t.appendChild(
              rn(
                'basic',
                `Average cookies per second (past ${
                  xo[
                    Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.AvgCPSHist
                  ] < 60
                    ? `${
                        xo[
                          Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings
                            .AvgCPSHist
                        ]
                      } seconds`
                    : xo[
                        Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings
                          .AvgCPSHist
                      ] /
                        60 +
                      (3 ===
                      Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.AvgCPSHist
                        ? ' minute'
                        : ' minutes')
                })`,
                document.createTextNode(to(Ro(), 3)),
              ),
            ),
            t.appendChild(
              rn(
                'basic',
                `Average cookie clicks per second (past ${
                  To[
                    Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings
                      .AvgClicksHist
                  ]
                }${
                  0 ===
                  Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.AvgClicksHist
                    ? ' second'
                    : ' seconds'
                })`,
                document.createTextNode(to(Ve, 1)),
              ),
            ),
            t.appendChild(
              rn(
                'basic',
                `Cookies from clicking (past ${
                  To[
                    Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings
                      .AvgClicksHist
                  ]
                }${
                  0 ===
                  Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.AvgClicksHist
                    ? ' second'
                    : ' seconds'
                })`,
                document.createTextNode(
                  to(
                    P.calcSum(
                      Ve *
                        To[
                          Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings
                            .AvgClicksHist
                        ],
                    ),
                  ),
                ),
              ),
            ),
            Game.Has('Fortune cookies'))
          ) {
            const e = [];
            Object.keys(la).forEach((t) => {
              Game.Has(la[t]) || e.push(la[t]);
            }),
              0 !== e.length && t.appendChild(rn('basic', 'Fortune Upgrades Left to Buy', ln(e)));
          }
          if (
            (Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.ShowMissedGC &&
              t.appendChild(
                rn(
                  'basic',
                  'Missed golden cookies',
                  document.createTextNode(to(Game.missedGoldenClicks)),
                ),
              ),
            Game.prefs.autosave)
          ) {
            const e = document.createElement('span');
            (e.id = 'CMStatsAutosaveTimer'),
              (e.innerText = Game.sayTime(
                60 * Game.fps - (Game.OnAscend ? 0 : Game.T % (60 * Game.fps)),
                4,
              )),
              t.appendChild(rn('basic', 'Time till autosave', e));
          }
        }
        l('menu').insertBefore(t, l('menu').childNodes[2]),
          Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.MissingUpgrades &&
            l('menu').childNodes.forEach((e) => {
              if (e.children[0])
                if ('Prestige' === e.children[0].innerHTML && Xe) {
                  const t = Xe.match(new RegExp('div', 'g') || 0).length / 2,
                    o = document.createElement('div');
                  (o.id = 'CMMissingUpgradesPrestigeTitle'), (o.className = 'listing');
                  const a = document.createElement('div');
                  (a.innerHTML = `<b>Missing Prestige upgrades:</b> ${t}/${
                    Game.PrestigeUpgrades.length
                  } (${Math.floor((t / Game.PrestigeUpgrades.length) * 100)}%)`),
                    o.appendChild(a),
                    e.appendChild(o);
                  const n = document.createElement('div');
                  (n.className = 'listing crateBox'), (n.innerHTML = Xe), e.appendChild(n);
                } else if ('Upgrades' === e.children[0].innerHTML) {
                  if (_e) {
                    const t = _e.match(new RegExp('div', 'g') || 0).length / 2,
                      o = document.createElement('div');
                    (o.id = 'CMMissingUpgradesTitle'), (o.className = 'listing');
                    const a = document.createElement('div');
                    (a.innerHTML = `<b>Missing normal upgrades:</b> ${t}/${
                      Game.UpgradesByPool[''].length + Game.UpgradesByPool.tech.length
                    } (${Math.floor(
                      (t / (Game.UpgradesByPool[''].length + Game.UpgradesByPool.tech.length)) *
                        100,
                    )}%)`),
                      o.appendChild(a),
                      e.insertBefore(o, e.childNodes[3]);
                    const n = document.createElement('div');
                    (n.className = 'listing crateBox'),
                      (n.innerHTML = _e),
                      e.insertBefore(
                        n,
                        document.getElementById('CMMissingUpgradesTitle').nextSibling,
                      );
                  }
                  if (Qe) {
                    const t = Qe.match(new RegExp('div', 'g') || 0).length / 2,
                      o = document.createElement('div');
                    (o.id = 'CMMissingUpgradesCookiesTitle'), (o.className = 'listing');
                    const a = document.createElement('div');
                    (a.innerHTML = `<b>Missing Cookie upgrades:</b> ${t}/${
                      Game.UpgradesByPool.cookie.length
                    } (${Math.floor((t / Game.UpgradesByPool.cookie.length) * 100)}%)`),
                      o.appendChild(a),
                      e.appendChild(o);
                    const n = document.createElement('div');
                    (n.className = 'listing crateBox'), (n.innerHTML = Qe), e.appendChild(n);
                  }
                }
            }),
          Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.MissingAchievements &&
            (function () {
              let e;
              Object.values(document.querySelectorAll('div.title')).forEach((t) => {
                t.textContent.includes('Achievements') &&
                  (e = t.parentElement.querySelectorAll('div.listing.crateBox')[0]);
              }),
                Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings
                  .MissingAchievements &&
                  Object.values(e.children).forEach((e) => {
                    if (!e.className.includes('enabled')) {
                      const t = e.onclick.toString().split(/\[(.*)\]/gi)[1],
                        { icon: o } = Game.AchievementsById[t];
                      (e.style.backgroundPosition = `${48 * -o[0]}px ${48 * -o[1]}px`),
                        (e.onmouseover = function () {
                          Game.mouseDown ||
                            (Game.setOnCrate(this),
                            (Game.tooltip.dynamic = 1),
                            Game.tooltip.draw(
                              this,
                              () =>
                                (function (e) {
                                  const t = [];
                                  'shadow' === e.pool
                                    ? t.push('Shadow Achievement', '#9700cf')
                                    : t.push('Achievement', 0),
                                    t.push('Locked', 0);
                                  let o = 0;
                                  (Game.Has('Neuromancy') || (Game.sesame && 'debug' === e.pool)) &&
                                    (o = 1),
                                    o && 0 === e.won
                                      ? t.push('Click to win!', '#00c462')
                                      : o && e.won > 0 && t.push('Click to lose!', '#00c462');
                                  let { icon: a } = e;
                                  e.iconFunction && (a = e.iconFunction());
                                  let { desc: n } = e;
                                  e.descFunc && (n = e.descFunc('stats'));
                                  let i = '';
                                  for (let e = 0; e < t.length; e += 2)
                                    e % 2 == 0 &&
                                      (i += ` <div class="tag" style="color:${
                                        0 === t[e + 1] ? '#fff' : t[e + 1]
                                      };">[${t[e]}]</div>`);
                                  return (
                                    (i = i.substring(1)),
                                    `<div style="padding:8px 4px;min-width:350px;opacity:0.5">\n  <div class="icon" style="float:left;margin-left:-8px;margin-top:-8px;background-position:${
                                      48 * -a[0]
                                    }px ${48 * -a[1]}px;"></div>\n  <div class="name">${
                                      e.name
                                    }</div>\n  ${i}<div class="line"></div><div class="description">${n}</div></div>\n  ${
                                      Game.sesame
                                        ? `<div style="font-size:9px;">Id : ${
                                            e.id
                                          } | Order : ${Math.floor(e.order)}${
                                            e.tier ? ` | Tier : ${e.tier}` : ''
                                          }</div>`
                                        : ''
                                    }`
                                  );
                                })(Game.AchievementsById[t]),
                              'top',
                            ),
                            Game.tooltip.wobble());
                        });
                    }
                  });
            })();
      }
      function dn(e) {
        if (
          1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.TimerBar &&
          0 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.TimerBarPos
        ) {
          const t = parseInt(l('CMTimerBar').style.height, 10);
          (Game.mouseY -= t), e(), (Game.mouseY += t);
        } else e();
      }
      function mn() {
        (Jt.Beautify = Beautify),
          (Beautify = to),
          (Jt.CalculateGains = Game.CalculateGains),
          (Game.CalculateGains = function () {
            Jt.CalculateGains(), (ce = 1), (Zt = Date.now()), (eo = Date.now());
          }),
          (Jt.tooltip = {}),
          (Jt.tooltip.draw = Game.tooltip.draw),
          (Jt.tooltip.drawMod = new Function(
            `return ${Game.tooltip.draw.toString().split('this').join('Game.tooltip')}`,
          )()),
          (Game.tooltip.draw = function (e, t, o) {
            Jt.tooltip.drawMod(e, t, o);
          }),
          (Jt.tooltip.update = Game.tooltip.update),
          (Jt.tooltip.updateMod = new Function(
            `return ${Game.tooltip.update.toString().split('this.').join('Game.tooltip.')}`,
          )()),
          (Game.tooltip.update = function () {
            Jt.tooltip.updateMod(),
              (function () {
                if ('store' === Game.tooltip.origin) {
                  let e = 0;
                  1 ===
                    Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings
                      .ToolWarnLucky &&
                    1 ===
                      Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings
                        .ToolWarnPos &&
                    null !== l('CMDispTooltipWarningParent') &&
                    (e = l('CMDispTooltipWarningParent').clientHeight - 4),
                    (Game.tooltip.tta.style.top = `${Math.min(
                      parseInt(Game.tooltip.tta.style.top, 10),
                      l('game').clientHeight +
                        l('topBar').clientHeight -
                        Game.tooltip.tt.clientHeight -
                        e -
                        46,
                    )}px`);
                }
              })();
          }),
          (Jt.UpdateWrinklers = Game.UpdateWrinklers),
          (Game.UpdateWrinklers = function () {
            dn(Jt.UpdateWrinklers);
          }),
          (Jt.UpdateSpecial = Game.UpdateSpecial),
          (Game.UpdateSpecial = function () {
            dn(Jt.UpdateSpecial);
          }),
          l('bigCookie').removeEventListener('click', Game.ClickCookie, !1),
          l('bigCookie').addEventListener(
            'click',
            (e) => {
              dn(() => Game.ClickCookie(e, 0));
            },
            !1,
          ),
          (Jt.RebuildUpgrades = Game.RebuildUpgrades),
          (Game.RebuildUpgrades = function () {
            Jt.RebuildUpgrades(),
              (Kt = []),
              Object.keys(Game.UpgradesInStore).forEach((e) => {
                null !== l(`upgrade${e}`).onmouseover &&
                  ((Kt[e] = l(`upgrade${e}`).onmouseover),
                  (l(`upgrade${e}`).onmouseover = function () {
                    Game.mouseDown ||
                      (Game.setOnCrate(this),
                      (Game.tooltip.dynamic = 1),
                      Game.tooltip.draw(this, () => Ia('u', `${e}`), 'store'),
                      Game.tooltip.wobble());
                  }));
              }),
              Game.CalculateGains();
          }),
          (Jt.ClickProduct = Game.ClickProduct),
          (Game.ClickProduct = function (e) {
            (!Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.BulkBuyBlock ||
              Game.ObjectsById[e].bulkPrice < Game.cookies ||
              -1 === Game.buyMode) &&
              Jt.ClickProduct(e);
          }),
          (Jt.DescribeDragonAura = Game.DescribeDragonAura),
          (Game.DescribeDragonAura = function (e) {
            Jt.DescribeDragonAura(e),
              (function (e) {
                if (
                  1 ===
                  Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.DragonAuraInfo
                ) {
                  const [t, o] = (function (e) {
                      ta(),
                        l('promptContent').children[0].innerHTML.includes('secondary')
                          ? (ie = e)
                          : (ne = e);
                      let t = 0;
                      if (ne !== ue || ie !== he)
                        for (let e = Game.ObjectsById.length - 1; e > -1; --e)
                          if (Game.ObjectsById[e].amount > 0) {
                            const o = Ct[Game.ObjectsById[e].name].name;
                            (Ct[o].amount -= 1),
                              (J -= 1),
                              (t =
                                Ct[o].basePrice *
                                Game.priceIncrease ** Math.max(0, Ct[o].amount - 1 - Ct[o].free)),
                              (t = Game.modifyBuildingPrice(Ct[o], t)),
                              (t = Math.ceil(t));
                            break;
                          }
                      const o = te;
                      return sa(), ha(), o !== te && sa(), [me - Game.cookiesPs, t];
                    })(e),
                    a = Uo(o / (t + Game.cookiesPs));
                  let n;
                  (n = 0 === Game.cookiesPs ? to(1 / 0) : to((t / Game.cookiesPs) * 100)),
                    (l('dragonAuraInfo').style.minHeight = '60px'),
                    (l('dragonAuraInfo').style.margin = '8px'),
                    (l('dragonAuraInfo').appendChild(document.createElement('div')).className =
                      'line');
                  const i = document.createElement('div');
                  (i.style.minWidth = '200px'),
                    (i.style.textAlign = 'center'),
                    (i.textContent = `Picking this aura will change CPS by ${to(
                      t,
                    )} (${n}% of current CPS).`),
                    l('dragonAuraInfo').appendChild(i);
                  const r = document.createElement('div');
                  (r.style.minWidth = '200px'),
                    (r.style.textAlign = 'center'),
                    (r.textContent = `It will take ${a} to recover the cost.`),
                    l('dragonAuraInfo').appendChild(r);
                }
              })(e);
          }),
          (Jt.ToggleSpecialMenu = Game.ToggleSpecialMenu),
          (Game.ToggleSpecialMenu = function (e) {
            Jt.ToggleSpecialMenu(e),
              (function () {
                if (
                  null !==
                  (l('specialPopup').className.match(/onScreen/) &&
                    l('specialPopup').children[0].style.background.match(/dragon/))
                )
                  for (let e = 0; e < l('specialPopup').childNodes.length; e++)
                    'optionBox' === l('specialPopup').childNodes[e].className &&
                      ((l('specialPopup').children[e].onmouseover = function () {
                        qa(),
                          (Game.tooltip.dynamic = 1),
                          Game.tooltip.draw(
                            l('specialPopup'),
                            `<div style="min-width:200px;text-align:center;">${fe}</div>`,
                            'this',
                          ),
                          Game.tooltip.wobble();
                      }),
                      (l('specialPopup').children[e].onmouseout = function () {
                        Game.tooltip.shouldHide = 1;
                      }));
              })();
          }),
          (Jt.UpdateMenu = Game.UpdateMenu),
          (Game.UpdateMenu = function () {
            (void 0 !== s().picker && void 0 !== s().picker.owner) ||
              (Jt.UpdateMenu(),
              (function () {
                const e = document.createElement('div');
                (e.className = 'title'),
                  'stats' === Game.onMenu
                    ? Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.Stats &&
                      ((e.textContent = 'Cookie Monster Statistics'), cn(e))
                    : 'prefs' === Game.onMenu &&
                      l('menu').childNodes[2].insertBefore(
                        an(),
                        l('menu').childNodes[2].childNodes[
                          l('menu').childNodes[2].childNodes.length - 1
                        ],
                      );
              })());
          }),
          (Jt.sayTime = Game.sayTime),
          (bo = function (e, t) {
            return Number.isNaN(e) || e <= 0 ? Jt.sayTime(e, t) : Uo(e / Game.fps, 1);
          }),
          (Jt.Logic = Game.Logic),
          (Game.Logic = function () {
            Jt.Logic();
            let e = 'Cookie Clicker';
            'fools' === Game.season && (e = 'Cookie Baker'),
              (Ao = `${Game.OnAscend ? 'Ascending! ' : ''}${to(Game.cookies)} ${
                1 === Game.cookies ? 'cookie' : 'cookies'
              } - ${e}`),
              (function () {
                if (
                  Game.OnAscend ||
                  0 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.Title
                )
                  document.title = Ao;
                else if (
                  1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.Title
                ) {
                  let e,
                    t,
                    o,
                    a = !1,
                    n = !1;
                  (e = ct
                    ? ct.wrath
                      ? `[W${Math.ceil(ct.life / Game.fps)}]`
                      : `[G${Math.ceil(ct.life / Game.fps)}]`
                    : Game.Has('Golden switch [off]')
                    ? '[GS]'
                    : `[${Number(l('CMTimerBarGCMinBar').textContent) < 0 ? '!' : ''}${Math.ceil(
                        (Game.shimmerTypes.golden.maxTime - Game.shimmerTypes.golden.time) /
                          Game.fps,
                      )}]`),
                    Ht && ((a = !0), (t = '[F]')),
                    'christmas' === Game.season &&
                      ((n = !0),
                      (o = Ut
                        ? `[R${Math.ceil(dt.life / Game.fps)}]`
                        : `[${
                            Number(l('CMTimerBarRenMinBar').textContent) < 0 ? '!' : ''
                          }${Math.ceil(
                            (Game.shimmerTypes.reindeer.maxTime - Game.shimmerTypes.reindeer.time) /
                              Game.fps,
                          )}]`));
                  let i = Ao;
                  '[' === i.charAt(0) && (i = i.substring(i.lastIndexOf(']') + 1)),
                    (document.title = `${e + (a ? t : '') + (n ? o : '')} ${i}`);
                } else if (
                  2 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.Title
                ) {
                  let e = '',
                    t = !1;
                  ct &&
                    ((t = !0),
                    ct.wrath
                      ? (e += `[W${Math.ceil(ct.life / Game.fps)}]`)
                      : (e += `[G${Math.ceil(ct.life / Game.fps)}]`)),
                    Ht && ((t = !0), (e += '[F]')),
                    'christmas' === Game.season &&
                      Ut &&
                      ((e += `[R${Math.ceil(dt.life / Game.fps)}]`), (t = !0)),
                    t && (e += ' - ');
                  let o = 'Cookie Clicker';
                  'fools' === Game.season && (o = 'Cookie Baker'), (e += o), (document.title = e);
                }
              })(),
              (function () {
                const e = Math.max(
                    0,
                    Game.HowManyCookiesReset(
                      Math.floor(Game.HowMuchPrestige(Game.cookiesReset + Game.cookiesEarned)) + 1,
                    ) -
                      (Game.cookiesEarned + Game.cookiesReset),
                  ),
                  t = Game.sayTime(((Date.now() - Game.startDate) / 1e3) * Game.fps, -1);
                let o = `You've been on this run for <b>${
                  '' === t ? 'not very long' : t
                }</b>.<br>\n  <div class="line"></div>`;
                Game.prestige > 0 &&
                  (o += `Your prestige level is currently <b>${to(
                    Game.prestige,
                  )}</b>.<br>(CpS +${to(Game.prestige)}%)\n    <div class="line"></div>`),
                  (o +=
                    q < 1
                      ? 'Ascending now would grant you no prestige.'
                      : q < 2
                      ? 'Ascending now would grant you<br><b>1 prestige level</b> (+1% CpS)<br>and <b>1 heavenly chip</b> to spend.'
                      : `Ascending now would grant you<br><b>${to(q)} prestige levels</b> (+${to(
                          q,
                        )}% CpS)<br>and <b>${to(q)} heavenly chips</b> to spend.`),
                  (o += `<div class="line"></div>\n  You need <b>${to(
                    e,
                  )} more cookies</b> for the next level.<br>\n  ${
                    Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings
                      .TooltipAscendButton
                      ? `<div class='line'></div>It takes ${mt} to reach the next level and you were making ${to(
                          Pe,
                          2,
                        )} chips on average in the last 5 seconds.<br>`
                      : ''
                  }`),
                  (l('ascendTooltip').innerHTML = o);
              })();
          });
      }
      function pn() {
        (window.CookieMonsterData = {}),
          Game.mods.cookieMonsterFramework.listeners.optionsMenu.push(an),
          Va(),
          Wa(),
          Ha(),
          (Nt = Object.keys(Game.mods).length),
          (Qt = document.createElement('style')),
          (Qt.type = 'text/css'),
          (Qt.id = 'CMCSS'),
          document.head.appendChild(Qt),
          (function () {
            const e = document.createElement('div');
            (e.id = 'CMBotBar'),
              (e.style.height = '69px'),
              (e.style.width = '100%'),
              (e.style.position = 'absolute'),
              (e.style.display = 'none'),
              (e.style.backgroundColor = '#262224'),
              (e.style.backgroundImage = 'linear-gradient(to bottom, #4d4548, #000000)'),
              (e.style.borderTop = '1px solid black'),
              (e.style.overflow = 'auto'),
              (e.style.textShadow = '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black');
            const t = e.appendChild(document.createElement('table'));
            (t.style.width = '100%'),
              (t.style.textAlign = 'center'),
              (t.style.whiteSpace = 'nowrap');
            const o = t.appendChild(document.createElement('tbody')),
              a = function (e, t) {
                const o = document.createElement('td');
                return (
                  (o.style.textAlign = 'right'), (o.className = oo + t), (o.textContent = e), o
                );
              },
              n = o.appendChild(document.createElement('tr'));
            (n.style.fontWeight = 'bold'),
              n.appendChild(a('CM 2.048.10', ro)),
              o.appendChild(document.createElement('tr')).appendChild(a('Bonus Income', no)),
              o.appendChild(document.createElement('tr')).appendChild(a('Payback Period', no)),
              o.appendChild(document.createElement('tr')).appendChild(a('Time Left', no)),
              l('wrapper').appendChild(e),
              Object.keys(Game.Objects).forEach((e) => {
                Vo(e);
              });
          })(),
          (function () {
            const e = document.createElement('div');
            (e.id = 'CMTimerBar'),
              (e.style.position = 'absolute'),
              (e.style.display = 'none'),
              (e.style.height = '0px'),
              (e.style.fontSize = '10px'),
              (e.style.fontWeight = 'bold'),
              (e.style.backgroundColor = 'black');
            const t = zo('CMTimerBarAutosave', 'Autosave', [
              { id: 'CMTimerBarAutosaveBar', colour: co },
            ]);
            e.appendChild(t);
            const o = zo('CMTimerBarGC', 'Next Cookie', [
              { id: 'CMTimerBarGCMinBar', colour: mo },
              { id: 'CMTimerBarGCBar', colour: co },
            ]);
            e.appendChild(o);
            const a = zo('CMTimerBarRen', 'Next Reindeer', [
              { id: 'CMTimerBarRenMinBar', colour: mo },
              { id: 'CMTimerBarRenBar', colour: so },
            ]);
            e.appendChild(a);
            const n = document.createElement('div');
            (n.id = 'CMTimerBarBuffTimers'), e.appendChild(n), l('wrapper').appendChild(e);
          })(),
          (function () {
            const e = document.createElement('div');
            (e.id = 'CMUpgradeBar'),
              (e.style.width = '100%'),
              (e.style.backgroundColor = 'black'),
              (e.style.textAlign = 'center'),
              (e.style.fontWeight = 'bold'),
              (e.style.display = 'none'),
              (e.style.zIndex = '21'),
              (e.onmouseout = function () {
                Game.tooltip.hide();
              });
            const t = document.createElement('div');
            t.appendChild(
              (function () {
                const e = document.createElement('div');
                (e.style.minWidth = '330px'), (e.style.marginBottom = '4px');
                const t = document.createElement('div');
                (t.className = 'name'),
                  (t.style.marginBottom = '4px'),
                  (t.textContent = 'Legend'),
                  e.appendChild(t);
                const o = function (e, t) {
                  const o = document.createElement('div');
                  o.style.verticalAlign = 'middle';
                  const a = document.createElement('span');
                  return (
                    (a.className = ao + e),
                    (a.style.display = 'inline-block'),
                    (a.style.height = '10px'),
                    (a.style.width = '10px'),
                    (a.style.marginRight = '4px'),
                    o.appendChild(a),
                    o.appendChild(document.createTextNode(t)),
                    o
                  );
                };
                return (
                  e.appendChild(o(no, 'Better than the best PP of a building option')),
                  e.appendChild(o(io, 'Same as the best PP building option')),
                  e.appendChild(o(ro, 'Within the top 10 of PP for buildings')),
                  e.appendChild(o(so, 'Within the top 20 of PP for buildings')),
                  e.appendChild(o(lo, 'Within the top 30 of PP for buildings')),
                  e.appendChild(o(co, 'Outside of the top 30 of PP for buildings')),
                  e.appendChild(o(mo, 'Negative or infinity PP')),
                  e
                );
              })(),
            ),
              (e.onmouseover = function () {
                Game.tooltip.draw(this, escape(t.innerHTML), 'store');
              });
            const o = function (e, t) {
              const o = document.createElement('span');
              return (
                (o.id = e),
                (o.className = oo + t),
                (o.style.width = '14.28571428571429%'),
                (o.style.display = 'inline-block'),
                (o.textContent = '0'),
                o
              );
            };
            e.appendChild(o('CMUpgradeBarBlue', no)),
              e.appendChild(o('CMUpgradeBarGreen', io)),
              e.appendChild(o('CMUpgradeBarYellow', ro)),
              e.appendChild(o('CMUpgradeBarOrange', so)),
              e.appendChild(o('CMUpgradeBarRed', lo)),
              e.appendChild(o('CMUpgradeBarPurple', co)),
              e.appendChild(o('CMUpgradeBarGray', mo)),
              l('upgrades').parentNode.insertBefore(e, l('upgrades').parentNode.childNodes[3]);
          })(),
          (function () {
            const e = document.createElement('div');
            (e.id = 'CMSectionHidButtons'), (e.style.textAlign = 'center');
            const t = document.createElement('a');
            (t.className = 'option'),
              (t.onclick = function () {
                'flex' === l('upgrades').style.display
                  ? ((l('upgrades').style.display = 'none'),
                    (l('toggleUpgrades').style.display = 'none'),
                    (l('techUpgrades').style.display = 'none'),
                    (l('vaultUpgrades').style.display = 'none'))
                  : ((l('upgrades').style.display = 'flex'),
                    0 !== l('toggleUpgrades').children.length &&
                      (l('toggleUpgrades').style.display = 'block'),
                    0 !== l('techUpgrades').children.length &&
                      (l('techUpgrades').style.display = 'block'),
                    0 !== l('vaultUpgrades').children.length &&
                      (l('vaultUpgrades').style.display = 'block'));
              }),
              (t.textContent = 'Hide/Show Upgrades'),
              e.appendChild(t);
            const o = document.createElement('a');
            (o.className = 'option'),
              (o.onclick = function () {
                'grid' === l('products').style.display
                  ? (l('products').style.display = 'none')
                  : (l('products').style.display = 'grid');
              }),
              (o.textContent = 'Hide/Show Buildings'),
              e.appendChild(o),
              l('store').insertBefore(e, l('store').childNodes[2]);
          })(),
          (function () {
            const e = document.createElement('link');
            (e.id = 'CMFavicon'),
              (e.rel = 'shortcut icon'),
              (e.href = 'https://orteil.dashnet.org/cookieclicker/favicon.ico'),
              document.getElementsByTagName('head')[0].appendChild(e);
          })(),
          Object.keys(go).forEach((e) => {
            !(function (e, t, o) {
              const a = document.createElement('div');
              a.id = e;
              const n = document.createElement('div');
              (n.style.minWidth = o), (n.style.marginBottom = '4px');
              const i = document.createElement('div');
              (i.style.textAlign = 'left'),
                (i.textContent = t),
                n.appendChild(i),
                a.appendChild(n),
                (fo[e] = a);
            })(go[e][0], go[e][1], go[e][2]);
          }),
          (function () {
            const e = document.createElement('a');
            (e.id = 'PopAllNormalWrinklerButton'),
              (e.textContent = 'Pop All Normal'),
              (e.className = 'option'),
              (e.onclick = function () {
                Ra();
              }),
              (e.onmouseout = function () {
                Game.tooltip.shouldHide = 1;
              }),
              (e.onmouseover = function () {
                (Game.tooltip.dynamic = 1),
                  Game.tooltip.draw(this, () => Ia('wb', 'PopAllNormal'), 'this'),
                  Game.tooltip.wobble();
              }),
              l('sectionLeftExtra').children[0].append(e);
            const t = document.createElement('a');
            (t.id = 'PopFattestWrinklerButton'),
              (t.textContent = 'Pop Single Fattest'),
              (t.className = 'option'),
              (t.onclick = function () {
                null !== He[1] && (Game.wrinklers[He[1]].hp = 0);
              }),
              (t.onmouseout = function () {
                Game.tooltip.shouldHide = 1;
              }),
              (t.onmouseover = function () {
                (Game.tooltip.dynamic = 1),
                  Game.tooltip.draw(this, () => Ia('wb', 'PopFattest'), 'this'),
                  Game.tooltip.wobble();
              }),
              l('sectionLeftExtra').children[0].append(t);
          })(),
          (l('products').style.display = 'grid'),
          (l('storeBulk').style.gridRow = '1/1'),
          (l('upgrades').style.display = 'flex'),
          (l('upgrades').style['flex-wrap'] = 'wrap'),
          Object.keys(l('rows').children).forEach((e) => {
            const t = l('rows').children[e].children[1],
              o = document.createElement('div');
            (o.id = `productLock${Number(e) + 1}`),
              (o.className = 'productButton'),
              (o.innerHTML = 'Lock'),
              (o.onclick = function () {
                !(function (e) {
                  'Lock' === l(`productLock${e}`).innerHTML
                    ? (Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.lockedMinigames.push(
                        e.toString(),
                      ),
                      (l(`row${e}`).style.pointerEvents = 'none'),
                      (l(`row${e}`).style.opacity = '0.4'),
                      (l(`productLock${e}`).innerHTML = 'Unlock'),
                      (l(`productLock${e}`).style.pointerEvents = 'auto'))
                    : (Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.lockedMinigames.includes(
                        e.toString(),
                      ) &&
                        (Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.lockedMinigames =
                          Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.lockedMinigames.filter(
                            (t) => t !== e.toString(),
                          )),
                      (l(`productLock${e}`).innerHTML = 'Lock'),
                      (l(`row${e}`).style.pointerEvents = 'auto'),
                      (l(`row${e}`).style.opacity = '1'));
                })(Number(e) + 1);
              }),
              t.appendChild(o);
          }),
          Object.keys(Game.Objects).forEach((e) => {
            const t = Game.Objects[e];
            null !== l(`product${t.id}`).onmouseover &&
              ((qt[e] = l(`product${t.id}`).onmouseover),
              (l(`product${t.id}`).onmouseover = function () {
                (Game.tooltip.dynamic = 1),
                  Game.tooltip.draw(this, () => Ia('b', `${e}`), 'store'),
                  Game.tooltip.wobble();
              }));
          }),
          Game.canLumps() &&
            ((Ot = l('lumps').onmouseover),
            (l('lumps').onmouseover = function () {
              (Game.tooltip.dynamic = 1),
                Game.tooltip.draw(this, () => Ia('s', 'Lump'), 'this'),
                Game.tooltip.wobble();
            })),
          ($t = Game.LoadMinigames),
          (Game.LoadMinigames = function () {
            $t(),
              Game.Objects.Farm.minigameLoaded &&
                ((l('gardenTool-1').onmouseover = function () {
                  (Game.tooltip.dynamic = 1),
                    Game.tooltip.draw(this, () => Ia('ha', 'HarvestAllButton'), 'this'),
                    Game.tooltip.wobble();
                }),
                Array.from(l('gardenPlot').children).forEach((e) => {
                  const t = e.id.slice(-3);
                  e.onmouseover = function () {
                    (Game.tooltip.dynamic = 1),
                      Game.tooltip.draw(this, () => Ia('p', [`${t[0]}`, `${t[2]}`]), 'this'),
                      Game.tooltip.wobble();
                  };
                })),
              _a(),
              (function () {
                if (Game.Objects.Temple.minigameLoaded) {
                  for (let e = 0; e < 11; e += 1)
                    l(`templeGod${e}`).onmouseover = function () {
                      (Game.tooltip.dynamic = 1),
                        Game.tooltip.draw(this, () => Ia('pag', e), 'this'),
                        Game.tooltip.wobble();
                    };
                  for (let e = 0; e < 3; e += 1)
                    l(`templeSlot${e}`).onmouseover = function () {
                      (Game.tooltip.dynamic = 1),
                        Game.tooltip.draw(
                          this,
                          () => Ia('pas', [e, Game.Objects.Temple.minigame.slot[e]]),
                          'this',
                        ),
                        Game.tooltip.wobble();
                    };
                }
              })(),
              Qa();
          }),
          Game.LoadMinigames(),
          (l('backgroundLeftCanvas').onmouseover = function () {
            Co = 1;
          }),
          (l('backgroundLeftCanvas').onmouseout = function () {
            (Co = 0),
              Game.tooltip.hide(),
              Object.keys(Game.wrinklers).forEach((e) => {
                yo[e] = 0;
              });
          }),
          mn(),
          Qa(),
          Game.CalculateGains(),
          (ko = Game.OnAscend),
          Game.prefs.popups
            ? Game.Popup('Cookie Monster version 2.048.10 loaded!')
            : Game.Notify('Cookie Monster version 2.048.10 loaded!', '', '', 1, 1),
          Game.Win('Third-party');
      }
      function un(e, t) {
        if (!Game.Objects.Temple.minigameLoaded) return 0;
        ta();
        const { minigame: o } = Game.Objects.Temple,
          a = o.godsById[e].slot;
        '0' === a ? (re = o.slot[t]) : '1' === a ? (se = o.slot[t]) : '2' === a && (le = o.slot[t]),
          0 === t ? (re = e) : 1 === t ? (se = e) : 2 === t && (le = e);
        const n = te;
        return sa(), ha(), n !== te && sa(), me - Game.cookiesPs;
      }
      function hn() {
        if (
          (Oo !== Game.OnAscend &&
            ((Oo = Game.OnAscend),
            Game.OnAscend
              ? ((l('game').style.bottom = '0px'),
                1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.BotBar &&
                  (l('CMBotBar').style.display = 'none'),
                1 ===
                  Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.TimerBar &&
                  (l('CMTimerBar').style.display = 'none'))
              : (en(), qo()),
            Xo()),
          !Game.OnAscend && 0 === Game.AscendTimer)
        ) {
          Nt !== Object.keys(Game.mods).length &&
            (Va(), Ha(), (Nt = Object.keys(Game.mods).length)),
            ce &&
              ($a(!0),
              Pa(),
              Game.Has('Golden switch [off]')
                ? (ta(), (Mt['Golden switch [off]'].bought = 0), sa(), (Se = me))
                : (Se = Game.cookiesPs),
              Ga({ CacheNoGoldSwitchCookiesPS: Se }),
              ja(),
              Wa(),
              La(),
              Oa(),
              qa(),
              (function () {
                for (let e = 0; e < 11; e += 1) for (let t = 0; t < 3; t += 1) kt[e][t] = un(e, t);
                Ga({ CacheGods: kt });
              })(),
              Aa(),
              (function () {
                let e = 0;
                if (Game.Objects.Bank.minigameLoaded) {
                  const t = Game.Objects.Bank.minigame.goods;
                  let o = 0;
                  Object.keys(t).forEach((e) => {
                    const a = t[e];
                    o += a.stock * a.val;
                  }),
                    (e += o * Game.cookiesPsRawHighest);
                }
                (e += (function () {
                  let e = 0;
                  ta();
                  let t = 2;
                  (5 !== ne && 18 !== ne) || (t -= 1),
                    (5 !== ie && 18 !== ie) || (t -= 1),
                    (ne = 5),
                    (ie = 18);
                  for (let e = 0; e < t; ++e) {
                    let e = 'Cursor';
                    Object.keys(Ct).forEach((t) => {
                      Ct[t].amount > 0 && (e = t);
                    }),
                      (Ct[e].amount -= 1),
                      (J -= 1);
                  }
                  return (
                    Object.keys(Ct).forEach((t) => {
                      const o = Ct[t];
                      e += Ft(
                        Game.Objects[o.name],
                        Game.Objects[t].basePrice,
                        o.amount,
                        Game.Objects[t].free,
                        o.amount,
                      );
                    }),
                    e
                  );
                })()),
                  (ft = e),
                  Ga({ CacheSellForChoEgg: ft });
              })(),
              (ce = 0));
          const e = Game.auraMult('Fierce Hoarder') > 0;
          !K && e ? ((K = !0), (Y = 1)) : K && !e && ((K = !1), (Y = 1)),
            Y && (Ba(), (Y = 0)),
            (function () {
              Ua(),
                Sa(),
                $a(!1),
                (function () {
                  Re = 0;
                  let e = 0;
                  Object.keys(Game.wrinklers).forEach((t) => {
                    2 === Game.wrinklers[t].phase && (e += 1);
                  });
                  let t = 1;
                  if (Ct.Temple.minigameLoaded) {
                    const e = Game.hasGod('scorn');
                    1 === e ? (t *= 1.15) : 2 === e ? (t *= 1.1) : 3 === e && (t *= 1.05);
                  }
                  (Ie = e),
                    (Re =
                      e *
                      (0.05 * e * 1.1) *
                      (0.05 * Game.Has('Sacrilegious corruption') + 1) *
                      (0.05 * Game.Has('Wrinklerspawn') + 1) *
                      t),
                    Ga({ CacheCurrWrinklerCount: Ie, CacheCurrWrinklerCPSMult: Re });
                })(),
                va(),
                Da();
              const e =
                Game.HowManyCookiesReset(
                  Math.floor(Game.HowMuchPrestige(Game.cookiesReset + Game.cookiesEarned)) + 1,
                ) -
                (Game.cookiesEarned + Game.cookiesReset);
              mt = Uo(e / Ro());
            })(),
            Ht !== (Game.TickerEffect && 'fortune' === Game.TickerEffect.type) &&
              ((Ht = Game.TickerEffect && 'fortune' === Game.TickerEffect.type),
              Ht &&
                (v.createFlash('cookieMonsterMod', 3, 'FortuneFlash', !1),
                v.playCMSound(
                  'cookieMonsterMod',
                  Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings
                    .FortuneSoundURL,
                  'FortuneSound',
                  'FortuneVolume',
                  !1,
                ),
                v.createNotification(
                  'cookieMonsterMod',
                  'FortuneNotification',
                  'Fortune Cookie found',
                  'A Fortune Cookie has appeared on the Ticker.',
                ))),
            Ut !== Game.shimmerTypes.reindeer.spawned &&
              ((Ut = Game.shimmerTypes.reindeer.spawned),
              Object.keys(Game.shimmers).forEach((e) => {
                Game.shimmers[e].spawnLead &&
                  'reindeer' === Game.shimmers[e].type &&
                  (dt = Game.shimmers[e]);
              }),
              v.createFlash('cookieMonsterMod', 3, 'SeaFlash', !1),
              v.playCMSound(
                'cookieMonsterMod',
                Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.SeaSoundURL,
                'SeaSound',
                'SeaVolume',
                !1,
              ),
              v.createNotification(
                'cookieMonsterMod',
                'SeaNotification',
                'Reindeer sighted!',
                'A Reindeer has spawned. Click it now!',
              )),
            Game.Objects.Farm.minigameLoaded &&
              Rt !== Game.Objects.Farm.minigame.nextStep &&
              (0 !== Rt &&
                Rt < Date.now() &&
                (v.createFlash('cookieMonsterMod', 3, 'GardFlash', !1),
                v.playCMSound(
                  'cookieMonsterMod',
                  Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.GardSoundURL,
                  'GardSound',
                  'GardVolume',
                  !1,
                )),
              (Rt = Game.Objects.Farm.minigame.nextStep)),
            (function () {
              if (
                Game.Objects['Wizard tower'].minigameLoaded &&
                1 ===
                  Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.GrimoireBar
              ) {
                const { minigame: e } = Game.Objects['Wizard tower'];
                e.magic < e.magicM
                  ? (Vt = !1)
                  : Vt ||
                    ((Vt = !0),
                    v.createFlash('cookieMonsterMod', 3, 'MagicFlash', !1),
                    v.playCMSound(
                      'cookieMonsterMod',
                      Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings
                        .MagicSoundURL,
                      'MagicSound',
                      'MagicVolume',
                      !1,
                    ),
                    v.createNotification(
                      'cookieMonsterMod',
                      'MagicNotification',
                      'Magic Meter full',
                      'Your Magic Meter is full. Cast a spell!',
                    ));
              }
            })(),
            (function () {
              if (Game.elderWrath > 0) {
                let e = 0;
                Object.keys(Game.wrinklers).forEach((t) => {
                  2 === Game.wrinklers[t].phase && (e += 1);
                }),
                  e > Xt
                    ? ((Xt = e),
                      e === Game.getWrinklersMax() &&
                      Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings
                        .WrinklerMaxFlash
                        ? v.createFlash('cookieMonsterMod', 3, 'WrinklerMaxFlash', !1)
                        : v.createFlash('cookieMonsterMod', 3, 'WrinklerFlash', !1),
                      e === Game.getWrinklersMax() &&
                      Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings
                        .WrinklerMaxSound
                        ? v.playCMSound(
                            'cookieMonsterMod',
                            Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings
                              .WrinklerMaxSoundURL,
                            'WrinklerMaxSound',
                            'WrinklerMaxVolume',
                            !1,
                          )
                        : v.playCMSound(
                            'cookieMonsterMod',
                            Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings
                              .WrinklerSoundURL,
                            'WrinklerSound',
                            'WrinklerVolume',
                            !1,
                          ),
                      e === Game.getWrinklersMax() &&
                      Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings
                        .WrinklerMaxNotification
                        ? v.createNotification(
                            'cookieMonsterMod',
                            'WrinklerMaxNotification',
                            'Maximum Wrinklers Reached',
                            'You have reached your maximum ammount of wrinklers',
                          )
                        : v.createNotification(
                            'cookieMonsterMod',
                            'WrinklerNotification',
                            'A Wrinkler appeared',
                            'A new wrinkler has appeared',
                          ))
                    : (Xt = e);
              }
            })();
        }
        (_t = 0),
          (gt = {}),
          Object.keys(Game.shimmers).forEach((e) => {
            (gt[Game.shimmers[e].id] = Game.shimmers[e]),
              Game.shimmers[e].spawnLead &&
                'golden' === Game.shimmers[e].type &&
                ((ct = Game.shimmers[e]), (_t += 1));
          }),
          Object.keys(Lo).forEach((e) => {
            void 0 === gt[e] && (Lo[e].parentNode.removeChild(Lo[e]), delete Lo[e]);
          }),
          It !== Game.shimmerTypes.golden.n
            ? ((It = Game.shimmerTypes.golden.n),
              It &&
                (zt < _t &&
                  (v.createFlash('cookieMonsterMod', 3, 'GCFlash', !1),
                  v.playCMSound(
                    'cookieMonsterMod',
                    Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.GCSoundURL,
                    'GCSound',
                    'GCVolume',
                    !1,
                  ),
                  v.createNotification(
                    'cookieMonsterMod',
                    'GCNotification',
                    'Golden Cookie Spawned',
                    'A Golden Cookie has spawned. Click it now!',
                  )),
                Object.keys(Game.shimmers).forEach((e) => {
                  void 0 === Lo[Game.shimmers[e].id] &&
                    (function (e) {
                      const t = document.createElement('div');
                      (t.id = `GCTimer${e.id}`),
                        (t.style.width = '96px'),
                        (t.style.height = '96px'),
                        (t.style.position = 'absolute'),
                        (t.style.zIndex = '10000000001'),
                        (t.style.textAlign = 'center'),
                        (t.style.lineHeight = '96px'),
                        (t.style.fontFamily = '"Kavoon", Georgia, serif'),
                        (t.style.fontSize = '35px'),
                        (t.style.cursor = 'pointer'),
                        (t.style.display = 'block'),
                        (t.style.pointerEvents = 'none'),
                        0 ===
                          Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings
                            .GCTimer && (t.style.display = 'none'),
                        (t.style.left = e.l.style.left),
                        (t.style.top = e.l.style.top),
                        (t.onclick = function () {
                          e.pop();
                        }),
                        (t.onmouseover = function () {
                          (e.l.style.filter =
                            'brightness(125%) drop-shadow(0px 0px 3px rgba(255,255,255,1))'),
                            (e.l.style.webkitFilter =
                              'brightness(125%) drop-shadow(0px 0px 3px rgba(255,255,255,1))');
                        }),
                        (t.onmouseout = function () {
                          (e.l.style.filter = ''), (e.l.style.webkitFilter = '');
                        }),
                        (Lo[e.id] = t),
                        l('shimmers').appendChild(t);
                    })(Game.shimmers[e]);
                })),
              za(),
              (zt = _t),
              0 === _t && (ct = 0))
            : 1 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.settings.GCTimer &&
              It &&
              Object.keys(Lo).forEach((e) => {
                (Lo[e].style.opacity = gt[e].l.style.opacity),
                  (Lo[e].style.transform = gt[e].l.style.transform),
                  (Lo[e].textContent = Math.ceil(gt[e].life / Game.fps));
              });
      }
      const gn = {
        Favourite: 1,
        Calculation: 1,
        Notation: 1,
        Colours: 1,
        BarsDisplay: 1,
        Tooltip: 1,
        Statistics: 1,
        Notification: 1,
        NotificationGeneral: 1,
        NotificationGC: 1,
        NotificationFC: 1,
        NotificationSea: 1,
        NotificationGard: 1,
        NotificationMagi: 1,
        NotificationWrink: 1,
        NotificationWrinkMax: 1,
        Miscellaneous: 1,
        Lucky: 1,
        Chain: 1,
        Spells: 1,
        Garden: 1,
        Prestige: 1,
        Wrink: 1,
        Sea: 1,
        Achievs: 1,
        Misc: 1,
        infoMenu: 1,
        optionsMenu: 1,
      };
      function fn(e) {
        Va(),
          w.loadMod('cookieMonsterMod', e, tn, gn, hn),
          void 0 === Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.lockedMinigames &&
            (Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.lockedMinigames = []),
          on();
        for (
          let e = 0;
          e < Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.lockedMinigames.length;
          e++
        ) {
          const t = Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.lockedMinigames[e];
          (l(`row${t}`).style.pointerEvents = 'none'),
            (l(`row${t}`).style.opacity = '0.4'),
            (l(`productLock${t}`).innerHTML = 'Unlock'),
            (l(`productLock${t}`).style.pointerEvents = 'auto');
        }
        void 0 !== Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.version &&
          '2.048.10' !== Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod.version &&
          (Game.prefs.popups
            ? Game.Popup(
                'A new version of Cookie Monster has been loaded, check out the release notes in the info tab!',
              )
            : Game.Notify(
                'A new version of Cookie Monster has been loaded, check out the release notes in the info tab!',
                '',
                '',
                0,
                1,
              ));
      }
      const kn = {
        init: function () {
          let e = !0;
          M(),
            (window.cookieMonsterFrameworkData.isInitializing = !0),
            y('cookieMonsterMod'),
            Game.version !== Number('2.048') &&
              (e = confirm(
                'Cookie Monster version 2.048.10 is meant for Game version 2.048. Loading a different version may cause errors. Do you still want to load Cookie Monster?',
              )),
            e &&
              (pn(),
              Game.registerHook('click', ya),
              Game.registerHook('draw', Ma),
              Game.registerHook('logic', hn),
              void 0 === Game.modSaveData.cookieMonsterMod && fn('{}'));
        },
        load: fn,
        save: function () {
          const e = Game.mods.cookieMonsterFramework.saveData.cookieMonsterMod;
          return (e.version = '2.048.10'), JSON.stringify(e);
        },
      };
      'undefined' != typeof Steam
        ? setTimeout(function () {
            Game.registerMod('CookieMonster', kn),
              (window.cookieMonsterFrameworkData.isInitializing = !1);
          }, 2e3)
        : (Game.registerMod('CookieMonster', kn),
          (window.cookieMonsterFrameworkData.isInitializing = !1));
    })();
})();
//# sourceMappingURL=https://cookiemonsterteam.github.io/CookieMonster/dist/CookieMonster.js.map
