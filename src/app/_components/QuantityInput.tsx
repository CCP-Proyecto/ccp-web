import { FormControl } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  onValueChange: (value: string) => void;
  defaultValue: string;
  insideForm?: boolean;
}

export const QuantityInput: React.FC<Props> = ({
  defaultValue,
  onValueChange,
  insideForm = true,
}) => {
  // Generate quantity options from 0 to 100
  const quantityOptions = Array.from({ length: 100 }, (_, i) =>
    (i + 1).toString(),
  );

  const FormControlWrapper = insideForm ? FormControl : "div";

  return (
    <Select onValueChange={onValueChange} defaultValue={defaultValue}>
      <FormControlWrapper className="bg-transparent!">
        <SelectTrigger className="h-14 w-full rounded-full px-4 py-6">
          <div className="flex w-full items-center justify-between">
            <span className="text-muted-foreground">Cantidad</span>
            <div className="flex justify-between">
              <SelectValue placeholder="0" />
            </div>
          </div>
        </SelectTrigger>
      </FormControlWrapper>
      <SelectContent>
        {quantityOptions.map((quantity) => (
          <SelectItem key={quantity} value={quantity}>
            {quantity}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
