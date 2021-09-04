# Generated by Django 3.2.5 on 2021-07-21 12:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('listings', '0029_alter_accommodation_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='room',
            name='accommodation',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='rooms', to='listings.accommodation'),
        ),
        migrations.AlterField(
            model_name='roomimages',
            name='room',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='listings.room'),
        ),
    ]
