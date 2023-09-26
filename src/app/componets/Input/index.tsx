export const Input = ({ input }: any) => {
  return (
    <div className="flex justify-between">
      <label htmlFor={input} title={input}>
        {`${input}: `}
      </label>
      <input
        className="px-2 rounded-lg"
        type="number"
        id={input}
        required
        min={0}
        step=".01"
      />
    </div>
  );
};
