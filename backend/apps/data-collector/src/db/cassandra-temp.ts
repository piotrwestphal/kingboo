import {Client} from 'cassandra-driver'
import {Injectable} from '@nestjs/common';

@Injectable()
export class CassandraTemp {
  constructor() {
    const client = new Client({
      // cloud: {
      //   secureConnectBundle: './db/cassandra/secure-connect-kingboo.zip'
      // },
      contactPoints: ['localhost'],
      localDataCenter: 'datacenter1',
      // credentials: {
      //   username: 'kingboo',
      //   password: 'ekTFHkr3cBLf4am'
      // }
    })
    client.connect().then(() => {
      console.log('Connect')
      client.execute('SELECT * FROM system_schema.tables').then((res) => console.log(res))
    }).catch((err) => console.log(err))
  }
}
