# Generated by Django 3.2.5 on 2021-07-23 09:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('listings', '0035_auto_20210723_0419'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='bedconfig',
            name='bed_type',
        ),
        migrations.RemoveField(
            model_name='bedconfig',
            name='num_beds',
        ),
        migrations.AlterField(
            model_name='bedconfig',
            name='room',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='configs', to='listings.room'),
        ),
        migrations.CreateModel(
            name='BedConfigBranch',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bedconfig', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='group', to='listings.bedconfig')),
            ],
        ),
        migrations.CreateModel(
            name='BedCombo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bed_type', models.IntegerField(blank=True, choices=[(1, 'Single Bed (1 people)'), (2, 'Double Bed (2 people)'), (3, 'Queen Size Bed (2 people)'), (4, 'King size bed (2 people)'), (5, 'Platform bed (2 people)'), (6, 'Folding bed (1 people)'), (7, 'Murphy bed (2 people)'), (8, 'Canopy bed (2 people)'), (9, 'Crib (1 people)'), (10, 'Twin bed (2 people)'), (11, 'Cot bed (1 people)'), (12, 'Bunk bed (2 people)'), (13, 'Mid sleeper bed (1 people)'), (14, 'Antique style bed (2 people)'), (15, 'Trundle bed (2 people)'), (16, 'L-shaped bunk bed (3 people)'), (17, 'Sofa bed (2 people)'), (18, 'Water bed (2 people)'), (19, 'Hanging bed (1 people)'), (20, 'Hammock (1 people)'), (21, 'Ottoman bed (1 people)')], null=True)),
                ('num_beds', models.PositiveIntegerField(blank=True, null=True)),
                ('bed_config_branch', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='listings.bedconfigbranch')),
            ],
        ),
    ]
