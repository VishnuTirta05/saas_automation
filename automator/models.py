from django.db import models

APP_CHOICES = [
    ('linkedin', 'LinkedIn'),
    ('twitter', 'Twitter'),
    ('instagram', 'Instagram'),
]

AI_MODEL_CHOICES = [
    ('gpt', 'GPT'),
    ('gemini', 'Gemini'),
]

class Task(models.Model):
    app = models.CharField(max_length=50, choices=APP_CHOICES)
    ai_model = models.CharField(max_length=20, choices=AI_MODEL_CHOICES)
    prompt = models.TextField()
    ai_response = models.TextField(blank=True, null=True)
    automation_result = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.app} - {self.prompt[:30]}"





