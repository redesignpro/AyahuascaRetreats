# Generated by Django 3.2.5 on 2021-08-24 07:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0028_auto_20210804_0539'),
    ]

    operations = [
        migrations.AddField(
            model_name='customer',
            name='owner_notes',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='owner_notes',
            field=models.TextField(blank=True, null=True),
        ),
    ]
