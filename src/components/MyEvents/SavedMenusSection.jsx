import React from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { INK, INK_SOFT, CARD_BORDER, FONT, HEADING_FONT, currency } from "../../utils/constants";

function SavedMenuCard({ menu, onClick }) {
  return (
    <Box
      component="button"
      type="button"
      onClick={() => onClick && onClick(menu)}
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        textAlign: "left",
        border: `1px solid ${CARD_BORDER}`,
        borderRadius: "14px",
        bgcolor: "#fff",
        p: 1.25,
        gap: 1.5,
        cursor: "pointer",
        "&:hover": { borderColor: "rgba(43,33,28,0.25)" },
      }}
    >
      <Box
        sx={{
          width: 56,
          height: 56,
          flexShrink: 0,
          borderRadius: "10px",
          bgcolor: "#EDEAE6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {menu.img ? (
          <Box component="img" src={menu.img} alt="" sx={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px" }} />
        ) : (
          <Typography sx={{ fontSize: 10, color: "#B7B0A9", fontFamily: FONT }}>photo</Typography>
        )}
      </Box>
      <Box sx={{ minWidth: 0 }}>
        <Typography sx={{ fontWeight: 700, fontSize: 13.5, color: INK, fontFamily: FONT, mb: 0.3 }} noWrap>
          {menu.name}
        </Typography>
        <Typography sx={{ fontSize: 12, color: INK_SOFT, fontFamily: FONT }} noWrap>
          {menu.caterer} · {currency(menu.pricePerPlate)}/plate
        </Typography>
      </Box>
    </Box>
  );
}

export default function SavedMenusSection({ menus, savedMenusCount, onSeeAll, onSelectMenu }) {
  if (!menus || menus.length === 0) return null;

  return (
    <Box>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1.5 }}>
        <Typography sx={{ fontWeight: 800, fontSize: { xs: 16, sm: 18 }, color: INK, fontFamily: HEADING_FONT }}>
          Saved menus
        </Typography>
        {typeof savedMenusCount === "number" && savedMenusCount > menus.length && (
          <Typography
            onClick={onSeeAll}
            sx={{ fontSize: 13, fontWeight: 700, color: "#9a0002", fontFamily: FONT, cursor: "pointer" }}
          >
            See all {savedMenusCount}
          </Typography>
        )}
      </Stack>
      <Grid container spacing={2}>
        {menus.map((menu) => (
          <Grid item xs={12} sm={6} md={4} key={menu.id}>
            <SavedMenuCard menu={menu} onClick={onSelectMenu} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
