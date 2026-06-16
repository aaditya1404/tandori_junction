export default function Loading() {
  return (
    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-black
      text-white
      "
    >
      <div className="text-center">
        <div className="text-6xl animate-bounce">
          🍗
        </div>

        <p className="mt-4">
          Preparing Delicious Food...
        </p>
      </div>
    </div>
  );
}