import { useState, useMemo } from 'react';
import {
  Box,
  Stack,
  TextField,
  InputAdornment,
  Button,
  Popover,
  List,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const today = dayjs().startOf('day');

// generate time slots every 30 minutes for a full day
const buildTimeSlots = () => {
  const slots = [];
  let cursor = dayjs().startOf('day');
  for (let i = 0; i < 48; i += 1) {
    slots.push(cursor);
    cursor = cursor.add(30, 'minute');
  }
  return slots;
};
const timeSlots = buildTimeSlots();

export default function BookingForm() {
  const [values, setValues] = useState({
    location: '',
    date: null,
    time: null,
    pax: '',
    contact: '',
  });

  const [errors, setErrors] = useState({
    location: '',
    date: '',
    time: '',
    pax: '',
    contact: '',
  });

  const [dateAnchorEl, setDateAnchorEl] = useState(null);
  const [timeAnchorEl, setTimeAnchorEl] = useState(null);

  const handleChange = (field) => (e) => {
    let val = e.target.value;

    if (field === 'pax' || field === 'contact') {
      // digits only
      val = val.replace(/\D/g, '');
    }
    if (field === 'contact') {
      val = val.slice(0, 10);
    }

    setValues((prev) => ({ ...prev, [field]: val }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleDateSelect = (newVal) => {
    setValues((prev) => ({ ...prev, date: newVal }));
    if (errors.date) {
      setErrors((prev) => ({ ...prev, date: '' }));
    }
    setDateAnchorEl(null);
  };

  const handleTimeSelect = (slot) => {
    setValues((prev) => ({ ...prev, time: slot }));
    if (errors.time) {
      setErrors((prev) => ({ ...prev, time: '' }));
    }
    setTimeAnchorEl(null);
  };

  const validate = () => {
    const nextErrors = {
      location: '',
      date: '',
      time: '',
      pax: '',
      contact: '',
    };

    if (!values.location.trim()) {
      nextErrors.location = 'Delivery location is required';
    }

    if (!values.date) {
      nextErrors.date = 'Please select a date';
    } else if (values.date.isBefore(today, 'day')) {
      nextErrors.date = 'Date cannot be in the past';
    }

    if (!values.time) {
      nextErrors.time = 'Please select a time';
    }

    if (!values.pax) {
      nextErrors.pax = 'Pax count is required';
    } else if (Number(values.pax) < 25) {
      nextErrors.pax = 'Minimum 25 pax required';
    }

    if (!values.contact) {
      nextErrors.contact = 'Contact number is required';
    } else if (values.contact.length !== 10) {
      nextErrors.contact = 'Enter a valid 10-digit number';
    }

    setErrors(nextErrors);
    return Object.values(nextErrors).every((msg) => msg === '');
  };

  const handleSubmit = () => {
    const isValid = validate();
    if (isValid) {
      // form is valid - proceed to menu
      console.log('Booking form values:', values);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          bgcolor: '#fff',
          border: '1px solid #F0F0F3',
          boxShadow: '0 20px 45px rgba(20,20,43,0.08)',
          borderRadius: 2,
          p: { xs: 2.5, md: 3 },
          maxWidth: 380,
        }}
      >
        <Stack spacing={2}>
          <TextField
            fullWidth
            placeholder="Delivery location"
            size="small"
            value={values.location}
            onChange={handleChange('location')}
            error={Boolean(errors.location)}
            helperText={errors.location}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOnOutlinedIcon color="action" fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          {/* Date field - read-only, opens a real calendar popover on click */}
          <TextField
            fullWidth
            size="small"
            placeholder="Date of event"
            value={values.date ? values.date.format('DD-MM-YYYY') : ''}
            error={Boolean(errors.date)}
            helperText={errors.date}
            onClick={(e) => setDateAnchorEl(e.currentTarget)}
            InputProps={{
              readOnly: true,
              startAdornment: (
                <InputAdornment position="start">
                  <EventOutlinedIcon color="action" fontSize="small" />
                </InputAdornment>
              ),
            }}
            sx={{ cursor: 'pointer', '& input': { cursor: 'pointer' } }}
          />
          <Popover
            open={Boolean(dateAnchorEl)}
            anchorEl={dateAnchorEl}
            onClose={() => setDateAnchorEl(null)}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            PaperProps={{
                sx: {
                borderRadius: 1.5,
                mt:1.5
                },
            }}
          >
            <DateCalendar
            value={values.date}
            onChange={handleDateSelect}
            minDate={today}
            sx={{
                width: 250,      // Reduce overall width
                height: 290,     // Reduce overall height

                '& .MuiPickersCalendarHeader-root': {
                minHeight: 40,
                },

                '& .MuiPickersDay-root': {
                width: 30,
                height: 30,
                fontSize: '0.8rem',
                margin: '2px',
                },

                '& .MuiDayCalendar-weekDayLabel': {
                width: 30,
                fontSize: '0.8rem',
                },
            }}
            />
          </Popover>

          {/* Time field - read-only, opens a manual time-slot list on click */}
          <TextField
            fullWidth
            size="small"
            placeholder="Delivery Time"
            value={values.time ? values.time.format('hh:mm A') : ''}
            error={Boolean(errors.time)}
            helperText={errors.time}
            onClick={(e) => setTimeAnchorEl(e.currentTarget)}
            InputProps={{
              readOnly: true,
              startAdornment: (
                <InputAdornment position="start">
                  <AccessTimeOutlinedIcon color="action" fontSize="small" />
                </InputAdornment>
              ),
            }}
            sx={{ cursor: 'pointer', '& input': { cursor: 'pointer' } }}
          />
          <Popover
            open={Boolean(timeAnchorEl)}
            anchorEl={timeAnchorEl}
            onClose={() => setTimeAnchorEl(null)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          >
            <List sx={{ maxHeight: 260, overflowY: 'auto', width: 160, py: 0 }}>
              {timeSlots.map((slot) => {
                const label = slot.format('hh:mm A');
                const selected =
                  values.time && values.time.format('HH:mm') === slot.format('HH:mm');
                return (
                  <ListItemButton
                    key={label}
                    selected={selected}
                    onClick={() => handleTimeSelect(slot)}
                  >
                    <ListItemText primary={label} />
                  </ListItemButton>
                );
              })}
            </List>
          </Popover>

          <TextField
            fullWidth
            placeholder="Minimum 25 Pax"
            size="small"
            value={values.pax}
            onChange={handleChange('pax')}
            error={Boolean(errors.pax)}
            helperText={errors.pax}
            inputProps={{ inputMode: 'numeric', maxLength: 4 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <GroupsOutlinedIcon color="action" fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            placeholder="Contact number"
            size="small"
            value={values.contact}
            onChange={handleChange('contact')}
            error={Boolean(errors.contact)}
            helperText={errors.contact}
            inputProps={{ inputMode: 'numeric', maxLength: 10 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneOutlinedIcon color="action" fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            endIcon={<ArrowForwardIcon />}
            sx={{ py: 1.3, fontSize: 16, borderRadius: 999 }}
            onClick={handleSubmit}
          >
            Proceed to Menu
          </Button>
        </Stack>
      </Box>
    </LocalizationProvider>
  );
}