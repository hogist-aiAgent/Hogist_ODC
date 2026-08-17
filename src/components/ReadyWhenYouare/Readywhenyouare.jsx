import { Box, Container, Typography, Button, Stack, Divider, IconButton } from '@mui/material';
import RequestQuoteOutlinedIcon from '@mui/icons-material/RequestQuoteOutlined';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import CelebrationOutlinedIcon from '@mui/icons-material/CelebrationOutlined';
import RoomServiceOutlinedIcon from '@mui/icons-material/RoomServiceOutlined';
import RoomServiceRoundedIcon from '@mui/icons-material/RoomServiceRounded';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import watsappQrCode from '../../assets/Readywhenyouare/watsapQrCode.png'
import useChatStore from '../Common/store/useChatStore';

import ctaImg from '../../assets/Readywhenyouare/Readywhenyouare.png';

// Brand tokens — kept in sync with the shared MUI theme / Footer
const BRAND_RED = '#B3111F';
const CREAM = '#F5F2EC';
const TEXT_MUTED = '#6B6B76';

const highlights = [
  { icon: RestaurantOutlinedIcon, label: 'Daily Office Meals' },
  { icon: CelebrationOutlinedIcon, label: 'Events & Parties' },
  { icon: RoomServiceOutlinedIcon, label: 'Cafeteria Management' },
];

const contactCols = [
  {
    icon: ChatBubbleOutlineRoundedIcon,
    title: 'Chat with us',
    lines: ['Live chat support', "We're here to help!"],
    trailingArrow: true,
  },
  {
    icon: MailOutlineRoundedIcon,
    title: 'Email Us',
    lines: ['support@hogist.com', "We'll get back to you shortly."],
  },
  {
    icon: PublicRoundedIcon,
    title: 'Explore Hogist',
    lines: ['www.hogist.com', 'Explore menus, services & more.'],
  },
];

