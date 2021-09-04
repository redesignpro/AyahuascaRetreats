from allauth.socialaccount.forms import SignupForm
from allauth.account.forms import SignupForm as EmailSignUpForm
from allauth.account.forms import LoginForm
from django import forms
from datetime import datetime, timedelta, date
from .models import *
from listings.models import *
from django.db.models import Q


class InquirySignupForm(EmailSignUpForm):
    first_name = forms.CharField(max_length=100)
    last_name = forms.CharField(max_length=100)
    phone_number = forms.CharField(max_length=100)

    
    def __init__(self, *args, **kwargs):
        super(InquirySignupForm, self).__init__(*args, **kwargs)
        for visible in self.visible_fields():
            visible.field.widget.attrs['class'] = 'form-control'

    class Meta:
        model = User

    def save(self, request):
        user = super(InquirySignupForm, self).save(request)
        print('entered')
        if request.method in ('POST', 'PUT'):
            print('inif')
            arrival_date = request.POST.get('d-arrival')
            listing_id = request.POST.get('d-listing')
            listing = Listing.objects.get(pk=listing_id)
            package_id = request.POST.get('d-package')
            package = ListingPackage.objects.get(pk=package_id)
            number_of_people = package.number_of_people
            duration = listing.program_duration
            arrival_date = datetime.datetime.strptime(arrival_date, "%m/%d/%Y").date()
            departure_date = arrival_date + timedelta(days=duration)
            
            start = arrival_date
            end = departure_date

            

            first_name = self.cleaned_data['first_name']
            last_name = self.cleaned_data['last_name']
            phone = self.cleaned_data['phone_number']
            user.is_customer = True
            customer = Customer()
            customer.user = user
            customer.first_name = first_name
            customer.last_name = last_name
            customer.phone = phone
            customer.save()
            user.save()
            inquiry = Inquiry()
            inquiry.phone_number = phone
            inquiry.customer = customer
            inquiry.listing = listing
            inquiry.package = package
            inquiry.arrival_date = start
            inquiry.departure_date = end
            try:
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
            msg = "Hi,\nIs there availability for the selected dates?\nThank you."
            conversation = Conversation.objects.create(host=host, customer=customer, inquiry=inquiry)
            Messages.objects.create(content=msg, conversation=conversation)      

            

        return user


class CustomEmailSignupForm(EmailSignUpForm):
    first_name = forms.CharField(max_length=100)
    last_name = forms.CharField(max_length=100)
    
    def __init__(self, *args, **kwargs):
        super(CustomEmailSignupForm, self).__init__(*args, **kwargs)
        for visible in self.visible_fields():
            visible.field.widget.attrs['class'] = 'form-control'

    class Meta:
        model = User

    def save(self, request):
        user = super(CustomEmailSignupForm, self).save(request)

        first_name = self.cleaned_data['first_name']
        last_name = self.cleaned_data['last_name']

        user.is_customer = True
        customer = Customer()
        customer.user = user
        customer.first_name = first_name
        customer.last_name = last_name
        customer.save()

        user.save()
        return user



class CustomSignupForm(SignupForm):
    # CHOICES=[('client','Client'),('host','Host')]
    # user_type = forms.CharField(widget=forms.Select(choices=CHOICES))

    class Meta:
        model = User

    def save(self, request):
        user = super(CustomSignupForm, self).save(request)
        user.is_customer = True
        customer = Customer()
        customer.user = user
        customer.first_name = user.first_name
        customer.last_name = user.last_name
        customer.save()
        # selected_type = self.cleaned_data['user_type']
        # if selected_type == 'client':
        #     user.is_customer = True
        # elif selected_type == 'host':
        #     user.is_host = True
        #     profile = UserProfile()
        #     profile.owner_email = user.email
        #     profile.contact_email = user.email
        #     profile.contact_first_name = user.first_name
        #     profile.contact_last_name = user.last_name
        #     profile.personal_first_name = user.first_name
        #     profile.personal_last_name = user.last_name
        #     profile.owner_first_name = user.first_name
        #     profile.owner_last_name = user.last_name
        #     profile.business_name = user.first_name + ' ' + user.last_name
        #     profile.save()
        user.save()
        return user


class BusinessEmailSignupForm(EmailSignUpForm):
    business_name = forms.CharField(max_length=250)
    first_name = forms.CharField(max_length=100)
    last_name = forms.CharField(max_length=100)
    


    def __init__(self, *args, **kwargs):
        super(BusinessEmailSignupForm, self).__init__(*args, **kwargs)
        for visible in self.visible_fields():
            visible.field.widget.attrs['class'] = 'form-control'

    class Meta:
        model = User
    
    def save(self, request):
        user = super(BusinessEmailSignupForm, self).save(request)
        user.first_name = self.cleaned_data['first_name']
        user.last_name = self.cleaned_data['last_name']
        user.is_host = True
        profile = UserProfile()
        profile.user = user
        profile.owner_email = user.email
        profile.contact_email = user.email
        profile.contact_first_name = user.first_name
        profile.contact_last_name = user.last_name
        profile.personal_first_name = user.first_name
        profile.personal_last_name = user.last_name
        profile.owner_first_name = user.first_name
        profile.owner_last_name = user.last_name
        profile.business_name = self.cleaned_data['business_name']
        profile.save()
        user.save()
        return user


class CustomerEmailSignupForm(EmailSignUpForm):
    first_name = forms.CharField(max_length=100)
    last_name = forms.CharField(max_length=100)
    
    def __init__(self, *args, **kwargs):
        super(CustomerEmailSignupForm, self).__init__(*args, **kwargs)
        for visible in self.visible_fields():
            visible.field.widget.attrs['class'] = 'form-control'
    class Meta:
        model = User
    
    def save(self, request):
        user = super(CustomerEmailSignupForm, self).save(request)
        user.first_name = self.cleaned_data['first_name']
        user.last_name = self.cleaned_data['last_name']
        user.is_customer = True
        customer = Customer()
        customer.user = user
        customer.first_name = user.first_name
        customer.last_name = user.last_name
        customer.save()
        user.save()
        return user

class CoreLoginForm(LoginForm):
    def __init__(self, *args, **kwargs):
        super(CoreLoginForm, self).__init__(*args, **kwargs)
        for visible in self.visible_fields():
            visible.field.widget.attrs['class'] = 'form-control'


