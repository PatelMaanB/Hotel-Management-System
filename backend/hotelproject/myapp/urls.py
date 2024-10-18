from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.user_log_in),
    path('signup/', views.user_sign_up),
    path('getrooms/',views.get_room_types),
    path('bookroom/',views.book_room),
    path('getuserdata/',views.fetch_user_data),
    path('finalprice/',views.store_final_price)
]
