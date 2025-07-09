from django.db import models
from orgs.models import OrgProfile

class Medication(models.Model):
    STATUS_CHOICES = [
        ("AVAILABLE", "Available"),
        ("CLAIMED", "Claimed"),
        ("EXPIRED", "Expired"),
    ]
    org = models.ForeignKey(
        OrgProfile, on_delete=models.CASCADE, related_name="medications"
    )
    name = models.CharField(max_length=255)
    quantity = models.PositiveIntegerField()
    expiry = models.DateField()
    batch = models.CharField(max_length=100)
    storage = models.CharField(max_length=255)
    manufacturer = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_flagged = models.BooleanField(default=False)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="AVAILABLE")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} ({self.org.name}) - {self.quantity} units"
