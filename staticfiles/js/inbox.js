var _this = this,
  conversationData = (function () {
    return {
      sectionStatus: function sectionStatus(a) {
        var b = {
            open: translations.inbox.open,
            available: translations.inbox.available,
            booked: translations.inbox.booked,
            cancelled: translations.inbox.cancelled,
            awaiting_confirmation: translations.inbox.awaitingConfirmation,
            not_available: translations.inbox.notAvailable,
            duplicate: translations.inbox.duplicate,
          },
          c = {
            open: translations.inbox.statusLabel.open,
            available: translations.inbox.statusLabel.available,
            booked: translations.inbox.statusLabel.booked,
            cancelled: translations.inbox.statusLabel.cancelled,
            awaiting_confirmation:
              translations.inbox.statusLabel.awaitingConfirmation,
            not_available: translations.inbox.statusLabel.notAvailable,
            duplicate: translations.inbox.statusLabel.duplicate,
          },
          d =
            '\n\t\t\t\t<p class="status">\n\t\t\t\t\t<strong class="status status--'
              .concat(a.displayStatus, '">')
              .concat(
                c[a.displayStatus] == null
                  ? ""
                  : "".concat(c[a.displayStatus.toLowerCase()]),
                '</strong>\n\t\t\t\t\t<span class="text">'
              )
              .concat(
                b[a.displayStatus] == null
                  ? ""
                  : "".concat(b[a.displayStatus.toLowerCase()]),
                "</span>\n\t\t\t\t</p>\n\t\t\t"
              )
              .trim();
        return d;
      },
      sectionTitle: function sectionTitle(a) {
        var b = '\n\t\t\t\t<h2 class="conversation--listing-title">'
          .concat(a.listing.title, "</h2>\n\t\t\t")
          .trim();
        return b;
      },
      sectionPackage: function sectionPackage(a) {
        var b = "";
        a.datesSelected &&
          (b = '<div class="package--price">\n\t\t\t\t\t\t\t'
            .concat(translations.inbox.totalPrice, ": <strong>")
            .concat(a.paymentInfo.price, "</strong>\n\t\t\t\t\t\t</div>")
            .trim());
        var c =
          '\n\t\t\t\t<section class="package">\n\t\t\t\t\t<div class="package--info">\n\t\t\t\t\t\t<span class="date">\n\t\t\t\t\t\t\t<svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15"><path fill="#969AA1" fill-rule="nonzero" d="M2.944 14.875h7.694c1.632 0 2.944-1.278 2.944-2.876v-7.67c0-1.598-1.312-2.876-2.944-2.876h-.32V.58A.566.566 0 0 0 9.733 0a.584.584 0 0 0-.583.581v.872H4.43V.58a.584.584 0 0 0-1.166 0v.872h-.32C1.312 1.453 0 2.73 0 4.329v7.64c0 1.628 1.34 2.906 2.944 2.906zm7.723-1.162H2.944c-.991 0-1.75-.755-1.75-1.714V6.827h11.193v5.143c.029.988-.758 1.743-1.72 1.743zM2.944 2.586h.32v1.249c0 .349.263.581.583.581.32 0 .583-.232.583-.581v-1.25h4.75v1.25c0 .349.234.581.584.581.32 0 .582-.232.582-.581v-1.25h.321c.962 0 1.749.785 1.749 1.744v1.365H1.195V4.33c0-.959.787-1.743 1.749-1.743z"/></svg>\n\t\t\t\t\t\t\t'
            .concat(
              a.datesSelected
                ? '<span class="start">'
                    .concat(
                      _this.conversationData.formatDate(a.arrivalDate),
                      '</span> \u2192 <span class="end">'
                    )
                    .concat(
                      _this.conversationData.formatDate(a.departureDate),
                      "</span>"
                    )
                : "".concat(translations.inbox.noDatesSelected),
              '\n\t\t\t\t\t\t</span>\n\t\t\t\t\t\t<span class="nr-persons">\n\t\t\t\t\t\t\t<svg xmlns="http://www.w3.org/2000/svg" width="10" height="15" viewBox="0 0 10 15"><path fill="#969AA1" fill-rule="nonzero" d="M2.016 7.236a.562.562 0 0 0-.293.088A4.475 4.475 0 0 0 0 10.84v3.662c0 .293.204.498.438.498h8.325c.263 0 .468-.205.468-.498V10.84c0-1.406-.701-2.695-1.753-3.516a.441.441 0 0 0-.497-.03c-.7.44-1.518.645-2.366.645-.876 0-1.694-.205-2.395-.644a.421.421 0 0 0-.204-.059zm.029 1.026a5.46 5.46 0 0 0 2.57.615c.906 0 1.782-.205 2.542-.615a3.478 3.478 0 0 1 1.139 2.578v3.223H.906V10.84c0-1.026.438-1.934 1.139-2.578zM4.615 0a3.271 3.271 0 0 0-3.271 3.281 3.265 3.265 0 0 0 3.271 3.252c1.782 0 3.272-1.465 3.272-3.252A3.29 3.29 0 0 0 4.615 0zm0 .938A2.329 2.329 0 0 1 6.952 3.28a2.322 2.322 0 0 1-2.337 2.315C3.33 5.596 2.25 4.57 2.25 3.28 2.25 1.963 3.33.937 4.615.937z"/></svg>\n\t\t\t\t\t\t\t'
            )
            .concat(a.nrPersons, " ")
            .concat(
              1 === a.nrPersons
                ? "".concat(translations.inbox.person)
                : "".concat(translations.inbox.persons),
              '\n\t\t\t\t\t\t</span>\n\t\t\t\t\t\t<span class="roomtype">\n\t\t\t\t\t\t\t<svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14"><path fill="#969AA1" fill-rule="nonzero" d="M14.987 10.212V7.576c0-.387-.11-.748-.303-1.055V3.08A3.084 3.084 0 0 0 11.616 0H3.36A3.084 3.084 0 0 0 .29 3.08v3.47A1.99 1.99 0 0 0 0 7.577v3.581c0 .194.152.346.345.346h.4v.999a.622.622 0 0 0 .622.623h1.41a.618.618 0 0 0 .622-.623v-.999h8.157v.999a.622.622 0 0 0 .621.623h1.411a.618.618 0 0 0 .621-.623v-.999h.443a.342.342 0 0 0 .344-.346v-.847a.16.16 0 0 0-.009-.098zm-.689-.972H.692V7.576c0-.706.58-1.29 1.287-1.29h11.033c.704 0 1.286.58 1.286 1.29V9.24zM12.57 5.59H7.825V3.244c0-.11.098-.209.208-.209h4.328c.11 0 .208.099.208.209V5.59zm-5.448 0H2.377V3.244c0-.11.098-.209.208-.209h4.328c.11 0 .208.099.208.209V5.59zM3.36.692h8.256a2.383 2.383 0 0 1 2.38 2.388v2.776a2.162 2.162 0 0 0-.735-.25V3.246a.903.903 0 0 0-.9-.903H8.033a.86.86 0 0 0-.553.193.86.86 0 0 0-.552-.193H2.585a.896.896 0 0 0-.9.903V5.62c-.25.042-.5.126-.705.25V3.08A2.385 2.385 0 0 1 3.36.692zm-.65 11.741H1.437v-.93h1.271v.93zm10.813 0H12.25v-.93h1.272v.93zm.787-1.625H.692v-.873h13.606v.375c0 .027 0 .069.015.099v.4h-.003z"/></svg>\n\t\t\t\t\t\t\t'
            )
            .concat(
              a.roomDescriptionTranslated,
              "\n\t\t\t\t\t\t</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t"
            )
            .concat(b, "\n\t\t\t\t</section>\n\t\t\t")
            .trim();
        return c;
      },
      sectionActionReadyToBook: function sectionActionReadyToBook(a) {
        var b = "",
          c = "",
          d = "",
          e = "";
        0 <
          Date.parse(a.paymentInfo.timeToBookUntil) - Date.parse(new Date()) &&
          (c =
            '<span id="time-left" class="time-left">calculating time left...</span>'),
          "" != a.paymentInfo.depositInCustomerCurrency &&
            (b = ' <span class="customer-currency">('.concat(
              a.paymentInfo.depositInCustomerCurrency,
              ")</span>"
            )),
          "" != a.paymentInfo.timeToBookUntil &&
            0 <
              Date.parse(a.paymentInfo.timeToBookUntil) -
                Date.parse(new Date()) &&
            countdown.timer(a.paymentInfo.timeToBookUntil, "time-left"),
          a.paymentInfo.isWithMarkup
            ? ((d = '<span class="amount">'.concat(
                a.paymentInfo.depositInCustomerCurrency,
                "</span>"
              )),
              (e = "".concat(a.paymentInfo.depositInCustomerCurrency)))
            : ((d = '<span class="amount">'.concat(
                a.paymentInfo.deposit,
                "</span>"
              )),
              (e = "".concat(a.paymentInfo.deposit)));
        var f =
          '\n\t\t\t\t<section class="take-action take-action--ready-to-book">\n\t\t\t\t\t<h3>'
            .concat(
              translations.inbox.tripReadyToBook,
              '</h3>\n\t\t\t\t\t<div class="wrapper">\n\t\t\t\t\t\t<div class="info">\n\t\t\t\t\t\t\t<p class="deposit">\n\t\t\t\t\t\t\t\t<strong>Deposit</strong>\n\t\t\t\t\t\t\t\t'
            )
            .concat(
              d,
              '\n\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t<p class="refundability">'
            )
            .concat(translations.inbox.depositText, " ")
            .concat(e, ". ")
            .concat(
              a.paymentInfo.restOfPaymentText,
              '</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="action">\n\t\t\t\t\t\t\t<a href="'
            )
            .concat(
              a.bookItUrl,
              '" class="bttn bttn--regular take-action" target="_blank" onclick="gae(\'customer_inbox\', \'book-now\')">\n\t\t\t\t\t\t\t\t<span class="default-value">'
            )
            .concat(translations.inbox.bookNow, "</span>\n\t\t\t\t\t\t\t\t")
            .concat(
              c,
              "\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</section>\n\t\t\t"
            )
            .trim();
        return f;
      },
      sectionActionRequestToPay: function sectionActionRequestToPay(a) {
        var b = "",
          c = "";
        "" != a.paymentInfo.depositInCustomerCurrency &&
          (b = ' <span class="customer-currency">('.concat(
            a.paymentInfo.depositInCustomerCurrency,
            ")</span>"
          )),
          (c = a.paymentInfo.isWithMarkup
            ? "" == a.paymentInfo.depositInCustomerCurrency
              ? '<span class="amount">'.concat(a.paymentInfo.deposit, "</span>")
              : '<span class="amount">'.concat(
                  a.paymentInfo.depositInCustomerCurrency,
                  "</span>"
                )
            : '<span class="amount">'
                .concat(a.paymentInfo.deposit, " ")
                .concat(b, "</span>"));
        var d =
          '\n\t\t\t\t<section class="take-action take-action--request-to-pay">\n\t\t\t\t\t<h3>'
            .concat(
              translations.inbox.requestToPay,
              '</h3>\n\t\t\t\t\t<div class="wrapper">\n\t\t\t\t\t\t<div class="info">\n\t\t\t\t\t\t\t<p class="deposit">\n\t\t\t\t\t\t\t\t<strong>'
            )
            .concat(translations.inbox.deposit, "</strong>\n\t\t\t\t\t\t\t\t")
            .concat(c, "\n\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t<p>")
            .concat(
              translations.inbox.requestToPayText,
              '</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="action">\n\t\t\t\t\t\t\t<a href="'
            )
            .concat(
              a.saveCardUrl,
              '" target="_blank" class="bttn bttn--regular take-action" onclick="gae(\'customer_inbox\', \'request-to-pay\')">\n\t\t\t\t\t\t\t\t<span class="default-value">'
            )
            .concat(
              translations.inbox.requestToPay,
              "</span>\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</section>\n\t\t\t"
            )
            .trim();
        return d;
      },
      sectionActionPaymentPending: function sectionActionPaymentPending(a) {
        var b = "";
        "" != a.paymentInfo.depositInCustomerCurrency &&
          "deposit" == a.paymentInfo.amountSelected &&
          (b = ' <span class="customer-currency">('.concat(
            a.paymentInfo.depositInCustomerCurrency,
            ")</span>"
          )),
          "" != a.paymentInfo.priceInCustomerCurrency &&
            "full_amount" == a.paymentInfo.amountSelected &&
            (b = ' <span class="customer-currency">('.concat(
              a.paymentInfo.priceInCustomerCurrency,
              ")</span>"
            ));
        var c =
            "full_amount" == a.paymentInfo.amountSelected
              ? a.paymentInfo.price
              : a.paymentInfo.deposit,
          d =
            '\n\t\t\t\t<section class="take-action take-action--payment-pending">\n\t\t\t\t\t<h3>Payment pending</h3>\n\t\t\t\t\t<div class="wrapper">\n\t\t\t\t\t\t<div class="info">\n\t\t\t\t\t\t\t<p class="deposit">\n\t\t\t\t\t\t\t\t<strong>Deposit</strong>\n\t\t\t\t\t\t\t\t<span class="amount">'
              .concat(c)
              .concat(
                b,
                '</span>\n\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t<p class="action-message">'
              )
              .concat(
                translations.inbox.paymentPendingText,
                '</p>\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t<div class="action">\n\t\t\t\t\t\t\t<a href="'
              )
              .concat(
                a.cancelUrl,
                '" target="_blank" class="bttn bttn--outline-gray take-action" onclick="gae(\'customer_inbox\', \'cancel-payment-request\')">\n\t\t\t\t\t\t\t\t<span class="default-value">'
              )
              .concat(
                translations.inbox.cancelPaymentRequest,
                "</span>\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</section>\n\t\t\t"
              )
              .trim();
        return d;
      },
      sectionToConversation: function sectionToConversation(a) {
        var b = '\n\t\t\t\t<div class="to-conversation">\n\t\t\t\t\t<a href="'
          .concat(
            a.dialogUrl,
            '" class="bttn bttn--outline" target="_blank" title="opens in new tab" onclick="gae(\'customer_inbox\', \'continue-to-conversation\')">'
          )
          .concat(
            translations.inbox.continueToConversation,
            "</a>\n\t\t\t\t</div>\n\t\t\t"
          )
          .trim();
        return b;
      },
      sectionBookingReceipt: function sectionBookingReceipt(a) {
        var b = "",
          c = "";
        a.paymentInfo.isWithMarkup
          ? ((b =
              "" == a.paymentInfo.depositInCustomerCurrency
                ? '<span class="amount">'.concat(
                    a.paymentInfo.paidByCustomer,
                    "</span>"
                  )
                : '<span class="amount">'.concat(
                    a.paymentInfo.paidByCustomerInCustomerCurrency,
                    "</span>"
                  )),
            (c =
              '<p class="remaining">Remaining due <span class="amount">'.concat(
                a.paymentInfo.remainingPayment,
                "</span></p> "
              )))
          : ((b = '<span class="amount">'.concat(
              a.paymentInfo.paidByCustomer,
              "</span>"
            )),
            (c =
              '<p class="remaining">Remaining due <span class="amount">'.concat(
                a.paymentInfo.remainingPayment,
                "</span></p> "
              )));
        var d =
          '\n\t\t\t\t<section class="booking-receipt section-with-icon">\n\t\t\t\t\t<aside>\n\t\t\t\t\t\t<svg xmlns="http://www.w3.org/2000/svg" width="51" height="60" viewBox="0 0 51 60"><g fill="none" fill-rule="evenodd"><path fill="#F7F7F7" d="M18.817 59.885c10.367 1.144 27.74-6.133 31.569-25.92 1.96-10.058-.748-23.386-14.477-30.009C-9.39-17.794-7.99 57.105 18.817 59.885z"/><path fill="#969AA1" fill-rule="nonzero" d="M41.66 48.92l.053-32.663a2.251 2.251 0 0 0-2.251-2.252H17.41a2.251 2.251 0 0 0-2.251 2.251V48.92l3.208-2.979a.825.825 0 0 1 1.113.001l4.053 3.643.135.12 4.133-3.762a.826.826 0 0 1 1.115 0l4.053 3.642.133.119 4.236-3.76a.826.826 0 0 1 1.117-.002l2.87 2.666.336.312zm-2.25-36.366a3.703 3.703 0 0 1 3.703 3.702v34.56a.623.623 0 0 1-.344.519l-.325.071a.686.686 0 0 1-.359-.167l-3.942-3.636-.268-.246-4.322 3.884a.627.627 0 0 1-.847.002L28.652 47.6l-.271-.244-4.268 3.94a.625.625 0 0 1-.843-.001l-4.054-3.644-.27-.243-4.217 3.888a.626.626 0 1 1-1.073-.46v-34.58a3.703 3.703 0 0 1 3.703-3.702H39.41z"/><path fill="#969AA1" fill-rule="nonzero" d="M22.23 23.338a.826.826 0 0 1-.825-.825v-3.487a.826.826 0 0 1 1.651 0v3.487c0 .456-.37.825-.825.825zM28.385 23.338a.826.826 0 0 1-.826-.825v-3.487a.826.826 0 1 1 1.651 0v3.487c0 .456-.37.825-.825.825zM34.538 23.338a.826.826 0 0 1-.825-.825v-3.487a.826.826 0 0 1 1.651 0v3.487c0 .456-.37.825-.826.825zM34.744 33.587a.826.826 0 1 1 0 1.651H22.026a.826.826 0 1 1 0-1.65h12.718zM34.744 28a.826.826 0 1 1 0 1.651H22.026a.826.826 0 0 1 0-1.651h12.718zM22.026 39.174h12.718a.826.826 0 1 1 0 1.652H22.026a.826.826 0 0 1 0-1.652z"/></g></svg>\n\t\t\t\t\t</aside>\n\n\t\t\t\t\t<div class="wrap">\n\t\t\t\t\t\t<h3>Booking receipt</h3>\n\t\t\t\t\t\t<p class="paid">You paid '
            .concat(b, " on ")
            .concat(
              _this.conversationData.formatDate(a.paymentInfo.paidOn),
              "</p>\n\t\t\t\t\t\t"
            )
            .concat(c, '\n\t\t\t\t\t\t<p class="action-message">')
            .concat(
              a.paymentInfo.restOfPaymentText,
              "</p>\n\t\t\t\t\t</div>\n\t\t\t\t</section>\n\t\t\t"
            )
            .trim();
        return d;
      },
      sectionOrganizerContactDetails: function sectionOrganizerContactDetails(
        a
      ) {
        var b = a.organizer.phone.length
            ? "<p><span>Phone:</span> ".concat(a.organizer.phone, "</p>")
            : "",
          c =
            '\n\t\t\t\t<section class="organizer-details section-with-icon">\n\t\t\t\t\t<aside>\n\t\t\t\t\t\t<svg xmlns="http://www.w3.org/2000/svg" width="51" height="60" viewBox="0 0 51 60"><g fill="none" fill-rule="evenodd"><path fill="#F7F7F7" d="M18.817.115c10.367-1.144 27.74 6.133 31.569 25.92 1.96 10.058-.748 23.386-14.477 30.009C-9.39 77.794-7.99 2.895 18.817.115z"/><rect width="28.7" height="38.7" x="15.65" y="9.65" stroke="#969AA1" stroke-width="1.3" rx="4"/><rect width="15" height="1.65" x="23" y="36" fill="#969AA1" rx=".825"/><rect width="10" height="1.65" x="23" y="41" fill="#969AA1" rx=".825"/><path fill="#969AA1" d="M11.825 38H16v1.65h-4.175a.825.825 0 0 1 0-1.65zM11.825 28H16v1.65h-4.175a.825.825 0 0 1 0-1.65zM12 18h4v2h-4a1 1 0 0 1 0-2z"/><g stroke="#969AA1" stroke-width="1.3" transform="translate(23 15)"><circle cx="7.5" cy="3.5" r="3.5"/><path d="M.65 16.35h13.7V15A5.35 5.35 0 0 0 9 9.65H6A5.35 5.35 0 0 0 .65 15v1.35z"/></g></g></svg>\n\t\t\t\t\t</aside>\n\n\t\t\t\t\t<div class="wrap">\n\t\t\t\t\t\t<h3>Organizer contact details</h3>\n\t\t\t\t\t\t<address>\n\t\t\t\t\t\t\t<p><span>Email:</span> <a href="mailto:'
              .concat(a.organizer.email, '">')
              .concat(a.organizer.email, "</a></p>\n\t\t\t\t\t\t\t")
              .concat(
                b,
                "\n\t\t\t\t\t\t</address>\n\t\t\t\t\t</div>\n\t\t\t\t</section>\n\t\t\t"
              )
              .trim();
        return c;
      },
      createMessageThread: function createMessageThread(a) {
        for (var b = "", c = 0; c < a.messages.length; c++) {
          var d = "",
            e = "";
          (d =
            "organizer" == a.messages[c].senderType
              ? a.organizer.name
              : "us" == a.messages[c].senderType
              ? a.siteName
              : "you"),
            "" != a.messages[c].snippet &&
              (e =
                '\n\t\t\t\t\t\t<p class="system-message-snippet">\n\t\t\t\t\t\t\t'
                  .concat(
                    a.messages[c].snippet.replace(/(\r\n|\n|\r)/g, "<br />"),
                    "\n\t\t\t\t\t"
                  )
                  .trim());
          var f = '\n\t\t\t\t\t<div class="conversation-message from--'
            .concat(
              a.messages[c].senderType,
              '">\n\t\t\t\t\t\t<header>\n\t\t\t\t\t\t\t<h4>'
            )
            .concat(d, "</h4>\n\t\t\t\t\t\t\t<time datetime>")
            .concat(
              a.messages[c].timeAgo,
              '</time>\n\t\t\t\t\t\t</header>\n\n\t\t\t\t\t\t<div class="message-body">\n\t\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\t\t'
            )
            .concat(
              a.messages[c].content.replace(/(\r\n|\n|\r)/g, "<br />"),
              "\n\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t"
            )
            .concat(e, "\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t")
            .trim();
          b += f;
        }
        return b;
      },
      sectionConversationMessages: function sectionConversationMessages(a) {
        var b = _this.conversationData.createMessageThread(a),
          c = '\n\t\t\t\t<section class="conversation-thread">\n\t\t\t\t\t<h3>'
            .concat(translations.inbox.messages, "</h3>\n\t\t\t\t\t")
            .concat(b, "\n\t\t\t\t</section>\n\t\t\t")
            .trim();
        return c;
      },
      createOtherConversations: function createOtherConversations(a) {
        for (
          var b,
            c = "",
            d = {
              open: translations.inbox.statusLabel.open,
              available: translations.inbox.statusLabel.available,
              booked: translations.inbox.statusLabel.booked,
              cancelled: translations.inbox.statusLabel.cancelled,
              awaiting_confirmation:
                translations.inbox.statusLabel.awaitingConfirmation,
              not_available: translations.inbox.statusLabel.notAvailable,
              duplicate: translations.inbox.statusLabel.duplicate,
            },
            e = 0;
          e < a.messagesForDuplicate.length;
          e++
        )
          (b =
            '\n\t\t\t\t\t<div class="messages">\n\t\t\t\t\t\t<div\n\t\t\t\t\t\t\tdata-iid=\''
              .concat(
                a.messagesForDuplicate[e].inquiryID,
                "'\n\t\t\t\t\t\t\tclass='message message--"
              )
              .concat(
                a.messagesForDuplicate[e].displayStatus,
                ' navigate--to--other--conversation\'\n\t\t\t\t\t\t>\n\t\t\t\t\t\t\t<div class="image" style="background-image: url('
              )
              .concat(
                a.messagesForDuplicate[e].photoURL,
                ')">&nbsp;</div>\n\t\t\t\t\t\t\t<div class="information">\n\t\t\t\t\t\t\t\t<span class="status status--'
              )
              .concat(a.messagesForDuplicate[e].displayStatus, '">')
              .concat(
                null == d[a.messagesForDuplicate[e].displayStatus]
                  ? ""
                  : "".concat(
                      d[a.messagesForDuplicate[e].displayStatus.toLowerCase()]
                    ),
                '</span>\n\t\t\t\t\t\t\t\t<div class="meta">\n\t\t\t\t\t\t\t\t\t<time datetime>'
              )
              .concat(
                a.messagesForDuplicate[e].lastReceivedMessage.timeAgo,
                '</time>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<p class="title">'
              )
              .concat(
                a.messagesForDuplicate[e].listingTitle,
                '</p>\n\t\t\t\t\t\t\t\t<p class="excerpt">'
              )
              .concat(
                a.messagesForDuplicate[e].lastReceivedMessage.content,
                "</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t"
              )
              .trim()),
            (c += b);
        return c;
      },
      sectionConversationsWithOrganizer:
        function sectionConversationsWithOrganizer(a) {
          var b = _this.conversationData.createOtherConversations(a),
            c =
              '\n\t\t\t\t<section class="other-conversations">\n\t\t\t\t\t<h3>'
                .concat(translations.inbox.other, "</h3>\n\t\t\t\t\t")
                .concat(b, "\n\t\t\t\t</section>\n\t\t\t")
                .trim();
          return c;
        },
      sectionSimilarRetreats: function sectionSimilarRetreats(a) {
        var b =
          '\n\t\t\t\t<div class="explore-similar">\n\t\t\t\t\t<a\n\t\t\t\t\t\thref=\''
            .concat(
              a.baseUrl,
              "'\n\t\t\t\t\t\tclass='bttn bttn--regular'\n\t\t\t\t\t>\n\t\t\t\t\t\t"
            )
            .concat(
              translations.inbox.explore,
              "\n\t\t\t\t\t</a>\n\t\t\t\t</div>\n\t\t\t"
            );
        return b;
      },
      sectionReply: function sectionReply() {
        '\n\t\t\t\t<form\n\t\t\t\t\tclass="conversation--reply"\n\t\t\t\t\taccept-charset="UTF-8"\n\t\t\t\t>\n\t\t\t\t\t<label>Write a reply:</label>\n\n\t\t\t\t\t<div class="form-line">\n\t\t\t\t\t\t<input class="conversation--reply--input" type="text" placeholder="Write something..." />\n\n\t\t\t\t\t\t<button\n\t\t\t\t\t\t\tclass="bttn bttn--regular conversation--reply--submit has-loader has-loader--light"\n\t\t\t\t\t\t>\n\t\t\t\t\t\t\t<span class="default-value">Send</span>\n\t\t\t\t\t\t\t<span class="loader">\n\t\t\t\t\t\t\t<div class="spinner">\n\t\t\t\t\t\t\t\t<svg width="18" height="16" viewbox="0 0 18 16" xmlns="http://www.w3.org/2000/svg" class="bounce bounce1">\n\t\t\t\t\t\t\t\t\t<path d="M.035 5.645c-.344 3.11 1.84 8.322 7.776 9.47 3.017.589 7.015-.223 9.002-4.342C23.338-2.817.87-2.397.035 5.645z" fill="#02BF9B" fill-rule="nonzero">\n\t\t\t\t\t\t\t\t\t</path>\n\t\t\t\t\t\t\t\t</svg>\n\n\t\t\t\t\t\t\t\t<svg width="18" height="17" viewbox="0 0 18 16" xmlns="http://www.w3.org/2000/svg" class="bounce bounce2">\n\t\t\t\t\t\t\t\t\t<path d="M15.643 2.777A8.172 8.172 0 0 0 12.707.703C7.61-1.48 1.765 1.736.333 6.025c-.035.105-.067.21-.096.316-.561 2.033-.135 4.253 1.372 6.066 1.802 2.168 4.765 3.471 7.601 3.613 3.924.196 7.457-1.079 8.504-4.38.79-2.49-.105-6.65-2.071-8.863z" fill="#02A5E8" fill-rule="nonzero">\n\t\t\t\t\t\t\t\t\t</path>\n\t\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t\t\t<svg width="18" height="18" viewbox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" class="bounce bounce3">\n\t\t\t\t\t\t\t\t\t<path d="M10.215.437C5.117.437-2.205 5.263.634 11.088c2.839 5.825 12.92 8.488 15.732 2.996C19.112 8.718 19.204.437 10.215.437z" fill="#FF9B35" fill-rule="nonzero">\n\t\t\t\t\t\t\t\t\t</path>\n\t\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t</button>\n\t\t\t\t\t</div>\n\t\t\t\t</form>\n\t\t\t'.trim();
        return '<form\n\t\t\t\t\tclass="conversation--reply"\n\t\t\t\t\taccept-charset="UTF-8"\n\t\t\t\t>\n\t\t\t\t\t<label>Write a reply:</label>\n\n\t\t\t\t\t<div class="form-line">\n\t\t\t\t\t\t<input class="conversation--reply--input" type="text" placeholder="Write something..." />\n\n\t\t\t\t\t\t<button\n\t\t\t\t\t\t\tclass="bttn bttn--regular conversation--reply--submit has-loader has-loader--light"\n\t\t\t\t\t\t>\n\t\t\t\t\t\t\t<span class="default-value">Send</span>\n\t\t\t\t\t\t\t<span class="loader">\n\t\t\t\t\t\t\t<div class="spinner">\n\t\t\t\t\t\t\t\t<svg width="18" height="16" viewbox="0 0 18 16" xmlns="http://www.w3.org/2000/svg" class="bounce bounce1">\n\t\t\t\t\t\t\t\t\t<path d="M.035 5.645c-.344 3.11 1.84 8.322 7.776 9.47 3.017.589 7.015-.223 9.002-4.342C23.338-2.817.87-2.397.035 5.645z" fill="#02BF9B" fill-rule="nonzero">\n\t\t\t\t\t\t\t\t\t</path>\n\t\t\t\t\t\t\t\t</svg>\n\n\t\t\t\t\t\t\t\t<svg width="18" height="17" viewbox="0 0 18 16" xmlns="http://www.w3.org/2000/svg" class="bounce bounce2">\n\t\t\t\t\t\t\t\t\t<path d="M15.643 2.777A8.172 8.172 0 0 0 12.707.703C7.61-1.48 1.765 1.736.333 6.025c-.035.105-.067.21-.096.316-.561 2.033-.135 4.253 1.372 6.066 1.802 2.168 4.765 3.471 7.601 3.613 3.924.196 7.457-1.079 8.504-4.38.79-2.49-.105-6.65-2.071-8.863z" fill="#02A5E8" fill-rule="nonzero">\n\t\t\t\t\t\t\t\t\t</path>\n\t\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t\t\t<svg width="18" height="18" viewbox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" class="bounce bounce3">\n\t\t\t\t\t\t\t\t\t<path d="M10.215.437C5.117.437-2.205 5.263.634 11.088c2.839 5.825 12.92 8.488 15.732 2.996C19.112 8.718 19.204.437 10.215.437z" fill="#FF9B35" fill-rule="nonzero">\n\t\t\t\t\t\t\t\t\t</path>\n\t\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t</button>\n\t\t\t\t\t</div>\n\t\t\t\t</form>';
      },
      createMessage: function createMessage(a) {
        var b =
          '\n\t\t\t\t<div class="conversation-message from--customer">\n\t\t\t\t\t<header>\n\t\t\t\t\t\t<h4>You</h4>\n\t\t\t\t\t\t<time datetime>blabla</time>\n\t\t\t\t\t</header>\n\n\t\t\t\t\t<div class="message-body">\n\t\t\t\t\t\t<p>'
            .concat(
              a.replace(/(\r\n|\n|\r)/g, "<br />"),
              "</p>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t"
            )
            .trim();
        return b;
      },
      formatDate: function formatDate(b) {
        var c = b.split(/[^0-9]/),
          a = new Date(c[0], c[1] - 1, c[2], c[3], c[4], c[5]),
          d = a.getDate(),
          e = a.toLocaleString(g, { month: "long" }),
          f = a.getFullYear(),
          g = document.documentElement.lang,
          h = "".concat(d, " ").concat(e, ", ").concat(f, " ");
        return h;
      },
      formatCurrency: function formatCurrency(a, b) {
        return (a / Math.pow(10, b)).toFixed(b);
      },
    };
  })();
