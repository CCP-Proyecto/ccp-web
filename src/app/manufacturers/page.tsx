"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
    api.manufacurer.createManufacturer.useMutation({
      onSuccess: () => {
        toast("Registro exitoso");
      },
      onError: (error) => {
        toast.error("Error al enviar el formulario", {
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
      <h1 className="mb-4 font-bold text-3xl">Registro de fabricantes</h1>
      <p className="mb-8">
        Por favor introduzca la siguiente información para el registro del
        fabricante:
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre cuenta</FormLabel>
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
              <FormItem>
                <FormLabel>Tipo de cuenta</FormLabel>
                <FormControl>
                  <Input {...field} className="h-12 rounded-full" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número de ID</FormLabel>
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
                <FormLabel>Teléfono</FormLabel>
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
                <FormLabel>Dirección</FormLabel>
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
                <FormLabel>Correo electrónico</FormLabel>
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
            <Button
              type="submit"
              disabled={isPending}
              // className="h-12 w-40 rounded-full bg-primary-ccp hover:bg-slate-600"
              variant="primaryCCP"
            >
              Registrarse
            </Button>

            <Button
              type="button"
              variant="ghostCCP"
              onClick={handleGoBack}
              // className="h-12 w-40 rounded-full border-none bg-slate-500 text-white hover:bg-slate-600"
            >
              Volver
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
