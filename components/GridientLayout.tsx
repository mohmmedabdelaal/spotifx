import {Box,Flex,Text} from '@chakra-ui/layout'
import {Image} from '@chakra-ui/react'


const GriedientLayout = ({color,children,image,subtitle,description,roundImage,title,}) =>{
    return (
        <Box height="clac(100vh -100px)" overflowY="auto" bgGradient={`linear(${color}.500 0%, ${color}.600 15%,${color}.700 40%,  rgba(0,0,0,.95) 75%)`}>
        <Flex bgColor={`${color}.600`} padding="40px" align="end">
            <Box padding="20px">
                <Image boxSize="160px" boxShadow="2xl" src={image} borderRadius={roundImage ? "100%" : "3px"}/>
            </Box>
            <Box lineHeight="40px" padding="20px" color="white">
                <Text fontWeight="bold" casing="uppercase" fontSize="x-small">
                    {subtitle}
                </Text>
                <Text fontSize="6xl">{title}</Text>
                <Text fontSize="x-small">{description}</Text>
            </Box>
        </Flex>
            <Box padding="50px">{children}</Box>
        </Box>
    )
}

export  default GriedientLayout;