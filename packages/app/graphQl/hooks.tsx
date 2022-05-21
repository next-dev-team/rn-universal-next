import * as Types from './operations'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {} as const

export const PlaylistsDocument = gql`
  query Playlists($orderBy: PlaylistOrderByInput, $stage: Stage!, $first: Int) {
    playlists(orderBy: $orderBy, stage: $stage, first: $first) {
      title
      url
      stage
      coverImg
      id
    }
  }
`

/**
 * __usePlaylistsQuery__
 *
 * To run a query within a React component, call `usePlaylistsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlaylistsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlaylistsQuery({
 *   variables: {
 *      orderBy: // value for 'orderBy'
 *      stage: // value for 'stage'
 *      first: // value for 'first'
 *   },
 * });
 */
export function usePlaylistsQuery(
  baseOptions: Apollo.QueryHookOptions<
    Types.PlaylistsQuery,
    Types.PlaylistsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<Types.PlaylistsQuery, Types.PlaylistsQueryVariables>(
    PlaylistsDocument,
    options
  )
}
export function usePlaylistsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.PlaylistsQuery,
    Types.PlaylistsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    Types.PlaylistsQuery,
    Types.PlaylistsQueryVariables
  >(PlaylistsDocument, options)
}
export type PlaylistsQueryHookResult = ReturnType<typeof usePlaylistsQuery>
export type PlaylistsLazyQueryHookResult = ReturnType<
  typeof usePlaylistsLazyQuery
>
export type PlaylistsQueryResult = Apollo.QueryResult<
  Types.PlaylistsQuery,
  Types.PlaylistsQueryVariables
>
export const CreatePlaylistDocument = gql`
  mutation CreatePlaylist(
    $data: PlaylistCreateInput = { title: "", url: "", coverImg: "" }
  ) {
    createPlaylist(data: $data) {
      id
    }
  }
`
export type CreatePlaylistMutationFn = Apollo.MutationFunction<
  Types.CreatePlaylistMutation,
  Types.CreatePlaylistMutationVariables
>

/**
 * __useCreatePlaylistMutation__
 *
 * To run a mutation, you first call `useCreatePlaylistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePlaylistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPlaylistMutation, { data, loading, error }] = useCreatePlaylistMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreatePlaylistMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.CreatePlaylistMutation,
    Types.CreatePlaylistMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    Types.CreatePlaylistMutation,
    Types.CreatePlaylistMutationVariables
  >(CreatePlaylistDocument, options)
}
export type CreatePlaylistMutationHookResult = ReturnType<
  typeof useCreatePlaylistMutation
>
export type CreatePlaylistMutationResult =
  Apollo.MutationResult<Types.CreatePlaylistMutation>
export type CreatePlaylistMutationOptions = Apollo.BaseMutationOptions<
  Types.CreatePlaylistMutation,
  Types.CreatePlaylistMutationVariables
>
export const DeletePlaylistDocument = gql`
  mutation DeletePlaylist($where: PlaylistWhereUniqueInput!) {
    deletePlaylist(where: $where) {
      title
    }
  }
`
export type DeletePlaylistMutationFn = Apollo.MutationFunction<
  Types.DeletePlaylistMutation,
  Types.DeletePlaylistMutationVariables
>

/**
 * __useDeletePlaylistMutation__
 *
 * To run a mutation, you first call `useDeletePlaylistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePlaylistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePlaylistMutation, { data, loading, error }] = useDeletePlaylistMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useDeletePlaylistMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.DeletePlaylistMutation,
    Types.DeletePlaylistMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    Types.DeletePlaylistMutation,
    Types.DeletePlaylistMutationVariables
  >(DeletePlaylistDocument, options)
}
export type DeletePlaylistMutationHookResult = ReturnType<
  typeof useDeletePlaylistMutation
>
export type DeletePlaylistMutationResult =
  Apollo.MutationResult<Types.DeletePlaylistMutation>
export type DeletePlaylistMutationOptions = Apollo.BaseMutationOptions<
  Types.DeletePlaylistMutation,
  Types.DeletePlaylistMutationVariables
>
export const PlaylistDocument = gql`
  query playlist($where: PlaylistWhereUniqueInput!) {
    playlist(where: $where) {
      id
      url
      title
      coverImg
    }
  }
`

/**
 * __usePlaylistQuery__
 *
 * To run a query within a React component, call `usePlaylistQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlaylistQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlaylistQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function usePlaylistQuery(
  baseOptions: Apollo.QueryHookOptions<
    Types.PlaylistQuery,
    Types.PlaylistQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<Types.PlaylistQuery, Types.PlaylistQueryVariables>(
    PlaylistDocument,
    options
  )
}
export function usePlaylistLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.PlaylistQuery,
    Types.PlaylistQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<Types.PlaylistQuery, Types.PlaylistQueryVariables>(
    PlaylistDocument,
    options
  )
}
export type PlaylistQueryHookResult = ReturnType<typeof usePlaylistQuery>
export type PlaylistLazyQueryHookResult = ReturnType<
  typeof usePlaylistLazyQuery
>
export type PlaylistQueryResult = Apollo.QueryResult<
  Types.PlaylistQuery,
  Types.PlaylistQueryVariables
>
