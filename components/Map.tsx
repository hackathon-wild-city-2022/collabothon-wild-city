import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function Map() {
  return (
    <View style={{ flex: 1, margin: 20 }}>
      <WebView
        style={{ flex: 1, marginTop: 20 }}
        originWhitelist={['*']}
        javaScriptEnabled={true}
        source={{
          html: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d519.1109834709877!2d19.412297488615046!3d51.7637231153177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471a354f3832d661%3A0xf13d6ea04c0d355e!2zT3JpZW50YXJpdW0gWk9PIMWBw7Nkxbo!5e0!3m2!1spl!2spl!4v1657768681494!5m2!1spl!2spl" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`
        }}
      />
    </View>
  );
}
