# Generated by Django 3.0.5 on 2020-04-14 20:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_booking'),
    ]

    operations = [
        migrations.AlterField(
            model_name='booking',
            name='phone_number',
            field=models.CharField(max_length=15),
        ),
    ]
