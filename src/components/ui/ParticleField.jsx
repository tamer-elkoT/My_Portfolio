import { useState, useMemo } from 'react';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { useTheme } from '../../context/ThemeContext';

const ParticleField = () => {
  const [init, setInit] = useState(false);
  const { theme } = useTheme();

  const particlesInit = async (engine) => {
    // this loads the slim version of tsparticles
    await loadSlim(engine);
  };

  const particlesLoaded = (container) => {
    setInit(true);
  };

  const options = useMemo(
    () => ({
      background: {
        color: {
          value: 'transparent',
        },
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: 'push',
          },
          onHover: {
            enable: true,
            mode: 'grab',
          },
        },
        modes: {
          push: {
            quantity: 3,
          },
          grab: {
            distance: 140,
            links: {
              opacity: 0.5,
            },
          },
        },
      },
      particles: {
        color: {
          value: theme === 'dark' ? '#00f2fe' : '#006a70',
        },
        links: {
          color: theme === 'dark' ? '#00f5a0' : '#00815a',
          distance: 150,
          enable: true,
          opacity: 0.2,
          width: 1,
        },
        move: {
          direction: 'none',
          enable: true,
          outModes: {
            default: 'bounce',
          },
          random: false,
          speed: 1,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: window.innerWidth < 768 ? 40 : 80,
        },
        opacity: {
          value: 0.3,
        },
        shape: {
          type: 'circle',
        },
        size: {
          value: { min: 1, max: 3 },
        },
      },
      detectRetina: true,
    }),
    [theme]
  );

  return (
    <div className={`particle-field-wrapper ${init ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={options}
        className="absolute inset-0 z-0 pointer-events-auto"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
      />
    </div>
  );
};

export default ParticleField;
