import {
  Box,
  Center,
  Divider,
  Flex,
  Icon,
  Image,
  Row,
  Text,
  useTheme,
} from 'native-base'
import { TouchableOpacity } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign'

const baseImgUrl = 'https://image.weread.asia'
const BlogCard = ({
  onPress,
  image,
  title,
  isPlayMode,
}: {
  title: string
  image: string
  onPress: () => void
  isPlayMode?: boolean
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Row
        justifyContent="space-between"
        borderBottomWidth={1}
        borderBottomColor="gray.200"
        py={2}
      >
        <Row space={'2'} flex={1}>
          <Image
            alt=" "
            width={'12'}
            height={'12'}
            rounded={'lg'}
            resizeMode={'cover'}
            source={{
              uri: image.includes('http') ? image : baseImgUrl + image,
            }}
          />
          <Box width={'80%'}>
            <Text
              fontSize="sm"
              bold
              textTransform="capitalize"
              numberOfLines={2}
            >
              {title}
            </Text>
          </Box>
        </Row>
        <Center>
          {isPlayMode ? (
            <AntDesign
              name="playcircleo"
              size={26}
              color={useTheme().colors.green[400]}
            />
          ) : (
            <AntDesign
              name="pausecircleo"
              size={26}
              color={useTheme().colors.orange[400]}
            />
          )}
        </Center>
      </Row>
    </TouchableOpacity>
  )
}

export default BlogCard
