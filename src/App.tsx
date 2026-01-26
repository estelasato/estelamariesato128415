import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './app/lib/queryClient';
import { Router } from './router';

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}
