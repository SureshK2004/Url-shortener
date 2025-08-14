import { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Typography,
  IconButton,
  Tooltip
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { copyToClipboard } from '../../utils/helpers';
import Loader from '../common/Loader';
import ErrorAlert from '../common/ErrorAlert';

// Mock data - replace with actual API calls
const mockUrls = [
  {
    id: 1,
    original_url: 'https://example.com/very/long/url/path',
    short_code: 'abc123',
    short_url: 'http://short.ly/abc123',
    click_count: 42,
    created_at: '2023-05-15T10:30:00Z'
  },
  {
    id: 2,
    original_url: 'https://another-example.com/long/path',
    short_code: 'def456',
    short_url: 'http://short.ly/def456',
    click_count: 18,
    created_at: '2023-05-10T14:45:00Z'
  }
];

const URLList = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API call
    const fetchURLs = async () => {
      try {
        // In a real app: const response = await getShortenedURLs();
        setTimeout(() => {
          setUrls(mockUrls);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError('Failed to load URLs');
        setLoading(false);
      }
    };

    fetchURLs();
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorAlert message={error} />;

  return (
    <TableContainer component={Paper} elevation={0}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Short URL</TableCell>
            <TableCell>Original URL</TableCell>
            <TableCell align="right">Clicks</TableCell>
            <TableCell align="right">Created</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {urls.length > 0 ? (
            urls.map((url) => (
              <TableRow key={url.id}>
                <TableCell>
                  <Typography 
                    component="a" 
                    href={url.short_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    sx={{ textDecoration: 'none', color: 'primary.main' }}
                  >
                    {url.short_url}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography noWrap sx={{ maxWidth: '300px' }}>
                    {url.original_url}
                  </Typography>
                </TableCell>
                <TableCell align="right">{url.click_count}</TableCell>
                <TableCell align="right">
                  {new Date(url.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Copy">
                    <IconButton onClick={() => copyToClipboard(url.short_url)}>
                      <ContentCopyIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Open">
                    <IconButton 
                      component="a" 
                      href={url.short_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <OpenInNewIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                <Typography variant="body1" color="text.secondary">
                  No URLs found. Create your first shortened URL!
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default URLList;