import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import PaymentIcon from '@mui/icons-material/Payment';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

const steps = [
  {
    icon: <RestaurantMenuIcon sx={{ fontSize: 34 }} />,
    title: 'Choose your Order',
    desc: 'Browse through our selection by cuisine, price or rating. View pictures of delicious dishes and select your choices by adding to your cart.',
  },
  {
    icon: <PaymentIcon sx={{ fontSize: 34 }} />,
    title: 'Make Payment',
    desc: 'Choose the payment you are most comfortable with - Cash, Card or UPI.',
  },
  {
    icon: <LocalShippingIcon sx={{ fontSize: 34 }} />,
    title: 'Get Delivered',
    desc: 'We collect your order, once the food is ready and deliver it to your location. Order on the go, skip the line and save time on takeaway orders. Yes, it\u2019s that SIMPLE! Try it now!',
  },
];

export default function HowItWorks() {
  return (
    <Box sx={{ bgcolor: '#Fff', py: { xs: 6, md: 6 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          {steps.map((step, i) => (
            <Grid item xs={12} md={4} key={step.title}>
              <Stack alignItems="center" textAlign="center" spacing={2}>
                <Box
                  sx={{
                    width: 72,
                    height: 72,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {step.icon}
                </Box>
                <Typography variant="h6" sx={{ fontFamily: '"open sans", sans-serif',}}>{step.title}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 320, fontFamily: '"open sans", sans-serif', }}>
                  {step.desc}
                </Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
