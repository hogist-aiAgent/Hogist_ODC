import { Box, Container, Grid, Typography, Stack, Avatar } from '@mui/material'
import FormatQuoteRoundedIcon from '@mui/icons-material/FormatQuoteRounded'
import StarRoundedIcon from '@mui/icons-material/StarRounded'
import { tokens } from '../theme'

const stats = [
  { value: '227+', label: 'Events catered' },
  { value: '500+', label: 'Local caterers' },
  { value: '4.8\u2605', label: 'Average rating' },
  { value: '2', label: 'ISO standards held' },
]

export default function Testimonial() {
  return (
    <Box component="section" sx={{ py: { xs: 8, md: 11 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={5}>
            <Grid container spacing={3}>
              {stats.map((s) => (
                <Grid item xs={6} key={s.label}>
                  <Typography variant="h3" sx={{ color: tokens.red, fontSize: { xs: 30, md: 38 } }}>
                    {s.value}
                  </Typography>
                  <Typography variant="body2" sx={{ color: tokens.inkSoft, fontWeight: 600 }}>
                    {s.label}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid item xs={12} md={7}>
            <Box
              sx={{
                position: 'relative',
                bgcolor: tokens.redSoft,
                borderRadius: '24px',
                p: { xs: 3, md: 5 },
              }}
            >
              <FormatQuoteRoundedIcon sx={{ color: tokens.red, fontSize: 44, opacity: 0.5 }} />
              <Typography variant="h6" sx={{ fontWeight: 500, lineHeight: 1.5, mb: 3, fontFamily: '"Fraunces", serif' }}>
                We booked catering for a small birthday get-together and weren't sure what to
                expect from an app. The order was priced fairly within a few hours, everything
                arrived on time, and the food was genuinely good. Left a review straight from
                the app afterwards.
              </Typography>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar sx={{ bgcolor: tokens.red, fontWeight: 700 }}>S</Avatar>
                <Box>
                  <Typography sx={{ fontWeight: 800 }}>Swati Menon</Typography>
                  <Stack direction="row" spacing={0.3}>
                    {[...Array(5)].map((_, i) => (
                      <StarRoundedIcon key={i} sx={{ color: tokens.gold, fontSize: 18 }} />
                    ))}
                  </Stack>
                </Box>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
