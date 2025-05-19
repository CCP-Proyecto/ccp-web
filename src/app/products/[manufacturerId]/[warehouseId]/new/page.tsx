"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { api } from "@/trpc/react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { ProductForm } from "./product-form";

const productoSchema = z.object({
  name: z.string().min(2, "El nombre es requerido"),
  description: z.string().min(5, "La descripción es requerida"),
  amount: z.string().min(1, "La cantidad es requerida"),
  storageCondition: z
    .string()
    .min(5, "Las condiciones de almacenamiento son requeridas"),
  price: z.string().min(0, "El precio unitario es requerido"),
  warehouseId: z.string().optional(),
});

const productosSchema = z.object({
  productos: z.array(productoSchema),
});

type ProductosFormValues = z.infer<typeof productosSchema>;

export default function AgregarProductosPage() {
  const router = useRouter();
  const params = useParams<{ manufacturerId: string; warehouseId: string }>();
  const { manufacturerId, warehouseId } = params;

  const t = useTranslations("AddProductPage");
  const tt = useTranslations("AddProductPage.toast");
  const tf = useTranslations("AddProductPage.form");
  const tb = useTranslations("Button");

  const form = useForm<ProductosFormValues>({
    resolver: zodResolver(productosSchema),
    defaultValues: {
      productos: [
        {
          name: "",
          description: "",
          amount: "",
          storageCondition: "",
          price: "",
        },
      ],
    },
  });

  const { fields, append } = useFieldArray({
    control: form.control,
    name: "productos",
  });

  const { mutate: addProductsToManufacturer } =
    api.product.addProductsToManufacturer.useMutation({
      onSuccess: () => {
        toast(tt("success"));
        router.push("/");
      },

      onError: (error) => {
        toast.error(`${tt("error")} ${error}`, {
          classNames: {
            toast: "!bg-red-500/90",
          },
        });
      },
    });

  const onSubmit = async (data: ProductosFormValues) => {
    const products = data.productos.map((product) => ({
      name: product.name,
      description: product.description,
      amount: Number(product.amount),
      storageCondition: product.storageCondition,
      price: Number(product.price),
      manufacturerId: manufacturerId,
    }));

    addProductsToManufacturer({
      products,
      warehouseId: Number(warehouseId),
    });
  };

  const handleAddProduct = () => {
    append({
      name: "",
      description: "",
      storageCondition: "",
      price: "",
      amount: "",
    });
  };

  return (
    <div className="mx-auto max-w-md px-4 py-8">
      <h1 className="mb-8 font-normal text-3xl">{t("title")}</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {fields.map((field, index) => (
            <ProductForm
              key={field.id}
              form={form}
              index={index}
              isLast={index === fields.length - 1}
              multiple={fields.length > 1}
            />
          ))}

          <div className="flex justify-center">
            <Button
              type="button"
              onClick={handleAddProduct}
              variant="primaryCCP"
              size="defaultIcon"
            >
              <Plus className="h-8 w-8" />
              <span className="sr-only">{tf("addMoreButton")}</span>
            </Button>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-8">
            <Button
              className="w-min text-nowrap"
              type="submit"
              variant="primaryCCP"
            >
              {tf("submitButton")}
            </Button>
            <Button
              type="button"
              variant="ghostCCP"
              onClick={() => router.back()}
            >
              {tb("back")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
