import React from "react";
import { Typography } from "@mui/material";
import { INK_SOFT, FONT } from "./Constants";

export function SectionLabel({ children }) {
  return (
    <Typography
      sx={{
        fontSize: 11.5,
        fontWeight: 800,
        letterSpacing: 0.6,
        color: INK_SOFT,
        fontFamily: FONT,
        textTransform: "uppercase",
        mb: 1.25,
      }}
    >
      {children}
    </Typography>
  );
}

export function FieldLabel({ children }) {
  return (
    <Typography sx={{ fontSize: 12.5, color: INK_SOFT, fontFamily: FONT, mb: 0.5 }}>
      {children}
    </Typography>
  );
}