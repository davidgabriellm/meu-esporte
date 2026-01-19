interface PriceProps {
  value: number | string;
  className?: string;
}

export default function PriceFormatter({ value, className }: PriceProps) {
  const amount = Number(value);

  if (isNaN(amount)) return null;

  const formattedPrice = new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  const [inteiro, decimal] = formattedPrice.split(",");

  return (
    <div className={`flex items-start ${className}`}>
      <span className="mt-[2px] mr-0.5 text-[14px]">R$</span>
      <span className="text-xl font-bold">{inteiro}</span>
      <span className="mt-[2px] self-start text-xs font-semibold">
        ,{decimal}
      </span>
    </div>
  );
}
