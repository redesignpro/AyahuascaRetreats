# Generated by Django 3.2.5 on 2021-07-25 08:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0008_videos'),
    ]

    operations = [
        migrations.AddField(
            model_name='videos',
            name='name',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
    ]
