import { Box, Container, Grid, Typography, Paper, Stack, Chip } from '@mui/material'
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded'
import GavelRoundedIcon from '@mui/icons-material/GavelRounded'
import ForumRoundedIcon from '@mui/icons-material/ForumRounded'
import { tokens } from '../theme'

const cards = [
  {
    icon: <VerifiedRoundedIcon fontSize="large" />,
    title: 'Vetted caterers only',
    body: 'Every partner kitchen is reviewed for hygiene and quality before they go live on Hogist.',
    tag: 'ISO 9001 & 22000 certified partners',
  },
  {
    icon: <GavelRoundedIcon fontSize="large" />,
    title: 'Priced by real people',
    body: 'Your order is checked and priced by our admin team before it\u2019s confirmed \u2014 no surprise black-box totals.',
    tag: 'Reviewed within hours, not days',
  },
  {
    icon: <ForumRoundedIcon fontSize="large" />,
    title: 'Feedback that reaches the kitchen',
    body: 'Your rating and review after delivery go straight to admin, kitchen and management.',
    tag: 'Every review read, every time',
  },
]

export default function WhyHogist() {
  return (
    <Box component="section" sx={{ py: { xs: 8, md: 11 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="flex-start">
          <Grid item xs={12} md={4}>
            <Typography variant="overline" sx={{ color: tokens.red, fontWeight: 800, letterSpacing: 2 }}>
              Why Hogist
            </Typography>
            <Typography variant="h2" sx={{ fontSize: { xs: 28, md: 34 }, mt: 1, mb: 2 }}>
              Catering you can hand off, not worry about.
            </Typography>
            <Typography variant="body1" sx={{ color: tokens.inkSoft }}>
              {'We sit between you and the kitchen so every order is checked, priced fairly, and delivered on time \u2014 with two ISO standards backing our process.'}
            </Typography>
          </Grid>

          <Grid item xs={12} md={8}>
            <Stack spacing={2.5}>
              {cards.map((c) => (
                <Paper
                  key={c.title}
                  elevation={0}
                  sx={{
                    p: 3,
                    display: 'flex',
                    gap: 2.5,
                    alignItems: 'flex-start',
                    borderRadius: '20px',
                    border: '1px solid rgba(36,28,26,0.08)',
                    '&:hover': { borderColor: tokens.red, boxShadow: '0 16px 32px rgba(36,28,26,0.08)' },
                    transition: 'all .2s ease',
                  }}
                >
                  <Box sx={{ color: tokens.red, mt: 0.5 }}>{c.icon}</Box>
                  <Box>
                    <Typography sx={{ fontWeight: 800, fontSize: 18, mb: 0.5 }}>{c.title}</Typography>
                    <Typography variant="body2" sx={{ color: tokens.inkSoft, mb: 1.5 }}>
                      {c.body}
                    </Typography>
                    <Chip
                      label={c.tag}
                      size="small"
                      sx={{ bgcolor: tokens.redSoft, color: tokens.redDark, fontWeight: 700 }}
                    />
                  </Box>
                </Paper>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
