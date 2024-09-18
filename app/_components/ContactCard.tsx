import { Card } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";



export const ContactCard = (props: {
  image: string;
  mediumImage: string;
  name: string;
  descritpon: string;
  url: string;
}) => {
  return (
    <Link href={props.url}>
      <Card className="p-3 bg-accent/10 hover:bg-accent/30 transition-colors group flex items-center gap-4">
        <div className="relative">
          <Image
            src={props.image}
            alt={props.name}
            className="w-10 h-10 rounded-md object-contain"
          />
          <Image
            src={props.mediumImage}
            alt={props.name}
            className="w-4 h-4 absolute -bottom-2 -right-1 rounded-full object-contain"
          />
        </div>
        <div className="mr-auto">
          <div className="flex items-center gap-2">
            <p className="text-lg font-semibold">{props.name}</p>
          </div>
          <p className="text-xs text-muted-foreground">{props.descritpon}</p>
        </div>
        <ArrowUpRight
          className="group-hover:translate-x-2 mr-4 group-hover:-translate-y-2 transition-transform"
          size={12}
        />
      </Card>
    </Link>
  );
};
