import * as LocalAuthentication from 'expo-local-authentication';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import { Colors, Fonts, Spacing } from '@/constants/theme';

type AuthGateProps = {
  onAuthenticated: () => void;
};

type AuthState = 'authenticating' | 'failed';

export function AuthGate({ onAuthenticated }: AuthGateProps): React.JSX.Element {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];
  // Default to 'authenticating' so the effect never sets state synchronously
  const [authState, setAuthState] = useState<AuthState>('authenticating');

  const tryAuthenticate = (): void => {
    void (async () => {
      try {
        const result = await LocalAuthentication.authenticateAsync({
          promptMessage: 'Unlock SpentIt',
          fallbackLabel: 'Use Passcode',
          disableDeviceFallback: false,
          cancelLabel: 'Cancel',
        });
        if (result.success) {
          onAuthenticated();
        } else {
          setAuthState('failed');
        }
      } catch {
        setAuthState('failed');
      }
    })();
  };

  useEffect(() => {
    tryAuthenticate();
    // Stable reference — no deps needed; function is defined in component scope
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRetry = (): void => {
    setAuthState('authenticating');
    tryAuthenticate();
  };

  return (
    <View
      style={[styles.container, { backgroundColor: colors.background }]}
      accessibilityViewIsModal
    >
      <Text style={[styles.title, { color: colors.text }]}>SpentIt</Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        Your private expense tracker
      </Text>

      {authState === 'authenticating' ? (
        <ActivityIndicator
          size="large"
          color={colors.primary}
          style={styles.indicator}
          accessibilityLabel="Authenticating"
        />
      ) : (
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={handleRetry}
          accessibilityLabel="Unlock SpentIt"
          accessibilityRole="button"
        >
          <Text style={styles.buttonText}>Unlock</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.three,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    fontFamily: Fonts.bold,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: Fonts.regular,
  },
  indicator: {
    marginTop: Spacing.four,
  },
  button: {
    marginTop: Spacing.four,
    paddingHorizontal: Spacing.five,
    paddingVertical: Spacing.two,
    borderRadius: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: Fonts.semibold,
  },
});
