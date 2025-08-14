import { Box, Typography, Link as MuiLink } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: theme.palette.primary.main,
        color: 'white'
      }}
    >
      <Typography variant="body2" align="center">
        © {new Date().getFullYear()} URL Shortener. All rights reserved.
      </Typography>
      <Typography variant="body2" align="center" sx={{ mt: 1 }}>
        <MuiLink 
          href="#" 
          color="inherit" 
          sx={{ mx: 1, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
        >
          Terms
        </MuiLink>
        |
        <MuiLink 
          href="#" 
          color="inherit" 
          sx={{ mx: 1, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
        >
          Privacy
        </MuiLink>
        |
        <MuiLink 
          href="#" 
          color="inherit" 
          sx={{ mx: 1, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
        >
          Contact
        </MuiLink>
      </Typography>
    </Box>
  );
};

export default Footer;