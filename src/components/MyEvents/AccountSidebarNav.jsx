import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { INK, INK_SOFT, FONT } from "../../utils/constants";

export default function AccountSidebarNav({ items, onSelect }) {
  if (!items || items.length === 0) return null;

  return (
    <Stack spacing={0.25}>
      {items.map((item) => (
        <Box
          key={item.id}
          component="button"
          type="button"
          onClick={() => onSelect && onSelect(item)}
          sx={{
            display: "flex",
            alignItems: "baseline",
            width: "100%",
            border: "none",
            borderRadius: 1.5,
            bgcolor: item.active ? "#F5F4F1" : "transparent",
            cursor: "pointer",
            textAlign: "left",
            px: 1.75,
            py: 1.1,
            "&:hover": {
              bgcolor: item.active ? "#F5F4F1" : "rgba(0,0,0,0.02)",
            },
          }}
        >
          <Typography
            sx={{
              fontSize: 13.5,
              fontWeight: item.active ? 800 : 500,
              color: INK,
              fontFamily: FONT,
            }}
          >
            {item.label}
          </Typography>
          {typeof item.count === "number" && (
            <Typography sx={{ fontSize: 12.5, fontWeight: 500, color: INK_SOFT, fontFamily: FONT, ml: 0.6 }}>
              {item.count}
            </Typography>
          )}
        </Box>
      ))}
    </Stack>
  );
}
