from django.contrib import admin
from .models import License

@admin.register(License)
class LicenseAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "org",
        "license_type",
        "license_number",
        "status",
        "issued_date",
        "expiry_date",
        "uploaded_by",
        "visibility_public",
        "created_at",
    )
    list_filter = ("license_type", "status", "issued_date", "expiry_date")
    search_fields = ("license_number", "org__name")
