# Generated by Django 5.2.4 on 2025-07-19 05:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('automator', '0003_remove_task_is_posted_remove_task_scheduled_time_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='ai_model',
            field=models.CharField(choices=[('gpt', 'GPT'), ('gemini', 'Gemini')], max_length=20),
        ),
    ]
