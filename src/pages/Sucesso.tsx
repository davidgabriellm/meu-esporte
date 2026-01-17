// Success.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Success() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <span className="text-3xl">🎉</span>
        </div>

        <h1 className="mb-2 text-2xl font-semibold text-gray-800">
          Pagamento realizado com sucesso!
        </h1>

        <p className="mb-6 text-gray-600">
          Obrigado pela sua compra. Você será redirecionado em instantes.
        </p>

        <div className="flex justify-center">
          <div className="h-2 w-2 animate-bounce rounded-full bg-green-500" />
          <div className="mx-1 h-2 w-2 animate-bounce rounded-full bg-green-500 [animation-delay:150ms]" />
          <div className="h-2 w-2 animate-bounce rounded-full bg-green-500 [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}
