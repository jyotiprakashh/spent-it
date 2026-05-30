import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { useMemo } from 'react';

import { useDb } from '@/db/context';
import { PaymentMethodRepository } from '@/db/repositories/payment-method-repository';
import type { PaymentMethod } from '@/types';

import { qk } from './query-keys';

export function usePaymentMethods(): UseQueryResult<PaymentMethod[], Error> {
  const db = useDb();
  const repo = useMemo(() => new PaymentMethodRepository(db), [db]);
  return useQuery<PaymentMethod[], Error>({
    queryKey: qk.paymentMethods(),
    queryFn: () => repo.getAll(),
  });
}
