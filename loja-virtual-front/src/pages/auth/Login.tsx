import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../../services/api";
import { useNavigate, Link } from "react-router-dom";

import { FaEye, FaEyeSlash, FaLock, FaEnvelope } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const schema = z.object({
  email: z.string().email("Digite um email válido"),
  password: z.string().min(1, "A senha é obrigatória"),
});

type LoginFormData = z.infer<typeof schema>;

export default function Login() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      setLoginError("");
      const response = await api.post("/sessions", data);
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/");
    },
    onError: (error: any) => {
      console.error(error);
      setLoginError("Email ou senha incorretos. Tente novamente.");
    },
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-12">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
        <div className="px-8 pt-8 pb-6 text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Bem-vindo!</h1>
          <p className="text-gray-500">
            Faça login para continuar suas compras.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 px-8 pb-8">
          {loginError && (
            <div className="flex animate-pulse items-center gap-2 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
              <MdErrorOutline size={18} />
              <span>{loginError}</span>
            </div>
          )}

          <div className="space-y-1">
            <label className="ml-1 text-sm font-semibold text-gray-700">
              Email
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <FaEnvelope />
              </div>
              <input
                type="email"
                placeholder="seu@email.com"
                className={`w-full rounded-xl border py-3 pr-4 pl-10 transition-all outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.email
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300"
                }`}
                {...register("email")}
              />
            </div>
            {errors.email && (
              <span className="ml-1 text-xs text-red-500">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="space-y-1">
            <div className="ml-1 flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-700">
                Senha
              </label>

              <Link to="#" className="text-xs text-blue-600 hover:underline">
                Esqueceu a senha?
              </Link>
            </div>

            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <FaLock />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                className={`w-full rounded-xl border py-3 pr-12 pl-10 transition-all outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.password
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300"
                }`}
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
            {errors.password && (
              <span className="ml-1 text-xs text-red-500">
                {errors.password.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loginMutation.isPending ? (
              <>
                <AiOutlineLoading3Quarters className="animate-spin" />
                Entrando...
              </>
            ) : (
              "Entrar"
            )}
          </button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">ou</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate("/register")}
            className="w-full rounded-xl border border-gray-200 bg-white py-3.5 font-semibold text-gray-800 transition-colors hover:bg-gray-50"
          >
            Criar nova conta
          </button>
        </form>
      </div>

      <div className="absolute bottom-6 text-xs text-gray-400">
        &copy; 2024 Sua Loja. Todos os direitos reservados.
      </div>
    </div>
  );
}
