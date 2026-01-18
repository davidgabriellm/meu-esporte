interface PriceProps {
  value: number;
}

export default function PriceFormatter({ value }: PriceProps) {
  const [inteiro, decimal] = value.toFixed(2).split(".");

  return (
    <div className="flex items-start">
      <span className="mr-0.5 text-[16px]">R$</span>
      <span className="text-xl font-bold">{inteiro}</span>
      <span className="self-start text-sm">{decimal}</span>
    </div>
  );
}
