from django.shortcuts import render, get_object_or_404
from django_countries.fields import country_to_text
from .models import *
from users.models import *
from django.views.generic import ListView, TemplateView, CreateView, DetailView, UpdateView, DeleteView, View
import airportsdata
from .forms import *
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse_lazy
from django.views.generic.edit import FormMixin
from django.core.paginator import Paginator
from django.db.models import Q
from datetime import datetime, timedelta, date
from allauth.account.forms import LoginForm, ChangePasswordForm
from users.forms import CoreLoginForm, CustomEmailSignupForm as SignupForm, InquirySignupForm
from users.forms import BusinessEmailSignupForm
from allauth.account.views import SignupView, LoginView, PasswordChangeView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic.edit import ProcessFormView
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Sum  
import dateutil.relativedelta
from django.utils import timezone
# Create your views here.
from listings.utils import render_to_pdf
import googlemaps
import pandas as pd



class GeneratePdf(View):
    def get(self, request, *args, **kwargs):
        inquiry = Inquiry.objects.get(pk=self.kwargs['inquiry_id'])
        data = {
             'inquiry': inquiry, 
        }
        pdf = render_to_pdf('pdf/pdf1.html', data)
        return HttpResponse(pdf, content_type='application/pdf')

class TestingView(TemplateView):
    template_name = 'profiles/testview.html'
    
class BusinessSignUp(SignupView):

    template_name = 'profiles/signup_profile.html'
    form_class = BusinessEmailSignupForm
    redirect_field_name = 'next'
    view_name = 'business_sign_up'

    def get_context_data(self, **kwargs):
        ret = super(BusinessSignUp, self).get_context_data(**kwargs)
        ret.update(self.kwargs)
        return ret

class CustomerSignup(SignupView):
    template_name = 'profiles/signup_profile.html'
    form_class = SignupForm
    redirect_field_name = 'next'
    view_name = 'customer_sign_up'

    def get_context_data(self, **kwargs):
        ret = super(CustomerSignup, self).get_context_data(**kwargs)
        ret.update(self.kwargs)
        return ret

class InquirySignup(SignupView):
    template_name = 'profiles/signup_profile.html'
    form_class = InquirySignupForm
    redirect_field_name = 'next'
    view_name = 'inquiry_sign_up'

    


    def get_context_data(self, **kwargs):
        ret = super(InquirySignup, self).get_context_data(**kwargs)
        ret.update(self.kwargs)
        return ret

class CoreLogin(LoginView):
    template_name = 'profiles/signup_profile.html'
    form_class = CoreLoginForm
    redirect_field_name = 'next'
    view_name = 'core_log_in'

    def get_context_data(self, **kwargs):
        ret = super(CoreLogin, self).get_context_data(**kwargs)
        ret.update(self.kwargs)
        return ret

class HostPasswordChange(LoginRequiredMixin, PasswordChangeView):
    template_name = 'profiles/password_change.html'
    form_class = CustomPasswordForm
    redirect_field_name = 'next'
    view_name = 'host_pass_change'
    
    success_url = reverse_lazy("listings:my_listings")

    def get_context_data(self, **kwargs):
        ret = super(HostPasswordChange, self).get_context_data(**kwargs)
        ret.update(self.kwargs)
        return ret

class PasswordChange(LoginRequiredMixin, PasswordChangeView):
    template_name = 'customers/password_change.html'
    form_class = CustomPasswordForm
    redirect_field_name = 'next'
    view_name = 'customer_pass_change'
    
    success_url = reverse_lazy("listings:index")

    def get_context_data(self, **kwargs):
        ret = super(PasswordChange, self).get_context_data(**kwargs)
        ret.update(self.kwargs)
        return ret

def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip

def get_reviews(listing):
    gmaps = googlemaps.Client(key='AIzaSyC_Rq25Tno5e0u8mZ11m-qI6E5hY-0f2-M')
    if listing.user_profile.place_id:
        place = gmaps.place(place_id = listing.user_profile.place_id)
    else:
        place_name = listing.user_profile.business_name
        places_results = gmaps.places(place_name)
        place_id = places_results['results'][0]['place_id']
        place = gmaps.place(place_id = place_id)

    place_reviews = place['result']['reviews']
    reviews = []
    for i in range(len(place_reviews)):
        content = place_reviews[i]['text']
        rating = place_reviews[i]['rating']
        name = place_reviews[i]['author_name']
        photo_url = place_reviews[i]['profile_photo_url']
        relative_time = place_reviews[i]['relative_time_description']
        latitude = place['result']['geometry']['location']['lat']
        longitude = place['result']['geometry']['location']['lng']
        url = place['result']['url']
        reviews.append(
            {
                "id": i,
                "info": {
                    'name': name,
                    'photo': photo_url,
                    'rating': rating,
                    'text': content ,
                    'date': relative_time,
                }
            }
        )

    return latitude, longitude, url, reviews

class HomeView(ListView):
    template_name = 'listings/index.html'
    context_object_name = 'listings'
    model = Listing
    paginate_by = 4

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        get_copy = self.request.GET.copy()
        if get_copy.get('page'):
            get_copy.pop('page')
        context['get_copy'] = get_copy
        qcheck_private = self.request.GET.get('private_offer')
        context['qcheck_private'] = qcheck_private
        qcheck_clean = self.request.GET.get('clean_and_safe')
        context['qcheck_clean'] = qcheck_clean
        qcheck_online = self.request.GET.get('online_offer')
        context['qcheck_online'] = qcheck_online
        context['qcheck_travel'] = self.request.GET.get('travel_experience')
        context['login_form'] = CoreLoginForm()
        context['signup_form'] = SignupForm()
        if self.request.user.is_authenticated:
            context['wish_list'] = Favorite.objects.filter(user_id=self.request.user).values_list('listing_id', flat=True)
        
        if not self.request.session.get('counted'):
            hits_obj = PageHits.objects.get(page='index')
            if hits_obj.date != date.today():
                hits_obj.date = date.today()
                hits_obj.hits = 1
            else:
                hit_count = hits_obj.hits
                hit_count += 1
                hits_obj.hits = hit_count
            hits_obj.save()
            self.request.session['counted'] = True
        
        return context




    def get_queryset(self, *args, **kwargs):
        qs = super(HomeView, self).get_queryset(*args, **kwargs)
        q1 = self.request.GET.get('search-txt')
        if q1:
            if 'ashtanga' in q1:
                q1_yoga = 1
            elif 'vinyasa' in q1:
                q1_yoga = 2
            elif 'hatha' in q1:
                q1_yoga = 3
            elif 'kundalini' in q1:
                q1_yoga = 4
            elif 'yin' in q1:
                q1_yoga = 5
            elif 'integral' in q1:
                q1_yoga = 6
            elif 'nidra' in q1:
                q1_yoga = 7
            else:
                q1_yoga = q1
        
        if q1:
            if 'ayurvedic' in q1:
                q1_food = 1
            elif 'fruitarian' in q1:
                q1_food = 2
            elif 'gluten' in q1:
                q1_food = 3
            elif 'halal' in q1:
                q1_food = 4
            elif 'lacto' in q1:
                q1_food = 5
            elif 'lactose' in q1:
                q1_food = 6
            elif 'naturopathic' in q1:
                q1_food = 7
            elif 'organic' in q1:
                q1_food = 8
            elif 'paleo' in q1:
                q1_food = 10
            elif 'pescatarian' in q1:
                q1_food = 11
            elif 'raw' in q1:
                q1_food = 12
            elif 'seafood' in q1:
                q1_food = 14
            elif 'vegan' in q1:
                q1_food = 15
            elif 'vegetarian' in q1:
                q1_food = 16
            elif 'whole food' in q1:
                q1_food = 17
            elif 'yogic' in q1:
                q1_food = 18
            else:
                q1_food = q1
        
        if q1:
            if 'alco' in q1:
                q1_drink = 1
            elif 'coffee' in q1:
                q1_drink = 2
            elif 'detox' in q1:
                q1_drink = 3
            elif 'soda' in q1:
                q1_drink = 4
            elif 'tea' in q1:
                q1_drink = 5
            elif 'water' in q1:
                q1_drink = 6
            else:
                q1_drink = q1

        if q1:
            if 'beginner' in q1:
                q1_skill = 1
            elif 'amateur' in q1:
                q1_skill = 1
            elif 'intermediate' in q1:
                q1_skill = 2
            elif 'advanced' in q1:
                q1_skill = 3
            else:
                q1_skill = q1

        if q1:
            if 'budget' in q1:
                q1_cat = 1
            elif 'luxury' in q1:
                q1_cat = 2
            elif 'inclusive' in q1:
                q1_cat = 3
            else:
                q1_cat = q1

        if q1:
            return Listing.objects.filter(
                Q(title__icontains=q1) |
                Q(tagline__icontains=q1) |
                Q(header__icontains=q1) |
                Q(highlights__icontains=q1) |
                Q(introduction__icontains=q1) |
                Q(health_hygiene__icontains=q1) |
                Q(country__icontains=q1) |
                Q(yoga_style__icontains=q1_yoga) |
                Q(foods__icontains=q1_food) |
                Q(drinks__icontains=q1_drink) |
                Q(skill_level__icontains=q1_skill) |
                Q(country_name__icontains=q1) |
                Q(address__icontains=q1) |
                Q(category__icontains=q1_cat)
            ).filter(is_verified=True).order_by('-id')



        qs = qs.filter(is_verified=True).order_by('id')
        return qs

class ListingDetailViewBACKUP(DetailView):
    template_name = 'listings/listing-detail.html'
    context_object_name = 'listing'
    model = Listing
    # form_class = InquirySignupForm

    # def get_success_url(self):
    #     return reverse('listings:index')
    
    # def post(self, request, *args, **kwargs):
    #     self.object = self.get_object()
    #     form = self.get_form()
    #     if form.is_valid():
    #         return self.form_valid(form)
    #     else:
    #         return self.form_invalid(form)
    
    # def form_valid(self, form):
    #     form.save(self.request)
    #     return super(ListingDetailView, self).form_valid(form)

    def get_context_data(self, **kwargs):
        context = super(ListingDetailView, self).get_context_data(**kwargs)
        self.listing = get_object_or_404(Listing, pk=self.kwargs['pk'])
        context['login_form'] = CoreLoginForm()
        context['signup_form'] = SignupForm()
        context['images'] = ListingImage.objects.filter(listing_id=self.listing.id)
        context['instructors'] = self.listing.instructors.all()
        context['videos'] = Videos.objects.filter(Q(listings__id=self.listing.id) & Q(approved=True))
        # context['instructors'] = Staff.objects.filter(listings__id=self.listing.id).filter(is_instructor=True)
        airports = airportsdata.load('IATA')
        styles = self.listing.get_yoga_style_display()
        styles = styles.split(',')
        context['yoga_styles'] = styles
        airport_code = self.listing.airport_code
        if airport_code in airports:
            context['airport'] = airports[airport_code].get('name')
        
        start = datetime.today().date() # changed import datetime to from datetime for these lines
        context['today'] = start + timedelta(days=1)
        year = timedelta(days=365)
        end = datetime.now().date() + year
        # dates = PackagePrices.objects.filter(Q(package__listing=self.listing) & Q(is_available=True) & Q(date__gte=start)).values_list('date', flat=True)
        dates = CustomPriceRequest.objects.filter(Q(package__listing=self.listing) & Q(is_available=True) & Q(start_date__gte=start)).values_list('start_date', flat=True)
        unavailable = []
        while start < end:
            if start in dates:
                start = start + timedelta(days=1)
            else:
                unavailable.append(start)
                start = start + timedelta(days=1)
        context['unavailable'] = unavailable
        context['packages'] = ListingPackage.objects.filter(listing_id=self.listing.id)
        if self.request.user.is_authenticated:
            context['form'] = InquiryForm()
        else:
            context['form'] = InquirySignupForm()
        return context

