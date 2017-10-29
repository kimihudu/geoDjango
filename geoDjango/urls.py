"""geoDjango URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import *
from django.contrib import admin
from here2there import views as app_views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', app_views.home, name='home'),
    url(r'contact/$', app_views.contact, name='contactus'),
    url(r'mapview/$', app_views.mapview, name='mapview'),
    url(r'transport/$', app_views.transport, name='transport'),
    # url(r'^login/$', app_views.login, name='login'),

]

# urlpatterns += patterns('', (
#         r'^static/(?P<path>.*)$',
#         'django.views.static.serve',
#         {'document_root': 'static'}
# ))
