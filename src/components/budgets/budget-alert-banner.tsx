import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Fonts, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useAlertStore } from '@/stores/alert-store';

const AUTO_DISMISS_MS = 4000;

export function BudgetAlertBanner(): React.JSX.Element | null {
  const colors = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const queue = useAlertStore((s) => s.queue);
  const dismiss = useAlertStore((s) => s.dismiss);
  const current = queue[0];

  useEffect(() => {
    if (current === undefined) return;
    const timer = setTimeout(() => dismiss(current.id), AUTO_DISMISS_MS);
    return () => clearTimeout(timer);
  }, [current, dismiss]);

  if (current === undefined) return null;

  const isExceeded = current.level === 'EXCEEDED';
  const accent = isExceeded ? colors.expense : colors.warning;

  return (
    <Animated.View
      entering={FadeInDown.duration(180)}
      exiting={FadeOutUp.duration(160)}
      style={[styles.wrap, { top: insets.top + Spacing.two }]}
      pointerEvents="box-none"
    >
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel={`${current.category_name} budget ${isExceeded ? 'exceeded' : 'warning'}`}
        activeOpacity={0.85}
        onPress={() => {
          dismiss(current.id);
          router.push('/settings/budgets');
        }}
        style={[styles.banner, { backgroundColor: accent + 'EE', shadowColor: '#000' }]}
      >
        <Ionicons name={isExceeded ? 'alert-circle' : 'warning'} size={20} color="#FFFFFF" />
        <View style={styles.body}>
          <Text style={styles.title} numberOfLines={1}>
            {current.category_name} — {Math.round(current.pct * 100)}% used
          </Text>
          <Text style={styles.subtitle} numberOfLines={1}>
            {isExceeded ? 'Over budget' : 'Approaching budget limit'}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => dismiss(current.id)}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel="Dismiss"
        >
          <Ionicons name="close" size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    paddingHorizontal: Spacing.three,
    zIndex: 1000,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: 14,
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 6,
  },
  body: {
    flex: 1,
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
    fontFamily: Fonts.bold,
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 11,
    fontWeight: '500',
    fontFamily: Fonts.medium,
    color: '#FFFFFFCC',
  },
});
