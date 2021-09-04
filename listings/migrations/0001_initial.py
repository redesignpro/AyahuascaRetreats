# Generated by Django 3.2.5 on 2021-07-14 09:49

import ckeditor.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Listing',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('url', models.URLField(blank=True, help_text='For example: www.website.com/one-week-package. If not available link to your website home page or Facebook page', null=True)),
                ('brochure', models.FileField(blank=True, help_text='Any file with information about the trip', null=True, upload_to='media/listings/brochures')),
                ('title', models.CharField(blank=True, help_text='Attract customers with a title that highlights the duration, destination and activities of the program.', max_length=100, null=True)),
                ('tagline', models.CharField(blank=True, help_text='Create a memorable phrase that is unique to your listing', max_length=47, null=True)),
                ('header', models.CharField(blank=True, max_length=100, null=True)),
                ('introduction', ckeditor.fields.RichTextField(blank=True, null=True)),
            ],
        ),
    ]
