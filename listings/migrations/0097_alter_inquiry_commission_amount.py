# Generated by Django 3.2.5 on 2021-08-10 10:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('listings', '0096_inquiry_remaining_payout_amount'),
    ]

    operations = [
        migrations.AlterField(
            model_name='inquiry',
            name='commission_amount',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=7, null=True),
        ),
    ]
