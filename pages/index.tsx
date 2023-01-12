import { getNonceServerSide } from 'flow/fcl/nonce';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <div className={''}>
      <Head>
        <title>Homepage</title>
      </Head>
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
