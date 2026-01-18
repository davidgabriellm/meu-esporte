import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom"; 
import { useRegister } from "../../hooks/queries/useRegister";

// Ícones
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { MdErrorOutline, MdCheckCircle } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const schema = z
  .object({
    name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
    email: z.string().email("Digite um email válido"),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "As senhas não coincidem",
    path: ["passwordConfirmation"],
  });

type RegisterFormData = z.infer<typeof schema>;

export default function Register() {
  const navigate = useNavigate(); 
  const { mutate: registerUser, isPending } = useRegister();
  
  // Estados visuais
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: RegisterFormData) => {
    setRegisterError("");
    setSuccessMsg("");

    registerUser({
      name: data.name,
      email: data.email,
      password: data.password,
      passwordConfirmation: data.passwordConfirmation, 
    }, {
      onSuccess: () => {
        setSuccessMsg("Conta criada com sucesso! Redirecionando...");
        // Pequeno delay para o usuário ler a mensagem de sucesso
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      },
      onError: (error: any) => {
        console.error(error);
        // Tenta pegar a mensagem do backend ou usa uma genérica
        const msg = error?.response?.data?.message || "Erro ao criar conta. Tente novamente.";
        setRegisterError(msg);
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        
        <div className="px-8 pt-8 pb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Crie sua conta</h1>
          <p className="text-gray-500">Preencha seus dados para começar.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="px-8 pb-8 space-y-5">
          
          {/* Feedback de Erro */}
          {registerError && (
            <div className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm border border-red-100 animate-pulse">
              <MdErrorOutline size={18} />
              <span>{registerError}</span>
            </div>
          )}

          {/* Feedback de Sucesso */}
          {successMsg && (
             <div className="flex items-center gap-2 bg-green-50 text-green-600 px-4 py-3 rounded-lg text-sm border border-green-100">
             <MdCheckCircle size={18} />
             <span>{successMsg}</span>
           </div>
          )}

          {/* Nome */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700 ml-1">Nome Completo</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <FaUser />
              </div>
              <input
                placeholder="Seu nome"
                className={`w-full pl-10 pr-4 py-3 rounded-xl border outline-none transition-all focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                {...register("name")}
              />
            </div>
            {errors.name && <span className="text-xs text-red-500 ml-1">{errors.name.message}</span>}
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700 ml-1">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <FaEnvelope />
              </div>
              <input
                placeholder="seu@email.com"
                className={`w-full pl-10 pr-4 py-3 rounded-xl border outline-none transition-all focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                {...register("email")}
              />
            </div>
            {errors.email && <span className="text-xs text-red-500 ml-1">{errors.email.message}</span>}
          </div>

          {/* Senha */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700 ml-1">Senha</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <FaLock />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Mínimo 6 caracteres"
                className={`w-full pl-10 pr-12 py-3 rounded-xl border outline-none transition-all focus:ring-2 focus:ring-blue-500 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && <span className="text-xs text-red-500 ml-1">{errors.password.message}</span>}
          </div>

          {/* Confirmar Senha */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700 ml-1">Confirmar Senha</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <FaLock />
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Repita a senha"
                className={`w-full pl-10 pr-12 py-3 rounded-xl border outline-none transition-all focus:ring-2 focus:ring-blue-500 ${errors.passwordConfirmation ? 'border-red-500' : 'border-gray-300'}`}
                {...register("passwordConfirmation")}
              />
               <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.passwordConfirmation && <span className="text-xs text-red-500 ml-1">{errors.passwordConfirmation.message}</span>}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-orange-500/20 mt-4"
          >
            {isPending ? (
               <>
                 <AiOutlineLoading3Quarters className="animate-spin" />
                 Cadastrando...
               </>
            ) : "Criar Conta"}
          </button>

          {/* Divisor */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Já tem uma conta?</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="w-full bg-white hover:bg-gray-50 text-blue-900 font-semibold py-3.5 rounded-xl border border-gray-200 transition-colors"
          >
            Fazer Login
          </button>

        </form>
      </div>
    </div>
  );
}