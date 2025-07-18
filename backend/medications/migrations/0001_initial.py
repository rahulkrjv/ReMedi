# Generated by Django 5.2.4 on 2025-07-08 19:24

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Medication",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=255)),
                ("quantity", models.PositiveIntegerField()),
                ("expiry", models.DateField()),
                ("batch", models.CharField(max_length=100)),
                ("storage", models.CharField(max_length=255)),
                ("manufacturer", models.CharField(max_length=255)),
                ("is_active", models.BooleanField(default=True)),
                ("is_flagged", models.BooleanField(default=False)),
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("AVAILABLE", "Available"),
                            ("CLAIMED", "Claimed"),
                            ("EXPIRED", "Expired"),
                        ],
                        default="AVAILABLE",
                        max_length=20,
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
        ),
    ]
