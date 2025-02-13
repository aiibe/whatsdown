import Image from "next/image";

interface Props {
  size?: number;
}

export function Logo(props: Props) {
  const { size = 38 } = props;

  return (
    <div>
      <Image
        priority
        alt="whatsdown"
        width={size}
        height={size}
        src={"/logo.png"}
      />
    </div>
  );
}
