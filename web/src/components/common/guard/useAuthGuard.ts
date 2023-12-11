import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { sessionsService } from '@/services/sessions';
import { extractTokenFromCookies } from '@/utils';

export const useAuthGaurd = () => {
  const navigate = useNavigate();

  const guardFn = async () => {
    try {
      const token = extractTokenFromCookies();
      if (token) {
        await sessionsService.verify(token);
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  const onDenied = () => {
    navigate('/entrar');
    toast('Faça login para acessa a plataforma', { type: 'error' });
  };

  return {
    guardFn,
    onDenied,
  };
};
