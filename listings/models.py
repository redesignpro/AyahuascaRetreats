import datetime
from django.db import models
from django.db.models.fields import BooleanField, TextField
from users.models import UserProfile
from ckeditor.fields import RichTextField
from django.db.models.fields.related import ManyToManyField
from multiselectfield import MultiSelectField
from phone_field import PhoneField
from django.core.validators import MaxValueValidator, MinValueValidator
from django_countries.fields import CountryField
from django.db.models import Q
from django.urls import reverse
from django.contrib.contenttypes.models import ContentType
import re
from django.template.defaultfilters import slugify
from PIL import Image, ImageOps, ImageDraw
from io import BytesIO
import numpy as np
from django.core.files import File
import random
import string
from django.utils.timezone import make_aware
from users.models import *


def random_string_generator(size=10, chars=string.ascii_lowercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))

# Accommodation Models
def unique_slug_generator(instance, new_slug=None):
    """
    This is for a Django project and it assumes your instance 
    has a model with a slug field and a title character (char) field.
    """
    if new_slug is not None:
        slug = new_slug
    else:
        slug = slugify(instance.title)

    Klass = instance.__class__
    qs_exists = Klass.objects.filter(slug=slug).exists()
    if qs_exists:
        new_slug = "{slug}-{randstr}".format(
                    slug=slug,
                    randstr=random_string_generator(size=4)
                )
        return unique_slug_generator(instance, new_slug=new_slug)
    return slug




