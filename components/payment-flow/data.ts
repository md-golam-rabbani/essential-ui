import {
  IBankInfo,
  IBooking,
  ICoupon,
  ICustomer,
  IEmiDetails,
  IEmiInfo,
  IPaymentMethod,
} from './interface';

const customer: ICustomer = {
  mobileNo: '1515635397',
  email: 'rabbani.cse.69@gmail.com',
  firstName: 'Golam',
  lastName: 'Rabbani',
  billAddressLine: 'G.P.JA-94',
  billAddressCity: 'Dhaka',
  billAddressCountry: 'Bangladesh', // Might be better as an enum for specific countries
  billAddressPostalCode: '5420',
};

const emiInfo: IEmiInfo = {
  emiConfigId: 5001,
  emiBankChargeRate: 5,
  emiCustomerChargeRate: 10,
  totalEmiBankChargeAmount: 1200,
  totalEmiCustomerChargeAmount: 1200,
  emiMonth: 3,
};

export const bookingData: IBooking = {
  amount: 1000,
  bin: '',
  bookingId: 1001,
  uniqueTransID: '1001',
  callBackUrl: 'url-1',
  cardType: 1,
  channel: 1,
  paymentMethodId: 4,
  paymentMethodCardInformationId: 0,
  dynamicDiscountCode: null,
  couponType: 1,
  couponCode: 'bkash25',
  couponDiscountAmount: 100,
  couponDiscountPercentage: 10,
  totalRoomRate: 800,
  checkInDate: '2024-10-24T00:00:00', // Date in ISO 8601 format
  checkOutDate: '2024-10-25T00:00:00', // Date in ISO 8601 format
  customer: customer,
  emiInfo: emiInfo,
};

const emiDetails: IEmiDetails = {
  month: 3,
  bankChargeRate: 5,
  customerChargeRate: 10,
  eligibleForDiscount: false,
};

export const bankInfo: IBankInfo = {
  emiConfigId: 6001,
  bankInfoId: 6002,
  bankName: 'DBBL',
  emiLogoPath: 'Logopath',
  emiDetails: [
    {
      ...emiDetails,
    },
  ],
};

export const coupon: ICoupon = {
  id: 100,
  description: 'Bkash coupon',
  code: 'bkash25',
  couponType: 1,
  defaultPaymentMethodId: 4,
  maximumDiscountAmount: 200,
  discountPercentage: 20,
};

export const paymentMethod: IPaymentMethod = {
  paymentMethodId: 4,
  name: 'bKash',
  logoUrl:
    'https://otatestbucket1.s3.ap-south-1.amazonaws.com/https://cdn.firsttrip.com',
  isBank: false,
  isActive: true,
  priority: 1,
  channel: 3,
  cardChannel: 4,
  isApplicableForB2CUser: true,
  gatewayChargeRate: 2.5,
  paymentGatewayChannel: 3,
  paymentGatewayCardType: 4,
};

export const paymentMethods: IPaymentMethod[] = [
  {
    paymentMethodId: 4,
    name: 'bKash',
    logoUrl:
      'https://otatestbucket1.s3.ap-south-1.amazonaws.com/https://cdn.firsttrip.com',
    isBank: false,
    isActive: true,
    priority: 1,
    channel: 3,
    cardChannel: 4,
    isApplicableForB2CUser: true,
    gatewayChargeRate: 2.5,
    paymentGatewayChannel: 3,
    paymentGatewayCardType: 4,
  },
  {
    paymentMethodId: 5,
    name: 'Nagad',
    logoUrl:
      'https://otatestbucket1.s3.ap-south-1.amazonaws.com/https://cdn.firsttrip.com',
    isBank: false,
    isActive: true,
    priority: 2,
    channel: 4,
    cardChannel: 6,
    isApplicableForB2CUser: true,
    gatewayChargeRate: 2,
    paymentGatewayChannel: 4,
    paymentGatewayCardType: 6,
  },
  {
    paymentMethodId: 15,
    name: 'Debit/Credit',
    logoUrl:
      'https://otatestbucket1.s3.ap-south-1.amazonaws.com/https://cdn.firsttrip.com',
    isBank: true,
    isActive: true,
    priority: 3,
    channel: 7,
    cardChannel: 1,
    isApplicableForB2CUser: true,
    gatewayChargeRate: 0,
    paymentGatewayChannel: 7,
    paymentGatewayCardType: 1,
  },
  {
    paymentMethodId: 6,
    name: 'Rocket',
    logoUrl:
      'https://otatestbucket1.s3.ap-south-1.amazonaws.com/https://cdn.firsttrip.com',
    isBank: false,
    isActive: true,
    priority: 4,
    channel: 6,
    cardChannel: 11,
    isApplicableForB2CUser: true,
    gatewayChargeRate: 1,
    paymentGatewayChannel: 6,
    paymentGatewayCardType: 11,
  },
  {
    paymentMethodId: 7,
    name: 'Upay',
    logoUrl:
      'https://otatestbucket1.s3.ap-south-1.amazonaws.com/https://cdn.firsttrip.com',
    isBank: false,
    isActive: true,
    priority: 5,
    channel: 5,
    cardChannel: 7,
    isApplicableForB2CUser: true,
    gatewayChargeRate: 0,
    paymentGatewayChannel: 5,
    paymentGatewayCardType: 7,
  },
];
