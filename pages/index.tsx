import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Container,
  Skeleton,
  Stack,
} from '@chakra-ui/react';
import { getNonceServerSide } from 'flow/fcl/nonce';
import { useAuth } from 'hooks/useAuth';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  const { openid, currentUser, isLoggedIn, isAuthenticating } = useAuth();

  return (
    <div className={''}>
      <Head>
        <title>Homepage</title>
      </Head>
      <Container maxW="container.lg" mt={4}>
        <Accordion allowMultiple>
          <AccordionItem>
            <AccordionButton _expanded={{ bg: '#9900f0', color: 'white' }}>
              <Box as="span" flex="1" textAlign="left">
                Current user data
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4} maxH="96" overflowY="auto">
              {isAuthenticating ? (
                <Stack>
                  <Skeleton height="20px" />
                  <Skeleton height="20px" />
                  <Skeleton height="20px" />
                </Stack>
              ) : (
                <Box as="pre" overflowX="auto" whiteSpace="pre-wrap">
                  {JSON.stringify(currentUser, null, 2)}
                </Box>
              )}
            </AccordionPanel>
          </AccordionItem>

          {openid && (
            <AccordionItem>
              <AccordionButton _expanded={{ bg: '#9900f0', color: 'white' }}>
                <Box as="span" flex="1" textAlign="left">
                  Open ID data
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <pre>{JSON.stringify(openid, null, 2)}</pre>
              </AccordionPanel>
            </AccordionItem>
          )}
        </Accordion>
      </Container>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return { props: { nonce: getNonceServerSide(context) } };
};

export const config = {
  runtime: 'nodejs',
};

export default Home;
