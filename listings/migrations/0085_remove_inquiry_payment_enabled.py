# Generated by Django 3.2.5 on 2021-08-09 11:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('listings', '0084_inquiry_payment_enabled'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='inquiry',
            name='payment_enabled',
        ),
    ]
