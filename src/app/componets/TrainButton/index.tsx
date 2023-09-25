export const TrainButton = ({ handleTrain }: { handleTrain: () => void }) => {
  return (
    <div className="">
      <button
        className="rounded-lg bg-zinc-400 p-2 text-zinc-100  disabled:bg-slate-300 disabled:text-slate-200"
        onClick={handleTrain}
      >
        Train Model
      </button>
    </div>
  );
};
