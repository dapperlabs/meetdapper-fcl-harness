import { Config, config } from '@onflow/fcl';

// Base config
config()
  .put('flow.network', process.env.NEXT_PUBLIC_FLOW_ENVIRONMENT)
  .put('accessNode.api', process.env.NEXT_PUBLIC_FLOW_ACCESS_NODE_URL)
  .put('app.detail.title', process.env.NEXT_PUBLIC_APP_NAME)
  .put('discovery.wallet.method', 'POP/RPC')
  .put('discovery.wallet', process.env.NEXT_PUBLIC_DAPPER_DISCOVERY);

if (process.env.NEXT_PUBLIC_DEBUG === 'true') {
  withDebug(config);
}

export function withDebug(config: Config) {
  return config({
    'debug.accounts': true,
    'debug.signatures': true,
    'debug.resolved': true,
  });
}
