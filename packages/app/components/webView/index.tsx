import { Box, Center, Text, useTheme } from 'native-base'
import { IPlayer } from './type'
import { WebView } from 'react-native-webview'

const WebViewMobile = ({ uri }: IPlayer) => {
  return <WebView source={{ uri }} allowsFullscreenVideo  />
}

export default WebViewMobile
