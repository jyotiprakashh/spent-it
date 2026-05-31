import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { PALETTE } from '@/constants/colors';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ColorPickerProps = {
  palette?: readonly string[];
  selected: string;
  onSelect: (color: string) => void;
};

export function ColorPicker({
  palette = PALETTE,
  selected,
  onSelect,
}: ColorPickerProps): React.JSX.Element {
  const colors = useTheme();
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      {palette.map((hex) => {
        const isSelected = hex.toUpperCase() === selected.toUpperCase();
        return (
          <TouchableOpacity
            key={hex}
            onPress={() => onSelect(hex)}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel={`Color ${hex}`}
            accessibilityState={{ selected: isSelected }}
            style={[styles.ring, { borderColor: isSelected ? colors.text : 'transparent' }]}
          >
            <View style={[styles.swatch, { backgroundColor: hex }]} />
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const SWATCH = 28;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: Spacing.two,
    paddingVertical: Spacing.two,
  },
  ring: {
    width: SWATCH + 8,
    height: SWATCH + 8,
    borderRadius: (SWATCH + 8) / 2,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  swatch: {
    width: SWATCH,
    height: SWATCH,
    borderRadius: SWATCH / 2,
  },
});
