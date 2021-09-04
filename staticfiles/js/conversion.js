var loader = function() {
    return {
        create: function create(a) {
            var b = !!(1 < arguments.length && arguments[1] !== void 0) && arguments[1],
                c = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : "large",
                d = 3 < arguments.length ? arguments[3] : void 0,
                e = !!(4 < arguments.length && arguments[4] !== void 0) && arguments[4];
            e && window.loader.destroy();
            var f = "has-loader--" + c,
                g = "\n\t\t\t\t<div class=\"spinner js-spinner\">\n\t\t\t\t\t<svg width=\"18\" height=\"16\" viewbox=\"0 0 18 16\" xmlns=\"http://www.w3.org/2000/svg\" class=\"bounce bounce1\">\n\t\t\t\t\t\t<path d=\"M.035 5.645c-.344 3.11 1.84 8.322 7.776 9.47 3.017.589 7.015-.223 9.002-4.342C23.338-2.817.87-2.397.035 5.645z\" fill=\"#02BF9B\" fill-rule=\"nonzero\">\n\t\t\t\t\t\t</path>\n\t\t\t\t\t</svg>\n\n\t\t\t\t\t<svg width=\"18\" height=\"17\" viewbox=\"0 0 18 16\" xmlns=\"http://www.w3.org/2000/svg\" class=\"bounce bounce2\">\n\t\t\t\t\t\t<path d=\"M15.643 2.777A8.172 8.172 0 0 0 12.707.703C7.61-1.48 1.765 1.736.333 6.025c-.035.105-.067.21-.096.316-.561 2.033-.135 4.253 1.372 6.066 1.802 2.168 4.765 3.471 7.601 3.613 3.924.196 7.457-1.079 8.504-4.38.79-2.49-.105-6.65-2.071-8.863z\" fill=\"#02A5E8\" fill-rule=\"nonzero\">\n\t\t\t\t\t\t</path>\n\t\t\t\t\t</svg>\n\t\t\t\t\t<svg width=\"18\" height=\"18\" viewbox=\"0 0 18 18\" xmlns=\"http://www.w3.org/2000/svg\" class=\"bounce bounce3\">\n\t\t\t\t\t\t<path d=\"M10.215.437C5.117.437-2.205 5.263.634 11.088c2.839 5.825 12.92 8.488 15.732 2.996C19.112 8.718 19.204.437 10.215.437z\" fill=\"#FF9B35\" fill-rule=\"nonzero\">\n\t\t\t\t\t\t</path>\n\t\t\t\t\t</svg>\n\t\t\t\t</div>\n\t\t\t";
            b ? (a.classList.add("js-spinner-holder", "has-loader", f), a.insertAdjacentHTML("beforeend", g)) : (a.parentNode.classList.add("js-spinner-holder", "has-loader", f), a.insertAdjacentHTML("afterend", g))
        },
        destroy: function destroy() {
            var a = document.querySelector(".js-spinner");
            a && (a.classList.remove("js-spinner-holder"), a.remove())
        }
    }
}();
var validation = function() {
    return {
        findAncestor: function findAncestor(a, b) {
            for (;
                (a = a.parentElement) && !(a.matches || a.matchesSelector).call(a, b););
            return a
        },
        setValidation: function setValidation(a, b) {
            var c = !(2 < arguments.length && arguments[2] !== void 0) || arguments[2],
                d = !(3 < arguments.length && arguments[3] !== void 0) || arguments[3];
            b && c && (a.classList.remove("error"), a.classList.add("success")), !b && d && (a.classList.remove("success"), a.classList.add("error"))
        },
        isMinimalLength: function isMinimalLength(a, b) {
            return a.length >= b
        },
        containsUppercaseCharacters: function containsUppercaseCharacters(a) {
            return /([A-Z])+/.test(a)
        },
        containsLowercaseCharacters: function containsLowercaseCharacters(a) {
            return /([a-z])+/.test(a)
        },
        containsNumbers: function containsNumbers(a) {
            return /\d/.test(a)
        },
        containsSameValue: function containsSameValue(a, b) {
            return a === b
        },
        isValidEmail: function isValidEmail(a) {
            return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test((a + "").toLowerCase().trim())
        },
        simpleValidation: function simpleValidation(a, b, c, d) {
            var e = validation.findAncestor(a, b);
            "string" == typeof a.value && a.value.trim(), "" == a.value ? validation.setValidation(e, !1, c, d) : validation.setValidation(e, !0, c, d)
        },
        emailValidation: function emailValidation(a, b, c, d) {
            var e = validation.findAncestor(a, b);
            validation.isValidEmail(a.value) ? validation.setValidation(e, !0, c, d) : validation.setValidation(e, !1, c, d)
        },
        isPasswordValid: function isPasswordValid(a, b, c, d) {
            var e = validation.findAncestor(a, b),
                f = validation.isMinimalLength(a.value, 8),
                g = validation.containsNumbers(a.value),
                h = validation.containsUppercaseCharacters(a.value),
                i = validation.containsLowercaseCharacters(a.value);
            Promise.all([f, g, h, i]).then(function(a) {
                var b = !a.includes(!1);
                validation.setValidation(e, b, c, d)
            })
        },
        hasFormErrors: function hasFormErrors(a) {
            var b = document.querySelector(a);
            return null !== b.querySelector(".form-group.error")
        },
        clear: function clear() {
            for (var a = document.querySelectorAll(".form-group"), b = 0; b < a.length; b++) {
                a[b].classList.remove("success", "error");
                for (var c = a[b].querySelectorAll(".success, .error"), d = 0; d < c.length; d++) c[d].classList.remove("success", "error")
            }
        },
        resetSteps: function resetSteps() {
            for (var a = document.querySelectorAll(".steps .step"), b = document.querySelectorAll(".plt-modal .modal-body"), c = 0; c < a.length; c++) a[c].classList.remove("move-in", "move-out");
            for (var d = 0; d < b.length; d++) b[d].removeAttribute("style")
        },
        clearFull: function clearFull(a) {
            var b = document.querySelector(a);
            null !== b && (b.reset(), validation.clear(), validation.resetSteps(b))
        }
    }
}();
(function() {
    function a() {
        1 < G.current && (x.classList.remove("step-" + G.current), G.current--, x.classList.add("step-" + G.current), h(G.current), G.completed[G.current] = !1, u.innerHTML = G.current, v.innerHTML = G.titles[G.current], c())
    }

    function b(a) {
        var b = d();
        G.current <= G.total && !0 == b ? (g(G.current), G.completed[G.current] = !0, x.classList.remove("step-" + G.current), G.current++, x.classList.add("step-" + G.current), u.innerHTML = G.current, v.innerHTML = k() ? G.titles[G.current] : G.titles[G.current + 1]) : a.classList.remove("is-loading")
    }

    function c() {
        var a = document.querySelectorAll(".overview-control-item");
        a.forEach(function(a) {
            a.parentNode.removeChild(a)
        })
    }

    function d() {
        var a = document.querySelector("[data-conversion-page=\"".concat(G.current, "\"]"));
        if (a.hasAttribute("data-section-validation")) {
            var b = document.querySelectorAll(".form-group.error"),
                c = n();
            return !(0 < b.length) && c
        }
        return !0
    }

    function e(a) {
        var b = document.querySelectorAll(".payment-option");
        b.forEach(function(a) {
            a.classList.remove("selected")
        });
        var c = validation.findAncestor(a.target, ".payment-option");
        c.classList.add("selected")
    }

    function f() {
        var a = document.querySelector("#user-information-phone-country-code").value,
            b = document.querySelector("#user-information-phone-number").value;
        return a + b
    }

    function g(a) {
        var b = document.querySelector("[data-conversion-page=\"".concat(a, "\"]")),
            c = document.querySelector("[data-conversion-page=\"".concat(a + 1, "\"]"));
        null != c && setTimeout(function() {
            b.classList.remove("is-in-progress"), b.classList.add("is-completed"), j(), c.classList.remove("is-upcoming"), c.classList.add("is-in-progress")
        }, 1e3)
    }

    function h(a) {
        var b = document.querySelector("[data-conversion-page=\"".concat(a + 1, "\"]")),
            c = document.querySelector("[data-conversion-page=\"".concat(a, "\"]"));
        c.classList.remove("is-completed"), b.classList.remove("is-in-progress"), b.classList.add("is-upcoming"), setTimeout(function() {
            c.classList.remove("hidden")
        }, 0)
    }

    function i(a) {
        var b = document.querySelector("[data-conversion-page=\"".concat(a - 1, "\"]")),
            c = document.querySelector("[data-conversion-page=\"".concat(a, "\"]"));
        null != c && (c.classList.remove("is-upcoming"), c.classList.add("is-in-progress")), null != b && (b.classList.remove("is-in-progress"), b.classList.add("is-completed"))
    }

    function j() {
        var a = document.querySelectorAll(".is-loading");
        a.forEach(function(a) {
            a.classList.remove("is-loading")
        })
    }

    function k() {
        return 768 >= window.innerWidth ? (G.mobile = !0, !0) : (G.mobile = !1, !1)
    }

    function l() {
        var a = document.querySelector(".payment-option-radio:checked"),
            b = document.querySelectorAll(".payment-option"),
            c = [].slice.call(b);
        if (0 < c.length) {
            c.forEach(function(a) {
                a.classList.remove("selected")
            });
            var d = validation.findAncestor(a, ".payment-option");
            d.classList.add("selected")
        }
    }

    function m(a) {
        if (tippy("[data-tippy]", {
                content: function content(a) {
                    var b = a.getAttribute("data-template"),
                        c = document.getElementById(b);
                    return c.innerHTML
                },
                trigger: "hover",
                theme: "tripaneer"
            }), "" == D ? (E ? (G.titles = {
                1: translations.payment.requestToBook,
                2: translations.payment.requestToBook,
                3: translations.payment.requestToBook
            }, w.innerHTML = translations.payment.requestToBookSubtitle) : (G.titles = {
                1: translations.payment.paymentHeading,
                2: translations.payment.paymentHeading,
                3: translations.payment.paymentHeading
            }, w.innerHTML = translations.payment.paymentSubtitle), G.current = 2) : (G.titles = {
                1: translations.payment.reviewTripDetails,
                2: translations.payment.contactInformation,
                3: translations.payment.confirmAndPay
            }, G.current = a || 1), !k()) {
            G.total = 2, x.className += "step-" + G.current, v.innerHTML = G.titles[G.current];
            var e = document.querySelector("aside.summary");
            e.removeAttribute("data-conversion-page"), e.classList.remove("conversion-page"), e.classList.remove("is-upcoming");
            var b = document.querySelectorAll("[data-conversion-page]"),
                c = [].slice.call(b);
            c.forEach(function(a) {
                var b = a.dataset.conversionPage;
                a.setAttribute("data-conversion-page", b - 1)
            });
            var f = document.querySelector("#conversion-step-customer-information footer .step-back");
            f.parentNode.removeChild(f)
        } else v.innerHTML = G.titles[G.current], "" == D && (G.current = 3);
        y.innerHTML = G.total, i(G.current), l(1), o(), G.current == G.total && p(F);
        var d = document.querySelector("main .spinner");
        d.parentNode.removeChild(d)
    }


    function o() {
        var a = document.querySelector(".customer-information");
        if (document.body.classList.contains("logged-in")) return !1;
        var b = a.querySelectorAll(".simple-validation, .email-validation");
        b.forEach(function(a) {
            var b = a.querySelector(".form-control");
            a.classList.contains("simple-validation") ? validation.simpleValidation(b, ".simple-validation", !0, !1) : a.classList.contains("email-validation") && validation.emailValidation(b, ".email-validation", !0, !1)
        })
    }



    function r(a, b, c) {
        var d = "";
        d = "redirect" == a ? q(b) : q(b);
        var e = "redirect" == a ? "transparent" : "",
            f = "<div class=\"loader-overlay loading payment-response ".concat(a, "\">\n\t\t\t<div class=\"dialog ").concat(e, "\">\n\t\t\t\t").concat(d, "\n\t\t\t</div>\n\t\t</div>");
        document.body.insertAdjacentHTML("beforeEnd", f), document.body.style.overflow = "hidden", c && (loader.create(document.querySelector(".loader-overlay .dialog h2")), setTimeout(function() {
            window.location = c
        }, 3e3))
    }

    function s() {
        var a = document.querySelector(".loader-overlay.payment-response");
        a.parentNode.removeChild(a), document.body.style = "auto"
    }
    var t = document.querySelector("#instant-booking-payment") || !1,
        u = document.querySelector(".step-number"),
        v = document.querySelector(".step-title"),
        w = document.querySelector(".step-subtitle") || !1,
        x = document.querySelector("#indicator-status"),
        y = document.querySelector(".total-steps"),
        z = document.querySelector("#user-information-phone-country-code"),
        A = document.querySelector("#user-information-phone-number"),
        B = document.querySelector("#conversion-save-user-information"),
        C = document.querySelector("#keep_reservation_payment") || !1,
        D = document.querySelector("input[name=\"bookingType\"]") || "",
        E = document.querySelector("#save_card_details") || !1,
        F = {};
    F = "" == D ? {
        firstName: document.querySelector("#payment_first_name").value,
        lastName: document.querySelector("#payment_last_name").value,
        email: document.querySelector("#payment_email_customer_details") ? document.querySelector("#payment_email_customer_details").value : "",
        phoneNumber: sessionStorage.getItem("customerDetailsPhoneNumber"),
        message: sessionStorage.getItem("customerDetailsMessage")
    } : {
        firstName: sessionStorage.getItem("customerDetailsFirstName"),
        lastName: sessionStorage.getItem("customerDetailsLastName"),
        email: sessionStorage.getItem("customerDetailsEmail"),
        phoneNumber: sessionStorage.getItem("customerDetailsPhoneNumber"),
        message: sessionStorage.getItem("customerDetailsMessage")
    }, document.addEventListener("DOMContentLoaded", function() {
        if (!1 != t) {
            var a = document.querySelector("#payment-response-redirect"),
                b = document.querySelector("#payment-response-errors"),
                c = parseInt(getQueryStringParameterByName(window.location.href, "step"));
            a && 1 == a.value ? r("redirect", "empty", a.dataset.url) : b && 1 == b.value ? (c = 2, m(c), r("error", "payment_cancelled")) : m(c)
        }
    }), document.addEventListener("focusout", function(a) {
        a.target.matches(".conversion-layout .simple-validation .form-control") && validation.simpleValidation(a.target, ".simple-validation"), a.target.matches(".conversion-layout .email-validation .form-control") && validation.emailValidation(a.target, ".email-validation")
    }), document.addEventListener("change", function(a) {
        a.target.matches(".conversion-layout .email-validation .form-control") && validation.emailValidation(a.target, ".email-validation"), a.target.classList.contains("payment-option-radio") && e(a)
    }), document.addEventListener("click", function(c) {
        if (c.target.classList.contains("step-back") && (c.preventDefault(), a(c.target)), c.target.classList.contains("step-forward") && (c.preventDefault(), c.target.classList.add("is-loading"), b(c.target)), c.target.classList.contains("close-overlay") && s(), c.target.classList.contains("payment-currency-change") && (gae("payment-page-currency-change", "open"), document.querySelector(".language-list-parent").classList.add("hidden")), c.target.classList.contains("language-currency-switch-combined-close") && (gae("payment-page-currency-change", "closed_without_change"), document.querySelector(".language-list-parent").classList.remove("hidden")), c.target.classList.contains("currency-option")) {
            var d = document.querySelector("#customer_currency").value,
                e = c.target.firstElementChild.innerText;
            gae("payment-page-currency-change", "closed_with_change_from_".concat(d, "_to_").concat(e))
        }
    });
    var G = {
        total: 3,
        current: 1,
        mobile: !0,
        completed: {
            1: !1,
            2: !1,
            3: !1
        }
    }
})();