class ListingDetailView(FormMixin, DetailView):
    template_name = 'listings/listing-detail.html'
    context_object_name = 'listing'
    model = Listing
    form_class = InquiryForm

    def get_success_url(self):
        return self.request.path

    def get_context_data(self, **kwargs):
        context = super(ListingDetailView, self).get_context_data(**kwargs)
        self.listing = get_object_or_404(Listing, pk=self.kwargs['pk'])
        context['interested'] = self.listing.get_inquiry_count()
        context['login_form'] = CoreLoginForm()
        context['signup_form'] = SignupForm()
        context['images'] = ListingImage.objects.filter(listing_id=self.listing.id)
        context['instructors'] = self.listing.instructors.all().filter(is_verified=True)
        context['videos'] = Videos.objects.filter(Q(listings__id=self.listing.id) & Q(approved=True))
        if self.listing.user_profile.business_name or self.listing.user_profile.place_id:
            try:
                latitude, longitude, url, reviews = get_reviews(listing=self.listing)
                context['latitude'] = latitude
                context['longitude'] = longitude
                context['url'] = url
                context['reviews'] = reviews
            except Exception as e:
                pass
        # context['instructors'] = Staff.objects.filter(listings__id=self.listing.id).filter(is_instructor=True)
        airports = airportsdata.load('IATA')
        styles = self.listing.get_yoga_style_display()
        styles = styles.split(',')
        context['yoga_styles'] = styles
        airport_code = self.listing.airport_code
        if airport_code in airports:
            context['airport'] = airports[airport_code].get('name')
        
        start = datetime.today().date() # changed import datetime to from datetime for these lines
        context['today'] = start + timedelta(days=1)
        year = timedelta(days=365)
        end = datetime.now().date() + year
        # dates = PackagePrices.objects.filter(Q(package__listing=self.listing) & Q(is_available=True) & Q(date__gte=start)).values_list('date', flat=True)
        dates = CustomPriceRequest.objects.filter(Q(package__listing=self.listing) & Q(is_available=True) & Q(start_date__gte=start)).values_list('start_date', flat=True)
        unavailable = []
        first_available_date = dates.first()
        context['first_date'] = first_available_date
        while start < end:
            if start in dates:
                start = start + timedelta(days=1)
            else:
                unavailable.append(start)
                start = start + timedelta(days=1)
        context['unavailable'] = unavailable
        context['packages'] = ListingPackage.objects.filter(listing_id=self.listing.id)
        if not self.request.user.is_authenticated:
            context['inquiry_signup_form'] = InquirySignupForm()
        
        if self.request.POST:
            context['inquiry_form'] = InquiryForm(self.request.POST, instance=self.object)
        else:
            context['inquiry_form'] = InquiryForm(instance=self.object)

        return context

    
    def post(self, request, *args, **kwargs):
        self.object = self.get_object()
        form = self.get_form()
        if 'inquiry_form' in request.POST:
            inquiry_form = InquiryForm(request.POST, instance=self.object)
            if inquiry_form.is_valid():
                inquiry = inquiry_form.save(commit=False)
                message = inquiry_form.cleaned_data['message']
                phone = inquiry_form.cleaned_data['phone_number']
                customer = Customer.objects.get(user_id=request.user.id)
                arrival_date = request.POST.get('d-arrival')
                listing_id = request.POST.get('d-listing')
                listing = Listing.objects.get(pk=listing_id)
                package_id = request.POST.get('d-package')
                package = ListingPackage.objects.get(pk=package_id)
                number_of_people = package.number_of_people
                duration = listing.program_duration
                arrival_date = datetime.strptime(arrival_date, "%m/%d/%Y").date()
                arrival_date = arrival_date + timedelta(days=1)
                departure_date = arrival_date + timedelta(days=duration)
                start = arrival_date
                end = departure_date
                inquiry = Inquiry()
                inquiry.customer = customer
                inquiry.phone_number = phone
                inquiry.listing = listing
                inquiry.package = package
                inquiry.arrival_date = start
                inquiry.departure_date = end
                try:
                    if listing.available_all_year:
                        req = CustomPriceRequest.objects.get(Q(package=package) & Q(start_date__lte=start) & Q(end_date__gte=start))
                        total_price = req.price
                        inquiry.req = req
                    else:
                        req = CustomPriceRequest.objects.get(Q(package=package) & Q(start_date=start))
                        total_price = req.price
                        inquiry.req = req
                except:
                    total_price = package.default_price
                    inquiry.is_conditional = True
                inquiry.total_price = total_price
                inquiry.number_of_people = number_of_people
                inquiry.save()
                
                host = listing.user_profile
                if message:
                    conversation = Conversation.objects.create(host=host, customer=customer, inquiry=inquiry)
                    Messages.objects.create(content=message, conversation=conversation)
                else:
                    msg = "Hi,\nIs there availability for the selected dates?\nThank you."
                    conversation = Conversation.objects.create(host=host, customer=customer, inquiry=inquiry)
                    Messages.objects.create(content=msg, conversation=conversation)      
                return self.form_valid(inquiry_form)
            else: 
                return self.form_invalid(inquiry_form)

class GalleryView(DetailView):
    template_name = 'listings/gallery.html'
    context_object_name = 'listing'
    model = Listing

    def get_context_data(self, **kwargs):
        context = super(GalleryView, self).get_context_data(**kwargs)
        self.listing = get_object_or_404(Listing, pk=self.kwargs['pk'])
        context['images'] = ListingImage.objects.filter(listing_id=self.listing.id)
        context['videos'] = Videos.objects.filter(Q(listings__id=self.listing.id) & Q(approved=True))
        return context

class CustomerProfile(UpdateView):
    template_name = 'customers/profile.html'
    form_class = MainProfileForm
    model = Customer
    def get_success_url(self):
        return self.request.path
    
    def get_context_data(self, **kwargs):
        context = super(CustomerProfile, self).get_context_data(**kwargs)
        if self.request.POST:
            context['form'] = MainProfileForm(self.request.POST, instance=self.object)
        else:
            context['form'] = MainProfileForm(instance=self.object)
        return context

    def form_valid(self, form):
        self.object = form.save()
        return HttpResponseRedirect(self.request.path_info)

    def form_invalid(self, form):
        return self.render_to_response(
            self.get_context_data(form=form)
        )

class UpdateTitleIntroView(UpdateView):
    template_name = 'listings/forms/new-listings-title-intro.html'
    form_class = TitleModelForm
    model = Listing

    def get_success_url(self):
        self.success_url = '/'
        return self.success_url
    
    def get_context_data(self, **kwargs):
        context = super(UpdateTitleIntroView, self).get_context_data(**kwargs)
        if self.request.POST:
            context['form'] = TitleModelForm(self.request.POST, instance=self.object)
            context['page'] = 'intro-title'
        else:
            context['form'] = TitleModelForm(instance=self.object)
            context['page'] = 'intro-title'
        return context

    def form_valid(self, form):
        self.object = form.save()
        if self.object.is_verified:
            self.object.is_verified = False
            self.object.updated_after_approval = True
            self.object.save()
        return HttpResponseRedirect(self.request.path_info)

    def form_invalid(self, form):
        return self.render_to_response(
            self.get_context_data(form=form)
        )

class UpdateLocationView(UpdateView):
    template_name = 'listings/forms/test-page.html'
    form_class = LocationModelForm
    model = Listing

    def get_success_url(self):
        self.success_url = '/'
        return self.success_url
    
    def get_context_data(self, **kwargs):
        context = super(UpdateLocationView, self).get_context_data(**kwargs)
        if self.request.POST:
            context['form'] = LocationModelForm(self.request.POST, instance=self.object)
            context['page'] = 'location-accommodation'
        else:
            context['form'] = LocationModelForm(instance=self.object)
            context['page'] = 'location-accommodation'
        return context

    def form_valid(self, form):
        self.object = form.save()
        if self.object.is_verified:
            self.object.is_verified = False
            self.object.updated_after_approval = True
            self.object.save()
        return HttpResponseRedirect(self.request.path_info)

    def form_invalid(self, form):
        return self.render_to_response(
            self.get_context_data(form=form)
        )

class UpdateArrivalView(UpdateView):
    template_name = 'listings/forms/test-page-2.html'
    form_class = ArrivalModelForm
    model = Listing

    # def get_form(self, form_class=ArrivalModelForm):
    #     form = form_class()
    #     profile = UserProfile.objects.get(user_id = self.request.user.id)
    #     form.fields['staff'].queryset = Staff.objects.filter(host_organization_id=profile.id)
    #     return form

    def get_form_kwargs(self):
        kwargs = super().get_form_kwargs()
        kwargs.update({'user_obj': self.request.user.id })
        return kwargs

    def get_success_url(self):
        self.success_url = '/'
        return self.success_url
    
    def get_context_data(self, **kwargs):
        context = super(UpdateArrivalView, self).get_context_data(**kwargs)
        if self.request.POST:
            context['form'] = ArrivalModelForm(user_obj = self.request.user, instance=self.object)
            context['page'] = 'arrival-information'
        else:
            context['form'] = ArrivalModelForm(user_obj = self.request.user, instance=self.object)
            context['page'] = 'arrival-information'
        return context

    def form_valid(self, form):
        self.object = form.save()
        if self.object.is_verified:
            self.object.is_verified = False
            self.object.updated_after_approval = True
            self.object.save()
        return HttpResponseRedirect(self.request.path_info)

    def form_invalid(self, form):

        return self.render_to_response(
            self.get_context_data(form=form)
        )

class UpdateFoodView(UpdateView):
    template_name = 'listings/forms/test-page-3.html'
    form_class = FoodModelForm
    model = Listing

    def get_success_url(self):
        self.success_url = '/'
        return self.success_url
    
    def get_context_data(self, **kwargs):
        context = super(UpdateFoodView, self).get_context_data(**kwargs)
        if self.request.POST:
            context['form'] = FoodModelForm(self.request.POST, instance=self.object)
            context['page'] = 'food'
        else:
            context['form'] = FoodModelForm(instance=self.object)
            context['page'] = 'food'
        return context

    def form_valid(self, form):
        self.object = form.save()
        if self.object.is_verified:
            self.object.is_verified = False
            self.object.updated_after_approval = True
            self.object.save()
        return HttpResponseRedirect(self.request.path_info)

    def form_invalid(self, form):

        return self.render_to_response(
            self.get_context_data(form=form)
        )

class UpdateUserRequireView(UpdateView):
    template_name = 'listings/forms/test-page-4.html'
    form_class = RequireModelForm
    model = Listing

    def get_success_url(self):
        self.success_url = '/'
        return self.success_url
    
    def get_context_data(self, **kwargs):
        context = super(UpdateUserRequireView, self).get_context_data(**kwargs)
        if self.request.POST:
            context['form'] = RequireModelForm(self.request.POST, instance=self.object)
            context['page'] = 'guests-requirements'
        else:
            context['form'] = RequireModelForm(instance=self.object)
            context['page'] = 'guests-requirements'
        return context

    def form_valid(self, form):
        self.object = form.save()
        if self.object.is_verified:
            self.object.is_verified = False
            self.object.updated_after_approval = True
            self.object.save()
        return HttpResponseRedirect(self.request.path_info)

    def form_invalid(self, form):

        return self.render_to_response(
            self.get_context_data(form=form)
        )

class UpdateProgramView(UpdateView):
    template_name = 'listings/forms/test-page-5.html'
    form_class = ProgramModelForm
    model = Listing


    def get_form_kwargs(self):
        kwargs = super().get_form_kwargs()
        kwargs.update({'user_obj': self.request.user.id })
        return kwargs

    def get_success_url(self):
        self.success_url = '/'
        return self.success_url
    
    def get_context_data(self, **kwargs):
        context = super(UpdateProgramView, self).get_context_data(**kwargs)
        if self.request.POST:
            context['form'] = ProgramModelForm(user_obj = self.request.user, instance=self.object)
            context['page'] = 'program'
        else:
            context['form'] = ProgramModelForm(user_obj = self.request.user, instance=self.object)
            context['page'] = 'program'
        return context

    def form_valid(self, form):
        self.object = form.save()
        if self.object.is_verified:
            self.object.is_verified = False
            self.object.updated_after_approval = True
            self.object.save()
        return HttpResponseRedirect(self.request.path_info)

    def form_invalid(self, form):

        return self.render_to_response(
            self.get_context_data(form=form)
        )

class UpdatePricingView(UpdateView):
    template_name = 'listings/forms/test-page-6.html'
    form_class = PricingModelForm
    model = Listing

    def get_success_url(self):
        self.success_url = '/'
        return self.success_url
    
    def get_context_data(self, **kwargs):
        context = super(UpdatePricingView, self).get_context_data(**kwargs)
        if self.request.POST:
            context['form'] = PricingModelForm(self.request.POST, instance=self.object)
            context['page'] = 'pricing-and-inclusions'
        else:
            context['form'] = PricingModelForm(instance=self.object)
            context['page'] = 'pricing-and-inclusions'
        return context

    def form_valid(self, form):
        self.object = form.save()
        if self.object.is_verified:
            self.object.is_verified = False
            self.object.updated_after_approval = True
            self.object.save()
        return HttpResponseRedirect(self.request.path_info)

    def form_invalid(self, form):

        return self.render_to_response(
            self.get_context_data(form=form)
        )

class UpdateRankingView(UpdateView):
    template_name = 'listings/forms/ranking.html'
    form_class = RankingForm
    model = Listing

    def get_success_url(self):
        self.success_url = '/'
        return self.success_url
    
    def get_context_data(self, **kwargs):
        context = super(UpdateRankingView, self).get_context_data(**kwargs)
        if self.request.POST:
            context['form'] = RankingForm(self.request.POST, instance=self.object)
        else:
            context['form'] = RankingForm(instance=self.object)
        return context

    def form_valid(self, form):
        self.object = form.save()
        if self.object.is_verified:
            self.object.is_verified = False
            self.object.updated_after_approval = True
            self.object.save()
        return HttpResponseRedirect(self.request.path_info)

    def form_invalid(self, form):

        return self.render_to_response(
            self.get_context_data(form=form)
        )

class UpdateExtraView(UpdateView):
    template_name = 'listings/forms/test-page-7.html'
    form_class = ExtraModelForm
    model = Listing

    def get_success_url(self):
        self.success_url = '/'
        return self.success_url
    
    def get_context_data(self, **kwargs):
        context = super(UpdateExtraView, self).get_context_data(**kwargs)
        if self.request.POST:
            context['form'] = ExtraModelForm(self.request.POST, instance=self.object)
            context['page'] = 'extras'
        else:
            context['form'] = ExtraModelForm(instance=self.object)
            context['page'] = 'extras'
        return context

    def form_valid(self, form):
        self.object = form.save()
        
        return HttpResponseRedirect(self.request.path_info)

    def form_invalid(self, form):

        return self.render_to_response(
            self.get_context_data(form=form)
        )
        
