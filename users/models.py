from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.utils import timezone
from phone_field.models import PhoneField
from multiselectfield import MultiSelectField
from django_countries.fields import CountryField
from phone_field import PhoneField
from django.urls import reverse
from django.contrib.contenttypes.models import ContentType
import os

class UserManager(BaseUserManager):
    def _create_user(self, email, password, is_staff, is_superuser, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')
        now = timezone.now()
        email = self.normalize_email(email)
        user = self.model(
            email = email,
            is_staff = is_staff,
            is_active = True,
            is_superuser = is_superuser,
            last_login = now,
            date_joined = now,
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password, **extra_fields):
        user = self._create_user(email, password, False, False, **extra_fields)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, password, **extra_fields):
        user=self._create_user(email, password, True, True, **extra_fields)
        user.save(using=self._db)
        return user

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=254, unique=True)
    first_name = models.CharField(max_length=254, null=True, blank=True)
    last_name = models.CharField(max_length=254, null=True, blank=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    last_login = models.DateTimeField(null=True, blank=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    is_customer = models.BooleanField(default=False)
    is_host = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()

    def get_profile(self):
        if self.is_host:
            return self.profile
        else:
            return None
    
    def get_business_contacts(self):
        if self.is_host:
            return 

    def get_absolute_url(self):
        return "/users/%i/" % (self.pk)
    
    def get_customer_id(self):
        if self.is_customer:
            return self.customer.id

    def get_first_letter(self):
        name = self.first_name
        if name:
            return name[0]
        else:
            return ''

class Customer(models.Model):
    GENDER_CHOICES = (
        (1, 'Male'),
        (2, 'Female')
    )
    LANG_CHOICES = (
        (1, 'English'),
        (2, 'German'),
        (3, 'French'),
        (4, 'Dutch'),
        (5, 'Spanish')
    )
    owner_notes = models.TextField(blank=True, null=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True, related_name='customer')
    first_name = models.CharField(max_length=200, null=True, blank=True)
    last_name = models.CharField(max_length=200, null=True, blank=True)
    gender = models.IntegerField(choices=GENDER_CHOICES, null=True, blank=True)
    dob = models.DateField(blank=True, null=True)
    language = models.IntegerField(choices=LANG_CHOICES, default=1)
    country = CountryField(null=True, blank=True)
    about = models.TextField(blank=True, null=True)
    country_code = models.CharField(max_length=50, null=True, blank=True)
    phone = PhoneField(blank=True, null=True)



    def get_admin_url(self):
        content_type = ContentType.objects.get_for_model(self.__class__)
        return reverse("admin:%s_%s_change" % (content_type.app_label, content_type.model), args=(self.id,))
        

    def get_full_name(self):
        full_name = self.first_name + ' ' + self.last_name
        return full_name





class UserProfile(models.Model):
    PAYMENT_CHOICES = (
        (1, 'Mastercard'),
        (2, 'VISA'),
        (3, 'AMEX'),
        (3, 'Bank Transfer'),
        (4, 'Cash'),
        (5, 'Paypal'),
        (6, 'Wise'),
        (6, 'Travelers Checks')
    )
    PAYOUT_CHOICES = (
        (1, 'Wise'),
        (2, 'Bank Transfer')
    )
    CURRENCY_CHOICES = (
        (1, 'USD'),
        (2, 'CAD'),
        (3, 'EUR'),
        (4, 'JPY'),
        (5, 'GBP'),
        (6, 'AUD'),
    )

    # Fields if profile is BUSINESS
    owner_notes = models.TextField(blank=True, null=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True, related_name='profile')
    place_id = models.CharField(max_length=255, null=True, blank=True)
   
    business_name = models.CharField(max_length=250, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    featured_photo = models.ImageField(upload_to='media/profile/images/', null=True, blank=True)
    is_business = models.BooleanField(default=False) # Is it a business or is it personal
    url = models.URLField(max_length=200, blank=True, null=True)
    registered_name = models.CharField(max_length=250, null=True, blank=True)
    registration_number = models.CharField(max_length=250, null=True, blank=True)
    registration_file = models.FileField(upload_to='media/profile/business-registration/', null=True, blank=True)
    expiration_date = models.DateField(null=True, blank=True)
    
    business_street_and_number = models.CharField(max_length=250, null=True, blank=True)
    business_city = models.CharField(max_length=250, null=True, blank=True)
    business_zip = models.CharField(max_length=10, null=True, blank=True)
    business_state = models.CharField(max_length=250, null=True, blank=True)
    business_country = CountryField(null=True, blank=True)
    
    contact_first_name = models.CharField(max_length=250, null=True, blank=True)
    contact_last_name = models.CharField(max_length=250, null=True, blank=True)
    contact_phone = PhoneField(blank=True, null=True)
    contact_email = models.EmailField(blank=True, null=True)

    owner_first_name = models.CharField(max_length=250, null=True, blank=True)
    owner_middle_name = models.CharField(max_length=250, null=True, blank=True)
    owner_last_name = models.CharField(max_length=250, null=True, blank=True)
    owner_dob = models.DateField(blank=True, null=True)
    owner_phone = PhoneField(blank=True, null=True)
    owner_email = models.EmailField(blank=True, null=True)
    owner_license = models.FileField(upload_to='media/profile/licenses/', null=True, blank=True)


    # Fields if profile is INDIVIDUAL
    personal_first_name = models.CharField(max_length=250, null=True, blank=True)
    personal_middle_name = models.CharField(max_length=250, null=True, blank=True)
    personal_last_name = models.CharField(max_length=250, null=True, blank=True)
    personal_dob = models.DateField(blank=True, null=True)
    personal_passport_number = models.CharField(max_length=50, null=True, blank=True)
    personal_passport_copy = models.FileField(upload_to='media/profile/passports/', null=True, blank=True)
    personal_passport_expiry = models.DateField(blank=True, null=True)
    personal_street_and_number = models.CharField(max_length=250, null=True, blank=True)
    personal_city = models.CharField(max_length=250, null=True, blank=True)
    personal_zip = models.CharField(max_length=10, null=True, blank=True)
    personal_state = models.CharField(max_length=250, null=True, blank=True)
    personal_country = CountryField(null=True, blank=True)
    personal_email = models.EmailField(blank=True, null=True)
    personal_phone = PhoneField(blank=True, null=True)
    personal_social = models.CharField(max_length=250, null=True, blank=True)

    # Payment fields
    supported_payments = MultiSelectField(choices=PAYMENT_CHOICES, blank=True, null=True)
    payout_method = models.IntegerField(choices=PAYOUT_CHOICES, blank=True, null=True)
    wise_account = models.CharField(max_length=250, null=True, blank=True)
    bank_country = CountryField(blank=True, null=True)
    bank_currency = models.IntegerField(choices=CURRENCY_CHOICES, null=True, blank=True)
    bank_name = models.CharField(max_length=250, blank=True, null=True)
    bank_routing_number = models.CharField(max_length=250, blank=True, null=True)
    bank_account_number = models.CharField(max_length=250, blank=True, null=True)
    beneficiary_name = models.CharField(max_length=250, null=True, blank=True)
    bank_swift_number = models.CharField(max_length=250, null=True, blank=True)
    bank_id = models.CharField(max_length=250, null=True, blank=True)
    bank_branch_id = models.CharField(max_length=250, null=True, blank=True)


    def has_accommodations(self):
        return self.accommodation_set.all()

    def has_rooms(self):
        accs = self.accommodation_set.all()
        for acc in accs:
            if acc.rooms.all():
                print(acc.rooms)
                return True
        return False

    def get_admin_url(self):
        content_type = ContentType.objects.get_for_model(self.__class__)
        return reverse("admin:%s_%s_change" % (content_type.app_label, content_type.model), args=(self.id,))
        
    def __str__(self):
        return self.business_name
    
    def get_contacts(self):
        return self.contacts

    def count_listings(self):
        return self.listings.count()

class BusinessContacts(models.Model):
    GENDER_CHOICES = (
        (1, 'Male'),
        (2, 'Female')
    )
    profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='contacts')
    first_name = models.CharField(max_length=250, null=True, blank=True)
    last_name = models.CharField(max_length=250, null=True, blank=True)
    gender = models.IntegerField(choices=GENDER_CHOICES, null=True, blank=True)
    email = models.CharField(max_length=250, null=True, blank=True)
    country_code = models.CharField(max_length=5, null=True, blank=True)
    phone = PhoneField(null=True, blank=True)
    skype = models.CharField(max_length=250, blank=True, null=True)
    

class Certificates(models.Model):
    profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    association = models.CharField(max_length=250, null=True, blank=True)
    number = models.CharField(max_length=250, null=True, blank=True)
    file = models.FileField(upload_to='media/profile/certificates/', null=True, blank=True)
    expiry = models.DateField(null=True, blank=True)
    is_verified = models.BooleanField(default=False)

