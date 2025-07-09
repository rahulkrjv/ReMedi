from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import OrgProfile
from .serializers import OrgProfileSerializer

class IsAdminOrOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user.is_superuser or obj.user == request.user

class OrgProfileViewSet(viewsets.ModelViewSet):
    queryset = OrgProfile.objects.all()
    serializer_class = OrgProfileSerializer

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            return [permissions.IsAuthenticated()]
        elif self.action in ["update", "partial_update", "destroy"]:
            return [IsAdminOrOwner()]
        elif self.action == "create":
            return [permissions.IsAuthenticated()]
        return super().get_permissions()

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            return OrgProfile.objects.all()
        return OrgProfile.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def update(self, request, *args, **kwargs):
        # Only allow owner or admin to update
        instance = self.get_object()
        if not (request.user.is_superuser or instance.user == request.user):
            return Response({"detail": "Not allowed."}, status=status.HTTP_403_FORBIDDEN)
        return super().update(request, *args, **kwargs)
