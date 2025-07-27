from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Task
from .serializers import TaskSerializer
from .ai_utils import handle_prompt
from .linkedIn_automation import linkedin_automation

class TaskListCreateAPIView(APIView):
    def get(self, request):
        tasks = Task.objects.all().order_by('-created_at')
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            prompt = serializer.validated_data['prompt']
            app = serializer.validated_data['app']
            ai_model = serializer.validated_data['ai_model']

            ai_response = handle_prompt(prompt)

            automation_result = f"[Simulated Automation for {app}]: {ai_response}"

            if app == 'linkedin':
                username = request.data.get("linkedin_username", "")
                password = request.data.get("linkedin_password", "")
                try:
                    automation_result = "[LinkedIn Automation]: " + linkedin_automation(ai_response, username, password)
                except Exception as e:
                    automation_result = f"[LinkedIn Automation Failed]: {str(e)}"

            task = serializer.save(ai_response=ai_response, automation_result=automation_result)
            return Response(TaskSerializer(task).data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
















