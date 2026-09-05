import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";

import myEventsData from "../../data/myEventsData";
import { INK, INK_SOFT, FONT, HEADING_FONT } from "../../utils/constants";

import ProfileHeader from "./MyEventFolder/ProfileHeader";
import StatsRow from "./MyEventFolder/StatsRow";
import AccountSidebarNav from "./MyEventFolder/AccountSidebarNav";
import ExecutiveMiniCard from "./MyEventFolder/ExecutiveMiniCard";
import EventCard from "./MyEventFolder/EventCard";
import SavedMenusSection from "./MyEventFolder/SavedMenusSection";

export default function MyEvents() {
  const navigate = useNavigate();
  const { profile, stats, sidebarNav, executive, upcomingEvents, savedMenus, savedMenusCount } = myEventsData;

  const hasUpcoming = upcomingEvents && upcomingEvents.length > 0;

  const [activeSidebarId, setActiveSidebarId] = useState(
    sidebarNav.find((item) => item.active)?.id || sidebarNav[0]?.id
  );

  const handleSidebarSelect = (item) => {
    setActiveSidebarId(item.id);
  };

  const handleEventAction = (action) => {
    // TODO: wire each action (pay balance / track order / view shortlist, etc.)
    // to its real flow once the corresponding pages/APIs are ready.
    if (action.id === "pay-balance") {
      navigate("/payment");
    }
  };

  return (
    <Box sx={{ bgcolor: "#fff", minHeight: "100vh" }}>
      <ProfileHeader
        profile={profile}
        onEditProfile={() => {}}
        onPlanNewEvent={() => navigate("/Menu")}
      />

      <Container
        maxWidth="lg"
        sx={{
          pt: { xs: 2, md: 2.5 },
          pb: { xs: 4, md: 6 },
          "@media (min-width:1400px)": { maxWidth: "1400px" },
        }}
      >
        <Grid container spacing={{ xs: 2, md: 2.5 }}>
          {/* LEFT: account sidebar nav + executive contact */}
          <Grid item xs={12} md={3.5} lg={3}>
            <Stack spacing={1.5}>
              <AccountSidebarNav items={sidebarNav} activeId={activeSidebarId} onSelect={handleSidebarSelect} />
              <ExecutiveMiniCard executive={executive} onChat={() => {}} />
            </Stack>
          </Grid>

          {/* RIGHT: stats, upcoming events, saved menus */}
          <Grid item xs={12} md={8.5} lg={9}>
            <Stack spacing={{ xs: 2.5, md: 3 }}>
              <StatsRow stats={stats} />

              <Box>
                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1.5 }}>
                  <Typography sx={{ fontWeight: 800, fontSize: { xs: 16, sm: 18 }, color: INK, fontFamily: HEADING_FONT }}>
                    Upcoming
                  </Typography>
                  <Typography
                    sx={{ fontSize: 13, fontWeight: 700, color: "#9a0002", fontFamily: FONT, cursor: "pointer" }}
                  >
                    Archived events
                  </Typography>
                </Stack>

                {hasUpcoming ? (
                  <Stack spacing={2}>
                    {upcomingEvents.map((event) => (
                      <EventCard key={event.id} event={event} onAction={handleEventAction} />
                    ))}
                  </Stack>
                ) : (
                  <Box
                    sx={{
                      border: "1.5px dashed rgba(43,33,28,0.2)",
                      borderRadius: "14px",
                      p: { xs: 3, md: 4 },
                      textAlign: "center",
                      bgcolor: "#fff",
                    }}
                  >
                    <Typography sx={{ fontWeight: 800, fontSize: 15, color: INK, fontFamily: FONT, mb: 0.5 }}>
                      No upcoming events yet
                    </Typography>
                    <Typography sx={{ fontSize: 13, color: INK_SOFT, fontFamily: FONT }}>
                      Plan an event to see it show up here.
                    </Typography>
                  </Box>
                )}
              </Box>

              <SavedMenusSection
                menus={savedMenus}
                savedMenusCount={savedMenusCount}
                onSeeAll={() => {}}
                onSelectMenu={() => {}}
              />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
