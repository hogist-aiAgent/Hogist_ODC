import { Box, Container, Stack, Typography, Avatar } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import VerifiedIcon from '@mui/icons-material/Verified';
import PublicIcon from '@mui/icons-material/Public';
import ApartmentIcon from '@mui/icons-material/Apartment';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';

const clients = [BusinessIcon, VerifiedIcon, PublicIcon, ApartmentIcon, CorporateFareIcon];

export default function TrustedClients() {
  return (
    <Box sx={{ py: { xs: 6, md: 8 } }}>
      <Container maxWidth="lg">
        <Stack alignItems="center" spacing={1} sx={{ mb: 5 }}>
          <Typography variant="h4" sx={{ fontSize: { xs: 26, md: 32 }, fontFamily: '"open sans", sans-serif', }}>
            Our Trusted Clients
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontFamily: '"open sans", sans-serif',}}>
            Trusted by the world&apos;s best companies. Join the ranks of the elite.
          </Typography>
        </Stack>

        <Stack
          direction="row"
          flexWrap="wrap"
          justifyContent="center"
          alignItems="center"
          spacing={{ xs: 3, md: 6 }}
          rowGap={3}
        >
          {clients.map((Icon, i) => (
            <Avatar
              key={i}
              sx={{
                width: 64,
                height: 64,
                bgcolor: '#F5F5F8',
                color: 'text.secondary',
              }}
            >
              <Icon fontSize="medium" />
            </Avatar>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
