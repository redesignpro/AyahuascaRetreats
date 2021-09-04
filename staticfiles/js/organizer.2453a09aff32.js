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
$(function () {
  var a = window,
    b = document,
    c = b.documentElement,
    d = b.getElementsByTagName("body")[0],
    e = a.innerWidth || c.clientWidth || d.clientWidth,
    f = !!$(".rebrand-funnel").length;
  if ($(".js-organizer-listing-swiper").length)
    var g = $(".js-organizer-listing-swiper .swiper-slide").length,
      h = new Swiper(".js-organizer-listing-swiper", {
        slidesPerView: "auto",
        slidesPerGroup: 768 > e ? 1 : 2,
        spaceBetween: f ? 20 : 768 > e ? 0 : 20,
        nextButton: ".js-swiper-button--next",
        prevButton: ".js-swiper-button--prev",
        grabCursor: !0,
        loop: !1,
        onInit: function onInit(a) {
          var b = 0;
          a.slides.each(function () {
            b += $(this).outerWidth();
          }),
            b < a.width &&
              (!f && (a.nextButton.remove(), a.prevButton.remove()),
              a.unsetGrabCursor());
        },
      });
  if ($(".js-organizer-instructor-swiper").length)
    var g = $(".js-organizer-instructor-swiper .swiper-slide").length,
      i = new Swiper(".js-organizer-instructor-swiper", {
        slidesPerView: "auto",
        slidesPerGroup: 768 > e ? 1 : 2,
        spaceBetween: f ? 20 : 768 > e ? 0 : 20,
        nextButton: ".js-swiper-button--next",
        prevButton: ".js-swiper-button--prev",
        grabCursor: !0,
        loop: !1,
        onInit: function onInit(a) {
          var b = 0;
          a.slides.each(function () {
            b += $(this).outerWidth();
          }),
            b < a.width &&
              (!f && (a.nextButton.remove(), a.prevButton.remove()),
              a.unsetGrabCursor());
        },
      });
  if ($(".js-organizer-video-swiper").length) {
    var g = $(".js-organizer-video-swiper .swiper-slide").length,
      j = new Swiper(".js-organizer-video-swiper", {
        slidesPerView: 768 > e ? 1 : 2,
        spaceBetween: 768 > e ? 0 : 20,
        nextButton: ".js-swiper-button--next",
        prevButton: ".js-swiper-button--prev",
        grabCursor: !0,
        loop: !1,
        onSlideChangeEnd: function onSlideChangeEnd() {
          $(".js-swiper-video")
            .trigger("pause")
            .removeClass("swiper-slide__video--hide-controls");
        },
      });
    $("video").each(function () {
      this.addEventListener("playing", function () {
        gae("organizer_page", "video_play"),
          $(".js-swiper-video-slide").hide(),
          setTimeout(function () {
            $(".swiper-slide-active .js-swiper-video").addClass(
              "swiper-slide__video--hide-controls"
            );
          }, 3e3);
      }),
        this.addEventListener("ended", function () {
          gae("organizer_page", "video_ended"),
            $(".js-swiper-video-slide").show();
        }),
        this.addEventListener("pause", function () {
          gae("organizer_page", "video_pause"),
            $(".js-swiper-video-slide").show();
        }),
        this.addEventListener("volumechange", function () {
          gae("organizer_page", "video_volume_change");
        }),
        this.addEventListener("mozfullscreenchange", function () {
          gae("organizer_page", "video_fullscreen_toggle");
        }),
        this.addEventListener("webkitfullscreenchange", function () {
          gae("organizer_page", "video_fullscreen_toggle");
        });
    }),
      $(".js-swiper-video-slide").click(function () {
        $(this).parent().find("video").trigger("play");
      });
  }
  if ($(".js-organizer-review-swiper").length)
    var k,
      l = 1024 > e ? (768 > e ? 1 : 2) : 3,
      m = new Swiper(
        ".js-organizer-review-swiper",
        ((k = {
          slidesPerView: l,
          spaceBetween: 30,
          nextButton: ".js-swiper-button--next",
          prevButton: ".js-swiper-button--prev",
        }),
        _defineProperty(k, "slidesPerView", l),
        _defineProperty(k, "pagination", ".js-swiper-pagination"),
        _defineProperty(k, "grabCursor", !0),
        _defineProperty(k, "onInit", function onInit(a) {
          1 ==
            $(
              ".js-organizer-review-swiper .js-swiper-pagination .swiper-pagination-bullet"
            ).length &&
            $(".js-organizer-review-swiper .js-swiper-pagination").hide();
          var b = 0;
          a.slides.each(function () {
            b += $(this).outerWidth();
          }),
            b < a.width &&
              (!f && (a.nextButton.remove(), a.prevButton.remove()),
              a.unsetGrabCursor());
        }),
        k)
      );
  if ($(".js-organizer-testimonial-swiper").length)
    var n,
      o = new Swiper(
        ".js-organizer-testimonial-swiper",
        ((n = {
          slidesPerView: 3,
          spaceBetween: 30,
          nextButton: ".js-swiper-button--next",
          prevButton: ".js-swiper-button--prev",
        }),
        _defineProperty(n, "slidesPerView", 1024 > e ? (768 > e ? 1 : 2) : 3),
        _defineProperty(n, "pagination", ".js-swiper-pagination"),
        _defineProperty(n, "grabCursor", !0),
        _defineProperty(n, "onInit", function onInit(a) {
          1 ==
            $(
              ".js-organizer-testimonial-swiper .js-swiper-pagination .swiper-pagination-bullet"
            ).length &&
            $(".js-organizer-testimonial-swiper .js-swiper-pagination").hide();
          var b = 0;
          a.slides.each(function () {
            b += $(this).outerWidth();
          }),
            b < a.width &&
              (!f && (a.nextButton.remove(), a.prevButton.remove()),
              a.unsetGrabCursor());
        }),
        n)
      );
});
