import secrets
import string
from django.db import models
from django.core.validators import URLValidator
from django.core.exceptions import ValidationError

class ShortenedURL(models.Model):
    original_url = models.URLField(max_length=2048)
    short_code = models.CharField(max_length=12, unique=True, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    click_count = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        indexes = [
            models.Index(fields=['short_code']),
            models.Index(fields=['created_at']),
        ]
        ordering = ['-created_at']
    
    def save(self, *args, **kwargs):
        if not self.short_code:
            self.short_code = self.generate_short_code()
        self.full_clean()
        super().save(*args, **kwargs)
    
    @classmethod
    def generate_short_code(cls, length=8):
        """Generate cryptographically secure short code"""
        alphabet = string.ascii_letters + string.digits
        while True:
            code = ''.join(secrets.choice(alphabet) for _ in range(length))
            if not cls.objects.filter(short_code=code).exists():
                return code
    
    def clean(self):
        """Validate URL format"""
        validator = URLValidator()
        try:
            validator(self.original_url)
        except ValidationError as e:
            raise ValidationError({'original_url': 'Enter a valid URL'})
        
        # Basic security check - prevent javascript: URLs
        if self.original_url.lower().startswith(('javascript:', 'data:')):
            raise ValidationError({'original_url': 'Unsupported URL scheme'})
    
    def __str__(self):
        return f"{self.short_code} ({self.click_count} clicks)"