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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/trpc/react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

const salesplanRegistrationSchema = z.object({
  name: z.string().min(3, "El nombre completo es demasiado corto"),
  description: z
    .string()
    .min(10, "La descripción es demasiado corta")
    .max(250, "La descripción es demasiado larga"),
  // z.enum(["MONTHLY", "QUARTERLY", "YEARLY"]),
  period: z.enum(["monthly", "quarterly", "yearly"], {
    errorMap: () => ({ message: "Seleccione un periodo" }),
  }),
});

type WarehouseRegistrationValues = z.infer<typeof salesplanRegistrationSchema>;

export default function RegistroVendedores() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { salesmanId } = useParams<{ salesmanId: string }>();

  const t = useTranslations("SalesPlanRegisterPage");
  const tf = useTranslations("SalesPlanRegisterPage.form");
  const tb = useTranslations("Button");
  const tt = useTranslations("Form");

  const { mutate: createSalesplan } = api.salesplan.createSalesplan.useMutation(
    {
      onError: (error) => {
        toast.error(`${tt("registration.error")}: ${error}`, {
          classNames: {
            toast: "!bg-red-500/90",
          },
        });
      },
      onSuccess: () => {
        toast.success(tt("registration.success"));
        form.reset();
        router.push("/");
      },
    },
  );

  const form = useForm<WarehouseRegistrationValues>({
    resolver: zodResolver(salesplanRegistrationSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (data: WarehouseRegistrationValues) => {
    setIsSubmitting(true);
    createSalesplan({ ...data, salesmanId });
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
                <FormLabel>{tf("name")}</FormLabel>
                <FormControl>
                  <Input {...field} className="h-12 rounded-full" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{tf("description")}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={tf("descriptionPlaceholder")}
                    className="resize-none rounded-xl bg-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="period"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{tf("periodType")}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full rounded-md border-input focus:ring-0">
                      <SelectValue placeholder={tf("periodDropdown")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="border-input bg-white">
                    <SelectItem value="monthly">
                      {tf("periodOptions.monthly")}
                    </SelectItem>
                    <SelectItem value="quarterly">
                      {tf("periodOptions.quarterly")}
                    </SelectItem>
                    <SelectItem value="yearly">
                      {tf("periodOptions.yearly")}
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* </FormField> */}

          <div className="flex flex-col items-center gap-4 pt-4">
            <Button
              className="w-min text-nowrap"
              type="submit"
              disabled={isSubmitting}
              variant="primaryCCP"
            >
              {tf("createButton")}
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
