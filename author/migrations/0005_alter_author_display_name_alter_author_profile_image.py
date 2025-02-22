# Generated by Django 5.1.1 on 2024-12-05 06:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('author', '0004_alter_author_fqid_alter_author_github_url_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='author',
            name='display_name',
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name='author',
            name='profile_image',
            field=models.URLField(blank=True, default='', max_length=500, null=True),
        ),
    ]
