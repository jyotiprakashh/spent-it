import { Ionicons } from '@expo/vector-icons';
import { useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { addMonths, currentYearMonth, formatYearMonth, isFutureMonth } from '@/utils/date';

const DOUBLE_TAP_MS = 300;

export type MonthSelectorProps = {
  value: string;
  onChange: (yearMonth: string) => void;
};

export function MonthSelector({ value, onChange }: MonthSelectorProps): React.JSX.Element {
  const colors = useTheme();
  const lastTap = useRef<number>(0);

  const nextDisabled = isFutureMonth(addMonths(value, 1));

  const handleLabelPress = (): void => {
    const now = Date.now();
    if (now - lastTap.current < DOUBLE_TAP_MS) {
      onChange(currentYearMonth());
      lastTap.current = 0;
    } else {
      lastTap.current = now;
    }
  };

  return (
    <View style={[styles.row, { backgroundColor: colors.background }]}>
      <TouchableOpacity
        onPress={() => onChange(addMonths(value, -1))}
        accessibilityRole="button"
        accessibilityLabel="Previous month"
        hitSlop={12}
        style={styles.arrow}
      >
        <Ionicons name="chevron-back" size={22} color={colors.text} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleLabelPress}
        accessibilityRole="button"
        accessibilityLabel={`${formatYearMonth(value)}, double tap to reset to current month`}
        activeOpacity={0.7}
      >
        <Text style={[styles.label, { color: colors.text }]}>{formatYearMonth(value)}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => !nextDisabled && onChange(addMonths(value, 1))}
        disabled={nextDisabled}
        accessibilityRole="button"
        accessibilityLabel="Next month"
        accessibilityState={{ disabled: nextDisabled }}
        hitSlop={12}
        style={styles.arrow}
      >
        <Ionicons
          name="chevron-forward"
          size={22}
          color={nextDisabled ? colors.textSecondary : colors.text}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    gap: Spacing.four,
  },
  arrow: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: -0.2,
    minWidth: 130,
    textAlign: 'center',
  },
});
