"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn } from "@/lib/auth-client";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().min(1, "El email es requerido"),
  password: z.string().min(1, "La contraseña es requerida"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const { error } = await signIn.email(
      {
        email,
        password,
      },
      {
        body: {
          app: "ccp-web",
        },
      },
    );

    if (error) {
      console.log(error);
      toast.error("Error al iniciar sesión", {
        classNames: {
          toast: "!bg-red-500/90",
        },
      });
      return;
    }

    router.push("/");
    toast("Bienvenido a CCP Admin");
  };

  const onSubmit = async (data: LoginFormValues) => {
    setIsSubmitting(true);
    await handleLogin(data);
    setIsSubmitting(false);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="font-normal text-4xl">Bienvenido</h1>
          <p className="mt-2">¡Bienvenido al módulo de administrador!</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Usuario"
                      className="h-14 rounded-sm"
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
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Contraseña"
                      className="h-14 rounded-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col items-center space-y-4 pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-12 w-40 rounded-full bg-primary-ccp text-white shadow-md hover:bg-slate-600"
              >
                Iniciar sesión
              </Button>

              <Link
                href="/sign-up"
                className="text-secondary-ccp transition-colors hover:text-slate-800"
              >
                Regístrate
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
