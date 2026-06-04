import { LucideIcon } from "lucide-react";
import Link from "next/link";

export type SideProjectProps = {
  Logo: LucideIcon;
  title: string;
  description: string;
  url: string;
  tags?: string[];
  featured?: boolean;
};

export const SideProject = (props: SideProjectProps) => {
  return (
    <Link
      href={props.url}
      className={`group flex items-start gap-4 p-3 rounded-xl hover:bg-accent/40 transition-colors ${
        props.featured ? "border border-primary/20 bg-primary/5" : ""
      }`}
    >
      <span className="bg-accent text-accent-foreground p-3 rounded-lg shrink-0 group-hover:bg-primary/15 transition-colors">
        <props.Logo size={16} />
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-sm font-semibold">{props.title}</p>
          {props.featured && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
              Alternance
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
          {props.description}
        </p>
        {props.tags && props.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {props.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-muted border border-border text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
};
