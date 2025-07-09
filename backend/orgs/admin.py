from django.contrib import admin
from .models import OrgProfile

@admin.register(OrgProfile)
class OrgProfileAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "org_type", "user", "is_verified", "created_at")
    list_filter = ("org_type", "is_verified")
    search_fields = ("name", "license_number", "user__email")
