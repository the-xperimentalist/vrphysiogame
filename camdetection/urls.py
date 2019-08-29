from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^pose_detect/$',views.index,name='index'),
    url(r'^signup/',views.signup,name='signup'),
    url(r'^login/',views.login_view,name='login'),
    url(r'^logout/',views.logout_view,name='logout'),
]
