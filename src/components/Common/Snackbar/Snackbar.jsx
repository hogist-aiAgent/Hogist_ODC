import { Snackbar, Alert } from '@mui/material';

/**
 * Reusable snackbar notification, used wherever the app previously used
 * window.alert(...) for a quick, non-blocking message to the user.
 *
 * Usage:
 *   const [notice, setNotice] = useState({ open: false, message: '', severity: 'info' });
 *   <Notification
 *     open={notice.open}
 *     message={notice.message}
 *     severity={notice.severity}
 *     onClose={() => setNotice((prev) => ({ ...prev, open: false }))}
 *   />
 */
export default function Notification({
  open,
  message,
  severity = 'info', // 'success' | 'info' | 'warning' | 'error'
  onClose,
  autoHideDuration = 5000,
  anchorOrigin = { vertical: 'top', horizontal: 'center' },
}) {
  const handleClose = (_event, reason) => {
    if (reason === 'clickaway') return;
    onClose?.();
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      anchorOrigin={anchorOrigin}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        variant="filled"
        sx={{ width: '100%', alignItems: 'center' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}