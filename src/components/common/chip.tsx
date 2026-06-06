import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Fonts, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ChipProps = {
  label: string;
  selected?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  onPress?: () => void;
  accessibilityLabel?: string;
};

export function Chip({
  label,
  selected = false,
  icon,
  iconColor,
  onPress,
  accessibilityLabel,
}: ChipProps): React.JSX.Element {
  const colors = useTheme();
  const bg = selected ? colors.primary : colors.backgroundElement;
  const fg = selected ? colors.background : colors.text;
  const iconFg = iconColor ?? fg;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ selected }}
      style={[styles.chip, { backgroundColor: bg }]}
    >
      {icon !== undefined && (
        <View style={styles.iconWrap}>
          <Ionicons name={icon} size={14} color={iconFg} />
        </View>
      )}
      <Text style={[styles.label, { color: fg }]} numberOfLines={1}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: 999,
    gap: Spacing.one,
  },
  iconWrap: {
    marginRight: Spacing.half,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    fontFamily: Fonts.semibold,
  },
});
