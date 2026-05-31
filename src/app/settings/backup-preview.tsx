import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Card } from '@/components/common/card';
import { confirm } from '@/components/common/confirm-dialog';
import { LoadingOverlay } from '@/components/common/loading-overlay';
import { SectionTitle } from '@/components/common/section-title';
import { Spacing } from '@/constants/theme';
import { useImportJSON } from '@/hooks/use-import';
import { useTheme } from '@/hooks/use-theme';
import * as FileSystem from 'expo-file-system/legacy';
import type { ExportPayload } from '@/types';

interface PreviewStats {
  accounts: number;
  categories: number;
  transactions: number;
  budgets: number;
  exportedAt: string;
  rangeStart: string | null;
  rangeEnd: string | null;
}

function readStats(json: string): PreviewStats | null {
  try {
    const parsed = JSON.parse(json) as ExportPayload;
    const dates = parsed.transactions.map((t) => t.date).sort();
    return {
      accounts: parsed.accounts.length,
      categories: parsed.categories.length,
      transactions: parsed.transactions.length,
      budgets: parsed.budgets.length,
      exportedAt: parsed.meta.exported_at,
      rangeStart: dates[0] ?? null,
      rangeEnd: dates[dates.length - 1] ?? null,
    };
  } catch {
    return null;
  }
}

export default function BackupPreviewScreen(): React.JSX.Element {
  const colors = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams<{ uri?: string; name?: string; format?: string }>();
  const importMut = useImportJSON();

  const [stats, setStats] = useState<PreviewStats | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      if (typeof params.uri !== 'string') {
        setError('Missing file');
        return;
      }
      try {
        const text = await FileSystem.readAsStringAsync(params.uri, {
          encoding: FileSystem.EncodingType.UTF8,
        });
        if (cancelled) return;
        const s = readStats(text);
        if (s === null) setError('File is not a valid backup');
        else setStats(s);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Could not read file');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [params.uri]);

  const handleRestore = async (): Promise<void> => {
    if (typeof params.uri !== 'string') return;
    const ok = await confirm({
      title: 'Replace all data?',
      message: 'This overwrites everything on this device. There is no undo.',
      confirmLabel: 'Restore',
      destructive: true,
    });
    if (!ok) return;
    importMut.mutate(
      { uri: params.uri },
      {
        onSuccess: () =>
          Alert.alert('Restore complete', 'Your data has been replaced.', [
            { text: 'OK', onPress: () => router.replace('/(tabs)') },
          ]),
        onError: (err) => Alert.alert('Restore failed', err.message),
      },
    );
  };

  return (
    <View style={[styles.root, { backgroundColor: colors.background, paddingTop: insets.top }]}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={[styles.title, { color: colors.text }]}>{params.name ?? 'Backup'}</Text>

        {error !== null && (
          <Card>
            <Text style={[styles.error, { color: colors.expense }]}>{error}</Text>
          </Card>
        )}

        {stats !== null && (
          <Card>
            <SectionTitle>Summary</SectionTitle>
            <Row label="Accounts" value={String(stats.accounts)} colors={colors} />
            <Row label="Categories" value={String(stats.categories)} colors={colors} />
            <Row label="Transactions" value={String(stats.transactions)} colors={colors} />
            <Row label="Budgets" value={String(stats.budgets)} colors={colors} />
            <Row label="Exported" value={stats.exportedAt.slice(0, 10)} colors={colors} />
            {stats.rangeStart !== null && stats.rangeEnd !== null && (
              <Row
                label="Date range"
                value={`${stats.rangeStart} → ${stats.rangeEnd}`}
                colors={colors}
              />
            )}
          </Card>
        )}

        {stats !== null && (
          <TouchableOpacity
            onPress={() => void handleRestore()}
            accessibilityRole="button"
            accessibilityLabel="Restore backup"
            activeOpacity={0.85}
            style={[styles.btn, { backgroundColor: colors.expense }]}
          >
            <Text style={[styles.btnText, { color: colors.background }]}>
              Restore (overwrites all data)
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={() => router.back()}
          accessibilityRole="button"
          activeOpacity={0.85}
          style={[styles.btn, { backgroundColor: colors.backgroundElement }]}
        >
          <Text style={[styles.btnText, { color: colors.text }]}>Cancel</Text>
        </TouchableOpacity>
      </ScrollView>
      <LoadingOverlay visible={importMut.isPending} label="Restoring..." />
    </View>
  );
}

function Row({
  label,
  value,
  colors,
}: {
  label: string;
  value: string;
  colors: { text: string; textSecondary: string };
}): React.JSX.Element {
  return (
    <View style={styles.row}>
      <Text style={[styles.rowLabel, { color: colors.textSecondary }]}>{label}</Text>
      <Text style={[styles.rowValue, { color: colors.text }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { padding: Spacing.three, gap: Spacing.three },
  title: { fontSize: 18, fontWeight: '700' },
  error: { fontSize: 14, fontWeight: '600' },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  rowLabel: { fontSize: 13 },
  rowValue: { fontSize: 14, fontWeight: '600' },
  btn: {
    paddingVertical: Spacing.three,
    borderRadius: 14,
    alignItems: 'center',
  },
  btnText: { fontSize: 15, fontWeight: '700' },
});
