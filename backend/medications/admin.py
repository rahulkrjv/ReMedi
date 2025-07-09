from django.contrib import admin
from .models import Medication

@admin.register(Medication)
class MedicationAdmin(admin.ModelAdmin):
    list_display = (
        "id", "name", "org", "quantity", "expiry", "status",
        "is_flagged", "is_active", "created_at"
    )
    list_filter = ("status", "is_flagged", "is_active", "org")
    search_fields = ("name", "batch", "manufacturer", "org__name")
