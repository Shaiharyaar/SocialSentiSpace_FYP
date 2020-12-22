from django.urls import path
import prediction.views as views
urlpatterns = [
    path('youtube/', views.YoutubeScraper.as_view(), name='api_youtube'),
    path('twitter/', views.Twitter.as_view(), name='api_twitter'),
    path('instagram/', views.InstagramScraper.as_view(), name='api_instagram'),
    path('facebook/', views.FacebookScraper.as_view(), name='api_instagram'),
]
