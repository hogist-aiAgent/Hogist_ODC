import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Container, Grid, Typography, Stack, TextField } from "@mui/material";

import myPlanData from "../../data/MyPlanData";
import { getPlanMeals } from "../../../utils/planStorage";
import { submitCart, clearCartError } from "../../store/slices/cartSlice";

import { FieldLabel } from "../EventDetails/EventFolder/SectionLabel";
import { INK, INK_SOFT, FONT, HEADING_FONT } from "../EventDetails/EventFolder/Constants";
import { buildCostSummary } from "../EventDetails/EventFolder/CostSummary";

import EventDetailsStepper from "../EventDetails/EventFolder/EventDetailsStepper";
import OccasionSelector from "../EventDetails/EventFolder/OccasionSelector";
import GuestsStepper from "../EventDetails/EventFolder/GuestsStepper";
import MealsNeeded from "../EventDetails/EventFolder/MealsNeeded";
import VenueSection from "../EventDetails/EventFolder/VenueSection";
import HostAndContacts from "../EventDetails/EventFolder/HostAndContacts";
import NotesSection from "../EventDetails/EventFolder/NotesSection";
import PlanSummaryCard from "../EventDetails/EventFolder/PlanSummaryCard";
import ExecutiveCard from "../EventDetails/EventFolder/ExecutiveCard";

/* --------------------------------- main ---------------------------------- */

export default function EventDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { executive } = myPlanData;
  const { cart, cartLoading, cartError } = useSelector((state) => state.cart);

  const rawMeals = useMemo(() => getPlanMeals(), []);
  const costSummary = useMemo(() => buildCostSummary(rawMeals), [rawMeals]);

  const apiMeals = useMemo(
    () => rawMeals.filter((m) => m.isApiSourced && Array.isArray(m.itemIds) && m.itemIds.length > 0),
    [rawMeals]
  );
  const apiVendorIds = useMemo(() => [...new Set(apiMeals.map((m) => m.restaurantId))], [apiMeals]);
  const canSubmitCart = apiMeals.length > 0 && apiVendorIds.length === 1;

  const [occasion, setOccasion] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [guests, setGuests] = useState(0);
  const [meals, setMeals] = useState({ breakfast: false, lunch: false, eveningSnacks: false, dinner: false });
  const [venue, setVenue] = useState({
    address: "",
    pincode: "",
    setupAccessFrom: "",
    landmark: "",
    pin: null,
  });
  const [host, setHost] = useState({ name: "", phone: "" });
  const [contacts, setContacts] = useState([
    { label: "On-site contact during the event", name: "", phone: "" },
    { label: "Alternate number optional", name: "", phone: "" },
  ]);
  const [whatsapp, setWhatsapp] = useState(false);
  const [notes, setNotes] = useState("");

  const eventDateLabel = useMemo(() => {
    if (!eventDate) return "Not set yet";
    const d = new Date(`${eventDate}T00:00:00`);
    if (Number.isNaN(d.getTime())) return eventDate;
    return d.toLocaleDateString("en-IN", { weekday: "short", day: "2-digit", month: "short", year: "numeric" });
  }, [eventDate]);

  const shortDateLabel = useMemo(() => {
    if (!eventDate) return "your event date";
    const d = new Date(`${eventDate}T00:00:00`);
    if (Number.isNaN(d.getTime())) return eventDate;
    return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
  }, [eventDate]);

  const handleToggleMeal = (key) => setMeals((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleAddContact = () =>
    setContacts((prev) => [...prev, { label: "Additional contact", name: "", phone: "" }]);

  const handleContactChange = (idx, updated) =>
    setContacts((prev) => prev.map((c, i) => (i === idx ? updated : c)));

  const handleRemoveContact = (idx) =>
    setContacts((prev) => prev.filter((_, i) => i !== idx));

  const handleAddNoteTag = (tag) =>
    setNotes((prev) => (prev ? `${prev} ${tag}.` : `${tag}.`));

  const handleContinueToPayment = () => {
    if (!canSubmitCart) return;
    if (cartError) dispatch(clearCartError());
    const services = apiMeals.flatMap((meal) =>
      (meal.itemIds || []).map((itemId) => ({ _id: itemId, count: meal.plates }))
    );
    dispatch(submitCart({ services, serviceDate: eventDate, additional: [] }));
  };

  const venueShortLabel = venue.address
    ? venue.address.split(",").slice(-1)[0].trim() + (venue.pin ? " · pinned" : "")
    : "Not set";

  return (
    <Box sx={{ bgcolor: "#FFF", minHeight: "100vh" }}>
      <EventDetailsStepper />

      <Box sx={{ bgcolor: "#fff", pt: { xs: 3, md: 3 } }}>
        <Container maxWidth="lg">
          <Typography sx={{ fontWeight: 800, fontSize: { xs: 20, md: 24 }, color: INK, fontFamily: HEADING_FONT }}>
            Where and when are we serving?
          </Typography>
          <Typography sx={{ fontSize: 13, color: INK_SOFT, fontFamily: FONT, mt: 0.5 }}>
            Your menus are chosen. These details go to the kitchens so they can confirm the date and plan the crew.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 4 } }}>
        <Grid container spacing={{ xs: 3, md: 5 }}>
          {/* LEFT: form */}
          <Grid item xs={12} md={7.5} lg={8}>
            <Stack spacing={3.5}>
              <OccasionSelector sx={{mt:0}} value={occasion} onChange={setOccasion} />

              <Grid container gap={2} >
                <Grid item xs={12} sm={6.5} >
                  <FieldLabel>Event name so you can find it later</FieldLabel>
                  <TextField
                    fullWidth
                    size="small"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    placeholder="e.g. Kumar & Divya — wedding reception"
                  />
                </Grid>
                <Grid item xs={12} sm={5.2} >
                  <FieldLabel>Event date</FieldLabel>
                  <TextField
                    fullWidth
                    size="small"
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>

              <GuestsStepper value={guests} onChange={setGuests} />

              <MealsNeeded value={meals} onToggle={handleToggleMeal} />

              <VenueSection venue={venue} onChange={setVenue} eventDateLabel={shortDateLabel} />

              <HostAndContacts
                host={host}
                onHostChange={setHost}
                contacts={contacts}
                onContactChange={handleContactChange}
                onAddContact={handleAddContact}
                onRemoveContact={handleRemoveContact}
                whatsapp={whatsapp}
                onWhatsappToggle={setWhatsapp}
              />

              <NotesSection notes={notes} onChange={setNotes} onAddTag={handleAddNoteTag} />
            </Stack>
          </Grid>

          {/* RIGHT: plan summary + executive */}
          <Grid item xs={12} md={4.5} lg={4}>
            <Box sx={{ position: { md: "sticky" }, top: { md: 100 } }}>
              <PlanSummaryCard
                meals={rawMeals}
                costSummary={costSummary}
                eventDateLabel={eventDateLabel}
                guests={guests > 0 ? guests : "Not set"}
                venueLabel={venueShortLabel}
                hostName={host.name || "Not set"}
                contactCount={contacts.filter((c) => c.phone).length + (host.phone ? 1 : 0)}
                canSubmitCart={canSubmitCart}
                cartLoading={cartLoading}
                cartError={cartError}
                onContinueToPayment={handleContinueToPayment}
                onSaveForLater={() => navigate("/my-plan")}
                onEditMenus={() => navigate("/my-plan")}
              />
              <ExecutiveCard executive={executive} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}