"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
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
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { IDTypeField } from "../_components/IDTypeField";

const registroFabricanteSchema = z.object({
  name: z.string().min(3, "El nombre de cuenta es demasiado corto"),
  idType: z.string().min(2, "El tipo de ID es requerido"),
  id: z.string().min(1, "El número de ID es requerido"),
  phone: z
    .string()
    .min(10, "El número de teléfono es demasiado corto")
    .max(15, "El número de teléfono es demasiado largo")
    .transform((val) => val.replace(/[^\d+]/g, "")),
  address: z.string().min(5, "La dirección es demasiado corta"),
  email: z.string().email("El correo electrónico no es válido"),
});

type CreateManufacturerData = z.infer<typeof registroFabricanteSchema>;

export default function RegistroFabricantes() {
  const t = useTranslations("ManufacturerRegistrationPage");
  const tb = useTranslations("Button");
  const tf = useTranslations("Form");

  const form = useForm<CreateManufacturerData>({
    resolver: zodResolver(registroFabricanteSchema),
    defaultValues: {
      name: "",
      idType: "",
      id: "",
      phone: "",
      address: "",
      email: "",
    },
  });

  const router = useRouter();

  const { mutate: createManufacturer, isPending } =
    api.manufacturer.createManufacturer.useMutation({
      onSuccess: () => {
        toast(tf("registration.success"));
      },
      onError: (error) => {
        toast.error(`${tf("registration.error")}: ${error}`, {
          classNames: {
            toast: "!bg-red-500/90",
          },
        });
      },
    });

  const onSubmit = async (data: CreateManufacturerData) => {
    createManufacturer(data);
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
                <FormLabel>{t("form.accountName")}</FormLabel>
                <FormControl>
                  <Input {...field} className="h-12 rounded-full" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="idType"
            render={({ field }) => (
              <IDTypeField
                field={field}
                triggerClassName="rounded-full h-12 border-input"
                popupClassName="border-input"
              />
            )}
          />

          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("form.idNumber")}</FormLabel>
                <FormControl>
                  <Input {...field} className="h-12 rounded-full" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("form.phone")}</FormLabel>
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
                <FormLabel>{t("form.address")}</FormLabel>
                <FormControl>
                  <Input {...field} className="h-12 rounded-full" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("form.email")}</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    {...field}
                    className="h-12 rounded-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col items-center gap-4 pt-4">
            <Button type="submit" disabled={isPending} variant="primaryCCP">
              {tb("register")}
            </Button>

            <Button type="button" variant="ghostCCP" onClick={handleGoBack}>
              {tb("back")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
