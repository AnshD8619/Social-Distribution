# Generated by Django 5.1.1 on 2024-11-23 08:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='visibility',
            field=models.CharField(choices=[('public', 'PUBLIC'), ('friend-only', 'FRIENDS'), ('unlisted', 'UNLISTED'), ('deleted', 'DELETED')], default='public', max_length=11),
        ),
    ]
