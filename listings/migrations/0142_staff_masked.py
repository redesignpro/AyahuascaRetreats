# Generated by Django 3.2.5 on 2021-08-23 09:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('listings', '0141_videos_created_at'),
    ]

    operations = [
        migrations.AddField(
            model_name='staff',
            name='masked',
            field=models.BooleanField(default=False),
        ),
    ]
