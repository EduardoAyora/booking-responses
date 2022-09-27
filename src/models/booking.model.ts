import {Entity, model, property} from '@loopback/repository';

@model()
export class Booking extends Entity {
  @property({
    type: 'any',
    required: true,
  })
  bookingResponse?: any;

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  constructor(data?: Partial<Booking>) {
    super(data);
  }
}

export interface BookingRelations {
  // describe navigational properties here
}

export type BookingWithRelations = Booking & BookingRelations;
