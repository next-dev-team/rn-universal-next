import { createParam } from 'solito'
import { Link as SolitoLink } from 'solito/link'
import React from 'react'
import {
  Center,
  Button,
  Box,
  ChevronLeftIcon,
  useTheme,
  Row,
  Icon,
  Text,
  
} from 'native-base'
import { ColorModeSwitch, WebViewMobile } from '../../components'
import { useRouter } from 'solito/router'
import { usePlaylistQuery, usePlaylistsQuery } from 'app/graphQl/hooks'
import { ActivityIndicator } from 'react-native'

const { useParam } = createParam<{ id: string; url: string }>()

export function UserDetailScreen() {
  const [id] = useParam('id')
  const { colors } = useTheme()

  const { data, loading } = usePlaylistQuery({
    variables: {
      where: { id },
    },
    fetchPolicy: 'cache-first',
  })
  const { title, url } = data?.playlist || {}

  if (loading) {
    return (
      <Center padding={5} flex={1}>
        <ActivityIndicator color={colors.green[500]} size="large" />
      </Center>
    )
  }
  return (
    <Box height={'full'} p={4} pt={6} bg="blueGray.50">
      <Row alignItems="center" space="1">
        <SolitoLink href="/">
         <ChevronLeftIcon size="sm" color='blue.500'/>
        </SolitoLink>
        <Text fontSize='md' bold>{title}</Text>
      </Row>
      <Box mt="6" width={'full'} h="260">
        <WebViewMobile uri={url as string} />
      </Box>
    </Box>
  )
}
