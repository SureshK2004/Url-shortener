import { AppBar, Toolbar, Typography, Button, Box, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
  const theme = useTheme();

  return (
    <AppBar position="static" elevation={0} sx={{ bgcolor: theme.palette.primary.main }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box component={Link} to="/" sx={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
            URL Shortener
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            component={Link} 
            to="/" 
            color="inherit"
            sx={{ textTransform: 'none' }}
          >
            Home
          </Button>
          <Button 
            component={Link} 
            to="/dashboard" 
            color="inherit"
            sx={{ textTransform: 'none' }}
          >
            Dashboard
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;