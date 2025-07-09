from django.db import models
from django.conf import settings

class License(models.Model):
    LICENSE_TYPES = [
        ("pharmacy", "Pharmacy"),
        ("hospital", "Hospital"),
        ("ngo", "NGO"),
        ("clinic", "Clinic"),
    ]
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("approved", "Approved"),
        ("rejected", "Rejected"),
        ("expired", "Expired"),
    ]
    org = models.ForeignKey(
        "orgs.OrgProfile", on_delete=models.CASCADE, related_name="licenses"
    )
    license_type = models.CharField(max_length=50, choices=LICENSE_TYPES)
    document = models.FileField(upload_to="licenses/")
    license_number = models.CharField(max_length=128)
    issued_date = models.DateField()
    expiry_date = models.DateField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    uploaded_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True
    )
    visibility_public = models.BooleanField(default=False)
    notes = models.TextField(blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.license_number} ({self.org.name})"