export default function ReadyWhenYouAre() {
  const openChat = useChatStore((state) => state.openChat);

  return (
    <Box
    id="contact-us"
      component="section"
      sx={{
        bgcolor: CREAM,
        overflow: 'hidden',
        // borderRadius: { xs: '18px', md: '24px' },
      }}
    >
      {/* ---- top: text + image ---- */}
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          minHeight: { lg: 620 },
        }}
      >
        {/* Left content */}
        <Box
          sx={{
            flex: { lg: '0 0 63%' },
            px: { xs: 3, sm: 5, md: 8, lg: 7 },
            py: { xs: 6, sm: 7, lg: 0 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Box>
            <Typography
              sx={{
                color: BRAND_RED,
                fontWeight: 700,
                fontSize: { xs: 12, md: 13 },
                letterSpacing: '0.14em',
                mb: 1,
              }}
            >
              READY WHEN YOU ARE
            </Typography>
            <Box sx={{ width: 42, height: 3, bgcolor: BRAND_RED, borderRadius: 2, mb: 2 }} />

            <Typography
              component="h2"
              sx={{
                fontWeight: 800,
                lineHeight: { xs: 1.08, sm: 1.05, md: 1.05, lg: 1, xl: 1 },
                color: '#141418',
                fontSize: { xs: 34, sm: 44, md: 52, lg: 50, xl: 58 },
                '@media (min-width:1400px) and (max-width:1600px)': { fontSize: 54 },
              }}
            >
              Let&rsquo;s make your{' '}
              <Box component="span" sx={{ color: BRAND_RED }}>
                next event
              </Box>{' '}
              amazing
              <Box component="span" sx={{ color: BRAND_RED }}>
                .
              </Box>
            </Typography>

            <Typography
              sx={{
                mt: 1,
                color: TEXT_MUTED,
                fontSize: { xs: 15, md: 16.5 },
                lineHeight: 1.7,
                maxWidth: 480,
              }}
            >
              From everyday meals to large-scale events, Hogist takes care of everything —
              kitchens, quality, and on-time delivery. You focus on what matters.
            </Typography>

            <Button
              variant="contained"
              disableElevation
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              startIcon={<RequestQuoteOutlinedIcon sx={{ fontSize: 20 }} />}
              endIcon={<ArrowForwardRoundedIcon sx={{ fontSize: 18 }} />}
              sx={{
                mt: 2,
                bgcolor: BRAND_RED,
                color: '#fff',
                px: 2,
                py: 1.5,
                fontSize: 15,
                fontWeight: 700,
                letterSpacing: '0.02em',
                borderRadius: '10px',
                justifyContent: 'space-between',
                gap: 0.3,
                '&:hover': { bgcolor: '#921019' },
              }}
            >
              GET STARTED
            </Button>

            {/* Highlight row */}
            <Stack
              direction="row"
              alignItems="center"
              justifyContent={{ xs: 'space-between', sm: 'flex-start' }}
              divider={
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{
                    display: { xs: 'none', sm: 'block' },
                    borderColor: 'rgba(0,0,0,0.12)',
                    alignSelf: 'center',
                    height: 34,
                  }}
                />
              }
              spacing={{ xs: 1, sm: 3.5 }}
              sx={{ mt: { xs: 5, md: 3 }, flexWrap: { xs: 'nowrap', sm: 'nowrap' }, rowGap: 3 }}
            >
              {highlights.map(({ icon: Icon, label }) => (
                <Stack key={label} spacing={{ xs: 0.75, sm: 1.2 }} alignItems="center" sx={{ minWidth: 0 }}>
                  <Box
                    sx={{
                      width: { xs: 42, sm: 52 },
                      height: { xs: 42, sm: 52 },
                      borderRadius: '50%',
                      bgcolor: 'rgba(179,17,31,0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Icon sx={{ color: BRAND_RED, fontSize: { xs: 19, sm: 24 } }} />
                  </Box>
                  <Typography
                    sx={{
                      fontSize: { xs: 10.5, sm: 12.5, md: 13.5 },
                      fontWeight: 600,
                      color: '#1B1B23',
                      textAlign: 'center',
                      whiteSpace: { sm: 'nowrap' },
                    }}
                  >
                    {label}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Box>
        </Box>

        {/* Right image with curved cut-in edge */}
        <Box
          sx={{
            position: 'relative',
            flex: { lg: '1 1 39%' },
            minHeight: { xs: 190, sm: 230, md: 280, lg: 'auto' },
            height: { xs: 190, sm: 230, md: 280, lg: 'auto' },
          }}
        >
          <Box
            component="img"
            src={ctaImg}
            alt="Catering spread ready for an event"
            sx={{
              position: { lg: 'absolute' },
              inset: 0,
              width: '100%',
              height: { xs: '100%', lg: '100%' },
              objectFit: 'cover',
              display: 'block',
              borderRadius: { xs: '20px', lg: '50% 0 0 50%' },
              mx: { xs: 'auto', lg: 0 },
              maxWidth: { xs: 'calc(100% - 64px)', sm: 'calc(100% - 80px)', md: 'calc(100% - 96px)', lg: 'none' },
            }}
          />

          {/* decorative accent line + dot — desktop only */}
          <Box
            component="svg"
            viewBox="0 0 40 620"
            sx={{
              display: { xs: 'none', lg: 'block' },
              position: 'absolute',
              left: -18,
              top: '50%',
              transform: 'translateY(-50%)',
              width: 40,
              height: '50%',
              overflow: 'visible',
              pointerEvents: 'none',
            }}
          >
            <path
              d="M32 46 C -24 200, -24 460, 50 617"
              fill="none"
              stroke={BRAND_RED}
              strokeWidth="4"
              opacity="0.65"
            />
            <circle cx="-7" cy="330" r="9" fill={BRAND_RED} />
          </Box>
        </Box>
      </Box>

      {/* ---- bottom contact bar ---- */}
      <Box sx={{  display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            mt: { xs: 4, sm: 5, md: 0 },
            borderRadius: { xs: '18px', md: '20px' },
            overflow: 'hidden',
            boxShadow: '0px 0px 50px rgba(20, 10, 10, 0.18)',  height:{xs:'auto', sm:'auto', md:'auto', lg:135, xl:135}, width: { xs: '100%', sm: '100%', md: '100%' }, maxWidth: '100%', boxSizing: 'border-box'}}>
        <Container
          maxWidth={false}
          sx={{ maxWidth: { xs: '100%', xl: 1440 }, px: { xs: 2.5, sm: 3.5, md: 6, lg: 6 } }}
        >
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            divider={
              <Divider
                orientation="vertical"
                flexItem
                sx={{ display: { xs: 'none', md: 'block' }, borderColor: 'rgba(0,0,0,0.1)' }}
              />
            }
            spacing={{ xs: 3, md: 0 }}
            sx={{ py: { xs: 4, md: 3.5 } }}
          >
            {contactCols.map(({ icon: Icon, title, lines, trailingArrow }) => (
              <Stack
                key={title}
                direction="row"
                spacing={2}
                alignItems="flex-start"
                sx={{ flex: 1, px: { md: 3 } }}
              >
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    flexShrink: 0,
                    borderRadius: '50%',
                    bgcolor: 'rgba(179,17,31,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon sx={{ color: BRAND_RED, fontSize: 22 }} />
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography sx={{ fontWeight: 700, fontSize: 15.5, color: '#141418' }}>
                    {title}
                  </Typography>
                  {lines.map((line) => (
                    <Typography
                      key={line}
                      sx={{ fontSize: 13.5, color: TEXT_MUTED, lineHeight: 1.6 }}
                    >
                      {line}
                    </Typography>
                  ))}
                </Box>
                {trailingArrow && (
                  <IconButton
                    aria-label="Chat with us"
                    onClick={openChat}
                    sx={{
                      alignSelf: 'center',
                      flexShrink: 0,
                      color: BRAND_RED,
                      p: 0.4,
                      mt:-6
                    }}
                  >
                    <ArrowForwardRoundedIcon sx={{ fontSize: 20 }} />
                  </IconButton>
                )}
              </Stack>
            ))}

            {/* WhatsApp + QR */}
            <Stack
              direction="row"
              spacing={2.5}
              alignItems="center"
              sx={{ flex: 1, px: { md: 3 }, justifyContent: { xs: 'space-between', md: 'flex-start' } }}
            >
              <Box>
                <Typography sx={{ fontWeight: 700, fontSize: 14.5, color: '#141418' }}>
                  Chat with us on WhatsApp
                </Typography>
                <Typography sx={{ fontSize: 13.5, color: TEXT_MUTED, lineHeight: 1.6 }}>
                  Scan the QR code
                  <br />
                  to start a chat
                </Typography>
              </Box>

              <Box
                sx={{
                  width: 78,
                  height: 78,
                  flexShrink: 0,
                  p: 0.75,
                  border: `1.5px solid ${BRAND_RED}`,
                  borderRadius: '10px',
                  display: 'flex',
                }}
              >
                <Box
                  component="img"
                  src={watsappQrCode}
                  alt="Scan to chat with Hogist on WhatsApp"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    display: 'block',
                    borderRadius: '4px',
                  }}
                />
              </Box>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* ---- tagline strip ---- */}
      <Box sx={{  py: { xs: 2.5, md: 3 } }}>
        <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
          <RoomServiceRoundedIcon sx={{ color: BRAND_RED, fontSize: 18 }} />
          <Typography sx={{ fontSize: { xs: 13.5, md: 15 }, fontWeight: 600, color: '#141418' }}>
            Good food.{' '}
            <Box
              component="span"
              sx={{ borderBottom: `2px solid ${BRAND_RED}`, pb: '1px' }}
            >
              Better experiences.
            </Box>{' '}
            <Box component="span" sx={{ color: BRAND_RED, fontWeight: 700 }}>
              That&rsquo;s Hogist.
            </Box>
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}