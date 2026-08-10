import { useEffect, useState } from 'react';
import { Box } from '@mui/material';


export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const finish = () => {
      // Start fade-out, then unmount after the transition completes.
      setFadeOut(true);
      setTimeout(() => {
        setLoading(false);
        document.body.style.overflow = '';
      }, 500);
    };

    if (document.readyState === 'complete') {
      // Give the animation a brief moment to actually be seen.
      const t = setTimeout(finish, 900);
      return () => {
        clearTimeout(t);
        document.body.style.overflow = '';
      };
    }

    window.addEventListener('load', finish);
    return () => {
      window.removeEventListener('load', finish);
      document.body.style.overflow = '';
    };
  }, []);

  if (!loading) return null;

  return (
    <Box
      role="status"
      aria-label="Loading"
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        margin: 0,
        zIndex: 2000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
        bgcolor: '#ffffff',
        opacity: fadeOut ? 0 : 1,
        visibility: fadeOut ? 'hidden' : 'visible',
        transition: 'opacity 0.5s ease, visibility 0.5s ease',
      }}
    >
      <style>
        {`
          @keyframes hogistClocheFloat {
            0%, 100% { transform: translateY(0); }
            50%      { transform: translateY(-6px); }
          }
          @keyframes hogistSteamRise {
            /* stroke-dashoffset 100 -> 0 draws the wavy strand upward
               from the knob (bottom grows first); 0 -> -100 then erases
               it from that same bottom end while the tip keeps rising,
               so the visible strand shortens from below as it floats up. */
            0%   { stroke-dashoffset: 100; transform: translateY(2px); }
            50%  { stroke-dashoffset: 0;   transform: translateY(-14px); }
            100% { stroke-dashoffset: -100; transform: translateY(-30px); }
          }
        `}
      </style>

      <Box
        component="svg"
        viewBox="0 0 260 210"
        sx={{
          width: { xs: 75, sm: 92, md: 100, lg: 120 },
          height: 'auto',
        }}
      >
        {/* Tray — stays put, doesn't move */}
        <rect x="40" y="168" width="180" height="14" rx="7" fill="#1A1A2E" />

        {/* Cloche + knob + steam — this group floats */}
        <g style={{ animation: 'hogistClocheFloat 2.2s ease-in-out infinite' }}>
          {/* Dome */}
          <path d="M52,160 A78,78 0 0 1 208,160 Z" fill="#9a0002" />

          {/* Knob + stem */}
          <rect x="127" y="74" width="6" height="10" rx="3" fill="#1A1A2E" />
          <circle cx="130" cy="72" r="7" fill="#1A1A2E" />

          <g transform="translate(112,68) rotate(-6)">
            <path
              d="M0,0 C8,-6 -8,-14 0,-22 C8,-29 -8,-37 0,-45 C6,-51 -6,-57 0,-64"
              pathLength="100"
              fill="none"
              stroke="#1A1A2E"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="100 100"
              style={{
                transformBox: 'fill-box',
                transformOrigin: 'center',
                animation: 'hogistSteamRise 1.8s ease-in-out infinite',
              }}
            />
          </g>


          <g transform="translate(148,68) rotate(6) scale(-1,1)">
            <path
              d="M0,0 C8,-6 -8,-14 0,-22 C8,-29 -8,-37 0,-45 C6,-51 -6,-57 0,-64"
              pathLength="100"
              fill="none"
              stroke="#1A1A2E"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="100 100"
              opacity="0.85"
              style={{
                transformBox: 'fill-box',
                transformOrigin: 'center',
                animation: 'hogistSteamRise 1.8s ease-in-out infinite 0.9s',
              }}
            />
          </g>
        </g>
      </Box>
    </Box>
  );
}