class UpdatePhotoView(UpdateView):
    template_name = 'listings/forms/test-page-8.html'
    form_class = PhotoModelForm
    model = Listing
    context_object_name = 'listing'

    def get_success_url(self):
        self.success_url = '/'
        return self.success_url
    
    def get_context_data(self, **kwargs):
        context = super(UpdatePhotoView, self).get_context_data(**kwargs)
        if self.request.POST:
            context['form'] = PhotoModelForm(self.request.POST, instance=self.object)
            listing_photos = ListingImage.objects.filter(listing_id = self.id)
            context['page'] = 'photos'
            context['listing_photos'] = self.id
        else:
            context['form'] = PhotoModelForm(instance=self.object)
            listing_photos = ListingImage.objects.filter(listing_id = self.object.id)
            context['page'] = 'photos'
            context['listing_photos'] = listing_photos
        return context

    def form_valid(self, form):
        self.object = form.save()
        
        return HttpResponseRedirect(self.request.path_info)

    def form_invalid(self, form):

        return self.render_to_response(
            self.get_context_data(form=form)
        )

def file_upload_view(request, pk):
    if request.method == 'POST':
        my_file = request.FILES.get('file')
        my_listing = Listing.objects.get(pk=pk)
        original_fields = my_listing.updated_fields
        if 'listing_photos' in original_fields:
            pass
        else:
            original_fields = original_fields + ' ' + 'listing_photos'
        my_listing.updated_fields = original_fields
        if my_listing.is_verified:
            my_listing.is_verified = False
            my_listing.updated_after_approval = True
        my_listing.save()
        
        ListingImage.objects.create(listing=my_listing, image=my_file)

    return HttpResponse('upload')

def file_delete_view(request, pk=None, listing=None):
    ListingImage.objects.get(pk=pk).delete()
    return HttpResponseRedirect(reverse_lazy('listings:photo-update', kwargs={'pk': listing}))

class UpdateBookingConditionsView(UpdateView):
    template_name = 'listings/forms/test-page-9.html'
    form_class = BookingConditionsModelForm
    model = Listing
    context_object_name = 'listing'

    def get_success_url(self):
        self.success_url = '/'
        return self.success_url
    
    def get_context_data(self, **kwargs):
        context = super(UpdateBookingConditionsView, self).get_context_data(**kwargs)
        if self.request.POST:
            context['form'] = BookingConditionsModelForm(self.request.POST, instance=self.object)
            context['page'] = 'booking-conditions'
        else:
            context['form'] = BookingConditionsModelForm(instance=self.object)
            context['page'] = 'booking-conditions'
        return context

    def form_valid(self, form):
        self.object = form.save()
        return HttpResponseRedirect(self.request.path_info)

    def form_invalid(self, form):
        return self.render_to_response(
            self.get_context_data(form=form)
        )

class AccommodationListView(ListView):
    template_name = 'listings/accommodations/accommodation-list.html'
    context_object_name = 'accommodations'
    model = Accommodation

    def get_queryset(self, *args, **kwargs):
        qs = super(AccommodationListView, self).get_queryset(*args, **kwargs)
        user_p = UserProfile.objects.get(user_id = self.request.user.id)
        qs = qs.filter(user_profile=user_p)
        return qs

class UpdateAccommodationView(UpdateView):
    template_name = 'listings/accommodations/edit-accommodation.html'
    form_class = AccommodationModelForm
    model = Accommodation
    context_object_name = 'accommodation'

    def get_success_url(self):
        self.success_url = '/'
        return self.success_url
    
    def get_context_data(self, **kwargs):
        context = super(UpdateAccommodationView, self).get_context_data(**kwargs)
        if self.request.POST:
            context['form'] = AccommodationModelForm(self.request.POST, instance=self.object)
        else:
            context['form'] = AccommodationModelForm(instance=self.object)
        return context

    def form_valid(self, form):
        self.object = form.save()
        return HttpResponseRedirect(self.request.path_info)

    def form_invalid(self, form):
        return self.render_to_response(
            self.get_context_data(form=form)
        )
 
def delete_accommodation_view(request, pk):
    acc = Accommodation.objects.get(pk=pk)
    acc.delete()
    return HttpResponseRedirect(reverse('listings:accommodation-list'))

class AccommodationImagesView(TemplateView):
    template_name = 'listings/accommodations/edit-accommodation-photos.html'

    def get_context_data(self, *args, **kwargs):
        context = super(AccommodationImagesView, self).get_context_data(*args, **kwargs)
        acc = Accommodation.objects.get(pk=self.kwargs['pk'])
        images = AccommodationImages.objects.filter(accommodation=acc)
        context['images'] = images
        context['acc_pk'] = acc.id
        context['acc'] = acc
        return context

def delete_accommodation_image_view(request, pk):
    acc = AccommodationImages.objects.get(pk=pk)
    acc_pk = acc.accommodation_id
    acc.delete()
    return HttpResponseRedirect(reverse('listings:edit-accommodation-photos', kwargs={'pk': acc_pk}))

def upload_accommodation_image_view(request, pk):
    if request.method == 'POST':
        accommodation_pk = pk
        my_file = request.FILES.get('file')
        my_acc = Accommodation.objects.get(pk=accommodation_pk)
        AccommodationImages.objects.create(accommodation=my_acc, image=my_file)
    return HttpResponse('upload')

class UpdateAccommodationFacilitiesView(UpdateView):
    template_name = 'listings/accommodations/edit-accommodation-facilities.html'
    form_class = AccommodationFacilitiesModelForm
    model = Accommodation
    context_object_name = 'accommodation'

    def get_success_url(self):
        self.success_url = '/'
        return self.success_url
    
    def get_context_data(self, **kwargs):
        context = super(UpdateAccommodationFacilitiesView, self).get_context_data(**kwargs)
        if self.request.POST:
            context['form'] = AccommodationFacilitiesModelForm(self.request.POST, instance=self.object)
            acc = Accommodation.objects.get(pk=self.kwargs['pk'])
            context['acc'] = acc
        else:
            context['form'] = AccommodationFacilitiesModelForm(instance=self.object)
            acc = Accommodation.objects.get(pk=self.kwargs['pk'])
            context['acc'] = acc
        return context

    def form_valid(self, form):
        self.object = form.save()
        return HttpResponseRedirect(self.request.path_info)

    def form_invalid(self, form):
        return self.render_to_response(
            self.get_context_data(form=form)
        )

class UpdateAccommodationDescriptionView(UpdateView):
    template_name = 'listings/accommodations/edit-accommodation-description.html'
    form_class = AccommodationDescriptionModelForm
    model = Accommodation
    context_object_name = 'accommodation'

    def get_success_url(self):
        self.success_url = '/'
        return self.success_url
    
    def get_context_data(self, **kwargs):
        context = super(UpdateAccommodationDescriptionView, self).get_context_data(**kwargs)
        if self.request.POST:
            context['form'] = AccommodationDescriptionModelForm(self.request.POST, instance=self.object)
            acc = Accommodation.objects.get(pk=self.kwargs['pk'])
            context['acc'] = acc
        else:
            context['form'] = AccommodationDescriptionModelForm(instance=self.object)
            acc = Accommodation.objects.get(pk=self.kwargs['pk'])
            context['acc'] = acc
        return context

    def form_valid(self, form):
        self.object = form.save()
        
        return HttpResponseRedirect(self.request.path_info)

    def form_invalid(self, form):

        return self.render_to_response(
            self.get_context_data(form=form)
        )

class UpdateRoomTypeView(UpdateView):
    template_name = 'listings/rooms/edit-room-type.html'
    form_class = RoomTypeModelForm
    model = Room
    context_object_name = 'room'

    def get_success_url(self):
        self.success_url = '/'
        return self.success_url
    
    def get_context_data(self, **kwargs):
        context = super(UpdateRoomTypeView, self).get_context_data(**kwargs)
        if self.request.POST:
            context['form'] = RoomTypeModelForm(self.request.POST, instance=self.object)
        else:
            context['form'] = RoomTypeModelForm(instance=self.object)
        return context

    def form_valid(self, form):
        self.object = form.save()
        
        return HttpResponseRedirect(self.request.path_info)

    def form_invalid(self, form):

        return self.render_to_response(
            self.get_context_data(form=form)
        )

class RoomImagesView(TemplateView):
    template_name = 'listings/rooms/edit-room-photos.html'

    def get_context_data(self, *args, **kwargs):
        context = super(RoomImagesView, self).get_context_data(*args, **kwargs)
        room = Room.objects.get(pk=self.kwargs['pk'])
        images = RoomImages.objects.filter(room=room)
        context['images'] = images
        context['room_pk'] = room.id
        context['room'] = room
        return context

def delete_room_image_view(request, pk):
    room_img = RoomImages.objects.get(pk=pk)
    room_pk = room_img.room_id
    room_img.delete()
    return HttpResponseRedirect(reverse('listings:room-photos-update', kwargs={'pk': room_pk}))

def upload_room_image_view(request, pk):
    if request.method == 'POST':
        room_pk = pk
        my_file = request.FILES.get('file')
        my_room = Room.objects.get(pk=room_pk)
        RoomImages.objects.create(room=my_room, image=my_file)
    return HttpResponse('upload')

class UpdateRoomFacilitiesView(UpdateView):
    template_name = 'listings/rooms/edit-room-facilities.html'
    form_class = RoomFacilitiesModelForm
    model = Room
    context_object_name = 'room'

    def get_success_url(self):
        self.success_url = '/'
        return self.success_url
    
    def form_valid(self, form):
        self.object = form.save()
        
        return HttpResponseRedirect(self.request.path_info)

    def form_invalid(self, form):

        return self.render_to_response(
            self.get_context_data(form=form)
        )

class UpdateRoomDescriptionView(UpdateView):
    template_name = 'listings/rooms/edit-room-description.html'
    form_class = RoomDescriptionModelForm
    model = Room
    context_object_name = 'room'

    def get_success_url(self):
        self.success_url = '/'
        return self.success_url
    
    def form_valid(self, form):
        self.object = form.save()
        
        return HttpResponseRedirect(self.request.path_info)

    def form_invalid(self, form):

        return self.render_to_response(
            self.get_context_data(form=form)
        )   

class RoomBedConfigView(TemplateView):
    template_name = 'listings/rooms/edit-room-bed-configs.html'

    def get_context_data(self, *args, **kwargs):
        context = super(RoomBedConfigView, self).get_context_data(*args, **kwargs)
        room = Room.objects.get(pk=self.kwargs['pk'])
        images = RoomImages.objects.filter(room=room)
        context['images'] = images
        context['room_pk'] = room.id
        context['room'] = room
 
        context['bed_configs'] = BedConfig.objects.filter(room__id=room.id)
        return context

def update_room_config(request, pk):
    if request.method == 'POST':
        selected_list = request.POST.getlist('bed_config_1')
        room = Room.objects.get(pk=pk)
        print(selected_list)
        if len(selected_list) < 1:
            request.session['bed_error'] = 'Error processing your submission, please make sure every bed configuration has an associated bed count'
            return HttpResponseRedirect(reverse('listings:room-bed-config-update', kwargs={'pk': pk}))
        else:
            for i in selected_list:
                input = request.POST.get(i)
                if not input:
                    request.session['bed_error'] = 'Error processing your submission, please make sure every bed configuration has an associated bed count'
                    return HttpResponseRedirect(reverse('listings:room-bed-config-update', kwargs={'pk': pk}))

        new_bedconfig = BedConfig.objects.create(room=room)
        for item in selected_list:
            input = request.POST.get(item)
            if input:
                try:
                    BedCombo.objects.create(bed_config_id=new_bedconfig.id, bed_type=item, num_beds=input)
                except Exception as e:
                    request.session['bed_error'] = 'Error processing your submission, please make sure every bed configuration has an associated bed count'
                    return HttpResponseRedirect(reverse('listings:room-bed-config-update', kwargs={'pk': pk}))
    try:
        del request.session['bed_error']
    except Exception as e:
        pass
    return HttpResponseRedirect(reverse('listings:room-bed-config-update', kwargs={'pk': pk}))

def remove_room_config(request, pk, room_id):
    bed_config = BedConfig.objects.get(pk=pk)
    bed_config.delete()
    return HttpResponseRedirect(reverse('listings:room-bed-config-update', kwargs={'pk': room_id}))

def delete_room(request, pk):
    room = Room.objects.get(pk=pk)
    room.delete()
    return HttpResponseRedirect(reverse('listings:accommodation-list'))

class AddRoomView(TemplateView):
    template_name = 'listings/rooms/add-room.html'

    def get_context_data(self, *args, **kwargs):
        context = super(AddRoomView, self).get_context_data(*args, **kwargs)
        acc = Accommodation.objects.get(pk=self.kwargs['pk'])
        context['acc'] = acc
        return context

def add_room(request, pk):
    if request.method == 'POST':
        acc = Accommodation.objects.get(pk=pk)
        type = request.POST.get('room_type_id')
        name = request.POST.get('room_name')
        shared = request.POST.get('room_share_type')
        max_occ = request.POST.get('nr_people_share')
        if shared == 'on':
            shared = 2

        try:
            Room.objects.create(accommodation=acc, type=type, name=name, shared=shared, max_occupancy=max_occ)
        except Exception as e:
            request.session['room_error'] = 'Error processing your submission, please make sure you have entered and selected all appropriate values'
            return HttpResponseRedirect(reverse('listings:add-room-view', kwargs={'pk': pk}))
    try:
        del request.session['room_error']
    except Exception as e:
        pass

    return HttpResponseRedirect(reverse('listings:accommodation-list'))

