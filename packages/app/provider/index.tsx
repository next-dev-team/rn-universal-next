import { NavigationProvider } from './navigation'
import React, { useEffect, useState } from 'react'
import { Box, Center, NativeBaseProvider } from 'native-base'
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistCache } from 'apollo3-cache-persist'
import { setContext } from '@apollo/client/link/context'
import { Platform } from 'react-native'

const cache = new InMemoryCache()

const httpLink = createHttpLink({
  uri: 'https://api-ap-northeast-1.graphcms.com/v2/cl37clyyk82h601xq9zcjf9h4/master',
})

const authLink = setContext((_, { headers }) => {
  const token = 'ghp_xxxxxxxxxxxxxx'
  return {
    headers: {
      ...headers,
      // authorization: token ? `Bearer ${token}` : '',
    },
  }
})
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  defaultOptions: { watchQuery: { fetchPolicy: 'cache-and-network' } },
})

export function Provider({ children }: { children: React.ReactNode }) {
  const [loadingCache, setLoadingCache] = useState(true)

  if (Platform.OS !== 'web') {
    useEffect(() => {
      persistCache({
        cache,
        storage: AsyncStorage,
      }).then(() => setLoadingCache(false))
    }, [])
  }

  return (
    <ApolloProvider client={client}>
      <NavigationProvider>
        <NativeBaseProvider>
          <Box w={'full'} maxW="xl" mx="auto" flex={1}>
            {children}
          </Box>
        </NativeBaseProvider>
      </NavigationProvider>
    </ApolloProvider>
  )
}
