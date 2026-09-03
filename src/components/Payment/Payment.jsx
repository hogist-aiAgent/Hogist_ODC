import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Container,
  Grid,
  Typography,
  Stack,
  TextField,
  Checkbox,
  Button,
  Divider,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

import myPlanData from "../../data/MyPlanData";
import { getPlanMeals } from "@/utils/planStorage";
import { getEventDetails } from "@/utils/eventDetailsStorage";
import { buildCostSummary } from "../EventDetails/EventFolder/CostSummary";
import { FieldLabel } from "../EventDetails/EventFolder/SectionLabel";
import {
  RED,
  VEG_GREEN,
  AMBER,
  INK,
  INK_SOFT,
  CARD_BORDER,
  BANNER_BG,
  FONT,
  HEADING_FONT,
  currency,
} from "../EventDetails/EventFolder/Constants";

/* ------------------------------- local data ------------------------------- */

// Steps for this page's own progress bar — the Payment page shows a
// shorter 4-step trail than the Event Details page's 5-step one.
const PAYMENT_STEPS = [
  { id: 1, label: "Menus chosen", status: "done" },
  { id: 2, label: "Review plan", status: "done" },
  { id: 3, label: "Event Details", status: "done" },
  { id: 4, label: "Payment", status: "active" },
  { id: 5, label: "Kitchen Confirmation", status: "upcoming" },
];

const PAYMENT_METHODS = [
  { key: "upi", label: "UPI", sub: "GPay · PhonePe · Paytm · BHIM", tag: "NO FEE" },
  { key: "card", label: "Card", sub: "Visa, Mastercard, RuPay, Amex" },
  { key: "neft", label: "NEFT / RTGS bank transfer", sub: "Confirms in 2–4 h" },
  { key: "corporate", label: "Corporate invoice", sub: "Net 30, needs GSTIN" },
];

const PAYMENT_METHOD_SHORT_LABEL = {
  upi: "UPI",
  card: "Card",
  neft: "Bank Transfer",
  corporate: "Invoice",
};

// A full-payment booking gets a small discount vs. paying the 25% advance.
const FULL_PAYMENT_DISCOUNT_RATE = 0.01;
const ADVANCE_RATE = 0.25;
const HOLD_MINUTES = 30;

function formatCountdown(totalSeconds) {
  const clamped = Math.max(0, totalSeconds);
  const mins = Math.floor(clamped / 60);
  const secs = clamped % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

// event.date is stored like "Sat, 14 Sep 2026" — pull out the parseable part.
function parseEventDate(dateStr) {
  if (!dateStr) return null;
  const parts = dateStr.split(", ");
  const datePart = parts.length > 1 ? parts.slice(1).join(", ") : parts[0];
  const d = new Date(datePart);
  return Number.isNaN(d.getTime()) ? null : d;
}

// Picks the "on-site contact" row saved on the Event Details page and
// formats it the way this page's field expects, e.g. "Suresh · +91 90000 00000".
function formatOnsiteContact(contacts) {
  if (!Array.isArray(contacts)) return "";
  const onsite = contacts.find((c) => c.label === "On-site contact during the event") || contacts[0];
  if (!onsite) return "";
  const { name, phone } = onsite;
  if (name && phone) return `${name} · ${phone}`;
  return name || phone || "";
}

/* --------------------------------- pieces --------------------------------- */

function TopBar() {
  return (
    <Box sx={{ bgcolor: "#fff" }}>
      <Container maxWidth="lg">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ py: 3.7 }}
        >
          <Stack direction="row" alignItems="center" spacing={1.25}>
            <Box
              sx={{
                width: 28,
                height: 28,
                borderRadius: 1,
                bgcolor: RED,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Typography sx={{ color: "#fff", fontWeight: 800, fontSize: 15, fontFamily: HEADING_FONT }}>
                H
              </Typography>
            </Box>
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: 16,
                letterSpacing: 0.5,
                color: INK,
                fontFamily: HEADING_FONT,
              }}
            >
              HOGIST
            </Typography>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={0.75}>
            <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: VEG_GREEN, flexShrink: 0 }} />
            <Typography sx={{ fontSize: 12.5, color: INK_SOFT, fontFamily: FONT }}>
              Secure payment · 256-bit encrypted
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