class Staff(models.Model):
    GENDER_CHOICES = (
        (1, 'Male'),
        (2, 'Female')
    )
    is_verified = models.BooleanField(default=False)
    first_name = models.CharField(max_length=100, blank=False, null=False)
    last_name = models.CharField(max_length=100, blank=False, null=False)
    email = models.EmailField(max_length=254, blank=True, null=True)
    gender = models.IntegerField(choices=GENDER_CHOICES, default=1)
    phone = PhoneField(blank=True, null=True)
    skype = models.CharField(max_length=254, blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    portrait = models.ImageField(upload_to='media/staff/')
    featured_portrait = models.ImageField(upload_to='media/staff/')
    is_host = models.BooleanField(default=False)
    is_instructor = models.BooleanField(default=False)
    added_date = models.DateTimeField(auto_now_add=True)
    host_organization = models.ForeignKey(UserProfile, blank=True, null=True, on_delete=models.CASCADE, related_name='staff')
    viewed_by_admin = models.BooleanField(default=False)
    masked = models.BooleanField(default=False)
    staff_notes = models.TextField(blank=True, null=True)

    def delete(self):
        self.portrait.delete(save=False)
        self.featured_portrait.delete(save=False)
        super().delete()


    def get_admin_url(self):
        content_type = ContentType.objects.get_for_model(self.__class__)
        return reverse("admin:%s_%s_change" % (content_type.app_label, content_type.model), args=(self.id,))

    def get_progress(self):
        progress = 0
        if self.first_name:
            progress += 1
        if self.last_name:
            progress += 1
        if self.email:
            progress += 1
        if self.gender:
            progress += 1
        if self.phone:
            progress += 1
        if self.skype:
            progress += 1
        if self.bio:
            progress += 1
        if self.portrait:
            progress += 1
        if self.featured_portrait:
            progress += 1
        total = int((progress/9) * 100)
        return total

    def count_skills(self):
        return self.skills.count()

    def get_listings(self):
        instructors = self.instructors.all()
        hosts = self.hosts.all()
        return instructors.union(hosts)

    def __str__(self):
        return self.first_name + " " + self.last_name
    
    def save(self, *args, **kwargs):
        if not self.masked:
            dirty_image = self.portrait
            dirty_portrait = self.featured_portrait
            # load image
            img = Image.open(dirty_image)
            img2 = Image.open(dirty_portrait)
            # crop image 
            width, height = img.size
            x = (width - height)//2
            img_cropped = img.crop((x, 0, x+height, height))

            width2, height2 = img2.size
            x2 = (width2 - height2)//2
            img2_cropped = img2.crop((x2, 0, x2+height2, height2))

            # create grayscale image with white circle (255) on black background (0)
            mask = Image.new('L', img_cropped.size)
            mask_draw = ImageDraw.Draw(mask)
            width, height = img_cropped.size
            mask_draw.ellipse((0, 0, width, height), fill=255)
            #mask.show()

            # add mask as alpha channel
            img_cropped.putalpha(mask)
            img_cropped = img_cropped.convert(mode='P', palette=Image.ADAPTIVE)
            blob = BytesIO()
            blob2 = BytesIO()
            img_cropped.save(blob, 'PNG', optimize=True, quality=30)
            img2_cropped.save(blob2, 'JPEG', optimize=True, quality=30)
            self.portrait.save(self.first_name + '_imagenew_round.png', File(blob), save=False)
            self.featured_portrait.save(self.first_name + '_imagenew_portrait.jpg', File(blob2), save=False)
        self.masked = False
        super().save(*args, **kwargs)
        

    def get_full_name(self):
        return self.first_name + ' ' + self.last_name
        
    def portrait_filename(self):
        if self.portrait:
            return os.path.basename(self.portrait.url)
        else:
            return 'emptyfilename'
    
    def featured_filename(self):
        return os.path.basename(self.featured_portrait.url)

class PageHits(models.Model):
    page = models.CharField(max_length=50, blank=False)
    hits = models.IntegerField(default=0)
    date = models.DateField(null=True, blank=True)

class SalesGoal(models.Model):
    monthly_goal = models.IntegerField(default=0)
    yearly_goal = models.IntegerField(default=0)

    def get_admin_url(self):
        content_type = ContentType.objects.get_for_model(self.__class__)
        return reverse("admin:%s_%s_change" % (content_type.app_label, content_type.model), args=(self.id,))



class Listing(models.Model):
    SAFETY_CHOICES = (
        (1, 'Use of cleaning chemicals that are effective against coronavirus.'),
        (2, 'Linens, towels and laundry washed in accordance with local authority guidelines.'),
        (3, 'Guest accommodation is disinfected between stays.'),
        (4, 'The accommodation partner we work with follows the guidelines of the local authoritie'),
        (5, 'Equipment for activities is disinfected before and/or after use.'),
        (6, 'Cashless payment available.'),
        (7, 'Physical distancing is maintained.'),
        (8, 'Instructors maintain a distance from the client at all times possible.'),
        (9, 'Activities take place outside where possible.'),
        (10, 'Staff follow all safety protocols as directed by the local government.'),
        (11, 'Hand sanitizer available in guest rooms and key areas.'),
        (12, 'Process in place to check the health of guests.'),
        (13, 'First aid kit available.'),
        (14, 'A room is available to isolate suspected or infected COVID-19 patients.'),
        (15, 'Protective masks are available for all staff.'),
        (16, 'Protective masks available for clients.')
    )

    SHUTTLE_CHOICES = (
        (1, 'Included in the price / Free of Charge'),
        (2, 'Available for additional cost'),
        (3, 'Not provided')
    )

    MEAL_CHOICES = (
        (1, 'Breakfast'),
        (2, 'Brunch'),
        (3, 'Lunch'),
        (4, 'Dinner'),
        (5, 'Snacks'),
        (6, 'Drinks')
    )

    FOOD_CHOICES = (
        (1, 'Ayurvedic Food'),
        (2, 'Fruitarian Food'),
        (3, 'Gluten Free Food'),
        (4, 'Halal Food'),
        (5, 'Lacto-Ovo Vegetarian Food'),
        (6, 'Lactose-Free Food'),
        (7, 'Naturopathic Diet Food'),
        (8, 'Organic Food'),
        (9, 'Other Dietary Requirements'),
        (10, 'Paleo Diet Food'),
        (11, 'Pescatarian Food'),
        (12, 'Raw Food'),
        (13, 'Regular Food (Meat, Poultry, Fish)'),
        (14, 'Seafood'),
        (15, 'Vegan Food'),
        (16, 'Vegetarian Food'),
        (17, 'Whole Food'),
        (18, 'Yogic Diet Food')
    )

    DRINK_CHOICES = (
        (1, 'Alcoholic Beverages'),
        (2, 'Coffee'),
        (3, 'Detox Juices'),
        (4, 'Soda'),
        (5, 'Tea'),
        (6, 'Water')
    )

    LANGUAGE_CHOICES = (
        (1, "Afrikaans"), (2, "Arabic"), (3, "Armenian"), (4, "Bulgarian"), (5, "Catalan; Valencian"), (6, "Chinese"), (7, "Croatian"), (8, "Czech"), (9, "Danish"), (10, "Dutch"), (11, "English"), (12, "Estonian"), (13, "Fijian"), (14, "Finnish"), (15, "French"), (16, "Georgian"), (17, "German"), (18, "Greek, Modern"), (19, "Hebrew, Modern"), (20, "Hindi"), (21, "Hungarian"), (22, "Indonesian"), (23, "Italian"), (24, "Japanese"), (25, "Kyrgyz"), (26, "Korean"), (27, "Lao"), (28, "Lithuanian"), (29, "Latvian"), (30, "Macedonian"), (31, "Malay"), (32, "Malayalam"), (33, "Mongolian"), (34, "Nepali"), (35, "Norwegian"), (36, "Polish"), (37, "Portuguese"), (38, "Romanian"), (39, "Russian"), (40, "Sanskrit"), (41, "Serbian"), (42, "Sinhala, (Sinhalese)"), (43, "Slovak"), (44, "Spanish; Castilian"), (45, "Swedish"), (46, "Tamil"), (47, "Telugu"), (48, " Thai"), (49, "Tagalog"), (50, "Turkish"), (51, "Ukrainian"), (52, "Vietnamese")
    )

    SKILL_CHOICES = (
        (1, 'Beginner'),
        (2, 'Intermediate'),
        (3, 'Advanced')
    )

    REMAINDER_CHOICES = (
        (1, 'On Arrival'),
        (2, 'On Depature'),
        (3, 'Specified Days Before Arrival')
    )

    YOGA_CHOICES = (
        (1, 'Ashtanga Yoga'),
        (2, 'Vinyasa Yoga'),
        (3, 'Hatha Yoga'),
        (4, 'Kundalini Yoga'),
        (5, 'Yin Yoga'),
        (6, 'Integral Yoga'),
        (7, 'Nidra Yoga'),
        (8, 'Bikram / Hot Yoga'),
        (9, 'AcroYoga'),
        (10, 'Baptiste Yoga'),
        (11, 'Forrest Yoga'),
        (12, 'Jivamukti Yoga'),
        (13, 'Power Yoga'),
        (14, 'Rocket Yoga'),
        (15, 'Tibetan Yoga'),
        (16, 'Zen Yoga'),
        (17, 'Iyengar Yoga'),
        (18, 'Tantra Yoga'),
        (19, 'Alignment Yoga'),
        (20, 'Ananda Yoga'),
        (21, 'Chair Yoga'),
        (22, 'Chakra Yoga'),
        (23, 'Critical Alignment Yoga'),
        (24, 'Dru Yoga'),
        (25, 'Ganja Yoga'),
        (26, 'Japa Yoga'),
        (27, 'Kashmir Yoga'),
        (28, 'Kripalu Yoga'),
        (29, 'Laughter Yoga'),
        (30, 'Laya Yoga'),
        (31, 'Nada Yoga'),
        (32, 'Nidra Yoga'),
        (33, 'Para Yoga'),
        (34, 'Partnet Yoga'),
        (35, 'Restorative Yoga'),
        (36, 'Satyananda Yoga'),
        (37, 'Sivananda Yoga'),
        (38, 'Somatic Yoga'),
        (39, 'Thai Yoga'),
        (40, 'Therapeutic Yoga'),
        (41, 'Tibetan Yoga'),
        (42, 'Transformational Yoga'),
        (43, 'Viniyoga'),
        (44, 'Aerial Yoga'),
        (45, 'Chakra Yoga'),
        (46, 'Vipassana Yoga'),
        (47, 'Anusara Yoga'),
    )

    CAT_CHOICES = (
        (1, 'Budget Retreats'),
        (2, 'Luxury Holidays'),
        (3, 'All-Inclusive Yoga Retreats'),
        (4, 'Online Experiences'),
        (5, 'Travel Experiences')
    )
  
    user_profile = models.ForeignKey(UserProfile, null=True, blank=True, on_delete=models.CASCADE, related_name='listings')
     # Admin Approval
    is_verified = models.BooleanField(default=False)
    viewed_by_admin = models.BooleanField(default=False)
    admin_approval_notes = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    progress = models.IntegerField(default=0)
    instant_booking = models.BooleanField(default=False)
    # Title & Intro

    url = models.URLField(max_length=200, blank=True, null=True)
    brochure = models.FileField(upload_to='media/listings/brochures/', blank=True, null=True)
    title = models.CharField(max_length=100, blank=True, null=True)
    tagline = models.CharField(max_length=47, blank=True, null=True)
    header = models.CharField(max_length=100, blank=True, null=True)
    introduction = RichTextField(blank=True, null=True)
    highlights = RichTextField(blank=True, null=True)
    private_groups = models.BooleanField(default=False)
    clean_and_safe = models.BooleanField(default=False)
    safety_checklist = MultiSelectField(choices=SAFETY_CHOICES, blank=True, null=True)
    health_hygiene = RichTextField(blank=True, null=True)

    # Location & Accomodation
    country = CountryField(blank=True, null=True)
    country_name = models.CharField(max_length=250, blank=True, null=True)
    address = models.CharField(max_length=250, blank=True, null=True)
    location_info = RichTextField(blank=True, null=True)
    accomodation_info = RichTextField(blank=True, null=True)
    category = models.IntegerField(choices=CAT_CHOICES, null=True, blank=True)

    # Arrival Information
    checkin_time = models.TimeField(blank=True, null=True)
    checkout_time = models.TimeField(blank=True, null=True)
    spoken_languages = MultiSelectField(default=11, choices=LANGUAGE_CHOICES, max_length=250)
    airport_code = models.CharField(max_length=5, blank=True, null=True)
    airport_shuttle = models.IntegerField(choices=SHUTTLE_CHOICES, null=True, blank=True)
    airport_shuttle_cost = models.PositiveIntegerField(null=True, blank=True)
    airport_info = RichTextField(blank=True, null=True)

    # Food and Drinks
    meals = MultiSelectField(choices=MEAL_CHOICES, blank=True, null=True)
    foods = MultiSelectField(choices=FOOD_CHOICES, blank=True, null=True)
    drinks = MultiSelectField(choices=DRINK_CHOICES, blank=True, null=True)
    food_info = RichTextField(blank=True, null=True)

    # Guest Requirements
    instruction_language = models.IntegerField(default=11, choices=LANGUAGE_CHOICES)
    skill_level = MultiSelectField(choices=SKILL_CHOICES, blank=True, null=True)
    min_age = models.PositiveIntegerField(default=0)
    max_age = models.PositiveIntegerField(default=0)
    min_child_age = models.PositiveIntegerField(default=0)
    child_allowed = models.BooleanField(default=False)

    # Program & Itinerary
    yoga_style = MultiSelectField(choices=YOGA_CHOICES, blank=True, null=True)
    program_duration = models.PositiveIntegerField(default=14)
    instruction_duration = models.PositiveIntegerField(default=14)
    max_group_size = models.PositiveIntegerField(default=0)
    min_group_size = models.PositiveIntegerField(default=0)
    itinerary_info = RichTextField(blank=True, null=True)
    excursion_info = RichTextField(blank=True, null=True)
    
    # Pricing & Inclusions
    display_currency = models.CharField(max_length=3, default="USD") # Verify the use of this
    included_info = RichTextField(blank=True, null=True)
    not_included_info = RichTextField(blank=True, null=True)
    availability_info = RichTextField(blank=True, null=True)

    # Extras
    extra_payment_todo_info = RichTextField(blank=True, null=True)
    spa_treament_info = RichTextField(blank=True, null=True)
    know_before_you_go = RichTextField(blank=True, null=True)

    # Packages & Availability
    #   ListingPackage Model

    # Booking Conditions
    deposit_policy = models.PositiveIntegerField(default=14, validators=[MinValueValidator(14), MaxValueValidator(100)], null=True, blank=True)
    remainder_due = models.IntegerField(choices=REMAINDER_CHOICES, default=1, null=True, blank=True)
    #remainder_due  = models.IntegerField(default=0) # -1 On Arrival, -2 On Departure, and any positive integer for days before arrival
    days_to_pay = models.PositiveIntegerField(default=0, null=True, blank=True)

    # Ranking
    ranking = models.DecimalField(null=True, blank=True, max_digits=3, decimal_places=2)
    commission_percent = models.IntegerField(default=14, null=True, blank=True)

    hosts = ManyToManyField(Staff, blank=True, related_name='hosts')

    instructors = ManyToManyField(Staff, blank=True, related_name='instructors')

    available_all_year = models.BooleanField(default=False)
    value_for_money = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)], blank=True, null=True)
    accommodation_and_facilities = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)], blank=True, null=True)
    food = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)], blank=True, null=True)
    location = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)], blank=True, null=True)
    quality_of_activity = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)], blank=True, null=True)
    overall_rating = models.DecimalField(max_digits=2, decimal_places=1, blank=True, null=True)
    lowest_price = models.IntegerField(default=0)
    # Slug
    slug = models.SlugField(blank=True)
    updated_after_approval = models.BooleanField(default=False)
    updated_fields = models.TextField(null=True, blank=True)

    
    def get_inquiry_count(self):
        today = datetime.date.today()
        month_ago = today - datetime.timedelta(days=30)
        count = Inquiry.objects.filter(Q(listing__pk=self.pk) & Q(created_at__gte=month_ago)).count()
        return count

    def get_admin_url(self):
        content_type = ContentType.objects.get_for_model(self.__class__)
        return reverse("admin:%s_%s_change" % (content_type.app_label, content_type.model), args=(self.id,))
    
    def get_progress(self):
        progress = 0
        if self.url:
            progress += 1
        if self.title:
            progress += 1
        if self.tagline:
            progress += 1
        if self.header:
            progress += 1
        if self.introduction:
            progress += 1
        if self.highlights:
            progress += 1
        if self.health_hygiene:
            progress += 1
        if self.country:
            progress += 1
        if self.address:
            progress += 1
        if self.location_info:
            progress += 1
        if self.accomodation_info:
            progress += 1
        if self.checkin_time:
            progress += 1
        if self.checkout_time:
            progress += 1
        if self.airport_code:
            progress += 1
        if self.airport_shuttle:
            progress += 1
        if self.airport_info:
            progress += 1
        if self.meals:
            progress += 1
        if self.foods:
            progress += 1
        if self.drinks:
            progress += 1
        if self.food_info:
            progress += 1
        if self.skill_level:
            progress += 1
        if self.yoga_style:
            progress += 1
        if self.program_duration:
            progress += 1
        if self.itinerary_info:
            progress += 1
        if self.excursion_info:
            progress += 1
        if self.included_info:
            progress += 1
        if self.not_included_info:
            progress += 1
        if self.availability_info:
            progress += 1
        if self.extra_payment_todo_info:
            progress += 1
        if self.spa_treament_info:
            progress += 1
        if self.know_before_you_go:
            progress += 1
        progress_percent = int((progress / 31) * 100)
        return progress_percent

    def get_lowest_package_price(self):
        min_price = 0
        for package in self.packages.all():
            if min_price == 0:
                min_price = package.default_price
            elif min_price > package.default_price:
                min_price = package.default_price
                
        return min_price

    def get_organization(self):
        return self.user_profile.business_name

    def check_vegetarian(self):
        foods = str(self.foods).lower()
        if 'veg' in foods:
            return True
        else:
            return False

    def __str__(self):
        if self.title:
            return self.title
        else:
            return self.slug

    def get_absolute_url(self):
        return reverse('listings:listing_detail', kwargs={'pk':self.pk, 'slug': self.slug})

    def save(self, *args, **kwargs):
        if self.get_lowest_package_price():
            self.lowest_price = self.get_lowest_package_price()
        if self.get_progress():
            self.progress = self.get_progress()
        if not self.id: # new listing - no title
            if not self.title:
                self.slug = unique_slug_generator(self)
        else:
            # if 'request' in kwargs:
            #     request = kwargs.pop('request') 
            #     print("inside request")
            #     if not request.user.is_superuser:
            #         print('in here')
            #         self.updated_after_approval = True
            #         cls = self.__class__
            #         old = cls.objects.get(pk=self.pk)
            #         new = self
            #         changed_fields = []
            #         for field in cls._meta.get_fields():
            #             field_name = field.name
            #             try:
            #                 if getattr(old, field_name) != getattr(new, field_name):
            #                     changed_fields.append(field_name)
                                
            #             except Exception as ex:
            #                 pass
            #         kwargs['updated_fields'] = changed_fields
            #         self.updated_fields = ', '.join(changed_fields)
            if not self.title:
                old_slug = self.slug
                new_slug = unique_slug_generator(self, old_slug)
                short_slug = new_slug[:48]
                self.slug = unique_slug_generator(self, old_slug)
            else:
                full_slug = slugify(self.title)
                short_slug = full_slug[:48]
                self.slug = short_slug
        if self.country:
            self.country_name = self.country.name

        super(Listing, self).save(*args, **kwargs)

    def get_first_image(self):
        try:
            image = self.images.first().image.url
        except:
            image = ''

        return image
    
    def get_first_video(self):
        try:
            video = self.videos.first().video.url
        except:
            video = ''
        return video
    

