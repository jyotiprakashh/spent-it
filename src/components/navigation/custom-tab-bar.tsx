import { Ionicons } from '@expo/vector-icons';
import { isGlassEffectAPIAvailable, GlassView } from 'expo-glass-effect';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Fonts, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type TabBarProps = {
  state: { index: number; routes: readonly { key: string; name: string }[] };
  navigation: { navigate: (name: string) => void };
  insets: { top: number; bottom: number; left: number; right: number };
};

type TabConfig = {
  inactive: keyof typeof Ionicons.glyphMap;
  active: keyof typeof Ionicons.glyphMap;
  label: string;
};

const TAB_CONFIG: Record<string, TabConfig> = {
  index: { inactive: 'home-outline', active: 'home', label: 'Dashboard' },
  transactions: { inactive: 'list-outline', active: 'list', label: 'Transactions' },
  analytics: { inactive: 'bar-chart-outline', active: 'bar-chart', label: 'Analytics' },
  settings: { inactive: 'settings-outline', active: 'settings', label: 'Settings' },
};

const shouldUseGlass = Platform.OS === 'ios' && isGlassEffectAPIAvailable();

function TabItem({
  route,
  active,
  onPress,
}: {
  route: { name: string };
  active: boolean;
  onPress: () => void;
}): React.JSX.Element {
  const colors = useTheme();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const config = TAB_CONFIG[route.name] ?? {
    inactive: 'ellipse-outline' as const,
    active: 'ellipse' as const,
    label: route.name,
  };

  const color = active ? colors.primary : colors.textSecondary;

  return (
    <Animated.View style={[styles.tabItem, animatedStyle]}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={() => {
          // eslint-disable-next-line react-hooks/immutability -- Reanimated SharedValue assignment is its public API
          scale.value = withSpring(0.92, { damping: 14, stiffness: 200 });
        }}
        onPressOut={() => {
          // eslint-disable-next-line react-hooks/immutability -- Reanimated SharedValue assignment is its public API
          scale.value = withSpring(1, { damping: 14, stiffness: 200 });
        }}
        activeOpacity={1}
        accessibilityRole="tab"
        accessibilityState={{ selected: active }}
        accessibilityLabel={config.label}
        style={styles.tabTouchable}
      >
        <Ionicons name={active ? config.active : config.inactive} size={24} color={color} />
        <Text style={[styles.label, { color }]}>{config.label}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

export function CustomTabBar({ state, navigation }: TabBarProps): React.JSX.Element {
  const colors = useTheme();
  const insets = useSafeAreaInsets();

  const barStyle = [
    styles.bar,
    { paddingBottom: insets.bottom + Spacing.one },
    !shouldUseGlass && {
      backgroundColor: colors.background,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: colors.border,
    },
  ];

  const content = (
    <View style={styles.row}>
      {state.routes.map((route, index) => (
        <TabItem
          key={route.key}
          route={route}
          active={state.index === index}
          onPress={() => navigation.navigate(route.name)}
        />
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      {shouldUseGlass ? (
        <GlassView glassEffectStyle="regular" tintColor={colors.background} style={barStyle}>
          {content}
        </GlassView>
      ) : (
        <View style={barStyle}>{content}</View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  bar: {
    paddingTop: Spacing.two,
  },
  row: {
    flexDirection: 'row',
  },
  tabItem: {
    flex: 1,
  },
  tabTouchable: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    height: 56,
  },
  label: {
    fontSize: 10,
    fontFamily: Fonts.medium,
  },
});
