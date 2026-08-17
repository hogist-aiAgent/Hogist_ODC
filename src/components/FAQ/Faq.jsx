import { useState } from 'react';
import { Box, Container, Typography, Stack, Collapse } from '@mui/material';
import RoomServiceOutlinedIcon from '@mui/icons-material/RoomServiceOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import CelebrationOutlinedIcon from '@mui/icons-material/CelebrationOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import HeadsetMicOutlinedIcon from '@mui/icons-material/HeadsetMicOutlined';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';

import laptopImg from '../../assets/FAQ/f.png';

// Brand tokens — kept in sync with the shared MUI theme / other sections
const BRAND_RED = '#B3111F';
const TEXT_MUTED = '#6B6B76';
const HEADING_DARK = '#141418';
const CARD_TINT = '#FDF7F5';
const CARD_BORDER = 'rgba(179,17,31,0.18)';
const ICON_BG = 'rgba(179,17,31,0.08)';
const BOTTOM_BAR_BG = '#FCEEE7';

const faqs = [
  {
    icon: RoomServiceOutlinedIcon,
    question: 'What is Hogist?',
    answer:
      'Hogist is a bulk food ordering and food service platform serving Chennai. We provide daily office meals, event and party catering, bulk food orders and cafeteria management through a network of partner kitchens.',
  },
  {
    icon: LocationOnOutlinedIcon,
    question: 'Does Hogist deliver bulk food across Chennai?',
     answer:
      'Yes. Hogist delivers and serves bulk food orders across Chennai and its surrounding service areas. Customers can order food for offices, events, parties, meetings and other large gatherings based on location and availability.',
  },
  {
    icon: ApartmentOutlinedIcon,
    question: 'Which areas in Chennai does Hogist deliver bulk food to?',
     answer:
      'Hogist delivers and serves bulk food orders across Chennai and nearby areas, including Anna Nagar, T. Nagar, Velachery, Adyar, Guindy, Mylapore, Tambaram, OMR, Chengalpattu and other locations, subject to availability and order requirements.',
  },
  {
    icon: RestaurantOutlinedIcon,
    question: 'What services does Hogist provide?',
     answer:
      'Hogist provides four core food services: bulk food ordering, daily office meals, events and party catering, and cafeteria management.',
  },
  {
    icon: CelebrationOutlinedIcon,
    question: 'Can I order bulk food for a party or event in Chennai?',
     answer:
      'Yes. Hogist provides bulk food and catering for parties, family gatherings, office events, celebrations, meetings, conferences and other large gatherings across its service areas in Chennai.',
  },
  {
    icon: BusinessOutlinedIcon,
    question: 'Does Hogist provide daily office meals?',
     answer:
      'Yes. Hogist provides planned daily office meals for workplaces, including recurring breakfast, lunch, dinner and other meal requirements, depending on the location and service arrangement.',
  },
  {
    icon: Groups2OutlinedIcon,
    question: 'Does Hogist provide cafeteria management?',
     answer:
      'Yes. Hogist provides cafeteria management solutions for organizations that need ongoing workplace food operations, including food planning, kitchen coordination, quality management and day-to-day meal service.',
  },
  {
    icon: ChecklistOutlinedIcon,
    question: 'Can I customize my menu with Hogist?',
     answer:
      'Yes. Hogist allows customers to select and customize menus according to the type of event, number of guests, food preferences and budget. Available menu options depend on the service and location.',
  },
  {
    icon: PeopleAltOutlinedIcon,
    question: 'What is the minimum order for Hogist bulk food delivery?',
     answer:
      'Hogist\'s minimum order depends on the type of requirement, such as daily office meals, events or other bulk food orders. Customers can enter their delivery location and requirement to check the applicable minimum order and availability. Usually starts from 40 pax.',
  },
  {
    icon: ShoppingCartOutlinedIcon,
    question: 'How do I order bulk food from Hogist?',
     answer:
      'To order from Hogist, enter your delivery location, check availability, choose the appropriate food or service option, select a menu and submit your requirement. Hogist coordinates the kitchen, food preparation, quality checks and delivery.',
  },
];