class AccommodationAddView(TemplateView):
    template_name = 'listings/accommodations/new-accommodation.html'

    def get_context_data(self, *args, **kwargs):
        context = super(AccommodationAddView, self).get_context_data(*args, **kwargs)
        user_p = UserProfile.objects.get(user_id=self.request.user.id)
        context['user_p'] = user_p.id
        return context

def add_accommodation_handler(request, pk):
    if request.method == 'POST':
        shared = request.POST.get('accommodation_share_group')
        user_p = UserProfile.objects.get(pk=pk)
        if shared == '1':
            category = request.POST.get('private-category')
            acc_name = request.POST.get('accommodation_name')
            max_occ = request.POST.get('nr_people_share')
            try:
                Accommodation.objects.create(user_profile=user_p, type=shared, category_private_unit=category, name=acc_name, max_occupancy=max_occ)
            except Exception as e:
                request.session['acc_error'] = 'Error processing your submission, please make sure you have entered and selected all appropriate values'
                return HttpResponseRedirect(reverse('listings:add-accommodation-view'))
        if shared == '2':
            category = request.POST.get('shared-category')
            acc_name = request.POST.get('accommodation_name')
            try:
                Accommodation.objects.create(user_profile=user_p, type=shared, category_multiple_units=category, name=acc_name)
            except Exception as e:
                request.session['acc_error'] = 'Error processing your submission, please make sure you have entered and selected all appropriate values'
                return HttpResponseRedirect(reverse('listings:add-accommodation-view'))

    try:
        del request.session['acc_error']
    except Exception as e:
        pass
    return HttpResponseRedirect(reverse('listings:accommodation-list'))

class MyListingsView(FormMixin, ListView):
    template_name = 'listings/forms/my-listings.html'
    context_object_name = 'listings'
    model = Listing
    form_class = CountrySelectModelForm

    def get_queryset(self, *args, **kwargs):
        qs = super(MyListingsView, self).get_queryset(*args, **kwargs)
        user_p = UserProfile.objects.get(user_id=self.request.user.id)
        qs = qs.filter(user_profile=user_p)
        return qs 


    def post(self, request, *args, **kwargs):
        form = self.form_class(request.POST)
        if form.is_valid():
            instance = form.save(commit=False)
            user_p = UserProfile.objects.get(user_id=self.request.user.id)
            instance.user_profile = user_p
            instance.save()
            return HttpResponseRedirect(reverse('listings:title-update', kwargs={'pk': instance.pk }))

        return render(request, self.template_name, {'form': form})

class InstructorListview(ListView):
    template_name = 'listings/instructors/my-instructors.html'
    context_object_name = 'instructors'
    model = Staff

    def get_queryset(self, *args, **kwargs):
        qs = super(InstructorListview, self).get_queryset(*args, **kwargs)
        user_p = UserProfile.objects.get(user_id=self.request.user.id)
        qs = qs.filter(host_organization_id=user_p.id)
        return qs
    
    
    def get_context_data(self, *args, **kwargs):
        context = super(InstructorListview, self).get_context_data(*args, **kwargs)
        user_profile = UserProfile.objects.get(user_id=self.request.user.id)
        contacts = user_profile.get_contacts
        context['contacts'] = contacts
        return context

class AddInstructorView(CreateView):
    template_name = 'listings/instructors/add-instructor.html'
    model = Staff
    fields = ['first_name', 'last_name', 'email', 'gender', 'phone', 'skype', 'bio', 'portrait', 'featured_portrait', 'is_host', 'is_instructor']

    
    def form_valid(self, form):
        user_p = UserProfile.objects.get(user_id=self.request.user.id)
        form.instance.host_organization = user_p
        return super(AddInstructorView, self).form_valid(form)
    
    def get_success_url(self):
        return reverse('listings:instructor-list')

class UpdateInstructorView(UpdateView):
    template_name = 'listings/instructors/edit-instructor.html'
    form_class = StaffUpdateModelForm
    model = Staff
    context_object_name = 'instructor'

    def get_success_url(self):
        return reverse('listings:instructor-list')
    
    def form_valid(self, form):
        self.object = form.save()
        if self.object.is_verified:
            self.object.is_verified = False
            old_notes = self.object.staff_notes
            if not old_notes:
                old_notes = ''
            self.object.staff_notes = old_notes + 'Personal Details Updated --- '
            self.object.save()
        return HttpResponseRedirect(self.request.path_info)

    def form_invalid(self, form):

        return self.render_to_response(
            self.get_context_data(form=form)
        )

class InstructorSkillsView(TemplateView):
    template_name = 'listings/instructors/edit-instructor-skills.html'

    def get_context_data(self, *args, **kwargs):
        context = super(InstructorSkillsView, self).get_context_data(*args, **kwargs)
        staff_member = Staff.objects.get(id=kwargs['pk'])
        context['instructor'] = staff_member
        context['skills'] = Skill.objects.filter(staff_member=staff_member)
        return context

def add_skill_handler(request, pk):
    if request.method == 'POST':
        staff_member = Staff.objects.get(pk=pk)
        name = request.POST.get('skill_name')
        training_year = request.POST.get('training_year')
        teacher_name = request.POST.get('teacher_name')
        school_name = request.POST.get('school_name')
        Skill.objects.create(name=name, training_year=training_year, teacher=teacher_name, school=school_name, staff_member=staff_member)
        if staff_member.is_verified:
            staff_member.is_verified = False
            old_notes = staff_member.staff_notes
            staff_member.staff_notes = old_notes + 'Skill {} was added --- '.format(name)
            staff_member.save()
    return HttpResponseRedirect(reverse('listings:edit-instructor-skills',  kwargs={'pk': pk }))

def remove_skill_handler(request, pk, skill_id):
    Skill.objects.get(pk=skill_id).delete()
    return HttpResponseRedirect(reverse('listings:edit-instructor-skills',  kwargs={'pk': pk }))

class VideoView(ListView):
    template_name = 'listings/videos/videos.html'
    model = Videos
    context_object_name = 'videos'

    def get_queryset(self, *args, **kwargs):
        qs = super(VideoView, self).get_queryset(*args, **kwargs)
        user_p = UserProfile.objects.get(user_id=self.request.user.id)
        qs = qs.filter(profile=user_p)
        return qs

    def get_context_data(self, *args, **kwargs):
        context = super(VideoView, self).get_context_data(*args, **kwargs)
        user_p = UserProfile.objects.get(user_id=self.request.user.id)
        context['user_p'] = user_p.id

        
        return context
    
class UpdateVideoView(UpdateView):
    template_name = 'listings/videos/update-video.html'
    form_class = VideoModelForm
    model = Videos
    context_object_name = 'video'

    def get_form_kwargs(self):
        kwargs = super().get_form_kwargs()
        kwargs.update({'user_obj': self.request.user.id })
        return kwargs

    def get_success_url(self):
        return reverse('listings:update-videos')
    
    def get_context_data(self, **kwargs):
        context = super(UpdateVideoView, self).get_context_data(**kwargs)
        if self.request.POST:
            context['form'] = VideoModelForm(user_obj = self.request.user, instance=self.object)
        else:
            context['form'] = VideoModelForm(user_obj = self.request.user, instance=self.object)
        return context

    def form_valid(self, form):
        user_p = UserProfile.objects.get(user_id=self.request.user.id)
        form.instance.profile = user_p
        return super(UpdateVideoView, self).form_valid(form)

    def form_invalid(self, form):

        return self.render_to_response(
            self.get_context_data(form=form)
        )

def add_video(request, pk):
    if request.method == 'POST':
        my_file = request.FILES.get('file')
        user_p = UserProfile.objects.get(pk=pk)
        Videos.objects.create(profile=user_p, video=my_file)
    return HttpResponse('upload')

def delete_video(request, pk=None, user_p=None):
    vid = Videos.objects.get(pk=pk)
    user_p = UserProfile.objects.get(pk=user_p)
    if vid.profile == user_p:
        vid.delete()
    return HttpResponseRedirect(reverse_lazy('listings:update-videos'))

class UpdateProfilePageView(UpdateView):
    template_name = 'profiles/main-profile-page.html'
    form_class = ProfilePageModelForm
    model = UserProfile
    context_object_name = 'profile'

    def get_success_url(self):
        self.success_url = '/'
        return self.success_url
    
    def get_context_data(self, **kwargs):
        context = super(UpdateProfilePageView, self).get_context_data(**kwargs)
        if self.request.POST:
            context['form'] = ProfilePageModelForm(self.request.POST, instance=self.object)
        else:
            context['form'] = ProfilePageModelForm(instance=self.object)
        return context

    def form_valid(self, form):
        self.object = form.save()
        
        return HttpResponseRedirect(self.request.path_info)

    def form_invalid(self, form):

        return self.render_to_response(
            self.get_context_data(form=form)
        )

class UpdateBusinessInfoView(UpdateView):
    template_name = 'profiles/business-info.html'
    form_class = BusinessInfoModelForm
    model = UserProfile
    context_object_name = 'profile'

    def get_success_url(self):
        self.success_url = '/'
        return self.success_url
    
    def get_context_data(self, **kwargs):
        context = super(UpdateBusinessInfoView, self).get_context_data(**kwargs)
        if self.request.POST:
            context['form'] = BusinessInfoModelForm(self.request.POST, instance=self.object)
        else:
            context['form'] = BusinessInfoModelForm(instance=self.object)
        return context

    def form_valid(self, form):
        self.object = form.save()
        
        return HttpResponseRedirect(self.request.path_info)

    def form_invalid(self, form):

        return self.render_to_response(
            self.get_context_data(form=form)
        )

class UpdatePersonalInfoView(UpdateView):
    template_name = 'profiles/personal-info.html'
    form_class = PersonalInfoModelForm
    model = UserProfile
    context_object_name = 'profile'

    def get_success_url(self):
        self.success_url = '/'
        return self.success_url
    
    def get_context_data(self, **kwargs):
        context = super(UpdatePersonalInfoView, self).get_context_data(**kwargs)
        if self.request.POST:
            context['form'] = PersonalInfoModelForm(self.request.POST, instance=self.object)
        else:
            context['form'] = PersonalInfoModelForm(instance=self.object)
        return context

    def form_valid(self, form):
        self.object = form.save()
        
        return HttpResponseRedirect(self.request.path_info)

    def form_invalid(self, form):

        return self.render_to_response(
            self.get_context_data(form=form)
        )

def switch_business(request, pk):
    user_p = UserProfile.objects.get(pk=pk)
    if user_p.is_business:
        user_p.is_business = False
        user_p.save()
        return HttpResponseRedirect(reverse('listings:personalinfo-update', kwargs={'pk': pk}))
    else:
        user_p.is_business = True
        user_p.save()
        return HttpResponseRedirect(reverse('listings:businessinfo-update', kwargs={'pk': pk}))

class UpdatePaymentInfoView(UpdateView):
    template_name = 'profiles/payment-info.html'
    form_class = PaymentInfoModelForm
    model = UserProfile
    context_object_name = 'profile'

    def get_success_url(self):
        self.success_url = '/'
        return self.success_url
    
    def get_context_data(self, **kwargs):
        context = super(UpdatePaymentInfoView, self).get_context_data(**kwargs)
        if self.request.POST:
            context['form'] = PaymentInfoModelForm(self.request.POST, instance=self.object)
        else:
            context['form'] = PaymentInfoModelForm(instance=self.object)
        return context

    def form_valid(self, form):
        self.object = form.save()
        
        return HttpResponseRedirect(self.request.path_info)

    def form_invalid(self, form):

        return self.render_to_response(
            self.get_context_data(form=form)
        )

class AddContactView(TemplateView):
    template_name = 'listings/instructors/add-contact.html'

    def get_context_data(self, **kwargs):
        context = super(AddContactView, self).get_context_data(**kwargs)
        user = self.request.user.get_profile()
        user_p = UserProfile.objects.get(pk=user.pk)
        context['user_p'] = user_p
        return context

def add_contact(request, pk):
    if request.method == 'POST':
        first_name = request.POST.get('name')
        last_name = request.POST.get('last-name')
        gender = request.POST.get('gender')
        email = request.POST.get('email')
        country_code = request.POST.get('country-code')
        x = country_code.split(" ")
        country_code = x[1]
        phone = request.POST.get('telephone-number')
        skype = request.POST.get('skype')
        user_p = UserProfile.objects.get(pk=pk)
        if gender == 'male':
            gender = 1
        elif gender == 'female':
            gender = 2
        BusinessContacts.objects.create(profile=user_p, first_name=first_name, last_name=last_name, gender=gender, country_code=country_code,phone=phone,skype=skype, email=email)

        return HttpResponseRedirect(reverse('listings:instructor-list'))

def delete_contact(request, pk=None):
    BusinessContacts.objects.get(pk=pk).delete()
    return HttpResponseRedirect(reverse('listings:instructor-list'))

def delete_listing(request, pk=None):
    listing = Listing.objects.get(pk=pk)
    user_p = request.user.get_profile()
    if listing.user_profile == user_p:
        listing.delete()
    return HttpResponseRedirect(reverse('listings:my_listings'))

