import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export interface PickerOption<K extends string | number> {
  key: K;
  label: string;
  subtitle?: string;
}

export type PickerRowProps<K extends string | number> = {
  options: readonly PickerOption<K>[];
  selectedKey: K;
  onSelect: (key: K) => void;
};

export function PickerRow<K extends string | number>({
  options,
  selectedKey,
  onSelect,
}: PickerRowProps<K>): React.JSX.Element {
  const colors = useTheme();
  return (
    <View style={[styles.group, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      {options.map((opt, i) => {
        const isSelected = opt.key === selectedKey;
        const isLast = i === options.length - 1;
        return (
          <TouchableOpacity
            key={String(opt.key)}
            onPress={() => onSelect(opt.key)}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel={opt.label}
            accessibilityState={{ selected: isSelected }}
            style={[
              styles.option,
              !isLast && {
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderBottomColor: colors.border,
              },
            ]}
          >
            <View style={styles.optionBody}>
              <Text style={[styles.label, { color: colors.text }]}>{opt.label}</Text>
              {opt.subtitle !== undefined && (
                <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                  {opt.subtitle}
                </Text>
              )}
            </View>
            {isSelected && <Ionicons name="checkmark" size={20} color={colors.primary} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  group: {
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.three,
    gap: Spacing.two,
  },
  optionBody: {
    flex: 1,
    gap: 2,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '500',
  },
});
