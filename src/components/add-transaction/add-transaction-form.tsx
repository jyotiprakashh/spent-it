import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Fonts, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useAccounts } from '@/hooks/use-accounts';
import { useActiveCategories } from '@/hooks/use-categories';
import { useSetSetting, useSetting } from '@/hooks/use-settings';
import {
  useCreateTransaction,
  useTransaction,
  useUpdateTransaction,
} from '@/hooks/use-transactions';
import type { NewTransaction, TxnType } from '@/types';
import { currencySymbol, todayIso } from '@/utils/format';

import { AccountPicker } from './account-picker';
import { CategoryPicker } from './category-picker';
import { DateRow } from './date-row';
import { InlineCalendar } from './inline-calendar';
import { NoteRow } from './note-row';
import { NumericKeypad } from './numeric-keypad';
import { TypeToggle } from './type-toggle';

const LAST_ACCOUNT_KEY = 'last_account_id';
const KEYPAD_H = 248;

export type AddTransactionFormProps = {
  editId: number | null;
};

function formatDisplayAmount(value: string): string {
  const parts = value.split('.');
  const intPart = parts[0] ?? '0';
  const decPart = parts[1];
  const withSep = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return decPart !== undefined ? `${withSep}.${decPart}` : withSep;
}

export function AddTransactionForm({ editId }: AddTransactionFormProps): React.JSX.Element {
  const colors = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const accountsQuery = useAccounts();
  const lastAccountQuery = useSetting(LAST_ACCOUNT_KEY);
  const existing = useTransaction(editId);

  const [type, setType] = useState<TxnType>('expense');
  const [amount, setAmount] = useState('0');
  const [accountId, setAccountId] = useState<number | null>(null);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [date, setDate] = useState<string>(todayIso());
  const [note, setNote] = useState('');
  const [hydrated, setHydrated] = useState(false);

  const [showCalendar, setShowCalendar] = useState(false);
  const [keypadOpen, setKeypadOpen] = useState(true);
  const keypadH = useSharedValue(KEYPAD_H);
  const keypadAnimStyle = useAnimatedStyle(() => ({
    height: keypadH.value,
    overflow: 'hidden',
  }));
  const toggleKeypad = (): void => {
    const next = !keypadOpen;
    setKeypadOpen(next);
    // eslint-disable-next-line react-hooks/immutability -- Reanimated SharedValue assignment is its public API
    keypadH.value = withSpring(next ? KEYPAD_H : 0, { damping: 14, stiffness: 200 });
  };

  const categoriesQuery = useActiveCategories(type);

  const create = useCreateTransaction();
  const update = useUpdateTransaction();
  const setSetting = useSetSetting();

  // Hydrate form for edit mode OR set defaults on first load.
  // Uses a microtask deferral so the state writes don't fire synchronously
  // from the effect body (react-hooks/set-state-in-effect).
  useEffect(() => {
    if (hydrated) return;
    let cancelled = false;

    if (editId !== null) {
      if (existing.data !== undefined && existing.data !== null) {
        const t = existing.data;
        void Promise.resolve().then(() => {
          if (cancelled) return;
          setType(t.type);
          setAmount(String(t.amount));
          setAccountId(t.account_id);
          setCategoryId(t.category_id);
          setDate(t.date);
          setNote(t.note ?? '');
          setHydrated(true);
        });
      }
    } else if (accountsQuery.data !== undefined && lastAccountQuery.isFetched) {
      const accounts = accountsQuery.data;
      const lastRaw = lastAccountQuery.data;
      void Promise.resolve().then(() => {
        if (cancelled) return;
        const lastId = typeof lastRaw === 'string' ? parseInt(lastRaw, 10) : NaN;
        const fallback = accounts[0]?.id ?? null;
        const initial = accounts.some((a) => a.id === lastId) ? lastId : fallback;
        setAccountId(initial);
        setHydrated(true);
      });
    }

    return () => {
      cancelled = true;
    };
  }, [
    hydrated,
    editId,
    existing.data,
    accountsQuery.data,
    lastAccountQuery.data,
    lastAccountQuery.isFetched,
  ]);

  const numericAmount = useMemo(() => parseFloat(amount), [amount]);
  const canSave =
    Number.isFinite(numericAmount) &&
    numericAmount > 0 &&
    accountId !== null &&
    categoryId !== null;

  const currency = useMemo(() => {
    if (accountId === null || accountsQuery.data === undefined) return 'INR';
    return accountsQuery.data.find((a) => a.id === accountId)?.currency ?? 'INR';
  }, [accountId, accountsQuery.data]);

  const handleSave = (): void => {
    if (!canSave || accountId === null || categoryId === null) return;

    const payload: NewTransaction = {
      amount: numericAmount,
      type,
      category_id: categoryId,
      account_id: accountId,
      payment_method_id: null,
      note: note.trim() === '' ? null : note.trim(),
      date,
      time: '00:00',
      currency,
      receipt_uri: null,
      is_recurring: false,
      recurrence_rule: null,
      is_transfer: false,
      transfer_pair_id: null,
    };

    const onSuccess = (): void => {
      setSetting.mutate({ key: LAST_ACCOUNT_KEY, value: String(accountId) });
      router.back();
    };
    const onError = (err: Error): void => {
      Alert.alert('Could not save', err.message);
    };

    if (editId !== null) {
      update.mutate({ id: editId, patch: payload }, { onSuccess, onError });
    } else {
      create.mutate(payload, { onSuccess, onError });
    }
  };

  const isSaving = create.isPending || update.isPending;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={[styles.flex, { backgroundColor: colors.background }]}
    >
      <View style={[styles.header, { paddingTop: insets.top + Spacing.two }]}>
        <TouchableOpacity
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Cancel"
          hitSlop={8}
        >
          <Text style={[styles.headerAction, { color: colors.textSecondary }]}>Cancel</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>
          {editId !== null ? 'Edit' : 'New'} {type === 'income' ? 'Income' : 'Expense'}
        </Text>
        <TouchableOpacity
          onPress={handleSave}
          disabled={!canSave || isSaving}
          accessibilityRole="button"
          accessibilityLabel="Save transaction"
          hitSlop={8}
        >
          <Text
            style={[
              styles.headerAction,
              styles.headerSave,
              { color: canSave && !isSaving ? colors.primary : colors.textSecondary },
            ]}
          >
            {isSaving ? '...' : 'Save'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.amountWrap}>
          <Text
            style={[styles.amount, { color: type === 'income' ? colors.income : colors.expense }]}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {currencySymbol(currency)} {formatDisplayAmount(amount)}
          </Text>
          <TypeToggle value={type} onChange={setType} />
        </View>

        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Account</Text>
        {accountsQuery.data === undefined ? (
          <ActivityIndicator color={colors.textSecondary} style={styles.loader} />
        ) : (
          <AccountPicker
            accounts={accountsQuery.data}
            selectedId={accountId}
            onSelect={setAccountId}
          />
        )}

        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Category</Text>
        {categoriesQuery.data === undefined ? (
          <ActivityIndicator color={colors.textSecondary} style={styles.loader} />
        ) : (
          <CategoryPicker
            categories={categoriesQuery.data}
            selectedId={categoryId}
            onSelect={setCategoryId}
          />
        )}

        <DateRow
          value={date}
          onChange={(d) => {
            setDate(d);
            setShowCalendar(false);
          }}
          onCenterPress={() => setShowCalendar((v) => !v)}
        />
        <View style={[styles.divider, { backgroundColor: colors.border }]} />
        {showCalendar && (
          <InlineCalendar
            value={date}
            onChange={(d) => {
              setDate(d);
              setShowCalendar(false);
            }}
          />
        )}
        <NoteRow value={note} onChangeText={setNote} />
      </ScrollView>

      <View>
        <TouchableOpacity
          onPress={toggleKeypad}
          style={[styles.keypadToggle, { borderTopColor: colors.border }]}
          accessibilityRole="button"
          accessibilityLabel={keypadOpen ? 'Hide keypad' : 'Show keypad'}
        >
          <Ionicons
            name={keypadOpen ? 'chevron-down' : 'chevron-up'}
            size={16}
            color={colors.textSecondary}
          />
        </TouchableOpacity>
        <Animated.View style={[keypadAnimStyle, { paddingBottom: insets.bottom + Spacing.three }]}>
          <NumericKeypad value={amount} onChange={setAmount} />
        </Animated.View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.three,
    paddingBottom: Spacing.two,
  },
  headerAction: {
    fontSize: 15,
    fontFamily: Fonts.regular,
  },
  headerSave: {
    fontWeight: '700',
    fontFamily: Fonts.bold,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: Fonts.semibold,
  },
  scroll: {
    paddingBottom: 0,
  },
  amountWrap: {
    alignItems: 'center',
    gap: Spacing.three,
    paddingVertical: Spacing.four,
    paddingHorizontal: Spacing.three,
  },
  amount: {
    fontSize: 44,
    fontWeight: '700',
    fontFamily: Fonts.bold,
    letterSpacing: -1,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    fontFamily: Fonts.bold,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.three,
    paddingBottom: Spacing.two,
  },
  loader: {
    paddingVertical: Spacing.two,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginLeft: Spacing.three + 18 + Spacing.two,
  },
  keypadToggle: {
    alignItems: 'center',
    paddingVertical: Spacing.one,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});
