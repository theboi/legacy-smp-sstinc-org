import { VStack, Box, Heading, Text, Center } from "@chakra-ui/react";
import { useState } from 'react'

// export default function JoinPage() {
//   return <VStack></VStack>;
// }

export default function Settings() {
  const [email, setEmail] = useState('')
  const changeEmail = (e) => {
      e.preventDefault()

      if(!email) {
          alert("Please enter a email!")
          return
      }

  }

  return(
      <Box>
        <Heading>Settings</Heading>
        <Center>
            <VStack>
                <Text fontSize={"2xl"}><b>Work in Progress</b></Text>
                <Text>Check back Soon!</Text>
            </VStack>
        </Center>
      </Box>
  );
}