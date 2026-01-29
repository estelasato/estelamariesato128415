import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './app/lib/queryClient';
import { Router } from './router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <ToastContainer position="top-right" />
    </QueryClientProvider>
  );
}
