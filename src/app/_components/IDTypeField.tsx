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
import { useTranslations } from "next-intl";

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
  const t = useTranslations("ManufacturerRegistrationPage.form");
  return (
    <FormItem>
      <FormLabel>{t("idType")}</FormLabel>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger
            className={cn(
              "w-full rounded-md border-[#333] focus:ring-0",
              triggerClassName,
            )}
          >
            <SelectValue placeholder={t("idTypeDropdown")} />
          </SelectTrigger>
        </FormControl>
        <SelectContent className={cn("border-[#333] bg-white", popupClassName)}>
          <SelectItem value="CC">{t('CC')}</SelectItem>
          <SelectItem value="NIT">{t('NIT')}</SelectItem>
          <SelectItem value="other">{t('other')}</SelectItem>
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  );
};
