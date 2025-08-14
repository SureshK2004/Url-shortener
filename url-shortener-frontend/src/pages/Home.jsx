import { useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import ShortenForm from '../components/URLShortener/ShortenForm';
import ResultDisplay from '../components/URLShortener/ResultDsiplay';
import ErrorAlert from '../components/common/ErrorAlert';

const Home = () => {
  const [shortUrl, setShortUrl] = useState(null);
  const [error, setError] = useState(null);

  const handleSuccess = (data) => {
    setShortUrl(data.short_url);
    setError(null);
  };

  const handleError = (message) => {
    setError(message);
    setShortUrl(null);
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Box sx={{ 
        textAlign: 'center', 
        mb: 6,
        px: 2
      }}>
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          URL Shortener
        </Typography>
        <Typography variant="h5" color="text.secondary">
          Create short, memorable links for any URL
        </Typography>
      </Box>
      
      <Box sx={{ 
        bgcolor: 'background.paper', 
        p: 4, 
        borderRadius: 3,
        boxShadow: 1
      }}>
        <ShortenForm 
          onSuccess={handleSuccess} 
          onError={handleError} 
        />
        
        {error && (
          <ErrorAlert message={error} onClose={() => setError(null)} />
        )}
        
        {shortUrl && <ResultDisplay shortUrl={shortUrl} />}
      </Box>
    </Container>
  );
};

export default Home;