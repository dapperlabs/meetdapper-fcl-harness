import { memo } from 'react';
import Header from '../Header';

type Props = React.PropsWithChildren<{}>;

const FullWidthLayout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default memo(FullWidthLayout);
