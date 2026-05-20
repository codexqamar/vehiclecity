import { cn } from "@/lib/utils";

/** UK number plate visual — yellow rear / white front style. */
export function Plate({
  reg,
  variant = "front",
  className,
}: {
  reg: string;
  variant?: "front" | "rear";
  className?: string;
}) {
  const bg = variant === "front" ? "bg-[#f5f5f0]" : "bg-[#f4d03f]";
  return (
    <span
      className={cn(
        "inline-flex items-stretch overflow-hidden rounded-[6px] border border-black/15 shadow-soft select-none",
        className,
      )}
    >
      <span className="flex w-5 flex-col items-center justify-center bg-[#0a3d91] text-[8px] font-bold text-yellow-300 leading-none px-0.5">
        <span>UK</span>
      </span>
      <span className={cn("plate-font text-black px-2.5 py-1 text-base", bg)}>{reg}</span>
    </span>
  );
}
