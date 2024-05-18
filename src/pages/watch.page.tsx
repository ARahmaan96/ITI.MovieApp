import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import {WebView} from 'react-native-webview';
import {RouteProp, useRoute} from '@react-navigation/native';

const WatchPage = () => {
  const {
    params: {url},
  } = useRoute<RouteProp<RootStackParamList, 'watch_page'>>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = setTimeout(() => {
      setIsLoading(false);
    }, 2e3);
    if (!url) {
      setIsLoading(false);
    }
    return () => clearTimeout(unsubscribe);
  }, [url]);

  return (
    <View style={styles.container}>
      {url ? (
        isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        ) : (
          <WebView source={{uri: url}} style={styles.webView} />
        )
      ) : (
        <Text style={styles.errorMsg}>Error: URL Not Found!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
  webView: {
    width: '100%',
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111',
  },
  loadingText: {
    color: '#fff',
    fontSize: 18,
    marginTop: 10,
  },
  errorMsg: {
    color: '#eee',
    fontSize: 25,
    textAlign: 'center',
    textAlignVertical: 'center',
    flex: 1,
  },
});

export default WatchPage;
