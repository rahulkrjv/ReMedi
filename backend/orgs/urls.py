from rest_framework.routers import DefaultRouter
from .views import OrgProfileViewSet

router = DefaultRouter()
router.register(r"profiles", OrgProfileViewSet, basename="orgprofile")

urlpatterns = router.urls