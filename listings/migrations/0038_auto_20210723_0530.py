# Generated by Django 3.2.5 on 2021-07-23 09:30

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('listings', '0037_bedconfigbranch_room'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='bedcombo',
            name='bed_config_branch',
        ),
        migrations.AddField(
            model_name='bedcombo',
            name='bed_config',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='listings.bedconfig'),
        ),
        migrations.AlterField(
            model_name='bedconfig',
            name='room',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='listings.room'),
        ),
        migrations.DeleteModel(
            name='BedConfigBranch',
        ),
    ]
