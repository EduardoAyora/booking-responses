import {Entity, model, property} from '@loopback/repository';

@model()
export class Olbv6 extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'object',
    required: true,
  })
  orderList: object;

  constructor(data?: Partial<Olbv6>) {
    super(data);
  }
}

export interface Olbv6Relations {
  // describe navigational properties here
}

export type Olbv6WithRelations = Olbv6 & Olbv6Relations;
