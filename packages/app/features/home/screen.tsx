import React, { useRef } from 'react'
import BigList from 'react-native-big-list'
import * as Av from 'expo-av/build'
import { useRouter } from 'solito/router'
const expoAv = Platform.OS !== 'web' ? require('expo-av') : {}
import AntDesign from '@expo/vector-icons/AntDesign'
const { Audio } = expoAv as typeof Av

import {
  Center,
  VStack,
  Box,
  useTheme,
  Row,
  Text,
  Select,
  Heading,
  Input,
  Icon,
} from 'native-base'
import { BlogCard, ColorModeSwitch, Footer } from '../../components'
import { usePlaylistsQuery } from 'app/graphQl/hooks'
import { PlaylistOrderByInput, Stage } from 'app/graphQl/schemas'
import {
  ActivityIndicator,
  FlatList,
  LogBox,
  Platform,
  useWindowDimensions,
  RefreshControl,
} from 'react-native'
import { useDebounce, useDebounceFn, useReactive } from 'ahooks'

import { Sound } from 'expo-av/build/Audio'
import Player from './Player'
import H5AudioPlayer from 'react-h5-audio-player'
import Marquee from '../../components/marquee'

const baseUrl = 'https://weread-oss.weread.asia/'

LogBox.ignoreAllLogs()
const checkUrlVideo = (url: string) => {
  return (
    url.includes('googlevideo') ||
    url.includes('Video') ||
    url.includes('.mp4') ||
    url.includes('youtube')
  )
}

export function HomeScreen() {
  const { colors } = useTheme()
  const { push, parseNextPath } = useRouter()
  const { height, width } = useWindowDimensions()
  const [play, setPlay] = React.useState(false)
  const [newSound, setNewSound] = React.useState<Sound>(null as any)
  const state = useReactive({
    url: '',
    title: '',
    coverImg: '',
    openPlaylist: false,
    isPlay: false,
    search: '',
  })

  const {
    data: playlistData,
    loading: loadingGetPlaylist,
    refetch: refetchPlaylist,
  } = usePlaylistsQuery({
    variables: {
      orderBy: PlaylistOrderByInput.CreatedAtDesc,
      stage: Stage.Draft,
      first: 1000000,
    },
    fetchPolicy: 'cache-first',
  })

  const { openPlaylist, title, url, coverImg, isPlay } = state
  let [language, setLanguage] = React.useState<string>('key0')
  const audioRef = useRef<H5AudioPlayer>(null)
  const isVideoMode = checkUrlVideo(url)

  const setPause = () => {
    // audioRef.current?.audio.current.pause();
    state.isPlay = false
  }
  // const setPlay = () => {
  //   audioRef.current?.audio?.current.play();
  //   state.isPlay = true;
  // };
  const { run: runSearch } = useDebounceFn(
    (text) => {
      state.search = text
      console.log('search', text)
    },
    { wait: 500 }
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
  const currentPlayHeight = 120

  if (loadingGetPlaylist) {
    return (
      <Center padding={5} flex={1}>
        <ActivityIndicator color={colors.green[500]} size="large" />
      </Center>
    )
  }
  return (
    <Box flex={1}>
      <Box px="5" py={2}>
        <Input
          defaultValue={state.search}
          onChangeText={(text) => {
            runSearch(text)
          }}
          placeholder="Search Audio & Video"
          width="100%"
          borderRadius="4"
          px="1"
          fontSize="14"
          InputLeftElement={
            <Icon
              m="2"
              ml="3"
              size="6"
              color="gray.400"
              as={<AntDesign name="search1" />}
            />
          }
        />
      </Box>
      <VStack px={5} pb={0} flex={1} maxHeight={height - currentPlayHeight}>
        <BigList
          renderEmpty={() => {
            return (
              <Center bg={'gray.100'} w={width - 20} p="4" h={height / 6}>
                <AntDesign name="database" size={40} color={colors.gray[400]} />
                <Text>There is no data</Text>
              </Center>
            )
          }}
          itemHeight={65}
          keyExtractor={(item) => item.id}
          data={playlistData?.playlists.filter((item) =>
            item.title
              .toLocaleLowerCase()
              .includes(state.search.toLocaleLowerCase())
          )}
          renderItem={({ item }) => {
            return (
              <BlogCard
                {...{
                  image: item?.coverImg,
                  title: item?.title,
                  isPlayMode: url !== item.url || !state.isPlay,
                  onPress: async () => {
                    if (checkUrlVideo(item.url)) {
                      push({
                        pathname: '/user/[id]',
                        query: {
                          id: item.id,
                        },
                      })
                      return
                    }

                    if (Platform.OS === 'web') {
                      state.url = item.url
                      state.title = item.title
                      state.coverImg = item.coverImg
                      if (checkUrlVideo(item.url)) {
                        audioRef?.current?.audio?.current?.pause()
                        state.isPlay = false
                      } else {
                        state.isPlay = true
                        audioRef?.current?.audio?.current?.play()
                      }
                    } else {
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
                    }
                  },
                }}
              />
            )
          }}
        />
      </VStack>

      <Box position="absolute" bottom={0} w="full" h={currentPlayHeight}>
        <Box width="full">
          <Marquee
            style={{
              backgroundColor: 'black',
            }}
            speed={40}
          >
            <Text color="white" h={'8'} pt="1.5" textTransform="capitalize">
              {title || 'please select your favorite'}
            </Text>
          </Marquee>
        </Box>

        <Player
          {...{
            audioRef,
            baseUrl,
            isVideoMode,
            url,
            height: currentPlayHeight,
          }}
        />
      </Box>
    </Box>
  )
}
