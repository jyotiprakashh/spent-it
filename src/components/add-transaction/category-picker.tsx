import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { Category } from '@/types';

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

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.list}
    >
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
            style={styles.item}
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: Spacing.three,
    gap: Spacing.three,
    alignItems: 'center',
  },
  item: {
    alignItems: 'center',
    width: 72,
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
    textAlign: 'center',
  },
});
