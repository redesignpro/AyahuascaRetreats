function _typeof(e) {
  "@babel/helpers - typeof";
  return (
    (_typeof =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e &&
              "function" == typeof Symbol &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          }),
    _typeof(e)
  );
}
!(function () {
  var B,
    N = function (e, R) {
      function W(a) {
        return Z(a);
      }

      function t() {
        var t = U.params.autoplay,
          s = U.slides.eq(U.activeIndex);
        s.attr("data-swiper-autoplay") &&
          (t = s.attr("data-swiper-autoplay") || U.params.autoplay),
          (U.autoplayTimeoutId = setTimeout(function () {
            U.params.loop
              ? (U.fixLoop(), U._slideNext(), U.emit("onAutoplay", U))
              : U.isEnd
              ? R.autoplayStopOnLast
                ? U.stopAutoplay()
                : (U._slideTo(0), U.emit("onAutoplay", U))
              : (U._slideNext(), U.emit("onAutoplay", U));
          }, t));
      }

      function V(e, r) {
        var a = B(e.target);
        if (!a.is(r))
          if ("string" == typeof r) a = a.parents(r);
          else if (r.nodeType) {
            var t;
            return (
              a.parents().each(function (s, e) {
                e === r && (t = r);
              }),
              t ? r : void 0
            );
          }
        return 0 === a.length ? void 0 : a[0];
      }

      function s(r, e) {
        e = e || {};
        var i = window.MutationObserver || window.WebkitMutationObserver,
          t = new i(function (a) {
            a.forEach(function (a) {
              U.onResize(!0), U.emit("onObserverUpdate", U, a);
            });
          });
        t.observe(r, {
          attributes: void 0 === e.attributes || e.attributes,
          childList: void 0 === e.childList || e.childList,
          characterData: void 0 === e.characterData || e.characterData,
        }),
          U.observers.push(t);
      }

      function r(d) {
        d.originalEvent && (d = d.originalEvent);
        var m = d.keyCode || d.charCode;
        if (
          !U.params.allowSwipeToNext &&
          ((U.isHorizontal() && 39 === m) || (!U.isHorizontal() && 40 === m))
        )
          return !1;
        if (
          !U.params.allowSwipeToPrev &&
          ((U.isHorizontal() && 37 === m) || (!U.isHorizontal() && 38 === m))
        )
          return !1;
        if (
          !(
            d.shiftKey ||
            d.altKey ||
            d.ctrlKey ||
            d.metaKey ||
            (document.activeElement &&
              document.activeElement.nodeName &&
              ("input" === document.activeElement.nodeName.toLowerCase() ||
                "textarea" === document.activeElement.nodeName.toLowerCase()))
          )
        ) {
          if (37 === m || 39 === m || 38 === m || 40 === m) {
            var a = !1;
            if (
              0 < U.container.parents("." + U.params.slideClass).length &&
              0 === U.container.parents("." + U.params.slideActiveClass).length
            )
              return;
            var c = {
                left: window.pageXOffset,
                top: window.pageYOffset,
              },
              s = window.innerWidth,
              i = window.innerHeight,
              r = U.container.offset();
            U.rtl && (r.left -= U.container[0].scrollLeft);
            for (
              var n,
                g = [
                  [r.left, r.top],
                  [r.left + U.width, r.top],
                  [r.left, r.top + U.height],
                  [r.left + U.width, r.top + U.height],
                ],
                o = 0;
              o < g.length;
              o++
            )
              (n = g[o]),
                n[0] >= c.left &&
                  n[0] <= c.left + s &&
                  n[1] >= c.top &&
                  n[1] <= c.top + i &&
                  (a = !0);
            if (!a) return;
          }
          U.isHorizontal()
            ? ((37 !== m && 39 !== m) ||
                (d.preventDefault ? d.preventDefault() : (d.returnValue = !1)),
              ((39 === m && !U.rtl) || (37 === m && U.rtl)) && U.slideNext(),
              ((37 === m && !U.rtl) || (39 === m && U.rtl)) && U.slidePrev())
            : ((38 !== m && 40 !== m) ||
                (d.preventDefault ? d.preventDefault() : (d.returnValue = !1)),
              40 === m && U.slideNext(),
              38 === m && U.slidePrev()),
            U.emit("onKeyPress", U, m);
        }
      }

      function o(r) {
        var e = 0,
          n = 0,
          o = 0,
          l = 0;
        return (
          "detail" in r && (n = r.detail),
          "wheelDelta" in r && (n = -r.wheelDelta / 120),
          "wheelDeltaY" in r && (n = -r.wheelDeltaY / 120),
          "wheelDeltaX" in r && (e = -r.wheelDeltaX / 120),
          "axis" in r && r.axis === r.HORIZONTAL_AXIS && ((e = n), (n = 0)),
          (o = 10 * e),
          (l = 10 * n),
          "deltaY" in r && (l = r.deltaY),
          "deltaX" in r && (o = r.deltaX),
          (o || l) &&
            r.deltaMode &&
            (1 === r.deltaMode
              ? ((o *= 40), (l *= 40))
              : ((o *= 800), (l *= 800))),
          o && !e && (e = 1 > o ? -1 : 1),
          l && !n && (n = 1 > l ? -1 : 1),
          {
            spinX: e,
            spinY: n,
            pixelX: o,
            pixelY: l,
          }
        );
      }

      function n(l) {
        l.originalEvent && (l = l.originalEvent);
        var p = 0,
          d = U.rtl ? -1 : 1,
          t = o(l);
        if (!U.params.mousewheelForceToAxis)
          p = _(t.pixelX) > _(t.pixelY) ? -t.pixelX * d : -t.pixelY;
        else if (U.isHorizontal()) {
          if (!(_(t.pixelX) > _(t.pixelY))) return;
          p = t.pixelX * d;
        } else {
          if (!(_(t.pixelY) > _(t.pixelX))) return;
          p = t.pixelY;
        }
        if (0 !== p) {
          if ((U.params.mousewheelInvert && (p = -p), U.params.freeMode)) {
            var s =
                U.getWrapperTranslate() + p * U.params.mousewheelSensitivity,
              m = U.isBeginning,
              r = U.isEnd;
            if (
              (s >= U.minTranslate() && (s = U.minTranslate()),
              s <= U.maxTranslate() && (s = U.maxTranslate()),
              U.setWrapperTransition(0),
              U.setWrapperTranslate(s),
              U.updateProgress(),
              U.updateActiveIndex(),
              ((!m && U.isBeginning) || (!r && U.isEnd)) && U.updateClasses(),
              U.params.freeModeSticky
                ? (clearTimeout(U.mousewheel.timeout),
                  (U.mousewheel.timeout = setTimeout(function () {
                    U.slideReset();
                  }, 300)))
                : U.params.lazyLoading && U.lazy && U.lazy.load(),
              U.emit("onScroll", U, l),
              U.params.autoplay &&
                U.params.autoplayDisableOnInteraction &&
                U.stopAutoplay(),
              0 === s || s === U.maxTranslate())
            )
              return;
          } else {
            if (60 < new window.Date().getTime() - U.mousewheel.lastScrollTime)
              if (0 > p) {
                if (!((U.isEnd && !U.params.loop) || U.animating))
                  U.slideNext(), U.emit("onScroll", U, l);
                else if (U.params.mousewheelReleaseOnEdges) return !0;
              } else if (!((U.isBeginning && !U.params.loop) || U.animating))
                U.slidePrev(), U.emit("onScroll", U, l);
              else if (U.params.mousewheelReleaseOnEdges) return !0;
            U.mousewheel.lastScrollTime = new window.Date().getTime();
          }
          return (
            l.preventDefault ? l.preventDefault() : (l.returnValue = !1), !1
          );
        }
      }

      function l(e, o) {
        e = B(e);
        var t,
          l,
          p,
          d = U.rtl ? -1 : 1;
        (t = e.attr("data-swiper-parallax") || "0"),
          (l = e.attr("data-swiper-parallax-x")),
          (p = e.attr("data-swiper-parallax-y")),
          l || p
            ? ((l = l || "0"), (p = p || "0"))
            : U.isHorizontal()
            ? ((l = t), (p = "0"))
            : ((p = t), (l = "0")),
          (l =
            0 <= l.indexOf("%")
              ? parseInt(l, 10) * o * d + "%"
              : l * o * d + "px"),
          (p = 0 <= p.indexOf("%") ? parseInt(p, 10) * o + "%" : p * o + "px"),
          e.transform("translate3d(" + l + ", " + p + ",0px)");
      }

      function p(a) {
        return (
          0 !== a.indexOf("on") &&
            (a =
              a[0] === a[0].toUpperCase()
                ? "on" + a
                : "on" + a[0].toUpperCase() + a.substring(1)),
          a
        );
      }
      var q = Math.round,
        d = Math.pow,
        m = Math.PI,
        F = Math.min,
        K = Math.max,
        j = Math.ceil,
        _ = Math.abs,
        Z = Math.floor;
      if (!(this instanceof N)) return new N(e, R);
      var c = {
          direction: "horizontal",
          touchEventsTarget: "container",
          initialSlide: 0,
          speed: 300,
          autoplay: !1,
          autoplayDisableOnInteraction: !0,
          autoplayStopOnLast: !1,
          iOSEdgeSwipeDetection: !1,
          iOSEdgeSwipeThreshold: 20,
          freeMode: !1,
          freeModeMomentum: !0,
          freeModeMomentumRatio: 1,
          freeModeMomentumBounce: !0,
          freeModeMomentumBounceRatio: 1,
          freeModeMomentumVelocityRatio: 1,
          freeModeSticky: !1,
          freeModeMinimumVelocity: 0.02,
          autoHeight: !1,
          setWrapperSize: !1,
          virtualTranslate: !1,
          effect: "slide",
          coverflow: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: !0,
          },
          flip: {
            slideShadows: !0,
            limitRotation: !0,
          },
          cube: {
            slideShadows: !0,
            shadow: !0,
            shadowOffset: 20,
            shadowScale: 0.94,
          },
          fade: {
            crossFade: !1,
          },
          parallax: !1,
          zoom: !1,
          zoomMax: 3,
          zoomMin: 1,
          zoomToggle: !0,
          scrollbar: null,
          scrollbarHide: !0,
          scrollbarDraggable: !1,
          scrollbarSnapOnRelease: !1,
          keyboardControl: !1,
          mousewheelControl: !1,
          mousewheelReleaseOnEdges: !1,
          mousewheelInvert: !1,
          mousewheelForceToAxis: !1,
          mousewheelSensitivity: 1,
          mousewheelEventsTarged: "container",
          hashnav: !1,
          hashnavWatchState: !1,
          history: !1,
          replaceState: !1,
          breakpoints: void 0,
          spaceBetween: 0,
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerColumnFill: "column",
          slidesPerGroup: 1,
          centeredSlides: !1,
          slidesOffsetBefore: 0,
          slidesOffsetAfter: 0,
          roundLengths: !1,
          touchRatio: 1,
          touchAngle: 45,
          simulateTouch: !0,
          shortSwipes: !0,
          longSwipes: !0,
          longSwipesRatio: 0.5,
          longSwipesMs: 300,
          followFinger: !0,
          onlyExternal: !1,
          threshold: 0,
          touchMoveStopPropagation: !0,
          touchReleaseOnEdges: !1,
          uniqueNavElements: !0,
          pagination: null,
          paginationElement: "span",
          paginationClickable: !1,
          paginationHide: !1,
          paginationBulletRender: null,
          paginationProgressRender: null,
          paginationFractionRender: null,
          paginationCustomRender: null,
          paginationType: "bullets",
          resistance: !0,
          resistanceRatio: 0.85,
          nextButton: null,
          prevButton: null,
          watchSlidesProgress: !1,
          watchSlidesVisibility: !1,
          grabCursor: !1,
          preventClicks: !0,
          preventClicksPropagation: !0,
          slideToClickedSlide: !1,
          lazyLoading: !1,
          lazyLoadingInPrevNext: !1,
          lazyLoadingInPrevNextAmount: 1,
          lazyLoadingOnTransitionStart: !1,
          preloadImages: !0,
          updateOnImagesReady: !0,
          loop: !1,
          loopAdditionalSlides: 0,
          loopedSlides: null,
          control: void 0,
          controlInverse: !1,
          controlBy: "slide",
          normalizeSlideIndex: !0,
          allowSwipeToPrev: !0,
          allowSwipeToNext: !0,
          swipeHandler: null,
          noSwiping: !0,
          noSwipingClass: "swiper-no-swiping",
          passiveListeners: !0,
          containerModifierClass: "swiper-container-",
          slideClass: "swiper-slide",
          slideActiveClass: "swiper-slide-active",
          slideDuplicateActiveClass: "swiper-slide-duplicate-active",
          slideVisibleClass: "swiper-slide-visible",
          slideDuplicateClass: "swiper-slide-duplicate",
          slideNextClass: "swiper-slide-next",
          slideDuplicateNextClass: "swiper-slide-duplicate-next",
          slidePrevClass: "swiper-slide-prev",
          slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
          wrapperClass: "swiper-wrapper",
          bulletClass: "swiper-pagination-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active",
          buttonDisabledClass: "swiper-button-disabled",
          paginationCurrentClass: "swiper-pagination-current",
          paginationTotalClass: "swiper-pagination-total",
          paginationHiddenClass: "swiper-pagination-hidden",
          paginationProgressbarClass: "swiper-pagination-progressbar",
          paginationClickableClass: "swiper-pagination-clickable",
          paginationModifierClass: "swiper-pagination-",
          lazyLoadingClass: "swiper-lazy",
          lazyStatusLoadingClass: "swiper-lazy-loading",
          lazyStatusLoadedClass: "swiper-lazy-loaded",
          lazyPreloaderClass: "swiper-lazy-preloader",
          notificationClass: "swiper-notification",
          preloaderClass: "preloader",
          zoomContainerClass: "swiper-zoom-container",
          observer: !1,
          observeParents: !1,
          a11y: !1,
          prevSlideMessage: "Previous slide",
          nextSlideMessage: "Next slide",
          firstSlideMessage: "This is the first slide",
          lastSlideMessage: "This is the last slide",
          paginationBulletMessage: "Go to slide {{index}}",
          runCallbacksOnInit: !0,
        },
        u = R && R.virtualTranslate;
      R = R || {};
      var g = {};
      for (var h in R)
        if (
          "object" != _typeof(R[h]) ||
          null === R[h] ||
          R[h].nodeType ||
          R[h] === window ||
          R[h] === document ||
          (void 0 !== a && R[h] instanceof a) ||
          ("undefined" != typeof jQuery && R[h] instanceof jQuery)
        )
          g[h] = R[h];
        else for (var v in ((g[h] = {}), R[h])) g[h][v] = R[h][v];
      for (var w in c)
        if (void 0 === R[w]) R[w] = c[w];
        else if ("object" == _typeof(R[w]))
          for (var f in c[w]) void 0 === R[w][f] && (R[w][f] = c[w][f]);
      var U = this;
      if (
        ((U.params = R),
        (U.originalParams = g),
        (U.classNames = []),
        void 0 !== B && void 0 !== a && (B = a),
        (void 0 !== B ||
          (B =
            void 0 === a ? window.Dom7 || window.Zepto || window.jQuery : a)) &&
          ((U.$ = B),
          (U.currentBreakpoint = void 0),
          (U.getActiveBreakpoint = function () {
            if (!U.params.breakpoints) return !1;
            var r,
              i = !1,
              n = [];
            for (r in U.params.breakpoints)
              U.params.breakpoints.hasOwnProperty(r) && n.push(r);
            n.sort(function (t, e) {
              return parseInt(t, 10) > parseInt(e, 10);
            });
            for (var t = 0; t < n.length; t++)
              (r = n[t]) >= window.innerWidth && !i && (i = r);
            return i || "max";
          }),
          (U.setBreakpoint = function () {
            var r = U.getActiveBreakpoint();
            if (r && U.currentBreakpoint !== r) {
              var e =
                  r in U.params.breakpoints
                    ? U.params.breakpoints[r]
                    : U.originalParams,
                a = U.params.loop && e.slidesPerView !== U.params.slidesPerView;
              for (var t in e) U.params[t] = e[t];
              (U.currentBreakpoint = r), a && U.destroyLoop && U.reLoop(!0);
            }
          }),
          U.params.breakpoints && U.setBreakpoint(),
          (U.container = B(e)),
          0 !== U.container.length))
      ) {
        if (1 < U.container.length) {
          var x = [];
          return (
            U.container.each(function () {
              x.push(new N(this, R));
            }),
            x
          );
        }
        (U.container[0].swiper = U),
          U.container.data("swiper", U),
          U.classNames.push(
            U.params.containerModifierClass + U.params.direction
          ),
          U.params.freeMode &&
            U.classNames.push(U.params.containerModifierClass + "free-mode"),
          U.support.flexbox ||
            (U.classNames.push(U.params.containerModifierClass + "no-flexbox"),
            (U.params.slidesPerColumn = 1)),
          U.params.autoHeight &&
            U.classNames.push(U.params.containerModifierClass + "autoheight"),
          (U.params.parallax || U.params.watchSlidesVisibility) &&
            (U.params.watchSlidesProgress = !0),
          U.params.touchReleaseOnEdges && (U.params.resistanceRatio = 0),
          0 <= ["cube", "coverflow", "flip"].indexOf(U.params.effect) &&
            (U.support.transforms3d
              ? ((U.params.watchSlidesProgress = !0),
                U.classNames.push(U.params.containerModifierClass + "3d"))
              : (U.params.effect = "slide")),
          "slide" !== U.params.effect &&
            U.classNames.push(
              U.params.containerModifierClass + U.params.effect
            ),
          "cube" === U.params.effect &&
            ((U.params.resistanceRatio = 0),
            (U.params.slidesPerView = 1),
            (U.params.slidesPerColumn = 1),
            (U.params.slidesPerGroup = 1),
            (U.params.centeredSlides = !1),
            (U.params.spaceBetween = 0),
            (U.params.virtualTranslate = !0)),
          ("fade" !== U.params.effect && "flip" !== U.params.effect) ||
            ((U.params.slidesPerView = 1),
            (U.params.slidesPerColumn = 1),
            (U.params.slidesPerGroup = 1),
            (U.params.watchSlidesProgress = !0),
            (U.params.spaceBetween = 0),
            void 0 === u && (U.params.virtualTranslate = !0)),
          U.params.grabCursor && U.support.touch && (U.params.grabCursor = !1),
          (U.wrapper = U.container.children("." + U.params.wrapperClass)),
          U.params.pagination &&
            ((U.paginationContainer = B(U.params.pagination)),
            U.params.uniqueNavElements &&
              "string" == typeof U.params.pagination &&
              1 < U.paginationContainer.length &&
              1 === U.container.find(U.params.pagination).length &&
              (U.paginationContainer = U.container.find(U.params.pagination)),
            "bullets" === U.params.paginationType &&
            U.params.paginationClickable
              ? U.paginationContainer.addClass(
                  U.params.paginationModifierClass + "clickable"
                )
              : (U.params.paginationClickable = !1),
            U.paginationContainer.addClass(
              U.params.paginationModifierClass + U.params.paginationType
            )),
          (U.params.nextButton || U.params.prevButton) &&
            (U.params.nextButton &&
              ((U.nextButton = B(U.params.nextButton)),
              U.params.uniqueNavElements &&
                "string" == typeof U.params.nextButton &&
                1 < U.nextButton.length &&
                1 === U.container.find(U.params.nextButton).length &&
                (U.nextButton = U.container.find(U.params.nextButton))),
            U.params.prevButton &&
              ((U.prevButton = B(U.params.prevButton)),
              U.params.uniqueNavElements &&
                "string" == typeof U.params.prevButton &&
                1 < U.prevButton.length &&
                1 === U.container.find(U.params.prevButton).length &&
                (U.prevButton = U.container.find(U.params.prevButton)))),
          (U.isHorizontal = function () {
            return "horizontal" === U.params.direction;
          }),
          (U.rtl =
            U.isHorizontal() &&
            ("rtl" === U.container[0].dir.toLowerCase() ||
              "rtl" === U.container.css("direction"))),
          U.rtl && U.classNames.push(U.params.containerModifierClass + "rtl"),
          U.rtl && (U.wrongRTL = "-webkit-box" === U.wrapper.css("display")),
          1 < U.params.slidesPerColumn &&
            U.classNames.push(U.params.containerModifierClass + "multirow"),
          U.device.android &&
            U.classNames.push(U.params.containerModifierClass + "android"),
          U.container.addClass(U.classNames.join(" ")),
          (U.translate = 0),
          (U.progress = 0),
          (U.velocity = 0),
          (U.lockSwipeToNext = function () {
            (U.params.allowSwipeToNext = !1),
              !1 === U.params.allowSwipeToPrev &&
                U.params.grabCursor &&
                U.unsetGrabCursor();
          }),
          (U.lockSwipeToPrev = function () {
            (U.params.allowSwipeToPrev = !1),
              !1 === U.params.allowSwipeToNext &&
                U.params.grabCursor &&
                U.unsetGrabCursor();
          }),
          (U.lockSwipes = function () {
            (U.params.allowSwipeToNext = U.params.allowSwipeToPrev = !1),
              U.params.grabCursor && U.unsetGrabCursor();
          }),
          (U.unlockSwipeToNext = function () {
            (U.params.allowSwipeToNext = !0),
              !0 === U.params.allowSwipeToPrev &&
                U.params.grabCursor &&
                U.setGrabCursor();
          }),
          (U.unlockSwipeToPrev = function () {
            (U.params.allowSwipeToPrev = !0),
              !0 === U.params.allowSwipeToNext &&
                U.params.grabCursor &&
                U.setGrabCursor();
          }),
          (U.unlockSwipes = function () {
            (U.params.allowSwipeToNext = U.params.allowSwipeToPrev = !0),
              U.params.grabCursor && U.setGrabCursor();
          }),
          (U.setGrabCursor = function (a) {
            (U.container[0].style.cursor = "move"),
              (U.container[0].style.cursor = a
                ? "-webkit-grabbing"
                : "-webkit-grab"),
              (U.container[0].style.cursor = a ? "-moz-grabbin" : "-moz-grab"),
              (U.container[0].style.cursor = a ? "grabbing" : "grab");
          }),
          (U.unsetGrabCursor = function () {
            U.container[0].style.cursor = "";
          }),
          U.params.grabCursor && U.setGrabCursor(),
          (U.imagesToLoad = []),
          (U.imagesLoaded = 0),
          (U.loadImage = function (l, e, a, t, s, i) {
            function r() {
              i && i();
            }
            var n;
            l.complete && s
              ? r()
              : e
              ? ((n = new window.Image()),
                (n.onload = r),
                (n.onerror = r),
                t && (n.sizes = t),
                a && (n.srcset = a),
                e && (n.src = e))
              : r();
          }),
          (U.preloadImages = function () {
            function t() {
              void 0 !== U &&
                null !== U &&
                U &&
                (void 0 !== U.imagesLoaded && U.imagesLoaded++,
                U.imagesLoaded === U.imagesToLoad.length &&
                  (U.params.updateOnImagesReady && U.update(),
                  U.emit("onImagesReady", U)));
            }
            U.imagesToLoad = U.container.find("img");
            for (var e = 0; e < U.imagesToLoad.length; e++)
              U.loadImage(
                U.imagesToLoad[e],
                U.imagesToLoad[e].currentSrc ||
                  U.imagesToLoad[e].getAttribute("src"),
                U.imagesToLoad[e].srcset ||
                  U.imagesToLoad[e].getAttribute("srcset"),
                U.imagesToLoad[e].sizes ||
                  U.imagesToLoad[e].getAttribute("sizes"),
                !0,
                t
              );
          }),
          (U.autoplayTimeoutId = void 0),
          (U.autoplaying = !1),
          (U.autoplayPaused = !1),
          (U.startAutoplay = function () {
            return (
              void 0 === U.autoplayTimeoutId &&
              !!U.params.autoplay &&
              !U.autoplaying &&
              ((U.autoplaying = !0), U.emit("onAutoplayStart", U), void t())
            );
          }),
          (U.stopAutoplay = function () {
            U.autoplayTimeoutId &&
              (U.autoplayTimeoutId && clearTimeout(U.autoplayTimeoutId),
              (U.autoplaying = !1),
              (U.autoplayTimeoutId = void 0),
              U.emit("onAutoplayStop", U));
          }),
          (U.pauseAutoplay = function (a) {
            U.autoplayPaused ||
              (U.autoplayTimeoutId && clearTimeout(U.autoplayTimeoutId),
              (U.autoplayPaused = !0),
              0 === a
                ? ((U.autoplayPaused = !1), t())
                : U.wrapper.transitionEnd(function () {
                    U &&
                      ((U.autoplayPaused = !1),
                      U.autoplaying ? t() : U.stopAutoplay());
                  }));
          }),
          (U.minTranslate = function () {
            return -U.snapGrid[0];
          }),
          (U.maxTranslate = function () {
            return -U.snapGrid[U.snapGrid.length - 1];
          }),
          (U.updateAutoHeight = function () {
            var r,
              n = [],
              a = 0;
            if ("auto" !== U.params.slidesPerView && 1 < U.params.slidesPerView)
              for (r = 0; r < j(U.params.slidesPerView); r++) {
                var o = U.activeIndex + r;
                if (o > U.slides.length) break;
                n.push(U.slides.eq(o)[0]);
              }
            else n.push(U.slides.eq(U.activeIndex)[0]);
            for (r = 0; r < n.length; r++)
              if (void 0 !== n[r]) {
                var s = n[r].offsetHeight;
                a = s > a ? s : a;
              }
            a && U.wrapper.css("height", a + "px");
          }),
          (U.updateContainerSize = function () {
            var t, s;
            (t =
              void 0 === U.params.width
                ? U.container[0].clientWidth
                : U.params.width),
              (s =
                void 0 === U.params.height
                  ? U.container[0].clientHeight
                  : U.params.height),
              (0 === t && U.isHorizontal()) ||
                (0 === s && !U.isHorizontal()) ||
                ((t =
                  t -
                  parseInt(U.container.css("padding-left"), 10) -
                  parseInt(U.container.css("padding-right"), 10)),
                (s =
                  s -
                  parseInt(U.container.css("padding-top"), 10) -
                  parseInt(U.container.css("padding-bottom"), 10)),
                (U.width = t),
                (U.height = s),
                (U.size = U.isHorizontal() ? U.width : U.height));
          }),
          (U.updateSlidesSize = function () {
            (U.slides = U.wrapper.children("." + U.params.slideClass)),
              (U.snapGrid = []),
              (U.slidesGrid = []),
              (U.slidesSizesGrid = []);
            var r,
              v = U.params.spaceBetween,
              w = -U.params.slidesOffsetBefore,
              f = 0,
              x = 0;
            if (void 0 !== U.size) {
              "string" == typeof v &&
                0 <= v.indexOf("%") &&
                (v = (parseFloat(v.replace("%", "")) / 100) * U.size),
                (U.virtualSize = -v),
                U.rtl
                  ? U.slides.css({
                      marginLeft: "",
                      marginTop: "",
                    })
                  : U.slides.css({
                      marginRight: "",
                      marginBottom: "",
                    });
              var y;
              1 < U.params.slidesPerColumn &&
                ((y =
                  Z(U.slides.length / U.params.slidesPerColumn) ===
                  U.slides.length / U.params.slidesPerColumn
                    ? U.slides.length
                    : j(U.slides.length / U.params.slidesPerColumn) *
                      U.params.slidesPerColumn),
                "auto" !== U.params.slidesPerView &&
                  "row" === U.params.slidesPerColumnFill &&
                  (y = K(
                    y,
                    U.params.slidesPerView * U.params.slidesPerColumn
                  )));
              var T,
                S = U.params.slidesPerColumn,
                l = y / S,
                p = l - (U.params.slidesPerColumn * l - U.slides.length);
              for (r = 0; r < U.slides.length; r++) {
                T = 0;
                var d = U.slides.eq(r);
                if (1 < U.params.slidesPerColumn) {
                  var u, C, b;
                  "column" === U.params.slidesPerColumnFill
                    ? ((C = Z(r / S)),
                      (b = r - C * S),
                      (C > p || (C === p && b === S - 1)) &&
                        ++b >= S &&
                        ((b = 0), C++),
                      (u = C + (b * y) / S),
                      d.css({
                        "-webkit-box-ordinal-group": u,
                        "-moz-box-ordinal-group": u,
                        "-ms-flex-order": u,
                        "-webkit-order": u,
                        order: u,
                      }))
                    : ((b = Z(r / l)), (C = r - b * l)),
                    d
                      .css(
                        "margin-" + (U.isHorizontal() ? "top" : "left"),
                        0 !== b &&
                          U.params.spaceBetween &&
                          U.params.spaceBetween + "px"
                      )
                      .attr("data-swiper-column", C)
                      .attr("data-swiper-row", b);
                }
                "none" !== d.css("display") &&
                  ("auto" === U.params.slidesPerView
                    ? ((T = U.isHorizontal()
                        ? d.outerWidth(!0)
                        : d.outerHeight(!0)),
                      U.params.roundLengths && (T = W(T)))
                    : ((T =
                        (U.size - (U.params.slidesPerView - 1) * v) /
                        U.params.slidesPerView),
                      U.params.roundLengths && (T = W(T)),
                      U.isHorizontal()
                        ? (U.slides[r].style.width = T + "px")
                        : (U.slides[r].style.height = T + "px")),
                  (U.slides[r].swiperSlideSize = T),
                  U.slidesSizesGrid.push(T),
                  U.params.centeredSlides
                    ? ((w = w + T / 2 + f / 2 + v),
                      0 === f && 0 !== r && (w = w - U.size / 2 - v),
                      0 === r && (w = w - U.size / 2 - v),
                      0.001 > _(w) && (w = 0),
                      0 == x % U.params.slidesPerGroup && U.snapGrid.push(w),
                      U.slidesGrid.push(w))
                    : (0 == x % U.params.slidesPerGroup && U.snapGrid.push(w),
                      U.slidesGrid.push(w),
                      (w = w + T + v)),
                  (U.virtualSize += T + v),
                  (f = T),
                  x++);
              }
              U.virtualSize =
                K(U.virtualSize, U.size) + U.params.slidesOffsetAfter;
              var z;
              if (
                (U.rtl &&
                  U.wrongRTL &&
                  ("slide" === U.params.effect ||
                    "coverflow" === U.params.effect) &&
                  U.wrapper.css({
                    width: U.virtualSize + U.params.spaceBetween + "px",
                  }),
                (U.support.flexbox && !U.params.setWrapperSize) ||
                  (U.isHorizontal()
                    ? U.wrapper.css({
                        width: U.virtualSize + U.params.spaceBetween + "px",
                      })
                    : U.wrapper.css({
                        height: U.virtualSize + U.params.spaceBetween + "px",
                      })),
                1 < U.params.slidesPerColumn &&
                  ((U.virtualSize = (T + U.params.spaceBetween) * y),
                  (U.virtualSize =
                    j(U.virtualSize / U.params.slidesPerColumn) -
                    U.params.spaceBetween),
                  U.isHorizontal()
                    ? U.wrapper.css({
                        width: U.virtualSize + U.params.spaceBetween + "px",
                      })
                    : U.wrapper.css({
                        height: U.virtualSize + U.params.spaceBetween + "px",
                      }),
                  U.params.centeredSlides))
              ) {
                for (z = [], r = 0; r < U.snapGrid.length; r++)
                  U.snapGrid[r] < U.virtualSize + U.snapGrid[0] &&
                    z.push(U.snapGrid[r]);
                U.snapGrid = z;
              }
              if (!U.params.centeredSlides) {
                for (z = [], r = 0; r < U.snapGrid.length; r++)
                  U.snapGrid[r] <= U.virtualSize - U.size &&
                    z.push(U.snapGrid[r]);
                (U.snapGrid = z),
                  1 <
                    Z(U.virtualSize - U.size) -
                      Z(U.snapGrid[U.snapGrid.length - 1]) &&
                    U.snapGrid.push(U.virtualSize - U.size);
              }
              0 === U.snapGrid.length && (U.snapGrid = [0]),
                0 !== U.params.spaceBetween &&
                  (U.isHorizontal()
                    ? U.rtl
                      ? U.slides.css({
                          marginLeft: v + "px",
                        })
                      : U.slides.css({
                          marginRight: v + "px",
                        })
                    : U.slides.css({
                        marginBottom: v + "px",
                      })),
                U.params.watchSlidesProgress && U.updateSlidesOffset();
            }
          }),
          (U.updateSlidesOffset = function () {
            for (var a = 0; a < U.slides.length; a++)
              U.slides[a].swiperSlideOffset = U.isHorizontal()
                ? U.slides[a].offsetLeft
                : U.slides[a].offsetTop;
          }),
          (U.currentSlidesPerView = function () {
            var r,
              n,
              o = 1;
            if (U.params.centeredSlides) {
              var l,
                p = U.slides[U.activeIndex].swiperSlideSize;
              for (r = U.activeIndex + 1; r < U.slides.length; r++)
                U.slides[r] &&
                  !l &&
                  ((p += U.slides[r].swiperSlideSize),
                  o++,
                  p > U.size && (l = !0));
              for (n = U.activeIndex - 1; 0 <= n; n--)
                U.slides[n] &&
                  !l &&
                  ((p += U.slides[n].swiperSlideSize),
                  o++,
                  p > U.size && (l = !0));
            } else
              for (r = U.activeIndex + 1; r < U.slides.length; r++)
                U.slidesGrid[r] - U.slidesGrid[U.activeIndex] < U.size && o++;
            return o;
          }),
          (U.updateSlidesProgress = function (o) {
            if (
              (void 0 === o && (o = U.translate || 0), 0 !== U.slides.length)
            ) {
              void 0 === U.slides[0].swiperSlideOffset &&
                U.updateSlidesOffset();
              var l = -o;
              U.rtl && (l = o),
                U.slides.removeClass(U.params.slideVisibleClass);
              for (var p = 0; p < U.slides.length; p++) {
                var d = U.slides[p],
                  s =
                    (l +
                      (U.params.centeredSlides ? U.minTranslate() : 0) -
                      d.swiperSlideOffset) /
                    (d.swiperSlideSize + U.params.spaceBetween);
                if (U.params.watchSlidesVisibility) {
                  var i = -(l - d.swiperSlideOffset),
                    r = i + U.slidesSizesGrid[p];
                  ((0 <= i && i < U.size) ||
                    (0 < r && r <= U.size) ||
                    (0 >= i && r >= U.size)) &&
                    U.slides.eq(p).addClass(U.params.slideVisibleClass);
                }
                d.progress = U.rtl ? -s : s;
              }
            }
          }),
          (U.updateProgress = function (r) {
            void 0 === r && (r = U.translate || 0);
            var i = U.maxTranslate() - U.minTranslate(),
              a = U.isBeginning,
              t = U.isEnd;
            0 == i
              ? ((U.progress = 0), (U.isBeginning = U.isEnd = !0))
              : ((U.progress = (r - U.minTranslate()) / i),
                (U.isBeginning = 0 >= U.progress),
                (U.isEnd = 1 <= U.progress)),
              U.isBeginning && !a && U.emit("onReachBeginning", U),
              U.isEnd && !t && U.emit("onReachEnd", U),
              U.params.watchSlidesProgress && U.updateSlidesProgress(r),
              U.emit("onProgress", U, U.progress);
          }),
          (U.updateActiveIndex = function () {
            var r,
              i,
              n,
              o = U.rtl ? U.translate : -U.translate;
            for (i = 0; i < U.slidesGrid.length; i++)
              void 0 === U.slidesGrid[i + 1]
                ? o >= U.slidesGrid[i] && (r = i)
                : o >= U.slidesGrid[i] &&
                  o <
                    U.slidesGrid[i + 1] -
                      (U.slidesGrid[i + 1] - U.slidesGrid[i]) / 2
                ? (r = i)
                : o >= U.slidesGrid[i] &&
                  o < U.slidesGrid[i + 1] &&
                  (r = i + 1);
            U.params.normalizeSlideIndex && (0 > r || void 0 === r) && (r = 0),
              (n = Z(r / U.params.slidesPerGroup)),
              n >= U.snapGrid.length && (n = U.snapGrid.length - 1),
              r !== U.activeIndex &&
                ((U.snapIndex = n),
                (U.previousIndex = U.activeIndex),
                (U.activeIndex = r),
                U.updateClasses(),
                U.updateRealIndex());
          }),
          (U.updateRealIndex = function () {
            U.realIndex = parseInt(
              U.slides.eq(U.activeIndex).attr("data-swiper-slide-index") ||
                U.activeIndex,
              10
            );
          }),
          (U.updateClasses = function () {
            U.slides.removeClass(
              U.params.slideActiveClass +
                " " +
                U.params.slideNextClass +
                " " +
                U.params.slidePrevClass +
                " " +
                U.params.slideDuplicateActiveClass +
                " " +
                U.params.slideDuplicateNextClass +
                " " +
                U.params.slideDuplicatePrevClass
            );
            var e = U.slides.eq(U.activeIndex);
            e.addClass(U.params.slideActiveClass),
              R.loop &&
                (e.hasClass(U.params.slideDuplicateClass)
                  ? U.wrapper
                      .children(
                        "." +
                          U.params.slideClass +
                          ":not(." +
                          U.params.slideDuplicateClass +
                          ')[data-swiper-slide-index="' +
                          U.realIndex +
                          '"]'
                      )
                      .addClass(U.params.slideDuplicateActiveClass)
                  : U.wrapper
                      .children(
                        "." +
                          U.params.slideClass +
                          "." +
                          U.params.slideDuplicateClass +
                          '[data-swiper-slide-index="' +
                          U.realIndex +
                          '"]'
                      )
                      .addClass(U.params.slideDuplicateActiveClass));
            var a = e
              .next("." + U.params.slideClass)
              .addClass(U.params.slideNextClass);
            U.params.loop &&
              0 === a.length &&
              ((a = U.slides.eq(0)), a.addClass(U.params.slideNextClass));
            var i = e
              .prev("." + U.params.slideClass)
              .addClass(U.params.slidePrevClass);
            if (
              (U.params.loop &&
                0 === i.length &&
                ((i = U.slides.eq(-1)), i.addClass(U.params.slidePrevClass)),
              R.loop &&
                (a.hasClass(U.params.slideDuplicateClass)
                  ? U.wrapper
                      .children(
                        "." +
                          U.params.slideClass +
                          ":not(." +
                          U.params.slideDuplicateClass +
                          ')[data-swiper-slide-index="' +
                          a.attr("data-swiper-slide-index") +
                          '"]'
                      )
                      .addClass(U.params.slideDuplicateNextClass)
                  : U.wrapper
                      .children(
                        "." +
                          U.params.slideClass +
                          "." +
                          U.params.slideDuplicateClass +
                          '[data-swiper-slide-index="' +
                          a.attr("data-swiper-slide-index") +
                          '"]'
                      )
                      .addClass(U.params.slideDuplicateNextClass),
                i.hasClass(U.params.slideDuplicateClass)
                  ? U.wrapper
                      .children(
                        "." +
                          U.params.slideClass +
                          ":not(." +
                          U.params.slideDuplicateClass +
                          ')[data-swiper-slide-index="' +
                          i.attr("data-swiper-slide-index") +
                          '"]'
                      )
                      .addClass(U.params.slideDuplicatePrevClass)
                  : U.wrapper
                      .children(
                        "." +
                          U.params.slideClass +
                          "." +
                          U.params.slideDuplicateClass +
                          '[data-swiper-slide-index="' +
                          i.attr("data-swiper-slide-index") +
                          '"]'
                      )
                      .addClass(U.params.slideDuplicatePrevClass)),
              U.paginationContainer && 0 < U.paginationContainer.length)
            ) {
              var d,
                m = U.params.loop
                  ? j(
                      (U.slides.length - 2 * U.loopedSlides) /
                        U.params.slidesPerGroup
                    )
                  : U.snapGrid.length;
              if (
                (U.params.loop
                  ? ((d = j(
                      (U.activeIndex - U.loopedSlides) / U.params.slidesPerGroup
                    )),
                    d > U.slides.length - 1 - 2 * U.loopedSlides &&
                      (d -= U.slides.length - 2 * U.loopedSlides),
                    d > m - 1 && (d -= m),
                    0 > d &&
                      "bullets" !== U.params.paginationType &&
                      (d = m + d))
                  : (d =
                      void 0 === U.snapIndex
                        ? U.activeIndex || 0
                        : U.snapIndex),
                "bullets" === U.params.paginationType &&
                  U.bullets &&
                  0 < U.bullets.length &&
                  (U.bullets.removeClass(U.params.bulletActiveClass),
                  1 < U.paginationContainer.length
                    ? U.bullets.each(function () {
                        B(this).index() === d &&
                          B(this).addClass(U.params.bulletActiveClass);
                      })
                    : U.bullets.eq(d).addClass(U.params.bulletActiveClass)),
                "fraction" === U.params.paginationType &&
                  (U.paginationContainer
                    .find("." + U.params.paginationCurrentClass)
                    .text(d + 1),
                  U.paginationContainer
                    .find("." + U.params.paginationTotalClass)
                    .text(m)),
                "progress" === U.params.paginationType)
              ) {
                var n = (d + 1) / m,
                  o = n,
                  c = 1;
                U.isHorizontal() || ((c = n), (o = 1)),
                  U.paginationContainer
                    .find("." + U.params.paginationProgressbarClass)
                    .transform(
                      "translate3d(0,0,0) scaleX(" + o + ") scaleY(" + c + ")"
                    )
                    .transition(U.params.speed);
              }
              "custom" === U.params.paginationType &&
                U.params.paginationCustomRender &&
                (U.paginationContainer.html(
                  U.params.paginationCustomRender(U, d + 1, m)
                ),
                U.emit("onPaginationRendered", U, U.paginationContainer[0]));
            }
            U.params.loop ||
              (U.params.prevButton &&
                U.prevButton &&
                0 < U.prevButton.length &&
                (U.isBeginning
                  ? (U.prevButton.addClass(U.params.buttonDisabledClass),
                    U.params.a11y && U.a11y && U.a11y.disable(U.prevButton))
                  : (U.prevButton.removeClass(U.params.buttonDisabledClass),
                    U.params.a11y && U.a11y && U.a11y.enable(U.prevButton))),
              U.params.nextButton &&
                U.nextButton &&
                0 < U.nextButton.length &&
                (U.isEnd
                  ? (U.nextButton.addClass(U.params.buttonDisabledClass),
                    U.params.a11y && U.a11y && U.a11y.disable(U.nextButton))
                  : (U.nextButton.removeClass(U.params.buttonDisabledClass),
                    U.params.a11y && U.a11y && U.a11y.enable(U.nextButton))));
          }),
          (U.updatePagination = function () {
            if (
              U.params.pagination &&
              U.paginationContainer &&
              0 < U.paginationContainer.length
            ) {
              var s = "";
              if ("bullets" === U.params.paginationType) {
                for (
                  var r = U.params.loop
                      ? j(
                          (U.slides.length - 2 * U.loopedSlides) /
                            U.params.slidesPerGroup
                        )
                      : U.snapGrid.length,
                    a = 0;
                  a < r;
                  a++
                )
                  s += U.params.paginationBulletRender
                    ? U.params.paginationBulletRender(
                        U,
                        a,
                        U.params.bulletClass
                      )
                    : "<" +
                      U.params.paginationElement +
                      ' class="' +
                      U.params.bulletClass +
                      '"></' +
                      U.params.paginationElement +
                      ">";
                U.paginationContainer.html(s),
                  (U.bullets = U.paginationContainer.find(
                    "." + U.params.bulletClass
                  )),
                  U.params.paginationClickable &&
                    U.params.a11y &&
                    U.a11y &&
                    U.a11y.initPagination();
              }
              "fraction" === U.params.paginationType &&
                ((s = U.params.paginationFractionRender
                  ? U.params.paginationFractionRender(
                      U,
                      U.params.paginationCurrentClass,
                      U.params.paginationTotalClass
                    )
                  : '<span class="' +
                    U.params.paginationCurrentClass +
                    '"></span> / <span class="' +
                    U.params.paginationTotalClass +
                    '"></span>'),
                U.paginationContainer.html(s)),
                "progress" === U.params.paginationType &&
                  ((s = U.params.paginationProgressRender
                    ? U.params.paginationProgressRender(
                        U,
                        U.params.paginationProgressbarClass
                      )
                    : '<span class="' +
                      U.params.paginationProgressbarClass +
                      '"></span>'),
                  U.paginationContainer.html(s)),
                "custom" !== U.params.paginationType &&
                  U.emit("onPaginationRendered", U, U.paginationContainer[0]);
            }
          }),
          (U.update = function (s) {
            function e() {
              U.rtl,
                U.translate,
                (a = F(K(U.translate, U.maxTranslate()), U.minTranslate())),
                U.setWrapperTranslate(a),
                U.updateActiveIndex(),
                U.updateClasses();
            }
            if (U) {
              U.updateContainerSize(),
                U.updateSlidesSize(),
                U.updateProgress(),
                U.updatePagination(),
                U.updateClasses(),
                U.params.scrollbar && U.scrollbar && U.scrollbar.set();
              var a;
              s
                ? (U.controller &&
                    U.controller.spline &&
                    (U.controller.spline = void 0),
                  U.params.freeMode
                    ? (e(), U.params.autoHeight && U.updateAutoHeight())
                    : (("auto" === U.params.slidesPerView ||
                        1 < U.params.slidesPerView) &&
                      U.isEnd &&
                      !U.params.centeredSlides
                        ? U.slideTo(U.slides.length - 1, 0, !1, !0)
                        : U.slideTo(U.activeIndex, 0, !1, !0)) || e())
                : U.params.autoHeight && U.updateAutoHeight();
            }
          }),
          (U.onResize = function (r) {
            U.params.onBeforeResize && U.params.onBeforeResize(U),
              U.params.breakpoints && U.setBreakpoint();
            var e = U.params.allowSwipeToPrev,
              a = U.params.allowSwipeToNext;
            (U.params.allowSwipeToPrev = U.params.allowSwipeToNext = !0),
              U.updateContainerSize(),
              U.updateSlidesSize(),
              ("auto" === U.params.slidesPerView || U.params.freeMode || r) &&
                U.updatePagination(),
              U.params.scrollbar && U.scrollbar && U.scrollbar.set(),
              U.controller &&
                U.controller.spline &&
                (U.controller.spline = void 0);
            var t = !1;
            if (U.params.freeMode) {
              var n = F(K(U.translate, U.maxTranslate()), U.minTranslate());
              U.setWrapperTranslate(n),
                U.updateActiveIndex(),
                U.updateClasses(),
                U.params.autoHeight && U.updateAutoHeight();
            } else
              U.updateClasses(),
                (t =
                  ("auto" === U.params.slidesPerView ||
                    1 < U.params.slidesPerView) &&
                  U.isEnd &&
                  !U.params.centeredSlides
                    ? U.slideTo(U.slides.length - 1, 0, !1, !0)
                    : U.slideTo(U.activeIndex, 0, !1, !0));
            U.params.lazyLoading && !t && U.lazy && U.lazy.load(),
              (U.params.allowSwipeToPrev = e),
              (U.params.allowSwipeToNext = a),
              U.params.onAfterResize && U.params.onAfterResize(U);
          }),
          (U.touchEventsDesktop = {
            start: "mousedown",
            move: "mousemove",
            end: "mouseup",
          }),
          window.navigator.pointerEnabled
            ? (U.touchEventsDesktop = {
                start: "pointerdown",
                move: "pointermove",
                end: "pointerup",
              })
            : window.navigator.msPointerEnabled &&
              (U.touchEventsDesktop = {
                start: "MSPointerDown",
                move: "MSPointerMove",
                end: "MSPointerUp",
              }),
          (U.touchEvents = {
            start:
              U.support.touch || !U.params.simulateTouch
                ? "touchstart"
                : U.touchEventsDesktop.start,
            move:
              U.support.touch || !U.params.simulateTouch
                ? "touchmove"
                : U.touchEventsDesktop.move,
            end:
              U.support.touch || !U.params.simulateTouch
                ? "touchend"
                : U.touchEventsDesktop.end,
          }),
          (window.navigator.pointerEnabled ||
            window.navigator.msPointerEnabled) &&
            ("container" === U.params.touchEventsTarget
              ? U.container
              : U.wrapper
            ).addClass("swiper-wp8-" + U.params.direction),
          (U.initEvents = function (i) {
            var e = i ? "off" : "on",
              a = i ? "removeEventListener" : "addEventListener",
              t =
                "container" === U.params.touchEventsTarget
                  ? U.container[0]
                  : U.wrapper[0],
              s = U.support.touch ? t : document,
              r = !!U.params.nested;
            if (U.browser.ie)
              t[a](U.touchEvents.start, U.onTouchStart, !1),
                s[a](U.touchEvents.move, U.onTouchMove, r),
                s[a](U.touchEvents.end, U.onTouchEnd, !1);
            else {
              if (U.support.touch) {
                var n = "touchstart" === U.touchEvents.start &&
                  U.support.passiveListener &&
                  U.params.passiveListeners && {
                    passive: !0,
                    capture: !1,
                  };
                t[a](U.touchEvents.start, U.onTouchStart, n),
                  t[a](U.touchEvents.move, U.onTouchMove, r),
                  t[a](U.touchEvents.end, U.onTouchEnd, n);
              }
              ((R.simulateTouch && !U.device.ios && !U.device.android) ||
                (R.simulateTouch && !U.support.touch && U.device.ios)) &&
                (t[a]("mousedown", U.onTouchStart, !1),
                document[a]("mousemove", U.onTouchMove, r),
                document[a]("mouseup", U.onTouchEnd, !1));
            }
            window[a]("resize", U.onResize),
              U.params.nextButton &&
                U.nextButton &&
                0 < U.nextButton.length &&
                (U.nextButton[e]("click", U.onClickNext),
                U.params.a11y &&
                  U.a11y &&
                  U.nextButton[e]("keydown", U.a11y.onEnterKey)),
              U.params.prevButton &&
                U.prevButton &&
                0 < U.prevButton.length &&
                (U.prevButton[e]("click", U.onClickPrev),
                U.params.a11y &&
                  U.a11y &&
                  U.prevButton[e]("keydown", U.a11y.onEnterKey)),
              U.params.pagination &&
                U.params.paginationClickable &&
                (U.paginationContainer[e](
                  "click",
                  "." + U.params.bulletClass,
                  U.onClickIndex
                ),
                U.params.a11y &&
                  U.a11y &&
                  U.paginationContainer[e](
                    "keydown",
                    "." + U.params.bulletClass,
                    U.a11y.onEnterKey
                  )),
              (U.params.preventClicks || U.params.preventClicksPropagation) &&
                t[a]("click", U.preventClicks, !0);
          }),
          (U.attachEvents = function () {
            U.initEvents();
          }),
          (U.detachEvents = function () {
            U.initEvents(!0);
          }),
          (U.allowClick = !0),
          (U.preventClicks = function (a) {
            U.allowClick ||
              (U.params.preventClicks && a.preventDefault(),
              U.params.preventClicksPropagation &&
                U.animating &&
                (a.stopPropagation(), a.stopImmediatePropagation()));
          }),
          (U.onClickNext = function (a) {
            a.preventDefault(), (U.isEnd && !U.params.loop) || U.slideNext();
          }),
          (U.onClickPrev = function (a) {
            a.preventDefault(),
              (U.isBeginning && !U.params.loop) || U.slidePrev();
          }),
          (U.onClickIndex = function (e) {
            e.preventDefault();
            var a = B(this).index() * U.params.slidesPerGroup;
            U.params.loop && (a += U.loopedSlides), U.slideTo(a);
          }),
          (U.updateClickedSlide = function (e) {
            var a = V(e, "." + U.params.slideClass),
              t = !1;
            if (a)
              for (var o = 0; o < U.slides.length; o++)
                U.slides[o] === a && (t = !0);
            if (!a || !t)
              return (U.clickedSlide = void 0), void (U.clickedIndex = void 0);
            if (
              ((U.clickedSlide = a),
              (U.clickedIndex = B(a).index()),
              U.params.slideToClickedSlide &&
                void 0 !== U.clickedIndex &&
                U.clickedIndex !== U.activeIndex)
            ) {
              var p,
                d = U.clickedIndex,
                m =
                  "auto" === U.params.slidesPerView
                    ? U.currentSlidesPerView()
                    : U.params.slidesPerView;
              if (U.params.loop) {
                if (U.animating) return;
                (p = parseInt(
                  B(U.clickedSlide).attr("data-swiper-slide-index"),
                  10
                )),
                  U.params.centeredSlides
                    ? d < U.loopedSlides - m / 2 ||
                      d > U.slides.length - U.loopedSlides + m / 2
                      ? (U.fixLoop(),
                        (d = U.wrapper
                          .children(
                            "." +
                              U.params.slideClass +
                              '[data-swiper-slide-index="' +
                              p +
                              '"]:not(.' +
                              U.params.slideDuplicateClass +
                              ")"
                          )
                          .eq(0)
                          .index()),
                        setTimeout(function () {
                          U.slideTo(d);
                        }, 0))
                      : U.slideTo(d)
                    : d > U.slides.length - m
                    ? (U.fixLoop(),
                      (d = U.wrapper
                        .children(
                          "." +
                            U.params.slideClass +
                            '[data-swiper-slide-index="' +
                            p +
                            '"]:not(.' +
                            U.params.slideDuplicateClass +
                            ")"
                        )
                        .eq(0)
                        .index()),
                      setTimeout(function () {
                        U.slideTo(d);
                      }, 0))
                    : U.slideTo(d);
              } else U.slideTo(d);
            }
          });
        var b,
          Q,
          $,
          J,
          y,
          ee,
          ae,
          te,
          se,
          re,
          ie = Date.now(),
          ne = [];
        (U.animating = !1),
          (U.touches = {
            startX: 0,
            startY: 0,
            currentX: 0,
            currentY: 0,
            diff: 0,
          });
        var G, oe;
        for (var le in ((U.onTouchStart = function (e) {
          if (
            (e.originalEvent && (e = e.originalEvent),
            (G = "touchstart" === e.type) || !("which" in e) || 3 !== e.which)
          ) {
            if (U.params.noSwiping && V(e, "." + U.params.noSwipingClass))
              return void (U.allowClick = !0);
            if (!U.params.swipeHandler || V(e, U.params.swipeHandler)) {
              var r = (U.touches.currentX =
                  "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX),
                t = (U.touches.currentY =
                  "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY);
              if (
                !(
                  U.device.ios &&
                  U.params.iOSEdgeSwipeDetection &&
                  r <= U.params.iOSEdgeSwipeThreshold
                )
              ) {
                if (
                  ((b = !0),
                  (Q = !1),
                  ($ = !0),
                  (y = void 0),
                  (oe = void 0),
                  (U.touches.startX = r),
                  (U.touches.startY = t),
                  (J = Date.now()),
                  (U.allowClick = !0),
                  U.updateContainerSize(),
                  (U.swipeDirection = void 0),
                  0 < U.params.threshold && (te = !1),
                  "touchstart" !== e.type)
                ) {
                  var s = !0;
                  B(e.target).is("input, select, textarea, button, video") &&
                    (s = !1),
                    document.activeElement &&
                      B(document.activeElement).is(
                        "input, select, textarea, button, video"
                      ) &&
                      document.activeElement.blur(),
                    s && e.preventDefault();
                }
                U.emit("onTouchStart", U, e);
              }
            }
          }
        }),
        (U.onTouchMove = function (e) {
          if (
            (e.originalEvent && (e = e.originalEvent),
            !G || "mousemove" !== e.type)
          ) {
            if (e.preventedByNestedSwiper)
              return (
                (U.touches.startX =
                  "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX),
                void (U.touches.startY =
                  "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY)
              );
            if (U.params.onlyExternal)
              return (
                (U.allowClick = !1),
                void (
                  b &&
                  ((U.touches.startX = U.touches.currentX =
                    "touchmove" === e.type
                      ? e.targetTouches[0].pageX
                      : e.pageX),
                  (U.touches.startY = U.touches.currentY =
                    "touchmove" === e.type
                      ? e.targetTouches[0].pageY
                      : e.pageY),
                  (J = Date.now()))
                )
              );
            if (G && U.params.touchReleaseOnEdges && !U.params.loop)
              if (U.isHorizontal()) {
                if (
                  (U.touches.currentX < U.touches.startX &&
                    U.translate <= U.maxTranslate()) ||
                  (U.touches.currentX > U.touches.startX &&
                    U.translate >= U.minTranslate())
                )
                  return;
              } else if (
                (U.touches.currentY < U.touches.startY &&
                  U.translate <= U.maxTranslate()) ||
                (U.touches.currentY > U.touches.startY &&
                  U.translate >= U.minTranslate())
              )
                return;
            if (
              G &&
              document.activeElement &&
              e.target === document.activeElement &&
              B(e.target).is("input, select, textarea, button, video")
            )
              return (Q = !0), void (U.allowClick = !1);
            if (
              ($ && U.emit("onTouchMove", U, e),
              !(e.targetTouches && 1 < e.targetTouches.length))
            ) {
              if (
                ((U.touches.currentX =
                  "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX),
                (U.touches.currentY =
                  "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY),
                void 0 === y)
              ) {
                var i;
                (U.isHorizontal() && U.touches.currentY === U.touches.startY) ||
                (!U.isHorizontal() && U.touches.currentX === U.touches.startX)
                  ? (y = !1)
                  : ((i =
                      (180 *
                        Math.atan2(
                          _(U.touches.currentY - U.touches.startY),
                          _(U.touches.currentX - U.touches.startX)
                        )) /
                      m),
                    (y = U.isHorizontal()
                      ? i > U.params.touchAngle
                      : 90 - i > U.params.touchAngle));
              }
              if (
                (y && U.emit("onTouchMoveOpposite", U, e),
                void 0 === oe &&
                  ((U.touches.currentX === U.touches.startX &&
                    U.touches.currentY === U.touches.startY) ||
                    (oe = !0)),
                b)
              ) {
                if (y) return void (b = !1);
                if (oe) {
                  (U.allowClick = !1),
                    U.emit("onSliderMove", U, e),
                    e.preventDefault(),
                    U.params.touchMoveStopPropagation &&
                      !U.params.nested &&
                      e.stopPropagation(),
                    Q ||
                      (R.loop && U.fixLoop(),
                      (ae = U.getWrapperTranslate()),
                      U.setWrapperTransition(0),
                      U.animating &&
                        U.wrapper.trigger(
                          "webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd"
                        ),
                      U.params.autoplay &&
                        U.autoplaying &&
                        (U.params.autoplayDisableOnInteraction
                          ? U.stopAutoplay()
                          : U.pauseAutoplay()),
                      (re = !1),
                      !U.params.grabCursor ||
                        (!0 !== U.params.allowSwipeToNext &&
                          !0 !== U.params.allowSwipeToPrev) ||
                        U.setGrabCursor(!0)),
                    (Q = !0);
                  var n = (U.touches.diff = U.isHorizontal()
                    ? U.touches.currentX - U.touches.startX
                    : U.touches.currentY - U.touches.startY);
                  (n *= U.params.touchRatio),
                    U.rtl && (n = -n),
                    (U.swipeDirection = 0 < n ? "prev" : "next"),
                    (ee = n + ae);
                  var o = !0;
                  if (
                    (0 < n && ee > U.minTranslate()
                      ? ((o = !1),
                        U.params.resistance &&
                          (ee =
                            U.minTranslate() -
                            1 +
                            d(
                              -U.minTranslate() + ae + n,
                              U.params.resistanceRatio
                            )))
                      : 0 > n &&
                        ee < U.maxTranslate() &&
                        ((o = !1),
                        U.params.resistance &&
                          (ee =
                            U.maxTranslate() +
                            1 -
                            d(
                              U.maxTranslate() - ae - n,
                              U.params.resistanceRatio
                            ))),
                    o && (e.preventedByNestedSwiper = !0),
                    !U.params.allowSwipeToNext &&
                      "next" === U.swipeDirection &&
                      ee < ae &&
                      (ee = ae),
                    !U.params.allowSwipeToPrev &&
                      "prev" === U.swipeDirection &&
                      ee > ae &&
                      (ee = ae),
                    0 < U.params.threshold)
                  ) {
                    if (!(_(n) > U.params.threshold || te))
                      return void (ee = ae);
                    if (!te)
                      return (
                        (te = !0),
                        (U.touches.startX = U.touches.currentX),
                        (U.touches.startY = U.touches.currentY),
                        (ee = ae),
                        void (U.touches.diff = U.isHorizontal()
                          ? U.touches.currentX - U.touches.startX
                          : U.touches.currentY - U.touches.startY)
                      );
                  }
                  U.params.followFinger &&
                    ((U.params.freeMode || U.params.watchSlidesProgress) &&
                      U.updateActiveIndex(),
                    U.params.freeMode &&
                      (0 === ne.length &&
                        ne.push({
                          position:
                            U.touches[U.isHorizontal() ? "startX" : "startY"],
                          time: J,
                        }),
                      ne.push({
                        position:
                          U.touches[U.isHorizontal() ? "currentX" : "currentY"],
                        time: new window.Date().getTime(),
                      })),
                    U.updateProgress(ee),
                    U.setWrapperTranslate(ee));
                }
              }
            }
          }
        }),
        (U.onTouchEnd = function (e) {
          if (
            (e.originalEvent && (e = e.originalEvent),
            $ && U.emit("onTouchEnd", U, e),
            ($ = !1),
            b)
          ) {
            U.params.grabCursor &&
              Q &&
              b &&
              (!0 === U.params.allowSwipeToNext ||
                !0 === U.params.allowSwipeToPrev) &&
              U.setGrabCursor(!1);
            var T = Date.now(),
              t = T - J;
            if (
              (U.allowClick &&
                (U.updateClickedSlide(e),
                U.emit("onTap", U, e),
                300 > t &&
                  300 < T - ie &&
                  (se && clearTimeout(se),
                  (se = setTimeout(function () {
                    U &&
                      (U.params.paginationHide &&
                        0 < U.paginationContainer.length &&
                        !B(e.target).hasClass(U.params.bulletClass) &&
                        U.paginationContainer.toggleClass(
                          U.params.paginationHiddenClass
                        ),
                      U.emit("onClick", U, e));
                  }, 300))),
                300 > t &&
                  300 > T - ie &&
                  (se && clearTimeout(se), U.emit("onDoubleTap", U, e))),
              (ie = Date.now()),
              setTimeout(function () {
                U && (U.allowClick = !0);
              }, 0),
              !b ||
                !Q ||
                !U.swipeDirection ||
                0 === U.touches.diff ||
                ee === ae)
            )
              return void (b = Q = !1);
            b = Q = !1;
            var s;
            if (
              ((s = U.params.followFinger
                ? U.rtl
                  ? U.translate
                  : -U.translate
                : -ee),
              U.params.freeMode)
            ) {
              if (s < -U.minTranslate()) return void U.slideTo(U.activeIndex);
              if (s > -U.maxTranslate())
                return void (U.slides.length < U.snapGrid.length
                  ? U.slideTo(U.snapGrid.length - 1)
                  : U.slideTo(U.slides.length - 1));
              if (U.params.freeModeMomentum) {
                if (1 < ne.length) {
                  var S = ne.pop(),
                    r = ne.pop(),
                    n = S.position - r.position,
                    o = S.time - r.time;
                  (U.velocity = n / o),
                    (U.velocity /= 2),
                    _(U.velocity) < U.params.freeModeMinimumVelocity &&
                      (U.velocity = 0),
                    (150 < o || 300 < new window.Date().getTime() - S.time) &&
                      (U.velocity = 0);
                } else U.velocity = 0;
                (U.velocity *= U.params.freeModeMomentumVelocityRatio),
                  (ne.length = 0);
                var l = 1e3 * U.params.freeModeMomentumRatio,
                  C = U.velocity * l,
                  d = U.translate + C;
                U.rtl && (d = -d);
                var z,
                  E = !1,
                  P = 20 * _(U.velocity) * U.params.freeModeMomentumBounceRatio;
                if (d < U.maxTranslate())
                  U.params.freeModeMomentumBounce
                    ? (d + U.maxTranslate() < -P && (d = U.maxTranslate() - P),
                      (z = U.maxTranslate()),
                      (E = !0),
                      (re = !0))
                    : (d = U.maxTranslate());
                else if (d > U.minTranslate())
                  U.params.freeModeMomentumBounce
                    ? (d - U.minTranslate() > P && (d = U.minTranslate() + P),
                      (z = U.minTranslate()),
                      (E = !0),
                      (re = !0))
                    : (d = U.minTranslate());
                else if (U.params.freeModeSticky) {
                  var h,
                    I = 0;
                  for (I = 0; I < U.snapGrid.length; I += 1)
                    if (U.snapGrid[I] > -d) {
                      h = I;
                      break;
                    }
                  (d =
                    _(U.snapGrid[h] - d) < _(U.snapGrid[h - 1] - d) ||
                    "next" === U.swipeDirection
                      ? U.snapGrid[h]
                      : U.snapGrid[h - 1]),
                    U.rtl || (d = -d);
                }
                if (0 !== U.velocity)
                  l = U.rtl
                    ? _((-d - U.translate) / U.velocity)
                    : _((d - U.translate) / U.velocity);
                else if (U.params.freeModeSticky) return void U.slideReset();
                U.params.freeModeMomentumBounce && E
                  ? (U.updateProgress(z),
                    U.setWrapperTransition(l),
                    U.setWrapperTranslate(d),
                    U.onTransitionStart(),
                    (U.animating = !0),
                    U.wrapper.transitionEnd(function () {
                      U &&
                        re &&
                        (U.emit("onMomentumBounce", U),
                        U.setWrapperTransition(U.params.speed),
                        U.setWrapperTranslate(z),
                        U.wrapper.transitionEnd(function () {
                          U && U.onTransitionEnd();
                        }));
                    }))
                  : U.velocity
                  ? (U.updateProgress(d),
                    U.setWrapperTransition(l),
                    U.setWrapperTranslate(d),
                    U.onTransitionStart(),
                    U.animating ||
                      ((U.animating = !0),
                      U.wrapper.transitionEnd(function () {
                        U && U.onTransitionEnd();
                      })))
                  : U.updateProgress(d),
                  U.updateActiveIndex();
              }
              return void (
                (!U.params.freeModeMomentum || t >= U.params.longSwipesMs) &&
                (U.updateProgress(), U.updateActiveIndex())
              );
            }
            var k,
              M = 0,
              L = U.slidesSizesGrid[0];
            for (k = 0; k < U.slidesGrid.length; k += U.params.slidesPerGroup)
              void 0 === U.slidesGrid[k + U.params.slidesPerGroup]
                ? s >= U.slidesGrid[k] &&
                  ((M = k),
                  (L =
                    U.slidesGrid[U.slidesGrid.length - 1] -
                    U.slidesGrid[U.slidesGrid.length - 2]))
                : s >= U.slidesGrid[k] &&
                  s < U.slidesGrid[k + U.params.slidesPerGroup] &&
                  ((M = k),
                  (L =
                    U.slidesGrid[k + U.params.slidesPerGroup] -
                    U.slidesGrid[k]));
            var D = (s - U.slidesGrid[M]) / L;
            if (t > U.params.longSwipesMs) {
              if (!U.params.longSwipes) return void U.slideTo(U.activeIndex);
              "next" === U.swipeDirection &&
                (D >= U.params.longSwipesRatio
                  ? U.slideTo(M + U.params.slidesPerGroup)
                  : U.slideTo(M)),
                "prev" === U.swipeDirection &&
                  (D > 1 - U.params.longSwipesRatio
                    ? U.slideTo(M + U.params.slidesPerGroup)
                    : U.slideTo(M));
            } else {
              if (!U.params.shortSwipes) return void U.slideTo(U.activeIndex);
              "next" === U.swipeDirection &&
                U.slideTo(M + U.params.slidesPerGroup),
                "prev" === U.swipeDirection && U.slideTo(M);
            }
          }
        }),
        (U._slideTo = function (t, e) {
          return U.slideTo(t, e, !0, !0);
        }),
        (U.slideTo = function (n, o, l, p) {
          void 0 === l && (l = !0),
            void 0 === n && (n = 0),
            0 > n && (n = 0),
            (U.snapIndex = Z(n / U.params.slidesPerGroup)),
            U.snapIndex >= U.snapGrid.length &&
              (U.snapIndex = U.snapGrid.length - 1);
          var s = -U.snapGrid[U.snapIndex];
          if (
            (U.params.autoplay &&
              U.autoplaying &&
              (p || !U.params.autoplayDisableOnInteraction
                ? U.pauseAutoplay(o)
                : U.stopAutoplay()),
            U.updateProgress(s),
            U.params.normalizeSlideIndex)
          )
            for (var i = 0; i < U.slidesGrid.length; i++)
              -Z(100 * s) >= Z(100 * U.slidesGrid[i]) && (n = i);
          return (
            !(
              !U.params.allowSwipeToNext &&
              s < U.translate &&
              s < U.minTranslate()
            ) &&
            !(
              !U.params.allowSwipeToPrev &&
              s > U.translate &&
              s > U.maxTranslate() &&
              (U.activeIndex || 0) !== n
            ) &&
            (void 0 === o && (o = U.params.speed),
            (U.previousIndex = U.activeIndex || 0),
            (U.activeIndex = n),
            U.updateRealIndex(),
            (U.rtl && -s === U.translate) || (!U.rtl && s === U.translate)
              ? (U.params.autoHeight && U.updateAutoHeight(),
                U.updateClasses(),
                "slide" !== U.params.effect && U.setWrapperTranslate(s),
                !1)
              : (U.updateClasses(),
                U.onTransitionStart(l),
                0 === o || U.browser.lteIE9
                  ? (U.setWrapperTranslate(s),
                    U.setWrapperTransition(0),
                    U.onTransitionEnd(l))
                  : (U.setWrapperTranslate(s),
                    U.setWrapperTransition(o),
                    U.animating ||
                      ((U.animating = !0),
                      U.wrapper.transitionEnd(function () {
                        U && U.onTransitionEnd(l);
                      }))),
                !0))
          );
        }),
        (U.onTransitionStart = function (a) {
          void 0 === a && (a = !0),
            U.params.autoHeight && U.updateAutoHeight(),
            U.lazy && U.lazy.onTransitionStart(),
            a &&
              (U.emit("onTransitionStart", U),
              U.activeIndex !== U.previousIndex &&
                (U.emit("onSlideChangeStart", U),
                U.activeIndex > U.previousIndex
                  ? U.emit("onSlideNextStart", U)
                  : U.emit("onSlidePrevStart", U)));
        }),
        (U.onTransitionEnd = function (a) {
          (U.animating = !1),
            U.setWrapperTransition(0),
            void 0 === a && (a = !0),
            U.lazy && U.lazy.onTransitionEnd(),
            a &&
              (U.emit("onTransitionEnd", U),
              U.activeIndex !== U.previousIndex &&
                (U.emit("onSlideChangeEnd", U),
                U.activeIndex > U.previousIndex
                  ? U.emit("onSlideNextEnd", U)
                  : U.emit("onSlidePrevEnd", U))),
            U.params.history &&
              U.history &&
              U.history.setHistory(U.params.history, U.activeIndex),
            U.params.hashnav && U.hashnav && U.hashnav.setHash();
        }),
        (U.slideNext = function (s, e, a) {
          return U.params.loop
            ? !U.animating &&
                (U.fixLoop(),
                U.container[0].clientLeft,
                U.slideTo(U.activeIndex + U.params.slidesPerGroup, e, s, a))
            : U.slideTo(U.activeIndex + U.params.slidesPerGroup, e, s, a);
        }),
        (U._slideNext = function (a) {
          return U.slideNext(!0, a, !0);
        }),
        (U.slidePrev = function (s, e, a) {
          return U.params.loop
            ? !U.animating &&
                (U.fixLoop(),
                U.container[0].clientLeft,
                U.slideTo(U.activeIndex - 1, e, s, a))
            : U.slideTo(U.activeIndex - 1, e, s, a);
        }),
        (U._slidePrev = function (a) {
          return U.slidePrev(!0, a, !0);
        }),
        (U.slideReset = function (t, e) {
          return U.slideTo(U.activeIndex, e, t);
        }),
        (U.disableTouchControl = function () {
          return (U.params.onlyExternal = !0), !0;
        }),
        (U.enableTouchControl = function () {
          return (U.params.onlyExternal = !1), !0;
        }),
        (U.setWrapperTransition = function (t, e) {
          U.wrapper.transition(t),
            "slide" !== U.params.effect &&
              U.effects[U.params.effect] &&
              U.effects[U.params.effect].setTransition(t),
            U.params.parallax && U.parallax && U.parallax.setTransition(t),
            U.params.scrollbar && U.scrollbar && U.scrollbar.setTransition(t),
            U.params.control &&
              U.controller &&
              U.controller.setTransition(t, e),
            U.emit("onSetTransition", U, t);
        }),
        (U.setWrapperTranslate = function (r, e, a) {
          var t = 0,
            l = 0;
          U.isHorizontal() ? (t = U.rtl ? -r : r) : (l = r),
            U.params.roundLengths && ((t = W(t)), (l = W(l))),
            U.params.virtualTranslate ||
              (U.support.transforms3d
                ? U.wrapper.transform(
                    "translate3d(" + t + "px, " + l + "px, 0px)"
                  )
                : U.wrapper.transform("translate(" + t + "px, " + l + "px)")),
            (U.translate = U.isHorizontal() ? t : l);
          var p,
            d = U.maxTranslate() - U.minTranslate();
          (p = 0 == d ? 0 : (r - U.minTranslate()) / d),
            p !== U.progress && U.updateProgress(r),
            e && U.updateActiveIndex(),
            "slide" !== U.params.effect &&
              U.effects[U.params.effect] &&
              U.effects[U.params.effect].setTranslate(U.translate),
            U.params.parallax &&
              U.parallax &&
              U.parallax.setTranslate(U.translate),
            U.params.scrollbar &&
              U.scrollbar &&
              U.scrollbar.setTranslate(U.translate),
            U.params.control &&
              U.controller &&
              U.controller.setTranslate(U.translate, a),
            U.emit("onSetTranslate", U, U.translate);
        }),
        (U.getTranslate = function (n, e) {
          var o, l, p, d;
          return (
            void 0 === e && (e = "x"),
            U.params.virtualTranslate
              ? U.rtl
                ? -U.translate
                : U.translate
              : ((p = window.getComputedStyle(n, null)),
                window.WebKitCSSMatrix
                  ? ((l = p.transform || p.webkitTransform),
                    6 < l.split(",").length &&
                      (l = l
                        .split(", ")
                        .map(function (a) {
                          return a.replace(",", ".");
                        })
                        .join(", ")),
                    (d = new window.WebKitCSSMatrix("none" === l ? "" : l)))
                  : ((d =
                      p.MozTransform ||
                      p.OTransform ||
                      p.MsTransform ||
                      p.msTransform ||
                      p.transform ||
                      p
                        .getPropertyValue("transform")
                        .replace("translate(", "matrix(1, 0, 0, 1,")),
                    (o = d.toString().split(","))),
                "x" === e &&
                  (l = window.WebKitCSSMatrix
                    ? d.m41
                    : 16 === o.length
                    ? parseFloat(o[12])
                    : parseFloat(o[4])),
                "y" === e &&
                  (l = window.WebKitCSSMatrix
                    ? d.m42
                    : 16 === o.length
                    ? parseFloat(o[13])
                    : parseFloat(o[5])),
                U.rtl && l && (l = -l),
                l || 0)
          );
        }),
        (U.getWrapperTranslate = function (a) {
          return (
            void 0 === a && (a = U.isHorizontal() ? "x" : "y"),
            U.getTranslate(U.wrapper[0], a)
          );
        }),
        (U.observers = []),
        (U.initObservers = function () {
          if (U.params.observeParents)
            for (var t = U.container.parents(), e = 0; e < t.length; e++)
              s(t[e]);
          s(U.container[0], {
            childList: !1,
          }),
            s(U.wrapper[0], {
              attributes: !1,
            });
        }),
        (U.disconnectObservers = function () {
          for (var a = 0; a < U.observers.length; a++)
            U.observers[a].disconnect();
          U.observers = [];
        }),
        (U.createLoop = function () {
          U.wrapper
            .children(
              "." + U.params.slideClass + "." + U.params.slideDuplicateClass
            )
            .remove();
          var e = U.wrapper.children("." + U.params.slideClass);
          "auto" !== U.params.slidesPerView ||
            U.params.loopedSlides ||
            (U.params.loopedSlides = e.length),
            (U.loopedSlides = parseInt(
              U.params.loopedSlides || U.params.slidesPerView,
              10
            )),
            (U.loopedSlides += U.params.loopAdditionalSlides),
            U.loopedSlides > e.length && (U.loopedSlides = e.length);
          var a,
            o = [],
            s = [];
          for (
            e.each(function (a, t) {
              var r = B(this);
              a < U.loopedSlides && s.push(t),
                a < e.length && a >= e.length - U.loopedSlides && o.push(t),
                r.attr("data-swiper-slide-index", a);
            }),
              a = 0;
            a < s.length;
            a++
          )
            U.wrapper.append(
              B(s[a].cloneNode(!0)).addClass(U.params.slideDuplicateClass)
            );
          for (a = o.length - 1; 0 <= a; a--)
            U.wrapper.prepend(
              B(o[a].cloneNode(!0)).addClass(U.params.slideDuplicateClass)
            );
        }),
        (U.destroyLoop = function () {
          U.wrapper
            .children(
              "." + U.params.slideClass + "." + U.params.slideDuplicateClass
            )
            .remove(),
            U.slides.removeAttr("data-swiper-slide-index");
        }),
        (U.reLoop = function (t) {
          var e = U.activeIndex - U.loopedSlides;
          U.destroyLoop(),
            U.createLoop(),
            U.updateSlidesSize(),
            t && U.slideTo(e + U.loopedSlides, 0, !1);
        }),
        (U.fixLoop = function () {
          var a;
          U.activeIndex < U.loopedSlides
            ? ((a = U.slides.length - 3 * U.loopedSlides + U.activeIndex),
              (a += U.loopedSlides),
              U.slideTo(a, 0, !1, !0))
            : (("auto" === U.params.slidesPerView &&
                U.activeIndex >= 2 * U.loopedSlides) ||
                U.activeIndex > U.slides.length - 2 * U.params.slidesPerView) &&
              ((a = -U.slides.length + U.activeIndex + U.loopedSlides),
              (a += U.loopedSlides),
              U.slideTo(a, 0, !1, !0));
        }),
        (U.appendSlide = function (t) {
          if (
            (U.params.loop && U.destroyLoop(),
            "object" == _typeof(t) && t.length)
          )
            for (var e = 0; e < t.length; e++) t[e] && U.wrapper.append(t[e]);
          else U.wrapper.append(t);
          U.params.loop && U.createLoop(),
            (U.params.observer && U.support.observer) || U.update(!0);
        }),
        (U.prependSlide = function (s) {
          U.params.loop && U.destroyLoop();
          var e = U.activeIndex + 1;
          if ("object" == _typeof(s) && s.length) {
            for (var r = 0; r < s.length; r++) s[r] && U.wrapper.prepend(s[r]);
            e = U.activeIndex + s.length;
          } else U.wrapper.prepend(s);
          U.params.loop && U.createLoop(),
            (U.params.observer && U.support.observer) || U.update(!0),
            U.slideTo(e, 0, !1);
        }),
        (U.removeSlide = function (r) {
          U.params.loop &&
            (U.destroyLoop(),
            (U.slides = U.wrapper.children("." + U.params.slideClass)));
          var e,
            i = U.activeIndex;
          if ("object" == _typeof(r) && r.length) {
            for (var n = 0; n < r.length; n++)
              (e = r[n]), U.slides[e] && U.slides.eq(e).remove(), e < i && i--;
            i = K(i, 0);
          } else
            (e = r),
              U.slides[e] && U.slides.eq(e).remove(),
              e < i && i--,
              (i = K(i, 0));
          U.params.loop && U.createLoop(),
            (U.params.observer && U.support.observer) || U.update(!0),
            U.params.loop
              ? U.slideTo(i + U.loopedSlides, 0, !1)
              : U.slideTo(i, 0, !1);
        }),
        (U.removeAllSlides = function () {
          for (var t = [], e = 0; e < U.slides.length; e++) t.push(e);
          U.removeSlide(t);
        }),
        (U.effects = {
          fade: {
            setTranslate: function setTranslate() {
              for (var n = 0; n < U.slides.length; n++) {
                var o = U.slides.eq(n),
                  a = o[0].swiperSlideOffset,
                  t = -a;
                U.params.virtualTranslate || (t -= U.translate);
                var l = 0;
                U.isHorizontal() || ((l = t), (t = 0));
                var p = U.params.fade.crossFade
                  ? K(1 - _(o[0].progress), 0)
                  : 1 + F(K(o[0].progress, -1), 0);
                o.css({
                  opacity: p,
                }).transform("translate3d(" + t + "px, " + l + "px, 0px)");
              }
            },
            setTransition: function setTransition(t) {
              if (
                (U.slides.transition(t), U.params.virtualTranslate && 0 !== t)
              ) {
                var s = !1;
                U.slides.transitionEnd(function () {
                  if (!s && U) {
                    (s = !0), (U.animating = !1);
                    for (
                      var a = [
                          "webkitTransitionEnd",
                          "transitionend",
                          "oTransitionEnd",
                          "MSTransitionEnd",
                          "msTransitionEnd",
                        ],
                        e = 0;
                      e < a.length;
                      e++
                    )
                      U.wrapper.trigger(a[e]);
                  }
                });
              }
            },
          },
          flip: {
            setTranslate: function setTranslate() {
              for (var e = 0; e < U.slides.length; e++) {
                var m = U.slides.eq(e),
                  t = m[0].progress;
                U.params.flip.limitRotation && (t = K(F(m[0].progress, 1), -1));
                var c = m[0].swiperSlideOffset,
                  i = -180 * t,
                  r = i,
                  g = 0,
                  h = -c,
                  v = 0;
                if (
                  (U.isHorizontal()
                    ? U.rtl && (r = -r)
                    : ((v = h), (h = 0), (g = -r), (r = 0)),
                  (m[0].style.zIndex = -_(q(t)) + U.slides.length),
                  U.params.flip.slideShadows)
                ) {
                  var w = U.isHorizontal()
                      ? m.find(".swiper-slide-shadow-left")
                      : m.find(".swiper-slide-shadow-top"),
                    f = U.isHorizontal()
                      ? m.find(".swiper-slide-shadow-right")
                      : m.find(".swiper-slide-shadow-bottom");
                  0 === w.length &&
                    ((w = B(
                      '<div class="swiper-slide-shadow-' +
                        (U.isHorizontal() ? "left" : "top") +
                        '"></div>'
                    )),
                    m.append(w)),
                    0 === f.length &&
                      ((f = B(
                        '<div class="swiper-slide-shadow-' +
                          (U.isHorizontal() ? "right" : "bottom") +
                          '"></div>'
                      )),
                      m.append(f)),
                    w.length && (w[0].style.opacity = K(-t, 0)),
                    f.length && (f[0].style.opacity = K(t, 0));
                }
                m.transform(
                  "translate3d(" +
                    h +
                    "px, " +
                    v +
                    "px, 0px) rotateX(" +
                    g +
                    "deg) rotateY(" +
                    r +
                    "deg)"
                );
              }
            },
            setTransition: function setTransition(e) {
              if (
                (U.slides
                  .transition(e)
                  .find(
                    ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
                  )
                  .transition(e),
                U.params.virtualTranslate && 0 !== e)
              ) {
                var r = !1;
                U.slides.eq(U.activeIndex).transitionEnd(function () {
                  if (!r && U && B(this).hasClass(U.params.slideActiveClass)) {
                    (r = !0), (U.animating = !1);
                    for (
                      var e = [
                          "webkitTransitionEnd",
                          "transitionend",
                          "oTransitionEnd",
                          "MSTransitionEnd",
                          "msTransitionEnd",
                        ],
                        a = 0;
                      a < e.length;
                      a++
                    )
                      U.wrapper.trigger(e[a]);
                  }
                });
              }
            },
          },
          cube: {
            setTranslate: function setTranslate() {
              var e,
                x = 0;
              U.params.cube.shadow &&
                (U.isHorizontal()
                  ? ((e = U.wrapper.find(".swiper-cube-shadow")),
                    0 === e.length &&
                      ((e = B('<div class="swiper-cube-shadow"></div>')),
                      U.wrapper.append(e)),
                    e.css({
                      height: U.width + "px",
                    }))
                  : ((e = U.container.find(".swiper-cube-shadow")),
                    0 === e.length &&
                      ((e = B('<div class="swiper-cube-shadow"></div>')),
                      U.container.append(e))));
              for (var T = 0; T < U.slides.length; T++) {
                var S = U.slides.eq(T),
                  i = 90 * T,
                  C = Z(i / 360);
                U.rtl && ((i = -i), (C = Z(-i / 360)));
                var b = K(F(S[0].progress, 1), -1),
                  o = 0,
                  z = 0,
                  E = 0;
                0 == T % 4
                  ? ((o = 4 * -C * U.size), (E = 0))
                  : 0 == (T - 1) % 4
                  ? ((o = 0), (E = 4 * -C * U.size))
                  : 0 == (T - 2) % 4
                  ? ((o = U.size + 4 * C * U.size), (E = U.size))
                  : 0 == (T - 3) % 4 &&
                    ((o = -U.size), (E = 3 * U.size + 4 * U.size * C)),
                  U.rtl && (o = -o),
                  U.isHorizontal() || ((z = o), (o = 0));
                var P =
                  "rotateX(" +
                  (U.isHorizontal() ? 0 : -i) +
                  "deg) rotateY(" +
                  (U.isHorizontal() ? i : 0) +
                  "deg) translate3d(" +
                  o +
                  "px, " +
                  z +
                  "px, " +
                  E +
                  "px)";
                if (
                  (1 >= b &&
                    -1 < b &&
                    ((x = 90 * T + 90 * b), U.rtl && (x = 90 * -T - 90 * b)),
                  S.transform(P),
                  U.params.cube.slideShadows)
                ) {
                  var u = U.isHorizontal()
                      ? S.find(".swiper-slide-shadow-left")
                      : S.find(".swiper-slide-shadow-top"),
                    I = U.isHorizontal()
                      ? S.find(".swiper-slide-shadow-right")
                      : S.find(".swiper-slide-shadow-bottom");
                  0 === u.length &&
                    ((u = B(
                      '<div class="swiper-slide-shadow-' +
                        (U.isHorizontal() ? "left" : "top") +
                        '"></div>'
                    )),
                    S.append(u)),
                    0 === I.length &&
                      ((I = B(
                        '<div class="swiper-slide-shadow-' +
                          (U.isHorizontal() ? "right" : "bottom") +
                          '"></div>'
                      )),
                      S.append(I)),
                    u.length && (u[0].style.opacity = K(-b, 0)),
                    I.length && (I[0].style.opacity = K(b, 0));
                }
              }
              if (
                (U.wrapper.css({
                  "-webkit-transform-origin": "50% 50% -" + U.size / 2 + "px",
                  "-moz-transform-origin": "50% 50% -" + U.size / 2 + "px",
                  "-ms-transform-origin": "50% 50% -" + U.size / 2 + "px",
                  "transform-origin": "50% 50% -" + U.size / 2 + "px",
                }),
                U.params.cube.shadow)
              )
                if (U.isHorizontal())
                  e.transform(
                    "translate3d(0px, " +
                      (U.width / 2 + U.params.cube.shadowOffset) +
                      "px, " +
                      -U.width / 2 +
                      "px) rotateX(90deg) rotateZ(0deg) scale(" +
                      U.params.cube.shadowScale +
                      ")"
                  );
                else {
                  var k = _(x) - 90 * Z(_(x) / 90),
                    h =
                      1.5 -
                      (Math.sin((2 * k * m) / 360) / 2 +
                        Math.cos((2 * k * m) / 360) / 2),
                    g = U.params.cube.shadowScale,
                    f = U.params.cube.shadowScale / h,
                    v = U.params.cube.shadowOffset;
                  e.transform(
                    "scale3d(" +
                      g +
                      ", 1, " +
                      f +
                      ") translate3d(0px, " +
                      (U.height / 2 + v) +
                      "px, " +
                      -U.height / 2 / f +
                      "px) rotateX(-90deg)"
                  );
                }
              var w = U.isSafari || U.isUiWebView ? -U.size / 2 : 0;
              U.wrapper.transform(
                "translate3d(0px,0," +
                  w +
                  "px) rotateX(" +
                  (U.isHorizontal() ? 0 : x) +
                  "deg) rotateY(" +
                  (U.isHorizontal() ? -x : 0) +
                  "deg)"
              );
            },
            setTransition: function setTransition(a) {
              U.slides
                .transition(a)
                .find(
                  ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
                )
                .transition(a),
                U.params.cube.shadow &&
                  !U.isHorizontal() &&
                  U.container.find(".swiper-cube-shadow").transition(a);
            },
          },
          coverflow: {
            setTranslate: function setTranslate() {
              for (
                var e = U.translate,
                  a = U.isHorizontal() ? -e + U.width / 2 : -e + U.height / 2,
                  t = U.isHorizontal()
                    ? U.params.coverflow.rotate
                    : -U.params.coverflow.rotate,
                  s = U.params.coverflow.depth,
                  i = 0,
                  x = U.slides.length;
                i < x;
                i++
              ) {
                var n = U.slides.eq(i),
                  o = U.slidesSizesGrid[i],
                  l = n[0].swiperSlideOffset,
                  p = ((a - l - o / 2) / o) * U.params.coverflow.modifier,
                  d = U.isHorizontal() ? t * p : 0,
                  y = U.isHorizontal() ? 0 : t * p,
                  T = -s * _(p),
                  S = U.isHorizontal() ? 0 : U.params.coverflow.stretch * p,
                  C = U.isHorizontal() ? U.params.coverflow.stretch * p : 0;
                0.001 > _(C) && (C = 0),
                  0.001 > _(S) && (S = 0),
                  0.001 > _(T) && (T = 0),
                  0.001 > _(d) && (d = 0),
                  0.001 > _(y) && (y = 0);
                var b =
                  "translate3d(" +
                  C +
                  "px," +
                  S +
                  "px," +
                  T +
                  "px)  rotateX(" +
                  y +
                  "deg) rotateY(" +
                  d +
                  "deg)";
                if (
                  (n.transform(b),
                  (n[0].style.zIndex = 1 - _(q(p))),
                  U.params.coverflow.slideShadows)
                ) {
                  var f = U.isHorizontal()
                      ? n.find(".swiper-slide-shadow-left")
                      : n.find(".swiper-slide-shadow-top"),
                    z = U.isHorizontal()
                      ? n.find(".swiper-slide-shadow-right")
                      : n.find(".swiper-slide-shadow-bottom");
                  0 === f.length &&
                    ((f = B(
                      '<div class="swiper-slide-shadow-' +
                        (U.isHorizontal() ? "left" : "top") +
                        '"></div>'
                    )),
                    n.append(f)),
                    0 === z.length &&
                      ((z = B(
                        '<div class="swiper-slide-shadow-' +
                          (U.isHorizontal() ? "right" : "bottom") +
                          '"></div>'
                      )),
                      n.append(z)),
                    f.length && (f[0].style.opacity = 0 < p ? p : 0),
                    z.length && (z[0].style.opacity = 0 < -p ? -p : 0);
                }
              }
              U.browser.ie &&
                (U.wrapper[0].style.perspectiveOrigin = a + "px 50%");
            },
            setTransition: function setTransition(a) {
              U.slides
                .transition(a)
                .find(
                  ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
                )
                .transition(a);
            },
          },
        }),
        (U.lazy = {
          initialImageLoaded: !1,
          loadImageInSlide: function loadImageInSlide(e, d) {
            if (
              void 0 !== e &&
              (void 0 === d && (d = !0), 0 !== U.slides.length)
            ) {
              var m = U.slides.eq(e),
                a = m.find(
                  "." +
                    U.params.lazyLoadingClass +
                    ":not(." +
                    U.params.lazyStatusLoadedClass +
                    "):not(." +
                    U.params.lazyStatusLoadingClass +
                    ")"
                );
              !m.hasClass(U.params.lazyLoadingClass) ||
                m.hasClass(U.params.lazyStatusLoadedClass) ||
                m.hasClass(U.params.lazyStatusLoadingClass) ||
                (a = a.add(m[0])),
                0 !== a.length &&
                  a.each(function () {
                    var t = B(this);
                    t.addClass(U.params.lazyStatusLoadingClass);
                    var a = t.attr("data-background"),
                      s = t.attr("data-src"),
                      r = t.attr("data-srcset"),
                      i = t.attr("data-sizes");
                    U.loadImage(t[0], s || a, r, i, !1, function () {
                      if (void 0 !== U && null !== U && U) {
                        if (
                          (a
                            ? (t.css("background-image", 'url("' + a + '")'),
                              t.removeAttr("data-background"))
                            : (r &&
                                (t.attr("srcset", r),
                                t.removeAttr("data-srcset")),
                              i &&
                                (t.attr("sizes", i),
                                t.removeAttr("data-sizes")),
                              s &&
                                (t.attr("src", s), t.removeAttr("data-src"))),
                          t
                            .addClass(U.params.lazyStatusLoadedClass)
                            .removeClass(U.params.lazyStatusLoadingClass),
                          m
                            .find(
                              "." +
                                U.params.lazyPreloaderClass +
                                ", ." +
                                U.params.preloaderClass
                            )
                            .remove(),
                          U.params.loop && d)
                        ) {
                          var n = m.attr("data-swiper-slide-index");
                          if (m.hasClass(U.params.slideDuplicateClass)) {
                            var e = U.wrapper.children(
                              '[data-swiper-slide-index="' +
                                n +
                                '"]:not(.' +
                                U.params.slideDuplicateClass +
                                ")"
                            );
                            U.lazy.loadImageInSlide(e.index(), !1);
                          } else {
                            var o = U.wrapper.children(
                              "." +
                                U.params.slideDuplicateClass +
                                '[data-swiper-slide-index="' +
                                n +
                                '"]'
                            );
                            U.lazy.loadImageInSlide(o.index(), !1);
                          }
                        }
                        U.emit("onLazyImageReady", U, m[0], t[0]);
                      }
                    }),
                      U.emit("onLazyImageLoad", U, m[0], t[0]);
                  });
            }
          },
          load: function load() {
            var e,
              p = U.params.slidesPerView;
            if (
              ("auto" === p && (p = 0),
              U.lazy.initialImageLoaded || (U.lazy.initialImageLoaded = !0),
              U.params.watchSlidesVisibility)
            )
              U.wrapper
                .children("." + U.params.slideVisibleClass)
                .each(function () {
                  U.lazy.loadImageInSlide(B(this).index());
                });
            else if (1 < p)
              for (e = U.activeIndex; e < U.activeIndex + p; e++)
                U.slides[e] && U.lazy.loadImageInSlide(e);
            else U.lazy.loadImageInSlide(U.activeIndex);
            if (U.params.lazyLoadingInPrevNext)
              if (
                1 < p ||
                (U.params.lazyLoadingInPrevNextAmount &&
                  1 < U.params.lazyLoadingInPrevNextAmount)
              ) {
                var d = U.params.lazyLoadingInPrevNextAmount,
                  s = p,
                  i = F(U.activeIndex + s + K(d, s), U.slides.length),
                  r = K(U.activeIndex - K(s, d), 0);
                for (e = U.activeIndex + p; e < i; e++)
                  U.slides[e] && U.lazy.loadImageInSlide(e);
                for (e = r; e < U.activeIndex; e++)
                  U.slides[e] && U.lazy.loadImageInSlide(e);
              } else {
                var n = U.wrapper.children("." + U.params.slideNextClass);
                0 < n.length && U.lazy.loadImageInSlide(n.index());
                var o = U.wrapper.children("." + U.params.slidePrevClass);
                0 < o.length && U.lazy.loadImageInSlide(o.index());
              }
          },
          onTransitionStart: function onTransitionStart() {
            U.params.lazyLoading &&
              (U.params.lazyLoadingOnTransitionStart ||
                (!U.params.lazyLoadingOnTransitionStart &&
                  !U.lazy.initialImageLoaded)) &&
              U.lazy.load();
          },
          onTransitionEnd: function onTransitionEnd() {
            U.params.lazyLoading &&
              !U.params.lazyLoadingOnTransitionStart &&
              U.lazy.load();
          },
        }),
        (U.scrollbar = {
          isTouched: !1,
          setDragPosition: function setDragPosition(n) {
            var e = U.scrollbar,
              a = U.isHorizontal()
                ? "touchstart" === n.type || "touchmove" === n.type
                  ? n.targetTouches[0].pageX
                  : n.pageX || n.clientX
                : "touchstart" === n.type || "touchmove" === n.type
                ? n.targetTouches[0].pageY
                : n.pageY || n.clientY,
              t =
                a -
                e.track.offset()[U.isHorizontal() ? "left" : "top"] -
                e.dragSize / 2,
              o = -U.minTranslate() * e.moveDivider,
              i = -U.maxTranslate() * e.moveDivider;
            t < o ? (t = o) : t > i && (t = i),
              (t = -t / e.moveDivider),
              U.updateProgress(t),
              U.setWrapperTranslate(t, !0);
          },
          dragStart: function dragStart(t) {
            var e = U.scrollbar;
            (e.isTouched = !0),
              t.preventDefault(),
              t.stopPropagation(),
              e.setDragPosition(t),
              clearTimeout(e.dragTimeout),
              e.track.transition(0),
              U.params.scrollbarHide && e.track.css("opacity", 1),
              U.wrapper.transition(100),
              e.drag.transition(100),
              U.emit("onScrollbarDragStart", U);
          },
          dragMove: function dragMove(t) {
            var e = U.scrollbar;
            e.isTouched &&
              (t.preventDefault ? t.preventDefault() : (t.returnValue = !1),
              e.setDragPosition(t),
              U.wrapper.transition(0),
              e.track.transition(0),
              e.drag.transition(0),
              U.emit("onScrollbarDragMove", U));
          },
          dragEnd: function dragEnd() {
            var e = U.scrollbar;
            e.isTouched &&
              ((e.isTouched = !1),
              U.params.scrollbarHide &&
                (clearTimeout(e.dragTimeout),
                (e.dragTimeout = setTimeout(function () {
                  e.track.css("opacity", 0), e.track.transition(400);
                }, 1e3))),
              U.emit("onScrollbarDragEnd", U),
              U.params.scrollbarSnapOnRelease && U.slideReset());
          },
          draggableEvents: (function () {
            return !1 !== U.params.simulateTouch || U.support.touch
              ? U.touchEvents
              : U.touchEventsDesktop;
          })(),
          enableDraggable: function enableDraggable() {
            var e = U.scrollbar,
              a = U.support.touch ? e.track : document;
            B(e.track).on(e.draggableEvents.start, e.dragStart),
              B(a).on(e.draggableEvents.move, e.dragMove),
              B(a).on(e.draggableEvents.end, e.dragEnd);
          },
          disableDraggable: function disableDraggable() {
            var e = U.scrollbar,
              a = U.support.touch ? e.track : document;
            B(e.track).off(e.draggableEvents.start, e.dragStart),
              B(a).off(e.draggableEvents.move, e.dragMove),
              B(a).off(e.draggableEvents.end, e.dragEnd);
          },
          set: function set() {
            if (U.params.scrollbar) {
              var e = U.scrollbar;
              (e.track = B(U.params.scrollbar)),
                U.params.uniqueNavElements &&
                  "string" == typeof U.params.scrollbar &&
                  1 < e.track.length &&
                  1 === U.container.find(U.params.scrollbar).length &&
                  (e.track = U.container.find(U.params.scrollbar)),
                (e.drag = e.track.find(".swiper-scrollbar-drag")),
                0 === e.drag.length &&
                  ((e.drag = B('<div class="swiper-scrollbar-drag"></div>')),
                  e.track.append(e.drag)),
                (e.drag[0].style.width = ""),
                (e.drag[0].style.height = ""),
                (e.trackSize = U.isHorizontal()
                  ? e.track[0].offsetWidth
                  : e.track[0].offsetHeight),
                (e.divider = U.size / U.virtualSize),
                (e.moveDivider = e.divider * (e.trackSize / U.size)),
                (e.dragSize = e.trackSize * e.divider),
                U.isHorizontal()
                  ? (e.drag[0].style.width = e.dragSize + "px")
                  : (e.drag[0].style.height = e.dragSize + "px"),
                (e.track[0].style.display = 1 <= e.divider ? "none" : ""),
                U.params.scrollbarHide && (e.track[0].style.opacity = 0);
            }
          },
          setTranslate: function setTranslate() {
            if (U.params.scrollbar) {
              var s,
                r = U.scrollbar,
                a = (U.translate, r.dragSize);
              (s = (r.trackSize - r.dragSize) * U.progress),
                U.rtl && U.isHorizontal()
                  ? ((s = -s),
                    0 < s
                      ? ((a = r.dragSize - s), (s = 0))
                      : -s + r.dragSize > r.trackSize && (a = r.trackSize + s))
                  : 0 > s
                  ? ((a = r.dragSize + s), (s = 0))
                  : s + r.dragSize > r.trackSize && (a = r.trackSize - s),
                U.isHorizontal()
                  ? (U.support.transforms3d
                      ? r.drag.transform("translate3d(" + s + "px, 0, 0)")
                      : r.drag.transform("translateX(" + s + "px)"),
                    (r.drag[0].style.width = a + "px"))
                  : (U.support.transforms3d
                      ? r.drag.transform("translate3d(0px, " + s + "px, 0)")
                      : r.drag.transform("translateY(" + s + "px)"),
                    (r.drag[0].style.height = a + "px")),
                U.params.scrollbarHide &&
                  (clearTimeout(r.timeout),
                  (r.track[0].style.opacity = 1),
                  (r.timeout = setTimeout(function () {
                    (r.track[0].style.opacity = 0), r.track.transition(400);
                  }, 1e3)));
            }
          },
          setTransition: function setTransition(a) {
            U.params.scrollbar && U.scrollbar.drag.transition(a);
          },
        }),
        (U.controller = {
          LinearSpline: function LinearSpline(r, e) {
            var a = (function () {
              var r, n, o;
              return function (e, a) {
                for (n = -1, r = e.length; 1 < r - n; )
                  e[(o = (r + n) >> 1)] <= a ? (n = o) : (r = o);
                return r;
              };
            })();
            (this.x = r), (this.y = e), (this.lastIndex = r.length - 1);
            var t, n;
            this.x.length,
              (this.interpolate = function (s) {
                return s
                  ? ((n = a(this.x, s)),
                    (t = n - 1),
                    ((s - this.x[t]) * (this.y[n] - this.y[t])) /
                      (this.x[n] - this.x[t]) +
                      this.y[t])
                  : 0;
              });
          },
          getInterpolateFunction: function getInterpolateFunction(a) {
            U.controller.spline ||
              (U.controller.spline = U.params.loop
                ? new U.controller.LinearSpline(U.slidesGrid, a.slidesGrid)
                : new U.controller.LinearSpline(U.snapGrid, a.snapGrid));
          },
          setTranslate: function setTranslate(l, a) {
            function t(e) {
              (l =
                e.rtl && "horizontal" === e.params.direction
                  ? -U.translate
                  : U.translate),
                "slide" === U.params.controlBy &&
                  (U.controller.getInterpolateFunction(e),
                  (p = -U.controller.spline.interpolate(-l))),
                (p && "container" !== U.params.controlBy) ||
                  ((s =
                    (e.maxTranslate() - e.minTranslate()) /
                    (U.maxTranslate() - U.minTranslate())),
                  (p = (l - U.minTranslate()) * s + e.minTranslate())),
                U.params.controlInverse && (p = e.maxTranslate() - p),
                e.updateProgress(p),
                e.setWrapperTranslate(p, !1, U),
                e.updateActiveIndex();
            }
            var s,
              p,
              d = U.params.control;
            if (Array.isArray(d))
              for (var n = 0; n < d.length; n++)
                d[n] !== a && d[n] instanceof N && t(d[n]);
            else d instanceof N && a !== d && t(d);
          },
          setTransition: function setTransition(n, e) {
            function a(e) {
              e.setWrapperTransition(n, U),
                0 !== n &&
                  (e.onTransitionStart(),
                  e.wrapper.transitionEnd(function () {
                    s &&
                      (e.params.loop &&
                        "slide" === U.params.controlBy &&
                        e.fixLoop(),
                      e.onTransitionEnd());
                  }));
            }
            var t,
              s = U.params.control;
            if (Array.isArray(s))
              for (t = 0; t < s.length; t++)
                s[t] !== e && s[t] instanceof N && a(s[t]);
            else s instanceof N && e !== s && a(s);
          },
        }),
        (U.hashnav = {
          onHashCange: function onHashCange() {
            var e = document.location.hash.replace("#", "");
            e !== U.slides.eq(U.activeIndex).attr("data-hash") &&
              U.slideTo(
                U.wrapper
                  .children(
                    "." + U.params.slideClass + '[data-hash="' + e + '"]'
                  )
                  .index()
              );
          },
          attachEvents: function attachEvents(e) {
            var a = e ? "off" : "on";
            B(window)[a]("hashchange", U.hashnav.onHashCange);
          },
          setHash: function setHash() {
            if (U.hashnav.initialized && U.params.hashnav)
              if (
                U.params.replaceState &&
                window.history &&
                window.history.replaceState
              )
                window.history.replaceState(
                  null,
                  null,
                  "#" + U.slides.eq(U.activeIndex).attr("data-hash") || ""
                );
              else {
                var t = U.slides.eq(U.activeIndex),
                  e = t.attr("data-hash") || t.attr("data-history");
                document.location.hash = e || "";
              }
          },
          init: function init() {
            if (U.params.hashnav && !U.params.history) {
              U.hashnav.initialized = !0;
              var n = document.location.hash.replace("#", "");
              if (n)
                for (var e = 0, o = U.slides.length; e < o; e++) {
                  var t = U.slides.eq(e),
                    s = t.attr("data-hash") || t.attr("data-history");
                  if (s === n && !t.hasClass(U.params.slideDuplicateClass)) {
                    var i = t.index();
                    U.slideTo(i, 0, U.params.runCallbacksOnInit, !0);
                  }
                }
              U.params.hashnavWatchState && U.hashnav.attachEvents();
            }
          },
          destroy: function destroy() {
            U.params.hashnavWatchState && U.hashnav.attachEvents(!0);
          },
        }),
        (U.history = {
          init: function init() {
            if (U.params.history) {
              if (!window.history || !window.history.pushState)
                return (U.params.history = !1), void (U.params.hashnav = !0);
              (U.history.initialized = !0),
                (this.paths = this.getPathValues()),
                (this.paths.key || this.paths.value) &&
                  (this.scrollToSlide(
                    0,
                    this.paths.value,
                    U.params.runCallbacksOnInit
                  ),
                  U.params.replaceState ||
                    window.addEventListener(
                      "popstate",
                      this.setHistoryPopState
                    ));
            }
          },
          setHistoryPopState: function setHistoryPopState() {
            (U.history.paths = U.history.getPathValues()),
              U.history.scrollToSlide(
                U.params.speed,
                U.history.paths.value,
                !1
              );
          },
          getPathValues: function getPathValues() {
            var t = window.location.pathname.slice(1).split("/"),
              e = t.length;
            return {
              key: t[e - 2],
              value: t[e - 1],
            };
          },
          setHistory: function setHistory(r, e) {
            if (U.history.initialized && U.params.history) {
              var a = U.slides.eq(e),
                t = this.slugify(a.attr("data-history"));
              window.location.pathname.includes(r) || (t = r + "/" + t),
                U.params.replaceState
                  ? window.history.replaceState(null, null, t)
                  : window.history.pushState(null, null, t);
            }
          },
          slugify: function slugify(a) {
            return a
              .toString()
              .toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/[^\w\-]+/g, "")
              .replace(/\-\-+/g, "-")
              .replace(/^-+/, "")
              .replace(/-+$/, "");
          },
          scrollToSlide: function scrollToSlide(l, e, a) {
            if (e)
              for (var t = 0, p = U.slides.length; t < p; t++) {
                var i = U.slides.eq(t),
                  r = this.slugify(i.attr("data-history"));
                if (r === e && !i.hasClass(U.params.slideDuplicateClass)) {
                  var n = i.index();
                  U.slideTo(n, l, a);
                }
              }
            else U.slideTo(0, l, a);
          },
        }),
        (U.disableKeyboardControl = function () {
          (U.params.keyboardControl = !1), B(document).off("keydown", r);
        }),
        (U.enableKeyboardControl = function () {
          (U.params.keyboardControl = !0), B(document).on("keydown", r);
        }),
        (U.mousewheel = {
          event: !1,
          lastScrollTime: new window.Date().getTime(),
        }),
        U.params.mousewheelControl &&
          (U.mousewheel.event =
            -1 < navigator.userAgent.indexOf("firefox")
              ? "DOMMouseScroll"
              : (function () {
                  var t = "onwheel" in document;
                  if (!t) {
                    var s = document.createElement("div");
                    s.setAttribute("onwheel", "return;"),
                      (t = "function" == typeof s.onwheel);
                  }
                  return (
                    !t &&
                      document.implementation &&
                      document.implementation.hasFeature &&
                      !0 !== document.implementation.hasFeature("", "") &&
                      (t = document.implementation.hasFeature(
                        "Events.wheel",
                        "3.0"
                      )),
                    t
                  );
                })()
              ? "wheel"
              : "mousewheel"),
        (U.disableMousewheelControl = function () {
          if (!U.mousewheel.event) return !1;
          var e = U.container;
          return (
            "container" !== U.params.mousewheelEventsTarged &&
              (e = B(U.params.mousewheelEventsTarged)),
            e.off(U.mousewheel.event, n),
            (U.params.mousewheelControl = !1),
            !0
          );
        }),
        (U.enableMousewheelControl = function () {
          if (!U.mousewheel.event) return !1;
          var e = U.container;
          return (
            "container" !== U.params.mousewheelEventsTarged &&
              (e = B(U.params.mousewheelEventsTarged)),
            e.on(U.mousewheel.event, n),
            (U.params.mousewheelControl = !0),
            !0
          );
        }),
        (U.parallax = {
          setTranslate: function setTranslate() {
            U.container
              .children(
                "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]"
              )
              .each(function () {
                l(this, U.progress);
              }),
              U.slides.each(function () {
                var e = B(this);
                e.find(
                  "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]"
                ).each(function () {
                  l(this, F(K(e[0].progress, -1), 1));
                });
              });
          },
          setTransition: function setTransition(e) {
            void 0 === e && (e = U.params.speed),
              U.container
                .find(
                  "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]"
                )
                .each(function () {
                  var a = B(this),
                    t =
                      parseInt(a.attr("data-swiper-parallax-duration"), 10) ||
                      e;
                  0 === e && (t = 0), a.transition(t);
                });
          },
        }),
        (U.zoom = {
          scale: 1,
          currentScale: 1,
          isScaling: !1,
          gesture: {
            slide: void 0,
            slideWidth: void 0,
            slideHeight: void 0,
            image: void 0,
            imageWrap: void 0,
            zoomMax: U.params.zoomMax,
          },
          image: {
            isTouched: void 0,
            isMoved: void 0,
            currentX: void 0,
            currentY: void 0,
            minX: void 0,
            minY: void 0,
            maxX: void 0,
            maxY: void 0,
            width: void 0,
            height: void 0,
            startX: void 0,
            startY: void 0,
            touchesStart: {},
            touchesCurrent: {},
          },
          velocity: {
            x: void 0,
            y: void 0,
            prevPositionX: void 0,
            prevPositionY: void 0,
            prevTime: void 0,
          },
          getDistanceBetweenTouches: function getDistanceBetweenTouches(r) {
            if (2 > r.targetTouches.length) return 1;
            var e = r.targetTouches[0].pageX,
              a = r.targetTouches[0].pageY,
              t = r.targetTouches[1].pageX,
              s = r.targetTouches[1].pageY;
            return Math.sqrt(d(t - e, 2) + d(s - a, 2));
          },
          onGestureStart: function onGestureStart(e) {
            var a = U.zoom;
            if (!U.support.gestures) {
              if (
                "touchstart" !== e.type ||
                ("touchstart" === e.type && 2 > e.targetTouches.length)
              )
                return;
              a.gesture.scaleStart = a.getDistanceBetweenTouches(e);
            }
            return (a.gesture.slide && a.gesture.slide.length) ||
              ((a.gesture.slide = B(this)),
              0 === a.gesture.slide.length &&
                (a.gesture.slide = U.slides.eq(U.activeIndex)),
              (a.gesture.image = a.gesture.slide.find("img, svg, canvas")),
              (a.gesture.imageWrap = a.gesture.image.parent(
                "." + U.params.zoomContainerClass
              )),
              (a.gesture.zoomMax =
                a.gesture.imageWrap.attr("data-swiper-zoom") ||
                U.params.zoomMax),
              0 !== a.gesture.imageWrap.length)
              ? void (a.gesture.image.transition(0), (a.isScaling = !0))
              : void (a.gesture.image = void 0);
          },
          onGestureChange: function onGestureChange(t) {
            var e = U.zoom;
            if (!U.support.gestures) {
              if (
                "touchmove" !== t.type ||
                ("touchmove" === t.type && 2 > t.targetTouches.length)
              )
                return;
              e.gesture.scaleMove = e.getDistanceBetweenTouches(t);
            }
            e.gesture.image &&
              0 !== e.gesture.image.length &&
              ((e.scale = U.support.gestures
                ? t.scale * e.currentScale
                : (e.gesture.scaleMove / e.gesture.scaleStart) *
                  e.currentScale),
              e.scale > e.gesture.zoomMax &&
                (e.scale =
                  e.gesture.zoomMax -
                  1 +
                  d(e.scale - e.gesture.zoomMax + 1, 0.5)),
              e.scale < U.params.zoomMin &&
                (e.scale =
                  U.params.zoomMin +
                  1 -
                  d(U.params.zoomMin - e.scale + 1, 0.5)),
              e.gesture.image.transform(
                "translate3d(0,0,0) scale(" + e.scale + ")"
              ));
          },
          onGestureEnd: function onGestureEnd(t) {
            var e = U.zoom;
            (!U.support.gestures &&
              ("touchend" !== t.type ||
                ("touchend" === t.type && 2 > t.changedTouches.length))) ||
              (e.gesture.image &&
                0 !== e.gesture.image.length &&
                ((e.scale = K(F(e.scale, e.gesture.zoomMax), U.params.zoomMin)),
                e.gesture.image
                  .transition(U.params.speed)
                  .transform("translate3d(0,0,0) scale(" + e.scale + ")"),
                (e.currentScale = e.scale),
                (e.isScaling = !1),
                1 === e.scale && (e.gesture.slide = void 0)));
          },
          onTouchStart: function onTouchStart(s, e) {
            var a = s.zoom;
            a.gesture.image &&
              0 !== a.gesture.image.length &&
              (a.image.isTouched ||
                ("android" === s.device.os && e.preventDefault(),
                (a.image.isTouched = !0),
                (a.image.touchesStart.x =
                  "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX),
                (a.image.touchesStart.y =
                  "touchstart" === e.type
                    ? e.targetTouches[0].pageY
                    : e.pageY)));
          },
          onTouchMove: function onTouchMove(r) {
            var e = U.zoom;
            if (
              e.gesture.image &&
              0 !== e.gesture.image.length &&
              ((U.allowClick = !1), e.image.isTouched && e.gesture.slide)
            ) {
              e.image.isMoved ||
                ((e.image.width = e.gesture.image[0].offsetWidth),
                (e.image.height = e.gesture.image[0].offsetHeight),
                (e.image.startX =
                  U.getTranslate(e.gesture.imageWrap[0], "x") || 0),
                (e.image.startY =
                  U.getTranslate(e.gesture.imageWrap[0], "y") || 0),
                (e.gesture.slideWidth = e.gesture.slide[0].offsetWidth),
                (e.gesture.slideHeight = e.gesture.slide[0].offsetHeight),
                e.gesture.imageWrap.transition(0),
                U.rtl && (e.image.startX = -e.image.startX),
                U.rtl && (e.image.startY = -e.image.startY));
              var a = e.image.width * e.scale,
                t = e.image.height * e.scale;
              if (!(a < e.gesture.slideWidth && t < e.gesture.slideHeight)) {
                if (
                  ((e.image.minX = F(e.gesture.slideWidth / 2 - a / 2, 0)),
                  (e.image.maxX = -e.image.minX),
                  (e.image.minY = F(e.gesture.slideHeight / 2 - t / 2, 0)),
                  (e.image.maxY = -e.image.minY),
                  (e.image.touchesCurrent.x =
                    "touchmove" === r.type
                      ? r.targetTouches[0].pageX
                      : r.pageX),
                  (e.image.touchesCurrent.y =
                    "touchmove" === r.type
                      ? r.targetTouches[0].pageY
                      : r.pageY),
                  !e.image.isMoved && !e.isScaling)
                ) {
                  if (
                    (U.isHorizontal() &&
                      Z(e.image.minX) === Z(e.image.startX) &&
                      e.image.touchesCurrent.x < e.image.touchesStart.x) ||
                    (Z(e.image.maxX) === Z(e.image.startX) &&
                      e.image.touchesCurrent.x > e.image.touchesStart.x)
                  )
                    return void (e.image.isTouched = !1);
                  if (
                    (!U.isHorizontal() &&
                      Z(e.image.minY) === Z(e.image.startY) &&
                      e.image.touchesCurrent.y < e.image.touchesStart.y) ||
                    (Z(e.image.maxY) === Z(e.image.startY) &&
                      e.image.touchesCurrent.y > e.image.touchesStart.y)
                  )
                    return void (e.image.isTouched = !1);
                }
                r.preventDefault(),
                  r.stopPropagation(),
                  (e.image.isMoved = !0),
                  (e.image.currentX =
                    e.image.touchesCurrent.x -
                    e.image.touchesStart.x +
                    e.image.startX),
                  (e.image.currentY =
                    e.image.touchesCurrent.y -
                    e.image.touchesStart.y +
                    e.image.startY),
                  e.image.currentX < e.image.minX &&
                    (e.image.currentX =
                      e.image.minX +
                      1 -
                      d(e.image.minX - e.image.currentX + 1, 0.8)),
                  e.image.currentX > e.image.maxX &&
                    (e.image.currentX =
                      e.image.maxX -
                      1 +
                      d(e.image.currentX - e.image.maxX + 1, 0.8)),
                  e.image.currentY < e.image.minY &&
                    (e.image.currentY =
                      e.image.minY +
                      1 -
                      d(e.image.minY - e.image.currentY + 1, 0.8)),
                  e.image.currentY > e.image.maxY &&
                    (e.image.currentY =
                      e.image.maxY -
                      1 +
                      d(e.image.currentY - e.image.maxY + 1, 0.8)),
                  e.velocity.prevPositionX ||
                    (e.velocity.prevPositionX = e.image.touchesCurrent.x),
                  e.velocity.prevPositionY ||
                    (e.velocity.prevPositionY = e.image.touchesCurrent.y),
                  e.velocity.prevTime || (e.velocity.prevTime = Date.now()),
                  (e.velocity.x =
                    (e.image.touchesCurrent.x - e.velocity.prevPositionX) /
                    (Date.now() - e.velocity.prevTime) /
                    2),
                  (e.velocity.y =
                    (e.image.touchesCurrent.y - e.velocity.prevPositionY) /
                    (Date.now() - e.velocity.prevTime) /
                    2),
                  2 > _(e.image.touchesCurrent.x - e.velocity.prevPositionX) &&
                    (e.velocity.x = 0),
                  2 > _(e.image.touchesCurrent.y - e.velocity.prevPositionY) &&
                    (e.velocity.y = 0),
                  (e.velocity.prevPositionX = e.image.touchesCurrent.x),
                  (e.velocity.prevPositionY = e.image.touchesCurrent.y),
                  (e.velocity.prevTime = Date.now()),
                  e.gesture.imageWrap.transform(
                    "translate3d(" +
                      e.image.currentX +
                      "px, " +
                      e.image.currentY +
                      "px,0)"
                  );
              }
            }
          },
          onTouchEnd: function onTouchEnd(a) {
            var e = a.zoom;
            if (e.gesture.image && 0 !== e.gesture.image.length) {
              if (!e.image.isTouched || !e.image.isMoved)
                return (e.image.isTouched = !1), void (e.image.isMoved = !1);
              (e.image.isTouched = !1), (e.image.isMoved = !1);
              var t = 300,
                m = 300,
                c = e.velocity.x * t,
                r = e.image.currentX + c,
                n = e.velocity.y * m,
                o = e.image.currentY + n;
              0 !== e.velocity.x &&
                (t = _((r - e.image.currentX) / e.velocity.x)),
                0 !== e.velocity.y &&
                  (m = _((o - e.image.currentY) / e.velocity.y));
              var l = K(t, m);
              (e.image.currentX = r), (e.image.currentY = o);
              var p = e.image.width * e.scale,
                d = e.image.height * e.scale;
              (e.image.minX = F(e.gesture.slideWidth / 2 - p / 2, 0)),
                (e.image.maxX = -e.image.minX),
                (e.image.minY = F(e.gesture.slideHeight / 2 - d / 2, 0)),
                (e.image.maxY = -e.image.minY),
                (e.image.currentX = K(
                  F(e.image.currentX, e.image.maxX),
                  e.image.minX
                )),
                (e.image.currentY = K(
                  F(e.image.currentY, e.image.maxY),
                  e.image.minY
                )),
                e.gesture.imageWrap
                  .transition(l)
                  .transform(
                    "translate3d(" +
                      e.image.currentX +
                      "px, " +
                      e.image.currentY +
                      "px,0)"
                  );
            }
          },
          onTransitionEnd: function onTransitionEnd(t) {
            var e = t.zoom;
            e.gesture.slide &&
              t.previousIndex !== t.activeIndex &&
              (e.gesture.image.transform("translate3d(0,0,0) scale(1)"),
              e.gesture.imageWrap.transform("translate3d(0,0,0)"),
              (e.gesture.slide =
                e.gesture.image =
                e.gesture.imageWrap =
                  void 0),
              (e.scale = e.currentScale = 1));
          },
          toggleZoom: function toggleZoom(e, a) {
            var t = e.zoom;
            if (
              (t.gesture.slide ||
                ((t.gesture.slide = e.clickedSlide
                  ? B(e.clickedSlide)
                  : e.slides.eq(e.activeIndex)),
                (t.gesture.image = t.gesture.slide.find("img, svg, canvas")),
                (t.gesture.imageWrap = t.gesture.image.parent(
                  "." + e.params.zoomContainerClass
                ))),
              t.gesture.image && 0 !== t.gesture.image.length)
            ) {
              var s, S, C, b, z, E, P, I, k, M, L, D, H, G, X, Y, A, N;
              void 0 === t.image.touchesStart.x && a
                ? ((s =
                    "touchend" === a.type
                      ? a.changedTouches[0].pageX
                      : a.pageX),
                  (S =
                    "touchend" === a.type
                      ? a.changedTouches[0].pageY
                      : a.pageY))
                : ((s = t.image.touchesStart.x), (S = t.image.touchesStart.y)),
                t.scale && 1 !== t.scale
                  ? ((t.scale = t.currentScale = 1),
                    t.gesture.imageWrap
                      .transition(300)
                      .transform("translate3d(0,0,0)"),
                    t.gesture.image
                      .transition(300)
                      .transform("translate3d(0,0,0) scale(1)"),
                    (t.gesture.slide = void 0))
                  : ((t.scale = t.currentScale =
                      t.gesture.imageWrap.attr("data-swiper-zoom") ||
                      e.params.zoomMax),
                    a
                      ? ((A = t.gesture.slide[0].offsetWidth),
                        (N = t.gesture.slide[0].offsetHeight),
                        (C = t.gesture.slide.offset().left),
                        (b = t.gesture.slide.offset().top),
                        (z = C + A / 2 - s),
                        (E = b + N / 2 - S),
                        (k = t.gesture.image[0].offsetWidth),
                        (M = t.gesture.image[0].offsetHeight),
                        (L = k * t.scale),
                        (D = M * t.scale),
                        (H = F(A / 2 - L / 2, 0)),
                        (G = F(N / 2 - D / 2, 0)),
                        (X = -H),
                        (Y = -G),
                        (P = z * t.scale),
                        (I = E * t.scale),
                        P < H && (P = H),
                        P > X && (P = X),
                        I < G && (I = G),
                        I > Y && (I = Y))
                      : ((P = 0), (I = 0)),
                    t.gesture.imageWrap
                      .transition(300)
                      .transform("translate3d(" + P + "px, " + I + "px,0)"),
                    t.gesture.image
                      .transition(300)
                      .transform("translate3d(0,0,0) scale(" + t.scale + ")"));
            }
          },
          attachEvents: function attachEvents(e) {
            var r = e ? "off" : "on";
            if (U.params.zoom) {
              var a =
                (U.slides,
                "touchstart" === U.touchEvents.start &&
                  U.support.passiveListener &&
                  U.params.passiveListeners && {
                    passive: !0,
                    capture: !1,
                  });
              U.support.gestures
                ? (U.slides[r]("gesturestart", U.zoom.onGestureStart, a),
                  U.slides[r]("gesturechange", U.zoom.onGestureChange, a),
                  U.slides[r]("gestureend", U.zoom.onGestureEnd, a))
                : "touchstart" === U.touchEvents.start &&
                  (U.slides[r](U.touchEvents.start, U.zoom.onGestureStart, a),
                  U.slides[r](U.touchEvents.move, U.zoom.onGestureChange, a),
                  U.slides[r](U.touchEvents.end, U.zoom.onGestureEnd, a)),
                U[r]("touchStart", U.zoom.onTouchStart),
                U.slides.each(function (e, a) {
                  0 < B(a).find("." + U.params.zoomContainerClass).length &&
                    B(a)[r](U.touchEvents.move, U.zoom.onTouchMove);
                }),
                U[r]("touchEnd", U.zoom.onTouchEnd),
                U[r]("transitionEnd", U.zoom.onTransitionEnd),
                U.params.zoomToggle && U.on("doubleTap", U.zoom.toggleZoom);
            }
          },
          init: function init() {
            U.zoom.attachEvents();
          },
          destroy: function destroy() {
            U.zoom.attachEvents(!0);
          },
        }),
        (U._plugins = []),
        U.plugins)) {
          var Y = U.plugins[le](U, U.params[le]);
          Y && U._plugins.push(Y);
        }
        return (
          (U.callPlugins = function (t) {
            for (var e = 0; e < U._plugins.length; e++)
              t in U._plugins[e] &&
                U._plugins[e][t](
                  arguments[1],
                  arguments[2],
                  arguments[3],
                  arguments[4],
                  arguments[5]
                );
          }),
          (U.emitterEventListeners = {}),
          (U.emit = function (t) {
            U.params[t] &&
              U.params[t](
                arguments[1],
                arguments[2],
                arguments[3],
                arguments[4],
                arguments[5]
              );
            var e;
            if (U.emitterEventListeners[t])
              for (e = 0; e < U.emitterEventListeners[t].length; e++)
                U.emitterEventListeners[t][e](
                  arguments[1],
                  arguments[2],
                  arguments[3],
                  arguments[4],
                  arguments[5]
                );
            U.callPlugins &&
              U.callPlugins(
                t,
                arguments[1],
                arguments[2],
                arguments[3],
                arguments[4],
                arguments[5]
              );
          }),
          (U.on = function (t, s) {
            return (
              (t = p(t)),
              U.emitterEventListeners[t] || (U.emitterEventListeners[t] = []),
              U.emitterEventListeners[t].push(s),
              U
            );
          }),
          (U.off = function (s, r) {
            var a;
            if (((s = p(s)), void 0 === r))
              return (U.emitterEventListeners[s] = []), U;
            if (
              U.emitterEventListeners[s] &&
              0 !== U.emitterEventListeners[s].length
            ) {
              for (a = 0; a < U.emitterEventListeners[s].length; a++)
                U.emitterEventListeners[s][a] === r &&
                  U.emitterEventListeners[s].splice(a, 1);
              return U;
            }
          }),
          (U.once = function (s, r) {
            s = p(s);
            var a = function () {
              r(
                arguments[0],
                arguments[1],
                arguments[2],
                arguments[3],
                arguments[4]
              ),
                U.off(s, a);
            };
            return U.on(s, a), U;
          }),
          (U.a11y = {
            makeFocusable: function makeFocusable(a) {
              return a.attr("tabIndex", "0"), a;
            },
            addRole: function addRole(t, e) {
              return t.attr("role", e), t;
            },
            addLabel: function addLabel(t, e) {
              return t.attr("aria-label", e), t;
            },
            disable: function disable(a) {
              return a.attr("aria-disabled", !0), a;
            },
            enable: function enable(a) {
              return a.attr("aria-disabled", !1), a;
            },
            onEnterKey: function onEnterKey(e) {
              13 === e.keyCode &&
                (B(e.target).is(U.params.nextButton)
                  ? (U.onClickNext(e),
                    U.isEnd
                      ? U.a11y.notify(U.params.lastSlideMessage)
                      : U.a11y.notify(U.params.nextSlideMessage))
                  : B(e.target).is(U.params.prevButton) &&
                    (U.onClickPrev(e),
                    U.isBeginning
                      ? U.a11y.notify(U.params.firstSlideMessage)
                      : U.a11y.notify(U.params.prevSlideMessage)),
                B(e.target).is("." + U.params.bulletClass) &&
                  B(e.target)[0].click());
            },
            liveRegion: B(
              '<span class="' +
                U.params.notificationClass +
                '" aria-live="assertive" aria-atomic="true"></span>'
            ),
            notify: function notify(t) {
              var e = U.a11y.liveRegion;
              0 !== e.length && (e.html(""), e.html(t));
            },
            init: function init() {
              U.params.nextButton &&
                U.nextButton &&
                0 < U.nextButton.length &&
                (U.a11y.makeFocusable(U.nextButton),
                U.a11y.addRole(U.nextButton, "button"),
                U.a11y.addLabel(U.nextButton, U.params.nextSlideMessage)),
                U.params.prevButton &&
                  U.prevButton &&
                  0 < U.prevButton.length &&
                  (U.a11y.makeFocusable(U.prevButton),
                  U.a11y.addRole(U.prevButton, "button"),
                  U.a11y.addLabel(U.prevButton, U.params.prevSlideMessage)),
                B(U.container).append(U.a11y.liveRegion);
            },
            initPagination: function initPagination() {
              U.params.pagination &&
                U.params.paginationClickable &&
                U.bullets &&
                U.bullets.length &&
                U.bullets.each(function () {
                  var e = B(this);
                  U.a11y.makeFocusable(e),
                    U.a11y.addRole(e, "button"),
                    U.a11y.addLabel(
                      e,
                      U.params.paginationBulletMessage.replace(
                        /{{index}}/,
                        e.index() + 1
                      )
                    );
                });
            },
            destroy: function destroy() {
              U.a11y.liveRegion &&
                0 < U.a11y.liveRegion.length &&
                U.a11y.liveRegion.remove();
            },
          }),
          (U.init = function () {
            U.params.loop && U.createLoop(),
              U.updateContainerSize(),
              U.updateSlidesSize(),
              U.updatePagination(),
              U.params.scrollbar &&
                U.scrollbar &&
                (U.scrollbar.set(),
                U.params.scrollbarDraggable && U.scrollbar.enableDraggable()),
              "slide" !== U.params.effect &&
                U.effects[U.params.effect] &&
                (U.params.loop || U.updateProgress(),
                U.effects[U.params.effect].setTranslate()),
              U.params.loop
                ? U.slideTo(
                    U.params.initialSlide + U.loopedSlides,
                    0,
                    U.params.runCallbacksOnInit
                  )
                : (U.slideTo(
                    U.params.initialSlide,
                    0,
                    U.params.runCallbacksOnInit
                  ),
                  0 === U.params.initialSlide &&
                    (U.parallax &&
                      U.params.parallax &&
                      U.parallax.setTranslate(),
                    U.lazy &&
                      U.params.lazyLoading &&
                      (U.lazy.load(), (U.lazy.initialImageLoaded = !0)))),
              U.attachEvents(),
              U.params.observer && U.support.observer && U.initObservers(),
              U.params.preloadImages &&
                !U.params.lazyLoading &&
                U.preloadImages(),
              U.params.zoom && U.zoom && U.zoom.init(),
              U.params.autoplay && U.startAutoplay(),
              U.params.keyboardControl &&
                U.enableKeyboardControl &&
                U.enableKeyboardControl(),
              U.params.mousewheelControl &&
                U.enableMousewheelControl &&
                U.enableMousewheelControl(),
              U.params.hashnavReplaceState &&
                (U.params.replaceState = U.params.hashnavReplaceState),
              U.params.history && U.history && U.history.init(),
              U.params.hashnav && U.hashnav && U.hashnav.init(),
              U.params.a11y && U.a11y && U.a11y.init(),
              U.emit("onInit", U);
          }),
          (U.cleanupStyles = function () {
            U.container.removeClass(U.classNames.join(" ")).removeAttr("style"),
              U.wrapper.removeAttr("style"),
              U.slides &&
                U.slides.length &&
                U.slides
                  .removeClass(
                    [
                      U.params.slideVisibleClass,
                      U.params.slideActiveClass,
                      U.params.slideNextClass,
                      U.params.slidePrevClass,
                    ].join(" ")
                  )
                  .removeAttr("style")
                  .removeAttr("data-swiper-column")
                  .removeAttr("data-swiper-row"),
              U.paginationContainer &&
                U.paginationContainer.length &&
                U.paginationContainer.removeClass(
                  U.params.paginationHiddenClass
                ),
              U.bullets &&
                U.bullets.length &&
                U.bullets.removeClass(U.params.bulletActiveClass),
              U.params.prevButton &&
                B(U.params.prevButton).removeClass(
                  U.params.buttonDisabledClass
                ),
              U.params.nextButton &&
                B(U.params.nextButton).removeClass(
                  U.params.buttonDisabledClass
                ),
              U.params.scrollbar &&
                U.scrollbar &&
                (U.scrollbar.track &&
                  U.scrollbar.track.length &&
                  U.scrollbar.track.removeAttr("style"),
                U.scrollbar.drag &&
                  U.scrollbar.drag.length &&
                  U.scrollbar.drag.removeAttr("style"));
          }),
          (U.destroy = function (t, e) {
            U.detachEvents(),
              U.stopAutoplay(),
              U.params.scrollbar &&
                U.scrollbar &&
                U.params.scrollbarDraggable &&
                U.scrollbar.disableDraggable(),
              U.params.loop && U.destroyLoop(),
              e && U.cleanupStyles(),
              U.disconnectObservers(),
              U.params.zoom && U.zoom && U.zoom.destroy(),
              U.params.keyboardControl &&
                U.disableKeyboardControl &&
                U.disableKeyboardControl(),
              U.params.mousewheelControl &&
                U.disableMousewheelControl &&
                U.disableMousewheelControl(),
              U.params.a11y && U.a11y && U.a11y.destroy(),
              U.params.history &&
                !U.params.replaceState &&
                window.removeEventListener(
                  "popstate",
                  U.history.setHistoryPopState
                ),
              U.params.hashnav && U.hashnav && U.hashnav.destroy(),
              U.emit("onDestroy"),
              !1 !== t && (U = null);
          }),
          U.init(),
          U
        );
      }
    };
  N.prototype = {
    isSafari: (function () {
      var a = window.navigator.userAgent.toLowerCase();
      return (
        0 <= a.indexOf("safari") &&
        0 > a.indexOf("chrome") &&
        0 > a.indexOf("android")
      );
    })(),
    isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
      window.navigator.userAgent
    ),
    isArray: function isArray(a) {
      return "[object Array]" === Object.prototype.toString.apply(a);
    },
    browser: {
      ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
      ieTouch:
        (window.navigator.msPointerEnabled &&
          1 < window.navigator.msMaxTouchPoints) ||
        (window.navigator.pointerEnabled &&
          1 < window.navigator.maxTouchPoints),
      lteIE9: (function () {
        var a = document.createElement("div");
        return (
          (a.innerHTML = "<!--[if lte IE 9]><i></i><![endif]-->"),
          1 === a.getElementsByTagName("i").length
        );
      })(),
    },
    device: (function () {
      var r = window.navigator.userAgent,
        e = r.match(/(Android);?[\s\/]+([\d.]+)?/),
        a = r.match(/(iPad).*OS\s([\d_]+)/),
        t = r.match(/(iPod)(.*OS\s([\d_]+))?/),
        s = !a && r.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
      return {
        ios: a || s || t,
        android: e,
      };
    })(),
    support: {
      touch:
        (window.Modernizr && !0 === Modernizr.touch) ||
        (function () {
          return !!(
            "ontouchstart" in window ||
            (window.DocumentTouch && document instanceof DocumentTouch)
          );
        })(),
      transforms3d:
        (window.Modernizr && !0 === Modernizr.csstransforms3d) ||
        (function () {
          var a = document.createElement("div").style;
          return (
            "webkitPerspective" in a ||
            "MozPerspective" in a ||
            "OPerspective" in a ||
            "MsPerspective" in a ||
            "perspective" in a
          );
        })(),
      flexbox: (function () {
        for (
          var s = document.createElement("div").style,
            e = [
              "alignItems",
              "webkitAlignItems",
              "webkitBoxAlign",
              "msFlexAlign",
              "mozBoxAlign",
              "webkitFlexDirection",
              "msFlexDirection",
              "mozBoxDirection",
              "mozBoxOrient",
              "webkitBoxDirection",
              "webkitBoxOrient",
            ],
            a = 0;
          a < e.length;
          a++
        )
          if (e[a] in s) return !0;
      })(),
      observer: (function () {
        return (
          "MutationObserver" in window || "WebkitMutationObserver" in window
        );
      })(),
      passiveListener: (function () {
        var t = !1;
        try {
          var s = Object.defineProperty({}, "passive", {
            get: function get() {
              t = !0;
            },
          });
          window.addEventListener("testPassiveListener", null, s);
        } catch (a) {}
        return t;
      })(),
      gestures: (function () {
        return "ongesturestart" in window;
      })(),
    },
    plugins: {},
  };
  for (
    var a = (function () {
        var p = function (e) {
            var s = this,
              a = 0;
            for (a = 0; a < e.length; a++) s[a] = e[a];
            return (s.length = e.length), this;
          },
          o = function (e, a) {
            var t = [],
              s = 0;
            if (e && !a && e instanceof p) return e;
            if (e)
              if ("string" == typeof e) {
                var d,
                  m,
                  c = e.trim();
                if (0 <= c.indexOf("<") && 0 <= c.indexOf(">")) {
                  var o = "div";
                  for (
                    0 === c.indexOf("<li") && (o = "ul"),
                      0 === c.indexOf("<tr") && (o = "tbody"),
                      (0 !== c.indexOf("<td") && 0 !== c.indexOf("<th")) ||
                        (o = "tr"),
                      0 === c.indexOf("<tbody") && (o = "table"),
                      0 === c.indexOf("<option") && (o = "select"),
                      m = document.createElement(o),
                      m.innerHTML = e,
                      s = 0;
                    s < m.childNodes.length;
                    s++
                  )
                    t.push(m.childNodes[s]);
                } else
                  for (
                    d =
                      a || "#" !== e[0] || e.match(/[ .<>:~]/)
                        ? (a || document).querySelectorAll(e)
                        : [document.getElementById(e.split("#")[1])],
                      s = 0;
                    s < d.length;
                    s++
                  )
                    d[s] && t.push(d[s]);
              } else if (e.nodeType || e === window || e === document)
                t.push(e);
              else if (0 < e.length && e[0].nodeType)
                for (s = 0; s < e.length; s++) t.push(e[s]);
            return new p(t);
          };
        return (
          (p.prototype = {
            addClass: function addClass(r) {
              if (void 0 === r) return this;
              for (var e = r.split(" "), a = 0; a < e.length; a++)
                for (var i = 0; i < this.length; i++)
                  this[i].classList.add(e[a]);
              return this;
            },
            removeClass: function removeClass(r) {
              for (var e = r.split(" "), a = 0; a < e.length; a++)
                for (var i = 0; i < this.length; i++)
                  this[i].classList.remove(e[a]);
              return this;
            },
            hasClass: function hasClass(a) {
              return !!this[0] && this[0].classList.contains(a);
            },
            toggleClass: function toggleClass(r) {
              for (var e = r.split(" "), a = 0; a < e.length; a++)
                for (var i = 0; i < this.length; i++)
                  this[i].classList.toggle(e[a]);
              return this;
            },
            attr: function attr(r, e) {
              if (1 === arguments.length && "string" == typeof r)
                return this[0] ? this[0].getAttribute(r) : void 0;
              for (var a = 0; a < this.length; a++)
                if (2 === arguments.length) this[a].setAttribute(r, e);
                else
                  for (var i in r)
                    (this[a][i] = r[i]), this[a].setAttribute(i, r[i]);
              return this;
            },
            removeAttr: function removeAttr(t) {
              for (var e = 0; e < this.length; e++) this[e].removeAttribute(t);
              return this;
            },
            data: function data(r, e) {
              if (void 0 !== e) {
                for (var a, n = 0; n < this.length; n++)
                  (a = this[n]),
                    a.dom7ElementDataStorage || (a.dom7ElementDataStorage = {}),
                    (a.dom7ElementDataStorage[r] = e);
                return this;
              }
              if (this[0]) {
                var o = this[0].getAttribute("data-" + r);
                return o
                  ? o
                  : this[0].dom7ElementDataStorage &&
                    (r in this[0].dom7ElementDataStorage)
                  ? this[0].dom7ElementDataStorage[r]
                  : void 0;
              }
            },
            transform: function transform(s) {
              for (var e, r = 0; r < this.length; r++)
                (e = this[r].style),
                  (e.webkitTransform =
                    e.MsTransform =
                    e.msTransform =
                    e.MozTransform =
                    e.OTransform =
                    e.transform =
                      s);
              return this;
            },
            transition: function transition(s) {
              "string" != typeof s && (s += "ms");
              for (var r, i = 0; i < this.length; i++)
                (r = this[i].style),
                  (r.webkitTransitionDuration =
                    r.MsTransitionDuration =
                    r.msTransitionDuration =
                    r.MozTransitionDuration =
                    r.OTransitionDuration =
                    r.transitionDuration =
                      s);
              return this;
            },
            on: function on(a, p, t, e) {
              function d(a) {
                var e = a.target;
                if (o(e).is(p)) t.call(e, a);
                else
                  for (var s = o(e).parents(), r = 0; r < s.length; r++)
                    o(s[r]).is(p) && t.call(s[r], a);
              }
              var r,
                m,
                c = a.split(" ");
              for (r = 0; r < this.length; r++)
                if ("function" == typeof p || !1 === p)
                  for (
                    "function" == typeof p &&
                      ((t = arguments[1]), (e = arguments[2] || !1)),
                      m = 0;
                    m < c.length;
                    m++
                  )
                    this[r].addEventListener(c[m], t, e);
                else
                  for (m = 0; m < c.length; m++)
                    this[r].dom7LiveListeners ||
                      (this[r].dom7LiveListeners = []),
                      this[r].dom7LiveListeners.push({
                        listener: t,
                        liveListener: d,
                      }),
                      this[r].addEventListener(c[m], d, e);
              return this;
            },
            off: function off(l, e, a, p) {
              for (var d = l.split(" "), i = 0; i < d.length; i++)
                for (var m = 0; m < this.length; m++)
                  if ("function" == typeof e || !1 === e)
                    "function" == typeof e &&
                      ((a = arguments[1]), (p = arguments[2] || !1)),
                      this[m].removeEventListener(d[i], a, p);
                  else if (this[m].dom7LiveListeners)
                    for (var c = 0; c < this[m].dom7LiveListeners.length; c++)
                      this[m].dom7LiveListeners[c].listener === a &&
                        this[m].removeEventListener(
                          d[i],
                          this[m].dom7LiveListeners[c].liveListener,
                          p
                        );
              return this;
            },
            once: function once(o, e, l, p) {
              function d(a) {
                l(a), i.off(o, e, d, p);
              }
              var i = this;
              "function" == typeof e &&
                ((e = !1), (l = arguments[1]), (p = arguments[2])),
                i.on(o, e, d, p);
            },
            trigger: function trigger(r, e) {
              for (var a = 0; a < this.length; a++) {
                var i;
                try {
                  i = new window.CustomEvent(r, {
                    detail: e,
                    bubbles: !0,
                    cancelable: !0,
                  });
                } catch (a) {
                  (i = document.createEvent("Event")),
                    i.initEvent(r, !0, !0),
                    (i.detail = e);
                }
                this[a].dispatchEvent(i);
              }
              return this;
            },
            transitionEnd: function transitionEnd(n) {
              function e(t) {
                if (t.target === this)
                  for (n.call(this, t), a = 0; a < o.length; a++)
                    s.off(o[a], e);
              }
              var a,
                o = [
                  "webkitTransitionEnd",
                  "transitionend",
                  "oTransitionEnd",
                  "MSTransitionEnd",
                  "msTransitionEnd",
                ],
                s = this;
              if (n) for (a = 0; a < o.length; a++) s.on(o[a], e);
              return this;
            },
            width: function width() {
              return this[0] === window
                ? window.innerWidth
                : 0 < this.length
                ? parseFloat(this.css("width"))
                : null;
            },
            outerWidth: function outerWidth(a) {
              return 0 < this.length
                ? a
                  ? this[0].offsetWidth +
                    parseFloat(this.css("margin-right")) +
                    parseFloat(this.css("margin-left"))
                  : this[0].offsetWidth
                : null;
            },
            height: function height() {
              return this[0] === window
                ? window.innerHeight
                : 0 < this.length
                ? parseFloat(this.css("height"))
                : null;
            },
            outerHeight: function outerHeight(a) {
              return 0 < this.length
                ? a
                  ? this[0].offsetHeight +
                    parseFloat(this.css("margin-top")) +
                    parseFloat(this.css("margin-bottom"))
                  : this[0].offsetHeight
                : null;
            },
            offset: function offset() {
              if (0 < this.length) {
                var o = this[0],
                  e = o.getBoundingClientRect(),
                  a = document.body,
                  t = o.clientTop || a.clientTop || 0,
                  s = o.clientLeft || a.clientLeft || 0,
                  i = window.pageYOffset || o.scrollTop,
                  r = window.pageXOffset || o.scrollLeft;
                return {
                  top: e.top + i - t,
                  left: e.left + r - s,
                };
              }
              return null;
            },
            css: function css(r, e) {
              var a;
              if (1 === arguments.length) {
                if ("string" != typeof r) {
                  for (a = 0; a < this.length; a++)
                    for (var i in r) this[a].style[i] = r[i];
                  return this;
                }
                if (this[0])
                  return window
                    .getComputedStyle(this[0], null)
                    .getPropertyValue(r);
              }
              if (2 === arguments.length && "string" == typeof r) {
                for (a = 0; a < this.length; a++) this[a].style[r] = e;
                return this;
              }
              return this;
            },
            each: function each(t) {
              for (var e = 0; e < this.length; e++) t.call(this[e], e, this[e]);
              return this;
            },
            html: function html(t) {
              if (void 0 === t) return this[0] ? this[0].innerHTML : void 0;
              for (var e = 0; e < this.length; e++) this[e].innerHTML = t;
              return this;
            },
            text: function text(t) {
              if (void 0 === t)
                return this[0] ? this[0].textContent.trim() : null;
              for (var e = 0; e < this.length; e++) this[e].textContent = t;
              return this;
            },
            is: function is(e) {
              if (!this[0]) return !1;
              var a, t;
              if ("string" == typeof e) {
                var n = this[0];
                if (n === document) return e === document;
                if (n === window) return e === window;
                if (n.matches) return n.matches(e);
                if (n.webkitMatchesSelector) return n.webkitMatchesSelector(e);
                if (n.mozMatchesSelector) return n.mozMatchesSelector(e);
                if (n.msMatchesSelector) return n.msMatchesSelector(e);
                for (a = o(e), t = 0; t < a.length; t++)
                  if (a[t] === this[0]) return !0;
                return !1;
              }
              if (e === document) return this[0] === document;
              if (e === window) return this[0] === window;
              if (e.nodeType || e instanceof p) {
                for (a = e.nodeType ? [e] : e, t = 0; t < a.length; t++)
                  if (a[t] === this[0]) return !0;
                return !1;
              }
              return !1;
            },
            index: function index() {
              if (this[0]) {
                for (var t = this[0], s = 0; null !== (t = t.previousSibling); )
                  1 === t.nodeType && s++;
                return s;
              }
            },
            eq: function eq(e) {
              if (void 0 === e) return this;
              var a,
                r = this.length;
              return e > r - 1
                ? new p([])
                : 0 > e
                ? ((a = r + e), new p(0 > a ? [] : [this[a]]))
                : new p([this[e]]);
            },
            append: function append(e) {
              var a, r;
              for (a = 0; a < this.length; a++)
                if ("string" == typeof e) {
                  var n = document.createElement("div");
                  for (n.innerHTML = e; n.firstChild; )
                    this[a].appendChild(n.firstChild);
                } else if (e instanceof p)
                  for (r = 0; r < e.length; r++) this[a].appendChild(e[r]);
                else this[a].appendChild(e);
              return this;
            },
            prepend: function prepend(e) {
              var a, r;
              for (a = 0; a < this.length; a++)
                if ("string" == typeof e) {
                  var n = document.createElement("div");
                  for (
                    n.innerHTML = e, r = n.childNodes.length - 1;
                    0 <= r;
                    r--
                  )
                    this[a].insertBefore(
                      n.childNodes[r],
                      this[a].childNodes[0]
                    );
                } else if (e instanceof p)
                  for (r = 0; r < e.length; r++)
                    this[a].insertBefore(e[r], this[a].childNodes[0]);
                else this[a].insertBefore(e, this[a].childNodes[0]);
              return this;
            },
            insertBefore: function insertBefore(a) {
              for (var e = o(a), t = 0; t < this.length; t++)
                if (1 === e.length) e[0].parentNode.insertBefore(this[t], e[0]);
                else if (1 < e.length)
                  for (var r = 0; r < e.length; r++)
                    e[r].parentNode.insertBefore(this[t].cloneNode(!0), e[r]);
            },
            insertAfter: function insertAfter(a) {
              for (var e = o(a), t = 0; t < this.length; t++)
                if (1 === e.length)
                  e[0].parentNode.insertBefore(this[t], e[0].nextSibling);
                else if (1 < e.length)
                  for (var r = 0; r < e.length; r++)
                    e[r].parentNode.insertBefore(
                      this[t].cloneNode(!0),
                      e[r].nextSibling
                    );
            },
            next: function next(e) {
              return new p(
                0 < this.length
                  ? e
                    ? this[0].nextElementSibling &&
                      o(this[0].nextElementSibling).is(e)
                      ? [this[0].nextElementSibling]
                      : []
                    : this[0].nextElementSibling
                    ? [this[0].nextElementSibling]
                    : []
                  : []
              );
            },
            nextAll: function nextAll(e) {
              var a = [],
                t = this[0];
              if (!t) return new p([]);
              for (; t.nextElementSibling; ) {
                var s = t.nextElementSibling;
                e ? o(s).is(e) && a.push(s) : a.push(s), (t = s);
              }
              return new p(a);
            },
            prev: function prev(e) {
              return new p(
                0 < this.length
                  ? e
                    ? this[0].previousElementSibling &&
                      o(this[0].previousElementSibling).is(e)
                      ? [this[0].previousElementSibling]
                      : []
                    : this[0].previousElementSibling
                    ? [this[0].previousElementSibling]
                    : []
                  : []
              );
            },
            prevAll: function prevAll(e) {
              var a = [],
                t = this[0];
              if (!t) return new p([]);
              for (; t.previousElementSibling; ) {
                var s = t.previousElementSibling;
                e ? o(s).is(e) && a.push(s) : a.push(s), (t = s);
              }
              return new p(a);
            },
            parent: function parent(a) {
              for (var e = [], t = 0; t < this.length; t++)
                a
                  ? o(this[t].parentNode).is(a) && e.push(this[t].parentNode)
                  : e.push(this[t].parentNode);
              return o(o.unique(e));
            },
            parents: function parents(a) {
              for (var e = [], t = 0; t < this.length; t++)
                for (var r = this[t].parentNode; r; )
                  a ? o(r).is(a) && e.push(r) : e.push(r), (r = r.parentNode);
              return o(o.unique(e));
            },
            find: function find(e) {
              for (var a = [], t = 0; t < this.length; t++)
                for (
                  var n = this[t].querySelectorAll(e), i = 0;
                  i < n.length;
                  i++
                )
                  a.push(n[i]);
              return new p(a);
            },
            children: function children(e) {
              for (var a = [], t = 0; t < this.length; t++)
                for (var s = this[t].childNodes, r = 0; r < s.length; r++)
                  e
                    ? 1 === s[r].nodeType && o(s[r]).is(e) && a.push(s[r])
                    : 1 === s[r].nodeType && a.push(s[r]);
              return new p(o.unique(a));
            },
            remove: function remove() {
              for (var a = 0; a < this.length; a++)
                this[a].parentNode && this[a].parentNode.removeChild(this[a]);
              return this;
            },
            add: function add() {
              var a,
                r,
                n = this;
              for (a = 0; a < arguments.length; a++) {
                var s = o(arguments[a]);
                for (r = 0; r < s.length; r++) (n[n.length] = s[r]), n.length++;
              }
              return n;
            },
          }),
          (o.fn = p.prototype),
          (o.unique = function (s) {
            for (var e = [], a = 0; a < s.length; a++)
              -1 === e.indexOf(s[a]) && e.push(s[a]);
            return e;
          }),
          o
        );
      })(),
      t = ["jQuery", "Zepto", "Dom7"],
      s = 0;
    s < t.length;
    s++
  )
    window[t[s]] &&
      (function (a) {
        a.fn.swiper = function (r) {
          var t;
          return (
            a(this).each(function () {
              var a = new N(this, r);
              t || (t = a);
            }),
            t
          );
        };
      })(window[t[s]]);
  var n;
  (n = void 0 === a ? window.Dom7 || window.Zepto || window.jQuery : a),
    n &&
      ("transitionEnd" in n.fn ||
        (n.fn.transitionEnd = function (n) {
          function e(t) {
            if (t.target === this)
              for (n.call(this, t), a = 0; a < o.length; a++) s.off(o[a], e);
          }
          var a,
            o = [
              "webkitTransitionEnd",
              "transitionend",
              "oTransitionEnd",
              "MSTransitionEnd",
              "msTransitionEnd",
            ],
            s = this;
          if (n) for (a = 0; a < o.length; a++) s.on(o[a], e);
          return this;
        }),
      "transform" in n.fn ||
        (n.fn.transform = function (s) {
          for (var e, r = 0; r < this.length; r++)
            (e = this[r].style),
              (e.webkitTransform =
                e.MsTransform =
                e.msTransform =
                e.MozTransform =
                e.OTransform =
                e.transform =
                  s);
          return this;
        }),
      "transition" in n.fn ||
        (n.fn.transition = function (s) {
          "string" != typeof s && (s += "ms");
          for (var r, i = 0; i < this.length; i++)
            (r = this[i].style),
              (r.webkitTransitionDuration =
                r.MsTransitionDuration =
                r.msTransitionDuration =
                r.MozTransitionDuration =
                r.OTransitionDuration =
                r.transitionDuration =
                  s);
          return this;
        }),
      "outerWidth" in n.fn ||
        (n.fn.outerWidth = function (a) {
          return 0 < this.length
            ? a
              ? this[0].offsetWidth +
                parseFloat(this.css("margin-right")) +
                parseFloat(this.css("margin-left"))
              : this[0].offsetWidth
            : null;
        })),
    (window.Swiper = N);
})(),
  "undefined" == typeof module
    ? "function" == typeof define &&
      define.amd &&
      define([], function () {
        return window.Swiper;
      })
    : (module.exports = window.Swiper);
(function () {
  function a() {
    var a = $(".js-landing-full-listing-swiper--lpv2");
    a.each(function () {
      var a = $(this),
        d = a.parent().find(".js-swiper-button--next"),
        e = a.parent().find(".js-swiper-button--prev"),
        f = a.swiper(c(d, e, a));
      b(d, e, a),
        window.addEventListener("resize", function () {
          var b,
            g = c(d, e, a);
          for (b in g) g.hasOwnProperty(b) && (f.params[b] = g[b]);
        });
    });
  }

  function b(a, b, c) {
    a.toggleClass("disabled", !!c.isBeginning),
      b.toggleClass("disabled", !!c.isEnd);
  }

  function c(a, c, d) {
    return 480 > window.innerWidth
      ? {
          grabCursor: !0,
          loop: !1,
          spaceBetween: 24,
          slidesPerView: "auto",
          freeMode: !0,
          nextButton: a,
          prevButton: c,
          onSlideChangeStart: b(a, c, d),
        }
      : 768 > window.innerWidth
      ? {
          slidesPerView: "auto",
          grabCursor: !0,
          loop: !1,
          freeMode: !0,
          spaceBetween: 24,
          nextButton: a,
          prevButton: c,
          onSlideChangeStart: b(a, c, d),
        }
      : 940 > window.innerWidth
      ? {
          slidesPerView: "auto",
          spaceBetween: 24,
          freeMode: !0,
          nextButton: a,
          prevButton: c,
          onSlideChangeStart: b(a, c, d),
        }
      : 1024 > window.innerWidth
      ? {
          slidesPerView: "auto",
          grabCursor: !1,
          loop: !1,
          spaceBetween: 24,
          freeMode: !0,
          nextButton: a,
          prevButton: c,
          onSlideChangeStart: b(a, c, d),
        }
      : {
          slidesPerView: 4,
          grabCursor: !1,
          loop: !1,
          spaceBetween: 24,
          freeMode: !0,
          nextButton: a,
          prevButton: c,
          onSlideChangeStart: b(a, c, d),
        };
  }

  function d() {
    var a = $(".js-style-double-block-swiper--lpv2");
    a.each(function () {
      var a = $(this),
        b = a.parent().find(".js-swiper-button--next"),
        c = a.parent().find(".js-swiper-button--prev"),
        d = a.swiper(f(b, c, a));
      e(b, c, a),
        window.addEventListener("resize", function () {
          var e,
            g = f(b, c, a);
          for (e in g) g.hasOwnProperty(e) && (d.params[e] = g[e]);
        });
    });
  }

  function e(a, b, c) {
    a.toggleClass("disabled", !!c.isBeginning),
      b.toggleClass("disabled", !!c.isEnd);
  }

  function f(a, b, c) {
    return 480 > window.innerWidth
      ? {
          grabCursor: !0,
          loop: !1,
          spaceBetween: 24,
          slidesPerView: "auto",
          freeMode: !0,
          nextButton: a,
          prevButton: b,
          onSlideChangeStart: e(a, b, c),
        }
      : 768 > window.innerWidth
      ? {
          slidesPerView: "auto",
          grabCursor: !0,
          loop: !1,
          freeMode: !0,
          spaceBetween: 24,
          nextButton: a,
          prevButton: b,
          onSlideChangeStart: e(a, b, c),
        }
      : 940 > window.innerWidth
      ? {
          slidesPerView: "auto",
          spaceBetween: 24,
          freeMode: !0,
          nextButton: a,
          prevButton: b,
          onSlideChangeStart: e(a, b, c),
        }
      : 1168 > window.innerWidth
      ? {
          slidesPerView: "auto",
          grabCursor: !1,
          loop: !1,
          spaceBetween: 24,
          freeMode: !0,
          nextButton: a,
          prevButton: b,
          onSlideChangeStart: e(a, b, c),
        }
      : 1441 > window.innerWidth
      ? {
          slidesPerView: "auto",
          slidesPerGroup: 4,
          grabCursor: !1,
          loop: !1,
          spaceBetween: 24,
          nextButton: a,
          prevButton: b,
          onSlideChangeStart: e(a, b, c),
        }
      : {
          slidesPerView: 4,
          slidesPerGroup: 4,
          grabCursor: !1,
          loop: !1,
          spaceBetween: 24,
          nextButton: a,
          prevButton: b,
          onSlideChangeStart: e(a, b, c),
        };
  }

  function g(a, b, c) {
    b.toggleClass("disabled", !!c.isBeginning),
      a.toggleClass("disabled", !!c.isEnd);
  }

  function h(a, b, c) {
    return 480 > window.innerWidth
      ? {
          grabCursor: !0,
          loop: !1,
          spaceBetween: 24,
          slidesPerView: "auto",
          freeMode: !0,
          nextButton: a,
          prevButton: b,
          onSlideChangeStart: g(a, b, c),
        }
      : 768 > window.innerWidth
      ? {
          slidesPerView: "auto",
          freeMode: !0,
          spaceBetween: 24,
          nextButton: a,
          prevButton: b,
          onSlideChangeStart: g(a, b, c),
        }
      : 940 > window.innerWidth
      ? {
          slidesPerView: "auto",
          spaceBetween: 24,
          freeMode: !0,
          nextButton: a,
          prevButton: b,
          onSlideChangeStart: g(a, b, c),
        }
      : 1168 > window.innerWidth
      ? {
          slidesPerView: "auto",
          grabCursor: !1,
          loop: !1,
          spaceBetween: 24,
          freeMode: !0,
          nextButton: a,
          prevButton: b,
          onSlideChangeStart: g(a, b, c),
        }
      : 1441 > window.innerWidth
      ? {
          slidesPerView: 4,
          slidesPerGroup: 4,
          grabCursor: !1,
          loop: !1,
          spaceBetween: 24,
          nextButton: a,
          prevButton: b,
          onSlideChangeStart: g(a, b, c),
        }
      : {
          slidesPerView: 4,
          slidesPerGroup: 4,
          grabCursor: !1,
          loop: !1,
          spaceBetween: 24,
          nextButton: a,
          prevButton: b,
          onSlideChangeStart: g(a, b, c),
        };
  }

  function i(a, b, c) {
    b.toggleClass("disabled", !!c.isBeginning),
      a.toggleClass("disabled", !!c.isEnd);
  }

  function j(a, b, c) {
    return 480 > window.innerWidth
      ? {
          grabCursor: !0,
          loop: !1,
          spaceBetween: 24,
          slidesPerView: "auto",
          freeMode: !0,
          nextButton: a,
          prevButton: b,
          onSlideChangeStart: i(a, b, c),
        }
      : 768 > window.innerWidth
      ? {
          slidesPerView: "auto",
          freeMode: !0,
          spaceBetween: 24,
          nextButton: a,
          prevButton: b,
          onSlideChangeStart: i(a, b, c),
        }
      : 940 > window.innerWidth
      ? {
          slidesPerView: "auto",
          spaceBetween: 24,
          freeMode: !0,
          nextButton: a,
          prevButton: b,
          onSlideChangeStart: i(a, b, c),
        }
      : 1168 > window.innerWidth
      ? {
          slidesPerView: "auto",
          grabCursor: !1,
          loop: !1,
          spaceBetween: 24,
          freeMode: !0,
          nextButton: a,
          prevButton: b,
          onSlideChangeStart: i(a, b, c),
        }
      : 1441 > window.innerWidth
      ? {
          slidesPerView: 3,
          slidesPerGroup: 3,
          grabCursor: !1,
          loop: !1,
          spaceBetween: 24,
          nextButton: a,
          prevButton: b,
          onSlideChangeStart: i(a, b, c),
        }
      : {
          slidesPerView: 3,
          slidesPerGroup: 3,
          grabCursor: !1,
          loop: !1,
          spaceBetween: 24,
          nextButton: a,
          prevButton: b,
          onSlideChangeStart: i(a, b, c),
        };
  }

  function k(a, b, c) {
    a.toggleClass("disabled", !!c.isBeginning),
      b.toggleClass("disabled", !!c.isEnd);
  }

  function l(a, b, c) {
    return 480 > window.innerWidth
      ? {
          grabCursor: !0,
          loop: !1,
          spaceBetween: 24,
          slidesPerView: "auto",
          freeMode: !0,
          nextButton: a,
          prevButton: b,
          onSlideChangeStart: k(b, a, c),
        }
      : 768 > window.innerWidth
      ? {
          slidesPerView: "auto",
          freeMode: !0,
          spaceBetween: 24,
          nextButton: a,
          prevButton: b,
          onSlideChangeStart: k(b, a, c),
        }
      : 940 > window.innerWidth
      ? {
          slidesPerView: "auto",
          spaceBetween: 24,
          freeMode: !0,
          nextButton: a,
          prevButton: b,
          onSlideChangeStart: k(b, a, c),
        }
      : 1168 > window.innerWidth
      ? {
          slidesPerView: "auto",
          grabCursor: !1,
          loop: !1,
          spaceBetween: 24,
          freeMode: !0,
          nextButton: a,
          prevButton: b,
          onSlideChangeStart: k(b, a, c),
        }
      : 1441 > window.innerWidth
      ? {
          slidesPerView: 4,
          slidesPerGroup: 4,
          grabCursor: !1,
          loop: !1,
          spaceBetween: 24,
          nextButton: a,
          prevButton: b,
          onSlideChangeStart: k(b, a, c),
        }
      : {
          slidesPerView: 4,
          slidesPerGroup: 4,
          grabCursor: !1,
          loop: !1,
          spaceBetween: 24,
          nextButton: a,
          prevButton: b,
          onSlideChangeStart: k(b, a, c),
        };
  }

  function m() {
    v.toggleClass("disabled", !!w.isBeginning),
      u.toggleClass("disabled", !!w.isEnd);
  }

  function n() {
    return 768 > window.innerWidth
      ? {
          slidesPerView: "auto",
          slidesPerGroup: 1,
          grabCursor: !0,
          loop: !1,
          spaceBetween: 8,
          nextButton: u,
          prevButton: v,
          onSlideChangeStart: m,
        }
      : 1168 > window.innerWidth
      ? {
          slidesPerView: "auto",
          slidesPerGroup: 1,
          grabCursor: !1,
          loop: !1,
          spaceBetween: 8,
          nextButton: u,
          prevButton: v,
          onSlideChangeStart: m,
        }
      : 1441 > window.innerWidth
      ? {
          slidesPerView: 4,
          slidesPerGroup: 2,
          grabCursor: !1,
          loop: !1,
          spaceBetween: 16,
          nextButton: u,
          prevButton: v,
          onSlideChangeStart: m,
        }
      : {
          slidesPerView: 4,
          slidesPerGroup: 2,
          grabCursor: !1,
          loop: !1,
          spaceBetween: 16,
          nextButton: u,
          prevButton: v,
          onSlideChangeStart: m,
        };
  }
  1024 > window.innerWidth && (a(), d());
  var o = !1,
    p = !1;
  $(window).resize(function () {
    1024 > window.innerWidth && !o
      ? (a(), d(), (o = !0), (p = !1))
      : 1024 < window.innerWidth &&
        !p &&
        ($(".sector--remove-desktop-slider")
          .find(".swiper-slide")
          .removeAttr("style"),
        (p = !0),
        (o = !1));
  });
  var q = $(".js-landing-listing-swiper--lpv2");
  q.each(function () {
    var a = $(this),
      b = a.parent().find(".js-swiper-button--next"),
      c = a.parent().find(".js-swiper-button--prev"),
      d = a.swiper(h(b, c, a));
    g(b, c, a),
      window.addEventListener("resize", function () {
        var e,
          f = h(b, c, a);
        for (e in f) f.hasOwnProperty(e) && (d.params[e] = f[e]);
      });
  });
  var r = $(".js-landing-fulldestination-swiper--lpv2");
  r.each(function () {
    var a = $(this),
      b = a.parent().find(".js-swiper-button--next"),
      c = a.parent().find(".js-swiper-button--prev"),
      d = a.swiper(j(b, c, a));
    i(b, c, a),
      window.addEventListener("resize", function () {
        var e,
          f = j(b, c, a);
        for (e in f) f.hasOwnProperty(e) && (d.params[e] = f[e]);
      });
  });
  var s = $(".js-landing-listing-style-swiper--lpv2");
  s.each(function () {
    var a = $(this),
      b = a.parent().find(".js-swiper-button--next"),
      c = a.parent().find(".js-swiper-button--prev"),
      d = a.swiper(l(b, c, a));
    k(b, c, a),
      window.addEventListener("resize", function () {
        var e,
          f = l(b, c, a);
        for (e in f) f.hasOwnProperty(e) && (d.params[e] = f[e]);
      });
  });
  var t = $("#listing-categories"),
    u = t.find(".js-swiper-button--next"),
    v = t.find(".js-swiper-button--prev"),
    w = new Swiper(".js-landing-listing-category-swiper", n());
  m(),
    window.addEventListener("resize", function () {
      var a,
        b = n();
      for (a in b) b.hasOwnProperty(a) && (w.params[a] = b[a]);
    }),
    $(".swiper-button--lpv2").addClass("loaded");
})();
