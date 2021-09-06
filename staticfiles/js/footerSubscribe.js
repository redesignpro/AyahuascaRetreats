$(function () {
  var a = function (a) {
    $("#sub_eol_form").length &&
      $("#sub_eol_form").html(
        '<div class="alert alert-success">'.concat(a, "</div>")
      ),
      $("#footer-subscribe").html(
        '<div class="alert alert-success">'.concat(a, "</div>")
      ),
      $(".js-successful-subscription").html(
        '<div class="alert alert-success">'.concat(a, "</div>")
      );
  };
  $('.new_subscriber input[type="email"]').on("keyup", function (a) {
    $(".subscribe-form-message").removeClass("--invalid").text(""),
      $(a.target).removeClass("--invalid");
  });
  var b = function (b) {
    if (0 !== b.length) {
      b.addClass("--submit");
      var c = b.find('input[type="email"]'),
        d = new Subscriber({
          email: c.val(),
          source: c.data("source"),
        });
      d.create()
        .then(function (c) {
          if (
            (marketing.trackSoftGoals(
              marketing.SoftGoals.NewsletterSubscription,
              d.source
            ),
            b.removeClass("--submit"),
            c.hasOwnProperty("customer_id") && 0 != c.customer_id)
          )
            a("Thank you for subscribing!");
          else {
            var e = $("#subscribe_confirm_modal");
            e.length && e.modal("show"),
              a(
                "Please go to your inbox to and click the confirmation link we just emailed you."
              );
          }
        })
        .catch(function (a) {
          b.removeClass("--submit"),
            409 === a.status &&
              $(".subscribe-form-message").text(
                "You have already signed up to our newsletter."
              ),
            400 === a.status &&
              $(".subscribe-form-message").text("Email address is invalid."),
            $(".subscribe-form-message").addClass("--invalid"),
            c.addClass("--invalid");
        });
    }
  };
  $(
    "#footer-subscribe, #footer-modal-subscribe, .blog-subscriber-form, #sub_eol"
  ).on("submit", function (a) {
    a.preventDefault(), b($(a.target));
  }),
    $("#sub_eol_button").on("click", function (a) {
      console.log(a.target),
        a.preventDefault(),
        b($(a.target.closest("#sub_eol_form")));
    });
});
