import React from "react";
import { Box, Grid, Stack, Typography, TextField, Checkbox, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { SectionLabel, FieldLabel } from "./SectionLabel";
import { CARD_BORDER, INK, INK_SOFT, RED, FONT } from "./Constants";

export default function HostAndContacts({
  host,
  onHostChange,
  contacts,
  onContactChange,
  onAddContact,
  onRemoveContact,
  whatsapp,
  onWhatsappToggle,
}) {
  return (
    <Box>
      <SectionLabel>Host &amp; contacts</SectionLabel>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={6}>
          <FieldLabel>Host name printed on the invoice</FieldLabel>
          <TextField
            fullWidth
            size="small"
            value={host.name}
            onChange={(e) => onHostChange({ ...host, name: e.target.value })}
            placeholder="Full name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FieldLabel>Primary number</FieldLabel>
          <TextField
            fullWidth
            size="small"
            value={host.phone}
            onChange={(e) => onHostChange({ ...host, phone: e.target.value })}
            placeholder="+91 90000 00000"
          />
        </Grid>

        {contacts.map((contact, idx) => {
          // The first two contact rows are the default "on-site" and
          // "alternate" fields — only rows added via "+ Add another
          // contact" (idx >= 2) can be removed.
          const removable = idx >= 2;
          return (
            <React.Fragment key={idx}>
              <Grid item xs={12} sm={6}>
                <FieldLabel>{contact.label}</FieldLabel>
                <TextField
                  fullWidth
                  size="small"
                  value={contact.name}
                  onChange={(e) => onContactChange(idx, { ...contact, name: e.target.value })}
                  placeholder="Name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FieldLabel>&nbsp;</FieldLabel>
                <Stack direction="row" spacing={0.75} alignItems="center">
                  <TextField
                    fullWidth
                    size="small"
                    value={contact.phone}
                    onChange={(e) => onContactChange(idx, { ...contact, phone: e.target.value })}
                    placeholder="+91 90000 00000"
                  />
                  {removable && (
                    <IconButton
                      size="small"
                      onClick={() => onRemoveContact(idx)}
                      aria-label="Remove contact"
                      sx={{
                        width: 34,
                        height: 34,
                        flexShrink: 0,
                        border: `1.5px solid ${CARD_BORDER}`,
                        borderRadius: 999,
                        color: INK_SOFT,
                        "&:hover": { borderColor: RED, color: RED, bgcolor: "rgba(154,0,2,0.03)" },
                      }}
                    >
                      <CloseIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                  )}
                </Stack>
              </Grid>
            </React.Fragment>
          );
        })}
      </Grid>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={1.5}
      >
        <Typography
          onClick={onAddContact}
          sx={{
            fontSize: 12.5,
            fontWeight: 700,
            color: RED,
            fontFamily: FONT,
            cursor: "pointer",
          }}
        >
          + Add another contact
        </Typography>

        <Stack direction="row" alignItems="center" spacing={0.5}>
          <Checkbox
            checked={whatsapp}
            onChange={(e) => onWhatsappToggle(e.target.checked)}
            size="small"
            sx={{ p: 0.5, color: CARD_BORDER, "&.Mui-checked": { color: RED } }}
          />
          <Typography sx={{ fontSize: 12.5, color: INK, fontFamily: FONT }}>
            Send delivery updates to all contacts on WhatsApp
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}