function applyUserDiscount() {
    event.preventDefault();
    var a = document.querySelector(".promo-code").value;
    if ("" == a) return !1;
    var b = event.target,
        c = getUrlParameter("token");
    if (b.classList.add("is-loading"), c) var d = {
        token: c,
        voucher: a
    };
    else var e = document.querySelector("#organizer-slug").value,
        f = document.querySelector("#listing-slug").value,
        d = {
            voucher: a,
            organizer_slug: e,
            listing_slug: f,
            package_id: +getUrlParameter("package_id"),
            arrival_date: getUrlParameter("arrival_date"),
            language_id: 3,
            site_id: 2
        };
    var g = {
        credentials: "same-origin",
        method: "POST",
        body: JSON.stringify(d),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    };
    fetch("/json/voucher/apply", g).then(function(a) {
        return a.json()
    }).then(function(c) {
        b.classList.remove("is-loading");
        var d = c.valid;
        d ? applyDiscountInformation(c, a) : errorWithDiscount(c)
    }).catch(function(a) {
        console.error("Broken:", a), document.querySelector(".promo-code-show-error").classList.remove("hidden"), document.querySelector(".promo-code-show-error").innerHTML = "<span>".concat(a.result, "</span>"), document.querySelector(".customer-promo-container").classList.remove("has-spinner")
    })
}