class Favorite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='favorites')
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE, related_name='favorites')

class Videos(models.Model):
    profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='videos')
    video = models.FileField(upload_to='media/listings/videos/', null=True, blank=True)
    approved = models.BooleanField(default=False)
    listings = ManyToManyField(Listing, blank=True, related_name='videos')
    viewed_by_admin = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    size = models.FloatField(null=True, blank=True)
    staff_notes = models.TextField(blank=True, null=True)

    def save(self, *args, **kwargs):
        if self.video:
            self.size = self.video.size
        super(Videos, self).save(*args, **kwargs)


    def filename(self):
        return os.path.basename(self.video.name)

    def get_admin_url(self):
        content_type = ContentType.objects.get_for_model(self.__class__)
        return reverse("admin:%s_%s_change" % (content_type.app_label, content_type.model), args=(self.id,))
    

class Accommodation(models.Model):
    ACC_TYPES = (
        (1, 'Guests travelling together will have the entire unit for themselves'),
        (2, 'It has multiple rooms, can accomodate many groups of guests')
    )

    FACILITY_TYPES = (
        (1, 'Air-conditioned public areas'),
        (2, 'Air-conditioned rooms'),
        (3, 'Environmentally friendly'),
        (4, 'Free bicycle'),
        (5, 'Free parking'),
        (6, 'Free Wi-Fi'),
        (7, 'Internet access'),
        (8, 'Multilingual staff'),
        (9, 'Parking lot'),
        (10, 'Smoke-free property'),
        (11, 'Wireless internet'),
        (12, 'Baby sitting'),
        (13, 'Child care'),
        (14, 'Concierge desk'),
        (15, 'Dry cleaning'),
        (16, 'Ironing / Iron board'),
        (17, 'Laundry'),
        (18, 'Luggage Room / Storage'),
        (19, 'Medical assistance'),
        (20, 'Newspaper'),
        (21, 'Pet care / Grooming'),
        (22, 'Valet'),
        (23, 'Wedding'),
        (24, 'Conference Room'),
        (25, 'Dining Area'),
        (26, 'Fireplace'),
        (27, 'Kitchen'),
        (28, 'Library'),
        (29, 'Lobby'),
        (30, 'Lounge'),
        (31, 'Meeting Room'),
        (32, 'Garden'),
        (33, 'Hot Spring'),
        (34, 'Ironing / Ironing Board'),
        (35, 'Labyrinth'),
        (36, 'Meditation Garden'),
        (37, 'Outdoor Shower'),
        (38, 'Picnic Area'),
        (39, 'Terrace'),
        (40, 'ATM / Banking'),
        (41, 'Bar'),
        (42, 'Barbeque Facilities'),
        (43, 'Cafe'),
        (44, 'Convenience / Grocery Store'),
        (45, 'Currency Exchange'),
        (46, 'Honesty Bar'),
        (47, 'Poolside Bar'),
        (48, 'Restaurant'),
        (49, 'Shopping'),
        (50, 'Special Menu Request'),
        (51, 'Tour Assistance'),
        (52, 'Golf Course'),
        (53, 'Gym'),
        (54, 'Health Club'),
        (55, 'Swimming Pool (indoor)'),
        (56, 'Swimming Pool (outdoor)'),
        (57, 'Table Tennis'),
        (58, 'Tennis Court'),
        (59, 'Volleyball Court'),
        (60, 'Yoga Deck'),
        (61, 'Yoga Shala'),
        (62, 'Yoga Studio'),
        (63, 'Beauty Salon'),
        (64, 'Hair Salon'),
        (65, 'Hot Tub / Jacuzzi'),
        (66, 'Sauna'),
        (67, 'Spa'),
        (68, 'Steam Room'),
        (69, 'Temazcal'),
        (70, 'Bicycle Rental'),
        (71, 'Board Rental'),
        (72, 'Car Rental'),
        (73, 'Cell Phone Rental'),
        (74, 'Laptop Rental')
    )

    CATEGORY_TOGETHER_CHOICES = (
        (1, 'House'),
        (2, 'Apartment'),
        (3, 'Cabin'),
        (4, 'Lodge'),
        (5, 'Tent'),
        (6, 'Bungalow'),
        (7, 'Chalet'),
        (8, 'Villa'),
        (9, 'Cabin(boat)'),
        (10, 'Studio'),
        (11, 'Recreational Vehicle'),
        (12, 'Yurt'),
        (13, 'Cottage'),
        (14, 'Various Accommodations'),
        (15, 'Barn'),
        (16, 'Ranch'),
        (17, 'Boat'),
    )

    CATEGORY_MULTIPLE_CHOICES = (
        (1, 'Hotel'),
        (2, 'Hostel'),
        (3, 'House'),
        (4, 'Apartment'),
        (5, 'Ashram'),
        (6, 'Academy'),
        (7, 'Cabin'),
        (8, 'Resort'),
        (9, 'School'),
        (10, 'Lodge'),
        (11, 'Tent'),
        (12, 'Bungalow'),
        (13, 'Chalet'),
        (14, 'Villa'),
        (15, 'Cabin(boat)'),
        (16, 'Motel'),
        (17, 'Inn'),
        (18, 'Studio'),
        (19, 'Campus'),
        (20, 'Recreational Vehicle'),
        (21, 'Yurt'),
        (22, 'Retreat Center'),
        (23, 'Temple'),
        (24, 'Monastery'),
        (25, 'Cottage'),
        (26, 'Campsite'),
        (27, 'Various Accommodations'),
        (28, 'Castle'),
        (29, 'Barn'),
        (30, 'Ranch'),
        (31, 'Bed and Breakfast'),
        (32, 'Treehouse'),
        (33, 'Boat'),
        (34, 'Farm')
    )
    user_profile = models.ForeignKey(UserProfile, null=True, blank=True, on_delete=models.CASCADE)
    type = models.IntegerField(blank=True, null=True, choices=ACC_TYPES)
    category_private_unit = models.IntegerField(blank=True, null=True, choices=CATEGORY_TOGETHER_CHOICES)
    category_multiple_units = models.IntegerField(null=True, blank=True, choices=CATEGORY_MULTIPLE_CHOICES)
    name = models.CharField(max_length=150, blank=True, null=True)
    facilities =  MultiSelectField(choices=FACILITY_TYPES, blank=True, null=True)
    description = TextField(blank=True, null=True)
    max_occupancy = models.PositiveIntegerField(null=True, blank=True)
    listing = models.ManyToManyField(Listing, blank=True, related_name="listings")

    def has_rooms(self):
        return self.rooms.all()

    def __str__(self):
        return self.name
    
    def image_count(self):
        num_images = self.images.count()
        return num_images

    def get_acc_type(self):
        if self.type == 1:
            return self.get_category_private_unit_display()
        else:
            return self.get_category_multiple_units_display()

