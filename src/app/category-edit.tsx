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

import { ColorPicker } from '@/components/common/color-picker';
import { confirm } from '@/components/common/confirm-dialog';
import { IconPicker } from '@/components/common/icon-picker';
import { SectionTitle } from '@/components/common/section-title';
import { Chip } from '@/components/common/chip';
import { CATEGORY_ICONS, type IconName } from '@/constants/icons';
import { PALETTE } from '@/constants/colors';
import { Spacing } from '@/constants/theme';
import {
  useArchiveCategory,
  useCategory,
  useCreateCategory,
  useUpdateCategory,
} from '@/hooks/use-categories';
import { useTheme } from '@/hooks/use-theme';
import type { NewCategory, TxnType } from '@/types';

export default function CategoryEditScreen(): React.JSX.Element {
  const colors = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string; type?: string }>();
  const editId =
    typeof params.id === 'string' && Number.isFinite(parseInt(params.id, 10))
      ? parseInt(params.id, 10)
      : null;
  const editing = useCategory(editId);
  const initialType: TxnType = params.type === 'income' ? 'income' : 'expense';

  const [name, setName] = useState('');
  const [type, setType] = useState<TxnType>(initialType);
  const [icon, setIcon] = useState<IconName>('cart-outline');
  const [color, setColor] = useState<string>(PALETTE[0]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (editId === null || editing.data === null || editing.data === undefined || hydrated) return;
    const c = editing.data;
    void Promise.resolve().then(() => {
      setName(c.name);
      setType(c.is_income ? 'income' : 'expense');
      setIcon(c.icon as IconName);
      setColor(c.color);
      setHydrated(true);
    });
  }, [editId, editing.data, hydrated]);

  const create = useCreateCategory();
  const update = useUpdateCategory();
  const archive = useArchiveCategory();

  const handleSave = (): void => {
    const trimmed = name.trim();
    if (trimmed === '') {
      Alert.alert('Name required', 'Please enter a category name');
      return;
    }
    if (editId !== null) {
      update.mutate(
        { id: editId, patch: { name: trimmed, icon, color, is_income: type === 'income' } },
        {
          onSuccess: () => router.back(),
          onError: (err) => Alert.alert('Save failed', err.message),
        },
      );
    } else {
      const payload: NewCategory = {
        name: trimmed,
        icon,
        color,
        is_income: type === 'income',
        is_system: false,
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
      title: 'Archive category?',
      message: 'Existing transactions will still reference this category.',
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
          {editId !== null ? 'Edit category' : 'New category'}
        </Text>
        <TouchableOpacity onPress={handleSave} accessibilityRole="button">
          <Text style={[styles.headerBtn, { color: colors.primary, fontWeight: '700' }]}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.field}>
          <SectionTitle>Name</SectionTitle>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="e.g. Coffee"
            placeholderTextColor={colors.textSecondary}
            style={[
              styles.input,
              { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border },
            ]}
          />
        </View>

        {editId === null && (
          <View style={styles.field}>
            <SectionTitle>Type</SectionTitle>
            <View style={styles.typeRow}>
              <Chip
                label="Expense"
                selected={type === 'expense'}
                onPress={() => setType('expense')}
              />
              <Chip label="Income" selected={type === 'income'} onPress={() => setType('income')} />
            </View>
          </View>
        )}

        <View style={styles.field}>
          <SectionTitle>Icon</SectionTitle>
          <IconPicker icons={CATEGORY_ICONS} selected={icon} onSelect={setIcon} tintColor={color} />
        </View>

        <View style={styles.field}>
          <SectionTitle>Colour</SectionTitle>
          <ColorPicker selected={color} onSelect={setColor} />
        </View>

        {editId !== null && (
          <TouchableOpacity
            onPress={() => void handleArchive()}
            accessibilityRole="button"
            accessibilityLabel="Archive category"
            style={[styles.archive, { borderColor: colors.expense }]}
          >
            <Text style={[styles.archiveText, { color: colors.expense }]}>Archive category</Text>
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
  typeRow: { flexDirection: 'row', gap: Spacing.one },
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
