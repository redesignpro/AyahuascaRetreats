from django.contrib import admin
from .models import *


class ListingAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('title',)}


# Register your models here.
admin.site.register(Listing, ListingAdmin)
admin.site.register(Accommodation)
admin.site.register(AccommodationImages)
admin.site.register(Room)
admin.site.register(RoomImages)
admin.site.register(BedConfig)
admin.site.register(BedCombo)
admin.site.register(ListingPackage)
admin.site.register(ListingImage)
admin.site.register(Staff)
admin.site.register(Skill)
admin.site.register(Videos)
admin.site.register(CustomPriceRequest)
admin.site.register(Messages)
admin.site.register(Conversation)
admin.site.register(Inquiry)
admin.site.register(PageHits)
admin.site.register(Review)
admin.site.register(SalesGoal)
admin.site.register(Author)
admin.site.register(PostCategory)
admin.site.register(Post)
admin.site.register(BlogPhotos)