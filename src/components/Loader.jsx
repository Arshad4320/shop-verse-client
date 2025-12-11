import { ThreeCircles } from "react-loader-spinner";

export const Loader = () => {
  return (
    <div className="flex items-center justify-center p-32">
      <ThreeCircles
        height={50}
        width={50}
        radius={9}
        color="#9333ea"
        ariaLabel="audio-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};
