# Generated by Django 3.2.5 on 2021-08-15 09:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('listings', '0114_alter_inquiry_deposit_paid_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='inquiry',
            name='depsoit_payout_paid_amount',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=7),
        ),
    ]