function StepDot({ step }) {
  const isDone = step.status === "done";
  const isActive = step.status === "active";

  const circleColor = isDone ? VEG_GREEN : isActive ? RED : "transparent";
  const borderColor = isDone ? VEG_GREEN : isActive ? RED : "#C9C2BB";
  const textColor = isDone ? VEG_GREEN : isActive ? RED : INK_SOFT;

  return (
    <Stack direction="row" alignItems="center" spacing={1} sx={{ flexShrink: 0 }}>
      <Box
        sx={{
          width: 24,
          height: 24,
          borderRadius: "50%",
          border: `2px solid ${borderColor}`,
          bgcolor: circleColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {isDone ? (
          <CheckIcon sx={{ fontSize: 14, color: "#fff" }} />
        ) : (
          <Typography sx={{ fontSize: 12, fontWeight: 800, color: isActive ? "#fff" : INK_SOFT, fontFamily: FONT }}>
            {step.id}
          </Typography>
        )}
      </Box>
      <Typography
        sx={{
          fontSize: 13,
          fontWeight: isActive || isDone ? 700 : 600,
          color: textColor,
          fontFamily: FONT,
          whiteSpace: "nowrap",
        }}
      >
        {step.label}
      </Typography>
    </Stack>
  );
}

function PaymentStepper() {
  return (
    <Box sx={{ bgcolor: "#fff", borderBottom: `1px solid ${CARD_BORDER}` }}>
      <Container maxWidth="lg">
        <Stack
          direction="row"
          alignItems="center"
          sx={{ py: 2, overflowX: { xs: "auto", md: "visible" } }}
        >
          {PAYMENT_STEPS.map((step, idx) => (
            <React.Fragment key={step.id}>
              <StepDot step={step} />
              {idx < PAYMENT_STEPS.length - 1 && (
                <Box sx={{ flexGrow: 1, height: "1px", bgcolor: CARD_BORDER, mx: { xs: 1.5, sm: 2, md: 3 }, minWidth: 20 }} />
              )}
            </React.Fragment>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}

function RadioDot({ selected }) {
  return (
    <Box
      sx={{
        width: 18,
        height: 18,
        flexShrink: 0,
        borderRadius: "50%",
        border: `2px solid ${selected ? RED : "#C9C2BB"}`,
        bgcolor: "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {selected && <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: RED }} />}
    </Box>
  );
}

function ScheduleOption({ selected, title, amount, subtitle, subtitleColor, onSelect }) {
  return (
    <Box
      onClick={onSelect}
      sx={{
        cursor: "pointer",
        border: `1.5px solid ${selected ? RED : CARD_BORDER}`,
        bgcolor: selected ? BANNER_BG : "#fff",
        borderRadius: 1,
        p: 2,
        height: "100%",
        transition: "border-color .15s, background-color .15s",
        "&:hover": { borderColor: RED },
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
        <RadioDot selected={selected} />
        <Typography sx={{ fontSize: 13, fontWeight: 700, color: INK, fontFamily: FONT }}>
          {title}
        </Typography>
      </Stack>
      <Typography sx={{ fontSize: 21, fontWeight: 800, color: INK, fontFamily: FONT, mb: 0.4 }}>
        {currency(amount)}
      </Typography>
      <Typography sx={{ fontSize: 11.5, color: subtitleColor || INK_SOFT, fontFamily: FONT }}>
        {subtitle}
      </Typography>
    </Box>
  );
}

function PaymentMethodRow({ method, selected, onSelect, children }) {
  return (
    <Box
      sx={{
        border: `1.5px solid ${selected ? RED : CARD_BORDER}`,
        bgcolor: selected ? BANNER_BG : "#fff",
        borderRadius: 1.5,
        px: 2,
        py: 1.5,
        transition: "border-color .15s, background-color .15s",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        onClick={onSelect}
        sx={{ cursor: "pointer" }}
      >
        <Stack direction="row" alignItems="center" spacing={1.25}>
          <RadioDot selected={selected} />
          <Typography sx={{ fontSize: 13.5, fontWeight: 700, color: INK, fontFamily: FONT }}>
            {method.label}
          </Typography>
          <Typography sx={{ fontSize: 12, color: INK_SOFT, fontFamily: FONT }}>
            {method.sub}
          </Typography>
        </Stack>
        {method.tag && (
          <Typography sx={{ fontSize: 11, fontWeight: 800, letterSpacing: 0.4, color: VEG_GREEN, fontFamily: FONT }}>
            {method.tag}
          </Typography>
        )}
      </Stack>
      {selected && children ? <Box sx={{ mt: 1.5 }}>{children}</Box> : null}
    </Box>
  );
}

/* --------------------------------- main ---------------------------------- */

export default function Payment() {
 
  const rawMeals = useMemo(() => getPlanMeals(), []);
  const savedEventDetails = useMemo(() => getEventDetails(), []);
  const hasLivePlan = rawMeals.length > 0;

  const meals = hasLivePlan ? rawMeals : myPlanData.meals;

  const event = useMemo(() => {
    const hasSavedEvent =
      savedEventDetails?.eventName || savedEventDetails?.eventDate || savedEventDetails?.venue?.address || savedEventDetails?.guests;
    if (!hasSavedEvent) return myPlanData.event;

    const d = savedEventDetails.eventDate ? new Date(`${savedEventDetails.eventDate}T00:00:00`) : null;
    const dateLabel =
      d && !Number.isNaN(d.getTime())
        ? d.toLocaleDateString("en-IN", { weekday: "short", day: "2-digit", month: "short", year: "numeric" })
        : "Date not set";

    return {
      title: savedEventDetails.eventName || "Your event",
      date: dateLabel,
      venue: savedEventDetails.venue?.address || "Venue not set",
      guests: savedEventDetails.guests || 0,
    };
  }, [savedEventDetails]);

  const costSummary = useMemo(() => {
    if (hasLivePlan) {
      const c = buildCostSummary(rawMeals);
      const vendorCount = new Set(rawMeals.map((m) => m.restaurantId)).size || 1;
      return {
        total: c.total,
        perGuest: c.perGuest,
        breakdown: [
          c.transportTotal > 0 && {
            label: `Transport · ${vendorCount} kitchen${vendorCount === 1 ? "" : "s"}`,
            amount: c.transportTotal,
          },
          c.offerTotal > 0 && { label: "Season offer", amount: -c.offerTotal },
          c.gst > 0 && { label: "GST 5%", amount: c.gst },
        ].filter(Boolean),
      };
    }
    return {
      total: myPlanData.costSummary.total,
      perGuest: myPlanData.costSummary.perGuest,
      breakdown: myPlanData.costSummary.lineItems.slice(-3),
    };
  }, [hasLivePlan, rawMeals]);

  const authUser = useSelector((state) => state.auth?.user);

  const [schedule, setSchedule] = useState("advance"); // "advance" | "full"
  const [method, setMethod] = useState("upi");
  const [vpa, setVpa] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);

  const [fullName, setFullName] = useState(
    authUser?.fullName || savedEventDetails?.host?.name || ""
  );
  const [mobile, setMobile] = useState(
    authUser?.mobile || savedEventDetails?.host?.phone || ""
  );
  const [email, setEmail] = useState(authUser?.email || "");
  const [gstin, setGstin] = useState("");
  const [onsiteContact, setOnsiteContact] = useState(
    formatOnsiteContact(savedEventDetails?.contacts)
  );
  const [agree, setAgree] = useState(true);

  const [paying, setPaying] = useState(false);
  const [paid, setPaid] = useState(false);

  const [secondsLeft, setSecondsLeft] = useState(HOLD_MINUTES * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const total = costSummary.total;
  const advanceAmount = Math.round(total * ADVANCE_RATE);
  const balanceAmount = total - advanceAmount;

  const fullPayDiscount = Math.round(total * FULL_PAYMENT_DISCOUNT_RATE);
  const fullPayAmount = total - fullPayDiscount;
  const fullPaySavePercent = Math.max(1, Math.round((fullPayDiscount / total) * 100));

  const balanceDueLabel = useMemo(() => {
    const eventDateObj = parseEventDate(event.date);
    if (!eventDateObj) return "before the event";
    const dueDate = new Date(eventDateObj.getTime() - 2 * 24 * 60 * 60 * 1000);
    return dueDate.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
  }, [event.date]);

  const shortTitle = event.title.replace(/wedding\s+/i, "");
  const shortDate = event.date.split(", ").slice(1).join(", ") || event.date;
  const shortVenue = event.venue.split(",").pop().trim();

  const breakdownLines = costSummary.breakdown;

  const payingNowAmount = schedule === "advance" ? advanceAmount : fullPayAmount;

  const handleVerify = () => {
    if (verifying || verified) return;
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      setVerified(true);
    }, 900);
  };

  const handlePay = () => {
    if (!agree || paying || paid) return;
    setPaying(true);

    setTimeout(() => {
      setPaying(false);
      setPaid(true);
    }, 1200);
  };

  return (
    <Box sx={{ bgcolor: "#FFF", minHeight: "100vh" }}>
      <TopBar />
      <PaymentStepper />

      <Box sx={{ bgcolor: "#fff", pt: { xs: 3, md: 3 } }}>
        <Container maxWidth="lg">
          <Typography sx={{ fontWeight: 800, fontSize: { xs: 20, md: 24 }, color: INK, fontFamily: HEADING_FONT }}>
            Confirm and pay the advance
          </Typography>
          <Typography sx={{ fontSize: 13, color: INK_SOFT, fontFamily: FONT, mt: 0.5 }}>
            Both kitchens hold your date for {HOLD_MINUTES} minutes while you pay.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 4 } }}>
        <Grid container spacing={{ xs: 3, md: 5 }}>
          {/* LEFT: schedule + method + billing */}
          <Grid item xs={12} md={7.5} lg={8}>
            <Stack spacing={3.5}>
              {/* Payment schedule */}
              <Box>
                <Typography
                  sx={{ fontSize: 11.5, fontWeight: 800, letterSpacing: 0.6, color: INK_SOFT, fontFamily: FONT, textTransform: "uppercase", mb: 1.25 }}
                >
                  Payment schedule
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <ScheduleOption
                      selected={schedule === "advance"}
                      onSelect={() => setSchedule("advance")}
                      title="25% advance"
                      amount={advanceAmount}
                      subtitle={`Balance ${currency(balanceAmount)} due by ${balanceDueLabel}`}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <ScheduleOption
                      selected={schedule === "full"}
                      onSelect={() => setSchedule("full")}
                      title="Pay in full"
                      amount={fullPayAmount}
                      subtitle={`Save ${currency(fullPayDiscount)} (${fullPaySavePercent}%)`}
                      subtitleColor={VEG_GREEN}
                    />
                  </Grid>
                </Grid>
              </Box>

              {/* Payment method */}
              <Box>
                <Typography
                  sx={{ fontSize: 11.5, fontWeight: 800, letterSpacing: 0.6, color: INK_SOFT, fontFamily: FONT, textTransform: "uppercase", mb: 1.25 }}
                >
                  Payment method
                </Typography>
                <Stack spacing={1.25}>
                  {PAYMENT_METHODS.map((m) => (
                    <PaymentMethodRow
                      key={m.key}
                      method={m}
                      selected={method === m.key}
                      onSelect={() => setMethod(m.key)}
                    >
                      {m.key === "upi" && (
                        <Stack direction="row" spacing={1}>
                          <TextField
                            fullWidth
                            size="small"
                            value={vpa}
                            onChange={(e) => {
                              setVpa(e.target.value);
                              setVerified(false);
                            }}
                            placeholder="yourname@bank"
                            sx={{ bgcolor: "#fff" }}
                          />
                          <Button
                            onClick={handleVerify}
                            disabled={verifying}
                            sx={{
                              bgcolor: verified ? VEG_GREEN : INK,
                              color: "#fff",
                              fontWeight: 700,
                              textTransform: "none",
                              borderRadius: 1.5,
                              px: 2.5,
                              flexShrink: 0,
                              fontFamily: FONT,
                              "&:hover": { bgcolor: verified ? VEG_GREEN : "#000" },
                              "&.Mui-disabled": { bgcolor: INK, color: "#fff", opacity: 0.6 },
                            }}
                          >
                            {verifying ? "Verifying..." : verified ? "Verified" : "Verify"}
                          </Button>
                        </Stack>
                      )}
                    </PaymentMethodRow>
                  ))}
                </Stack>
              </Box>

              {/* Billing & contact */}
              <Box>
                <Typography
                  sx={{ fontSize: 11.5, fontWeight: 800, letterSpacing: 0.6, color: INK_SOFT, fontFamily: FONT, textTransform: "uppercase", mb: 1.25 }}
                >
                  Billing &amp; contact
                </Typography>

                <Grid container spacing={2} sx={{ mb: 0.5 }}>
                  <Grid item xs={12} sm={6}>
                    <FieldLabel>Full name</FieldLabel>
                    <TextField
                      fullWidth
                      size="small"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Full name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FieldLabel>Mobile</FieldLabel>
                    <TextField
                      fullWidth
                      size="small"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="+91 90000 00000"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FieldLabel>Email for invoice</FieldLabel>
                    <TextField
                      fullWidth
                      size="small"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@email.com"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FieldLabel>GSTIN (optional)</FieldLabel>
                    <TextField
                      fullWidth
                      size="small"
                      value={gstin}
                      onChange={(e) => setGstin(e.target.value)}
                      placeholder="33AAAAA0000A1Z5"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FieldLabel>On-site contact during the event</FieldLabel>
                    <TextField
                      fullWidth
                      size="small"
                      value={onsiteContact}
                      onChange={(e) => setOnsiteContact(e.target.value)}
                      placeholder="Name (relation) · +91 90000 00000"
                    />
                  </Grid>
                </Grid>

                <Stack direction="row" alignItems="flex-start" spacing={1} sx={{ mt: 1.5 }}>
                  <Checkbox
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                    size="small"
                    sx={{
                      p: 0,
                      mt: 0.1,
                      color: CARD_BORDER,
                      "&.Mui-checked": { color: RED },
                    }}
                  />
                  <Typography sx={{ fontSize: 12, color: INK_SOFT, fontFamily: FONT, lineHeight: 1.5 }}>
                    I have checked the headcount, menu items and delivery address. I accept the{" "}
                    <Box component="span" sx={{ color: "#1565C0", fontWeight: 600 }}>
                      cancellation policy
                    </Box>{" "}
                    — free until 7 Sep, 50% refund until 12 Sep.
                  </Typography>
                </Stack>
              </Box>
            </Stack>
          </Grid>

          {/* RIGHT: order summary + pay */}
          <Grid item xs={12} md={4.5} lg={4}>
            <Box
              sx={{
                position: { md: "sticky" },
                top: { md: 100 },
                border: `1px solid ${CARD_BORDER}`,
                borderRadius: 2,
                p: 2.5,
                bgcolor: "#fff",
                boxShadow: "0 6px 24px rgba(27,27,35,0.06)",
              }}
            >
              <Typography sx={{ fontWeight: 800, fontSize: 15, color: INK, fontFamily: FONT }}>
                {shortTitle}
              </Typography>
              <Typography sx={{ fontSize: 11.5, fontWeight: 600, color: AMBER, fontFamily: FONT, mb: 1.75 }}>
                {shortDate} · {event.guests} guests · {shortVenue}
              </Typography>

              <Stack spacing={1.5} sx={{ mb: 2 }}>
                {meals.map((meal) => (
                  <Stack direction="row" justifyContent="space-between" key={meal.id} spacing={1.5}>
                    <Stack direction="row" spacing={1.25} sx={{ minWidth: 0 }}>
                      <Box
                        sx={{
                          width: 36,
                          height: 36,
                          borderRadius: 1,
                          bgcolor: "#EDEAE6",
                          flexShrink: 0,
                          overflow: "hidden",
                        }}
                      >
                        {meal.img && (
                          <Box component="img" src={meal.img} alt="" sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        )}
                      </Box>
                      <Box sx={{ minWidth: 0 }}>
                        <Typography sx={{ fontWeight: 700, fontSize: 13, color: INK, fontFamily: FONT }} noWrap>
                          {meal.dishTitle}
                        </Typography>
                        <Typography sx={{ fontSize: 11.5, color: INK_SOFT, fontFamily: FONT }} noWrap>
                          {meal.slotLabel} · {meal.plates} x ₹{meal.pricePerPlate}
                        </Typography>
                      </Box>
                    </Stack>
                    <Typography sx={{ fontWeight: 700, fontSize: 13, color: INK, fontFamily: FONT, flexShrink: 0 }}>
                      {currency(meal.foodTotal ?? meal.total)}
                    </Typography>
                  </Stack>
                ))}
              </Stack>

              <Divider sx={{ mb: 1.5 }} />

              <Stack spacing={0.9} sx={{ mb: 1.5 }}>
                {breakdownLines.map((line) => (
                  <Stack direction="row" justifyContent="space-between" key={line.label}>
                    <Typography sx={{ fontSize: 12.5, color: INK_SOFT, fontFamily: FONT }}>
                      {line.label}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 12.5,
                        fontWeight: 700,
                        color: line.amount < 0 ? VEG_GREEN : INK,
                        fontFamily: FONT,
                      }}
                    >
                      {currency(line.amount)}
                    </Typography>
                  </Stack>
                ))}
              </Stack>

              <Divider sx={{ mb: 1.5 }} />

              <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: 2 }}>
                <Typography sx={{ fontSize: 14, fontWeight: 700, color: INK, fontFamily: FONT }}>
                  Order total
                </Typography>
                <Typography sx={{ fontSize: 21, fontWeight: 800, color: INK, fontFamily: FONT }}>
                  {currency(total)}
                </Typography>
              </Stack>

              <Box sx={{ bgcolor: INK, borderRadius: 1, p: 2, mb: 2 }}>
                <Typography sx={{ fontSize: 10.5, fontWeight: 800, letterSpacing: 0.6, color: "rgba(255,255,255,0.6)", fontFamily: FONT, textTransform: "uppercase" }}>
                  Paying now
                </Typography>
                <Typography sx={{ fontSize: 22, fontWeight: 800, color: "#fff", fontFamily: FONT }}>
                  {currency(payingNowAmount)}
                </Typography>
                {schedule === "advance" && (
                  <Typography sx={{ fontSize: 11, color: "rgba(255,255,255,0.6)", fontFamily: FONT, mt: 0.25 }}>
                    Balance {currency(balanceAmount)} on {balanceDueLabel}
                  </Typography>
                )}
              </Box>

              <Button
                fullWidth
                variant="contained"
                onClick={handlePay}
                disabled={!agree || paying || paid}
                sx={{
                  bgcolor: paid ? VEG_GREEN : RED,
                  color: "#fff",
                  fontWeight: 800,
                  textTransform: "none",
                  borderRadius: 999,
                  py: 1.1,
                  fontFamily: FONT,
                  boxShadow: "0 4px 14px rgba(154,0,2,0.35)",
                  mb: 1,
                  "&:hover": { bgcolor: paid ? VEG_GREEN : "#7d0002" },
                  "&.Mui-disabled": { bgcolor: paid ? VEG_GREEN : "rgba(154,0,2,0.35)", color: "#fff" },
                }}
              >
                {paid
                  ? "Payment received"
                  : paying
                  ? "Processing..."
                  : `Pay ${currency(payingNowAmount)} with ${PAYMENT_METHOD_SHORT_LABEL[method]}`}
              </Button>

              <Stack direction="row" alignItems="center" spacing={0.75} sx={{ mt: 0.5 }}>
                <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: AMBER, flexShrink: 0 }} />
                <Typography sx={{ fontSize: 11, color: INK_SOFT, fontFamily: FONT }}>
                  Date held for {formatCountdown(secondsLeft)}
                </Typography>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}