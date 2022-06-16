import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Box, ChevronLeftIcon, Row, Text } from 'native-base'

import { HomeScreen } from '../../features/home/screen'
import { UserDetailScreen } from '../../features/user/detail-screen'
import { Link as SolitoLink } from 'solito/link'

const Stack = createNativeStackNavigator<{
  home: undefined
  'user-detail': {
    id: string
  }
}>()

export function NativeNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: ({ route }) => {
          const title = route?.params?.title

          if (!title) return null
          return (
            <Box px={5} py={2} bg="gray.200">
              <Row alignItems="center" space="1">
                <SolitoLink href="/">
                  <ChevronLeftIcon size="md" color="blue.500" />
                </SolitoLink>
                <Text fontSize="md" bold>
                  {title}
                </Text>
              </Row>
            </Box>
          )
        },
      }}
    >
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="user-detail" component={UserDetailScreen} />
    </Stack.Navigator>
  )
}
