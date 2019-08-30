from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^phone_reg_detect/$',views.phone_reg_detect,name='index'),
    url(r'cam_detect/(?P<user_db_id>[0-9]+)/$',views.cam_detect,name='cam_detect'),
    url(r'^signup/',views.signup,name='signup'),
    url(r'^login/',views.login_view,name='login'),
    url(r'^logout/',views.logout_view,name='logout'),
    url(r'^pose_data/(?P<user_db_id>[0-9]+)/$', views.pose_data, name='pose_data'),
    url(r'^enter_cam/$',views.enter_cam,name='enter_cam')
]
