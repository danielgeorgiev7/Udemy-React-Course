import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export function useLogout() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: logout, isLoading } = useMutation({
        mutationFn: logoutApi,
        onSuccess: () => {
            navigate("/login", { replace: true });
            queryClient.removeQueries();
        },
        onError: () => {
            toast.error("Provided email or password are incorrect");
        }
    });

    return { logout, isLoading };
}