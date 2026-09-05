import React from "react";
import { Box, Stack, Typography, Button } from "@mui/material";
import { INK, INK_SOFT, CARD_BORDER, FONT } from "../../utils/constants";

export default function ExecutiveMiniCard({ executive, onChat }) {
  if (!executive) return null;

  return (
    <Box
      sx={{
        bgcolor: "#fff",
        border: `1px solid ${CARD_BORDER}`,
        borderRadius: "14px",
        p: 2,
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1.5 }}>
        <Box sx={{ width: 40, height: 40, borderRadius: "50%", bgcolor: "#E4E0DA", flexShrink: 0 }} />
        <Box sx={{ minWidth: 0 }}>
          <Typography sx={{ fontWeight: 700, fontSize: 14, color: INK, fontFamily: FONT }} noWrap>
            {executive.name}
          </Typography>
          <Typography sx={{ fontSize: 12, color: INK_SOFT, fontFamily: FONT }} noWrap>
            {executive.role}
          </Typography>
        </Box>
      </Stack>
      <Button
        fullWidth
        variant="contained"
        onClick={onChat}
        sx={{
          bgcolor: "#1B1B23",
          color: "#fff",
          fontWeight: 700,
          textTransform: "none",
          borderRadius: "10px",
          fontFamily: FONT,
          fontSize: 13,
          boxShadow: "none",
          "&:hover": { bgcolor: "#000", boxShadow: "none" },
        }}
      >
        Chat with {executive.name}
      </Button>
    </Box>
  );
}
