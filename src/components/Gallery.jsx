import { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Stack,
  Chip,
  TextField,
  InputAdornment,
  Typography,
  IconButton,
  Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const categories = ['All', 'Meals', 'Curries', 'Snacks', 'Sweets', 'Tiffins', 'Non-Veg'];

const gallery = [
  { title: 'South Indian Meals', category: 'Meals', img: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=600&auto=format&fit=crop' },
  { title: 'Mixed Curry Combo', category: 'Curries', img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=600&auto=format&fit=crop' },
  { title: 'Party Platter', category: 'Meals', img: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=600&auto=format&fit=crop' },
  { title: 'Crispy Vada', category: 'Snacks', img: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?q=80&w=600&auto=format&fit=crop' },
  { title: 'Grilled Skewers', category: 'Non-Veg', img: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=600&auto=format&fit=crop' },
  { title: 'Rasmalai', category: 'Sweets', img: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=600&auto=format&fit=crop' },
  { title: 'Chettinad Chicken', category: 'Non-Veg', img: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=600&auto=format&fit=crop' },
  { title: 'Ghee Pongal & Vada', category: 'Tiffins', img: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=600&auto=format&fit=crop' },
  { title: 'Tandoori Chicken', category: 'Non-Veg', img: 'https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?q=80&w=600&auto=format&fit=crop' },
  { title: 'Malabar Parotta', category: 'Meals', img: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=600&auto=format&fit=crop' },
];

export default function Gallery() {
  const [active, setActive] = useState('All');

  const filtered =
    active === 'All' ? gallery : gallery.filter((g) => g.category === active);

  return (
    <Box sx={{ bgcolor: '#FBF7F3', py: { xs: 6, md: 9 } }}>
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', md: 'center' }}
          spacing={2}
          sx={{ mb: 4 }}
        >
          <Typography variant="h4" sx={{ fontSize: { xs: 26, md: 32 } }}>
            Our{' '}
            <Box component="span" sx={{ color: 'primary.main' }}>
              Gallery
            </Box>
          </Typography>

          <TextField
            size="small"
            placeholder="Search by name"
            sx={{ bgcolor: '#fff', borderRadius: 999, minWidth: 220 }}
            InputProps={{
              sx: { borderRadius: 999 },
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <Stack direction="row" spacing={1.5} flexWrap="wrap" rowGap={1.5} sx={{ mb: 4 }}>
          {categories.map((cat) => (
            <Chip
              key={cat}
              label={cat}
              onClick={() => setActive(cat)}
              sx={{
                fontWeight: 600,
                px: 1,
                bgcolor: active === cat ? 'primary.main' : '#fff',
                color: active === cat ? '#fff' : 'text.secondary',
                border: '1px solid',
                borderColor: active === cat ? 'primary.main' : '#E5E4E7',
                '&:hover': {
                  bgcolor: active === cat ? 'primary.dark' : '#F5F5F8',
                },
              }}
            />
          ))}
        </Stack>

        <Grid container spacing={3}>
          {filtered.map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item.title}>
              <Box
                sx={{
                  bgcolor: '#fff',
                  borderRadius: 4,
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(20,20,43,0.06)',
                  height: '100%',
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  <Box
                    component="img"
                    src={item.img}
                    alt={item.title}
                    sx={{ width: '100%', height: 160, objectFit: 'cover', display: 'block' }}
                  />
                  <IconButton
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      bgcolor: 'rgba(255,255,255,0.9)',
                      '&:hover': { bgcolor: '#fff' },
                    }}
                  >
                    <FavoriteBorderIcon fontSize="small" color="primary" />
                  </IconButton>
                </Box>
                <Box sx={{ p: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {item.category}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Stack alignItems="center" sx={{ mt: 5 }}>
          <Button variant="contained" color="primary" size="large" sx={{ px: 4 }}>
            View More
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