class ProfileView(DetailView):
    template_name = 'listings/profile.html'
    context_object_name = 'profile'
    model = UserProfile

class PackagesView(FormMixin, DetailView):
    template_name = 'listings/forms/packages.html'
    model = Listing
    form_class = PackageUpdateForm

    def get_success_url(self):
        return reverse('listings:packages-list', kwargs={'pk': self.object.id })

    def get_context_data(self, **kwargs):
        context = super(PackagesView, self).get_context_data(**kwargs)
        # date = ListingPackage.objects.get(pk=1)
        # date_next = ListingPackage.objects.get(pk=2)
        # context['date'] = date
        # context['date_next'] = date_next
        context['packages'] = ListingPackage.objects.filter(listing_id = self.kwargs['pk'])
        context['accommodations'] = Accommodation.objects.filter(user_profile = self.request.user.get_profile())
        context['form'] = PackageUpdateForm()
        return context

    def post(self, request, *args, **kwargs):
        self.object = self.get_object()
        form = self.get_form()
        if form.is_valid():
            package_id = request.POST.get('package_id')
            package = ListingPackage.objects.get(pk=package_id)
            default_price = form.cleaned_data['default_price']
            price_calculation = form.cleaned_data['price_calculation']
            package.default_price = default_price
            package.price_calculation = price_calculation
            package.save()
            return self.form_valid(form)
        else:
            return self.form_invalid(form)

class EditCalendarView(TemplateView):
    template_name = 'listings/forms/calendar.html'

    def get_context_data(self, **kwargs):
        context = super(EditCalendarView, self).get_context_data(**kwargs)
        context['listing'] = Listing.objects.get(pk=self.kwargs['listing'])
        package = ListingPackage.objects.get(pk=self.kwargs['pk'])
        context['package'] = package
        context['cprices'] = CustomPriceRequest.objects.filter(package=package).order_by('-start_date')
        return context

def add_price(request, pk, listing):
    if request.method == 'POST':
        start_date = request.POST.get('start_date')
        listing = Listing.objects.get(pk=listing)
        duration = listing.program_duration
        try:
            start_date = datetime.strptime(start_date, "%Y-%m-%d").date()
            end_date = start_date + timedelta(days=duration)
        except Exception as e:
            request.session['reg_calendar_error'] = 'Error processing your submission, please make sure you have selected an appropriate arrival date'
            return HttpResponseRedirect(reverse('listings:edit-calendar', kwargs={'pk': pk, 'listing': listing.pk}))
        
        price = int(request.POST.get('price'))
        if price < 1 or not price:
            request.session['reg_calendar_error'] = 'Please enter a price higher than 0'
            return HttpResponseRedirect(reverse('listings:edit-calendar', kwargs={'pk': pk, 'listing': listing.pk}))
        try:
            slots = int(request.POST.get('slots'))
        except Exception as e:
            request.session['reg_calendar_error'] = 'Please enter a slot value higher than 0'
            return HttpResponseRedirect(reverse('listings:edit-calendar', kwargs={'pk': pk, 'listing': listing.pk}))
        try: 
            del request.session['reg_calendar_error']
        except Exception as e:
            pass
        package = ListingPackage.objects.get(pk=pk)
        CustomPriceRequest.objects.create(package=package, start_date=start_date, end_date=end_date, max_slots=slots, price=price, is_available=True)
        return HttpResponseRedirect(reverse('listings:edit-calendar', kwargs={'pk': pk, 'listing': listing.pk}))

def add_price_yearly(request, pk, listing):
    if request.method == 'POST':
        start_date = request.POST.get('start_date')
        end_date = request.POST.get('end_date')
        listing = Listing.objects.get(pk=listing)
        try:
            start_date = datetime.strptime(start_date, "%Y-%m-%d").date()
            end_date = datetime.strptime(end_date, "%Y-%m-%d").date()
        except Exception as e:
            request.session['calendar_error'] = 'Error processing your submission, please make sure you have selected your arrival and departure dates'
            return HttpResponseRedirect(reverse('listings:edit-calendar', kwargs={'pk': pk, 'listing': listing.pk}))
        price = int(request.POST.get('price'))
        if price < 1 or not price:
            request.session['calendar_error'] = 'Please enter a price higher than 0'
            return HttpResponseRedirect(reverse('listings:edit-calendar', kwargs={'pk': pk, 'listing': listing.pk}))
        try: 
            del request.session['calendar_error']
        except Exception as e:
            pass
        slots = 1000
        package = ListingPackage.objects.get(pk=pk)
        CustomPriceRequest.objects.create(package=package, start_date=start_date, end_date=end_date, max_slots=slots, price=price, is_available=True)
        return HttpResponseRedirect(reverse('listings:edit-calendar', kwargs={'pk': pk, 'listing': listing.pk}))

def delete_price(request, req=None, pk=None, listing=None):
    price_req = CustomPriceRequest.objects.get(pk=req)
    # start_date = price_req.start_date
    # end_date = price_req.end_date
    # day = timedelta(days=1)
    # while start_date <= end_date:
    #     start_date = start_date + day
    # PackagePrices.objects.filter(reqs=price_req).delete()
    price_req.delete()

    return HttpResponseRedirect(reverse('listings:edit-calendar', kwargs={'pk': pk, 'listing': listing}))

def add_package(request, pk):
    if request.method == 'POST':
        try:
            number_of_people = request.POST.get('nr_persons')
            room = request.POST.get('room_id')
            room_obj = Room.objects.get(pk=room)
            note = request.POST.get('note_modal')
            default_price = request.POST.get('price_modal')
            integer_price = int(default_price)
            print(default_price)
            print(integer_price)
            if integer_price < 1 or not integer_price:
                request.session['package_error'] = 'Error processing your submission, please enter a positive default package price'
                return HttpResponseRedirect(reverse('listings:packages-list', kwargs={'pk': pk}))
            price_calculation = request.POST.get('price_calculation')
            listing = Listing.objects.get(pk=pk)
            ListingPackage.objects.create(listing=listing, number_of_people=number_of_people, room=room_obj, note=note, default_price=default_price, price_calculation=price_calculation)
        except Exception as e:
            request.session['package_error'] = 'Error processing your submission, please make sure all fields are entered correctly'
            return HttpResponseRedirect(reverse('listings:packages-list', kwargs={'pk': pk}))
        try:
            del request.session['package_error']
        except Exception as e:
            pass
        old_fields = listing.updated_fields
        if 'new_package' in old_fields:
            pass
        else:
            new_fields = old_fields + ' new_package'
            listing.updated_fields = new_fields
            if listing.is_verified:
                listing.is_verified = False
                listing.updated_after_approval = True
            listing.save() 
        return HttpResponseRedirect(reverse('listings:packages-list', kwargs={'pk': pk}))

def delete_package(request, pk, listing):
    ListingPackage.objects.get(pk=pk).delete()
    return HttpResponseRedirect(reverse('listings:packages-list', kwargs={'pk': listing}))

def add_year_round(request, listing):
    listing = Listing.objects.get(pk=listing)
    listing.available_all_year = True
    listing.save()
    return HttpResponseRedirect(reverse('listings:packages-list', kwargs={'pk': listing.pk}))

def remove_year_round(request, listing):
    listing = Listing.objects.get(pk=listing)
    listing.available_all_year = False
    listing.save()
    packages = ListingPackage.objects.filter(listing=listing)
    for package in packages:
        for req in package.reqs.all():
            if req.max_slots == 1000:
                req.delete()
    return HttpResponseRedirect(reverse('listings:packages-list', kwargs={'pk': listing.pk}))


def add_instant_booking(request, pk):
    listing = Listing.objects.get(pk=pk)
    listing.instant_booking = True
    listing.save()
    return HttpResponseRedirect(reverse('listings:packages-list', kwargs={'pk': listing.pk}))

def remove_instant_booking(request, pk):
    listing = Listing.objects.get(pk=pk)
    listing.instant_booking = False
    listing.save()
    return HttpResponseRedirect(reverse('listings:packages-list', kwargs={'pk': listing.pk}))

class MyMessagesView(ListView):
    template_name = 'customers/my_messages.html'
    model = Inquiry
    context_object_name = 'inquiries'

    def get_context_data(self, **kwargs):
        context = super(MyMessagesView, self).get_context_data(**kwargs)
        context['today'] = datetime.now()
        return context

    def get_queryset(self, *args, **kwargs):
        qs = super(MyMessagesView, self).get_queryset(*args, **kwargs)
        customer = Customer.objects.get(pk=self.kwargs['customer_pk'])
        today = datetime.now()
        q1 = self.request.GET.get('rtb')
        q2 = self.request.GET.get('unread')
        if q1:
            qs = qs.filter(Q(customer=customer) & Q(is_approved=True) & Q(departure_date__gte=today)).order_by('-pk')
        elif q2:
            qs = qs.filter(Q(customer=customer) & Q(viewed=False)).order_by('-pk')
        else:
            qs = qs.filter(customer=customer).order_by('-pk')
        return qs

class MyConversationView(FormMixin, DetailView):
    template_name = 'customers/conversation.html'
    model = Inquiry
    context_object_name = 'inquiry'
    form_class = SendMessageForm

    def get_initial(self):
        message = Messages.objects.filter(conversation__inquiry_id=self.object.pk).first()
        conversation_id = message.conversation.pk
        conversation = Conversation.objects.get(pk=conversation_id)
        return {'conversation': conversation}

    def get_success_url(self):
        return self.request.path

    def get_context_data(self, **kwargs):
        context = super(MyConversationView, self).get_context_data(**kwargs)
        messages = Messages.objects.filter(conversation__inquiry_id=self.object.pk).order_by('-created_at')
        inquiry = self.object
        inquiry.viewed = True
        inquiry.save()
        context['messages'] = messages
        messages.update(is_unread_customer=False)
        conversation = Conversation.objects.get(inquiry_id=self.object.pk)
        conversation.is_unread_customer = False
        conversation.save()

        # conversation_id = messages[0].conversation.pk
        # conversation = Conversation.objects.get(pk=conversation_id)
        # context['form'] = SendMessageForm(initial={'conversation': conversation})
        return context

    def post(self, request, *args, **kwargs):
        self.object = self.get_object()
        form = self.get_form()
        if form.is_valid():
            return self.form_valid(form)
        else:
            return self.form_invalid(form)
    
    def form_valid(self, form):
        form.save(commit=False)
        content = form.cleaned_data['content']
        flag_email = re.findall(r"[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?", content)
        fixed_content = re.sub(r"[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?", "******", content)
        flag_website = re.findall(r"[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)", content)
        fixed_content = re.sub(r"[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)", "******", fixed_content)
        if flag_email or flag_website:
            form.instance.is_flagged = True
        form.instance.content = fixed_content
        form.instance.original_context = content
        message = form.save()
        if self.request.FILES:
            for f in self.request.FILES.getlist('attached_files'):
                Attachment.objects.create(file=f, message=message)
        
        return super(MyConversationView, self).form_valid(form)
    
class MyInquiriesView(ListView):
    template_name = 'profiles/my_inquiries.html'
    model = Inquiry
    context_object_name = 'inquiries'

    def get_queryset(self, *args, **kwargs):
        qs = super(MyInquiriesView, self).get_queryset(*args, **kwargs)
        user_profile = UserProfile.objects.get(pk=self.kwargs['host_pk'])
        qs = Inquiry.objects.filter(Q(listing__user_profile=user_profile) & Q(host_declined=False)).order_by('-created_at')
        return qs
    
    def get_context_data(self, **kwargs):
        context = super(MyInquiriesView, self).get_context_data(**kwargs)
        user_profile = UserProfile.objects.get(pk=self.kwargs['host_pk'])
        # context['new_messages'] = Inquiry.objects.filter(Q(listing__user_profile=user_profile) & Q(host_declined=False) & Q(conversation__is_unread_host=True)).order_by('conversation__'))
        inq_msgs = sorted(Inquiry.objects.filter(Q(listing__user_profile=user_profile) & Q(host_declined=False) & Q(conversation__is_unread_host=True)), key=lambda a: a.conversation.last_message, reverse=True)
        context['new_messages'] = inq_msgs
        return context

