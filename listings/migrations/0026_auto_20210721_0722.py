# Generated by Django 3.2.5 on 2021-07-21 11:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('listings', '0025_accommodation_listing'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='accommodation',
            name='listing',
        ),
        migrations.AddField(
            model_name='accommodation',
            name='listing',
            field=models.ManyToManyField(blank=True, related_name='listings', to='listings.Listing'),
        ),
    ]
