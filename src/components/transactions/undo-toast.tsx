import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';

import { Fonts, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type UndoToastProps = {
  message: string;
  onUndo: () => void;
  onTimeout: () => void;
  durationMs?: number;
  bottomInset?: number;
};

export function UndoToast({
  message,
  onUndo,
  onTimeout,
  durationMs = 5000,
  bottomInset = 0,
}: UndoToastProps): React.JSX.Element {
  const colors = useTheme();

  useEffect(() => {
    const handle = setTimeout(onTimeout, durationMs);
    return () => clearTimeout(handle);
  }, [onTimeout, durationMs]);

  return (
    <Animated.View
      entering={FadeInDown.duration(180)}
      exiting={FadeOutDown.duration(180)}
      style={[styles.container, { bottom: Spacing.three + bottomInset }]}
      pointerEvents="box-none"
    >
      <View style={[styles.toast, { backgroundColor: colors.text }]}>
        <Ionicons name="checkmark-circle" size={18} color={colors.background} />
        <Text style={[styles.message, { color: colors.background }]}>{message}</Text>
        <TouchableOpacity
          onPress={onUndo}
          accessibilityRole="button"
          accessibilityLabel="Undo delete"
          hitSlop={8}
        >
          <Text style={[styles.action, { color: colors.primary }]}>UNDO</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: 12,
    gap: Spacing.two,
    maxWidth: 360,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 6,
  },
  message: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    fontFamily: Fonts.medium,
  },
  action: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: Fonts.bold,
    letterSpacing: 0.6,
  },
});
