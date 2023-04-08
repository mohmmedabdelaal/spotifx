import { validateToken } from '../../lib/auth';
import prisma from '../../lib/prisma';
import GridientLayout from '../../components/GridientLayout';
import SongTable from '../../components/SongTable';

const rgbColors = (id) => {
  const colors = [
    '#302F4D',
    '#302F4D',
    'blue',
    'yellow',
    'violet',
    '#302F4D',
    'purple',
    'navy',
    'pink',
  ];

  return colors[id + 1] || colors[Math.floor(Math.random() * colors.length)];
};

const SinglePlaylist = ({ playlist }) => {
  const playlists = JSON.parse(playlist);
  const colors = rgbColors(playlists.id);
  return (
    <GridientLayout
      color={`${colors}`}
      roundImage={false}
      description={`${playlists.songs.length} Song`}
      subtitle="Playlists"
      image={`https://picsum.photos/400?random=${playlists.id}`}
      title={playlists.name}
    >
      <SongTable songs={playlists.songs} />
    </GridientLayout>
  );
};

export const getServerSideProps = async ({ query, req }) => {
  const { id } = validateToken(req.cookies.TRAX_ACCESS_TOKEN);
  const [playlist] = await prisma.playlist.findMany({
    where: {
      id: +query.id,
      userId: id,
    },
    include: {
      songs: {
        include: {
          artist: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  });

  return {
    props: { playlist: JSON.stringify(playlist) },
  };
};

export default SinglePlaylist;
