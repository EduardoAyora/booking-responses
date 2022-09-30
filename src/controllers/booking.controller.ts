import {
  Count,
  CountSchema,
  DataObject,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import convert from 'xml-js';
import {Booking, Olbv6} from '../models';
import {BookingRepository, Olbv6Repository} from '../repositories';

export class BookingController {
  constructor(
    @repository(BookingRepository)
    public bookingRepository: BookingRepository,
    @repository(Olbv6Repository)
    public olbv6Repository: Olbv6Repository,
  ) {}

  @post('/bookings')
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Olbv6, {
            title: 'NewBooking',
            exclude: ['id'],
          }),
        },
      },
    })
    olbV6: Omit<Olbv6, 'id'>,
  ): Promise<Booking> {
    // const {
    //   aditionals,
    //   cleaning,
    //   client,
    //   creditcard,
    //   dates,
    //   extras,
    //   linen,
    //   payment,
    //   pets,
    //   rates,
    //   taxes,
    //   source,
    //   insurance,
    //   property,
    // } = olbV6;

    const totalAmount = 'calcular';
    const dueDate = 'extraer';

    return this.bookingRepository.create({
      bookingResponse: {
        bookingResponseDetails: {
          orderList: {
            order: {
              currency: 'USD',
              paymentSchedule: {
                acceptedPaymentForms: {
                  paymentCardDescriptor: [
                    {
                      paymentFormType: 'CARD',
                      cardCode: 'VISA',
                      cardType: 'CREDIT',
                    },
                    {
                      paymentFormType: 'CARD',
                      cardCode: 'MASTERCARD',
                      cardType: 'CREDIT',
                    },
                    {
                      paymentFormType: 'CARD',
                      cardCode: 'DISCOVER',
                      cardType: 'CREDIT',
                    },
                  ],
                  paymentInvoiceDescriptor: {
                    paymentFormType: 'INVOICE',
                    paymentNote: '',
                  },
                },
                paymentScheduleItemList: {
                  paymentScheduleItem: {
                    amount: totalAmount,
                    dueDate,
                    currency: 'USD',
                  },
                },
              },
              reservationCancellationPolicy: {
                description: 'Cancellation poilcy',
              },
              orderItemList: {
                orderItem: [
                  {
                    name: 'Rent',
                    preTaxAmount: 2100,
                    totalAmount: 2329.95,
                    feeType: 'RENTAL',
                    description: 'Rent',
                    // status: 'ACCEPTED',
                  },
                ],
              },
            },
          },
        },
      },
    } as DataObject<Olbv6>);
    // Devolver XML
  }

  @get('/bookings/count')
  @response(200, {
    description: 'Booking model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Booking) where?: Where<Booking>): Promise<Count> {
    return this.bookingRepository.count(where);
  }

  @get('/bookings')
  async find(@param.filter(Booking) filter?: Filter<Booking>): Promise<string> {
    const options = {compact: true, ignoreComment: true, spaces: 4};
    const bookings = await this.bookingRepository.find(filter);
    const res = convert.js2xml(bookings, options);
    return res;
  }

  @patch('/bookings')
  @response(200, {
    description: 'Booking PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Booking, {partial: true}),
        },
      },
    })
    booking: Booking,
    @param.where(Booking) where?: Where<Booking>,
  ): Promise<Count> {
    return this.bookingRepository.updateAll(booking, where);
  }

  @get('/bookings/{id}')
  @response(200, {
    description: 'Booking model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Booking, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Booking, {exclude: 'where'})
    filter?: FilterExcludingWhere<Booking>,
  ): Promise<Booking> {
    return this.bookingRepository.findById(id, filter);
  }

  @patch('/bookings/{id}')
  @response(204, {
    description: 'Booking PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Booking, {partial: true}),
        },
      },
    })
    booking: Booking,
  ): Promise<void> {
    await this.bookingRepository.updateById(id, booking);
  }

  @put('/bookings/{id}')
  @response(204, {
    description: 'Booking PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() booking: Booking,
  ): Promise<void> {
    await this.bookingRepository.replaceById(id, booking);
  }

  @del('/bookings/{id}')
  @response(204, {
    description: 'Booking DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.bookingRepository.deleteById(id);
  }
}
