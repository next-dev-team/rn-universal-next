import { Box, Center, Text, useTheme } from 'native-base'
import { IPlayer } from './type'
import AntDesign from '@expo/vector-icons/AntDesign'

const Player = ({
  height,
}: IPlayer & {
  height: number
}) => {
  return (
    <Center
      bg={'red.100'}
      position="absolute"
      bottom={0}
      width="full"
      h={height / 2}
    >
      <Text>coming soon</Text>
    </Center>
  )
}

export default Player
