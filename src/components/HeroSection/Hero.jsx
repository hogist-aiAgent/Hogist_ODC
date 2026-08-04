import {
  Box,
  Container,
  Typography,
} from '@mui/material';
import bgImg from '../../assets/backgroundImage/background-img.jpeg';
import IconButton from '@mui/material/IconButton';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import PaymentIcon from '@mui/icons-material/Payment';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import curveImg from '../../assets/backgroundImage/curve-bgImg.png';
import orderImg from '../../assets/HeroSection/img11.jpg'

export default function Hero({ onLocationConfirm } = {}) {
  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        bgcolor: '#fff',
        pt: { xs: 5, md: 13 },
        pb: { xs: 8, md: 15 },
        p: { xs: 2, sm: 2.5, md: 3, lg: 3.5 },
        minHeight: { xs: 'auto', md: '90vh', lg: '90vh' },
        height: { xs: '540px',sm:'500px', md: '580px',lg:'570px' },
      }}
    >
      
      <Box
      component="img"
      src={bgImg}
      alt=""
      sx={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center center',
        opacity: 0.18,
        zIndex: 0,
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: { xs: 140, sm: 180, md: 220, lg: 260 },
          background:
            'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,.88) 40%, rgba(255, 255, 255, 0.06) 100%)',
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: { xs: 100, sm: 130, md: 160, lg: 190 },
          background:
            'linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,.92) 40%, rgba(255,255,255,0) 100%)',
          zIndex: 0,
        }}
      />

       <Box
      component="img"
        src={curveImg}
        alt=""
        sx={{
          position: "absolute",
          top:"0",
          right: 0,
          width: 990,
          height: 570,
          zIndex:1,
          display: { xs: 'none', sm: 'none', md: 'block' },
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', lg: 'row' },
              alignItems: {
                xs: 'center',
                sm: 'center',
                md: 'center',
                lg: 'center',
              },
              justifyContent: 'space-between',
              textAlign: { xs: 'center', lg: 'left' },
              gap: {
                xs: 5,
                sm: 6,
                md: 8,
                lg: 10,
                xl: 15,
              },
              mt: { xs: 0, sm: 0, md: 0, lg: 15 },
            }}
          >
          <Box
            sx={{
              flex: { xs: '1 1 100%', lg: '1 1 50%' },
              maxWidth: {
                xs: '100%',
                lg: '56%',
              },
              width: '100%',
              position: 'relative',
              zIndex: 50,
              display: 'flex',
              flexDirection: 'column',
              alignItems: { xs: 'center', lg: 'flex-start' },
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: 28, sm: 36, md: 40,  },
                lineHeight: 1.15,
                mb: 2,
                fontWeight: 800,
                letterSpacing: '-0.5px',
                fontFamily: '"Montserrat", sans-serif',
                mt:{ xs: 9, sm: 9, md: 2,},
              }}
            >
              A one-stop place for all your{' '}
                Food and Party Orders.
              
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: 'primary.main',
                fontWeight: 600,
                fontSize: { xs: '0.85rem', sm: '0.9rem', md: '0.95rem' },
                letterSpacing: '0.1px',
                fontFamily: '"open sans", sans-serif',
                mb: 3,
              }}
            >
              Order a day before the event. Place any order starting from 25pax.
            </Typography>

            <Box
              sx={{
                  display: { xs: 'flex', sm: 'flex', md: 'flex', lg: 'none' },
                  flex: {
                    xs: '1 1 100%',
                  },
                  maxWidth: {
                    xs: '100%',
                  },
                  width: '100%',
                  justifyContent: {
                    xs: 'center',
                    sm: 'center',
                    md: 'center',
                  },
                  alignItems: 'center',
                  position: 'relative',
                  zIndex: 2,
                  mt: { xs: 0, sm: 0, md: 1, },
                  mb:2
                }}
              >
                <Box
                  component="img"
                  src={orderImg}
                  alt="Order food"
                  sx={{
                    width: {
                      xs: '100%',
                      sm: '90%',
                      md: '90%',
                    },
                    maxWidth: {
                      xs: 340,
                      sm: 420,
                      md: 490,
                    },
                    height: {
                      xs: '200px',
                      sm: '200px',
                      md: '250px',
                    },
                    display: 'block',
                    objectFit: 'cover',
                    borderRadius: {
                      xs: 2,
                      sm: 3,
                    },
                    boxShadow: '0 20px 45px rgba(20,20,43,0.08)',
                    mt: { xs: 3, sm: 3, md: 3, lg: 0 },
                  }}
                />
            </Box>
          </Box>

          <Box
            sx={{
              display: { xs: 'none', sm: 'none', md: 'none', lg: 'flex' },
              flex: '1 1 45%',
              maxWidth: '45%',
              width: '100%',
              justifyContent: 'flex-end',
              alignItems: 'center',
              position: 'relative',
              zIndex: 2,
            }}
          >
            <Box
              component="img"
              src={orderImg}
              alt="Order food"
              sx={{
                width: '100%',
                maxWidth: { lg: 540, xl: 650 },
                height: { lg: '300px', xl: '350px' },
                display: 'block',
                objectFit: 'cover',
                borderRadius: 3,
                boxShadow: '0 20px 45px rgba(20,20,43,0.08)',
              }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}