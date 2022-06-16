import {
  Box,
  Center,
  HStack,
  Icon,
  NativeBaseProvider,
  Pressable,
  Text,
} from 'native-base'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign'
import { Platform } from 'react-native'

export default function Footer() {
  const [selected, setSelected] = React.useState(0)
  return (
    <Box position="absolute" bottom={0} w="full">
      <HStack bg="indigo.600" alignItems="center" shadow={6}>
        <Pressable
          opacity={selected === 0 ? 1 : 0.5}
          py="3"
          flex={1}
          onPress={() => setSelected(0)}
        >
          <Center>
            <Icon
              mb="1"
              as={<AntDesign name={selected === 0 ? 'CodeSandbox' : 'home'} />}
              color="white"
              size="sm"
            />
            <Text color="white" fontSize="12">
              Home
            </Text>
          </Center>
        </Pressable>
        <Pressable
          opacity={selected === 1 ? 1 : 0.5}
          py="3"
          flex={1}
          onPress={() => setSelected(1)}
        >
          <Center>
            <Icon
              mb="1"
              as={<AntDesign name={selected === 0 ? 'CodeSandbox' : 'home'} />}
              color="white"
              size="sm"
            />
            <Text color="white" fontSize="12">
              Home
            </Text>
          </Center>
        </Pressable>
      </HStack>
    </Box>
  )
}
