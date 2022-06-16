const { useNavigation } =
  Platform.OS !== 'web' ? require('@react-navigation/native') : {}

import { Platform } from 'react-native'

export default function useNav() {
  const { setParams } = useNavigation?.() || {}

  if (Platform.OS === 'web') {
    return {}
  }

  return { setParams }
}
