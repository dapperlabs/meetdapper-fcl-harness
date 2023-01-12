declare module '@onflow/fcl' {
  export interface ConfigReturn {
    all(): Promise<Record<string, any>>;
    get(key: string, fallback: any): Promise<any>;
    put(key: string, value: any): ConfigReturn;
  }

  export function config(arg?: Record<string, any>): ConfigReturn;
  export type Config = typeof config;

  export type Address = string;

  export type AuthorizationObject = {
    addr: Address;
    signingFunction: VoidFunction;
    keyId: number;
    sequenceNum: number;
  };

  export const authz: AuthorizationObject;

  export function serialize(args: any[]);

  export function limit(limit: number);

  export function unauthenticate(): void;

  export interface AuthenticateOptions {
    service?: WalletService;
    redir?: boolean;
  }

  export function authenticate(
    args?: AuthenticateOptions,
  ): Promise<CurrentUserObject>;

  export type CurrentUserObject = {
    addr: Address | null;
    cid: string | null;
    expiresAt: number | undefined | null;
    f_type: string;
    f_vsn: string;
    loggedIn: boolean | null;
    services: Record<string, any>[];
  };

  export type CurrentUser = {
    snapshot: () => Promise<CurrentUserObject>;
    subscribe: (cb: (currentUser: CurrentUserObject) => void) => VoidFunction;
    authorization: AuthorizationObject;
    unauthenticate: VoidFunction;
  };

  export function currentUser(): CurrentUser;

  export type ArgumentFunction = (...args: any[]) => any[];

  export function query(args: {
    cadence: string;
    limit?: number;
    args?: ArgumentFunction;
  }): Promise<any>;

  type AccountObject = {
    address: Address;
    balance: number;
    code: any; // Code
    contracts: any; // Object: Contract
    keys: any; // [KeyObject]
  };

  type AuthorizationObject = {
    addr: Address;
    signingFunction: VoidFunction;
    keyId: number;
    sequenceNum: number;
  };

  export type AuthorizationFunction = (
    account: AccountObject,
  ) => Promise<AuthorizationObject>;

  export function mutate(args: {
    cadence: string;
    limit?: number;
    args?: ArgumentFunction;
    proposer?: AuthorizationFunction;
  });

  export function send(...args: any[]): any;
  export function transaction(...args: any[]): any;
  export function proposer(...args: any[]): any;
  export function authorizations(...args: any[]): any;
  export function payer(...args: any[]): any;
  export function tx(...args: any[]): any;

  export type DiscoveryResult = { results?: WalletService[] } | null;

  export const discovery: {
    authn: {
      subscribe: (cb: (res: DiscoveryResult) => void) => void;
      update: () => Promise<void>;
      snapshot: () => Promise<DiscoveryResult>;
    };
  };

  export interface WalletProvider {
    address: string;
    authn_endpoint?: string;
    color: string;
    description: string;
    icon: string;
    install_link?: string;
    is_installed?: boolean;
    name: import('./lib/types').WALLET_PROVIDER;
    requires_install?: boolean;
    supportEmail: string;
    website: string;
  }
  export interface WalletService {
    endpoint: string;
    endpoint: string;
    f_type: string;
    f_vsn: string;
    method: import('./lib/types').FclServiceMethod;
    optIn?: boolean;
    provider: WalletProvider;
    type: string;
    uid: string;
  }

  export const arg: any;
  export const args: any;

  export type AccountProofData = {
    address: string;
    nonce: string;
    signatures: Record<string, any>[];
  };

  export const AppUtils: {
    verifyAccountProof: (
      appIdentifier: string,
      accountProofData: AccountProofData,
      opts?: { fclCryptoContract: string },
    ) => Promise<boolean>;
  };
}
