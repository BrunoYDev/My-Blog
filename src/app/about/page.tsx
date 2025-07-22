import Image from "next/image";

export default function AboutPage() {
  return (
    <Image
      style={{ display: "block", margin: "0 auto" }}
      src="/images/construction.gif"
      alt="Under Construction"
      width={600}
      height={200}
    />
  );
}