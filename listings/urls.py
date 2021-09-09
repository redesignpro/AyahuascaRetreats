from django.contrib import admin
from django.urls import path
from listings.views import *
from listings import views

app_name = 'listings'

urlpatterns = [
    path('', HomeView.as_view(), name='index'),
    path('<int:pk>/<slug:slug>', ListingDetailView.as_view(), name='listing_detail'),
    path('<int:pk>/<slug:slug>/gallery', GalleryView.as_view(), name='gallery_detail'),
    path('partners/profiles/<int:pk>', ProfileView.as_view(), name='profile-detail'),
    path('listing/all', MyListingsView.as_view(), name='my_listings'),
    path('listing/update/title-info/<int:pk>', UpdateTitleIntroView.as_view(), name='title-update'),
    path('listing/update/location-info/<int:pk>', UpdateLocationView.as_view(), name='location-update'),
    path('listing/update/arrival-info/<int:pk>', UpdateArrivalView.as_view(), name='arrival-update'),
    path('listing/update/food-info/<int:pk>', UpdateFoodView.as_view(), name='food-update'),
    path('listing/update/require-info/<int:pk>', UpdateUserRequireView.as_view(), name='require-update'),
    path('listing/update/program-info/<int:pk>', UpdateProgramView.as_view(), name='program-update'),
    path('listing/update/pricing-info/<int:pk>', UpdatePricingView.as_view(), name='pricing-update'),
    path('listing/update/extra-info/<int:pk>', UpdateExtraView.as_view(), name='extra-update'),
    path('listing/update/photo-info/<int:pk>', UpdatePhotoView.as_view(), name='photo-update'),
    path('listing/update/booking-conditions-info/<int:pk>', UpdateBookingConditionsView.as_view(), name='booking-conditions-update'),
    path('listing/update/ranking-info/<int:pk>', UpdateRankingView.as_view(), name='ranking-update'),
    path('listing/update/package-info/<int:pk>', PackagesView.as_view(), name='packages-list'),
    path("packages/add-year-round/<int:listing>", add_year_round, name='add_year_round'),
    path("packages/remove-year-round/<int:listing>", remove_year_round, name='remove_year_round'),
    path('listing/update/package-info/availability/<int:pk>/<int:listing>', EditCalendarView.as_view(), name='edit-calendar'),
    path('add-price/<int:pk>/<int:listing>', add_price, name='add-price'),
    path('add-price-yearly/<int:pk>/<int:listing>', add_price_yearly, name='add-price-yearly'),
    path('add-package/<int:pk>', add_package, name='add-package'),
    path('delete-package/<int:pk>/<int:listing>', delete_package, name='delete-package'),
    path('delete-price/<int:req>/<int:pk>/<int:listing>', delete_price, name='delete-price'),
    path('delete-listing/<int:pk>', delete_listing, name='remove-listing'),
    path('file-upload/<int:pk>', file_upload_view, name='file-upload'),
    path('file-delete/<int:pk>/<int:listing>', file_delete_view, name='file-delete'),
    path('delete-accommodation/<int:pk>', delete_accommodation_view, name='delete-accommodation'),
    path('listing/accommodations', AccommodationListView.as_view(), name='accommodation-list'),
    path('listing/accommodations/add', AccommodationAddView.as_view(), name='add-accommodation-view'),
    path('add-accommodation/<int:pk>', add_accommodation_handler, name='add-accommodation'),
    path('listing/accommodations/edit/<int:pk>', UpdateAccommodationView.as_view(), name='edit-accommodation'),
    path('listing/accommodations/photos/edit/<int:pk>', AccommodationImagesView.as_view(), name='edit-accommodation-photos'),
    path('acc-image-delete/<int:pk>', delete_accommodation_image_view, name='delete-accommodation-image'),
    path('acc-image-upload/<int:pk>', upload_accommodation_image_view, name='upload-accommodation-image'),
    path('listing/accommodations/facilities/edit/<int:pk>', UpdateAccommodationFacilitiesView.as_view(), name='acc-facilities-update'),
    path('listing/accommodations/description/edit/<int:pk>', UpdateAccommodationDescriptionView.as_view(), name='acc-description-update'),
    path('listing/accommodations/rooms/type/edit/<int:pk>', UpdateRoomTypeView.as_view(), name='room-type-update'),
    path('listing/accommodations/rooms/photos/edit/<int:pk>',RoomImagesView.as_view(), name='room-photos-update'),
    path('listing/accommodations/rooms/photos/delete/<int:pk>', delete_room_image_view, name='delete-room-image'),
    path('listing/accommodations/rooms/photos/add/<int:pk>', upload_room_image_view, name='upload-room-image'),
    path('listing/accommodations/rooms/facilities/edit/<int:pk>', UpdateRoomFacilitiesView.as_view(), name='room-facilities-update'),
    path('listing/accommodations/rooms/description/edit/<int:pk>', UpdateRoomDescriptionView.as_view(), name='room-description-update'),
    path('listing/accommodations/rooms/bed-configuration/edit/<int:pk>', RoomBedConfigView.as_view(), name='room-bed-config-update'),
    path('listing/accommodations/rooms/add/<int:pk>', AddRoomView.as_view(), name='add-room-view'),
    path('update-bed-config/<int:pk>', update_room_config, name='update-config'),
    path('remove-bed-config/<int:pk>/<int:room_id>', remove_room_config, name='remove-config'),
    path('add-room/<int:pk>', add_room, name='add-room'),
    path('delete-room/<int:pk>', delete_room, name='delete-room'),
    path('listing/instructors/all', InstructorListview.as_view(), name='instructor-list'),
    path('listing/instructors/add', AddInstructorView.as_view(), name='add-instructor'),
    path('listing/instructors/edit/<int:pk>', UpdateInstructorView.as_view(), name='edit-instructor'),
    path('listing/instructors/edit/skills/<int:pk>', InstructorSkillsView.as_view(), name='edit-instructor-skills'),
    path('listing/instructors/delete/<int:pk>', delete_instructor, name='delete-instructor'),
    path('add-instructor-skill/<int:pk>', add_skill_handler, name='add-skill'),
    path('remove-instructor-skill/<int:pk>/<int:skill_id>', remove_skill_handler, name='remove-skill'),
    path('listing/instructors/add/contact', AddContactView.as_view(), name='add-contact'),
    path('add-contact/<int:pk>', add_contact, name='add-contact-handler'),
    path('delete-contact/<int:pk>', delete_contact, name='delete-contact-handler'),
    path('listing/videos', VideoView.as_view(), name='update-videos'),
    path('add-video/<int:pk>', add_video, name='add-video'),
    path('delete-video/<int:pk>/<int:user_p>', delete_video, name='delete-video'),
    path('listing/videos/update/<int:pk>', UpdateVideoView.as_view(), name='update-video'),
    path('partners/profiles/edit/myprofile/<int:pk>', UpdateProfilePageView.as_view(), name='myprofile-update'),
    path('partners/profiles/edit/businessinfo/<int:pk>', UpdateBusinessInfoView.as_view(), name='businessinfo-update'),
    path('partners/profiles/edit/personalinfo/<int:pk>', UpdatePersonalInfoView.as_view(), name='personalinfo-update'),
    path('partners/profiles/edit/paymentinfo/<int:pk>', UpdatePaymentInfoView.as_view(), name='paymentinfo-update'),
    path('customer/profile/<int:pk>', CustomerProfile.as_view(), name='customer_profile'),
    path('customer/profile/change-password/<int:pk>', PasswordChange.as_view(), name='customer_pass_change'),
    path('partners/change-password/<int:pk>', HostPasswordChange.as_view(), name='host_pass_change'),
    path('switch-business/<int:pk>', switch_business, name='switch-business'),
    path('business-sign-up/', BusinessSignUp.as_view(), name='business-sign-up'),
    path('customer-sign-up/', CustomerSignup.as_view(), name='customer_sign_up'),
    path('core-log-in/', CoreLogin.as_view(), name='core_log_in'),
    path('test-view/', TestingView.as_view(), name='test_view'),
    path('inquiry-sign-up/', InquirySignup.as_view(), name='inquiry_sign_up'),
    path('customer/messages/<int:customer_pk>', MyMessagesView.as_view(), name='my_messages'),
    path('customer/messages/chat/<int:pk>', MyConversationView.as_view(), name='my_conversation'),
    path('partners/inquiries/<int:host_pk>', MyInquiriesView.as_view(), name='my_inquiries'),
    path('partners/inquiries/archive/<int:pk>', MyInquiryArchiveView.as_view(), name='inquiry_archive'),
    path('partners/bookings/<int:host_pk>', MyBookingsView.as_view(), name='my_bookings'),
    path('partners/payments/<int:host_pk>', MyPaymentsView.as_view(), name='my_payments'),
    path('partners/inquiries/<int:pk>/details', InquiryDetailView.as_view(), name='inquiry_detail'),
    path('approve-inquiry/<int:pk>', approve_inquiry, name='approve_inquiry'),
    path('decline-inquiry/<int:pk>', decline_inquiry, name='decline_inquiry'),
    path('customer/trips/<int:customer_pk>', MyTripsView.as_view(), name='my_trips'),
    path('partners/invoices', MyInvoicesView.as_view(), name='my_invoices'),
    path('partners/pdfs/<int:inquiry_id>', GeneratePdf.as_view(), name='render_pdf'),
    path('customer/trips/payment/<int:pk>', PaymentView.as_view(), name='payment'),
    path('customer/trips/payment/confirmation/<int:inquiry_pk>', confirmationview, name='confirmation'),
    path('customer/trips/payment/success/<int:pk>', PaymentSuccessView.as_view(), name='payment_success'),
    path('customers/trips/review/<int:pk>', LeaveReview.as_view(), name='leave_review'),
    path('partners/reviews', MyReviews.as_view(), name='my_reviews'),
    path('partners/reviews/<int:pk>', RespondReview.as_view(), name='respond_review'),
    path('customers/favorites', MyFavorites.as_view(), name='my_favorites'),
    path('customers/favorites/add/<int:id>/', favorite_add, name='add_favorite'),
    path('customers/favorites/remove/<int:id>/', favorite_remove, name='remove_favorite'),
    path('customers/favorites/compare', MyCompareView.as_view(), name='my_compares'),
    path('book-now/<int:listing_id>', book_now, name='book_now'),
    path('owner/dashboard', DashboardView.as_view(), name='dashboard'),
    path('owner/inquiries', DashboardInquiriesView.as_view(), name='dashboard-inquiries'),
    path('owner/listings', DashboardListingView.as_view(), name='dashboard-listings'),
    path('owner/reviews', DashboardReviewsView.as_view(), name='dashboard-reviews'),
    path('owner/videos', DashboardVideosView.as_view(), name='dashboard-videos'),
    path('owner/staff', DashboardStaffView.as_view(), name='dashboard-staff'),
    path('owner/flags', DashboardFlagsView.as_view(), name='dashboard-flags'),
    path('owner/approve-listing/<int:pk>', approve_listing, name='approve-listing'),
    path('owner/view-listing/<int:pk>', view_listing, name='view-listing'),
    path('owner/view-review/<int:pk>', view_review, name='view-review'),
    path('owner/approve-review/<int:pk>', approve_review, name='approve-review'),
    path('owner/approve-video/<int:pk>', approve_video, name='approve-video'),
    path('owner/approve-staff/<int:pk>', approve_staff, name='approve-staff'),
    path('owner/approve-flag/<int:pk>', approve_flag, name='approve-flag'),
    path('add_instant_booking/<int:pk>', add_instant_booking, name='add_instant_booking'),
    path('remove_instant_booking/<int:pk>', remove_instant_booking, name='remove_instant_booking'),
    path('news/', BlogIndexView.as_view(), name='blog_index'),
    path('news/<slug:slug>/<int:pk>', BlogDetailView.as_view(), name='blog_detail'),
    path('blog/images', BlogImagesView.as_view(), name='blog-images'),
    path('blog/images/<int:pk>', delete_photo, name='delete-photo'),
]