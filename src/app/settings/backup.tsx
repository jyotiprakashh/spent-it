import { Stack, useRouter } from 'expo-router';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Card } from '@/components/common/card';
import { ListRow } from '@/components/common/list-row';
import { LoadingOverlay } from '@/components/common/loading-overlay';
import { SectionTitle } from '@/components/common/section-title';
import { Spacing } from '@/constants/theme';
import { useExportCsvZip, useExportJSON } from '@/hooks/use-export';
import { useSetting } from '@/hooks/use-settings';
import { useTheme } from '@/hooks/use-theme';
import { SETTING_KEYS } from '@/services/settings-service';

function formatLastBackup(value: string | null | undefined): string {
  if (value === null || value === undefined || value === '') return 'No backup yet';
  const date = new Date(value);
  if (!Number.isFinite(date.getTime())) return 'No backup yet';
  const ageMs = Date.now() - date.getTime();
  const days = Math.floor(ageMs / 86_400_000);
  if (days <= 0) return 'Today';
  if (days === 1) return 'Yesterday';
  return `${days} days ago`;
}

export default function BackupScreen(): React.JSX.Element {
  const colors = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const lastBackup = useSetting(SETTING_KEYS.lastBackup);

  const exportJson = useExportJSON();
  const exportCsv = useExportCsvZip();
  const busy = exportJson.isPending || exportCsv.isPending;

  const onError = (err: Error): void => Alert.alert('Export failed', err.message);

  return (
    <View style={[styles.root, { backgroundColor: colors.background, paddingTop: insets.top }]}>
      <Stack.Screen options={{ title: 'Backup', headerShown: true }} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Card>
          <SectionTitle>Last backup</SectionTitle>
          <Text style={[styles.lastValue, { color: colors.text }]}>
            {formatLastBackup(lastBackup.data)}
          </Text>
        </Card>

        <Card padded={false}>
          <ListRow
            title="Encrypted backup"
            subtitle=".spentit — protected with a passphrase"
            leadingIcon="lock-closed-outline"
            onPress={() =>
              router.push({ pathname: '/backup-passphrase', params: { intent: 'export' } })
            }
          />
          <ListRow
            title="Plain JSON"
            subtitle=".json — readable in any text editor"
            leadingIcon="document-text-outline"
            onPress={() => exportJson.mutate(undefined, { onError })}
          />
          <ListRow
            title="CSV bundle"
            subtitle=".zip — transactions + accounts + categories"
            leadingIcon="grid-outline"
            onPress={() => exportCsv.mutate(undefined, { onError })}
          />
        </Card>

        <Card>
          <SectionTitle>Restore</SectionTitle>
          <ListRow
            title="Restore from file"
            subtitle="Replaces all current data"
            leadingIcon="cloud-download-outline"
            onPress={() => router.push('/settings/restore')}
          />
        </Card>
      </ScrollView>

      <LoadingOverlay visible={busy} label="Preparing backup..." />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { padding: Spacing.three, gap: Spacing.three },
  lastValue: {
    fontSize: 20,
    fontWeight: '700',
  },
});
