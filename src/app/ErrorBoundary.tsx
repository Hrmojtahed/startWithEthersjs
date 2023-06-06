import React, {ErrorInfo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Button from '../components/Button/Button';
import RNRestart from 'react-native-restart';
import {colors} from '../utils/styles/color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
interface ErrorBoundaryState {
  error: Error | null;
}

export class ErrorBoundary extends React.Component<any, ErrorBoundaryState> {
  constructor(props: unknown) {
    super(props);
    this.state = {error: null};
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {error};
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {}

  render(): React.ReactNode {
    const {error} = this.state;
    if (error !== null) {
      return <ErrorScreen error={error} />;
    }

    return this.props.children;
  }
}

function ErrorScreen({error}: {error: Error}) {
  function resetApp() {
    RNRestart.restart();
  }
  const safeArea = useSafeAreaInsets();
  return (
    <View style={styles.container}>
      <View style={styles.errorContainer}>
        <Ionicons
          name="warning-outline"
          size={60}
          color={'red'}
          style={styles.icon}
        />
        {error.message && __DEV__ && (
          <Text style={styles.errorText}>{error.message}</Text>
        )}
      </View>
      <Button
        text="Restart App"
        onPress={resetApp}
        buttonStyle={{marginBottom: safeArea.bottom}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    backgroundColor: colors.lightGray,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 19,
    color: colors.secondary,
  },
  icon: {
    marginBottom: 48,
  },
});
