import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type PassphraseInputProps = {
  value: string;
  onChangeText: (next: string) => void;
  placeholder?: string;
  showStrength?: boolean;
  autoFocus?: boolean;
  accessibilityLabel?: string;
};

function strengthLabel(length: number): { label: string; ratio: number; color: string } {
  if (length === 0) return { label: '', ratio: 0, color: 'transparent' };
  if (length < 8) return { label: 'Too short', ratio: 0.2, color: '#F45B69' };
  if (length < 12) return { label: 'Fair', ratio: 0.5, color: '#F5A623' };
  if (length < 16) return { label: 'Good', ratio: 0.75, color: '#00D09C' };
  return { label: 'Strong', ratio: 1, color: '#00D09C' };
}

export function PassphraseInput({
  value,
  onChangeText,
  placeholder = 'Passphrase',
  showStrength = false,
  autoFocus = false,
  accessibilityLabel,
}: PassphraseInputProps): React.JSX.Element {
  const colors = useTheme();
  const [reveal, setReveal] = useState(false);
  const strength = strengthLabel(value.length);

  return (
    <View style={styles.wrap}>
      <View style={[styles.row, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Ionicons name="lock-closed-outline" size={16} color={colors.textSecondary} />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          secureTextEntry={!reveal}
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus={autoFocus}
          accessibilityLabel={accessibilityLabel ?? placeholder}
          style={[styles.input, { color: colors.text }]}
        />
        <TouchableOpacity
          onPress={() => setReveal((v) => !v)}
          accessibilityRole="button"
          accessibilityLabel={reveal ? 'Hide passphrase' : 'Show passphrase'}
          hitSlop={8}
        >
          <Ionicons
            name={reveal ? 'eye-off-outline' : 'eye-outline'}
            size={18}
            color={colors.textSecondary}
          />
        </TouchableOpacity>
      </View>
      {showStrength && value.length > 0 && (
        <View style={styles.strength}>
          <View style={[styles.meter, { backgroundColor: colors.backgroundElement }]}>
            <View
              style={[
                styles.meterFill,
                { backgroundColor: strength.color, width: `${strength.ratio * 100}%` },
              ]}
            />
          </View>
          <Text style={[styles.label, { color: colors.textSecondary }]}>{strength.label}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: Spacing.one },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: 12,
    borderWidth: 1,
  },
  input: {
    flex: 1,
    fontSize: 15,
    padding: 0,
  },
  strength: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  meter: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  meterFill: {
    height: '100%',
    borderRadius: 2,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    minWidth: 64,
  },
});
