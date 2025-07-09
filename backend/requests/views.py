from rest_framework import viewsets, permissions
from django.db import models
from .models import Request
from .serializers import RequestSerializer

class RequestViewSet(viewsets.ModelViewSet):
    queryset = Request.objects.all().order_by("-created_at")
    serializer_class = RequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            return Request.objects.all().order_by("-created_at")
        if hasattr(user, "org_profile"):
            return Request.objects.filter(
                models.Q(requester=user.org_profile) | models.Q(owner=user.org_profile)
            ).order_by("-created_at")
        return Request.objects.none()

    def perform_create(self, serializer):
        user = self.request.user
        if hasattr(user, "org_profile"):
            # Owner is the org that owns the medication
            medication = serializer.validated_data["medication"]
            serializer.save(requester=user.org_profile, owner=medication.org)
        else:
            raise PermissionError("User has no organization profile.")
