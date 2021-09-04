from typing import List
from listings.models import *
from users.models import BusinessContacts, Customer, UserProfile
from django import forms
from ckeditor.widgets import CKEditorWidget
from multiselectfield import MultiSelectFormField
from allauth.account.forms import ChangePasswordForm
from datetime import datetime, timedelta, date
from django.db.models import Q
from listings.widgets import RangeInput
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Field
from ckeditor.widgets import CKEditorWidget
from django.core.validators import MaxValueValidator, MinValueValidator

class DateInput(forms.DateInput):
    input_type = 'date'

class CustomPasswordForm(ChangePasswordForm):
    def __init__(self, *args, **kwargs):
        super(CustomPasswordForm, self).__init__(*args, **kwargs)
        self.fields['oldpassword'].widget = forms.PasswordInput(attrs={'class': 'form-control'})
        self.fields['password1'].widget = forms.PasswordInput(attrs={'class': 'form-control'})
        self.fields['password2'].widget = forms.PasswordInput(attrs={'class': 'form-control'})


class TitleModelForm(forms.ModelForm):
    class Meta:
        model = Listing
        fields = ('yoga_style', 'url', 'brochure', 'title', 'tagline', 'header', 'introduction', 'highlights', 'private_groups', 'clean_and_safe', 'safety_checklist', 'health_hygiene', 'updated_fields')

    def save(self, *args, **kwargs):
        kwargs['commit'] = False
        listing = Listing.objects.get(pk=self.instance.pk)
        old_fields = listing.updated_fields
        obj = super(TitleModelForm, self).save(*args, **kwargs)
        if self.has_changed():
            changed_fields = ' '.join(self.changed_data)
            fixed_changed_fields = old_fields + ' ' + changed_fields.replace('updated_fields','') 
            fixed_changed_fields_list = list(fixed_changed_fields.split(" "))
            unique_changes = set(fixed_changed_fields_list)
            new_fields = ' '.join(unique_changes)
            obj.updated_fields = new_fields
            # obj.updated_fields = old_fields + ' ' + fixed_changed_fields
        obj.save()
        return obj

class SendMessageForm(forms.ModelForm):
    class Meta:
        model = Messages
        fields = ['content', 'conversation']
        widgets= {'conversation': forms.HiddenInput()}

class RankingForm(forms.ModelForm):
    class Meta:
        model = Listing
        fields = ['commission_percent', 'updated_fields']
        widgets = {'commission_percent':RangeInput(attrs={'oninput': 'updateLabel();', 'min': 14, 'max': 100})}

    def save(self, *args, **kwargs):
        kwargs['commit'] = False
        listing = Listing.objects.get(pk=self.instance.pk)
        old_fields = listing.updated_fields
        obj = super(RankingForm, self).save(*args, **kwargs)
        if self.has_changed():
            changed_fields = ' '.join(self.changed_data)
            fixed_changed_fields = old_fields + ' ' + changed_fields.replace('updated_fields','') 
            fixed_changed_fields_list = list(fixed_changed_fields.split(" "))
            unique_changes = set(fixed_changed_fields_list)
            new_fields = ' '.join(unique_changes)
            obj.updated_fields = new_fields
        obj.save()
        return obj

class ModifyInquiryForm(forms.ModelForm):
    class Meta:
        model = Inquiry
        fields = ['arrival_date', 'departure_date', 'package', 'total_price']
        widgets = {'arrival_date': DateInput(), 'departure_date': DateInput()}

    def __init__(self, *args, **kwargs):
        super(ModifyInquiryForm, self).__init__(*args, **kwargs)
        for visible in self.visible_fields():
            visible.field.widget.attrs['class'] = 'form-control'
        # self.fields['package'].queryset = ListingPackage.objects.filter(listing_user_profile=self.request.user.get_profile)

class LeaveReviewForm(forms.ModelForm):
    class Meta:
        model = Review
        fields = ['positive_info', 'negative_info']

class RespondReviewForm(forms.ModelForm):
    class Meta:
        model = Review
        fields = ['host_response']

