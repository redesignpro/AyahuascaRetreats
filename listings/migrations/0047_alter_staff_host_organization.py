# Generated by Django 3.2.5 on 2021-07-27 09:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0025_alter_businesscontacts_email'),
        ('listings', '0046_alter_listing_user_profile'),
    ]

    operations = [
        migrations.AlterField(
            model_name='staff',
            name='host_organization',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='staff', to='users.userprofile'),
        ),
    ]
