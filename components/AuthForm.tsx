import {Flex,Input,Box,Button} from  '@chakra-ui/react';
import {useSWRConfig} from 'swr';
import {useRouter} from 'next/router';
import NextImage from 'next/image';
import {FC ,useState} from 'react'
import {auth} from '../lib/mutation';


const AuthForm: FC<{mode: "signin"| "singup"}>  = ({mode}) => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('');
    const [loading,setLoading] = useState(false);
    const router = useRouter();

    const submitForm = async (e) =>{
        e.preventDefault();
        setLoading(true);

        await auth(mode,{email,password});
        setLoading(false)
        router.push('/');

    }

    return (
        <Box height='100vh' width='100wv' bg='black' >
            <Flex justify='center' align='center' height='100px' borderBottom="white 1px solid">
            <NextImage src="/logo.svg" alt="lax" height={60} width={120} />
            </Flex>
            <Flex justify='center' align='center' height='calc(100vh -100px)'>
                <Box padding='50px' bg='gray.600' borderRadius='5px'>
                    <form onSubmit={submitForm}>
                        <Input placeholder='Email' type='email' onChange={e => setEmail(e.target.value)}/>
                        <Input placeholder='Password' type='password' onChange={e => setPassword(e.target.value)}/>
                        <Button type='submit' bg='green.600' isLoading={loading} sx={{
                            "&:hover": { bg: "green.300" },
                        }}>{mode}</Button>
                    </form>
                </Box>
            </Flex>
            </Box>

    );
};

export default AuthForm;
