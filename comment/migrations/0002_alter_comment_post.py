# Generated by Django 5.1.1 on 2024-11-25 09:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('comment', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comment',
            name='post',
            field=models.URLField(blank=True, null=True),
        ),
    ]
