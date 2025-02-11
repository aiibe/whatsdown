import Image from "next/image";

interface Props {
  size?: number;
}

export function Logo(props: Props) {
  const { size = 38 } = props;

  return (
    <div className="p-2">
      <Image alt="whatsdown" width={size} height={size} src={"/logo.png"} />
    </div>
  );
}
