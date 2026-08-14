import React from "react";
import { Box, Container, Typography, Link, Stack, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import AppleIcon from "@mui/icons-material/Apple";
import logo from '../../assets/CompanyLogo/logo.png';
import PlayStoreButton from '../../assets/Footer/GooglePlayButton.webp'
import AppStoreButton from '../../assets/Footer/AppStoreButton.webp'

// Brand tokens — keep in sync with the shared MUI theme
const BRAND_RED = "#D6293E";
const BG_DARK = "#1A1A1F";
const TEXT_MUTED = "#8A8A93";
const TEXT_LINK = "#B7B7BE";
const DIVIDER = "rgba(255,255,255,0.08)";

const ourInfoLinks = [
  { label: "Home", href: "https://hogist.com/application/" },
  { label: "About Us", href: "https://hogist.com/our-story" },
  { label: "Our Services", href: "https://hogist.com/service-offered" },
  { label: "Terms & Conditions", href: "https://hogist.com/terms-conditions" },
  { label: "Privacy Policy", href: "https://hogist.com/privacy-policy",},
];

const ourServicesLinks = [
  { label: "Catering Service", href: "https://www.hogist.com/catering-services-in-chennai/" },
  { label: "Industrial Catering", href: "https://www.hogist.com/industrial-catering-services-near-me/" },
  { label: "Corporate Catering", href: "https://www.hogist.com/corporate-catering-services-in-chennai/" },
  { label: "Cafeteria", href: "https://www.hogist.com/catering-services-in-chennai/" },
];

const contactLinks = [
  {
    label: "2nd Floor, Kakani Towers, No:34 Khader Nawaz Khan Road, Nungambakkam, Chennai 600 006.",
    href: "https://www.google.com/maps/place/Hogist+Technologies+pvt+Ltd/@13.0618092,80.2445991,17z/data=!4m6!3m5!1s0x3a5267e8dff469a7:0x26980d493f615a!8m2!3d13.0601273!4d80.2479296!16s%2Fg%2F11j00842y5?entry=ttu&g_ep=EgoyMDI5MTIwOS4wIKXMDSoASAFQAw%3D%3D",
  },
  { label: "support@hogist.com", href: "mailto:support@hogist.com" },
  { label: "+91 - 9962667733", href: "tel:+919962667733" },
];

// const legalLinks = [
//   { label: "Terms of Service", href: "#" },
//   { label: "Cookie Policy", href: "#" },
//   { label: "Privacy Policy", href: "#" },
// ];

const socialLinks = [
  { icon: FacebookIcon, href: "https://www.facebook.com/hogisttechnologies/", label: "Facebook" },
  { icon: InstagramIcon, href: "https://www.instagram.com/hogistindia/?hl=en", label: "Instagram" },
  { icon: LinkedInIcon, href: "https://www.linkedin.com/company/hogist?originalSubdomain=in", label: "LinkedIn" },
  { icon: YouTubeIcon, href: "https://www.youtube.com/@hogist9059", label: "YouTube" },
];

// Reusable column heading
function ColHeading({ children }) {
  return (
    <Typography
      sx={{
        fontFamily: "'Montserrat', sans-serif",
        fontWeight: 700,
        fontSize: 15,
        color: "#fff",
        mb: 2,
      }}
    >
      {children}
    </Typography>
  );
}

function FooterLink({ href, children, sx }) {
  return (
    <Link
      href={href}
      underline="none"
      sx={{
        display: "block",
        fontFamily: "'open sans', sans-serif",
        fontSize: 14,
        lineHeight: 1.6,
        color: TEXT_LINK,
        transition: "color .15s ease",
        "&:hover": { color: "#fff" },
        "&:focus-visible": {
          outline: `2px solid ${BRAND_RED}`,
          outlineOffset: "3px",
          borderRadius: "2px",
        },
        ...sx,
      }}
    >
      {children}
    </Link>
  );
}

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: BG_DARK, pt: { xs: 5, md: 8, lg:3 }, pb: { xs: 4, md: 5,lg:4 } }}>
      <Container
        maxWidth={false}
        sx={{
          maxWidth: { xs: "100%", xl: 1440 },
          px: { xs: 2.5, sm: 3.5, md: 20,lg:20, xl: 6 },
          alignItems:'center',
          
        }}
      >
        {/* ---- logo row (standalone) ---- */}
        <Box sx={{ mb: { xs: 4, md: 2 }, ml:{xs:-1, lg:-2 } }}>
          <Box
            component="img"
            src={logo}
            alt="Hogist Logo"
            sx={{
              display: "block",
              height: { xs: 42, sm: 48, md: 48, lg: 60, xl: 66 },
              width: "auto",
              '@media (min-width:1400px) and (max-width:1600px)': {
                height: 60,
              },
            }}
          />
        </Box>

        {/* ---- columns row ---- */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: { xs: 4, sm: 4, md: 3.72, xl: 3 },
            pb: { xs: 5, md: 6, lg:2 },
          }}
        >
          {/* Our Info - Mobile: 2 cols, Tablet(768px): 2 cols, Desktop(1024px+): original */}
          <Box sx={{ 
            flex: { 
              xs: "1 1 28%", 
              sm: "1 1 3%", 
              md: "1 1 18%", 
              lg: "1 1 13%" 
            }, 
            minWidth: 0 
          }}>
            <ColHeading>Our Info</ColHeading>
            <Stack spacing={1.6}>
              {ourInfoLinks.map((item) => (
                <FooterLink key={item.label} href={item.href}>
                  {item.label}
                </FooterLink>
              ))}
            </Stack>
          </Box>

          {/* Our Services - Mobile: 2 cols, Tablet(768px): 2 cols, Desktop(1024px+): original */}
          <Box sx={{ 
            flex: { 
              xs: "1 1 48%", 
              sm: "1 1 5%", 
              md: "1 1 20%", 
              lg: "1 1 14%" 
            }, 
            minWidth: 0 
          }}>
            <ColHeading>Our Services</ColHeading>
            <Stack spacing={1.6}>
              {ourServicesLinks.map((item) => (
                <FooterLink key={item.label} href={item.href}>
                  {item.label}
                </FooterLink>
              ))}
            </Stack>
          </Box>

          {/* Contact Us - Mobile: 1 col(full width), Tablet(768px): 2 cols, Desktop(1024px+): original */}
          <Box sx={{ 
            flex: { 
              xs: "1 1 40%", 
              sm: "1 1 15%", 
              md: "1 1 25%", 
              lg: "1 1 16%" 
            }, 
            minWidth: 0 
          }}>
            <ColHeading>Contact Us</ColHeading>
            <Stack spacing={2}>
              <FooterLink href={contactLinks[0].href} sx={{ display: "flex", gap: 1.25 }}>
                <LocationOnOutlinedIcon sx={{ fontSize: 18, color: BRAND_RED, mt: "1px", flexShrink: 0 }} />
                <span>{contactLinks[0].label}</span>
              </FooterLink>
              <FooterLink href={contactLinks[1].href} sx={{ display: "flex", gap: 1.25, alignItems: "center" }}>
                <EmailOutlinedIcon sx={{ fontSize: 18, color: BRAND_RED, flexShrink: 0 }} />
                <span>{contactLinks[1].label}</span>
              </FooterLink>
              <FooterLink href={contactLinks[2].href} sx={{ display: "flex", gap: 1.25, alignItems: "center" }}>
                <PhoneOutlinedIcon sx={{ fontSize: 18, color: BRAND_RED, flexShrink: 0 }} />
                <span>{contactLinks[2].label}</span>
              </FooterLink>
            </Stack>
          </Box>

          {/* Social Links - Mobile: 1 col(full width), Tablet(768px): 2 cols, Desktop(1024px+): original */}
          <Box sx={{ 
            flex: { 
              xs: "1 1 50%", 
              sm: "1 1 10%", 
              md: "1 1 20%", 
              lg: "1 1 15%" 
            }, 
            minWidth: 0 
          }}>
            <ColHeading>Social Links</ColHeading>
            <Stack direction="row" flexWrap="wrap" gap={1.25} sx={{ mb: 2.5 }}>
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <IconButton
                  key={label}
                  component="a"
                  href={href}
                  aria-label={label}
                  size="small"
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: "#fff",
                    color: BG_DARK,
                    transition: "background-color .15s ease, color .15s ease, transform .15s ease",
                    "&:hover": {
                      bgcolor: BRAND_RED,
                      color: "#fff",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  <Icon sx={{ fontSize: 16 }} />
                </IconButton>
              ))}
            </Stack>

            {/* App / Play store badges — stacked vertically like zomato */}
            <Stack spacing={1.25} sx={{ alignItems: "flex-start" }}>
            
              <Link
                href="https://play.google.com/store/apps/details?id=com.hogist"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ display: "inline-flex", lineHeight: 0 }}
              >
                <Box
                  component="img"
                  src={PlayStoreButton}
                  alt="Get it on Google Play"
                  sx={{ display: "block", height: 36, width: "auto" }}
                />
              </Link>
            </Stack>
          </Box>
        </Box>

        <Box sx={{ borderTop: `1px solid ${DIVIDER}` }} />

        {/* ---- bottom legal bar ---- */}
        <Box sx={{ pt: { xs: 2.5, sm: 3 } }}>
          <Typography sx={{ fontSize: { xs: 11, sm: 12.5 }, color: TEXT_MUTED, fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.7 }}>
            © {new Date().getFullYear()} Hogist Technologies Pvt. Ltd. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}