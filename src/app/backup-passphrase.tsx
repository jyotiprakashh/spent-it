import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { LoadingOverlay } from '@/components/common/loading-overlay';
import { PassphraseInput } from '@/components/common/passphrase-input';
import { SectionTitle } from '@/components/common/section-title';
import { Spacing } from '@/constants/theme';
import { useExportEncrypted } from '@/hooks/use-export';
import { useImportEncrypted } from '@/hooks/use-import';
import { useTheme } from '@/hooks/use-theme';

const MIN_PASSPHRASE = 8;

export default function BackupPassphraseScreen(): React.JSX.Element {
  const colors = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams<{ intent?: string; uri?: string; name?: string }>();
  const intent = params.intent === 'import' ? 'import' : 'export';
  const fileName = typeof params.name === 'string' ? params.name : 'Backup';

  const [passphrase, setPassphrase] = useState('');
  const [confirm, setConfirm] = useState('');

  const exportMut = useExportEncrypted();
  const importMut = useImportEncrypted();
  const busy = exportMut.isPending || importMut.isPending;

  const handleSubmit = (): void => {
    if (intent === 'export') {
      if (passphrase.length < MIN_PASSPHRASE) {
        Alert.alert('Weak passphrase', `Use at least ${MIN_PASSPHRASE} characters.`);
        return;
      }
      if (passphrase !== confirm) {
        Alert.alert('Mismatch', 'Passphrases do not match.');
        return;
      }
      exportMut.mutate(passphrase, {
        onSuccess: () => router.back(),
        onError: (err) => Alert.alert('Export failed', err.message),
      });
      return;
    }
    if (typeof params.uri !== 'string' || params.uri.length === 0) {
      Alert.alert('Missing file', 'Re-pick the backup file.');
      return;
    }
    if (passphrase.length === 0) {
      Alert.alert('Passphrase required', 'Enter the passphrase that protects this backup.');
      return;
    }
    importMut.mutate(
      { uri: params.uri, passphrase },
      {
        onSuccess: () => {
          Alert.alert('Restore complete', 'Your data has been replaced.', [
            { text: 'OK', onPress: () => router.replace('/(tabs)') },
          ]);
        },
        onError: (err) => Alert.alert('Restore failed', err.message),
      },
    );
  };

  const submitLabel = intent === 'export' ? 'Create encrypted backup' : 'Decrypt and restore';

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
          {intent === 'export' ? 'New backup' : fileName}
        </Text>
        <View style={{ width: 50 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={[styles.intro, { color: colors.textSecondary }]}>
          {intent === 'export'
            ? `Choose a passphrase to protect this backup. Write it down — there is no recovery if you forget it.`
            : `Enter the passphrase you used when this backup was created.`}
        </Text>

        <View style={styles.field}>
          <SectionTitle>Passphrase</SectionTitle>
          <PassphraseInput
            value={passphrase}
            onChangeText={setPassphrase}
            placeholder="At least 8 characters"
            showStrength={intent === 'export'}
            autoFocus
          />
        </View>

        {intent === 'export' && (
          <View style={styles.field}>
            <SectionTitle>Confirm passphrase</SectionTitle>
            <PassphraseInput
              value={confirm}
              onChangeText={setConfirm}
              placeholder="Re-enter passphrase"
            />
          </View>
        )}

        <TouchableOpacity
          onPress={handleSubmit}
          accessibilityRole="button"
          accessibilityLabel={submitLabel}
          activeOpacity={0.85}
          style={[styles.submit, { backgroundColor: colors.primary }]}
          disabled={busy}
        >
          <Text style={[styles.submitText, { color: colors.background }]}>{submitLabel}</Text>
        </TouchableOpacity>
      </ScrollView>

      <LoadingOverlay
        visible={busy}
        label={intent === 'export' ? 'Encrypting backup...' : 'Decrypting and restoring...'}
      />
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
  intro: { fontSize: 13, lineHeight: 18 },
  field: { gap: Spacing.one },
  submit: {
    paddingVertical: Spacing.three,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: Spacing.two,
  },
  submitText: { fontSize: 15, fontWeight: '700' },
});
