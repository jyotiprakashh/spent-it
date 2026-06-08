import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';

import { Fonts, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { Category } from '@/types';

const COLS = 4;

export type CategoryPickerProps = {
  categories: Category[];
  selectedId: number | null;
  onSelect: (id: number) => void;
};

export function CategoryPicker({
  categories,
  selectedId,
  onSelect,
}: CategoryPickerProps): React.JSX.Element {
  const colors = useTheme();
  const router = useRouter();
  const { width } = useWindowDimensions();

  const itemWidth = (width - Spacing.three * 2 - Spacing.two * (COLS - 1)) / COLS;

  return (
    <View style={styles.grid}>
      {categories.map((c) => {
        const selected = c.id === selectedId;
        const icon = c.icon as keyof typeof Ionicons.glyphMap;
        return (
          <TouchableOpacity
            key={c.id}
            onPress={() => onSelect(c.id)}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel={`Select category ${c.name}`}
            accessibilityState={{ selected }}
            style={[styles.item, { width: itemWidth }]}
          >
            <View
              style={[
                styles.iconCircle,
                selected && { borderColor: c.color },
                { backgroundColor: selected ? c.color : `${c.color}22` },
              ]}
            >
              <Ionicons name={icon} size={22} color={selected ? '#FFFFFF' : c.color} />
            </View>
            <Text
              style={[styles.label, { color: selected ? colors.text : colors.textSecondary }]}
              numberOfLines={1}
            >
              {c.name}
            </Text>
          </TouchableOpacity>
        );
      })}

      <TouchableOpacity
        onPress={() => router.push('/category-edit')}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityLabel="Add new category"
        style={[styles.item, { width: itemWidth }]}
      >
        <View
          style={[
            styles.iconCircle,
            { backgroundColor: colors.backgroundElement, borderColor: 'transparent' },
          ]}
        >
          <Ionicons name="add-outline" size={22} color={colors.textSecondary} />
        </View>
        <Text style={[styles.label, { color: colors.textSecondary }]}>New</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Spacing.three,
    gap: Spacing.two,
  },
  item: {
    alignItems: 'center',
    gap: 6,
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 2,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: Fonts.medium,
    textAlign: 'center',
  },
});
