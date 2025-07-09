from rest_framework import serializers
from .models import OrgProfile

class OrgProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrgProfile
        fields = [
            "id",
            "user",
            "name",
            "org_type",
            "license_number",
            "license_document",
            "address",
            "phone",
            "is_verified",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "is_verified", "created_at", "updated_at", "user"]