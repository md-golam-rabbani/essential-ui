'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MainComponent } from './main';

// Create a client
const queryClient = new QueryClient();

export default function Page() {
  return (
    <QueryClientProvider client={queryClient}>
      <MainComponent />
    </QueryClientProvider>
  );
}
