import { BiSolidCheckCircle } from "react-icons/bi";

type FormSuccessProps = {
  message?: string;
};

const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null;

  return (
    <div className="mt-2 flex items-center rounded-md bg-green-100 p-2 text-xs text-green-700">
      <BiSolidCheckCircle className="mr-2 h-5 w-5" />
      <span>{message}</span>
    </div>
  );
};

export default FormSuccess;
