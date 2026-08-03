import { Box, Container, Grid, Stack, Typography, Rating } from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

const stats = [
  { value: '227+', label: 'Food served Everyday' },
  { value: '7+', label: 'Corporates & Industrials clients' },
  { value: '2', label: 'Times awarded the best food partner' },
  { value: '2', label: 'ISO standards obtained in the years of 2022, 2023 & 2024' },
];

export default function Testimonials() {
  return (
    <Box sx={{ py: { xs: 6, md: 9 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={5}>
            <Typography variant="overline" color="primary" sx={{ fontWeight: 700 }}>
              Testimonial
            </Typography>
            <Typography variant="h4" sx={{ fontSize: { xs: 26, md: 32 }, mb: 1.5 }}>
              Read our customers&apos; stories
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Best Catering Services in Chennai &amp; Coimbatore. Hogist -
              Delivering Flexibility &amp; Consistency along with tasty food.
            </Typography>

            <Grid container spacing={3}>
              {stats.map((stat) => (
                <Grid item xs={6} key={stat.label}>
                  <Typography variant="h4" color="primary" sx={{ fontWeight: 700 }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid item xs={12} md={7}>
            <Box
              sx={{
                bgcolor: '#FBF7F3',
                borderRadius: 4,
                p: { xs: 3, md: 5 },
                position: 'relative',
              }}
            >
              <FormatQuoteIcon sx={{ fontSize: 48, color: 'primary.main', opacity: 0.3 }} />
              <Typography variant="body1" sx={{ fontSize: 18, lineHeight: 1.8, mb: 3 }}>
                Recently we had a small bday party at home for just 20 people
                and we&apos;re struggling to get the catering done for the same.
                Then we came across Hogist and then got in touch with them.
                They were blessing in disguise. They provided amazing food and
                the service was also great. The delivered the food on time and
                all our guests loved the food. The food was delicious and
                yummy. Thank you so much.
              </Typography>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Rating value={5} readOnly size="small" />
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  Swati Menon
                </Typography>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
