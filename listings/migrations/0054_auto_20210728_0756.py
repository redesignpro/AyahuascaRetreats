# Generated by Django 3.2.5 on 2021-07-28 11:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('listings', '0053_listingpackage_date'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='listingpackage',
            name='date',
        ),
        migrations.CreateModel(
            name='PackagePrices',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('used_slots', models.IntegerField(blank=True, default=0, null=True)),
                ('max_slots', models.IntegerField(blank=True, null=True)),
                ('price', models.IntegerField(blank=True, null=True)),
                ('date', models.DateField(blank=True, null=True)),
                ('is_available', models.BooleanField(default=False)),
                ('package', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='prices', to='listings.listingpackage')),
            ],
        ),
    ]
