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


  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: authFacade.signIn,
    onSuccess: () => {
      navigate('/pets', { replace: true });
    },
  });

  function handleSubmit(data: LoginSchemaFormData) {
    mutateAsync(data);
  }

  return {
    form,
    handleSubmit: form.handleSubmit(handleSubmit),
    isLoading: isPending,
    error: error,
  };
}
