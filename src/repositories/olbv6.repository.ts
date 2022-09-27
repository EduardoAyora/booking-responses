import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Olbv6, Olbv6Relations} from '../models';

export class Olbv6Repository extends DefaultCrudRepository<
  Olbv6,
  typeof Olbv6.prototype.id,
  Olbv6Relations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(Olbv6, dataSource);
  }
}
