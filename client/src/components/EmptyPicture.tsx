interface EmptyPictureProps {
  char: string;
}

const EmptyPicture = ({ char }: EmptyPictureProps) => {
  return (
    <div className="rounded-full w-10 h-10 bg-dark flex justify-center items-center ">
      <span className="text-white font-bold ">{char}</span>
    </div>
  );
};
export default EmptyPicture;