class AccommodationImages(models.Model):
    accommodation = models.ForeignKey(Accommodation, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to='media/accommodations/images/', null=True, blank=True)

    def __str__(self):
        return self.accommodation.name



# Rooms Models

class Room(models.Model):
    ROOM_TYPES = (
        (1, 'Single Room'),
        (2, 'Double Room'),
        (3, 'Twin Room'),
        (4, 'Triple Room'),
        (5, 'Quadruple Room'),
        (6, 'Dorm')
    )

    SHARED_STATUS = (
        (1, 'Private'),
        (2, 'Shared')
    )

    ROOM_FACILITIES = (
        (1, 'Bunk beds'),
        (2, 'Double bed'),
        (3, 'King bed'),
        (4, 'Queen bed'),
        (5, 'Single bed'),
        (6, 'Twin beds'),
        (7, 'Bathrobe'),
        (8, 'Bathtub'),
        (9, 'Hair Dryer'),
        (10, 'Outdoor Shower'),
        (11, 'Private Bathroom'),
        (12, 'Shared Bathroom'),
        (13, 'Shower'),
        (14, 'Toiletries'),
        (15, 'Towels'),
        (16, 'Air-conditioned Rooms'),
        (17, 'Coffee / Tea'),
        (18, 'Desk'),
        (19, 'Free bottled water'),
        (20, 'Free Wi-Fi / Computer'),
        (21, 'In-room Safe'),
        (22, 'Internet Access'),
        (23, 'Ironing / Ironing Board'),
        (24, 'Kitchen'),
        (25, 'Mini bar'),
        (26, 'Mosquito Net'),
        (27, 'Refrigerator'),
        (28, 'Room Cleaning'),
        (29, 'Standing / Ceiling Fan'),
        (30, 'TV'),
        (31, 'Wardrobe / Closet'),
        (32, 'Balcony'),
        (33, 'Fireplace'),
        (34, 'Hammock'),
        (35, 'Hot Tub / Jacuzzi'),
        (36, 'In-Room Dining'),
        (37, 'Patio'),
        (38, 'Sauna'),
        (39, 'Steam Room'),
        (40, 'Terrace')
    )

    accommodation = models.ForeignKey(Accommodation, on_delete=models.CASCADE, related_name='rooms')
    type = models.IntegerField(blank=True, null=True, choices=ROOM_TYPES)
    name = models.CharField(max_length=150, blank=True, null=True)
    shared = models.IntegerField(default=1, choices=SHARED_STATUS)
    max_occupancy = models.PositiveIntegerField(default=0)
    facilities = MultiSelectField(choices=ROOM_FACILITIES, blank=True, null=True)
    description = TextField(blank=True, null=True)

    def get_type(self):
        return self.get_type_display()

    def get_acc(self):
        return self.accommodation.name

    def __str__(self):
        return self.accommodation.name + " - " + self.name
    
    def get_image_count(self):
        return self.images.count()


