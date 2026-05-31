import { Colors, type ColorScheme } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useThemePreference } from '@/hooks/use-settings';

export function useTheme(): ColorScheme {
  const scheme = useColorScheme();
  const preference = useThemePreference();
  const systemTheme = scheme === 'unspecified' ? 'light' : scheme;
  const effective = preference === 'system' ? systemTheme : preference;
  return Colors[effective];
}
