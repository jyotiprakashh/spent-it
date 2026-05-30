import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TextInput, View } from 'react-native';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type NoteRowProps = {
  value: string;
  onChangeText: (text: string) => void;
};

export function NoteRow({ value, onChangeText }: NoteRowProps): React.JSX.Element {
  const colors = useTheme();
  return (
    <View style={styles.row}>
      <Ionicons name="document-text-outline" size={18} color={colors.textSecondary} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Add a note"
        placeholderTextColor={colors.textSecondary}
        style={[styles.input, { color: colors.text }]}
        maxLength={120}
        returnKeyType="done"
        accessibilityLabel="Note"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.three,
    gap: Spacing.two,
  },
  input: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 0,
  },
});
