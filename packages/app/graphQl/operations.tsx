import * as Types from './schemas'

export type PlaylistsQueryVariables = Types.Exact<{
  orderBy?: Types.InputMaybe<Types.PlaylistOrderByInput>
  stage: Types.Stage
  first?: Types.InputMaybe<Types.Scalars['Int']>
}>

export type PlaylistsQuery = {
  __typename?: 'Query'
  playlists: Array<{
    __typename?: 'Playlist'
    title: string
    url: string
    stage: Types.Stage
    coverImg: string
    id: string
  }>
}

export type CreatePlaylistMutationVariables = Types.Exact<{
  data?: Types.InputMaybe<Types.PlaylistCreateInput>
}>

export type CreatePlaylistMutation = {
  __typename?: 'Mutation'
  createPlaylist?: { __typename?: 'Playlist'; id: string } | null
}

export type DeletePlaylistMutationVariables = Types.Exact<{
  where: Types.PlaylistWhereUniqueInput
}>

export type DeletePlaylistMutation = {
  __typename?: 'Mutation'
  deletePlaylist?: { __typename?: 'Playlist'; title: string } | null
}

export type PlaylistQueryVariables = Types.Exact<{
  where: Types.PlaylistWhereUniqueInput
}>

export type PlaylistQuery = {
  __typename?: 'Query'
  playlist?: {
    __typename?: 'Playlist'
    id: string
    url: string
    title: string
    coverImg: string
  } | null
}
