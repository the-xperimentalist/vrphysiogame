from django.conf.urls import url
from api.views import *

urlpatterns = [
    url(r'^user_login/', LoginView.as_view(), name='login'),
    url(r'^users/(?P<id>[0-9]+)/', UserDetail.as_view(), name='user-detail'),
    url(r'^userdb/', UserDBCreate.as_view(), name='user-db-create'),
]
