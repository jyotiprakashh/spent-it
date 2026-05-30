import { StyleSheet, View } from 'react-native';

import { Card } from '@/components/common/card';
import { Money } from '@/components/common/money';
import { SectionTitle } from '@/components/common/section-title';
import { Spacing } from '@/constants/theme';

export type NetWorthCardProps = {
  value: number;
  currency?: string;
};

export function NetWorthCard({ value, currency = 'INR' }: NetWorthCardProps): React.JSX.Element {
  const tone = value < 0 ? 'expense' : 'default';
  return (
    <Card>
      <View style={styles.wrap}>
        <SectionTitle>Net Worth</SectionTitle>
        <Money value={value} currency={currency} tone={tone} size={30} weight="700" />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: Spacing.one,
  },
});
