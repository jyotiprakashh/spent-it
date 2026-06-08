import { Ionicons } from '@expo/vector-icons';
import { usePathname } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import Animated, {
  Easing,
  cancelAnimation,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Fonts, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useAccounts } from '@/hooks/use-accounts';
import { useActiveCategories } from '@/hooks/use-categories';
import { useSetSetting, useSetting } from '@/hooks/use-settings';
import { useCreateTransaction } from '@/hooks/use-transactions';
import { useTransactionDrawerStore } from '@/stores/transaction-drawer-store';
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
const ANIM_OPEN = { duration: 240, easing: Easing.out(Easing.quad) } as const;
const ANIM_CLOSE = { duration: 180, easing: Easing.in(Easing.quad) } as const;
const ANIM_SNAP = { duration: 150, easing: Easing.out(Easing.quad) } as const;

function formatDisplayAmount(value: string): string {
  const parts = value.split('.');
  const intPart = parts[0] ?? '0';
  const decPart = parts[1];
  const withSep = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return decPart !== undefined ? `${withSep}.${decPart}` : withSep;
}

export function TransactionDrawer(): React.JSX.Element {
  const { isOpen, close } = useTransactionDrawerStore();
  const { height: screenH } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const colors = useTheme();

  const translateY = useSharedValue(screenH);
  const [visible, setVisible] = useState(false);

  const [step, setStep] = useState<1 | 2>(1);
  const [type, setType] = useState<TxnType>('expense');
  const [amount, setAmount] = useState('0');
  const [accountId, setAccountId] = useState<number | null>(null);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [date, setDate] = useState(todayIso());
  const [note, setNote] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [accountHydrated, setAccountHydrated] = useState(false);

  const accountsQuery = useAccounts();
  const lastAccountQuery = useSetting(LAST_ACCOUNT_KEY);
  const categoriesQuery = useActiveCategories(type);
  const create = useCreateTransaction();
  const setSetting = useSetSetting();

  useEffect(() => {
    if (accountHydrated || !accountsQuery.data || !lastAccountQuery.isFetched) return;
    let cancelled = false;
    const accounts = accountsQuery.data;
    const lastRaw = lastAccountQuery.data;
    void Promise.resolve().then(() => {
      if (cancelled) return;
      const lastId = typeof lastRaw === 'string' ? parseInt(lastRaw, 10) : NaN;
      const fallback = accounts[0]?.id ?? null;
      const initial = accounts.some((a) => a.id === lastId) ? lastId : fallback;
      setAccountId(initial);
      setAccountHydrated(true);
    });
    return () => {
      cancelled = true;
    };
  }, [accountHydrated, accountsQuery.data, lastAccountQuery.data, lastAccountQuery.isFetched]);

  useEffect(() => {
    if (isOpen) {
      /* eslint-disable react-hooks/set-state-in-effect -- resetting all form fields on open is intentional */
      setStep(1);
      setType('expense');
      setAmount('0');
      setCategoryId(null);
      setDate(todayIso());
      setNote('');
      setShowCalendar(false);
      setVisible(true);
      /* eslint-enable react-hooks/set-state-in-effect */
      cancelAnimation(translateY);
      translateY.value = screenH;
      translateY.value = withTiming(0, ANIM_OPEN);
    } else {
      translateY.value = withTiming(screenH, ANIM_CLOSE, (finished) => {
        if (finished) runOnJS(setVisible)(false);
      });
    }
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  const pathname = usePathname();
  useEffect(() => {
    if (isOpen) close();
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      if (e.translationY > 0) {
        // eslint-disable-next-line react-hooks/immutability -- Reanimated SharedValue assignment is its public API
        translateY.value = e.translationY;
      }
    })
    .onEnd((e) => {
      if (e.translationY > 80 || e.velocityY > 800) {
        runOnJS(close)();
      } else {
        // eslint-disable-next-line react-hooks/immutability -- Reanimated SharedValue assignment is its public API
        translateY.value = withTiming(0, ANIM_SNAP);
      }
    });

  const panelAnimStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const numericAmount = useMemo(() => parseFloat(amount), [amount]);
  const canNext = categoryId !== null;
  const canSave = canNext && Number.isFinite(numericAmount) && numericAmount > 0;

  const currency = useMemo(() => {
    if (!accountId || !accountsQuery.data) return 'INR';
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
    create.mutate(payload, {
      onSuccess: () => {
        setSetting.mutate({ key: LAST_ACCOUNT_KEY, value: String(accountId) });
        close();
      },
      onError: (err) => Alert.alert('Could not save', err.message),
    });
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={close}
    >
      <GestureHandlerRootView style={styles.root}>
        <Pressable style={styles.backdrop} onPress={close} />
        <Animated.View
          style={[styles.panel, { backgroundColor: colors.background }, panelAnimStyle]}
        >
          <GestureDetector gesture={panGesture}>
            <View style={styles.handleArea} accessibilityRole="none">
              <View style={[styles.handle, { backgroundColor: colors.border }]} />
            </View>
          </GestureDetector>

          {step === 1 ? (
            <>
              <ScrollView
                style={styles.stepScroll}
                contentContainerStyle={styles.stepContent}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
              >
                <View style={styles.typeRow}>
                  <TypeToggle
                    value={type}
                    onChange={(t) => {
                      setType(t);
                      setCategoryId(null);
                    }}
                  />
                </View>

                <View style={[styles.divider, { backgroundColor: colors.border }]} />
                <NoteRow value={note} onChangeText={setNote} />

                <View style={[styles.divider, { backgroundColor: colors.border }]} />
                <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>Account</Text>
                {accountsQuery.data !== undefined ? (
                  <AccountPicker
                    accounts={accountsQuery.data}
                    selectedId={accountId}
                    onSelect={setAccountId}
                  />
                ) : null}

                <View style={[styles.divider, { backgroundColor: colors.border }]} />
                <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>Category</Text>
                <ScrollView
                  style={styles.categoryScroll}
                  nestedScrollEnabled
                  showsVerticalScrollIndicator={false}
                >
                  {categoriesQuery.data !== undefined ? (
                    <CategoryPicker
                      categories={categoriesQuery.data}
                      selectedId={categoryId}
                      onSelect={setCategoryId}
                    />
                  ) : null}
                </ScrollView>
              </ScrollView>

              <View
                style={[
                  styles.footer,
                  {
                    borderTopColor: colors.border,
                    paddingBottom: insets.bottom + Spacing.two,
                  },
                ]}
              >
                <TouchableOpacity
                  onPress={() => setStep(2)}
                  disabled={!canNext}
                  activeOpacity={0.8}
                  accessibilityRole="button"
                  accessibilityLabel="Next step"
                  style={[
                    styles.nextBtn,
                    { backgroundColor: canNext ? colors.primary : colors.backgroundElement },
                  ]}
                >
                  <Text
                    style={[styles.nextText, { color: canNext ? '#FFFFFF' : colors.textSecondary }]}
                  >
                    Next
                  </Text>
                  <Ionicons
                    name="arrow-forward"
                    size={16}
                    color={canNext ? '#FFFFFF' : colors.textSecondary}
                  />
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <View style={[styles.step2Header, { borderBottomColor: colors.border }]}>
                <TouchableOpacity
                  onPress={() => setStep(1)}
                  hitSlop={12}
                  accessibilityRole="button"
                  accessibilityLabel="Back to details"
                >
                  <Text style={[styles.backText, { color: colors.textSecondary }]}>← Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleSave}
                  disabled={!canSave || create.isPending}
                  hitSlop={12}
                  accessibilityRole="button"
                  accessibilityLabel="Save transaction"
                >
                  <Text
                    style={[
                      styles.saveText,
                      {
                        color: canSave && !create.isPending ? colors.primary : colors.textSecondary,
                      },
                    ]}
                  >
                    {create.isPending ? '...' : 'Save'}
                  </Text>
                </TouchableOpacity>
              </View>

              <Text
                style={[
                  styles.amountDisplay,
                  { color: type === 'income' ? colors.income : colors.expense },
                ]}
                numberOfLines={1}
                adjustsFontSizeToFit
              >
                {currencySymbol(currency)} {formatDisplayAmount(amount)}
              </Text>

              <View style={[styles.divider, { backgroundColor: colors.border }]} />
              <DateRow
                value={date}
                onChange={setDate}
                onCenterPress={() => setShowCalendar((v) => !v)}
              />
              <View style={[styles.divider, { backgroundColor: colors.border }]} />

              {showCalendar ? (
                <ScrollView showsVerticalScrollIndicator={false}>
                  <InlineCalendar
                    value={date}
                    onChange={(d) => {
                      setDate(d);
                      setShowCalendar(false);
                    }}
                  />
                </ScrollView>
              ) : (
                <View style={{ paddingBottom: insets.bottom + Spacing.three }}>
                  <NumericKeypad value={amount} onChange={setAmount} />
                </View>
              )}
            </>
          )}
        </Animated.View>
      </GestureHandlerRootView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  panel: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  handleArea: {
    paddingVertical: Spacing.two,
    alignItems: 'center',
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
  },
  stepScroll: { flexShrink: 1 },
  stepContent: {
    paddingBottom: Spacing.two,
  },
  typeRow: {
    alignItems: 'center',
    paddingVertical: Spacing.two,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    fontFamily: Fonts.bold,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.two,
    paddingBottom: Spacing.one,
  },
  categoryScroll: {
    height: 168,
  },
  footer: {
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.two,
    borderTopWidth: StyleSheet.hairlineWidth,
    alignItems: 'flex-end',
  },
  nextBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    paddingHorizontal: Spacing.three,
    paddingVertical: 10,
    borderRadius: 12,
  },
  nextText: {
    fontSize: 15,
    fontWeight: '600',
    fontFamily: Fonts.semibold,
  },
  step2Header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  backText: {
    fontSize: 15,
    fontFamily: Fonts.medium,
  },
  saveText: {
    fontSize: 15,
    fontWeight: '700',
    fontFamily: Fonts.bold,
  },
  amountDisplay: {
    fontSize: 40,
    fontWeight: '700',
    fontFamily: Fonts.bold,
    letterSpacing: -1,
    textAlign: 'center',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
  },
});
