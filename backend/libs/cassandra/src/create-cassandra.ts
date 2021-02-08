import { Client } from 'cassandra-driver';

export const createCassandra = (bundlePath: string,
                                username: string,
                                password: string): Client =>
  new Client({
    cloud: { secureConnectBundle: bundlePath },
    credentials: {
      username,
      password,
    },
  })

export const createCassandraForDevPurposes = (): Client => {
  return new Client({
    contactPoints: ['localhost'],
    localDataCenter: 'dc1',
  })
}

