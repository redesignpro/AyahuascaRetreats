# Generated by Django 3.2.5 on 2021-08-12 12:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('listings', '0110_inquiry_depsoit_payout_paid_amount'),
    ]

    operations = [
        migrations.AddField(
            model_name='inquiry',
            name='net_deposit_payout',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=7, null=True),
        ),
    ]
