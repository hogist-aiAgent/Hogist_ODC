import { useState } from 'react';
import { Box, Container, Tabs, Tab, Grid, Typography } from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';

const tabs = [
  {
    label: 'RESTAURANT',
    desc: 'We partner with hundreds of restaurants near you so you can order your favorite dishes for any occasion, delivered fresh and on time.',
  },
  {
    label: 'CATERER',
    desc: 'Book trusted caterers for events big or small, with flexible menus and consistent quality every time.',
  },
  {
    label: 'HOME COOK',
    desc: 'Enjoy homely, comforting meals prepared by verified home cooks for a taste that feels like family.',
  },
  {
    label: 'CHEF',
    desc: 'We have the best and clean Chef\u2019s for your choice. You can order favorite dishes for your events and parts with best price from us.',
  },
];

export default function WhatWeHave() {
  const [value, setValue] = useState(3);

  return (
    <Box sx={{ py: { xs: 6, md: 9 } }}>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ fontSize: { xs: 26, md: 32 }, mb: 1 }}>
          What We Have?
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          When it comes to food, you do your thing and leave the rest to Hogist!
        </Typography>

        <Tabs
          value={value}
          onChange={(e, v) => setValue(v)}
          textColor="inherit"
          TabIndicatorProps={{ style: { backgroundColor: '#E4032E', height: 3 } }}
          sx={{ borderBottom: '1px solid #EEE', mb: 5 }}
        >
          {tabs.map((tab, i) => (
            <Tab
              key={tab.label}
              label={tab.label}
              value={i}
              sx={{
                fontWeight: 600,
                color: value === i ? 'primary.main' : 'text.secondary',
              }}
            />
          ))}
        </Tabs>

        <Grid container spacing={5} alignItems="center">
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                width: 220,
                height: 220,
                borderRadius: '50%',
                bgcolor: '#FDEDEF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: { xs: 'auto', md: 0 },
              }}
            >
              <StorefrontIcon sx={{ fontSize: 90, color: 'primary.main' }} />
            </Box>
          </Grid>
          <Grid item xs={12} md={7}>
            <Typography variant="body1" color="text.secondary" sx={{ fontSize: 18, lineHeight: 1.8 }}>
              {tabs[value].desc}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
