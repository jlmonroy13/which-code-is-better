import { BiSolidError } from "react-icons/bi";


type FormErrorProps = {
  message?: string;
};

const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;

  return (
    <div className="mt-2 flex items-center rounded-md bg-red-100 p-2 text-xs text-red-700">
      <BiSolidError className="mr-2 h-5 w-5" />
      <span>{message}</span>
    </div>
  );
};

export default FormError;
