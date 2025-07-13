import { cn } from "@/lib/utils";

function Card({ children, className }: { children?: React.ReactNode, className?: string }) {
  return (
    <div className={cn("flex flex-col bg-white rounded-2xl shadow-[0_0_4px_rgba(0,0,0,0.25)] py-5 px-4", className)}>
      {children}
    </div>
  );
}

const CardHeader = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => (
  <span
    className={cn(
      "text-2xl pb-5 pr-4 mb-2 border-b border-b-gray-300 size-fit",
      className
    )}
  >
    {children}
  </span>
);

CardHeader.displayName = "Card.Header";
Card.Header = CardHeader;

export default Card;