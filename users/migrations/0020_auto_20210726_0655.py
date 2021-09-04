# Generated by Django 3.2.5 on 2021-07-26 10:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0019_userprofile_beneficiary_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='bank_routing_code',
            field=models.IntegerField(blank=True, null=True, verbose_name=((1, 'ABA'), (2, 'IBAN'))),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='bank_swift_number',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
    ]
