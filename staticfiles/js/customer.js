(function () {
  var a = document.querySelector("#password-reset-email");
  if (
    (a &&
      a.addEventListener("focusout", function (a) {
        validation.emailValidation(a.target, ".email-validation");
      }),
    null !== document.querySelector("#forgot-pw-back-button"))
  ) {
    var b = document.querySelector("#forgot-pw-back-button");
    b.addEventListener("click", function () {
      var a = document.querySelector(".login-step-2"),
        b = document.querySelector("#forgot-password-step");
      b.classList.add("hide"), a.classList.remove("hide");
    });
  }
  $("#plt-forgot-password").submit(function (a) {
    a.preventDefault();
    var b = document.querySelector("#plt-forgot-password"),
      c = b.querySelector(".bttn-submit"),
      d = b.querySelector(".js-error");
    if (null !== document.querySelector("#forgot-pw-back-button"))
      var e = document.querySelector("#forgot-password-step"),
        f = document.querySelector("#forgot-password-step"),
        g = document.querySelector("#forgot-password-success"),
        h = document.querySelector("#forgot-password-success");
    else
      var e = document.querySelector("#plt-forgot-password-modal"),
        i = document.querySelector("#plt-forgot-password-modal .modal-body"),
        j = document.querySelector(
          "#plt-forgot-password-modal .modal-body .step-1"
        ),
        h = document.querySelector(
          "#plt-forgot-password-modal .modal-body .step-2"
        );
    var k = document.querySelector("#csrfToken").value;
    d.classList.remove("active"), c.classList.add("is-loading");
    var l = {
        email: b.querySelector("#password-reset-email").value,
      },
      m = {
        credentials: "same-origin",
        method: "POST",
        body: JSON.stringify(l),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-CSRF-Token": k,
        },
      };
    gae("customer", "forgot_password_submit"),
      fetch("/account/auth/forgot-password", m)
        .then(function (a) {
          return a.json();
        })
        .then(function (a) {
          "error" == a.status &&
            setTimeout(function () {
              c.classList.remove("is-loading"),
                d.classList.add("active"),
                (d.innerHTML = a.error);
            }, 1e3),
            "redirect" == a.status &&
              (b.reset(), window.location.replace(a.redirectUrl)),
            "ok" == a.status &&
              setTimeout(function () {
                c.classList.remove("is-loading"),
                  (e.scrollTop = 0),
                  null === document.querySelector("#forgot-pw-back-button")
                    ? (j.classList.add("move-out"),
                      h.classList.add("move-in"),
                      (i.style.height = h.clientHeight + 48 + "px"),
                      (i.style.overflow = "hidden"))
                    : (f.classList.add("hide"), g.classList.remove("hide"));
                var a = h.querySelector(".resend-reset-password-email");
                if (null !== document.querySelector("#forgot-pw-back-button"))
                  var d = h.querySelector(".email-address");
                else
                  var d = h.querySelector(
                    "#plt-forgot-password-modal .sent-confirmation-step .email-address"
                  );
                a.setAttribute("data-email", l.email),
                  (d.innerHTML = l.email),
                  b.reset();
              }, 1e3);
        })
        .catch(function (a) {
          console.error("Error:", a);
        });
  });
})();
(function () {
  var a;
  document.addEventListener("click", function (b) {
    if (
      ("modal" == b.target.dataset.toggle &&
        (a = b.target.getAttribute("href")),
      b.target.classList.contains("modal-backdrop-light") && void 0 !== a)
    ) {
      var c = a + " form";
      validation.clearFull(c);
    }
    if ("modal" == b.target.dataset.dismiss && void 0 !== a) {
      var d = a + " form";
      validation.clearFull(d);
    }
  });
})();
(function () {
  if (
    ($("#plt-login-modalf").on("hidden.bs.modal", function () {
      $(".login-form-wrapper .js-error").text("").removeClass("active");
    }),
    $("#plt-login-modalf").on("show.bs.modal", function () {
      $(".login-form-wrapper .js-error").text("").removeClass("active");
    }),
    null !== document.querySelector(".bttn--email"))
  )
    document.querySelector(".bttn--email");
  if (null !== document.querySelector("#forgot-password-link")) {
    var c = document.querySelector("#forgot-password-link");
    c.addEventListener("click", function () {
      var a = document.querySelector(".login-step-2"),
        b = document.querySelector("#forgot-password-step");
      a.classList.add("hide"), b.classList.remove("hide");
    });
  };
(function () {
  function a(a) {
    var b = a.target,
      c = a.target.dataset.email,
      d = a.target.dataset.csrfToken;
    b.innerHTML = "<span>".concat(resendEmailSendingText, "</span>");
    var e = {
      credentials: "same-origin",
      method: "POST",
      body: JSON.stringify({
        email: c,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRF-Token": d,
      },
    };
    fetch("/account/auth/resend-verification", e)
      .then(function (a) {
        return a.json();
      })
      .then(function (a) {
        b.outerHTML =
          "ok" == a.status
            ? '<span class="message-sent">\u2713 '.concat(
                resendEmailSentText,
                " </span>"
              )
            : '<span class="message-error"> '.concat(a.error, " </span>");
      })
      .catch(function (a) {
        console.error("Error:", a);
      });
  }

  function b(a) {
    var b = a.target,
      c = a.target.dataset.email,
      d = a.target.dataset.csrfToken;
    b.innerHTML = "<span>".concat(resendEmailSendingText, "</span>");
    var e = {
      method: "POST",
      body: JSON.stringify({
        email: c,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRF-Token": d,
      },
    };
    fetch("/account/auth/forgot-password", e)
      .then(function (a) {
        return a.json();
      })
      .then(function (a) {
        b.outerHTML =
          "ok" == a.status
            ? "<span>\u2713 ".concat(resendEmailSentText, " </span>")
            : "<span> ".concat(a.error, " </span>");
      })
      .catch(function (a) {
        console.error("Error:", a);
      });
  }
  var c = document.querySelector(".resend-verification-email"),
    d = document.querySelector(".resend-reset-password-email");
  c &&
    c.addEventListener("click", function (b) {
      a(b);
    }),
    d &&
      d.addEventListener("click", function (a) {
        b(a);
      });
})();
(function () {
  function a(a) {
    var b = a.value;
    validation.setValidation(e, validation.isMinimalLength(b, d)),
      validation.setValidation(f, validation.containsNumbers(b)),
      validation.setValidation(g, validation.containsUppercaseCharacters(b)),
      validation.setValidation(h, validation.containsLowercaseCharacters(b));
  }
  var b = document.querySelector("#account_password_new");
  b &&
    b.addEventListener("focusout", function (a) {
      validation.isPasswordValid(a.target, ".password-validation");
    }),
    document.addEventListener("keyup", function (b) {
      "account_password_new" == b.target.id &&
        2 < b.target.value.length &&
        a(b.target);
    }),
    document.addEventListener("click", function (a) {
      if (a.target.classList.contains("toggle-password-visibility")) {
        var b = validation.findAncestor(
            a.target,
            ".has-password-visibility-switcher"
          ),
          c = b.querySelector(".form-control");
        "password" == c.type
          ? ((c.type = "text"), a.target.classList.add("is-visible"))
          : ((c.type = "password"), a.target.classList.remove("is-visible"));
      }
    });
  var c = document.querySelector("#plt-reset-password");
  if (null !== c) {
    var d = 8,
      e = c.querySelector(".password-validation .check-length"),
      f = c.querySelector(".password-validation .check-number"),
      g = c.querySelector(".password-validation .check-uppercase"),
      h = c.querySelector(".password-validation .check-lowercase");
    c.addEventListener("submit", function (a) {
      a.preventDefault();
      var b = this,
        c = this.querySelector("#reset-password-form-submit"),
        d = this.querySelector(".js-error"),
        e = this.querySelector(".js-success"),
        f = b.querySelector("#account_password_new"),
        g = b.querySelector("#account_password_new_repeat"),
        h = b.querySelector("#csrfToken").value;
      if (
        (c.classList.add("is-loading"),
        !1 == validation.containsSameValue(f.value, g.value))
      )
        return (
          d.classList.add("active"),
          (d.innerHTML = "Passwords do not match"),
          c.classList.remove("is-loading"),
          !1
        );
      var i = {
          "reset-password-token": document.querySelector(
            "#reset-password-token"
          ).value,
          password: f.value,
          "confirm-password": g.value,
        },
        j = {
          credentials: "same-origin",
          method: "POST",
          body: JSON.stringify(i),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-CSRF-Token": h,
          },
        };
      gae("customer", "reset_password_submit"),
        fetch("/account/auth/reset-password", j)
          .then(function (a) {
            return a.json();
          })
          .then(function (a) {
            "ok" == a.status &&
              (gae("customer", "reset_password_submit_ok"),
              setTimeout(function () {
                (e.style.display = "block"), window.location.replace("/");
              }, 3e3)),
              "error" == a.status &&
                (c.classList.remove("is-loading"),
                d.classList.add("active"),
                (d.innerHTML = a.error),
                gae("customer", "reset_password_submit_error"));
          })
          .catch(function (a) {
            console.error("Error:", a);
          });
    });
  }
})();
(function () {
  function a(a) {
    var b = a.value;
    validation.setValidation(c, validation.isMinimalLength(b, 8)),
      validation.setValidation(d, validation.containsNumbers(b)),
      validation.setValidation(e, validation.containsUppercaseCharacters(b)),
      validation.setValidation(f, validation.containsLowercaseCharacters(b));
  }
  document.addEventListener("focusout", function (a) {
    var b = a.target.matches
        ? a.target.matches("#plt-signup-modal .simple-validation .form-control")
        : a.target.msMatchesSelector(
            "#plt-signup-modal .simple-validation .form-control"
          ),
      c = a.target.matches
        ? a.target.matches("#plt-signup-modal .email-validation .form-control")
        : a.target.msMatchesSelector(
            "#plt-signup-modal .email-validation .form-control"
          ),
      d = a.target.matches
        ? a.target.matches(
            "#plt-signup-modal .password-validation .form-control"
          )
        : a.target.msMatchesSelector(
            "#plt-signup-modal .password-validation .form-control"
          );
    b && validation.simpleValidation(a.target, ".simple-validation"),
      c && validation.emailValidation(a.target, ".email-validation"),
      d && validation.isPasswordValid(a.target, ".password-validation");
  }),
    document.addEventListener("keyup", function (b) {
      "signup-password" == b.target.id &&
        2 < b.target.value.length &&
        a(b.target);
    }),
    $("#plt-signup-modal").on("hidden.bs.modal", function () {
      $(".signup-form-wrapper .js-error").text("").removeClass("active");
    }),
    $("#plt-signup-modal").on("show.bs.modal", function () {
      $(".signup-form-wrapper .js-error").text("").removeClass("active");
    });
  var b = document.querySelector("#plt-signup-form");
  if (null !== b)
    var c = b.querySelector(".password-validation .check-length"),
      d = b.querySelector(".password-validation .check-number"),
      e = b.querySelector(".password-validation .check-uppercase"),
      f = b.querySelector(".password-validation .check-lowercase");
  if (
    ($("#plt-signup-form").submit(function (a) {
      if ((a.preventDefault(), validation.hasFormErrors("#plt-signup-form")))
        return !1;
      var c = document.querySelector("#signup-form-submit");
      if (null !== document.querySelector("#sign-up-email-step"))
        var d = document.querySelector("#plt-signup-modal"),
          e = document.querySelector(".signup-step-2 "),
          f = document.querySelector(".signup-step-3"),
          g = document.querySelector("#plt-signup-form .js-error");
      else
        var d = document.querySelector("#plt-signup-modal"),
          e = document.querySelector(".signup-form-wrapper .step-1"),
          f = document.querySelector(".signup-form-wrapper .step-2"),
          g = document.querySelector(".signup-form-wrapper .js-error");
      if (
        "mobile" !== getDeviceType() &&
        null !== document.querySelector(".g-recaptcha")
      )
        var h = grecaptcha.getResponse();
      else var h = "";
      var i = document.querySelector("#csrfToken").value,
        j = {
          first_name: document.querySelector("#signup-first-name").value,
          last_name: document.querySelector("#signup-last-name").value,
          email: document.querySelector("#signup-email").value,
          password: document.querySelector("#signup-password").value,
          newsletter: document.querySelector("#signup-newsletter").checked,
          recaptcha: h,
          pageType: document.querySelector("#signup-page-type").value,
        },
        k = {
          credentials: "same-origin",
          method: "POST",
          body: JSON.stringify(j),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-CSRF-Token": i,
          },
        };
      c.classList.add("is-loading"),
        (c.disabled = !0),
        gae("customer", "signup_email_submit"),
        fetch("/account/auth/signup", k)
          .then(function (a) {
            return a.json();
          })
          .then(function (a) {
            setTimeout(function () {
              if ((c.classList.remove("is-loading"), "ok" == a.status)) {
                if (
                  (marketing.trackSoftGoals(
                    marketing.SoftGoals.AccountRegistration,
                    "form"
                  ),
                  gae("customer", "signup_email_submit_ok"),
                  (d.scrollTop = 0),
                  null === document.querySelector("#sign-up-email-step")
                    ? (e.classList.add("move-out"), f.classList.add("move-in"))
                    : (e.classList.add("hide"), f.classList.remove("hide")),
                  (d.style.height = f.clientHeight + "px"),
                  (d.style.overflow = "hidden"),
                  null !== document.querySelector("#sign-up-confirmation-step"))
                )
                  var h = document.querySelector(
                    "#sign-up-confirmation-step .close"
                  );
                else var h = document.querySelector("#plt-signup-modal .close");
                if (null !== h) {
                  var i = document.querySelector(".modal-backdrop-light");
                  h.classList.add("js-close-reload"),
                    i.classList.add("js-close-reload"),
                    document.addEventListener("click", function (a) {
                      a.target.matches(".js-close-reload") &&
                        window.location.reload();
                    });
                }
                b.reset();
              } else g.classList.add("active"), (c.disabled = !1), (g.innerHTML = a.error), gae("customer", "signup_email_submit_error");
            }, 1e3);
          })
          .catch(function (a) {
            console.error("Error:", a);
          });
    }),
    $(".js-modal-fill-data").click(function (a) {
      a.preventDefault();
      var b = document.querySelector("#csrfToken").value,
        c = getUrlParameter("token");
      fetch("/account/auth/signup?token=" + c + "&modal", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-CSRF-Token": b,
        },
      })
        .then(function (a) {
          return a.json();
        })
        .then(function (a) {
          "ok" == a.status &&
            ((document.querySelector("#signup-first-name").value = a.name),
            (document.querySelector("#signup-last-name").value = a.lastName),
            (document.querySelector("#signup-email").value = a.email));
        });
    }),
    null !== document.querySelector("#signup-email-button"))
  ) {
    var g = document.querySelector("#signup-email-button"),
      h = document.querySelector(".bttn--back");
    h.addEventListener("click", function () {
      var a = h.closest(".signup-step-2");
      a.classList.add("hide");
      var b = g.closest(".step-1");
      b.classList.remove("hide");
    }),
      g.addEventListener("click", function () {
        var a = g.closest(".step-1");
        a.classList.add("hide");
        var b = document.querySelector(".signup-step-2");
        b.classList.remove("hide");
      });
  }
})();

