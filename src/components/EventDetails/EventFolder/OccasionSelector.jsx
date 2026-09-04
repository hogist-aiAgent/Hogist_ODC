import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { SectionLabel } from "./SectionLabel";
import { OCCASIONS, RED, CARD_BORDER, INK, FONT } from "../../../utils/constants";

export default function OccasionSelector({ value, onChange }) {
  return (
    <Box>
      <SectionLabel>Occasion</SectionLabel>
      <Grid container spacing={1.25}>
        {OCCASIONS.map((occasion) => {
          const selected = value === occasion;
          return (
            <Grid item xs={6} sm={4} md={2} key={occasion}>
              <Box
                onClick={() => onChange(occasion)}
                sx={{
                  border: `1.5px solid ${selected ? RED : CARD_BORDER}`,
                  bgcolor: selected ? "rgba(154,0,2,0.04)" : "#fff",
                  borderRadius: 1.5,
                  py: 1.4,
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "border-color .15s, background-color .15s",
                  "&:hover": { borderColor: RED },
                }}
              >
                <Typography
                  sx={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: selected ? RED : INK,
                    fontFamily: FONT,
                  }}
                >
                  {occasion}
                </Typography>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}