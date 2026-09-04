import React from "react";
import { Box, Stack, TextField, Chip } from "@mui/material";
import { SectionLabel } from "./SectionLabel";
import { NOTE_TAGS, RED, CARD_BORDER, INK, FONT } from "../../../utils/constants";

export default function NotesSection({ notes, onChange, onAddTag }) {
  return (
    <Box>
      <SectionLabel>Notes for the kitchens</SectionLabel>
      <TextField
        fullWidth
        multiline
        minRows={3}
        value={notes}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Anything the kitchen crew should know — dietary needs, seating, access instructions…"
        sx={{ mb: 1.5 }}
      />
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        {NOTE_TAGS.map((tag) => (
          <Chip
            key={tag}
            label={`+ ${tag}`}
            onClick={() => onAddTag(tag)}
            sx={{
              fontWeight: 700,
              fontFamily: FONT,
              fontSize: 12,
              height: 30,
              border: `1px solid ${CARD_BORDER}`,
              bgcolor: "#fff",
              color: INK,
              "&:hover": { borderColor: RED, color: RED, bgcolor: "rgba(154,0,2,0.03)" },
            }}
          />
        ))}
      </Stack>
    </Box>
  );
}