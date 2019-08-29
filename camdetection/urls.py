from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^pose_detect/$',views.index,name='index'),
    url(r'cam_detect/(?P<user_db_id>[0-9]+)/$',views.cam_detect,name='cam_detect'),
    url(r'^signup/',views.signup,name='signup'),
    url(r'^login/',views.login_view,name='login'),
    url(r'^logout/',views.logout_view,name='logout'),
    url(r'^enter_cam/$',views.enter_cam,name='enter_cam')
]
