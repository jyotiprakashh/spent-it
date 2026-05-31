import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PageDots } from '@/components/onboarding/page-dots';
import { Slide } from '@/components/onboarding/slide';
import { Spacing } from '@/constants/theme';
import { useSetSetting } from '@/hooks/use-settings';
import { useTheme } from '@/hooks/use-theme';
import { SETTING_KEYS } from '@/services/settings-service';

const SLIDES = [
  {
    icon: 'lock-closed-outline' as const,
    title: 'Your money stays here',
    body: 'No accounts. No cloud sync. No tracking. SpentIt is 100% offline — your data never leaves your phone.',
  },
  {
    icon: 'add-circle-outline' as const,
    title: 'Log expenses in seconds',
    body: "Tap +, pick a category and account, type an amount. That's it.",
  },
  {
    icon: 'cloud-upload-outline' as const,
    title: 'Back up regularly',
    body: "Create an encrypted backup file you control. We'll nudge you weekly.",
  },
];

export default function OnboardingScreen(): React.JSX.Element {
  const colors = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const setSetting = useSetSetting();
  const screenWidth = Dimensions.get('window').width;
  const scrollRef = useRef<ScrollView>(null);
  const [current, setCurrent] = useState(0);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>): void => {
    const next = Math.round(e.nativeEvent.contentOffset.x / screenWidth);
    if (next !== current) setCurrent(next);
  };

  const finish = (): void => {
    setSetting.mutate(
      { key: SETTING_KEYS.onboardingDone, value: '1' },
      { onSuccess: () => router.replace('/(tabs)') },
    );
  };

  const next = (): void => {
    if (current === SLIDES.length - 1) {
      finish();
      return;
    }
    scrollRef.current?.scrollTo({ x: (current + 1) * screenWidth, animated: true });
  };

  return (
    <View style={[styles.root, { backgroundColor: colors.background, paddingTop: insets.top }]}>
      <View style={styles.skipRow}>
        <TouchableOpacity
          onPress={finish}
          accessibilityRole="button"
          accessibilityLabel="Skip onboarding"
        >
          <Text style={[styles.skipText, { color: colors.textSecondary }]}>Skip</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
      >
        {SLIDES.map((s, i) => (
          <Slide key={i} icon={s.icon} title={s.title} body={s.body} width={screenWidth} />
        ))}
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + Spacing.four }]}>
        <PageDots count={SLIDES.length} current={current} />
        <TouchableOpacity
          onPress={next}
          accessibilityRole="button"
          accessibilityLabel={current === SLIDES.length - 1 ? 'Get started' : 'Next'}
          activeOpacity={0.85}
          style={[styles.button, { backgroundColor: colors.primary }]}
        >
          <Text style={[styles.buttonText, { color: colors.background }]}>
            {current === SLIDES.length - 1 ? 'Get started' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  skipRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
  },
  skipText: { fontSize: 14, fontWeight: '600' },
  footer: {
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.three,
    gap: Spacing.three,
  },
  button: {
    paddingVertical: Spacing.three,
    borderRadius: 14,
    alignItems: 'center',
  },
  buttonText: { fontSize: 16, fontWeight: '700' },
});
