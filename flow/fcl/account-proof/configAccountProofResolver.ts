import { config } from '@onflow/fcl';

export function configAccountProofResolver(nonce: string) {
  return config().put('fcl.accountProof.resolver', () => ({
    appIdentifier: process.env.NEXT_PUBLIC_APP_NAME,
    nonce,
  }));
}
