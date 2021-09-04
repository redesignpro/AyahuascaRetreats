# Generated by Django 3.2.5 on 2021-07-16 08:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('listings', '0010_auto_20210715_0835'),
    ]

    operations = [
        migrations.AlterField(
            model_name='listing',
            name='instruction_language',
            field=models.IntegerField(choices=[(1, 'Afrikaans'), (2, 'Arabic'), (3, 'Armenian'), (4, 'Bulgarian'), (5, 'Catalan; Valencian'), (6, 'Chinese'), (7, 'Croatian'), (8, 'Czech'), (9, 'Danish'), (10, 'Dutch'), (11, 'English'), (12, 'Estonian'), (13, 'Fijian'), (14, 'Finnish'), (15, 'French'), (16, 'Georgian'), (17, 'German'), (18, 'Greek, Modern'), (19, 'Hebrew, Modern'), (20, 'Hindi'), (21, 'Hungarian'), (22, 'Indonesian'), (23, 'Italian'), (24, 'Japanese'), (25, 'Kyrgyz'), (26, 'Korean'), (27, 'Lao'), (28, 'Lithuanian'), (29, 'Latvian'), (30, 'Macedonian'), (31, 'Malay'), (32, 'Malayalam'), (33, 'Mongolian'), (34, 'Nepali'), (35, 'Norwegian'), (36, 'Polish'), (37, 'Portuguese'), (38, 'Romanian'), (39, 'Russian'), (40, 'Sanskrit'), (41, 'Serbian'), (42, 'Sinhala, (Sinhalese)'), (43, 'Slovak'), (44, 'Spanish; Castilian'), (45, 'Swedish'), (46, 'Tamil'), (47, 'Telugu'), (48, ' Thai'), (49, 'Tagalog'), (50, 'Turkish'), (51, 'Ukrainian'), (52, 'Vietnamese')], default=11),
        ),
        migrations.AlterField(
            model_name='listingimage',
            name='listing',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='listings.listing'),
        ),
    ]
