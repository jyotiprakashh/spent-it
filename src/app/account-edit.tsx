import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
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

import { AccountTypePicker } from '@/components/accounts/account-type-picker';
import { ColorPicker } from '@/components/common/color-picker';
import { confirm } from '@/components/common/confirm-dialog';
import { IconPicker } from '@/components/common/icon-picker';
import { SectionTitle } from '@/components/common/section-title';
import { ACCOUNT_ICONS, type IconName } from '@/constants/icons';
import { PALETTE } from '@/constants/colors';
import { Spacing } from '@/constants/theme';
import {
  useAccount,
  useAccountTransactionCount,
  useArchiveAccount,
  useCreateAccount,
  useUpdateAccount,
} from '@/hooks/use-accounts';
import { useCurrency } from '@/hooks/use-settings';
import { useTheme } from '@/hooks/use-theme';
import type { AccountType, NewAccount } from '@/types';

export default function AccountEditScreen(): React.JSX.Element {
  const colors = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string }>();
  const editId =
    typeof params.id === 'string' && Number.isFinite(parseInt(params.id, 10))
      ? parseInt(params.id, 10)
      : null;
  const editing = useAccount(editId);
  const txCount = useAccountTransactionCount(editId);
  const currency = useCurrency();

  const [name, setName] = useState('');
  const [type, setType] = useState<AccountType>('cash');
  const [icon, setIcon] = useState<IconName>('wallet-outline');
  const [color, setColor] = useState<string>(PALETTE[0]);
  const [opening, setOpening] = useState<string>('0');
  const [initialOpening, setInitialOpening] = useState<number>(0);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (editId === null || editing.data === null || editing.data === undefined || hydrated) return;
    const a = editing.data;
    void Promise.resolve().then(() => {
      setName(a.name);
      setType(a.type);
      setIcon(a.icon as IconName);
      setColor(a.color);
      setOpening(String(a.opening_balance));
      setInitialOpening(a.opening_balance);
      setHydrated(true);
    });
  }, [editId, editing.data, hydrated]);

  const create = useCreateAccount();
  const update = useUpdateAccount();
  const archive = useArchiveAccount();

  const handleSave = async (): Promise<void> => {
    const trimmed = name.trim();
    if (trimmed === '') {
      Alert.alert('Name required', 'Please enter an account name');
      return;
    }
    const openingNum = parseFloat(opening);
    if (!Number.isFinite(openingNum) || openingNum < 0) {
      Alert.alert('Invalid opening balance', 'Use a non-negative number');
      return;
    }
    if (editId !== null) {
      const balanceChanged = openingNum !== initialOpening;
      if (balanceChanged && (txCount.data ?? 0) > 0) {
        const ok = await confirm({
          title: 'Recalculate balance?',
          message:
            "Editing the opening balance will recalculate this account's running total. Continue?",
          confirmLabel: 'Continue',
        });
        if (!ok) return;
      }
      update.mutate(
        { id: editId, patch: { name: trimmed, type, icon, color, opening_balance: openingNum } },
        {
          onSuccess: () => router.back(),
          onError: (err) => Alert.alert('Save failed', err.message),
        },
      );
    } else {
      const payload: NewAccount = {
        name: trimmed,
        type,
        icon,
        color,
        opening_balance: openingNum,
        currency,
        is_default: false,
        is_archived: false,
        sort_order: 0,
      };
      create.mutate(payload, {
        onSuccess: () => router.back(),
        onError: (err) => Alert.alert('Save failed', err.message),
      });
    }
  };

  const handleArchive = async (): Promise<void> => {
    if (editId === null) return;
    const ok = await confirm({
      title: 'Archive account?',
      message: 'Existing transactions will still reference this account.',
      confirmLabel: 'Archive',
      destructive: true,
    });
    if (!ok) return;
    archive.mutate(editId, {
      onSuccess: () => router.back(),
      onError: (err) => Alert.alert('Archive failed', err.message),
    });
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
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          {editId !== null ? 'Edit account' : 'New account'}
        </Text>
        <TouchableOpacity onPress={() => void handleSave()} accessibilityRole="button">
          <Text style={[styles.headerBtn, { color: colors.primary, fontWeight: '700' }]}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.field}>
          <SectionTitle>Name</SectionTitle>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="e.g. HDFC Savings"
            placeholderTextColor={colors.textSecondary}
            style={[
              styles.input,
              { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border },
            ]}
          />
        </View>

        <View style={styles.field}>
          <SectionTitle>Type</SectionTitle>
          <AccountTypePicker selected={type} onSelect={setType} />
        </View>

        <View style={styles.field}>
          <SectionTitle>Icon</SectionTitle>
          <IconPicker icons={ACCOUNT_ICONS} selected={icon} onSelect={setIcon} tintColor={color} />
        </View>

        <View style={styles.field}>
          <SectionTitle>Colour</SectionTitle>
          <ColorPicker selected={color} onSelect={setColor} />
        </View>

        <View style={styles.field}>
          <SectionTitle>Opening balance</SectionTitle>
          <TextInput
            value={opening}
            onChangeText={setOpening}
            keyboardType="decimal-pad"
            placeholder="0"
            placeholderTextColor={colors.textSecondary}
            style={[
              styles.input,
              { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border },
            ]}
          />
        </View>

        {editId !== null && (
          <TouchableOpacity
            onPress={() => void handleArchive()}
            accessibilityRole="button"
            accessibilityLabel="Archive account"
            style={[styles.archive, { borderColor: colors.expense }]}
          >
            <Text style={[styles.archiveText, { color: colors.expense }]}>Archive account</Text>
          </TouchableOpacity>
        )}
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
  field: { gap: Spacing.one },
  input: {
    borderRadius: 12,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    fontSize: 15,
    borderWidth: 1,
  },
  archive: {
    marginTop: Spacing.three,
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: Spacing.two,
    alignItems: 'center',
  },
  archiveText: { fontSize: 14, fontWeight: '700' },
});
