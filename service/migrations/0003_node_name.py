# Generated by Django 5.1.1 on 2024-11-25 06:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service', '0002_node_password_node_username'),
    ]

    operations = [
        migrations.AddField(
            model_name='node',
            name='name',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
    ]
