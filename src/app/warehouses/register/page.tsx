"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const warehouseRegistrationSchema = z.object({
  name: z.string().min(3, "El nombre completo es demasiado corto"),
  address: z.string().min(5, "La dirección es demasiado corta"),
});

type WarehouseRegistrationValues = z.infer<typeof warehouseRegistrationSchema>;

export default function RegistroVendedores() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = useTranslations("WarehouseRegisterPage");
  const tf = useTranslations("WarehouseRegisterPage.form");
  const tfg = useTranslations("Form");
  const tfb = useTranslations("Button");

  const { mutate: createWarehouse } = api.warehouse.createWarehouse.useMutation(
    {
      onError: (error) => {
        toast.error(`${tfg("registration.error")}: ${error}`, {
          classNames: {
            toast: "!bg-red-500/90",
          },
        });
      },
      onSuccess: () => {
        toast.success(tfg("registration.success"));
        form.reset();
        router.push("/");
      },
    },
  );

  const form = useForm<WarehouseRegistrationValues>({
    resolver: zodResolver(warehouseRegistrationSchema),
    defaultValues: {
      name: "",
      address: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (data: WarehouseRegistrationValues) => {
    setIsSubmitting(true);
    createWarehouse(data);
    setIsSubmitting(false);
  };

  const handleGoBack = () => {
    // Implementar lógica para volver atrás
    router.back();
  };

  return (
    <div className="mx-auto max-w-md px-4 py-8">
      <h1 className="mb-4 font-bold text-3xl">{t("title")}</h1>
      <p className="mb-8">{t("subtitle")}</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{tf("warehouseName")}</FormLabel>
                <FormControl>
                  <Input {...field} className="h-12 rounded-full" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{tf("address")}</FormLabel>
                <FormControl>
                  <Input {...field} className="h-12 rounded-full" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col items-center gap-4 pt-4">
            <Button type="submit" disabled={isSubmitting} variant="primaryCCP">
              {tfb("register")}
            </Button>

            <Button type="button" variant="ghostCCP" onClick={handleGoBack}>
              {tfb("back")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
