import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { AMBER, INK, INK_SOFT, CARD_BORDER, PAGE_BG, FONT } from "../../utils/constants";

function StatCard({ stat }) {
  return (
    <Box
      sx={{
        bgcolor: stat.accent ? PAGE_BG : "#fff",
        border: `1px solid ${stat.accent ? "rgba(181,114,15,0.3)" : CARD_BORDER}`,
        borderRadius: 2,
        p: { xs: 1.5, sm: 2 },
        height: "100%",
      }}
    >
      <Typography
        sx={{
          fontSize: 10.5,
          fontWeight: 700,
          letterSpacing: "0.5px",
          textTransform: "uppercase",
          color: stat.accent ? AMBER : INK_SOFT,
          fontFamily: FONT,
          mb: 0.75,
        }}
      >
        {stat.label}
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: 19, sm: 22 },
          fontWeight: 800,
          color: INK,
          fontFamily: FONT,
        }}
      >
        {stat.value}
      </Typography>
    </Box>
  );
}

export default function StatsRow({ stats }) {
  if (!stats || stats.length === 0) return null;

  return (
    <Grid container spacing={{ xs: 1.5, sm: 2 }}>
      {stats.map((stat) => (
        <Grid item xs={6} md={3} key={stat.id}>
          <StatCard stat={stat} />
        </Grid>
      ))}
    </Grid>
  );
}
