from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle, UserRateThrottle
from django.shortcuts import get_object_or_404, redirect
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from .models import ShortenedURL
from .serializers import ShortenedURLSerializer

class ShortenURLView(generics.CreateAPIView):
    """
    API endpoint that creates short URLs
    """
    queryset = ShortenedURL.objects.all()
    serializer_class = ShortenedURLSerializer
    throttle_classes = [AnonRateThrottle]
    
    def create(self, request, *args, **kwargs):
        # Check for existing URL before creating new one
        original_url = request.data.get('original_url')
        existing = ShortenedURL.objects.filter(
            original_url=original_url
        ).first()
        
        if existing:
            serializer = self.get_serializer(existing)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        return super().create(request, *args, **kwargs)

@method_decorator(csrf_exempt, name='dispatch')
class RedirectView(generics.GenericAPIView):
    """
    Handles redirects from short URLs to original URLs
    """
    queryset = ShortenedURL.objects.all()
    lookup_field = 'short_code'
    lookup_url_kwarg = 'short_code'
    
    def get(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.click_count += 1
        instance.save()
        
        # Add analytics tracking here (see next steps)
        
        return redirect(instance.original_url)