class InquiryDetailView(FormMixin, DetailView):
    template_name = 'profiles/inquiry_details.html'
    model = Inquiry
    context_object_name = 'inquiry'
    form_class = SendMessageForm

    def get_initial(self):
        message = Messages.objects.filter(conversation__inquiry_id=self.object.pk).first()
        conversation_id = message.conversation.pk
        conversation = Conversation.objects.get(pk=conversation_id)
        return {'conversation': conversation}

    def get_success_url(self):
        return self.request.path

    def get_context_data(self, **kwargs):
        context = super(InquiryDetailView, self).get_context_data(**kwargs)
        inquiry = self.object
        inquiry.viewed = True
        inquiry.save()
        deposit_dollar_value = inquiry.deposit_amount
        # deposit_dollar_value = float(inquiry.total_price) * (inquiry.commission_percent / 100)
        remain_percent = 100 - inquiry.commission_percent
        context['remain_percent'] = remain_percent
        remain_amount = float(inquiry.total_price) - deposit_dollar_value
        context['remaining_amount'] = remain_amount
        
        context['deposit'] = deposit_dollar_value
        if inquiry.to_be_paid == 1:
            arrival_date = inquiry.arrival_date
            context['pay_date'] = arrival_date
            due_date = arrival_date
            context['pay_date_ctx'] = "On Arrival"
            context['days_before'] = ''
        elif inquiry.to_be_paid == 2:
            departure_date = inquiry.departure_date
            context['pay_date'] = departure_date
            due_date = departure_date
            context['pay_date_ctx'] = "On Departure"
            context['days_before'] = ''
        else:
            num_days = inquiry.number_of_days_before_arrival
            arrival_date = inquiry.arrival_date
            try:
                context['pay_date'] = arrival_date - timedelta(days=num_days)
            except:
                context['pay_date'] = arrival_date
            # due_date = arrival_date - timedelta(days=num_days)
            context['pay_date_ctx'] = 'days before arrival'
            context['days_before'] = num_days

        today = datetime.today().date()
        if not inquiry.is_approved:
            context['step'] = 'enable_payment'
        else:
            if not inquiry.deposit_paid:
                context['step'] = 'deposit_required'
            else:
                if today <= due_date:
                    context['step'] = 'remainder_due'
                else:
                    if today <= inquiry.arrival_date:
                        context['step'] = 'arrival_due'
                    else:
                        if today <= inquiry.departure_date:
                            context['step'] = 'currently_there'
        
        if inquiry.is_cancelled:
            context['step'] = 'cancelled'
         



        messages = Messages.objects.filter(conversation__inquiry_id=self.object.pk).order_by('-created_at')
        context['messages'] = messages
        messages.update(is_unread_host=False)
        conversation = Conversation.objects.get(inquiry_id=self.object.pk)
        conversation.is_unread_host = False
        conversation.save()

        if self.request.POST:
            context['modifyform'] = ModifyInquiryForm(self.request.POST, instance=self.object)
            context['modifyform'].fields['package'].queryset = ListingPackage.objects.filter(listing__user_profile=self.request.user.get_profile())
            context['conditionform'] = ModifyConditionsForm(self.request.POST, instance=self.object)
        else:
            context['modifyform'] = ModifyInquiryForm(instance=self.object)
            context['modifyform'].fields['package'].queryset = ListingPackage.objects.filter(listing__user_profile=self.request.user.get_profile())
            context['conditionform'] = ModifyConditionsForm(instance=self.object)

        # conversation_id = messages[0].conversation.pk
        # conversation = Conversation.objects.get(pk=conversation_id)
        # context['form'] = SendMessageForm(initial={'conversation': conversation})
        return context

    def post(self, request, *args, **kwargs):
        self.object = self.get_object()
        form = self.get_form()
        #modifyform is the name of the button
        if 'modifyform' in request.POST:
            modifyform = ModifyInquiryForm(request.POST, instance=self.object)
            if modifyform.is_valid():
                package_id = modifyform.data['package']
                instance = modifyform.save(commit=False)
                listing = Listing.objects.get(packages__id=package_id)
                instance.listing = listing
                instance.is_approved = False
                instance.save()
                return self.form_valid(modifyform)
        elif 'conditionform' in request.POST:
            conditionform = ModifyConditionsForm(request.POST, instance=self.object)
            if conditionform.is_valid():
                instance = conditionform.save(commit=False)
                instance.save()
                return self.form_valid(conditionform)
                
        else:
            if form.is_valid():
                instance = form.save(commit=False)
                instance.from_host = True
                content = form.cleaned_data['content']
                flag_email = re.findall(r"[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?", content)
                fixed_content = re.sub(r"[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?", "******", content)
                flag_website = re.findall(r"[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)", content)
                fixed_content = re.sub(r"[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)", "******", fixed_content)
                if flag_email or flag_website:
                    instance.is_flagged = True
                instance.content = fixed_content
                instance.original_context = content
                instance.save()
                if self.request.FILES:
                    for f in self.request.FILES.getlist('attached_files'):
                        Attachment.objects.create(file=f, message=instance)
                return self.form_valid(form)      
            else:
                return self.form_invalid(form)

def approve_inquiry(request, pk):
    inquiry = Inquiry.objects.get(pk=pk)
    inquiry.is_approved = True
    conversation = Conversation.objects.get(inquiry=inquiry)
    host = conversation.host.business_name
    content = "Great news! {} has confirmed that there is availability for your dates.".format(host)
    Messages.objects.create(from_host=True, content=content, conversation=conversation)
    inquiry.save(update_fields=['is_approved'])

    return HttpResponseRedirect(reverse('listings:inquiry_detail', kwargs={'pk': pk}))

def decline_inquiry(request, pk):
    if request.method == "POST":
        message = request.POST.get('decline-message')
        inquiry = Inquiry.objects.get(pk=pk)
        conversation = Conversation.objects.get(inquiry=inquiry)
        Messages.objects.create(from_host=True, content=message, conversation=conversation)
        inquiry.host_declined = True
        inquiry.save(update_fields=['host_declined'])

    return HttpResponseRedirect(reverse('listings:inquiry_detail', kwargs={'pk': pk}))

class MyBookingsView(ListView):
    template_name = 'profiles/my_bookings.html'
    model = Inquiry
    context_object_name = 'inquiries'

    def get_queryset(self, *args, **kwargs):
        qs = super(MyBookingsView, self).get_queryset(*args, **kwargs)
        user_profile = UserProfile.objects.get(pk=self.kwargs['host_pk'])
        qs = Inquiry.objects.filter(Q(listing__user_profile=user_profile) & Q(host_declined=False) & Q(deposit_paid=True))
        return qs

class MyPaymentsView(ListView):
    template_name = 'profiles/my_payments.html'
    model = Inquiry
    context_object_name = 'inquiries'
    paginate_by = 10

    def get_context_data(self, **kwargs):
        context = super(MyPaymentsView, self).get_context_data(**kwargs)
        get_copy = self.request.GET.copy()
        if get_copy.get('page'):
            get_copy.pop('page')
        context['get_copy'] = get_copy
        return context

    def get_queryset(self, *args, **kwargs):
        qs = super(MyPaymentsView, self).get_queryset(*args, **kwargs)
        user_profile = UserProfile.objects.get(pk=self.kwargs['host_pk'])
        qs = Inquiry.objects.filter(Q(listing__user_profile=user_profile) & Q(host_declined=False) & Q(deposit_paid=True)).order_by('-created_at')
        return qs

class MyInquiryArchiveView(ListView):
    template_name = 'profiles/my_inquiry_archive.html'
    model = Inquiry
    context_object_name = 'inquiries'
    paginate_by = 10

    def get_context_data(self, **kwargs):
        context = super(MyInquiryArchiveView, self).get_context_data(**kwargs)
        get_copy = self.request.GET.copy()
        if get_copy.get('page'):
            get_copy.pop('page')
        context['get_copy'] = get_copy
        return context

    def get_queryset(self, *args, **kwargs):
        qs = super(MyInquiryArchiveView, self).get_queryset(*args, **kwargs)
        user_profile = UserProfile.objects.get(pk=self.kwargs['pk'])
        qs = qs.filter(listing__user_profile=user_profile).order_by('-created_at')
        return qs

class MyTripsView(ListView):
    template_name = 'customers/my_trips.html'
    model = Inquiry
    context_object_name = 'inquiries'

    def get_queryset(self, *args, **kwargs):
        qs = super(MyTripsView, self).get_queryset(*args, **kwargs)
        customer = Customer.objects.get(pk=self.kwargs['customer_pk'])
        qs = Inquiry.objects.filter(Q(customer=customer) & Q(deposit_paid=True) & Q(host_declined=False) & Q(is_approved=True))
        return qs
    
    def get_context_data(self, **kwargs):
        context = super(MyTripsView, self).get_context_data(**kwargs)
        today = datetime.now().date
        context['today'] = today
        return context

class LeaveReview(FormMixin, DetailView):
    template_name = 'customers/leave_review.html'
    model = Inquiry
    context_object_name = 'inquiry'
    form_class = LeaveReviewForm

    def get_success_url(self):
        return reverse('listings:my_trips', kwargs={'customer_pk': self.request.user.get_customer_id() })


    def post(self, request, *args, **kwargs):
        form = self.get_form()
        if form.is_valid():
            instance = form.save(commit=False)
            instance.customer = Customer.objects.get(pk=self.request.user.get_customer_id())
            inquiry_pk = self.request.POST.get('inquiryID')
            listing_pk = self.request.POST.get('listingID')
            inquiry = Inquiry.objects.get(pk=inquiry_pk)
            listing = Listing.objects.get(pk=listing_pk)
            instance.listing = listing
            instance.inquiry = inquiry
            v_of_m = int(self.request.POST.get('rate1'))
            a_n_f = int(self.request.POST.get('rate2'))
            food = int(self.request.POST.get('rate3'))
            location = int(self.request.POST.get('rate4'))
            q_of_a = int(self.request.POST.get('rate5'))
            instance.value_for_money = v_of_m
            instance.accommodation_and_facilities = a_n_f
            instance.food = food
            instance.location = location
            instance.quality_of_activity = q_of_a
            total = (v_of_m + a_n_f + food + location + q_of_a) / 5
            instance.overall_rating = total
            instance.save()
            return self.form_valid(form)      
        else:
            return self.form_invalid(form)

class MyInvoicesView(ListView):
    template_name = 'profiles/my_invoices.html'
    model = Inquiry
    context_object_name = 'inquiries'
    paginate_by = 10

    def get_context_data(self, **kwargs):
        context = super(MyInvoicesView, self).get_context_data(**kwargs)
        get_copy = self.request.GET.copy()
        if get_copy.get('page'):
            get_copy.pop('page')
        context['get_copy'] = get_copy
        return context

    def get_queryset(self, *args, **kwargs):
        qs = super(MyInvoicesView, self).get_queryset(*args, **kwargs)
        user = self.request.user.get_profile()
        user_profile = UserProfile.objects.get(pk=user.pk)
        qs = qs.filter(Q(listing__user_profile=user_profile) & Q(host_declined=False) & Q(deposit_paid=True)).order_by('-created_at')
        return qs

class PaymentView(DetailView):
    template_name = 'customers/payment.html'
    model = Inquiry
    context_object_name = 'inquiry'


    def get_context_data(self, **kwargs):
        context = super(PaymentView, self).get_context_data(**kwargs)
        today = datetime.now()
        year = timedelta(days=365)
        yz = []
        for x in range(9):
            yz.append(today.year)
            today = today + year
        context['years'] = yz
        return context

def confirmationview(request, inquiry_pk):
    if request.method == "POST":
        inquiry = Inquiry.objects.get(pk=inquiry_pk)
        inquiry.paid_amount = inquiry.deposit_amount
        inquiry.deposit_paid = True
        inquiry.deposit_paid_date = datetime.now()
        inquiry.save()

    return HttpResponseRedirect(reverse('listings:payment_success', kwargs={'pk': inquiry_pk}))

class PaymentSuccessView(DetailView):
    template_name = 'customers/my_trips.html'
    model = Inquiry
    context_object_name = 'inquiry'

class MyReviews(ListView):
    template_name = 'profiles/reviews.html'
    model = Review
    context_object_name = 'reviews'
    paginate_by = 10

    def get_context_data(self, **kwargs):
        context = super(MyReviews, self).get_context_data(**kwargs)
        get_copy = self.request.GET.copy()
        if get_copy.get('page'):
            get_copy.pop('page')
        context['get_copy'] = get_copy
        return context

    def get_queryset(self, *args, **kwargs):
        qs = super(MyReviews, self).get_queryset(*args, **kwargs)
        user = self.request.user.get_profile()
        user_profile = UserProfile.objects.get(pk=user.pk)
        qs = Review.objects.filter(listing__user_profile = user_profile).order_by('-created_at')
        return qs

class RespondReview(UpdateView):
    template_name = 'profiles/respond_review.html'
    model = Review
    form_class = RespondReviewForm

    def get_success_url(self):
        return reverse('listings:my_reviews')

        
    def form_valid(self, form):
        self.object = form.save()
        
        return super(RespondReview, self).form_valid(form)
    
    def form_invalid(self, form):

        return self.render_to_response(
            self.get_context_data(form=form)
        )

class MyFavorites(ListView):
    template_name = 'customers/my_favorites.html'
    model = Listing
    context_object_name = 'listings'

    def get_context_data(self, **kwargs):
        context = super(MyFavorites, self).get_context_data(**kwargs)
        context['wish_list'] = Favorite.objects.filter(user_id=self.request.user).values_list('listing_id', flat=True)
        return context

    def get_queryset(self, *args, **kwargs):
        qs = super(MyFavorites, self).get_queryset(*args, **kwargs)
        qs = Listing.objects.filter(favorites__user = self.request.user)
        return qs

