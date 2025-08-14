import { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography,
  CircularProgress,
  useMediaQuery
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { shortenUrl } from '../../services/api';

const ShortenForm = ({ onSuccess, onError }) => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');

  const validateUrl = (input) => {
    try {
      // Basic URL validation
      const urlObj = new URL(input);
      return ['http:', 'https:'].includes(urlObj.protocol);
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateUrl(url)) {
      onError('Please enter a valid URL starting with http:// or https://');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const data = await shortenUrl(url);
      onSuccess(data);
    } catch (err) {
      onError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Paste your long URL
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          label="https://example.com/very/long/url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={isLoading}
          size={isMobile ? 'small' : 'medium'}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size={isMobile ? 'small' : 'medium'}
          endIcon={isLoading ? <CircularProgress size={24} /> : <SendIcon />}
          disabled={isLoading || !url}
          sx={{ 
            minWidth: isMobile ? '100%' : 150,
            height: isMobile ? '40px' : '56px'
          }}
        >
          {isLoading ? 'Shortening' : 'Shorten'}
        </Button>
      </Box>
    </Box>
  );
};

export default ShortenForm;