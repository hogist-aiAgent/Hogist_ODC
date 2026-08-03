import { Box, Container, Grid, Stack, Typography, Button } from '@mui/material';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import ShopIcon from '@mui/icons-material/Shop';

export default function AppDownload() {
  return (
    <Box sx={{ bgcolor: '#1A1A2E', color: '#fff', py: { xs: 6, md: 8 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={5} alignItems="center">
          <Grid item xs={12} md={4}>
            <Stack alignItems="center">
              <Box
                sx={{
                  width: 180,
                  height: 320,
                  borderRadius: 6,
                  bgcolor: 'rgba(255,255,255,0.06)',
                  border: '6px solid rgba(255,255,255,0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <PhoneAndroidIcon sx={{ fontSize: 90, color: 'primary.light' }} />
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" sx={{ fontSize: { xs: 26, md: 32 }, mb: 2 }}>
              Download our app to Get Exclusive Discounts!
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<ShopIcon />}
              sx={{ px: 3 }}
            >
              Get it on Google Play
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
