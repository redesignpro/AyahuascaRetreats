# Generated by Django 3.2.5 on 2021-07-21 10:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('listings', '0021_auto_20210720_0420'),
    ]

    operations = [
        migrations.AlterField(
            model_name='listing',
            name='remainder_due',
            field=models.IntegerField(blank=True, choices=[(1, 'On Arrival'), (2, 'On Depature'), (3, 'Specified Day Before Arrival')], null=True),
        ),
    ]
