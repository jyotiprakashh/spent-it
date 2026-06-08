import { Ionicons } from '@expo/vector-icons';
import { isGlassEffectAPIAvailable, GlassView } from 'expo-glass-effect';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Fonts, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useTransactionDrawerStore } from '@/stores/transaction-drawer-store';

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
  index: { inactive: 'grid-outline', active: 'grid', label: 'Dashboard' },
  transactions: { inactive: 'receipt-outline', active: 'receipt', label: 'Transactions' },
  analytics: { inactive: 'trending-up-outline', active: 'trending-up', label: 'Analytics' },
  settings: {
    inactive: 'ellipsis-horizontal-outline',
    active: 'ellipsis-horizontal',
    label: 'Settings',
  },
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

function FabSlot({ onPress }: { onPress: () => void }): React.JSX.Element {
  const colors = useTheme();
  return (
    <View style={styles.fabSlot}>
      <View style={[styles.fabRing, { backgroundColor: colors.background }]}>
        <TouchableOpacity
          onPress={onPress}
          style={[styles.fabButton, { backgroundColor: colors.primary }]}
          activeOpacity={0.85}
          accessibilityRole="button"
          accessibilityLabel="Add transaction"
        >
          <Ionicons name="add" size={30} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export function CustomTabBar({ state, navigation }: TabBarProps): React.JSX.Element {
  const colors = useTheme();
  const insets = useSafeAreaInsets();
  const openDrawer = useTransactionDrawerStore((s) => s.open);

  const routes = state.routes;

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
      {/* Dashboard */}
      <TabItem
        key={routes[0]?.key ?? 'index'}
        route={routes[0] ?? { name: 'index', key: 'index' }}
        active={state.index === 0}
        onPress={() => navigation.navigate('index')}
      />
      {/* Transactions */}
      <TabItem
        key={routes[1]?.key ?? 'transactions'}
        route={routes[1] ?? { name: 'transactions', key: 'transactions' }}
        active={state.index === 1}
        onPress={() => navigation.navigate('transactions')}
      />
      {/* Center FAB */}
      <FabSlot onPress={openDrawer} />
      {/* Analytics */}
      <TabItem
        key={routes[2]?.key ?? 'analytics'}
        route={routes[2] ?? { name: 'analytics', key: 'analytics' }}
        active={state.index === 2}
        onPress={() => navigation.navigate('analytics')}
      />
      {/* Settings */}
      <TabItem
        key={routes[3]?.key ?? 'settings'}
        route={routes[3] ?? { name: 'settings', key: 'settings' }}
        active={state.index === 3}
        onPress={() => navigation.navigate('settings')}
      />
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
    overflow: 'visible',
  },
  bar: {
    paddingTop: Spacing.two,
    overflow: 'visible',
  },
  row: {
    flexDirection: 'row',
    overflow: 'visible',
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
  fabSlot: {
    flex: 1,
    alignItems: 'center',
    overflow: 'visible',
    height: 56,
  },
  fabRing: {
    position: 'absolute',
    top: -20,
    width: 68,
    height: 68,
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
});
