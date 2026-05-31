import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { StyleSheet, type ViewProps } from 'react-native';

import { useTheme } from '@/hooks/use-theme';

export type TabScreenProps = ViewProps;

// Wraps a tab screen's root view in a Reanimated cross-fade so switching
// between tabs reads as smooth content swap rather than an instant cut.
// NativeTabs renders the platform tab bar; the bar itself is unaffected.
export function TabScreen({ children, style, ...rest }: TabScreenProps): React.JSX.Element {
  const colors = useTheme();
  return (
    <Animated.View
      entering={FadeIn.duration(160)}
      exiting={FadeOut.duration(120)}
      style={[styles.root, { backgroundColor: colors.background }, style]}
      {...rest}
    >
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});
