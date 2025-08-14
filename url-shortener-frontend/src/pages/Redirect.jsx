import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import ErrorAlert from '../components/common/ErrorAlert';
import { shortenUrl } from '../services/api';

const Redirect = () => {
  const { shortCode } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const redirectToOriginal = async () => {
      try {
        // In a real app, you might directly redirect to backend endpoint
        // This is just for demonstration
        const response = await shortenUrl(`https://dummy.com/${shortCode}`);
        
        // Simulate redirect after delay
        setTimeout(() => {
          window.location.href = response.original_url;
        }, 1500);
      } catch (err) {
        setError('Invalid or expired short URL');
        setLoading(false);
      }
    };

    redirectToOriginal();
  }, [shortCode, navigate]);

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh'
      }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 3 }}>
          Redirecting you...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      {error && <ErrorAlert message={error} />}
    </Box>
  );
};

export default Redirect;