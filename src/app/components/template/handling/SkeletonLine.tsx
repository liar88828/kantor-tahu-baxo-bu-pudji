export default function SkeletonLine() {
  return ( <div className="flex w-full flex-1 flex-col items-center ">
      <div
        className="m-5 w-1/2 animate-pulse flex-row items-center justify-center space-x-1 rounded-xl border  ">
        <div className="flex flex-col space-y-2">
          <div className="h-6 w-full rounded-md bg-gray-300 "></div>
        </div>
      </div>
    </div>
  );
};