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
import { useTranslations } from "next-intl";

const loginSchema = z.object({
  email: z.string().min(1, "El email es requerido"),
  password: z.string().min(1, "La contraseña es requerida"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const t = useTranslations("LoginPage");

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
          <h1 className="font-normal text-4xl">{t("title")}</h1>
          <p className="mt-2">{t("subtitle")}</p>
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
                      placeholder={t("form.email")}
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
                      placeholder={t("form.password")}
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
                {t("form.loginButton")}
              </Button>

              <Link
                href="/sign-up"
                className="text-secondary-ccp transition-colors hover:text-slate-800"
              >
                {t("form.registerButton")}
              </Link>
            </div>
          </form>
        </Form>
      </div>
      <p className="pt-50 text-sm">Version: 0.3.5</p>
    </div>
  );
};
