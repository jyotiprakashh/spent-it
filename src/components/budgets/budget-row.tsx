import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Money } from '@/components/common/money';
import { ProgressBar } from '@/components/common/progress-bar';
import { Fonts, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type BudgetRowProps = {
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  name: string;
  spent: number;
  budget: number;
  currency: string;
  onPress?: () => void;
};

export function BudgetRow({
  icon,
  color,
  name,
  spent,
  budget,
  currency,
  onPress,
}: BudgetRowProps): React.JSX.Element {
  const colors = useTheme();
  const pct = budget > 0 ? spent / budget : 0;
  let barColor = colors.primary;
  if (pct >= 1.0) barColor = colors.expense;
  else if (pct >= 0.8) barColor = colors.warning;

  const content = (
    <View style={styles.row}>
      <View style={[styles.iconWrap, { backgroundColor: color + '22' }]}>
        <Ionicons name={icon} size={18} color={color} />
      </View>
      <View style={styles.body}>
        <View style={styles.line}>
          <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>
            {name}
          </Text>
          <Text style={[styles.pct, { color: colors.textSecondary }]}>
            {Math.round(pct * 100)}%
          </Text>
        </View>
        <ProgressBar value={pct} color={barColor} />
        <View style={styles.amounts}>
          <Money value={spent} currency={currency} tone="muted" size={12} />
          <Text style={[styles.divider, { color: colors.textSecondary }]}> / </Text>
          <Money value={budget} currency={currency} tone="default" size={12} />
        </View>
      </View>
      {onPress !== undefined && (
        <Ionicons name="chevron-forward" size={16} color={colors.textSecondary} />
      )}
    </View>
  );

  if (onPress === undefined) return content;
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={`${name} budget ${Math.round(pct * 100)} percent`}
    >
      {content}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.two,
    gap: Spacing.two,
  },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 1,
    gap: 6,
  },
  line: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    fontFamily: Fonts.semibold,
  },
  pct: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: Fonts.semibold,
  },
  amounts: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  divider: {
    fontSize: 12,
  },
});
