/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#0C0C0C',
    background: '#FFFFFF',
    backgroundElement: '#F4F4F4',
    backgroundSelected: '#E8FBF5',
    textSecondary: '#6B6B6B',

    primary: '#00D09C',
    primarySubtle: '#E0FAF3',

    accent: '#444441',
    accentSubtle: '#F1EFE8',

    surface: '#FFFFFF',
    border: '#EBEBEB',

    income: '#00D09C',
    expense: '#F45B69',
    warning: '#F5A623',
    error: '#F45B69',
  },
  dark: {
    text: '#EFEFEF',
    background: '#0C0C0C',
    backgroundElement: '#181818',
    backgroundSelected: '#0D2A22',
    textSecondary: '#8A8A8A',

    primary: '#00D09C',
    primarySubtle: '#0A2219',

    accent: '#B4B2A9',
    accentSubtle: '#1C1C1A',

    surface: '#111111',
    border: '#242424',

    income: '#00D09C',
    expense: '#F45B69',
    warning: '#F5A623',
    error: '#F45B69',
  },
} as const;

export type ColorScheme = typeof Colors.light & typeof Colors.dark;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
