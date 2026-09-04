import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { CARD_BORDER, INK, INK_SOFT, RED, FONT } from "../../../utils/constants";

export default function ExecutiveCard({ executive }) {
  return (
    <Box sx={{ border: `1px solid ${CARD_BORDER}`, borderRadius: 2, p: 2, bgcolor: "#fff" }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1.5}>
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ minWidth: 0 }}>
          <Box sx={{ width: 40, height: 40, borderRadius: "50%", bgcolor: "#E4E0DA", flexShrink: 0 }} />
          <Box sx={{ minWidth: 0 }}>
            <Typography sx={{ fontWeight: 700, fontSize: 13, color: INK, fontFamily: FONT }} noWrap>
              {executive.name}, {executive.role}
            </Typography>
            <Typography sx={{ fontSize: 11.5, color: INK_SOFT, fontFamily: FONT }} noWrap>
              {executive.responseTime} · {executive.phone}
            </Typography>
          </Box>
        </Stack>
        <Typography sx={{ fontSize: 13, fontWeight: 800, color: RED, fontFamily: FONT, cursor: "pointer", flexShrink: 0 }}>
          Chat
        </Typography>
      </Stack>
    </Box>
  );
}