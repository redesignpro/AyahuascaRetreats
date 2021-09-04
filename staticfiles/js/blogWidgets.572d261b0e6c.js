function getApiUrl(a) {
    var b = a.trim().replace("/all/", "/json/");
    return isLiveEnv || (b = b.replace("www", "w1")), b
}
$(function() {
    $(".blogWidget").each(function() {
        var a = $(this).text().split(",");
        switch (a[0]) {
            case "carousel":
                var b = $(this),
                    c = getApiUrl(a[1]);
                renderBlogWidgetList(b, c);
                break;
            case "youtube":
                var b = $(this);
                renderBlogWidgetYoutube(b);
        }
    })
}), $(function() {
    $(".blogs").each(function() {
        var a = $(this),
            b = $("#blog-post-id").val(),
            c = "/recommendations/blog-post/".concat(b);
        renderBlogWidgetRecommendations(a, c)
    })
});

function renderBlogWidgetCarousel(a, b) {
    $.ajax({
        type: "GET",
        url: b,
        dataType: "jsonp",
        data: {},
        async: !0,
        target: a,
        success: function success(b) {
            $(a).html("\n\t\t\t\t<div class=\"blogWidget__wrapper blogWidget__carousel\">\n\t\t\t\t\t<div class=\"blogWidget__title\">\n\t\t\t\t\t\t<h1>".concat(b.header1, "</h1>\n\t\t\t\t\t\t<p>").concat(b.header2, "</p>\n\t\t\t\t\t\t<div class=\"blogCarousel__navigation\">\n\t\t\t\t\t\t\t<div class=\"swiper-button--prev\"><i class=\"ebs-icon ebs-icon-arrow-left\"></i></div>\n\t\t\t\t\t\t\t<div class=\"swiper-button--next\"><i class=\"ebs-icon ebs-icon-arrow-right\"></i></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"blogWidget__content\">\n\t\t\t\t\t\t<div class=\"js-swiper swiper-container\">\n\t\t\t\t\t\t\t<div class=\"swiper-wrapper\">\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<a href=\"").concat(this.url.replace("json/", "all/"), "\" target=\"_blank\" class=\"blogCarousel__footer\">All ").concat(b.header1, " \u2192</a>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t"));
            var c = b.results;
            if ("undefined" != typeof c) {
                for (i = 0; i < c.length; i++) {
                    var d = "";
                    0 < c[i].nrInquiries && (d += "<div class=\"blogCarousel__overlayItem\">\n\t\t\t\t\t\t\t<i class=\"ebs-icon ebs-icon-t-thumbs-up\"></i>".concat(c[i].nrInquiriesTranslated, "\n\t\t\t\t\t\t</div>"));
                    $(a).find(".swiper-wrapper").append("\n\t\t\t\t\t\t<div class=\"swiper-slide\">\n\t\t\t\t\t\t\t<a class=\"blogCarousel__item\" href=\"".concat(c[i].href, "\" target=\"_blank\">\n\t\t\t\t\t\t\t\t<div class=\"blogCarousel__image\" style=\"background-image:url(").concat(c[i].images[0].extraLarge, ");\">\n\t\t\t\t\t\t\t\t\t<div class=\"blogCarousel__overlayWrapper\">").concat(d, "</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"blogCarousel__text\">\n\t\t\t\t\t\t\t\t\t<p class=\"blogCarousel__itemTitle\">").concat(c[i].title, "</p>\n\t\t\t\t\t\t\t\t\t<p class=\"blogCarousel__itemSubtitle\">").concat(c[i].availabilityShowcard, "</p>\n\t\t\t\t\t\t\t\t\t<div class=\"blogCarousel__itemPrice\">\n\t\t\t\t\t\t\t\t\t\t<span class=\"blogCarousel__itemPrice--prefix\">").concat(b.transTags.from, "</span>\n\t\t\t\t\t\t\t\t\t\t<span class=\"blogCarousel__itemPrice--number\">").concat(c[i].price.priceCurrency, "</span>\n\t\t\t\t\t\t\t\t\t\t<span class=\"blogCarousel__itemPrice--subtitle\">").concat(c[i].minPriceNrPersonsTranslated, ", ").concat(c[i].durationInDaysTranslated, "</p>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div class=\"blogCarousel__itemCta\">").concat(b.transTags.seedetails, "</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t"))
                }
                $(a).removeClass("hidden");
                var e = new Swiper($(a).find(".js-swiper")[0], {
                    loop: !0,
                    slidesPerView: 2.65,
                    slidesOffsetBefore: 30,
                    spaceBetween: 15,
                    autoplay: 1500,
                    breakpoints: {
                        768: {
                            slidesPerView: 1.25,
                            autoHeight: !0,
                            autoplay: 0
                        }
                    }
                });
                gae("blog", "widget__carousel--load"), $(a).find(".swiper-button--prev").click(function() {
                    gae("blog", "widget__carousel--prev"), e.slidePrev()
                }), $(a).find(".swiper-button--next").click(function() {
                    gae("blog", "widget__carousel--next"), e.slideNext()
                }), $(a).find(".blogCarousel__item").click(function() {
                    gae("blog", "widget__carousel--item")
                }), $(a).find(".blogCarousel__footer").click(function() {
                    gae("blog", "widget__carousel--footer")
                })
            }
        }
    })
}

