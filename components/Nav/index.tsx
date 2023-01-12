import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  useColorMode,
  Menu,
  MenuButton,
  MenuList,
  IconButton,
  Avatar,
  Center,
} from '@chakra-ui/react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { memo } from 'react';
import { FaPowerOff } from 'react-icons/fa';
import { useAuth } from 'hooks/useAuth';

const Nav = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isLoggedIn, provider, address, logIn, logOut } = useAuth();

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4} as="nav">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Box>{process.env.NEXT_PUBLIC_APP_NAME}</Box>

        <Flex alignItems="center" gap={2}>
          <Button onClick={toggleColorMode} size="sm">
            {colorMode === 'light' ? <FaMoon /> : <FaSun />}
          </Button>

          {isLoggedIn && (
            <Menu>
              <MenuButton
                as={Button}
                rounded="full"
                variant="link"
                cursor="pointer"
                minW={0}
                title="Dapper Wallet"
              >
                <Avatar
                  size="sm"
                  name={provider?.name ?? 'Dapp'}
                  src={provider?.icon ?? '#'}
                />
              </MenuButton>
              <MenuList alignItems={'center'} py={4}>
                <Center pt={2}>
                  <p>{address}</p>
                </Center>
              </MenuList>
            </Menu>
          )}

          {isLoggedIn ? (
            <IconButton
              aria-label="Log Out"
              icon={<FaPowerOff />}
              size="sm"
              variant="solid"
              colorScheme="red"
              onClick={logOut}
            />
          ) : (
            <Button onClick={logIn}>Login Dapper</Button>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default memo(Nav);
