import {
    Box,
    List,
    ListItem,
    ListIcon,
    LinkBox,
    Divider,
    Center,
    LinkOverlay

} from '@chakra-ui/layout'

import {MdHome, MdSearch, MdLibraryMusic, MdFavorite, MdPlaylistAdd} from 'react-icons/md'
import NextImage from 'next/image'
import NextLink from 'next/link'


const navItems = [{
    name: 'Home',
    icon: MdHome,
    route: '/'
},
    {
        name: 'Search',
        icon: MdSearch,
        route: '/search'
    },
    {
        name: 'Library',
        icon: MdLibraryMusic,
        route: '/library'
    }
]

const menuItems = [{
    name: 'Create Playlist',
    icon: MdPlaylistAdd,
    route: '/'
},
    {
        name: 'Favorites',
        icon: MdFavorite,
        route: '/favorite'
    },
]
const cPlaylist = new Array(50).fill(2).map((_,i) => `Playlist ${i + 1}`);


const Sidebar = () => {
    return (
        <Box width="100%" height="calc(100vh - 100px)" bg="black" color="gray.600" paddingX="10px"  >
            <Box paddingY="20px" height="100%">
            <Box  width="200px">
                <NextImage alt="Spotify" src="./logo.svg" width={60} height={130} />
            </Box>
            <Box paddingY="20px">
         <List spacing={3}>
             {navItems.map(menu => (
                 <ListItem fontSize="1.2rem" paddingX="20px" key={menu.name}>
                     <LinkBox>
                     <NextLink href={menu.route} >
                          <ListIcon as={menu.icon} color="white" marginRight="10px" /> {menu.name}
                     </NextLink>
                     </LinkBox>
                 </ListItem>
             ))}
         </List>
            </Box>
                <Box paddingY="20px">
                    <List spacing={2} >
                        {menuItems.map(menu =>(
                            <ListItem key={menu.name} paddingX="20px" fontSize="1.2rem">
                                <LinkBox>
                                    <LinkBox>
                                        <NextLink href={menu.route}>
                                            <ListIcon as={menu.icon} color="white"/> {menu.name}
                                        </NextLink>
                                    </LinkBox>
                                </LinkBox>
                            </ListItem>
                        ))}
                    </List>
            </Box>
                <Divider color="gray.800" />

                <Box height="66%" overflowY="auto" paddingY="20px" >
                    <List spacing={2}>
                        {cPlaylist.map(playlist =>(
                            <ListItem paddingX="20px" fontSize="1.2" key={playlist}>
                                <LinkBox>
                                <NextLink href='/'>
                                    {playlist}
                                </NextLink>
                                </LinkBox>
                            </ListItem>
                        ))}
                    </List>
                </Box>
                </Box>
        </Box>
    );
};

export default Sidebar;
