"use client";
import { QuantityInput } from "@/app/_components/QuantityInput";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";

interface ProductFormProps {
  form: any;
  index: number;
  isLast: boolean;
  multiple?: boolean;
}

export function ProductForm({
  form,
  index,
  isLast,
  multiple,
}: ProductFormProps) {
  const t = useTranslations("AddProductPage.form");
  return (
    <div
      className={`space-y-4 ${!isLast ? "border-gray-200 border-b pb-8" : ""}`}
    >
      {multiple && (
        <div className="mb-4 text-center font-medium text-lg">
          {t("title")} {index + 1}
        </div>
      )}

      <FormField
        control={form.control}
        //@ts-ignore
        name={`productos.${index}.name`}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                {...field}
                placeholder={t("name")}
                className="h-14 rounded-full px-4"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        //@ts-ignore
        name={`productos.${index}.description`}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                {...field}
                placeholder={t("description")}
                className="h-14 rounded-full px-4"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        //@ts-ignore
        name={`productos.${index}.amount`}
        render={({ field }) => (
          <FormItem>
            <QuantityInput
              onValueChange={field.onChange}
              defaultValue={field.value}
              label={t("quantity")}
            />
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        //@ts-ignore
        name={`productos.${index}.storageCondition`}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                {...field}
                placeholder={t("storageConditions")}
                className="h-14 rounded-full px-4"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        //@ts-ignore
        name={`productos.${index}.price`}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                {...field}
                placeholder={t("unitPrice")}
                className="h-14 rounded-full px-4"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
