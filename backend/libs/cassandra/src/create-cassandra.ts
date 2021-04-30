import { Client, policies } from 'cassandra-driver';
import { CassandraOptions } from '@kb/cassandra/cassandra-options'
import ConstantReconnectionPolicy = policies.reconnection.ConstantReconnectionPolicy

export const createCassandra = (keyspace: string,
                                {
                                  secureConnectBundlePath,
                                  username,
                                  password
                                }: CassandraOptions['cloud']): Client =>
  new Client({
    cloud: { secureConnectBundle: secureConnectBundlePath },
    credentials: {
      username,
      password,
    },
    keyspace,
  })

export const createCassandraForDevPurposes = (keyspace: string,
                                              {
                                                contactPoint,
                                                localDataCenter,
                                              }: CassandraOptions['local']): Client =>
  new Client({
    contactPoints: [contactPoint],
    localDataCenter,
    policies: {
      reconnection: new ConstantReconnectionPolicy(5000)
    },
    keyspace,
  })
