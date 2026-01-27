import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { loginSchema, type LoginSchemaFormData } from '../../../domain/validators/authValidator';
import { authFacade } from '../../../app/facades/authFacade';

export function useLogin() {
  const navigate = useNavigate();

  const form = useForm<LoginSchemaFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const { mutate, isPending, error } = useMutation({
    mutationFn: authFacade.signIn,
    onSuccess: () => {
      navigate('/', { replace: true });
    },
  });

  function handleSubmit(data: LoginSchemaFormData) {
    mutate(data);
  }

  return {
    form,
    handleSubmit: form.handleSubmit(handleSubmit),
    isLoading: isPending,
    error: error,
  };
}
