import { Box, Container, Grid, Stack, Typography, IconButton, Link } from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
// import MailOutlineIcon from '@mui/icons-material/MailOutline';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import RestaurantIcon from '@mui/icons-material/Restaurant';

const columns = [
  {
    title: 'About Us',
    isText: true,
    text: 'We serve as one stop solution alias marketplace for all the bulk food orders needs thus providing hygienic & quality food and setting up impeccable customer service by offering a versatile and flexible service with consistency and presentation that will leave an ever lasting impression.',
  },
  {
    title: 'Our Info',
    links: ['Home', 'About Us', 'Our Services', 'Contact Us', 'Download App'],
  },
  {
    title: 'Our Services',
    links: ['Catering Service', 'Industrial Catering', 'Corporate Catering', 'Cafeteria'],
  },
];

export default function Footer() {
  return (
    <Box sx={{ bgcolor: '#1A1A2E', color: 'rgba(255,255,255,0.8)', pt: { xs: 6, md: 8 }, pb: 3 }}>
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          {columns.map((col) => (
            <Grid item xs={12} sm={6} md={3} key={col.title}>
              <Typography variant="h6" sx={{ color: '#fff', mb: 2 }}>
                {col.title}
              </Typography>
              {col.isText ? (
                <Typography variant="body2" sx={{ lineHeight: 1.8 }}>
                  {col.text}
                </Typography>
              ) : (
                <Stack spacing={1.2}>
                  {col.links.map((link) => (
                    <Link
                      key={link}
                      href="#"
                      underline="none"
                      color="inherit"
                      sx={{ '&:hover': { color: 'primary.light' } }}
                    >
                      {link}
                    </Link>
                  ))}
                </Stack>
              )}
            </Grid>
          ))}

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ color: '#fff', mb: 2 }}>
              Contact Us
            </Typography>
            <Stack spacing={1.5}>
              <Stack direction="row" spacing={1.5}>
                <LocationOnOutlinedIcon fontSize="small" sx={{ mt: 0.3 }} />
                <Typography variant="body2">
                  Hogist Technologies Pvt. Ltd. 2nd Floor, Kakani Towers,
                  No.34, Khader Nawaz Khan Road, Nungambakkam, Chennai 600 006.
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <MailOutlineOutlinedIcon fontSize="small" />
                <Typography variant="body2">support@hogist.com</Typography>
              </Stack>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <PhoneOutlinedIcon fontSize="small" />
                <Typography variant="body2">+91 - 9962667733</Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
              <IconButton size="small" sx={{ color: '#fff', bgcolor: 'rgba(255,255,255,0.08)' }}>
                <FacebookIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" sx={{ color: '#fff', bgcolor: 'rgba(255,255,255,0.08)' }}>
                <TwitterIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" sx={{ color: '#fff', bgcolor: 'rgba(255,255,255,0.08)' }}>
                <InstagramIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Grid>
        </Grid>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={1}
          sx={{ mt: 6, pt: 3, borderTop: '1px solid rgba(255,255,255,0.1)' }}
        >
          <Typography variant="body2">© 2026 Copyright HOGIST</Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <RestaurantIcon fontSize="small" />
            <Typography variant="body2" sx={{ fontWeight: 700, color: '#fff' }}>
              HOGIST
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
