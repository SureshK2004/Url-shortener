import { Box } from '@mui/material';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      backgroundColor: 'background.default'
    }}>
      <Header />
      
      <Box component="main" sx={{ 
        flex: 1,
        py: 4,
        px: { xs: 2, sm: 3 }
      }}>
        {children}
      </Box>
      
      <Footer />
    </Box>
  );
};

export default Layout;