import { cn } from "@/shared/utils/cn"
import * as React from "react"
import { Label } from "./label";
import { EyeIcon } from "lucide-react";
import { EyeOffIcon } from "lucide-react";
import type { MaskFunctions } from "@/app/utils/masks";
import masks from "@/app/utils/masks";

interface InputProps extends React.ComponentProps<"input"> {
  error?: string;
  isPassword?: boolean;
  label?: string;
  mask?: keyof MaskFunctions;
}
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, mask, type, error, isPassword = false, label, ...props }, ref) => {

    const [showPassword, setShowPassword] = React.useState(false);
    function handleShowPassword() {
      setShowPassword(!showPassword);
    }

    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist();
        props.onChange && props.onChange(e);

        if (mask) {
          const maskFunction: MaskFunctions[keyof MaskFunctions] = masks[mask];

          if (!maskFunction) throw new Error('Máscara não definida');

          const { value } = e.target as HTMLInputElement;
          const maskedValue = maskFunction(value);
          e.target.value = maskedValue;
        }
      },
      [mask, props.onChange]
    );


    React.useEffect(() => {
      if (mask) {
        const value = props.value;
        value && props.onChange?.(masks[mask](`${value}`) as any);
      }
    }, [mask, props.value, props.onChange])

    return (
      <div className="space-y-1">
        <div className="relative">
          {label && <Label htmlFor={label}>{label}</Label>}
          <input
            type={isPassword ? (showPassword ? "text" : "password") : type}
            className={cn(
              "flex h-10 w-full rounded-lg border border-input bg-transparent px-3 py-1 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              className
            )}
            ref={ref}
            {...props}
            onChange={handleChange}
          />
          {isPassword && (
            <div className="absolute right-3 top-[56%] " onClick={handleShowPassword}>
              {showPassword ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
            </div>
          )}
        </div>
        {error && <p className="text-red-500 text-xs">{error}</p>}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
