(function() {
    function a() {
        var a = document.querySelector("[data-inquiry]").dataset.inquiry;
        fetch("/json/inquiry/".concat(a, "/voucher"), {
            credentials: "same-origin",
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        }).then(function(a) {
            if (!a.ok) throw new Error(a.status);
            return a.json()
        }).then(function(a) {
            b(a)
        }).catch(function() {
            c.classList.remove("lazy-load")
        })
    }

    function b(a) {
        var b = currency.format(a[0].customer_price.amount, a[0].customer_price.currency),
            d = JSON.parse(sessionStorage.getItem("voucher")),
            e = a[0].code,
            f = d.filter(function(a) {
                return a.code == e
            }),
            g = f[0].id,
            h = document.querySelector(".trip-details .total-price"),
            i = document.querySelector("#payment_paid_deposit").value,
            j = document.querySelector("#is_with_markup").value,
            k = JSON.parse(sessionStorage.getItem("payment")),
            l = "",
            m = document.querySelector(".payment .due-now .price"),
            n = "",
            o = document.querySelector(".trip-details .total-price .price span"),
            p = document.querySelector("#payment_total_price").value,
            q = p.split(" ")[0];
        n = "true" == j ? "ADD" : "";
        var r = new Promise(function(a) {
            a(currency.convertAndFormat(parseInt(k.deposit), CURRENCY_LISTING, CURRENCY, n))
        });
        if (r.then(function(a) {
                m.innerHTML = a
            }), "true" == j) {
            var t = new Promise(function(a) {
                a(currency.convertAndFormat(parseInt(q), CURRENCY_LISTING, CURRENCY, n))
            });
            t.then(function(a) {
                o.innerHTML = a
            })
        }
        var s = "/json/vouchers/filter/metadata/voucher?limit=100&reference_id=".concat(g);
        fetch(s, {
            credentials: "same-origin",
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        }).then(function(a) {
            if (a.ok && 200 == a.status) return a.json();
            if (!a.ok) throw "Something went wrong"
        }).then(function(a) {
            var d = "";
            if (0 < a.length) {
                var e = currency.format(a[0].amount, a[0].currency, "EN", !1);
                d = "<div style=\"margin-top:8px; font-size: 14px;\">".concat(translations.vouchers.voucherOverflowText1, " ").concat(e, " ").concat(translations.vouchers.voucherOverflowText2, "</div>")
            }
            l = "\n\t\t\t\t<section class=\"payment discount-container\">\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t<div>".concat(translations.payment.amountPaid, "</div>\n\t\t\t\t\t\t<span class=\"price\">").concat(i, "</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"row discount\">\n\t\t\t\t\t\t<div>").concat(translations.payment.discountVoucher, "</div>\n\t\t\t\t\t\t<span class=\"price\">- ").concat(b, "</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t").concat(d, "\n\t\t\t\t</div>\n\t\t\t"), h.insertAdjacentHTML("beforebegin", l), c.classList.remove("lazy-load")
        }).catch(function(a) {
            loader.destroy(), console.log(a), c.classList.remove("lazy-load")
        })
    }
    var c = document.querySelector(".trip-details");
    document.addEventListener("DOMContentLoaded", function() {
        var b = document.querySelector(".conversion-layout.confirmation");
        b && (CURRENCY = document.querySelector(".currency-option.selected").dataset.currencyCode, CURRENCY_LISTING = document.querySelector("#listing_currency").value, a())
    })
})();
$(function() {
    function a(a, b) {
        c(), b ? (a.removeClass("error"), a.addClass("success")) : (a.removeClass("success"), a.addClass("error")), d()
    }

    function b() {
        var a = document.querySelector(".save-succesful");
        a.classList.add("show")
    }

    function c() {
        var a = document.querySelector(".save-succesful");
        a.classList.remove("show")
    }

    function d() {
        var a = document.querySelector("#save-profile"),
            b = document.querySelectorAll(".error").length;
        a.setAttribute("disabled", "disabled"), 0 == b && a.removeAttribute("disabled", "disabled")
    }

    function e() {
        location.reload(!0)
    }

    function f() {
        var a = $("#birthdate-day").val(),
            b = $("#birthdate-month").val(),
            c = $("#birthdate-year").val(),
            d = "".concat(c).concat(b).concat(a);
        return 0 != a && 10 > a && (a = "0" + a), 0 != b && 10 > b && (b = "0" + b), d = "".concat(c).concat(b).concat(a), d
    }

    function g(a) {
        var b = document.querySelector(".date-validation");
        8 === a.length || 0 == a ? b.classList.remove("error") : b.classList.add("error")
    }
    var h = document.querySelector("#form-profile");
    h && document.addEventListener("focusout", function(a) {
        a.target.matches("#form-profile .simple-validation .form-control") && validation.simpleValidation(a.target, ".simple-validation")
    }), $(".js-about").keyup(function() {
        var a = $(this).val().length,
            b = $(".character-count .current"),
            c = $(".character-count");
        b.text(a), 150 >= a && c.css("color", "#7C8086"), 150 < a && c.css("color", "#FABC42"), 180 < a && c.css("color", "#E63C15")
    }), $(".has-changed").each(function() {
        $validationElement = $(this), $validationChild = $validationElement.find(".form-control");
        var a = $validationChild.val();
        $validationChild.change(function(b) {
            return function() {
                $(this).val() == a ? b.removeClass("it-changed") : b.addClass("it-changed")
            }
        }($validationElement))
    }), $(".js-gender").on("change", function() {
        "custom" == $(this).val() ? ($(".js-gender-text").show(), $(this).hasClass("js-do-not-validate") ? $(this).parents(".form-group").removeClass("success, error") : "" == $(".js-gender-text").val() ? a($(this).parents(".form-group"), !1) : a($(this).parents(".form-group"), !0)) : ($(".js-gender-text").val(""), $(".js-gender-text").hide(), $(this).addClass("js-do-not-validate"), a($(this).parents(".form-group"), !0))
    }), $(".js-gender-text").on("change, blur", function() {
        $(".js-do-not-validate").removeClass("js-do-not-validate"), "" == $(this).val() ? a($(this).parents(".form-group"), !1) : a($(this).parents(".form-group"), !0)
    }), $(".js-interests").length && $(".js-interests").select2({
        allowClear: !0,
        placeholder: interestsPlaceholder,
        sorter: function sorter(a) {
            return a.sort(function(c, a) {
                return c.text < a.text ? -1 : c.text > a.text ? 1 : 0
            })
        }
    }), $("#save-profile").on("click", function() {
        if (c(), g(f()), $(".form-group.error")[0]) return !1;
        $(this).prop("disabled", !0);
        var a = document.querySelector(".profile-content .bttn-submit");
        a.classList.add("is-loading");
        var d = document.querySelector("#csrfToken").value,
            h = "custom" == $(".js-gender").val() ? $(".js-gender-text").val() : $(".js-gender").val(),
            i = {
                first_name: $(".js-firstname").val(),
                last_name: $(".js-lastname").val(),
                gender: h,
                birth_date: f(),
                language_id: $(".js-language").val(),
                currency_id: $(".js-currency").val(),
                country_id: $(".js-country").val(),
                about: $(".js-about").val()
            },
            j = {
                credentials: "same-origin",
                method: "POST",
                body: JSON.stringify(i),
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "X-CSRF-Token": d
                }
            },
            k = $(".js-interests").val() || [],
            l = {
                credentials: "same-origin",
                method: "POST",
                body: JSON.stringify({
                    interests: k
                }),
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "X-CSRF-Token": d
                }
            },
            m = fetch("/customer/json/profile", j).then(function(a) {
                return a.json()
            }),
            n = fetch("/customer/json/interests", l).then(function(a) {
                return a.json()
            }),
            o = {
                profileRequest: {},
                interestsRequest: {}
            };
        return Promise.all([m, n]).then(function(c) {
            o.profileRequest = c[0], o.interestsRequest = c[1], 1 == o.profileRequest && 1 == o.interestsRequest ? $(".form-group.it-changed")[0] ? e() : setTimeout(function() {
                var c = $(".save-succesful").text();
                $("#save-profile").prop("disabled", !1), validation.clear(), b(), toast.info(c, {
                    icon: "ebs-icon-check-rounded-stroked",
                    delay: 5e3
                }, toast.fade), a.classList.remove("is-loading"), $("html, body").animate({
                    scrollTop: 0
                }, 500)
            }, 1e3) : console.log(o)
        }), !1
    }), $("#remove-photo").on("click", function(a) {
        if (a.preventDefault(), window.confirm(removeProfilePictureWarningMessage)) {
            $(this).prop("disabled", !0);
            var b = document.querySelector("#remove-photo");
            b.classList.add("is-loading");
            return fetch("/customer/json/remove-photo", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            }).then(function() {
                e()
            }), !1
        }
        return !1
    })
});
(function() {
    function a(a) {
        var b = a.value;
        validation.setValidation(c.checkLengthElement, validation.isMinimalLength(b, c.minimalPasswordLength)), validation.setValidation(c.checkNumberElement, validation.containsNumbers(b)), validation.setValidation(c.checkUppercaseElement, validation.containsUppercaseCharacters(b)), validation.setValidation(c.checkLowercaseElement, validation.containsLowercaseCharacters(b))
    }
    if (document.addEventListener("focusout", function(a) {
            a.target.matches("#form-new-password .simple-validation .form-control") && validation.simpleValidation(a.target, ".simple-validation"), a.target.matches("#form-add-password-to-signup .password-validation .form-control") && validation.isPasswordValid(a.target, ".password-validation")
        }), document.addEventListener("keyup", function(b) {
            b.target.matches("#new-password") && 2 < b.target.value.length && a(b.target)
        }), document.addEventListener("keyup", function(b) {
            b.target.matches("#new-password-add") && 2 < b.target.value.length && a(b.target)
        }), document.addEventListener("keyup", function(b) {
            b.target.matches("#creation-password") && 2 < b.target.value.length && a(b.target)
        }), null !== document.querySelector("#form-new-password")) var b = document.querySelector("#form-new-password");
    else if (null !== document.querySelector("#form-add-password")) var b = document.querySelector("#form-add-password");
    else if (null !== document.querySelector("#form-add-password-to-signup")) var b = document.querySelector("#form-add-password-to-signup");
    if (void 0 !== b && null !== document.querySelector(".password-validation")) var c = function() {
        return {
            minimalPasswordLength: 8,
            checkLengthElement: b.querySelector(".password-validation .check-length"),
            checkNumberElement: b.querySelector(".password-validation .check-number"),
            checkUppercaseElement: b.querySelector(".password-validation .check-uppercase"),
            checkLowercaseElement: b.querySelector(".password-validation .check-lowercase")
        }
    }();
    $(".disconnect-social").on("click", function(a) {
        var b = a.target.dataset.csrfToken,
            c = {
                email: $(this).next("input").val(),
                type: $(this).next("input").attr("name")
            },
            d = {
                credentials: "same-origin",
                method: "POST",
                body: JSON.stringify(c),
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "X-CSRF-Token": b
                }
            };
        this.disabled = !0, fetch("/account/auth/disconnect", d).then(function(a) {
            200 == a.status && location.reload()
        }).catch(function(a) {
            console.error("Error:", a), this.disabled = !1
        })
    }), null !== b && void 0 !== b && b.addEventListener("submit", function(a) {
        var b = this,
            c = "#" + b.getAttribute("id"),
            d = "";
        if (a.preventDefault(), validation.hasFormErrors(c)) return !1;
        var e = document.querySelector(".js-submit-password"),
            f = b.querySelector(".js-error");
        e.classList.add("is-loading"), f.classList.remove("active");
        var g = b.querySelector("#csrfToken").value;
        if ("form-new-password" == b.getAttribute("id")) {
            d = "/account/auth/change-password";
            var h = {
                "current-password": b.querySelector("#current-password").value,
                "new-password": b.querySelector("#new-password").value
            }
        } else if ("form-add-password" == b.getAttribute("id")) {
            d = "/account/auth/add-password";
            var h = {
                password: b.querySelector("#new-password-add").value,
                "confirm-password": b.querySelector("#confirm-password").value
            };
            if (!1 == validation.containsSameValue(h.password, h["confirm-password"])) return f.classList.add("active"), f.innerHTML = "Passwords do not match", e.classList.remove("is-loading"), !1
        } else if ("form-add-password-to-signup" == b.getAttribute("id")) {
            var j = getUrlParameter("token");
            d = "/account/auth/signup?token=" + j;
            var h = {
                password: b.querySelector("#creation-password").value,
                pageType: b.querySelector("#add-password-page-type").value
            }
        }
        var i = {
            credentials: "same-origin",
            method: "POST",
            body: JSON.stringify(h),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "X-CSRF-Token": g
            }
        };
        fetch(d, i).then(function(a) {
            return a.json()
        }).then(function(a) {
            setTimeout(function() {
                if (e.classList.remove("is-loading"), "ok" == a.status) {
                    if ("form-new-password" == b.getAttribute("id")) {
                        var i = function() {
                            c[0].classList.remove("success"), c[0] && i()
                        };
                        toast.info(passwordUpdated, {
                            icon: "ebs-icon-check-rounded-stroked",
                            delay: 5e3
                        }, toast.fade);
                        var c = document.getElementsByClassName("success");
                        i()
                    } else if ("form-add-password" == b.getAttribute("id")) toast.info(passwordAdded, {
                        icon: "ebs-icon-check-rounded-stroked",
                        delay: 5e3
                    }, toast.fade), window.location.reload();
                    else if ("form-add-password-to-signup" == b.getAttribute("id")) {
                        var d = document.querySelector(".sign-up-promotion .text-area"),
                            g = document.querySelector("#form-add-password-to-signup .form-split"),
                            h = document.querySelector("#form-add-password-to-signup .js-success");
                        d && (d.style.display = "none"), g.style.display = "none", h.style.display = "block", b.style.marginTop = "0", window.location.reload()
                    }
                    b.reset()
                } else f.classList.add("active"), f.innerHTML = a.error
            }, 1e3), $("html, body").animate({
                scrollTop: 0
            }, 500)
        }).catch(function(a) {
            console.error("Error:", a)
        })
    })
})();