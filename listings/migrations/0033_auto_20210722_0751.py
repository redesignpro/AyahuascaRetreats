# Generated by Django 3.2.5 on 2021-07-22 11:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('listings', '0032_alter_bedconfig_room'),
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
        migrations.CreateModel(
            name='BedCombo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bed_type', models.IntegerField(blank=True, choices=[(1, 'Single Bed (1 people)'), (2, 'Platform Bed (2 people)'), (3, 'Crib (1 people)'), (4, 'Mid sleeper bed (1 people)'), (5, 'Sofa bed (1 people)'), (6, 'Ottoman Bed (1 people)'), (7, 'Double Bed (2 people)'), (8, 'Folding Bed ( people)'), (9, 'Twin Bed (2 people)'), (10, 'Antique Style Bed (2 people)'), (11, 'Water Bed (2 people)'), (12, 'Queen Size Bed (2 people)'), (13, 'Murphy Bed (2 people)'), (14, 'Cot Bed (1 people)'), (15, 'Trundle Bed (2 people)'), (16, 'Hanging Bed (1 people)'), (17, 'King Size Bed (2 people)'), (18, 'Canopy Bed (2 people)'), (19, 'Bunk Bed (2 people)'), (20, 'L-shaped Bunk Bed (3 people)'), (21, 'Hammock (1 people)')], null=True)),
                ('num_beds', models.PositiveIntegerField(blank=True, null=True)),
                ('config', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='combos', to='listings.bedconfig')),
            ],
        ),
    ]