class RoomImages(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='media/rooms/images/', null=True, blank=True)

    def __str__(self):
        return self.room.accommodation.name + ' - ' + self.room.name + ' - Image #' + str(self.pk)
    


class BedConfig(models.Model):

    room = models.ForeignKey(Room, on_delete=models.CASCADE, null=True, blank=True, related_name='room_configs')
    def __str__(self):
        return str(self.room.name) + " - Configuration Set" 


class BedCombo(models.Model):
    BED_CHOICES = (
        (1, 'Single Bed (1 people)'),
        (2, 'Double Bed (2 people)'),
        (3, 'Queen Size Bed (2 people)'),
        (4, 'King size bed (2 people)'),
        (5, 'Platform bed (2 people)'),
        (6, 'Folding bed (1 people)'),
        (7, 'Murphy bed (2 people)'),
        (8, 'Canopy bed (2 people)'),
        (9, 'Crib (1 people)'),
        (10, 'Twin bed (2 people)'),
        (11, 'Cot bed (1 people)'),
        (12, 'Bunk bed (2 people)'),
        (13, 'Mid sleeper bed (1 people)'),
        (14, 'Antique style bed (2 people)'),
        (15, 'Trundle bed (2 people)'),
        (16, 'L-shaped bunk bed (3 people)'),
        (17, 'Sofa bed (2 people)'),
        (18, 'Water bed (2 people)'),
        (19, 'Hanging bed (1 people)'),
        (20, 'Hammock (1 people)'),
        (21, 'Ottoman bed (1 people)'),
    )
    bed_type = models.IntegerField(choices=BED_CHOICES, blank=True, null=True)
    num_beds = models.PositiveIntegerField(blank=True, null=True)
    bed_config = models.ForeignKey(BedConfig, on_delete=models.CASCADE, blank=True, null=True, related_name='combos')

    def __str__(self):
        BED_CHOICES = (
            (1, 'Single Bed (1 people)'),
            (2, 'Double Bed (2 people)'),
            (3, 'Queen Size Bed (2 people)'),
            (4, 'King size bed (2 people)'),
            (5, 'Platform bed (2 people)'),
            (6, 'Folding bed (1 people)'),
            (7, 'Murphy bed (2 people)'),
            (8, 'Canopy bed (2 people)'),
            (9, 'Crib (1 people)'),
            (10, 'Twin bed (2 people)'),
            (11, 'Cot bed (1 people)'),
            (12, 'Bunk bed (2 people)'),
            (13, 'Mid sleeper bed (1 people)'),
            (14, 'Antique style bed (2 people)'),
            (15, 'Trundle bed (2 people)'),
            (16, 'L-shaped bunk bed (3 people)'),
            (17, 'Sofa bed (2 people)'),
            (18, 'Water bed (2 people)'),
            (19, 'Hanging bed (1 people)'),
            (20, 'Hammock (1 people)'),
            (21, 'Ottoman bed (1 people)'),
        )
        bed_choices = dict(BED_CHOICES)
        if self.bed_type in bed_choices:
            bed_choice = bed_choices[self.bed_type]

        return str(self.num_beds) + " " + bed_choice + " - " + str(self.bed_config.room.name) + ' - Set ID: ' + str(self.bed_config.pk)




