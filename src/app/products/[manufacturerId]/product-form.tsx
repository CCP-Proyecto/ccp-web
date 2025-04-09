"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductFormProps {
  form: any;
  index: number;
  isLast: boolean;
}

export function ProductForm({ form, index, isLast }: ProductFormProps) {
  // Generate quantity options from 0 to 100
  const quantityOptions = Array.from({ length: 101 }, (_, i) => i.toString());

  return (
    <div
      className={`space-y-4 ${!isLast ? "border-gray-200 border-b pb-8" : ""}`}
    >
      {index > 0 && (
        <div className="mb-4 text-center font-medium text-lg">
          Producto {index + 1}
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
                placeholder="Nombre"
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
                placeholder="Descripción"
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
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="h-14 rounded-full px-4">
                  <div className="flex w-full justify-between">
                    <span className="text-muted-foreground">Cantidad</span>
                    <SelectValue placeholder="0" />
                  </div>
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {quantityOptions.map((quantity) => (
                  <SelectItem key={quantity} value={quantity}>
                    {quantity}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
                placeholder="Condiciones de almacenamiento"
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
                placeholder="Precio unitario"
                type="number"
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
