import { Box } from '@chakra-ui/layout';
import PlayerBar from './PlayerBar';
import Sidebar from './Sidebar';

const Player = ({ children }) => {
  return (
    <Box height="100vh" width="100wh">
      <Box width="250px" position="absolute" top="0" left="0">
        <Sidebar />
      </Box>
      <Box marginLeft="250px" background="facebook.100">
        {children}
      </Box>
      <Box position="absolute" bottom="0" left="0">
        <PlayerBar />
      </Box>
    </Box>
  );
};

export default Player;
