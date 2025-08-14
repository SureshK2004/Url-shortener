from rest_framework import serializers
from .models import ShortenedURL
from .utils import normalize_url

class ShortenedURLSerializer(serializers.ModelSerializer):
    short_url = serializers.SerializerMethodField()
    domain = serializers.SerializerMethodField()
    
    class Meta:
        model = ShortenedURL
        fields = [
            'id', 
            'original_url', 
            'short_code', 
            'short_url',
            'domain',
            'click_count', 
            'created_at'
        ]
        read_only_fields = [
            'id',
            'short_code', 
            'short_url',
            'domain',
            'click_count', 
            'created_at'
        ]
    
    def get_short_url(self, obj):
        request = self.context.get('request')
        return request.build_absolute_uri(f'/{obj.short_code}')
    
    def get_domain(self, obj):
        from .utils import extract_domain
        return extract_domain(obj.original_url)
    
    def validate_original_url(self, value):
        """Additional URL validation and normalization"""
        from .utils import normalize_url
        return normalize_url(value)