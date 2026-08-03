import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';

export default function IsoBanner() {
  return (
    <Box
      sx={{
        background: 'linear-gradient(90deg, #E4032E 0%, #B4021F 100%)',
        color: '#fff',
        py: { xs: 4, md: 5 },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={8}>
            <Typography variant="h6" sx={{ fontSize: { xs: 18, md: 20 }, lineHeight: 1.6 }}>
              Acquiring two ISO standards in the food industry demonstrates our
              commitment to ensuring the highest quality and safety standards in
              our food production processes.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Stack direction="row" spacing={3} justifyContent={{ xs: 'flex-start', md: 'flex-end' }}>
              <Stack alignItems="center" spacing={0.5}>
                <VerifiedIcon sx={{ fontSize: 44 }} />
                <Typography variant="caption">ISO 9001:2015</Typography>
              </Stack>
              <Stack alignItems="center" spacing={0.5}>
                <VerifiedIcon sx={{ fontSize: 44 }} />
                <Typography variant="caption">ISO 22000:2019</Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