function renderBlogWidgetList(a, b) {
    $.ajax({
        type: "GET",
        url: b,
        dataType: "jsonp",
        data: {},
        async: !0,
        target: a,
        success: function success(b) {
            $(a).html("\n\t\t\t\t<div class=\"blogWidget__wrapper blogWidget__list\">\n\t\t\t\t\t<div class=\"blogWidget__title\">\n\t\t\t\t\t\t<h2>".concat(b.header1, "</h2>\n\t\t\t\t\t\t<p>").concat(b.header2, "</p>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"blogWidget__content\">\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t"));
            var c = b.results,
                d = this.url.replace("/json/", "/all/").split("?")[0];
            if ("undefined" != typeof c) {
                for (i = 0; i < Math.min(c.length, 5); i++) {
                    var e = "";
                    e += 0 < c[i].nrInquiries ? "<i class=\"ebs-icon ebs-icon-t-thumbs-up\"></i>".concat(c[i].nrInquiriesTranslated) : "<i class=\"ebs-icon ebs-icon-calendar\"></i>".concat(c[i].availabilityShowcard);
                    $(a).find(".blogWidget__content").append("\n\t\t\t\t\t\t<a class=\"blogWidget__listItem\" href=\"".concat(c[i].href, "\" target=\"_blank\">\n\t\t\t\t\t\t\t<div class=\"blogWidget__listItemImage\" style=\"background-size:cover;background-image:url(").concat(c[i].images[0].medium, ");\">\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"blogWidget__listItemText\">\n\t\t\t\t\t\t\t\t<p class=\"blogWidget__listItemTitle\">").concat(c[i].title, "</p>\n\t\t\t\t\t\t\t\t<p class=\"blogWidget__listItemSubtitle\">").concat(e, "</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</a>\n\t\t\t\t\t"))
                }
                gae("blog", "widget__carousel--load"), $(a).find(".blogWidget__content").append("\n\t\t\t\t\t<a class=\"blogWidget__listCTA--more\">See More</a>\n\t\t\t\t\t<a href=\"".concat(d, "\" target=\"_blank\" class=\"blogWidget__listCTA--all\">See All</a>\n\t\t\t\t")), $(a).find(".blogWidget__listItem").click(function() {
                    gae("blog", "widget__list--item")
                }), $(a).find(".blogWidget__listCTA--more").click(function() {
                    gae("blog", "widget__list--more"), $(this).closest(".blogWidget__content").addClass("blogWidget__list--full")
                }), $(a).find(".blogWidget__listCTA--all").click(function() {
                    gae("blog", "widget__list--all")
                })
            }
            $(a).removeClass("hidden")
        }
    })
}

