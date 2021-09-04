# Generated by Django 3.2.5 on 2021-07-25 08:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0011_videos_approved'),
        ('listings', '0043_delete_listingvideo'),
    ]

    operations = [
        migrations.AddField(
            model_name='listing',
            name='videos',
            field=models.ManyToManyField(blank=True, related_name='videos', to='users.Videos'),
        ),
    ]
