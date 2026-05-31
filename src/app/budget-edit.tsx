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

import { confirm } from '@/components/common/confirm-dialog';
import { PickerRow, type PickerOption } from '@/components/common/picker-row';
import { SectionTitle } from '@/components/common/section-title';
import { Spacing } from '@/constants/theme';
import { useBudgetForCategory, useDeleteBudget, useUpsertBudget } from '@/hooks/use-budgets';
import { useCategories } from '@/hooks/use-categories';
import { useTheme } from '@/hooks/use-theme';

export default function BudgetEditScreen(): React.JSX.Element {
  const colors = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams<{
    category_id?: string;
    year?: string;
    month?: string;
    new?: string;
  }>();

  const year = parseInt(params.year ?? String(new Date().getUTCFullYear()), 10);
  const month = parseInt(params.month ?? String(new Date().getUTCMonth() + 1), 10);

  const rawCat = params.category_id;
  const initialCategoryId =
    typeof rawCat === 'string' && Number.isFinite(parseInt(rawCat, 10))
      ? parseInt(rawCat, 10)
      : null;

  const isNewCategoryBudget = params.new === '1';
  const [categoryId, setCategoryId] = useState<number | null>(initialCategoryId);
  const existing = useBudgetForCategory(categoryId, year, month);
  const categories = useCategories();
  const [amount, setAmount] = useState<string>('');
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (hydrated) return;
    if (existing.data === undefined) return;
    void Promise.resolve().then(() => {
      setAmount(existing.data === null ? '' : String(existing.data.amount));
      setHydrated(true);
    });
  }, [existing.data, hydrated]);

  const upsert = useUpsertBudget();
  const remove = useDeleteBudget();

  const handleSave = (): void => {
    const num = parseFloat(amount);
    if (!Number.isFinite(num) || num <= 0) {
      Alert.alert('Invalid amount', 'Enter a positive number');
      return;
    }
    upsert.mutate(
      {
        category_id: categoryId,
        amount: num,
        period: 'monthly',
        year,
        month,
      },
      {
        onSuccess: () => router.back(),
        onError: (err) => Alert.alert('Save failed', err.message),
      },
    );
  };

  const handleDelete = async (): Promise<void> => {
    const ok = await confirm({
      title: 'Remove budget?',
      confirmLabel: 'Remove',
      destructive: true,
    });
    if (!ok) return;
    remove.mutate(
      { categoryId, year, month },
      {
        onSuccess: () => router.back(),
      },
    );
  };

  const categoryOptions: readonly PickerOption<number>[] = (categories.data ?? [])
    .filter((c) => !c.is_archived && !c.is_income && c.name !== 'Transfer')
    .map((c) => ({ key: c.id, label: c.name }));

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
          {categoryId === null ? 'Total monthly' : 'Category budget'}
        </Text>
        <TouchableOpacity onPress={handleSave} accessibilityRole="button">
          <Text style={[styles.headerBtn, { color: colors.primary, fontWeight: '700' }]}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {isNewCategoryBudget && categoryId === null && (
          <View style={styles.field}>
            <SectionTitle>Category</SectionTitle>
            <PickerRow
              options={categoryOptions}
              selectedKey={categoryId ?? -1}
              onSelect={(k) => setCategoryId(k)}
            />
          </View>
        )}

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

        {existing.data !== null && existing.data !== undefined && (
          <TouchableOpacity
            onPress={() => void handleDelete()}
            accessibilityRole="button"
            style={[styles.removeBtn, { borderColor: colors.expense }]}
          >
            <Text style={[styles.removeText, { color: colors.expense }]}>Remove budget</Text>
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
  removeBtn: {
    marginTop: Spacing.three,
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: Spacing.two,
    alignItems: 'center',
  },
  removeText: { fontSize: 14, fontWeight: '700' },
});
