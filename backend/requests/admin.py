from django.contrib import admin
from .models import Request

@admin.register(Request)
class RequestAdmin(admin.ModelAdmin):
    list_display = ("id", "medication", "requester", "owner", "quantity", "status", "created_at")
    list_filter = ("status", "created_at")
    search_fields = ("medication__name", "requester__name", "owner__name")
