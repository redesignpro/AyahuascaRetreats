# Generated by Django 3.2.5 on 2021-07-23 09:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('listings', '0038_auto_20210723_0530'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bedcombo',
            name='bed_config',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='combos', to='listings.bedconfig'),
        ),
    ]
