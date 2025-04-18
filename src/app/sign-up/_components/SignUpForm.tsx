"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { authClient } from "@/lib/auth-client";
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
      const { email, password, name } = data;
      const { error } = await authClient.signUp.email({
        email,
        password,
        name,
        roles: ["admin"],
      });

      if (error) {
        console.log(error.message);
      }

      form.reset();

      toast("Registro exitoso");

      router.push("/login");
    } catch (error) {
      toast.error("Error al enviar el formulario");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 rounded-lg p-8">
        <div className="space-y-2">
          <h1 className="font-bold text-3xl">Empezar ahora</h1>
          <p className="text-gray-400">Registrarte es muy fácil y rápido</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John Doe"
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="you@example.com"
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
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="••••••••"
                      type="password"
                      {...field}
                      className="h-12 rounded-md border-[#333] placeholder:text-gray-500 focus:border-gray-500 focus:ring-0"
                    />
                  </FormControl>
                  <FormDescription className="text-gray-500 text-sm">
                    Debe tener al menos 8 caracteres
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="idType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de ID</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-12 rounded-md border-[#333] focus:ring-0">
                          <SelectValue placeholder="Select ID type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="border-[#333]">
                        <SelectItem value="CC">Cédula de Ciudadanía</SelectItem>
                        <SelectItem value="NIT">NIT</SelectItem>
                        <SelectItem value="other">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número de identificación</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter ID number"
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
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="+1 (555) 123-4567"
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
              {isSubmitting ? "Creating Account..." : "Sign Up"}
            </Button>
          </form>
        </Form>

        <div className="border-[#333] border-t pt-4 text-center">
          <p className="text-gray-400">
            Ya tienes una cuenta?{" "}
            <Link href="/login" className="text-cyan-700 hover:underline">
              Iniciar sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
