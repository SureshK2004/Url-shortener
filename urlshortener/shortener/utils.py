from urllib.parse import urlparse
import tldextract

def normalize_url(url):
    """Normalize URL to improve duplicate detection"""
    parsed = urlparse(url)
    
    # Add scheme if missing (default to https)
    if not parsed.scheme:
        url = 'https://' + url
        parsed = urlparse(url)
    
    # Remove www, fragment, and trailing slash
    netloc = parsed.netloc.lower()
    if netloc.startswith('www.'):
        netloc = netloc[4:]
    
    path = parsed.path.rstrip('/')
    
    # Reconstruct URL
    normalized = f"{parsed.scheme}://{netloc}{path}"
    if parsed.query:
        normalized += f"?{parsed.query}"
    
    return normalized

def extract_domain(url):
    """Extract main domain for analytics"""
    extracted = tldextract.extract(url)
    return f"{extracted.domain}.{extracted.suffix}"