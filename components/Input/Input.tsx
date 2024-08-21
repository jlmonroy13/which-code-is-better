"use client";
import cx from "classnames";
import { InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";

type InputProps = {
  label: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = ({ label, id = "", type = "text", ...rest }: InputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = errors?.[id]?.message as string;
  const hasError = !!error;

  return (
    <div className="relative mb-4 pb-2">
      <label
        htmlFor={id}
        className={cx("block text-sm font-medium text-gray-400", {
          "text-red-400": hasError,
        })}
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        {...register(id, { required: `${label} is required` })}
        className={cx(
          "mt-1 block w-full rounded-md border-gray-300 p-2 text-slate-950 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-white/90",
          {
            "border-red-400 border-2": hasError,
          },
        )}
        {...rest}
      />
      {hasError && (
        <p className="absolute left-0 mt-1 text-xs text-red-400">{error}</p>
      )}
    </div>
  );
};

export default Input;
