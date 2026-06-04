import { Card } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export type ContactCardProps = {
  image: string;
  mediumImage: string;
  name: string;
  descritpon: string;
  url: string;
};

export const ContactCard = (props: ContactCardProps) => {
  return (
    <Link href={props.url}>
      <Card className="p-3 bg-accent/10 hover:bg-accent/30 transition-colors group flex items-center gap-4 border-border/60 hover:border-primary/30">
        {/* Icône service */}
        <div className="size-9 rounded-lg bg-accent flex items-center justify-center shrink-0 overflow-hidden">
          <Image
            src={props.mediumImage}
            alt={props.name}
            width={22}
            height={22}
            className="object-contain"
          />
        </div>

        <div className="mr-auto min-w-0">
          <p className="text-sm font-semibold truncate">{props.name}</p>
          <p className="text-xs text-muted-foreground truncate">
            {props.descritpon}
          </p>
        </div>

        <ArrowUpRight
          className="shrink-0 mr-1 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
          size={14}
        />
      </Card>
    </Link>
  );
};
