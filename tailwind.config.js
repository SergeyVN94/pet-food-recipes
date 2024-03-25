const palette = {
  primary: {
    0: '#000000',
    10: '#21005D',
    20: '#381E72',
    30: '#4F378B',
    40: '#6750A4',
    50: '#7F67BE',
    60: '#9A82DB',
    70: '#B69DF8',
    80: '#D0BCFF',
    90: '#EADDFF',
    95: '#F6EDFF',
    99: '#FFFBFE',
    100: '#FFFFFF',
  },
  secondary: {
    0: '#000000',
    10: '#1D192B',
    20: '#332D41',
    30: '#4A4458',
    40: '#625B71',
    50: '#7A7289',
    60: '#958DA5',
    70: '#B0A7C0',
    80: '#CCC2DC',
    90: '#E8DEF8',
    95: '#F6EDFF',
    99: '#FFFBFE',
    100: '#FFFFFF',
  },
  tertiary: {
    0: '#000000',
    10: '#31111D',
    20: '#492532',
    30: '#633B48',
    40: '#7D5260',
    50: '#986977',
    60: '#B58392',
    70: '#D29DAC',
    80: '#EFB8C8',
    90: '#FFD8E4',
    95: '#FFECF1',
    99: '#FFFBFA',
    100: '#FFFFFF',
  },
  error: {
    0: '#000000',
    10: '#410E0B',
    20: '#601410',
    30: '#8C1D18',
    40: '#B3261E',
    50: '#DC362E',
    60: '#E46962',
    70: '#EC928E',
    80: '#F2B8B5',
    90: '#F9DEDC',
    95: '#FCEEEE',
    99: '#FFFBF9',
    100: '#FFFFFF',
  },
  neutral: {
    0: '#000000',
    10: '#1D1B20',
    20: '#48464C',
    30: '#48464C',
    40: '#605D64',
    50: '#79767D',
    60: '#938F96',
    70: '#AEA9B1',
    80: '#CAC5CD',
    90: '#E6E0E9',
    92: '#ECE6F0',
    95: '#F5EFF7',
    96: '#F7F2FA',
    99: '#FFFBFE',
    100: '#FFFFFF',
  },
  'neutral-variant': {
    0: '#000000',
    10: '#1D1A22',
    20: '#322F37',
    30: '#49454F',
    40: '#605D66',
    50: '#79747E',
    60: '#938F99',
    70: '#AEA9B4',
    80: '#CAC4D0',
    90: '#E7E0EC',
    95: '#F5EEFA',
    99: '#FFFBFE',
    100: '#FFFFFF',
  },
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '24px',
    },
    fontFamily: {
      sans: ['var(--font-roboto)', 'sans-serif'],
    },
    extend: {
      colors: {
        palette,

        primary: palette.primary[40],
        secondary: palette.secondary[40],
        tertiary: palette.tertiary[40],
        error: palette.error[40],
        'on-primary': palette.primary[100],
        'on-secondary': palette.secondary[100],
        'on-tertiary': palette.tertiary[100],
        'on-error': palette.error[100],

        'primary-container': palette.primary[90],
        'secondary-container': palette.secondary[90],
        'tertiary-container': palette.tertiary[90],
        'error-container': palette.error[90],
        'on-primary-container': palette.primary[10],
        'on-secondary-container': palette.secondary[10],
        'on-tertiary-container': palette.tertiary[10],
        'on-error-container': palette.error[10],

        'primary-fixed': palette.primary[90],
        'secondary-fixed': palette.secondary[90],
        'tertiary-fixed': palette.tertiary[90],
        'tertiary-fixed-dim': palette.tertiary[80],
        'primary-fixed-dim': palette.primary[80],
        'secondary-fixed-dim': palette.secondary[80],
        'on-primary-fixed': palette.primary[10],
        'on-secondary-fixed': palette.secondary[10],
        'on-tertiary-fixed': palette.tertiary[10],
        'on-primary-fixed-variant': palette.primary[30],
        'on-secondary-fixed-variant': palette.secondary[30],
        'on-tertiary-fixed-variant': palette.tertiary[30],

        'surface-dim': palette.neutral[90],
        surface: palette.neutral[99],
        'surface-bright': palette.neutral[99],

        'surf-cont-lowest': palette.neutral[100],
        'surf-cont-low': palette.neutral[96],
        'surf-cont': palette.neutral[95],
        'surf-cont-high': palette.neutral[92],
        'surf-cont-highest': palette.neutral[90],

        'on-surface': palette.neutral[10],
        'on-surface-var': palette.neutral[30],
        outline: palette['neutral-variant'][50],
        'outline-variant': palette['neutral-variant'][80],

        'inverse-surface': palette.neutral[20],
        'inverse-on-surface': palette.neutral[95],
        'inverse-primary': palette.primary[80],

        scrim: palette.neutral[0],
        shadow: palette.neutral[0],
      },
      boxShadow: {
        'elevation-1': '0px 1px 3px 1px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.30)',
        'elevation-2': '0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.30)',
        'elevation-3': '0px 1px 3px 0px rgba(0, 0, 0, 0.30), 0px 4px 8px 3px rgba(0, 0, 0, 0.15)',
        'elevation-4': '0px 2px 3px 0px rgba(0, 0, 0, 0.30), 0px 6px 10px 4px rgba(0, 0, 0, 0.15)',
        'elevation-5': '0px 4px 4px 0px rgba(0, 0, 0, 0.30), 0px 8px 12px 6px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    /** @type {import('tailwindcss/types/config').PluginCreator} */
    ({ addComponents }) => {
      addComponents({
        '.display-l': {
          '@apply font-sans text-black text-6xl font-normal leading-10': {},
        },

        '.display-m': {
          '@apply font-sans text-black text-5xl font-normal leading-10': {},
        },

        '.display-s': {
          '@apply font-sans text-black text-4xl font-normal leading-10': {},
        },

        '.headline-l': {
          '@apply font-sans text-black text-3xl font-normal leading-10': {},
        },

        '.headline-m': {
          '@apply font-sans text-black text-2xl font-normal leading-9': {},
        },

        '.headline-s': {
          '@apply font-sans text-black text-2xl font-normal leading-loose': {},
        },

        '.title-l': {
          '@apply font-sans text-black text-xl font-normal leading-7': {},
        },

        '.title-m': {
          '@apply font-sans text-black text-base font-normal leading-normal tracking-tight': {},
        },

        '.title-s': {
          '@apply font-sans text-black text-sm font-medium leading-tight tracking-tight': {},
        },

        '.label-l': {
          '@apply font-sans text-black text-sm font-medium leading-tight tracking-tight': {},
        },

        '.label-m': {
          '@apply font-sans text-black text-xs font-medium leading-none tracking-wide': {},
        },

        '.label-s': {
          '@apply font-sans text-black font-medium leading-none tracking-wide text-xs': {},
        },

        '.body-l': {
          '@apply font-sans text-black text-base font-normal leading-normal tracking-wide': {},
        },

        '.body-m': {
          '@apply font-sans text-black text-sm font-normal leading-tight tracking-tight': {},
        },

        '.body-s': {
          '@apply font-sans text-black text-xs font-normal leading-none': {},
        },

        '.elevation-1': {
          '@apply bg-violet-50 rounded-2xl shadow': {},
        },

        '.elevation-2': {
          '@apply bg-gray-100 rounded-2xl shadow': {},
        },

        '.elevation-3': {
          '@apply bg-gray-200 rounded-2xl shadow': {},
        },

        '.elevation-4': {
          '@apply bg-zinc-200 rounded-2xl shadow': {},
        },

        '.skeleton': {
          display: 'block',
          width: '100%',
          background: 'linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%)',
          'background-size': '200% 100%',
          'border-radius': '5px',
          animation: '1.3s shine linear infinite',
        },
      });
    },
  ],
};
