import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Fonts, Spacing } from '@/constants/theme';
import { useBackupReminder, useBannerDismiss } from '@/hooks/use-backup-reminder';
import { useTheme } from '@/hooks/use-theme';

const ONE_HOUR_MS = 60 * 60 * 1000;

export function BackupReminderBanner(): React.JSX.Element | null {
  const colors = useTheme();
  const router = useRouter();
  const query = useBackupReminder();
  const { dismissedAt, dismiss } = useBannerDismiss();
  const [now, setNow] = useState(() => Date.now());

  // Re-tick once a minute so the "dismissed" suppression window expires
  // without forcing the user to navigate away and back.
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(id);
  }, []);

  if (query.data !== true) return null;
  if (dismissedAt !== null && now - dismissedAt < ONE_HOUR_MS) return null;

  return (
    <TouchableOpacity
      onPress={() => router.push('/settings/backup')}
      activeOpacity={0.85}
      accessibilityRole="button"
      accessibilityLabel="Backup reminder"
      style={[
        styles.row,
        { backgroundColor: colors.warning + '22', borderColor: colors.warning + '44' },
      ]}
    >
      <Ionicons name="cloud-upload-outline" size={18} color={colors.warning} />
      <View style={styles.body}>
        <Text style={[styles.title, { color: colors.text }]}>It&apos;s been a while</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Back up your data to stay safe
        </Text>
      </View>
      <TouchableOpacity
        onPress={dismiss}
        hitSlop={10}
        accessibilityRole="button"
        accessibilityLabel="Dismiss reminder"
      >
        <Ionicons name="close" size={16} color={colors.textSecondary} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    marginHorizontal: Spacing.three,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: 12,
    borderWidth: 1,
  },
  body: {
    flex: 1,
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
    fontFamily: Fonts.bold,
  },
  subtitle: {
    fontSize: 11,
    fontWeight: '500',
    fontFamily: Fonts.medium,
  },
});
