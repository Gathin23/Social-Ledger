export default function InfoDisplay({name}) {
  return (
    <div className="flex justify-center items-center">
      <div className="mt-10 w-64 h-20 bg-blue-200 p-4 rounded-md shadow-md">
        <p className="text-lg font-bold text-center">{name}</p>
      </div>
    </div>
  );
}
