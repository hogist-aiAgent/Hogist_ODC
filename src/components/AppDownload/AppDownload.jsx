import React from "react";
import { Box, Container, Typography, Stack, Link } from "@mui/material";
import phoneImg from "../../assets/AppDownload/phoneImage.png";
import QRCode from "../../assets/AppDownload/qr.png";
import playStore from "../../assets/Footer/GooglePlayButton.webp";
import appStore from "../../assets/Footer/AppStoreButton.webp";

const CARD_BG = "linear-gradient(to top, #9a0003b0 0%, #9a000356 55%, #9a000314 100%)";
const HEADING_DARK = "#1A1A2E";
const SUBTEXT_MUTED = "#6B6B7A";

export default function AppDownload() {
  return (
    <Box sx={{ px: { xs: 2, md: 4 }, py: { xs: 4, md: 5 } }}>
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          borderRadius: { xs: 4, md: 6 },
          background: CARD_BG,
          border: "1px solid rgba(214,41,62,0.12)",
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            alignItems="center"
            justifyContent="space-between"
            spacing={{ xs: 4, md: 2 }}
            sx={{ py: { xs: 5, md: 0 }, px:{xs:'auto', md:15} }}
          >
            {/* Left: text + badges */}
            <Stack sx={{ maxWidth: 480, textAlign: { xs: "center", md: "left" }, alignItems: { xs: "center", md: "flex-start" }, }}>
              <Typography
                sx={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 800,
                  fontSize: { xs: 28, md: 34 },
                  color: HEADING_DARK,
                  mb: 1.5,
                  lineHeight: 1.2,
                }}
              >
                Download the app now!
              </Typography>
              <Typography
                sx={{
                  fontFamily: "'open sans', sans-serif",
                  fontSize: { xs: 15, md: 16 },
                  color: SUBTEXT_MUTED,
                  mb: 3.5,
                  lineHeight: 1.5,
                }}
              >
                Experience seamless online ordering only on the Hogist app
              </Typography>
              <Stack direction="row" spacing={{xs:0.2, sm:1.5, md:1.5}} flexWrap="wrap" justifyContent={{ xs: "center", md: "flex-start" }} gap={{xs:1, sm:0, md:0}}>
                <Link
                  href="https://play.google.com/store/apps/details?id=com.hogist"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ display: "inline-flex", lineHeight: 0 }}
                >
                  <Box component="img" src={playStore} alt="Get it on Google Play" sx={{ display: "block", height: 48, width: "auto" }} />
                </Link>
                <Link
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ display: "inline-flex", lineHeight: 0 }}
                >
                  <Box component="img" src={appStore} alt="Download on the App Store" sx={{ display: "block", height: 48, width: "auto" }} />
                </Link>
              </Stack>
            </Stack>

            {/* Right: phone image (half-cropped, overflowing the card like the reference) */}
            <Box
              sx={{
                position: "relative",
                display: { xs: "none", md: "flex" },
                alignItems: "flex-start",
                justifyContent: "center",
                alignSelf: "center",
                overflow: "hidden",
                right:"2%",
                top:10,
                width: { md: 300, lg: 340, xl: 380 },
                height: { md: 320, lg: 430, xl: 400 },
              }}
            >
              {/* white screen fill sitting behind the transparent-screen phone frame */}
              <Box/>
              <Box
                component="img"
                src={phoneImg}
                alt="Hogist app on phone"
                sx={{
                  position: "absolute",
                  top: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "100%",
                  height: "auto",
                  display: "block",
                  zIndex: 2,
                  pointerEvents: "none",
                }}
              />
              {/* QR + label overlaid on the visible top half of the phone screen */}
              {/* <Stack
                alignItems="center"
                spacing={1.5}
                sx={{
                  position: "absolute",
                  top: "20%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "56%",
                  zIndex: 3,
                }}
              >
              </Stack> */}
            </Box>
          </Stack>
        </Container>

        {/* faint decorative arcs like the reference image */}
        <Box
          sx={{
            position: "absolute",
            bottom: -120,
            right: -30,
            width: 450,
            height: 320,
            borderRadius: "50%",
            border: "1px solid rgba(214, 41, 61, 0.78)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: -60,
            right: -40,
            width: 600,
            height: 350,
            borderRadius: "50%",
            border: "1px solid rgba(214, 41, 61, 0.78)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: -100,
            right: -80,
            width: 700,
            height: 450,
            borderRadius: "50%",
            border: "1px solid rgba(214, 41, 61, 0.63)",
          }}
        />
      </Box>
    </Box>
  );
}