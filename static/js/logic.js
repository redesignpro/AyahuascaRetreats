function applyUserDiscount() {
  event.preventDefault();
  var a = document.querySelector(".promo-code").value;
  if ("" == a) return !1;
  var b = event.target,
    c = getUrlParameter("token");
  if ((b.classList.add("is-loading"), c))
    var d = {
      token: c,
      voucher: a,
    };
  else
    var e = document.querySelector("#organizer-slug").value,
      f = document.querySelector("#listing-slug").value,
      d = {
        voucher: a,
        organizer_slug: e,
        listing_slug: f,
        package_id: +getUrlParameter("package_id"),
        arrival_date: getUrlParameter("arrival_date"),
        language_id: 3,
        site_id: 2,
      };
  var g = {
    credentials: "same-origin",
    method: "POST",
    body: JSON.stringify(d),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  fetch("/json/voucher/apply", g)
    .then(function (a) {
      return a.json();
    })
    .then(function (c) {
      b.classList.remove("is-loading");
      var d = c.valid;
      d ? applyDiscountInformation(c, a) : errorWithDiscount(c);
    })
    .catch(function (a) {
      console.error("Broken:", a),
        document
          .querySelector(".promo-code-show-error")
          .classList.remove("hidden"),
        (document.querySelector(".promo-code-show-error").innerHTML =
          "<span>".concat(a.result, "</span>")),
        document
          .querySelector(".customer-promo-container")
          .classList.remove("has-spinner");
    });
}

function errorWithDiscount() {
  document.querySelector(".promo-code-show-error").classList.remove("hidden"),
    (document.querySelector(".promo-code-show-error").innerHTML =
      "<span>Something went wrong. Please try again!</span>");
}

function removeUserDiscount() {
  document
    .querySelector(".promo-code-apply-container")
    .classList.remove("hidden"),
    document
      .querySelector(".promo-code-applied-container")
      .classList.add("hidden");
  var a = document.querySelector(".trip-details .discount-container");
  a.remove(), revertAllThePrices();
}

function applyDiscountInformation(a, b) {
  var c = document.querySelector(".trip-details #payment-summary");
  document.querySelector(".promo-code-apply-container").classList.add("hidden"),
    document
      .querySelector(".promo-code-applied-container")
      .classList.remove("hidden"),
    document.querySelector(".promo-code-show-error").classList.add("hidden"),
    (document.querySelector(".voucher-code").innerHTML = "<span>".concat(
      b,
      "</span>"
    ));
  var d =
    '\n\t\t<section class="payment discount-container">\n\t\t\t<div class="row discount">\n\t\t\t\t<div>'
      .concat(
        translations.payment.discountVoucher,
        '</div>\n\t\t\t\t<span class="price">- '
      )
      .concat(a.discount.symbol, " ")
      .concat(
        formatAmount(a.discount.amount),
        "</span>\n\t\t\t</div>\n\t\t</div>\n\t"
      );
  updateAllThePrices(a), c.insertAdjacentHTML("beforebegin", d);
}

function formatAmount(a) {
  if (0 == a) return "0";
  var b = a.toString(),
    c = b.substring(0, b.length - 2),
    d = b.substr(-2);
  return 0 == d ? c : "".concat(c, ".").concat(d);
}

function updateAllThePrices(a) {
  console.log(a, "RESPONSE");
  var b = document.querySelector(".promo-code").value,
    c = document.querySelector("#payment-option-full .price .value");
  if (a.deposit) {
    var f = document.querySelector("#payment-option-deposit .price .value");
    if (f) {
      var g = '<span class="value discounted-value">'
        .concat(a.deposit.symbol, " ")
        .concat(formatAmount(a.deposit.amount), "</span>");
      f.classList.add("discounted"), f.insertAdjacentHTML("afterend", g);
    }
  }
  var d = document.querySelector("#voucher-code");
  d && d.remove();
  var e = '<input type="hidden" value="'.concat(
    b,
    '" id="voucher-code" name="voucher-code" />'
  );
  c &&
    (c.classList.add("discounted"),
    c.insertAdjacentHTML("afterend", newTotalPrice)),
    document.body.insertAdjacentHTML("beforeend", e),
    adyenDropin.reInit();
}

function revertAllThePrices() {
  var a = document.querySelectorAll(".discounted"),
    b = document.querySelectorAll(".discounted-value");
  a.forEach(function (a) {
    a.classList.remove("discounted");
  }),
    b.forEach(function (a) {
      a.remove();
    });
}
(function () {
  var a = document.querySelector(".developer-tools-trigger"),
    b = document.querySelector(".developer-tools");
  b &&
    a.addEventListener("click", function () {
      b.classList.contains("tools-active")
        ? b.classList.remove("tools-active")
        : b.classList.add("tools-active");
    });
  $("#bisection-sympton-found-buttoun").on("click", function () {
    var a = window.location.search;
    (a = removeQueryStringParameter(a, "_exp_bisect")),
      (a = addQueryStringParameter(a, "_exp_bisect", "1")),
      (window.location.search = decodeURIComponent(a));
  }),
    $("#bisection-sympton-not-found-buttoun").on("click", function () {
      var a = window.location.search;
      (a = removeQueryStringParameter(a, "_exp_bisect")),
        (a = addQueryStringParameter(a, "_exp_bisect", "0")),
        (window.location.search = decodeURIComponent(a));
    });
})();

function expsDropDownChange() {
  var a = window.location.search,
    b = $("#dev-tools-exp-drop-down").val();
  (a = removeQueryStringParameter(a, b)),
    (a = addQueryStringParameter(a, b, "1")),
    (window.location.search = decodeURIComponent(a));
}

function _toConsumableArray(a) {
  return (
    _arrayWithoutHoles(a) ||
    _iterableToArray(a) ||
    _unsupportedIterableToArray(a) ||
    _nonIterableSpread()
  );
}

function _nonIterableSpread() {
  throw new TypeError(
    "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
  );
}

function _unsupportedIterableToArray(a, b) {
  if (a) {
    if ("string" == typeof a) return _arrayLikeToArray(a, b);
    var c = Object.prototype.toString.call(a).slice(8, -1);
    return (
      "Object" === c && a.constructor && (c = a.constructor.name),
      "Map" === c || "Set" === c
        ? Array.from(a)
        : "Arguments" === c ||
          /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c)
        ? _arrayLikeToArray(a, b)
        : void 0
    );
  }
}

function _iterableToArray(a) {
  if (
    ("undefined" != typeof Symbol && null != a[Symbol.iterator]) ||
    null != a["@@iterator"]
  )
    return Array.from(a);
}

function _arrayWithoutHoles(a) {
  if (Array.isArray(a)) return _arrayLikeToArray(a);
}

function _arrayLikeToArray(a, b) {
  (null == b || b > a.length) && (b = a.length);
  for (var c = 0, d = Array(b); c < b; c++) d[c] = a[c];
  return d;
}

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
(function () {
  function a() {
    (SHOW_ALL_REVIEWS = !0),
      (document.querySelector("#reviews-ll-wrapper").innerHTML = ""),
      q();
    var a = document.getElementById("reviews");
    a.scrollIntoView();
  }

  function b(a) {
    a || (a = s);
    var b = a.getBoundingClientRect(),
      c = Math.max(document.documentElement.clientHeight, window.innerHeight);
    return !(0 > b.bottom || 0 <= b.top - c);
  }
//removed
  // function c(a) {
  //   return a.replace(/[&<>"'\/]/g, function (a) {
  //     return {
  //       "&": "&amp;",
  //       "<": "&lt;",
  //       ">": "&gt;",
  //       '"': "&quot;",
  //       "'": "&#39;",
  //       "/": "&#x2F;",
  //     }[a];
  //   });
  // }

  function d(a) {
    return a && !!a.length;
  }

  function e(a, b) {
    return "" === b
      ? reviewsTransTags.review_by_customer.replace(
          "REVIEWER",
          "<b>".concat(a, "</b>")
        )
      : reviewsTransTags.review_by_customer_from_country_customer
          .replace("CUSTOMER", "<b>".concat(a, "</b>"))
          .replace("COUNTRY", b);
  }

  function f(a, b) {
    return "" === b
      ? "".concat(reviewsTransTags.review_by_customer, " <b>").concat(a, "</b>")
      : reviewsTransTags.review_by_customer_from_country_customer
          .replace("CUSTOMER", "<b>".concat(a, "</b>"))
          .replace("COUNTRY", b);
  }

  function g(a, b, c) {
    return a
      ? reviewsTransTags.review_by_customer_from_country_anonymous
      : e(b, c);
  }

  function h(a, b, c) {
    return a
      ? reviewsTransTags.review_by_customer_from_country_anonymous
      : f(b, c);
  }

  function i(a) {
    return (
      (a = 10 < a ? a / 10 : a),
      x
        .find(function (b, c) {
          return c + 2 > a;
        })
        .join("")
    );
  }

  function j(a) {
    return y.ratings(a.scores);
  }

  function k(a, b, c) {
    return "1" == IS_EXP_RUNNING
      ? SHOW_ALL_REVIEWS
        ? b && 0 < b.length
          ? y.rebrandSection(a, b.map(c).join(""))
          : null
        : b
        ? y.rebrandSection(a, c(b))
        : null
      : b && 0 < b.length
      ? y.rebrandSection(a, b.map(c).join(""))
      : null;
  }

  function l(a) {
    return y.review(a);
  }

  function m(a) {
    return y.testimonial(a);
  }

  function n(a, b) {
    return k(a, b, l);
  }

  function o(a, b) {
    return k(a, b, m);
  }

  function p(a, b) {
    "1" == IS_EXP_RUNNING
      ? !0 == SHOW_ALL_REVIEWS
        ? $("#reviews-ll-wrapper").append(
            n(reviewsTransTags.verified_site_reviews, a.newOrganizerReviews),
            o(reviewsTransTags.verified_site_reviews, a.reviewsByOurSite),
            o(reviewsTransTags.testimonials, a.reviewsByOthers)
          )
        : $("#reviews-ll-wrapper").append(
            n(reviewsTransTags.verified_site_reviews, a.newOrganizerReviews[0]),
            '<div class="show-all-reviews-wrapper">\n                        <hr />\n                        <button\n                            id="show-all-reviews"\n                            class="bttn -outline -block -xlarge">View all reviews\n                        </button>\n                    </div>'
          )
      : $("#reviews-ll-wrapper").append(
          n(reviewsTransTags.verified_site_reviews, a.newOrganizerReviews),
          o(reviewsTransTags.verified_site_reviews, a.reviewsByOurSite),
          o(reviewsTransTags.testimonials, a.reviewsByOthers)
        ),
      (s.innerHTML = ""),
      "function" == typeof b && b();
  }

  function q(a) {
    gae("lazyloading", "lp_review_init"),
      "object" === _typeof(window.reviewsData)
        ? p(window.reviewsData, a)
        : $.ajax({
            type: "GET",
            url: "".concat(window.location.pathname, "/json/reviews/"),
            async: !0,
          }).done(function (b) {
            p(b, a);
          });
  }

  function r(a, c, d) {
    b(a) ||
      (d(),
      setTimeout(function () {
        r(a, c, d);
      }, c));
  }
  var s = document.getElementById("reviews-ll-marker"),
    t = document.querySelector("#show-all-reviews-exp"),
    u = document.querySelector("#listing-page-reviews-exp"),
    v = "0";
  "" != t && null != t && (IS_EXP_RUNNING = t.value),
    null !== u && (v = u.value),
    document.addEventListener("click", function (b) {
      "show-all-reviews" == b.target.id && a();
    }),
    (SHOW_ALL_REVIEWS = !1);
  var w = {
      empty: '<i class="ebs-icon ebs-icon-t-star-empty"></i>',
      half: '<i class="ebs-icon ebs-icon-t-star-half"></i>',
      full: '<i class="ebs-icon ebs-icon-t-star-full"></i>',
    },
    x = [
      [w.half, w.empty, w.empty, w.empty, w.empty],
      [w.full, w.empty, w.empty, w.empty, w.empty],
      [w.full, w.half, w.empty, w.empty, w.empty],
      [w.full, w.full, w.empty, w.empty, w.empty],
      [w.full, w.full, w.half, w.empty, w.empty],
      [w.full, w.full, w.full, w.empty, w.empty],
      [w.full, w.full, w.full, w.half, w.empty],
      [w.full, w.full, w.full, w.full, w.empty],
      [w.full, w.full, w.full, w.full, w.half],
      [w.full, w.full, w.full, w.full, w.full],
    ],
    y = {
      rebrandSection: function rebrandSection(a, b) {
        return '\n            <div class="section">\n                <h2 class="title">'
          .concat(a, "</h2>\n                ")
          .concat(b, "\n            </div>\n        ");
      },
      section: function section(a, b) {
        return '\n            <div class="reviews-section split-exp-fix border-box">\n                <h4 class="reviews_section_title">'
          .concat(
            a,
            '</h4>\n                <div class="lp-reviews-container">\n                    <div class="list-unstyled">\n                        <div class="reviews-organizer">\n                            '
          )
          .concat(
            b,
            "\n                        </div>\n                    </div>\n                </div>\n            </div>\n        "
          );
      },
      row: function row(a, b) {
        return '\n            <tr>\n                <td class="review__thumbs">\n                    <i class="ebs-icon ebs-icon-t-'
          .concat(
            b,
            '"></i>\n                </td>\n                <td>\n                    '
          )
          .concat(c(a), "\n                </td>\n            </tr>\n        ");
      },
      ratings: function ratings(a) {
        return '\n\n            <table class="review__ratings">\n                '.concat(
          Object.keys(a)
            .map(function (b) {
              return 0 < a[b] ? y.rating(reviewsTransTags[b], i(a[b])) : "";
            })
            .join(""),
          "\n\n            </table>\n\n        "
        );
      },
      rating: function rating(a, b) {
        return "\n            <tr>\n                <td>"
          .concat(a, "</td>\n                <td>")
          .concat(b, "</td>\n            </tr>\n        ");
      },
      reviewHighlight: function reviewHighlight(a) {
        return '\n            <tr>\n                <td></td>\n                <td><h3 class="title review__highlight">"'.concat(
          c(a),
          '"</h3></td>\n            </tr>\n        '
        );
      },
      organizerReply: function organizerReply(a, b) {
        return '\n            <div class="subtitle review__organizer-reply-title">'
          .concat(
            a,
            ':</div>\n            <div class="review__organizer-reply">'
          )
          .concat(c(b), "</div>\n        ");
      },
      review: function review(a) {
        return '\n            <div class="review">\n                <div class="review__credit review__credit--review">\n                    '
          .concat(
            g(a.isAnonymous, a.customerName, a.countryName),
            '\n                </div>\n                <div class="review__date">\n                    '
          )
          .concat(
            a.createdDate,
            '\n                </div>\n                <table class="review__table">\n                    <tbody>\n\n                        '
          )
          .concat(
            d(a.reviewHighlight) ? y.reviewHighlight(a.reviewHighlight) : "",
            "\n                        "
          )
          .concat(
            d(a.reviewTextPros) ? y.row(a.reviewTextPros, "thumbs-up") : "",
            "\n                        "
          )
          .concat(
            d(a.reviewTextCons) ? y.row(a.reviewTextCons, "thumbs-down") : "",
            '\n\n                        <tr>\n                            <td class="review__empty"></td>\n                            <td>'
          )
          .concat(
            j(a),
            "</td>\n                        </tr>\n\n                    </tbody>\n                </table>\n\n                "
          )
          .concat(
            d(a.organizerReply)
              ? y.organizerReply(
                  reviewsTransTags.organizer_response,
                  a.organizerReply
                )
              : "",
            "\n\n            </div>\n        "
          );
      },
      testimonial: function testimonial(a) {
        return '\n            <div class="review">\n                <div class="review__credit review__credit--testimonial review__credit--test">\n                    '
          .concat(
            h("" === a.reviewer, a.reviewer, a.from),
            '\n                </div>\n                <div class="review__text">\n                    '
          )
          .concat(
            c(a.reviewText),
            '\n                </div>\n                <div class="review__source">\n                    ~ '
          )
          .concat(
            c(a.source),
            "\n                </div>\n            </div>\n        "
          );
      },
    };
  "0" == v &&
    (-1 !== window.location.href.indexOf("#reviews") && s
      ? q(function () {
          $(window).on("load", function () {
            var a = document.getElementById("reviews");
            a &&
              r(a, 16, function () {
                a.scrollIntoView();
              });
          });
        })
      : s &&
        (q.interval = setInterval(function () {
          b() && (clearInterval(q.interval), q());
        }, 300)));
})();
var listingReviews = (function () {
  var a = Math.floor;
  return (
    document.addEventListener("DOMContentLoaded", function () {
      var a = document.querySelector(".listing-page-reviews");
      a &&
        ((window.REVIEWS_OFFSET = 0),
        (window.TOTAL_REVIEWS = 0),
        (window.REVIEWS_LIMIT = 12),
        (window.LISTING_COUNT = 0),
        listingReviews.fetchAllReviews(!1, 2, window.REVIEWS_OFFSET));
    }),
    document.addEventListener("click", function (a) {
      var b = document.querySelector(".listing-page-reviews");
      if ("show-all-listing-reviews" == a.target.id) {
        modals.create(
          translations.allReviews,
          listingReviews.createReviewsModalBody()
        );
        var c = document.querySelector(".modal-backdrop-light"),
          d = c.nextElementSibling,
          e = d.querySelector(".adaptive-modal-content");
        (e.style.position = "relative"),
          loader.create(e, !0),
          listingReviews.fetchAllReviews(!0, 12),
          gae("listing-page-reviews", "view_all_reviews");
      }
      if (
        (a.target.classList.contains("show-more-cta-reviews") &&
          listingReviews.showMoreReviews(a.target),
        "load-more-listing-reviews" == a.target.id)
      ) {
        var f = document.querySelector(".modal-backdrop-light"),
          g = f.nextElementSibling,
          h = g.querySelector(
            ".adaptive-modal-content .listing-reviews-load-more"
          );
        (h.style.position = "relative"),
          loader.create(h, !0),
          listingReviews.fetchAllReviews(
            !0,
            window.REVIEWS_LIMIT,
            window.REVIEWS_OFFSET
          ),
          gae(
            "listing-page-reviews",
            "load_more_reviews_".concat(12 * window.REVIEWS_OFFSET)
          );
      }
      b &&
        a.target.classList.contains("close") &&
        (listingReviews.closeReviews(), modals.destroy(a.target));
    }),
    {
      setAvatarInitials: function setAvatarInitials(a) {
        var b = a
          .match(/(^\S\S?|\b\S)?/g)
          .join("")
          .match(/(^\S|\S$)?/g)
          .join("")
          .toUpperCase();
        return b;
      },
      abbreviateLastName: function abbreviateLastName(a) {
        var b = a.trim().split(" ");
        return "".concat(b[0], " ").concat(b[1].charAt(0));
      },
      fetchAllReviews: function fetchAllReviews(a, b) {
        var c = document.querySelector("#listing-reviews-reference-code").value,
          d = document.querySelector("#listing-reviews-csrfToken").value,
          e = REVIEWS_OFFSET * b,
          f = {
            credentials: "same-origin",
            method: "POST",
            body: JSON.stringify({
              reference_code: c,
              limit: b,
              offset: e,
            }),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "X-CSRF-Token": d,
              "X-Requested-With": "XMLHttpRequest",
            },
          };
        fetch("/listing/json/reviews", f)
          .then(function (a) {
            return a.json();
          })
          .then(function (b) {
            var c = b.nrReviews;
            if (((TOTAL_REVIEWS = c), 0 < c)) {
              document.querySelector(".total-reviews-count").innerHTML =
                "(".concat(c, ")");
              var d = b.reviews;
              listingReviews.renderReviews(a, d, b.organizerProfilePhoto);
            } else document.querySelector(".listing-page-reviews").classList.add("hidden");
          })
          .catch(function (a) {
            console.log(a);
          });
      },
      setStarRating: function setStarRating(b) {
        var c = 5 * (b / 100),
          d = a(c),
          e = a(5 - c),
          f = !1;
        f = 0 !== c - d;
        var g = "",
          h = _toConsumableArray(Array(d)).map(function () {
            return 1;
          });
        if (
          (h.map(function () {
            g +=
              '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12"><path d="M11.572 4.27l-3.54-.514L6.448.548a.521.521 0 00-.9 0l-1.58 3.208-3.54.514a.5.5 0 00-.277.853l2.562 2.5-.606 3.526a.5.5 0 00.726.527L6 10.008l3.167 1.665a.488.488 0 00.232.057.5.5 0 00.494-.584L9.287 7.62l2.562-2.5a.5.5 0 00-.277-.853z" fill="#02a5e8"/></svg>';
          }),
          f &&
            (g +=
              '<svg width="12" height="12" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path d="M5.552.536L3.968 3.744l-3.54.514a.5.5 0 00-.277.853l2.562 2.5-.606 3.526a.5.5 0 00.726.527L6 10V.281a.488.488 0 00-.448.255z" fill="#02A5E8"/><path d="M6.448.536l1.584 3.208 3.54.514a.5.5 0 01.277.853l-2.562 2.5.606 3.526a.5.5 0 01-.726.527L6 10V.281a.488.488 0 01.448.255z" fill="#D9D9D9"/></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h12v12H0z"/></clipPath></defs></svg>'),
          0 < e)
        ) {
          var i = _toConsumableArray(Array(e)).map(function () {
            return 0;
          });
          i.map(function () {
            g +=
              '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12"><path d="M11.572 4.27l-3.54-.514L6.448.548a.521.521 0 00-.9 0l-1.58 3.208-3.54.514a.5.5 0 00-.277.853l2.562 2.5-.606 3.526a.5.5 0 00.726.527L6 10.008l3.167 1.665a.488.488 0 00.232.057.5.5 0 00.494-.584L9.287 7.62l2.562-2.5a.5.5 0 00-.277-.853z" fill="#d9d9d9"/></svg>';
          });
        }
        return g;
      },
      renderReviews: function renderReviews(b, c, d) {
        var e = "";
        if (b) {
          e = document.querySelector("#modal .listing-reviews-container");
          var f = a(TOTAL_REVIEWS / REVIEWS_LIMIT),
            g = document.querySelector(".listing-reviews-load-more");
          f == window.REVIEWS_OFFSET || f < window.REVIEWS_OFFSET
            ? g.classList.add("hidden")
            : (window.REVIEWS_OFFSET += 1);
        } else e = document.querySelector(".listing-reviews-container");
        var h = document.querySelector("#listing-reviews-listing-title").value,
          i = e.innerHTML;
        c.forEach(function (a) {
          var b = 10 * a.scores.overallImpression,
            c = a.organizerReply,
            e = a.isAnonymous,
            f = "";
          (f = e
            ? '<div class="listing-review-avatar-anonymous">\n                                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">\n                                            <path d="M20.0002 0.833252C9.431 0.833252 0.833496 9.43159 0.833496 19.9999C0.833496\n                                            30.5683 9.431 39.1666 20.0002 39.1666C30.5693 39.1666 39.1668 30.5683 39.1668 19.9999C39.1668\n                                            9.43159 30.5693 0.833252 20.0002 0.833252ZM20.0002 37.4999C15.581 37.4999 11.551 35.8408 8.46766\n                                            33.1291C9.00766 29.9508 11.1535 28.8124 14.1668 27.8083C15.9585 27.2108 16.8193 25.7224 17.2452\n                                            24.3991C14.9393 23.3499 13.3335 21.0316 13.3335 18.3333V16.6666C13.3335 12.9849 16.3185 9.99992\n                                            20.0002 9.99992C23.6818 9.99992 26.6668 12.9849 26.6668 16.6666V18.3333C26.6668 21.0308 25.061 23.3491\n                                            22.756 24.3983C23.1852 25.7233 24.0493 27.2133 25.8335 27.8074C28.8468 28.8116 30.9893 29.9533 31.5285\n                                            33.1316C28.446 35.8416 24.4177 37.4999 20.0002 37.4999Z" fill="#969AA1"/>\n                                        </svg>\n                                    </div>'
            : '<div class="listing-review-avatar initials"><div class="listing-review-avatar__initials-container">'.concat(
                listingReviews.setAvatarInitials(a.customerName),
                "</div></div>"
              )),
            (i +=
              '<div class="listing-review">\n                                        <div class="listing-review-header">\n                                            '
                .concat(
                  f,
                  '\n                                            <div class="listing-review-details">\n                                                <div class="listing-review-name">'
                )
                .concat(
                  e
                    ? "Anonymous"
                    : listingReviews.abbreviateLastName(a.customerName),
                  '</div>\n                                                <div class="listing-review-date">'
                )
                .concat(
                  a.createdDate,
                  '</div>\n                                            </div>\n                                            <div class="listing-review-star-rating" data-tippy data-template="popover-listing-ratings" onmouseover="listingReviews.setListingReviewBreakdownEvent()" onmouseleave="listingReviews.removeListingReviewBreakdownEvent()">\n                                                '
                )
                .concat(
                  listingReviews.setStarRating(b),
                  '\n                                                <span class="listing-review-star-caret">\n                                                    <svg width="11" height="6" viewBox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg">\n                                                        <path d="M9.79785 1L5.79785 5L1.79785 1" stroke="#202224" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n                                                    </svg>\n                                                </span>\n                                            </div>\n                                            <div class="tippy-popper" role="tooltip" style="display: none;">\n                                                <div class="tippy-content popover-listing-ratings">\n                                                    <div class="popover-listing-ratings-content"><span>Value for money</span> <div class="popover-listing-ratings__stars">'
                )
                .concat(
                  listingReviews.setStarRating(10 * a.scores.valueForMoney),
                  '</div></div>\n                                                    <div class="popover-listing-ratings-content"><span>Accomodation & facilities</span> <div class="popover-listing-ratings__stars">'
                )
                .concat(
                  listingReviews.setStarRating(
                    10 * a.scores.accommodationAndFacilities
                  ),
                  '</div></div>\n                                                    <div class="popover-listing-ratings-content"><span>Food</span> <div class="popover-listing-ratings__stars">'
                )
                .concat(
                  listingReviews.setStarRating(10 * a.scores.food),
                  '</div></div>\n                                                    <div class="popover-listing-ratings-content"><span>Location</span> <div class="popover-listing-ratings__stars">'
                )
                .concat(
                  listingReviews.setStarRating(10 * a.scores.location),
                  '</div></div>\n                                                    <div class="popover-listing-ratings-content"><span>Activity quality</span> <div class="popover-listing-ratings__stars">'
                )
                .concat(
                  listingReviews.setStarRating(10 * a.scores.qualityOfActivity),
                  '</div></div>\n                                                </div>\n                                            </div>\n                                        </div>\n                                        <div class="listing-review-body">\n                                            '
                )
                .concat(
                  "" == a.reviewHighlight
                    ? ""
                    : '<div class="listing-review-title">'.concat(
                        a.reviewHighlight,
                        "</div>"
                      ),
                  '\n                                            <div class="listing-review-location">Went to '
                )
                .concat(
                  h,
                  '</div>\n                                            <div class="listing-review-content" '
                )
                .concat(
                  "" != a.reviewTextPros && 150 < a.reviewTextPros.length
                    ? 'data-showmore-limit="250" data-showmore-text="Read more"'
                    : "",
                  ">\n                                                "
                )
                .concat(
                  "" == a.reviewTextPros
                    ? ""
                    : '<img src="/static/files/review-positive.png" alt="Positive review"/> '.concat(
                        a.reviewTextPros
                      ),
                  "\n                                                "
                )
                .concat(
                  "" == a.reviewTextCons
                    ? ""
                    : '<br/><br/><img src="/static/files/review-negative.png" alt="Negative review" class="listing-negative-review"/> '.concat(
                        a.reviewTextCons
                      ),
                  "\n                                            </div>\n                                            "
                )
                .concat(
                  "" == c
                    ? ""
                    : '<div class="listing-review-organizer-response">\n                                                                            <div class="listing-review-organizer-response-header">\n                                                                                <div class="listing-review-organizer-response-avatar">\n\n                                                                                '
                        .concat(
                          "" == d
                            ? '<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">\n                                                                                  <path d="M20.0002 0.833252C9.431 0.833252 0.833496 9.43159 0.833496 19.9999C0.833496 30.5683 9.431 39.1666 20.0002 39.1666C30.5693 39.1666 39.1668 30.5683 39.1668 19.9999C39.1668 9.43159 30.5693 0.833252 20.0002 0.833252ZM20.0002 37.4999C15.581 37.4999 11.551 35.8408 8.46766 33.1291C9.00766 29.9508 11.1535 28.8124 14.1668 27.8083C15.9585 27.2108 16.8193 25.7224 17.2452 24.3991C14.9393 23.3499 13.3335 21.0316 13.3335 18.3333V16.6666C13.3335 12.9849 16.3185 9.99992 20.0002 9.99992C23.6818 9.99992 26.6668 12.9849 26.6668 16.6666V18.3333C26.6668 21.0308 25.061 23.3491 22.756 24.3983C23.1852 25.7233 24.0493 27.2133 25.8335 27.8074C28.8468 28.8116 30.9893 29.9533 31.5285 33.1316C28.446 35.8416 24.4177 37.4999 20.0002 37.4999Z" fill="#969AA1"/>\n                                                                                  </svg>'
                            : '<img src="'.concat(
                                d,
                                '" alt="Organizer profile picture"/>'
                              ),
                          '\n                                                                                </div>\n                                                                                <div class="listing-review-organizer-response-name">Response from the organizer</div>\n                                                                            </div>\n                                                                            <div class="listing-review-organizer-response-body">'
                        )
                        .concat(
                          c,
                          "</div>\n                                                                        </div>"
                        ),
                  "\n                                        </div>\n                                    </div>\n                                    "
                ));
        }),
          (e.innerHTML = i),
          listingReviews.truncateReviews(b),
          tippy("[data-tippy]", {
            content: function content(a) {
              var b = a.nextElementSibling;
              return b.innerHTML;
            },
            trigger: "mouseenter",
            placement: "bottom",
            arrow: !1,
            theme: "tripaneer",
          }),
          loader.destroy();
      },
      truncateReviews: function truncateReviews(a) {
        var b = "";
        if (
          ((b = a
            ? document.querySelectorAll(
                "#modal .listing-review [data-showmore-limit]"
              )
            : document.querySelectorAll(
                ".listing-review [data-showmore-limit]"
              )),
          b.length)
        ) {
          b.forEach(function (a) {
            var b = a.dataset.showmoreLimit,
              c = a.dataset.showmoreText ? a.dataset.showmoreText : "Show More",
              d = a.innerHTML;
            d = d.replace(/\s+/g, " ");
            var e = "";
            d.length > b &&
              -1 == d.indexOf("show-content-visible") &&
              ((e = "<div class='show-content-visible'> "
                .concat(d.substring(0, b))
                .concat(
                  "...",
                  "\n                                    <span class='show-more-cta-reviews'>"
                )
                .concat(
                  c,
                  "</span>\n                                </div>\n                                <div class='show-content-hidden'>"
                )
                .concat(d, "</div>")),
              (a.innerHTML = e));
          });
        }
      },
      showMoreReviews: function showMoreReviews(a) {
        (a.closest(".show-content-visible").style.display = "none"),
          (a.parentElement.nextElementSibling.style.display = "block"),
          gae("listing-page-reviews", "read_more");
      },
      closeReviews: function closeReviews() {
        (window.REVIEWS_OFFSET = 0),
          (window.TOTAL_REVIEWS = 0),
          (window.REVIEWS_LIMIT = 12),
          document
            .querySelector(".listing-reviews-load-more")
            .classList.remove("hidden");
      },
      createReviewsModalBody: function createReviewsModalBody() {
        var a =
          '<div class="listing-reviews-container"></div>\n                        <div class="listing-reviews-load-more">\n                            <a id="load-more-listing-reviews" class="has-loader has-loader--light has-loader--medium bttn -outline -block -xlarge">\n                                <span class="default-value">'.concat(
            translations.loadMore,
            '</span>\n                                <span class="loader">\n                                    {{& components/_spinner.html }}\n                                </span>\n                            </a>\n                        </div>'
          );
        return a;
      },
      setListingReviewBreakdownEvent:
        function setListingReviewBreakdownEvent() {
          0 == window.LISTING_COUNT &&
            (gae("listing-page-reviews", "review_breakdown_open"),
            (window.LISTING_COUNT = 1));
        },
      removeListingReviewBreakdownEvent:
        function removeListingReviewBreakdownEvent() {
          gae("listing-page-reviews", "review_breakdown_closed"),
            (window.LISTING_COUNT = 0);
        },
    }
  );
})();
var modals = (function () {
  return {
    create: function create(a, b, c) {
      modals.createOverlay(), (document.body.style.overflowY = "hidden");
      var d =
        '\n\t\t\t\t<div id="modal" class="adaptive-modal shadow--large" role="modal" aria-hidden="false">\n\t\t\t\t\t'
          .concat(modals.createHeader(a), "\n\t\t\t\t\t")
          .concat(modals.createBody(b), "\n\t\t\t\t\t")
          .concat(modals.createFooter(c), "\n\t\t\t\t</div>\n\t\t\t");
      document.body.insertAdjacentHTML("beforeend", d),
        document.addEventListener("keyup", modals.handleEscape);
    },
    createOverlay: function createOverlay() {
      document.body.insertAdjacentHTML(
        "beforeend",
        '<div class="modal-backdrop-light in"></div>'
      );
    },
    createHeader: function createHeader(a) {
      var b =
        '\n\t\t\t\t<header>\n\t\t\t\t\t<div class="action-left">&nbsp;</div>\n\t\t\t\t\t<h2 class="title">'.concat(
          a,
          '</h2>\n\n\t\t\t\t\t<div class="action-right">\n\t\t\t\t\t\t<button class="close" aria-label="close">\n\t\t\t\t\t\t\t<span aria-hidden="true">\n\t\t\t\t\t\t\t\t<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">\n\t\t\t\t\t\t\t\t\t<path d="M16 1.61714L14.3829 0L8 6.38286L1.61714 0L0 1.61714L6.38286 8L0 14.3829L1.61714 16L8 9.61714L14.3829 16L16 14.3829L9.61714 8L16 1.61714Z" fill="black"/>\n\t\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t</button>\n\t\t\t\t\t</div>\n\t\t\t\t</header>\n\t\t\t'
        );
      return b;
    },
    createFooter: function createFooter() {
      var a =
        0 < arguments.length && arguments[0] !== void 0 ? arguments[0] : "";
      if ("" != a) {
        var b = "\n\t\t\t\t\t<footer>\n\t\t\t\t\t\t".concat(
          a,
          "\n\t\t\t\t\t</footer>\n\t\t\t\t"
        );
        return b;
      }
      return "";
    },
    createBody: function createBody(a) {
      var b =
        '\n\t\t\t\t<main class="adaptive-modal-content">\n\t\t\t\t\t'.concat(
          a,
          "\n\t\t\t\t</main>\n\t\t\t"
        );
      return b;
    },
    open: function open() {
      modals.create();
    },
    close: function close() {
      var a = document.querySelector(".modal");
      a.classList.add("hidden");
    },
    destroy: function destroy(a) {
      var b,
        c = document.querySelector(".modal-backdrop-light");
      (b = a
        ? a.classList.contains("modal-backdrop-light")
          ? a.nextElementSibling
          : a.closest(".adaptive-modal")
        : c.nextElementSibling),
        null !== b && null !== c && (b.remove(), c.remove()),
        (document.body.style.overflowY = "auto");
    },
    handleEscape: function handleEscape(a) {
      "Escape" == a.key && modals.destroy();
    },
    load: function load() {},
  };
})();
var vouchers = (function () {
  return (
    document.addEventListener("DOMContentLoaded", function () {
      IS_WITH_MARKUP = document.querySelector("#is_with_markup") || "";
      var a = document.querySelector("#vouchers-container");
      if (a)
        if (
          ((CURRENCY = document.querySelector(".currency-option.selected")
            .dataset.currencyCode),
          (CURRENCY_LISTING =
            document.querySelector("#listing_currency").value),
          sessionStorage.removeItem("paymentAmount"),
          vouchers.data.payment.set(),
          document.body.classList.contains("logged-in"))
        )
          vouchers.get();
        else {
          var b = document.querySelector(
            "#vouchers-container .vouchers-holder"
          );
          vouchers.renderLogin(b);
        }
    }),
    document.addEventListener("click", function (a) {
      if (
        (a.target.classList.contains("voucher") &&
          a.target.classList.contains("valid") &&
          !1 == a.target.classList.contains("not-verified") &&
          vouchers.select(a.target),
        (a.target.classList.contains("modal-backdrop-light") ||
          a.target.classList.contains("close")) &&
          modals.destroy(a.target),
        a.target.classList.contains("apply-voucher") &&
          vouchers.apply(a.target.dataset.voucher, a),
        a.target.classList.contains("remove"))
      ) {
        var b = a.target.parentNode;
        vouchers.remove(b);
      }
    }),
    {
      get: function get() {
        var a = document.querySelector("#vouchers-container .vouchers-holder");
        loader.create(a, !0);
        fetch("/json/vouchers/all", {
          credentials: "same-origin",
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
          },
        })
          .then(function (b) {
            switch (b.status) {
              case 200: {
                return b.json();
              }
              case 401: {
                vouchers.renderLogin(a);
                break;
              }
            }
          })
          .then(function (b) {
            if (b && 0 < b.length) {
              var c = b.map(function (a) {
                  var b = new Date().valueOf(),
                    c = new Date(a.end).valueOf(),
                    d = new Date(a.start).valueOf();
                  if (
                    d < b &&
                    c > b &&
                    !1 == a.isConsumed &&
                    "0001-01-01T00:00:00" == a.redemption.paidAt &&
                    "0001-01-01T00:00:00" == a.cancelledAt &&
                    "" != IS_WITH_MARKUP
                  ) {
                    var e = IS_WITH_MARKUP.value;
                    if ("true" == e) {
                      var f = new Promise(function (b) {
                        b(
                          currency.convertAndFormat(
                            a.amount,
                            a.currency,
                            CURRENCY,
                            !1
                          )
                        );
                      });
                      return f
                        .then(function (b) {
                          return (a.to = b), a;
                        })
                        .catch(function (a) {
                          console.log(a);
                        });
                    }
                    return a;
                  }
                }),
                d = Promise.all(c);
              d.then(function (b) {
                var c = b.filter(function (a) {
                  return a;
                });
                0 < c.length
                  ? (vouchers.data.voucher.set(c), vouchers.render(c, a))
                  : vouchers.renderEmpty(a);
              }).catch(function (a) {
                console.log(a);
              });
            } else vouchers.renderEmpty(a);
          })
          .catch(function (a) {
            console.log(a);
          });
      },
      render: function render(a, b) {
        loader.destroy();
        var c = document.querySelector("[data-customer-verified]").dataset
            .customerVerified,
          d = "true" == c,
          e = "";
        a.forEach(function (a) {
          if (a) {
            var b = currency.format(a.amount, a.currency, "EN", !0);
            a.to && (b = a.to);
            var c = '\n\t\t\t\t<div class="card voucher '
              .concat(!0 == d ? "valid" : "not-verified", '" data-voucher="')
              .concat(a.id, '" data-voucher-amount="')
              .concat(a.amount, '" data-voucher-currency="')
              .concat(
                a.currency,
                '">\n\t\t\t\t\t<div class="icon-holder">\n\t\t\t\t\t\t<svg class="icon icon-voucher" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n\t\t\t\t\t\t\t<path d="M23 5.00067H20.605C20.846 4.52426 20.9808 4.00123 21 3.46767C20.9653 2.52443 20.5615 1.63254 19.8757 0.984079C19.1898 0.33562 18.2767 -0.0175341 17.333 0.000670438C16.2089 0.0490853 15.1191 0.401827 14.1799 1.02124C13.2406 1.64066 12.4872 2.5035 12 3.51767C11.518 2.50634 10.7703 1.64495 9.83685 1.0255C8.90337 0.406057 7.81914 0.0518334 6.7 0.000670438C6.662 0.000670438 6.624 0.000670438 6.586 0.000670438C5.6558 0.00216011 4.7624 0.36425 4.09365 1.01081C3.42489 1.65738 3.03287 2.53805 3 3.46767V3.53367C3.01951 4.04421 3.14878 4.54456 3.379 5.00067H1C0.734784 5.00067 0.48043 5.10603 0.292893 5.29356C0.105357 5.4811 0 5.73545 0 6.00067L0 9.00067C0 9.26589 0.105357 9.52024 0.292893 9.70778C0.48043 9.89531 0.734784 10.0007 1 10.0007H23C23.2652 10.0007 23.5196 9.89531 23.7071 9.70778C23.8946 9.52024 24 9.26589 24 9.00067V6.00067C24 5.73545 23.8946 5.4811 23.7071 5.29356C23.5196 5.10603 23.2652 5.00067 23 5.00067ZM17.364 2.00067C17.7724 1.99007 18.1695 2.13614 18.4737 2.40891C18.7779 2.68168 18.9662 3.06049 19 3.46767C18.9858 3.87699 18.8141 4.26501 18.5206 4.55067C18.2271 4.83634 17.8346 4.99756 17.425 5.00067H13.478C14.1 3.74167 15.337 2.00067 17.364 2.00067ZM5 3.50067C5.0256 3.09146 5.20732 2.7077 5.50765 2.42857C5.80799 2.14945 6.20401 1.99628 6.614 2.00067C8.683 2.00867 9.895 3.73167 10.524 5.00067H6.624C6.21339 5.00376 5.81701 4.85043 5.51537 4.57182C5.21373 4.29322 5.02946 3.91023 5 3.50067Z" fill="#02BF9B"/>\n\t\t\t\t\t\t\t<path d="M14 12.001V24.001H19C19.7956 24.001 20.5587 23.6849 21.1213 23.1223C21.6839 22.5597 22 21.7966 22 21.001V12.001H14Z" fill="#02BF9B"/>\n\t\t\t\t\t\t\t<path d="M10 12.001H2V21.001C2 21.7966 2.31607 22.5597 2.87868 23.1223C3.44129 23.6849 4.20435 24.001 5 24.001H10V12.001Z" fill="#02BF9B"/>\n\t\t\t\t\t\t</svg>\n\n\t\t\t\t\t\t<svg class="icon icon-applied" width="15" height="10" viewBox="0 0 15 10" fill="none" xmlns="http://www.w3.org/2000/svg">\n\t\t\t\t\t\t\t<path d="M1.12207 5L5.13493 9L13.1607 1" stroke="#02BF9B" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n\t\t\t\t\t\t</svg>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div class="information">\n\t\t\t\t\t\t<h3>'
              )
              .concat(b, " ")
              .concat(
                translations.vouchers.voucher,
                '</h3>\n\t\t\t\t\t\t<div class="status-container">\n\t\t\t\t\t\t\t<p class="valid-until">'
              )
              .concat(translations.vouchers.validUntil, " ")
              .concat(
                vouchers.formatDate(a.end),
                '</p>\n\t\t\t\t\t\t\t<strong class="applied-status">'
              )
              .concat(
                translations.vouchers.applied,
                "</strong>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t"
              );
            e += c;
          }
        }),
          vouchers.insert(e, b),
          !1 === d &&
            b.insertAdjacentHTML("beforebegin", vouchers.verifyBubble());
      },
      renderEmpty: function renderEmpty(a) {
        var b = translations.vouchers.noVouchersOnThisAccount,
          c =
            '\n\t\t\t\t<div class="voucher muted">\n\t\t\t\t\t<div class="icon-holder">'
              .concat(
                '<svg width="18" height="24" viewBox="0 0 18 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n\t\t\t\t<path d="M17.25 0H0.75C0.551088 0 0.360322 0.0790176 0.21967 0.21967C0.0790178 0.360322 0 0.551088 0 0.75V23.6077L3 21.75L6 23.25L9 21.75L12 23.25L15 21.75L18 23.6077V0.75C18 0.551088 17.921 0.360322 17.7803 0.21967C17.6397 0.0790176 17.4489 0 17.25 0V0ZM9.75 17.25H3V15.75H9.75V17.25ZM9.75 13.5H3V12H9.75V13.5ZM9 9C8.40666 9 7.82664 8.82405 7.33329 8.49441C6.83994 8.16476 6.45542 7.69623 6.22836 7.14805C6.0013 6.59987 5.94189 5.99667 6.05764 5.41473C6.1734 4.83279 6.45912 4.29824 6.87868 3.87868C7.29824 3.45912 7.83279 3.1734 8.41473 3.05764C8.99667 2.94189 9.59987 3.0013 10.1481 3.22836C10.6962 3.45542 11.1648 3.83994 11.4944 4.33329C11.8241 4.82664 12 5.40666 12 6C12 6.79565 11.6839 7.55871 11.1213 8.12132C10.5587 8.68393 9.79565 9 9 9ZM15 17.25H12V15.75H15V17.25ZM15 13.5H12V12H15V13.5Z" fill="#7C8086"/>\n\t\t\t</svg>',
                '</div>\n\t\t\t\t\t<div class="information">'
              )
              .concat(b, "</div>\n\t\t\t\t</div>\n\t\t\t");
        vouchers.insert(c, a);
      },
      renderLogin: function renderLogin(a) {
        var b =
            '<p class="not-logged-in-discount"><a href="#plt-login-modal" data-toggle="modal">'
              .concat(translations.vouchers.logIn, "</a> ")
              .concat(translations.vouchers.toApplyVoucher, "</p>"),
          c =
            '\n\t\t\t\t<div class="voucher muted">\n\t\t\t\t\t<div class="icon-holder">'
              .concat(
                '<svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">\n\t\t\t<path d="M17.0001 0C16.0951 0 15.2701 0.312 14.6001 0.818C15.4751 1.986 16.0001 3.431 16.0001 5V6C16.0001 6.953 15.8071 7.862 15.4601 8.691C15.9351 8.889 16.4541 9 17.0001 9C19.2091 9 21.0001 7.209 21.0001 5V4C21.0001 1.791 19.2091 0 17.0001 0Z" fill="#7C8086"/>\n\t\t\t<path d="M9 11C6.239 11 4 8.761 4 6V5C4 2.239 6.239 0 9 0C11.761 0 14 2.239 14 5V6C14 8.761 11.761 11 9 11Z" fill="#7C8086"/>\n\t\t\t<path d="M22.8388 12.405C21.5548 11.815 19.3538 11 16.9998 11C15.8048 11 14.6498 11.211 13.6328 11.495C14.0088 11.573 14.3858 11.652 14.7628 11.748C17.6738 12.49 19.7328 15.023 19.9548 18H22.9998C23.5518 18 23.9998 17.552 23.9998 17V14.221C23.9998 13.439 23.5498 12.731 22.8388 12.405Z" fill="#7C8086"/>\n\t\t\t<path d="M17 20H1C0.448 20 0 19.552 0 19V18.525C0 16.25 1.527 14.248 3.731 13.686C5.205 13.31 7.021 13 9 13C10.979 13 12.795 13.31 14.269 13.686C16.473 14.248 18 16.25 18 18.525V19C18 19.552 17.552 20 17 20Z" fill="#7C8086"/>\n\t\t\t</svg>\n\t\t\t',
                '</div>\n\t\t\t\t\t<div class="information">'
              )
              .concat(b, "</div>\n\t\t\t\t</div>\n\t\t\t");
        vouchers.insert(c, a);
      },
      insert: function insert(a, b) {
        b.innerHTML = a;
      },
      select: function select(a) {
        var b = document.querySelector("#voucher-code");
        if (b) return !1;
        var c = a.dataset.voucher;
        modals.create(
          translations.vouchers.yourVoucherCode,
          vouchers.applyVoucherBody(c)
        );
      },
      addRemoveOptions: function addRemoveOptions() {
        return '<span class="remove">\n\t\t\t\t<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">\n\t\t\t\t\t<path d="M9.9 1.414L8.486 0L4.95 3.536L1.414 0L0 1.414L3.536 4.95L0 8.486L1.414 9.9L4.95 6.364L8.486 9.9L9.9 8.486L6.364 4.95L9.9 1.414Z" fill="white"/>\n\t\t\t\t</svg>\n\t\t\t</span>';
      },
      verifyBubble: function verifyBubble() {
        var a =
          '\n\t\t\t<div class="bubble">\n\t\t\t\t<h3 class="verify-message">'
            .concat(
              translations.payment.verifyEmailToRedeem,
              "</h3>\n\t\t\t\t<p>"
            )
            .concat(
              translations.payment.discountsSafelyVerifyEmail,
              '</p>\n\n\t\t\t\t<div class="actions">\n\t\t\t\t\t<button class="bttn bttn--outline-gray resend-verification-email" data-email="'
            )
            .concat(translations.payment.customerEmail, '">')
            .concat(
              translations.payment.resendVerificationEmail,
              "</button>\n\t\t\t\t</div>\n\t\t\t</div>"
            );
        return a;
      },
      expiredBadge: function expiredBadge() {
        var a = '<span class="badge badge-expired">'.concat(
          translations.vouchers.expired,
          "</span>"
        );
        return a;
      },
      apply: function apply(a, b) {
        vouchers.removeError();
        var c = vouchers.data.voucher.get(a),
          d = getUrlParameter("token"),
          e = b.target;
        e.classList.add("is-loading");
        var f = {
          token: d,
          voucher: c.code,
        };
        if ("" != IS_WITH_MARKUP) {
          var g = IS_WITH_MARKUP.value,
            h = !1;
          (h = "true" == g), (f.isWithMarkup = h);
        }
        var i = {
          credentials: "same-origin",
          method: "POST",
          body: JSON.stringify(f),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
          },
        };
        fetch("/json/voucher/apply", i)
          .then(function (a) {
            return a.json();
          })
          .then(function (c) {
            e.classList.remove("is-loading");
            var d = c.valid,
              f = document.querySelector('[data-voucher="'.concat(a, '"')),
              g = vouchers.data.voucher.get(a);
            if (d) {
              f.insertAdjacentHTML("beforeend", vouchers.addRemoveOptions()),
                f.classList.add("applied");
              var h = document.querySelectorAll(".voucher.valid"),
                i = Array.from(h),
                j = i.filter(function (a) {
                  return !a.classList.contains("applied");
                });
              j.forEach(function (a) {
                a.classList.add("disabled");
              }),
                c.deposit
                  ? (sessionStorage.setItem("paymentAmount", c.deposit.amount),
                    sessionStorage.setItem(
                      "paymentCurrency",
                      c.deposit.currency
                    ))
                  : sessionStorage.setItem("paymentAmount", 0),
                vouchers.applyDiscountInformation(a, g, c),
                modals.destroy(b.target);
            } else {
              var k = document.querySelector(".adaptive-modal-content");
              vouchers.errorWithVoucher(k, "invalid");
            }
          })
          .catch(function () {
            var a = document.querySelector(".adaptive-modal-content");
            vouchers.errorWithVoucher(a), e.classList.remove("is-loading");
          });
      },
      errorWithVoucher: function errorWithVoucher(a, b) {
        var c = "";
        c =
          "invalid" === b
            ? "<strong>"
                .concat(translations.vouchers.oops, "</strong> ")
                .concat(translations.vouchers.voucherErrorText2, " ")
                .concat(
                  translations.vouchers.voucherErrorText3,
                  ' <a href="/customer-service" target="_blank">'
                )
                .concat(translations.vouchers.voucherErrorText4, "</a> ")
                .concat(translations.vouchers.voucherErrorText5)
            : "<strong>"
                .concat(translations.vouchers.oops, "</strong> ")
                .concat(translations.vouchers.voucherErrorText1);
        var d = '\n\t\t\t\t<div class="errors">'.concat(c, "</div>\n\t\t\t");
        a.insertAdjacentHTML("beforebegin", d);
      },
      removeError: function removeError() {
        var a = document.querySelector(".adaptive-modal .error");
        a && a.remove();
      },
      applyDiscountInformation: function applyDiscountInformation(a, b, c) {
        var d = document.querySelector(".trip-details #payment-summary"),
          e = vouchers.data.payment.get(),
          f = vouchers.data.voucher.get(a),
          g = document.querySelector(".payment-option.selected .price .value"),
          h = currency.format(f.amount, f.currency, "EN", !1);
        b.to && (h = b.to),
          c.deposit && 0 === c.deposit.amount
            ? ((h = document.querySelector(".due-now .price").textContent),
              (g.textContent = currency.format(0, CURRENCY, "EN", !1)))
            : (g.textContent = currency.format(
                sessionStorage.getItem("paymentAmount"),
                CURRENCY,
                "EN",
                !1
              ));
        var i =
          '\n\t\t\t\t<section class="payment discount-container">\n\t\t\t\t\t<div class="row discount">\n\t\t\t\t\t\t<div>'
            .concat(
              translations.payment.discountVoucher,
              '</div>\n\t\t\t\t\t\t<span class="price">- '
            )
            .concat(h, "</span>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t");
        vouchers.updateAllThePrices(f, c),
          d.insertAdjacentHTML("beforebegin", i),
          c.remaining &&
            0 !== Object.keys(c.remaining).length &&
            c.remaining.constructor === Object &&
            vouchers.showOverflowMessage(c);
      },
      updateAllThePrices: function updateAllThePrices(a, b) {
        var c = '<input type="hidden" value="'.concat(
          a.code,
          '" id="voucher-code" name="voucher-code" />'
        );
        if (
          (document
            .querySelector("#reservation-payment")
            .insertAdjacentHTML("beforeend", c),
          (b.deposit && 0 == b.deposit.amount) ||
            0 == parseInt(sessionStorage.getItem("paymentAmount")))
        ) {
          var d = document.querySelector(".adyen-checkout__dropin"),
            e = document.querySelector(".stripe_payment_method #card-element"),
            f = document.querySelector(".stripe_payment_method"),
            g = document.querySelector("#plus-transaction-fee"),
            h = document.querySelector("#dropin");
          if ((d && d.remove(), e)) {
            stripeDropin.unmount(), f.classList.add("hidden");
            var i = document.querySelector(".js-payment-stripe-submit-trigger");
            i.classList.add("hidden");
            var j = document.querySelector(".js-payment-submit-trigger");
            j.classList.remove("hidden");
          }
          g && (g.style.display = "none"),
            h && h.classList.add("zero-payment"),
            vouchers.showVoucherCoverage(),
            "onetime" == b.type && vouchers.showOverflowMessage(b);
        } else adyenDropin.reInit();
      },
      showVoucherCoverage: function showVoucherCoverage() {
        var a = document.querySelector(".zero-payment"),
          b =
            '\n\t\t\t\t<div class="message voucher-coverage">\n\t\t\t\t\t<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">\n\t\t\t\t\t\t<circle cx="24" cy="24" r="24" fill="#ECECEC"/>\n\n\t\t\t\t\t\t<g clip-path="url(#clip0)">\n\t\t\t\t\t\t\t<path d="M32.25 14H15.75C15.5511 14 15.3603 14.079 15.2197 14.2197C15.079 14.3603 15 14.5511 15 14.75V37.6077L18 35.75L21 37.25L24 35.75L27 37.25L30 35.75L33 37.6077V14.75C33 14.5511 32.921 14.3603 32.7803 14.2197C32.6397 14.079 32.4489 14 32.25 14V14ZM24.75 31.25H18V29.75H24.75V31.25ZM24.75 27.5H18V26H24.75V27.5ZM24 23C23.4067 23 22.8266 22.8241 22.3333 22.4944C21.8399 22.1648 21.4554 21.6962 21.2284 21.1481C21.0013 20.5999 20.9419 19.9967 21.0576 19.4147C21.1734 18.8328 21.4591 18.2982 21.8787 17.8787C22.2982 17.4591 22.8328 17.1734 23.4147 17.0576C23.9967 16.9419 24.5999 17.0013 25.148 17.2284C25.6962 17.4554 26.1648 17.8399 26.4944 18.3333C26.8241 18.8266 27 19.4067 27 20C27 20.7956 26.6839 21.5587 26.1213 22.1213C25.5587 22.6839 24.7956 23 24 23ZM30 31.25H27V29.75H30V31.25ZM30 27.5H27V26H30V27.5Z" fill="#7C8086"/>\n\t\t\t\t\t\t</g>\n\n\t\t\t\t\t\t<defs>\n\t\t\t\t\t\t\t<clipPath id="clip0">\n\t\t\t\t\t\t\t\t<rect width="24" height="24" fill="white" transform="translate(12 14)"/>\n\t\t\t\t\t\t\t</clipPath>\n\t\t\t\t\t\t</defs>\n\t\t\t\t\t</svg>\n\n\t\t\t\t\t<p>'.concat(
              translations.payment.noPayment,
              "</p>\n\t\t\t\t</div>\n\t\t\t"
            );
        a.insertAdjacentHTML("beforeend", b);
      },
      revertThePrices: function revertThePrices() {
        var a = document.querySelectorAll(".discounted"),
          b = document.querySelectorAll(".discounted-value");
        a.forEach(function (a) {
          a.classList.remove("discounted");
        }),
          b.forEach(function (a) {
            a.remove();
          });
      },
      showOverflowMessage: function showOverflowMessage(a) {
        var b = document.querySelector("#vouchers-container"),
          c = "",
          d = a.type;
        if ("onetime" == d)
          c = '<p id="voucher-remaining-amount">'.concat(
            translations.vouchers.voucherOverflowText3,
            "</p>"
          );
        else {
          var e = currency.format(
            a.remaining.voucherForDeposit.amount,
            a.remaining.voucherForDeposit.currency,
            "EN",
            !1
          );
          c = '<p id="voucher-remaining-amount">'
            .concat(translations.vouchers.voucherOverflowText1, " <strong>")
            .concat(e, "</strong> ")
            .concat(translations.vouchers.voucherOverflowText2, "</p>");
        }
        b.insertAdjacentHTML("beforebegin", c);
      },
      remove: function remove(a) {
        a.classList.remove("applied"), a.querySelector(".remove").remove();
        var b = document.querySelectorAll(".voucher.disabled");
        b.forEach(function (a) {
          a.classList.remove("disabled");
        });
        var c = document.querySelector(".payment-option.selected"),
          d = c.querySelector(".price .value"),
          e = document.querySelector(".trip-details .discount-container"),
          f = document.querySelector("#voucher-remaining-amount"),
          g = document.querySelector("#voucher-code");
        (d.innerHTML = c.dataset.paymentOptionDeposit),
          e && e.remove(),
          f && f.remove(),
          g && g.remove(),
          sessionStorage.removeItem("paymentAmount"),
          sessionStorage.removeItem("paymentCurrency");
        var h = document.querySelector("#stripe-payment-key");
        if (h) {
          stripeDropin.reInit(), adyenDropin.reInit();
          var i = document.querySelector(".stripe_payment_method");
          i.classList.remove("hidden");
          var j = document.querySelector(".js-payment-stripe-submit-trigger");
          j.classList.remove("hidden");
          var k = document.querySelector(".js-payment-submit-trigger");
          k.classList.add("hidden");
        } else adyenDropin.reInit();
      },
      formatDate: function formatDate(a) {
        var b = document.documentElement.lang,
          c = new Date(a),
          d = c.getDate(),
          e = c.toLocaleString(b, {
            month: "2-digit",
          }),
          f = c.getFullYear(),
          g = "".concat(d, "/").concat(e, "/").concat(f);
        return g;
      },
      data: {
        voucher: {
          get: function get(a) {
            var b = JSON.parse(sessionStorage.getItem("voucher")),
              c = b.filter(function (b) {
                if (b && b.id == a) return b;
              }),
              d = c.pop();
            return d;
          },
          set: function set(a) {
            sessionStorage.setItem("voucher", JSON.stringify(a));
          },
        },
        payment: {
          set: function set() {
            var a = {
              deposit: document.querySelector("#deposit_amount").value || "",
              total: document.querySelector("#payment_total_price").value || "",
            };
            sessionStorage.setItem("payment", JSON.stringify(a));
          },
          get: function get() {
            return JSON.parse(sessionStorage.getItem("payment"));
          },
        },
      },
      applyVoucherBody: function applyVoucherBody(a) {
        var b = vouchers.data.voucher.get(a),
          c = "",
          d = "",
          e = currency.format(b.amount, b.currency, "EN", !1);
        b.to &&
          CURRENCY !== b.currency &&
          ((e = b.to),
          (d = '<p class="conversion-text">'
            .concat(translations.vouchers.voucherModalText1, " <strong>")
            .concat(
              currency.format(b.amount, b.currency, "EN", !0),
              "</strong>, "
            )
            .concat(translations.vouchers.voucherModalText2, "</p>"))),
          b.redeemable &&
            (c = ", "
              .concat(translations.vouchers.voucherModalText5, " ")
              .concat(vouchers.formatDate(b.redeemableDate), "."));
        var f =
          '\n\t\t\t\t<div class="icon-holder">\n\t\t\t\t\t<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n\t\t\t\t\t\t<path d="M23 5.00067H20.605C20.846 4.52426 20.9808 4.00123 21 3.46767C20.9653 2.52443 20.5615 1.63254 19.8757 0.984079C19.1898 0.33562 18.2767 -0.0175341 17.333 0.000670438C16.2089 0.0490853 15.1191 0.401827 14.1799 1.02124C13.2406 1.64066 12.4872 2.5035 12 3.51767C11.518 2.50634 10.7703 1.64495 9.83685 1.0255C8.90337 0.406057 7.81914 0.0518334 6.7 0.000670438C6.662 0.000670438 6.624 0.000670438 6.586 0.000670438C5.6558 0.00216011 4.7624 0.36425 4.09365 1.01081C3.42489 1.65738 3.03287 2.53805 3 3.46767V3.53367C3.01951 4.04421 3.14878 4.54456 3.379 5.00067H1C0.734784 5.00067 0.48043 5.10603 0.292893 5.29356C0.105357 5.4811 0 5.73545 0 6.00067L0 9.00067C0 9.26589 0.105357 9.52024 0.292893 9.70778C0.48043 9.89531 0.734784 10.0007 1 10.0007H23C23.2652 10.0007 23.5196 9.89531 23.7071 9.70778C23.8946 9.52024 24 9.26589 24 9.00067V6.00067C24 5.73545 23.8946 5.4811 23.7071 5.29356C23.5196 5.10603 23.2652 5.00067 23 5.00067ZM17.364 2.00067C17.7724 1.99007 18.1695 2.13614 18.4737 2.40891C18.7779 2.68168 18.9662 3.06049 19 3.46767C18.9858 3.87699 18.8141 4.26501 18.5206 4.55067C18.2271 4.83634 17.8346 4.99756 17.425 5.00067H13.478C14.1 3.74167 15.337 2.00067 17.364 2.00067ZM5 3.50067C5.0256 3.09146 5.20732 2.7077 5.50765 2.42857C5.80799 2.14945 6.20401 1.99628 6.614 2.00067C8.683 2.00867 9.895 3.73167 10.524 5.00067H6.624C6.21339 5.00376 5.81701 4.85043 5.51537 4.57182C5.21373 4.29322 5.02946 3.91023 5 3.50067Z" fill="#02BF9B"/>\n\t\t\t\t\t\t<path d="M14 12.001V24.001H19C19.7956 24.001 20.5587 23.6849 21.1213 23.1223C21.6839 22.5597 22 21.7966 22 21.001V12.001H14Z" fill="#02BF9B"/>\n\t\t\t\t\t\t<path d="M10 12.001H2V21.001C2 21.7966 2.31607 22.5597 2.87868 23.1223C3.44129 23.6849 4.20435 24.001 5 24.001H10V12.001Z" fill="#02BF9B"/>\n\t\t\t\t\t</svg>\n\t\t\t\t</div>\n\t\t\t\t<h2>'
            .concat(translations.vouchers.paymentYour, " ")
            .concat(e, " ")
            .concat(
              translations.vouchers.tripaneerVoucherCode,
              '</h2>\n\t\t\t\t<p class="valid-until">'
            )
            .concat(translations.vouchers.validUntil, " ")
            .concat(vouchers.formatDate(b.end), "</p>\n\n\t\t\t\t")
            .concat(
              d,
              '\n\n\t\t\t\t<button class="bttn bttn-submit has-loader has-loader--light apply-voucher" data-voucher="'
            )
            .concat(
              b.id,
              '">\n\t\t\t\t\t<span class="default-value">\n\t\t\t\t\t\t'
            )
            .concat(
              translations.vouchers.applyThisVoucher,
              '\n\t\t\t\t\t</span>\n\t\t\t\t\t<span class="loader">\n\t\t\t\t\t\t<div class="spinner">\n\t\t\t\t\t\t\t<svg width="18" height="16" viewbox="0 0 18 16" xmlns="http://www.w3.org/2000/svg" class="bounce bounce1">\n\t\t\t\t\t\t\t\t<path d="M.035 5.645c-.344 3.11 1.84 8.322 7.776 9.47 3.017.589 7.015-.223 9.002-4.342C23.338-2.817.87-2.397.035 5.645z" fill="#02BF9B" fill-rule="nonzero">\n\t\t\t\t\t\t\t\t</path>\n\t\t\t\t\t\t\t</svg>\n\n\t\t\t\t\t\t\t<svg width="18" height="17" viewbox="0 0 18 16" xmlns="http://www.w3.org/2000/svg" class="bounce bounce2">\n\t\t\t\t\t\t\t\t<path d="M15.643 2.777A8.172 8.172 0 0 0 12.707.703C7.61-1.48 1.765 1.736.333 6.025c-.035.105-.067.21-.096.316-.561 2.033-.135 4.253 1.372 6.066 1.802 2.168 4.765 3.471 7.601 3.613 3.924.196 7.457-1.079 8.504-4.38.79-2.49-.105-6.65-2.071-8.863z" fill="#02A5E8" fill-rule="nonzero">\n\t\t\t\t\t\t\t\t</path>\n\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t\t<svg width="18" height="18" viewbox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" class="bounce bounce3">\n\t\t\t\t\t\t\t\t<path d="M10.215.437C5.117.437-2.205 5.263.634 11.088c2.839 5.825 12.92 8.488 15.732 2.996C19.112 8.718 19.204.437 10.215.437z" fill="#FF9B35" fill-rule="nonzero">\n\t\t\t\t\t\t\t\t</path>\n\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</span>\n\t\t\t\t</button>\n\n\t\t\t\t<p class="details">\n\t\t\t\t'
            )
            .concat(translations.vouchers.voucherModalText3, " <strong>")
            .concat(e, "</strong> ")
            .concat(translations.vouchers.voucherModalText4, " ")
            .concat(vouchers.formatDate(b.end), " ")
            .concat(c, '\n\t\t\t\t\t<a href="/terms-and-privacy">')
            .concat(
              translations.vouchers.viewFullTC,
              "</a>\n\t\t\t\t</p>\n\t\t\t"
            );
        return f;
      },
    }
  );
})();
(function () {
  function a() {
    var a = document.querySelector("[data-inquiry]").dataset.inquiry;
    fetch("/json/inquiry/".concat(a, "/voucher"), {
      credentials: "same-origin",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(function (a) {
        if (!a.ok) throw new Error(a.status);
        return a.json();
      })
      .then(function (a) {
        b(a);
      })
      .catch(function () {
        c.classList.remove("lazy-load");
      });
  }

  function b(a) {
    var b = currency.format(
        a[0].customer_price.amount,
        a[0].customer_price.currency
      ),
      d = JSON.parse(sessionStorage.getItem("voucher")),
      e = a[0].code,
      f = d.filter(function (a) {
        return a.code == e;
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
    var r = new Promise(function (a) {
      a(
        currency.convertAndFormat(
          parseInt(k.deposit),
          CURRENCY_LISTING,
          CURRENCY,
          n
        )
      );
    });
    if (
      (r.then(function (a) {
        m.innerHTML = a;
      }),
      "true" == j)
    ) {
      var t = new Promise(function (a) {
        a(
          currency.convertAndFormat(parseInt(q), CURRENCY_LISTING, CURRENCY, n)
        );
      });
      t.then(function (a) {
        o.innerHTML = a;
      });
    }
    var s =
      "/json/vouchers/filter/metadata/voucher?limit=100&reference_id=".concat(
        g
      );
    fetch(s, {
      credentials: "same-origin",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(function (a) {
        if (a.ok && 200 == a.status) return a.json();
        if (!a.ok) throw "Something went wrong";
      })
      .then(function (a) {
        var d = "";
        if (0 < a.length) {
          var e = currency.format(a[0].amount, a[0].currency, "EN", !1);
          d = '<div style="margin-top:8px; font-size: 14px;">'
            .concat(translations.vouchers.voucherOverflowText1, " ")
            .concat(e, " ")
            .concat(translations.vouchers.voucherOverflowText2, "</div>");
        }
        (l =
          '\n\t\t\t\t<section class="payment discount-container">\n\t\t\t\t\t<div class="row">\n\t\t\t\t\t\t<div>'
            .concat(
              translations.payment.amountPaid,
              '</div>\n\t\t\t\t\t\t<span class="price">'
            )
            .concat(
              i,
              '</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="row discount">\n\t\t\t\t\t\t<div>'
            )
            .concat(
              translations.payment.discountVoucher,
              '</div>\n\t\t\t\t\t\t<span class="price">- '
            )
            .concat(b, "</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t")
            .concat(d, "\n\t\t\t\t</div>\n\t\t\t")),
          h.insertAdjacentHTML("beforebegin", l),
          c.classList.remove("lazy-load");
      })
      .catch(function (a) {
        loader.destroy(), console.log(a), c.classList.remove("lazy-load");
      });
  }
  var c = document.querySelector(".trip-details");
  document.addEventListener("DOMContentLoaded", function () {
    var b = document.querySelector(".conversion-layout.confirmation");
    b &&
      ((CURRENCY = document.querySelector(".currency-option.selected").dataset
        .currencyCode),
      (CURRENCY_LISTING = document.querySelector("#listing_currency").value),
      a());
  });
})();
$(function () {
  $("input[type=range]").on("input", function () {
    var a = $(this),
      b = a.data("target");
    $(b).length && $(b).text(a.val() + (a.data("percent") ? "%" : ""));
  });
});
$(function () {
  $('[data-toggle="popover"]').length &&
    $('*[data-toggle="popover"]').hover(function () {
      return $(this).parent().find(".popover").toggle(), !1;
    });
});

function _toConsumableArray(a) {
  return (
    _arrayWithoutHoles(a) ||
    _iterableToArray(a) ||
    _unsupportedIterableToArray(a) ||
    _nonIterableSpread()
  );
}

function _nonIterableSpread() {
  throw new TypeError(
    "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
  );
}

function _unsupportedIterableToArray(a, b) {
  if (a) {
    if ("string" == typeof a) return _arrayLikeToArray(a, b);
    var c = Object.prototype.toString.call(a).slice(8, -1);
    return (
      "Object" === c && a.constructor && (c = a.constructor.name),
      "Map" === c || "Set" === c
        ? Array.from(a)
        : "Arguments" === c ||
          /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c)
        ? _arrayLikeToArray(a, b)
        : void 0
    );
  }
}

function _iterableToArray(a) {
  if (
    ("undefined" != typeof Symbol && null != a[Symbol.iterator]) ||
    null != a["@@iterator"]
  )
    return Array.from(a);
}

function _arrayWithoutHoles(a) {
  if (Array.isArray(a)) return _arrayLikeToArray(a);
}

function _arrayLikeToArray(a, b) {
  (null == b || b > a.length) && (b = a.length);
  for (var c = 0, d = Array(b); c < b; c++) d[c] = a[c];
  return d;
}
$(function () {
  (window.dataLayer = window.dataLayer || []),
    $(".js-datalayer-click").click(function () {
      var a;
      (a = dataLayer).push.apply(
        a,
        _toConsumableArray($(this).closest(".js-datalayer").data("layer"))
      );
    });
});
$(function () {
  function a() {
    sessionStorage.setItem("message", "");
  }

  function b() {
    return (
      $("#simple_message_form_message").length &&
        sessionStorage.setItem(
          "message",
          $("#simple_message_form_message").val()
        ),
      !1
    );
  }
  var c = {
    errorMessages: [],
    validate: function validate(a, b) {
      c.errorMessages = [];
      var d = c.usedInputs();
      return (
        c.emptyMessage() &&
          !$("#available-button").length &&
          c.errorMessages.push(translation.the_message_cant_be_empty),
        c.hasExcessFiles(d)
          ? c.errorMessages.push("File size must be less then 10MB.")
          : 51380224 < c.allFileSize(d) &&
            c.errorMessages.push(
              "The total size of attachments too large. Try to download them individually."
            ),
        $(".js-submit-org-dialog-form").hasClass("disabled") &&
          c.errorMessages.push(
            "You just clicked 'send message'. Wait a few seconds before sending another."
          ),
        c.showErrorMessages(b)
      );
    },
    showErrorMessages: function showErrorMessages(a) {
      if (this.errorMessages.length) {
        $(".js-dialog-alert.dialog-alert__item--success").remove(),
          $(".js-dialog-alert")
            .removeClass("hide")
            .addClass("dialog-alert__item--danger"),
          $(".js-alert-text").html(this.errorMessages.join(" "));
        var b = $("#message-form-wrapper").offset().top;
        return (
          $("body, html").animate({
            scrollTop: b,
          }),
          a &&
            setTimeout(function () {
              $.rails.enableFormElements(a);
            }, 26),
          !1
        );
      }
      var c = $(".js-submit-org-dialog-form"),
        d = $(".js-submit-org-dialog-form").data("disable-with");
      return c.addClass("disabled"), c.attr("disabled", 1), c.val(d), !0;
    },
    hasExcessFiles: function hasExcessFiles(a) {
      return a.filter(function () {
        return this.files[0].size > 10485760;
      }).length;
    },
    allFileSize: function allFileSize(a) {
      var b = 0;
      return (
        a.each(function () {
          b += $(this)[0].files[0].size;
        }),
        b
      );
    },
    readablizeBytes: function readablizeBytes(a) {
      var b = Math.floor(Math.log(a) / 6.931471805599453);
      return (
        (a / Math.pow(1024, b)).toFixed(1) +
        " " +
        ["bytes", "KB", "MB", "GB", "TB", "PB"][b]
      );
    },
    emptyInputs: function emptyInputs() {
      var a = [];
      return (
        $("#message-form-wrapper input:file:not(#new_attachment)").each(
          function () {
            (this.files && 0 != this.files.length) || a.push(this);
          }
        ),
        $(a)
      );
    },
    emptyMessage: function emptyMessage() {
      return "" == $("#simple_message_form_message").val();
    },
    usedInputs: function usedInputs() {
      var a = [];
      return (
        $("#message-form-wrapper input:file:not(#new_attachment)").each(
          function () {
            this.files && 0 < this.files.length && a.push(this);
          }
        ),
        $(a)
      );
    },
  };
  $("#noajax_dialogs_form").on("submit", function () {
    return c.validate();
  }),
    $("#message-form-wrapper").on(
      "refresh",
      "#new_simple_message_form, #noajax_dialogs_form",
      function () {
        $("#new_simple_message_form").ajaxForm({
          dataType: "script",
          beforeSubmit: c.validate,
        }),
          $("#simple_message_form_message")
            .autosize()
            .css("resize", "vertical");
      }
    ),
    $("#message-form-wrapper").on(
      "click",
      "label[for='undefined']",
      function (a) {
        a.preventDefault(), alert("You can load only 5 files in this browser.");
      }
    ),
    $("#message-form-wrapper").on("change", "input:file", function (a) {
      var b = $(a.target),
        c = b.closest(".attachments"),
        d = b.closest(".action-wrapper"),
        e = [];
      d.find("input:file:not(#new_attachment)").each(function () {
        (this.files && 0 != this.files.length) || e.push(this);
      });
      var f = $(e),
        g = b.siblings("input:file:not(#new_attachment)"),
        h = g.filter(function () {
          var a = this.value;
          return !a;
        }),
        i = "undefined";
      if (!!h.length) i = h.first().attr("id");
      else if (document.addEventListener) {
        var j = $("#new_attachment"),
          k = j.clone();
        k.prop("disabled", !1),
          (i = "file_" + g.length),
          k.attr("id", i),
          k.insertAfter(
            $("#message-form-wrapper input:file:not(#new_attachment):last")
          );
      }
      $("label.file").attr("for", i), c.trigger("addFile");
    }),
    $("body").on("addFile", ".attachments", function () {
      var a = $(this),
        b = a.closest(".action-wrapper"),
        d = a.find(".list");
      d.html(""),
        a.find("input:file:not(#new_attachment)").each(function () {
          if (this.files && 0 < this.files.length) {
            var a = this.files[0],
              b =
                "<li><span class='file-name'>" +
                a.name +
                " (" +
                c.readablizeBytes(a.size) +
                ")</span>&nbsp;<span class='close delete'>&times;</span></li>";
            d.append(b);
          }
        });
    }),
    $("#message-form-wrapper").on("click", ".delete", function () {
      var a = $(this).parent();
      $(
        "#message-form-wrapper input.file:not(#new_attachment):eq(" +
          a.index() +
          ")"
      ).val(""),
        $("label.file").attr("for", c.emptyInputs().first().attr("id")),
        a.remove();
    }),
    $(".new_simple_message_form").trigger("refresh"),
    $("#simple_message_form_message").keyup(function () {
      b();
    }),
    (function () {
      if (null != sessionStorage) {
        var a = sessionStorage.getItem("message");
        "undefined" != a &&
          null != a &&
          "" != a &&
          $("#simple_message_form_message").val(a);
      }
    })(),
    $("#available-button, #notavailable-button, #not-suitable-button").click(
      function () {
        a();
      }
    ),
    $("#save_edit_package").click(function (a) {
      var b = $("form#edit_package");
      return (
        $(this).prop("disabled", !0),
        $(this).html(
          "<i class='ebs-icon-spinner spin-icon'></i> " +
            $(this).data("progress-text")
        ),
        b.submit(),
        a.stopImmediatePropagation(),
        !1
      );
    });
});
$(function () {
  $("#inquiry_modal.package-selection").length &&
    $(".pck-dropdown .dropdown-menu li").click(function () {
      var a =
        '<span class="selected-option">' +
        $(this).find(".package-attributes").html() +
        "</span>";
      $(this)
        .parents(".dropdown")
        .find(".dropdown-toggle")
        .html(a + '<span class="caret"></span>'),
        1024 < $(window).width();
    });
});
$(function () {
  $(".js_sf_dropdown_filtering").attr("autocomplete_enabled") &&
    $(".js_sf_dropdown_filtering").keyup(function hook(a) {
      var b = a.keyCode || a.which;
      if (13 == b) {
        var c = $("#autocomplete_results li a").first().attr("href");
        c && 0 < c.length && (window.location.href = c);
      } else {
        var d = $(this).val(),
          e = $(this);
        if (
          ($(".sf_filter_group").addClass("hidden"),
          $(".ddc_wrapper").addClass("hidden"),
          0 < d.length)
        ) {
          $(".sf_dropdown_filtering__noresults").addClass("hidden");
          var f = new XMLHttpRequest(),
            g = "en" == selectedLanguage ? "" : "/" + selectedLanguage;
          f.open(
            "GET",
            g +
              "/test-dest-search?dest_id=" +
              destinationID +
              "&query=" +
              encodeURI(d)
          ),
            f.setRequestHeader("X-Requested-With", "XMLHttpRequest"),
            f.send(null),
            (f.onreadystatechange = function () {
              if ($(e).val() == d && 4 === f.readyState) {
                $("#autocomplete_results").remove();
                var a = $("<div id=autocomplete_results></div>");
                if (($(e).parent().append(a), 200 === f.status)) {
                  var b = JSON.parse(f.responseText),
                    c = "<ul style='margin-top: 10px; list-style: none;'>",
                    g = {},
                    h = 0;
                  if (0 < b.hits.hits.length) {
                    for (var j, k = 0; k < b.hits.hits.length; k++)
                      if (
                        ((j = b.hits.hits[k]._source), !g[j.destination_id])
                      ) {
                        g[j.destination_id] = !0;
                        var l = j.name;
                        j.country && (l += ", " + j.country);
                        var m = j["listings_" + siteid];
                        0 < m && (l += " (" + m + ")");
                        var n = {
                            fr: {
                              id: 48,
                              lang: "fr",
                            },
                            en: {
                              id: 41,
                              lang: "en",
                            },
                            de: {
                              id: 52,
                              lang: "de",
                            },
                            es: {
                              id: 149,
                              lang: "es",
                            },
                            nl: {
                              id: 39,
                              lang: "nl",
                            },
                          },
                          o = n[selectedLanguage] || n.en,
                          p = j.paths[o.id];
                        if (
                          ((c +=
                            "<li style='margin: 5px;'><a class='ddc_2' href='/" +
                            o.lang +
                            "/all/d/" +
                            p +
                            "'>" +
                            l +
                            "</a></li>"),
                          4 <= h++)
                        )
                          break;
                      }
                    (c += "</ul>"), a.html(c);
                  } else
                    $(".sf_dropdown_filtering__noresults").removeClass(
                      "hidden"
                    );
                } else
                  $("#autocomplete_results").remove(),
                    $(".sf_dropdown_filtering__noresults").removeClass(
                      "hidden"
                    );
              }
            });
        } else
          $("#autocomplete_results").remove(),
            $(".sf_filter_group").removeClass("hidden"),
            $(".ddc_wrapper").removeClass("hidden");
      }
    });
});
$(function () {
  $("#survey-close_5, #make-survey_5").click(function () {
    $.post("/close_survey_5", function () {});
  });
}),
  $(function () {
    $("[data-warning]").each(function () {
      var a = $(this).attr("data-warning"),
        b = +Cookies.get("warning-" + a) || 0;
      3 > b &&
        ($(this).css("display", "block"), Cookies.set("warning-" + a, b + 1));
    }),
      $("[data-warning] .close").unbind(),
      $("[data-warning] .close").click(function () {
        console.log("close");
        var a = $(this).closest("[data-warning]").attr("data-warning");
        Cookies.set("warning-" + a, 99),
          $(this).closest("[data-warning]").remove();
      });
  });
(function () {
  var a = document.querySelectorAll(".showcard-listing-image__badge"),
    b = [].slice.call(a);
  b.forEach(function (a) {
    a.addEventListener("mouseenter", function () {
      gae("showcard", "showcard badge");
    });
  });
})();
(function () {
  if (document.querySelector(".trip-menu")) {
    var a = function () {
        var a = w.getBoundingClientRect();
        x.style.right = document.body.clientWidth - a.right + "px";
      },
      b = function (a) {
        E.style.marginRight = "-".concat((a - 1164) / 2, "px");
      },
      c = function (a) {
        var b = document.querySelector('[data-parent-group="'.concat(a, '"]')),
          c = document.querySelectorAll("[data-parent]"),
          e = document.querySelectorAll(".link-type-group");
        d(c, e, a), b.classList.add("active");
      },
      d = function (a, b, c) {
        for (var d = 0; d < a.length; d++)
          a[d].style.display = a[d].dataset.parent === c ? "block" : "none";
        j(b);
      },
      e = function (a) {
        var b = document.querySelectorAll(".main-primary-links .main_nav"),
          c = a.dataset.menuType;
        j(b),
          r(a.dataset.photoUrl),
          J || s(A),
          a.classList.add("active"),
          A.classList.add("active"),
          (A.dataset.menuType = c),
          document.body.classList.add("navigation-open"),
          "touch-mobile" != H && f(c);
      },
      f = function (a) {
        var b = document.querySelector(".bucket.type-" + a + " .lvl"),
          d = b.dataset.parentGroup;
        c(d);
      },
      g = function () {
        A.classList.remove("active");
        var a = document.querySelectorAll(".main-primary-links .main_nav"),
          b = document.querySelectorAll("[data-parent]"),
          c = document.querySelectorAll(".link-type-group");
        j(a), d(b, c), document.body.classList.remove("navigation-open");
      },
      h = function () {
        document.body.classList.remove("has-open-user-menu");
      },
      j = function (a) {
        for (i = 0; i < a.length; i++) a[i].classList.remove("active");
      },
      k = function (a) {
        var b = document.querySelector(".lvl-".concat(F));
        m(b),
          F++,
          (G[F] = a.target.dataset.menuTitle),
          (A.dataset.currentLvl = F),
          o(a.target.dataset.photoUrlMobile);
      },
      l = function () {
        var a = document.querySelectorAll(".lvl--primary");
        F--, o(), (A.dataset.currentLvl = F);
        var b = document.querySelector(".lvl-".concat(F));
        j(a), n(b);
      },
      m = function (a) {
        a.classList.add("move-out");
      },
      n = function (a) {
        a.classList.remove("move-out");
      },
      o = function (a) {
        (D.innerHTML = G[F]),
          a
            ? (C.style.backgroundImage = "url(".concat(a, ")"))
            : 0 == F && (C.style.backgroundImage = "");
      },
      p = function (a, b) {
        for (var c = a.target; c; ) {
          if (c.classList.contains(b)) return !0;
          c = c.parentElement;
        }
        return !1;
      },
      q = function () {
        function a() {
          for (var c = 0; c < a.arguments.length; c++)
            (b[c] = new Image()), (b[c].src = a.arguments[c]);
          K = !0;
        }
        if (!K) {
          for (
            var b = [],
              c = [],
              d = document.querySelectorAll("a[data-photo-url]"),
              e = [].slice.call(d),
              f = e.filter(function (a) {
                return "" != a.dataset.photoUrl;
              }),
              g = 0;
            g < f.length;
            g++
          )
            c.push(f[g].dataset.photoUrl);
          a.apply(void 0, c);
        }
      },
      r = function (a) {
        q(), "" != a && (E.style.backgroundImage = "url(".concat(a, ")"));
      },
      s = function (a) {
        var b = B.getBoundingClientRect();
        document.body.classList.contains("navigation-open") &&
          (a.style.top = b.bottom + "px");
      },
      t = document.querySelectorAll(".main_nav"),
      u = [].slice.call(t),
      v = document.querySelector(".trip-menu-trigger"),
      w = document.querySelector(".user-menu-trigger"),
      x = document.querySelector(".user-menu"),
      y = document.querySelector(".close-user-menu"),
      z = document.querySelector(".close-trip-menu"),
      A = document.querySelector(".trip-menu"),
      B = document.querySelector(".trip-bar"),
      C = document.querySelector(".trip-menu header .header-background"),
      D = document.querySelector(".menu-header--title__text"),
      E = document.querySelector(".trip-menu .inspiration"),
      F = A.dataset.currentLvl,
      G = {
        0: "Menu",
      },
      H = "",
      I = !1,
      J = !1,
      K = !1;
    document.addEventListener("DOMContentLoaded", function () {
      b(window.innerWidth);
    }),
      v &&
        v.addEventListener("click", function () {
          document.body.classList.contains("has-open-main-menu")
            ? (document.body.classList.remove("has-open-main-menu"), (J = !1))
            : ((H = "touch-mobile"),
              (J = !0),
              document.body.classList.add("has-open-main-menu"));
        }),
      window.addEventListener("resize", function (c) {
        b(c.target.innerWidth),
          document.body.classList.contains("has-open-user-menu") &&
            768 < window.innerWidth &&
            a();
      }),
      z.addEventListener("click", function () {
        for (g(); 0 < F; ) l();
        document.body.classList.remove("has-open-main-menu");
      }),
      window.addEventListener("popstate", function () {
        if (document.body.classList.contains("has-open-main-menu")) {
          for (g(); 0 < F; ) l();
          document.body.classList.remove("has-open-main-menu");
        }
        document.body.classList.contains("has-open-user-menu") &&
          document.body.classList.remove("has-open-user-menu");
      }),
      w.addEventListener("click", function () {
        document.body.classList.contains("has-open-user-menu")
          ? document.body.classList.remove("has-open-user-menu")
          : (768 < window.innerWidth && a(),
            document.body.classList.add("has-open-user-menu"));
      }),
      y.addEventListener("click", h),
      document.addEventListener("mouseover", function (a) {
        J || (H = "mouse"),
          a.target.classList.contains("link-type-group") &&
            c(a.target.dataset.parentGroup);
      }),
      u.forEach(function (a) {
        a.addEventListener("mouseover", function (a) {
          e(a.target);
        });
      }),
      document.addEventListener("mouseover", function (a) {
        var b = document.body.classList.contains("navigation-open"),
          c = a.target.classList.contains("header-wrapper"),
          d = a.target.classList.contains("top-bar"),
          e = a.target.classList.contains("main_nav");
        b && (d || (c && !e)) && g();
      }),
      A.addEventListener("mouseleave", g),
      document.addEventListener("touchmove", function () {
        I = !0;
      }),
      document.addEventListener("touchstart", function () {
        (I = !1), (H = J ? "touch-mobile" : "touch-large");
      }),
      document.addEventListener("touchend", function (a) {
        var b = document.body.classList.contains("navigation-open");
        I ||
          (b && !p(a, "trip-menu") && g(),
          a.target.classList.contains("main_nav") && ((J = !1), e(a.target)),
          a.target.classList.contains("link-type-group") &&
            "touch-large" === H &&
            c(a.target.dataset.parentGroup),
          "touch-mobile" === H &&
            (a.target.classList.contains("lvl--primary") && e(a.target),
            a.target.classList.contains("lvl") &&
              (k(a),
              a.target.dataset.parentGroup && c(a.target.dataset.parentGroup)),
            a.target.classList.contains("lvl-back") && l(),
            a.target.classList.contains("to-page") &&
              (loader.create(a.target, !0, "medium", "", !0),
              gae(
                "navigation",
                "navigation_link_".concat(a.target.pathname.replace(/\//g, "_"))
              ))));
      });
    document.addEventListener("click", function (a) {
      var b = a.target.classList.contains("user-menu-trigger"),
        c = document.body.classList.contains("has-open-user-menu");
      !1 === b &&
        c &&
        !1 == p(a, "user-menu") &&
        document.body.classList.remove("has-open-user-menu"),
        a.target.classList.contains("to-page") &&
          (a.target.dataset.automated
            ? gae("navigation-automated-destination", a.target.dataset.id)
            : gae("navigation-manual-item", a.target.dataset.id));
    });
  }
  document.addEventListener("click", function (a) {
    a.target.classList.contains("lang-currency-switch") &&
      a.target.classList.add("is-loading");
  });
})();
$(function () {
  function a() {
    var a = $(this);
    if ($(this).is(":visible")) {
      var b = $(".inner-container.messenger-form"),
        c = Math.min(108, 0 == a.val().length ? 28 : this.scrollHeight);
      a.css("height", c + "px"), b.css("height", c + 14 + "px");
    }
  }

  function b() {
    var a = [];
    return (
      $("#message-form-wrapper input:file").each(function () {
        (this.files && 0 != this.files.length) || a.push(this);
      }),
      $(a)
    );
  }

  function c(a) {
    var b = Math.floor(Math.log(a) / 6.931471805599453);
    return (
      (a / Math.pow(1024, b)).toFixed(1) +
      " " +
      ["bytes", "KB", "MB", "GB", "TB", "PB"][b]
    );
  }

  function d(a) {
    var b = c(a);
    return 10485760 >= a ? b : "<span style='color: red;'>" + b + "</span>";
  }
  $("textarea.simple-message-form.mobile[name='message']").keyup(a),
    "undefined" != typeof exp_dialogs_cust_resizable_textarea &&
      exp_dialogs_cust_resizable_textarea &&
      $("#simple_message_form_message").on("change keyup paste", function () {
        $("#simple_message_form_message").autosize().css("resize", "vertical"),
          $(".inner-container.messenger-form").css("height", "auto"),
          $("#message-history-wrapper").css(
            "padding-bottom",
            $(".inner-container.messenger-form").css("height")
          );
      }),
    $("#message-form-submit").on("click", function (b) {
      function c() {
        g.html(h), g.removeAttr("disabled");
      }

      function d(a) {
        $("textarea.simple-message-form[name='message']").each(function () {
          a || $(this).is(":visible")
            ? $(this).removeAttr("disabled")
            : $(this).attr("disabled", 1);
        });
      }

      function e(a) {
        var a = $("#message-form-client-errors #" + a).text();
        a && a.length && f.text(a).removeClass("hide");
      }
      b.preventDefault();
      var f = $("#message-form-errors");
      f.text("").addClass("hide");
      var g = $(this),
        h = g.val(),
        i = g.data("disable-with");
      g.attr("disabled", 1), g.html(i);
      var j = $("#new_simple_message_form");
      return (
        j.ajaxSubmit({
          dataType: "html",
          beforeSerialize: function beforeSerialize() {
            d();
            var a = $("#message-form-wrapper input:file");
            return 0 <
              a.filter(function () {
                return (
                  this.files &&
                  this.files.length &&
                  10485760 < this.files[0].size
                );
              }).length
              ? (e("file_too_large"), c(), !1)
              : 0 <
                a.filter(function () {
                  return (
                    this.files &&
                    this.files.length &&
                    /[\\\/:\*\?"<>\|]/.test(this.files[0].name)
                  );
                }).length
              ? (e("file_name_invalid"), c(), !1)
              : void 0;
          },
          success: function success(b) {
            $(".js-customer-dialogs-history").html(b),
              $("html, body").animate(
                {
                  scrollTop:
                    $(".js-customer-dialogs-history").offset().top - 20,
                },
                400
              ),
              $(".js-customer-dialogs-history")
                .find(".message-customer:first-child")
                .addClass("message-customer--animate"),
              $("#message-form-wrapper .js-attachments-wrp .list").html(""),
              j[0].reset(),
              a.apply(
                $("textarea.simple-message-form.mobile[name='message']")[0]
              ),
              "undefined" != typeof exp_dialogs_cust_resizable_textarea &&
                exp_dialogs_cust_resizable_textarea &&
                ($("textarea#simple_message_form_message").css(
                  "height",
                  "60px"
                ),
                $("#message-history-wrapper").css("padding-bottom", "130px"));
          },
          error: function (a) {
            var b = a.responseText && a.responseText.trim();
            b && b.length
              ? f.text(a.responseText.trim()).removeClass("hide")
              : e("failed_contact_server"),
              c();
          },
          complete: function complete() {
            d(!0), c();
          },
        }),
        !1
      );
    }),
    $("#message-form-wrapper").on("change", "input.slot", function () {
      var a = b(),
        c = a.length ? a.first().attr("id") : "undefined";
      $("label.attachment").attr("for", c),
        $(".js-attachments-wrp").trigger("addfile");
    }),
    $("#message-form-wrapper").on(
      "addfile",
      ".js-attachments-wrp",
      function () {
        var a = $(this),
          b = a.find(".list").html("");
        a.find("input:file").each(function () {
          this.files &&
            0 < this.files.length &&
            b.append(
              "<li file-id='" +
                this.id +
                "'><span class='file-name'>" +
                this.files[0].name +
                " (" +
                d(this.files[0].size) +
                ")</span><span class='close delete'>&times;</span></li>"
            );
        });
      }
    ),
    $("#message-form-wrapper").on(
      "click",
      ".js-attachments-wrp .delete",
      function () {
        var a = $(this).closest("li"),
          c = a.attr("file-id");
        a.remove(),
          $("#" + c).replaceWith(
            '<input class="slot" id="' + c + '" name="file" type="file">'
          ),
          $("label.attachment").attr("for", b().first().attr("id"));
      }
    );
});
$(function () {
  var a = "site" + siteid;
  if (
    "undefined" != typeof tpLangUprank &&
    "undefined" != typeof tpLangUprankPage
  ) {
    var b = [a, selectedLanguage, tpLangUprank, tpLangUprankPage].join("--");
    gae("language_uprank", b);
  }
});

function _createForOfIteratorHelper(a, b) {
  var c =
    ("undefined" != typeof Symbol && a[Symbol.iterator]) || a["@@iterator"];
  if (!c) {
    if (
      Array.isArray(a) ||
      (c = _unsupportedIterableToArray(a)) ||
      (b && a && "number" == typeof a.length)
    ) {
      c && (a = c);
      var d = 0,
        e = function () {};
      return {
        s: e,
        n: function n() {
          return d >= a.length
            ? {
                done: !0,
              }
            : {
                done: !1,
                value: a[d++],
              };
        },
        e: function e(a) {
          throw a;
        },
        f: e,
      };
    }
    throw new TypeError(
      "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
    );
  }
  var f,
    g = !0,
    h = !1;
  return {
    s: function s() {
      c = c.call(a);
    },
    n: function n() {
      var a = c.next();
      return (g = a.done), a;
    },
    e: function e(a) {
      (h = !0), (f = a);
    },
    f: function f() {
      try {
        g || null == c.return || c.return();
      } finally {
        if (h) throw f;
      }
    },
  };
}

function _unsupportedIterableToArray(a, b) {
  if (a) {
    if ("string" == typeof a) return _arrayLikeToArray(a, b);
    var c = Object.prototype.toString.call(a).slice(8, -1);
    return (
      "Object" === c && a.constructor && (c = a.constructor.name),
      "Map" === c || "Set" === c
        ? Array.from(a)
        : "Arguments" === c ||
          /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c)
        ? _arrayLikeToArray(a, b)
        : void 0
    );
  }
}

function _arrayLikeToArray(a, b) {
  (null == b || b > a.length) && (b = a.length);
  for (var c = 0, d = Array(b); c < b; c++) d[c] = a[c];
  return d;
}
var mediaGallery = (function () {
  var a = Math.abs;
  document.addEventListener("DOMContentLoaded", function () {
    var a = document.querySelector(".media-gallery"),
      b = document.querySelector("#is-gallery-mobile-device"),
      c = "";
    null != b && (c = b.value),
      a &&
        ((SLIDEINDEX = 1),
        (GALLERYITEMS = []),
        (SLIDERELEMENTS = []),
        (PHOTOCOUNT = 0),
        (VIDEOCOUNT = 0),
        (SLIDERELEMENTSMOBILE = []),
        (SLIDEINDEXMOBILE = SLIDEINDEX),
        (SCROLLINDEX = 0)),
      "true" == c &&
        (mediaGallery.fetchGalleryData(),
        (touchStartX = 0),
        (touchEndX = 0),
        (touchStartY = 0),
        (touchEndY = 0),
        (scaling = !1));
  }),
    document.addEventListener("click", function (a) {
      if (
        (a.target.classList.contains("media-gallery-slider-prev") &&
          (a.preventDefault(),
          gae("listing-media-gallery", "slider_prev_button_clicked"),
          mediaGallery.showSlides((SLIDEINDEX -= 1), SLIDERELEMENTS)),
        a.target.classList.contains("media-gallery-slider-next") &&
          (a.preventDefault(),
          gae("listing-media-gallery", "slider_next_button_clicked"),
          mediaGallery.showSlides((SLIDEINDEX += 1), SLIDERELEMENTS)),
        a.target.classList.contains(
          "media-gallery-container__photo-slider-img"
        ))
      ) {
        a.preventDefault();
        var b = parseInt(a.target.dataset.item) + 1;
        mediaGallery.openOverlay(b, "slide");
      }
    }),
    document.addEventListener("keydown", function (a) {
      if ("ArrowLeft" == a.key) {
        var f = document.querySelector(".media-gallery-overlay__photo-slider");
        if (f && mediaGallery.isVisible(f) && mediaGallery.isInViewport(f)) {
          gae("listing-media-gallery", "slider_prev_arrow_key_navigation");
          var b = document.querySelector("#is-gallery-mobile-device"),
            c = "";
          null != b && (c = b.value),
            "true" != c &&
              (a.preventDefault(),
              mediaGallery.showSlides((SLIDEINDEX -= 1), SLIDERELEMENTS));
        }
      }
      if ("ArrowRight" == a.key) {
        var g = document.querySelector(".media-gallery-overlay__photo-slider");
        if (g && mediaGallery.isVisible(g) && mediaGallery.isInViewport(g)) {
          gae("listing-media-gallery", "slider_next_arrow_key_navigation");
          var d = document.querySelector("#is-gallery-mobile-device"),
            e = "";
          null != d && (e = d.value),
            "true" != e &&
              (a.preventDefault(),
              mediaGallery.showSlides((SLIDEINDEX += 1), SLIDERELEMENTS));
        }
      }
      if ("Escape" == a.key) {
        var h = document.querySelector(".media-gallery-overlay__container");
        h &&
          mediaGallery.isVisible(h) &&
          mediaGallery.isInViewport(h) &&
          (gae("listing-media-gallery", "media_gallery_closed_with_esc_key"),
          mediaGallery.closeOverlay());
      }
    }),
    document.addEventListener("touchstart", function (a) {
      (a.target.classList.contains(
        "media-gallery-container__photo-slider-img"
      ) ||
        a.target.classList.contains(
          "media-gallery-container__photo-slider-img-mob"
        )) &&
        ((touchStartX = a.changedTouches[0].screenX),
        (touchStartY = a.changedTouches[0].screenY),
        2 === a.touches.length && (scaling = !0));
    }),
    document.addEventListener(
      "touchmove",
      function (b) {
        if (
          b.target.classList.contains(
            "media-gallery-container__photo-slider-img"
          ) ||
          b.target.classList.contains(
            "media-gallery-container__photo-slider-img-mob"
          )
        ) {
          var c = b.changedTouches[0].screenX - touchStartX,
            d = b.changedTouches[0].screenY - touchStartY;
          a(c) > a(d) && b.preventDefault();
        }
      },
      {
        passive: !1,
      }
    ),
    document.addEventListener("touchend", function (b) {
      if (
        b.target.classList.contains("media-gallery-container__photo-slider-img")
      ) {
        (touchEndX = b.changedTouches[0].screenX),
          (touchEndY = b.changedTouches[0].screenY);
        var c = touchEndX - touchStartX,
          d = touchEndY - touchStartY,
          e = SLIDEINDEX;
        if (touchStartX == touchEndX || touchStartY == touchEndY) return;
        if (a(c) > a(d))
          touchEndX <= touchStartX
            ? (gae("listing-media-gallery", "image_slider_swipe_right"),
              mediaGallery.showSlides((e += 1), SLIDERELEMENTSMOBILE))
            : (gae("listing-media-gallery", "image_slider_swipe_left"),
              mediaGallery.showSlides((e -= 1), SLIDERELEMENTSMOBILE));
        else return;
        scaling &&
          ((scaling = !1), gae("listing-media-gallery", "media_gallery_zoom"));
      }
      if (
        b.target.classList.contains(
          "media-gallery-container__photo-slider-img-mob"
        )
      ) {
        (touchEndX = b.changedTouches[0].screenX),
          (touchEndY = b.changedTouches[0].screenY);
        var f = touchEndX - touchStartX,
          g = touchEndY - touchStartY,
          h = SLIDEINDEXMOBILE;
        if (touchStartX == touchEndX || touchStartY == touchEndY) return;
        if (a(f) > a(g))
          touchEndX <= touchStartX
            ? (gae(
                "listing-media-gallery",
                "image_gallery_mobile_modal_slider"
              ),
              mediaGallery.renderSlides((h += 1), SLIDERELEMENTS))
            : (gae(
                "listing-media-gallery",
                "image_gallery_mobile_modal_slider"
              ),
              mediaGallery.renderSlides((h -= 1), SLIDERELEMENTS));
        else return;
        scaling &&
          ((scaling = !1), gae("listing-media-gallery", "media_gallery_zoom"));
      }
    });
  var b = document.querySelector("video");
  return (
    b &&
      (b.addEventListener("pause", function () {
        gae("listing-media-gallery", "media_gallery_video_paused");
      }),
      b.addEventListener("play", function () {
        gae("listing-media-gallery", "media_gallery_video_play");
      })),
    {
      openOverlay: function openOverlay(a, b) {
        document.querySelector("body").classList.add("listing-modal-open");
        var c = document.getElementById("media-gallery-overlay__container"),
          d = document.querySelector("#is-gallery-mobile-device").value;
        if (c) {
          switch ((c.classList.remove("hide"), b)) {
            case "slide":
              if ("true" == d) {
                var k = c.querySelector(
                  ".media-gallery-overlay__photo-slider-wrapper"
                );
                (k.innerHTML =
                  '<div class="photo-slider-wrapper-skeleton-mobile"></div>'),
                  gae(
                    "listing-media-gallery",
                    "mobile_image_".concat(a, "_clicked")
                  );
              } else {
                var l = c.querySelector(
                  ".media-gallery-overlay__photo-slider-wrapper"
                );
                (l.innerHTML =
                  '<div class="photo-slider-wrapper-skeleton"></div>'),
                  gae(
                    "listing-media-gallery",
                    "desktop_image_".concat(a, "_clicked")
                  );
              }
              break;
            case "gallery":
              var e = document.getElementById("photo_gallery"),
                f = document.getElementById(
                  "media-gallery-overlay__footer__media-viewer"
                ),
                g = document.getElementById(
                  "media-gallery-overlay__footer__slide-indicator"
                );
              f.classList.add("hide"),
                g.classList.add("hide"),
                e.classList.add("hide");
              var m = document.getElementById(
                "media-gallery-overlay__thumbnail"
              );
              m.classList.remove("hide"),
                (m.innerHTML = '<div class="photo-thumbnail-skeleton"></div>');
              break;
            default:
          }
          "true" != d &&
            ((SLIDEINDEX = 1),
            (GALLERYITEMS = []),
            (SLIDERELEMENTS = []),
            (PHOTOCOUNT = 0),
            (VIDEOCOUNT = 0));
          var h = document.querySelector("#media-gallery-listing-id").value,
            i = document.querySelector("#media-gallery-csrfToken").value,
            j = {
              credentials: "same-origin",
              method: "POST",
              body: JSON.stringify({
                reference_code: h,
              }),
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "X-CSRF-Token": i,
                "X-Requested-With": "XMLHttpRequest",
              },
            };
          fetch("/listing/json/gallery", j)
            .then(function (a) {
              return a.json();
            })
            .then(function (c) {
              (GALLERYITEMS = c), (SLIDEINDEX = a);
              var e = c.videos,
                f = c.photos;
              switch (
                ((PHOTOCOUNT = f.length),
                (VIDEOCOUNT = e.length),
                0 < VIDEOCOUNT && document.querySelector("video").pause(),
                "true" == d && (SLIDEINDEXMOBILE = SLIDEINDEX),
                b)
              ) {
                case "slide":
                  mediaGallery.openSlideView(f);
                  break;
                case "gallery":
                  mediaGallery.openThumbnailView();
                  break;
                default:
              }
            })
            .catch(function (a) {
              console.log(a);
            });
        }
      },
      showSlides: function showSlides(a, b) {
        var c = b.length;
        (SLIDEINDEX = a), a > c && (SLIDEINDEX = 1), 1 > a && (SLIDEINDEX = c);
        var d,
          e = _createForOfIteratorHelper(b);
        try {
          for (e.s(); !(d = e.n()).done; ) {
            var g = d.value;
            g.style.display = "none";
          }
        } catch (a) {
          e.e(a);
        } finally {
          e.f();
        }
        (b[SLIDEINDEX - 1].style.display = "block"),
          b[SLIDEINDEX - 1].classList.remove("hidden");
        var f = document.querySelector("#is-gallery-mobile-device").value;
        "true" == f
          ? (document
              .querySelector(
                ".media-gallery-container__photo-slider-indicators"
              )
              .classList.remove("hidden"),
            mediaGallery.renderCount(SLIDEINDEX, PHOTOCOUNT))
          : (document.querySelector(
              ".media-gallery-overlay__footer__slide-indicator .photo-index"
            ).innerHTML = "".concat(SLIDEINDEX, "/").concat(PHOTOCOUNT));
      },
      closeOverlay: function closeOverlay() {
        gae("listing-media-gallery", "media_gallery_closed");
        var a = document.getElementById("media-gallery-overlay__container"),
          b = document.getElementById("media-gallery-overlay__thumbnail"),
          c = document.getElementById(
            "media-gallery-overlay__footer__media-viewer"
          ),
          d = document.getElementById("media-gallery-overlay__video-view");
        if (
          (a.classList.add("hide"),
          b.classList.add("hide"),
          c.classList.remove("hide"),
          d)
        ) {
          var f = d.querySelector("video");
          f && f.pause(), d.classList.add("hide");
        }
        var e = document.querySelector("#is-gallery-mobile-device").value;
        "true" != e &&
          ((PHOTOCOUNT = 0),
          (SLIDEINDEX = 1),
          (GALLERYITEMS = []),
          (VIDEOCOUNT = 0)),
          document.querySelector("body").classList.remove("listing-modal-open");
      },
      openThumbnailView: function openThumbnailView() {
        gae("listing-media-gallery", "view_all_button_clicked");
        var a = document.getElementById("media-gallery-overlay__thumbnail"),
          b = document.getElementById(
            "media-gallery-overlay__footer__media-viewer"
          ),
          c = document.getElementById("photo_gallery"),
          d = document.getElementById("media-gallery-overlay__video-view"),
          e = document.getElementById(
            "media-gallery-overlay__footer__slide-indicator"
          );
        if (
          (a.classList.remove("hide"),
          b.classList.add("hide"),
          c.classList.add("hide"),
          e.classList.add("hide"),
          d)
        ) {
          var l = d.querySelector("video");
          l && l.pause(), d.classList.add("hide");
        }
        var f = "",
          g = VIDEOCOUNT,
          h = PHOTOCOUNT,
          i = GALLERYITEMS,
          j = i.videos,
          k = i.photos;
        0 < g &&
          ((f += "<h3 class='media-gallery-overlay__heading'>"
            .concat(translations.listingVideos, " <span>(")
            .concat(
              g,
              ')</span></h3><div id="media-gallery-overlay__thumbnail__video" class="media-gallery-overlay__thumbnail__video">'
            )),
          j.forEach(function (a) {
            f +=
              '<div class="media-gallery-overlay__thumbnail__video__item" onclick="mediaGallery.openVideoView(\''
                .concat(a.url, "', '")
                .concat(
                  a.thumbnailUrl,
                  '\')">\n                                            <img src="'
                )
                .concat(
                  a.thumbnailUrl,
                  '" alt="Video-thumbnail" />\n                                            <svg width="48" height="49" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg">\n                                                <ellipse cx="24" cy="24.1125" rx="24" ry="24.0314" fill="#202224" fill-opacity="0.8"></ellipse>\n                                                <path d="M17.25 33.8753V14.3498L33 24.1125L17.25 33.8753Z" stroke="white" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>\n                                            </svg>\n                                        </div>'
                );
          }),
          (f += "</div>")),
          0 < h &&
            ((f += "<h3 class='media-gallery-overlay__heading'>"
              .concat(translations.listingPhotos, " <span>(")
              .concat(
                h,
                ')</span></h3> <div id="media-gallery-overlay__thumbnail__photo" class="media-gallery-overlay__thumbnail__photo">'
              )),
            k.forEach(function (a, b) {
              f +=
                '<div class="media-gallery-overlay__thumbnail__photo__item" onclick="mediaGallery.openOverlay('
                  .concat(
                    b + 1,
                    ", 'slide')\">\n                                            <img src=\""
                  )
                  .concat(
                    a.url,
                    '" alt="Image-thumbnail"/>\n                                        </div>'
                  );
            }),
            (f += "</div>")),
          (a.innerHTML = f);
      },
      openSlideView: function openSlideView(a) {
        var b = document.getElementById("media-gallery-overlay__thumbnail"),
          c = document.querySelector("#is-gallery-mobile-device").value;
        b && b.classList.add("hide");
        var d = document.getElementById("media-gallery-overlay__container"),
          e = d.querySelector(".media-gallery-overlay__photo-slider-wrapper"),
          f = document.getElementById(
            "media-gallery-overlay__footer__media-viewer"
          );
        f.classList.remove("hide");
        var g = d.querySelector(
            ".media-gallery-overlay__footer__slide-indicator .photo-index"
          ),
          h = document.querySelector(
            ".media-gallery-overlay__footer__slide-indicator"
          ),
          i = document.getElementById("photo_gallery");
        h.classList.remove("hide"),
          (g.innerHTML = "".concat(SLIDEINDEX, "/").concat(PHOTOCOUNT));
        var j = "";
        a.forEach(function (a) {
          var b = "";
          "true" == c && (b = "media-gallery-container__photo-slider-img-mob"),
            (j += '<img src="'
              .concat(a.url, '" loading="lazy" class="')
              .concat(b, '" />'));
        }),
          (e.innerHTML = j),
          i.classList.remove("hide");
        var k = Array.from(e.querySelectorAll("img")),
          l = k.length;
        (SLIDERELEMENTS = k), mediaGallery.showSlides(SLIDEINDEX, k);
      },
      openVideoView: function openVideoView(a, b) {
        mediaGallery.openOverlay(0, "video"),
          gae("listing-media-gallery", "video_view_opened");
        var c = document.getElementById("media-gallery-overlay__thumbnail");
        c && c.classList.add("hide");
        var d = document.getElementById("media-gallery-overlay__container"),
          e = document.getElementById("media-gallery-overlay__video-view"),
          f = document.querySelector(".media-gallery-overlay__photo-slider"),
          g = document.querySelector(
            ".media-gallery-overlay__footer__slide-indicator"
          ),
          h = document.getElementById(
            "media-gallery-overlay__footer__media-viewer"
          );
        h.classList.remove("hide"),
          d.classList.remove("hide"),
          e.classList.remove("hide"),
          f.classList.add("hide"),
          g.classList.add("hide"),
          (videoContent =
            '<video\n                                controls\n                                autoplay\n                                controlsList="nodownload"\n                                src="'
              .concat(a, '"\n                                poster="')
              .concat(
                b,
                '"\n                                type="video/mp4">\n                            </video>'
              )),
          (e.innerHTML = videoContent);
      },
      fetchGalleryData: function fetchGalleryData() {
        var a = document.querySelector("#media-gallery-listing-id").value,
          b = document.querySelector("#media-gallery-csrfToken").value,
          c = {
            credentials: "same-origin",
            method: "POST",
            body: JSON.stringify({
              reference_code: a,
            }),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "X-CSRF-Token": b,
              "X-Requested-With": "XMLHttpRequest",
            },
          };
        fetch("/listing/json/gallery", c)
          .then(function (a) {
            return a.json();
          })
          .then(function (a) {
            (GALLERYITEMS = a), (SLIDEINDEX = 1);
            var b = a.videos,
              c = a.photos;
            (PHOTOCOUNT = c.length), (VIDEOCOUNT = b.length);
            var d = document.querySelector(
                ".media-gallery-container__photo-slider"
              ),
              e = "";
            c.forEach(function (a, b) {
              var c = "lazy";
              0 == b && (c = "eager"),
                (e += '<img src="'
                  .concat(a.url, '" loading=')
                  .concat(
                    c,
                    ' class="media-gallery-container__photo-slider-img" data-item='
                  )
                  .concat(
                    b,
                    ' alt="gallery-image" width="653" height="490"/>'
                  ));
            }),
              (d.innerHTML = e);
            var f = Array.from(d.querySelectorAll("img"));
            (SLIDERELEMENTSMOBILE = f), mediaGallery.showSlides(SLIDEINDEX, f);
          })
          .catch(function (a) {
            console.log(a);
          });
      },
      renderCount: function renderCount(a, b) {
        var c = document.querySelector(
            ".media-gallery-container__photo-slider-indicators"
          ),
          d = "<span>".concat(a, "/").concat(b, "</span>");
        c.innerHTML = d;
      },
      renderSlides: function renderSlides(a, b) {
        var c = b.length;
        (SLIDEINDEXMOBILE = a),
          a > c && (SLIDEINDEXMOBILE = 1),
          1 > a && (SLIDEINDEXMOBILE = c);
        var d,
          e = _createForOfIteratorHelper(b);
        try {
          for (e.s(); !(d = e.n()).done; ) {
            var f = d.value;
            f.style.display = "none";
          }
        } catch (a) {
          e.e(a);
        } finally {
          e.f();
        }
        (b[SLIDEINDEXMOBILE - 1].style.display = "block"),
          b[SLIDEINDEXMOBILE - 1].classList.remove("hidden"),
          (document.querySelector(
            ".media-gallery-overlay__footer__slide-indicator .photo-index"
          ).innerHTML = "".concat(SLIDEINDEXMOBILE, "/").concat(PHOTOCOUNT));
      },
      isInViewport: function isInViewport(a) {
        var b = a.getBoundingClientRect();
        return (
          0 <= b.top &&
          0 <= b.left &&
          b.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
          b.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
      },
      isVisible: function isVisible(a) {
        return !!(a.offsetWidth || a.offsetHeight || a.getClientRects().length);
      },
      scrollGallery: function scrollGallery() {
        0 == SCROLLINDEX &&
          (gae("listing-media-gallery", "media_gallery_scrolled"),
          (SCROLLINDEX = 1));
      },
    }
  );
})();

function _toConsumableArray(a) {
  return (
    _arrayWithoutHoles(a) ||
    _iterableToArray(a) ||
    _unsupportedIterableToArray(a) ||
    _nonIterableSpread()
  );
}

function _nonIterableSpread() {
  throw new TypeError(
    "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
  );
}

function _unsupportedIterableToArray(a, b) {
  if (a) {
    if ("string" == typeof a) return _arrayLikeToArray(a, b);
    var c = Object.prototype.toString.call(a).slice(8, -1);
    return (
      "Object" === c && a.constructor && (c = a.constructor.name),
      "Map" === c || "Set" === c
        ? Array.from(a)
        : "Arguments" === c ||
          /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c)
        ? _arrayLikeToArray(a, b)
        : void 0
    );
  }
}

function _iterableToArray(a) {
  if (
    ("undefined" != typeof Symbol && null != a[Symbol.iterator]) ||
    null != a["@@iterator"]
  )
    return Array.from(a);
}

function _arrayWithoutHoles(a) {
  if (Array.isArray(a)) return _arrayLikeToArray(a);
}

function _arrayLikeToArray(a, b) {
  (null == b || b > a.length) && (b = a.length);
  for (var c = 0, d = Array(b); c < b; c++) d[c] = a[c];
  return d;
}

function ownKeys(a, b) {
  var c = Object.keys(a);
  if (Object.getOwnPropertySymbols) {
    var d = Object.getOwnPropertySymbols(a);
    b &&
      (d = d.filter(function (b) {
        return Object.getOwnPropertyDescriptor(a, b).enumerable;
      })),
      c.push.apply(c, d);
  }
  return c;
}

function _objectSpread(a) {
  for (var b, c = 1; c < arguments.length; c++)
    (b = null == arguments[c] ? {} : arguments[c]),
      c % 2
        ? ownKeys(Object(b), !0).forEach(function (c) {
            _defineProperty(a, c, b[c]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(b))
        : ownKeys(Object(b)).forEach(function (c) {
            Object.defineProperty(a, c, Object.getOwnPropertyDescriptor(b, c));
          });
  return a;
}

function _defineProperty(a, b, c) {
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
}
var filterMap = (function () {
  return (
    document.addEventListener("DOMContentLoaded", function () {
      var a = localStorage.getItem("isRedirectedToSearchPage");
      null != a && filterMap.initMapOverlay();
    }),
    document.addEventListener("click", function (a) {
      if (
        (a.target.classList.contains("filter-map-button") &&
          ((STARTDATE = new Date()),
          gae("filter-map", "view_map_click"),
          a.target.classList.add("is-loading"),
          a.target.classList.contains("filter-map-no-redirect") ||
          a.target.classList.contains("filter-map-no-redirect-mobile")
            ? (a.target.classList.remove("is-loading"),
              filterMap.initMapOverlay())
            : localStorage.setItem("isRedirectedToSearchPage", !0)),
        a.target.classList.contains("filter-map-overlay-mobile") &&
          (document
            .querySelector(".filter-map-mobile-loader-container")
            .classList.remove("hidden"),
          document
            .querySelector(".filter-map-overlay-mobile")
            .classList.add("hidden")),
        a.target.classList.contains("listing-map-search-area"))
      ) {
        filterMap.initPaginationConfig(), filterMap.clear(), (LATLNGDATA = {});
        var b = MAP.getBounds(),
          c = b.getNorthWest(),
          d = b.getSouthEast(),
          e = c.lat,
          f = c.lng,
          g = d.lat,
          h = d.lng;
        gae(
          "filter-map",
          "search_this_area_click_with_start_lat_"
            .concat(e, "_start_lng_")
            .concat(f, "_and_end_lat_")
            .concat(g, "_end_lng_")
            .concat(h)
        ),
          (LATLNGDATA = {
            latStart: e,
            lngStart: f,
            latEnd: g,
            lngEnd: h,
          }),
          (RESULTSET = "search"),
          filterMap.fetchResults("search", LATLNGDATA);
      }
      if (a.target.classList.contains("listing-map-back-button")) {
        a.preventDefault();
        var i = new Date(),
          j = i.getTime() - STARTDATE.getTime();
        gae("filter-map", "exit_map_click"),
          gae("filter-map", "".concat(j, "_milliseconds_spent_by_user_on_map")),
          filterMap.clear(),
          null != MAP && MAP.remove(),
          $("#plt-filter-map-overlay").modal("hide");
        var k = document.querySelector("#is-map-mobile-device").value;
        if ("true" == k) {
          document
            .querySelector(".filter-map-mobile-loader-container")
            .classList.add("hidden"),
            document
              .querySelector(".filter-map-overlay-mobile")
              .classList.remove("hidden");
          var l = document.querySelector(".listing-results-cards");
          l.innerHTML = "";
        }
      }
    }),
    {
      initPaginationConfig: function initPaginationConfig() {
        (TOTAL_RESULTS = 0),
          (PAGE_LIMIT = 12),
          (CURRENT_PAGE = 1),
          (PAGES_ARRAY = []);
      },
      initMapOverlay: function initMapOverlay() {
        var a = document.querySelector("#plt-filter-map-overlay");
        (a.style.display = "block"), $("#plt-filter-map-overlay").modal("show");
        var b = document.querySelector("#is-map-mobile-device").value,
          c = 3;
        "true" == b && (c = 2),
          (MARKERS = new L.LayerGroup()),
          (MAP = L.map("map", {
            zoomControl: !1,
            maxBounds: [
              [-90, -180],
              [90, 180],
            ],
          })),
          "true" == b ? MAP.setView([0, 0], 0) : MAP.setView([0, 0], c),
          (MAP.options.minZoom = c),
          L.control
            .zoom({
              position: "topright",
            })
            .addTo(MAP),
          filterMap.initPaginationConfig(),
          (MARKERS_BY_SLUG = {}),
          (LISTINGS = []),
          (LATLNGDATA = {}),
          (RESULTSET = "default"),
          (STARTDATE = new Date()),
          filterMap.fetchResults(RESULTSET);
        var d = localStorage.getItem("isRedirectedToSearchPage");
        null != d && localStorage.removeItem("isRedirectedToSearchPage");
      },
      fetchResults: function fetchResults(a) {
        var b =
            1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
          c =
            2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 1,
          d = "/map",
          e = "",
          f = window.location.search,
          g = new URLSearchParams(f),
          h = g.has("page");
        if (h) {
          e = "".concat(d).concat(f);
          var o = g.getAll("page");
          (c = parseInt(o.toString())), (CURRENT_PAGE = c);
        } else {
          e =
            "" == f
              ? "".concat(d, "?page=").concat(c)
              : "".concat(d).concat(f, "&page=").concat(c);
        }
        var i = document.querySelector(".listing-results");
        i.innerHTML =
          '<div class="listing-skeleton-loader"><div class="listing-skeleton-loader__item"><div class="listing-skeleton-loader__item-inner"></div></div><div class="listing-skeleton-loader__item"><div class="listing-skeleton-loader__item-inner"></div></div><div class="listing-skeleton-loader__item"><div class="listing-skeleton-loader__item-inner"></div></div><div class="listing-skeleton-loader__item"><div class="listing-skeleton-loader__item-inner"></div></div><div class="listing-skeleton-loader__item"><div class="listing-skeleton-loader__item-inner"></div></div><div class="listing-skeleton-loader__item"><div class="listing-skeleton-loader__item-inner"></div></div><div class="listing-skeleton-loader__item"><div class="listing-skeleton-loader__item-inner"></div></div><div class="listing-skeleton-loader__item"><div class="listing-skeleton-loader__item-inner"></div></div><div class="listing-skeleton-loader__item"><div class="listing-skeleton-loader__item-inner"></div></div><div class="listing-skeleton-loader__item"><div class="listing-skeleton-loader__item-inner"></div></div><div class="listing-skeleton-loader__item"><div class="listing-skeleton-loader__item-inner"></div></div><div class="listing-skeleton-loader__item"><div class="listing-skeleton-loader__item-inner"></div></div></div>';
        var j = document.querySelector(".listing-map-search-area");
        j.classList.add("hidden");
        var k = document.querySelector(".listing-map-search-area-loader");
        k.classList.remove("hidden");
        var l = document.querySelector("#is-map-mobile-device").value,
          m = "";
        "default" === a ? (m = "") : "search" === a ? (m = b) : void 0;
        var n = {
          credentials: "same-origin",
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
          },
        };
        "search" == a && (n.body = JSON.stringify(m)),
          fetch(e, n)
            .then(function (a) {
              if (a.ok) return a.json();
              if ("true" == l) {
                var b = document.querySelector(".listing-results-cards");
                b.innerHTML = '<div class="map-error-container-mobile">'.concat(
                  translations.filterMap.somethingWentWrong,
                  "</div>"
                );
              } else {
                var c = document.querySelector(".listing-results");
                filterMap.showErrorOverlay(c);
              }
            })
            .then(function (a) {
              if ("true" == l) {
                var d = document.querySelector(".listing-results-cards");
                d.innerHTML = "";
              }
              filterMap.renderOverlay(a, c);
              var b = document.querySelector(".listing-map-search-area-loader");
              b.classList.add("hidden");
            })
            .catch(function () {
              if ("true" == l) {
                var b = document.querySelector(".listing-results-cards");
                b.innerHTML = '<div class="map-error-container-mobile">'.concat(
                  translations.filterMap.somethingWentWrong,
                  "</div>"
                );
              } else {
                var c = document.querySelector(".listing-results");
                filterMap.showErrorOverlay(c);
              }
              var a = document.querySelector(".listing-map-search-area-loader");
              a.classList.add("hidden");
            });
      },
      renderOverlay: function renderOverlay(a, b) {
        filterMap.renderShowcards(a, b), filterMap.initMap(a);
      },
      renderShowcards: function renderShowcards(a, b) {
        var c = document.querySelector("#is-map-mobile-device").value,
          d = a.listings,
          e = a.metaData.matchCount;
        if (0 < e) {
          var f = "",
            g = a.metaData.matchCount;
          TOTAL_RESULTS = g;
          var h = document.querySelector(".listing-results-count"),
            i = "";
          (i =
            500 < g
              ? "".concat(translations.filterMap.showing500Results)
              : ""
                  .concat(translations.filterMap.showing, " ")
                  .concat(g, " ")
                  .concat(translations.filterMap.results)),
            "search" == RESULTSET &&
              gae("filter-map", "search_returned_".concat(g, "_results")),
            (h.innerHTML = i);
          var j = document.querySelector(".listing-results");
          d.forEach(function (a, b) {
            var c = "",
              d = "";
            if (0 < a.durationInDays) {
              if (0 < a.nrPersons) {
                var e = "";
                (e =
                  1 == a.nrPersons
                    ? "".concat(translations.filterMap.nrPerson)
                    : "".concat(translations.filterMap.nrPersons)),
                  (d =
                    '<span class="detail-item detail-item--number-of-people">\n                                                    '
                      .concat(a.nrPersons, " ")
                      .concat(
                        e,
                        "\n                                                    </span> \xB7"
                      ));
              }
              c = ""
                .concat(
                  d,
                  ' <span class="detail-item detail-item--availability-and-days">\n                                                '
                )
                .concat(a.durationInDays, " ")
                .concat(
                  translations.filterMap.days,
                  "\n                                            </span>"
                );
            }
            (f +=
              "<div class=\"showcard-listing-mini\" onclick=\"gae('filter-map', 'filter_map_listing_results_showcard_click')\" onmouseover=\"filterMap.highlightMarker('"
                .concat(
                  a.url,
                  "')\" onmouseleave=\"filterMap.unhighlightMarker('"
                )
                .concat(
                  a.url,
                  "')\">\n                                    <a href='"
                )
                .concat(
                  a.url,
                  '\' class="showcard-mini-link" target="_blank">\n                                        <div class="showcard-listing-mini-image" style="background-image:url(\''
                )
                .concat(
                  a.photoUrl,
                  '\');"></div>\n                                        <div class="showcard-listing-mini-content">\n                                            <div class="showcard-listing-mini-title">\n                                                '
                )
                .concat(
                  a.title,
                  '\n                                            </div>\n\n                                            <div class="showcard-listing-mini-footer">\n                                                <div class="showcard-listing-mini-footer__details">\n                                                    '
                )
                .concat(
                  c,
                  '\n                                                </div>\n                                                <div class="showcard-listing-mini-footer__price">\n                                                    <span>'
                )
                .concat(translations.filterMap.from, "</span><strong>")
                .concat(a.price.currencySymbol, " ")
                .concat(
                  filterMap.formatPrice(a.price.amount),
                  "</strong>\n                                                </div>\n                                            </div>\n                                        </div>\n                                    </a>\n                                </div>"
                )),
              (LISTINGS[b] = a);
          }),
            (j.innerHTML = f);
          var k = document.querySelector(".listing-results-container");
          (k.scrollTop = 0), filterMap.renderPagination(b);
        } else if ("true" == c) {
          var l = document.querySelector(".listing-results-cards");
          l.innerHTML = '<div class="map-error-container-mobile">'.concat(
            translations.filterMap.noResultsTryZoom,
            "</div>"
          );
        } else {
          var m = document.querySelector(".listing-results");
          filterMap.showNoResultsOverlay(m);
          var n = document.querySelector(".listing-results-count");
          n.innerHTML = "";
          var o = document.querySelector(".listing-map-pagination");
          o.innerHTML = "";
        }
      },
      renderPagination: function renderPagination(a) {
        var b = filterMap.totalPages(),
          c = filterMap.getPagination(CURRENT_PAGE),
          d = document.querySelector(".listing-map-pagination"),
          e = "";
        if (1 >= c.pages.length) return void (d.innerHTML = e);
        var f = "hidden",
          g = "";
        1 < c.currentPage && (f = ""),
          a == b && (g = "hidden"),
          (e = '<a class="map-pagination-prev '
            .concat(f, '" onclick="filterMap.setPagination(')
            .concat(c.currentPage - 1, ')">')
            .concat(translations.filterMap.prev, "</a>")),
          c.pages.map(function (a) {
            var b = "";
            c.currentPage == a && (b = "active"),
              (e += '<a class="map-pagination-link '
                .concat(b, '" onclick="filterMap.setPagination(')
                .concat(a, ')">')
                .concat(a, "</a>"));
          }),
          (e += '<a class="map-pagination-next '
            .concat(
              g,
              "\" onclick=\"gae('filter-map', 'pagination_next_click');filterMap.setPagination("
            )
            .concat(c.currentPage + 1, ')">')
            .concat(translations.filterMap.next, "</a>")),
          (d.innerHTML = e);
      },
      initMap: function initMap(a) {
        var b = document.querySelector("#is-map-mobile-device").value,
          c = document.querySelector("#map-key-mobile").value,
          d = document.querySelector("#map-key-desktop").value,
          e = "";
        (e =
          "true" == b
            ? "https://api.maptiler.com/maps/streets/style.json?key=".concat(c)
            : "https://api.maptiler.com/maps/streets/style.json?key=".concat(
                d
              )),
          L.mapboxGL({
            attribution:
              '<a href="https://www.maptiler.com/copyright/" target="_blank">\xA9 MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">\xA9 OpenStreetMap contributors</a>',
            style: e,
          }).addTo(MAP);
        var f = a.metaData.matchCount;
        0 < f && filterMap.plotListingsOnMap(a),
          MAP.on("dragend", function () {
            filterMap.showSearchArea();
          }),
          MAP.on("zoomend", function () {
            filterMap.showSearchArea();
          });
      },
      showSearchArea: function showSearchArea() {
        var a = document.querySelector(".listing-map-search-area");
        a.classList.remove("hidden");
      },
      plotListingsOnMap: function plotListingsOnMap(a) {
        var b = filterMap.getIcon("black"),
          c = document.querySelector("#is-map-mobile-device").value,
          d = a.listings,
          e = new L.LatLngBounds();
        if (
          (d.forEach(function (a) {
            var d = a.location,
              f = d.lat,
              g = d.lng,
              h = L.marker([f, g], {
                icon: b,
                draggable: !1,
                autoPan: !0,
                riseOnHover: !0,
              }),
              i = "map_marker_click_at_listing_".concat(a.url);
            h.on("mouseover", function () {
              var b =
                "<div class=\"showcard-mini-popup\" onclick=\"gae('filter-map', '"
                  .concat(
                    i,
                    '\')">\n                                            <a class="showcard-mini-popup-link" href=\''
                  )
                  .concat(
                    a.url,
                    '\' target="_blank">\n                                                <div class="showcard-mini-popup-image" style="background-image:url(\''
                  )
                  .concat(
                    a.photoUrl,
                    '\');"></div>\n                                                    <div class="showcard-mini-popup-content">\n                                                        <div class="showcard-mini-popup-title">\n                                                            '
                  )
                  .concat(
                    a.title,
                    '\n                                                        </div>\n                                                        <div class="showcard-mini-popup-footer">\n                                                            <div class="showcard-mini-popup-footer__details">\n                                                                <span>'
                  )
                  .concat(a.nrPersons, " ")
                  .concat(translations.filterMap.nrPersons, " \u2022 ")
                  .concat(a.durationInDays, " ")
                  .concat(
                    translations.filterMap.days,
                    '</span>\n                                                            </div>\n                                                            <div class="showcard-mini-popup-footer__price">\n                                                                <span>'
                  )
                  .concat(translations.filterMap.from, "</span><strong>")
                  .concat(a.price.currencySymbol, " ")
                  .concat(
                    filterMap.formatPrice(a.price.amount),
                    "</strong>\n                                                            </div>\n                                                        </div>\n                                                    </div>\n                                                </div>\n                                            </a>\n                                        </div>"
                  );
              h.bindPopup(b),
                h.setIcon(filterMap.getIcon("green")),
                gae(
                  "filter-map",
                  "map_marker_click_at_lat_".concat(f, "_and_lng_").concat(g)
                );
            }),
              h.on("mouseout", function () {
                h.setIcon(filterMap.getIcon("black"));
              }),
              "true" == c &&
                h.on("click", function () {
                  var b = document.querySelector(".listing-results-cards"),
                    c =
                      '<div class="showcard-listing-mini">\n                                        <a href=\''
                        .concat(
                          a.url,
                          '\' class="showcard-mini-link">\n                                            <div class="showcard-listing-mini-image" style="background-image:url(\''
                        )
                        .concat(
                          a.photoUrl,
                          '\');"></div>\n                                            <div class="showcard-listing-mini-content">\n                                                <div class="showcard-listing-mini-title">\n                                                    '
                        )
                        .concat(
                          a.title,
                          '\n                                                </div>\n\n                                                <div class="showcard-listing-mini-footer">\n                                                    <div class="showcard-listing-mini-footer__details">\n                                                        <span class="detail-item detail-item--availability-and-days">\n                                                            '
                        )
                        .concat(a.durationInDays, " ")
                        .concat(
                          translations.filterMap.days,
                          '\n                                                        </span>\n                                                    </div>\n                                                    <div class="showcard-listing-mini-footer__price">\n                                                        <strong>'
                        )
                        .concat(a.price.currencySymbol, " ")
                        .concat(
                          filterMap.formatPrice(a.price.amount),
                          "</strong>\n                                                    </div>\n                                                </div>\n                                            </div>\n                                        </a>\n                                    </div>"
                        );
                  (b.innerHTML = c),
                    h.setIcon(filterMap.getIcon("green")),
                    gae(
                      "filter-map",
                      "map_marker_click_at_lat-"
                        .concat(f, "_and_lng-")
                        .concat(g)
                    );
                  var d = _objectSpread({}, MARKERS_BY_SLUG);
                  for (var e in (delete d[a.url], d))
                    filterMap.unhighlightMarker(e);
                }),
              (MARKERS_BY_SLUG[a.url] = h),
              e.extend(h.getLatLng()),
              MARKERS.addLayer(h);
          }),
          MAP.addLayer(MARKERS),
          e.getNorthWest().lat != e.getSouthEast().lat &&
            e.getNorthWest().lng != e.getSouthEast().lng)
        )
          MAP.fitBounds(e);
        else {
          var f = e.getNorthWest().lat,
            g = e.getNorthWest().lng;
          MAP.panTo([f, g]);
        }
      },
      getPagination: function getPagination(a) {
        var b = TOTAL_RESULTS,
          c = PAGE_LIMIT,
          d = filterMap.totalPages(),
          e = 0,
          f = 0;
        5 >= d
          ? ((e = 1), (f = d))
          : 3 >= a
          ? ((e = 1), (f = 5))
          : a + 2 >= d
          ? ((e = d - 4), (f = d))
          : ((e = a - 2), (f = a + 2));
        var g = (a - 1) * c,
          h = Math.min(g + c - 1, b - 1),
          i = _toConsumableArray(Array(f + 1 - e).keys()).map(function (a) {
            return e + a;
          });
        return {
          currentPage: a,
          totalPages: d,
          startPage: e,
          endPage: f,
          startIndex: g,
          endIndex: h,
          pages: i,
        };
      },
      setPagination: function setPagination(a) {
        1 > a ||
          a > TOTAL_RESULTS ||
          (filterMap.getPagination(a),
          filterMap.clear(),
          (CURRENT_PAGE = a),
          filterMap.fetchResults(RESULTSET, LATLNGDATA, a));
      },
      totalPages: function totalPages() {
        var a = TOTAL_RESULTS,
          b = PAGE_LIMIT,
          c = Math.ceil(a / b);
        return c;
      },
      clear: function clear() {
        (LISTINGS = []),
          (MARKERS_BY_SLUG = {}),
          MARKERS.clearLayers(),
          (STARTDATE = new Date());
      },
      showErrorOverlay: function showErrorOverlay(a) {
        var b =
          '<div class="map-error-container">\n                            <figure>\n                                <img src="/static/files/error.svg" alt="error"/>\n                            </figure>\n                            <div class="text-1">'
            .concat(
              translations.filterMap.somethingWentWrong,
              '</div>\n                            <div class="text-2">'
            )
            .concat(
              translations.filterMap.refreshPage,
              "</div>\n                        </div>"
            );
        a.innerHTML = b;
      },
      showNoResultsOverlay: function showNoResultsOverlay(a) {
        var b =
          '<div class="map-error-container">\n                            <figure>\n                                <img src="/static/files/error.svg" alt="error"/>\n                            </figure>\n                            <div class="text-1">'
            .concat(
              translations.filterMap.noResultsFound,
              '</div>\n                            <div class="text-2">'
            )
            .concat(
              translations.filterMap.noResultsTryBrowse,
              "</div>\n                        </div>"
            );
        a.innerHTML = b;
      },
      getIcon: function getIcon(a) {
        var b = new L.Icon({
          iconUrl: "/static/files/marker-icon-".concat(a, ".svg"),
          shadowUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [25, 41],
        });
        return b;
      },
      highlightMarker: function highlightMarker(a) {
        event.preventDefault();
        var b = MARKERS_BY_SLUG[a];
        b.setIcon(filterMap.getIcon("green")), b.setZIndexOffset(50);
      },
      unhighlightMarker: function unhighlightMarker(a) {
        event.preventDefault();
        var b = MARKERS_BY_SLUG[a];
        b.setIcon(filterMap.getIcon("black")), b.setZIndexOffset(0);
      },
      formatPrice: function formatPrice(a) {
        var b = a.toString(),
          c = b.substring(0, b.length - 3) || 0,
          d = b.substr(-3);
        return 0 == c ? a : "".concat(c).concat(",").concat(d);
      },
    }
  );
})();
var token = "";

function setToken(a) {
  token = a;
}
$(function () {
  var a = $("#edit_package_button.mainText").html();
  $("#edit_package_button").on("click", function () {
    return (
      $(this).toggleClass("edit-mode", "non-edit-mode"),
      $("#edit_package").toggleClass("editable", "noneditable"),
      $(this).toggleClass("altText"),
      $("#remote_edit_package_button").toggleClass("hide"),
      $(".mainText").html(a),
      $(".altText").text("Cancel"),
      !1
    );
  }),
    $("#remote_edit_package_button").on("click", function () {
      $("#edit_package_button").trigger("click");
      var a = $(this.hash);
      return (
        (a = a.length ? a : $("[name=" + this.hash.slice(1) + "]")),
        !!a.length &&
          ($("html,body").animate(
            {
              scrollTop: a.offset().top - 25,
            },
            400
          ),
          !1)
      );
    }),
    $("#edit_package").bind("successCallback", function () {
      $(".package_element .show .price").html($("#price").val()),
        $(".package_element .show .package-attributes").html(
          $("#menu1").html()
        ),
        $("#arrival_date_show").html($("#arrival_date_picker").val()),
        $("#departure_date_show").html($("#departure_date_picker").val()),
        $("#listing_title_show").html($("#listing_title").val()),
        $("#edit_package_button").click(),
        $(location).attr(
          "href",
          "/organizer/inquiries/" + token + "/state/default"
        );
    });
});
var validation = (function () {
  return {
    findAncestor: function findAncestor(a, b) {
      for (
        ;
        (a = a.parentElement) && !(a.matches || a.matchesSelector).call(a, b);

      );
      return a;
    },
    setValidation: function setValidation(a, b) {
      var c =
          !(2 < arguments.length && arguments[2] !== void 0) || arguments[2],
        d = !(3 < arguments.length && arguments[3] !== void 0) || arguments[3];
      b && c && (a.classList.remove("error"), a.classList.add("success")),
        !b && d && (a.classList.remove("success"), a.classList.add("error"));
    },
    isMinimalLength: function isMinimalLength(a, b) {
      return a.length >= b;
    },
    containsUppercaseCharacters: function containsUppercaseCharacters(a) {
      return /([A-Z])+/.test(a);
    },
    containsLowercaseCharacters: function containsLowercaseCharacters(a) {
      return /([a-z])+/.test(a);
    },
    containsNumbers: function containsNumbers(a) {
      return /\d/.test(a);
    },
    containsSameValue: function containsSameValue(a, b) {
      return a === b;
    },
    isValidEmail: function isValidEmail(a) {
      return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        (a + "").toLowerCase()
      );
    },
    simpleValidation: function simpleValidation(a, b, c, d) {
      var e = validation.findAncestor(a, b);
      "string" == typeof a.value && a.value.trim(),
        "" == a.value
          ? validation.setValidation(e, !1, c, d)
          : validation.setValidation(e, !0, c, d);
    },
    emailValidation: function emailValidation(a, b, c, d) {
      var e = validation.findAncestor(a, b);
      validation.isValidEmail(a.value)
        ? validation.setValidation(e, !0, c, d)
        : validation.setValidation(e, !1, c, d);
    },
    isPasswordValid: function isPasswordValid(a, b, c, d) {
      var e = validation.findAncestor(a, b),
        f = validation.isMinimalLength(a.value, 8),
        g = validation.containsNumbers(a.value),
        h = validation.containsUppercaseCharacters(a.value),
        i = validation.containsLowercaseCharacters(a.value);
      Promise.all([f, g, h, i]).then(function (a) {
        var b = !a.includes(!1);
        validation.setValidation(e, b, c, d);
      });
    },
    hasFormErrors: function hasFormErrors(a) {
      var b = document.querySelector(a);
      return null !== b.querySelector(".form-group.error");
    },
    clear: function clear() {
      for (
        var a = document.querySelectorAll(".form-group"), b = 0;
        b < a.length;
        b++
      ) {
        a[b].classList.remove("success", "error");
        for (
          var c = a[b].querySelectorAll(".success, .error"), d = 0;
          d < c.length;
          d++
        )
          c[d].classList.remove("success", "error");
      }
    },
    resetSteps: function resetSteps() {
      for (
        var a = document.querySelectorAll(".steps .step"),
          b = document.querySelectorAll(".plt-modal .modal-body"),
          c = 0;
        c < a.length;
        c++
      )
        a[c].classList.remove("move-in", "move-out");
      for (var d = 0; d < b.length; d++) b[d].removeAttribute("style");
    },
    clearFull: function clearFull(a) {
      var b = document.querySelector(a);
      null !== b && (b.reset(), validation.clear(), validation.resetSteps(b));
    },
  };
})();

function _createForOfIteratorHelper(a, b) {
  var c =
    ("undefined" != typeof Symbol && a[Symbol.iterator]) || a["@@iterator"];
  if (!c) {
    if (
      Array.isArray(a) ||
      (c = _unsupportedIterableToArray(a)) ||
      (b && a && "number" == typeof a.length)
    ) {
      c && (a = c);
      var d = 0,
        e = function () {};
      return {
        s: e,
        n: function n() {
          return d >= a.length
            ? {
                done: !0,
              }
            : {
                done: !1,
                value: a[d++],
              };
        },
        e: function e(a) {
          throw a;
        },
        f: e,
      };
    }
    throw new TypeError(
      "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
    );
  }
  var f,
    g = !0,
    h = !1;
  return {
    s: function s() {
      c = c.call(a);
    },
    n: function n() {
      var a = c.next();
      return (g = a.done), a;
    },
    e: function e(a) {
      (h = !0), (f = a);
    },
    f: function f() {
      try {
        g || null == c.return || c.return();
      } finally {
        if (h) throw f;
      }
    },
  };
}

function _toConsumableArray(a) {
  return (
    _arrayWithoutHoles(a) ||
    _iterableToArray(a) ||
    _unsupportedIterableToArray(a) ||
    _nonIterableSpread()
  );
}

function _nonIterableSpread() {
  throw new TypeError(
    "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
  );
}

function _unsupportedIterableToArray(a, b) {
  if (a) {
    if ("string" == typeof a) return _arrayLikeToArray(a, b);
    var c = Object.prototype.toString.call(a).slice(8, -1);
    return (
      "Object" === c && a.constructor && (c = a.constructor.name),
      "Map" === c || "Set" === c
        ? Array.from(a)
        : "Arguments" === c ||
          /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c)
        ? _arrayLikeToArray(a, b)
        : void 0
    );
  }
}

function _iterableToArray(a) {
  if (
    ("undefined" != typeof Symbol && null != a[Symbol.iterator]) ||
    null != a["@@iterator"]
  )
    return Array.from(a);
}

function _arrayWithoutHoles(a) {
  if (Array.isArray(a)) return _arrayLikeToArray(a);
}

function _arrayLikeToArray(a, b) {
  (null == b || b > a.length) && (b = a.length);
  for (var c = 0, d = Array(b); c < b; c++) d[c] = a[c];
  return d;
}
$(function () {
  if (767 < $(window).width()) {
    var a = $(".js-showcard-link");
    a.attr("target", "_blank");
  }
}),
  document.addEventListener("DOMContentLoaded", function () {
    var a = document.querySelectorAll(".showcard-listing-image"),
      b = _toConsumableArray(a);
    0 < b.length &&
      b.forEach(function (a) {
        var b = Math.abs,
          c = a.querySelector(".slider-wrapper"),
          d = 0,
          f = 0,
          g = 0,
          h = 0;
        if (c) {
          var i = function (b, c) {
              (p = b), b > o && (p = 1), 1 > b && (p = o);
              var d,
                e = _createForOfIteratorHelper(c);
              try {
                for (e.s(); !(d = e.n()).done; ) {
                  var g = d.value;
                  g.style.display = "none";
                }
              } catch (a) {
                e.e(a);
              } finally {
                e.f();
              }
              c[p - 1].style.display = "block";
              var f = a.querySelectorAll("button");
              c[p - 1].classList.remove("hidden"),
                f.forEach(function (a) {
                  return a.classList.remove("active");
                }),
                a
                  .querySelector("[data-slide='".concat(p, "']"))
                  .classList.add("active");
            },
            e = function () {
              for (var a, b = 0; b < o; b++)
                (a = document.createElement("button")),
                  a.setAttribute("data-slide", b + 1),
                  j.appendChild(a);
            },
            j = a.querySelector(".slider-indicators-list"),
            k = a.querySelector(".slider-prev"),
            l = a.querySelector(".slider-next"),
            m = Array.from(c.querySelectorAll("img")),
            o = m.length,
            p = 1;
          e(),
            i(p, m),
            j.addEventListener("click", function (a) {
              if (
                (a.preventDefault(), a.target && "BUTTON" == a.target.nodeName)
              ) {
                var b = a.target.dataset.slide;
                gae("showcard", "slider indicator to ".concat(b)), i(b, m);
              }
            }),
            k.addEventListener("click", function (a) {
              a.preventDefault(),
                i((p -= 1), m),
                gae("showcard", "slider previous");
            }),
            l.addEventListener("click", function (a) {
              a.preventDefault(),
                i((p += 1), m),
                gae("showcard", "slider next");
            }),
            c.addEventListener("touchstart", function (a) {
              (d = a.changedTouches[0].screenX),
                (g = a.changedTouches[0].screenY);
            }),
            c.addEventListener("touchmove", function (a) {
              var c = a.changedTouches[0].screenX - d,
                e = a.changedTouches[0].screenY - g;
              b(c) > b(e) && a.preventDefault();
            }),
            c.addEventListener("touchend", function (a) {
              (f = a.changedTouches[0].screenX),
                (h = a.changedTouches[0].screenY);
              var c = f - d,
                e = h - g;
              d != f &&
                g != h &&
                b(c) > b(e) &&
                (f <= d ? i((p += 1), m) : i((p -= 1), m));
            });
        }
      });
  });
$(function () {
  var a = "sm";
  768 <= $(window).width() && 1024 > $(window).width()
    ? (a = "md")
    : 1024 <= $(window).width() && (a = "lg");
  $(".js-responsive").each(function () {
    $(this).attr("data-responsive-img-" + a)
      ? $(this).append(
          '<img src="' + $(this).attr("data-responsive-img-" + a) + '">'
        )
      : $(this).attr("data-responsive-bg-" + a) &&
        $(this)
          .css(
            "background",
            "center no-repeat url(" +
              $(this).attr("data-responsive-bg-" + a) +
              ")"
          )
          .css("background-size", "cover");
  });
});
for (
  var letters,
    defaultDiacriticsRemovalap = [
      {
        base: "A",
        letters:
          "A\u24B6\uFF21\xC0\xC1\xC2\u1EA6\u1EA4\u1EAA\u1EA8\xC3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\xC4\u01DE\u1EA2\xC5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F",
      },
      {
        base: "AA",
        letters: "\uA732",
      },
      {
        base: "AE",
        letters: "\xC6\u01FC\u01E2",
      },
      {
        base: "AO",
        letters: "\uA734",
      },
      {
        base: "AU",
        letters: "\uA736",
      },
      {
        base: "AV",
        letters: "\uA738\uA73A",
      },
      {
        base: "AY",
        letters: "\uA73C",
      },
      {
        base: "B",
        letters: "B\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181",
      },
      {
        base: "C",
        letters:
          "C\u24B8\uFF23\u0106\u0108\u010A\u010C\xC7\u1E08\u0187\u023B\uA73E",
      },
      {
        base: "D",
        letters:
          "D\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779",
      },
      {
        base: "DZ",
        letters: "\u01F1\u01C4",
      },
      {
        base: "Dz",
        letters: "\u01F2\u01C5",
      },
      {
        base: "E",
        letters:
          "E\u24BA\uFF25\xC8\xC9\xCA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\xCB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E",
      },
      {
        base: "F",
        letters: "F\u24BB\uFF26\u1E1E\u0191\uA77B",
      },
      {
        base: "G",
        letters:
          "G\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E",
      },
      {
        base: "H",
        letters:
          "H\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D",
      },
      {
        base: "I",
        letters:
          "I\u24BE\uFF29\xCC\xCD\xCE\u0128\u012A\u012C\u0130\xCF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197",
      },
      {
        base: "J",
        letters: "J\u24BF\uFF2A\u0134\u0248",
      },
      {
        base: "K",
        letters:
          "K\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2",
      },
      {
        base: "L",
        letters:
          "L\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780",
      },
      {
        base: "LJ",
        letters: "\u01C7",
      },
      {
        base: "Lj",
        letters: "\u01C8",
      },
      {
        base: "M",
        letters: "M\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C",
      },
      {
        base: "N",
        letters:
          "N\u24C3\uFF2E\u01F8\u0143\xD1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4",
      },
      {
        base: "NJ",
        letters: "\u01CA",
      },
      {
        base: "Nj",
        letters: "\u01CB",
      },
      {
        base: "O",
        letters:
          "O\u24C4\uFF2F\xD2\xD3\xD4\u1ED2\u1ED0\u1ED6\u1ED4\xD5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\xD6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\xD8\u01FE\u0186\u019F\uA74A\uA74C",
      },
      {
        base: "OI",
        letters: "\u01A2",
      },
      {
        base: "OO",
        letters: "\uA74E",
      },
      {
        base: "OU",
        letters: "\u0222",
      },
      {
        base: "OE",
        letters: "\x8C\u0152",
      },
      {
        base: "oe",
        letters: "\x9C\u0153",
      },
      {
        base: "P",
        letters: "P\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754",
      },
      {
        base: "Q",
        letters: "Q\u24C6\uFF31\uA756\uA758\u024A",
      },
      {
        base: "R",
        letters:
          "R\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782",
      },
      {
        base: "S",
        letters:
          "S\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784",
      },
      {
        base: "T",
        letters:
          "T\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786",
      },
      {
        base: "TZ",
        letters: "\uA728",
      },
      {
        base: "U",
        letters:
          "U\u24CA\uFF35\xD9\xDA\xDB\u0168\u1E78\u016A\u1E7A\u016C\xDC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244",
      },
      {
        base: "V",
        letters: "V\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245",
      },
      {
        base: "VY",
        letters: "\uA760",
      },
      {
        base: "W",
        letters: "W\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72",
      },
      {
        base: "X",
        letters: "X\u24CD\uFF38\u1E8A\u1E8C",
      },
      {
        base: "Y",
        letters:
          "Y\u24CE\uFF39\u1EF2\xDD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE",
      },
      {
        base: "Z",
        letters:
          "Z\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762",
      },
      {
        base: "a",
        letters:
          "a\u24D0\uFF41\u1E9A\xE0\xE1\xE2\u1EA7\u1EA5\u1EAB\u1EA9\xE3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\xE4\u01DF\u1EA3\xE5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250",
      },
      {
        base: "aa",
        letters: "\uA733",
      },
      {
        base: "ae",
        letters: "\xE6\u01FD\u01E3",
      },
      {
        base: "ao",
        letters: "\uA735",
      },
      {
        base: "au",
        letters: "\uA737",
      },
      {
        base: "av",
        letters: "\uA739\uA73B",
      },
      {
        base: "ay",
        letters: "\uA73D",
      },
      {
        base: "b",
        letters: "b\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253",
      },
      {
        base: "c",
        letters:
          "c\u24D2\uFF43\u0107\u0109\u010B\u010D\xE7\u1E09\u0188\u023C\uA73F\u2184",
      },
      {
        base: "d",
        letters:
          "d\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A",
      },
      {
        base: "dz",
        letters: "\u01F3\u01C6",
      },
      {
        base: "e",
        letters:
          "e\u24D4\uFF45\xE8\xE9\xEA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\xEB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD",
      },
      {
        base: "f",
        letters: "f\u24D5\uFF46\u1E1F\u0192\uA77C",
      },
      {
        base: "g",
        letters:
          "g\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F",
      },
      {
        base: "h",
        letters:
          "h\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265",
      },
      {
        base: "hv",
        letters: "\u0195",
      },
      {
        base: "i",
        letters:
          "i\u24D8\uFF49\xEC\xED\xEE\u0129\u012B\u012D\xEF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131",
      },
      {
        base: "j",
        letters: "j\u24D9\uFF4A\u0135\u01F0\u0249",
      },
      {
        base: "k",
        letters:
          "k\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3",
      },
      {
        base: "l",
        letters:
          "l\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747",
      },
      {
        base: "lj",
        letters: "\u01C9",
      },
      {
        base: "m",
        letters: "m\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F",
      },
      {
        base: "n",
        letters:
          "n\u24DD\uFF4E\u01F9\u0144\xF1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5",
      },
      {
        base: "nj",
        letters: "\u01CC",
      },
      {
        base: "o",
        letters:
          "o\u24DE\uFF4F\xF2\xF3\xF4\u1ED3\u1ED1\u1ED7\u1ED5\xF5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\xF6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\xF8\u01FF\u0254\uA74B\uA74D\u0275",
      },
      {
        base: "oi",
        letters: "\u01A3",
      },
      {
        base: "ou",
        letters: "\u0223",
      },
      {
        base: "oo",
        letters: "\uA74F",
      },
      {
        base: "p",
        letters: "p\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755",
      },
      {
        base: "q",
        letters: "q\u24E0\uFF51\u024B\uA757\uA759",
      },
      {
        base: "r",
        letters:
          "r\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783",
      },
      {
        base: "s",
        letters:
          "s\u24E2\uFF53\xDF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B",
      },
      {
        base: "t",
        letters:
          "t\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787",
      },
      {
        base: "tz",
        letters: "\uA729",
      },
      {
        base: "u",
        letters:
          "u\u24E4\uFF55\xF9\xFA\xFB\u0169\u1E79\u016B\u1E7B\u016D\xFC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289",
      },
      {
        base: "v",
        letters: "v\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C",
      },
      {
        base: "vy",
        letters: "\uA761",
      },
      {
        base: "w",
        letters:
          "w\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73",
      },
      {
        base: "x",
        letters: "x\u24E7\uFF58\u1E8B\u1E8D",
      },
      {
        base: "y",
        letters:
          "y\u24E8\uFF59\u1EF3\xFD\u0177\u1EF9\u0233\u1E8F\xFF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF",
      },
      {
        base: "z",
        letters:
          "z\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763",
      },
    ],
    diacriticsMap = {},
    i = 0;
  i < defaultDiacriticsRemovalap.length;
  i++
) {
  letters = defaultDiacriticsRemovalap[i].letters;
  for (var j = 0; j < letters.length; j++)
    diacriticsMap[letters[j]] = defaultDiacriticsRemovalap[i].base;
}

function removeDiacritics(a) {
  return a.replace(/[^\u0000-\u007E]/g, function (b) {
    return diacriticsMap[b] || b;
  });
}
$(function () {
  var a = function (a) {
      var b = {},
        c = a.offset() || null;
      return (
        c && c.top && ((b.top = c.top), (b.bottom = c.top + a.outerHeight())), b
      );
    },
    b = function (b, c) {
      var d = b.offset() || null;
      if (d && d.top) {
        var e = a(b),
          f = $(window).scrollTop(),
          g = $(window).height(),
          h = f + g,
          i = e.bottom + c.height() > f,
          j = e.top < h - c.height();
        if (i && j)
          c.addClass("in-view"), c.css("left", ""), c.css("width", "");
        else {
          c.removeClass("in-view");
          var o = $(window).width();
          if (767 < o) {
            var p = $(".listing-query-box");
            p.length &&
              p.offset() &&
              p.offset().left &&
              (c.css("left", p.offset().left), c.css("width", p.outerWidth()));
          } else c.css("left", ""), c.css("width", "");
          var k = $(".site__footer"),
            l = $(".tripaneer-usps-footer");
          if (k.length) {
            var m = a(k),
              n = a(c);
            if (l.length) {
              var q = a(l);
              h > q.top ? c.css("bottom", h - q.top) : c.css("bottom", "");
            } else h > m.top ? c.css("bottom", h - m.top) : c.css("bottom", "");
          }
        }
      }
    },
    c = function (a, b) {
      return a.length && b.length;
    },
    d = function (a, d) {
      return c(a, d) && b(a, d);
    },
    e = function () {
      return d(
        $(".js-listing-sidebar-anchor-top"),
        $(".js-sidebar-sticky-button")
      );
    };
  $(
    ".js-sidebar-inquiry-button, .js-sidebar-reservation-button, .js-sidebar-instant-booking-button"
  ).on("click", function () {
    var a = $(".js-sidebar-sticky-button"),
      b = $(window),
      c = $(".js-listing-sidebar-anchor-top"),
      d = $(window).scrollTop(),
      e = d + $(window).innerHeight(),
      f = c.offset();
    if (f && f.top) {
      var g = f.top,
        h =
          g <= d ||
          g >
            e - (a.outerHeight() - 0.8 * $("#listing_side_list").outerHeight());
      if (h) {
        var i = 5 + g + a.outerHeight() - b.innerHeight();
        return (
          $("html, body").animate(
            {
              scrollTop: i,
            },
            400
          ),
          $(this).blur(),
          !1
        );
      }
    }
  }),
    e();
  var f = function () {
    e();
  };
  (f.noThrottling = !0), $(window).on("resize scroll", f);
});
$(function () {
  $(document).mousedown(function (a) {
    if ($(".cc-window").length && $(".cc-window").is(":visible")) {
      var b = $(".cc-window");
      b.is(a.target) ||
        0 !== b.has(a.target).length ||
        $(".cc-window .cc-dismiss")[0].click();
    }
  });
});
var customerProfile = (function () {
  return (
    document.addEventListener("DOMContentLoaded", function () {
      var a = document.querySelector(".my-profile .vouchers-container");
      a && customerProfile.getCustomerVouchers();
    }),
    document.addEventListener("click", function (a) {
      a.target.classList.contains("customer-voucher") &&
        customerProfile.showCustomerVouchersInformation(a.target),
        (a.target.classList.contains("modal-backdrop-light") ||
          a.target.classList.contains("close")) &&
          modals.destroy(a.target);
    }),
    {
      getCustomerVouchers: function getCustomerVouchers() {
        var a = document.querySelector(".vouchers-container .vouchers-holder");
        loader.create(a, !0);
        fetch("/json/vouchers/all", {
          credentials: "same-origin",
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
          .then(function (a) {
            return loader.destroy(), a.json();
          })
          .then(function (b) {
            var c = document.querySelector("[data-customer-verified]").dataset
              .customerVerified;
            if (!("true" == c))
              a.insertAdjacentHTML(
                "beforeend",
                customerProfile.verifyCustomerVouchersBubble()
              );
            else if (b && 0 < b.length) {
              var d = b.filter(function (a) {
                var b = new Date().valueOf(),
                  c = new Date(a.end).valueOf(),
                  d = new Date(a.start).valueOf();
                if (
                  d < b &&
                  c > b &&
                  !1 == a.isConsumed &&
                  "0001-01-01T00:00:00" == a.redemption.paidAt &&
                  "0001-01-01T00:00:00" == a.cancelledAt
                )
                  return a;
              });
              vouchers.data.voucher.set(d),
                0 < d.length
                  ? customerProfile.renderCustomerVouchers(d, a)
                  : vouchers.renderEmpty(a);
            } else vouchers.renderEmpty(a);
          })
          .catch(function (a) {
            console.log(a);
          });
      },
      renderCustomerVouchers: function renderCustomerVouchers(a, b) {
        var c = document.querySelector("[data-customer-verified]").dataset
            .customerVerified,
          d = "";
        0 < a.length
          ? (a.forEach(function (a) {
              var b = !1,
                e = new Date().valueOf(),
                f = new Date(a.end).valueOf(),
                g = new Date(a.start).valueOf(),
                h = "";
              (f < g || f < e) && (b = !0),
                b &&
                  (h =
                    '<div class="expired-label">\n                            <span>Expired</span>\n                        </div>');
              var i = '\n                    <div class="card customer-voucher '
                .concat(!0 == ("true" == c) ? "" : "not-verified", " valid ")
                .concat(!0 == b ? "voucher-expired" : "", '" data-voucher="')
                .concat(a.id, '" data-voucher-amount="')
                .concat(a.amount, '" data-voucher-currency="')
                .concat(
                  a.currency,
                  '">\n                        <div class="icon-holder">\n                            <svg class="icon icon-voucher" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n                                <path d="M23 5.00067H20.605C20.846 4.52426 20.9808 4.00123 21 3.46767C20.9653 2.52443 20.5615 1.63254 19.8757 0.984079C19.1898 0.33562 18.2767 -0.0175341 17.333 0.000670438C16.2089 0.0490853 15.1191 0.401827 14.1799 1.02124C13.2406 1.64066 12.4872 2.5035 12 3.51767C11.518 2.50634 10.7703 1.64495 9.83685 1.0255C8.90337 0.406057 7.81914 0.0518334 6.7 0.000670438C6.662 0.000670438 6.624 0.000670438 6.586 0.000670438C5.6558 0.00216011 4.7624 0.36425 4.09365 1.01081C3.42489 1.65738 3.03287 2.53805 3 3.46767V3.53367C3.01951 4.04421 3.14878 4.54456 3.379 5.00067H1C0.734784 5.00067 0.48043 5.10603 0.292893 5.29356C0.105357 5.4811 0 5.73545 0 6.00067L0 9.00067C0 9.26589 0.105357 9.52024 0.292893 9.70778C0.48043 9.89531 0.734784 10.0007 1 10.0007H23C23.2652 10.0007 23.5196 9.89531 23.7071 9.70778C23.8946 9.52024 24 9.26589 24 9.00067V6.00067C24 5.73545 23.8946 5.4811 23.7071 5.29356C23.5196 5.10603 23.2652 5.00067 23 5.00067ZM17.364 2.00067C17.7724 1.99007 18.1695 2.13614 18.4737 2.40891C18.7779 2.68168 18.9662 3.06049 19 3.46767C18.9858 3.87699 18.8141 4.26501 18.5206 4.55067C18.2271 4.83634 17.8346 4.99756 17.425 5.00067H13.478C14.1 3.74167 15.337 2.00067 17.364 2.00067ZM5 3.50067C5.0256 3.09146 5.20732 2.7077 5.50765 2.42857C5.80799 2.14945 6.20401 1.99628 6.614 2.00067C8.683 2.00867 9.895 3.73167 10.524 5.00067H6.624C6.21339 5.00376 5.81701 4.85043 5.51537 4.57182C5.21373 4.29322 5.02946 3.91023 5 3.50067Z" fill="#02BF9B"/>\n                                <path d="M14 12.001V24.001H19C19.7956 24.001 20.5587 23.6849 21.1213 23.1223C21.6839 22.5597 22 21.7966 22 21.001V12.001H14Z" fill="#02BF9B"/>\n                                <path d="M10 12.001H2V21.001C2 21.7966 2.31607 22.5597 2.87868 23.1223C3.44129 23.6849 4.20435 24.001 5 24.001H10V12.001Z" fill="#02BF9B"/>\n                            </svg>\n                        </div>\n\n                        <div class="information">\n                            <h3>'
                )
                .concat(
                  currency.format(a.amount, a.currency, "EN", !1),
                  ' voucher</h3>\n                            <div class="status-container">\n                                <p class="valid-until">'
                )
                .concat(translations.vouchers.validUntil, " ")
                .concat(
                  vouchers.formatDate(a.end),
                  "</p>\n                            </div>\n                        </div>\n                        "
                )
                .concat(
                  h,
                  "\n                    </div>\n                    "
                );
              d += i;
            }),
            vouchers.insert(d, b))
          : vouchers.renderEmpty(b);
      },
      verifyCustomerVouchersBubble: function verifyCustomerVouchersBubble() {
        var a =
          '\n\t\t\t<div class="bubble">\n\t\t\t\t<h3 class="verify-message">'
            .concat(
              translations.vouchers.verifyEmailToUse,
              "</h3>\n\t\t\t\t<p>"
            )
            .concat(
              translations.payment.discountsSafelyVerifyEmail,
              '</p>\n\n\t\t\t\t<div class="actions">\n\t\t\t\t\t<button class="bttn bttn--outline-gray resend-verification-email" data-email="'
            )
            .concat(translations.payment.customerEmail, '">')
            .concat(
              translations.payment.resendVerificationEmail,
              "</button>\n\t\t\t\t</div>\n\t\t\t</div>"
            );
        return a;
      },
      showCustomerVouchersInformation: function showCustomerVouchersInformation(
        a
      ) {
        var b = a.dataset.voucher;
        modals.create(
          translations.vouchers.yourVoucherCode,
          customerProfile.getCustomerVouchersBody(b),
          customerProfile.getCustomerVouchersFooter()
        );
      },
      getCustomerVouchersBody: function getCustomerVouchersBody(a) {
        var b = vouchers.data.voucher.get(a),
          c = b.redeemable,
          d = b.type,
          e = "",
          f = "";
        c &&
          (f = "<p>"
            .concat(translations.vouchers.voucherRedeemable, ": <strong>")
            .concat(vouchers.formatDate(b.redeemableDate), "</strong></p>")),
          (e =
            "credit" == d
              ? "<p>".concat(translations.vouchers.voucherUsage2, "</p>")
              : "<p>".concat(translations.vouchers.voucherUsage3, "</p>"));
        var g =
          '\n\t\t\t\t<div class="icon-holder">\n\t\t\t\t\t<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n\t\t\t\t\t\t<path d="M23 5.00067H20.605C20.846 4.52426 20.9808 4.00123 21 3.46767C20.9653 2.52443 20.5615 1.63254 19.8757 0.984079C19.1898 0.33562 18.2767 -0.0175341 17.333 0.000670438C16.2089 0.0490853 15.1191 0.401827 14.1799 1.02124C13.2406 1.64066 12.4872 2.5035 12 3.51767C11.518 2.50634 10.7703 1.64495 9.83685 1.0255C8.90337 0.406057 7.81914 0.0518334 6.7 0.000670438C6.662 0.000670438 6.624 0.000670438 6.586 0.000670438C5.6558 0.00216011 4.7624 0.36425 4.09365 1.01081C3.42489 1.65738 3.03287 2.53805 3 3.46767V3.53367C3.01951 4.04421 3.14878 4.54456 3.379 5.00067H1C0.734784 5.00067 0.48043 5.10603 0.292893 5.29356C0.105357 5.4811 0 5.73545 0 6.00067L0 9.00067C0 9.26589 0.105357 9.52024 0.292893 9.70778C0.48043 9.89531 0.734784 10.0007 1 10.0007H23C23.2652 10.0007 23.5196 9.89531 23.7071 9.70778C23.8946 9.52024 24 9.26589 24 9.00067V6.00067C24 5.73545 23.8946 5.4811 23.7071 5.29356C23.5196 5.10603 23.2652 5.00067 23 5.00067ZM17.364 2.00067C17.7724 1.99007 18.1695 2.13614 18.4737 2.40891C18.7779 2.68168 18.9662 3.06049 19 3.46767C18.9858 3.87699 18.8141 4.26501 18.5206 4.55067C18.2271 4.83634 17.8346 4.99756 17.425 5.00067H13.478C14.1 3.74167 15.337 2.00067 17.364 2.00067ZM5 3.50067C5.0256 3.09146 5.20732 2.7077 5.50765 2.42857C5.80799 2.14945 6.20401 1.99628 6.614 2.00067C8.683 2.00867 9.895 3.73167 10.524 5.00067H6.624C6.21339 5.00376 5.81701 4.85043 5.51537 4.57182C5.21373 4.29322 5.02946 3.91023 5 3.50067Z" fill="#02BF9B"/>\n\t\t\t\t\t\t<path d="M14 12.001V24.001H19C19.7956 24.001 20.5587 23.6849 21.1213 23.1223C21.6839 22.5597 22 21.7966 22 21.001V12.001H14Z" fill="#02BF9B"/>\n\t\t\t\t\t\t<path d="M10 12.001H2V21.001C2 21.7966 2.31607 22.5597 2.87868 23.1223C3.44129 23.6849 4.20435 24.001 5 24.001H10V12.001Z" fill="#02BF9B"/>\n\t\t\t\t\t</svg>\n\t\t\t\t</div>\n\t\t\t\t<h2>Your '
            .concat(
              currency.format(b.amount, b.currency, "EN", !1),
              ' voucher</h2>\n\t\t\t\t<p class="apply-voucher-text">'
            )
            .concat(
              translations.vouchers.applyVoucherOnPayment,
              '</p>\n                <div class="voucher-terms-container">\n                    <div class="voucher-terms">\n                        <h4>'
            )
            .concat(
              translations.vouchers.voucherDetails,
              "</h4>\n                        <p>"
            )
            .concat(translations.vouchers.validUntil, ": <strong>")
            .concat(
              vouchers.formatDate(b.end),
              "</strong></p>\n                        "
            )
            .concat(
              f,
              '\n                    </div>\n\n                    <div class="voucher-usage">\n                        <h4>'
            )
            .concat(
              translations.vouchers.voucherUsage,
              "</h4>\n                        <p>"
            )
            .concat(translations.vouchers.voucherUsage1, " ")
            .concat(
              translations.vouchers.voucherUsage6,
              "</p>\n                        <br />\n                        "
            )
            .concat(
              e,
              "\n                    </div>\n                </div>\n\t\t\t"
            );
        return g;
      },
      getCustomerVouchersFooter: function getCustomerVouchersFooter() {
        return '\n                <div class="footer-actions">\n                    <button class="bttn bttn--outline-gray close">Cancel</button>\n                    <a class="bttn bttn-submit" href="/">Find yoga retreats</a>\n                </div>\n            ';
      },
    }
  );
})();
var setIndexedProperty = function (a, b, c, d) {
  return a.prop(b, "r_".concat(c, "_").concat(d + 1));
};
$(function () {
  var a = function (a) {
      return a && a.length && 0 < a.length;
    },
    b = function (a, b) {
      return reviewsTransTags.review_by_customer_from_country_customer
        .replace("CUSTOMER", "<b>".concat(a, "</b>"))
        .replace("COUNTRY", b);
    },
    c = function (a, c, d) {
      return a
        ? reviewsTransTags.review_by_customer_from_country_anonymous
        : b(c, d);
    },
    d = function (b, c) {
      return a(b)
        ? $("<tr>").append(
            $('<td class="review__thumbs">').append(
              $('<i class="ebs-icon ebs-icon-t-'.concat(c, '"></i>'))
            ),
            $("<td>", {
              text: b,
            })
          )
        : null;
    },
    e = function (a) {
      a = 10 < a ? a / 10 : a;
      var b = [
        [
          $('<i class="ebs-icon ebs-icon-t-star-half"></i>'),
          $('<i class="ebs-icon ebs-icon-t-star-empty"></i>'),
          $('<i class="ebs-icon ebs-icon-t-star-empty"></i>'),
          $('<i class="ebs-icon ebs-icon-t-star-empty"></i>'),
          $('<i class="ebs-icon ebs-icon-t-star-empty"></i>'),
        ],
        [
          $('<i class="ebs-icon ebs-icon-t-star-full"></i>'),
          $('<i class="ebs-icon ebs-icon-t-star-empty"></i>'),
          $('<i class="ebs-icon ebs-icon-t-star-empty"></i>'),
          $('<i class="ebs-icon ebs-icon-t-star-empty"></i>'),
          $('<i class="ebs-icon ebs-icon-t-star-empty"></i>'),
        ],
        [
          $('<i class="ebs-icon ebs-icon-t-star-full"></i>'),
          $('<i class="ebs-icon ebs-icon-t-star-half"></i>'),
          $('<i class="ebs-icon ebs-icon-t-star-empty"></i>'),
          $('<i class="ebs-icon ebs-icon-t-star-empty"></i>'),
          $('<i class="ebs-icon ebs-icon-t-star-empty"></i>'),
        ],
        [
          $('<i class="ebs-icon ebs-icon-t-star-full"></i>'),
          $('<i class="ebs-icon ebs-icon-t-star-full"></i>'),
          $('<i class="ebs-icon ebs-icon-t-star-empty"></i>'),
          $('<i class="ebs-icon ebs-icon-t-star-empty"></i>'),
          $('<i class="ebs-icon ebs-icon-t-star-empty"></i>'),
        ],
        [
          $('<i class="ebs-icon ebs-icon-t-star-full"></i>'),
          $('<i class="ebs-icon ebs-icon-t-star-full"></i>'),
          $('<i class="ebs-icon ebs-icon-t-star-half"></i>'),
          $('<i class="ebs-icon ebs-icon-t-star-empty"></i>'),
          $('<i class="ebs-icon ebs-icon-t-star-empty"></i>'),
        ],
        [
          $('<i class="ebs-icon ebs-icon-t-star-full"></i>'),
          $('<i class="ebs-icon ebs-icon-t-star-full"></i>'),
          $('<i class="ebs-icon ebs-icon-t-star-full"></i>'),
          $('<i class="ebs-icon ebs-icon-t-star-empty"></i>'),
          $('<i class="ebs-icon ebs-icon-t-star-empty"></i>'),
        ],
        [
          $('<i class="ebs-icon ebs-icon-t-star-full"></i>'),
          $('<i class="ebs-icon ebs-icon-t-star-full"></i>'),
          $('<i class="ebs-icon ebs-icon-t-star-full"></i>'),
          $('<i class="ebs-icon ebs-icon-t-star-half"></i>'),
          $('<i class="ebs-icon ebs-icon-t-star-empty"></i>'),
        ],
        [
          $('<i class="ebs-icon ebs-icon-t-star-full"></i>'),
          $('<i class="ebs-icon ebs-icon-t-star-full"></i>'),
          $('<i class="ebs-icon ebs-icon-t-star-full"></i>'),
          $('<i class="ebs-icon ebs-icon-t-star-full"></i>'),
          $('<i class="ebs-icon ebs-icon-t-star-empty"></i>'),
        ],
        [
          $('<i class="ebs-icon ebs-icon-t-star-full"></i>'),
          $('<i class="ebs-icon ebs-icon-t-star-full"></i>'),
          $('<i class="ebs-icon ebs-icon-t-star-full"></i>'),
          $('<i class="ebs-icon ebs-icon-t-star-full"></i>'),
          $('<i class="ebs-icon ebs-icon-t-star-half"></i>'),
        ],
        [
          $('<i class="ebs-icon ebs-icon-t-star-full"></i>'),
          $('<i class="ebs-icon ebs-icon-t-star-full"></i>'),
          $('<i class="ebs-icon ebs-icon-t-star-full"></i>'),
          $('<i class="ebs-icon ebs-icon-t-star-full"></i>'),
          $('<i class="ebs-icon ebs-icon-t-star-full"></i>'),
        ],
      ];
      return 0 == a
        ? []
        : b.find(function (b, c) {
            return c + 2 > a;
          });
    },
    f = function (a) {
      return $("<table>", {
        class: "review__ratings",
      }).append(
        Object.keys(a.scores).map(function (b) {
          return 0 < a.scores[b]
            ? $("<tr>").append(
                $("<td>", {
                  html: reviewsTransTags[b],
                }),
                $("<td>", {
                  html: e(a.scores[b]),
                })
              )
            : "";
        })
      );
    },
    g = function (b) {
      return $("<div>", {
        class: "review",
      }).append(
        $("<div>", {
          class: "review__credit",
          html: c(b.isAnonymous, b.customerName, b.countryName),
        }),
        $("<div>", {
          class: "review__date",
          text: b.createdDate,
        }),
        $("<table>", {
          class: "review__table",
        }).append(
          a(b.reviewHighlight)
            ? $("<tr>").append(
                $("<td>"),
                $("<td>").append(
                  $("<h3>", {
                    class: "title review__highlight",
                    text: '"'.concat(b.reviewHighlight, '"'),
                  })
                )
              )
            : null,
          d(b.reviewTextCons, "thumbs-down"),
          d(b.reviewTextPros, "thumbs-up"),
          $("<tr>").append(
            $('<td class="review__empty">'),
            $("<td>").append(f(b))
          )
        )
      );
    };
  $("body").on("change", ".review-form__radio", function (a) {
    var b = $(a.target),
      c = b.val(),
      d = b.closest(".review-form__item, .review-form__instructor-ratings"),
      e = d.find(".review-form__comment");
    e.removeClass("show");
    var f = e.filter('[data-value="'.concat(c, '"]'));
    f.addClass("show");
  }),
    $("body").on("change", ".review-form__instructor-select", function (a) {
      var b = $(a.target),
        c = b.find(":selected"),
        d = c.data("id"),
        e = b.siblings(".review-form__instructor-ratings");
      e.removeClass("hide");
      var f = e.find(".js-instructor-input");
      f.each(function (a, b) {
        var c = $(b);
        c.prop("name", "instructor_".concat(d)),
          setIndexedProperty(c, "id", d, a);
      });
      var g = e.find(".js-instructor-label");
      g.each(function (a, b) {
        var c = $(b);
        setIndexedProperty(c, "for", d, a);
      }),
        e.removeClass("hide");
    });
  var h = function () {
    var a = $(".js-review-form__instructor-item"),
      b = $(a[0]),
      c = b.clone(),
      d = $("#instructor-review-question"),
      e = c.find("h2");
    1 === a.length ? e.remove() : e.text(d.text()),
      c.removeClass("hide"),
      c.appendTo(".review-form__instructors");
  };
  h(),
    $(".review-form__add-button").click(h),
    $("#review-text-pros").keyup(function () {
      var a = $(this).val().length,
        b = $(this).next().find(".current"),
        c = $(this).next(".character-count");
      b.text(a),
        1250 >= a && c.css("color", "#7C8086"),
        1250 < a && c.css("color", "#FABC42"),
        1400 < a && c.css("color", "#E63C15");
    }),
    $("#review-text-cons").keyup(function () {
      var a = $(this).val().length,
        b = $(this).next().find(".current"),
        c = $(this).next(".character-count");
      b.text(a),
        1250 >= a && c.css("color", "#7C8086"),
        1250 < a && c.css("color", "#FABC42"),
        1400 < a && c.css("color", "#E63C15");
    });
  var i = function () {
    var a = $(".review-form__data"),
      b = new Date(),
      c = b.getDate(),
      d = b.toLocaleString("en-us", {
        month: "long",
      }),
      e = b.getFullYear(),
      f = "".concat(d, " ").concat(c, ", ").concat(e),
      h = function (a) {
        var b = $("input[name=".concat(a, "]:checked"));
        return b.length ? b.val() : 0;
      },
      i = {
        isAnonymous: !!$(".review-form__is-anonymous").is(":checked"),
        customerName: a.data("name"),
        countryName: a.data("country"),
        createdDate: f,
        reviewHighlight: $(".review-form__title-input").val(),
        reviewTextCons: $(".review-form__bad-input").val(),
        reviewTextPros: $(".review-form__good-input").val(),
        organizerReply: "",
        scores: {
          accommodationAndFacilities: h("accommodationAndFacilities"),
          food: h("food"),
          location: h("location"),
          overallImpression: h("overallImpression"),
          qualityOfActivity: h("qualityOfActivity"),
          valueForMoney: h("valueForMoney"),
        },
      },
      j = g(i),
      k = $(".review-form__preview");
    k.remove();
    var l = $("<div>", {
      class: "review-form__preview",
    });
    l.append(j), $(".review-form__preview-target").prepend(l);
  };
  $(".review-form__form").change(function () {
    i();
  }),
    $("document").ready(function () {
      if ("function" == typeof getUrlParameter) {
        var a = getUrlParameter("refItem"),
          b = getUrlParameter("refValue");
        if (a && b) {
          var c = document.getElementById("ri" + a + b);
          c && (c.checked = !0);
        }
      }
    });
});
$(function () {
  function a() {
    setTimeout(function () {
      switch ($('[name="customer_selected_amount"]:checked').val()) {
        case "deposit":
          $("#please-pay-placeholder").html(trans_paymentDeposit),
            $("#paymentList li").not(":first-child").show(),
            $("#currency-details-wrapper").hide(),
            $(".deposit-for-total").show(),
            $(".price-tooltip").show();
          break;
        case "total":
          $("#please-pay-placeholder").html(trans_paymentTotal),
            $("#paymentList li").not(":first-child").hide(),
            $("#currency-details-wrapper").hide(),
            $(".deposit-for-total").hide(),
            $(".price-tooltip").hide();
          break;
        default:
      }
    }, 200);
  }
  if ("undefined" != typeof sendToPayment) {
    $("#query-form .payment_methods_form legend").click(
      function selectPaymentMethod() {
        if (
          null != $("input[name=brandCode]:checked") &&
          $("input[name=brandCode]:checked") &&
          null != $("input[name=brandCode]:checked").attr("id")
        ) {
          var a = $("input[name=brandCode]:checked").attr("id").split("-")[1];
          $("#pm-" + a).slideDown(),
            $("#query-form .payment_methods_form .method_form")
              .not($("#pm-" + a))
              .slideUp();
        }
      }
    ),
      $("input[name=brandCode]").on("change", function () {
        var a = document.getElementById("keep_reservation_payment").value,
          b = document.getElementById("is_deposit_expired").value;
        "cc" == $("input[name=brandCode]:checked").val() || "false" != a
          ? (null != $("#plus-transaction-fee") &&
            "undefined" == typeof no_cc_fee_eu
              ? ($("#plus-transaction-fee").html(
                  "<small>" +
                    $("#plus-credit-card-fee-hidden").val() +
                    "</small>"
                ),
                $("#plus-transaction-fee").show())
              : "undefined" != typeof no_cc_fee_eu &&
                $("#plus-transaction-fee").hide(),
            $("#new-inquiry-submit").find(".show-on-pm-others").hide(),
            $("#new-inquiry-submit").find(".show-on-pm-credit-card").show())
          : "paypal" == $("input[name=brandCode]:checked").val()
          ? (null != $("#plus-transaction-fee") &&
              $("#plus-transaction-fee").html(
                "<small>" + $("#plus-paypal-fee-hidden").val() + "</small>"
              ),
            $("#plus-transaction-fee").show(),
            $("#new-inquiry-submit").find(".show-on-pm-credit-card").hide(),
            $("#new-inquiry-submit").find(".show-on-pm-others").show())
          : ($("#plus-transaction-fee").hide(),
            $("#new-inquiry-submit").find(".show-on-pm-credit-card").hide(),
            $("#new-inquiry-submit").find(".show-on-pm-others").show());
        var c = $(this).val();
        $(this)
          .parents(".payment-methods-toggle")
          .find("label")
          .removeClass("active"),
          $(this).parent("label").addClass("active"),
          $(this)
            .parents(".js-parent-container")
            .find(".payment-method-form")
            .hide(),
          $(this)
            .parents(".js-parent-container")
            .find("#pm-" + c)
            .show(),
          gae("payments", "selected_" + c);
      });
  }
  if (
    (a(),
    $('input[name="customer_selected_amount"]').length &&
      $('input[name="customer_selected_amount"]').change(function () {
        $(this).parents("label").hasClass("payment-option-disabled") ||
          ($(this)
            .parents(".full-or-deposit-toggle")
            .find(".active")
            .removeClass("active"),
          $(this).parents("label").addClass("active"),
          a(),
          $("#receipt_deposit, #receipt_full").length &&
            ("total" !=
              $('input[name="customer_selected_amount"]:checked').val() &&
              ($("#receipt_deposit").show(),
              $(".final-tip").css("display", "block")),
            "total" ==
              $('input[name="customer_selected_amount"]:checked').val() &&
              ($("#receipt_deposit").hide(),
              $(".final-tip").css("display", "none"),
              $("#receipt_full").show())));
      }),
    (function (a, b) {
      try {
        if (null != sessionStorage) {
          var c = sessionStorage.getItem(a);
          if ("undefined" != c && null != c && "" != c) {
            var d = $('input[name="' + b + '"][value="' + c + '"]');
            d.click();
            var a = $("input[name=brandCode]:checked").attr("id");
            if (null != a) {
              var e = a.split("-")[1];
              $("#pm-" + e).slideDown(),
                $("#query-form .payment_methods_form .method_form")
                  .not($("#pm-" + e))
                  .slideUp();
            }
          }
        }
      } catch (a) {
        gae(
          "payment",
          "User had cookies disabled so sessionStorage throws error"
        );
      }
    })("paymentMethod", "brandCode"),
    $("input[name=brandCode]:checked").trigger("change"),
    $("#inquiry_message_form_telephone_number_code").length)
  ) {
    var b = function () {
      $("#inquiry_message_form_flag_icon").attr(
        "class",
        "sprite _" +
          $("#inquiry_message_form_telephone_number_code")
            .val()
            .toLowerCase()
            .split(" ")[0] +
          " "
      );
    };
    $("#inquiry_message_form_telephone_number_code").on("change", function () {
      b();
    }),
      b();
  }
  $("#rp_edit_details_button").click(function () {
    return (
      $(this).parents().find(".your-details-fields").removeClass("hidden"),
      $(this).parents(".js-hide-pesonal-info-summary").hide(),
      !1
    );
  });
});
var toast = (function () {
  var a = function () {
      var a =
        0 < arguments.length && arguments[0] !== void 0
          ? arguments[0]
          : "#toast-inner";
      return $(a);
    },
    b = function (b, c, d, e, f) {
      Array.isArray(c) || (c = [c]);
      var g = a();
      c.map(function (a) {
        var c = [];
        if (d && d.icon) {
          var j = {
            tag: "i",
            class: "toast-icon ebs-icon ".concat(d.icon),
          };
          c.push(j);
        }
        if (a) {
          var k = {
            tag: "span",
            class: "toast-text",
            child: a.replace(/(?:\r\n|\r|\n)/g, "<br>"),
          };
          c.push(k);
        }
        if (d && d.buttonText && d.buttonURL) {
          var l = {
            tag: "a",
            class: "bttn -small -outline",
            href: d.buttonURL,
            data: {
              toggle: d.dataToggle,
            },
            child: {
              tag: "span",
              child: d.buttonText,
            },
          };
          c.push(l);
        }
        var h = document.createElement("div");
        h.setAttribute(
          "class",
          "alert alert-".concat(b, " toast-alert toast-alert-dismissible")
        ),
          h.setAttribute("role", "alert");
        var i = [];
        c.forEach(function (a) {
          var b = document.createElement(a.tag);
          if (
            (b.setAttribute("class", a.class),
            a.hasOwnProperty("data") &&
              b.setAttribute(
                "data-" + Object.keys(a.data)[0],
                a.data[Object.keys(a.data)[0]]
              ),
            a.hasOwnProperty("href") && b.setAttribute("href", a.href),
            a.hasOwnProperty("child"))
          )
            if (a.child.hasOwnProperty("child")) {
              var c = document.createElement(a.child.tag),
                d = document.createTextNode(a.child.child);
              c.appendChild(d), b.appendChild(c);
            } else {
              var e = document.createTextNode(a.child);
              b.appendChild(e);
            }
          i.push(b);
        }),
          h.append.apply(h, i),
          g.append(h),
          e &&
            window.setTimeout(function () {
              return e(h, f);
            }, d.delay || 2500);
      });
    },
    c = function (a, c, d, e) {
      return b("info", a, c, d, e);
    };
  return {
    get: a,
    clear: function clear() {
      return a().empty();
    },
    message: b,
    success: function success(a, c, d, e) {
      return b("success", a, c, d, e);
    },
    info: c,
    error: function error(a, c, d, e) {
      return b("danger", a, c, d, e);
    },
    favorite: function favorite(a, b, d, e) {
      var f = Object.assign({}, b, {
        icon: "ebs-icon-heart-stroked",
      });
      c(a, f, d, e);
    },
    fade: function fade(a) {
      return $(a).fadeOut();
    },
  };
})();
$(function () {
  $("#review_highlight_title").length &&
    $("#review_highlight_title input").on("keyup", function () {
      var a = $("#review_highlight_title .review_limit_chars"),
        b = $("#review_highlight_title input"),
        c = b.attr("maxlength") - b.val().length;
      $(a).text(c),
        10 > c
          ? $(a).addClass("review_limit_warning")
          : $(a).removeClass("review_limit_warning");
      0 == c
        ? $(b).addClass("review_input_warning")
        : $(b).removeClass("review_input_warning");
    });
});
$(function () {
  function a() {
    switch ($("#customer_service_user_type").val()) {
      case "customer":
        $("#customer_service_topic").removeClass("hide"),
          $("#customer_service_partner_wrapper").addClass("hide");
        break;
      case "existing_partner":
        $("#customer_service_topic").addClass("hide"),
          $("#customer_service_partner_wrapper").addClass("hide");
        break;
      case "new_partner":
        $("#customer_service_topic").addClass("hide"),
          $("#customer_service_partner_wrapper").removeClass("hide");
    }
  }
  a(),
    $("#customer_service_user_type").on("change", function () {
      a();
    });
}),
  $(function () {
    function a() {
      switch (
        $(
          "#rebrand_customer_service_user_type input[type=radio][name=user_type]:checked"
        ).val()
      ) {
        case "customer":
          $("#customer_service_topic").removeClass("hide"),
            $("#customer_service_partner_wrapper").addClass("hide");
          break;
        case "existing_partner":
          $("#customer_service_topic").addClass("hide"),
            $("#customer_service_partner_wrapper").addClass("hide");
          break;
        case "new_partner":
          $("#customer_service_topic").addClass("hide"),
            $("#customer_service_partner_wrapper").removeClass("hide");
      }
    }
    a(),
      $(
        "#rebrand_customer_service_user_type input[type=radio][name=user_type]"
      ).on("change", function () {
        a();
      }),
      $(
        "#rebrand_customer_service_user_type input[type=radio][name=user_type]:checked"
      ).val() ||
        ($(
          "#rebrand_customer_service_user_type input[type=radio][name=user_type]:first"
        ).attr("checked", "checked"),
        $("#rebrand_customer_service_user_type .bttn--radio-context:first")
          .trigger("click")
          .addClass("active"),
        a()),
      $("#short_message_message").on("input", function () {
        var a = $(this).val(),
          b = null === a.match(/\n/g) ? 0 : a.match(/\n/g).length,
          c = 4096 - b,
          d = a.slice(0, c);
        $(this).attr("maxlength", c), $(this).val(d);
      });
  }),
  $(function () {
    var a = getDeviceType();
    $(".subscriber-device-type").val(a);
  });
var __ctaStickyMode = 0,
  __ctaStickyLeft = -1,
  __ctaStickyClasses = "";

function updateMainCTA0() {
  var a = $("#sticky-reserve");
  if (window.matchMedia("all and (max-width: 480px)").matches) {
    var b = $(".gototop-btn");
    a &&
    a.position() &&
    a.position().top &&
    a.position().top > $(window).height()
      ? b.css("bottom", "")
      : b.css("bottom", a.height() + 30 + "px");
  }
  if (0 < a.length) {
    var c = __ctaStickyMode,
      d = $(window),
      e = $("#sticky-top-anchor"),
      f = $("footer");
    if (0 < e.length && 0 < f.length) {
      var g = d.scrollTop(),
        h = g + d.innerHeight(),
        i = "sticky sticky-bot box white fixed",
        j = e.offset().top;
      if (j <= g || j > h - a.outerHeight()) {
        0 == c && a.addClass(i);
        var k = parseInt((f.css("marginTop") || "").replace("px", "")),
          l = f.offset().top - k;
        h >= l
          ? (2 != c &&
              (a.removeClass("sticky"),
              a.addClass("sticky-abs"),
              a.css({
                bottom: 0,
              })),
            (c = 2))
          : (2 == c && (a.removeClass("sticky-abs"), a.addClass("sticky")),
            1 != c &&
              a.css({
                bottom: 0,
              }),
            (c = 1));
        var m = a.parent().offset().left - a.offsetParent().offset().left;
        m != __ctaStickyLeft &&
          ((__ctaStickyLeft = m),
          a.css({
            left: m,
          }));
      } else 0 != c && a.removeClass(i), (c = 0);
      __ctaStickyMode = c;
    }
  }
}
var datePicked_ = !1,
  dateShown_ = !1;

function initStickyCTA() {
  $(window).scroll(updateMainCTA0),
    $(window).resize(updateMainCTA0),
    $(window).bind("touchmove", updateMainCTA0),
    $(window).bind("touchend", updateMainCTA0);
  var a = $("#listing_query_arrival_date.date-picker");
  a.on("changeDate", function () {
    dateShown_ && (datePicked_ = !0);
  }),
    a.on("click", function () {
      dateShown_ = !0;
    }),
    a.on("show", function () {
      dateShown_ = !0;
    });
  var b = function () {
    var a = $("#sticky-reserve"),
      b = $(window),
      c = $("#sticky-top-anchor"),
      d = b.scrollTop(),
      e = d + b.innerHeight(),
      f = c.offset();
    if (f && f.top) {
      var g = f.top,
        h =
          g <= d ||
          g >
            e - (a.outerHeight() - 0.8 * $("#listing_side_list").outerHeight());
      if (h) {
        var i = 5 + g + a.outerHeight() - b.innerHeight();
        return (
          $("html, body").animate(
            {
              scrollTop: i,
            },
            400
          ),
          $(this).blur(),
          !1
        );
      }
    }
  };
  $("#inquiry-query-submit, #reservation-query-submit").on("click", b),
    $("#inquiry-query-submit, #reservation-query-submit").on("touchstart", b),
    setTimeout(updateMainCTA0, 150);
}
$(function () {
  var a = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  a &&
    1025 > $(window).width() &&
    $("#sticky-reserve").length &&
    $(document).on("scroll", function () {
      clearTimeout(window.ios_fixed_cta_fix_to),
        $("#sticky-reserve").addClass("ios_fixed_cta_fix"),
        (window.ios_fixed_cta_fix_to = setTimeout(function () {
          $("#sticky-reserve").removeClass("ios_fixed_cta_fix");
        }, 50));
    });
});
$(function () {
  $(".js-mobile-menu").click(function () {
    $(".js-navbar__navs").toggleClass("flex");
  });
});
var marketing = (function () {
  return {
    SoftGoals: {
      Referral: "referral",
      AccountRegistration: "account_registration",
      NewsletterSubscription: "newsletter_subscription",
      AddToWishlist: "AddToWishlist",
    },
    trackSoftGoals: function trackSoftGoals(a, b) {
      gae(a, b),
        gae("softgoal", a),
        window.dataLayer.push({
          event: "softgoal",
          softgoal_type: a,
          softgoal_sub_type: b,
        });
    },
  };
})();
(function () {
  function a(a) {
    for (var b = "", c = 0; c < a; c++) {
      var d = Math.floor(62 * Math.random()),
        e = (d += 9 < d ? (36 > d ? 55 : 61) : 48);
      b += String.fromCharCode(e);
    }
    return b;
  }

  function b(a) {
    var b = window.location.origin + "/sharing/";
    return b + a;
  }

  function c() {
    var c = a(10),
      d = {
        url_short: b(c),
        hash: c,
      };
    return d;
  }

  function d(a) {
    var b = document.createElement("a");
    b.setAttribute("href", a),
      (b.style = {
        position: "absolute",
        left: "-9999px",
      }),
      document.body.appendChild(b),
      b.click();
  }

  function e(a) {
    var b = document.querySelector("#sharing-hash").value,
      c = "";
    a.classList.contains("social-button") &&
      (c = a.closest(".listing-share-container").dataset.position),
      marketing.trackSoftGoals(
        marketing.SoftGoals.Referral,
        a.dataset.shareType
      );
    var d = {
      type: a.dataset.shareType,
      text: a.dataset.shareText || "",
      twitterhandle: a.dataset.twitterHandle || "",
      hashtags: a.dataset.twitterHashtags || "",
      condition: a.dataset.shareCondition || "",
      source: "referral",
      lid: document.querySelector(".share-container").dataset.lid,
      oid: document.querySelector(".share-container").dataset.oid,
      campaign: document.querySelector(".share-container").dataset.campaign,
      "short-title": document
        .querySelector(".share-container")
        .dataset.urlShard.replace(/ /g, "-"),
      title: document.querySelector("#sharing-listing-name").value,
      position: c,
    };
    a.classList.contains("social-button") || p(a.querySelector(".icon"));
    var e = {
        type: d.type,
        source: d.campaign,
        listing_id: +d.lid,
        inquiry_id: null,
        position: d.position,
      },
      f = {
        credentials: "same-origin",
        method: "POST",
        body: JSON.stringify(e),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
    fetch("/sharing/".concat(b), f)
      .then(function (a) {
        return a.json();
      })
      .then(function (b) {
        if ("ok" == b.status)
          switch (d.type) {
            case "copy-link":
              m(a);
              break;
            default:
          }
        a.classList.contains("social-button") || q(a.querySelector(".icon"));
      })
      .catch(function (b) {
        a.classList.contains("social-button") || q(a.querySelector(".icon")),
          console.error("Broken:", b);
      });
  }

  function f(a) {
    var b = {
      type: a.dataset.shareType,
      text: a.dataset.shareText || "",
      twitterhandle: a.dataset.twitterHandle || "",
      hashtags: a.dataset.twitterHashtags || "",
      condition: a.dataset.shareCondition || "",
      source: "referral",
      lid: document.querySelector(".share-container").dataset.lid,
      oid: document.querySelector(".share-container").dataset.oid,
      campaign: document.querySelector(".share-container").dataset.campaign,
      "short-title": document
        .querySelector(".share-container")
        .dataset.urlShard.replace(/ /g, "-"),
      title: document.querySelector("#sharing-listing-name").value,
    };
    p(a.querySelector(".icon")), (b.url = c(b, !0));
    var d = {
        type: b.type,
        source: b.campaign,
        listing_id: +b.lid,
        inquiry_id: null,
      },
      e = {
        credentials: "same-origin",
        method: "POST",
        body: JSON.stringify(d),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
    fetch("/sharing/".concat(b.url.hash), e)
      .then(function (a) {
        return a.json();
      })
      .then(function (c) {
        if ("ok" == c.status)
          switch (b.type) {
            case "facebook":
              g(b);
              break;
            case "twitter":
              h(b);
              break;
            case "whatsapp":
              i(b);
              break;
            case "messenger":
              j(b);
              break;
            case "email":
              k(b);
              break;
            case "copy-link":
              l(b);
              break;
            case "copy-static-link":
              m();
          }
        q(a.querySelector(".icon"));
      })
      .catch(function (b) {
        q(a.querySelector(".icon")), console.error("Broken:", b);
      });
  }

  function g(a) {
    FB.ui({
      display: "popup",
      method: "stream.share",
      size: {
        width: 800,
        height: 500,
      },
      href: a.url,
    });
  }

  function h(a) {
    return (
      "post-stay" == a.condition
        ? window.open(
            "https://twitter.com/intent/tweet?url="
              .concat(a.url.url_short, "&text=")
              .concat(a.text, "&via=")
              .concat(a.twitterhandle, "&hashtags=")
              .concat(a.hashtags),
            "",
            "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=500,width=600"
          )
        : window.open(
            "https://twitter.com/intent/tweet?url="
              .concat(a.url.url_short, "/")
              .concat(a["short-title"], "&text=")
              .concat(a.text, "&via=")
              .concat(a.twitterhandle, "&hashtags=")
              .concat(a.hashtags),
            "",
            "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=500,width=600"
          ),
      !1
    );
  }

  function i(a) {
    var b = "whatsapp://send";
    (b +=
      "post-stay" == a.condition
        ? "?text=".concat(a.text, " ").concat(a.url.url_short)
        : "?text="
            .concat(a.text, " ")
            .concat(a.url.url_short, "/")
            .concat(a["short-title"])),
      d(b);
  }

  function j(a) {
    var b = "".concat(a.url.url_short);
    "post-stay" != a.condition && (b += "/".concat(a["short-title"])),
      window.open("fb-messenger://share?link=" + encodeURIComponent(b));
  }

  function k(a) {
    var b = "mailto:";
    (b +=
      "post-stay" == a.condition
        ? "?subject="
            .concat(a.title, "&body=")
            .concat(a.text, "%0A%0A")
            .concat(a.url.url_short)
        : "?subject="
            .concat(a.title, "&body=")
            .concat(a.text, "%0A%0A")
            .concat(a.url.url_short, "/")
            .concat(a["short-title"])),
      d(b);
  }

  function l(a) {
    var b = a.url.url_short;
    "post-stay" != a.condition && (b += "/" + a["short-title"]);
    var c = document.querySelector(".referral-share-link-wrapper"),
      d = document.querySelector(".generated-link");
    (d.value = b), c.classList.add("active"), d.select(), d.focus();
  }

  function m(a) {
    var b, c;
    a.classList.contains("social-button")
      ? ((b = a
          .closest(".listing-share-container")
          .querySelector(".referral-share-link-wrapper")),
        (c = a
          .closest(".listing-share-container")
          .querySelector(".generated-link")))
      : ((b = document.querySelector(".referral-share-link-wrapper")),
        (c = document.querySelector(".generated-link"))),
      b.classList.add("active"),
      c.select(),
      c.focus();
  }

  function n() {
    var a = document.querySelector(".generated-link");
    a.select(),
      document.execCommand("copy"),
      toast.info(
        translations.linkCopiedToClipboard,
        {
          icon: "ebs-icon-check-rounded-stroked",
          delay: 2500,
        },
        toast.fade
      );
  }

  function o(a) {
    var b;
    (b = a.classList.contains("social-button-copy")
      ? a.closest(".listing-share-container").querySelector(".generated-link")
      : document.querySelector(".generated-link")),
      b.select(),
      document.execCommand("copy"),
      toast.info(
        translations.linkCopiedToClipboard,
        {
          icon: "ebs-icon-check-rounded-stroked",
          delay: 2500,
        },
        toast.fade
      );
  }

  function p(a) {
    a.classList.add("is-loading");
  }

  function q(a) {
    a.classList.remove("is-loading");
  }
  document.addEventListener("click", function (a) {
    a.target.classList.contains("share__link") && e(a.target),
      a.target.classList.contains("share__item") && f(a.target),
      a.target.classList.contains("copy-static-link") && o(a.target),
      a.target.classList.contains("copy-link") && n();
  });
})();

function getQueryStringParameterByName(a, b) {
  b = b.replace(/[\[\]]/g, "\\$&");
  var c = new RegExp("[?&]" + b + "(=([^&#]*)|&|#|$)"),
    d = c.exec(a);
  return d ? (d[2] ? decodeURIComponent(d[2].replace(/\+/g, " ")) : "") : null;
}

function updateQueryStringParameter(a, b, c) {
  var d = new RegExp("([?&])" + b + "=.*?(&|$)", "i"),
    e = -1 === a.indexOf("?") ? "?" : "&";
  return a.match(d)
    ? a.replace(d, "$1" + b + "=" + c + "$2")
    : a + e + b + "=" + c;
}

function addQueryStringParameter(a, b, c) {
  var d = a.split("#"),
    e = d[0],
    f = 1 < d.length ? "#" + d[1] : "",
    g = -1 === e.indexOf("?") ? "?" : "&";
  return e + g + b + "=" + c + f;
}

function removeQueryStringParameter(a, b, c) {
  var d = a.split("?"),
    e = d[0];
  if (1 < d.length) {
    d = d[1].split("#");
    for (
      var f, g = 1 < d.length ? d[1] : "", h = d[0].split("&"), j = 0;
      j < h.length;

    )
      (f = h[j].split("=")),
        f[0] === b && (void 0 === c || f[1] == c) ? h.splice(j, 1) : ++j;
    h.length && (e = e + "?" + h.join("&")), g.length && (e += "#" + g);
  }
  return e;
}

function removeHost(a) {
  var b = a.indexOf("://");
  -1 != b && (a = a.substring(b + 3));
  var c = a.indexOf("/");
  if (-1 != c) a = a.substring(c);
  else {
    var d = a.indexOf("?");
    -1 != d && (a = "/" + a.substring(d));
  }
  return a;
}
var trackSuite = (function () {
  function a(a, b, c) {
    var d;
    return function () {
      var e = this,
        f = arguments,
        g = c && !d;
      clearTimeout(d),
        (d = setTimeout(function later() {
          (d = null), c || a.apply(e, f);
        }, b)),
        g && a.apply(e, f);
    };
  }

  function b() {
    0 < d.sectionsPositions.length &&
      window.pageYOffset + d.windowCenter > d.sectionsPositions[0].pos &&
      (gae(
        "listing-scroll-position",
        "".concat(d.sectionsIndex, "-").concat(d.sectionsPositions[0].id)
      ),
      d.sectionsPositions.splice(0, 1),
      d.sectionsIndex++);
  }

  function c() {
    var a = window.getSelection().toString();
    2 < a.length && 100 > a.length && gae("text-highlight", a.trim());
  }
  var d = {
    sectionsPositions: [],
    sectionsIndex: 1,
    windowCenter: window.innerHeight / 2,
  };
  (function () {
    var c = document.querySelectorAll(".trip-track"),
      e = document.querySelector(".press-logo-container"),
      f = !1;
    if (0 == c.length && null == e) return !1;
    for (var g = 0; g < c.length; g++) {
      var h = c[g].getBoundingClientRect(),
        j = {
          id: c[g].dataset.sectionId,
          pos: h.y,
        };
      d.sectionsPositions.push(j);
    }
    0 < c.length && window.addEventListener("scroll", a(b, 25)),
      null != e &&
        window.addEventListener(
          "scroll",
          a(function () {
            e.offsetTop < window.pageYOffset + d.windowCenter &&
              !f &&
              (gae("footer-press-section", "Viewed"), (f = !0));
          }, 25)
        );
  })(),
    (function () {
      document.addEventListener("mouseup", c);
    })();
})();
$(function () {
  if (1023 < $(window).width() && $(".js-topic-logo-trustpilot").length) {
    var a = +Cookies.get("tp_shown") || 0,
      b = +Cookies.get("tp_closed") || 0;
    2 > a &&
      1 > b &&
      $(".js-topic-logo-trustpilot").mouseover(function () {
        $(this).addClass("show-popup");
      }),
      $(".js-topic-logo-trustpilot").append(
        '\n\t\t\t<a href="https://www.trustpilot.com/review/bookyogaretreats.com" target="_blank" class="topic-logo-trustpilot-container" rel="noopener">\n\n\t\t\t<div class="tp_row">\n\t\t\t\t\t<div class="tp_reviews">' +
          trustpilotOverview.reviews +
          " reviews on</div>\n\t\t\t\t\t" +
          trustpilotLogo +
          '\n\t\t\t</div>\n\t\t\t<div class="tp_row">\n\t\t\t\t\t<div class="tp_rating">' +
          trustpilotOverview.rating +
          '</div>\n\t\t\t\t\t<div class="tplp_stars tplp_stars_' +
          trustpilotOverview.stars +
          '"><i></i><i></i><i></i><i></i><i></i></div>\n\t\t\t\t\t<div class="tp_score">' +
          trustpilotOverview.score +
          ' out of 10</div>\n\t\t\t</div>\n\n\t\t\t<div class="tp_cta">See all reviews</div>\n\t\t\t<div class="tp_close">\u2715</div>\n\t\t\t</a>\n\t\t\t'
      ),
      2 > a &&
        ($(".js-topic-logo-trustpilot").addClass("show-popup"),
        Cookies.set("tp_shown", a + 1));
    $(".tp_close").click(function () {
      return (
        $(".js-topic-logo-trustpilot").removeClass("show-popup"),
        $(".js-topic-logo-trustpilot").addClass("donot-show-popup"),
        Cookies.set("tp_closed", 1),
        !1
      );
    });
  }
});
$(document).ready(function () {
  $(".js-sorting-mobile-select").length &&
    $(".js-sorting-mobile-select").change(function () {
      var a = $(this).val(),
        b = $("option:selected", this).attr("data-sorting");
      return (window.location = a), !1;
    });
});
(function () {
  if (document.querySelector(".recommended-listing")) {
    var a = function () {
        var a = new URLSearchParams(window.location.search),
          b = a.get("arrival_date"),
          c = a.get("flexible"),
          d = [],
          e = "",
          f = document
            .querySelector(".recommended-listing-id")
            .getAttribute("data-id"),
          g = "/recommendations/listing_page/available/"
            .concat(f, "?amount=")
            .concat(5);
        (b || c) &&
          (g = "/recommendations/listing_page/available/"
            .concat(f, "?arrival_date=")
            .concat(b, "&flexible=")
            .concat(c, "&amount=")
            .concat(5));
        var h = new Headers();
        h.set("X-Requested-With", "XMLHttpRequest"),
          h.set("Content-Type", "application/json");
        fetch(g, {
          method: "GET",
          headers: h,
        })
          .then(function (a) {
            return a.json();
          })
          .then(function (a) {
            if (((d = a), 0 < d.length)) {
              d.forEach(function (a) {
                (avgReviewScore = 10 * a.reviewScore),
                  (e +=
                    ' <div class="recommended-listing__card">\n                                                        <a href="'
                      .concat(
                        a.listingUrl,
                        '" target="_blank" class="recommended-listing__left">\n                                                            <div class="recommended-listing__image" style="background-image:url('
                      )
                      .concat(
                        a.nonMobilePhotoUrl,
                        ');"></div>\n                                                            <div class="recommended-listing__overlay">\n                                                                <div class="recommended-listing__overlay__price">From <span>'
                      )
                      .concat(
                        a.priceNoDecimalWithSymbol,
                        '</span></div>\n                                                            </div>\n                                                        </a>\n                                                        <div class="recommended-listing__right">\n                                                            <a href="'
                      )
                      .concat(
                        a.listingUrl,
                        '" target="_blank" class="recommended-listing__text">\n                                                                <div class="recommended-listing__title">'
                      )
                      .concat(
                        a.listingTitle,
                        '</div>\n                                                            </a>\n                                                            <a href="'
                      )
                      .concat(
                        a.listingUrl,
                        '" target="_blank" class="recommended-listing__score '
                      )
                      .concat(
                        0 >= avgReviewScore
                          ? "recommended-listing__score__hide"
                          : "",
                        ' ">\n                                                                <div class="star-visuals">\n                                                                    <i class="ebs-icon '
                      )
                      .concat(
                        10 > avgReviewScore ? "ebs-icon-t-star-empty" : "",
                        " "
                      )
                      .concat(
                        10 <= avgReviewScore && 20 > avgReviewScore
                          ? "ebs-icon-t-star-half"
                          : "",
                        " "
                      )
                      .concat(
                        20 <= avgReviewScore ? "ebs-icon-t-star-full" : "",
                        ' "></i>\n                                                                    <i class="ebs-icon '
                      )
                      .concat(
                        30 > avgReviewScore ? "ebs-icon-t-star-empty" : "",
                        " "
                      )
                      .concat(
                        30 <= avgReviewScore && 40 > avgReviewScore
                          ? "ebs-icon-t-star-half"
                          : "",
                        " "
                      )
                      .concat(
                        40 <= avgReviewScore ? "ebs-icon-t-star-full" : "",
                        ' "></i>\n                                                                    <i class="ebs-icon '
                      )
                      .concat(
                        50 > avgReviewScore ? "ebs-icon-t-star-empty" : "",
                        " "
                      )
                      .concat(
                        50 <= avgReviewScore && 60 > avgReviewScore
                          ? "ebs-icon-t-star-half"
                          : "",
                        " "
                      )
                      .concat(
                        60 <= avgReviewScore ? "ebs-icon-t-star-full" : "",
                        ' "></i>\n                                                                    <i class="ebs-icon '
                      )
                      .concat(
                        70 > avgReviewScore ? "ebs-icon-t-star-empty" : "",
                        " "
                      )
                      .concat(
                        70 <= avgReviewScore && 80 > avgReviewScore
                          ? "ebs-icon-t-star-half"
                          : "",
                        " "
                      )
                      .concat(
                        80 <= avgReviewScore ? "ebs-icon-t-star-full" : "",
                        ' "></i>\n                                                                    <i class="ebs-icon '
                      )
                      .concat(
                        90 > avgReviewScore ? "ebs-icon-t-star-empty" : "",
                        " "
                      )
                      .concat(
                        90 <= avgReviewScore && 100 > avgReviewScore
                          ? "ebs-icon-t-star-half"
                          : "",
                        " "
                      )
                      .concat(
                        100 <= avgReviewScore ? "ebs-icon-t-star-full" : "",
                        ' "></i>\n                                                                </div>\n                                                                <a href="'
                      )
                      .concat(
                        a.listingUrl,
                        '#reviews" class="js-showcard-link '
                      )
                      .concat(
                        0 >= avgReviewScore
                          ? "recommended-listing__score__hide"
                          : "",
                        ' ">\n                                                                    &middot; '
                      )
                      .concat(
                        a.reviewsCount,
                        "\n                                                                </a>\n                                                            </a>\n                                                        </div>\n                                                    </div>"
                      ));
              });
              var b = document.querySelector(".recommended-listing .listing");
              b.innerHTML = e;
            } else {
              var c = document.querySelector(
                ".recommended-listing.right-column"
              );
              c.remove();
            }
          })
          .catch(function () {
            var a = document.querySelector(".recommended-listing.right-column");
            a.remove();
          });
      },
      b = function (a) {
        var b = a.getBoundingClientRect();
        return (
          0 <= b.top &&
          0 <= b.left &&
          b.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
          b.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
      },
      c = 0,
      d = document.querySelector(".recommended-listing");
    window.addEventListener(
      "scroll",
      function () {
        b(d) && 0 == c && (a(), (c = 1));
      },
      !1
    );
  }
})();
$(function () {
  if ($(".js-payment-countdown").length) {
    var a = $(".js-payment-expiration").val(),
      b = moment(a, "YYYY-MMM-DD kk:mm:ss").toDate();
    b.setHours(b.getHours() + 1);
    var c = b.getTime(),
      d = $(".js-payment-countdown").data("expired-text")
        ? $(".js-payment-countdown").data("expired-text")
        : "This payment form is expired",
      e = setInterval(function () {
        var a = Math.floor,
          b = new Date().getTime(),
          f = c - b,
          g = a(f / 86400000),
          h = a(f / 3600000),
          i = a((f % 86400000) / 3600000),
          j = a((f % 3600000) / 60000),
          k = a((f % 60000) / 1e3),
          l = function (a) {
            return 10 > a ? "0" + a : a;
          };
        $(".js-payment-countdown").text(l(h) + ":" + l(j) + ":" + l(k)),
          0 > f &&
            (clearInterval(e), $(".js-payment-countdown").parent().text(d));
      }, 1e3);
  }
});
var trpPayment = (function () {
  document.addEventListener("click", function (a) {
    a.target.classList.contains("reload-adyen") &&
      (a.preventDefault(), adyenDropin.retryPayment(a.target.dataset.url));
  });
  var a = document.querySelector("#reservation-payment"),
    b = document.querySelector("#dropin"),
    c = document.querySelector('input[name="bookingType"]') || "",
    d = document.querySelector("#stripe-experiment") || "";
  if (a && b) {
    if (
      ((paymentSubmitButton = document.querySelector(
        ".js-payment-submit-trigger"
      )),
      "" != d)
    ) {
      var f = document.querySelector(".js-payment-stripe-submit-trigger"),
        e = document.querySelector(".stripe_payment_method"),
        g = document.querySelector(
          ".stripe_payment_method_header span.adyen-checkout__payment-method__radio"
        ),
        h = document.querySelector("#card-element"),
        i = 0;
      b.addEventListener("click", function (a) {
        var b = document.querySelectorAll(
            ".adyen-checkout__payment-method__details__content"
          ),
          c = "dropin" == a.target.getAttribute("id");
        if (
          (f.classList.add("hidden"),
          paymentSubmitButton.classList.remove("hidden"),
          g.classList.remove("adyen-checkout__payment-method__radio--selected"),
          (h.style.display = "none"),
          0 == i && !c)
        ) {
          var d = a.target
            .closest("div.adyen-checkout__payment-method__header")
            .getElementsByClassName("adyen-checkout__payment-method__radio")[0];
          d.classList.add("adyen-checkout__payment-method__radio--selected");
        }
        (i = 1),
          b.forEach(function (a) {
            a.style.display = "block";
          });
      }),
        e.addEventListener("click", function () {
          var a = document.querySelectorAll(
              "#dropin .adyen-checkout__dropin .adyen-checkout__payment-method__header span.adyen-checkout__payment-method__radio"
            ),
            b = document.querySelectorAll(
              ".adyen-checkout__payment-method__details__content"
            );
          f.classList.remove("hidden"),
            paymentSubmitButton.classList.add("hidden"),
            a.forEach(function (a) {
              a.classList.remove(
                "adyen-checkout__payment-method__radio--selected"
              );
            }),
            g.classList.add("adyen-checkout__payment-method__radio--selected"),
            (h.style.display = "block"),
            b.forEach(function (a) {
              a.style.display = "none";
            }),
            (i = 0);
        });
    }
    a.addEventListener("submit", function (a) {
      var b = sessionStorage.getItem("paymentAmount"),
        d = document.querySelector(".alert--bold-error"),
        e = paymentSubmitButton.previousElementSibling;
      d && (d.style.display = "none"),
        a.preventDefault(),
        trpPayment.submitButton.isLoading(paymentSubmitButton),
        "instant" == c.value && (e.disabled = !0);
      try {
        dropin.state &&
          dropin.state.activePaymentMethod &&
          dropin.state.activePaymentMethod.props &&
          "paywithgoogle" === dropin.state.activePaymentMethod.props.type &&
          trpPayment.logPaymentClick(
            dropin.state.activePaymentMethod.props.type,
            "redirect",
            "success"
          );
      } catch (a) {}
      0 == b
        ? trpPayment.manualPayment()
        : dropin.submit().then(function (a) {
            !1 === a &&
              (trpPayment.submitButton.isDoneLoading(paymentSubmitButton),
              e && (e.disabled = !1));
          });
    });
  }
  return {
    submitButton: {
      isLoading: function isLoading(a) {
        a.classList.add("is-loading");
      },
      isDoneLoading: function isDoneLoading(a) {
        a.classList.remove("is-loading");
      },
    },
    getPersonalDetails: function getPersonalDetails() {
      var a = [],
        b = document.querySelector('input[name="bookingType"]') || "";
      if ("instant" == b.value) {
        var c = document.querySelector("#user-information-first-name"),
          d = document.querySelector("#user-information-last-name"),
          e = document.querySelector("#user-information-email");
        a.push({
          name: "first_name",
          value: c.value,
        }),
          a.push({
            name: "last_name",
            value: d.value,
          }),
          a.push({
            name: "email",
            value: e.value,
          });
      } else {
        var f = document.querySelector("#payment_first_name"),
          g = document.querySelector("#payment_last_name"),
          h = document.querySelector("#payment_email");
        a.push({
          name: "first_name",
          value: f.value,
        }),
          a.push({
            name: "last_name",
            value: g.value,
          }),
          a.push({
            name: "email",
            value: h.value,
          });
      }
      return a;
    },
    getBrowserInfo: function getBrowserInfo() {
      var a = {
        acceptHeader: "",
        userAgent: navigator.userAgent,
        language: navigator.language || navigator.userLanguage,
        javaEnabled: navigator.javaEnabled(),
        colorDepth: window.screen.colorDepth,
        screenHeight: window.innerHeight,
        screenWidth: window.innerWidth,
        timeZoneOffset: trpPayment.getTimezoneOffset(),
      };
      return a;
    },
    getTimezoneOffset: function getTimezoneOffset() {
      var a = new Date();
      return a.getTimezoneOffset();
    },
    logPaymentClick: function logPaymentClick(a, b, c) {
      var d = document.querySelector("#keep_reservation_payment"),
        e = {
          type: a,
          token: getUrlParameter("token"),
          preAuthorisation: "true" === d.value,
          event: b,
          result: c,
        },
        f = {
          credentials: "same-origin",
          method: "POST",
          body: JSON.stringify(e),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        };
      fetch("/log_payment_click", f);
    },
    manualPayment: function manualPayment() {
      var a = document.querySelector('input[name="bookingType"]') || "",
        b = document.querySelector('input[name="token"]').value,
        c = document.querySelector("#package-id").value,
        d = document.querySelector("#arrival-date").value,
        e = document.getElementById("newsletter-signup").checked,
        f = document.querySelector(".payment-option.selected input").value,
        g = document.querySelector("#organizer-slug").value,
        h = document.querySelector("#listing-slug").value,
        i = document.querySelector("#payment_total_price").value,
        j = document.querySelector("#payment_deposit_percentage").value,
        k = document.querySelector("#voucher-code").value,
        l = document.querySelector("#keep_reservation_payment").value;
      l = !("true" !== l);
      var m = {
          arrival_date: d,
          browser_info: trpPayment.getBrowserInfo(),
          display_deposit_percentage: +j,
          display_total_price: +i,
          is_instant_booking: !1,
          is_preauthorisation: !1,
          listing_slug: h,
          newsletters_sign_up: e,
          organizer_slug: g,
          package_id: +c,
          payment_data: {
            voucher: "voucher",
          },
          payment_method_type: f,
          payment_method: "voucher",
          redirection_url:
            location.protocol + "//" + location.host + location.pathname,
          retry_url:
            location.protocol + "//" + location.host + location.pathname,
          token: b,
          voucher: k,
        },
        n = {
          credentials: "same-origin",
          method: "POST",
          body: JSON.stringify(m),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
          },
        };
      fetch("/instant_payment", n)
        .then(function (a) {
          if (a.ok) return a.json();
          throw new Error("Something went wrong, please retry");
        })
        .then(function (a) {
          if (0 < Object.keys(a.actions).length)
            for (var b in a.actions)
              a.actions.hasOwnProperty(b) &&
                ("redirect" === b
                  ? (window.location = a.actions.redirect)
                  : "retry" === b
                  ? adyenDropin.renderButton(a.actions.retry)
                  : console.log(b));
        })
        .catch(function (a) {
          throw Error(a);
        });
    },
  };
})();
$(function () {
  150 > $("#reviews-wrapper").height() && $("#reviews-wrapper").hide();
  $("#button_confirm").on("click", function () {
    $("#review_form").submit();
  });
});

function getInstructorId() {
  var a = 0,
    b = $("#inpInstructor").val();
  a = $("#inpInstructor").find("option:selected").prop("id");
  var c = $("#instructorBlock_" + a);
  return 0 < c.length && (a = -1), a;
}

function instructorsReview() {
  var a = getInstructorId(),
    b = $("#inpInstructor").val();
  if (($("#inpInstructor").val(""), 0 < a)) {
    var c = $("#instructorReviewBlock"),
      d = c.clone().prop("id", "instructorBlock_" + a);
    d.prop("class", "instructor_block"),
      d.appendTo("#instructorsContainer"),
      $("#instructorBlock_" + a + " label[name=remove]").each(function () {
        $(this).prop("id", a);
      }),
      $("#instructorBlock_" + a + " label[name=instructorName]").each(
        function () {
          $(this).text(b), $(this).prop("id", "instructorName_" + a);
        }
      ),
      $("#instructorBlock_" + a + " input[name=review-instructor]").each(
        function () {
          $(this).prop("name", "review_instructor_" + a),
            $(this).prop("id", "review_instructor_" + a);
        }
      ),
      $("#instructorBlock_" + a + " input[name=instructor]").each(function (b) {
        $(this).prop("name", "instructor_" + a),
          $(this).prop("id", "r_" + a + "_" + b + 1);
      }),
      $("#instructorBlock_" + a + " input[name=instructor]").each(function (b) {
        $(this).prop("name", "instructor_" + a),
          $(this).prop("id", "r_" + a + "_" + b + 1);
      }),
      $("#instructorBlock_" + a + " label[name=opText]").each(function (b) {
        $(this).prop("for", "r_" + a + "_" + b + 1);
      });
  }
  return $("#instructor-review-overlay").show(200), !1;
}

function closeInstructorReviews() {
  return $("#instructor-review-overlay").hide(200), !1;
}

function confirmSubmitReview() {
  return (
    $("#customer-country").val($("#country-name").text()),
    loadReviewModalData(),
    $("#review-confirm-overlay").modal("show"),
    !1
  );
}

function loadReviewModalData() {
  var a = parseInt($("input[name=isAnonymous]:checked").val()) + 1;
  $("#name-text").text($("#ri0" + a + "-text").text()),
    loadRadioOption("qualityOfActivity", "#quality-activity-text"),
    loadRadioOption("accommodationAndFacilities", "#acc-facilities-text"),
    loadRadioOption("food", "#food-text"),
    loadRadioOption("location", "#location-text"),
    loadRadioOption("valueForMoney", "#value-for-money-text"),
    loadInstructorsSummary(),
    $("#highlight-text").text($("#review-highlight").val()),
    $("#what-good-text").text($("#review-text-pros").val()),
    $("#what-not-good-text").text($("#review-text-cons").val()),
    loadRadioOption("overallImpression", "#overall-text");
}

function loadRadioOption(a, b) {
  var c = $("input[name=" + a + "]:checked").prop("id");
  if (c != null) {
    $(b).text($("#" + c + "-text").text());
  }
}

function closeConfirmOverlay() {
  $("#review-confirm-overlay").modal("hide");
}

function loadInstructorsSummary() {
  $("#instructor-text").text(""),
    $("#instructorsContainer div[class=instructor_block]").each(function () {
      var a = $(this).prop("id");
      a = a.replace("instructorBlock_", "");
      var b = $("#instructorName_" + a).text(),
        c = $("#review_instructor_" + a).val();
      $("#instructor-text").append(
        "<br><strong>" + b + ": </strong>" + c + "<br>"
      );
    });
}

function removeInstructor(a) {
  $("#instructorBlock_" + a.id).remove(),
    0 == $("#instructorsContainer").children().length &&
      $("#instructor-review-overlay").hide(200);
}
$(function () {
  $(".js-listing-availability")
    .find("*")
    .filter(function () {
      var a = $.trim($(this).html());
      return "&nbsp;" === a;
    })
    .addClass("hide");
});
$(function () {
  var a = function () {
    $(".dropdown").removeClass("show"), $("*").removeClass("dropdown-open");
  };
  $(".dropdown-toggler").click(function () {
    var b = $(this).find(".dropdown").first(),
      c = b.hasClass("show");
    return (
      a(),
      c
        ? void (b.removeClass("show"), $(this).removeClass("dropdown-open"))
        : (b.addClass("show"),
          $(this).addClass("dropdown-open"),
          1024 > $(window).width() &&
            $("html,body").scrollTop($(this).offset().top - 10),
          !1)
    );
  }),
    $(document).click(function (b) {
      var c = b.target;
      $(c).is(".dropdown-toggler") ||
        $(c).parents().is(".dropdown-toggler") ||
        a();
    });
});
var cardFieldName = "adyen-encrypted-form-number";

function blockNonNumberEvents(a) {
  var b,
    c,
    d,
    e = !1;
  return (
    !(window.event
      ? ((b = a.keyCode), (e = window.event.ctrlKey))
      : a.which && ((b = a.which), (e = a.ctrlKey)),
    !isNaN(b)) ||
    !((c = String.fromCharCode(b)), !(8 == b || e)) ||
    ((d = /[\d ]/), d.test(c))
  );
}

function trim(a) {
  return rtrim(ltrim(a));
}

function ltrim(a) {
  if ("string" != typeof a) return a;
  for (; -1 != " \r\n\t\f".indexOf(a.charAt(0)) && 0 != a.length; )
    a = a.substring(1);
  return a;
}

function rtrim(a) {
  if ("string" != typeof a) return a;
  for (; -1 != " \r\n\t\f".indexOf(a.charAt(a.length - 1)) && 0 != a.length; )
    a = a.substring(0, a.length - 1);
  return a;
}

function digitsOnly(a) {
  if ("string" != typeof a) return a;
  for (var b = "", c = 0; c < a.length; c++)
    -1 != "0123456789".indexOf(a.charAt(c)) && (b += a.charAt(c));
  return b;
}

function removeLeadingZeros(a) {
  if ("string" != typeof a) return a;
  for (; "0" == a.charAt(0) && 0 != a.length; ) a = a.substring(1);
  return a;
}
var card_previousCardNumber = "";

function card_validateCcNumber() {
  var a = document.getElementById(cardFieldName).value;
  if (0 == a.length) return void (card_previousCardNumber = a);
  for (var b = 0; b < card_previousCardNumber.length && b < a.length; ) {
    if (a[b] != card_previousCardNumber[b])
      return void (card_previousCardNumber = a);
    b++;
  }
  a = a.replace(/\s+/g, "");
  var c = a.length;
  if (19 < c) return void card_ccNumberPresentation(!1);
  card_ccNumberPresentation(!0);
  var d = a.replace(/(\d{4})/g, "$1 ");
  (d = d.replace(/\s+$/, "")),
    (card_previousCardNumber = d),
    (document.getElementById(cardFieldName).value = d);
}

function card_ccNumberPresentation(a) {
  [].push(cardFieldName), a;
}
$(function () {
  var a = $("#adyen-encrypted-form-number");
  a.on("keypress", function (a) {
    return blockNonNumberEvents(a);
  }),
    a.on("keyup change", function (a) {
      return card_validateCcNumber(a);
    });
});

function encryptForm(a, b) {
  "function" == typeof adyen.encrypt.createEncryptedForm
    ? (function () {
        (adyen.createEncryptedForm = function (a, c) {
          return adyen.encrypt.createEncryptedForm(a, b, c);
        }),
          "function" == typeof adyen.encrypt.createEncryption &&
            (adyen.createEncryption = function (a) {
              return adyen.encrypt.createEncryption(b, a);
            });
      })()
    : (adyen.cse.available = !1);
  var c = {
    enableValidations: !1,
    submitButtonAlwaysEnabled: !0,
    numberIgnoreNonNumeric: !0,
    cardTypeElement: function cardTypeElement(b) {
      "unknown" != b &&
        $("#card-type").css(
          "background-image",
          "url(https://live.adyen.com/hpp/img/pm/" + b + "_tiny.png)"
        ),
        $("#card-type-input", a).val(b);
    },
    onsubmit: function onsubmit() {
      gae("payment-form", "submitted");
      var a = document.querySelector(".js-payment-submit-trigger");
      (a.disabled = !0), a.classList.add("is-loading"), saveEnteredData();
    },
  };
  loadEnteredData();
  var d = adyen.createEncryptedForm(a, c);
  d &&
    (d.addCardTypeDetection(c.cardTypeElement),
    d.addValidations(),
    $(a).on("submit", d.handleSubmit.bind(d)));
}

function saveEnteredData() {
  sessionStorage.setItem(
    "paymentMethod",
    $("input[name=brandCode]:checked").attr("id")
  ),
    sessionStorage.setItem("cc", $("#adyen-encrypted-form-number").val()),
    sessionStorage.setItem(
      "month",
      $("#adyen-encrypted-form-expiry-month").val()
    ),
    sessionStorage.setItem(
      "year",
      $("#adyen-encrypted-form-expiry-year").val()
    );
}

function loadEnteredData() {
  loadFieldFromSession("cc", "#adyen-encrypted-form-number"),
    loadFieldFromSession("month", "#adyen-encrypted-form-expiry-month"),
    loadFieldFromSession("year", "#adyen-encrypted-form-expiry-year");
}

function loadFieldFromSession(a, b) {
  if (null != sessionStorage) {
    var c = sessionStorage.getItem(a);
    "undefined" != c && null != c && "" != c && $(b).val(c);
  }
}
var loader = (function () {
  return {
    create: function create(a) {
      var b =
          !!(1 < arguments.length && arguments[1] !== void 0) && arguments[1],
        c =
          2 < arguments.length && arguments[2] !== void 0
            ? arguments[2]
            : "large",
        d = 3 < arguments.length ? arguments[3] : void 0,
        e = !!(4 < arguments.length && arguments[4] !== void 0) && arguments[4];
      e && window.loader.destroy();
      var f = "has-loader--" + c,
        g =
          '\n\t\t\t\t<div class="spinner js-spinner">\n\t\t\t\t\t<svg width="18" height="16" viewbox="0 0 18 16" xmlns="http://www.w3.org/2000/svg" class="bounce bounce1">\n\t\t\t\t\t\t<path d="M.035 5.645c-.344 3.11 1.84 8.322 7.776 9.47 3.017.589 7.015-.223 9.002-4.342C23.338-2.817.87-2.397.035 5.645z" fill="#02BF9B" fill-rule="nonzero">\n\t\t\t\t\t\t</path>\n\t\t\t\t\t</svg>\n\n\t\t\t\t\t<svg width="18" height="17" viewbox="0 0 18 16" xmlns="http://www.w3.org/2000/svg" class="bounce bounce2">\n\t\t\t\t\t\t<path d="M15.643 2.777A8.172 8.172 0 0 0 12.707.703C7.61-1.48 1.765 1.736.333 6.025c-.035.105-.067.21-.096.316-.561 2.033-.135 4.253 1.372 6.066 1.802 2.168 4.765 3.471 7.601 3.613 3.924.196 7.457-1.079 8.504-4.38.79-2.49-.105-6.65-2.071-8.863z" fill="#02A5E8" fill-rule="nonzero">\n\t\t\t\t\t\t</path>\n\t\t\t\t\t</svg>\n\t\t\t\t\t<svg width="18" height="18" viewbox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" class="bounce bounce3">\n\t\t\t\t\t\t<path d="M10.215.437C5.117.437-2.205 5.263.634 11.088c2.839 5.825 12.92 8.488 15.732 2.996C19.112 8.718 19.204.437 10.215.437z" fill="#FF9B35" fill-rule="nonzero">\n\t\t\t\t\t\t</path>\n\t\t\t\t\t</svg>\n\t\t\t\t</div>\n\t\t\t';
      b
        ? (a.classList.add("js-spinner-holder", "has-loader", f),
          a.insertAdjacentHTML("beforeend", g))
        : (a.parentNode.classList.add("js-spinner-holder", "has-loader", f),
          a.insertAdjacentHTML("afterend", g));
    },
    destroy: function destroy() {
      var a = document.querySelector(".js-spinner");
      a && (a.classList.remove("js-spinner-holder"), a.remove());
    },
  };
})();
$(function () {
  $(".label_security_code").length &&
    $(".label_security_code i").hover(function () {
      $(this).parent().parent().find(".popover").toggle();
    });
});
var dateWithoutDay;
(Date.prototype.toUTC = function () {
  return new Date(
    Date.UTC(this.getFullYear(), this.getMonth(), this.getDate(), 0, 0, 0, 0)
  );
}),
  (Date.prototype.addDays = function (a) {
    var b;
    return (
      (b = new Date(this.valueOf()).toUTC()),
      b.setUTCDate(b.getUTCDate() + a),
      b
    );
  }),
  (dateWithoutDay = function (a) {
    return a.slice(0, 7);
  });

function initDatePicker() {
  function a(a) {
    if ($.fn.datepicker.DPGlobal)
      return $.fn.datepicker.DPGlobal.formatDate(a, "yymmdd", "en");
  }

  function b(a) {
    var b = new Date(a);
    return b.setTime(b.getTime() + 6e4 * b.getTimezoneOffset()), b;
  }

  function c(a) {
    return selectedCurrencyFormat.replace(
      "{amount}",
      a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    );
  }

  function d(d) {
    window.availabilityDate = d.getTime() / 1e3;
    var f,
      g,
      h,
      i,
      j = a(b(d)),
      k = !1;
    $("input.package-selection-item[data-availability]").each(function () {
      var a = $(this),
        b = parseInt(a.data("id")),
        d = $("#listing-query-package-price-" + b),
        e = n[b][j];
      if (e) {
        a.data("availability-type", e.type),
          a.data("availability-slots", e.slots),
          a.closest("li").show(),
          d.text(c(e.price)),
          d.attr("data-price", e.price),
          (!f || e.price < f) && ((f = e.price), (g = a)),
          (!h || e.price > h) && ((h = e.price), (i = a));
        var l = d.parent().parent().find(".package-selection-item"),
          m = l.attr("data-deal-percent"),
          o = l.attr("data-deal-fixed");
        if (m || o) {
          var p = Math.round(e.price * (1 - m / 100) - o);
          d.html(
            '<span class="promoPrice oldPrice">' +
              c(e.price) +
              '</span><span class="promoPrice newPrice">' +
              c(p) +
              "</span>"
          ),
            (!f || p < f) && ((f = p), (g = a));
          (!h || p > h) && ((h = p), (i = a));
        }
        1 == e.type
          ? document.body.classList.contains("instant-book-flow") &&
            (a.removeAttr("disabled"),
            a.closest("li").addClass("instant"),
            a.closest("li input").addClass("instant"))
          : 2 == e.type
          ? (a.removeAttr("disabled"), a.closest("li").removeClass("instant"))
          : (a.removeAttr("disabled"), a.closest("li").removeClass("instant"));
      } else a.closest("li").hide().removeClass("instant"), d.text("--"), a.is(":checked") && (k = !0);
    }),
      k && g && g.prop("checked", !0),
      $(".listing-price-wrapper span.price").text(f ? c(f) : "--"),
      $("input.package-selection-item[data-availability]").each(e);
    0 < $(".safety_usps_wrapper").length &&
      5e3 < h &&
      $(".safety_usps_wrapper").hide();
  }

  function e() {
    var a = $(this);
    ($cta = $("#reservation-query-submit")),
      (type = parseInt(a.data("availability-type"))),
      (slots = parseInt(a.data("availability-slots"))),
      (icon = '<i class="ebs-icon ebs-icon-lightning-bolt"></i>'),
      ($parent = a.parent(".js-instant-parent"));
  }

  function f(a) {
    return (
      (window.lpDateSelected = window.lpDateSelected || 0),
      t != a && (d(b(a)), (t = a), !0)
    );
  }

  function g(a) {
    var b = document.querySelector("#listing-booking-form");
    b.dataset.selectedDate = a;
  }

  function h(a) {
    if (!a) return null;
    var c,
      d = [],
      e = a.toString().split(",");
    for (var f in e) {
      var g = e[f],
        h = g.split("-"),
        j = 1 < h.length ? parseInt(h[1]) : 1;
      g = h[0];
      var k, l, m;
      0 < f
        ? (c.setDate(c.getDate() + parseInt(g.slice(0, 4))),
          (k = parseInt(g.slice(4, 5))),
          1 == k
            ? ((m = parseInt(g.slice(5, 7))), (l = parseInt(g.slice(7))))
            : (l = parseInt(g.slice(5))))
        : ((c = new Date(0)),
          c.setUTCFullYear(parseInt(g.slice(0, 2)) + 2e3),
          c.setUTCMonth(parseInt(g.slice(2, 4)) - 1),
          c.setUTCDate(parseInt(g.slice(4, 6))),
          (k = parseInt(g.slice(6, 7))),
          1 === k
            ? ((m = parseInt(g.slice(7, 9))), (l = parseInt(g.slice(9))))
            : (l = parseInt(g.slice(7))));
      for (var n, o = 0; o < j; ++o)
        (n = {
          date: b(c),
          type: k,
          price: l,
          slots: m,
        }),
          d.push(n),
          c.setDate(c.getDate() + 1);
    }
    return d;
  }
  var i, j, k, l, m;
  i = $("#listing_query_arrival_date.date-picker");
  var j = {
    dates: null,
    guaranteed: null,
    duration: i.data("duration-in-days"),
  };
  $("#duration_in_days").length &&
    $("#duration_in_days").change(function () {
      var a = $(".listing-packages").height();
      0 == a
        ? $(".package__filtersError").removeClass("hide")
        : $(".package__filtersError").addClass("hide");
      (j.duration = $(this).val()),
        i.datepicker(),
        m(),
        k("#listing-availability-container .datepicker .day.active");
    });
  var n = {},
    o = $("#listing-availability-container");
  if (o.length) {
    var p = h(o.data("availability"));
    for (var q in p) {
      var r = p[q],
        s = a(b(r.date));
      j.dates || (j.dates = {}),
        (j.dates[s] = !0),
        0 < r.type &&
          0 < r.slots &&
          (!j.guaranteed && (j.guaranteed = {}), (j.guaranteed[s] = !0));
    }
    $("input.package-selection-item[data-availability]").each(function () {
      var c = $(this),
        d = parseInt(c.data("id")),
        e = {},
        f = h(c.data("availability"));
      for (var g in f) {
        var i = f[g],
          j = a(b(i.date));
        e[j] = i;
      }
      n[d] = e;
    });
  }
  (k = function (a) {
    var b, c, d, e;
    if ($(a).length)
      return (
        (b = $(".day")),
        (d = b.index($(a))),
        (c = parseInt(j.duration)),
        (e = $.grep(b, function (a, b) {
          return b < d + c && b >= d;
        })),
        $(e).addClass("highlight")
      );
  }),
    (l = function () {
      return k(".public .datepicker:visible .day.active");
    }),
    (m = function () {
      return $(".day.highlight").removeClass("highlight");
    }),
    $(".arrival_date_select").change(function () {
      if (!f($(this).val())) {
        $("#departure_dates div").hide();
        var a = "dd_" + $(this).val();
        $("#" + a).show();
      }
    }),
    $("#arrival_date_select").change(function () {
      $("#departure_dates div").hide();
      var a = "dd_" + $(this).val();
      $("#" + a).show();
    }),
    $("input.package-selection-item[data-availability]").on("change", e);
  var t = $("#listing_query_arrival_date").val();
  t || (t = $("#arrival_date_select").val()), d(b(t));
  i
    .datepicker({
      language: selectedLanguage,
      format: "yyyy-mm-dd",
      container: "#listing-availability-container",
      weekStart: 1,
      autoclose: !0,
      orientation: "bottom auto",
      beforeShowDay: function beforeShowDay(c) {
        var d = !0;
        if (j.dates) {
          d = {
            enabled: !1,
            classes: "",
          };
          var e = a(b(c));
          if (j.dates[e]) {
            var f = "available";
            j.guaranteed && j.guaranteed[e] && (f = f.concat(" guaranteed")),
              (d.enabled = !0),
              (d.classes = f);
          }
        }
        return d;
      },
    })
    .on("show", function () {
      return (
        (ctx.hasSelectedArrivalDate = !0),
        j.dates && $(".public .datepicker:visible").addClass("listing-show"),
        $(".public .datepicker:visible")
          .on("mouseover.duration", ".available", function () {
            return m(), k(this);
          })
          .on("mouseout.duration", ".available", function () {
            return m(), k(".public .datepicker:visible .day.active");
          }),
        k(".public .datepicker:visible .day.active")
      );
    })
    .on("hide", function () {
      return (
        $(".public .datepicker:visible .day.active").off("click.disabled"),
        $(".public .datepicker:visible").off(
          "mouseover.duration mouseout.duration",
          ".available"
        )
      );
    })
    .on("keypress", function () {
      return !j.dates;
    })
    .on("changeDate", function (c) {
      if ((g(c.currentTarget.defaultValue), !f(c.format("yyyy-mm-dd")))) {
        var d = a(b(c));
        j.guaranteed && j.guaranteed[d]
          ? $("#instant_reservation_date_selected").removeClass("hidden")
          : $("#instant_reservation_date_selected").addClass("hidden");
      }
      return "en" == selectedLanguage
        ? $("#beauty_arrival_date, .js--beauty_arrival_date").val(
            c.format("DD MM d, yyyy")
          )
        : $("#beauty_arrival_date, .js--beauty_arrival_date").val(
            c.format("DD d MM, yyyy")
          );
    })
    .on("changeMonth", function () {
      return setTimeout(l, 1);
    }),
    $("#beauty_arrival_date, .js--beauty_arrival_date")
      .on("click", function () {
        return i.datepicker("show");
      })
      .on("keypress", function () {
        return !1;
      }),
    $("#beauty_inq_arrival_date")
      .on("click", function () {
        return i.datepicker("show");
      })
      .on("keypress", function () {
        return !1;
      }),
    $(".availability-dates label.date_picker").on("click", function () {
      return i.datepicker("show");
    }),
    i.val() && i.datepicker("setDate", $("#listing_query_arrival_date").val()),
    $(".js-calendar-open").click(function () {
      return i.datepicker("show");
    }),
    $(".js-dialogs-date-picker").each(function (a, b) {
      var c = $(b);
      return (
        c
          .datepicker({
            language: selectedLanguage,
            format: c.data("date-format")
              ? c.data("date-format")
              : "yyyy-mm-dd",
            weekStart: 1,
            autoclose: !0,
            orientation: "bottom auto",
            beforeShowDay: function beforeShowDay() {
              return !0;
            },
          })
          .on("show", function () {})
          .on("hide", function () {})
          .on("keypress", function () {
            return !j.dates;
          })
          .on("changeDate", function (a) {
            var b = $(c.data("target")),
              d = c.data("target-date-format")
                ? c.data("target-date-format")
                : "DD MM d, yyyy";
            return b.is("input") ? b.val(a.format(d)) : b.html(a.format(d));
          })
          .on("changeMonth", function () {}),
        $(c.data("target"))
          .on("click", function () {
            return c.datepicker("show");
          })
          .on("keypress", function () {
            return !1;
          }),
        c.parents("label").on("click", function () {
          return c.datepicker("show");
        }),
        c.val() && c.datepicker("setDate", c.val()),
        $(c.data("icon-id")).on("click", function () {
          return c.datepicker("show");
        })
      );
    }),
    $(".js-reserve-link").click(function () {
      $(this).parent().parent().find("input").click(),
        $("#reservation-query-submit").trigger("click");
    }),
    $(".js-instant-book-link").click(function () {
      $(this).parent().parent().find("input").click(),
        $("#instant-booking-query-submit").trigger("click");
    });
}
$(function () {
  initDatePicker();
});
$(function () {
  var a = function (a) {
      a.addClass("collapsed"),
        a.parent().addClass("collapsed"),
        a.siblings(".js-collapsible").addClass("hide");
    },
    b = function (a) {
      a.removeClass("collapsed"),
        a.parent().removeClass("collapsed"),
        a.siblings(".js-collapsible").removeClass("hide");
    };
  $("body").on("click", ".js-collapser", function (c) {
    $(this).hasClass("collapsed") ? b($(this)) : a($(this), c);
  }),
    $(".js-expand-hide-all").on("click", function () {
      var c = $(this),
        d = $(".js-expand-all-parent").children(".collapsible"),
        e = c.data("state"),
        f = parseInt(c.data("state")),
        g = f ? 0 : 1,
        h = g ? "minus" : "plus",
        i = g ? c.data("hide-text") : c.data("expand-text");
      return (
        0 === g
          ? d.each(function () {
              a($(this).find(".js-collapser"), !1);
            })
          : d.each(function () {
              b($(this).find(".js-collapser"));
            }),
        c.html('<i class="ebs-icon ebs-icon-' + h + '"></i> ' + i),
        c.data("state", g),
        !1
      );
    }),
    (function check() {
      if ("flex" === $(".columns").css("display")) {
        $(".js-collapser").each(function () {
          a($(this), !1);
        });
        var b = $(".js-expand-hide-all");
        b.data("state", !1),
          b.html(
            '<i class="ebs-icon ebs-icon-plus"></i> ' + b.data("expand-text")
          );
      }
    })();
});

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
(function (a) {
  var b = !1;
  if (
    ("function" == typeof define && define.amd && (define(a), (b = !0)),
    "object" ===
      ("undefined" == typeof exports ? "undefined" : _typeof(exports)) &&
      ((module.exports = a()), (b = !0)),
    !b)
  ) {
    var c = window.Cookies,
      d = (window.Cookies = a());
    d.noConflict = function () {
      return (window.Cookies = c), d;
    };
  }
})(function () {
  function a() {
    for (var a = 0, b = {}; a < arguments.length; a++) {
      var c = arguments[a];
      for (var d in c) b[d] = c[d];
    }
    return b;
  }

  function b(c) {
    function d(b, e, f) {
      var g;
      if ("undefined" != typeof document) {
        if (1 < arguments.length) {
          if (
            ((f = a(
              {
                path: "/",
              },
              d.defaults,
              f
            )),
            "number" == typeof f.expires)
          ) {
            var h = new Date();
            h.setMilliseconds(h.getMilliseconds() + 864e5 * f.expires),
              (f.expires = h);
          }
          f.expires = f.expires ? f.expires.toUTCString() : "";
          try {
            (g = JSON.stringify(e)), /^[\{\[]/.test(g) && (e = g);
          } catch (a) {}
          (e = c.write
            ? c.write(e, b)
            : encodeURIComponent(e + "").replace(
                /%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,
                decodeURIComponent
              )),
            (b = encodeURIComponent(b + "")),
            (b = b.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)),
            (b = b.replace(/[\(\)]/g, escape));
          var j = "";
          for (var k in f)
            f[k] && ((j += "; " + k), !0 !== f[k]) && (j += "=" + f[k]);
          return (document.cookie = b + "=" + e + j);
        }
        b || (g = {});
        for (
          var l = document.cookie ? document.cookie.split("; ") : [],
            m = /(%[0-9A-Z]{2})+/g,
            n = 0;
          n < l.length;
          n++
        ) {
          var o = l[n].split("="),
            p = o.slice(1).join("=");
          '"' === p.charAt(0) && (p = p.slice(1, -1));
          try {
            var q = o[0].replace(m, decodeURIComponent);
            if (
              ((p = c.read
                ? c.read(p, q)
                : c(p, q) || p.replace(m, decodeURIComponent)),
              this.json)
            )
              try {
                p = JSON.parse(p);
              } catch (a) {}
            if (b === q) {
              g = p;
              break;
            }
            b || (g[q] = p);
          } catch (a) {}
        }
        return g;
      }
    }
    return (
      (d.set = d),
      (d.get = function (a) {
        return d.call(d, a);
      }),
      (d.getJSON = function () {
        return d.apply(
          {
            json: !0,
          },
          [].slice.call(arguments)
        );
      }),
      (d.defaults = {}),
      (d.remove = function (b, c) {
        d(
          b,
          "",
          a(c, {
            expires: -1,
          })
        );
      }),
      (d.withConverter = b),
      d
    );
  }
  return b(function () {});
});
$(function () {
  if ($("#privacy_modal_trigger").length) {
    var a = document.getElementById("privacy_modal_trigger");
    if (a) for (; (a = a.parentElement) && !a.classList.contains("modal"); );
    null != a &&
      ($("#privacy_modal_trigger").attr("data-toggle", "none"),
      $("#privacy_modal_trigger").attr("target", "_blank"),
      $("#privacy_modal_trigger").attr(
        "href",
        "/terms-and-privacy/" + $("#privacy_modal_trigger").attr("href")
      ));
    -1 < window.location.href.indexOf("#privacy_modal") &&
      setTimeout(function () {
        $("#privacy_modal").modal();
      }, 600);
  }
});
$(function () {
  $(".js-customer-dialogs-toggler").click(function () {
    $(".js-customer-dialogs-toggler").toggleClass("open"),
      $(".js-customer-dialogs-panel").toggleClass("open");
  });
});
$(function () {
  $("#select_all_sites").change(function () {
    $(".site_checkbox").prop("checked", $(this).prop("checked"));
  }),
    $(".site_checkbox").change(function () {
      $("#select_all_sites").prop("checked", !1),
        $(this).prop("checked")
          ? $(this).attr("value", "on")
          : $(this).attr("value", "off");
    }),
    $(".accept_terms").change(function () {
      $("#select_all_sites").prop("checked", !1),
        $(this).prop("checked")
          ? $(this).attr("value", "on")
          : $(this).attr("value", "off");
    });
});
$(function () {
  function a(a) {
    var b = [],
      a = $(a).find(".wrapper-img"),
      b = $(a).find("img"),
      c = 0;
    clearInterval(window.card_slideshow_interval),
      (window.card_slideshow_interval = setInterval(function () {
        c++, $(b[c]).attr("src") == null && (c = 0);
        var d = $(b[c]).attr("src");
        $(a).css("background-image", "url(" + d + ")");
      }, 1e3));
  }
  var b = $(window).width();
  $(".showcards .showcard").hover(
    function () {
      if (1024 < b) {
        var c = $(this).find(".wrapper-img"),
          d = c.data("slideshow-images").split(",");
        if (c.attr("data-images-added") == null) {
          $(this).addClass("card_slideshow"),
            c.attr("data-images-added", "true");
          for (var e = 1; e < Math.min(6, d.length); e++)
            $(c).append('<img class="hide" src="' + d[e] + '">');
          $(c).append('<img class="hide" src="' + d[0] + '">');
        }
        a(this);
      }
    },
    function () {
      clearInterval(window.card_slideshow_interval);
    }
  );
});
$(function () {
  var a = $("form#inquiry-form");
  document.addEventListener("focusout", function (a) {
    a.target.matches("#inquiry-form .simple-validation .form-control") &&
      validation.simpleValidation(a.target, ".simple-validation"),
      a.target.matches("#inquiry-form .email-validation .form-control") &&
        validation.emailValidation(a.target, ".email-validation");
  }),
    $("#new-inquiry-submit").on("click", function () {
      var a = $("#reservation-query-submit").attr("href");
      (a +=
        "&first_name=" +
        encodeURIComponent($("#inquiry_message_form_first_name").val())),
        (a +=
          "&last_name=" +
          encodeURIComponent($("#inquiry_message_form_last_name").val())),
        (a +=
          "&email=" +
          encodeURIComponent($("#inquiry_message_form_email").val())),
        (a +=
          "&telephone_number_code=" +
          encodeURIComponent(
            $("#inquiry_message_form_telephone_number_code").val()
          )),
        (a +=
          "&telephone_number=" +
          encodeURIComponent(
            $("#inquiry_message_form_telephone_number").val()
          )),
        (a +=
          "&message=" +
          encodeURIComponent($("#inquiry_message_form_message").val())),
        $("#new-inquiry-submit").attr("href", a);
    }),
    $("#reservation-query-submit").on("click", function (a) {
      a.preventDefault();
      var b = document.querySelector("#listing-booking-form");
      (b.action = b.dataset.reservationUrl), b.submit();
    }),
    $("#instant-booking-query-submit").on("click", function (a) {
      a.preventDefault();
      var b = document.querySelector("#listing-booking-form");
      (b.action = b.dataset.instantBookingUrl), b.submit();
    }),
    $("#new-inquiry-submit", a).on("click", function (b) {
      var c = document.querySelector("#new-inquiry-submit");
      if (
        ((c.disabled = !0),
        b.preventDefault(),
        c.classList.add("is-loading"),
        "" == $("#inquiry_message_form_message").val() &&
          $("#inquiry_modal .js-radio-buttons").length &&
          $("#arrival1").is(":checked"))
      )
        return (
          $(".inquiry_message_form_message").addClass("error"),
          c.classList.remove("is-loading"),
          (c.disabled = !1),
          !1
        );
      $("#inquiry_message_form_message").removeClass("error");
      var d = document.querySelector("#inquiry_message_form_first_name"),
        e = document.querySelector("#inquiry_message_form_last_name"),
        f = document.querySelector("#inquiry_message_form_email");
      if ("" == d.value || "" == e.value || "" == f.value)
        return (
          "" == d.value &&
            validation.setValidation(
              validation.findAncestor(d, ".control-group"),
              !1
            ),
          "" == e.value &&
            validation.setValidation(
              validation.findAncestor(e, ".control-group"),
              !1
            ),
          "" == f.value &&
            validation.setValidation(
              validation.findAncestor(f, ".control-group"),
              !1
            ),
          c.classList.remove("is-loading"),
          (c.disabled = !1),
          !1
        );
      if (validation.hasFormErrors("#inquiry-form"))
        return c.classList.remove("is-loading"), (c.disabled = !1), !1;
      if ($("#inquiry_modal .js-radio-buttons").length) {
        var g = "";
        $("#arrival1").is(":checked") && (g = "no_selected_dates"),
          $("#arrival2").is(":checked") &&
            1 != +Cookies.get("inquiry_window_clicked_select_dates") &&
            (g = "closest_date"),
          gae("inquiry_modal", g);
      }
      a.submit();
    });
  var b = function () {
    var a = $("#listing_slug").val(),
      b = $("#listing_query_arrival_date").length
        ? $("#listing_query_arrival_date").val()
        : $("#arrival_date_select").val(),
      c = function (c) {
        var d = ""
          .concat(a, "/inquiry?arrival_date=")
          .concat(b, "&package_id=")
          .concat(c);
        return d;
      },
      d = function (a) {
        return $("form#inquiry-form").attr("action", a);
      };
    $("#arrival_date_select").on("change", function () {
      d(c($(".package-selection-item:checked").val(), "arrival_date_select"));
    }),
      $("#listing_query_arrival_date").on("change", function () {
        d(
          c(
            $(".package-selection-item:checked").val(),
            "listing_query_arrival_date"
          )
        );
      }),
      $(document).ready(function () {
        d(c($(".package-selection-item:checked").val(), "document"));
      });
  };
  $(".listing-content form#inquiry-form").length && b();
  var c = document.querySelector("#inquiry_modal");
  c && c.classList.contains("js-add-push-state")
    ? ($("#inquiry_modal").on("shown", function () {
        b();
        var a = this;
        (window.location.hash = "inquire"),
          (window.onhashchange = function () {
            location.hash || $(a).modal("hide");
          });
      }),
      $("#inquiry_modal").on("hide", function () {
        history.pushState("", document.title, window.location.pathname);
      }))
    : $("#inquiry_modal").on("shown", b);
});

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
!(function (a) {
  "function" == typeof define && define.amd
    ? define([], a)
    : "object" ==
      ("undefined" == typeof exports ? "undefined" : _typeof(exports))
    ? (module.exports = a())
    : (window.noUiSlider = a());
})(function () {
  "use strict";

  function j(a) {
    a.parentElement.removeChild(a);
  }

  function q(a) {
    return null != a;
  }

  function s(a) {
    a.preventDefault();
  }

  function z(a) {
    return "number" == typeof a && !isNaN(a) && isFinite(a);
  }

  function B(a, b, c) {
    0 < c &&
      (aa(a, b),
      setTimeout(function () {
        H(a, b);
      }, c));
  }

  function F(a) {
    return U(S(a, 100), 0);
  }

  function G(a) {
    return Array.isArray(a) ? a : [a];
  }

  function i(a) {
    var b = (a = a + "").split(".");
    return 1 < b.length ? b[1].length : 0;
  }

  function aa(a, b) {
    a.classList ? a.classList.add(b) : (a.className += " " + b);
  }

  function H(a, b) {
    a.classList
      ? a.classList.remove(b)
      : (a.className = a.className.replace(
          new RegExp("(^|\\b)" + b.split(" ").join("|") + "(\\b|$)", "gi"),
          " "
        ));
  }

  function I(a) {
    var b = void 0 !== window.pageXOffset,
      c = "CSS1Compat" === (a.compatMode || "");
    return {
      x: b
        ? window.pageXOffset
        : c
        ? a.documentElement.scrollLeft
        : a.body.scrollLeft,
      y: b
        ? window.pageYOffset
        : c
        ? a.documentElement.scrollTop
        : a.body.scrollTop,
    };
  }

  function J(a, b) {
    return 100 / (b - a);
  }

  function c(a, b) {
    return (100 * b) / (a[1] - a[0]);
  }

  function p(a, b) {
    for (var c = 1; a >= b[c]; ) c += 1;
    return c;
  }

  function e(b, d, e) {
    if (e >= b.slice(-1)[0]) return 100;
    var f,
      g,
      h = p(e, b),
      j = b[h - 1],
      a = b[h],
      k = d[h - 1],
      l = d[h];
    return (
      k +
      ((g = e), c((f = [j, a]), 0 > f[0] ? g + T(f[0]) : g - f[0]) / J(k, l))
    );
  }

  function f(b, c, d, e) {
    if (100 === e) return e;
    var f,
      g,
      h = p(e, b),
      a = b[h - 1],
      j = b[h];
    return d
      ? (j - a) / 2 < e - a
        ? j
        : a
      : c[h - 1]
      ? b[h - 1] + ((f = e - b[h - 1]), (g = c[h - 1]), D(f / g) * g)
      : e;
  }

  function r(a, b, c) {
    var d;
    if (("number" == typeof b && (b = [b]), !Array.isArray(b)))
      throw new Error("noUiSlider (14.1.1): 'range' contains invalid value.");
    if (
      !z((d = "min" === a ? 0 : "max" === a ? 100 : parseFloat(a))) ||
      !z(b[0])
    )
      throw new Error("noUiSlider (14.1.1): 'range' value isn't numeric.");
    c.xPct.push(d),
      c.xVal.push(b[0]),
      d
        ? c.xSteps.push(!isNaN(b[1]) && b[1])
        : isNaN(b[1]) || (c.xSteps[0] = b[1]),
      c.xHighestCompleteStep.push(0);
  }

  function o(a, b, d) {
    if (b)
      if (d.xVal[a] !== d.xVal[a + 1]) {
        d.xSteps[a] =
          c([d.xVal[a], d.xVal[a + 1]], b) / J(d.xPct[a], d.xPct[a + 1]);
        var e = (d.xVal[a + 1] - d.xVal[a]) / d.xNumSteps[a],
          f = Math.ceil(+e.toFixed(3) - 1),
          g = d.xVal[a] + d.xNumSteps[a] * f;
        d.xHighestCompleteStep[a] = g;
      } else d.xSteps[a] = d.xHighestCompleteStep[a] = d.xVal[a];
  }

  function a(a, b, c) {
    (this.xPct = []),
      (this.xVal = []),
      (this.xSteps = [c || !1]),
      (this.xNumSteps = [!1]),
      (this.xHighestCompleteStep = []),
      (this.snap = b);
    var d = [];
    for (var e in a) a.hasOwnProperty(e) && d.push([a[e], e]);
    for (
      d.length && "object" == _typeof(d[0][0])
        ? d.sort(function (a, b) {
            return a[0][0] - b[0][0];
          })
        : d.sort(function (a, b) {
            return a[0] - b[0];
          }),
        e = 0;
      e < d.length;
      e++
    )
      r(d[e][1], d[e][0], this);
    for (
      this.xNumSteps = this.xSteps.slice(0), e = 0;
      e < this.xNumSteps.length;
      e++
    )
      o(e, this.xNumSteps[e], this);
  }

  function l(a) {
    if (
      "object" == _typeof((b = a)) &&
      "function" == typeof b.to &&
      "function" == typeof b.from
    )
      return !0;
    var b;
    throw new Error(
      "noUiSlider (14.1.1): 'format' requires 'to' and 'from' methods."
    );
  }

  function d(a, b) {
    if (!z(b)) throw new Error("noUiSlider (14.1.1): 'step' is not numeric.");
    a.singleStep = b;
  }

  function h(b, c) {
    if ("object" != _typeof(c) || Array.isArray(c))
      throw new Error("noUiSlider (14.1.1): 'range' is not an object.");
    if (void 0 === c.min || void 0 === c.max)
      throw new Error(
        "noUiSlider (14.1.1): Missing 'min' or 'max' in 'range'."
      );
    if (c.min === c.max)
      throw new Error(
        "noUiSlider (14.1.1): 'range' 'min' and 'max' cannot be equal."
      );
    b.spectrum = new a(c, b.snap, b.singleStep);
  }

  function m(a, b) {
    if (((b = G(b)), !Array.isArray(b) || !b.length))
      throw new Error("noUiSlider (14.1.1): 'start' option is incorrect.");
    (a.handles = b.length), (a.start = b);
  }

  function g(a, b) {
    if ("boolean" != typeof (a.snap = b))
      throw new Error("noUiSlider (14.1.1): 'snap' option must be a boolean.");
  }

  function v(a, b) {
    if ("boolean" != typeof (a.animate = b))
      throw new Error(
        "noUiSlider (14.1.1): 'animate' option must be a boolean."
      );
  }

  function b(a, b) {
    if ("number" != typeof (a.animationDuration = b))
      throw new Error(
        "noUiSlider (14.1.1): 'animationDuration' option must be a number."
      );
  }

  function K(a, b) {
    var c,
      d = [!1];
    if (
      ("lower" === b ? (b = [!0, !1]) : "upper" === b && (b = [!1, !0]),
      !0 === b || !1 === b)
    ) {
      for (c = 1; c < a.handles; c++) d.push(b);
      d.push(!1);
    } else {
      if (!Array.isArray(b) || !b.length || b.length !== a.handles + 1)
        throw new Error(
          "noUiSlider (14.1.1): 'connect' option doesn't match handle count."
        );
      d = b;
    }
    a.connect = d;
  }

  function x(a, b) {
    switch (b) {
      case "horizontal":
        a.ort = 0;
        break;
      case "vertical":
        a.ort = 1;
        break;
      default:
        throw new Error(
          "noUiSlider (14.1.1): 'orientation' option is invalid."
        );
    }
  }

  function w(a, b) {
    if (!z(b))
      throw new Error("noUiSlider (14.1.1): 'margin' option must be numeric.");
    if (0 !== b && ((a.margin = a.spectrum.getMargin(b)), !a.margin))
      throw new Error(
        "noUiSlider (14.1.1): 'margin' option is only supported on linear sliders."
      );
  }

  function y(a, b) {
    if (!z(b))
      throw new Error("noUiSlider (14.1.1): 'limit' option must be numeric.");
    if (((a.limit = a.spectrum.getMargin(b)), !a.limit || 2 > a.handles))
      throw new Error(
        "noUiSlider (14.1.1): 'limit' option is only supported on linear sliders with 2 or more handles."
      );
  }

  function E(a, b) {
    if (!z(b) && !Array.isArray(b))
      throw new Error(
        "noUiSlider (14.1.1): 'padding' option must be numeric or array of exactly 2 numbers."
      );
    if (Array.isArray(b) && 2 !== b.length && !z(b[0]) && !z(b[1]))
      throw new Error(
        "noUiSlider (14.1.1): 'padding' option must be numeric or array of exactly 2 numbers."
      );
    if (0 !== b) {
      if (
        (Array.isArray(b) || (b = [b, b]),
        !(a.padding = [
          a.spectrum.getMargin(b[0]),
          a.spectrum.getMargin(b[1]),
        ]) === a.padding[0] || !1 === a.padding[1])
      )
        throw new Error(
          "noUiSlider (14.1.1): 'padding' option is only supported on linear sliders."
        );
      if (0 > a.padding[0] || 0 > a.padding[1])
        throw new Error(
          "noUiSlider (14.1.1): 'padding' option must be a positive number(s)."
        );
      if (100 < a.padding[0] + a.padding[1])
        throw new Error(
          "noUiSlider (14.1.1): 'padding' option must not exceed 100% of the range."
        );
    }
  }

  function C(a, b) {
    switch (b) {
      case "ltr":
        a.dir = 0;
        break;
      case "rtl":
        a.dir = 1;
        break;
      default:
        throw new Error(
          "noUiSlider (14.1.1): 'direction' option was not recognized."
        );
    }
  }

  function N(b, c) {
    if ("string" != typeof c)
      throw new Error(
        "noUiSlider (14.1.1): 'behaviour' must be a string containing options."
      );
    var d = 0 <= c.indexOf("tap"),
      e = 0 <= c.indexOf("drag"),
      f = 0 <= c.indexOf("fixed"),
      g = 0 <= c.indexOf("snap"),
      h = 0 <= c.indexOf("hover"),
      a = 0 <= c.indexOf("unconstrained");
    if (f) {
      if (2 !== b.handles)
        throw new Error(
          "noUiSlider (14.1.1): 'fixed' behaviour must be used with 2 handles"
        );
      w(b, b.start[1] - b.start[0]);
    }
    if (a && (b.margin || b.limit))
      throw new Error(
        "noUiSlider (14.1.1): 'unconstrained' behaviour cannot be used with margin or limit"
      );
    b.events = {
      tap: d || g,
      drag: e,
      fixed: f,
      snap: g,
      hover: h,
      unconstrained: a,
    };
  }

  function Q(a, b) {
    if (!1 !== b)
      if (!0 === b) {
        a.tooltips = [];
        for (var c = 0; c < a.handles; c++) a.tooltips.push(!0);
      } else {
        if (((a.tooltips = G(b)), a.tooltips.length !== a.handles))
          throw new Error(
            "noUiSlider (14.1.1): must pass a formatter for all handles."
          );
        a.tooltips.forEach(function (a) {
          if (
            "boolean" != typeof a &&
            ("object" != _typeof(a) || "function" != typeof a.to)
          )
            throw new Error(
              "noUiSlider (14.1.1): 'tooltips' must be passed a formatter or 'false'."
            );
        });
      }
  }

  function P(a, b) {
    l((a.ariaFormat = b));
  }

  function R(a, b) {
    l((a.format = b));
  }

  function k(a, b) {
    if ("boolean" != typeof (a.keyboardSupport = b))
      throw new Error(
        "noUiSlider (14.1.1): 'keyboardSupport' option must be a boolean."
      );
  }

  function A(a, b) {
    a.documentElement = b;
  }

  function M(a, b) {
    if ("string" != typeof b && !1 !== b)
      throw new Error(
        "noUiSlider (14.1.1): 'cssPrefix' must be a string or `false`."
      );
    a.cssPrefix = b;
  }

  function O(a, b) {
    if ("object" != _typeof(b))
      throw new Error("noUiSlider (14.1.1): 'cssClasses' must be an object.");
    if ("string" == typeof a.cssPrefix)
      for (var c in ((a.cssClasses = {}), b))
        b.hasOwnProperty(c) && (a.cssClasses[c] = a.cssPrefix + b[c]);
    else a.cssClasses = b;
  }

  function L(c) {
    var e = {
        margin: 0,
        limit: 0,
        padding: 0,
        animate: !0,
        animationDuration: 300,
        ariaFormat: W,
        format: W,
      },
      f = {
        step: {
          r: !1,
          t: d,
        },
        start: {
          r: !0,
          t: m,
        },
        connect: {
          r: !0,
          t: K,
        },
        direction: {
          r: !0,
          t: C,
        },
        snap: {
          r: !1,
          t: g,
        },
        animate: {
          r: !1,
          t: v,
        },
        animationDuration: {
          r: !1,
          t: b,
        },
        range: {
          r: !0,
          t: h,
        },
        orientation: {
          r: !1,
          t: x,
        },
        margin: {
          r: !1,
          t: w,
        },
        limit: {
          r: !1,
          t: y,
        },
        padding: {
          r: !1,
          t: E,
        },
        behaviour: {
          r: !0,
          t: N,
        },
        ariaFormat: {
          r: !1,
          t: P,
        },
        format: {
          r: !1,
          t: R,
        },
        tooltips: {
          r: !1,
          t: Q,
        },
        keyboardSupport: {
          r: !0,
          t: k,
        },
        documentElement: {
          r: !1,
          t: A,
        },
        cssPrefix: {
          r: !0,
          t: M,
        },
        cssClasses: {
          r: !0,
          t: O,
        },
      },
      j = {
        connect: !1,
        direction: "ltr",
        behaviour: "tap",
        orientation: "horizontal",
        keyboardSupport: !0,
        cssPrefix: "noUi-",
        cssClasses: {
          target: "target",
          base: "base",
          origin: "origin",
          handle: "handle",
          handleLower: "handle-lower",
          handleUpper: "handle-upper",
          touchArea: "touch-area",
          horizontal: "horizontal",
          vertical: "vertical",
          background: "background",
          connect: "connect",
          connects: "connects",
          ltr: "ltr",
          rtl: "rtl",
          textDirectionLtr: "txt-dir-ltr",
          textDirectionRtl: "txt-dir-rtl",
          draggable: "draggable",
          drag: "state-drag",
          tap: "state-tap",
          active: "active",
          tooltip: "tooltip",
          pips: "pips",
          pipsHorizontal: "pips-horizontal",
          pipsVertical: "pips-vertical",
          marker: "marker",
          markerHorizontal: "marker-horizontal",
          markerVertical: "marker-vertical",
          markerNormal: "marker-normal",
          markerLarge: "marker-large",
          markerSub: "marker-sub",
          value: "value",
          valueHorizontal: "value-horizontal",
          valueVertical: "value-vertical",
          valueNormal: "value-normal",
          valueLarge: "value-large",
          valueSub: "value-sub",
        },
      };
    c.format && !c.ariaFormat && (c.ariaFormat = c.format),
      Object.keys(f).forEach(function (a) {
        if (!q(c[a]) && void 0 === j[a]) {
          if (f[a].r)
            throw new Error("noUiSlider (14.1.1): '" + a + "' is required.");
          return !0;
        }
        f[a].t(e, q(c[a]) ? c[a] : j[a]);
      }),
      (e.pips = c.pips);
    var i = document.createElement("div"),
      l = void 0 !== i.style.msTransform,
      n = void 0 !== i.style.transform;
    return (
      (e.transformRule = n
        ? "transform"
        : l
        ? "msTransform"
        : "webkitTransform"),
      (e.style = [
        ["left", "top"],
        ["right", "bottom"],
      ][e.dir][e.ort]),
      e
    );
  }

  function n(N, P, v) {
    function V(a, b) {
      var c = x.createElement("div");
      return b && aa(c, b), a.appendChild(c), c;
    }

    function o(a, c) {
      var d = V(a, P.cssClasses.origin),
        e = V(d, P.cssClasses.handle);
      return (
        V(e, P.cssClasses.touchArea),
        e.setAttribute("data-handle", c),
        P.keyboardSupport &&
          (e.setAttribute("tabindex", "0"),
          e.addEventListener("keydown", function (a) {
            return (function (j, k) {
              if (M() || O(k)) return !1;
              var e = ["Left", "Right"],
                q = ["Down", "Up"],
                n = ["PageDown", "PageUp"],
                i = ["Home", "End"];
              P.dir && !P.ort
                ? e.reverse()
                : P.ort && !P.dir && (q.reverse(), n.reverse());
              var o,
                r = j.key.replace("Arrow", ""),
                s = r === n[0],
                l = r === n[1],
                t = r === q[0] || r === e[0] || s,
                c = r === q[1] || r === e[1] || l,
                p = r === i[0],
                f = r === i[1];
              if (!(t || c || p || f)) return !0;
              if ((j.preventDefault(), c || t)) {
                var d = t ? 0 : 1,
                  h = oa(k),
                  m = h[d];
                if (null === m) return !1;
                !1 === m && (m = ya.getDefaultStep(b[k], t, 10)),
                  (l || s) && (m *= 5),
                  (m = U(m, 1e-7)),
                  (m *= t ? -1 : 1),
                  (o = za[k] + m);
              } else o = f ? P.spectrum.xVal[P.spectrum.xVal.length - 1] : P.spectrum.xVal[0];
              return (
                ja(k, ya.toStepping(o), !0, !0),
                ha("slide", k),
                ha("update", k),
                ha("change", k),
                ha("set", k),
                !1
              );
            })(a, c);
          })),
        e.setAttribute("role", "slider"),
        e.setAttribute("aria-orientation", P.ort ? "vertical" : "horizontal"),
        0 === c
          ? aa(e, P.cssClasses.handleLower)
          : c == P.handles - 1 && aa(e, P.cssClasses.handleUpper),
        d
      );
    }

    function A(a, b) {
      return !!b && V(a, P.cssClasses.connect);
    }

    function t(a, b) {
      return !!P.tooltips[b] && V(a.firstChild, P.cssClasses.tooltip);
    }

    function M() {
      return d.hasAttribute("disabled");
    }

    function O(a) {
      return qa[a].hasAttribute("disabled");
    }

    function ba() {
      ta &&
        ($("update.tooltips"),
        ta.forEach(function (a) {
          a && j(a);
        }),
        (ta = null));
    }

    function z() {
      ba(),
        (ta = qa.map(t)),
        W("update.tooltips", function (a, b, c) {
          if (ta[b]) {
            var d = a[b];
            !0 !== P.tooltips[b] && (d = P.tooltips[b].to(c[b])),
              (ta[b].innerHTML = d);
          }
        });
    }

    function ca(b, d, f) {
      function g(b, c) {
        var d = c === P.cssClasses.value,
          e = d ? a : i;
        return c + " " + (d ? j : k)[P.ort] + " " + e[b];
      }
      var h = x.createElement("div"),
        a = [];
      (a[0] = P.cssClasses.valueNormal),
        (a[1] = P.cssClasses.valueLarge),
        (a[2] = P.cssClasses.valueSub);
      var i = [];
      (i[0] = P.cssClasses.markerNormal),
        (i[1] = P.cssClasses.markerLarge),
        (i[2] = P.cssClasses.markerSub);
      var j = [P.cssClasses.valueHorizontal, P.cssClasses.valueVertical],
        k = [P.cssClasses.markerHorizontal, P.cssClasses.markerVertical];
      return (
        aa(h, P.cssClasses.pips),
        aa(
          h,
          0 === P.ort ? P.cssClasses.pipsHorizontal : P.cssClasses.pipsVertical
        ),
        Object.keys(b).forEach(function (a) {
          !(function (a, b, c) {
            if ((c = d ? d(b, c) : c) !== -1) {
              var e = V(h, !1);
              (e.className = g(c, P.cssClasses.marker)),
                (e.style[P.style] = a + "%"),
                0 < c &&
                  (((e = V(h, !1)).className = g(c, P.cssClasses.value)),
                  e.setAttribute("data-value", b),
                  (e.style[P.style] = a + "%"),
                  (e.innerHTML = f.to(b)));
            }
          })(a, b[a][0], b[a][1]);
        }),
        h
      );
    }

    function da() {
      sa && (j(sa), (sa = null));
    }

    function ea(c) {
      da();
      var f,
        j,
        k,
        q,
        h,
        p,
        t,
        y,
        z,
        u = c.mode,
        n = c.density || 1,
        i = c.filter || !1,
        o = (function (a, b, c) {
          if ("range" === a || "steps" === a) return ya.xVal;
          if ("count" === a) {
            if (2 > b)
              throw new Error(
                "noUiSlider (14.1.1): 'values' (>= 2) required for mode 'count'."
              );
            var d = b - 1,
              f = 100 / d;
            for (b = []; d--; ) b[d] = d * f;
            b.push(100), (a = "positions");
          }
          return "positions" === a
            ? b.map(function (a) {
                return ya.fromStepping(c ? ya.getStep(a) : a);
              })
            : "values" === a
            ? c
              ? b.map(function (a) {
                  return ya.fromStepping(ya.getStep(ya.toStepping(a)));
                })
              : b
            : void 0;
        })(u, c.values || !1, c.stepped || !1),
        a =
          ((f = n),
          (j = u),
          (k = o),
          (q = {}),
          (h = ya.xVal[0]),
          (p = ya.xVal[ya.xVal.length - 1]),
          (y = t = !1),
          (z = 0),
          (k = k
            .slice()
            .sort(function (a, b) {
              return a - b;
            })
            .filter(function (a) {
              return !this[a] && (this[a] = !0);
            }, {}))[0] !== h && (k.unshift(h), (t = !0)),
          k[k.length - 1] !== p && (k.push(p), (y = !0)),
          k.forEach(function (b, g) {
            var e,
              m,
              v,
              w,
              x,
              A,
              B,
              C,
              E,
              F,
              G = b,
              H = k[g + 1],
              d = "steps" === j;
            if (
              (d && (e = ya.xNumSteps[g]),
              e || (e = H - G),
              !1 !== G && void 0 !== H)
            )
              for (e = U(e, 1e-7), m = G; m <= H; m = (m + e).toFixed(7) / 1) {
                for (
                  C = (x = (w = ya.toStepping(m)) - z) / f,
                    F = x / (E = D(C)),
                    v = 1;
                  v <= E;
                  v += 1
                )
                  q[(A = z + v * F).toFixed(5)] = [ya.fromStepping(A), 0];
                (B = -1 < k.indexOf(m) ? 1 : d ? 2 : 0),
                  !g && t && (B = 0),
                  (m === H && y) || (q[w.toFixed(5)] = [m, B]),
                  (z = w);
              }
          }),
          q),
        s = c.format || {
          to: D,
        };
      return (sa = d.appendChild(ca(a, i, s)));
    }

    function R() {
      var a = pa.getBoundingClientRect(),
        b = "offset" + ["Width", "Height"][P.ort];
      return 0 === P.ort ? a.width || pa[b] : a.height || pa[b];
    }

    function fa(b, c, g, h) {
      var a = function (a) {
          return (
            !!(a = (function (b, d, f) {
              var g,
                h,
                j = 0 === b.type.indexOf("touch"),
                k = 0 === b.type.indexOf("mouse"),
                a = 0 === b.type.indexOf("pointer");
              if ((0 === b.type.indexOf("MSPointer") && (a = !0), j)) {
                var m = function (a) {
                  return a.target === f || f.contains(a.target);
                };
                if ("touchstart" === b.type) {
                  var l = Array.prototype.filter.call(b.touches, m);
                  if (1 < l.length) return !1;
                  (g = l[0].pageX), (h = l[0].pageY);
                } else {
                  var o = Array.prototype.find.call(b.changedTouches, m);
                  if (!o) return !1;
                  (g = o.pageX), (h = o.pageY);
                }
              }
              return (
                (d = d || I(x)),
                (k || a) && ((g = b.clientX + d.x), (h = b.clientY + d.y)),
                ((b.pageOffset = d),
                (b.points = [g, h]),
                (b.cursor = k || a),
                b)
              );
            })(a, h.pageOffset, h.target || c)) &&
            (!M() || h.doNotReject) &&
            ((i = d),
            (j = P.cssClasses.tap),
            ((i.classList
              ? !i.classList.contains(j)
              : !new RegExp("\\b" + j + "\\b").test(i.className)) ||
              h.doNotReject) &&
              !(b === xa.start && void 0 !== a.buttons && 1 < a.buttons) &&
              (!h.hover || !a.buttons) &&
              (f || a.preventDefault(),
              (a.calcPoint = a.points[P.ort]),
              void g(a, h)))
          );
          var i, j;
        },
        e = [];
      return (
        b.split(" ").forEach(function (b) {
          c.addEventListener(
            b,
            a,
            !!f && {
              passive: !0,
            }
          ),
            e.push([b, a]);
        }),
        e
      );
    }

    function ga(b) {
      var c,
        d,
        f,
        g,
        h,
        j,
        k =
          (100 *
            (b -
              ((c = pa),
              (d = P.ort),
              (f = c.getBoundingClientRect()),
              (g = c.ownerDocument),
              (h = g.documentElement),
              (j = I(g)),
              /webkit.*Chrome.*Mobile/i.test(navigator.userAgent) && (j.x = 0),
              d ? f.top + j.y - h.clientTop : f.left + j.x - h.clientLeft))) /
          R();
      return (k = F(k)), P.dir ? 100 - k : k;
    }

    function q(a, b) {
      "mouseout" === a.type &&
        "HTML" === a.target.nodeName &&
        null === a.relatedTarget &&
        Y(a, b);
    }

    function X(a, b) {
      if (
        -1 === navigator.appVersion.indexOf("MSIE 9") &&
        0 === a.buttons &&
        0 !== b.buttonsProperty
      )
        return Y(a, b);
      var c = (P.dir ? -1 : 1) * (a.calcPoint - b.startCalcPoint);
      Q(0 < c, (100 * c) / b.baseSize, b.locations, b.handleNumbers);
    }

    function Y(a, b) {
      b.handle && (H(b.handle, P.cssClasses.active), (m -= 1)),
        b.listeners.forEach(function (a) {
          w.removeEventListener(a[0], a[1]);
        }),
        0 === m &&
          (H(d, P.cssClasses.drag),
          ia(),
          a.cursor &&
            ((E.style.cursor = ""), E.removeEventListener("selectstart", s))),
        b.handleNumbers.forEach(function (a) {
          ha("change", a), ha("set", a), ha("end", a);
        });
    }

    function _(c, f) {
      if (f.handleNumbers.some(O)) return !1;
      var e;
      1 === f.handleNumbers.length &&
        ((e = qa[f.handleNumbers[0]].children[0]),
        (m += 1),
        aa(e, P.cssClasses.active)),
        c.stopPropagation();
      var g = [],
        h = fa(xa.move, w, X, {
          target: c.target,
          handle: e,
          listeners: g,
          startCalcPoint: c.calcPoint,
          baseSize: R(),
          pageOffset: c.pageOffset,
          handleNumbers: f.handleNumbers,
          buttonsProperty: c.buttons,
          locations: b.slice(),
        }),
        i = fa(xa.end, w, Y, {
          target: c.target,
          handle: e,
          listeners: g,
          doNotReject: !0,
          handleNumbers: f.handleNumbers,
        }),
        j = fa("mouseout", w, q, {
          target: c.target,
          handle: e,
          listeners: g,
          doNotReject: !0,
          handleNumbers: f.handleNumbers,
        });
      g.push.apply(g, h.concat(i, j)),
        c.cursor &&
          ((E.style.cursor = getComputedStyle(c.target).cursor),
          1 < qa.length && aa(d, P.cssClasses.drag),
          E.addEventListener("selectstart", s, !1)),
        f.handleNumbers.forEach(function (a) {
          ha("start", a);
        });
    }

    function r(c) {
      c.stopPropagation();
      var f,
        g,
        h,
        j = ga(c.calcPoint),
        e =
          ((f = j),
          (h = !(g = 100)),
          qa.forEach(function (a, c) {
            if (!O(c)) {
              var d = b[c],
                e = T(d - f);
              (e < g || (e <= g && d < f) || (100 === e && 100 === g)) &&
                ((h = c), (g = e));
            }
          }),
          h);
      return (
        !1 !== e &&
        void (P.events.snap || B(d, P.cssClasses.tap, P.animationDuration),
        ja(e, j, !0, !0),
        ia(),
        ha("slide", e, !0),
        ha("update", e, !0),
        ha("change", e, !0),
        ha("set", e, !0),
        P.events.snap &&
          _(c, {
            handleNumbers: [e],
          }))
      );
    }

    function n(a) {
      var b = ga(a.calcPoint),
        c = ya.getStep(b),
        d = ya.fromStepping(c);
      Object.keys(Aa).forEach(function (a) {
        "hover" === a.split(".")[0] &&
          Aa[a].forEach(function (a) {
            a.call(ua, d);
          });
      });
    }

    function W(a, b) {
      (Aa[a] = Aa[a] || []),
        Aa[a].push(b),
        "update" === a.split(".")[0] &&
          qa.forEach(function (a, b) {
            ha("update", b);
          });
    }

    function $(a) {
      var b = a && a.split(".")[0],
        c = b && a.substring(b.length);
      Object.keys(Aa).forEach(function (a) {
        var d = a.split(".")[0],
          e = a.substring(d.length);
        (b && b !== d) || (c && c !== e) || delete Aa[a];
      });
    }

    function ha(a, c, d) {
      Object.keys(Aa).forEach(function (f) {
        var g = f.split(".")[0];
        a === g &&
          Aa[f].forEach(function (a) {
            a.call(ua, za.map(P.format.to), c, za.slice(), d || !1, b.slice());
          });
      });
    }

    function J(a, b, c, d, e, f) {
      return (
        1 < qa.length &&
          !P.events.unconstrained &&
          (d && 0 < b && (c = U(c, a[b - 1] + P.margin)),
          e && b < qa.length - 1 && (c = S(c, a[b + 1] - P.margin))),
        1 < qa.length &&
          P.limit &&
          (d && 0 < b && (c = S(c, a[b - 1] + P.limit)),
          e && b < qa.length - 1 && (c = U(c, a[b + 1] - P.limit))),
        P.padding &&
          (0 === b && (c = U(c, P.padding[0])),
          b === qa.length - 1 && (c = S(c, 100 - P.padding[1]))),
        ((c = F((c = ya.getStep(c)))) !== a[b] || f) && c
      );
    }

    function K(a, b) {
      var c = P.ort;
      return (c ? b : a) + ", " + (c ? a : b);
    }

    function Q(b, c, d, f) {
      var g = d.slice(),
        h = [!b, b],
        i = [b, !b];
      (f = f.slice()),
        b && f.reverse(),
        1 < f.length
          ? f.forEach(function (a, b) {
              var d = J(g, a, g[a] + c, h[b], i[b], !1);
              !1 === d ? (c = 0) : ((c = d - g[a]), (g[a] = d));
            })
          : (h = i = [!0]);
      var j = !1;
      f.forEach(function (a, b) {
        j = ja(a, d[a] + c, h[b], i[b]) || j;
      }),
        j &&
          f.forEach(function (a) {
            ha("update", a), ha("slide", a);
          });
    }

    function Z(a, b) {
      return P.dir ? 100 - a - b : a;
    }

    function ia() {
      h.forEach(function (a) {
        var c = 50 < b[a] ? -1 : 1,
          d = 3 + (qa.length + c * a);
        qa[a].style.zIndex = d;
      });
    }

    function ja(a, c, d, f) {
      return (
        !1 !== (c = J(b, a, c, d, f, !1)) &&
        ((function (a, c) {
          (b[a] = c), (za[a] = ya.fromStepping(c));
          var d = "translate(" + K(10 * (Z(c, 0) - C) + "%", "0") + ")";
          (qa[a].style[P.transformRule] = d), ka(a), ka(a + 1);
        })(a, c),
        !0)
      );
    }

    function ka(a) {
      if (ra[a]) {
        var c = 0,
          d = 100;
        0 !== a && (c = b[a - 1]), a !== ra.length - 1 && (d = b[a]);
        var f = d - c,
          g = "translate(" + K(Z(c, f) + "%", "0") + ")",
          h = "scale(" + K(f / 100, "1") + ")";
        ra[a].style[P.transformRule] = g + " " + h;
      }
    }

    function la(a, c) {
      return null === a || !1 === a || void 0 === a
        ? b[c]
        : ("number" == typeof a && (a = a + ""),
          (a = P.format.from(a)),
          !1 === (a = ya.toStepping(a)) || isNaN(a) ? b[c] : a);
    }

    function ma(a, c) {
      var f = G(a),
        g = void 0 === b[0];
      (c = void 0 === c || !!c),
        P.animate && !g && B(d, P.cssClasses.tap, P.animationDuration),
        h.forEach(function (a) {
          ja(a, la(f[a], a), !0, !1);
        });
      for (var j = 1 === h.length ? 0 : 1; j < h.length; ++j)
        h.forEach(function (a) {
          ja(a, b[a], !0, !0);
        });
      ia(),
        h.forEach(function (a) {
          ha("update", a), null !== f[a] && c && ha("set", a);
        });
    }

    function na() {
      var a = za.map(P.format.to);
      return 1 === a.length ? a[0] : a;
    }

    function oa(c) {
      var d = b[c],
        e = ya.getNearbySteps(d),
        f = za[c],
        g = e.thisStep.step,
        h = null;
      if (P.snap)
        return [
          f - e.stepBefore.startValue || null,
          e.stepAfter.startValue - f || null,
        ];
      !1 !== g &&
        f + g > e.stepAfter.startValue &&
        (g = e.stepAfter.startValue - f),
        (h =
          f > e.thisStep.startValue
            ? e.thisStep.step
            : !1 !== e.stepBefore.step && f - e.stepBefore.highestStep),
        100 === d ? (g = null) : 0 === d && (h = null);
      var j = ya.countStepDecimals();
      return (
        null !== g && !1 !== g && (g = +g.toFixed(j)),
        null !== h && !1 !== h && (h = +h.toFixed(j)),
        [h, g]
      );
    }
    var pa,
      qa,
      ra,
      sa,
      ta,
      ua,
      va,
      wa,
      xa = window.navigator.pointerEnabled
        ? {
            start: "pointerdown",
            move: "pointermove",
            end: "pointerup",
          }
        : window.navigator.msPointerEnabled
        ? {
            start: "MSPointerDown",
            move: "MSPointerMove",
            end: "MSPointerUp",
          }
        : {
            start: "mousedown touchstart",
            move: "mousemove touchmove",
            end: "mouseup touchend",
          },
      f =
        window.CSS &&
        CSS.supports &&
        CSS.supports("touch-action", "none") &&
        (function () {
          var a = !1;
          try {
            var b = Object.defineProperty({}, "passive", {
              get: function get() {
                a = !0;
              },
            });
            window.addEventListener("test", null, b);
          } catch (a) {}
          return a;
        })(),
      d = N,
      ya = P.spectrum,
      za = [],
      b = [],
      h = [],
      m = 0,
      Aa = {},
      x = N.ownerDocument,
      w = P.documentElement || x.documentElement,
      E = x.body,
      C = "rtl" === x.dir || 1 === P.ort ? 0 : 100;
    return (
      aa((va = d), P.cssClasses.target),
      0 === P.dir ? aa(va, P.cssClasses.ltr) : aa(va, P.cssClasses.rtl),
      0 === P.ort
        ? aa(va, P.cssClasses.horizontal)
        : aa(va, P.cssClasses.vertical),
      aa(
        va,
        "rtl" === getComputedStyle(va).direction
          ? P.cssClasses.textDirectionRtl
          : P.cssClasses.textDirectionLtr
      ),
      (pa = V(va, P.cssClasses.base)),
      (function (a, b) {
        var c = V(b, P.cssClasses.connects);
        (qa = []), (ra = []).push(A(c, a[0]));
        for (var d = 0; d < P.handles; d++)
          qa.push(o(b, d)), (h[d] = d), ra.push(A(c, a[d + 1]));
      })(P.connect, pa),
      (wa = P.events).fixed ||
        qa.forEach(function (a, b) {
          fa(xa.start, a.children[0], _, {
            handleNumbers: [b],
          });
        }),
      wa.tap && fa(xa.start, pa, r, {}),
      wa.hover &&
        fa(xa.move, pa, n, {
          hover: !0,
        }),
      wa.drag &&
        ra.forEach(function (a, b) {
          if (!1 !== a && 0 !== b && b !== ra.length - 1) {
            var c = qa[b - 1],
              d = qa[b],
              e = [a];
            aa(a, P.cssClasses.draggable),
              wa.fixed && (e.push(c.children[0]), e.push(d.children[0])),
              e.forEach(function (a) {
                fa(xa.start, a, _, {
                  handles: [c, d],
                  handleNumbers: [b - 1, b],
                });
              });
          }
        }),
      ma(P.start),
      P.pips && ea(P.pips),
      P.tooltips && z(),
      W("update", function (c, d, f, a, g) {
        h.forEach(function (a) {
          var c = qa[a],
            d = J(b, a, 0, !0, !0, !0),
            e = J(b, a, 100, !0, !0, !0),
            h = g[a],
            j = P.ariaFormat.to(f[a]);
          (d = ya.fromStepping(d).toFixed(1)),
            (e = ya.fromStepping(e).toFixed(1)),
            (h = ya.fromStepping(h).toFixed(1)),
            c.children[0].setAttribute("aria-valuemin", d),
            c.children[0].setAttribute("aria-valuemax", e),
            c.children[0].setAttribute("aria-valuenow", h),
            c.children[0].setAttribute("aria-valuetext", j);
        });
      }),
      (ua = {
        destroy: function destroy() {
          for (var a in P.cssClasses)
            P.cssClasses.hasOwnProperty(a) && H(d, P.cssClasses[a]);
          for (; d.firstChild; ) d.removeChild(d.firstChild);
          delete d.noUiSlider;
        },
        steps: function steps() {
          return h.map(oa);
        },
        on: W,
        off: $,
        get: na,
        set: ma,
        setHandle: function setHandle(a, b, c) {
          if (!(0 <= (a = +a) && a < h.length))
            throw new Error(
              "noUiSlider (14.1.1): invalid handle number, got: " + a
            );
          ja(a, la(b, a), !0, !0), ha("update", a), c && ha("set", a);
        },
        reset: function reset(a) {
          ma(P.start, a);
        },
        __moveHandles: function __moveHandles(a, c, d) {
          Q(a, c, b, d);
        },
        options: v,
        updateOptions: function updateOptions(a, c) {
          var d = na(),
            e = [
              "margin",
              "limit",
              "padding",
              "range",
              "animate",
              "snap",
              "step",
              "format",
              "pips",
              "tooltips",
            ];
          e.forEach(function (b) {
            void 0 !== a[b] && (v[b] = a[b]);
          });
          var f = L(v);
          e.forEach(function (b) {
            void 0 !== a[b] && (P[b] = f[b]);
          }),
            (ya = f.spectrum),
            (P.margin = f.margin),
            (P.limit = f.limit),
            (P.padding = f.padding),
            P.pips ? ea(P.pips) : da(),
            P.tooltips ? z() : ba(),
            (b = []),
            ma(a.start || d, c);
        },
        target: d,
        removePips: da,
        removeTooltips: ba,
        pips: ea,
      })
    );
  }
  var D = Math.round,
    T = Math.abs,
    U = Math.max,
    S = Math.min,
    V = "14.1.1";
  (a.prototype.getMargin = function (a) {
    var b = this.xNumSteps[0];
    if (b && 0 != (a / b) % 1)
      throw new Error(
        "noUiSlider (" +
          V +
          "): 'limit', 'margin' and 'padding' must be divisible by step."
      );
    return 2 === this.xPct.length && c(this.xVal, a);
  }),
    (a.prototype.toStepping = function (a) {
      return (a = e(this.xVal, this.xPct, a));
    }),
    (a.prototype.fromStepping = function (a) {
      return (function (b, c, d) {
        if (100 <= d) return b.slice(-1)[0];
        var e,
          f = p(d, c),
          g = b[f - 1],
          h = b[f],
          a = c[f - 1],
          i = c[f];
        return (e = [g, h]), ((d - a) * J(a, i) * (e[1] - e[0])) / 100 + e[0];
      })(this.xVal, this.xPct, a);
    }),
    (a.prototype.getStep = function (a) {
      return (a = f(this.xPct, this.xSteps, this.snap, a));
    }),
    (a.prototype.getDefaultStep = function (a, b, c) {
      var d = p(a, this.xPct);
      return (
        (100 === a || (b && a === this.xPct[d - 1])) && (d = U(d - 1, 1)),
        (this.xVal[d] - this.xVal[d - 1]) / c
      );
    }),
    (a.prototype.getNearbySteps = function (a) {
      var b = p(a, this.xPct);
      return {
        stepBefore: {
          startValue: this.xVal[b - 2],
          step: this.xNumSteps[b - 2],
          highestStep: this.xHighestCompleteStep[b - 2],
        },
        thisStep: {
          startValue: this.xVal[b - 1],
          step: this.xNumSteps[b - 1],
          highestStep: this.xHighestCompleteStep[b - 1],
        },
        stepAfter: {
          startValue: this.xVal[b],
          step: this.xNumSteps[b],
          highestStep: this.xHighestCompleteStep[b],
        },
      };
    }),
    (a.prototype.countStepDecimals = function () {
      var a = this.xNumSteps.map(i);
      return U.apply(null, a);
    }),
    (a.prototype.convert = function (a) {
      return this.getStep(this.toStepping(a));
    });
  var W = {
    to: function to(a) {
      return void 0 !== a && a.toFixed(2);
    },
    from: Number,
  };
  return {
    __spectrum: a,
    version: V,
    create: function create(a, b) {
      if (!a || !a.nodeName)
        throw new Error(
          "noUiSlider (" + V + "): create requires a single element, got: " + a
        );
      if (a.noUiSlider)
        throw new Error(
          "noUiSlider (" + V + "): Slider was already initialized."
        );
      var c = n(a, L(b), b);
      return (a.noUiSlider = c);
    },
  };
});
$(function () {
  function a() {
    return i && (n = i.value), j && (n = j.value), n;
  }
  $(".js-radio-buttons label, .js-radio-buttons .bttn").on(
    "click touch",
    function () {
      $(this)
        .parents(".js-radio-buttons")
        .find("label, .bttn")
        .removeClass("active"),
        $(this)
          .parents(".js-radio-buttons")
          .find('input[type="radio"]')
          .attr("checked", !1),
        $(this).addClass("active"),
        $(this)
          .find('input[type="radio"]')
          .attr("checked", !0)
          .trigger("change");
    }
  ),
    $('.js-radio-buttons input[type="radio"]').change(function () {
      $(this)
        .parents(".js-radio-buttons")
        .find("label, .bttn")
        .removeClass("active"),
        $(this).parents("label").addClass("active"),
        $(this).attr("checked", !0).trigger("click");
    }),
    $('.js-radio-buttons input[type="radio"]').click(function (a) {
      a.stopPropagation();
    }),
    $(".js-choose-date").click(function () {
      return (
        Cookies.set("inquiry_window_clicked_select_dates", 1),
        $("#inquiry_modal").modal("hide"),
        $("html, body")
          .stop()
          .animate(
            {
              scrollTop: $($(".listing_query_arrival_date")).offset().top - 50,
            },
            300,
            function () {
              $(".listing_query_arrival_date").addClass("animate-highlight");
            }
          ),
        gae("inquiry_modal", "select_date_button"),
        !1
      );
    }),
    $("#inquiry_modal").on("shown", function () {
      $(".listing_query_arrival_date").removeClass("animate-highlight");
    }),
    $(".js-datepicker-start-today").length &&
      $(".js-datepicker-start-today").datepicker("setDate", new Date());
  var b = document.querySelector(".js-show-on-default-date .js-radio-buttons"),
    c = document.querySelector("#arrival2"),
    e = document.querySelector('label[for="arrival2"]'),
    f = document.querySelector('label[for="arrival1"]'),
    g = document.querySelector("#inquiry-query-submit");
  b &&
    g.addEventListener("click", function () {
      (c.checked = "true"),
        e.classList.add("active"),
        f.classList.remove("active");
    });
  var h = document.querySelector(".js-show-on-default-date"),
    i = document.querySelector("#listing_query_arrival_date"),
    j = document.querySelector("#arrival_date_select option[selected]"),
    k = document.querySelector(".js-show-if-not-today"),
    l = document.querySelector(".js-hide-if-not-today"),
    m = document.querySelector(".js-hide-link-if-not-today"),
    n = "",
    o = new Date(),
    d = "" + (o.getMonth() + 1),
    p = "" + o.getDate(),
    q = o.getFullYear();
  2 > d.length && (d = "0" + d), 2 > p.length && (p = "0" + p);
  var r = [q, d, p].join("-");
  g &&
    g.addEventListener("click", function () {
      a(),
        h &&
          (n > r
            ? ((k.style.display = "block"),
              (l.style.display = "none"),
              (m.style.display = "none"))
            : ((k.style.display = "none"),
              (l.style.display = "flex"),
              (m.style.display = "block")));
    });
});
$(function () {
  function a(a) {
    $(".js-nps-container").hide(),
      $(".js-nps-question").fadeIn(),
      $(".js-nps-question").attr("id", "js-nps-post-booking-tracker"),
      7 > a
        ? $(".js-nps-question-bad").show()
        : 9 > a
        ? $(".js-nps-question-neutral").show()
        : ($(".js-nps-question-good").show(),
          document.querySelector(".js-post-booking-share") &&
            $(".js-post-booking-share").show(),
          document.querySelector(".js-post-stay-share") &&
            $(".js-post-stay-share").show());
  }

  function b() {
    $(".js-nps-question").hide(),
      $(".js-nps-confirmation").fadeIn(),
      setTimeout(function () {
        $(".nps-confirmation").fadeOut();
      }, 3e3),
      $(".js-nps-confirmation").hasClass("new") &&
        (9 > c
          ? ($(".confirmation-subheading-bad").show(),
            setTimeout(function () {
              $(".js-nps-confirmation").fadeOut();
            }, 3e3))
          : ($(".confirmation-subheading").show(),
            $(".confirmation-subtext").show(),
            $(".confirmation-send").removeClass("hide")));
  }
  var c = 0;
  $(".nps-confirmation").hide(),
    $(".js-nps-value").on("click", function () {
      var b = $(this).data("value");
      c = b;
      var d = $(".js-nps-container").data("is-confirmation"),
        e = d ? "/customer/confirmation/nps" : "/review/nps",
        f = d ? getUrlParameter("token") : $(".js-nps-container").data("token");
      $.ajax({
        type: "POST",
        url: e,
        data: '{"score":' + b + ', "token" : "' + f + '"}',
        contentType: "application/json",
      }).done(function () {
        a(b),
          dataLayer.push({
            nps: {
              score: b,
            },
          });
      });
    }),
    $(".js-nps-reply-send").on("click", function () {
      var a = $(".js-nps-reply-text").val(),
        c = $(".js-nps-container").data("is-confirmation"),
        d = c
          ? "/customer/confirmation/submit_nps_text"
          : "/review/submit_nps_text",
        e = c ? getUrlParameter("token") : $(".js-nps-container").data("token");
      return (
        $.ajax({
          type: "POST",
          url: d,
          data: JSON.stringify({
            token: e,
            text: a,
          }),
          contentType: "application/json",
        }).done(function () {
          b();
        }),
        !1
      );
    });
});
$(function () {
  var a = getQueryStringParameterByName(window.location.href, "package_id");
  null !== a &&
    (function (a) {
      var b = document.querySelector('input[package="'.concat(a, '"]'));
      null !== b && (b.checked = !0);
    })(a);
  var b = $(
      ".pck-selected-style .package-option input[type=radio].package-selection-item"
    ),
    c = $(
      ".dates-selected-style .listing_query_arrival_date input[type=radio].radio_buttons"
    );
  $(
    ".pck-selected-style .package-option input[type=radio].package-selection-item:checked"
  )
    .parents("label.radio")
    .addClass("selected"),
    $(
      ".dates-selected-style .listing_query_arrival_date input[type=radio].radio_buttons:checked"
    )
      .parents("label.radio")
      .addClass("selected"),
    b.change(function () {
      "0" == $(this).attr("data-id")
        ? ($("#reservation-query-submit").hide(),
          $(".listing-query-box").removeClass("add-ticker"))
        : $("#reservation-query-submit").show();
      var a = this;
      b.each(function () {
        this !== a && $(this).closest("label").removeClass("selected");
      });
      var c = document.querySelector(".listing-primary-cta-box");
      $(this).closest("label").addClass("selected"),
        $(this).hasClass("instant")
          ? c.classList.add("instant-package-selected")
          : c.classList.remove("instant-package-selected"),
        receipt_update();
    }),
    c.change(function () {
      var a = this;
      c.each(function () {
        this !== a && $(this).closest("label").removeClass("selected");
      }),
        $(this).closest("label").addClass("selected");
    });
  var d = document.querySelector(".has-instant-booking-packages");
  null != d &&
    (function () {
      var a = document.querySelector(".listing-primary-cta-box"),
        b = document.querySelector(".package-selection-item.instant:checked");
      null != b && a.classList.add("instant-package-selected");
    })();
});
$(function () {
  if ($("[data-social-widget]").length) {
    var a = window.location.href;
    -1 < a.indexOf("/inquiry/") &&
      ((a = a.split("/inquiry/")),
      (a =
        a[0] +
        "/?utm_source=cp_share&utm_medium=cp_share&utm_campaign=cp_share"));
    var b = document.title;
    if ($(".sp-image").length) var c = $(".sp-image")[0].src;
    else var c = "";
    var d = [
      {
        u: "https://www.facebook.com/sharer.php?u=" + a,
        n: "Facebook",
        c: "all",
        t: "_blank",
      },
      {
        u: "https://twitter.com/intent/tweet?url=" + a,
        n: "Twitter",
        c: "all",
        t: "_blank",
      },
      {
        u: "http://www.stumbleupon.com/submit?url=" + a + "&title=" + b,
        n: "Stumbleupon",
        c: "desktop",
        t: "_blank",
      },
      {
        u:
          "https://pinterest.com/pin/create/bookmarklet/?media=" +
          c +
          "&url=" +
          a +
          "&description=" +
          b,
        n: "Pinterest",
        c: "desktop",
        t: "_blank",
      },
      {
        u:
          "https://www.linkedin.com/shareArticle?mini=true&url=" +
          a +
          "&title=" +
          b,
        n: "Linkedin",
        c: "desktop",
        t: "_blank",
      },
      {
        u: "whatsapp://send?text=" + a,
        n: "Whatsapp",
        c: "mobile",
        t: "_blank",
      },
      {
        u: "fb-messenger://share?link=" + a,
        n: "Messenger",
        c: "mobile",
        t: "_blank",
      },
      {
        u: "mailto:?subject=" + b + "&body=" + a,
        n: "Mail",
        c: "all",
        t: "_self",
      },
    ];
    $("[data-social-widget]").each(function () {
      var a = "";
      for (i = 0; i < d.length; i++)
        a +=
          '<a href="' +
          encodeURI(d[i].u) +
          '" target="' +
          d[i].t +
          '" data-social-network="' +
          d[i].n.toLowerCase() +
          '" class="socialbutton social' +
          d[i].c +
          " social" +
          d[i].n.toLowerCase() +
          '"></a>';
      $(this).html(
        '<div class="socialwidget social' +
          $(this).attr("data-social-widget") +
          '">' +
          a +
          "</div>"
      ),
        $(this)
          .find(".socialbutton")
          .on("click", function () {
            gae(
              "social_widget",
              $(this).parent().parent().attr("data-social-track") +
                "_" +
                $(this).attr("data-social-network")
            );
          });
    });
  }
});
$(function () {
  return $("body").on("click", ".currency-option", function (a) {
    var b, c, d, e, f;
    return (
      a.preventDefault(),
      (b = $(this).data("currencyCode")),
      (f = $("#currencies-options").data("setCurrencyConvertTo")),
      (c = $("#original-price-wrapper").length
        ? ((e = $("#original-price-wrapper").data("packageId")),
          (d = $("#original-price-wrapper").data("listingId")),
          {
            currency_convert_to: b,
            listing_id: d,
            package_id: e,
          })
        : {
            currency_convert_to: b,
          }),
      $.ajax({
        type: "POST",
        data: c,
        url: f,
      }).done(function () {
        var a = location.href;
        0 <= a.indexOf("currency_convert_to") &&
          (a = removeUrlParameter("currency_convert_to", a)),
          (0 <= location.href.indexOf("price_limit_lower") ||
            0 <= location.href.indexOf("price_limit_upper")) &&
            ((a = removeUrlParameter("price_limit_lower", a)),
            (a = removeUrlParameter("price_limit_upper", a))),
          isSearchresultsPage
            ? ((a = removeUrlParameter("price_min", a)),
              (a = removeUrlParameter("price_max", a)))
            : (0 <= location.href.indexOf("lower") ||
                0 <= location.href.indexOf("higher")) &&
              ((a = removeUrlParameter("lower", a)),
              (a = removeUrlParameter("higher", a))),
          a === location.href ? location.reload(!0) : (location.href = a);
      })
    );
  });
});
$.fn.bindFirst = function (a, b) {
  this.bind(a, b);
  var c = $._data($(this).get(0), "events")[a.split(".")[0]],
    d = c.pop();
  c.splice(0, 0, d);
};
$(function () {
  $("#payment_percentage").on("input", function () {
    parseInt($(this).val() / 100) > $(this).attr("min") / 100 &&
      $(this).val(100 * parseInt($(this).val() / 100)),
      $($(this).data("target2")).text($(this).val() / 100 + "%");
  }),
    $("#x_days_before").on("input click", function () {
      $("input[name=rest_paid_on][value=before_arrival]").click(),
        $(this).focus();
    }),
    $("#refundable_nr_days_before_checkin").on("input click", function () {
      $("input[name=cancellation_policy][value=refundable]").click(),
        $(this).focus();
    }),
    $("#payment_percentage").on("input click", function () {
      $("input[name=deposit_type][value=percentage]").click(),
        $("input[name=deposit_type]").each(function (a, b) {
          $(b)
            .parent()
            .css({
              opacity: $(b).prop("checked") ? 1 : 0.7,
            });
        });
    }),
    $("input[name=deposit_type]").on("change", function () {
      $("input[name=deposit_type]").each(function (a, b) {
        $(b)
          .parent()
          .css({
            opacity: $(b).prop("checked") ? 1 : 0.5,
          });
      });
    });
  var a = $(".js-payment-switch-label"),
    b = function () {
      var b = a.find("input"),
        c = a.find(".js-payment-slider"),
        d = $(".js-enabled-payment-settings-info"),
        e = $(".js-disabled-payment-settings-info"),
        f = b.data("text-0") ? b.data("text-0") : "Disabled",
        g = b.data("text-1") ? b.data("text-1") : "Enabled";
      b.is(":checked")
        ? (c.text(g),
          d.each(function () {
            $(this).removeClass("hide");
          }),
          e.each(function () {
            $(this).addClass("hide");
          }))
        : (c.text(f),
          d.each(function () {
            $(this).addClass("hide");
          }),
          e.each(function () {
            $(this).removeClass("hide");
          }));
    };
  b(),
    a.change(function () {
      b(), gae("dialogsPage", "disable_payment_toggle");
    });
});
$(function () {
  $("#inquiry_modal").on("shown", function () {
    var a = $('input[name="package_id"]:checked')
      .parents(".radio")
      .find(".price")
      .html();
    $(".js-payment-info-price").html(a);
    var b = $(".holder-listing-infos .package-attributes"),
      c = $(".js-inquiry-arrival-date-display"),
      d = $(".js-inquiry-departure-date-display"),
      e = $(".js-inquiry-duration-display");
    481 > $(window).width() &&
      ($("body").attr("data-pos", $(window).scrollTop()),
      $("body,html").addClass("noscroll"));
    var f = $('input[name="package_id"]:checked').val(),
      g = $('input[name="package_id"]:checked')
        .parent()
        .find(".package-attributes")
        .clone(!0, !0);
    if (
      (b.show(),
      $("#inquiry_modal").find(".js-copy-package-here").html("").append(g),
      0 != f)
    ) {
      var h = $('input[name="package_id"]:checked').attr("data-nr-persons");
      1 < h
        ? $("#inquiry_modal")
            .find(".js-copy-package-here")
            .prepend('<i class="ebs-icon ebs-icon-t-group"></i> ')
        : $("#inquiry_modal")
            .find(".js-copy-package-here")
            .prepend('<i class="ebs-icon ebs-icon-t-user"></i> ');
    }
    if (0 < $(".js-sc1-inquiry-modal-dates-container").length) {
      var i = $(".js-sc1-inquiry-modal-arrival").text(),
        j = $(".js-sc1-inquiry-modal-departure").text();
      $("#inquiry_modal").find(".js-insert-arrival-date").text(i),
        $("#inquiry_modal").find(".js-insert-departure-date").text(j),
        c.show(),
        d.show();
    }
    if (0 < $(".js-sc2-inquiry-modal-dates-container").length) {
      var i = $(".js-sc2-inquiry-modal-arrival option:selected").text(),
        j = $(".js-sc2-inquiry-modal-departures div").filter(":visible").text();
      $("#inquiry_modal").find(".js-insert-arrival-date").text(i),
        $("#inquiry_modal").find(".js-insert-departure-date").text(j),
        (i = $(".js-sc2-inquiry-modal-arrival option:selected").val()),
        (j = $(".js-sc2-inquiry-modal-departures div")
          .filter(":visible")
          .attr("data-arrival-date")),
        c.show(),
        d.show();
    }
    if (0 < $(".js-sc3-inquiry-modal-dates-container").length) {
      var k = parseInt($("#duration_in_days").val()) - 1,
        i = new Date($(".listing-availability__input").val()),
        l = {
          day: "numeric",
          month: "short",
          year: "numeric",
        };
      $("#inquiry_modal")
        .find(".js-insert-arrival-date")
        .text(i.toLocaleDateString(selectedLanguage, l)),
        c.show();
      var j = new Date(i);
      j.setDate(j.getDate() + k),
        $("#inquiry_modal")
          .find(".js-insert-departure-date")
          .text(j.toLocaleDateString(selectedLanguage, l)),
        d.show();
    }
    if ("undefined" != typeof listingData && 3 == siteid) {
      var m = document.getElementById("listing_side_list"),
        n = m.querySelector('input[name="package_id"]:checked').closest("li"),
        o = n.querySelector("[data-price]").getAttribute("data-price"),
        p = new Date(i),
        q = new Date(j),
        r = new Date(
          Date.UTC(p.getFullYear(), p.getMonth(), p.getDate(), 0, 0, 0)
        ),
        s = new Date(
          Date.UTC(q.getFullYear(), q.getMonth(), q.getDate(), 0, 0, 0)
        );
      dataLayer.push({
        event: "inquiryOrReservationIntention",
        inquiryData: {
          organizerName: listingData.organizerName,
          listingName: listingData.listingName,
          listingCountry: listingData.listingCountry,
          arrivalDate: r.toISOString(),
          departureDate: s.toISOString(),
          price: parseInt(o),
          currency: listingData.currency,
          isOnlineYTT: listingData.isOnlineYTT,
          inquiryOrReservation: "inquiry",
        },
      });
    }
  }),
    $("#inquiry_modal").on("hidden", function () {
      $("#inquiry_modal")
        .find(".holder-listing-infos .package-attributes")
        .empty(),
        $("#inquiry_modal").find(".payment-info .price").empty(),
        $("#inquiry_modal")
          .find(
            ".js-inquiry-arrival-date-display, .js-inquiry-departure-date-display .js-inquiry-duration-display"
          )
          .hide(),
        $("#inquiry_modal")
          .find(
            ".js-insert-arrival-date, .js-insert-departure-date, .js-insert-duration"
          )
          .empty(),
        $("#inquiry_modal").find(".control-group.error").removeClass("error"),
        $("#inquiry_modal").find(".org-rsp-avg.red").hide(),
        768 < $(window).width() &&
          $("#inquiry_modal").find(".org-rsp-avg.yellow").show(),
        481 > $(window).width() &&
          ($("body,html").removeClass("noscroll"),
          $(window).scrollTop($("body").attr("data-pos")));
    });
  var a = $(".why-wait a");
  $(".js-sidebar-inquiry-button").click(function () {
    setTimeout(function () {
      a.click(function () {
        gae("inquiry_modal", "instant_book_from_inquiry_modal"),
          $("#reservation-query-submit").trigger("click");
      });
    }, 150);
  });
}),
  $(function () {
    $(".js-clean-content")
      .children()
      .each(function () {
        var a = $(this).html();
        "&nbsp;" == a && $(this).remove();
      });
  });
$(function () {
  $(".js-package-modal").click(function () {
    setTimeout(function () {
      $("#inquiry_modal").modal("hide");
      var a = $(".package-selection-item:checked"),
        b = {};
      (b.id = a.attr("data-id")),
        (b.price = $("#listing-query-package-price-" + b.id)
          .html()
          .trim()),
        (b.arrival =
          $("#beauty_arrival_date").val() ||
          $(".js-sc1-inquiry-modal-arrival:first").text()),
        b.arrival || (b.arrival = $("#arrival_date_select").val()),
        (b.duration = $(".listing-query-box__duration").text().trim()),
        (b.isFlexibleDuration = 1 == a.attr("data-is-flexible-duration")),
        (b.title = a.attr("data-title")),
        (b.subtitle = a.attr("data-subtitle")),
        (b.people = {
          icons: a.attr("data-nr-persons-icons"),
          title: a.attr("data-nr-persons-title"),
        }),
        (b.bedding = {
          icons: a.attr("data-bed-config-icons"),
          title: a
            .attr("data-bed-config-title")
            .slice(0, -1)
            .split(",")
            .join(", "),
        });
      var c = !1;
      "" != a.attr("data-room-facilities") &&
        ((c = !0),
        (b.roomFacilitiesTitle = a.attr("data-room-facilities-title")),
        (b.roomFacilities = a
          .attr("data-room-facilities")
          .slice(0, -1)
          .split(",")),
        (b.roomFacilitiesRaw = a
          .attr("data-room-facilities-raw")
          .slice(0, -1)
          .split(","))),
        (b.accommodationFacilities = a
          .attr("data-accommodation-facilities")
          .slice(0, -1)
          .split(",")),
        (b.accommodationFacilitiesRaw = a
          .attr("data-accommodation-facilities-raw")
          .slice(0, -1)
          .split(",")),
        (b.descriptions = {
          room: a.attr("data-room-description"),
          accommodation: a.attr("data-accommodation-description"),
        }),
        (b.images = a.attr("data-package-images").slice(0, -1).split(","));
      var e = $("<div></div>");
      $(e).append('<div class="spm__gallery"></div>');
      var f = $(e).find(".spm__gallery");
      if (0 < b.images.length)
        for (
          $(f).append(
            '<div id="spm_swiper" class="swiper-container"><div class="swiper-wrapper"></div><div class="spm_swiper-next" onClick="spm_swiper.slideNext(500);gae(\'structured_packages\',\'sp_gallery_click_next\');"></div><div class="spm_swiper-prev" onClick="spm_swiper.slidePrev(500);gae(\'structured_packages\',\'sp_gallery_click_prev\');"></div></div>'
          ),
            $(f).append('<div class="spm_thumbnails"></div>'),
            h = 0;
          h < b.images.length;
          h++
        )
          $(f)
            .find(".swiper-wrapper")
            .append(
              '<div class="swiper-slide filter-gingham" style="background-image:url(' +
                b.images[h] +
                ');"></div>'
            ),
            $(f)
              .find(".spm_thumbnails")
              .append(
                '<div class="spm_thumb" data-index="' +
                  h +
                  '" onclick="spm_swiper.slideTo(' +
                  (h + 1) +
                  ');" style="background-image:url(' +
                  b.images[h] +
                  ');"></div>'
              );
      $(e).append('<div class="spm__description"></div>');
      var g = $(e).find(".spm__description");
      if (
        ($(g).append('<p class="spm__title">' + b.title + "</div>"),
        $(g).append('<p class="spm__subtitle">' + b.subtitle + "</div>"),
        $(g).append(
          '<p class="spm_icon spm__people"><span class="spm_icon-image">' +
            b.people.icons +
            '</span><span class="spm_icon-text">' +
            b.people.title +
            "</span></div>"
        ),
        "" != b.bedding.icons &&
          "" != b.bedding.title &&
          $(g).append(
            '<p class="spm_icon spm__bedding"><span class="spm_icon-image">' +
              b.bedding.icons +
              '</span><span class="spm_icon-text">' +
              b.bedding.title +
              "</span></div>"
          ),
        ($(g).append(
          '<p class="spm_icon spm__arrival"><span class="spm_icon-image"><img src="/static/files/svg/arrival.svg"></span><span class="spm_icon-text">' +
            b.arrival +
            "</span></div>"
        ),
        b.isFlexibleDuration))
      ) {
        var l = $("#price_is_indicative_hidden").val();
        $(g).append(
          '<p class="spm_icon spm__price"><span class="spm_icon-image"><img src="/static/files/svg/price.svg"></span><span class="spm_icon-text">' +
            b.price +
            " (" +
            l +
            ")</span></div>"
        );
      } else $(g).append('<p class="spm_icon spm__price"><span class="spm_icon-image"><img src="/static/files/svg/price.svg"></span><span class="spm_icon-text">' + b.price + "</span></div>");
      if (c) {
        $(g).append(
          '<h3 class="facilities-title">' + b.roomFacilitiesTitle + "</h3>"
        );
        for (
          var d = $(
              '<div class="spm__block package__facilities facilities-list"></div>'
            ),
            h = 0;
          h < b.roomFacilities.length;
          h++
        )
          d.append(
            '<span class="spm_icon package__facilities__facility"><i class="ebs-icon ' +
              b.roomFacilitiesRaw[h] +
              '" data-icon></i> ' +
              b.roomFacilities[h] +
              "</span>"
          );
        $(g).append(d);
      }
      b.descriptions.room &&
        $(g).append(
          '<div class="spm__block spm__block-descriptions"><p class="spm__block-text">' +
            b.descriptions.room +
            "</p></div>"
        ),
        $(g).append(
          '<div class="spm__block spm__block-descriptions"><p class="spm__block-text">' +
            b.descriptions.accommodation +
            "</p></div>"
        ),
        $(g).append($(".listing-query-box__payments"));
      var j = a.hasClass("instant"),
        k = $('<div class="spm_cta_wrapper"></div>');
      k.append(
        '<div class="spm_cta spm_cta-primary">' +
          $(".listing-query-box #inquiry-query-submit").text() +
          "</div>"
      ),
        b.isFlexibleDuration ||
          j ||
          k.append(
            '<div class="spm_cta spm_cta-secondary reservation">' +
              $(".listing-query-box #reservation-query-submit").text() +
              "</div>"
          ),
        !b.isFlexibleDuration &&
          j &&
          k.append(
            '<div class="spm_cta spm_cta-secondary instant-booking">' +
              $(".listing-query-box #instant-booking-query-submit").text() +
              "</div>"
          ),
        $(e).append(k),
        $("#structured_packages_modal .modal-body").html("").append(e),
        $("#structured_packages_modal").modal("show"),
        $("body").css("overflow", "hidden"),
        $("#structured_packages_modal").on("hidden.bs.modal", function () {
          $("#structured_packages_modal").off("hidden.bs.modal"),
            $("body").css("overflow", "");
        }),
        768 > $(window).width() &&
          $("#structured_packages_modal .spm_cta_wrapper")
            .detach()
            .appendTo("#structured_packages_modal .form-wrapper"),
        (window.spm_swiper = new Swiper("#spm_swiper", {
          loop: !0,
          autoplay: 1500,
          navigation: {
            nextEl: ".spm_swiper-next",
            prevEl: ".spm_swiper-prev",
          },
          onSlideChangeEnd: function onSlideChangeEnd(a) {
            $(".spm_thumb").removeClass("active"),
              $('.spm_thumb[data-index="' + a.realIndex + '"]').addClass(
                "active"
              );
          },
        })),
        $(".spm_cta-primary").click(function () {
          gae("structured_packages", "spm_sidebar_inquiry"),
            $("#structured_packages_modal").modal("hide"),
            $("#inquiry-query-submit").trigger("click");
        }),
        $(".spm_cta-secondary.reservation").click(function () {
          gae("structured_packages", "spm_sidebar_reservation"),
            $("#reservation-query-submit").trigger("click");
        }),
        $(".spm_cta-secondary.instant-booking").click(function () {
          gae("structured_packages", "spm_sidebar_instant_booking"),
            $("#instant-booking-query-submit").trigger("click");
        });
    }, 150);
  }),
    $("#inquiry_modal").on("show.bs.modal", function () {
      gae("listingPage", "inquiry_modal-open"),
        $(".package-selection-item:checked")
          .closest(".package-option")
          .find(".package-modal-cta").length
          ? $(".js-inqmodal-package-modal-cta").removeClass("hide")
          : $(".js-inqmodal-package-modal-cta").addClass("hide");
    }),
    $("#inquiry_modal").on("hide.bs.modal", function () {
      gae("listingPage", "inquiry_modal-close");
    });
});
$(function () {
  $(".sidebar_filters").length &&
    ($(".sidebar_filters .sf_item_list").each(function () {
      !$(this).hasClass("noCollapse") &&
        6 < $(this).find("li").length &&
        ($(this).addClass("collapsed"),
        0 < $(this).find("li.selected").length &&
          "sf_destinations" == $(this).attr("id") &&
          $(this).addClass("collapsedFull"),
        $(this)
          .find(".expander")
          .click(function () {
            $(this).closest(".sf_item_list").removeClass("ellipsis"),
              $(this)
                .parent()
                .removeClass("collapsed")
                .removeClass("collapsedFull");
          }));
    }),
    $(".sidebar_filters .sf_item").click(function () {
      var a = $(this).attr("id");
      if ("sf_instant-booking" == a) {
        var b = $(this)
          .find(".js-instant-filter-checkbox")
          .hasClass("selected");
        b
          ? gae("sidebar_filters", a + "_deactivating")
          : gae("sidebar_filters", a + "_activating");
      } else gae("sidebar_filters", a);
    }),
    $(".sidebar_filters #availability-options *").click(function () {
      clearTimeout(window.sf_arrival_calendar),
        (window.sf_arrival_calendar = setTimeout(function () {
          gae("sidebar_filters", "sf_arrival_calendar");
        }, 200));
    }),
    $(".fakeCheck").click(function () {
      var a = $(this).find("a[href]").attr("href");
      a && (window.location.href = a);
    }),
    $(".toggle-button, .js-mobile-instant-toggle").click(function (a) {
      var b = $(this)[0].htmlFor,
        c = $("#" + b);
      $(this).hasClass("js-mobile-instant-toggle") &&
        ((c = $(this).find("#instant-booking-toggle")),
        !c.is(":checked") && c.prop("checked", !0)),
        setTimeout(function () {
          c.is(":checked")
            ? addParam(a, "instant_booking=true")
            : (window.location.href = $("[data-instant-booking-url]").data(
                "instantBookingUrl"
              ));
        }, 100);
    }),
    $(".js-destinations-dropdown").click(function (a) {
      var b = $(a.target);
      0 == b.closest(".sf_dropdown_content").length &&
        ($(this).toggleClass("expanded"),
        $(this).hasClass("expanded") && $(".js_sf_dropdown_filtering").focus());
    }),
    $(document).click(function (a) {
      var b = $(a.target);
      0 == b.closest(".sf_separate_field").length &&
        $(".js-destinations-dropdown").removeClass("expanded");
    }),
    $(document).keyup(function (a) {
      if (13 === a.keyCode) {
        var b = $(".sf_dropdown_content[data-lucky]").attr("data-lucky");
        b &&
          (gae("sidebar_filters_query", "Enter Key"),
          (window.location.href = b));
      }
      27 === a.keyCode &&
        $(".js-destinations-dropdown").removeClass("expanded");
    }),
    $(".js_sf_dropdown_filtering").keyup(function () {
      if (!$(".js_sf_dropdown_filtering").attr("autocomplete_enabled")) {
        var a = $(this).val().toLowerCase();
        clearTimeout(window.sf_destinations_filtering),
          (window.sf_destinations_filtering = setTimeout(function () {
            gae("sidebar_filters_query", a);
          }, 300));
        var b = 0;
        $(this)
          .closest(".sf_dropdown_content")
          .find(".sf_dropdown_filtering__noresults")
          .addClass("hidden"),
          $(this)
            .closest(".sf_dropdown_content")
            .find(".ddc_wrapper a")
            .each(function () {
              -1 < $(this).text().toLowerCase().indexOf(a)
                ? (0 == b &&
                    $(this)
                      .closest(".sf_dropdown_content")
                      .attr("data-lucky", $(this).attr("href")),
                  $(this).removeClass("hidden"),
                  $(this).parent().find(".ddc_1").removeClass("hidden"),
                  b++)
                : $(this).addClass("hidden");
            }),
          0 == b &&
            ($(this)
              .closest(".sf_dropdown_content")
              .find(".ddc_wrapper a")
              .removeClass("hidden"),
            $(this)
              .closest(".sf_dropdown_content")
              .find(".sf_dropdown_filtering__noresults")
              .removeClass("hidden")),
          $(".ddc_wrapper").each(function () {
            $(this).find("a:not(.hidden)").length
              ? $(this).removeClass("hidden")
              : $(this).addClass("hidden");
          });
      }
    }),
    $("#sf_tp_auto_popular_filters .sf_item_title").click(function () {
      $(this).closest("#sf_tp_auto_popular_filters").toggleClass("inactive"),
        Cookies.set(
          "sf_tp_auto_popular_filters",
          $(this).closest("#sf_tp_auto_popular_filters").hasClass("inactive")
            ? 0
            : 1
        ),
        gae("sidebar_filters", "sf_pop_toggle");
    }),
    $("#sf_tp_auto_popular_filters").length &&
      null != Cookies.get("sf_tp_auto_popular_filters") &&
      ("1" == Cookies.get("sf_tp_auto_popular_filters")
        ? $("#sf_tp_auto_popular_filters").removeClass("inactive")
        : $("#sf_tp_auto_popular_filters").addClass("inactive")),
    $("#sf_tp_map .sf_item_title").click(function () {
      $(this).closest("#sf_tp_map").toggleClass("inactive"),
        Cookies.set(
          "sf_tp_map",
          $(this).closest("#sf_tp_map").hasClass("inactive") ? 0 : 1
        ),
        gae("sidebar_filters", "sf_google_map_toggle");
    }),
    $("#sf_tp_map").length &&
      768 >= $(window).width() &&
      ($("#sf_tp_map").addClass("inactive"),
      null != Cookies.get("sf_tp_map") &&
        ("1" == Cookies.get("sf_tp_map")
          ? $("#sf_tp_map").removeClass("inactive")
          : $("#sf_tp_map").addClass("inactive"))));
}),
  $(function () {
    if ($("#sf_item_arrival_toggle").length) {
      var a = function () {
        $("#sf_item_arrival .js-arrival-toggle").toggleClass("selected"),
          $("#sf_item_arrival").toggleClass("hidden"),
          $("#sf_item_arrival")
            .closest(".sf_item_list")
            .addClass("noMaxHeight"),
          $(".js-arrival-toggle").addClass("hidden"),
          gae("sidebar_filters", "sf_arrival_date_calendar_toggle");
      };
      $("#sf_item_arrival").addClass("hidden");
      $(".js-arrival-toggle").click(function () {
        a();
      }),
        -1 != window.location.href.indexOf("arrival_date") &&
          -1 != window.location.href.indexOf("flexible") &&
          a();
    }
  }),
  $(function () {
    var a = $("#sf_categories");
    a.attr("data-collapsable-activities")
      ? ($(".sf_filter_group").each(function () {
          0 == $(this).find("li").length && $(this).addClass("hide");
        }),
        a.find("#sf_filter_category_type_1").one("mousedown", function () {
          a
            .find("#sf_filter_category_type_1 + ul > li")
            .filter(function () {
              var a = $(this),
                b = !!a.children("ul").children().length;
              return b || a.addClass("activity-empty-subcategory"), b;
            })
            .addClass("activity-subcategory")
            .each(function () {
              $(this).append(
                '<i class="ebs-icon ebs-icon-t-caret-down activity-subcategory--ebs-icon"></i>'
              );
            }),
            a.find(".activity-subcategory--ebs-icon").on("click", function (a) {
              $(this)
                .closest(".activity-subcategory")
                .toggleClass("activity-subcategory--opened");
              a.stopPropagation();
            });
        }))
      : $(".sf_filter_group").each(function () {
          $(this).find(".selected").length && $(this).addClass("active");
          0 == $(this).find("li").length && $(this).addClass("hide");
        }),
      $(".sf_filter_group_title").click(function () {
        $(this).closest(".sf_filter_group").toggleClass("active");
      }),
      $("#sf_categories_groupedCategoriesExp .sf_filter_group").each(
        function () {
          0 == $(this).find("li").length && $(this).addClass("hide");
        }
      ),
      0 ==
        $("#sf_categories_groupedCategoriesExp .sf_filter_group:not(.hide)")
          .length && $("#sf_categories_groupedCategoriesExp").addClass("hide");
    $(".js-sf_filter_group_3").click(function (a) {
      if (null == $(a.target).attr("href")) {
        var b = $(this).closest("[data-id]"),
          c = $(b).attr("data-id");
        $(b).toggleClass("selected");
        var d = $(location).attr("pathname");
        d =
          0 <= d.indexOf("/all/")
            ? d.replace("/all/", "/subdestinations/")
            : "/subdestinations";
        var e = $(location).attr("href");
        return (
          (d +=
            0 <= e.indexOf("?")
              ? e.substring(e.indexOf("?"), e.length) + "&did=" + c
              : "?did=" + c),
          0 < $(b).find(".sf_filter_group_3").length ||
            $.ajax({
              type: "GET",
              url: d,
              async: !0,
              target: b,
            }).done(function (a) {
              if (a && !a.isError) {
                var c = $('<ul class="sf_filter_group_3"></ul>'),
                  d = $(b).find("a:first-of-type").attr("href"),
                  e = $("[data-transtag-anywhere-in-destination]")
                    .attr("data-transtag-anywhere-in-destination")
                    .replace(
                      "DESTINATION",
                      $(b).attr("data-transtag-destination-with-preposition")
                    );
                for (
                  $(c).append(
                    '<li class="fakeRadio"><a href="' +
                      d +
                      '" class="parent-destination">' +
                      e +
                      "</a></li>"
                  ),
                    i = 0;
                  i < a.destinations.length;
                  i++
                )
                  if (4 != siteid) {
                    var f = a.destinations[i].url.split("/");
                    f = f.slice(0, f.length - 1).join("/");
                    var g = d.replace(f, a.destinations[i].url);
                    $(c).append(
                      '<li class="fakeRadio"><a href="' +
                        g +
                        '">' +
                        a.destinations[i].name +
                        "</a></li>"
                    );
                  } else
                    (d = isSearchResultsPage
                      ? d.replace(
                          /d=[a-zA-Z0-9-]+/,
                          "d=".concat(a.destinations[i].slug)
                        )
                      : 0 < d.indexOf("?")
                      ? d.replace(
                          /\/d\/[a-zA-Z0-9-]+\?/g,
                          "/d/" + a.destinations[i].slug + "?"
                        )
                      : d.replace(
                          /\/d\/[a-zA-Z0-9-]+/g,
                          "/d/" + a.destinations[i].slug
                        )),
                      $(c).append(
                        '<li class="fakeRadio"><a href="' +
                          d +
                          '">' +
                          a.destinations[i].name +
                          "</a></li>"
                      );
                $(this.target).append(c);
              }
            }),
          (gae("topicPage", "tp_grouped_destinations_2_toggle"), !1)
        );
      }
    }),
      $("#sf_grouped_destinations .active").each(function (a) {
        a && $(this).removeClass("active");
      });
  });
$(function () {
  var a = {
      fr: {
        id: 48,
        lang: "fr",
      },
      en: {
        id: 41,
        lang: "en",
      },
      de: {
        id: 52,
        lang: "de",
      },
      es: {
        id: 149,
        lang: "es",
      },
      nl: {
        id: 39,
        lang: "nl",
      },
    },
    b = {};
  for (var m in a) b[a[m].id] = a[m];
  if (768 > $(window).width()) {
    var c = $(".js-mobile-search-input-destination"),
      d = $(".js-mobile-search-input-activity"),
      e = $(".tp_clearer_search_dropdown"),
      f = $(".js-mobile-search-input-compoundsearch"),
      g = $(".js-mobile-search-input-style");
    $(".js-search__modal-toggle").on("click touch", function () {
      return (
        $("body").attr("data-pos", $(window).scrollTop()),
        $("body,html").addClass("noscroll"),
        $("input").blur(),
        $("#search__modal-" + $(this).attr("data-modal")).removeClass("hide"),
        $("#search__modal-" + $(this).attr("data-modal"))
          .find("input")
          .focus(),
        !1
      );
    });
  } else {
    var c = $(".js-desktop-search-input-destination"),
      d = $(".js-desktop-search-input-activity"),
      h = $(".js-desktop-search-input-arrival"),
      e = $(".tp_clearer_search_dropdown"),
      f = $(".js-desktop-search-input-compoundsearch"),
      g = $(".js-desktop-search-input-style");
    $(".js-search__modal-toggle").on("focus", function () {
      $(".js-search__modal").addClass("hide"),
        $("#search__modal-" + $(this).attr("data-modal")).removeClass("hide");
    }),
      $("body").on("click touch", function (a) {
        0 == $(a.target).parents(".search__wrapper").length &&
          ($(".js-search__modal").addClass("hide"),
          $(".js-search__modal-toggle").blur());
      }),
      c.keyup(function (a) {
        13 != a.keyCode &&
          c
            .parent(".search__input-wrapper")
            .find(".search__modal-wrapper")
            .scrollTop(0);
      }),
      h.keypress(function (a) {
        return a.preventDefault(), !1;
      });
  }
  var k = "tp";
  isIndexPage && (k = "ip"),
    $(".js-search__close,.search__modal-backdrop").on(
      "click touch",
      function () {
        $(".search__modal-header input").val("").trigger("keyup"),
          $("body,html").removeClass("noscroll"),
          $(this).closest(".search__modal").addClass("hide"),
          $(window).scrollTop($("body").attr("data-pos")),
          gae(
            "search_hero",
            k +
              "_modal_" +
              $(this).closest("[data-type]").attr("data-type") +
              "-close"
          );
      }
    ),
    $(".search__accordion-toggle").on("click touch", function () {
      $(this)
        .toggleClass("active")
        .closest("li")
        .next("ul")
        .toggleClass("active");
      var a = $(this).closest("li");
      if (!$(a).hasClass("expanded") && $(a).attr("data-id")) {
        var b = $(this).closest("li").attr("data-id"),
          c = $(location).attr("pathname");
        c =
          0 <= c.indexOf("/all/")
            ? c.replace("/all/", "/subdestinations/")
            : "/subdestinations/";
        var d = $(location).attr("href");
        (c +=
          0 <= d.indexOf("?")
            ? d.substring(d.indexOf("?"), d.length) + "&did=" + b
            : "?did=" + b),
          $.ajax({
            type: "GET",
            url: c,
            async: !0,
            li: a,
          }).done(function (a) {
            var b = $(this.li).find("a:first-of-type").attr("href");
            $(this.li).addClass("expanded");
            var c = $(
              '<ul class="search__accordion search__accordion-lvl3 active"></ul>'
            );
            for (i = 0; i < a.destinations.length; i++) {
              var d = a.destinations[i].url.split("/");
              d = d.slice(0, d.length - 1).join("/");
              var e = b.replace(d, a.destinations[i].url);
              $(c).append(
                '<li><a href="' +
                  e +
                  '">' +
                  a.destinations[i].name +
                  "</a></li>"
              );
            }
            $(c).insertAfter($(this.li));
          });
      }
      gae("search_hero", k + "_modal_accordion-toggle");
    }),
    $(".search__accordion-toggle").each(function () {
      $(this)
        .parent()
        .find("p")
        .on("click touch", function () {
          $(this).parent().find(".search__accordion-toggle").trigger("click");
        });
    }),
    c.keyup(function (b) {
      var c = b.keyCode || b.which;
      if (
        13 == c &&
        !$("#search__modal-destination .search__autocomplete").hasClass("hide")
      ) {
        var d = $("#search__modal-destination .search__autocomplete a")
          .first()
          .attr("href");
        d && 0 < d.length && (window.location.href = d);
      } else {
        var e = $(this).val(),
          f = $(this);
        if (0 < e.length) {
          clearTimeout(window.smdqt),
            (window.smdqt = setTimeout(function () {
              gae("search_hero", k + "_modal-destination-query--" + e);
            }, 600)),
            $("#search__modal-destination .search__autocomplete").removeClass(
              "hide"
            ),
            $(
              "#search__modal-destination .search__autocomplete-noresults"
            ).addClass("hide");
          var g = "";
          4 == siteid &&
            "undefined" != typeof selectedCategories &&
            (g = "&selectedCategories=" + selectedCategories.join(","));
          var h = new XMLHttpRequest(),
            l = "en" == selectedLanguage ? "" : "/" + selectedLanguage,
            m = isSearchResultsPage ? "&tpsr" : "";
          h.open(
            "GET",
            ""
              .concat(l, "/test-dest-search?dest_id=")
              .concat(destinationID, "&query=")
              .concat(encodeURI(e))
              .concat(g)
              .concat(m)
          ),
            h.setRequestHeader("X-Requested-With", "XMLHttpRequest"),
            h.send(null),
            (h.onreadystatechange = function () {
              if ($(f).val() == e && 4 === h.readyState) {
                $(
                  "#search__modal-destination .search__autocomplete ul"
                ).remove();
                var b = $(
                  "<ul class='search__accordion search__accordion-lvl2 active' style='margin-top: -10px;'></ul>"
                );
                if (200 === h.status) {
                  var c = JSON.parse(h.responseText),
                    d = {},
                    g = 0;
                  if (0 < c.hits.hits.length) {
                    for (var k, l = 0; l < c.hits.hits.length; l++)
                      if (
                        ((k = c.hits.hits[l]._source), !d[k.destination_id])
                      ) {
                        d[k.destination_id] = !0;
                        var m = k.name;
                        k.country && (m += ", " + k.country);
                        var o = k["listings_" + siteid];
                        0 < o && (m += " (" + o + ")");
                        var n = a[selectedLanguage] || a.en,
                          p = k.paths[n.id];
                        4 == siteid && (p = k.path);
                        var q = removeQueryStringParameter(
                          "?" +
                            decodeURIComponent(
                              window.location.search.substring(1)
                            ),
                          "page"
                        );
                        4 != siteid &&
                          !isSearchResultsPage &&
                          (isIndexPage || isTopicPage) &&
                          -1 == q.indexOf("show_all") &&
                          (q +=
                            -1 < q.indexOf("?") ? "&show_all" : "?show_all"),
                          (q = q.replace("?&", "?"));
                        var r = decodeURIComponent(window.location);
                        if (
                          (0 < r.indexOf("?") &&
                            (r = location.href.substring(
                              0,
                              location.href.indexOf("?")
                            )),
                          "undefined" != typeof filteredOnDestination &&
                            (r = location.href.substring(
                              0,
                              location.href.indexOf("/d/")
                            )),
                          4 == siteid)
                        ) {
                          var s = k.slug;
                          if (isSearchResultsPage) {
                            var t = new URLSearchParams(q);
                            t.set("d", s), (q = "?".concat(t.toString()));
                          }
                          var u = "".concat(p).concat(q);
                          $(b).append(
                            "<li class='search__accordion-item search__accordion-item-lvl2'><a href='"
                              .concat(u, "'>")
                              .concat(m, "</a></li>")
                          );
                        } else
                          isSearchResultsPage
                            ? $(b).append(
                                "<li class='search__accordion-item search__accordion-item-lvl2'><a href='"
                                  .concat(k.query_url, "'>")
                                  .concat(m, "</a></li>")
                              )
                            : !0 == isIndexPage
                            ? $(b).append(
                                "<li class='search__accordion-item search__accordion-item-lvl2'><a href='/" +
                                  n.lang +
                                  "/all/d/" +
                                  p +
                                  q +
                                  "'>" +
                                  m +
                                  "</a></li>"
                              )
                            : $(b).append(
                                "<li class='search__accordion-item search__accordion-item-lvl2'><a href='" +
                                  r +
                                  "/d/" +
                                  p +
                                  q +
                                  "'>" +
                                  m +
                                  "</a></li>"
                              );
                        if (4 <= g++) break;
                      }
                    $(
                      "#search__modal-destination .search__autocomplete"
                    ).append(b);
                  } else
                    $(
                      "#search__modal-destination .search__autocomplete-noresults"
                    ).removeClass("hide");
                } else
                  $(
                    "#search__modal-destination .search__autocomplete"
                  ).addClass("hide");
              }
            });
        } else
          $("#search__modal-destination .search__autocomplete").addClass(
            "hide"
          );
      }
    }),
    d.keyup(function (a) {
      var b = a.keyCode || a.which,
        c = $(this).val().toLowerCase(),
        d = $("#search__modal-activity");
      if (!(0 < c.length))
        $(d)
          .find(".search__accordion")
          .removeClass("active")
          .removeClass("hide")
          .find("li")
          .removeClass("hide");
      else if (
        (clearTimeout(window.smaqt),
        (window.smaqt = setTimeout(function () {
          gae("search_hero", k + "_modal-activity-query--" + c);
        }, 600)),
        13 == b)
      ) {
        var e = $(d)
          .find(".search__accordion li:not(.hide) a")
          .first()
          .attr("href");
        e && 0 < e.length && (window.location.href = e);
      } else
        $(d)
          .find(".search__accordion")
          .each(function () {
            var a = 0;
            $(this)
              .find("li.search__accordion-item-lvl2")
              .each(function () {
                var b = $(this).text().toLowerCase();
                -1 < b.indexOf(c) || 0.75 <= similarity(b, c)
                  ? ($(this).removeClass("hide"), a++)
                  : $(this).addClass("hide");
              }),
              0 < a
                ? ($(this).addClass("active"),
                  $(this).find(".search__accordion-toggle").addClass("active"),
                  $(this).removeClass("hide"))
                : ($(this).removeClass("active"),
                  $(this)
                    .find(".search__accordion-toggle")
                    .removeClass("active"),
                  $(this).addClass("hide"));
          });
    }),
    g.keyup(function (a) {
      var b = a.keyCode || a.which,
        c = $(this).val().toLowerCase(),
        d = $("#search__modal-style");
      if (!(2 < c.length))
        $(d)
          .find(".search__accordion")
          .removeClass("active")
          .removeClass("hide")
          .find("li")
          .removeClass("hide");
      else if (
        (clearTimeout(window.smaqt),
        (window.smaqt = setTimeout(function () {
          gae("search_hero", k + "_modal-style-query--" + c);
        }, 600)),
        13 == b)
      ) {
        var e = $(d)
          .find(".search__accordion li:not(.hide) a")
          .first()
          .attr("href");
        e && 0 < e.length && (window.location.href = e);
      } else
        $(d)
          .find(".search__accordion")
          .each(function () {
            var a = 0;
            $(this)
              .find("li.search__accordion-item-lvl2")
              .each(function () {
                var b = $(this).text().toLowerCase();
                -1 < b.indexOf(c) || 0.75 <= similarity(b, c)
                  ? ($(this).removeClass("hide"), a++)
                  : $(this).addClass("hide");
              }),
              0 < a
                ? ($(this).addClass("active"),
                  $(this).find(".search__accordion-toggle").addClass("active"),
                  $(this).removeClass("hide"))
                : ($(this).removeClass("active"),
                  $(this)
                    .find(".search__accordion-toggle")
                    .removeClass("active"),
                  $(this).addClass("hide"));
          });
    }),
    f.keyup(function (c) {
      var d = c.keyCode || c.which;
      if (13 == d) {
        var g = $("#compound_search .search-accordion-item a:visible")
            .first()
            .attr("href"),
          h = $("#compound_search .search-accordion-item a:visible")
            .first()
            .closest("[data-type]")
            .attr("data-type"),
          k = $("#compound_search .search-accordion-item a:visible")
            .first()
            .text();
        g &&
          0 < g.length &&
          (gae(
            "search_hero",
            "enter_" + k.split(" ").join("_").split(",").join("") + "--" + h
          ),
          f.val(k),
          (window.location.href = g));
      } else {
        var l = $(this).val(),
          m = $(this);
        if (0 < l.length) {
          clearTimeout(window.full_search_query),
            (window.full_search_query = setTimeout(function () {
              gae("search_hero", "query_" + l);
            }, 600)),
            $("#compound_search .search__autocomplete-noresults").addClass(
              "hide"
            ),
            $("#compound_search .search__autocomplete-noresults")
              .parent()
              .addClass("hide");
          var n = "en" == selectedLanguage ? "" : "/" + selectedLanguage,
            o =
              4 == +siteid
                ? "destinations,tripaneer_categories"
                : "destinations,styles,categories",
            p =
              n +
              "/searching?dest_id=" +
              destinationID +
              "&index=" +
              o +
              "&query=" +
              encodeURI(l),
            q = a[selectedLanguage] || a.en,
            r = new XMLHttpRequest();
          r.open("GET", p),
            r.setRequestHeader("X-Requested-With", "XMLHttpRequest"),
            r.send(null),
            (r.onreadystatechange = function () {
              if ($(m).val() == l && 4 === r.readyState) {
                $("#compound_search .search__autocomplete-noresults").addClass(
                  "hide"
                ),
                  $("#compound_search .search__autocomplete-noresults")
                    .parent()
                    .addClass("hide"),
                  $(".js-search-default").removeClass("hide"),
                  $("#compound_search .search__autocomplete").remove();
                var a = $("<div class='search__autocomplete'></div>");
                if (200 === r.status) {
                  for (
                    var c = JSON.parse(r.responseText),
                      d = [
                        "destinations",
                        "tripaneer_categories_with_dest",
                        "tripaneer_categories",
                        "categories_with_dest",
                        "styles_with_dest",
                        "categories",
                        "styles",
                      ],
                      g = {},
                      h = 0,
                      n = "undefined" == typeof ip_more_search_results ? 2 : 5,
                      o = 0;
                    o < d.length;
                    o++
                  )
                    if (c[d[o]] && 0 < c[d[o]].hits.hits.length) {
                      var p = $(
                          "<ul class='search__accordion search__accordion-lvl1'></ul>"
                        ),
                        s = $("[data-transtag-" + d[o] + "]").attr(
                          "data-transtag-" + d[o]
                        ),
                        u = $("[data-transtag-destination_raw]").attr(
                          "data-transtag-destination_raw"
                        );
                      p.append(
                        "<li class='search__accordion-item search__accordion-item-lvl1'><h4>" +
                          s +
                          ":</h4></li>"
                      ),
                        p.append(
                          "<ul class='search__accordion search__accordion-lvl2 active'></ul>"
                        );
                      for (
                        var v = p.find(".search__accordion-lvl2"), w = 0, x = 0;
                        x < c[d[o]].hits.hits.length;
                        x++
                      ) {
                        var y = c[d[o]].hits.hits[x]._source,
                          z = y.name,
                          A =
                            41 == y.language
                              ? y.url
                              : "/" + b[y.language].lang + y.url;
                        if (
                          (y.country && (z += ", " + y.country),
                          ("categories_with_dest" == d[o] ||
                            "styles_with_dest" == d[o]) &&
                            0 < e.length &&
                            (z += ' <span class="with-dest">' + u + "</span>"),
                          isSearchResultsPage)
                        )
                          A = y.query_url;
                        else if ("destinations" == d[o])
                          if (4 == +siteid) A = y.path;
                          else if ("undefined" != typeof filteredOnActivity) {
                            var B = decodeURIComponent(window.location),
                              C = B.indexOf("/d/");
                            0 < C && (B = B.substring(0, C)),
                              0 < B.indexOf("?") &&
                                (B = location.href.substring(
                                  0,
                                  location.href.indexOf("?")
                                )),
                              (B = removeHost(B)),
                              (A = B + "/d/" + y.paths[q.id]);
                          } else {
                            var D =
                              41 == y.language ? "" : "/" + b[y.language].lang;
                            A = D + "/all/d/" + y.paths[q.id];
                          }
                        var E = A;
                        if ("undefined" != typeof y.destination_id)
                          var E = y.destination_id;
                        if (!g[E]) {
                          if (((g[E] = !0), isIndexPage || isTopicPage)) {
                            var F = [
                              "/all/c/budget-retreats",
                              "/all/d/asia-and-oceania/india",
                              "/all/d/europe/united-kingdom",
                            ];
                            for (j = 0; j < F.length; j++)
                              A == F[j] &&
                                (A +=
                                  -1 < A.indexOf("?") ? "&search" : "?search");
                          }
                          (A += -1 < A.indexOf("?") ? "&q=" + l : "?q=" + l),
                            !isSearchResultsPage &&
                              -1 == A.indexOf("show_all") &&
                              (isIndexPage || isTopicPage) &&
                              (A += "&show_all"),
                            v.append(
                              '<li\n\t\t\t\t\t\t\t\t\t\t\tdata-type="'
                                .concat(
                                  d[o],
                                  "\"\n\t\t\t\t\t\t\t\t\t\t\tclass='\n\t\t\t\t\t\t\t\t\t\t\t\tsearch-accordion-item\n\t\t\t\t\t\t\t\t\t\t\t\tsearch-accordion-item-lvl2\n\t\t\t\t\t\t\t\t\t\t\t\tsearch-accordion-item--"
                                )
                                .concat(d[o], "\n\t\t\t\t\t\t\t\t\t\t\t\t")
                                .concat(
                                  w > n ? "hidden" : "",
                                  '\n\t\t\t\t\t\t\t\t\t\t\t\'\n\t\t\t\t\t\t\t\t\t\t\tonclick=\'gae(\n\t\t\t\t\t\t\t\t\t\t\t\t"search_hero",\n\t\t\t\t\t\t\t\t\t\t\t\t"click_'
                                )
                                .concat(
                                  z.split(" ").join("_").split(",").join(""),
                                  "--"
                                )
                                .concat(
                                  d[o],
                                  "\"\n\t\t\t\t\t\t\t\t\t\t\t);'\n\t\t\t\t\t\t\t\t\t\t>\n\t\t\t\t\t\t\t\t\t\t\t<a href='"
                                )
                                .concat(A, "'>")
                                .concat(z, "</a>\n\t\t\t\t\t\t\t\t\t\t</li>")
                            ),
                            w++,
                            h++;
                        }
                      }
                      a.append(p);
                    }
                  0 < h
                    ? ($(".js-append-compound-search-results").append(a),
                      $("#compound_search .search__autocomplete a").click(
                        function () {
                          f.val(k);
                        }
                      ),
                      $(".js-search-default").addClass("hide"))
                    : ($("#compound_search .search__autocomplete").remove(),
                      $(
                        "#compound_search .search__autocomplete-noresults"
                      ).removeClass("hide"),
                      $("#compound_search .search__autocomplete-noresults")
                        .parent()
                        .removeClass("hide"),
                      $(".js-search-default").removeClass("hide"));
                } else
                  $("#compound_search .search__autocomplete").remove(),
                    $(
                      "#compound_search .search__autocomplete-noresults"
                    ).removeClass("hide"),
                    $("#compound_search .search__autocomplete-noresults")
                      .parent()
                      .addClass("hide"),
                    $(".js-search-default").removeClass("hide");
              }
            });
        } else
          $("#compound_search .search__autocomplete").remove(),
            $("#compound_search .search__autocomplete-noresults").addClass(
              "hide"
            ),
            $("#compound_search .search__autocomplete-noresults")
              .parent()
              .addClass("hide"),
            $(".js-search-default").removeClass("hide");
      }
    });
  var k = "tp";
  if (
    (isIndexPage && (k = "ip"),
    "undefined" != typeof $("[data-search-status]").attr("data-search-status"))
  ) {
    var l = $("[data-search-status]").attr("data-search-status");
    "undefined" == typeof Cookies.get("search_mobile_tracking")
      ? gae("search_hero", "landing--site" + siteid + "--" + l)
      : gae("search_hero", "pageview--site" + siteid + "--" + l),
      Cookies.set("search_mobile_tracking", "site" + siteid + "--" + l);
  }
  "undefined" != typeof tp_mobile_search_confirmation &&
    "undefined" != typeof Cookies.get("search_mobile_tracking") &&
    gae(
      "search_hero",
      "confirmation-" +
        tp_mobile_search_confirmation +
        "--" +
        Cookies.get("search_mobile_tracking")
    ),
    $(".search__pop-block").on("click touch", function () {
      gae("search_hero", k + "_overview_popular-click");
    }),
    $(".search__wrapper input[data-modal]").on("click touch", function () {
      gae("search_hero", k + "_modal_" + $(this).attr("data-modal") + "-open");
    }),
    $(".search__wrapper .search__reset").on("click touch", function () {
      gae(
        "search_hero",
        k +
          "_overview_input_" +
          $(this).parent().find("input[data-modal]").attr("data-modal") +
          "-reset"
      );
    }),
    $(".search__modal a").on("click touch", function () {
      gae(
        "search_hero",
        k +
          "_modal_" +
          $(this).closest("[data-type]").attr("data-type") +
          "-link"
      );
    });
});

function similarity(b, c) {
  var d = b,
    e = c;
  b.length < c.length && ((d = c), (e = b));
  var f = d.length;
  return 0 == f ? 1 : (f - editDistance(d, e)) / parseFloat(f);
}

function editDistance(b, c) {
  var d = Math.min;
  (b = b.toLowerCase()), (c = c.toLowerCase());
  for (var f = [], g = 0; g <= b.length; g++) {
    for (var k = g, l = 0; l <= c.length; l++)
      if (0 == g) f[l] = l;
      else if (0 < l) {
        var m = f[l - 1];
        b.charAt(g - 1) != c.charAt(l - 1) && (m = d(d(m, k), f[l]) + 1),
          (f[l - 1] = k),
          (k = m);
      }
    0 < g && (f[c.length] = k);
  }
  return f[c.length];
}
$(function () {
  $(".hear-about-us-confirmation").hide(),
    $(".hear-about-us-send").on("click", function () {
      var a = $("#channel").val();
      if (null == a) return !1;
      "other" == a && (a = $("#other").val());
      var b = getUrlParameter("token");
      return (
        $.ajax({
          type: "POST",
          url: "/customer/confirmation/customer_selected_channel",
          data: '{"token" : "' + b + '", "text" : "' + a + '"}',
          contentType: "application/json",
        }).done(function () {
          hearAboutUsSuccess();
        }),
        !1
      );
    }),
    $("#channel").change(function () {
      var a = $(this).val();
      "other" == a
        ? $("#other").val("").removeClass("js-hide")
        : $("#other").val(a).addClass("js-hide");
    });
});

function hearAboutUsSuccess() {
  $(".hear-about-us-container").hide(),
    $(".hear-about-us-confirmation").fadeIn(),
    setTimeout(function () {
      $(".hear-about-us-confirmation").fadeOut();
    }, 3e3);
}
window.addEventListener("load", function () {
  setTimeout(initLoginAPIs, 666);
});

function initLoginAPIs() {
  (function (a, b, c) {
    var d = "en_US";
    switch (selectedLanguage) {
      case "en":
        d = "en_US";
        break;
      default:
        d = selectedLanguage + "_" + selectedLanguage.toUpperCase();
    }
    var e,
      f = a.getElementsByTagName(b)[0];
    a.getElementById(c) ||
      ((e = a.createElement(b)),
      (e.id = c),
      (e.src =
        "https://connect.facebook.net/" +
        d +
        "/sdk.js#xfbml=1&version=v2.12&appId=" +
        facebookAppId),
      f.parentNode.insertBefore(e, f),
      (window.fbAsyncInit = function () {
        FB.Event.subscribe("xfbml.render", function () {
          $("#spinner .spinner").remove();
        });
      }));
  })(document, "script", "facebook-jssdk"),
    (function (a, b, c, d, e, f) {
      (d = a.gapi || (a.gapi = {})),
        (d.analytics = {
          q: [],
          ready: function ready(a) {
            this.q.push(a);
          },
        }),
        (e = b.createElement(c)),
        (f = b.getElementsByTagName(c)[0]),
        (e.src = "https://apis.google.com/js/platform.js"),
        f.parentNode.insertBefore(e, f),
        (e.onload = function () {
          d.load("auth2", function () {
            for (
              var a = gapi.auth2.init(),
                b = document.querySelectorAll(".js-google-auth-btn"),
                c = 0;
              c < b.length;
              c++
            )
              a.attachClickHandler(b[c], {}, handleGoogleLogin);
          });
        });
    })(window, document, "script");
}

function accountLogout() {
  gae("customer-login", "logout");
  var a = document.body;
  a.classList.add("loading"),
    $.ajax({
      type: "POST",
      url: "/account/auth/logout",
      success: function success(a) {
        gae("customer-login", "logout"),
          a.ok && window.location.replace(a.redirect);
      },
      error: function error() {
        a.classList.remove("loading");
      },
    });
}

function handleFacebookLogin(a) {
  $(".login-form-wrapper .js-error").text("").removeClass("active"),
    $(".signup-form-wrapper .js-error").text("").removeClass("active"),
    $(".js-social-error").text("").removeClass("active"),
    "connected" == a.status &&
      $.ajax({
        type: "POST",
        url: "/account/auth/facebook",
        data: {
          accessToken: a.authResponse.accessToken,
          userID: a.authResponse.userID,
          pageType: document.querySelector("#signup-page-type").value,
        },
      })
        .done(function (a) {
          a.success
            ? (a.newCustomer &&
                (gae("customer-login", "facebook-registration"),
                marketing.trackSoftGoals(
                  marketing.SoftGoals.AccountRegistration,
                  "facebook"
                )),
              gae("customer-login", "facebook-login"),
              location.reload())
            : ($(".js-social-error").text(a.errorMessage).addClass("active"),
              $(".login-form-wrapper .js-error")
                .text(a.errorMessage)
                .addClass("active"),
              $(".signup-form-wrapper .js-error")
                .text(a.errorMessage)
                .addClass("active"));
        })
        .fail(function (a) {
          $(".js-social-error")
            .text(a.responseJSON.error.text)
            .addClass("active"),
            $(".login-form-wrapper .js-error")
              .text(a.responseJSON.error.text)
              .addClass("active"),
            $(".signup-form-wrapper .js-error")
              .text(a.responseJSON.error.text)
              .addClass("active");
        });
}

function handleGoogleLogin(a) {
  $(".js-google-auth-btn .loading").show(),
    $(".login-form-wrapper .js-error").text("").removeClass("active"),
    $(".signup-form-wrapper .js-error").text("").removeClass("active"),
    $(".js-social-error").text("").removeClass("active"),
    $.ajax({
      method: "POST",
      url: "/account/auth/google",
      data: {
        token: a.getAuthResponse().id_token,
        pageType: document.querySelector("#signup-page-type").value,
      },
    })
      .done(function (a) {
        a.success
          ? (a.newCustomer &&
              (gae("customer-login", "google-registration"),
              marketing.trackSoftGoals(
                marketing.SoftGoals.AccountRegistration,
                "google"
              )),
            gae("customer-login", "google-login"),
            window.location.reload())
          : ($(".js-google-auth-btn .loading").hide(),
            $(".js-social-error").text(a.errorMessage).addClass("active"),
            $(".login-form-wrapper .js-error")
              .text(a.errorMessage)
              .addClass("active"),
            $(".signup-form-wrapper .js-error")
              .text(a.errorMessage)
              .addClass("active"));
      })
      .fail(function (a) {
        $(".js-google-auth-btn .loading").hide(),
          $(".js-social-error")
            .text(a.responseJSON.error.text)
            .addClass("active"),
          $(".login-form-wrapper .js-error")
            .text(a.responseJSON.error.text)
            .addClass("active"),
          $(".signup-form-wrapper .js-error")
            .text(a.responseJSON.error.text)
            .addClass("active");
      });
}
$(function () {
  ($clickables = $(".gototop")),
    0 < $clickables.length &&
      ($clickables.on("click", function (a) {
        $("html, body").animate(
          {
            scrollTop: 0,
          },
          400
        ),
          a.preventDefault();
      }),
      $(document).scroll(function () {
        var a = $(this).scrollTop();
        584 < a ? $(".gototop-btn").fadeIn() : $(".gototop-btn").fadeOut();
      }));
});

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
var warn = function (a, b) {
  console.warn("Invalid response to AJAX submission (".concat(a, "):"), b),
    gae("jsWarning", "invalidAjaxResponse-".concat(a));
};
$(function () {
  "function" == typeof $.fn.dropdown && $(".dropdown-toggle").dropdown(),
    $("input.focus").focus(),
    $(".ajax-submission").submit(function (a) {
      a.preventDefault(), a.stopImmediatePropagation();
      var b = $(this),
        c = b.attr("action"),
        d = b.attr("method"),
        e = {};
      return (
        $(":input", b).each(function () {
          var a = $(this);
          (e[a.attr("name")] = a.val()),
            a.next(".help-block").html(""),
            $(a.parents(".control-group")[0]).removeClass("error");
        }),
        $.ajax({
          type: d,
          url: c,
          data: e,
          dataType: "json",
          xhrFields: {
            withCredentials: !0,
          },
          complete: function complete(a) {
            if (!a) warn("noResponseObject", a);
            else if (!a.responseText) warn("noResponseText", a);
            else if ("" !== a.responseText) {
              var d = JSON.parse(a.responseText);
              if (
                (d.redirect
                  ? (window.location = c.replace(
                      /(https?:\/\/[^/]+).*/,
                      "$1" + d.redirect
                    ))
                  : d.redirect_full && (window.location = d.redirect_full),
                d.error || 422 == a.status)
              ) {
                var g = "";
                if ("string" == typeof d.error) {
                  var e = $(":input", b).first();
                  e.next(".help-block").html(d.error),
                    $(e.parents(".control-group")[0]).addClass("error"),
                    (g = d.error);
                } else if ("object" == _typeof(d.error))
                  for (var f in ($(":input", b).each(function () {
                    var a = $(this),
                      b = a.attr("name");
                    d.error[b] &&
                      (a.parent().find(".help-block").html(d.error[b]),
                      $(a.parents(".control-group")[0]).addClass("error"));
                  }),
                  d.error))
                    g += d.error[f] + "<br>";
                var e = $("#alert-msg", b).first();
                e.addClass("alert alert-error"),
                  e.html(g),
                  $(b).trigger("errorCallback", d, a);
              } else {
                if (d.success && "string" == typeof d.success) {
                  var e = $("#alert-msg", b).first();
                  e.addClass("alert alert-success"),
                    e.removeClass("alert-error"),
                    e.html(d.success);
                }
                $(b).trigger("successCallback", d, a);
              }
            } else warn("emptyResponseText", a);
          },
        }),
        !1
      );
    });
});
$("#subscribe_modal").on("show", function () {
  var a = $(this).attr("new-form-url");
  $.ajax({
    type: "GET",
    dataType: "script",
    url: a,
  });
});

function subscribe(a) {
  setTimeout(function () {
    window.history &&
      window.history.pushState &&
      window.history.replaceState(
        {},
        document.title,
        removeHost(removeQueryStringParameter(window.location.href, "email"))
      ),
      $("#subscribe_modal").modal("show"),
      $("#subscribe_modal #subscriber_email").val(a),
      setTimeout(function () {
        $("#subscribe_modal form").submit();
      }, 333);
  }, 333);
}
$(function () {
  function a(a) {
    return $.fn.datepicker.DPGlobal.formatDate(a, "yymmdd", "en");
  }

  function b(a) {
    var b = new Date(a);
    return b.setTime(b.getTime() + 6e4 * b.getTimezoneOffset()), b;
  }

  function c() {
    var a, b, c;
    (a = $("#availability-options div.month").first().datepicker("getUTCDate")),
      a &&
        !isNaN(a) &&
        ((b = parseInt($(".filter_flexible").val())),
        (c = b && 0 < b ? " +/- " + b : ""),
        $("#availability-options .month")
          .parents(".filter.btn-group")
          .find(".title")
          .html(
            "" +
              $.fn.datepicker.DPGlobal.formatDate(
                a,
                "d M yyyy",
                selectedLanguage
              ) +
              c
          ),
        d("#availability-options .datepicker .day.active"));
  }
  window.arrivalDateSet = function () {
    var a = $("#availability-options div.month").datepicker("getUTCDate");
    return a && !isNaN(a);
  };
  var d, e, f, g;
  $(".filter-reset a").click(function () {
    var a;
    return (
      (a = $(this).parents(".filter.btn-group").find(".title")),
      a.html(a.data("default"))
    );
  }),
    (f = function () {
      var a = $("#destinations-options");
      700 < $(window).width() && !a.data("no-shift")
        ? a.css("left", Math.min(0, 470 - a.outerWidth()))
        : a.css("left", 0),
        a.css("visibility", ""),
        $("#filters #destination-input").focus();
    }),
    $("#filters #destinations").click(function () {
      return (
        $("#destinations-options").css("visibility", "hidden"), setTimeout(f, 1)
      );
    }),
    $("#filters #destination-input").click(function () {
      return !1;
    }),
    (d = function (a) {
      var b, c, d, e;
      if (((e = parseInt($(".filter_flexible").val())), $(a).length && e))
        return (
          (b = $(".day")),
          (c = b.index($(a))),
          (d = $.grep(b, function (a, b) {
            return b <= c + e && b >= c - e && !$(a).hasClass("disabled");
          })),
          $(d).addClass("highlight")
        );
    }),
    (e = function () {
      return d("#availability-options .datepicker .day.active");
    }),
    (g = function () {
      return $(".day.highlight").removeClass("highlight");
    }),
    d(".public .datepicker .day.active");
  var h = (function (c) {
    if (!c) return null;
    var d,
      e = {},
      f = c.toString().split(",");
    for (var g in f) {
      var h = f[g],
        j = h.split("-"),
        k = 1 < j.length ? parseInt(j[1]) : 1;
      (h = j[0]),
        0 < g
          ? d.setDate(d.getDate() + parseInt(h.slice(0, 4)))
          : ((d = new Date(0)),
            d.setUTCFullYear(parseInt(h.slice(0, 2)) + 2e3),
            d.setUTCMonth(parseInt(h.slice(2, 4)) - 1),
            d.setUTCDate(parseInt(h.slice(4, 6))));
      for (var l = 0; l < k; ++l) (e[a(b(d))] = !0), d.setDate(d.getDate() + 1);
    }
    return e;
  })($("#availability-options .month").data("availability"));
  return (
    $(".filter_flexible").on("change", function () {
      monthSelection();
    }),
    $("#availability-options .month")
      .datepicker({
        language: selectedLanguage,
        format: "yyyy-mm-dd",
        weekStart: 1,
        beforeShowDay: function beforeShowDay(c) {
          var d = a(b(c));
          return !!h[d] && "available";
        },
      })
      .on("changeDate", function (b) {
        c();
        var d, e;
        if (
          ((d = $(this).datepicker("getUTCDate")),
          (e = $.prototype.datepicker.DPGlobal.formatDate(
            d,
            "yyyy-mm-dd",
            "en"
          )),
          d && !isNaN(d))
        ) {
          var f = window.location.search;
          if (
            ((f = updateQueryStringParameter(f, "arrival_date", e)),
            (f = updateQueryStringParameter(
              f,
              "flexible",
              $(".filter_flexible").val()
            )),
            (f = removeQueryStringParameter(f, "page")),
            $(b.target).closest("#js-forced-dates").length)
          ) {
            var g = document.querySelector(".search__modal--arrival-duration");
            g.classList.remove("hide"), window.history.pushState({}, "", f);
          } else window.location.search = f;
        }
      })
      .on("changeMonth", function () {
        return setTimeout(e, 1);
      }),
    $("#availability-options .search").on("click", function () {
      var a, b;
      if (
        ((a = $("#availability-options div.month").datepicker("getUTCDate")),
        (b = $.fn.datepicker.DPGlobal.formatDate(a, "yyyy-mm-dd", "en")),
        a && !isNaN(a))
      ) {
        var c = window.location.search;
        (c = updateQueryStringParameter(c, "arrival_date", b)),
          (c = updateQueryStringParameter(
            c,
            "flexible",
            $(".filter_flexible").val()
          )),
          (c = removeQueryStringParameter(c, "page")),
          (window.location.search = c);
      }
      return $("#availability-options div.month").trigger(
        "click.dropdown.data-api"
      );
    }),
    $("#availability-options").on("click", function (a) {
      return console.log("click stop propagation"), a.stopPropagation();
    }),
    $("#available-dates").on("click", function () {
      monthSelection(), $("#availability-options .search").hide();
    }),
    $("#availability-options .datepicker")
      .on("mouseover.duration", ".available", function () {
        return g(), d(this);
      })
      .on("mouseout.duration", ".available", function () {
        return g(), d("#availability-options .datepicker .day.active");
      }),
    $("#availability-options select").on("change", function () {
      g(), c();
      var a = $("#availability-options div.month").datepicker("getUTCDate");
      if (a && !isNaN(a)) return $("#availability-options .search").click();
    })
  );
});

function monthSelection() {
  var a = $(".filter_flexible").val();
  15 == a
    ? ($(".datepicker-inline > div").hide(),
      $(".datepicker-inline .datepicker-months").show(),
      $(".datepicker-inline .datepicker-months thead th").css("opacity", "0"),
      $(".datepicker-inline .datepicker-months thead th.datepicker-switch").css(
        "opacity",
        "1"
      ),
      $(".datepicker-inline .datepicker-months thead").css(
        "pointer-events",
        "none"
      ),
      $(".datepicker-inline .datepicker-months span").on("click", function () {
        setTimeout(function () {
          for (var a = 15; $('td:contains("' + a + '")').hasClass("disabled"); )
            a++;
          $('td:contains("' + a + '")').trigger("click"),
            $("#availability-options").hide();
        }, 1);
      }))
    : ($(".datepicker-inline > div").hide(),
      $(".datepicker-inline .datepicker-days").show());
}
$(function () {
  var a = (function getParam(a) {
    var b,
      c,
      d = decodeURIComponent(window.location.search.substring(1)),
      e = d.split("&");
    for (c = 0; c < e.length; c++)
      if (((b = e[c].split("=")), b[0] === a)) return void 0 === b[1] || b[1];
  })("arrival_date");
  "undefined" != typeof a &&
    $(".filter_flexible").change(function () {
      (window.filter_flexible_timeout = setTimeout(function () {
        var a = window.location.search;
        (a = updateQueryStringParameter(
          a,
          "flexible",
          $(".filter_flexible").val()
        )),
          (window.location.search = a);
      }, 1e3)),
        $(".datepicker *").click(function () {
          clearInterval(window.filter_flexible_timeout);
        });
    });
});
$(function () {
  $(".favorites").on("click", function () {
    var a,
      b = $(this);
    b.hasClass("svg-wrapper")
      ? b.hasClass("favorite-full")
        ? (b.removeClass("favorite-full").addClass("favorite-empty"),
          (a = "DELETE"),
          $(this).hasClass("makes-toast") &&
            ($(".toast-alert").fadeOut(1e3, function () {
              $(this).remove();
            }),
            toast.info(wishRemove, null, toast.fade)))
        : (b.removeClass("favorite-empty").addClass("favorite-full"),
          (a = "PUT"),
          $(this).hasClass("makes-toast") &&
            ($(".toast-alert").fadeOut(1e3, function () {
              $(this).remove();
            }),
            toast.info(wishAdd, null, toast.fade)))
      : b.hasClass("ebs-icon-heart")
      ? (b.removeClass("ebs-icon-heart").addClass("ebs-icon-heart-stroked"),
        (a = "DELETE"),
        b.removeClass("tada"),
        b.addClass("unlike"),
        b.trigger("mouseout"),
        $(this).hasClass("makes-toast") &&
          ($(".toast-alert").fadeOut(1e3, function () {
            $(this).remove();
          }),
          $("body").hasClass("logged-in")
            ? toast.favorite(wishRemove, null, toast.fade)
            : (toast.favorite(
                wishRemove,
                {
                  buttonText: wishLoginButton,
                  buttonURL: "#plt-login-modal",
                  dataToggle: "modal",
                },
                toast.fade
              ),
              $(".toast-alert a").on("click", function () {
                $(this).parent().remove();
              }))))
      : (b.removeClass("ebs-icon-heart-stroked").addClass("ebs-icon-heart"),
        (a = "PUT"),
        b.addClass("tada"),
        b.removeClass("unlike"),
        b.trigger("mouseout"),
        $(this).hasClass("makes-toast") &&
          ($(".toast-alert").fadeOut(1e3, function () {
            $(this).remove();
          }),
          $("body").hasClass("logged-in")
            ? toast.favorite(wishAdd, null, toast.fade)
            : (toast.favorite(
                wishAdd,
                {
                  buttonText: wishLoginButton,
                  buttonURL: "#plt-login-modal",
                  dataToggle: "modal",
                },
                toast.fade
              ),
              $(".toast-alert a").on("click", function () {
                $(this).parent().remove();
              }))));
    var c = b.data("listing-id"),
      d = b.data("reference-code"),
      e = b.data("csrf-token");
    if (
      ($.ajax({
        type: a,
        url: "/favorites/ref/" + d,
        async: !0,
        headers: {
          "X-CSRF-Token": e,
        },
      }).done(function (a) {
        a &&
          ($("#user_favorite_count").html(a.count),
          $(".navbar__nav-wishlist .count").html(a.count),
          $(".user_favorite_count").html(a.count),
          $(".current_site_favorite_count").length &&
            $(".current_site_favorite_count").html(
              "(" + a.currentSiteCount + ")"
            ),
          $(".other_sites_favorite_count").length &&
            $(".other_sites_favorite_count").html(
              "(" + a.otherSitesCount + ")"
            ));
      }),
      "PUT" === a)
    ) {
      var f = b.data("currency-code"),
        g = b.data("total-listing-price");
      "string" == typeof g && (g = +g.replace(",", "")),
        window.dataLayer.push({
          event: "add_listing_to_favorites",
          favorited_listing_id: c,
          favorited_listing_price: g,
          favorited_listing_price_currency: f,
        });
    }
    return gae("softgoal", "wishlist"), gae("wishlist", "button_toggle"), !1;
  }),
    767 < $(window).width() &&
      $(".favorite")
        .mouseover(function () {
          $(this).parent().find(".js-show-on-like").hide(),
            $(this).parent().find(".js-show-on-unlike").show();
        })
        .mouseout(function () {
          $(this).parent().find(".js-show-on-like, .js-show-on-unlike").hide();
        });
}),
  $(".favorite--preventDefault").click(function () {
    event.preventDefault();
  });

function openLoginModal() {
  var a = document.querySelectorAll(".partner-cta-container");
  if (null !== a) for (var b = 0; b < a.length; ++b) a[b].classList.add("hide");
  $("#plt-login-modal").modal("show");
}
var adyenDropin = (function () {
  function a() {
    var a = document.querySelector("#deposit_amount_discounted"),
      d = "";
    d = a ? a.value : document.querySelector("#deposit_amount").value;
    var e = document.querySelector("#keep_reservation_payment"),
      h = document.querySelector("#deposit_currency").value,
      i = {
        amount: d,
        currency: h,
      },
      j = {
        token: getUrlParameter("token") || "",
        preAuthorisation: "true" === e.value,
        deposit: i,
      },
      k = {
        credentials: "same-origin",
        method: "POST",
        body: JSON.stringify(j),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
    fetch("/payment_methods", k)
      .then(function (a) {
        if (a.ok) return a.json();
        throw new Error("Something went wrong, please retry");
      })
      .then(function (a) {
        if (
          (a.paymentMethods.map(function (a) {
            var b = document.querySelector("#from-country").value;
            "scheme" == a.type &&
              ("se" == b
                ? (a.name = "Card Payment")
                : (a.name = "Credit Card / Debit Card"));
          }),
          0 === Object.keys(a).length && a.constructor === Object)
        )
          throw new Error("Something went wrong, please retry");
        if (0 == a.paymentMethods.length && "" == f) {
          var i = [];
          i.push(
            "Sorry, something went wrong here, please contact us to continue with your payment"
          ),
            adyenDropin.renderErrors(i),
            adyenDropin.renderContactUsButton(
              "".concat(window.location.origin, "/customer-service")
            ),
            reporter.report("payments", {
              reason: "failed to load payment methods",
            });
        }
        var d = !0;
        "" != f && (d = !1);
        var e = {
            locale: "en_US",
            environment: c.value,
            showPayButton: !1,
            originKey: b.value,
            openFirstPaymentMethod: d,
            paymentMethodsResponse: a,
          },
          h = new AdyenCheckout(e);
        (window.dropin = h.create("dropin", g)), dropin.mount("#dropin");
      })
      .catch(function (a) {
        if (adyenDropin != null) {
          var b = [];
          b.push(a),
            adyenDropin.renderErrors(b),
            adyenDropin.renderButton(window.location.href);
        }
        reporter.report("payments", {
          reason: "failed to load payment methods",
        });
      });
  }
  var b = document.querySelector("#origin-key"),
    c = document.querySelector("#dropin-env"),
    d = document.querySelector("#google-env"),
    e = window.location.href,
    f = document.querySelector("#stripe-experiment") || "";
  if (!b) return !1;
  document.addEventListener("DOMContentLoaded", a());
  var g = {
    paymentMethodsConfiguration: {
      paywithgoogle: {
        configuration: {
          gatewayMerchantId: "Tripaneer",
          merchantIdentifier: "15859744111862801511",
        },
        environment: d.value,
      },
    },
    onReady: function onReady() {
      adyenDropin.hideDropinLoader(),
        0 < dropin.props.paymentMethods.length &&
          adyenDropin.toggleFees(
            dropin.props.paymentMethods[0].type,
            dropin.props.paymentMethods[0].name
          );
    },
    onSelect: function onSelect(a) {
      adyenDropin.toggleFees(a.props.type, a.props.name);
    },
    onError: function onError(a) {
      if ("statusCode" in a && "canceled" == a.statusCode.toLowerCase()) {
        adyenDropin.renderErrors({
          message: translations.payment.cancelledTryAgain,
        }),
          trpPayment.submitButton.isDoneLoading(paymentSubmitButton);
        try {
          dropin.state &&
            dropin.state.activePaymentMethod &&
            dropin.state.activePaymentMethod.props &&
            trpPayment.logPaymentClick(
              dropin.state.activePaymentMethod.props.type,
              "submit_payment",
              "cancelled"
            );
        } catch (a) {
          console.log("Failed to report payment events");
        }
      } else
        trpPayment.logPaymentClick("unknown", "response", "error"),
          adyenDropin.renderErrors(a),
          trpPayment.submitButton.isDoneLoading(paymentSubmitButton),
          reporter.report("payments", {
            reason: "Adyen dropin error",
          });
    },
    onSubmit: function onSubmit(a, b) {
      (paymentSubmitButton.disabled = !0),
        adyenDropin
          .makePayment(a.data)
          .then(function (a) {
            if ("action" in a.adyenResponse)
              (skipCheck = !0),
                adyenDropin.showDropinLoader(),
                b.handleAction(a.adyenResponse.action);
            else if (
              (trpPayment.submitButton.isDoneLoading(paymentSubmitButton),
              "errors" in a && 0 < Object.keys(a.errors).length
                ? (b.setStatus("error", {
                    message: translations.payment.somethingWentWrong,
                  }),
                  adyenDropin.renderErrors(a.errors),
                  adyenDropin.renderButton(a.actions.retry))
                : 0 < Object.keys(a.adyenResponse).length
                ? (trpPayment.submitButton.isDoneLoading(paymentSubmitButton),
                  "resultCode" in a.adyenResponse &&
                    "Authorised" == a.adyenResponse.resultCode &&
                    (a.isPreauthorisation
                      ? b.setStatus("success", {
                          message: translations.payment.preauthSuccessful,
                        })
                      : b.setStatus("success", {
                          message: translations.payment.paymentSuccesful,
                        })))
                : (adyenDropin.renderErrors(a.errors),
                  adyenDropin.renderButton(a.actions.retry)),
              0 < Object.keys(a.actions).length)
            )
              for (var c in a.actions)
                a.actions.hasOwnProperty(c) &&
                  ("redirect" === c
                    ? (window.location = a.actions.redirect)
                    : "retry" === c
                    ? adyenDropin.renderButton(a.actions.retry)
                    : console.log(c));
          })
          .catch(function (a) {
            throw Error(a);
          });
    },
    onAdditionalDetails: function onAdditionalDetails(a, b) {
      adyenDropin
        .makeDetailsCall(a.data)
        .then(function (a) {
          (paymentSubmitButton.disabled = !0),
            trpPayment.submitButton.isDoneLoading(paymentSubmitButton),
            adyenDropin.showDropinLoader();
          var c = !1;
          if (
            a.adyenResponse != null &&
            null != a.adyenResponse &&
            0 < Object.keys(a.adyenResponse).length
          )
            if (!0 == "action" in a.adyenResponse)
              (c = !0), b.handleAction(a.adyenResponse.action);
            else {
              var d = !1;
              null != a.adyenResponse &&
                !0 == "resultCode" in a.adyenResponse &&
                "Authorised" == a.adyenResponse.resultCode &&
                (d = !0),
                d
                  ? (b.setStatus("success", {
                      message: translations.payment.paymentSuccesful,
                    }),
                    adyenDropin.hideDropinLoader())
                  : b.setStatus("error", {
                      message: translations.payment.somethingWentWrong,
                    });
            }
          if (!c && 0 < Object.keys(a.actions).length)
            for (var e in a.actions)
              if (a.actions.hasOwnProperty(e))
                switch (e) {
                  case "redirect":
                    window.location = a.actions.redirect;
                    break;
                  case "retry":
                    adyenDropin.renderErrors(a.errors),
                      adyenDropin.renderButton(a.actions.retry);
                    break;
                  default:
                }
        })
        .catch(function (a) {
          throw Error(a);
        });
    },
  };
  return {
    dropin: dropin,
    properties: g,
    makePayment: function makePayment(a) {
      return new Promise(function () {
        var b = document.querySelector(".alert--bold-error");
        b && (b.style.display = "none");
        var c = document.querySelector('input[name="bookingType"]') || "",
          d = document.querySelector("#package-id").value,
          e = document.querySelector("#arrival-date").value,
          f = document.getElementById("newsletter-signup").checked,
          g = document.querySelector(".payment-option.selected input"),
          h = document.querySelector("#organizer-slug").value,
          i = document.querySelector("#listing-slug").value,
          j = document.querySelector("#keep_reservation_payment").value;
        j = !("true" !== j);
        var k = document.querySelector("input#voucher-code"),
          l = !1,
          m = "",
          n = {},
          o = 0,
          p = 0;
        (g = null == g ? "full_amount" : g.value),
          "" == c
            ? ((m = document.querySelector('input[name="token"]').value),
              (o = document.querySelector("#payment_total_price").value),
              (p = document.querySelector("#payment_deposit_percentage").value),
              (n = {
                organizer_slug: h,
                listing_slug: i,
                arrival_date: e,
                package_id: +d,
                payment_method_type: g,
                payment_data: a.paymentMethod,
                redirection_url:
                  location.protocol + "//" + location.host + location.pathname,
                is_instant_booking: l,
                payment_method: "dropin",
                browser_info: trpPayment.getBrowserInfo(),
                token: m,
                is_preauthorisation: j,
                display_total_price: +o,
                display_deposit_percentage: +p,
                retry_url:
                  location.protocol + "//" + location.host + location.pathname,
                newsletters_sign_up: f,
              }))
            : ((l = !0),
              (n = {
                organizer_slug: h,
                listing_slug: i,
                arrival_date: e,
                package_id: +d,
                first_name: sessionStorage.getItem("customerDetailsFirstName"),
                last_name: sessionStorage.getItem("customerDetailsLastName"),
                email: sessionStorage.getItem("customerDetailsEmail"),
                note: sessionStorage.getItem("customerDetailsMessage"),
                payment_method_type: g,
                payment_data: a.paymentMethod,
                redirection_url:
                  location.protocol + "//" + location.host + location.pathname,
                is_instant_booking: l,
                payment_method: "dropin",
                browser_info: trpPayment.getBrowserInfo(),
                is_preauthorisation: j,
                newsletters_sign_up: f,
              })),
          k && (n.voucher = k.value);
        var q = {
          credentials: "same-origin",
          method: "POST",
          body: JSON.stringify(n),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        };
        fetch("/instant_payment", q)
          .then(function (a) {
            return a.json();
          })
          .then(function (a) {
            if (a.payment && "action" in a.payment.responseJSON)
              (skipCheck = !0),
                adyenDropin.showDropinLoader(),
                dropin.handleAction(a.payment.responseJSON.action);
            else if (
              (trpPayment.submitButton.isDoneLoading(paymentSubmitButton),
              paymentSubmitButton.previousElementSibling &&
                (paymentSubmitButton.previousElementSibling.disabled = !1),
              "errors" in a && 0 < Object.keys(a.errors).length
                ? (dropin.setStatus("error", {
                    message: translations.payment.somethingWentWrong,
                  }),
                  adyenDropin.renderErrors(a.errors),
                  adyenDropin.renderButton(a.actions.retry))
                : 0 < Object.keys(a.payment).length
                ? (trpPayment.submitButton.isDoneLoading(paymentSubmitButton),
                  "resultCode" in a.payment.responseJSON &&
                    "Authorised" == a.payment.responseJSON.resultCode &&
                    dropin.setStatus("success", {
                      message: translations.payment.paymentSuccesful,
                    }))
                : (adyenDropin.renderErrors(a.errors),
                  adyenDropin.renderButton(a.actions.retry)),
              0 < Object.keys(a.actions).length)
            )
              for (var b in a.actions)
                a.actions.hasOwnProperty(b) &&
                  ("redirect" === b
                    ? (window.location = a.actions.redirect)
                    : "retry" === b
                    ? adyenDropin.renderButton(a.actions.retry)
                    : console.log(b));
          })
          .catch(function (a) {
            throw Error(a);
          });
      });
    },
    makeDetailsCall: function makeDetailsCall(a) {
      return new Promise(function () {
        var b = document.querySelector('input[name="bookingType"]') || "",
          c = document.querySelector("#package-id").value,
          d = document.querySelector("#arrival-date").value,
          e = document.querySelector(".payment-option.selected input"),
          f = document.querySelector("#organizer-slug").value,
          g = document.querySelector("#listing-slug").value,
          h = !1,
          i = document.querySelector("#keep_reservation_payment").value;
        i = !("true" !== i);
        var j = "",
          k = {},
          l = 0,
          m = 0,
          n = document.querySelector("input#voucher-code");
        (e = null == e ? "full_amount" : e.value),
          "" == b
            ? ((j = document.querySelector('input[name="token"]').value),
              (l = document.querySelector("#payment_total_price").value),
              (m = document.querySelector("#payment_deposit_percentage").value),
              (k = {
                organizer_slug: f,
                listing_slug: g,
                arrival_date: d,
                package_id: +c,
                payment_method_type: e,
                additional_payment_data: a,
                redirection_url:
                  location.protocol + "//" + location.host + location.pathname,
                is_instant_booking: h,
                payment_method: "dropin",
                browser_info: trpPayment.getBrowserInfo(),
                token: j,
                is_preauthorisation: i,
                display_total_price: +l,
                display_deposit_percentage: +m,
                retry_url:
                  location.protocol + "//" + location.host + location.pathname,
              }))
            : ((h = !0),
              (k = {
                organizer_slug: f,
                listing_slug: g,
                arrival_date: d,
                package_id: +c,
                first_name: sessionStorage.getItem("customerDetailsFirstName"),
                last_name: sessionStorage.getItem("customerDetailsLastName"),
                email: sessionStorage.getItem("customerDetailsEmail"),
                note: sessionStorage.getItem("customerDetailsMessage"),
                payment_method_type: e,
                additional_payment_data: a,
                redirection_url:
                  location.protocol + "//" + location.host + location.pathname,
                is_instant_booking: h,
                payment_method: "dropin",
                browser_info: trpPayment.getBrowserInfo(),
                is_preauthorisation: i,
              })),
          n && (k.voucher = n.value);
        var o = {
          credentials: "same-origin",
          method: "POST",
          body: JSON.stringify(k),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        };
        fetch("/instant_payment", o)
          .then(function (a) {
            return a.json();
          })
          .then(function (a) {
            if (a.payment && "action" in a.payment.responseJSON)
              (skipCheck = !0),
                adyenDropin.showDropinLoader(),
                dropin.handleAction(a.payment.responseJSON.action);
            else if (
              (trpPayment.submitButton.isDoneLoading(paymentSubmitButton),
              paymentSubmitButton.previousElementSibling &&
                (paymentSubmitButton.previousElementSibling.disabled = !1),
              "errors" in a && 0 < Object.keys(a.errors).length
                ? (dropin.setStatus("error", {
                    message: translations.payment.somethingWentWrong,
                  }),
                  adyenDropin.renderErrors(a.errors),
                  adyenDropin.renderButton(a.actions.retry))
                : 0 < Object.keys(a.payment).length
                ? (trpPayment.submitButton.isDoneLoading(paymentSubmitButton),
                  "resultCode" in a.payment.responseJSON &&
                    "Authorised" == a.payment.responseJSON.resultCode &&
                    dropin.setStatus("success", {
                      message: translations.payment.paymentSuccesful,
                    }))
                : (adyenDropin.renderErrors(a.errors),
                  adyenDropin.renderButton(a.actions.retry)),
              0 < Object.keys(a.actions).length)
            )
              for (var b in a.actions)
                a.actions.hasOwnProperty(b) &&
                  ("redirect" === b
                    ? (window.location = a.actions.redirect)
                    : "retry" === b
                    ? adyenDropin.renderButton(a.actions.retry)
                    : console.log(b));
          })
          .catch(function (a) {
            throw Error(a);
          });
      });
    },
    postPayment: function postPayment(a, b) {
      return new Promise(function (c) {
        $.ajax({
          type: "POST",
          url: a,
          data: b,
        })
          .done(function (a) {
            c(a);
          })
          .fail(function (a) {
            document.body.innerHTML = a.responseText;
          });
      });
    },
    renderErrors: function renderErrors(a) {
      var b = document.querySelector("#drop"),
        c = document.createElement("div");
      for (var d in (c.setAttribute("class", "alert alert--bold-error"), a))
        c.innerHTML += "<p>".concat(a[d], "</p>");
      b.insertAdjacentHTML("afterbegin", c.outerHTML);
    },
    renderButton: function renderButton(a) {
      var b = document.querySelector("#dro"),
        c = document.createElement("button"),
        d = document.querySelector(".voucher-coverage");
      c.setAttribute("class", "reload-adyen bttn -large -outline"),
        (c.dataset.url = a || e),
        (c.innerHTML = translations.payment.retry),
        b.insertAdjacentHTML("beforeend", c.outerHTML),
        adyenDropin.hideDropinLoader(),
        trpPayment.submitButton.isDoneLoading(paymentSubmitButton),
        d && (d.style.display = "none");
    },
    renderContactUsButton: function renderContactUsButton(a) {
      var b = document.querySelector("#dr"),
        c = document.createElement("button");
      c.setAttribute("class", "reload-adyen bttn -large -outline"),
        (c.dataset.url = a),
        (c.innerHTML = translations.payment.contactUs),
        b.insertAdjacentHTML("beforeend", c.outerHTML),
        adyenDropin.hideDropinLoader();
    },
    retryPayment: function retryPayment(a) {
      window.location.href = a;
    },
    toggleFees: function toggleFees(a, b) {
      var c = document.querySelector("#is_from_eu").value,
        d = document.querySelector("#plus-transaction-fee"),
        e = document.querySelector("#plus-transation-fee-paypal"),
        f = document.querySelector("#plus-transation-fee-credit-card");
      null != d &&
        ("paypal" === a
          ? ((d.style.display = "block"),
            (f.style.display = "none"),
            (e.style.display = "block"),
            (d.querySelector("#plus-transation-fee-paypal .type").innerHTML =
              b))
          : "card" === a
          ? "true" == c ||
            ((d.style.display = "block"),
            (e.style.display = "none"),
            (f.style.display = "block"),
            (d.querySelector(
              "#plus-transation-fee-credit-card .type"
            ).innerHTML = b))
          : ((d.style.display = "none"),
            (e.style.display = "none"),
            (f.style.display = "none")));
    },

  };
})();
$(function () {
  $(".pre-payment-form-container").length &&
    ($('input[name="prepayment-selected"]').change(function () {
      $(this).is(":checked")
        ? ($(".js-hide-on-pre-payment").slideUp(),
          $(".js-show-on-pre-payment").slideDown())
        : ($(".js-hide-on-pre-payment").slideDown(),
          $(".js-show-on-pre-payment").slideUp());
    }),
    $('input[name="prepayment-selected"]').is(":checked") &&
      ($(".js-hide-on-pre-payment").hide(),
      $(".js-show-on-pre-payment").show())),
    $(".js-instant-payment-form").length &&
      ("instant" == $('input[name="js-prepayment-button"]').val()
        ? $(".prepayment-selected").val("on")
        : $(".prepayment-selected").val("off"),
      $('input[name="js-prepayment-button"]').change(function () {
        $("#prepayment-not-selected").is(":checked")
          ? ($(".prepayment-selected").val("off"),
            $(".js-hide-on-pre-payment").slideDown(),
            $(".js-show-on-pre-payment").slideUp())
          : ($(".prepayment-selected").val("on"),
            $(".js-hide-on-pre-payment").slideUp(),
            $(".js-show-on-pre-payment").slideDown());
      }),
      $('input[name="prepayment-selected"]').is(":checked") &&
        ($(".js-hide-on-pre-payment").hide(),
        $(".js-show-on-pre-payment").show())),
    $(".prepayment-toggle-buttons").length &&
      $('.prepayment-toggle-buttons input[type="radio"]').change(function () {
        $(this)
          .parents(".prepayment-toggle-buttons")
          .find("label")
          .removeClass("active"),
          $(this)
            .parents(".prepayment-toggle-buttons")
            .find('input[type="radio"]')
            .attr("checked", !1),
          $(this).parent("label").addClass("active"),
          $(this).attr("checked", !0);
      });
});
$(function () {
  $("[data-showmore-items-limit]").length &&
    ($("[data-showmore-items-limit]").each(function () {
      var a = $(this).children(),
        b = $(this).attr("data-showmore-items-limit");
      if (!(b >= a.length)) {
        var c = $('<p class="show-all bttn bttn--outline"></p>'),
          d = $(this).attr("data-showmore-text")
            ? $(this).attr("data-showmore-text")
            : "Show more",
          e = $(this).attr("data-showless-text")
            ? $(this).attr("data-showless-text")
            : "Show less";
        $(c).append(d), $(this).addClass("collapsed");
        for (var f = 0; f < a.length; f++)
          f >= b && a[f].classList.add("hidden");
        c.insertAfter($(this));
      }
    }),
    $(".show-all").click(function () {
      var a = $(this).prev(),
        b = $(this).prev().children(),
        c = a.attr("data-showmore-items-limit"),
        d = a.attr("data-showmore-text")
          ? a.attr("data-showmore-text")
          : "Show more",
        e = a.attr("data-showless-text")
          ? a.attr("data-showless-text")
          : "Show less";
      if (a.hasClass("collapsed")) {
        a.removeClass("collapsed"), a.addClass("expanded"), $(this).text(e);
        for (var f = 0; f < b.length; f++) b[f].classList.remove("hidden");
      } else {
        a.removeClass("expanded"), a.addClass("collapsed"), $(this).text(d);
        for (var f = 0; f < b.length; f++)
          f >= c && b[f].classList.add("hidden");
      }
    }));
});
$(function () {
  1 != +Cookies.get("mc_howtobook") && $(".mc_howtobook").removeClass("hidden");
  $('.mc_howtobook:not(".hidden")').each(function () {
    $(this)
      .find(".mc__input_button")
      .click(function () {
        var a = $(this).closest(".mc__wrapper").find(".mc__input_field"),
          b = $(a).val();
        if (validateEmail(b)) {
          $.ajax({
            type: "POST",
            url: "/ufl-subscribe",
            data: {
              email: b,
            },
            async: !0,
          }),
            fbq("track", "CompleteRegistration");
          var c = $(this)
            .closest("[data-tracking-id]")
            .attr("data-tracking-id");
          gae("marketing", c + "--subscribed");
          var d = window.open(
            "/static/rebrand/How to Book a Yoga Retreat.pdf",
            "_blank"
          );
          d.focus();
          var e = $(this)
            .closest("[data-transtag-success]")
            .attr("data-transtag-success");
          $(this)
            .closest(".mc__form_wrapper")
            .html('<div class="mc__title">' + e + "</div>"),
            Cookies.set("mc_howtobook", 1);
        } else
          $(a).css("background-color", "#FFEBE9").css("color", "red"),
            $(a).on("change keyup", function () {
              $(this).css("background-color", "").css("color", "");
            });
      }),
      $(this)
        .find(".mc__input_field")
        .keyup(function (a) {
          var b = a.keyCode || a.which;
          13 == b &&
            $(this).closest(".mc__wrapper").find(".mc__input_button").click();
        });
  }),
    setTimeout(function () {
      $('.mc_howtobook[data-tracking-id]:not(".hidden")').each(function () {
        var a = $(this).closest("[data-tracking-id]").attr("data-tracking-id");
        gae("marketing", a + "--loaded"),
          (window.mc_visibility_interval = window.mc_visibility_interval || []),
          (window.mc_visibility_interval[a] = setInterval(function () {
            var b = $('[data-tracking-id="' + a + '"]'),
              c = $(b).offset().top,
              d = $(b).offset().top + $(b).outerHeight(),
              e = $(window).scrollTop() + window.innerHeight,
              f = $(window).scrollTop();
            e > c &&
              f < d &&
              (gae("marketing", a + "--seen"),
              clearInterval(window.mc_visibility_interval[a]));
          }, 500));
      });
    }, 1e3);
});

function validateEmail(a) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    (a + "").toLowerCase()
  );
}
$(function () {
  function a(a, b, c) {
    a.addEventListener
      ? a.addEventListener(b, c, !1)
      : a.attachEvent && a.attachEvent("on" + b, c);
  }
  (isIndexPage || isTopicPage) &&
    !isSubscriber &&
    a(window, "load", function () {
      a(document, "mouseout", function (a) {
        a = a ? a : window.event;
        var b = 1 == $("body").data("showModalWhenLeavingWindow"),
          c = a.relatedTarget || a.toElement;
        b &&
          (!c || "HTML" == c.nodeName) &&
          a.pageY < jQuery(window).scrollTop() &&
          ($("#subscribe_modal").length
            ? "function" == typeof $("#subscribe_modal").modal
              ? $("#subscribe_modal").modal()
              : (console.warn(
                  'The "_subscribe_modal" element does not have a "modal" method.'
                ),
                gae("jsWarning", "noModal-methodNotFound"))
            : (console.warn('No "subscribe_modal" element found.'),
              gae("jsWarning", "noModal-elementNotFound")));
      });
    });
  var b = document.querySelector("#newsletter_subscribe"),
    c = "";
  null != b && (c = b.value),
    $("#subscribe_modal").on("hide", function () {
      $.post("/disable_modal", function () {}),
        $("body").data("showModalWhenLeavingWindow", 0);
    });
  "undefined" != typeof isIndexPage &&
    "undefined" != typeof isTopicPage &&
    (isIndexPage || isTopicPage) &&
    !0 === window.localStorageStatus &&
    !isSubscriber &&
    0 == $("body").data("showModalWhenLeavingWindow") &&
    ("true" == c
      ? null == localStorage.getItem("newletterSubscription") &&
        ($("#subscribe_modal").modal("show"),
        localStorage.setItem("newletterSubscription", !0))
      : setInterval(function () {
          var a = Math.floor;
          try {
            if (null == localStorage.getItem("corner"))
              localStorage.setItem("corner", 0);
            else if (
              300 < a(Date.now() / 1e3) - +localStorage.getItem("corner") &&
              window.matchMedia("all and (min-width: 768px)").matches
            ) {
              var b = $(".js-subscribe-corner"),
                c = $(".js-subscribe-signup"),
                d = $(".js-subscribe-corner-close");
              clearInterval(e);
              var e = setInterval(function () {
                1e3 < $(document).scrollTop() &&
                  (localStorage.setItem("corner", a(Date.now() / 1e3)),
                  clearInterval(e),
                  setTimeout(function () {
                    b.removeClass("hide");
                  }, 500));
              }, 1e3);
              c.click(function () {
                $("#subscribe_modal").modal("show"), b.addClass("hide");
              }),
                d.click(function () {
                  b.addClass("hide"),
                    localStorage.setItem("corner", a(Date.now() / 1e3) + 600);
                });
            }
          } catch (a) {
            if ("SecurityError" === a.name)
              console.warn(
                "Could not save to localStorage due to security settings."
              ),
                gae("jsWarning", "localStorage-SecurityError");
            else throw a;
          }
        }, 1e3));
});
var trustpilotOverview = {
    reviews: 481,
    rating: "Great",
    stars: 4,
    score: 8.8,
    split: {
      Excellent: 83,
      Great: 7,
      Average: 1,
      Poor: 1,
      Bad: 7,
    },
  },
  trustpilotLogo =
    '<svg class="tp_logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 516.085 58.186"><style>.c2{fill:#f9a220}.c3{fill:url(#SVGID_1_)}.c4{opacity:.5;fill:url(#SVGID_2_)}.c5{fill:url(#SVGID_3_)}.c8{fill:#929497}.dark .c6{fill:#fff}</style><g id="Logo"><path class="c6" d="M119.272 3.316c0 .558-.029 1.059-.088 1.472-.068.425-.161.757-.296 1.012a1.5 1.5 0 0 1-.487.558 1.243 1.243 0 0 1-.655.177h-16.289v50.214c0 .245-.063.449-.181.63-.119.178-.33.322-.626.423a7.134 7.134 0 0 1-1.184.275c-.494.064-1.113.11-1.856.11-.715 0-1.329-.047-1.836-.11a7.14 7.14 0 0 1-1.213-.275c-.296-.101-.5-.245-.622-.423a1.107 1.107 0 0 1-.178-.63V6.534H77.464c-.238 0-.449-.058-.648-.177a1.317 1.317 0 0 1-.466-.558c-.122-.254-.219-.587-.296-1.012a8.8 8.8 0 0 1-.106-1.472c0-.57.034-1.07.106-1.5.077-.438.174-.787.296-1.054.119-.263.275-.462.466-.584A1.28 1.28 0 0 1 77.464 0h40.282c.241 0 .456.064.655.178.187.122.352.322.487.584.135.266.228.616.296 1.054.059.43.088.929.088 1.5zm49.414 53.432c0 .245-.042.449-.144.63-.084.178-.275.331-.575.439-.301.127-.714.211-1.252.277a20.77 20.77 0 0 1-2.149.092c-.778 0-1.412-.034-1.903-.092-.49-.065-.885-.161-1.184-.294a1.527 1.527 0 0 1-.694-.561 3.281 3.281 0 0 1-.431-.898l-5.32-13.648a52.507 52.507 0 0 0-1.946-4.273c-.673-1.294-1.472-2.411-2.398-3.357a9.792 9.792 0 0 0-3.265-2.188c-1.252-.524-2.757-.786-4.517-.786h-5.152v24.657a.99.99 0 0 1-.203.63c-.135.178-.338.322-.626.423a6.48 6.48 0 0 1-1.158.275 14.56 14.56 0 0 1-1.862.11c-.744 0-1.361-.047-1.852-.11a7.172 7.172 0 0 1-1.193-.275c-.296-.101-.498-.245-.626-.423a1.144 1.144 0 0 1-.173-.63V3.138c0-1.167.301-1.979.918-2.444.609-.46 1.255-.694 1.944-.694h12.304c1.463 0 2.681.043 3.65.114.968.069 1.843.161 2.618.251 2.237.384 4.212.997 5.93 1.831 1.714.833 3.156 1.891 4.323 3.18a12.81 12.81 0 0 1 2.614 4.407c.583 1.649.872 3.482.872 5.478 0 1.947-.263 3.68-.787 5.219-.519 1.532-1.268 2.889-2.254 4.069a14.936 14.936 0 0 1-3.536 3.067c-1.37.87-2.91 1.597-4.614 2.194a10.79 10.79 0 0 1 2.601 1.582 14.124 14.124 0 0 1 2.17 2.306c.668.901 1.302 1.93 1.908 3.101a50.655 50.655 0 0 1 1.785 3.937l5.19 12.748c.419 1.075.685 1.833.808 2.259.111.435.179.768.179 1.005zm-11.594-40.68c0-2.267-.508-4.187-1.523-5.752-1.015-1.561-2.716-2.691-5.101-3.376-.749-.21-1.59-.357-2.529-.452-.943-.089-2.17-.131-3.693-.131h-6.492v19.515h7.521c2.03 0 3.776-.251 5.261-.741 1.476-.496 2.707-1.18 3.688-2.061a8.044 8.044 0 0 0 2.174-3.108c.462-1.192.694-2.493.694-3.894zm63.173 20.15c0 3.463-.498 6.557-1.514 9.272-1.011 2.723-2.458 5.016-4.344 6.897-1.878 1.878-4.17 3.299-6.873 4.268-2.694.978-5.769 1.461-9.203 1.461-3.148 0-6.006-.456-8.595-1.367-2.579-.909-4.8-2.253-6.653-4.034-1.849-1.777-3.27-4.006-4.268-6.667-.998-2.676-1.497-5.76-1.497-9.249V1.413c0-.237.055-.437.173-.622.118-.174.325-.312.613-.414a6.39 6.39 0 0 1 1.151-.263c.466-.077 1.083-.114 1.849-.114.706 0 1.307.037 1.806.114.495.069.888.161 1.167.263.275.102.478.24.597.414.118.185.177.385.177.622v34.45c0 2.648.321 4.952.965 6.916.651 1.971 1.582 3.607 2.799 4.913a11.54 11.54 0 0 0 4.408 2.955c1.713.658 3.646.993 5.795.993 2.199 0 4.161-.318 5.874-.976 1.725-.64 3.176-1.608 4.37-2.902 1.188-1.296 2.094-2.897 2.723-4.81.639-1.898.952-4.131.952-6.689V1.413a1.1 1.1 0 0 1 .178-.622c.118-.174.322-.312.613-.414a6.463 6.463 0 0 1 1.167-.263c.486-.077 1.1-.114 1.832-.114.706 0 1.298.037 1.78.114a5.78 5.78 0 0 1 1.146.263c.284.102.486.24.621.414.132.185.191.385.191.622v34.805zm43.425 5.257c0 2.657-.495 5.018-1.468 7.082a15.214 15.214 0 0 1-4.057 5.255c-1.733 1.444-3.772 2.53-6.115 3.258-2.348.724-4.864 1.092-7.576 1.092-1.895 0-3.645-.157-5.256-.488-1.62-.316-3.059-.705-4.327-1.174-1.265-.466-2.331-.944-3.189-1.438-.858-.496-1.45-.915-1.781-1.266-.343-.35-.592-.799-.748-1.331-.161-.541-.242-1.264-.242-2.166 0-.638.029-1.167.089-1.59.055-.423.144-.767.262-1.029.114-.262.262-.443.431-.546.177-.101.385-.151.613-.151.406 0 .985.251 1.726.741.744.498 1.695 1.04 2.863 1.614 1.163.589 2.568 1.135 4.208 1.633 1.646.512 3.545.77 5.698.77 1.628 0 3.126-.211 4.479-.655 1.353-.439 2.518-1.057 3.498-1.853a8.184 8.184 0 0 0 2.245-2.947c.516-1.163.778-2.487.778-3.972 0-1.606-.363-2.977-1.082-4.107-.732-1.137-1.688-2.132-2.885-2.992a25.185 25.185 0 0 0-4.086-2.354 1099.15 1099.15 0 0 0-4.69-2.186 48.416 48.416 0 0 1-4.674-2.467 19.698 19.698 0 0 1-4.057-3.185c-1.197-1.223-2.166-2.661-2.91-4.301-.741-1.642-1.112-3.617-1.112-5.913 0-2.364.431-4.462 1.294-6.31a12.85 12.85 0 0 1 3.577-4.653c1.528-1.248 3.347-2.208 5.458-2.859 2.105-.66 4.389-.986 6.83-.986 1.253 0 2.508.114 3.781.325 1.261.221 2.457.516 3.577.876 1.122.364 2.117.774 2.995 1.218.863.452 1.447.82 1.718 1.1.28.275.461.49.545.651.094.161.166.368.221.61.058.249.106.546.131.9.029.347.05.796.05 1.345 0 .529-.03.994-.072 1.401-.039.41-.11.757-.199 1.032-.085.27-.212.482-.369.609a.866.866 0 0 1-.544.198c-.327 0-.82-.207-1.511-.617a50.947 50.947 0 0 0-2.508-1.375c-.99-.509-2.166-.969-3.511-1.396-1.358-.418-2.881-.635-4.568-.635-1.568 0-2.94.217-4.102.635-1.163.427-2.128.99-2.88 1.678a6.733 6.733 0 0 0-1.705 2.487 8.38 8.38 0 0 0-.567 3.063c0 1.569.364 2.919 1.092 4.06.728 1.137 1.695 2.141 2.901 3.011a25.893 25.893 0 0 0 4.129 2.397c1.543.728 3.117 1.468 4.715 2.214a61.558 61.558 0 0 1 4.716 2.439 20.155 20.155 0 0 1 4.132 3.144 14.43 14.43 0 0 1 2.914 4.284c.753 1.646 1.125 3.583 1.125 5.82zm47.812-38.167c0 .566-.03 1.057-.089 1.468-.064.419-.156.76-.291 1.01a1.38 1.38 0 0 1-.492.558 1.184 1.184 0 0 1-.649.177H293.72v50.13c0 .238-.058.449-.181.623-.116.181-.327.325-.624.43a6.774 6.774 0 0 1-1.183.262c-.496.077-1.114.116-1.853.116-.719 0-1.332-.039-1.831-.116a6.644 6.644 0 0 1-1.206-.262c-.3-.105-.507-.249-.629-.43a1.107 1.107 0 0 1-.179-.623V6.521h-16.261c-.236 0-.453-.054-.648-.177a1.245 1.245 0 0 1-.469-.558 4.477 4.477 0 0 1-.293-1.01 8.601 8.601 0 0 1-.113-1.468c0-.563.041-1.071.113-1.492.078-.438.179-.791.293-1.054.119-.263.275-.462.469-.584.196-.114.412-.178.648-.178h40.208c.238 0 .458.064.649.178.19.122.364.322.492.584.135.263.227.616.291 1.054.059.422.089.929.089 1.492z"></path><path class="c8" d="M356.234 16.96c0 2.897-.477 5.507-1.438 7.838-.958 2.326-2.317 4.314-4.095 5.947-1.773 1.646-3.951 2.915-6.535 3.808-2.581.898-5.654 1.341-9.243 1.341h-6.575v20.855c0 .245-.073.449-.204.63-.135.178-.341.322-.625.423a6.36 6.36 0 0 1-1.169.275c-.485.064-1.106.11-1.851.11-.744 0-1.367-.047-1.852-.11a6.825 6.825 0 0 1-1.193-.275c-.303-.101-.508-.245-.626-.423a1.085 1.085 0 0 1-.179-.63V3.316c0-1.193.313-2.042.94-2.554.627-.508 1.323-.762 2.106-.762h12.393c1.258 0 2.454.051 3.607.161 1.145.101 2.508.325 4.065.669 1.57.342 3.169.987 4.797 1.924a15.14 15.14 0 0 1 4.136 3.468c1.138 1.374 2.009 2.96 2.618 4.767.613 1.806.923 3.794.923 5.971zm-8.104.626c0-2.356-.44-4.322-1.324-5.899-.876-1.583-1.966-2.767-3.265-3.541-1.299-.774-2.64-1.269-4.023-1.475a28.007 28.007 0 0 0-4.056-.313h-7.114v23.224h6.937c2.326 0 4.259-.299 5.793-.896 1.536-.6 2.829-1.418 3.87-2.48 1.044-1.06 1.838-2.326 2.378-3.802.533-1.476.804-3.084.804-4.818zm26.316 39.125c0 .236-.058.447-.178.621s-.326.318-.626.419c-.296.107-.684.194-1.179.271-.482.073-1.104.107-1.844.107-.711 0-1.32-.034-1.823-.107-.508-.077-.91-.165-1.201-.271-.296-.101-.508-.245-.627-.419a1.118 1.118 0 0 1-.174-.621V1.426c0-.241.068-.45.195-.626.135-.174.355-.318.672-.415a6.626 6.626 0 0 1 1.197-.271A12.458 12.458 0 0 1 370.619 0c.74 0 1.361.043 1.844.114.495.069.884.165 1.179.271.3.097.507.241.626.415.12.176.178.384.178.626v55.285zm44.254-1.878c0 .587-.026 1.09-.084 1.492-.061.402-.157.754-.297 1.032-.13.282-.291.496-.486.621-.19.136-.422.208-.698.208h-25.602c-.685 0-1.327-.232-1.941-.698-.609-.462-.914-1.277-.914-2.44V1.434c0-.237.052-.449.175-.626.123-.178.329-.322.622-.423a6.647 6.647 0 0 1 1.215-.271A13.257 13.257 0 0 1 392.527 0c.741 0 1.358.043 1.852.114.495.073.885.165 1.185.271.299.101.508.245.626.423.122.178.182.39.182.626v50.081h20.763c.276 0 .508.067.698.204.195.131.356.327.486.58.14.254.237.587.297 1.01.058.415.084.922.084 1.524zm52.438-26.458c0 4.552-.54 8.668-1.615 12.331-1.075 3.658-2.681 6.772-4.818 9.347-2.132 2.566-4.813 4.543-8.035 5.923-3.223 1.382-6.992 2.07-11.285 2.07-4.243 0-7.912-.63-11.006-1.889-3.091-1.27-5.654-3.104-7.673-5.521-2.017-2.407-3.523-5.401-4.509-8.975-.987-3.576-1.489-7.686-1.489-12.33 0-4.445.545-8.481 1.616-12.122 1.074-3.626 2.69-6.715 4.843-9.259 2.149-2.546 4.835-4.499 8.063-5.88C438.457.694 442.212 0 446.513 0c4.154 0 7.77.626 10.853 1.874 3.074 1.252 5.639 3.075 7.691 5.468 2.045 2.399 3.567 5.363 4.571 8.89 1.002 3.529 1.51 7.576 1.51 12.143zm-7.93.522c0-3.198-.288-6.168-.851-8.917-.57-2.74-1.515-5.122-2.833-7.144-1.318-2.016-3.084-3.598-5.287-4.731-2.205-1.126-4.936-1.696-8.185-1.696-3.248 0-5.977.612-8.184 1.83-2.204 1.223-3.994 2.843-5.372 4.878-1.382 2.038-2.366 4.413-2.96 7.125-.597 2.721-.892 5.575-.892 8.565 0 3.312.274 6.362.828 9.158.55 2.779 1.481 5.186 2.782 7.202 1.309 2.023 3.059 3.596 5.247 4.709 2.189 1.12 4.939 1.679 8.255 1.679 3.273 0 6.031-.61 8.268-1.833 2.229-1.221 4.031-2.863 5.394-4.943 1.36-2.081 2.335-4.485 2.913-7.207.58-2.732.877-5.627.877-8.675zm52.877-25.581c0 .558-.03 1.059-.093 1.472-.055.425-.156.757-.293 1.012-.132.25-.295.436-.487.558a1.212 1.212 0 0 1-.646.177h-16.287v50.214c0 .245-.064.449-.192.63-.113.178-.321.322-.62.423-.3.103-.693.198-1.189.275-.485.064-1.108.11-1.858.11a14.82 14.82 0 0 1-1.831-.11 6.953 6.953 0 0 1-1.208-.275c-.298-.101-.508-.245-.625-.423a1.1 1.1 0 0 1-.18-.63V6.534h-16.3c-.229 0-.444-.058-.639-.177a1.322 1.322 0 0 1-.476-.558 4.487 4.487 0 0 1-.289-1.012 8.267 8.267 0 0 1-.11-1.472c0-.57.034-1.07.11-1.5a4.94 4.94 0 0 1 .289-1.054c.121-.263.281-.462.476-.584.195-.113.41-.177.639-.177h40.289c.238 0 .45.064.646.178.193.122.355.322.487.584.137.266.237.616.293 1.054.064.43.094.929.094 1.5z"></path><path class="c2" d="M0 .012v25.665s19.433 9.25 29.297 25.788c0 0 4.352-36.523 28.785-51.453H0z"></path><linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="29.041" y1="58.186" x2="29.041" y2="25.006"><stop offset="0" stop-color="#e37a27"></stop><stop offset=".472" stop-color="#f9a220"></stop></linearGradient><path class="c3" d="M0 46.824v11.363h26.11c0-.001-9.947-10.593-26.11-11.363zm33.118 11.362h24.964v-33.18c-14.128 3.827-24.964 33.18-24.964 33.18z"></path><linearGradient id="SVGID_2_" gradientUnits="userSpaceOnUse" x1="28.926" y1="22.669" x2="28.926" y2=".394"><stop offset="0" stop-color="#fff"></stop><stop offset="1" stop-color="#f9a220"></stop></linearGradient><path class="c4" d="M.388.401L57.465.395s-9.366 3.308-19.46 21.915c0 0-22.076 2.246-37.564-4.496L.388.401z"></path><linearGradient id="SVGID_3_" gradientUnits="userSpaceOnUse" x1="29.041" y1=".242" x2="29.041" y2="57.957"><stop offset="0" stop-color="#4a484a"></stop><stop offset="1"></stop></linearGradient><path class="c5" d="M29.297 51.466C19.433 34.927 0 25.677 0 25.677v21.146c16.128.794 26.11 11.363 26.11 11.363h7.008s10.836-29.353 24.964-33.18V.012l-.074.045C33.641 15.015 29.297 51.466 29.297 51.466z"></path></g></svg>';
$(function () {
  if ($(".trustpilot_lp").length) {
    var a = "";
    for (var b in trustpilotOverview.split)
      a +=
        '\n\t\t\t\t<div class="review-stat-item">\n\t\t\t\t\t<span class="review-stat-title">\n\t\t\t\t\t\t<span class="review-stat-value">' +
        trustpilotOverview.split[b] +
        "%</span>" +
        b +
        " (" +
        trustpilotOverview.split[b] +
        '%)</span>\n\t\t\t\t\t\t<div class="review-stat-bar">\n\t\t\t\t\t\t\t<div class="review-stat-progress" style="width:' +
        trustpilotOverview.split[b] +
        '%;">\n\t\t\t\t\t\t\t<div class="review-stat-progress-color"></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t';
    $(".trustpilot_lp").append(
      '\n\t\t\t<a href="https://www.trustpilot.com/review/bookyogaretreats.com" target="_blank" class="card trustpilot_lp_card border-box" rel="noopener">\n\t\t\t\t<div class="tplp_intro_wrapper">\n\t\t\t\t\t<div class="tplp_row">\n\t\t\t\t\t\t<div data-track-click="{\'name\': \'Company star rating\'}" class="star-rating-container">\n\t\t\t\t\t\t\t<div class="star-rating star-rating-4">\n\t\t\t\t\t\t\t\t<div class="star-item star-item--color">\n\t\t\t\t\t\t\t\t\t<img src="https://cdn.trustpilot.net/brand-assets/1.3.0/single-star-transparent.svg" data-stars="1" alt="Star 1" width="20" height="20">\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class="star-item star-item--color">\n\t\t\t\t\t\t\t\t\t<img src="https://cdn.trustpilot.net/brand-assets/1.3.0/single-star-transparent.svg" data-stars="2" alt="Star 2" width="20" height="20">\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class="star-item star-item--color">\n\t\t\t\t\t\t\t\t\t<img src="https://cdn.trustpilot.net/brand-assets/1.3.0/single-star-transparent.svg" data-stars="3" alt="Star 3" width="20" height="20">\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class="star-item star-item--color">\n\t\t\t\t\t\t\t\t\t<img src="https://cdn.trustpilot.net/brand-assets/1.3.0/single-star-transparent.svg" data-stars="4" alt="Star 4" width="20" height="20">\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class="star-item star-item--color">\n\t\t\t\t\t\t\t\t\t<img src="https://cdn.trustpilot.net/brand-assets/1.3.0/single-star-transparent.svg" data-stars="5" alt="Star 5" width="20" height="20">\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="tplp_row">\n\t\t\t\t\t\t<div class="tplp_score" style="margin-bottom: -3px;">BookYogaRetreats.com is rated ' +
        trustpilotOverview.score +
        ' out of 10</div>\n\t\t\t\t\t\t<div class="tplp_score">based on <span>' +
        trustpilotOverview.reviews +
        ' reviews</span> on <img src="https://cdn.trustpilot.net/brand-assets/1.1.0/logo-black.svg" width="64" style="display: inline-block; vertical-align: -3px; height: auto;" /></div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div id="review_summary_side" class="reviews-section">\n\t\t\t\t\t<div class="review-stats">\n\t\t\t\t\t\t' +
        a +
        "\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</a>\n\t\t"
    );
  }
});
$(function () {
  if (
    ("undefined" != typeof tpHeroVideo &&
      (1440 < $(window).width()
        ? ((tpHeroVideoName = tpHeroVideoName_fullhd),
          (tpHeroVideoThumb = tpHeroVideoThumb_fullhd))
        : 1025 < $(window).width()
        ? ((tpHeroVideoName = tpHeroVideoName_hd),
          (tpHeroVideoThumb = tpHeroVideoThumb_hd))
        : ((tpHeroVideoName = tpHeroVideoName_mobile),
          (tpHeroVideoThumb = tpHeroVideoThumb_mobile)),
      1025 < $(window).width() &&
        ($(".tp_video_hero .hero-background-container").append(
          '\n\t\t\t\t<div class="video_hero" style="display:none;">\n\t\t\t\t\t<video autoplay loop defaultMuted muted width=\'100%\' height=\'100%\' poster="' +
            tpHeroVideoThumb +
            '" src="' +
            tpHeroVideoName +
            '" preload="auto" type=\'video/mp4\'></video>\n\t\t\t\t</div>\n\t\t\t'
        ),
        $(".video_hero video").each(function () {
          gae("topicPage", "videoHero__init"),
            $(this).on("play", function () {
              gae("topicPage", "videoHero__play");
            });
        }),
        $("body").data("showModalWhenLeavingWindow", 0),
        $(".hero-background").removeClass("zoom-in"),
        $(".video_hero").delay(3).fadeIn(500),
        1025 > $(window).width() &&
          $(".search__hero .box-container").addClass(
            "box-container--expanded"
          ))),
    1024 < $(window).width() &&
      $(".tp_video_hero").length &&
      "undefined" == typeof tpHeroVideo)
  ) {
    var a = $("[data-video-prefix]").attr("data-video-prefix");
    if ("undefined" != typeof a) {
      var b = a + "_1440.mp4";
      if (1440 < $(window).width()) var b = a + "_1920.mp4";
      gae("ufl", "index__init--" + b),
        $(".tp_video_hero .hero-background-container").append(
          '\n\t\t\t\t<div class="video_hero" style="display:none;">\n\t\t\t\t\t<video autoplay loop defaultMuted muted width=\'100%\' height=\'100%\' poster="' +
            a +
            '_still.jpg" src="' +
            b +
            '" preload="auto" type=\'video/mp4\'></video>\n\t\t\t\t</div>\n\t\t\t'
        ),
        $(".video_hero video").each(function () {
          gae("topicPage", "videoHero__init"),
            $(this).on("play", function () {
              gae("topicPage", "videoHero__play");
            });
        }),
        $("body").data("showModalWhenLeavingWindow", 0),
        $(".video_hero").delay(3).fadeIn(500);
    }
  }
});
(function (b) {
  b.extend(b, {
    belowthefold: function belowthefold(a, c) {
      var d = b(window).height() + b(window).scrollTop();
      return d <= b(a).offset().top - c.threshold;
    },
    abovethetop: function abovethetop(a, c) {
      var d = b(window).scrollTop();
      return d >= b(a).offset().top + b(a).height() - c.threshold;
    },
    rightofscreen: function rightofscreen(a, c) {
      var d = b(window).width() + b(window).scrollLeft();
      return d <= b(a).offset().left - c.threshold;
    },
    leftofscreen: function leftofscreen(a, c) {
      var d = b(window).scrollLeft();
      return d >= b(a).offset().left + b(a).width() - c.threshold;
    },
    inviewport: function inviewport(a, c) {
      return (
        !b.rightofscreen(a, c) &&
        !b.leftofscreen(a, c) &&
        !b.belowthefold(a, c) &&
        !b.abovethetop(a, c)
      );
    },
  }),
    b.extend(b.expr[":"], {
      "below-the-fold": function belowTheFold(c) {
        return b.belowthefold(c, {
          threshold: 0,
        });
      },
      "above-the-top": function aboveTheTop(c) {
        return b.abovethetop(c, {
          threshold: 0,
        });
      },
      "left-of-screen": function leftOfScreen(c) {
        return b.leftofscreen(c, {
          threshold: 0,
        });
      },
      "right-of-screen": function rightOfScreen(c) {
        return b.rightofscreen(c, {
          threshold: 0,
        });
      },
      "in-viewport": function inViewport(c) {
        return b.inviewport(c, {
          threshold: 0,
        });
      },
    });
})(jQuery);

function receipt_field(a, b) {
  return (
    '<div class="receipt_field_wrapper"><div class="receipt_field_name">' +
    a +
    '</div><div class="receipt_field_price">' +
    b +
    "</div></div>"
  );
}

function formatCurrency(a) {
  return a && a.toString
    ? selectedCurrencyFormat.replace(
        "{amount}",
        a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      )
    : selectedCurrencyFormat.replace("{amount}", void 0);
}

function receipt_update() {
  var a = Math.round;
  if ($("#receipt_with_fees").length) {
    var b = $(".package-selection-item:checked").parent().parent();
    $(b).find('[data-id="0"]').length
      ? $("#receipt_with_fees").hide()
      : $("#receipt_with_fees").show();
    var c = $(b).find(".price").attr("data-price");
    $("#receipt_pack").html(
      receipt_field(
        $(b).find(".package-attribute:nth-of-type(1)").text().trim() +
          "</br>" +
          $(b).find(".package-attribute:nth-of-type(2)").text().trim(),
        formatCurrency(c)
      )
    ),
      $("#receipt_with_fees #receipt_final .receipt_field_price").text(
        formatCurrency(a(c) + a(0 * c))
      );
  }
}
(function () {
  $("#receipt_with_fees").length && receipt_update();
  var a = document.querySelector(".reservation-submit");
  a &&
    document.addEventListener("click", function (b) {
      if (b.target.classList.contains("reservation-submit")) {
        b.preventDefault(), a.classList.add("is-loading"), (a.disabled = !0);
        var c = document.querySelector("#reservation-form");
        if (validation.hasFormErrors("#reservation-form"))
          return a.classList.remove("is-loading"), (a.disabled = !1), !1;
        c.submit();
      }
    }),
    document.addEventListener("focusout", function (a) {
      a.target.matches("#reservation-form .simple-validation .form-control") &&
        validation.simpleValidation(a.target, ".simple-validation"),
        a.target.matches("#reservation-form .email-validation .form-control") &&
          validation.emailValidation(a.target, ".email-validation");
    });
})();
$(function () {
  $("#lp_variable_duration_select").change(function () {
    $("#duration_in_days")
      .val(parseInt($("#lp_variable_duration_select").val()))
      .change(),
      gae("listingPage", "duration_select");
  }),
    $("#duration_in_days").change(function () {
      var a = parseInt($("#duration_in_days").val()),
        b = $("#lp_variable_duration_select");
      if (0 < b.length)
        if (b.attr("data-transtag")) {
          var c = b.attr("data-transtag"),
            d = c.replace("DAYS", a).replace("NIGHTS", a - 1);
          $(".js-insert-duration").html(d),
            $("#lp_variable_duration_select").val(a);
        } else
          console.warn(
            "data-transtag attribute could not be found on #lp_variable_duration_select element."
          ),
            gae(
              "jsWarning",
              "lp_variable_duration_select.data-transtag-noAttribute"
            );
    }),
    $("#listing_query_arrival_date").change(function () {
      $("#duration_in_days").change();
    }),
    $("#duration_in_days_plus").click(function () {
      var a = parseInt($("#duration_in_days").val()),
        b = parseInt($("#duration_in_days_original").val());
      $("#duration_in_days")
        .val(parseInt($("#lp_variable_duration_select").val()))
        .change(),
        a < 2 * b &&
          $("#duration_in_days")
            .val(a + 1)
            .change();
      gae("listingPage", "duration_plus");
    }),
    $("#duration_in_days_minus").click(function () {
      var a = parseInt($("#duration_in_days").val()),
        b = parseInt($("#duration_in_days_original").val());
      $("#duration_in_days")
        .val(parseInt($("#lp_variable_duration_select").val()))
        .change(),
        (3 < a || a > b) &&
          $("#duration_in_days")
            .val(a - 1)
            .change();
      gae("listingPage", "duration_minus");
    }),
    "1" == $("#price_needs_approval").val() &&
      $(".price_, .price").css("color", "red"),
    $("#duration_in_days").change(function () {
      if (
        $("#duration_in_days").length &&
        $("#duration_in_days_original").length
      ) {
        var a = parseInt($("#duration_in_days").val() - 1),
          b = parseInt($("#duration_in_days_original").val() - 1);
        a == b
          ? ($("#reservation-query-submit, .js-reserve-link").removeClass(
              "hide"
            ),
            $(".js-show-on-custom-package").addClass("hide"),
            $(".input-wpr")
              .find(".package-selection-item")
              .each(function () {
                $(this).attr("data-is-flexible-duration", 0);
              }))
          : ($("#reservation-query-submit, .js-reserve-link").addClass("hide"),
            $(".js-show-on-custom-package").removeClass("hide"),
            $(".input-wpr")
              .find(".package-selection-item")
              .each(function () {
                $(this).attr("data-is-flexible-duration", 1);
              }));
        var c = 0;
        $(".price").each(function () {
          if ($(this).attr("data-price")) {
            var a = parseInt($(this).data("price"));
            (a < c || 0 == c) && (c = a);
          }
        }),
          $(".price").each(function () {
            if ($(this).html().length) {
              var d = $(this).html(),
                e = /\d/gim.exec(d);
              if (e) {
                var f,
                  g = d.substring(0, e.index);
                (f = $(this).attr("data-price")
                  ? parseInt($(this).attr("data-price"))
                  : c),
                  (f = Math.round((f * a) / b));
                var h =
                  a == b || $(this).attr("data-price")
                    ? ""
                    : "<small> (" +
                      $("#price_is_indicative_hidden").val() +
                      ")</small>";
                $(this).html(g + f + h);
              }
            }
          });
      }
    }),
    (function () {
      for (
        var a = 3, b = parseInt($("#duration_in_days_original").val());
        a <= 2 * b;

      ) {
        var c = $("#lp_variable_duration_select")
            .attr("data-transtag")
            .replace("DAYS", a)
            .replace("NIGHTS", a - 1),
          d = "";
        a == b && (d = 'selected="selected"');
        $("#lp_variable_duration_select").append(
          "<option " + d + ' value="' + a + '">' + c + "</option>"
        ),
          a++;
      }
    })();
});


$(function() {
  'use strict';

  var checkIn, checkOut, numberOfMonths = [2, 3],
      $calendar = $('#calendar').datepicker({
        numberOfMonths: numberOfMonths,
        prevText: '',
        nextText: '',
        beforeShowDay: function(date) {
          date = moment(date);

          var now = moment(),
              show = date.isAfter(now),
              css = '';

          if (checkIn && checkOut 
              && date.isSameOrAfter(checkIn)
              && date.isSameOrBefore(checkOut)) {
            css = 'ui-datepicker-reserved';

            if (date.isSame(checkIn)) css += ' ui-datepicker-checkin';
            if (date.isSame(checkOut)) css += ' ui-datepicker-checkout';
          }

          return [show, css];
        },
        onSelect: function(value) {
          var date = moment($calendar.datepicker('getDate'));

          if (checkIn && !checkOut
              && date.isSameOrAfter(checkIn)) 
            checkOut = date;
          else {
            checkIn = date;
            checkOut = null;
          }
          
          $('#check-in-date').text(checkIn ? checkIn.format('DD/MM/YYYY') : 'Choose a date');
          $('#check-out-date').text(checkOut ? checkOut.format('DD/MM/YYYY') : 'Choose a date');
        },
        onChangeMonthYear: function() {
          $calendar.addClass('fade-in');
        }
      }).on('animationend webkitAnimationEnd', function() {
        $calendar.removeClass('fade-in');
      });
  
  function resize() {
    var element = $('.ui-datepicker').get(0),
        style = window.getComputedStyle(element).getPropertyValue('min-width'), 
        value;
    
    switch (style) {
      case '765px': value = [2, 3]; break;
      case '510px': value = [2, 2]; break;
      default: value = [2, 1]; break;
    }
    
    if (numberOfMonths !== value) {
      if (checkIn) $calendar.datepicker('setDate', checkIn.toDate());
      
      $calendar.datepicker('option', 'numberOfMonths', numberOfMonths = value);
    }
  }

  $(window).on('resize', resize);
  
  resize();
});

