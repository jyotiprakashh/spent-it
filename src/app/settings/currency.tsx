import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CURRENCIES, type CurrencyOption } from '@/constants/currencies';
import { Spacing } from '@/constants/theme';
import { useCurrency, useSetSetting } from '@/hooks/use-settings';
import { useTheme } from '@/hooks/use-theme';
import { SETTING_KEYS } from '@/services/settings-service';

export default function CurrencyPickerScreen(): React.JSX.Element {
  const colors = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const current = useCurrency();
  const setSetting = useSetSetting();
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q === '') return CURRENCIES;
    return CURRENCIES.filter(
      (c) => c.code.toLowerCase().includes(q) || c.name.toLowerCase().includes(q),
    );
  }, [query]);

  const onSelect = (c: CurrencyOption): void => {
    setSetting.mutate(
      { key: SETTING_KEYS.currency, value: c.code },
      { onSuccess: () => router.back() },
    );
  };

  return (
    <View style={[styles.root, { backgroundColor: colors.background, paddingTop: insets.top }]}>
      <Stack.Screen options={{ title: 'Currency', headerShown: true }} />
      <View style={[styles.search, { backgroundColor: colors.backgroundElement }]}>
        <Ionicons name="search" size={16} color={colors.textSecondary} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search currencies"
          placeholderTextColor={colors.textSecondary}
          style={[styles.input, { color: colors.text }]}
          autoCorrect={false}
          autoCapitalize="characters"
        />
      </View>
      <FlatList
        data={filtered}
        keyExtractor={(c) => c.code}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const isSelected = item.code === current;
          return (
            <TouchableOpacity
              onPress={() => onSelect(item)}
              activeOpacity={0.7}
              style={styles.row}
              accessibilityRole="button"
              accessibilityLabel={`${item.code} ${item.name}`}
              accessibilityState={{ selected: isSelected }}
            >
              <Text style={[styles.symbol, { color: colors.text }]}>{item.symbol}</Text>
              <View style={styles.codeWrap}>
                <Text style={[styles.code, { color: colors.text }]}>{item.code}</Text>
                <Text style={[styles.name, { color: colors.textSecondary }]} numberOfLines={1}>
                  {item.name}
                </Text>
              </View>
              {isSelected && <Ionicons name="checkmark" size={18} color={colors.primary} />}
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    marginHorizontal: Spacing.three,
    marginVertical: Spacing.two,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
    borderRadius: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    padding: 4,
  },
  list: {
    paddingHorizontal: Spacing.three,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingVertical: Spacing.two,
  },
  symbol: {
    width: 32,
    fontSize: 16,
    fontWeight: '700',
  },
  codeWrap: {
    flex: 1,
    gap: 2,
  },
  code: {
    fontSize: 14,
    fontWeight: '600',
  },
  name: {
    fontSize: 11,
  },
});
