import { Box, Container, Typography, Stack } from '@mui/material'
import ExploreRoundedIcon from '@mui/icons-material/ExploreRounded'
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded'
import PaymentRoundedIcon from '@mui/icons-material/PaymentRounded'
import HourglassTopRoundedIcon from '@mui/icons-material/HourglassTopRounded'
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded'
import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded'
import RateReviewRoundedIcon from '@mui/icons-material/RateReviewRounded'
import { tokens } from '../theme'

const steps = [
  {
    icon: <ExploreRoundedIcon />,
    title: 'Browse nearby caterers',
    body: "See caterers close by, view their menus, and filter by the type of event you're planning.",
  },
  {
    icon: <ShoppingCartRoundedIcon />,
    title: 'Add dishes to your cart',
    body: 'Pick items and quantities. No account? Order as a guest instead.',
  },
  {
    icon: <PaymentRoundedIcon />,
    title: 'Place the order & pay',
    body: 'Confirm your order and pay online — it goes straight to the admin team for review.',
  },
  {
    icon: <HourglassTopRoundedIcon />,
    title: 'Wait for confirmation',
    body: "Track your order's status in the app while it's being reviewed and priced.",
  },
  {
    icon: <NotificationsActiveRoundedIcon />,
    title: 'Get notified: approved',
    body: 'Once the admin team confirms your order, you\u2019ll hear from us by email and push notification.',
  },
  {
    icon: <LocalShippingRoundedIcon />,
    title: 'Receive the delivery',
    body: 'Your order arrives fresh, on the day of the event.',
  },
  {
    icon: <RateReviewRoundedIcon />,
    title: 'Rate & review',
    body: 'Leave feedback on the food and service — it goes to admin, kitchen and management.',
  },
]

export default function OrderJourney() {
  return (
    <Box component="section" sx={{ py: { xs: 8, md: 11 }, bgcolor: '#fff' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', maxWidth: 640, mx: 'auto', mb: { xs: 6, md: 8 } }}>
          <Typography variant="overline" sx={{ color: tokens.red, fontWeight: 800, letterSpacing: 2 }}>
            From cart to compliment
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: 30, md: 40 }, mt: 1 }}>
            How your order comes together
          </Typography>
        </Box>

        <Box sx={{ position: 'relative' }}>
          {/* connecting line, desktop only */}
          <Box
            sx={{
              display: { xs: 'none', md: 'block' },
              position: 'absolute',
              top: 34,
              left: '7%',
              right: '7%',
              height: 2,
              background: `repeating-linear-gradient(90deg, ${tokens.redSoft} 0 10px, transparent 10px 18px)`,
              zIndex: 0,
            }}
          />

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(7, 1fr)' },
              gap: { xs: 4, md: 2 },
            }}
          >
            {steps.map((s, i) => (
              <Stack
                key={s.title}
                spacing={1.5}
                sx={{ position: 'relative', zIndex: 1, textAlign: { xs: 'left', md: 'center' } }}
              >
                  <Box
                    sx={{
                      width: 68,
                      height: 68,
                      mx: { xs: 0, md: 'auto' },
                      borderRadius: '50%',
                      bgcolor: i === 4 ? tokens.gold : tokens.red,
                      color: '#fff',
                      display: 'grid',
                      placeItems: 'center',
                      boxShadow: `0 12px 24px ${i === 4 ? 'rgba(245,166,35,0.35)' : 'rgba(214,41,62,0.28)'}`,
                    }}
                  >
                    {s.icon}
                  </Box>
                  <Typography
                    variant="caption"
                    sx={{ fontWeight: 800, color: tokens.inkSoft, display: 'block' }}
                  >
                    STEP {i + 1}
                  </Typography>
                  <Typography sx={{ fontWeight: 800, fontSize: 15.5, lineHeight: 1.3 }}>
                    {s.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: tokens.inkSoft, lineHeight: 1.5 }}>
                    {s.body}
                  </Typography>
                </Stack>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