function errorWithDiscount() {
    document.querySelector(".promo-code-show-error").classList.remove("hidden"), document.querySelector(".promo-code-show-error").innerHTML = "<span>Something went wrong. Please try again!</span>"
}

function removeUserDiscount() {
    document.querySelector(".promo-code-apply-container").classList.remove("hidden"), document.querySelector(".promo-code-applied-container").classList.add("hidden");
    var a = document.querySelector(".trip-details .discount-container");
    a.remove(), revertAllThePrices()
}

function applyDiscountInformation(a, b) {
    var c = document.querySelector(".trip-details #payment-summary");
    document.querySelector(".promo-code-apply-container").classList.add("hidden"), document.querySelector(".promo-code-applied-container").classList.remove("hidden"), document.querySelector(".promo-code-show-error").classList.add("hidden"), document.querySelector(".voucher-code").innerHTML = "<span>".concat(b, "</span>");
    var d = "\n\t\t<section class=\"payment discount-container\">\n\t\t\t<div class=\"row discount\">\n\t\t\t\t<div>".concat(translations.payment.discountVoucher, "</div>\n\t\t\t\t<span class=\"price\">- ").concat(a.discount.symbol, " ").concat(formatAmount(a.discount.amount), "</span>\n\t\t\t</div>\n\t\t</div>\n\t");
    updateAllThePrices(a), c.insertAdjacentHTML("beforebegin", d)
}

