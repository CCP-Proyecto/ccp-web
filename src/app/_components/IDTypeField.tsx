import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface Props {
  triggerClassName?: string;
  popupClassName?: string;
  field: any;
}

export const IDTypeField: React.FC<Props> = ({
  field,
  popupClassName,
  triggerClassName,
}) => {
  return (
    <FormItem>
      <FormLabel>Tipo de ID</FormLabel>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger
            className={cn(
              "w-full rounded-md border-[#333] focus:ring-0",
              triggerClassName,
            )}
          >
            <SelectValue placeholder="Tipo de identificación" />
          </SelectTrigger>
        </FormControl>
        <SelectContent className={cn("border-[#333] bg-white", popupClassName)}>
          <SelectItem value="CC">Cédula de Ciudadanía</SelectItem>
          <SelectItem value="NIT">NIT</SelectItem>
          <SelectItem value="other">Otro</SelectItem>
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  );
};
