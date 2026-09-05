import React from "react";
import { useSelector } from "react-redux";
import { Box, Container, Stack, Typography, Button } from "@mui/material";
import { RED, INK, INK_SOFT, CARD_BORDER, PAGE_BG, FONT, HEADING_FONT } from "../../../utils/constants";

// Builds "RK" style initials from a full name, e.g. "R. Kumar" -> "RK".
function getInitialsFromName(name) {
  if (!name) return "";
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "";
  const first = words[0].replace(/[^a-zA-Z]/g, "")[0] || "";
  const second = words.length > 1 ? words[1].replace(/[^a-zA-Z]/g, "")[0] || "" : "";
  return (first + second).toUpperCase();
}

export default function ProfileHeader({ profile, onEditProfile, onPlanNewEvent }) {

  const authUser = useSelector((state) => state.auth?.user);

  const resolvedProfile = authUser
    ? {
        name: authUser.fullName || profile?.name,
        initials: getInitialsFromName(authUser.fullName) || profile?.initials,
        phone: authUser.mobile || profile?.phone,
        email: authUser.email || profile?.email,
        memberSince: profile?.memberSince,
      }
    : profile;

  if (!resolvedProfile) return null;

  const metaParts = [
    resolvedProfile.phone,
    resolvedProfile.email,
    resolvedProfile.memberSince ? `member since ${resolvedProfile.memberSince}` : null,
  ].filter(Boolean);

  return (
    <Box
      sx={{
        bgcolor: PAGE_BG,
        borderBottom: `1px solid ${CARD_BORDER}`,
        pt: { xs: 9, md: 11 },
        pb: { xs: 1.75, sm: 2 },
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          px: { xs: 2, sm: 2.5 },
          "@media (min-width:1400px)": { maxWidth: "1400px" },
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={2}
        >
          <Stack direction="row" alignItems="center" spacing={2} sx={{ minWidth: 0 }}>
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                bgcolor: RED,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Typography sx={{ color: "#fff", fontWeight: 800, fontSize: 18, fontFamily: HEADING_FONT }}>
                {resolvedProfile.initials}
              </Typography>
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography sx={{ fontWeight: 800, fontSize: { xs: 17, sm: 19 }, color: INK, fontFamily: HEADING_FONT }}>
                {resolvedProfile.name}
              </Typography>
              {metaParts.length > 0 && (
                <Typography sx={{ fontSize: 12.5, color: INK_SOFT, fontFamily: FONT, mt: 0.25 }}>
                  {metaParts.join(" · ")}
                </Typography>
              )}
            </Box>
          </Stack>

          <Stack direction="row" spacing={1.5} sx={{ flexShrink: 0 }}>
            <Button
              variant="outlined"
              onClick={onEditProfile}
              sx={{
                borderColor: CARD_BORDER,
                color: INK,
                fontWeight: 700,
                textTransform: "none",
                borderRadius: "10px",
                px: 2,
                fontFamily: FONT,
                fontSize: 13,
                bgcolor: "#fff",
                "&:hover": { borderColor: INK_SOFT, bgcolor: "rgba(0,0,0,0.02)" },
              }}
            >
              Edit profile
            </Button>
            <Button
              variant="contained"
              onClick={onPlanNewEvent}
              sx={{
                bgcolor: RED,
                color: "#fff",
                fontWeight: 700,
                textTransform: "none",
                borderRadius: "10px",
                px: 2,
                fontFamily: FONT,
                fontSize: 13,
                boxShadow: "none",
                "&:hover": { bgcolor: "#7d0002", boxShadow: "none" },
              }}
            >
              Plan a new event
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}