function formatAmount(a) {
    if (0 == a) return "0";
    var b = a.toString(),
        c = b.substring(0, b.length - 2),
        d = b.substr(-2);
    return 0 == d ? c : "".concat(c, ".").concat(d)
}

function updateAllThePrices(a) {
    console.log(a, "RESPONSE");
    var b = document.querySelector(".promo-code").value,
        c = document.querySelector("#payment-option-full .price .value");
    if (a.deposit) {
        var f = document.querySelector("#payment-option-deposit .price .value");
        if (f) {
            var g = "<span class=\"value discounted-value\">".concat(a.deposit.symbol, " ").concat(formatAmount(a.deposit.amount), "</span>");
            f.classList.add("discounted"), f.insertAdjacentHTML("afterend", g)
        }
    }
    var d = document.querySelector("#voucher-code");
    d && d.remove();
    var e = "<input type=\"hidden\" value=\"".concat(b, "\" id=\"voucher-code\" name=\"voucher-code\" />");
    c && (c.classList.add("discounted"), c.insertAdjacentHTML("afterend", newTotalPrice)), document.body.insertAdjacentHTML("beforeend", e), adyenDropin.reInit()
}

function revertAllThePrices() {
    var a = document.querySelectorAll(".discounted"),
        b = document.querySelectorAll(".discounted-value");
    a.forEach(function(a) {
        a.classList.remove("discounted")
    }), b.forEach(function(a) {
        a.remove()
    })
}