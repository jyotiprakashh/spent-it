import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { IconName } from '@/constants/icons';

export type IconPickerProps = {
  icons: readonly IconName[];
  selected: IconName;
  onSelect: (icon: IconName) => void;
  tintColor?: string;
};

export function IconPicker({
  icons,
  selected,
  onSelect,
  tintColor,
}: IconPickerProps): React.JSX.Element {
  const colors = useTheme();
  const accent = tintColor ?? colors.primary;
  return (
    <ScrollView
      horizontal={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.grid}
    >
      {icons.map((name) => {
        const isSelected = name === selected;
        return (
          <TouchableOpacity
            key={name}
            onPress={() => onSelect(name)}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel={`Icon ${name}`}
            accessibilityState={{ selected: isSelected }}
            style={[
              styles.cell,
              {
                backgroundColor: isSelected ? accent + '22' : colors.backgroundElement,
                borderColor: isSelected ? accent : 'transparent',
              },
            ]}
          >
            <Ionicons name={name} size={22} color={isSelected ? accent : colors.text} />
          </TouchableOpacity>
        );
      })}
      <View style={styles.spacer} />
    </ScrollView>
  );
}

const CELL = 44;

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
    paddingVertical: Spacing.two,
  },
  cell: {
    width: CELL,
    height: CELL,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
  },
  spacer: {
    width: '100%',
    height: Spacing.three,
  },
});
