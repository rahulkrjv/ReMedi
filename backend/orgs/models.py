from django.db import models
from django.conf import settings

class OrgProfile(models.Model):
    ORG_TYPE_CHOICES = [
        ("HOSPITAL", "Hospital"),
        ("PHARMACY", "Pharmacy"),
        ("NGO", "NGO"),
        ("CLINIC", "Clinic"),
    ]

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="org_profile"
    )
    name = models.CharField(max_length=255)
    org_type = models.CharField(max_length=20, choices=ORG_TYPE_CHOICES)
    license_number = models.CharField(max_length=100)
    license_document = models.FileField(upload_to="licenses/")
    address = models.TextField()
    phone = models.CharField(max_length=30)
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} ({self.get_org_type_display()})"
