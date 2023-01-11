import { memo, ReactNode } from 'react';
import Header from '../Header';

interface Props {
  children: ReactNode;
}

const FullWidthLayout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default memo(FullWidthLayout);
