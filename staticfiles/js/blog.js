$(function() {
    $(".featuredBlog__item").click(function() {
        gae("blog", "featured__click--" + $(this).attr("data-index"))
    })
}), $(function() {
    var a = $(".filter-dropdown-icon, .blog-post--filter .active");
    a.on("click", function() {
        $(".blog-post--filter").toggleClass("show-links")
    });
    var b = window.location.pathname,
        c = $(".blog-post--filter [href=\"".concat(b, "\"]"));
    0 < c.length && c.addClass("active")
});
var blogContent = function() {
    return document.addEventListener("DOMContentLoaded", function() {
        var a = document.querySelector(".blog-post--container"),
            b = document.querySelector("#isBlogSubscribeModal") || "",
            c = 0,
            d = 0;
        "" != b && (c = parseInt(b.value), d = parseInt(document.querySelector("#blog-site-id").value)), 7 == d && a && 1 == c && !sessionStorage.getItem("blog-modal-shown") && blogContent.launchBlogSubscribeModal()
    }), document.addEventListener("click", function(a) {
        a.target.classList.contains("blog-subscribe-to-newsletter-submit") && blogContent.subscribeToNewsletter()
    }), {
        launchBlogSubscribeModal: function launchBlogSubscribeModal() {
            setTimeout(function() {
                modals.create(translations.newsletter.signupNewsletter, blogContent.createBlogSubscribeModalBody(), "", "center"), sessionStorage.setItem("blog-modal-shown", !0)
            }, 5e3)
        },
        createBlogSubscribeModalBody: function createBlogSubscribeModalBody() {
            var a = document.querySelector("#blog-site-privacy-url").value,
                b = "<section class=\"blog-subscribe-modal-container\">\n\t\t\t\t\t\t\t<div class=\"blog-subscribe-modal-hero-container\">\n\t\t\t\t\t\t\t\t<img src=\"/static/files/blog-subscribe-modal-hero.jpg\" class=\"blog-subscribe-modal-hero\"/>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"blog-subscribe-modal-content\">\n\t\t\t\t\t\t\t\t<h3 class=\"blog-subscribe-modal-content-heading\">".concat(translations.newsletter.getWellnessGuide, "</h3>\n\t\t\t\t\t\t\t\t<p class=\"blog-subscribe-modal-content-subheading\">").concat(translations.newsletter.subscribeNewsletterSubheading, "</p>\n\t\t\t\t\t\t\t\t<div class=\"blog-subscribe-modal-content-form\">\n\t\t\t\t\t\t\t\t\t<div class=\"blog-subscribe-modal-content-form-container\">\n\t\t\t\t\t\t\t\t\t\t<input data-source=\"footer\" class=\"form-control required\" name=\"email\" size=\"30\" type=\"email\" placeholder=\"name@example.com\" id=\"blog-subscribe-to-newsletter\" />\n\t\t\t\t\t\t\t\t\t\t<p class=\"blog-subscribe-error\"></p>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<button class=\"bttn -regular -block bttn-submit has-loader has-loader--light blog-subscribe-to-newsletter-submit\">\n\t\t\t\t\t\t\t\t\t\t<span class=\"default-value\">\n\t\t\t\t\t\t\t\t\t\t\t").concat(translations.newsletter.subscribeNewsletter, "\n\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t\t<span class=\"loader\">\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"spinner\">\n\t\t\t\t\t\t\t\t\t\t\t\t<svg width=\"18\" height=\"16\" viewbox=\"0 0 18 16\" xmlns=\"http://www.w3.org/2000/svg\" class=\"bounce bounce1\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<path d=\"M.035 5.645c-.344 3.11 1.84 8.322 7.776 9.47 3.017.589 7.015-.223 9.002-4.342C23.338-2.817.87-2.397.035 5.645z\" fill=\"#02BF9B\" fill-rule=\"nonzero\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t</path>\n\t\t\t\t\t\t\t\t\t\t\t\t</svg>\n\n\t\t\t\t\t\t\t\t\t\t\t\t<svg width=\"18\" height=\"17\" viewbox=\"0 0 18 16\" xmlns=\"http://www.w3.org/2000/svg\" class=\"bounce bounce2\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<path d=\"M15.643 2.777A8.172 8.172 0 0 0 12.707.703C7.61-1.48 1.765 1.736.333 6.025c-.035.105-.067.21-.096.316-.561 2.033-.135 4.253 1.372 6.066 1.802 2.168 4.765 3.471 7.601 3.613 3.924.196 7.457-1.079 8.504-4.38.79-2.49-.105-6.65-2.071-8.863z\" fill=\"#02A5E8\" fill-rule=\"nonzero\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t</path>\n\t\t\t\t\t\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t\t\t\t\t\t\t<svg width=\"18\" height=\"18\" viewbox=\"0 0 18 18\" xmlns=\"http://www.w3.org/2000/svg\" class=\"bounce bounce3\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<path d=\"M10.215.437C5.117.437-2.205 5.263.634 11.088c2.839 5.825 12.92 8.488 15.732 2.996C19.112 8.718 19.204.437 10.215.437z\" fill=\"#FF9B35\" fill-rule=\"nonzero\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t</path>\n\t\t\t\t\t\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<p class=\"blog-subscribe-modal-content-privacy-policy\">").concat(translations.newsletter.newsletterPrivacy, "<a target=\"_blank\" href=\"").concat(a, "\"> ").concat(translations.newsletter.privacyPolicy, "</a></p>\n\t\t\t\t\t\t\t\t<div class=\"blog-subscribe-success hidden\"></div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</section>");
            return b
        },
        subscribeToNewsletter: function subscribeToNewsletter() {
            var a = document.querySelector(".blog-subscribe-modal-content-form"),
                b = document.querySelector("#blog-subscribe-to-newsletter"),
                c = document.querySelector(".blog-subscribe-to-newsletter-submit");
            c.classList.add("is-loading");
            var d = b.value,
                e = document.querySelector(".blog-subscribe-error"),
                f = document.querySelector(".blog-subscribe-success"),
                g = document.querySelector(".blog-subscribe-modal-content-privacy-policy"),
                h = document.querySelector("#blog-site-id").value;
            if ("" == d || !validation.isValidEmail(d)) return e.innerHTML = "Please enter a valid email address", b.classList.add("error"), void c.classList.remove("is-loading");
            var i = {
                    credentials: "same-origin",
                    method: "POST",
                    body: JSON.stringify({
                        email: d,
                        source: "blog_modal"
                    }),
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    }
                },
                j = "".concat(h, "/api/subscribers/");
            fetch(j, i).then(function(a) {
                if (a.ok && 200 == a.status) return a.json();
                throw a
            }).then(function(d) {
                d ? (e.innerHTML = "", b.classList.remove("error"), a.classList.add("hidden"), g.classList.add("hidden"), f.classList.remove("hidden"), f.innerHTML = "Please go to your inbox and click the confirmation link we just emailed you.") : (f.innerHTML = "", a.classList.remove("hidden"), g.classList.remove("hidden"), f.classList.add("hidden"), e.innerHTML = "Oops! Sorry, something went wrong. Please try again.", b.classList.remove("error")), c.classList.remove("is-loading")
            }).catch(function(a) {
                a.text().then(function(a) {
                    c.classList.remove("is-loading"), b.classList.add("error"), e.innerHTML = "\"Already subscribed\"" == a ? "The email address is already subscribed to our mailing list" : "Oops! Sorry, something went wrong. Please try again."
                })
            })
        }
    }
}();
$(document).ready(function() {
    initPagination(), setInterval(function() {
        $(".js-blog-page.active img.js--lazy-src[data-lazy-src]").each(function() {
            var a = this,
                b = $(a).offset().top - 400,
                c = $(a).offset().top + $(a).outerHeight() + 400,
                d = $(window).scrollTop() + window.innerHeight,
                e = $(window).scrollTop();
            d > b && e < c && ($(a).attr("src", $(a).attr("data-lazy-src")), $(a).removeAttr("data-lazy-src"))
        })
    }, 250)
});

