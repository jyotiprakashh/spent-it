import { Stack } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Card } from '@/components/common/card';
import { EmptyState } from '@/components/common/empty-state';
import { Spacing } from '@/constants/theme';
import { useDb } from '@/db/context';
import { ErrorRepository } from '@/db/repositories/error-repository';
import { useTheme } from '@/hooks/use-theme';
import { qk } from '@/hooks/query-keys';
import type { AccountErrorRow } from '@/types';

export default function ErrorLogScreen(): React.JSX.Element {
  const colors = useTheme();
  const insets = useSafeAreaInsets();
  const db = useDb();
  const repo = useMemo(() => new ErrorRepository(db), [db]);
  const query = useQuery<AccountErrorRow[], Error>({
    queryKey: qk.errorLog(50),
    queryFn: () => repo.getRecent(50),
  });

  return (
    <View style={[styles.root, { backgroundColor: colors.background, paddingTop: insets.top }]}>
      <Stack.Screen options={{ title: 'Error log', headerShown: true }} />
      {query.data?.length === 0 ? (
        <View style={styles.empty}>
          <EmptyState
            icon="checkmark-circle-outline"
            title="No errors logged"
            subtitle="The app has been running cleanly"
          />
        </View>
      ) : (
        <FlatList
          data={query.data ?? []}
          keyExtractor={(e) => String(e.id)}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <Card>
              <Text style={[styles.message, { color: colors.text }]}>{item.message}</Text>
              <Text style={[styles.meta, { color: colors.textSecondary }]}>{item.occurred_at}</Text>
              {item.stack !== null && (
                <Text style={[styles.stack, { color: colors.textSecondary }]} numberOfLines={6}>
                  {item.stack}
                </Text>
              )}
            </Card>
          )}
          ItemSeparatorComponent={() => <View style={styles.sep} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: { padding: Spacing.three, gap: Spacing.two },
  sep: { height: Spacing.two },
  message: { fontSize: 14, fontWeight: '600' },
  meta: { fontSize: 11, marginTop: 4 },
  stack: { fontSize: 11, marginTop: 8, fontFamily: 'Courier' },
});