class MyCompareView(ListView):
    template_name = 'customers/compare.html'
    model = Listing
    context_object_name = 'listings'

    def get_context_data(self, **kwargs):
        context = super(MyCompareView, self).get_context_data(**kwargs)
        context['wish_list'] = Favorite.objects.filter(user_id=self.request.user).values_list('listing_id', flat=True)
        context['sorting'] = self.request.GET.get('sorting', '')
        return context

    def get_queryset(self, *args, **kwargs):
        qs = super(MyCompareView, self).get_queryset(*args, **kwargs)
        sorting = self.request.GET.get('sorting', '')
        if sorting == 'price':
            qs = Listing.objects.filter(favorites__user = self.request.user)
            unsorted_results = qs.all()
            sorted_results = sorted(unsorted_results, key=lambda t: t.get_lowest_package_price())
            qs = list(reversed(sorted_results))
        elif sorting == 'duration':
            qs = Listing.objects.filter(favorites__user = self.request.user).order_by('-program_duration')
        elif sorting == 'location':
            qs = Listing.objects.filter(favorites__user = self.request.user).order_by('-location')
        elif sorting == 'food':
            qs = Listing.objects.filter(favorites__user = self.request.user).order_by('-food')           
        elif sorting == 'quality_of_activity':
            qs = Listing.objects.filter(favorites__user = self.request.user).order_by('-quality_of_activity')       
        elif sorting == 'value_for_money':
            qs = Listing.objects.filter(favorites__user = self.request.user).order_by('-value_for_money')
        elif sorting == 'accommodation_and_facilities':
            qs = Listing.objects.filter(favorites__user = self.request.user).order_by('-accommodation_and_facilities')
        elif sorting == 'overall_rating':
            qs = Listing.objects.filter(favorites__user = self.request.user).order_by('-overall_rating')
        else:
            qs = Listing.objects.filter(favorites__user = self.request.user)
            unsorted_results = qs.all()
            sorted_results = sorted(unsorted_results, key=lambda t: t.get_lowest_package_price())
            qs = sorted_results
        return qs

@csrf_exempt
def favorite_add(request, id):
    listing = get_object_or_404(Listing, id=id)
    user = request.user
    favorited_item, created = Favorite.objects.get_or_create(listing=listing, user=user)
    if not created:
        favorited_item.delete()
    return HttpResponseRedirect(request.META['HTTP_REFERER'])

@csrf_exempt
def favorite_remove(request, id):
    listing = get_object_or_404(Listing, pk=id)
    user = request.user
    criterion1 = Q(user=user)
    criterion2 = Q(listing=listing)
    Favorite.objects.filter(criterion1 & criterion2).delete()
    return HttpResponseRedirect(request.META['HTTP_REFERER'])

def book_now(request, listing_id):
    if request.method == 'POST':
        package_id = request.POST.get('d-package-now')
        arrival = request.POST.get('d-arrival-now')
        price = request.POST.get('d-price-now')
        customer = Customer.objects.get(pk=request.user.get_customer_id())
        package = ListingPackage.objects.get(pk=package_id)
        listing = Listing.objects.get(pk=package.listing.id)
        arrival_date = datetime.strptime(arrival, "%Y-%m-%d").date()
        duration = listing.program_duration
        departure_date = arrival_date + timedelta(days=duration)
        number_of_people = package.number_of_people
        inquiry = Inquiry()
        inquiry.customer = customer
        inquiry.listing = listing
        inquiry.package = package
        inquiry.arrival_date = arrival_date
        inquiry.departure_date = departure_date
        try:
            req = CustomPriceRequest.objects.get(Q(package=package) & Q(start_date=arrival_date))
            total_price = req.price
            inquiry.req = req
        except:
            total_price = package.default_price
            inquiry.is_conditional = True
        inquiry.total_price = total_price
        inquiry.number_of_people = number_of_people
        inquiry.is_approved = True
        inquiry.commission_amount = listing.commission_percent
        inquiry.save()
        host = listing.user_profile
        msg = "You have been instantly booked for a reservation.\nPlease confirm the details with your guest.\nThank you."
        conversation = Conversation.objects.create(host=host, customer=customer, inquiry=inquiry)
        Messages.objects.create(content=msg, conversation=conversation, from_owner=True)
    return HttpResponseRedirect(reverse_lazy('listings:payment', kwargs={'pk': inquiry.pk}))

class DashboardListingView(ListView):
    template_name = 'owner/listings.html'
    model = Listing
    context_object_name = 'listings'
    paginate_by = 10

    def get_context_data(self, **kwargs):
        context = super(DashboardListingView, self).get_context_data(**kwargs)
        get_copy = self.request.GET.copy()
        if get_copy.get('page'):
            get_copy.pop('page')
        context['get_copy'] = get_copy
        context['page_title'] = 'Listings'
        return context

    def get_queryset(self, *args, **kwargs):
        qs = super(DashboardListingView, self).get_queryset(*args, **kwargs)
        qs = qs.order_by('-created_at')
        q1 = self.request.GET.get('flt')
        q2 = self.request.GET.get('search-term')
        if q2:
            qs = qs.filter(Q(title__icontains=q2) | Q(user_profile__business_name__icontains=q2) | Q(id__contains=q2))
            if q1 == 'id':
                qs = qs.order_by('-id')
            elif q1 == 'listing_name':
                qs = qs.order_by('title')
            elif q1 == 'host_name':
                qs = qs.order_by('user_profile__business_name')
            elif q1 == 'date':
                qs = qs.order_by('-created_at')
            elif q1 == 'commission':
                qs = qs.order_by('-commission_percent')
            elif q1 == 'price':
                qs = qs.order_by('-lowest_price')
            elif q1 == 'progress':
                qs = qs.order_by('-progress')
            elif q1 == 'status':
                qs = qs.order_by('is_verified')
        else:
            if q1 == 'id':
                qs = qs.order_by('-id')
            elif q1 == 'listing_name':
                qs = qs.order_by('title')
            elif q1 == 'host':
                qs = qs.order_by('host_name')
            elif q1 == 'date':
                qs = qs.order_by('-created_at')
            elif q1 == 'commission':
                qs = qs.order_by('-commission_percent')
            elif q1 == 'price':
                qs = qs.order_by('-lowest_price')
            elif q1 == 'progress':
                qs = qs.order_by('-progress')
            elif q1 == 'status':
                qs = qs.order_by('is_verified')
        return qs

class DashboardInquiriesView(ListView):
    template_name = 'owner/inquiries.html'
    model = Inquiry
    context_object_name = 'inquiries'
    paginate_by = 10

    def get_context_data(self, **kwargs):
        context = super(DashboardInquiriesView, self).get_context_data(**kwargs)
        get_copy = self.request.GET.copy()
        if get_copy.get('page'):
            get_copy.pop('page')
        context['get_copy'] = get_copy
        context['page_title'] = 'Inquiries'
        return context


    def get_queryset(self, *args, **kwargs):
        qs = super(DashboardInquiriesView, self).get_queryset(*args, **kwargs)
        qs = qs.order_by('-created_at')
        q1 = self.request.GET.get('flt')
        q2 = self.request.GET.get('search-term')
        if q2:
            qs = qs.filter(Q(customer__first_name__icontains=q2) | Q(customer__last_name__icontains=q2) | Q(id__contains=q2) | Q(host_name__icontains=q2))
            if q1 == 'id':
                qs = qs.order_by('-id')
            elif q1 == 'name':
                qs = qs.order_by('customer__first_name')
            elif q1 == 'host':
                qs = qs.order_by('host_name')
            elif q1 == 'date':
                qs = qs.order_by('-created_at')
            elif q1 == 'commission':
                qs = qs.order_by('-commission_amount')
            elif q1 == 'arrival':
                qs = qs.order_by('-arrival_date')
            elif q1 == 'status':
                qs = qs.order_by('status')
        else:
            if q1 == 'id':
                qs = qs.order_by('-id')
            elif q1 == 'name':
                qs = qs.order_by('customer__first_name')
            elif q1 == 'host':
                qs = qs.order_by('host_name')
            elif q1 == 'date':
                qs = qs.order_by('-created_at')
            elif q1 == 'commission':
                qs = qs.order_by('-commission_amount')
            elif q1 == 'arrival':
                qs = qs.order_by('-arrival_date')
            elif q1 == 'status':
                qs = qs.order_by('status')
        return qs

class DashboardVideosView(ListView):
    template_name = 'owner/videos.html'
    model = Videos
    context_object_name = 'videos'
    paginate_by = 10

    def get_context_data(self, **kwargs):
        context = super(DashboardVideosView, self).get_context_data(**kwargs)
        get_copy = self.request.GET.copy()
        if get_copy.get('page'):
            get_copy.pop('page')
        context['get_copy'] = get_copy
        context['page_title'] = 'Videos'
        return context

    def get_queryset(self, *args, **kwargs):
        qs = super(DashboardVideosView, self).get_queryset(*args, **kwargs)
        qs = qs.order_by('-created_at')
        q1 = self.request.GET.get('flt')
        q2 = self.request.GET.get('search-term')
        if q2:
            qs = qs.filter(Q(profile__business_name__icontains=q2) | Q(id__contains=q2))
            if q1 == 'id':
                qs = qs.order_by('-id')
            elif q1 == 'host_name':
                qs = qs.order_by('profile__business_name')
            elif q1 == 'size':
                qs = qs.order_by('-size')
            elif q1 == 'date':
                qs = qs.order_by('-created_at')
            elif q1 == 'status':
                qs = qs.order_by('approved')
        else:
            if q1 == 'id':
                qs = qs.order_by('-id')
            elif q1 == 'host_name':
                qs = qs.order_by('profile__business_name')
            elif q1 == 'size':
                qs = qs.order_by('-size')
            elif q1 == 'date':
                qs = qs.order_by('-created_at')
            elif q1 == 'status':
                qs = qs.order_by('approved')
        return qs

class DashboardReviewsView(ListView):
    template_name = 'owner/reviews.html'
    model = Review
    context_object_name = 'reviews'
    paginate_by = 10

    def get_context_data(self, **kwargs):
        context = super(DashboardReviewsView, self).get_context_data(**kwargs)
        get_copy = self.request.GET.copy()
        if get_copy.get('page'):
            get_copy.pop('page')
        context['get_copy'] = get_copy
        context['page_title'] = 'Reviews'
        return context

    def get_queryset(self, *args, **kwargs):
        qs = super(DashboardReviewsView, self).get_queryset(*args, **kwargs)
        qs = qs.order_by('-created_at')
        q1 = self.request.GET.get('flt')
        q2 = self.request.GET.get('search-term')
        if q2:
            qs = qs.filter(Q(listing__title__icontains=q2) | Q(customer__first_name__icontains=q2) | Q(customer__last_name__icontains=q2) | Q(listing__user_profile__business_name__icontains=q2) | Q(id__contains=q2))
            if q1 == 'id':
                qs = qs.order_by('-id')
            elif q1 == 'listing_name':
                qs = qs.order_by('listing__title')
            elif q1 == 'host_name':
                qs = qs.order_by('listing__user_profile__business_name')
            elif q1 == 'date':
                qs = qs.order_by('-created_at')
            elif q1 == 'customer':
                qs = qs.order_by('customer__first_name')
            elif q1 == 'overall':
                qs = qs.order_by('-overall_rating')
            elif q1 == 'status':
                qs = qs.order_by('-approved')
        else:
            if q1 == 'id':
                qs = qs.order_by('-id')
            elif q1 == 'listing_name':
                qs = qs.order_by('listing__title')
            elif q1 == 'host_name':
                qs = qs.order_by('listing__user_profile__business_name')
            elif q1 == 'date':
                qs = qs.order_by('-created_at')
            elif q1 == 'customer':
                qs = qs.order_by('customer__first_name')
            elif q1 == 'overall':
                qs = qs.order_by('-overall_rating')
            elif q1 == 'status':
                qs = qs.order_by('-approved')
        return qs

class DashboardStaffView(ListView):
    template_name = 'owner/staff.html'
    model = Staff
    context_object_name = 'staffs'
    paginate_by = 10

    def get_context_data(self, **kwargs):
        context = super(DashboardStaffView, self).get_context_data(**kwargs)
        get_copy = self.request.GET.copy()
        if get_copy.get('page'):
            get_copy.pop('page')
        context['get_copy'] = get_copy
        context['page_title'] = 'Staff'
        return context

    def get_queryset(self, *args, **kwargs):
        qs = super(DashboardStaffView, self).get_queryset(*args, **kwargs)
        qs = qs.order_by('-added_date')
        q1 = self.request.GET.get('flt')
        q2 = self.request.GET.get('search-term')
        if q2:
            qs = qs.filter(Q(host_organization__business_name__icontains=q2) | Q(first_name__icontains=q2) | Q(last_name__icontains=q2) | Q(email__icontains=q2) | Q(id__contains=q2))
            if q1 == 'id':
                qs = qs.order_by('-id')
            elif q1 == 'name':
                qs = qs.order_by('first_name')
            elif q1 == 'host_name':
                qs = qs.order_by('host_organization__business_name')
            elif q1 == 'date':
                qs = qs.order_by('-added_date')
            elif q1 == 'email':
                qs = qs.order_by('email')
            elif q1 == 'status':
                qs = qs.order_by('is_verified')
        else:
            if q1 == 'id':
                qs = qs.order_by('-id')
            elif q1 == 'name':
                qs = qs.order_by('first_name')
            elif q1 == 'host_name':
                qs = qs.order_by('host_organization__business_name')
            elif q1 == 'date':
                qs = qs.order_by('-added_date')
            elif q1 == 'email':
                qs = qs.order_by('email')
            elif q1 == 'status':
                qs = qs.order_by('is_verified')
        return qs

