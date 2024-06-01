import { TbError404 } from "react-icons/tb";

interface Props {
  errorCode?: number;
  errorMessage?: string;
}

export const Error = ({ errorMessage }: Props) => {
  return (
    <div className="w-full h-[50vh] flex justify-center items-center flex-col">
      <TbError404 size={50} color="white" className="my-5" />
      <p className="text-3xl text-white font-outfit">
        {errorMessage ? errorMessage : "Failed to find resource"}
      </p>
    </div>
  );
};
