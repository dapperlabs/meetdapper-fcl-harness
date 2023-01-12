import { Link, useColorModeValue } from '@chakra-ui/react';
import NextLink from 'next/link';
import { memo } from 'react';

export type LinkProps = Omit<React.ComponentProps<typeof Link>, 'href'> & {
  href: React.ComponentProps<typeof NextLink>['href'];
};

const CustomLink = ({ href, ...rest }: LinkProps) => (
  <NextLink href={href} passHref>
    <Link
      _hover={{
        textDecoration: 'none',
        color: useColorModeValue('gray.200', 'gray.700'),
      }}
      {...rest}
    />
  </NextLink>
);

export default memo(CustomLink);
