from django.urls import path
import prediction.views as views
urlpatterns = [
    path('predict/', views.IRIS_Model_Predict.as_view(), name='api_predict'),
    path('youtube/', views.YoutubeScraper.as_view(), name='api_youtube'),
    path('twitter/', views.Twitter.as_view(), name='api_twitter'),
    path('instagram/', views.InstagramScraper.as_view(), name='api_instagram'),
]
