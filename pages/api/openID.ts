import { NextApiRequest, NextApiResponse } from 'next';
import { JWK, JWE, JWS } from 'node-jose';

async function decrypt(token: string) {
  const privateKey = process.env.OPEN_ID_PRIVATE_KEY;

  const keystore = JWK.createKeyStore();
  await keystore.add(await JWK.asKey(privateKey!, 'pem'));

  const decryptedVal = await JWE.createDecrypt(keystore).decrypt(token);

  const claims = Buffer.from(
    (decryptedVal as JWE.DecryptResult).plaintext,
  ).toString();

  return claims;
}

async function verify(claims: string) {
  let payload = '';

  try {
    const result = await JWS.createVerify().verify(claims, {
      allowEmbeddedKey: true,
    });
    payload = Buffer.from(result.payload).toString();
  } catch (err) {
    console.log(err);
  }

  return payload;
}

export default async function openid(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { token } = req.body;

    const jwtToken = await decrypt(token);

    const payload = await verify(jwtToken);

    res.status(200).json(JSON.parse(payload));
  } catch (err: any) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
}
