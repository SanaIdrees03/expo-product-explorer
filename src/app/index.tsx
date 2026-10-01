import * as Device from 'expo-device';
import { useState } from 'react';
import { Image } from 'expo-image';
import { Platform, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AnimatedIcon } from '@/components/animated-icon';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WebBadge } from '@/components/web-badge';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';

function getDevMenuHint() {
  if (Platform.OS === 'web') {
    return 'Use browser devtools';
  }
  if (Device.isDevice) {
    return 'Shake device or press m in terminal';
  }
  const shortcut = Platform.OS === 'android' ? 'cmd+m (or ctrl+m)' : 'cmd+d';
  return `Press ${shortcut}`;
}

export default function HomeScreen() {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.heroSection}>
          <AnimatedIcon />
          <ThemedText type="title" style={styles.title}>
            Product Explorer
          </ThemedText>
          <ThemedText type="subtitle" style={styles.studentInfo}>
            Sana Idrees — 23i-2039
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.productCard}>
          <Image
            accessibilityLabel="Wireless headphones"
            source={{
              uri: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&q=80',
            }}
            style={styles.productImage}
            contentFit="cover"
          />
          <ThemedView style={styles.productDetails}>
            <ThemedText type="subtitle">Wireless Headphones</ThemedText>
            <ThemedText style={styles.price}>PKR 4,999</ThemedText>
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ expanded: showDetails }}
              onPress={() => setShowDetails((visible) => !visible)}
              style={styles.detailsButton}
            >
              <ThemedText style={styles.detailsButtonText}>
                {showDetails ? 'Hide Details' : 'View Details'}
              </ThemedText>
            </Pressable>
            {showDetails && (
              <ThemedText style={styles.description}>
                Enjoy clear, balanced sound and comfortable listening with these wireless headphones.
              </ThemedText>
            )}
          </ThemedView>
        </ThemedView>

        <ThemedText type="small" style={styles.devHint}>
          {getDevMenuHint()}
        </ThemedText>

        {Platform.OS === 'web' && <WebBadge />}
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  heroSection: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.four,
    gap: Spacing.one,
  },
  title: {
    textAlign: 'center',
  },
  studentInfo: {
    textAlign: 'center',
  },
  productCard: {
    alignSelf: 'stretch',
    overflow: 'hidden',
    borderRadius: Spacing.four,
    backgroundColor: '#ffffff',
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  productImage: {
    width: '100%',
    height: 65,
    backgroundColor: '#e8e8e8',
  },
  productDetails: {
    padding: Spacing.three,
    gap: Spacing.one,
  },
  price: {
    marginTop: Spacing.one,
    marginBottom: Spacing.one,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700',
    color: '#276749',
  },
  detailsButton: {
    alignSelf: 'flex-start',
    marginTop: Spacing.one,
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.two,
  },
  detailsButtonText: {
    color: '#276749',
    fontSize: 16,
    fontWeight: '700',
  },
  description: {
    marginTop: Spacing.two,
    color: '#343434',
    fontSize: 15,
    lineHeight: 22,
  },
  devHint: {
    textAlign: 'center',
  },
});

