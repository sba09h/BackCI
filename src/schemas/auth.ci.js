import { z } from "zod";

export const validateRegister = z.object({
  nombre: z.string({
    required_error: "nombre es requerido",
  }),
  correo: z
    .string({
      required_error: "correo es requerido",
    })
    .email({
      message: "correo invalido",
    }),
  run: z
    .string({
      required_error: "run es requerido",
    })
    .min(8, {
      message:
        "run debe tener minimo de 8 caracteres, incuido digito verificador",
    })
    .max(9, {
      message: "run debe tener maximo 9 caracteres, incuido digito verificador",
    }),
  numeroDoc: z
    .string({
      required_error: "numero de documento es requerido",
    })
    .min(8, {
      message: "numero de documento cuenta con un minimo de 8 caracteres",
    })
    .max(9, {
      message: "numero de documento cuenta con un maximo de 9 caracteres",
    }),
});

export const validateLogin = z.object({
  correo: z
    .string({
      required_error: "correo es requerido",
    })
    .email({
      message: "correo invalido",
    }),
  run: z
    .string({
      required_error: "run es requerido",
    })
    .min(8, {
      message: "run tiene un minimo de 8 caracteres",
    }),
});
