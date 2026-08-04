import { Box, Container, Stack, Typography } from '@mui/material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import PaymentIcon from '@mui/icons-material/Payment';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

const steps = [
  {
    icon: <RestaurantMenuIcon sx={{ fontSize: { xs: 26, sm: 30, md: 34 } }} />,
    title: 'Choose your Order',
    desc: 'Browse through our selection by cuisine, price or rating. View pictures of delicious dishes and select your choices by adding to your cart.',
    color: '#E80200',
  },
  {
    icon: <PaymentIcon sx={{ fontSize: { xs: 26, sm: 30, md: 34 } }} />,
    title: 'Make Payment',
    desc: 'Choose the payment you are most comfortable with - Cash, Card or UPI.',
    color: '#F9E830',
  },
  {
    icon: <LocalShippingIcon sx={{ fontSize: { xs: 26, sm: 30, md: 34 } }} />,
    title: 'Get Delivered',
    desc: 'We collect your order, once the food is ready and deliver it to your location. Order on the go, skip the line and save time on takeaway orders. Yes, it\u2019s that SIMPLE! Try it now!',
    color: '#00E6E8',
  },
];

const LINE_COLOR = '#000000';
const CIRCLE_BG = '#FFFFFF';

export default function HowItWorks() {
  return (
    <Box sx={{ bgcolor: '#Fff', py: { xs: 0, md: 4 }, mb: { xs: 6, md: 2 }, mt: { xs: 0, } }}>
      <Container maxWidth="lg" sx={{ px: { xs: 2.5, sm: 3, md: 3 } }}>
        <Typography
          variant="h3"
          sx={{
            textAlign: 'center',
            fontWeight: 800,
            fontFamily: '"Montserrat", sans-serif',
            fontSize: { xs: 24, sm: 30, md: 38 },
            mb: { xs: 4, md: 6 },
            color: '#c60000',
          }}
        >
          How it's work
        </Typography>

        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'stretch', md: 'flex-start' },
            gap: { xs: 4, sm: 5, md: 0 },
          }}
        >
          {/* Horizontal connector line (desktop/tablet only), spans between first and last icon centers */}
          <Box
            sx={{
              display: { xs: 'none', md: 'block' },
              position: 'absolute',
              top: { md: 32, lg: 36 },
              left: '16.6667%',
              right: '16.6667%',
              height: '2px',
              bgcolor: LINE_COLOR,
              zIndex: 0,
            }}
          />

          {steps.map((step, i) => (
            <Box
              key={step.title}
              sx={{
                position: 'relative',
                flex: { md: 1 },
                display: 'flex',
                flexDirection: { xs: 'row', md: 'column' },
                alignItems: { xs: 'flex-start', md: 'center' },
                gap: { xs: 1.5, sm: 2, md: 2 },
              }}
            >
            
              {i < steps.length - 1 && (
                <Box
                  sx={{
                    display: { xs: 'block', md: 'none' },
                    position: 'absolute',
                    top: { xs: 56, sm: 64 },
                    bottom: { xs: -32, sm: -40 },
                    left: { xs: 28, sm: 32 },
                    width: '2px',
                    bgcolor: LINE_COLOR,
                    transform: 'translateX(-50%)',
                    zIndex: 0,
                  }}
                />
              )}

              {/* Icon */}
              <Box
                sx={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  flexShrink: 0,
                }}
              >
                <Box
                  sx={{
                    width: { xs: 56, sm: 64, md: 72 },
                    height: { xs: 56, sm: 64, md: 72 },
                    borderRadius: '50%',
                    bgcolor: CIRCLE_BG,
                    border: `2px solid ${step.color}`,
                    color: step.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1,
                    flexShrink: 0,
                  }}
                >
                  {step.icon}
                </Box>
              </Box>

              <Stack
                spacing={1}
                alignItems={{ xs: 'flex-start', md: 'center' }}
                textAlign={{ xs: 'left', md: 'center' }}
                sx={{ pt: { md: 1 }, minWidth: 0 }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: '"open sans", sans-serif',
                    fontSize: { xs: 16, sm: 18, md: 20 },
                  }}
                >
                  {step.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    maxWidth: { xs: '100%', md: 320 },
                    fontFamily: '"open sans", sans-serif',
                    fontSize: { xs: 13, sm: 14, md: 14 },
                  }}
                >
                  {step.desc}
                </Typography>
              </Stack>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}