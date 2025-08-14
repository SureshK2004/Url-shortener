import { useState } from 'react';
import { 
  Box, 
  TextField, 
  IconButton, 
  Typography,
  Tooltip,
  useMediaQuery
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const ResultDisplay = ({ shortUrl }) => {
  const [copied, setCopied] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box sx={{ 
      mt: 4, 
      p: 3, 
      bgcolor: 'secondary.main', 
      borderRadius: 2,
      color: 'white'
    }}>
      <Typography variant="h6" gutterBottom>
        Your shortened URL:
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <TextField
          fullWidth
          value={shortUrl}
          InputProps={{
            readOnly: true,
            sx: { 
              bgcolor: 'background.paper',
              color: 'text.primary',
              '& input': {
                padding: isMobile ? '8px 12px' : '12px 16px'
              }
            }
          }}
          size={isMobile ? 'small' : 'medium'}
        />
        <CopyToClipboard text={shortUrl} onCopy={handleCopy}>
          <Tooltip title={copied ? 'Copied!' : 'Copy to clipboard'}>
            <IconButton
              sx={{ 
                bgcolor: 'background.paper',
                '&:hover': { bgcolor: 'primary.light' },
                height: isMobile ? '40px' : '56px',
                width: isMobile ? '40px' : '56px'
              }}
            >
              {copied ? <CheckIcon color="success" /> : <ContentCopyIcon />}
            </IconButton>
          </Tooltip>
        </CopyToClipboard>
      </Box>
      <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
        Share this link anywhere you need a shorter URL
      </Typography>
    </Box>
  );
};

export default ResultDisplay;