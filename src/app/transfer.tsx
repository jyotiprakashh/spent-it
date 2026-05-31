import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SectionTitle } from '@/components/common/section-title';
import { AccountSelectorRow } from '@/components/transfer/account-selector-row';
import { Spacing } from '@/constants/theme';
import { useAccounts } from '@/hooks/use-accounts';
import { useTheme } from '@/hooks/use-theme';
import { useCreateTransfer } from '@/hooks/use-transfer';

function todayIso(): string {
  const d = new Date();
  const yyyy = d.getUTCFullYear();
  const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(d.getUTCDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export default function TransferScreen(): React.JSX.Element {
  const colors = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const accountsQuery = useAccounts();
  const accounts = (accountsQuery.data ?? []).filter((a) => !a.is_archived);

  const [fromId, setFromId] = useState<number | null>(null);
  const [toId, setToId] = useState<number | null>(null);
  const [amount, setAmount] = useState<string>('');
  const [note, setNote] = useState<string>('');

  const transfer = useCreateTransfer();

  const handleSave = (): void => {
    if (fromId === null || toId === null) {
      Alert.alert('Pick accounts', 'Choose both a "from" and a "to" account.');
      return;
    }
    const num = parseFloat(amount);
    if (!Number.isFinite(num) || num <= 0) {
      Alert.alert('Invalid amount', 'Enter a positive number');
      return;
    }
    transfer.mutate(
      {
        fromAccountId: fromId,
        toAccountId: toId,
        amount: num,
        date: todayIso(),
        note: note.trim() === '' ? null : note.trim(),
      },
      {
        onSuccess: () => router.back(),
        onError: (err) => Alert.alert('Transfer failed', err.message),
      },
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={[styles.root, { backgroundColor: colors.background }]}
    >
      <View style={[styles.header, { paddingTop: insets.top + Spacing.two }]}>
        <TouchableOpacity onPress={() => router.back()} accessibilityRole="button">
          <Text style={[styles.headerBtn, { color: colors.textSecondary }]}>Cancel</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Transfer funds</Text>
        <TouchableOpacity onPress={handleSave} accessibilityRole="button">
          <Text style={[styles.headerBtn, { color: colors.primary, fontWeight: '700' }]}>
            Transfer
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <AccountSelectorRow
          label="From"
          accounts={accounts}
          selectedId={fromId}
          excludeId={toId}
          onSelect={setFromId}
        />
        <AccountSelectorRow
          label="To"
          accounts={accounts}
          selectedId={toId}
          excludeId={fromId}
          onSelect={setToId}
        />

        <View style={styles.field}>
          <SectionTitle>Amount</SectionTitle>
          <TextInput
            value={amount}
            onChangeText={setAmount}
            keyboardType="decimal-pad"
            placeholder="0"
            placeholderTextColor={colors.textSecondary}
            style={[
              styles.input,
              { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border },
            ]}
          />
        </View>

        <View style={styles.field}>
          <SectionTitle>Note (optional)</SectionTitle>
          <TextInput
            value={note}
            onChangeText={setNote}
            placeholder="Add a note"
            placeholderTextColor={colors.textSecondary}
            style={[
              styles.input,
              { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border },
            ]}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.three,
    paddingBottom: Spacing.two,
  },
  headerBtn: { fontSize: 15 },
  headerTitle: { fontSize: 16, fontWeight: '700' },
  scroll: { padding: Spacing.three, gap: Spacing.three },
  field: { gap: Spacing.one, paddingHorizontal: Spacing.three },
  input: {
    borderRadius: 12,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    fontSize: 15,
    borderWidth: 1,
  },
});
