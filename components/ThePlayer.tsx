import {ButtonGroup,Box,IconButton,RangeSlider,RangeSliderFilledTrack,RangeSliderThumb,Center,Flex,Text} from '@chakra-ui/react'
import ReactHowler from 'react-howler';
import {useEffect,useRef,useState} from 'react'
import {MdShuffle,MdSkipNext,MdSkipPrevious,MdOutlinePlayCircle,MdOutlinePauseCircle,MdOutlineRepeat} from 'react-icons/md'
import {useStoreActions} from 'easy-peasy'
import {formatTime} from '../lib/formatter'


const ThePlayer = ({songs , activeSong}) => {
    const [playing,setPlaying] = useState(true)
    const [duration,setDuration] = useState(0)
    const [repeat,setRepeat] = useState(false)
    const [shuffle,setShuffle] = useState(false)
    const [index, setIndex] = useState(songs.findIndex((song) => song.id === activeSong.id));
    const [seek,setSeek] = useState(false);
    const [isSeeking,setIsSeeking] = useState(0.0);
    const soundRef = useRef(null);
    const repeatRef = useRef(repeat);

    const changeActiveSong = useStoreActions((state:any) => state.ChangeActiveSong)

    useEffect(() => {
        let timerId;
        if(playing && !isSeeking) {
            const f = () =>{
                setSeek(soundRef.current.seek());
                timerId = requestAnimationFrame(f)
            }
            timerId = requestAnimationFrame(f);
            return () => cancelAnimationFrame(timerId);
        }
        cancelAnimationFrame(timerId)
    }, [playing,isSeeking]);

    useEffect(() => {
        repeatRef.current = repeat;
    }, [repeat]);

    const setPlayState = (value: boolean) =>{
        setPlaying(value)
    }

    const onShuffle = ( ) =>{
        setShuffle((state) => !state);
    }

   const onRepeat = () =>{
        setRepeat((state) => !state);
   }

   const prevSong = () => {
        setIndex((state) => {
            return state ? state - 1: songs.length -1
        })
   }



    return (
        <Box>
            <Box>

            </Box>
            <Center color="gray.600">
                <ButtonGroup>
                    <IconButton aria-label="shuffle" outline="none" variant="link" fontSize="25px" icon={<MdShuffle/>}  />
                    <IconButton aria-label="previous" outline="none" variant="link" fontSize="25px" icon={<MdSkipPrevious/>}  />
                    <IconButton aria-label="next" outline="none" variant="link" fontSize="25px" icon={<MdSkipNext/>}  />

                </ButtonGroup>
            </Center>
        </Box>
    );
};

export default ThePlayer;
