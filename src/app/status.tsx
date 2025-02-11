export enum STATE {
  UP = "up",
  DOWN = "down",
  STALE = "stale",
}

interface Props {
  state: STATE;
}

export function Status(props: Props) {
  const { state = STATE.STALE } = props;

  let color = "bg-gray-500";

  switch (state) {
    case STATE.UP:
      color = "bg-green-500";
      break;
    case STATE.DOWN:
      color = "bg-red-500";
      break;
    default:
      color = "bg-gray-500";
  }

  return (
    <div
      className={`px-2.5 py-0.5 ${color}  rounded-full  inline-flex items-center `}
    >
      <span className="text-white text-xs uppercase font-bold">{state}</span>
    </div>
  );
}
