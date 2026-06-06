import { Ionicons } from '@expo/vector-icons';
import { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Fonts, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const MAX_INT_DIGITS = 10;
const MAX_DEC_DIGITS = 2;

const KEYS: readonly string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'back'];

export type NumericKeypadProps = {
  value: string;
  onChange: (value: string) => void;
};

function appendDigit(current: string, digit: string): string {
  if (current === '0' && digit !== '.') return digit;
  if (digit === '.') {
    if (current.includes('.')) return current;
    return `${current}.`;
  }
  const dotIndex = current.indexOf('.');
  if (dotIndex === -1) {
    if (current.replace('-', '').length >= MAX_INT_DIGITS) return current;
    return current + digit;
  }
  const decimals = current.length - dotIndex - 1;
  if (decimals >= MAX_DEC_DIGITS) return current;
  return current + digit;
}

function backspace(current: string): string {
  if (current.length <= 1) return '0';
  return current.slice(0, -1);
}

export function NumericKeypad({ value, onChange }: NumericKeypadProps): React.JSX.Element {
  const colors = useTheme();

  const handlePress = useCallback(
    (key: string): void => {
      if (key === 'back') {
        onChange(backspace(value));
        return;
      }
      onChange(appendDigit(value, key));
    },
    [value, onChange],
  );

  return (
    <View style={styles.grid}>
      {KEYS.map((key) => (
        <TouchableOpacity
          key={key}
          onPress={() => handlePress(key)}
          activeOpacity={0.6}
          style={[styles.key, { backgroundColor: colors.backgroundElement }]}
          accessibilityRole="button"
          accessibilityLabel={key === 'back' ? 'Backspace' : key === '.' ? 'Decimal point' : key}
        >
          {key === 'back' ? (
            <Ionicons name="backspace-outline" size={22} color={colors.text} />
          ) : (
            <Text style={[styles.keyText, { color: colors.text }]}>{key}</Text>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Spacing.three,
    gap: Spacing.two,
  },
  key: {
    flexBasis: '31%',
    flexGrow: 1,
    height: 56,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyText: {
    fontSize: 22,
    fontWeight: '600',
    fontFamily: Fonts.semibold,
  },
});
