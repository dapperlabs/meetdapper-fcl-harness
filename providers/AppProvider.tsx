import AuthProvider from './AuthProvider/provider';

type Props = React.PropsWithChildren<{}>;

const AppProvider = ({ children }: Props) => (
  <AuthProvider>{children}</AuthProvider>
);

export default AppProvider;
