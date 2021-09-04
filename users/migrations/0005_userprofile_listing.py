# Generated by Django 3.2.5 on 2021-07-17 12:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('listings', '0016_alter_listing_slug'),
        ('users', '0004_certificates_userprofile'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='listing',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='listings.listing'),
        ),
    ]
