import React from "react";
import { Box, Stack, Typography, Chip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { SectionLabel } from "./SectionLabel";
import { GUEST_PRESETS, AMBER, INK, CARD_BORDER, FONT } from "./Constants";

export default function GuestsStepper({ value, onChange }) {
  const step = 10;
  const dec = () => onChange(Math.max(0, value - step));
  const inc = () => onChange(value + step);

  return (
    <Box>
      <SectionLabel>Guests</SectionLabel>
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", md: "center" }}
        spacing={1.5}
      >
        <Stack direction="row" spacing={1.25} alignItems="center" flexWrap="wrap" useFlexGap>
          <Stack
            direction="row"
            alignItems="center"
            spacing={0}
            sx={{ border: `1.5px solid ${CARD_BORDER}`, borderRadius: 999, overflow: "hidden" }}
          >
            <Box
              onClick={dec}
              sx={{
                width: 38,
                height: 38,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: INK,
                "&:hover": { bgcolor: "rgba(0,0,0,0.04)" },
              }}
            >
              <RemoveIcon sx={{ fontSize: 18 }} />
            </Box>
            <Typography
              sx={{
                minWidth: 56,
                textAlign: "center",
                fontWeight: 800,
                fontSize: 16,
                color: INK,
                fontFamily: FONT,
              }}
            >
              {value}
            </Typography>
            <Box
              onClick={inc}
              sx={{
                width: 38,
                height: 38,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: INK,
                "&:hover": { bgcolor: "rgba(0,0,0,0.04)" },
              }}
            >
              <AddIcon sx={{ fontSize: 18 }} />
            </Box>
          </Stack>

          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {GUEST_PRESETS.map((preset) => {
              const selected = value === preset;
              return (
                <Chip
                  key={preset}
                  label={preset}
                  onClick={() => onChange(preset)}
                  sx={{
                    fontWeight: 700,
                    fontFamily: FONT,
                    fontSize: 13,
                    height: 32,
                    border: `1.5px solid ${selected ? INK : CARD_BORDER}`,
                    bgcolor: selected ? INK : "#fff",
                    color: selected ? "#fff" : INK,
                    "&:hover": { bgcolor: selected ? INK : "rgba(0,0,0,0.04)" },
                  }}
                />
              );
            })}
            <Chip
              label="2000+"
              onClick={() => onChange(2000)}
              sx={{
                fontWeight: 700,
                fontFamily: FONT,
                fontSize: 13,
                height: 32,
                border: `1.5px solid ${CARD_BORDER}`,
                bgcolor: "#fff",
                color: INK,
                "&:hover": { bgcolor: "rgba(0,0,0,0.04)" },
              }}
            />
          </Stack>
        </Stack>

        <Typography
          sx={{
            fontSize: 10,
            color: AMBER,
            fontFamily: FONT,
            maxWidth: 230,
            textAlign: { xs: "left", md: "right" },
          }}
        >
          Your menus are priced per plate, so this drives the total. Revisable up to 48 hours
          before.
        </Typography>
      </Stack>
    </Box>
  );
}