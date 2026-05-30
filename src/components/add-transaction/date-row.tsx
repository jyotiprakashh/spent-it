import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { formatRelativeDate } from '@/utils/format';

export type DateRowProps = {
  value: string;
  onChange: (ymd: string) => void;
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

export function DateRow({ value, onChange }: DateRowProps): React.JSX.Element {
  const colors = useTheme();
  const [open, setOpen] = useState(false);

  const handleValueChange = (_event: unknown, selected: Date): void => {
    onChange(toYmd(selected));
    if (Platform.OS !== 'ios') setOpen(false);
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => setOpen((p) => !p)}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityLabel={`Date ${formatRelativeDate(value)}, tap to change`}
        style={styles.row}
      >
        <View style={styles.left}>
          <Ionicons name="calendar-outline" size={18} color={colors.textSecondary} />
          <Text style={[styles.label, { color: colors.textSecondary }]}>Date</Text>
        </View>
        <View style={styles.right}>
          <Text style={[styles.value, { color: colors.text }]}>{formatRelativeDate(value)}</Text>
          <Ionicons name="chevron-forward" size={16} color={colors.textSecondary} />
        </View>
      </TouchableOpacity>
      {open && (
        <DateTimePicker
          value={fromYmd(value)}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
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
    paddingVertical: Spacing.three,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
  value: {
    fontSize: 15,
    fontWeight: '600',
  },
});
