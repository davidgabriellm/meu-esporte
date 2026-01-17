import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../../services/api";
import { useNavigate, Link } from "react-router-dom";

// Ícones
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
  
  // Estado para mostrar/ocultar senha e erro geral da API
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
      // Limpa erro anterior antes de tentar
      setLoginError("");
      const response = await api.post("/sessions", data);
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      // Atualiza caches do React Query se necessário
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/"); 
    },
    onError: (error: any) => {
      console.error(error);
      // Mensagem amigável de erro
      setLoginError("Email ou senha incorretos. Tente novamente.");
    },
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        
        {/* Cabeçalho do Card */}
        <div className="px-8 pt-8 pb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Bem-vindo!</h1>
          <p className="text-gray-500">Faça login para continuar suas compras.</p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit(onSubmit)} className="px-8 pb-8 space-y-5">
          
          {/* Alerta de Erro da API */}
          {loginError && (
            <div className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm border border-red-100 animate-pulse">
              <MdErrorOutline size={18} />
              <span>{loginError}</span>
            </div>
          )}

          {/* Input Email */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700 ml-1">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <FaEnvelope />
              </div>
              <input
                type="email"
                placeholder="seu@email.com"
                className={`w-full pl-10 pr-4 py-3 rounded-xl border outline-none transition-all focus:ring-2 focus:ring-blue-500 ${
                  errors.email ? "border-red-500 focus:ring-red-200" : "border-gray-300"
                }`}
                {...register("email")}
              />
            </div>
            {errors.email && (
              <span className="text-xs text-red-500 ml-1">{errors.email.message}</span>
            )}
          </div>

          {/* Input Senha */}
          <div className="space-y-1">
            <div className="flex justify-between items-center ml-1">
              <label className="text-sm font-semibold text-gray-700">Senha</label>
              {/* Link esqueci minha senha (Visual apenas por enquanto) */}
              <Link to="#" className="text-xs text-blue-600 hover:underline">
                Esqueceu a senha?
              </Link>
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <FaLock />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                className={`w-full pl-10 pr-12 py-3 rounded-xl border outline-none transition-all focus:ring-2 focus:ring-blue-500 ${
                  errors.password ? "border-red-500 focus:ring-red-200" : "border-gray-300"
                }`}
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
            {errors.password && (
              <span className="text-xs text-red-500 ml-1">{errors.password.message}</span>
            )}
          </div>

          {/* Botão de Login */}
          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-blue-600/20"
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

          {/* Divisor */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">ou</span>
            </div>
          </div>

          {/* Botão Criar Conta */}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="w-full bg-white hover:bg-gray-50 text-gray-800 font-semibold py-3.5 rounded-xl border border-gray-200 transition-colors"
          >
            Criar nova conta
          </button>

        </form>
      </div>
      
      {/* Footer simples */}
      <div className="absolute bottom-6 text-gray-400 text-xs">
        &copy; 2024 Sua Loja. Todos os direitos reservados.
      </div>
    </div>
  );
}