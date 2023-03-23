import type { NextPage } from "next";
import { useAccount } from "wagmi";

import { useState } from "react";

import { WallyButton } from "../components/WallyButton.js";
import { WallyHeader } from "../components/WallyHeader.js";

import Link from "next/link";

import PaintCanvas from "../components/PaintCanvas";
import ColorPicker from "../components/ColorPicker";
import ToolPicker from "../components/ToolPicker";
import LineWidthPicker from "../components/LineWidthPicker";

import { Box, 
        Container, 
        Stack, 
        useBreakpointValue, } from "@chakra-ui/react";

type Props = {
  header: string;
  subHeader: string;
};

const Landing: NextPage<Props> = (props) => {
  const { isConnected } = useAccount();

  const [color, setColor] = useState("#000000");
  const [lineWidth, setLineWidth] = useState(5);
  const [tool, setTool] = useState("pen");
  const [imageUrl, setImageUrl] = useState("../assets/web3Identity.png");

  const flexDirection = useBreakpointValue({ base: 'column', md: 'row' });

  return (
    <>
      <Box maxH="100vh">
        <Box
          maxHeight={"80%"}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          as="section"
          pt={{ base: "4", md: "8" }}
          pb={{ base: "12", md: "24" }}
          bgGradient={[
            "linear(to-tr, teal.300, yellow.400)",
            "linear(to-t, blue.200, teal.500)",
            "linear(to-b, orange.100, purple.300)",
          ]}
        >
          <WallyHeader />

          <Container
            maxW={"container.lg"}
            bg="bg-surface"
            borderRadius="lg"
            p={{ base: "4", md: "6" }}
            borderBottomRadius={"xl"}
            bgGradient="linear(to-r, #F6F0EA, #F1DFD1)"
          >

            <Box display="flex" flexDirection={flexDirection} width="100%" alignItems="center" justifyContent="center">
              <Box margin={"25"}>

                <Box maxWidth={"360px"} maxHeight={"480px"}>
                  <PaintCanvas
                    width={"360px"}
                    height={"480px"}
                    color={color}
                    lineWidth={lineWidth}
                    tool={tool}
                    imageUrl={imageUrl} // Pass the imageUrl prop
                  />
                </Box>

              </Box>

              <Box margin={"25"}>

                <Box maxWidth={"320px"}>

                  <ToolPicker tool={tool} setTool={setTool} />

                  <LineWidthPicker
                      lineWidth={lineWidth}
                      setLineWidth={setLineWidth}
                    />

                  <ColorPicker color={color} setColor={setColor} />

                </Box>

              </Box>
            </Box>



            <Stack justify="center" direction="row" padding={"5"}>
              {isConnected && (
                <Link href="/rewards1">
                  <WallyButton boxShadow="xl" mx={6}>
                    Mint
                  </WallyButton>
                </Link>
              )}
            </Stack>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default Landing;
