# Generated by Django 3.2.5 on 2021-08-23 12:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('listings', '0145_messages_is_flagged'),
    ]

    operations = [
        migrations.AddField(
            model_name='videos',
            name='size',
            field=models.FloatField(blank=True, null=True),
        ),
    ]
