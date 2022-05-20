import { Text } from 'native-base'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { IPlayer } from './type';

const Player = ({ audioRef, isVideoMode, url='', baseUrl }:IPlayer) => {
  return (
    <AudioPlayer
      autoPlay
      autoPlayAfterSrcChange={false}
      ref={audioRef}
      src={!isVideoMode ? (url.includes('http') ? url : baseUrl + url) : ''}
    />
  )
}

export default Player
