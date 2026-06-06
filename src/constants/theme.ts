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

type WidenStrings<T> = { -readonly [K in keyof T]: T[K] extends string ? string : T[K] };
export type ColorScheme = WidenStrings<typeof Colors.light>;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = {
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semibold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
  mono: Platform.select({ ios: 'ui-monospace', default: 'monospace' }) ?? 'monospace',
} as const;

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = 56;
export const MaxContentWidth = 800;
