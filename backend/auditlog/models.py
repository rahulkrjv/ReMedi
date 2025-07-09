from django.db import models
from django.conf import settings

class AuditLog(models.Model):
    ACTION_CHOICES = [
        ("create", "Create"),
        ("update", "Update"),
        ("delete", "Delete"),
        ("login", "Login"),
        ("logout", "Logout"),
        ("approve", "Approve"),
        ("reject", "Reject"),
        ("export", "Export"),
        ("other", "Other"),
    ]
    actor = models.ForeignKey(
        settings.AUTH_USER_MODEL, null=True, blank=True, on_delete=models.SET_NULL
    )
    action = models.CharField(max_length=32, choices=ACTION_CHOICES)
    target_model = models.CharField(max_length=128)
    target_id = models.CharField(max_length=128, blank=True, null=True)
    description = models.TextField(blank=True, default="")
    ip_address = models.CharField(max_length=64, blank=True, default="")
    timestamp = models.DateTimeField(auto_now_add=True)
    extra = models.JSONField(blank=True, null=True)

    def __str__(self):
        return f"{self.timestamp} {self.actor} {self.action} {self.target_model} {self.target_id}"
