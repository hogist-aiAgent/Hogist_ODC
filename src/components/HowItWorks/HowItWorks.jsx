import { Box, Container, Stack, Typography, Button } from '@mui/material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import PaymentIcon from '@mui/icons-material/Payment';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Choose from '../../assets/HowItWorks/chooseTransparent.png'
import Payment from '../../assets/HowItWorks/paymentTransparent.png'
import Delivery from '../../assets/HowItWorks/deliveyTransparent.png'

const steps = [
  {
    img: Choose,
    title: 'Choose your Order',
    desc: 'Browse through our selection by cuisine, price or rating. View pictures of delicious dishes and select your choices by adding to your cart.',
    color: '#E80200',
  },
  {
    img: Payment,
    title: 'Make Payment',
    desc: 'Choose the payment you are most comfortable with - Cash, Card or UPI.',
    color: '#F9E830',
  },
  {
    img: Delivery,
    title: 'Get Delivered',
    desc: 'We collect your order, once the food is ready and deliver it to your location. Order on the go, skip the line and save time on takeaway orders. Yes, it\u2019s that SIMPLE! Try it now!',
    color: '#00E6E8',
  },
];

const LINE_COLOR = '#000000';
const CIRCLE_BG = '#FFFFFF';

export default function HowItWorks() {
  return (
    <Box sx={{ bgcolor: '#Fff', py: { xs: 0, md: 0,lg:3 }, mb: { xs: 6, md: 2 }, mt: { xs: 2, } }}>
      <Container maxWidth="lg" sx={{ px: { xs: 2.5, sm: 3, md: 3 } }}>
        <Typography
          variant="h3"
          sx={{
            textAlign: 'center',
            fontWeight: 800,
            fontFamily: '"Montserrat", sans-serif',
            fontSize: { xs: 24, sm: 30, md: 38 },
            mb: { xs: 4, md: 6 },
            color: '#e80200',
          }}
        >
          How it's work
        </Typography>

        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            flexWrap: { sm: 'wrap', md: 'nowrap' },
            alignItems: { xs: 'center', sm: 'flex-start' },
            justifyContent: 'center',
            gap: { xs: 6, sm: 4, md: 4, lg: 5 },
          }}
        >
          {steps.map((step) => (
            <Stack
              key={step.title}
              spacing={2}
              alignItems="center"
              textAlign="center"
              sx={{
                flex: { sm: '1 1 45%', md: '1 1 0' },
                minWidth: { sm: 220 },
                maxWidth: { xs: 320, sm: 260, md: 300, lg: 320 },
                px: { xs: 0, sm: 1, md: 2 },
              }}
            >
              {/* Icon image */}
              <Box
                component="img"
                src={step.img}
                alt={step.title}
                sx={{
                  width: { xs: 110, sm: 100, md: 130, lg: 230 },
                  height: { xs: 110, sm: 100, md: 130, lg: 200 },
                  objectFit: 'contain',
                }}
              />

              <Typography
                variant="h6"
                sx={{
                  fontFamily: '"open sans", sans-serif',
                  fontWeight: 800,
                  fontSize: { xs: 18, sm: 18, md: 20, lg: 22 },
                  color: 'text.primary',
                }}
              >
                {step.title}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  maxWidth: { xs: '100%', sm: '100%', md: 300, lg: 320 },
                  fontFamily: '"open sans", sans-serif',
                  fontSize: { xs: 13, sm: 13, md: 14 },
                }}
              >
                {step.desc}
              </Typography>

              {/* <Button
                variant="contained"
                sx={{
                  mt: 1,
                  px: 4,
                  py: 1,
                  borderRadius: 999,
                  textTransform: 'none',
                  fontWeight: 700,
                  fontFamily: '"open sans", sans-serif',
                  bgcolor: 'primary.main',
                  boxShadow: 'none',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                    boxShadow: 'none',
                  },
                }}
              >
                Check Out
              </Button> */}
            </Stack>
          ))}
        </Box>
      </Container>
    </Box>
  );
}