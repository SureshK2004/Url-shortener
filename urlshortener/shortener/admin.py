from django.contrib import admin
from .models import ShortenedURL

@admin.register(ShortenedURL)
class ShortenedURLAdmin(admin.ModelAdmin):
    list_display = ('short_code', 'truncated_url', 'click_count', 'created_at')
    list_filter = ('is_active', 'created_at')
    search_fields = ('original_url', 'short_code')
    readonly_fields = ('click_count', 'created_at', 'updated_at')
    
    def truncated_url(self, obj):
        return obj.original_url[:50] + '...' if len(obj.original_url) > 50 else obj.original_url
    truncated_url.short_description = 'Original URL'