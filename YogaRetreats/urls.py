from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from django.contrib.auth.views import LogoutView
urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('allauth.urls')),
    path('', include('listings.urls')),
]


if settings.DEBUG is True:
    print('debug on')
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)