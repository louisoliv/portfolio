import Link from "next/link";
import Image from "next/image";

export type WorkProps = {
  image: string;
  title: string;
  role: string;
  date: string;
  url: string;
};

export const Work = (props: WorkProps) => {
  return (
    <Link
      href={props.url || "#"}
      className="inline-flex items-center gap-4 hover:bg-accent/50 transition-colors p-1 rounded"
    >
      <Image
        src={props.image}
        alt={props.title}
        width={20}
        height={20}
        className="w-10 h-10 object-contain rounded-md"
      />
      <div>
        <p className="text-lg font-semibold">{props.title}</p>
        <p className="text-xs text-muted-foreground">{props.role}</p>
      </div>
      <div className="ml-auto">
        <p className="text-sm text-muted-foreground">{props.date}</p>
      </div>
    </Link>
  );
};
