# Generated by Django 3.2.5 on 2021-08-09 09:43

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('listings', '0079_auto_20210809_0541'),
    ]

    operations = [
        migrations.RenameField(
            model_name='inquiry',
            old_name='due_date',
            new_name='to_be_paid',
        ),
    ]
