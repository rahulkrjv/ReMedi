from rest_framework import serializers
from .models import Medication

class MedicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medication
        fields = [
            "id",
            "org",
            "name",
            "quantity",
            "expiry",
            "batch",
            "storage",
            "manufacturer",
            "is_active",
            "is_flagged",
            "status",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "org", "created_at", "updated_at"]