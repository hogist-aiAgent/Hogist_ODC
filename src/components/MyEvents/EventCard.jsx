import React from "react";
import { Box, Stack, Typography, Button, Chip } from "@mui/material";
import {
  RED,
  INK,
  INK_SOFT,
  CARD_BORDER,
  PAGE_BG,
  FONT,
  HEADING_FONT,
  currency,
  STATUS_STYLES,
  TAG_VARIANT_STYLES,
} from "../../utils/constants";

function StatusPill({ status, label }) {
  const style = STATUS_STYLES[status] || STATUS_STYLES.confirmed;
  return (
    <Chip
      size="small"
      label={label}
      sx={{
        bgcolor: style.bg,
        color: style.color,
        fontWeight: 800,
        fontSize: 11,
        letterSpacing: "0.4px",
        fontFamily: FONT,
        height: 24,
        borderRadius: 1,
      }}
    />
  );
}

function EventTag({ tag }) {
  const style = TAG_VARIANT_STYLES[tag.variant] || TAG_VARIANT_STYLES.neutral;
  return (
    <Chip
      size="small"
      label={tag.label}
      sx={{
        border: `1px solid ${style.border}`,
        bgcolor: style.bg,
        color: style.color,
        fontWeight: 700,
        fontSize: 11,
        fontFamily: FONT,
        height: 24,
      }}
    />
  );
}

function EventPhotoPlaceholder() {
  return (
    <Box
      sx={{
        width: { xs: 72, sm: 96 },
        height: { xs: 72, sm: 96 },
        flexShrink: 0,
        borderRadius: 1.5,
        border: `1px solid ${CARD_BORDER}`,
        bgcolor: "#EDEAE6",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography sx={{ fontSize: 11, color: "#B7B0A9", fontFamily: FONT }}>photo</Typography>
    </Box>
  );
}

function EventActionButton({ action, onClick }) {
  const variantSx = {
    primary: {
      bgcolor: RED,
      color: "#fff",
      border: "none",
      "&:hover": { bgcolor: "#7d0002" },
    },
    dark: {
      bgcolor: "#1B1B23",
      color: "#fff",
      border: "none",
      "&:hover": { bgcolor: "#000" },
    },
    outlined: {
      bgcolor: "#fff",
      color: INK,
      border: `1px solid ${CARD_BORDER}`,
      "&:hover": { bgcolor: "rgba(0,0,0,0.02)" },
    },
  };

  return (
    <Button
      onClick={() => onClick && onClick(action)}
      sx={{
        ...variantSx[action.variant || "outlined"],
        fontWeight: 700,
        textTransform: "none",
        borderRadius: 1.5,
        px: 2,
        py: 0.7,
        fontFamily: FONT,
        fontSize: 12.5,
        boxShadow: "none",
        whiteSpace: "nowrap",
      }}
    >
      {action.label}
    </Button>
  );
}

export default function EventCard({ event, onAction }) {
  if (!event) return null;

  const metaParts = [event.dateLabel, event.venue, event.guests ? `${event.guests} guests` : null, event.preferenceNote].filter(
    Boolean
  );

  return (
    <Box
      sx={{
        bgcolor: "#fff",
        border: `1px solid ${CARD_BORDER}`,
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      {/* top strip: status + timeline + ref code */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={1}
        sx={{
          px: { xs: 2, sm: 2.5 },
          py: 1.25,
          bgcolor: PAGE_BG,
          borderBottom: `1px solid ${CARD_BORDER}`,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1.25} sx={{ minWidth: 0 }}>
          <StatusPill status={event.status} label={event.statusLabel} />
          <Typography
            sx={{
              fontSize: 12.5,
              color: (STATUS_STYLES[event.status] || STATUS_STYLES.confirmed).timelineColor || INK_SOFT,
              fontFamily: FONT,
            }}
            noWrap
          >
            {event.timelineNote}
          </Typography>
        </Stack>
        <Typography sx={{ fontSize: 12, color: INK_SOFT, fontFamily: FONT, flexShrink: 0 }}>
          {event.refCode}
        </Typography>
      </Stack>

      <Box sx={{ p: { xs: 2, sm: 2.5 } }}>
        <Stack direction="row" justifyContent="space-between" spacing={2}>
          <Stack direction="row" spacing={2} sx={{ minWidth: 0 }}>
            <EventPhotoPlaceholder />
            <Box sx={{ minWidth: 0 }}>
              <Typography
                sx={{ fontWeight: 800, fontSize: { xs: 15, sm: 16.5 }, color: INK, fontFamily: HEADING_FONT, mb: 0.4 }}
              >
                {event.title}
              </Typography>
              {metaParts.length > 0 && (
                <Typography sx={{ fontSize: 12.5, color: INK_SOFT, fontFamily: FONT, mb: 1 }}>
                  {metaParts.join(" · ")}
                </Typography>
              )}
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {(event.tags || []).map((tag) => (
                  <EventTag key={tag.label} tag={tag} />
                ))}
              </Stack>
            </Box>
          </Stack>

          <Box sx={{ textAlign: "right", flexShrink: 0 }}>
            <Typography sx={{ fontWeight: 800, fontSize: { xs: 15, sm: 17 }, color: INK, fontFamily: FONT }}>
              {currency(event.amount)}
            </Typography>
            <Typography sx={{ fontSize: 12, color: INK_SOFT, fontFamily: FONT }}>
              {event.isEstimate ? "estimate · " : ""}
              {currency(event.perGuest)} per {event.isEstimate ? "plate" : "guest"}
            </Typography>
          </Box>
        </Stack>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={1.5}
          sx={{ mt: 2.5, pt: 2, borderTop: `1px solid ${CARD_BORDER}` }}
        >
          <Stack direction="row" spacing={1.25} flexWrap="wrap" useFlexGap>
            {(event.actions || []).map((action) => (
              <EventActionButton key={action.id} action={action} onClick={onAction} />
            ))}
          </Stack>
          {event.footNote && (
            <Typography sx={{ fontSize: 12, color: INK_SOFT, fontFamily: FONT, flexShrink: 0 }}>
              {event.footNote}
            </Typography>
          )}
        </Stack>
      </Box>
    </Box>
  );
}
