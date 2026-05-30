import { StyleSheet, Text, type TextStyle } from 'react-native';

import { useTheme } from '@/hooks/use-theme';

export type SectionTitleProps = {
  children: string;
  style?: TextStyle;
};

export function SectionTitle({ children, style }: SectionTitleProps): React.JSX.Element {
  const colors = useTheme();
  return (
    <Text style={[styles.title, { color: colors.textSecondary }, style]} numberOfLines={1}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
});
