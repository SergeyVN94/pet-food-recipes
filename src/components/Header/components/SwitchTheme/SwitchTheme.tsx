'use client';

import React from 'react';

import { cn } from '@/utils';

type SwitchThemeProps = {
  className?: string;
};

const SwitchTheme = ({ className }: SwitchThemeProps) => {
  const [isDark, setIsDark] = React.useState(() => {
    // Check for saved preference or system preference
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');

      return savedTheme ? savedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    return 'light';
  });

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  React.useEffect(() => {
    // Apply the theme class to the document
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <button
      type="button"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={toggleTheme}
      className={cn(
        'relative inline-flex h-6 w-11 items-center rounded-full bg-surface-variant transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:bg-surface-variant-dark border border-primary',
        className,
      )}
    >
      <span className="sr-only">Переключить тему</span>
      <span
        className={`inline-block size-5 transform rounded-full bg-primary shadow-md transition-transform ${
          isDark ? 'translate-x-[20px]' : 'translate-x-[0.125rem]'
        }`}
      >
        {/* Icons for sun and moon */}
        <span
          className={cn('absolute inset-0 flex items-center justify-center transition-opacity', isDark ? 'opacity-0' : 'opacity-100')}
          aria-hidden="true"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-on-primary" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clipRule="evenodd"
            />
          </svg>
        </span>
        <span
          className={cn('absolute inset-0 flex items-center justify-center transition-opacity', isDark ? 'opacity-100' : 'opacity-0')}
          aria-hidden="true"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-on-primary" viewBox="0 0 20 20" fill="currentColor">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        </span>
      </span>
    </button>
  );
};

export default SwitchTheme;
