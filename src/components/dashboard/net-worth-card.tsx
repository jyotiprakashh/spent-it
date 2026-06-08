import { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { Money } from '@/components/common/money';
import { SectionTitle } from '@/components/common/section-title';
import { Spacing } from '@/constants/theme';

export type NetWorthCardProps = {
  value: number;
  currency?: string;
};

export function NetWorthCard({ value, currency = 'INR' }: NetWorthCardProps): React.JSX.Element {
  const tone = value < 0 ? 'expense' : 'default';

  const opacity = useSharedValue(1);
  const prevValue = useRef(value);

  useEffect(() => {
    if (prevValue.current !== value) {
      prevValue.current = value;
      opacity.value = 0.2;
      opacity.value = withTiming(1, { duration: 380 });
    }
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  const animStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <View style={styles.wrap}>
      <SectionTitle>Net Worth</SectionTitle>
      <Animated.View style={animStyle}>
        <Money value={value} currency={currency} tone={tone} size={30} weight="700" />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: Spacing.one,
    paddingHorizontal: Spacing.three,
  },
});
