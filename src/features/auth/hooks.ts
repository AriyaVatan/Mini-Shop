import { useMutation } from "@tanstack/react-query";
import { loginApi } from "./api";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/admin");
    },
  });
}
