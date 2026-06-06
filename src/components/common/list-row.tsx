import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View, type ViewStyle } from 'react-native';

import { Fonts, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ListRowProps = {
  title: string;
  subtitle?: string;
  leadingIcon?: keyof typeof Ionicons.glyphMap;
  leadingIconColor?: string;
  trailingText?: string;
  trailing?: React.ReactNode;
  onPress?: () => void;
  showChevron?: boolean;
  disabled?: boolean;
  accessibilityLabel?: string;
  style?: ViewStyle;
};

export function ListRow({
  title,
  subtitle,
  leadingIcon,
  leadingIconColor,
  trailingText,
  trailing,
  onPress,
  showChevron = true,
  disabled = false,
  accessibilityLabel,
  style,
}: ListRowProps): React.JSX.Element {
  const colors = useTheme();
  const interactive = onPress !== undefined && !disabled;

  const content = (
    <View style={[styles.row, style]}>
      {leadingIcon !== undefined && (
        <View
          style={[
            styles.iconWrap,
            { backgroundColor: (leadingIconColor ?? colors.primary) + '22' },
          ]}
        >
          <Ionicons name={leadingIcon} size={18} color={leadingIconColor ?? colors.primary} />
        </View>
      )}
      <View style={styles.middle}>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
          {title}
        </Text>
        {subtitle !== undefined && (
          <Text style={[styles.subtitle, { color: colors.textSecondary }]} numberOfLines={1}>
            {subtitle}
          </Text>
        )}
      </View>
      {trailing !== undefined ? (
        <View style={styles.trailing}>{trailing}</View>
      ) : trailingText !== undefined ? (
        <Text style={[styles.trailingText, { color: colors.textSecondary }]}>{trailingText}</Text>
      ) : null}
      {interactive && showChevron && (
        <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
      )}
    </View>
  );

  if (!interactive) return content;
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
    >
      {content}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.three,
    gap: Spacing.three,
  },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  middle: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    fontFamily: Fonts.semibold,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: Fonts.medium,
  },
  trailing: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trailingText: {
    fontSize: 13,
    fontWeight: '500',
    fontFamily: Fonts.medium,
  },
});
