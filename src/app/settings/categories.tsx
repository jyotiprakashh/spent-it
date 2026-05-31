import { Stack, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, ToastAndroid, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AddTile, CategoryTile } from '@/components/categories/category-tile';
import { Chip } from '@/components/common/chip';
import { Spacing } from '@/constants/theme';
import { useCategories } from '@/hooks/use-categories';
import { useTheme } from '@/hooks/use-theme';
import type { TxnType } from '@/types';

export default function CategoriesScreen(): React.JSX.Element {
  const colors = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [activeType, setActiveType] = useState<TxnType>('expense');
  const query = useCategories();

  const filtered = useMemo(() => {
    const all = query.data ?? [];
    return all.filter(
      (c) => !c.is_archived && c.is_income === (activeType === 'income') && c.name !== 'Transfer',
    );
  }, [query.data, activeType]);

  const notifySystem = (): void => {
    if (typeof ToastAndroid !== 'undefined' && ToastAndroid?.show !== undefined) {
      ToastAndroid.show('System category — cannot be edited', ToastAndroid.SHORT);
    }
  };

  return (
    <View style={[styles.root, { backgroundColor: colors.background, paddingTop: insets.top }]}>
      <Stack.Screen options={{ title: 'Categories', headerShown: true }} />
      <View style={styles.tabs}>
        <Chip
          label="Expense"
          selected={activeType === 'expense'}
          onPress={() => setActiveType('expense')}
        />
        <Chip
          label="Income"
          selected={activeType === 'income'}
          onPress={() => setActiveType('income')}
        />
      </View>
      <ScrollView contentContainerStyle={styles.grid}>
        {filtered.map((c) => (
          <CategoryTile
            key={c.id}
            category={c}
            onPress={() => {
              if (c.is_system) notifySystem();
              else router.push({ pathname: '/category-edit', params: { id: String(c.id) } });
            }}
            onLongPress={() => {
              if (c.is_system) notifySystem();
              else router.push({ pathname: '/category-edit', params: { id: String(c.id) } });
            }}
          />
        ))}
        <AddTile
          onPress={() => router.push({ pathname: '/category-edit', params: { type: activeType } })}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  tabs: {
    flexDirection: 'row',
    gap: Spacing.one,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
    padding: Spacing.three,
  },
});