class PackageUpdateForm(forms.Form):
    default_price = forms.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(20000)])
    price_calculation = forms.CharField(widget = CKEditorWidget())

    def __init__(self, *args, **kwargs):
        super(PackageUpdateForm, self).__init__(*args, **kwargs)
        for visible in self.visible_fields():
            visible.field.widget.attrs['class'] = 'form-control'

class InquiryForm(forms.ModelForm):
    message = forms.CharField(max_length=200, widget=forms.TextInput({}), required=False)
    def __init__(self, *args, **kwargs):
        super(InquiryForm, self).__init__(*args, **kwargs)
        for visible in self.visible_fields():
            visible.field.widget.attrs['class'] = 'form-control'

    class Meta:
        model = Inquiry
        fields = ['phone_number']
    
class ModifyConditionsForm(forms.ModelForm):
    class Meta:
        model = Inquiry
        fields = ['to_be_paid', 'number_of_days_before_arrival']

    def __init__(self, *args, **kwargs):
        super(ModifyConditionsForm, self).__init__(*args, **kwargs)
        for visible in self.visible_fields():
            visible.field.widget.attrs['class'] = 'form-control'

class LocationModelForm(forms.ModelForm):
    class Meta:
        model = Listing
        fields = ('country', 'address', 'location_info', 'accomodation_info', 'updated_fields')
        widgets = { 'address': forms.TextInput(attrs={'size': 60})}

    def save(self, *args, **kwargs):
        kwargs['commit'] = False
        listing = Listing.objects.get(pk=self.instance.pk)
        old_fields = listing.updated_fields
        obj = super(LocationModelForm, self).save(*args, **kwargs)
        if self.has_changed():
            changed_fields = ' '.join(self.changed_data)
            fixed_changed_fields = old_fields + ' ' + changed_fields.replace('updated_fields','') 
            fixed_changed_fields_list = list(fixed_changed_fields.split(" "))
            unique_changes = set(fixed_changed_fields_list)
            new_fields = ' '.join(unique_changes)
            obj.updated_fields = new_fields
        obj.save()
        return obj

class ArrivalModelForm(forms.ModelForm):
    class Meta:
        model = Listing
        fields = ('checkin_time', 'checkout_time', 'spoken_languages', 'airport_code', 'airport_shuttle', 'airport_shuttle_cost', 'airport_info', 'hosts', 'updated_fields')
        widgets = { 'checkin_time': forms.TimeInput(attrs={'type': 'time'}), 'checkout_time': forms.TimeInput(attrs={'type': 'time'}) }
    
    def __init__(self, user_obj, *args, **kwargs):
        super(ArrivalModelForm, self).__init__(*args, **kwargs)
        profile = UserProfile.objects.get(user_id = user_obj)
        self.fields['hosts'].queryset = Staff.objects.filter(host_organization_id=profile.id).filter(is_host=True)

    def save(self, *args, **kwargs):
        kwargs['commit'] = False
        listing = Listing.objects.get(pk=self.instance.pk)
        old_fields = listing.updated_fields
        obj = super(ArrivalModelForm, self).save(*args, **kwargs)
        if self.has_changed():
            changed_fields = ' '.join(self.changed_data)
            fixed_changed_fields = old_fields + ' ' + changed_fields.replace('updated_fields','') 
            fixed_changed_fields_list = list(fixed_changed_fields.split(" "))
            unique_changes = set(fixed_changed_fields_list)
            new_fields = ' '.join(unique_changes)
            obj.updated_fields = new_fields
        obj.save()
        return obj

class StaffUpdateModelForm(forms.ModelForm):
    class Meta:
        model = Staff
        fields = ('first_name', 'last_name', 'email', 'gender', 'phone', 'skype', 'bio', 'portrait', 'featured_portrait', 'is_host', 'is_instructor')

    
