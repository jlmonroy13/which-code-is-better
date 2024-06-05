"use client";

import { useState, useTransition } from "react";
import Input from "@/components/Input";
import { FormProvider, useForm } from "react-hook-form";
import { AiFillGithub } from "react-icons/ai";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LoginSchema } from "@/schemas";
import { loginWithMagicLink, logInWithGithub } from "@/actions/loginAction";
import FormError from "@/components/auth/FormError";



type FormData = z.infer<typeof LoginSchema>;

const LogInForm = () => {
  const [error, setError] = useState<string>();
  const [isPending, startTransition] = useTransition();

  const methods = useForm<FormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
    },
  });
  const { handleSubmit } = methods;

  const onSubmit = (data: FormData) => {
    startTransition(() => {
      loginWithMagicLink(data).then((data) => {
        setError(data.error);
      });
    })
  };

  return (
    <FormProvider {...methods}>
      <form
        className="mx-auto w-full max-w-sm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input label="Email" type="email" id="email" disabled={isPending} />
        <div className="my-6 flex flex-col gap-1">
          <button
            type="submit"
            className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:border-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50 disabled:opacity-50"
            disabled={isPending}
          >
            Log in with Magic Link
          </button>

          <span className="block text-center font-bold text-gray-200">or</span>
          <button
            type="button"
            className="flex w-full items-center justify-center rounded-md bg-gray-800 px-4 py-2 text-white disabled:opacity-50"
            onClick={() => logInWithGithub()}
            disabled={isPending}
          >
            <AiFillGithub className="mr-2" />
            Sign in with GitHub
          </button>
        </div>
        <FormError message={error} />
      </form>
    </FormProvider>
  );
};

export default LogInForm;
