function _classCallCheck(a, b) {
  if (!(a instanceof b))
    throw new TypeError("Cannot call a class as a function");
}

function _defineProperties(a, b) {
  for (var c, d = 0; d < b.length; d++)
    (c = b[d]),
      (c.enumerable = c.enumerable || !1),
      (c.configurable = !0),
      "value" in c && (c.writable = !0),
      Object.defineProperty(a, c.key, c);
}

function _createClass(a, b, c) {
  return (
    b && _defineProperties(a.prototype, b), c && _defineProperties(a, c), a
  );
}
var Subscriber = (function () {
  "use strict";

  function a(b) {
    _classCallCheck(this, a),
      (this.email = b.email),
      (this.source = b.source),
      (this.valid = !1),
      (this.displayVerifyMessage = !0);
  }
  return (
    _createClass(a, [
      {
        key: "checkEmail",
        value: function checkEmail(a) {
          return "string" == typeof this.email
            ? 0 === this.email.length
              ? void a("Email is empty")
              : !!this.validateEmail() || void a("Invalid email")
            : void a("Email must be a String");
        },
      },
      {
        key: "checkSource",
        value: function checkSource(a) {
          return "string" == typeof this.source
            ? 0 !== this.source.length || void a("Source is empty")
            : void a("Source must be a String");
        },
      },
      {
        key: "create",
        value: function create() {
          var a = this;
          return new Promise(function (b, c) {
            (a.valid = a.checkEmail(c) && a.checkSource(c)),
              a.valid &&
                $.ajax({
                  type: "POST",
                  url: "/api/subscribers/",
                  dataType: "json",
                  contentType: "application/json; charset=utf-8",
                  async: !0,
                  data: JSON.stringify({
                    email: a.email,
                    source: a.source,
                  }),
                  success: function success(a) {
                    b(a);
                  },
                  error: function error(a) {
                    c(a);
                  },
                });
          });
        },
      },
      {
        key: "validateEmail",
        value: function validateEmail() {
          return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            (this.email + "").toLowerCase()
          );
        },
      },
    ]),
    a
  );
})();
