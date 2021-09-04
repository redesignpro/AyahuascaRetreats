# Generated by Django 3.2.5 on 2021-08-04 09:39

from django.db import migrations, models
import phone_field.models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0027_rename_langauge_customer_language'),
    ]

    operations = [
        migrations.AddField(
            model_name='customer',
            name='country_code',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='customer',
            name='phone',
            field=phone_field.models.PhoneField(blank=True, max_length=31, null=True),
        ),
    ]