class FoodModelForm(forms.ModelForm):
    class Meta:
        model = Listing
        fields = ('meals', 'foods', 'drinks', 'food_info', 'updated_fields')

    def save(self, *args, **kwargs):
        kwargs['commit'] = False
        listing = Listing.objects.get(pk=self.instance.pk)
        old_fields = listing.updated_fields
        obj = super(FoodModelForm, self).save(*args, **kwargs)
        if self.has_changed():
            changed_fields = ' '.join(self.changed_data)
            fixed_changed_fields = old_fields + ' ' + changed_fields.replace('updated_fields','') 
            fixed_changed_fields_list = list(fixed_changed_fields.split(" "))
            unique_changes = set(fixed_changed_fields_list)
            new_fields = ' '.join(unique_changes)
            obj.updated_fields = new_fields
        obj.save()
        return obj

class RequireModelForm(forms.ModelForm):
    class Meta:
        model = Listing
        fields = ('instruction_language', 'skill_level', 'child_allowed', 'min_age', 'max_age', 'updated_fields')

    def save(self, *args, **kwargs):
        kwargs['commit'] = False
        listing = Listing.objects.get(pk=self.instance.pk)
        old_fields = listing.updated_fields
        obj = super(RequireModelForm, self).save(*args, **kwargs)
        if self.has_changed():
            changed_fields = ' '.join(self.changed_data)
            fixed_changed_fields = old_fields + ' ' + changed_fields.replace('updated_fields','') 
            fixed_changed_fields_list = list(fixed_changed_fields.split(" "))
            unique_changes = set(fixed_changed_fields_list)
            new_fields = ' '.join(unique_changes)
            obj.updated_fields = new_fields
        obj.save()
        return obj

class ProgramModelForm(forms.ModelForm):
    class Meta:
        model = Listing
        fields = ('program_duration', 'max_group_size', 'min_group_size', 'itinerary_info', 'excursion_info', 'instructors', 'instruction_duration', 'updated_fields')
    
    def __init__(self, user_obj, *args, **kwargs):
        super(ProgramModelForm, self).__init__(*args, **kwargs)
        profile = UserProfile.objects.get(user_id = user_obj)
        self.fields['instructors'].queryset = Staff.objects.filter(host_organization_id=profile.id).filter(is_instructor=True)

    def save(self, *args, **kwargs):
        kwargs['commit'] = False
        listing = Listing.objects.get(pk=self.instance.pk)
        old_fields = listing.updated_fields
        obj = super(ProgramModelForm, self).save(*args, **kwargs)
        if self.has_changed():
            changed_fields = ' '.join(self.changed_data)
            fixed_changed_fields = old_fields + ' ' + changed_fields.replace('updated_fields','') 
            fixed_changed_fields_list = list(fixed_changed_fields.split(" "))
            unique_changes = set(fixed_changed_fields_list)
            new_fields = ' '.join(unique_changes)
            obj.updated_fields = new_fields
        obj.save()
        return obj

class VideoModelForm(forms.ModelForm):
    class Meta:
        model = Videos
        fields = ('listings',)

    def __init__(self, user_obj, *args, **kwargs):
        super(VideoModelForm, self).__init__(*args, **kwargs)
        profile = UserProfile.objects.get(user_id = user_obj)
        self.fields['listings'].queryset = Listing.objects.filter(user_profile_id=profile.id)
 

class PricingModelForm(forms.ModelForm):
    class Meta:
        model = Listing
        fields = ('included_info', 'not_included_info', 'availability_info', 'updated_fields')

    def save(self, *args, **kwargs):
        kwargs['commit'] = False
        listing = Listing.objects.get(pk=self.instance.pk)
        old_fields = listing.updated_fields
        obj = super(PricingModelForm, self).save(*args, **kwargs)
        if self.has_changed():
            changed_fields = ' '.join(self.changed_data)
            fixed_changed_fields = old_fields + ' ' + changed_fields.replace('updated_fields','') 
            fixed_changed_fields_list = list(fixed_changed_fields.split(" "))
            unique_changes = set(fixed_changed_fields_list)
            new_fields = ' '.join(unique_changes)
            obj.updated_fields = new_fields
        obj.save()
        return obj

