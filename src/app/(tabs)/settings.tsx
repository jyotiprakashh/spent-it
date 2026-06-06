import * as LocalAuthentication from 'expo-local-authentication';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ListRow } from '@/components/common/list-row';
import { SwitchRow } from '@/components/common/switch-row';
import { TabScreen } from '@/components/common/tab-screen';
import { Section } from '@/components/settings/section';
import { BottomTabInset, Fonts, Spacing } from '@/constants/theme';
import {
  useBiometricEnabled,
  useCurrency,
  useLockTimeoutSeconds,
  useSetSetting,
  useThemePreference,
} from '@/hooks/use-settings';
import { useTheme } from '@/hooks/use-theme';
import { SETTING_KEYS } from '@/services/settings-service';
import type { LockTimeoutSeconds } from '@/types';

function formatTimeout(value: LockTimeoutSeconds): string {
  if (value === -1) return 'Never';
  if (value < 60) return `${value}s`;
  if (value < 3600) return `${Math.round(value / 60)} min`;
  return `${Math.round(value / 3600)} h`;
}

function formatTheme(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default function SettingsScreen(): React.JSX.Element {
  const colors = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const currency = useCurrency();
  const theme = useThemePreference();
  const biometric = useBiometricEnabled();
  const lockTimeout = useLockTimeoutSeconds();
  const setSetting = useSetSetting();

  const handleBiometricToggle = async (next: boolean): Promise<void> => {
    if (!next) {
      const ok = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Disable biometric lock?',
        fallbackLabel: 'Use passcode',
      });
      if (!ok.success) return;
    }
    setSetting.mutate({ key: SETTING_KEYS.biometricLock, value: next ? '1' : '0' });
  };

  const bottomInset = BottomTabInset + insets.bottom;

  return (
    <TabScreen>
      <View style={[styles.header, { paddingTop: insets.top + Spacing.three }]}>
        <Text style={[styles.heading, { color: colors.text }]}>Settings</Text>
      </View>
      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: bottomInset + Spacing.six }]}
      >
        <Section title="General">
          <ListRow
            title="Currency"
            leadingIcon="cash-outline"
            trailingText={currency}
            onPress={() => router.push('/settings/currency')}
          />
          <ListRow
            title="Theme"
            leadingIcon="contrast-outline"
            trailingText={formatTheme(theme)}
            onPress={() => router.push('/settings/theme')}
          />
        </Section>

        <Section title="Security">
          <SwitchRow
            title="Biometric lock"
            leadingIcon="finger-print-outline"
            subtitle="Require Face ID or fingerprint to open"
            value={biometric}
            onValueChange={(v) => void handleBiometricToggle(v)}
          />
          <ListRow
            title="Auto-lock"
            leadingIcon="lock-closed-outline"
            trailingText={formatTimeout(lockTimeout)}
            onPress={() => router.push('/settings/lock-timeout')}
            disabled={!biometric}
          />
        </Section>

        <Section title="Manage">
          <ListRow
            title="Accounts"
            leadingIcon="wallet-outline"
            onPress={() => router.push('/settings/accounts')}
          />
          <ListRow
            title="Categories"
            leadingIcon="grid-outline"
            onPress={() => router.push('/settings/categories')}
          />
          <ListRow
            title="Budgets"
            leadingIcon="pie-chart-outline"
            onPress={() => router.push('/settings/budgets')}
          />
        </Section>

        <Section title="Data">
          <ListRow
            title="Backup"
            leadingIcon="cloud-upload-outline"
            onPress={() => router.push('/settings/backup')}
          />
          <ListRow
            title="Restore"
            leadingIcon="cloud-download-outline"
            onPress={() => router.push('/settings/restore')}
          />
        </Section>

        <Section title="About">
          <ListRow
            title="Error log"
            leadingIcon="bug-outline"
            onPress={() => router.push('/settings/error-log')}
          />
          <ListRow
            title="Version"
            leadingIcon="information-circle-outline"
            trailingText="1.0.0"
            showChevron={false}
          />
        </Section>
      </ScrollView>
    </TabScreen>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: {
    paddingHorizontal: Spacing.three,
    paddingBottom: Spacing.two,
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    fontFamily: Fonts.bold,
  },
  scroll: {
    gap: Spacing.three,
  },
});
