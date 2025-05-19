"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { IDTypeField } from "@/app/_components/IDTypeField";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signUp } from "@/lib/auth-client";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface SignUpFormType {
  email: string;
  password: string;
}

interface SignUpFormData extends SignUpFormType {
  id: string;
  idType: string;
  name: string;
  phone: string;
}
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  idType: z.string().min(1, {
    message: "Please select an ID type.",
  }),
  id: z.string().min(1, {
    message: "Please enter your ID number.",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
});

export const SignUpForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const tfg = useTranslations("Form");
  const t = useTranslations("SignUpPage");
  const tf = useTranslations("SignUpPage.form");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      idType: "",
      id: "",
      phone: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (data: SignUpFormData) => {
    setIsSubmitting(true);

    try {
      const { email, password, name, id: userId } = data;
      const { error } = await signUp.email({
        email,
        password,
        name,
        userId,
        roles: ["admin"],
      });

      if (error) {
        throw new Error(error.message);
      }

      form.reset();

      toast(tfg("registration.success"));

      router.push("/login");
    } catch (error) {
      toast.error(`${tfg("registration.error")}: ${error}`, {
        classNames: {
          toast: "!bg-red-500/90",
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-lg space-y-6 rounded-lg p-8">
        <div className="space-y-2">
          <h1 className="font-bold text-3xl">{t("title")}</h1>
          <p className="text-gray-400">{t("subtitle")}</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{tf("name")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={tf("namePlaceholder")}
                      {...field}
                      className="h-12 rounded-md border-[#333] placeholder:text-gray-500 focus:border-gray-500 focus:ring-0"
                    />
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
                  <FormLabel>{tf("email")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={tf("emailPlaceholder")}
                      type="email"
                      {...field}
                      className="h-12 rounded-md border-[#333] placeholder:text-gray-500 focus:border-gray-500 focus:ring-0"
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
                  <FormLabel>{tf("password")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="••••••••"
                      type="password"
                      {...field}
                      className="h-12 rounded-md border-[#333] placeholder:text-gray-500 focus:border-gray-500 focus:ring-0"
                    />
                  </FormControl>
                  <FormDescription className="text-gray-500 text-sm">
                    {tf("passwordHelp")}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="idType"
                render={({ field }) => <IDTypeField field={field} />}
              />

              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{tf("idNumber")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={tf("idNumberPlaceholder")}
                        {...field}
                        className="h-12 rounded-md border-[#333] placeholder:text-gray-500 focus:border-gray-500 focus:ring-0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{tf("phone")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={tf("phonePlaceholder")}
                      {...field}
                      className="h-12 rounded-md border-[#333] placeholder:text-gray-500 focus:border-gray-500 focus:ring-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-12 w-full rounded-md bg-gray-200 font-medium text-black hover:bg-gray-300"
            >
              {isSubmitting ? tf("registerButtonSubmit") : tf("registerButton")}
            </Button>
          </form>
        </Form>

        <div className="border-[#333] border-t pt-4 text-center">
          <p className="text-gray-400">
            {tf("loginPrompt")}{" "}
            <Link href="/login" className="text-cyan-700 hover:underline">
              {tf("loginLink")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
