# Generated by Django 3.2.5 on 2021-07-26 10:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0017_auto_20210726_0642'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='payout_method',
            field=models.IntegerField(blank=True, choices=[(1, 'Wise'), (2, 'Bank Transfer')], null=True),
        ),
    ]