function FaqRow({ index, icon: Icon, question, answer, active, onToggle }) {
  return (
    <Box
      onClick={onToggle}
      sx={{
        cursor: 'pointer',
        borderRadius: '14px',
        border: active ? `1.5px solid ${CARD_BORDER}` : '1.5px solid transparent',
        borderBottom: active ? `1.5px solid ${CARD_BORDER}` : '1px solid rgba(0,0,0,0.08)',
        bgcolor: active ? CARD_TINT : 'transparent',
        px: { xs: 1.5, sm: 2.5 },
        py: { xs: 1.75, sm: 2.25 },
        transition: 'background-color 0.2s ease, border-color 0.2s ease',
      }}
    >
      <Stack direction="row" alignItems="flex-start" spacing={{ xs: 1.25, sm: 2 }}>
        <Box
          sx={{
            width: { xs: 34, sm: 40 },
            height: { xs: 34, sm: 40 },
            flexShrink: 0,
            borderRadius: '10px',
            bgcolor: ICON_BG,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon sx={{ color: BRAND_RED, fontSize: { xs: 17, sm: 20 } }} />
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: { xs: 1, sm: 1.25 } }}>
            <Box
              sx={{
                width: { xs: 20, sm: 22 },
                height: { xs: 20, sm: 22 },
                flexShrink: 0,
                borderRadius: '50%',
                bgcolor: BRAND_RED,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mt: '2px',
              }}
            >
              <Typography
                component="span"
                sx={{
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: { xs: 9.5, sm: 10.5 },
                  lineHeight: 1,
                }}
              >
                {String(index + 1).padStart(2, '0')}
              </Typography>
            </Box>
            <Typography
              component="span"
              sx={{
                flex: 1,
                minWidth: 0,
                fontWeight: 700,
                fontSize: { xs: 14, sm: 15.5 },
                color: HEADING_DARK,
                lineHeight: 1.4,
                fontFamily: '"open sans", sans-serif',
              }}
            >
              {question}
            </Typography>
          </Box>

          <Collapse in={active} timeout={220} unmountOnExit>
            {answer && (
              <Typography
                sx={{
                  mt: 1,
                  color: TEXT_MUTED,
                  fontSize: { xs: 13, sm: 13.75 },
                  lineHeight: 1.7,
                  maxWidth: 480,
                  fontFamily: '"open sans", sans-serif',
                }}
              >
                {answer}
              </Typography>
            )}
          </Collapse>
        </Box>

        <KeyboardArrowDownRoundedIcon
          sx={{
            color: active ? BRAND_RED : '#B7B7BE',
            fontSize: { xs: 20, sm: 22 },
            flexShrink: 0,
            mt: 0.25,
            transform: active ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
          }}
        />
      </Stack>
    </Box>
  );
}

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleToggle = (index) => {
    setActiveIndex((prev) => (prev === index ? -1 : index));
  };

  const leftItems = faqs.slice(0, 5);
  const rightItems = faqs.slice(5, 10);


  const handleWhatsAppClick = (event) => {
    if (event.ctrlKey || event.metaKey || event.button === 1) {
      return;
    }
    event.preventDefault();
    window.open(`https://wa.me/${'15557647627'}`, '_blank');
   };


  return (
    <Box component="section" sx={{ bgcolor: '#fff', py: { xs: 3, sm: 4, md: 4 } }}>
      <Container maxWidth={false} sx={{ maxWidth: { xs: '100%', xl: 1320 }, px: { xs: 2.5, sm: 4, md: 6 } }}>
        {/* ---- header ---- */}
        <Stack alignItems="center" textAlign="center" sx={{ mb: { xs: 4, sm: 5, md: 3 } }}>
          <Stack direction="row" spacing={1.25} alignItems="center" sx={{ mb: 2 }}>
            <Box sx={{ width: { xs: 18, sm: 28 }, height: '1px', bgcolor: 'rgba(179,17,31,0.35)' }} />
            <Box sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: BRAND_RED }} />
            <Typography
              sx={{
                color: BRAND_RED,
                fontWeight: 700,
                fontSize: { xs: 12, sm: 13 },
                letterSpacing: '0.2em',
                fontFamily: '"open sans", sans-serif',
              }}
            >
              FAQ
            </Typography>
            <Box sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: BRAND_RED }} />
            <Box sx={{ width: { xs: 18, sm: 28 }, height: '1px', bgcolor: 'rgba(179,17,31,0.35)' }} />
          </Stack>

          <Typography
            component="h2"
            sx={{
              fontWeight: 800,
              color: HEADING_DARK,
              fontSize: { xs: 26, sm: 34, md: 40 },
              lineHeight: 1.2,
               fontFamily: '"Montserrat", sans-serif',
            }}
          >
            Frequently Asked Questions About{' '}
            <Box component="span" sx={{ color: BRAND_RED }}>
              Hogist
            </Box>
          </Typography>

          <Typography
            sx={{
              mt: 1.2,
              color: TEXT_MUTED,
              fontSize: { xs: 13.5, sm: 14 },
              maxWidth: 560,
              fontFamily: '"open sans", sans-serif',
            }}
          >
            Bulk food delivery, office meals, events and cafeteria management across Chennai.
          </Typography>
        </Stack>

        {/* ---- two-column accordion grid ---- */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            columnGap: { md: 4, lg: 5 },
            rowGap: { xs: 0.5, md: 0.5 },
          }}
        >
          <Stack spacing={0.5}>
            {leftItems.map((item, i) => (
              <FaqRow
                key={item.question}
                index={i}
                icon={item.icon}
                question={item.question}
                answer={item.answer}
                active={activeIndex === i}
                onToggle={() => handleToggle(i)}
              />
            ))}
          </Stack>

          <Stack spacing={0.5} sx={{ mt: { xs: 0.2, md: 0 } }}>
            {rightItems.map((item, i) => {
              const globalIndex = i + 5;
              return (
                <FaqRow
                  key={item.question}
                  index={globalIndex}
                  icon={item.icon}
                  question={item.question}
                  answer={item.answer}
                  active={activeIndex === globalIndex}
                  onToggle={() => handleToggle(globalIndex)}
                />
              );
            })}
          </Stack>
        </Box>

        {/* ---- bottom help bar ---- */}
        <Box
          sx={{
            position: 'relative',
            mt: { xs: 6, sm: 7, md: 12 },
            borderRadius: { xs: '18px', md: '22px' },
            bgcolor: BOTTOM_BAR_BG,
            overflow: 'visible',
            pr: { xs: '10px', md: '190px', lg: '230px' },
          }}
        >
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            divider={
              <Box
                sx={{
                  display: { xs: 'none', sm: 'block' },
                  width: '1px',
                  alignSelf: 'stretch',
                  my: 2,
                  bgcolor: 'rgba(0,0,0,0.08)',
                }}
              />
            }
            spacing={{ xs: 2.7, sm: 0 }}
            sx={{ px: { xs: 2.5, sm: 3.5, md: 4.5 }, py: { xs: 2, sm: 3.5 }, }}
          >
            <Stack direction="row" spacing={1.75} alignItems="center" sx={{ flex: 1 }}>
              <LightbulbOutlinedIcon
                sx={{ color: BRAND_RED, fontSize: { xs: 32, sm: 36 }, flexShrink: 0 ,}}
              />
              <Box>
                <Typography sx={{ fontWeight: 700, fontSize: 15, color: HEADING_DARK, fontFamily: '"open sans", sans-serif', }}>
                  Can&rsquo;t find what you&rsquo;re looking for?
                </Typography>
                <Typography sx={{ fontSize: 13, color: TEXT_MUTED, lineHeight: 1.6, mt: 0.25, fontFamily: '"open sans", sans-serif', }}>
                  Our team is here to help you with any questions about our services, menus or
                  orders.
                </Typography>
              </Box>
            </Stack>

            <Stack direction="row" spacing={1.75} alignItems="center" sx={{ flex: 1, sm: { pl: 3.8 } }}>
              <HeadsetMicOutlinedIcon
                sx={{ color: BRAND_RED, fontSize: { xs: 32, sm: 36 }, flexShrink: 0, }}
              />
              <Box>
                <Typography sx={{ fontSize: 13, color: TEXT_MUTED, lineHeight: 1.6,fontFamily: '"open sans", sans-serif', }}>
                  Get expert help from our support team.
                </Typography>
                <Stack
                 onClick={handleWhatsAppClick}
                  direction="row"
                  spacing={0.5}
                  alignItems="center"
                  sx={{ mt: 0.5, cursor: 'pointer', width: 'fit-content' }}
                >
                  <Typography sx={{ fontWeight: 700, fontSize: 14, color: BRAND_RED,fontFamily: '"open sans", sans-serif' }}>
                    Talk to us
                  </Typography>
                  <ArrowForwardRoundedIcon sx={{ color: BRAND_RED, fontSize: 16 }} />
                </Stack>
              </Box>
            </Stack>
          </Stack>

          {/* laptop illustration — overflows the bar on desktop */} 
          <Box
            component="img"
            src={laptopImg}
            alt="Hogist on a laptop screen"
            loading="lazy"
            decoding="async"
            sx={{
              display: { xs: 'none', md: 'block' },
              position: 'absolute',
              right: { md: -10, lg: 10 },
              bottom: 0,
              height: { md: 190, lg: 220 },
              width: 'auto',
              objectFit: 'contain',
              pointerEvents: 'none',
            }}
          />

          {/* compact laptop illustration for small/medium screens */}
          <Box
            component="img"
            src={laptopImg}
            alt="Hogist on a laptop screen"
            loading="lazy"
            decoding="async"
            sx={{
              display: { xs: 'block', md: 'none' },
              width: '55%',
              maxWidth: 220,
              mx: 'auto',
              mt: -2,
              objectFit: 'contain',
            }}
          />
        </Box>
      </Container>
    </Box>
  );
}