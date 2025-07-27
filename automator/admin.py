from django.contrib import admin
from .models import Task

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('app', 'ai_model', 'prompt', 'created_at')
    search_fields = ('app', 'ai_model', 'prompt')
    list_filter = ('app', 'ai_model', 'created_at')
