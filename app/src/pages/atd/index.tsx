import { Box, Flex } from "@chakra-ui/react";
import AtdField from "../../components/atd";


const atd = () => {
    const sideSpacing = 5
    return(
        <Flex>
            <Box mr={{sideSpacing}} ml={{sideSpacing}}>
                <AtdField />
            </Box>
        </Flex>
    )
}

export default atd