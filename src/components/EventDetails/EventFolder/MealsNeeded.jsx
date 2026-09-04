import React from "react";
import { Box, Grid, Stack, Typography, Checkbox } from "@mui/material";
import { SectionLabel } from "./SectionLabel";
import { MEAL_SLOTS, RED, CARD_BORDER, INK, INK_SOFT, FONT } from "../../../utils/constants";

export default function MealsNeeded({ value, onToggle }) {
  return (
    <Box>
      <SectionLabel>Meals needed</SectionLabel>
      <Grid container spacing={1.25}>
        {MEAL_SLOTS.map((slot) => {
          const checked = !!value[slot.key];
          return (
            <Grid item xs={6} sm={3} key={slot.key}>
              <Box
                onClick={() => onToggle(slot.key)}
                sx={{
                  border: `1.5px solid ${checked ? RED : CARD_BORDER}`,
                  bgcolor: checked ? "rgba(154,0,2,0.04)" : "#fff",
                  borderRadius: 1.5,
                  px: 1.5,
                  py: 1,
                  cursor: "pointer",
                  "&:hover": { borderColor: RED },
                }}
              >
                <Stack direction="row" alignItems="flex-start" spacing={1}>
                  <Checkbox
                    checked={checked}
                    size="small"
                    sx={{
                      p: 0,
                      color: CARD_BORDER,
                      "&.Mui-checked": { color: RED },
                    }}
                  />
                  <Box>
                    <Typography sx={{ fontWeight: 700, fontSize: 13.5, color: INK, fontFamily: FONT }}>
                      {slot.label}
                    </Typography>
                    <Typography sx={{ fontSize: 11.5, color: INK_SOFT, fontFamily: FONT }}>
                      {slot.time}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}