class ListingPackage(models.Model):
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE, related_name='packages')
    number_of_people = models.PositiveIntegerField(default=1)
    room = models.ForeignKey(Room, null=True, blank=True, on_delete=models.CASCADE)
    note = models.CharField(max_length=150, null=True, blank=True)
    default_price = models.PositiveIntegerField(blank=True, null=True)
    price_calculation = RichTextField(blank=True, null=True)
    instant_booking = models.BooleanField(default=False)
    

    
    def get_images(self):
        images = self.room.images.all()
        image_urls = []
        for image in images:
            image_urls.append(image.image.url)
        image_text_urls = ", ".join(image_urls)
        image_urls = image_text_urls
        return image_urls

    def __str__(self):
        return self.room.name + ' - ' + self.listing.title 


class CustomPriceRequest(models.Model):
    package = models.ForeignKey(ListingPackage, on_delete=models.CASCADE, related_name='reqs', null=True, blank=True)
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    used_slots = models.IntegerField(default=0, null=True, blank=True)
    max_slots = models.IntegerField(null=True, blank=True)
    price = models.IntegerField(null=True, blank=True)
    is_available = models.BooleanField(default=False)


def increment_invoice_number():
    last_invoice = Inquiry.objects.all().order_by('id').last()
    if not last_invoice:
        return 'AYA0001'
    invoice_no = last_invoice.invoice_no
    invoice_int = int(invoice_no.split('AYA')[-1])
    width = 4
    new_invoice_int = invoice_int + 1
    formatted = (width - len(str(new_invoice_int))) * "0" + str(new_invoice_int)
    new_invoice_no = 'AYA' + str(formatted)
    return new_invoice_no  

