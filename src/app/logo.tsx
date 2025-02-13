import Image from "next/image";
import Link from "next/link";

interface Props {
  size?: number;
}

export function Logo(props: Props) {
  const { size = 38 } = props;

  return (
    <Link href="/">
      <Image
        priority
        alt="whatsdown"
        width={size}
        height={size}
        src={"/logo.png"}
      />
    </Link>
  );
}
