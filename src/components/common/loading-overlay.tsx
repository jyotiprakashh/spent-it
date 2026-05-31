import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type LoadingOverlayProps = {
  visible: boolean;
  label?: string;
};

export function LoadingOverlay({ visible, label }: LoadingOverlayProps): React.JSX.Element | null {
  const colors = useTheme();
  if (!visible) return null;
  return (
    <View
      style={[styles.overlay, { backgroundColor: colors.background + 'CC' }]}
      pointerEvents="auto"
    >
      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <ActivityIndicator color={colors.primary} size="large" />
        {label !== undefined && <Text style={[styles.label, { color: colors.text }]}>{label}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
    borderRadius: 14,
    borderWidth: 1,
    minWidth: 200,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
  },
});
