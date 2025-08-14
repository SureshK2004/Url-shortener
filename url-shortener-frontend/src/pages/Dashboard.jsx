import { Container, Typography, Box } from '@mui/material';
import URLList from '../components/URLShortener/URLList';

const Dashboard = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
        Your URLs
      </Typography>
      
      <Box sx={{ 
        bgcolor: 'background.paper', 
        p: 4, 
        borderRadius: 3,
        boxShadow: 1,
        mt: 4
      }}>
        <Typography variant="h6" gutterBottom>
          Recently Shortened URLs
        </Typography>
        <URLList />
      </Box>
    </Container>
  );
};

export default Dashboard;