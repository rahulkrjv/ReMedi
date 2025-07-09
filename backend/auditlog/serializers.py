from rest_framework import serializers

from .models import AuditLog


class AuditLogSerializer(serializers.ModelSerializer):
    actor_email = serializers.CharField(source="actor.email", read_only=True)

    class Meta:
        model = AuditLog
        fields = [
            "id",
            "actor",
            "actor_email",
            "action",
            "target_model",
            "target_id",
            "description",
            "ip_address",
            "timestamp",
            "extra",
        ]
        read_only_fields = ["id", "timestamp", "actor_email"]