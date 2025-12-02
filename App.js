import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Dimensions, Platform } from 'react-native';
import Calculator from './src/components/Calculator';

const { width, height } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';

export default function App() {
  if (isWeb) {
    // Tampilan web dengan container mobile-like
    return (
      <View style={styles.webContainer}>
        <View style={styles.phoneFrame}>
          <SafeAreaView style={styles.container}>
            <Calculator />
            <StatusBar style="light" />
          </SafeAreaView>
        </View>
      </View>
    );
  }

  // Tampilan mobile native
  return (
    <SafeAreaView style={styles.container}>
      <Calculator />
      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Container untuk web - menyerupai layar HP
  webContainer: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  phoneFrame: {
    width: 375, // Lebar iPhone standar
    height: 720, // Tambah tinggi lagi untuk proporsi yang lebih nyaman
    backgroundColor: '#000',
    borderRadius: 40,
    borderWidth: 6,
    borderColor: '#2c2c2c',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 0.6,
    shadowRadius: 25,
    elevation: 25,
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
