# Generated by Django 3.2.5 on 2021-08-19 09:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('listings', '0131_staff_viewed_by_admin'),
    ]

    operations = [
        migrations.AddField(
            model_name='listing',
            name='updated_after_approval',
            field=models.BooleanField(default=False),
        ),
    ]
