import { Link as SolitoLink } from 'solito/link'
import React from 'react'
import BigList from 'react-native-big-list'
import * as Av from 'expo-av/build'

const expoAv = Platform.OS !== 'web' ? require('expo-av') : {}
import AntDesign from '@expo/vector-icons/AntDesign'
const { Audio } = expoAv as typeof Av

import {
  Center,
  VStack,
  Box,
  useTheme,
  Row,
} from 'native-base'
import { BlogCard, ColorModeSwitch } from '../../components'
import { usePlaylistsQuery } from 'app/graphQl/hooks'
import { PlaylistOrderByInput, Stage } from 'app/graphQl/schemas'
import {
  ActivityIndicator,
  FlatList,
  LogBox,
  Platform,
  useWindowDimensions,
} from 'react-native'
import { Sound } from 'expo-av/build/Audio'

const baseUrl = 'https://weread-oss.weread.asia/'

LogBox.ignoreAllLogs()

export function HomeScreen() {
  const { colors } = useTheme()
  const { height } = useWindowDimensions()
  const [play, setPlay] = React.useState(false)
  const [newSound, setNewSound] = React.useState<Sound>(null as any)
  const { data: playlistData, loading: loadingGetPlaylist } = usePlaylistsQuery(
    {
      variables: {
        orderBy: PlaylistOrderByInput.CreatedAtDesc,
        stage: Stage.Draft,
        first: 1000000,
      },
    }
  )

  async function playSound(url = '') {
    console.log('Loading Sound')
    const { sound } = await Audio.Sound.createAsync({
      uri: url.includes('http') ? url : baseUrl + url || '',
    })
    setNewSound(sound)
    setPlay(true)
    sound.playAsync()
    console.log('Playing Sound')
  }

  if (loadingGetPlaylist) {
    return (
      <Center padding={5} flex={1}>
        <ActivityIndicator color={colors.green[500]} size="large" />
      </Center>
    )
  }
  return (
    <Box flex={1}>
      <VStack padding={5} pb={0} flex={1} maxHeight={height - 130}>
        <BigList
          itemHeight={65}
          keyExtractor={(item) => item.id}
          data={playlistData?.playlists}
          renderItem={({ item }) => {
            return (
              <BlogCard
                {...{
                  image: item?.coverImg,
                  title: item?.title,
                  onPress: async () => {
                    if (newSound) {
                      newSound?.getStatusAsync().then(async (status) => {
                        //@ts-ignore
                        if (status?.isPlaying) {
                          setPlay(false)
                          await newSound.pauseAsync()
                        } else {
                          await playSound(item?.url)
                        }
                      })
                    } else {
                      console.log('click play')

                      if (!play) {
                        await playSound(item?.url)
                      }
                    }
                  },
                }}
              />
            )
          }}
        />
      </VStack>
      <Row
        position="absolute"
        bottom={0}
        w="full"
        bg="red.400"
        justifyContent="space-between"
        alignItems="center"
        h={'12'}
      >
        <AntDesign
          name="playcircleo"
          size={26}
          color={useTheme().colors.green[400]}
        />
        {!play ? (
          <AntDesign
            name="playcircleo"
            size={26}
            onPress={() => {}}
            color={colors.green[400]}
          />
        ) : (
          <AntDesign
            name="pausecircleo"
            size={26}
            onPress={async () => {
              await newSound?.pauseAsync()
              setPlay(false)
            }}
            color={colors.white}
          />
        )}
        <AntDesign
          name="playcircleo"
          size={26}
          color={useTheme().colors.green[400]}
        />
      </Row>
    </Box>
    // <Center
    //   flex={1}
    //   _dark={{ bg: 'blueGray.900' }}
    //   _light={{ bg: 'blueGray.50' }}
    // >
    //   <VStack alignItems="center" space="md">
    //     <AspectRatio w={40} ratio={1}>
    //       <Image
    //         rounded="full"
    //         source={{
    //           uri: 'https://pbs.twimg.com/profile_images/1403658675655372800/mQJWWQhA_400x400.jpg',
    //         }}
    //         alt="NextJS Logo"
    //         resizeMode="contain"
    //       />
    //     </AspectRatio>
    //     <Heading>NativeBase + Solito ❤️</Heading>
    //     <Text>
    //       Edit <Code>packages/app/home/screen.tsx</Code> and save to reload.
    //     </Text>
    //     <HStack alignItems="center" space="sm">
    //       <Link href="https://solito.dev/" isExternal>
    //         <Text
    //           _light={{ color: 'gray.700' }}
    //           _dark={{ color: 'gray.400' }}
    //           underline
    //           fontSize={'xl'}
    //         >
    //           Learn Solito
    //         </Text>
    //       </Link>
    //       <Text>/</Text>
    //       <Link href="https://docs.nativebase.io" isExternal>
    //         <Text color="primary.500" underline fontSize={'xl'}>
    //           Learn NativeBase
    //         </Text>
    //       </Link>
    //     </HStack>
    //   </VStack>
    //   <ColorModeSwitch />
    //   <Box mt="6">
    //     <SolitoLink href="/user/NativeBase">
    //       <Button pointerEvents="none" variant="outline" colorScheme="coolGray">
    //         Open User Detail
    //       </Button>
    //     </SolitoLink>
    //   </Box>
    // </Center>
  )
}
