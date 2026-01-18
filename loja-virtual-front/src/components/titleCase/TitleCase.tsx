interface TitleCaseProps {
  text: string;
  className?: string;
}

const TitleCase = ({ text, className }: TitleCaseProps) => {
  if (!text) return null;

  const formatted =
    text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

  return <h2 className={className}>{formatted}</h2>;
};

export default TitleCase;