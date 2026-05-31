import { Stack } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PickerRow, type PickerOption } from '@/components/common/picker-row';
import { Spacing } from '@/constants/theme';
import { useSetSetting, useThemePreference } from '@/hooks/use-settings';
import { useTheme } from '@/hooks/use-theme';
import { SETTING_KEYS } from '@/services/settings-service';
import type { ThemePreference } from '@/types';

const OPTIONS: readonly PickerOption<ThemePreference>[] = [
  { key: 'system', label: 'System', subtitle: 'Follow device appearance' },
  { key: 'light', label: 'Light' },
  { key: 'dark', label: 'Dark' },
];

export default function ThemePickerScreen(): React.JSX.Element {
  const colors = useTheme();
  const insets = useSafeAreaInsets();
  const current = useThemePreference();
  const setSetting = useSetSetting();
  return (
    <View style={[styles.root, { backgroundColor: colors.background, paddingTop: insets.top }]}>
      <Stack.Screen options={{ title: 'Theme', headerShown: true }} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <PickerRow
          options={OPTIONS}
          selectedKey={current}
          onSelect={(key) => setSetting.mutate({ key: SETTING_KEYS.theme, value: key })}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { padding: Spacing.three },
});
