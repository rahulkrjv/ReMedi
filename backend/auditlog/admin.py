from django.contrib import admin
from .models import AuditLog


@admin.register(AuditLog)
class AuditLogAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "actor",
        "action",
        "target_model",
        "target_id",
        "ip_address",
        "timestamp",
    )
    list_filter = ("action", "target_model", "timestamp")
    search_fields = ("actor__email", "target_model", "target_id", "description")
