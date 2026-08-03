import { Box, Container, Stack, Typography, Chip } from '@mui/material'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
import CakeRoundedIcon from '@mui/icons-material/CakeRounded'
import BusinessCenterRoundedIcon from '@mui/icons-material/BusinessCenterRounded'
import CelebrationRoundedIcon from '@mui/icons-material/CelebrationRounded'
import Groups2RoundedIcon from '@mui/icons-material/Groups2Rounded'
import TuneRoundedIcon from '@mui/icons-material/TuneRounded'
import { tokens } from '../theme'

const eventTypes = [
  { label: 'Weddings', icon: <FavoriteRoundedIcon fontSize="small" /> },
  { label: 'Birthdays', icon: <CakeRoundedIcon fontSize="small" /> },
  { label: 'Corporate', icon: <BusinessCenterRoundedIcon fontSize="small" /> },
  { label: 'Festivals', icon: <CelebrationRoundedIcon fontSize="small" /> },
  { label: 'Get-togethers', icon: <Groups2RoundedIcon fontSize="small" /> },
  { label: 'Custom event', icon: <TuneRoundedIcon fontSize="small" /> },
]

export default function EventTypes() {
  return (
    <Box component="section" sx={{ pb: { xs: 6, md: 8 } }}>
      <Container maxWidth="lg">
        <Typography variant="body2" sx={{ fontWeight: 700, color: tokens.inkSoft, mb: 1.5 }}>
          Filter caterers by what you're planning
        </Typography>
        <Stack direction="row" spacing={1.5} sx={{ flexWrap: 'wrap', rowGap: 1.5 }}>
          {eventTypes.map((e, i) => (
            <Chip
              key={e.label}
              icon={e.icon}
              label={e.label}
              variant={i === 0 ? 'filled' : 'outlined'}
              color={i === 0 ? 'primary' : 'default'}
              sx={{
                borderRadius: '999px',
                py: 2.4,
                px: 0.5,
                fontWeight: 700,
                fontSize: 14,
                borderColor: 'rgba(36,28,26,0.14)',
                bgcolor: i === 0 ? undefined : '#fff',
              }}
            />
          ))}
        </Stack>
      </Container>
    </Box>
  )
}
