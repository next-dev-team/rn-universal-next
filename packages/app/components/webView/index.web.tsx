import { Box, Text } from 'native-base'
import { WebView } from 'react-native-webview'

import { IPlayer } from './type'

const Player = ({ uri }: IPlayer) => {
  return (
    <iframe
      width="100%"
      height="100%"
      src={uri}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  )
}

export default Player
