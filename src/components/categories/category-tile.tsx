import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { Category } from '@/types';

export type CategoryTileProps = {
  category: Category;
  onPress?: () => void;
  onLongPress?: () => void;
};

export function CategoryTile({
  category,
  onPress,
  onLongPress,
}: CategoryTileProps): React.JSX.Element {
  const colors = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={`${category.name}${category.is_system ? ', system category' : ''}`}
      style={[styles.tile, { backgroundColor: colors.surface, borderColor: colors.border }]}
    >
      <View style={[styles.iconWrap, { backgroundColor: category.color + '22' }]}>
        <Ionicons
          name={category.icon as keyof typeof Ionicons.glyphMap}
          size={22}
          color={category.color}
        />
      </View>
      <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>
        {category.name}
      </Text>
      {category.is_system && (
        <View style={[styles.lockBadge, { backgroundColor: colors.backgroundElement }]}>
          <Ionicons name="lock-closed" size={9} color={colors.textSecondary} />
        </View>
      )}
    </TouchableOpacity>
  );
}

export type AddTileProps = {
  onPress: () => void;
};

export function AddTile({ onPress }: AddTileProps): React.JSX.Element {
  const colors = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel="Add category"
      style={[
        styles.tile,
        {
          backgroundColor: colors.backgroundElement,
          borderColor: colors.border,
          borderStyle: 'dashed',
        },
      ]}
    >
      <View style={[styles.iconWrap, { backgroundColor: 'transparent' }]}>
        <Ionicons name="add" size={26} color={colors.textSecondary} />
      </View>
      <Text style={[styles.name, { color: colors.textSecondary }]}>Add</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    minWidth: 96,
    maxWidth: '32%',
    aspectRatio: 1,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.one,
    padding: Spacing.two,
    borderWidth: StyleSheet.hairlineWidth,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
  },
  lockBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
