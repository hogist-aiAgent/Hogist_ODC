import React from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { EVENT_DETAILS_STEPS, VEG_GREEN, RED, INK_SOFT, CARD_BORDER, FONT } from "../../../utils/constants";

function StepDot({ step }) {
  const isDone = step.status === "done";
  const isActive = step.status === "active";

  const circleColor = isDone ? VEG_GREEN : isActive ? RED : "transparent";
  const borderColor = isDone ? VEG_GREEN : isActive ? RED : "#C9C2BB";
  const textColor = isDone ? VEG_GREEN : isActive ? RED : INK_SOFT;

  return (
    <Stack direction="row" alignItems="center" spacing={1} sx={{ flexShrink: 0 }}>
      <Box
        sx={{
          width: 24,
          height: 24,
          borderRadius: "50%",
          border: `2px solid ${borderColor}`,
          bgcolor: circleColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {isDone ? (
          <CheckIcon sx={{ fontSize: 14, color: "#fff" }} />
        ) : (
          <Typography sx={{ fontSize: 12, fontWeight: 800, color: isActive ? "#fff" : INK_SOFT, fontFamily: FONT }}>
            {step.id}
          </Typography>
        )}
      </Box>
      <Typography
        sx={{
          fontSize: 13,
          fontWeight: isActive || isDone ? 700 : 600,
          color: textColor,
          fontFamily: FONT,
          whiteSpace: "nowrap",
        }}
      >
        {step.label}
      </Typography>
    </Stack>
  );
}

export default function EventDetailsStepper() {
  return (
    <Box sx={{ bgcolor: "#fff", borderBottom: `1px solid ${CARD_BORDER}` }}>
      <Container maxWidth="lg">
        <Stack
          direction="row"
          alignItems="center"
          sx={{ pt: { xs: 9, sm: 10, md: 11, lg: 13 }, pb: 2, overflowX: { xs: "auto", md: "visible" } }}
        >
          {EVENT_DETAILS_STEPS.map((step, idx) => (
            <React.Fragment key={step.id}>
              <StepDot step={step} />
              {idx < EVENT_DETAILS_STEPS.length - 1 && (
                <Box sx={{ flexGrow: 1, height: "1px", bgcolor: CARD_BORDER, mx: { xs: 1.5, sm: 2, md: 3 }, minWidth: 20 }} />
              )}
            </React.Fragment>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}