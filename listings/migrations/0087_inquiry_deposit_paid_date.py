# Generated by Django 3.2.5 on 2021-08-10 09:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('listings', '0086_inquiry_host_declined'),
    ]

    operations = [
        migrations.AddField(
            model_name='inquiry',
            name='deposit_paid_date',
            field=models.DateField(blank=True, null=True),
        ),
    ]
