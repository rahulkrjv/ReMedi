from rest_framework import serializers
from .models import License

class LicenseSerializer(serializers.ModelSerializer):
    org_name = serializers.CharField(source="org.name", read_only=True)
    uploaded_by_email = serializers.CharField(source="uploaded_by.email", read_only=True)

    class Meta:
        model = License
        fields = [
            "id",
            "org",
            "org_name",
            "license_type",
            "document",
            "license_number",
            "issued_date",
            "expiry_date",
            "status",
            "uploaded_by",
            "uploaded_by_email",
            "visibility_public",
            "notes",
            "created_at",
        ]
        read_only_fields = [
            "id",
            "created_at",
            "org_name",
            "uploaded_by_email",
            "status",  # Only admins update status
        ]