import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'mongo',
  connector: 'mongodb',
  // url: 'mongodb+srv://edu:con123456@cluster0.qkrxw.mongodb.net/test?retryWrites=true&w=majority',
  url: 'mongodb://edu:con123456@cluster0-shard-00-00.qkrxw.mongodb.net:27017,cluster0-shard-00-01.qkrxw.mongodb.net:27017,cluster0-shard-00-02.qkrxw.mongodb.net:27017/test?ssl=true&replicaSet=atlas-k5j12u-shard-0&authSource=admin&retryWrites=true&w=majority',
  // host: 'mongodb+srv',
  port: 27017,
  // user: 'edu',
  // password: 'con123456',
  database: 'responseOLB',
  // useNewUrlParser: true,
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MongoDataSource
  extends juggler.DataSource
  implements LifeCycleObserver
{
  static dataSourceName = 'mongo';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.mongo', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
