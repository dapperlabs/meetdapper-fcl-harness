import { memo } from 'react';
import Nav from '../Nav';

const Header = () => {
  return (
    <header>
      <Nav />
    </header>
  );
};

export default memo(Header);
