import React, { useState } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { SignInScreen } from '../screens/auth/SignInScreen';
import { SignUpScreen } from '../screens/auth/SignUpScreen';
import { HomeScreen } from '../screens/home/HomeScreen';
import { AuthMode } from '../types/auth';

export const RootNavigator: React.FC = () => {
  const { session, isLoading } = useAuth();
  const [authMode, setAuthMode] = useState<AuthMode>('signIn');

  // Loading Screen while checking local session
  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <View style={styles.loadingContent}>
          <Text style={styles.loadingLogo}>🏀 NBA PREDICTOR</Text>
          <ActivityIndicator size="large" color="#1D4ED8" style={styles.spinner} />
          <Text style={styles.loadingText}>Loading session...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Authentication Routing:
  // If not authenticated, redirect to Auth flow (SignIn / SignUp)
  if (!session) {
    return authMode === 'signIn' ? (
      <SignInScreen onNavigateToSignUp={() => setAuthMode('signUp')} />
    ) : (
      <SignUpScreen onNavigateToSignIn={() => setAuthMode('signIn')} />
    );
  }

  // If authenticated, route to main application
  return <HomeScreen />;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContent: {
    alignItems: 'center',
  },
  loadingLogo: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1D4ED8',
    marginBottom: 20,
    letterSpacing: 0.5,
  },
  spinner: {
    marginVertical: 12,
  },
  loadingText: {
    fontSize: 14,
    color: '#64748B',
  },
});