var countdown = (function () {
  return {
    intervals: [],
    timer: function timer(a, b) {
      var c = new Date(a);
      countdown.intervals[0] = setInterval(function () {
        var a = Math.floor,
          d = new Date(),
          e = c - d,
          f = a(e / 3600000),
          g = a((e % 3600000) / 60000),
          h = a((e % 60000) / 1000);
        (document.getElementById(b).innerHTML = f + " hrs "),
          (document.getElementById(b).innerHTML += g + " mins "),
          (document.getElementById(b).innerHTML += h + " secs");
      }, 1e3);
    },
    destroy: function destroy() {
      clearInterval(countdown.intervals[0]);
    },
  };
})();
(function () {
  function a() {
    z.classList.contains("inboxes--small")
      ? z.classList.remove("inboxes--small")
      : z.classList.add("inboxes--small");
  }
  function b(a) {
    if (
      ((a = a.replace("#", "")),
      ("" == a ||
        -1 ==
          [
            "all-messages",
            "requires-action",
            "unread",
            "pending",
            "booked",
          ].indexOf(a)) &&
        (a = "all-messages"),
      "all-messages" == a)
    )
      x.forEach(function (a) {
        a.style.display = "flex";
      });
    else
      for (var b = 0; b < x.length; b++)
        (x[b].style.display = "none"),
          x[b].classList.contains("message--" + a) &&
            (x[b].style.display = "flex");
    d(a);
  }
  function c(a) {
    var b = window.location.href,
      c = b.indexOf("group");
    0 < c && (b = b.substring(0, c - 1));
    var d = 0 < b.indexOf("?") ? "&" : "?";
    window.location = b + d + "group=" + a.target.value;
  }
  function d(a) {
    var b = document.querySelectorAll(".inbox--inboxes li a"),
      c = [].slice.call(b);
    c.forEach(function (b) {
      b.classList.remove("selected"),
        b.classList.contains("messages--" + a) && b.classList.add("selected");
    }),
      g();
  }
  function e() {
    for (var a = 0; a < x.length; a++) x[a].classList.remove("selected");
  }
  function f() {
    (B.style.width = v.clientWidth - 1 + "px"),
      B.classList.contains("active")
        ? (B.classList.remove("active"), u.classList.remove("has-filters-open"))
        : (u.classList.add("has-filters-open"), B.classList.add("active"));
  }
  function g() {
    B.classList.remove("active"), u.classList.remove("has-filters-open");
  }
  function h() {
    A.classList.remove("is-loaded"), y.classList.remove("active"), e();
  }
  function i(a) {
    var b = getQueryStringParameterByName(window.location.href, "message");
    if (b === a.dataset.iid) return !1;
    var c = { id: a.dataset.iid };
    k(A),
      y.classList.add("active"),
      history.pushState(c, "", "?message=".concat(c.id)),
      m(c);
  }
  function j(a) {
    e();
    var b = document.querySelector('[data-iid="'.concat(a, '"]'));
    b && (b.classList.add("selecteds"), k(A), m({ id: a }));
  }
  function k(a) {
    a.classList.remove("is-loaded"), a.classList.add("is-loading");
  }
  function l(a) {
    a.classList.remove("is-loading"), a.classList.add("is-loaded");
  }

  function n(a) {
    var b = document.querySelector(".message-conversation .message-content"),
      c = document.querySelector(".conversation--title"),
      d = "";
    (c.innerHTML = a.listing.title),
      countdown.destroy(),
      (d += conversationData.sectionStatus(a)),
      (d += conversationData.sectionTitle(a)),
      (d += conversationData.sectionPackage(a)),
      "" != a.bookItUrl && (d += conversationData.sectionActionReadyToBook(a)),
      "" != a.saveCardUrl &&
        (d += conversationData.sectionActionRequestToPay(a)),
      "awaiting_confirmation" == a.displayStatus &&
        (d += conversationData.sectionActionPaymentPending(a)),
      "" != a.paymentInfo.paidByCustomer &&
        (d += conversationData.sectionBookingReceipt(a)),
      "booked" == a.displayStatus &&
        (d += conversationData.sectionOrganizerContactDetails(a)),
      (d += conversationData.sectionConversationMessages(a)),
      "duplicate" == a.displayStatus &&
        a.messagesForDuplicate.length &&
        (d += conversationData.sectionConversationsWithOrganizer(a)),
      "not_available" == a.displayStatus &&
        (d += conversationData.sectionSimilarRetreats(a)),
      "duplicate" != a.displayStatus &&
        (d += conversationData.sectionToConversation(a)),
      (b.innerHTML = d),
      o(a.listing.title),
      p(a.inquiryID);
  }
  function o(a) {
    document.title = a;
  }
  function p(a) {
    var b = document.querySelector('[data-iid="'.concat(a, '"]'));
    b.classList.contains("unread") &&
      (b.classList.remove("unread"),
      (b.querySelector(".unread").style.display = "none"));
  }
  function q() {
    var a = document.querySelector(".conversation--title");
    (a.innerHTML = ""),
      y.classList.add("active"),
      u.classList.add("has-conversation-open");
  }
  function r() {
    y.classList.remove("active"),
      u.classList.remove("has-conversation-open"),
      e(),
      history.pushState(
        "",
        "",
        removeQueryStringParameter(window.location.href, "message")
      );
  }
  function s(a) {
    a.preventDefault();
    var b = a.target,
      c = document.querySelector(".conversation--reply").action,
      d = document.querySelector(".conversation--reply--input").value;
    k(b), t(d), l(b);
  }
  function t(a) {
    var b = conversationData.createMessage(a),
      c = document.querySelector(".conversation-thread"),
      d = c.querySelector(".conversation-message");
    console.log(c), d.insertAdjacentHTML("beforebegin", b);
  }
  var u = document.querySelector(".inbox"),
    v = document.querySelector(".threads"),
    w = document.querySelectorAll(".message"),
    x = [].slice.call(w),
    y = document.querySelector(".conversation"),
    z = document.querySelector(".inbox--body"),
    A = document.querySelector(".inbox--conversation"),
    B = document.querySelector(".inboxes");
  document.addEventListener("DOMContentLoaded", function () {
    var a = getQueryStringParameterByName(window.location.href, "message");
    a && "undefined" != a ? j(a) : h(), b(window.location.hash);
  }),
    window.addEventListener("popstate", function (a) {
      var c = getQueryStringParameterByName(window.location.href, "message");
      a.state && a.state.id ? j(a.state.id) : c || h(), b(window.location.hash);
    }),
    v.addEventListener("scroll", function (a) {
      0 < a.target.scrollTop
        ? document.body.classList.add("is-scrolling-threads")
        : document.body.classList.remove("is-scrolling-threads");
    }),
    y.addEventListener("scroll", function (a) {
      0 < a.target.scrollTop
        ? document.body.classList.add("is-scrolling-conversations")
        : document.body.classList.remove("is-scrolling-conversations");
    }),
    document.addEventListener("click", function (a) {
      var b = null,
        c = null,
        d = null;
      (b = a.target.classList.contains("message")
        ? a.target
        : validation.findAncestor(a.target, ".message")),
        b &&
          (e(),
          (c = b.dataset.iid),
          (d = document.querySelector(
            '.inbox--threads .message[data-iid="' + c + '"]'
          )),
          b.classList.add("selected"),
          "undefined" != d && d.classList.add("selected"),
          i(b));
    }),
    document.addEventListener("click", function (b) {
      b.target.matches(".toggle-inboxes") && f(),
        b.target.matches(".close-message") && r(),
        b.target.matches(".toggle-inboxes-display") && a();
    }),
    document.addEventListener("change", function (a) {
      a.target.matches(".grouping-select") && c(a);
    });
  document.addEventListener("click", function (a) {
    a.target.classList.contains("conversation--reply--submit") && s(a);
  });
})();