function _typeof(a) {
  "@babel/helpers - typeof";
  return (
    (_typeof =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (a) {
            return typeof a;
          }
        : function (a) {
            return a &&
              "function" == typeof Symbol &&
              a.constructor === Symbol &&
              a !== Symbol.prototype
              ? "symbol"
              : typeof a;
          }),
    _typeof(a)
  );
}
(function (a, b) {
  "object" ==
    ("undefined" == typeof exports ? "undefined" : _typeof(exports)) &&
  "undefined" != typeof module
    ? (module.exports = b())
    : "function" == typeof define && define.amd
    ? define(b)
    : (a.Popper = b());
})(this, function () {
  "use strict";

  function J(a) {
    return a && "[object Function]" === {}.toString.call(a);
  }

  function aa(a, b) {
    if (1 !== a.nodeType) return [];
    var c = a.ownerDocument.defaultView,
      d = c.getComputedStyle(a, null);
    return b ? d[b] : d;
  }

  function ba(a) {
    return "HTML" === a.nodeName ? a : a.parentNode || a.host;
  }

  function ca(a) {
    if (!a) return document.body;
    switch (a.nodeName) {
      case "HTML":
      case "BODY":
        return a.ownerDocument.body;
      case "#document":
        return a.body;
    }
    var b = aa(a),
      c = b.overflow,
      d = b.overflowX,
      e = b.overflowY;
    return /(auto|scroll|overlay)/.test(c + e + d) ? a : ca(ba(a));
  }

  function da(a) {
    return a && a.referenceNode ? a.referenceNode : a;
  }

  function ea(a) {
    return 11 === a ? X : 10 === a ? Y : X || Y;
  }

  function fa(a) {
    if (!a) return document.documentElement;
    for (
      var b = ea(10) ? document.body : null, c = a.offsetParent || null;
      c === b && a.nextElementSibling;

    )
      c = (a = a.nextElementSibling).offsetParent;
    var d = c && c.nodeName;
    return d && "BODY" !== d && "HTML" !== d
      ? -1 !== ["TH", "TD", "TABLE"].indexOf(c.nodeName) &&
        "static" === aa(c, "position")
        ? fa(c)
        : c
      : a
      ? a.ownerDocument.documentElement
      : document.documentElement;
  }

  function p(a) {
    var b = a.nodeName;
    return "BODY" !== b && ("HTML" === b || fa(a.firstElementChild) === a);
  }

  function s(a) {
    return null === a.parentNode ? a : s(a.parentNode);
  }

  function ga(a, b) {
    if (!a || !a.nodeType || !b || !b.nodeType) return document.documentElement;
    var c = a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING,
      d = c ? a : b,
      e = c ? b : a,
      g = document.createRange();
    g.setStart(d, 0), g.setEnd(e, 0);
    var h = g.commonAncestorContainer;
    if ((a !== h && b !== h) || d.contains(e)) return p(h) ? h : fa(h);
    var i = s(a);
    return i.host ? ga(i.host, b) : ga(a, s(b).host);
  }

  function a(a) {
    var b =
        1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "top",
      c = "top" === b ? "scrollTop" : "scrollLeft",
      d = a.nodeName;
    if ("BODY" === d || "HTML" === d) {
      var e = a.ownerDocument.documentElement,
        f = a.ownerDocument.scrollingElement || e;
      return f[c];
    }
    return a[c];
  }

  function n(b, c) {
    var d = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
      e = a(c, "top"),
      f = a(c, "left"),
      g = d ? -1 : 1;
    return (
      (b.top += e * g),
      (b.bottom += e * g),
      (b.left += f * g),
      (b.right += f * g),
      b
    );
  }

  function d(a, b) {
    var c = "x" === b ? "Left" : "Top",
      d = "Left" == c ? "Right" : "Bottom";
    return (
      parseFloat(a["border" + c + "Width"]) +
      parseFloat(a["border" + d + "Width"])
    );
  }

  function f(a, b, c, d) {
    return S(
      b["offset" + a],
      b["scroll" + a],
      c["client" + a],
      c["offset" + a],
      c["scroll" + a],
      ea(10)
        ? parseInt(c["offset" + a]) +
            parseInt(d["margin" + ("Height" === a ? "Top" : "Left")]) +
            parseInt(d["margin" + ("Height" === a ? "Bottom" : "Right")])
        : 0
    );
  }

  function l(a) {
    var b = a.body,
      c = a.documentElement,
      d = ea(10) && getComputedStyle(c);
    return {
      height: f("Height", b, c, d),
      width: f("Width", b, c, d),
    };
  }

  function ha(a) {
    return ja({}, a, {
      right: a.left + a.width,
      bottom: a.top + a.height,
    });
  }

  function ia(b) {
    var c = {};
    try {
      if (ea(10)) {
        c = b.getBoundingClientRect();
        var e = a(b, "top"),
          g = a(b, "left");
        (c.top += e), (c.left += g), (c.bottom += e), (c.right += g);
      } else c = b.getBoundingClientRect();
    } catch (a) {}
    var i = {
        left: c.left,
        top: c.top,
        width: c.right - c.left,
        height: c.bottom - c.top,
      },
      j = "HTML" === b.nodeName ? l(b.ownerDocument) : {},
      k = j.width || b.clientWidth || i.width,
      m = j.height || b.clientHeight || i.height,
      n = b.offsetWidth - k,
      p = b.offsetHeight - m;
    if (n || p) {
      var q = aa(b);
      (n -= d(q, "x")), (p -= d(q, "y")), (i.width -= n), (i.height -= p);
    }
    return ha(i);
  }

  function c(f, e) {
    var g = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
      i = ea(10),
      j = "HTML" === e.nodeName,
      k = ia(f),
      d = ia(e),
      a = ca(f),
      l = aa(e),
      m = parseFloat(l.borderTopWidth),
      h = parseFloat(l.borderLeftWidth);
    g && j && ((d.top = S(d.top, 0)), (d.left = S(d.left, 0)));
    var c = ha({
      top: k.top - d.top - m,
      left: k.left - d.left - h,
      width: k.width,
      height: k.height,
    });
    if (((c.marginTop = 0), (c.marginLeft = 0), !i && j)) {
      var o = parseFloat(l.marginTop),
        p = parseFloat(l.marginLeft);
      (c.top -= m - o),
        (c.bottom -= m - o),
        (c.left -= h - p),
        (c.right -= h - p),
        (c.marginTop = o),
        (c.marginLeft = p);
    }
    return (
      (i && !g ? e.contains(a) : e === a && "BODY" !== a.nodeName) &&
        (c = n(c, e)),
      c
    );
  }

  function b(b) {
    var e = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
      f = b.ownerDocument.documentElement,
      g = c(b, f),
      h = S(f.clientWidth, window.innerWidth || 0),
      i = S(f.clientHeight, window.innerHeight || 0),
      j = e ? 0 : a(f),
      k = e ? 0 : a(f, "left"),
      l = {
        top: j - g.top + g.marginTop,
        left: k - g.left + g.marginLeft,
        width: h,
        height: i,
      };
    return ha(l);
  }

  function o(a) {
    var b = a.nodeName;
    if ("BODY" === b || "HTML" === b) return !1;
    if ("fixed" === aa(a, "position")) return !0;
    var c = ba(a);
    return !!c && o(c);
  }

  function i(a) {
    if (!a || !a.parentElement || ea()) return document.documentElement;
    for (var b = a.parentElement; b && "none" === aa(b, "transform"); )
      b = b.parentElement;
    return b || document.documentElement;
  }

  function g(a, e, j, k) {
    var n = 4 < arguments.length && void 0 !== arguments[4] && arguments[4],
      p = {
        top: 0,
        left: 0,
      },
      q = n ? i(a) : ga(a, da(e));
    if ("viewport" === k) p = b(q, n);
    else {
      var s;
      "scrollParent" === k
        ? ((s = ca(ba(e))),
          "BODY" === s.nodeName && (s = a.ownerDocument.documentElement))
        : "window" === k
        ? (s = a.ownerDocument.documentElement)
        : (s = k);
      var t = c(s, q, n);
      if ("HTML" === s.nodeName && !o(q)) {
        var m = l(a.ownerDocument),
          h = m.height,
          g = m.width;
        (p.top += t.top - t.marginTop),
          (p.bottom = h + t.top),
          (p.left += t.left - t.marginLeft),
          (p.right = g + t.left);
      } else p = t;
    }
    j = j || 0;
    var u = "number" == typeof j;
    return (
      (p.left += u ? j : j.left || 0),
      (p.top += u ? j : j.top || 0),
      (p.right -= u ? j : j.right || 0),
      (p.bottom -= u ? j : j.bottom || 0),
      p
    );
  }

  function h(a) {
    var b = a.width,
      c = a.height;
    return b * c;
  }

  function m(b, c, j, e, k) {
    var i = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : 0;
    if (-1 === b.indexOf("auto")) return b;
    var m = g(j, e, i, k),
      n = {
        top: {
          width: m.width,
          height: c.top - m.top,
        },
        right: {
          width: m.right - c.right,
          height: m.height,
        },
        bottom: {
          width: m.width,
          height: m.bottom - c.bottom,
        },
        left: {
          width: c.left - m.left,
          height: m.height,
        },
      },
      o = Object.keys(n)
        .map(function (a) {
          return ja(
            {
              key: a,
            },
            n[a],
            {
              area: h(n[a]),
            }
          );
        })
        .sort(function (a, b) {
          return b.area - a.area;
        }),
      d = o.filter(function (a) {
        var b = a.width,
          c = a.height;
        return b >= j.clientWidth && c >= j.clientHeight;
      }),
      a = 0 < d.length ? d[0].key : o[0].key,
      l = b.split("-")[1];
    return a + (l ? "-" + l : "");
  }

  function u(a, b, d) {
    var e =
        3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null,
      f = e ? i(b) : ga(b, da(d));
    return c(d, f, e);
  }

  function x(a) {
    var b = a.ownerDocument.defaultView,
      c = b.getComputedStyle(a),
      d = parseFloat(c.marginTop || 0) + parseFloat(c.marginBottom || 0),
      e = parseFloat(c.marginLeft || 0) + parseFloat(c.marginRight || 0),
      f = {
        width: a.offsetWidth + e,
        height: a.offsetHeight + d,
      };
    return f;
  }

  function L(a) {
    var b = {
      left: "right",
      right: "left",
      bottom: "top",
      top: "bottom",
    };
    return a.replace(/left|right|bottom|top/g, function (a) {
      return b[a];
    });
  }

  function O(b, c, e) {
    e = e.split("-")[0];
    var f = x(b),
      g = {
        width: f.width,
        height: f.height,
      },
      h = -1 !== ["right", "left"].indexOf(e),
      i = h ? "top" : "left",
      j = h ? "left" : "top",
      k = h ? "height" : "width",
      d = h ? "width" : "height";
    return (
      (g[i] = c[i] + c[k] / 2 - f[k] / 2),
      (g[j] = e === j ? c[j] - f[d] : c[L(j)]),
      g
    );
  }

  function v(a, b) {
    return Array.prototype.find ? a.find(b) : a.filter(b)[0];
  }

  function e(a, b, c) {
    if (Array.prototype.findIndex)
      return a.findIndex(function (a) {
        return a[b] === c;
      });
    var d = v(a, function (a) {
      return a[b] === c;
    });
    return a.indexOf(d);
  }

  function C(a, b, c) {
    var d = void 0 === c ? a : a.slice(0, e(a, "name", c));
    return (
      d.forEach(function (a) {
        a["function"] &&
          console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
        var c = a["function"] || a.fn;
        a.enabled &&
          J(c) &&
          ((b.offsets.popper = ha(b.offsets.popper)),
          (b.offsets.reference = ha(b.offsets.reference)),
          (b = c(b, a)));
      }),
      b
    );
  }

  function r() {
    if (!this.state.isDestroyed) {
      var a = {
        instance: this,
        styles: {},
        arrowStyles: {},
        attributes: {},
        flipped: !1,
        offsets: {},
      };
      (a.offsets.reference = u(
        this.state,
        this.popper,
        this.reference,
        this.options.positionFixed
      )),
        (a.placement = m(
          this.options.placement,
          a.offsets.reference,
          this.popper,
          this.reference,
          this.options.modifiers.flip.boundariesElement,
          this.options.modifiers.flip.padding
        )),
        (a.originalPlacement = a.placement),
        (a.positionFixed = this.options.positionFixed),
        (a.offsets.popper = O(this.popper, a.offsets.reference, a.placement)),
        (a.offsets.popper.position = this.options.positionFixed
          ? "fixed"
          : "absolute"),
        (a = C(this.modifiers, a)),
        this.state.isCreated
          ? this.options.onUpdate(a)
          : ((this.state.isCreated = !0), this.options.onCreate(a));
    }
  }

  function k(a, b) {
    return a.some(function (a) {
      var c = a.name,
        d = a.enabled;
      return d && c === b;
    });
  }

  function D(a) {
    for (
      var b = [!1, "ms", "Webkit", "Moz", "O"],
        c = a.charAt(0).toUpperCase() + a.slice(1),
        d = 0;
      d < b.length;
      d++
    ) {
      var e = b[d],
        f = e ? "" + e + c : a;
      if ("undefined" != typeof document.body.style[f]) return f;
    }
    return null;
  }

  function t() {
    return (
      (this.state.isDestroyed = !0),
      k(this.modifiers, "applyStyle") &&
        (this.popper.removeAttribute("x-placement"),
        (this.popper.style.position = ""),
        (this.popper.style.top = ""),
        (this.popper.style.left = ""),
        (this.popper.style.right = ""),
        (this.popper.style.bottom = ""),
        (this.popper.style.willChange = ""),
        (this.popper.style[D("transform")] = "")),
      this.disableEventListeners(),
      this.options.removeOnDestroy &&
        this.popper.parentNode.removeChild(this.popper),
      this
    );
  }

  function w(a) {
    var b = a.ownerDocument;
    return b ? b.defaultView : window;
  }

  function y(a, b, c, d) {
    var e = "BODY" === a.nodeName,
      f = e ? a.ownerDocument.defaultView : a;
    f.addEventListener(b, c, {
      passive: !0,
    }),
      e || y(ca(f.parentNode), b, c, d),
      d.push(f);
  }

  function A(a, b, c, d) {
    (c.updateBound = d),
      w(a).addEventListener("resize", c.updateBound, {
        passive: !0,
      });
    var e = ca(a);
    return (
      y(e, "scroll", c.updateBound, c.scrollParents),
      (c.scrollElement = e),
      (c.eventsEnabled = !0),
      c
    );
  }

  function B() {
    this.state.eventsEnabled ||
      (this.state = A(
        this.reference,
        this.options,
        this.state,
        this.scheduleUpdate
      ));
  }

  function E(a, b) {
    return (
      w(a).removeEventListener("resize", b.updateBound),
      b.scrollParents.forEach(function (a) {
        a.removeEventListener("scroll", b.updateBound);
      }),
      (b.updateBound = null),
      (b.scrollParents = []),
      (b.scrollElement = null),
      (b.eventsEnabled = !1),
      b
    );
  }

  function F() {
    this.state.eventsEnabled &&
      (cancelAnimationFrame(this.scheduleUpdate),
      (this.state = E(this.reference, this.state)));
  }

  function H(a) {
    return "" !== a && !isNaN(parseFloat(a)) && isFinite(a);
  }

  function I(a, b) {
    Object.keys(b).forEach(function (c) {
      var d = "";
      -1 !== ["width", "height", "top", "right", "bottom", "left"].indexOf(c) &&
        H(b[c]) &&
        (d = "px"),
        (a.style[c] = b[c] + d);
    });
  }

  function M(a, b) {
    Object.keys(b).forEach(function (c) {
      var d = b[c];
      !1 === d ? a.removeAttribute(c) : a.setAttribute(c, b[c]);
    });
  }

  function j(b, c) {
    var e = b.offsets,
      g = e.popper,
      h = e.reference,
      i = R,
      j = function (a) {
        return a;
      },
      k = i(h.width),
      n = i(g.width),
      d = -1 !== ["left", "right"].indexOf(b.placement),
      a = -1 !== b.placement.indexOf("-"),
      l = c ? (d || a || k % 2 == n % 2 ? i : Q) : j,
      f = c ? i : j;
    return {
      left: l(1 == k % 2 && 1 == n % 2 && !a && c ? g.left - 1 : g.left),
      top: f(g.top),
      bottom: f(g.bottom),
      right: l(g.right),
    };
  }

  function q(a, b, c) {
    var d = v(a, function (a) {
        var c = a.name;
        return c === b;
      }),
      e =
        !!d &&
        a.some(function (a) {
          return a.name === c && a.enabled && a.order < d.order;
        });
    if (!e) {
      var f = "`" + b + "`";
      console.warn(
        "`" +
          c +
          "` modifier is required by " +
          f +
          " modifier in order to work, be sure to include it before " +
          f +
          "!"
      );
    }
    return e;
  }

  function K(a) {
    return "end" === a ? "start" : "start" === a ? "end" : a;
  }

  function z(a) {
    var b = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
      c = ma.indexOf(a),
      d = ma.slice(c + 1).concat(ma.slice(0, c));
    return b ? d.reverse() : d;
  }

  function G(b, c, e, f) {
    var g = b.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
      h = +g[1],
      i = g[2];
    if (!h) return b;
    if (0 === i.indexOf("%")) {
      var j;
      switch (i) {
        case "%p":
          j = e;
          break;
        case "%":
        case "%r":
        default:
          j = f;
      }
      var k = ha(j);
      return (k[c] / 100) * h;
    }
    if ("vh" === i || "vw" === i) {
      var d;
      return (
        (d =
          "vh" === i
            ? S(document.documentElement.clientHeight, window.innerHeight || 0)
            : S(document.documentElement.clientWidth, window.innerWidth || 0)),
        (d / 100) * h
      );
    }
    return h;
  }

  function N(b, c, f, e) {
    var g = [0, 0],
      h = -1 !== ["right", "left"].indexOf(e),
      i = b.split(/(\+|\-)/).map(function (a) {
        return a.trim();
      }),
      j = i.indexOf(
        v(i, function (a) {
          return -1 !== a.search(/,|\s/);
        })
      );
    i[j] &&
      -1 === i[j].indexOf(",") &&
      console.warn(
        "Offsets separated by white space(s) are deprecated, use a comma (,) instead."
      );
    var k = /\s*,\s*|\s+/,
      d =
        -1 === j
          ? [i]
          : [
              i.slice(0, j).concat([i[j].split(k)[0]]),
              [i[j].split(k)[1]].concat(i.slice(j + 1)),
            ];
    return (
      (d = d.map(function (a, b) {
        var d = (1 === b ? !h : h) ? "height" : "width",
          g = !1;
        return a
          .reduce(function (a, b) {
            return "" === a[a.length - 1] && -1 !== ["+", "-"].indexOf(b)
              ? ((a[a.length - 1] = b), (g = !0), a)
              : g
              ? ((a[a.length - 1] += b), (g = !1), a)
              : a.concat(b);
          }, [])
          .map(function (a) {
            return G(a, d, c, f);
          });
      })),
      d.forEach(function (a, b) {
        a.forEach(function (c, d) {
          H(c) && (g[b] += c * ("-" === a[d - 1] ? -1 : 1));
        });
      }),
      g
    );
  }
  var P = Math.min,
    Q = Math.floor,
    R = Math.round,
    S = Math.max,
    T =
      "undefined" != typeof window &&
      "undefined" != typeof document &&
      "undefined" != typeof navigator,
    U = (function () {
      for (var a = ["Edge", "Trident", "Firefox"], b = 0; b < a.length; b += 1)
        if (T && 0 <= navigator.userAgent.indexOf(a[b])) return 1;
      return 0;
    })(),
    V = T && window.Promise,
    W = V
      ? function (a) {
          var b = !1;
          return function () {
            b ||
              ((b = !0),
              window.Promise.resolve().then(function () {
                (b = !1), a();
              }));
          };
        }
      : function (a) {
          var b = !1;
          return function () {
            b ||
              ((b = !0),
              setTimeout(function () {
                (b = !1), a();
              }, U));
          };
        },
    X = T && !!(window.MSInputMethodContext && document.documentMode),
    Y = T && /MSIE 10/.test(navigator.userAgent),
    Z = function (a, b) {
      if (!(a instanceof b))
        throw new TypeError("Cannot call a class as a function");
    },
    $ = (function () {
      function a(a, b) {
        for (var c, d = 0; d < b.length; d++)
          (c = b[d]),
            (c.enumerable = c.enumerable || !1),
            (c.configurable = !0),
            "value" in c && (c.writable = !0),
            Object.defineProperty(a, c.key, c);
      }
      return function (b, c, d) {
        return c && a(b.prototype, c), d && a(b, d), b;
      };
    })(),
    _ = function (a, b, c) {
      return (
        b in a
          ? Object.defineProperty(a, b, {
              value: c,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (a[b] = c),
        a
      );
    },
    ja =
      Object.assign ||
      function (a) {
        for (var b, c = 1; c < arguments.length; c++)
          for (var d in ((b = arguments[c]), b))
            Object.prototype.hasOwnProperty.call(b, d) && (a[d] = b[d]);
        return a;
      },
    ka = T && /Firefox/i.test(navigator.userAgent),
    la = [
      "auto-start",
      "auto",
      "auto-end",
      "top-start",
      "top",
      "top-end",
      "right-start",
      "right",
      "right-end",
      "bottom-end",
      "bottom",
      "bottom-start",
      "left-end",
      "left",
      "left-start",
    ],
    ma = la.slice(3),
    na = {
      FLIP: "flip",
      CLOCKWISE: "clockwise",
      COUNTERCLOCKWISE: "counterclockwise",
    },
    oa = (function () {
      function a(b, c) {
        var d = this,
          f =
            2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
        Z(this, a),
          (this.scheduleUpdate = function () {
            return requestAnimationFrame(d.update);
          }),
          (this.update = W(this.update.bind(this))),
          (this.options = ja({}, a.Defaults, f)),
          (this.state = {
            isDestroyed: !1,
            isCreated: !1,
            scrollParents: [],
          }),
          (this.reference = b && b.jquery ? b[0] : b),
          (this.popper = c && c.jquery ? c[0] : c),
          (this.options.modifiers = {}),
          Object.keys(ja({}, a.Defaults.modifiers, f.modifiers)).forEach(
            function (b) {
              d.options.modifiers[b] = ja(
                {},
                a.Defaults.modifiers[b] || {},
                f.modifiers ? f.modifiers[b] : {}
              );
            }
          ),
          (this.modifiers = Object.keys(this.options.modifiers)
            .map(function (a) {
              return ja(
                {
                  name: a,
                },
                d.options.modifiers[a]
              );
            })
            .sort(function (a, b) {
              return a.order - b.order;
            })),
          this.modifiers.forEach(function (a) {
            a.enabled &&
              J(a.onLoad) &&
              a.onLoad(d.reference, d.popper, d.options, a, d.state);
          }),
          this.update();
        var e = this.options.eventsEnabled;
        e && this.enableEventListeners(), (this.state.eventsEnabled = e);
      }
      return (
        $(a, [
          {
            key: "update",
            value: function value() {
              return r.call(this);
            },
          },
          {
            key: "destroy",
            value: function value() {
              return t.call(this);
            },
          },
          {
            key: "enableEventListeners",
            value: function value() {
              return B.call(this);
            },
          },
          {
            key: "disableEventListeners",
            value: function value() {
              return F.call(this);
            },
          },
        ]),
        a
      );
    })();
  return (
    (oa.Utils = ("undefined" == typeof window ? global : window).PopperUtils),
    (oa.placements = la),
    (oa.Defaults = {
      placement: "bottom",
      positionFixed: !1,
      eventsEnabled: !0,
      removeOnDestroy: !1,
      onCreate: function onCreate() {},
      onUpdate: function onUpdate() {},
      modifiers: {
        shift: {
          order: 100,
          enabled: !0,
          fn: function fn(b) {
            var c = b.placement,
              e = c.split("-")[0],
              f = c.split("-")[1];
            if (f) {
              var g = b.offsets,
                h = g.reference,
                i = g.popper,
                j = -1 !== ["bottom", "top"].indexOf(e),
                k = j ? "left" : "top",
                d = j ? "width" : "height",
                a = {
                  start: _({}, k, h[k]),
                  end: _({}, k, h[k] + h[d] - i[d]),
                };
              b.offsets.popper = ja({}, i, a[f]);
            }
            return b;
          },
        },
        offset: {
          order: 200,
          enabled: !0,
          fn: function (a, b) {
            var c,
              e = b.offset,
              f = a.placement,
              g = a.offsets,
              h = g.popper,
              i = g.reference,
              j = f.split("-")[0];
            return (
              (c = H(+e) ? [+e, 0] : N(e, h, i, j)),
              "left" === j
                ? ((h.top += c[0]), (h.left -= c[1]))
                : "right" === j
                ? ((h.top += c[0]), (h.left += c[1]))
                : "top" === j
                ? ((h.left += c[0]), (h.top -= c[1]))
                : "bottom" === j && ((h.left += c[0]), (h.top += c[1])),
              (a.popper = h),
              a
            );
          },
          offset: 0,
        },
        preventOverflow: {
          order: 300,
          enabled: !0,
          fn: function fn(b, c) {
            var e = c.boundariesElement || fa(b.instance.popper);
            b.instance.reference === e && (e = fa(e));
            var h = D("transform"),
              j = b.instance.popper.style,
              i = j.top,
              k = j.left,
              n = j[h];
            (j.top = ""), (j.left = ""), (j[h] = "");
            var d = g(
              b.instance.popper,
              b.instance.reference,
              c.padding,
              e,
              b.positionFixed
            );
            (j.top = i), (j.left = k), (j[h] = n), (c.boundaries = d);
            var a = c.priority,
              l = b.offsets.popper,
              p = {
                primary: function primary(a) {
                  var b = l[a];
                  return (
                    l[a] < d[a] &&
                      !c.escapeWithReference &&
                      (b = S(l[a], d[a])),
                    _({}, a, b)
                  );
                },
                secondary: function secondary(a) {
                  var b = "right" === a ? "left" : "top",
                    e = l[b];
                  return (
                    l[a] > d[a] &&
                      !c.escapeWithReference &&
                      (e = P(
                        l[b],
                        d[a] - ("right" === a ? l.width : l.height)
                      )),
                    _({}, b, e)
                  );
                },
              };
            return (
              a.forEach(function (a) {
                var b =
                  -1 === ["left", "top"].indexOf(a) ? "secondary" : "primary";
                l = ja({}, l, p[b](a));
              }),
              (b.offsets.popper = l),
              b
            );
          },
          priority: ["left", "right", "top", "bottom"],
          padding: 5,
          boundariesElement: "scrollParent",
        },
        keepTogether: {
          order: 400,
          enabled: !0,
          fn: function fn(b) {
            var c = b.offsets,
              e = c.popper,
              f = c.reference,
              g = b.placement.split("-")[0],
              h = Q,
              i = -1 !== ["top", "bottom"].indexOf(g),
              j = i ? "right" : "bottom",
              k = i ? "left" : "top",
              d = i ? "width" : "height";
            return (
              e[j] < h(f[k]) && (b.offsets.popper[k] = h(f[k]) - e[d]),
              e[k] > h(f[j]) && (b.offsets.popper[k] = h(f[j])),
              b
            );
          },
        },
        arrow: {
          order: 500,
          enabled: !0,
          fn: function fn(g, e) {
            var j;
            if (!q(g.instance.modifiers, "arrow", "keepTogether")) return g;
            var k = e.element;
            if ("string" == typeof k) {
              if (((k = g.instance.popper.querySelector(k)), !k)) return g;
            } else if (!g.instance.popper.contains(k))
              return (
                console.warn(
                  "WARNING: `arrow.element` must be child of its popper element!"
                ),
                g
              );
            var o = g.placement.split("-")[0],
              r = g.offsets,
              p = r.popper,
              s = r.reference,
              d = -1 !== ["left", "right"].indexOf(o),
              a = d ? "height" : "width",
              l = d ? "Top" : "Left",
              f = l.toLowerCase(),
              m = d ? "left" : "top",
              h = d ? "bottom" : "right",
              c = x(k)[a];
            s[h] - c < p[f] && (g.offsets.popper[f] -= p[f] - (s[h] - c)),
              s[f] + c > p[h] && (g.offsets.popper[f] += s[f] + c - p[h]),
              (g.offsets.popper = ha(g.offsets.popper));
            var t = s[f] + s[a] / 2 - c / 2,
              b = aa(g.instance.popper),
              u = parseFloat(b["margin" + l]),
              w = parseFloat(b["border" + l + "Width"]),
              y = t - g.offsets.popper[f] - u - w;
            return (
              (y = S(P(p[a] - c, y), 0)),
              (g.arrowElement = k),
              (g.offsets.arrow = ((j = {}), _(j, f, R(y)), _(j, m, ""), j)),
              g
            );
          },
          element: "[x-arrow]",
        },
        flip: {
          order: 600,
          enabled: !0,
          fn: function fn(j, q) {
            if (k(j.instance.modifiers, "inner")) return j;
            if (j.flipped && j.placement === j.originalPlacement) return j;
            var t = g(
                j.instance.popper,
                j.instance.reference,
                q.padding,
                q.boundariesElement,
                j.positionFixed
              ),
              o = j.placement.split("-")[0],
              x = L(o),
              A = j.placement.split("-")[1] || "",
              B = [];
            switch (q.behavior) {
              case na.FLIP:
                B = [o, x];
                break;
              case na.CLOCKWISE:
                B = z(o);
                break;
              case na.COUNTERCLOCKWISE:
                B = z(o, !0);
                break;
              default:
                B = q.behavior;
            }
            return (
              B.forEach(function (e, i) {
                if (o !== e || B.length === i + 1) return j;
                (o = j.placement.split("-")[0]), (x = L(o));
                var d = j.offsets.popper,
                  a = j.offsets.reference,
                  k = Q,
                  f =
                    ("left" === o && k(d.right) > k(a.left)) ||
                    ("right" === o && k(d.left) < k(a.right)) ||
                    ("top" === o && k(d.bottom) > k(a.top)) ||
                    ("bottom" === o && k(d.top) < k(a.bottom)),
                  l = k(d.left) < k(t.left),
                  h = k(d.right) > k(t.right),
                  c = k(d.top) < k(t.top),
                  g = k(d.bottom) > k(t.bottom),
                  m =
                    ("left" === o && l) ||
                    ("right" === o && h) ||
                    ("top" === o && c) ||
                    ("bottom" === o && g),
                  b = -1 !== ["top", "bottom"].indexOf(o),
                  n =
                    !!q.flipVariations &&
                    ((b && "start" === A && l) ||
                      (b && "end" === A && h) ||
                      (!b && "start" === A && c) ||
                      (!b && "end" === A && g)),
                  p =
                    !!q.flipVariationsByContent &&
                    ((b && "start" === A && h) ||
                      (b && "end" === A && l) ||
                      (!b && "start" === A && g) ||
                      (!b && "end" === A && c)),
                  r = n || p;
                (f || m || r) &&
                  ((j.flipped = !0),
                  (f || m) && (o = B[i + 1]),
                  r && (A = K(A)),
                  (j.placement = o + (A ? "-" + A : "")),
                  (j.offsets.popper = ja(
                    {},
                    j.offsets.popper,
                    O(j.instance.popper, j.offsets.reference, j.placement)
                  )),
                  (j = C(j.instance.modifiers, j, "flip")));
              }),
              j
            );
          },
          behavior: "flip",
          padding: 5,
          boundariesElement: "viewport",
          flipVariations: !1,
          flipVariationsByContent: !1,
        },
        inner: {
          order: 700,
          enabled: !1,
          fn: function fn(a) {
            var b = a.placement,
              c = b.split("-")[0],
              d = a.offsets,
              e = d.popper,
              f = d.reference,
              g = -1 !== ["left", "right"].indexOf(c),
              h = -1 === ["top", "left"].indexOf(c);
            return (
              (e[g ? "left" : "top"] =
                f[c] - (h ? e[g ? "width" : "height"] : 0)),
              (a.placement = L(b)),
              (a.offsets.popper = ha(e)),
              a
            );
          },
        },
        hide: {
          order: 800,
          enabled: !0,
          fn: function fn(a) {
            if (!q(a.instance.modifiers, "hide", "preventOverflow")) return a;
            var b = a.offsets.reference,
              c = v(a.instance.modifiers, function (a) {
                return "preventOverflow" === a.name;
              }).boundaries;
            if (
              b.bottom < c.top ||
              b.left > c.right ||
              b.top > c.bottom ||
              b.right < c.left
            ) {
              if (!0 === a.hide) return a;
              (a.hide = !0), (a.attributes["x-out-of-boundaries"] = "");
            } else {
              if (!1 === a.hide) return a;
              (a.hide = !1), (a.attributes["x-out-of-boundaries"] = !1);
            }
            return a;
          },
        },
        computeStyle: {
          order: 850,
          enabled: !0,
          fn: function fn(k, e) {
            var p = e.x,
              o = e.y,
              n = k.offsets.popper,
              i = v(k.instance.modifiers, function (a) {
                return "applyStyle" === a.name;
              }).gpuAcceleration;
            void 0 !== i &&
              console.warn(
                "WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!"
              );
            var q,
              r,
              t = void 0 === i ? e.gpuAcceleration : i,
              a = fa(k.instance.popper),
              l = ia(a),
              f = {
                position: n.position,
              },
              m = j(k, 2 > window.devicePixelRatio || !ka),
              h = "bottom" === p ? "top" : "bottom",
              c = "right" === o ? "left" : "right",
              g = D("transform");
            if (
              ((r =
                "bottom" == h
                  ? "HTML" === a.nodeName
                    ? -a.clientHeight + m.bottom
                    : -l.height + m.bottom
                  : m.top),
              (q =
                "right" == c
                  ? "HTML" === a.nodeName
                    ? -a.clientWidth + m.right
                    : -l.width + m.right
                  : m.left),
              t && g)
            )
              (f[g] = "translate3d(" + q + "px, " + r + "px, 0)"),
                (f[h] = 0),
                (f[c] = 0),
                (f.willChange = "transform");
            else {
              var b = "bottom" == h ? -1 : 1,
                u = "right" == c ? -1 : 1;
              (f[h] = r * b), (f[c] = q * u), (f.willChange = h + ", " + c);
            }
            var w = {
              "x-placement": k.placement,
            };
            return (
              (k.attributes = ja({}, w, k.attributes)),
              (k.styles = ja({}, f, k.styles)),
              (k.arrowStyles = ja({}, k.offsets.arrow, k.arrowStyles)),
              k
            );
          },
          gpuAcceleration: !0,
          x: "bottom",
          y: "right",
        },
        applyStyle: {
          order: 900,
          enabled: !0,
          fn: function fn(a) {
            return (
              I(a.instance.popper, a.styles),
              M(a.instance.popper, a.attributes),
              a.arrowElement &&
                Object.keys(a.arrowStyles).length &&
                I(a.arrowElement, a.arrowStyles),
              a
            );
          },
          onLoad: function onLoad(a, b, c, d, e) {
            var f = u(e, b, a, c.positionFixed),
              g = m(
                c.placement,
                f,
                b,
                a,
                c.modifiers.flip.boundariesElement,
                c.modifiers.flip.padding
              );
            return (
              b.setAttribute("x-placement", g),
              I(b, {
                position: c.positionFixed ? "fixed" : "absolute",
              }),
              c
            );
          },
          gpuAcceleration: void 0,
        },
      },
    }),
    oa
  );
});
var tippy = (function (aa) {
  "use strict";

  function ba() {
    return (ba =
      Object.assign ||
      function (a) {
        for (var b, c = 1; c < arguments.length; c++)
          for (var d in ((b = arguments[c]), b))
            Object.prototype.hasOwnProperty.call(b, d) && (a[d] = b[d]);
        return a;
      }).apply(this, arguments);
  }

  function ca(a, b) {
    a.innerHTML = b;
  }

  function da(a) {
    return a && a._tippy && a._tippy.reference === a;
  }

  function i(a, b) {
    return {}.hasOwnProperty.call(a, b);
  }

  function ea(a) {
    return s(a)
      ? [a]
      : (function (a) {
          return o(a, "NodeList");
        })(a)
      ? b(a)
      : Array.isArray(a)
      ? a
      : b(document.querySelectorAll(a));
  }

  function a(a, b, c) {
    if (Array.isArray(a)) {
      var d = a[b];
      return null == d ? (Array.isArray(c) ? c[b] : c) : d;
    }
    return a;
  }

  function fa(a, b) {
    return a && a.modifiers && a.modifiers[b];
  }

  function o(a, b) {
    var c = {}.toString.call(a);
    return 0 === c.indexOf("[object") && -1 < c.indexOf(b + "]");
  }

  function s(a) {
    return o(a, "Element");
  }

  function c(a) {
    return o(a, "MouseEvent");
  }

  function l(a, b) {
    return "function" == typeof a ? a.apply(void 0, b) : a;
  }

  function f(a, b, c, d) {
    a.filter(function (a) {
      return a.name === b;
    })[0][c] = d;
  }

  function d() {
    return document.createElement("div");
  }

  function p(a, b) {
    a.forEach(function (a) {
      a && (a.style.transitionDuration = b + "ms");
    });
  }

  function m(a, b) {
    a.forEach(function (a) {
      a && a.setAttribute("data-state", b);
    });
  }

  function g(a, b) {
    return 0 === b
      ? a
      : function (d) {
          clearTimeout(c),
            (c = setTimeout(function () {
              a(d);
            }, b));
        };
    var c;
  }

  function h(a, b, c) {
    a && a !== b && a.apply(void 0, c);
  }

  function b(a) {
    return [].slice.call(a);
  }

  function ga(a, b) {
    for (; a; ) {
      if (b(a)) return a;
      a = a.parentElement;
    }
    return null;
  }

  function w(a, b) {
    return -1 < a.indexOf(b);
  }

  function r(a) {
    return a.split(/\s+/).filter(Boolean);
  }

  function v(a, b) {
    return void 0 === a ? b : a;
  }

  function y(a) {
    return [].concat(a);
  }

  function x(a) {
    var b = y(a)[0];
    return (b && b.ownerDocument) || document;
  }

  function u(a, b) {
    -1 === a.indexOf(b) && a.push(b);
  }

  function A(a) {
    return "number" == typeof a ? a : parseFloat(a);
  }

  function C(a, b, c) {
    void 0 === b && (b = 5);
    var d = {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    };
    return Object.keys(d).reduce(function (d, e) {
      return (
        (d[e] = "number" == typeof b ? b : b[e]),
        a === e && (d[e] = "number" == typeof b ? b + c : b[a] + c),
        d
      );
    }, d);
  }

  function D() {
    ia.isTouch ||
      ((ia.isTouch = !0),
      window.performance && document.addEventListener("mousemove", E));
  }

  function E() {
    var a = performance.now();
    20 > a - n &&
      ((ia.isTouch = !1), document.removeEventListener("mousemove", E)),
      (n = a);
  }

  function I() {
    var a = document.activeElement;
    if (da(a)) {
      var b = a._tippy;
      a.blur && !b.state.isVisible && a.blur();
    }
  }

  function M(a) {
    var b = a && H && ia.isTouch;
    document.body.classList[b ? "add" : "remove"]("tippy-iOS");
  }

  function N(a) {
    var b = (a.plugins || []).reduce(function (b, c) {
      var d = c.name,
        e = c.defaultValue;
      return d && (b[d] = void 0 === a[d] ? e : a[d]), b;
    }, {});
    return ba({}, a, {}, b);
  }

  function F(a, b) {
    var c = ba(
      {},
      b,
      {
        content: l(b.content, [a]),
      },
      b.ignoreAttributes
        ? {}
        : (function (a, b) {
            return (
              b
                ? Object.keys(
                    N(
                      ba({}, ja, {
                        plugins: b,
                      })
                    )
                  )
                : z
            ).reduce(function (b, c) {
              var d = (a.getAttribute("data-tippy-" + c) || "").trim();
              if (!d) return b;
              if ("content" === c) b[c] = d;
              else
                try {
                  b[c] = JSON.parse(d);
                } catch (a) {
                  b[c] = d;
                }
              return b;
            }, {});
          })(a, b.plugins)
    );
    return c.interactive && (c.aria = null), c;
  }

  function j(a) {
    return a.split("-")[0];
  }

  function O(a) {
    a.setAttribute("data-inertia", "");
  }

  function P(a) {
    a.setAttribute("data-interactive", "");
  }

  function S(a, b) {
    s(b.content)
      ? (ca(a, ""), a.appendChild(b.content))
      : "function" != typeof b.content &&
        (a[b.allowHTML ? "innerHTML" : "textContent"] = b.content);
  }

  function T(a) {
    return {
      tooltip: a.querySelector(".tippy-tooltip"),
      content: a.querySelector(".tippy-content"),
      arrow:
        a.querySelector(".tippy-arrow") || a.querySelector(".tippy-svg-arrow"),
    };
  }

  function J(a) {
    var b = d();
    return (
      !0 === a
        ? (b.className = "tippy-arrow")
        : ((b.className = "tippy-svg-arrow"),
          s(a) ? b.appendChild(a) : ca(b, a)),
      b
    );
  }

  function _(a, b) {
    var c = d();
    (c.className = "tippy-popper"),
      (c.style.position = "absolute"),
      (c.style.top = "0"),
      (c.style.left = "0");
    var e = d();
    (e.className = "tippy-tooltip"),
      (e.id = "tippy-" + a),
      e.setAttribute("data-state", "hidden"),
      e.setAttribute("tabindex", "-1"),
      Q(e, "add", b.theme);
    var f = d();
    return (
      (f.className = "tippy-content"),
      f.setAttribute("data-state", "hidden"),
      b.interactive && P(e),
      b.arrow && (e.setAttribute("data-arrow", ""), e.appendChild(J(b.arrow))),
      b.inertia && O(e),
      S(f, b),
      e.appendChild(f),
      c.appendChild(e),
      G(c, b, b),
      c
    );
  }

  function G(b, c, d) {
    var e,
      f = T(b),
      g = f.tooltip,
      h = f.content,
      a = f.arrow;
    (b.style.zIndex = "" + d.zIndex),
      g.setAttribute("data-animation", d.animation),
      (g.style.maxWidth = "number" == typeof (e = d.maxWidth) ? e + "px" : e),
      d.role ? g.setAttribute("role", d.role) : g.removeAttribute("role"),
      c.content !== d.content && S(h, d),
      !c.arrow && d.arrow
        ? (g.appendChild(J(d.arrow)), g.setAttribute("data-arrow", ""))
        : c.arrow && !d.arrow
        ? (g.removeChild(a), g.removeAttribute("data-arrow"))
        : c.arrow !== d.arrow && (g.removeChild(a), g.appendChild(J(d.arrow))),
      !c.interactive && d.interactive
        ? P(g)
        : c.interactive &&
          !d.interactive &&
          (function (a) {
            a.removeAttribute("data-interactive");
          })(g),
      !c.inertia && d.inertia
        ? O(g)
        : c.inertia &&
          !d.inertia &&
          (function (a) {
            a.removeAttribute("data-inertia");
          })(g),
      c.theme !== d.theme && (Q(g, "remove", c.theme), Q(g, "add", d.theme));
  }

  function K(a, b, c) {
    ["transitionend", "webkitTransitionEnd"].forEach(function (d) {
      a[b + "EventListener"](d, c);
    });
  }

  function Q(a, b, c) {
    r(c).forEach(function (c) {
      a.classList[b](c + "-theme");
    });
  }

  function W(d, e) {
    function o() {
      var a = Ra.props.touch;
      return Array.isArray(a) ? a : [a, 0];
    }

    function z() {
      return "hold" === o()[0];
    }

    function D() {
      return Ba || d;
    }

    function n(b) {
      return (Ra.state.isMounted && !Ra.state.isVisible) ||
        ia.isTouch ||
        (ya && "focus" === ya.type)
        ? 0
        : a(Ra.props.delay, b ? 0 : 1, ja.delay);
    }

    function E(a, b, c) {
      var d;
      (void 0 === c && (c = !0),
      Sa.forEach(function (c) {
        i(c, a) && c[a].apply(c, b);
      }),
      c) && (d = Ra.props)[a].apply(d, b);
    }

    function H() {
      var a = Ra.props.aria;
      if (a) {
        var b = "aria-" + a,
          c = Oa.id;
        y(Ra.props.triggerTarget || d).forEach(function (a) {
          var d = a.getAttribute(b);
          if (Ra.state.isVisible) a.setAttribute(b, d ? d + " " + c : c);
          else {
            var e = d && d.replace(c, "").trim();
            e ? a.setAttribute(b, e) : a.removeAttribute(b);
          }
        });
      }
    }

    function I() {
      Ta ||
        y(Ra.props.triggerTarget || d).forEach(function (a) {
          Ra.props.interactive
            ? a.setAttribute(
                "aria-expanded",
                Ra.state.isVisible && a === D() ? "true" : "false"
              )
            : a.removeAttribute("aria-expanded");
        });
    }

    function J() {
      Ja.body.removeEventListener("mouseleave", ta),
        Ja.removeEventListener("mousemove", Ia),
        (ka = ka.filter(function (a) {
          return a !== Ia;
        }));
    }

    function t(a) {
      if (!Ra.props.interactive || !La.contains(a.target)) {
        if (D().contains(a.target)) {
          if (ia.isTouch) return;
          if (Ra.state.isVisible && w(Ra.props.trigger, "click")) return;
        }
        !0 === Ra.props.hideOnClick &&
          ((Ea = !1),
          Ra.clearDelayTimeouts(),
          Ra.hide(),
          (Fa = !0),
          setTimeout(function () {
            Fa = !1;
          }),
          Ra.state.isMounted || O());
      }
    }

    function L() {
      Ja.addEventListener("mousedown", t, !0);
    }

    function O() {
      Ja.removeEventListener("mousedown", t, !0);
    }

    function Q(a, b) {
      function c(a) {
        a.target === Oa && (K(Oa, "remove", c), b());
      }
      return 0 === a
        ? b()
        : void (K(Oa, "remove", Aa), K(Oa, "add", c), (Aa = c));
    }

    function ca(a, b, c) {
      void 0 === c && (c = !1),
        y(Ra.props.triggerTarget || d).forEach(function (d) {
          d.addEventListener(a, b, c),
            Ha.push({
              node: d,
              eventType: a,
              handler: b,
              options: c,
            });
        });
    }

    function da() {
      z() && (ca("touchstart", la, ha), ca("touchend", na, ha)),
        r(Ra.props.trigger).forEach(function (a) {
          if ("manual" !== a)
            switch ((ca(a, la), a)) {
              case "mouseenter":
                ca("mouseleave", na);
                break;
              case "focus":
                ca(B ? "focusout" : "blur", oa);
                break;
              case "focusin":
                ca("focusout", oa);
            }
        });
    }

    function ea() {
      Ha.forEach(function (a) {
        var b = a.node,
          c = a.eventType,
          d = a.handler,
          e = a.options;
        b.removeEventListener(c, d, e);
      }),
        (Ha = []);
    }

    function la(a) {
      var b = !1;
      if (Ra.state.isEnabled && !pa(a) && !Fa) {
        if (
          ((ya = a),
          (Ba = a.currentTarget),
          I(),
          !Ra.state.isVisible &&
            c(a) &&
            ka.forEach(function (b) {
              return b(a);
            }),
          "click" !== a.type ||
            (w(Ra.props.trigger, "mouseenter") && !Ea) ||
            !1 === Ra.props.hideOnClick ||
            !Ra.state.isVisible)
        ) {
          var d = o(),
            f = d[0],
            g = d[1];
          ia.isTouch && "hold" === f && g
            ? (ua = setTimeout(function () {
                sa(a);
              }, g))
            : sa(a);
        } else b = !0;
        "click" === a.type && (Ea = !b), b && ta(a);
      }
    }

    function ma(a) {
      var c = ga(a.target, function (a) {
        return a === d || a === La;
      });
      ("mousemove" === a.type && c) ||
        ((function (a, b) {
          var c = b.clientX,
            d = b.clientY;
          return a.every(function (b) {
            var f = b.popperRect,
              e = b.tooltipRect,
              g = b.interactiveBorder,
              h = $(f.top, e.top),
              a = Z(f.right, e.right),
              i = Z(f.bottom, e.bottom),
              j = $(f.left, e.left);
            return h - d > g || d - i > g || j - c > g || c - a > g;
          });
        })(
          b(La.querySelectorAll(".tippy-popper"))
            .concat(La)
            .map(function (a) {
              var b = a._tippy,
                c = b.popperChildren.tooltip,
                d = b.props.interactiveBorder;
              return {
                popperRect: a.getBoundingClientRect(),
                tooltipRect: c.getBoundingClientRect(),
                interactiveBorder: d,
              };
            }),
          a
        ) &&
          (J(), ta(a)));
    }

    function na(a) {
      if (!(pa(a) || (w(Ra.props.trigger, "click") && Ea)))
        return Ra.props.interactive
          ? (Ja.body.addEventListener("mouseleave", ta),
            Ja.addEventListener("mousemove", Ia),
            u(ka, Ia),
            void Ia(a))
          : void ta(a);
    }

    function oa(a) {
      (w(Ra.props.trigger, "focusin") || a.target === D()) &&
        ((Ra.props.interactive &&
          a.relatedTarget &&
          La.contains(a.relatedTarget)) ||
          ta(a));
    }

    function pa(a) {
      var b = "ontouchstart" in window,
        c = w(a.type, "touch"),
        d = z();
      return (b && ia.isTouch && d && !c) || (ia.isTouch && !d && c);
    }

    function qa() {
      function b(a) {
        var b = Ra.state.currentPlacement;
        (Ra.state.currentPlacement = a.placement),
          Ra.props.flip &&
            !Ra.props.flipOnUpdate &&
            (a.flipped && (Ra.popperInstance.options.placement = a.placement),
            f(Ra.popperInstance.modifiers, "flip", "enabled", !1)),
          Oa.setAttribute("data-placement", a.placement),
          !1 === a.attributes["x-out-of-boundaries"]
            ? Oa.removeAttribute("data-out-of-boundaries")
            : Oa.setAttribute("data-out-of-boundaries", "");
        var c = j(a.placement),
          d = w(["top", "bottom"], c),
          e = w(["bottom", "right"], c);
        (Oa.style.top = "0"),
          (Oa.style.left = "0"),
          (Oa.style[d ? "top" : "left"] = (e ? 1 : -1) * g + "px"),
          b && b !== a.placement && Ra.popperInstance.update();
      }
      var g,
        e = Ra.props.popperOptions,
        i = Ra.popperChildren.arrow,
        k = fa(e, "flip"),
        a = fa(e, "preventOverflow"),
        l = ba(
          {
            eventsEnabled: !1,
            placement: Ra.props.placement,
          },
          e,
          {
            modifiers: ba({}, e && e.modifiers, {
              tippyDistance: {
                enabled: !0,
                order: 0,
                fn: function fn(b) {
                  g = (function (a, b) {
                    var c = "string" == typeof b && w(b, "rem"),
                      d = a.documentElement;
                    return d && c
                      ? parseFloat(getComputedStyle(d).fontSize || "16") * A(b)
                      : A(b);
                  })(Ja, Ra.props.distance);
                  var c = j(b.placement),
                    d = C(c, a && a.padding, g),
                    e = C(c, k && k.padding, g),
                    h = Ra.popperInstance.modifiers;
                  return (
                    f(h, "preventOverflow", "padding", d),
                    f(h, "flip", "padding", e),
                    b
                  );
                },
              },
              preventOverflow: ba(
                {
                  boundariesElement: Ra.props.boundary,
                },
                a
              ),
              flip: ba(
                {
                  enabled: Ra.props.flip,
                  behavior: Ra.props.flipBehavior,
                },
                k
              ),
              arrow: ba(
                {
                  element: i,
                  enabled: !!i,
                },
                fa(e, "arrow")
              ),
              offset: ba(
                {
                  offset: Ra.props.offset,
                },
                fa(e, "offset")
              ),
            }),
            onCreate: function onCreate(a) {
              b(a), h(e && e.onCreate, l.onCreate, [a]), ra();
            },
            onUpdate: function onUpdate(a) {
              b(a), h(e && e.onUpdate, l.onUpdate, [a]), ra();
            },
          }
        );
      Ra.popperInstance = new aa(d, La, l);
    }

    function ra() {
      0 === Ga
        ? (Ga++, Ra.popperInstance.update())
        : za && 1 == Ga && (Ga++, La.offsetHeight, za());
    }

    function sa(a) {
      Ra.clearDelayTimeouts(),
        Ra.popperInstance || qa(),
        a && E("onTrigger", [Ra, a]),
        L();
      var b = n(!0);
      b
        ? (ua = setTimeout(function () {
            Ra.show();
          }, b))
        : Ra.show();
    }

    function ta(a) {
      if (
        !(Ra.clearDelayTimeouts(),
        E("onUntrigger", [Ra, a]),
        Ra.state.isVisible)
      )
        O();
      else if (
        !(
          w(Ra.props.trigger, "mouseenter") &&
          w(Ra.props.trigger, "click") &&
          w(["mouseleave", "mousemove"], a.type) &&
          Ea
        )
      ) {
        var b = n(!1);
        b
          ? (va = setTimeout(function () {
              Ra.state.isVisible && Ra.hide();
            }, b))
          : (wa = requestAnimationFrame(function () {
              Ra.hide();
            }));
      }
    }
    var ua,
      va,
      wa,
      xa = F(d, ba({}, ja, {}, N(e)));
    if (!xa.multiple && d._tippy) return null;
    var ya,
      za,
      Aa,
      Ba,
      Ca,
      Da = !1,
      Ea = !1,
      Fa = !1,
      Ga = 0,
      Ha = [],
      Ia = g(ma, xa.interactiveDebounce),
      Ja = x(xa.triggerTarget || d),
      Ka = q++,
      La = _(Ka, xa),
      Ma = T(La),
      Na = (Ca = xa.plugins).filter(function (a, b) {
        return Ca.indexOf(a) === b;
      }),
      Oa = Ma.tooltip,
      Pa = Ma.content,
      Qa = [Oa, Pa],
      Ra = {
        id: Ka,
        reference: d,
        popper: La,
        popperChildren: Ma,
        popperInstance: null,
        props: xa,
        state: {
          currentPlacement: null,
          isEnabled: !0,
          isVisible: !1,
          isDestroyed: !1,
          isMounted: !1,
          isShown: !1,
        },
        plugins: Na,
        clearDelayTimeouts: function clearDelayTimeouts() {
          clearTimeout(ua), clearTimeout(va), cancelAnimationFrame(wa);
        },
        setProps: function setProps(b) {
          if (!Ra.state.isDestroyed) {
            E("onBeforeUpdate", [Ra, b]), ea();
            var c = Ra.props,
              e = F(
                d,
                ba({}, Ra.props, {}, b, {
                  ignoreAttributes: !0,
                })
              );
            if (
              ((e.ignoreAttributes = v(b.ignoreAttributes, c.ignoreAttributes)),
              (Ra.props = e),
              da(),
              c.interactiveDebounce !== e.interactiveDebounce &&
                (J(), (Ia = g(ma, e.interactiveDebounce))),
              G(La, c, e),
              (Ra.popperChildren = T(La)),
              c.triggerTarget && !e.triggerTarget
                ? y(c.triggerTarget).forEach(function (a) {
                    a.removeAttribute("aria-expanded");
                  })
                : e.triggerTarget && d.removeAttribute("aria-expanded"),
              (I(), Ra.popperInstance))
            )
              if (
                R.some(function (a) {
                  return i(b, a) && b[a] !== c[a];
                })
              ) {
                var f = Ra.popperInstance.reference;
                Ra.popperInstance.destroy(),
                  qa(),
                  (Ra.popperInstance.reference = f),
                  Ra.state.isVisible &&
                    Ra.popperInstance.enableEventListeners();
              } else Ra.popperInstance.update();
            E("onAfterUpdate", [Ra, b]);
          }
        },
        setContent: function setContent(a) {
          Ra.setProps({
            content: a,
          });
        },
        show: function show(b) {
          void 0 === b && (b = a(Ra.props.duration, 0, ja.duration));
          var c = Ra.state.isVisible,
            d = Ra.state.isDestroyed,
            e = !Ra.state.isEnabled,
            g = ia.isTouch && !Ra.props.touch;
          c ||
            d ||
            e ||
            g ||
            D().hasAttribute("disabled") ||
            (Ra.popperInstance || qa(),
            (E("onShow", [Ra], !1), !1 === Ra.props.onShow(Ra)) ||
              (L(),
              (La.style.visibility = "visible"),
              (Ra.state.isVisible = !0),
              Ra.state.isMounted || p(Qa.concat(La), 0),
              (za = function () {
                Ra.state.isVisible &&
                  (p([La], Ra.props.updateDuration),
                  p(Qa, b),
                  m(Qa, "visible"),
                  H(),
                  I(),
                  u(U, Ra),
                  M(!0),
                  (Ra.state.isMounted = !0),
                  E("onMount", [Ra]),
                  (function (a, b) {
                    Q(a, b);
                  })(b, function () {
                    (Ra.state.isShown = !0), E("onShown", [Ra]);
                  }));
              }),
              (function () {
                Ga = 0;
                var a,
                  b = Ra.props.appendTo,
                  c = D();
                (a =
                  (Ra.props.interactive && b === ja.appendTo) || "parent" === b
                    ? c.parentNode
                    : l(b, [c])),
                  a.contains(La) || a.appendChild(La),
                  f(
                    Ra.popperInstance.modifiers,
                    "flip",
                    "enabled",
                    Ra.props.flip
                  ),
                  Ra.popperInstance.enableEventListeners(),
                  Ra.popperInstance.update();
              })()));
        },
        hide: function hide(b) {
          void 0 === b && (b = a(Ra.props.duration, 1, ja.duration));
          var c = !Ra.state.isVisible && !Da,
            d = Ra.state.isDestroyed,
            e = !Ra.state.isEnabled && !Da;
          c ||
            d ||
            e ||
            (E("onHide", [Ra], !1), !1 === Ra.props.onHide(Ra) && !Da) ||
            (O(),
            (La.style.visibility = "hidden"),
            (Ra.state.isVisible = !1),
            (Ra.state.isShown = !1),
            p(Qa, b),
            m(Qa, "hidden"),
            H(),
            I(),
            (function (a, b) {
              Q(a, function () {
                !Ra.state.isVisible &&
                  La.parentNode &&
                  La.parentNode.contains(La) &&
                  b();
              });
            })(b, function () {
              Ra.popperInstance.disableEventListeners(),
                (Ra.popperInstance.options.placement = Ra.props.placement),
                La.parentNode.removeChild(La),
                0 ===
                  (U = U.filter(function (a) {
                    return a !== Ra;
                  })).length && M(!1),
                (Ra.state.isMounted = !1),
                E("onHidden", [Ra]);
            }));
        },
        enable: function enable() {
          Ra.state.isEnabled = !0;
        },
        disable: function disable() {
          Ra.hide(), (Ra.state.isEnabled = !1);
        },
        destroy: function destroy() {
          Ra.state.isDestroyed ||
            ((Da = !0),
            Ra.clearDelayTimeouts(),
            Ra.hide(0),
            ea(),
            delete d._tippy,
            Ra.popperInstance && Ra.popperInstance.destroy(),
            (Da = !1),
            (Ra.state.isDestroyed = !0),
            E("onDestroy", [Ra]));
        },
      };
    (d._tippy = Ra), (La._tippy = Ra);
    var Sa = Na.map(function (a) {
        return a.fn(Ra);
      }),
      Ta = d.hasAttribute("aria-expanded");
    return (
      da(),
      I(),
      xa.lazy || qa(),
      E("onCreate", [Ra]),
      xa.showOnCreate && sa(),
      La.addEventListener("mouseenter", function () {
        Ra.props.interactive && Ra.state.isVisible && Ra.clearDelayTimeouts();
      }),
      La.addEventListener("mouseleave", function (a) {
        Ra.props.interactive &&
          w(Ra.props.trigger, "mouseenter") &&
          (Ia(a), Ja.addEventListener("mousemove", Ia));
      }),
      Ra
    );
  }

  function X(a, b, c) {
    void 0 === b && (b = {}),
      void 0 === c && (c = []),
      (c = ja.plugins.concat(b.plugins || c)),
      document.addEventListener(
        "touchstart",
        D,
        ba({}, ha, {
          capture: !0,
        })
      ),
      window.addEventListener("blur", I);
    var d = ba({}, b, {
        plugins: c,
      }),
      e = ea(a).reduce(function (a, b) {
        var c = b && W(b, d);
        return c && a.push(c), a;
      }, []);
    return s(a) ? e[0] : e;
  }

  function Y(a, b) {
    return (
      !a ||
      !b ||
      a.top !== b.top ||
      a.right !== b.right ||
      a.bottom !== b.bottom ||
      a.left !== b.left
    );
  }
  var Z = Math.max,
    $ = Math.min;
  aa = aa && aa.hasOwnProperty("default") ? aa.default : aa;
  var ha = {
      passive: !0,
    },
    ia = {
      isTouch: !1,
    },
    n = 0,
    L = "undefined" != typeof window && "undefined" != typeof document,
    V = L ? navigator.userAgent : "",
    B = /MSIE |Trident\//.test(V),
    H = L && /iPhone|iPad|iPod/.test(navigator.platform),
    ja = ba(
      {
        allowHTML: !0,
        animation: "fade",
        appendTo: function appendTo() {
          return document.body;
        },
        aria: "describedby",
        arrow: !0,
        boundary: "scrollParent",
        content: "",
        delay: 0,
        distance: 10,
        duration: [300, 250],
        flip: !0,
        flipBehavior: "flip",
        flipOnUpdate: !1,
        hideOnClick: !0,
        ignoreAttributes: !1,
        inertia: !1,
        interactive: !1,
        interactiveBorder: 2,
        interactiveDebounce: 0,
        lazy: !0,
        maxWidth: 350,
        multiple: !1,
        offset: 0,
        onAfterUpdate: function onAfterUpdate() {},
        onBeforeUpdate: function onBeforeUpdate() {},
        onCreate: function onCreate() {},
        onDestroy: function onDestroy() {},
        onHidden: function onHidden() {},
        onHide: function onHide() {},
        onMount: function onMount() {},
        onShow: function onShow() {},
        onShown: function onShown() {},
        onTrigger: function onTrigger() {},
        onUntrigger: function onUntrigger() {},
        placement: "top",
        plugins: [],
        popperOptions: {},
        role: "tooltip",
        showOnCreate: !1,
        theme: "",
        touch: !0,
        trigger: "mouseenter focus",
        triggerTarget: null,
        updateDuration: 0,
        zIndex: 9999,
      },
      {
        animateFill: !1,
        followCursor: !1,
        inlinePositioning: !1,
        sticky: !1,
      }
    ),
    z = Object.keys(ja),
    R = [
      "arrow",
      "boundary",
      "distance",
      "flip",
      "flipBehavior",
      "flipOnUpdate",
      "offset",
      "placement",
      "popperOptions",
    ],
    q = 1,
    ka = [],
    U = [];
  (X.version = "5.2.1"),
    (X.defaultProps = ja),
    (X.setDefaultProps = function (a) {
      Object.keys(a).forEach(function (b) {
        ja[b] = a[b];
      });
    }),
    (X.currentInput = ia);
  var la = {
    mouseover: "mouseenter",
    focusin: "focus",
    click: "click",
  };
  return (
    L &&
      (function (a) {
        var b = document.createElement("style");
        (b.textContent = a), b.setAttribute("data-tippy-stylesheet", "");
        var c = document.head,
          d = document.querySelector("head>style,head>link");
        d ? c.insertBefore(b, d) : c.appendChild(b);
      })(
        ".tippy-tooltip[data-animation=fade][data-state=hidden]{opacity:0}.tippy-iOS{cursor:pointer!important;-webkit-tap-highlight-color:transparent}.tippy-popper{pointer-events:none;max-width:calc(100vw - 10px);transition-timing-function:cubic-bezier(.165,.84,.44,1);transition-property:transform}.tippy-tooltip{position:relative;color:#fff;border-radius:4px;font-size:14px;line-height:1.4;background-color:#333;transition-property:visibility,opacity,transform;outline:0}.tippy-tooltip[data-placement^=top]>.tippy-arrow{border-width:8px 8px 0;border-top-color:#333;margin:0 3px;transform-origin:50% 0;bottom:-7px}.tippy-tooltip[data-placement^=bottom]>.tippy-arrow{border-width:0 8px 8px;border-bottom-color:#333;margin:0 3px;transform-origin:50% 7px;top:-7px}.tippy-tooltip[data-placement^=left]>.tippy-arrow{border-width:8px 0 8px 8px;border-left-color:#333;margin:3px 0;transform-origin:0 50%;right:-7px}.tippy-tooltip[data-placement^=right]>.tippy-arrow{border-width:8px 8px 8px 0;border-right-color:#333;margin:3px 0;transform-origin:7px 50%;left:-7px}.tippy-tooltip[data-interactive][data-state=visible]{pointer-events:auto}.tippy-tooltip[data-inertia][data-state=visible]{transition-timing-function:cubic-bezier(.54,1.5,.38,1.11)}.tippy-arrow{position:absolute;border-color:transparent;border-style:solid}.tippy-content{padding:5px 9px}"
      ),
    X.setDefaultProps({
      plugins: [
        {
          name: "animateFill",
          defaultValue: !1,
          fn: function fn(a) {
            function b() {
              a.popperChildren.backdrop = h;
            }
            var c = a.popperChildren,
              f = c.tooltip,
              g = c.content,
              h = a.props.animateFill
                ? (function () {
                    var a = d();
                    return (
                      (a.className = "tippy-backdrop"), m([a], "hidden"), a
                    );
                  })()
                : null;
            return {
              onCreate: function onCreate() {
                h &&
                  (b(),
                  f.insertBefore(h, f.firstElementChild),
                  f.setAttribute("data-animatefill", ""),
                  (f.style.overflow = "hidden"),
                  a.setProps({
                    animation: "shift-away",
                    arrow: !1,
                  }));
              },
              onMount: function onMount() {
                if (h) {
                  var a = f.style.transitionDuration,
                    b = +a.replace("ms", "");
                  (g.style.transitionDelay = Math.round(b / 10) + "ms"),
                    (h.style.transitionDuration = a),
                    m([h], "visible");
                }
              },
              onShow: function onShow() {
                h && (h.style.transitionDuration = "0ms");
              },
              onHide: function onHide() {
                h && m([h], "hidden");
              },
              onAfterUpdate: function onAfterUpdate() {
                b();
              },
            };
          },
        },
        {
          name: "followCursor",
          defaultValue: !1,
          fn: function fn(k) {
            function l() {
              return "manual" === k.props.trigger.trim();
            }

            function q() {
              var a =
                !!l() || (null !== o && (0 !== o.clientX || 0 !== o.clientY));
              return k.props.followCursor && a;
            }

            function t() {
              return (
                ia.isTouch ||
                ("initial" === k.props.followCursor && k.state.isVisible)
              );
            }

            function f() {
              k.popperInstance && r && (k.popperInstance.reference = r);
            }

            function d() {
              if (q() || k.props.placement !== C.placement) {
                var a = C.placement,
                  b = a.split("-")[1];
                (y = !0),
                  k.setProps({
                    placement:
                      q() && b
                        ? a.replace(b, "start" === b ? "end" : "start")
                        : a,
                  }),
                  (y = !1);
              }
            }

            function s() {
              k.popperInstance &&
                q() &&
                t() &&
                k.popperInstance.disableEventListeners();
            }

            function m() {
              q() ? h.addEventListener("mousemove", b) : f();
            }

            function g() {
              q() && b(A);
            }

            function z() {
              h.removeEventListener("mousemove", b);
            }

            function b(b) {
              var e = (A = b),
                a = e.clientX,
                f = e.clientY;
              if (k.popperInstance && k.state.currentPlacement) {
                var i = ga(b.target, function (a) {
                    return a === B;
                  }),
                  o = k.props.followCursor,
                  c = "horizontal" === o,
                  l = "vertical" === o,
                  d = w(["top", "bottom"], j(k.state.currentPlacement)),
                  p = (function (a, b) {
                    var c = b ? a.offsetWidth : a.offsetHeight;
                    return {
                      size: c,
                      x: b ? c : 0,
                      y: b ? 0 : c,
                    };
                  })(n, d),
                  m = p.size,
                  g = p.x,
                  h = p.y;
                (!i && k.props.interactive) ||
                  (null === r && (r = k.popperInstance.reference),
                  (k.popperInstance.reference = {
                    referenceNode: B,
                    clientWidth: 0,
                    clientHeight: 0,
                    getBoundingClientRect: function getBoundingClientRect() {
                      var b = B.getBoundingClientRect();
                      return {
                        width: d ? m : 0,
                        height: d ? 0 : m,
                        top: (c ? b.top : f) - h,
                        bottom: (c ? b.bottom : f) + h,
                        left: (l ? b.left : a) - g,
                        right: (l ? b.right : a) + g,
                      };
                    },
                  }),
                  k.popperInstance.update()),
                  t() && z();
              }
            }
            var A,
              B = k.reference,
              n = k.popper,
              r = null,
              h = x(k.props.triggerTarget || B),
              o = null,
              y = !1,
              C = k.props;
            return {
              onAfterUpdate: function onAfterUpdate(a, b) {
                var c;
                y ||
                  ((c = b),
                  Object.keys(c).forEach(function (a) {
                    C[a] = v(c[a], C[a]);
                  }),
                  b.placement && d()),
                  b.placement && s(),
                  requestAnimationFrame(g);
              },
              onMount: function onMount() {
                g(), s();
              },
              onShow: function onShow() {
                l() &&
                  ((A = o =
                    {
                      clientX: 0,
                      clientY: 0,
                    }),
                  d(),
                  m());
              },
              onTrigger: function onTrigger(a, b) {
                o ||
                  (c(b) &&
                    ((o = {
                      clientX: b.clientX,
                      clientY: b.clientY,
                    }),
                    (A = b)),
                  d(),
                  m());
              },
              onUntrigger: function onUntrigger() {
                k.state.isVisible || (z(), (o = null));
              },
              onHidden: function onHidden() {
                z(), f(), (o = null);
              },
            };
          },
        },
        {
          name: "inlinePositioning",
          defaultValue: !1,
          fn: function fn(a) {
            function c() {
              return !!a.props.inlinePositioning;
            }
            var d = a.reference;
            return {
              onHidden: function onHidden() {
                c() && (a.popperInstance.reference = d);
              },
              onShow: function onShow() {
                c() &&
                  (a.popperInstance.reference = {
                    referenceNode: d,
                    clientWidth: 0,
                    clientHeight: 0,
                    getBoundingClientRect: function getBoundingClientRect() {
                      return (function (b, g, e) {
                        if (2 > e.length || null === b) return g;
                        switch (b) {
                          case "top":
                          case "bottom":
                            var h = e[0],
                              j = e[e.length - 1],
                              i = "top" === b,
                              k = h.top,
                              a = j.bottom,
                              m = i ? h.left : j.left,
                              n = i ? h.right : j.right;
                            return {
                              top: k,
                              bottom: a,
                              left: m,
                              right: n,
                              width: n - m,
                              height: a - k,
                            };
                          case "left":
                          case "right":
                            var o = $.apply(
                                Math,
                                e.map(function (a) {
                                  return a.left;
                                })
                              ),
                              c = Z.apply(
                                Math,
                                e.map(function (a) {
                                  return a.right;
                                })
                              ),
                              l = e.filter(function (a) {
                                return "left" === b
                                  ? a.left === o
                                  : a.right === c;
                              }),
                              f = l[0].top,
                              d = l[l.length - 1].bottom;
                            return {
                              top: f,
                              bottom: d,
                              left: o,
                              right: c,
                              width: c - o,
                              height: d - f,
                            };
                          default:
                            return g;
                        }
                      })(
                        a.state.currentPlacement && j(a.state.currentPlacement),
                        d.getBoundingClientRect(),
                        b(d.getClientRects())
                      );
                    },
                  });
              },
            };
          },
        },
        {
          name: "sticky",
          defaultValue: !1,
          fn: function fn(b) {
            function c(a) {
              return !0 === b.props.sticky || b.props.sticky === a;
            }

            function d() {
              var h = c("reference")
                  ? (b.popperInstance
                      ? b.popperInstance.reference
                      : a
                    ).getBoundingClientRect()
                  : null,
                i = c("popper") ? e.getBoundingClientRect() : null;
              ((h && Y(f, h)) || (i && Y(g, i))) && b.popperInstance.update(),
                (f = h),
                (g = i),
                b.state.isMounted && requestAnimationFrame(d);
            }
            var a = b.reference,
              e = b.popper,
              f = null,
              g = null;
            return {
              onMount: function onMount() {
                b.props.sticky && d();
              },
            };
          },
        },
      ],
    }),
    (X.createSingleton = function (b, c, e) {
      void 0 === c && (c = {}),
        void 0 === e && (e = []),
        (e = c.plugins || e),
        b.forEach(function (a) {
          a.disable();
        });
      var f,
        g,
        h = ba({}, ja, {}, c).aria,
        j = !1,
        k = b.map(function (a) {
          return a.reference;
        });
      return X(
        d(),
        ba({}, c, {
          plugins: [
            {
              fn: function fn(a) {
                function d(b) {
                  if (f) {
                    var c = "aria-" + f;
                    b && !a.props.interactive
                      ? g.setAttribute(c, a.popperChildren.tooltip.id)
                      : g.removeAttribute(c);
                  }
                }
                return {
                  onAfterUpdate: function onAfterUpdate(b, c) {
                    var d = c.aria;
                    void 0 !== d &&
                      d !== h &&
                      (j
                        ? ((j = !0),
                          a.setProps({
                            aria: null,
                          }),
                          (j = !1))
                        : (h = d));
                  },
                  onDestroy: function onDestroy() {
                    b.forEach(function (a) {
                      a.enable();
                    });
                  },
                  onMount: function onMount() {
                    d(!0);
                  },
                  onUntrigger: function onUntrigger() {
                    d(!1);
                  },
                  onTrigger: function onTrigger(e, i) {
                    var j = i.currentTarget,
                      l = k.indexOf(j);
                    j !== g &&
                      ((g = j),
                      (f = h),
                      a.state.isVisible && d(!0),
                      (a.popperInstance.reference = j),
                      a.setContent(b[l].props.content));
                  },
                };
              },
            },
          ].concat(e),
          aria: null,
          triggerTarget: k,
        })
      );
    }),
    (X.delegate = function (b, g, e) {
      function h(a) {
        if (a.target) {
          var b = a.target.closest(q);
          if (
            b &&
            w(
              b.getAttribute("data-tippy-trigger") || g.trigger || ja.trigger,
              la[a.type]
            )
          ) {
            var d = X(b, c);
            d && (n = n.concat(d));
          }
        }
      }

      function d(a, b, c, d) {
        void 0 === d && (d = !1),
          a.addEventListener(b, c, d),
          m.push({
            node: a,
            eventType: b,
            handler: c,
            options: d,
          });
      }
      void 0 === e && (e = []), (e = g.plugins || e);
      var j,
        k,
        m = [],
        n = [],
        q = g.target,
        t =
          ((j = ["target"]),
          (k = ba({}, g)),
          j.forEach(function (a) {
            delete k[a];
          }),
          k),
        s = ba({}, t, {
          plugins: e,
          trigger: "manual",
        }),
        c = ba({}, t, {
          plugins: e,
          showOnCreate: !0,
        }),
        l = X(b, s);
      return (
        y(l).forEach(function (a) {
          var b = a.destroy;
          (a.destroy = function (a) {
            void 0 === a && (a = !0),
              a &&
                n.forEach(function (a) {
                  a.destroy();
                }),
              (n = []),
              m.forEach(function (a) {
                var b = a.node,
                  c = a.eventType,
                  d = a.handler,
                  e = a.options;
                b.removeEventListener(c, d, e);
              }),
              (m = []),
              b();
          }),
            (function (a) {
              var b = a.reference;
              d(b, "mouseover", h), d(b, "focusin", h), d(b, "click", h);
            })(a);
        }),
        l
      );
    }),
    (X.hideAll = function (a) {
      var b = void 0 === a ? {} : a,
        c = b.exclude,
        d = b.duration;
      U.forEach(function (a) {
        var b = !1;
        c && (b = da(c) ? a.reference === c : a.popper === c.popper),
          b || a.hide(d);
      });
    }),
    (X.roundArrow =
      '<svg viewBox="0 0 18 7" xmlns="http://www.w3.org/2000/svg"><path d="M0 7s2.021-.015 5.253-4.218C6.584 1.051 7.797.007 9 0c1.203-.007 2.416 1.035 3.761 2.782C16.012 7.005 18 7 18 7H0z"/></svg>'),
    X
  );
})(Popper);
