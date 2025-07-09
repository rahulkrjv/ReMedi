from rest_framework import viewsets, permissions
from .models import Medication
from .serializers import MedicationSerializer


class MedicationViewSet(viewsets.ModelViewSet):
    queryset = Medication.objects.all().order_by("-created_at")
    serializer_class = MedicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        if user.is_superuser:
            return Medication.objects.all().order_by("-created_at")

        if hasattr(user, "org_profile"):
            return Medication.objects.filter(org=user.org_profile).order_by("-created_at")

        return Medication.objects.none()

    def perform_create(self, serializer):
        user = self.request.user

        if hasattr(user, "org_profile"):
            serializer.save(org=user.org_profile)
        else:
            raise PermissionError("User has no organization profile.")
