import { Stack } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PickerRow, type PickerOption } from '@/components/common/picker-row';
import { Spacing } from '@/constants/theme';
import { useLockTimeoutSeconds, useSetSetting } from '@/hooks/use-settings';
import { useTheme } from '@/hooks/use-theme';
import { SETTING_KEYS } from '@/services/settings-service';
import type { LockTimeoutSeconds } from '@/types';

const OPTIONS: readonly PickerOption<LockTimeoutSeconds>[] = [
  { key: 15, label: '15 seconds' },
  { key: 30, label: '30 seconds' },
  { key: 60, label: '1 minute' },
  { key: 300, label: '5 minutes' },
  { key: -1, label: 'Never', subtitle: 'Do not auto-lock' },
];

export default function LockTimeoutScreen(): React.JSX.Element {
  const colors = useTheme();
  const insets = useSafeAreaInsets();
  const current = useLockTimeoutSeconds();
  const setSetting = useSetSetting();
  return (
    <View style={[styles.root, { backgroundColor: colors.background, paddingTop: insets.top }]}>
      <Stack.Screen options={{ title: 'Auto-lock', headerShown: true }} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <PickerRow
          options={OPTIONS}
          selectedKey={current}
          onSelect={(key) =>
            setSetting.mutate({ key: SETTING_KEYS.lockTimeoutSeconds, value: String(key) })
          }
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { padding: Spacing.three },
});
