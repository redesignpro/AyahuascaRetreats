# Generated by Django 3.2.5 on 2021-08-18 11:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('listings', '0126_messages_from_owner'),
    ]

    operations = [
        migrations.AddField(
            model_name='listing',
            name='viewed_by_admin',
            field=models.BooleanField(default=False),
        ),
    ]
