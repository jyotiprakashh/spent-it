import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { Stack, useRouter } from 'expo-router';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Card } from '@/components/common/card';
import { SectionTitle } from '@/components/common/section-title';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function RestoreScreen(): React.JSX.Element {
  const colors = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const pickFile = async (): Promise<void> => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ['*/*'],
      copyToCacheDirectory: true,
      multiple: false,
    });
    if (result.canceled) return;
    const asset = result.assets[0];
    const name = asset.name.toLowerCase();
    if (name.endsWith('.spentit')) {
      router.push({
        pathname: '/backup-passphrase',
        params: { intent: 'import', uri: asset.uri, name: asset.name },
      });
      return;
    }
    if (name.endsWith('.json')) {
      router.push({
        pathname: '/settings/backup-preview',
        params: { uri: asset.uri, name: asset.name, format: 'json' },
      });
      return;
    }
    Alert.alert('Unsupported file', 'Pick a .spentit (encrypted) or .json backup file.');
  };

  return (
    <View style={[styles.root, { backgroundColor: colors.background, paddingTop: insets.top }]}>
      <Stack.Screen options={{ title: 'Restore', headerShown: true }} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Card>
          <SectionTitle>Important</SectionTitle>
          <Text style={[styles.body, { color: colors.text }]}>
            Restoring a backup replaces all current data on this device. Existing accounts,
            transactions, categories, and budgets will be overwritten.
          </Text>
          <Text style={[styles.body, { color: colors.textSecondary }]}>
            Your encryption key, biometric setting, theme, and lock-timeout will be preserved.
          </Text>
        </Card>

        <TouchableOpacity
          onPress={() => void pickFile()}
          accessibilityRole="button"
          accessibilityLabel="Choose backup file"
          activeOpacity={0.85}
          style={[styles.pickBtn, { backgroundColor: colors.primary }]}
        >
          <Ionicons name="folder-open-outline" size={18} color={colors.background} />
          <Text style={[styles.pickText, { color: colors.background }]}>Choose backup file</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { padding: Spacing.three, gap: Spacing.three },
  body: { fontSize: 14, lineHeight: 20, marginTop: 4 },
  pickBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
    paddingVertical: Spacing.three,
    borderRadius: 14,
  },
  pickText: { fontSize: 15, fontWeight: '700' },
});
