export interface IBooking {
  amount: number;
  bin: string;
  bookingId: number;
  uniqueTransID: string;
  callBackUrl: string;
  cardType: number;
  channel: number;
  paymentMethodId: number;
  paymentMethodCardInformationId: number;
  dynamicDiscountCode: string | null;
  couponType: number;
  couponCode: string;
  couponDiscountAmount: number;
  couponDiscountPercentage: number;
  totalRoomRate: number;
  checkInDate: string; // Date in ISO 8601 format
  checkOutDate: string; // Date in ISO 8601 format
  customer: ICustomer;
  emiInfo: IEmiInfo;
}

export interface ICustomer {
  mobileNo: string;
  email: string;
  firstName: string;
  lastName: string;
  billAddressLine: string;
  billAddressCity: string;
  billAddressCountry: string; // Might be better as an enum for specific countries
  billAddressPostalCode: string;
}

export interface IEmiInfo {
  emiConfigId: number;
  emiBankChargeRate: number;
  emiCustomerChargeRate: number;
  totalEmiBankChargeAmount: number;
  totalEmiCustomerChargeAmount: number;
  emiMonth: number;
}

export interface IEmiDetails {
  month: number;
  bankChargeRate: number;
  customerChargeRate: number;
  eligibleForDiscount: boolean;
}

export interface IBankInfo {
  emiConfigId: number;
  bankInfoId: number;
  bankName: string;
  emiLogoPath: string;
  emiDetails: IEmiDetails[];
}

export interface ICoupon {
  id: number;
  description: string;
  code: string;
  couponType: number;
  defaultPaymentMethodId: number;
  maximumDiscountAmount: number;
  discountPercentage: number;
}

export interface IPaymentMethod {
  paymentMethodId: number;
  name: string;
  logoUrl: string;
  isBank: boolean;
  isActive: boolean;
  priority: number;
  channel: number;
  cardChannel: number;
  isApplicableForB2CUser: boolean;
  gatewayChargeRate: number;
  paymentGatewayChannel: number;
  paymentGatewayCardType: number;
}
