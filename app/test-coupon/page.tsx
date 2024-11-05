'use client';

import { CustomButton } from '@/components/custom-button';
import { cn } from '@/lib/shadcn/utils';
import { useState } from 'react';

// TODO: Must need remove before merge
export default function Page() {
  const [stateCoupon, setStateCoupon] = useState<string | undefined>(
    'coupon-1'
  );
  const paymentMethodWiseCouponList: string[] = [
    'coupon-1',
    'coupon-2',
    'coupon-3',
  ];

  const [tempSelectedCoupon, setTempSelectedCoupon] = useState(
    paymentMethodWiseCouponList.find((coupon) => coupon == stateCoupon)
  );

  return (
    <div className="bg-slate-50 py-20">
      <div className="container">
        {JSON.stringify(stateCoupon, undefined, 4)}

        <div className="max-w-[600px] rounded bg-white p-10 shadow-2xl">
          <div className="grid grid-cols-1 gap-3">
            {paymentMethodWiseCouponList.map((coupon, index) => (
              <div
                className={cn(
                  'flex min-h-8 items-center bg-red-200 px-4 py-2',
                  coupon == tempSelectedCoupon && 'bg-red-500'
                )}
                key={coupon + index}
                onClick={() => {
                  setTempSelectedCoupon(
                    coupon === tempSelectedCoupon ? undefined : coupon
                  );
                }}
              >
                {coupon}
              </div>
            ))}
          </div>

          <CustomButton
            disabled={
              paymentMethodWiseCouponList.length > 0 && !tempSelectedCoupon
            }
            colorScheme="primary"
            type="button"
            variant="fill"
            onButtonClick={() => {
              console.log(tempSelectedCoupon, 'tempSelectedCoupon');
              setStateCoupon(tempSelectedCoupon);
            }}
          >
            Confirm
          </CustomButton>
        </div>
      </div>
    </div>
  );
}
