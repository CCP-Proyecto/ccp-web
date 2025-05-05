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
import { signUp } from "@/lib/auth-client";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const salesmanRegistrationSchema = z.object({
  name: z.string().min(3, "El nombre completo es demasiado corto"),
  idType: z.string().min(2, "El tipo de identificación es requerido"),
  id: z.string().min(1, "El número de ID es requerido"),
  phone: z
    .string()
    .min(10, "El número de teléfono es demasiado corto")
    .max(15, "El número de teléfono es demasiado largo")
    .transform((val) => val.replace(/[^\d+]/g, "")),
  email: z.string().email("El correo electrónico no es válido"),
  password: z.string().min(8, "La contraseña es demasiado corta"),
});

type SalesmanRegistrationValues = z.infer<typeof salesmanRegistrationSchema>;

export default function RegistroVendedores() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { mutate: createSalesman } = api.salesman.createSalesman.useMutation({
    onError: (error) => {
      toast.error(`Error al enviar el formulario: ${error.message}`, {
        classNames: {
          toast: "!bg-red-500/90",
        },
      });
    },

    onSuccess: () => {
      form.reset();
      router.push("/salesmans");
      toast("Registro de vendedor exitoso");
    },
  });

  const form = useForm<SalesmanRegistrationValues>({
    resolver: zodResolver(salesmanRegistrationSchema),
    defaultValues: {
      name: "",
      idType: "",
      id: "",
      phone: "",
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (data: SalesmanRegistrationValues) => {
    setIsSubmitting(true);
    try {
      const { email, password, name, id: userId, idType, phone } = data;
      const { error } = await signUp.email({
        email,
        password,
        name,
        userId,
        roles: ["salesman"],
      });

      if (error) {
        throw new Error(error.message);
      }

      createSalesman({
        name,
        idType,
        id: userId,
        phone,
        email,
      });
    } catch (error) {
      toast.error(`Error al enviar el formulario: ${error}`, {
        classNames: {
          toast: "!bg-red-500/90",
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoBack = () => {
    // Implementar lógica para volver atrás
    router.back();
  };

  return (
    <div className="mx-auto max-w-md px-4 py-8">
      <h1 className="mb-4 font-bold text-3xl">Registro de vendedores</h1>
      <p className="mb-8">
        Por favor introduzca la siguiente información para el registro del
        vendedor:
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre completo del vendedor</FormLabel>
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
                <FormLabel>Tipo de identificación</FormLabel>
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    {...field}
                    className="h-12 rounded-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col items-center gap-4 pt-4">
            <Button type="submit" disabled={isSubmitting} variant="primaryCCP">
              Registrarse
            </Button>

            <Button type="button" variant="ghostCCP" onClick={handleGoBack}>
              Volver
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
