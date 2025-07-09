from rest_framework import viewsets, permissions
from .models import License
from .serializers import LicenseSerializer

class LicenseViewSet(viewsets.ModelViewSet):
    queryset = License.objects.all().order_by("-created_at")
    serializer_class = LicenseSerializer

    def get_permissions(self):
        if self.action in ["partial_update", "update", "destroy"]:
            return [permissions.IsAdminUser()]
        if self.action == "create":
            return [permissions.IsAuthenticated()]
        return [permissions.IsAuthenticated()]

    def perform_create(self, serializer):
        serializer.save(uploaded_by=self.request.user)