function initPagination() {
    function a() {
        var a = 700 > c.outerWidth(),
            b = $(".js-pagination-nav").removeClass("around-active around-active-far-left around-active-far-right"),
            d = b.filter(".active");
        return a ? (d.nextAll().slice(0, 2).addClass("around-active"), void d.prevAll().slice(0, 1).addClass("around-active")) : void(d.nextAll().slice(0, 5).addClass("around-active"), d.prevAll().slice(0, 2).addClass("around-active"), 7 < b.index(d) && (b.slice(0, 2).addClass("around-active"), b.slice(1, 2).addClass("around-active-far-left")), 5 < b.length - b.index(d) && (b.slice(-2).addClass("around-active"), b.slice(-2, -1).addClass("around-active-far-right")))
    }
    var b = $(window.document.body),
        c = $(window),
        d = $(".js-blog-page-element");
    if (!(0 >= d.length)) {
        for (var e = $(".js-blog-page-element").parent(), f = 24, d = $(".js-blog-page-element"), g = $(".js-blog-page-element").length, h = Math.ceil(g / f), j = 0; j < d.length; j += f) d.slice(j, j + f).wrapAll("<div class='js-blog-page'></div>");
        if ($(".js-blog-page").each(function(a) {
                0 == a ? $(this).addClass("active").attr("data-page", a + 1) : ($(this).hide(), $(this).attr("data-page", a + 1))
            }), c.resize(a), 1 < h) {
            for (var k = "<div class=\"blog-pagination\"><div class=\"blog-pagination--container\">", l = $(".js-blog-page.active").parent(), j = 1; j <= h; j++) k += 1 == j ? "<a href=\"#\" onclick=\"gae('blog-list','pagination');\" class=\"js-pagination-nav active\" data-page=\"" + j + "\">" + j + "</a>" : "<a href=\"#\" onclick=\"gae('blog-list','pagination');\" class=\"js-pagination-nav\" data-page=\"" + j + "\">" + j + "</a>";
            k += "</div></div>", l.append(k), a(), l.find(".blog-pagination--container").prepend("<div class=\"page-arrow page-down\"><svg width=\"100%\" height=\"100%\" viewBox=\"0 0 12 18\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xml:space=\"preserve\" style=\"fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;\">\n\t\t\t<g transform=\"matrix(0.895348,0,0,0.895348,0.00143967,0.00155625)\">\n\t\t\t\t<path d=\"M11.2,8.8C11.2,8.5 11,8.2 10.8,7.9L2.6,0.4C2,-0.1 1.138,-0.137 0.482,0.43C-0.045,0.885 -0.2,1.8 0.4,2.3L7.7,9L0.5,15.6C-0.1,16.1 -0.046,17.028 0.5,17.5C1.199,18.104 2.1,18 2.7,17.5L10.9,10C11.2,9.7 11.3,9.2 11.2,8.8Z\" style=\"fill-rule:nonzero;\"/>\n\t\t\t</g>\n\t\t</svg></div>\n\t\t").append("<div class=\"page-arrow page-up\"><svg width=\"100%\" height=\"100%\" viewBox=\"0 0 12 18\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xml:space=\"preserve\" style=\"fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;\">\n\t\t\t<g transform=\"matrix(0.895348,0,0,0.895348,0.00143967,0.00155625)\">\n\t\t\t\t<path d=\"M11.2,8.8C11.2,8.5 11,8.2 10.8,7.9L2.6,0.4C2,-0.1 1.138,-0.137 0.482,0.43C-0.045,0.885 -0.2,1.8 0.4,2.3L7.7,9L0.5,15.6C-0.1,16.1 -0.046,17.028 0.5,17.5C1.199,18.104 2.1,18 2.7,17.5L10.9,10C11.2,9.7 11.3,9.2 11.2,8.8Z\" style=\"fill-rule:nonzero;\"/>\n\t\t\t</g>\n\t\t</svg>\n\t\t"), b.on("click", ".page-arrow", function() {
                var a = b.find(".js-pagination-nav.active")[$(this).hasClass("page-up") ? "next" : "prev"](".js-pagination-nav");
                a.length && a.click()
            })
        }
        b.on("click", ".js-pagination-nav", function() {
            var b = $(this).data("page"),
                c = e.find("[data-page=" + b + "]"),
                d = $(".js-blog-page--top").offset().top - 30;
            return $(".js-pagination-nav.active").removeClass("active"), $(".js-blog-page").each(function() {
                $(this).removeClass("active").hide(), c.addClass("active").show()
            }), a(), $("html, body").animate({
                scrollTop: d
            }, 0), !1
        })
    }
}