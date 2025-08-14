import { Alert, Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';

const ErrorAlert = ({ message, onClose, autoClose = true, autoCloseDuration = 6000 }) => {
  const [open, setOpen] = useState(!!message);

  useEffect(() => {
    setOpen(!!message);
    
    if (autoClose && message) {
      const timer = setTimeout(() => {
        setOpen(false);
        if (onClose) onClose();
      }, autoCloseDuration);
      
      return () => clearTimeout(timer);
    }
  }, [message, autoClose, autoCloseDuration, onClose]);

  const handleClose = () => {
    setOpen(false);
    if (onClose) onClose();
  };

  if (!message) return null;

  return (
    <Collapse in={open} sx={{ my: 2 }}>
      <Alert
        severity="error"
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={handleClose}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        {message}
      </Alert>
    </Collapse>
  );
};

export default ErrorAlert;