class ExtraModelForm(forms.ModelForm):
    class Meta:
        model = Listing
        fields = ('extra_payment_todo_info', 'spa_treament_info', 'know_before_you_go', 'updated_fields')

    def save(self, *args, **kwargs):
        kwargs['commit'] = False
        listing = Listing.objects.get(pk=self.instance.pk)
        old_fields = listing.updated_fields
        obj = super(ExtraModelForm, self).save(*args, **kwargs)
        if self.has_changed():
            changed_fields = ' '.join(self.changed_data)
            fixed_changed_fields = old_fields + ' ' + changed_fields.replace('updated_fields','') 
            fixed_changed_fields_list = list(fixed_changed_fields.split(" "))
            unique_changes = set(fixed_changed_fields_list)
            new_fields = ' '.join(unique_changes)
            obj.updated_fields = new_fields
        obj.save()
        return obj

class PhotoModelForm(forms.ModelForm):
    class Meta:
        model = Listing
        fields = ('title',)



class BlogPhotoForm(forms.ModelForm):
    class Meta:
        model = BlogPhotos
        fields = ('image',)

class BookingConditionsModelForm(forms.ModelForm):
    class Meta:
        model = Listing
        fields = ('remainder_due', 'days_to_pay')

class AccommodationModelForm(forms.ModelForm):
    class Meta:
        model = Accommodation
        fields = ('type', 'category_private_unit', 'category_multiple_units', 'name')

class AccommodationFacilitiesModelForm(forms.ModelForm):
    class Meta:
        model = Accommodation
        fields = ('facilities',)


class AccommodationDescriptionModelForm(forms.ModelForm):
    class Meta:
        model =Accommodation
        fields = ('name', 'description')


class RoomTypeModelForm(forms.ModelForm):
    class Meta:
        model = Room
        fields = ('type', 'name', 'shared', 'max_occupancy')

class RoomFacilitiesModelForm(forms.ModelForm):
    class Meta:
        model = Room
        fields = ('facilities',)

class RoomDescriptionModelForm(forms.ModelForm):
    class Meta:
        model = Room
        fields = ('description', 'name')

class CountrySelectModelForm(forms.ModelForm):
    class Meta:
        model = Listing
        fields = ('country', 'instruction_language', 'url', 'brochure')


class ProfilePageModelForm(forms.ModelForm):
    class Meta:
        model = UserProfile
        fields = ('business_name', 'description', 'featured_photo', 'place_id')




class BusinessInfoModelForm(forms.ModelForm):
    class Meta:
        model = UserProfile
        fields = ('url', 'registered_name', 'registration_number', 'registration_file', 'expiration_date', 'business_street_and_number', 'business_city', 'business_zip', 'business_state', 'business_country', 'contact_first_name', 'contact_last_name', 'contact_phone', 'contact_email', 'owner_first_name', 'owner_middle_name', 'owner_last_name', 'owner_dob', 'owner_phone', 'owner_email', 'owner_license')
        widgets = {
            'expiration_date': DateInput(),
            'owner_dob': DateInput(),
            'personal_dob': DateInput(),
            'personal_passport_expiry': DateInput()
        }

class PersonalInfoModelForm(forms.ModelForm):
    class Meta:
        model = UserProfile
        fields = ('url', 'personal_first_name', 'personal_middle_name', 'personal_last_name', 'personal_dob', 'personal_passport_number', 'personal_passport_copy', 'personal_passport_expiry', 'personal_street_and_number', 'personal_city', 'personal_zip', 'personal_state', 'personal_country', 'personal_email', 'personal_phone', 'personal_social')
        widgets = {
                'personal_dob': DateInput(),
                'personal_passport_expiry': DateInput()
        }


class PaymentInfoModelForm(forms.ModelForm):
    class Meta:
        model = UserProfile
        fields = ('supported_payments', 'payout_method', 'bank_country' ,'wise_account', 'bank_currency', 'bank_name', 'bank_routing_number', 'bank_account_number', 'beneficiary_name', 'bank_swift_number', 'bank_id', 'bank_branch_id')



class MainProfileForm(forms.ModelForm):
    class Meta:
        model = Customer
        fields = ('first_name', 'last_name', 'gender', 'dob', 'language', 'country', 'about')
        widgets = {
                'dob': DateInput(),
        }