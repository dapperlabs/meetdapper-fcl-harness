import { NextApiRequest, NextApiResponse } from 'next';
import { AppUtils } from '@onflow/fcl';
import { validateNonce } from 'flow/fcl/nonce';

export default async function accountProof(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { data } = req.body;
    const { address, nonce, signatures } = data || {};

    let verified = validateNonce({ req, res }, nonce);

    if (verified) {
      const appIdentifier = process.env.NEXT_PUBLIC_APP_NAME!;
      const accountProofData = {
        address,
        nonce,
        signatures,
      };

      verified = await AppUtils.verifyAccountProof(
        appIdentifier,
        accountProofData,
      );
    }

    res.status(200).send({ accountVerified: verified });
  } catch (err: any) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
}
