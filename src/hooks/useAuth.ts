import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthService } from "@/services";
import { CURRENT_USER_QUERY_KEY } from "@/constants";
import { useNavigate } from "react-router-dom";

export function useCurrentUser() {
  return useQuery({
    queryKey: [CURRENT_USER_QUERY_KEY],
    queryFn: AuthService.getCurrentUser,
    staleTime: 5 * 60 * 1000,
  });
}

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: AuthService.signIn,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [CURRENT_USER_QUERY_KEY],
      });
      navigate("/");
    },
  });
}

export function useRegister() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: AuthService.signUp,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [CURRENT_USER_QUERY_KEY],
      });
      navigate("/");
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: AuthService.signOut,
    onSuccess: async () => {
      queryClient.removeQueries({ queryKey: [CURRENT_USER_QUERY_KEY] });
      navigate("/");
    },
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: AuthService.resetPassword,
  });
}

export function useUpdatePassword() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: AuthService.updatePassword,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [CURRENT_USER_QUERY_KEY],
      });
      navigate("/");
    },
  });
}
