import { Ionicons } from '@expo/vector-icons';
import { useRef } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import ReanimatedSwipeable, {
  type SwipeableMethods,
} from 'react-native-gesture-handler/ReanimatedSwipeable';

import { useTheme } from '@/hooks/use-theme';

const SWIPE_THRESHOLD = 80;

export type SwipeableRowProps = {
  onDelete: () => void;
  children: React.ReactNode;
};

export function SwipeableRow({ onDelete, children }: SwipeableRowProps): React.JSX.Element {
  const colors = useTheme();
  const ref = useRef<SwipeableMethods>(null);

  const renderRightActions = (): React.JSX.Element => (
    <TouchableOpacity
      onPress={() => {
        ref.current?.close();
        onDelete();
      }}
      accessibilityRole="button"
      accessibilityLabel="Delete transaction"
      activeOpacity={0.8}
      style={[styles.action, { backgroundColor: colors.expense }]}
    >
      <Ionicons name="trash-outline" size={22} color="#FFFFFF" />
    </TouchableOpacity>
  );

  return (
    <ReanimatedSwipeable
      ref={ref}
      renderRightActions={renderRightActions}
      rightThreshold={SWIPE_THRESHOLD}
      friction={2}
      overshootRight={false}
    >
      {children}
    </ReanimatedSwipeable>
  );
}

const styles = StyleSheet.create({
  action: {
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
