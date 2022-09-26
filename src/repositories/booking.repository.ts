import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Booking, BookingRelations} from '../models';

export class BookingRepository extends DefaultCrudRepository<
  Booking,
  typeof Booking.prototype.id,
  BookingRelations
> {
  constructor(@inject('datasources.mongo') dataSource: MongoDataSource) {
    super(Booking, dataSource);
  }
}
