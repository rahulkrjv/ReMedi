from django.db import models
from orgs.models import OrgProfile
from medications.models import Medication

class Request(models.Model):
    STATUS_CHOICES = [
        ("PENDING", "Pending"),
        ("APPROVED", "Approved"),
        ("REJECTED", "Rejected"),
        ("FULFILLED", "Fulfilled"),
        ("CANCELLED", "Cancelled"),
    ]
    medication = models.ForeignKey(
        Medication, on_delete=models.CASCADE, related_name="requests"
    )
    requester = models.ForeignKey(
        OrgProfile, on_delete=models.CASCADE, related_name="requests_made"
    )
    owner = models.ForeignKey(
        OrgProfile, on_delete=models.CASCADE, related_name="requests_received"
    )
    quantity = models.PositiveIntegerField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="PENDING")
    message = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Request {self.id} for {self.medication.name} ({self.quantity})"
