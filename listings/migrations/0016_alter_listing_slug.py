# Generated by Django 3.2.5 on 2021-07-16 09:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('listings', '0015_listing_slug'),
    ]

    operations = [
        migrations.AlterField(
            model_name='listing',
            name='slug',
            field=models.SlugField(unique=True),
        ),
    ]
