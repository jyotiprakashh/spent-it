import { useLocalSearchParams } from 'expo-router';

import { AddTransactionForm } from '@/components/add-transaction/add-transaction-form';

export default function AddTransactionRoute(): React.JSX.Element {
  const params = useLocalSearchParams<{ id?: string }>();
  const editId = typeof params.id === 'string' ? parseInt(params.id, 10) : null;
  return <AddTransactionForm editId={Number.isFinite(editId) ? editId : null} />;
}