class Inquiry(models.Model):
    DUE_TYPES = (
        (1, 'On Arrival'),
        (2, 'On Departure'),
        (3, 'Before Arrival')
    )
    staff_notes = models.TextField(blank=True, null=True)
    host_name = models.CharField(max_length=250, blank=True, null=True)
    phone_number = PhoneField(blank=True, null=True)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='inquiry', null=True, blank=True)
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE, related_name='inquiry', null=True, blank=True)
    package = models.ForeignKey(ListingPackage, on_delete=models.CASCADE, related_name='inquiry', null=True, blank=True)
    arrival_date = models.DateField(null=True, blank=True)
    departure_date = models.DateField(null=True, blank=True)
    total_price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    is_approved = models.BooleanField(default=False)
    req = models.ForeignKey(CustomPriceRequest, on_delete=models.CASCADE, null=True, blank=True)
    number_of_people = models.IntegerField(default=1)
    is_conditional = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    duration = models.IntegerField(null=True, blank=True)
    viewed = models.BooleanField(default=False)
    is_cancelled = models.BooleanField(default=False)
    host_declined = models.BooleanField(default=False)
    commission_amount =  models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    invoice_no = models.CharField(max_length = 500, default = increment_invoice_number, null = True, blank = True)
    to_be_paid = models.IntegerField(choices=DUE_TYPES, default=1, null=True, blank=True) # (0, on-arrival) (1, on-departure), 
    number_of_days_before_arrival = models.IntegerField(null=True, blank=True)
    required_deposit = models.IntegerField(default=14) 
    remaining_amount = models.IntegerField(default=86)

    deposit_amount = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    deposit_due_date = models.DateField(auto_now_add=False, null=True, blank=True)
    
    
    deposit_paid = models.BooleanField(default=False)
    deposit_paid_date = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    # Deposit payout due date
    deposit_payout_date = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    deposit_payout_amount = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    deposit_payout_amount_confirmed = models.BooleanField(default=False)
    depsoit_payout_paid_amount = models.DecimalField(max_digits=7, decimal_places=2, default=0)
    deposit_payout_paid_date = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    deposit_payout_complete = models.BooleanField(default=False)
    net_deposit_payout = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    paid_amount = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)       # Amount the customer paid
    commission_percent = models.IntegerField(default=14, null=True, blank=True)
    status = models.IntegerField(default=0)


    def get_admin_url(self):
        content_type = ContentType.objects.get_for_model(self.__class__)
        return reverse("admin:%s_%s_change" % (content_type.app_label, content_type.model), args=(self.id,))
        
    def is_past(self):
        today = datetime.date.today()
        if self.departure_date >= today:
            return False
        else:
            return True

    def save(self, *args, **kwargs):
        time = (self.departure_date - self.arrival_date).days
        self.duration = time
        self.host_name = self.listing.user_profile.business_name


        if self._state.adding:  
            # print('ONLY WHEN SAVING A NEW INQUIRY')
            self.commission_percent = self.listing.commission_percent
            # if self.commission_percent < self.listing.deposit_policy:
            #     original_deposit = self.listing.deposit_policy
            # else:
            #     original_deposit = self.commission_percent
            # self.required_deposit = original_deposit
            # self.remaining_amount = 100 - original_deposit
            remainder_due_date = self.listing.remainder_due
            self.to_be_paid = remainder_due_date
            #REMAINDER_CHOICES = (
            #     (1, 'On Arrival'),
            #     (2, 'On Depature'),
            #     (3, 'Specified Days Before Arrival')
            # )
            if remainder_due_date == 3:
                num_days = self.listing.days_to_pay
                self.number_of_days_before_arrival = num_days
                remaining_deposit_date = self.arrival_date - datetime.timedelta(num_days)
                self.deposit_due_date = remaining_deposit_date
            elif remainder_due_date == 2:
                remaining_deposit_date = self.departure_date
                self.deposit_due_date = remaining_deposit_date
            elif remainder_due_date == 1:
                remaining_deposit_date = self.arrival_date
                self.deposit_due_date = remaining_deposit_date
            
        self.deposit_payout_date = self.arrival_date
        # self.deposit_amount = float(self.total_price) * (self.required_deposit / 100)
        # We removed this as Vincent said match deposit and commission
        self.deposit_amount = float(self.total_price) * (self.commission_percent / 100)
        self.commission_amount = float(self.total_price) * (self.commission_percent / 100)
        self.deposit_payout_date = self.arrival_date
        self.deposit_payout_amount = self.deposit_amount - self.commission_amount
        self.net_deposit_payout = self.deposit_payout_amount - float(self.depsoit_payout_paid_amount)
        if self.deposit_paid:
            self.status = 3
        elif self.host_declined:
            self.status = 4
        elif self.is_approved and not self.deposit_paid:
            self.status = 2
        else:
            self.status = 1
        super(Inquiry, self).save(*args, **kwargs)


class Review(models.Model):
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE, related_name='reviews')
    inquiry = models.OneToOneField(Inquiry, on_delete=models.CASCADE, related_name='review')
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='reviews')
    positive_info = models.TextField(null=True, blank=True)
    negative_info = models.TextField(null=True, blank=True)
    host_response = models.TextField(blank=True, null=True)
    value_for_money = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    accommodation_and_facilities = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    food = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    location = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    quality_of_activity = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    overall_rating = models.DecimalField(max_digits=2, decimal_places=1)
    approved = models.BooleanField(default=False)
    viewed_by_admin = models.BooleanField(default=False)
    staff_notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def get_admin_url(self):
        content_type = ContentType.objects.get_for_model(self.__class__)
        return reverse("admin:%s_%s_change" % (content_type.app_label, content_type.model), args=(self.id,))
    
    def get_progress(self):
        if self.host_response:
            return 100
        else:
            return 50
        

