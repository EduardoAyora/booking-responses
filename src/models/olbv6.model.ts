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
  property: object;

  @property({
    type: 'object',
    required: true,
  })
  client: object;

  @property({
    type: 'object',
    required: true,
  })
  dates: object;

  @property({
    type: 'object',
    required: true,
  })
  rates: object;

  @property({
    type: 'object',
    required: true,
  })
  taxes: object;

  @property({
    type: 'object',
    required: true,
  })
  payment: object;

  @property({
    type: 'object',
    required: true,
  })
  creditcard: object;

  @property({
    type: 'object',
    required: true,
  })
  pets: object;

  @property({
    type: 'object',
    required: true,
  })
  linen: object;

  @property({
    type: 'object',
    required: true,
  })
  cleaning: object;

  @property({
    type: 'object',
    required: true,
  })
  aditionals: object;

  @property({
    type: 'object',
    required: true,
  })
  insurance: object;

  @property({
    type: 'object',
    required: true,
  })
  extras: object;

  @property({
    type: 'object',
    required: true,
  })
  source: object;

  constructor(data?: Partial<Olbv6>) {
    super(data);
  }
}

export interface Olbv6Relations {
  // describe navigational properties here
}

export type Olbv6WithRelations = Olbv6 & Olbv6Relations;
