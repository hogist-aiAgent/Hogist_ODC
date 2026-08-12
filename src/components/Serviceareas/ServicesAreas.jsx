import React, { useState } from "react";
import { Box, Container, Typography, ButtonBase } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const HEADING_DARK = "#1A1A2E";
const TEXT_DARK = "#2E2E3A";
const CARD_BORDER = "#E4E4E8";
const ACCENT_ORANGE = "#9a0002";

// Replace with your actual service area names
const DEFAULT_AREAS = [
  "Nungambakkam",
  "Tambaram",
  "Chengalpattu",
  "Red hills",
  "Velachery",
  "Guindy",
  "T. Nagar",
  "Anna Nagar",
  "Adyar",
  "Mylapore",
  "Egmore",
  "Kilpauk",
  "Kodambakkam",
  "Porur",
  "Vadapalani",
  "Alwarpet",
  "Besant Nagar",
  "Royapettah",
  "Saidapet",
  "Ambattur",
  "Koyambedu",
  "Triplicane",
  "Ashok Nagar"
];

// Number of cards to show before the grid needs a "Show More" trigger,
// chosen so the last visible row still has a slot for the toggle card.
const INITIAL_VISIBLE_COUNT = 11;

export default function ServiceAreas({
  title = "Areas with Bulk food delivery",
  areas = DEFAULT_AREAS,
  hrefPrefix = "/order-food-online-in",
}) {
  const [expanded, setExpanded] = useState(false);

  const hasOverflow = areas.length > INITIAL_VISIBLE_COUNT;
  const visibleAreas =
    expanded || !hasOverflow ? areas : areas.slice(0, INITIAL_VISIBLE_COUNT);

  const toggleSlug = (name) =>
    `${hrefPrefix}-${name.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <Box sx={{ px: { xs: 2, md: 4 }, py: { xs: 4, md: 5 }, bgcolor:'#efe6dd' }}>
      <Container maxWidth="lg" disableGutters >
        <Typography
          sx={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 800,
            fontSize: { xs: 22, sm: 26, md: 30 },
             color: 'primary.main',
            mb: { xs: 2.5, md: 3.5 },
          }}
        >
          {title}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: { xs: 1.5, sm: 2, md: 1.3 },
            pl:{xs:1,sm:6,md:6},
            pr:{xs:1,sm:6,md:6}
          }}
        >
          {visibleAreas.map((area) => (
            <Box
              key={area}
              sx={{
                flex: {
                  xs: "0 0 calc(33.333% - 8px)",
                  sm: "0 0 calc(40% - 115px)",
                  md: "0 0 calc(25% - 15px)",
                },
                minWidth: { xs: 0, sm: "auto" },
              }}
            >
              <ButtonBase
                // href={toggleSlug(area)}
                sx={{
                  width: "100%",
                 maxWidth:{xs:120,sm:200,md:240},
                  minHeight: { xs: 60, sm: 40, md: 60 },
                  borderRadius: { xs: 1,sm:1, md: 1.5 },
                  border: `1px solid ${CARD_BORDER}`,
                  px: { xs: 1.5, sm: 2, md: 0 },
                  py: { xs: 1, md: 0},
                  textAlign: "center",
                  backgroundColor: "#fff",
                  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.16)",
                  "&:hover": {
                    borderColor: ACCENT_ORANGE,
                    boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "'open sans', sans-serif",
                    fontWeight: 600,
                    fontSize: { xs: 10, sm: 10, md: 12 },
                    color: TEXT_DARK,
                    lineHeight: 1.4,
                    p:{md:1},
                    wordBreak: { xs: "break-word", sm: "normal" },
                    overflowWrap: { xs: "break-word", sm: "normal" },
                  }}
                >
                  Order Bulk food online in {area}
                </Typography>
              </ButtonBase>
            </Box>
          ))}

          {hasOverflow && (
            <Box
              sx={{
                flex: {
                  xs: "0 0 calc(33.333% - 8px)",
                  sm: "0 0 calc(40% - 115px)",
                  md: "0 0 calc(25% - 15px)",
                },
                minWidth: { xs: 0, sm: "auto" },
              }}
            >
              <ButtonBase
                onClick={() => setExpanded((prev) => !prev)}
                sx={{
                  width: "100%",
                 maxWidth:{xs:120,sm:200,md:240},
                  minHeight: { xs: 60, sm: 45, md: 59 },
                  borderRadius: { xs: 1,sm:1, md: 1.5 },
                  border: `1px solid ${CARD_BORDER}`,
                  backgroundColor: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 0.75,
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.16)",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "'open sans', sans-serif",
                    fontWeight: 700,
                    fontSize: { xs: 12, sm: 12, md: 14 },
                    color: ACCENT_ORANGE,
                  }}
                >
                  {expanded ? "Show Less" : "Show More"}
                </Typography>
                <KeyboardArrowDownIcon
                  sx={{
                    color: ACCENT_ORANGE,
                    fontSize: { xs: 18, md: 20 },
                    transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                  }}
                />
              </ButtonBase>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
}