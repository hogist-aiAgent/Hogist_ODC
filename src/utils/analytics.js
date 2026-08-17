import ReactGA from "react-ga4";

// Initialize (call this once in App.jsx)
export const initGA = () => {
  ReactGA.initialize("G-K2PK7H2JNF");
};

// Track page views
export const trackPageView = (page) => {
  ReactGA.send({
    hitType: "pageview",
    page,
  });
};

// Track events (REUSABLE)
export const trackEvent = ({ category, action, label, value }) => {
  ReactGA.event({
    category,
    action,
    label,
    value,
  });
};