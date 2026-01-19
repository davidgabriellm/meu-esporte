import { useOrders } from "../../hooks/useOrders";
import PriceFormatter from "../../components/priceFormatter/PriceFormatter";
import { motion } from "framer-motion";
import { 
  MdOutlineShoppingBag, 
  MdErrorOutline, 
  MdAccessTime, 
  MdCheckCircle, 
  MdCancel, 
  MdLocationOn,
  MdCreditCard,
  MdPix,
  MdQrCode,
  MdAttachMoney
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Order } from "../../interface/order";




const formatDate = (dateString: string | undefined | null) => {
  if (!dateString) return "-";
  
  const date = new Date(dateString);
  
 
  if (isNaN(date.getTime())) return "Data Pendente";

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const translatePaymentMethod = (method: string) => {
  const map: Record<string, string> = {
    credit_card: "Cartão de Crédito",
    pix: "Pix",
    boleto: "Boleto",
    stripe: "Cartão (Stripe)",
  };
  return map[method] || method;
};

const getPaymentIcon = (method: string) => {
  switch (method) {
    case 'pix': return <MdPix size={18} className="text-teal-500" />;
    case 'boleto': return <MdQrCode size={18} className="text-gray-600" />;
    default: return <MdCreditCard size={18} className="text-blue-500" />;
  }
};


const StatusBadge = ({ status }: { status: string }) => {
  const config: Record<string, any> = {
    pending: { color: "bg-yellow-50 text-yellow-700 border-yellow-200", icon: <MdAccessTime />, label: "Aguardando" },
    paid:    { color: "bg-green-50 text-green-700 border-green-200", icon: <MdCheckCircle />, label: "Pago" },
    failed:  { color: "bg-red-50 text-red-700 border-red-200", icon: <MdCancel />, label: "Falha" },
    canceled:{ color: "bg-gray-100 text-gray-600 border-gray-200", icon: <MdCancel />, label: "Cancelado" },
  };

  const current = config[status] || config.pending;

  return (
    <span className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide ${current.color}`}>
      {current.icon} {current.label}
    </span>
  );
};

const MyOrders = () => {
  const { data: orders = [], isLoading, isError } = useOrders();
  const navigate = useNavigate();

  if (isLoading) return <div className="flex h-[60vh] items-center justify-center"><div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"/></div>;

  if (isError) return (
    <div className="flex h-[60vh] flex-col items-center justify-center text-gray-500">
      <MdErrorOutline size={48} className="mb-4 text-red-400" />
      <p>Erro ao carregar pedidos.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20 pt-10">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        
        <div className="mb-8 border-b border-gray-200 pb-6">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Meus Pedidos</h2>
          <p className="mt-2 text-gray-500">Histórico completo de compras</p>
        </div>

        {orders.length === 0 ? (
          <div className="flex flex-col items-center py-20 text-center bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="mb-4 rounded-full bg-gray-50 p-6"><MdOutlineShoppingBag size={48} className="text-gray-300" /></div>
            <h3 className="text-lg font-bold text-gray-900">Nenhum pedido encontrado</h3>
            <button onClick={() => navigate("/")} className="mt-6 rounded-full bg-blue-600 px-8 py-2.5 font-medium text-white hover:bg-blue-700 transition-all">Ir para a Loja</button>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            {orders.map((order: Order) => (
              <motion.div key={order.id} className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
                
            
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 bg-gray-50/80 p-5">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Pedido</span>
                    <span className="font-mono text-lg font-bold text-gray-900">#{order.id.split('-')[0]}</span>
                  </div>
                  
                  <div className="flex flex-col gap-1">
                     <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Data</span>
            
                     <span className="text-sm font-medium text-gray-900">
                       {formatDate(order.created_at || (order as any).createdAt)}
                     </span>
                  </div>

                  <div className="ml-auto">
                    <StatusBadge status={order.status} />
                  </div>
                </div>

              
                <div className="grid gap-0 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
                  
                
                  <div className="p-6 lg:col-span-2">
                    <h4 className="mb-4 flex items-center gap-2 text-sm font-bold text-gray-900 uppercase">
                      <MdOutlineShoppingBag className="text-blue-600" /> Produtos ({order.items?.length || 0})
                    </h4>
                    <div className="space-y-4">
                      {order.items?.map((item) => (
                        <div key={item.id} className="flex gap-4">
                          <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-gray-100 bg-white">
                            <img src={item.product.image_url} alt={item.product.name} className="h-full w-full object-contain p-2" />
                          </div>
                          <div className="flex flex-1 flex-col justify-center">
                            <h5 className="font-medium text-gray-900 line-clamp-2">{item.product.name}</h5>
                            <div className="mt-1 flex items-center gap-3 text-sm text-gray-500">
                              <span>Qtd: {item.quantity}</span>
                              <span className="h-1 w-1 rounded-full bg-gray-300"></span>
                              <span className="font-semibold text-gray-900">
                                <PriceFormatter value={item.price} />
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

              
                  <div className="flex flex-col bg-gray-50/30 p-6 lg:col-span-1">
                    <div className="mb-6">
                      <h4 className="mb-3 flex items-center gap-2 text-xs font-bold text-gray-500 uppercase">
                        <MdLocationOn size={16} /> Entrega
                      </h4>
                      {order.address ? (
                        <div className="rounded-lg border border-gray-100 bg-white p-3 text-sm text-gray-600 shadow-sm">
                          <p className="font-medium text-gray-900">{order.address.street}, {order.address.number}</p>
                          <p>{order.address.neighborhood}</p>
                          <p>{order.address.city} - {order.address.state}</p>
                          <p className="text-xs text-gray-400 mt-1">CEP: {order.address.zipcode}</p>
                        </div>
                      ) : (
                         <span className="text-sm italic text-gray-400">Endereço indisponível</span>
                      )}
                    </div>

                    <div className="mb-6">
                      <h4 className="mb-3 flex items-center gap-2 text-xs font-bold text-gray-500 uppercase">
                        <MdAttachMoney size={16} /> Pagamento
                      </h4>
                      {order.payment ? (
                        <div className="rounded-lg border border-gray-100 bg-white p-3 text-sm shadow-sm">
                           <div className="flex items-center gap-2 mb-1 text-gray-900 font-medium">
                              {getPaymentIcon(order.payment.method)}
                              {translatePaymentMethod(order.payment.method)}
                           </div>
                           <p className="text-xs text-gray-500">Status: {translatePaymentMethod(order.payment.status)}</p>
                        </div>
                      ) : (
                        <span className="text-sm italic text-gray-400">Pagamento pendente</span>
                      )}
                    </div>

                    <div className="mt-auto border-t border-gray-200 pt-4 bg-white/50 -mx-6 -mb-6 p-6">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>Total do Pedido</span>
                        </div>
                        <div className="flex items-center justify-between text-xl font-bold text-gray-900">
                          <span className="text-sm font-normal text-gray-400">BRL</span>
                          <PriceFormatter value={order.total} />
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;