function renderBlogWidgetRecommendations(a, b) {
    var c = new Headers;
    c.set("X-Requested-With", "XMLHttpRequest"), c.set("Content-Type", "application/json");
    fetch(b, {
        method: "GET",
        headers: c
    }).then(function(a) {
        return a.json()
    }).then(function(b) {
        if (recommendations = b, 0 < recommendations.length) {
            for ($(a).html("\n\t\t\t\t\t<div class=\"blogWidget__wrapper blogWidget__list\">\n\t\t\t\t\t\t<div class=\"blogWidget__title\">\n\t\t\t\t\t\t\t<h2>Recommended for you</h2>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"blogWidget__content\">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t"), i = 0; i < Math.min(recommendations.length, 5); i++) avgReviewScore = 10 * recommendations[i].reviewScore, $(a).find(".blogWidget__content").append("\n\t\t\t\t\t\t<a class=\"blogWidget__listItem\" href=\"".concat(recommendations[i].listingUrl, "\" target=\"_blank\">\n\t\t\t\t\t\t\t<div class=\"blogWidget__listItemImage\" style=\"background-size:cover;background-image:url(").concat(recommendations[i].nonMobilePhotoUrl, ");\">\n\t\t\t\t\t\t\t<div class=\"blogWidget__overlay\">\n\t\t\t\t\t\t\t\t<div class=\"blogWidget__price\">From <span>").concat(recommendations[i].priceNoDecimalWithSymbol, "</span></div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"blogWidget__listItemText\">\n\t\t\t\t\t\t\t\t<p class=\"blogWidget__listItemTitle\">").concat(recommendations[i].listingTitle, "</p>\n\t\t\t\t\t\t\t\t<p class=\"star-visuals ").concat(0 >= avgReviewScore ? "hidden" : "", "\">\n\t\t\t\t\t\t\t\t\t<i class=\"ebs-icon ").concat(10 > avgReviewScore ? "ebs-icon-t-star-empty" : "", " ").concat(10 <= avgReviewScore && 20 > avgReviewScore ? "ebs-icon-t-star-half" : "", " ").concat(20 <= avgReviewScore ? "ebs-icon-t-star-full" : "", " \"></i>\n\t\t\t\t\t\t\t\t\t<i class=\"ebs-icon ").concat(30 > avgReviewScore ? "ebs-icon-t-star-empty" : "", " ").concat(30 <= avgReviewScore && 40 > avgReviewScore ? "ebs-icon-t-star-half" : "", " ").concat(40 <= avgReviewScore ? "ebs-icon-t-star-full" : "", " \"></i>\n\t\t\t\t\t\t\t\t\t<i class=\"ebs-icon ").concat(50 > avgReviewScore ? "ebs-icon-t-star-empty" : "", " ").concat(50 <= avgReviewScore && 60 > avgReviewScore ? "ebs-icon-t-star-half" : "", " ").concat(60 <= avgReviewScore ? "ebs-icon-t-star-full" : "", " \"></i>\n\t\t\t\t\t\t\t\t\t<i class=\"ebs-icon ").concat(70 > avgReviewScore ? "ebs-icon-t-star-empty" : "", " ").concat(70 <= avgReviewScore && 80 > avgReviewScore ? "ebs-icon-t-star-half" : "", " ").concat(80 <= avgReviewScore ? "ebs-icon-t-star-full" : "", " \"></i>\n\t\t\t\t\t\t\t\t\t<i class=\"ebs-icon ").concat(90 > avgReviewScore ? "ebs-icon-t-star-empty" : "", " ").concat(90 <= avgReviewScore && 100 > avgReviewScore ? "ebs-icon-t-star-half" : "", " ").concat(100 <= avgReviewScore ? "ebs-icon-t-star-full" : "", " \"></i>\n\t\t\t\t\t\t\t\t\t<span>&middot; ").concat(recommendations[i].reviewsCount, "</span>\n\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t\t<p class=\"star-visuals ").concat(0 < avgReviewScore ? "hidden" : "", "\">\n\t\t\t\t\t\t\t\t&nbsp;\n\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</a>\n\t\t\t\t\t"));
            gae("blog", "widget__carousel--load"), $(a).find(".blogWidget__content").append("\n\t\t\t\t\t<a class=\"blogWidget__listCTA--more\">See More</a>\n\t\t\t\t\t<a href=\"#\" target=\"_blank\" class=\"blogWidget__listCTA--all\">See All</a>\n\t\t\t\t"), $(a).find(".blogWidget__listItem").click(function() {
                gae("blog", "widget__list--item")
            }), $(a).find(".blogWidget__listCTA--more").click(function() {
                gae("blog", "widget__list--more"), $(this).closest(".blogWidget__content").addClass("blogWidget__list--full")
            }), $(a).find(".blogWidget__listCTA--all").click(function() {
                gae("blog", "widget__list--all")
            }), $(a).removeClass("hidden")
        }
    }).catch(function(a) {
        console.log(a)
    })
}

function renderBlogWidgetYoutube(a) {
    $(a).html("\n\t\t<a href=\"https://www.youtube.com/channel/UC4HQJ7OXagLueYEYxlZtq6Q?sub_confirmation=1\" target=\"_blank\" class=\"youtubeSubscription__wrapper js--youtubeSubscriptionTracker\">\n\t\t\t<div class=\"youtubeSubscription__logo\"></div>\n\t\t\t<div class=\"youtubeSubscription__title\">".concat(1024 <= $(window).width() ? "Subscribe to our Youtube channel" : "Subscribe", "</div>\n\t\t</a>\n\t\t<div class=\"mkt_blog_youtube_subscription_tracker\"></div>\n\t")), $(a).removeClass("hidden"), $(a).css("padding", "0px"), $(".js--youtubeSubscriptionTracker").click(function() {
        $(this).hasClass("js--youtubeSubscriptionTracker--active") || ($(this).addClass("js--youtubeSubscriptionTracker--active"), gae("blog", "youtubeSubscription--click"))
    })
}