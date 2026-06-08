import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';

import { Fonts, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type InlineCalendarProps = {
  value: string;
  onChange: (ymd: string) => void;
};

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'] as const;
const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

function getMonthCells(year: number, month: number): (number | null)[] {
  const firstDow = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const cells: (number | null)[] = Array(firstDow).fill(null) as null[];
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

function toYmd(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function parseYmd(ymd: string): { year: number; month: number; day: number } {
  const [y, m, d] = ymd.split('-').map(Number);
  return { year: y ?? 0, month: m ?? 1, day: d ?? 1 };
}

export function InlineCalendar({ value, onChange }: InlineCalendarProps): React.JSX.Element {
  const colors = useTheme();
  const { width } = useWindowDimensions();

  const { year: selYear, month: selMonth, day: selDay } = parseYmd(value);
  const [viewYear, setViewYear] = useState(selYear);
  const [viewMonth, setViewMonth] = useState(selMonth);

  const cells = useMemo(() => getMonthCells(viewYear, viewMonth), [viewYear, viewMonth]);

  const today = useMemo(() => {
    const t = new Date();
    return { year: t.getFullYear(), month: t.getMonth() + 1, day: t.getDate() };
  }, []);

  const cellSize = Math.floor((width - Spacing.three * 2) / 7);

  const prevMonth = (): void => {
    if (viewMonth === 1) {
      setViewMonth(12);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const nextMonth = (): void => {
    if (viewMonth === 12) {
      setViewMonth(1);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const handleDay = (day: number): void => {
    onChange(toYmd(new Date(viewYear, viewMonth - 1, day)));
  };

  const rows: (number | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    rows.push(cells.slice(i, i + 7));
  }

  return (
    <View style={[styles.root, { paddingHorizontal: Spacing.three }]}>
      {/* Month nav */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={prevMonth}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel="Previous month"
        >
          <Ionicons name="chevron-back" size={20} color={colors.textSecondary} />
        </TouchableOpacity>
        <Text style={[styles.monthLabel, { color: colors.text }]}>
          {MONTH_NAMES[viewMonth - 1]} {viewYear}
        </Text>
        <TouchableOpacity
          onPress={nextMonth}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel="Next month"
        >
          <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>

      {/* Weekday headers */}
      <View style={styles.weekRow}>
        {WEEKDAYS.map((wd) => (
          <View key={wd} style={[styles.cell, { width: cellSize, height: 28 }]}>
            <Text style={[styles.weekday, { color: colors.textSecondary }]}>{wd}</Text>
          </View>
        ))}
      </View>

      {/* Day grid */}
      {rows.map((row, ri) => (
        <View key={ri} style={styles.weekRow}>
          {row.map((day, ci) => {
            if (day === null) {
              return <View key={ci} style={[styles.cell, { width: cellSize, height: cellSize }]} />;
            }
            const isSelected = day === selDay && viewMonth === selMonth && viewYear === selYear;
            const isToday =
              day === today.day && viewMonth === today.month && viewYear === today.year;
            return (
              <TouchableOpacity
                key={ci}
                onPress={() => handleDay(day)}
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityLabel={`${day} ${MONTH_NAMES[viewMonth - 1]} ${viewYear}`}
                accessibilityState={{ selected: isSelected }}
                style={[styles.cell, { width: cellSize, height: cellSize }]}
              >
                <View
                  style={[
                    styles.dayCircle,
                    { width: cellSize - 4, height: cellSize - 4, borderRadius: (cellSize - 4) / 2 },
                    isSelected && { backgroundColor: colors.primary },
                    isToday && !isSelected && { borderWidth: 1.5, borderColor: colors.primary },
                  ]}
                >
                  <Text
                    style={[
                      styles.dayText,
                      { color: isSelected ? '#FFFFFF' : isToday ? colors.primary : colors.text },
                      isSelected && { fontFamily: Fonts.semibold },
                    ]}
                  >
                    {day}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingTop: Spacing.two,
    paddingBottom: Spacing.two,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.one,
  },
  monthLabel: {
    fontSize: 15,
    fontWeight: '600',
    fontFamily: Fonts.semibold,
  },
  weekRow: {
    flexDirection: 'row',
  },
  cell: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  weekday: {
    fontSize: 11,
    fontWeight: '600',
    fontFamily: Fonts.semibold,
  },
  dayCircle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayText: {
    fontSize: 13,
    fontFamily: Fonts.regular,
  },
});
