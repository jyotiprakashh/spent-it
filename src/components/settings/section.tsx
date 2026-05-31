import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type SectionProps = {
  title?: string;
  children: React.ReactNode;
};

export function Section({ title, children }: SectionProps): React.JSX.Element {
  const colors = useTheme();
  return (
    <View style={styles.wrap}>
      {title !== undefined && (
        <Text style={[styles.title, { color: colors.textSecondary }]}>{title}</Text>
      )}
      <View style={[styles.group, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        {React.Children.map(children, (child, i) => (
          <View
            key={i}
            style={
              i > 0
                ? { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.border }
                : undefined
            }
          >
            {child}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: Spacing.one,
    paddingHorizontal: Spacing.three,
  },
  title: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    paddingHorizontal: Spacing.one,
  },
  group: {
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
  },
});