class Conversation(models.Model):
    host = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='conversations', null=True, blank=True)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='conversations', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    inquiry = models.OneToOneField(Inquiry, related_name='conversation', on_delete=models.CASCADE, null=True, blank=True)
    staff_notes = models.TextField(blank=True, null=True)
    is_unread_customer = models.BooleanField(default=True)
    is_unread_host = models.BooleanField(default=True)

    def _get_last_msg_time(self):
        return self.messages.all().last().created_at
    last_message = property(_get_last_msg_time)

    def check_customer_unread_messages(self):
        for message in self.messages.all():
            if message.is_unread_customer == True:
                return True
        return False
    
    def check_host_unread_messages(self):
        for message in self.messages.all():
            if message.is_unread_host == True:
                return True
        return False
    
    def get_message_snippet(self):
        message = self.messages.all().last().content
        return message
    
    def get_last_message_time(self):
        time = self.messages.all().last().created_at
        return time

    def get_admin_url(self):
        content_type = ContentType.objects.get_for_model(self.__class__)
        return reverse("admin:%s_%s_change" % (content_type.app_label, content_type.model), args=(self.id,))

class BlogPhotos(models.Model):
    image = models.ImageField(upload_to='media/blog/images/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-id']

    def get_photo_url(self):
        request = self.context.get('request')
        return request.build_absolute_uri(self.image.url)

class Messages(models.Model):
    from_host = models.BooleanField(default=False)
    from_owner = models.BooleanField(default=False)
    content = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    conversation = models.ForeignKey(Conversation, related_name='messages', blank=False, null=False, on_delete=models.CASCADE)
    ordering = ['created_at']
    is_flagged = models.BooleanField(default=False)
    staff_notes = models.TextField(blank=True, null=True)
    is_unread_customer = models.BooleanField(default=True)
    is_unread_host = models.BooleanField(default=True)
    original_context = models.TextField(null=True, blank=True)
    
    def save(self, *args, **kwargs):
        if not self.id: # new message
            if self.from_host:
                self.conversation.is_unread_customer = True
                self.conversation.save()
            elif self.from_owner:
                self.conversation.is_unread_customer = True
                self.conversation.is_unread_host = True
                self.conversation.save()
            else:
                self.conversation.is_unread_host = True
                self.conversation.save()
        super(Messages, self).save(*args, **kwargs)

    def get_admin_url(self):
        content_type = ContentType.objects.get_for_model(self.__class__)
        return reverse("admin:%s_%s_change" % (content_type.app_label, content_type.model), args=(self.id,))


class Attachment(models.Model):
    file = models.FileField(upload_to='media/messages/attachments/', null=True, blank=True)
    message = models.ForeignKey(Messages, related_name='files', on_delete=models.CASCADE, null=True, blank=True)





class ListingImage(models.Model):
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='media/listings/images/', null=True, blank=True)

    def __str__(self):
        return self.listing.title






def current_year():
    return datetime.date.today().year

def max_value_current_year(value):
    return MaxValueValidator(current_year())(value)

class Skill(models.Model):
    name = models.CharField(max_length=100, blank=False, null=False)
    training_year = models.PositiveIntegerField(default=current_year(), validators=[MinValueValidator(1932), max_value_current_year])
    teacher = models.CharField(max_length=100, blank=True, null=True)
    school = models.CharField(max_length=200, blank=True, null=True)
    staff_member = models.ForeignKey(Staff, on_delete=models.CASCADE, related_name='skills')

    def __str__(self):
        return self.staff_member.first_name + " " + self.staff_member.last_name + ' - ' + self.name




class StripeOrder(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.SET_NULL, null=True)
    customer_email = models.EmailField(verbose_name='Customer Email')
    host = models.ForeignKey(UserProfile, on_delete=models.SET_NULL, null=True)
    host_email = models.EmailField(verbose_name='Host Email')
    listing = models.ForeignKey(Listing, on_delete=models.SET_NULL, null=True)
    listing_title = models.CharField(max_length=250)
    amount = models.IntegerField(verbose_name='Amount')
    stripe_payment_intent = models.CharField(max_length=200)
    has_paid = models.BooleanField(default=False, verbose_name='Payment Status')
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now_add=True)

class Author(models.Model):
    first_name = models.CharField(max_length=150, blank=True, null=True)
    last_name = models.CharField(max_length=150, null=True, blank=True)
    image = models.ImageField(upload_to='media/blog/authors')
    bio = models.TextField(blank=True, null=True)
    
    def get_full_name(self):
        return self.first_name + ' ' + self.last_name

class PostCategory(models.Model):
    title = models.CharField(max_length=255, blank=True, null=True)
    
    def __str__(self):
        if self.title:
            return self.title

class Post(models.Model):
    title = models.CharField(max_length=255, blank=True, null=True)
    subtitle = models.CharField(max_length=255, blank=True, null=True)
    author = models.ForeignKey(Author, on_delete=models.CASCADE, null=True, blank=True, related_name='posts')
    category = models.ForeignKey(PostCategory, on_delete=models.CASCADE, null=True, blank=True, related_name='posts')
    content = RichTextField(blank=True, null=True, config_name="toolbar_custom")
    image = models.ImageField(upload_to='media/blog/posts')
    created_at = models.DateField(auto_now_add=True)
    is_featured = models.BooleanField(default=False)
    slug = models.SlugField(blank=True)

    def __str__(self):
        if self.title:
            return self.title
        else:
            return self.slug

    def save(self, *args, **kwargs):
        if not self.id: # new listing - no title
            if not self.title:
                self.slug = unique_slug_generator(self)
        else:
            if not self.title:
                old_slug = self.slug
                new_slug = unique_slug_generator(self, old_slug)
                short_slug = new_slug[:48]
                self.slug = unique_slug_generator(self, old_slug)
            else:
                full_slug = slugify(self.title)
                short_slug = full_slug[:48]
                self.slug = short_slug
        super(Post, self).save(*args, **kwargs)

    def get_absolute_url(self):
        return reverse('listings:blog_detail', kwargs={'pk':self.pk, 'slug': self.slug})