class DashboardFlagsView(ListView):
    template_name = 'owner/flags.html'
    model = Messages
    context_object_name = 'flags'
    paginate_by = 10

    def get_context_data(self, **kwargs):
        context = super(DashboardFlagsView, self).get_context_data(**kwargs)
        context['page_title'] = 'Flags'
        get_copy = self.request.GET.copy()
        if get_copy.get('page'):
            get_copy.pop('page')
        context['get_copy'] = get_copy
        return context

    def get_queryset(self, *args, **kwargs):
        qs = super(DashboardFlagsView, self).get_queryset(*args, **kwargs)
        qs = qs.filter(is_flagged=True)
        qs = qs.order_by('-created_at')
        q1 = self.request.GET.get('flt')
        q2 = self.request.GET.get('search-term')
        if q2:
            qs = qs.filter(Q(conversation__host__business_name__icontains=q2) | Q(conversation__customer__first_name__icontains=q2) | Q(conversation__customer__last_name__icontains=q2) | Q(conversation__id__icontains=q2) | Q(id__contains=q2))
            if q1 == 'id':
                qs = qs.order_by('-id')
            elif q1 == 'convo_id':
                qs = qs.order_by('-conversation__id')
            elif q1 == 'host_name':
                qs = qs.order_by('conversation__host__business_name')
            elif q1 == 'customer_name':
                qs = qs.order_by('conversation__customer__first_name')
            elif q1 == 'customer_last_name':
                qs = qs.order_by('conversation__customer__last_name')
            elif q1 == 'date':
                qs = qs.order_by('-created_at')
        else:
            if q1 == 'id':
                qs = qs.order_by('-id')
            elif q1 == 'convo_id':
                qs = qs.order_by('-conversation__id')
            elif q1 == 'host_name':
                qs = qs.order_by('conversation__host__business_name')
            elif q1 == 'customer_name':
                qs = qs.order_by('conversation__customer__first_name')
            elif q1 == 'customer_last_name':
                qs = qs.order_by('conversation__customer__last_name')
            elif q1 == 'date':
                qs = qs.order_by('created_at')
        return qs

class DashboardView(ListView):
    template_name = 'owner/dashboard.html'
    model = Inquiry
    context_object_name = 'inquiries'

    def get_context_data(self, **kwargs):
        context = super(DashboardView, self).get_context_data(**kwargs)
        context['page_title'] = 'Dashboard'
        net_revenue = Inquiry.objects.filter(Q(host_declined=False) & Q(deposit_paid=True)).aggregate(total=Sum('commission_amount'))
        context['approval_required'] = Listing.objects.filter(is_verified=False).count()
        context['unread_approval'] = Listing.objects.filter(viewed_by_admin=False).count()
        total = net_revenue.get('total')
        context['net_revenue'] = total
        today = datetime.today()
        start_date = datetime(year=today.year, month=today.month, day=today.day, hour=0, minute=0, second=0) # represents 00:00:00
        end_date = datetime(year=today.year, month=today.month, day=today.day, hour=23, minute=59, second=59) # represents 23:59:59
        inquiry_count = Inquiry.objects.filter(created_at__range=(start_date, end_date)).count()
        context['inquiries_today'] = inquiry_count
        page_hits = PageHits.objects.get(page='index')
        context['hits'] = page_hits.hits
        first = today.replace(day=1, hour=0, minute=0, second=0, tzinfo=timezone.get_default_timezone())

        context['flags'] = Messages.objects.filter(is_flagged=True).count()

        seven_months_start = first + dateutil.relativedelta.relativedelta(months=-7)
        seven_months_end = (seven_months_start + dateutil.relativedelta.relativedelta(months=1)) + dateutil.relativedelta.relativedelta(seconds=-1)
        context['seven'] = Inquiry.objects.filter(Q(host_declined=False) & Q(deposit_paid=True) & Q(created_at__range=(seven_months_start, seven_months_end))).aggregate(total=Sum('commission_amount')).get('total')

        six_months_start = first + dateutil.relativedelta.relativedelta(months=-6)
        six_months_end = (six_months_start + dateutil.relativedelta.relativedelta(months=1)) + dateutil.relativedelta.relativedelta(seconds=-1)
        context['six'] = Inquiry.objects.filter(Q(host_declined=False) & Q(deposit_paid=True) & Q(created_at__range=(six_months_start, six_months_end))).aggregate(total=Sum('commission_amount')).get('total')


        five_months_start = first + dateutil.relativedelta.relativedelta(months=-5)
        five_months_end = (five_months_start + dateutil.relativedelta.relativedelta(months=1)) + dateutil.relativedelta.relativedelta(seconds=-1)
        context['five'] = Inquiry.objects.filter(Q(host_declined=False) & Q(deposit_paid=True) & Q(created_at__range=(five_months_start, five_months_end))).aggregate(total=Sum('commission_amount')).get('total')

        four_months_start = first + dateutil.relativedelta.relativedelta(months=-4)
        four_months_end = (four_months_start + dateutil.relativedelta.relativedelta(months=1)) + dateutil.relativedelta.relativedelta(seconds=-1)
        context['four'] = Inquiry.objects.filter(Q(host_declined=False) & Q(deposit_paid=True) & Q(created_at__range=(four_months_start, four_months_end))).aggregate(total=Sum('commission_amount')).get('total')

        three_months_start = first + dateutil.relativedelta.relativedelta(months=-3)
        three_months_end = (three_months_start + dateutil.relativedelta.relativedelta(months=1)) + dateutil.relativedelta.relativedelta(seconds=-1)
        context['three'] = Inquiry.objects.filter(Q(host_declined=False) & Q(deposit_paid=True) & Q(created_at__range=(three_months_start, three_months_end))).aggregate(total=Sum('commission_amount')).get('total')

        two_months_start = first + dateutil.relativedelta.relativedelta(months=-2)
        two_months_end = (two_months_start + dateutil.relativedelta.relativedelta(months=1)) + dateutil.relativedelta.relativedelta(seconds=-1)
        context['two'] = Inquiry.objects.filter(Q(host_declined=False) & Q(deposit_paid=True) & Q(created_at__range=(two_months_start, two_months_end))).aggregate(total=Sum('commission_amount')).get('total')

        one_months_start = first + dateutil.relativedelta.relativedelta(months=-1)
        one_months_end = (one_months_start + dateutil.relativedelta.relativedelta(months=1)) + dateutil.relativedelta.relativedelta(seconds=-1)
        context['one'] = Inquiry.objects.filter(Q(host_declined=False) & Q(deposit_paid=True) & Q(created_at__range=(one_months_start, one_months_end))).aggregate(total=Sum('commission_amount')).get('total')
        last_month_start = first
        last_month_end = today
        monthly_total = Inquiry.objects.filter(Q(host_declined=False) & Q(deposit_paid=True) & Q(created_at__range=(last_month_start, last_month_end))).aggregate(total=Sum('commission_amount')).get('total')
        if not monthly_total:
            monthly_total = 1
        context['this_month'] = monthly_total
        # TODO: REMOVE THESE FOR TEST
        context['one'] = 520
        context['two'] = 320
        context['three'] = 250
        context['four'] = 200
        context['five'] = 190
        context['six'] = 300
        context['seven'] = 620
        # TODO: REMOVE THESE FOR TEST
        goal_obj = SalesGoal.objects.all().first()
        monthly_goal = goal_obj.monthly_goal
        yearly_goal = goal_obj.yearly_goal
        context['goal_obj'] = goal_obj
        try:
            context['monthly'] = monthly_total / monthly_goal * 100
        except Exception as e:
            context['monthly'] = 0
        try:
            context['yearly'] = total / yearly_goal * 100
        except Exception as e:
            context['yearly'] = 0


        listings = Listing.objects.filter(Q(is_verified=False) | Q(updated_after_approval=True))
        context['listings'] = listings
        unread_listings = listings.filter(viewed_by_admin=False).count()
        context['unread_listings'] = unread_listings
        reviews = Review.objects.filter(approved=False)
        context['reviews'] = reviews
        context['unread_reviews'] = reviews.filter(viewed_by_admin=False).count()
        videos = Videos.objects.filter(approved=False)
        context['videos'] = videos
        context['unread_videos'] = videos.filter(viewed_by_admin=False).count()
        staff = Staff.objects.filter(is_verified=False)
        context['staff'] = staff
        context['unread_staff'] = staff.filter(viewed_by_admin=False).count()
        recent_inquiries = Inquiry.objects.all().order_by('-id')[:16]
        context['recent_inquiries'] = recent_inquiries


        return context

    def get_queryset(self, *args, **kwargs):
        qs = super(DashboardView, self).get_queryset(*args, **kwargs)
        # qs = Listing.objects.filter(favorites__user = self.request.user)
        return qs

def view_listing(request, pk):
    listing = Listing.objects.get(pk=pk)
    listing.viewed_by_admin = True
    result = listing.get_admin_url()
    listing.save()
    return HttpResponseRedirect(result)

def approve_listing(request, pk):
    listing = Listing.objects.get(pk=pk)
    listing.is_verified = True
    listing.updated_after_approval = False
    listing.viewed_by_admin = True
    listing.updated_fields = ''
    listing.save()
    return HttpResponseRedirect(reverse('listings:dashboard-listings'))

def view_review(request, pk):
    review = Review.objects.get(pk=pk)
    review.viewed_by_admin = True
    result = review.get_admin_url()
    review.save()
    return HttpResponseRedirect(result)

def approve_review(request, pk):
    review = Review.objects.get(pk=pk)
    review.approved = True
    review.viewed_by_admin = True
    review.save()
    return HttpResponseRedirect(reverse('listings:dashboard-reviews'))

def approve_video(request, pk):
    video = Videos.objects.get(pk=pk)
    video.viewed_by_admin = True
    video.approved = True
    video.save()
    return HttpResponseRedirect(reverse('listings:dashboard-videos'))

def approve_staff(request, pk):
    staff = Staff.objects.get(pk=pk)
    staff.viewed_by_admin = True
    staff.is_verified = True
    staff.masked = True
    staff.save()
    return HttpResponseRedirect(reverse('listings:dashboard-staff'))

def approve_flag(request, pk):
    flag = Messages.objects.get(pk=pk)
    flag.is_flagged = False
    flag.save()
    return HttpResponseRedirect(reverse('listings:dashboard-flags'))

class BlogIndexView(ListView):
    template_name = 'blog/index.html'
    model = Post
    context_object_name = 'post'

    paginate_by = 14

    def get_context_data(self, **kwargs):
        context = super(BlogIndexView, self).get_context_data(**kwargs)
        context['featured'] =  Post.objects.filter(is_featured=True)[:5]
        get_copy = self.request.GET.copy()
        if get_copy.get('page'):
            get_copy.pop('page')
        context['get_copy'] = get_copy
        return context
    


    def get_queryset(self, *args, **kwargs):
        qs = super(BlogIndexView, self).get_queryset(*args, **kwargs)
        q1 = self.request.GET.get('search')
        if q1 == 'travel':
            return qs.filter(category__id=1).order_by('-created_at')
        elif q1 == 'personal':
            return qs.filter(category__id=3).order_by('-created_at')
        elif q1 == 'health':
            return qs.filter(category__id=4).order_by('-created_at')
        elif q1 == 'styles':
            return qs.filter(category__id=2).order_by('-created_at')
        elif q1 == 'lifestyle':
            return qs.filter(category__id=7).order_by('-created_at')
        elif q1 == 'science':
            return qs.filter(category__id=6).order_by('-created_at')
        return qs.order_by('-created_at')

class BlogDetailView(DetailView):
    template_name = 'blog/post-detail.html'
    model = Post
    context_object_name = 'post'

class BlogImagesView(FormMixin, ListView):
    template_name = 'owner/blog-images.html'
    model = BlogPhotos
    context_object_name = 'photos'
    form_class = BlogPhotoForm
    paginate_by = 10

    def get_context_data(self, **kwargs):
        context = super(BlogImagesView, self).get_context_data(**kwargs)
        get_copy = self.request.GET.copy()
        if get_copy.get('page'):
            get_copy.pop('page')
        context['get_copy'] = get_copy
        return context

    def post(self, request, *args, **kwargs):
        form = self.form_class(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect(reverse('listings:blog-images'))

def delete_photo(request, pk):
    BlogPhotos.objects.get(pk=pk).delete()
    return HttpResponseRedirect(reverse('listings:blog-images'))

#TODO: TEST PAYMENTSUCCESSVIEW

#TODO: FIX RANKING FORMULA AND SEARCH PARAMETERS ON MAIN PAGE
#TODO: CHECK NOTES TO CHANGE.txt
#TODO: WORK ON ICONS






#TODO: FINISH TESTING
#TODO: FIX EVERYTHING qs = Model.*** SINCE QS IS ALREADY THE MODEL! DON'T LOOKUP TWICE




#TODO: FIX POSTGRESQL
#TODO: UPLOAD AT LEAST 12 LISTINGS FROM 3 HOSTS

#TODO: FIX 404 PAGES

#TODO: ERROR 500 - 
#I also faced the same problem so the best and quickest solution is to remove this line:

# STATICFILES_STORAGE = 'whitenoise.django.GzipManifestStaticFilesStorage'

# and add this:

# STATICFILES_STORAGE =  'django.contrib.staticfiles.storage.StaticFilesStorage' 

# ALSO Make sure you aren't linking any non existing external file, like in my case I had few css files linked with my html but the actual files were deleted.

# TRY REMOVING DROPZONE.JS AND USING A CDN
# TRY TAKING DEBUG OFF AND LOOKING AT MISSING FILES