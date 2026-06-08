import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Fonts, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { formatRelativeDate } from '@/utils/format';

export type DateRowProps = {
  value: string;
  onChange: (ymd: string) => void;
  onCenterPress?: () => void;
};

function toYmd(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function fromYmd(ymd: string): Date {
  const [y, m, d] = ymd.split('-').map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}

function addDays(d: Date, days: number): Date {
  const r = new Date(d);
  r.setDate(r.getDate() + days);
  return r;
}

export function DateRow({ value, onChange, onCenterPress }: DateRowProps): React.JSX.Element {
  const colors = useTheme();
  const [open, setOpen] = useState(false);

  const handleValueChange = (_event: unknown, selected: Date): void => {
    onChange(toYmd(selected));
    if (Platform.OS !== 'ios') setOpen(false);
  };

  const handleCenterPress = (): void => {
    if (onCenterPress) {
      onCenterPress();
    } else {
      setOpen((p) => !p);
    }
  };

  return (
    <View>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => onChange(toYmd(addDays(fromYmd(value), -1)))}
          hitSlop={12}
          style={styles.arrow}
          accessibilityRole="button"
          accessibilityLabel="Previous day"
        >
          <Ionicons name="chevron-back" size={20} color={colors.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleCenterPress}
          style={styles.center}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel={`Date ${formatRelativeDate(value)}, tap to ${onCenterPress ? 'toggle calendar' : 'open picker'}`}
        >
          <Ionicons name="calendar-outline" size={15} color={colors.textSecondary} />
          <Text style={[styles.value, { color: colors.text }]}>{formatRelativeDate(value)}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onChange(toYmd(addDays(fromYmd(value), 1)))}
          hitSlop={12}
          style={styles.arrow}
          accessibilityRole="button"
          accessibilityLabel="Next day"
        >
          <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>

      {!onCenterPress && open && (
        <DateTimePicker
          value={fromYmd(value)}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onValueChange={handleValueChange}
          onDismiss={() => setOpen(false)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
  },
  arrow: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
  },
  center: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.one,
  },
  value: {
    fontSize: 15,
    fontWeight: '600',
    fontFamily: Fonts.semibold,
  },
});
