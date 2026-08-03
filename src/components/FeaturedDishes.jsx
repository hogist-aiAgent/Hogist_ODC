import { Box, Container, Grid, Typography, Paper, Stack, Chip, Button } from '@mui/material'
import StarRoundedIcon from '@mui/icons-material/StarRounded'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import { tokens } from '../theme'

const dishes = [
  { name: 'Chettinad chicken curry', caterer: 'Southern Spice Caterers', price: '\u20b9220', rating: 4.9, veg: false },
  { name: 'Paneer butter masala', caterer: 'Anand Party Caterers', price: '\u20b9180', rating: 4.7, veg: true },
  { name: 'Live dosa counter', caterer: 'Madras Tiffin Co.', price: '\u20b9150', rating: 4.8, veg: true },
  { name: 'Assorted sweets platter', caterer: 'Sri Krishna Sweets', price: '\u20b9260', rating: 4.6, veg: true },
]

function VegDot({ veg }) {
  return (
    <Box
      sx={{
        width: 14,
        height: 14,
        border: `1.5px solid ${veg ? '#1E8E3E' : tokens.red}`,
        display: 'grid',
        placeItems: 'center',
      }}
    >
      <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: veg ? '#1E8E3E' : tokens.red }} />
    </Box>
  )
}

export default function FeaturedDishes() {
  return (
    <Box component="section" sx={{ py: { xs: 8, md: 11 }, bgcolor: '#fff' }}>
      <Container maxWidth="lg">
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ sm: 'flex-end' }} spacing={2} sx={{ mb: 5 }}>
          <Box>
            <Typography variant="overline" sx={{ color: tokens.red, fontWeight: 800, letterSpacing: 2 }}>
              Popular right now
            </Typography>
            <Typography variant="h2" sx={{ fontSize: { xs: 28, md: 34 }, mt: 1 }}>
              Crowd-pleasers from nearby caterers
            </Typography>
          </Box>
          <Button variant="outlined" sx={{ borderRadius: '999px', px: 3, alignSelf: { xs: 'flex-start', sm: 'auto' } }}>
            View full menu
          </Button>
        </Stack>

        <Grid container spacing={3}>
          {dishes.map((d) => (
            <Grid item xs={12} sm={6} md={3} key={d.name}>
              <Paper
                elevation={0}
                sx={{
                  borderRadius: '20px',
                  border: '1px solid rgba(36,28,26,0.08)',
                  overflow: 'hidden',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Box
                  sx={{
                    height: 140,
                    background: `linear-gradient(135deg, ${tokens.redSoft}, #FFD8CE)`,
                    display: 'grid',
                    placeItems: 'center',
                  }}
                >
                  <Typography sx={{ fontSize: 40 }}>{d.veg ? '\ud83e\udd57' : '\ud83c\udf57'}</Typography>
                </Box>
                <Box sx={{ p: 2.25, display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={1}>
                    <Typography sx={{ fontWeight: 800, fontSize: 15.5, lineHeight: 1.3 }}>{d.name}</Typography>
                    <VegDot veg={d.veg} />
                  </Stack>
                  <Typography variant="caption" sx={{ color: tokens.inkSoft, mb: 1.5 }}>
                    {d.caterer}
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mb: 2 }}>
                    <StarRoundedIcon sx={{ color: tokens.gold, fontSize: 18 }} />
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>{d.rating}</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 'auto' }}>
                    <Typography sx={{ fontWeight: 800 }}>{d.price}</Typography>
                    <Button
                      size="small"
                      variant="contained"
                      disableElevation
                      sx={{ borderRadius: '999px', minWidth: 0, px: 1.5 }}
                    >
                      <AddRoundedIcon fontSize="small" />
                    </Button>
                  </Stack>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}
