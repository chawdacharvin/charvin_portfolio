from django.urls import path
from . import views
urlpatterns = [
    path("",views.home,name="home"),
    path("about/",views.about,name="about"),
    path("projects/",views.projects,name="project"),
    path("contact/",views.contact,name="contact"),
    path("chatbot/",views.chatbot_view,name="chatbot"),
     path("healthcheck/",views.healthcheck,name="healthcheck"),
]
