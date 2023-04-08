import { Box, Center, Heading, Text } from '@chakra-ui/layout';
import { Avatar, Flex, Image } from '@chakra-ui/react';
import GridientLayout from '../components/GridientLayout';
import prisma from '../lib/prisma';
import { useME } from '../lib/hooks';

const Home = ({ artists }) => {
  const { user } = useME();

  return (
    <GridientLayout
      color="green"
      description="profile"
      title={`${user?.firstName} ${user?.lastName}`}
      subtitle="playing fifa"
      roundImage={true}
      image="https://pbs.twimg.com/card_img/1632854840396201984/GNG07Rpx?format=jpg&name=medium"
    >
      <Box>
        <Box marginBottom="20px" color="whiteAlpha.700">
          <Text>Artist of the month</Text>
          <Text>Only visible for you</Text>
        </Box>
        <Flex>
          {artists.map((artist) => (
            <Box paddingX="10px" width="20%" key={artist.id}>
              <Box bg="gray.900" borderRadius="4px" padding="10px">
                <Center paddingY="10px">
                  <Avatar
                    size="xl"
                    name={artist.name}
                    src="https://bit.ly/sage-adebayo"
                  />
                </Center>
                <Box color="whiteAlpha.700">
                  <Heading fontSize="sm">{artist.name}</Heading>
                  <Text fontSize="x-small">Artist</Text>
                </Box>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
    </GridientLayout>
  );
};

export const getServerSideProps = async () => {
  const artists = await prisma.artist.findMany({});

  return {
    props: { artists: JSON.parse(JSON.stringify(artists)) }, // will be passed to the page component as props
  };
};

export default Home;
