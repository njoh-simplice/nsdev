export default function App() {
  const buttonClick = () => {
    window.alert("Good dog!");
  };
  return (
    <div className="h-dvh flex flex-col justify-center items-center gap-y-5">
      <div className="font-bold text-2xl">Hello world</div>
      <button
        className="font-medium text-white bg-gray-950 px-8 py-3 rounded-md hover:opacity-90"
        onClick={buttonClick}
      >
        Clic Me!
      </button>
    </div>
  );
}
