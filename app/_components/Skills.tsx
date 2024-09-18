import { Badge } from "@/components/ui/badge";
import { Section } from "./Section";
import { HtmlIcon } from "./icons/HtmlLogo";
import { Code } from "./Code";
import { JavascriptIcon } from "./icons/Javascript.Logo";
import { GoLangIcon } from "./icons/GoLogo";
import { CssIcon } from "./icons/CssLogo";

export const Skills = () => {
  return (
    <Section className="flex flex-col items-start gap-4">
      <Badge variant={"outline"}>Skills</Badge>
      <h2 className="pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        I'm working with these languages for now ...
      </h2>
      <div className="flex max-md:flex-col gap-4 mb-4">
        <div className="flex flex-col gap-2 flex-1">
          <div className="flex flex-row">
            <HtmlIcon size={50} />
            <CssIcon size={50} />
          </div>
          <h3 className="text-xl font-bold tracking-tight ">HTML - CSS</h3>
          <p className="text-sm text-muted-foreground">
            An essential language in the web development. So do I use
            <Code>CSS 3</Code> with it.
          </p>
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <JavascriptIcon size={50} />
          <h3 className="text-xl font-bold tracking-tight ">Javascript </h3>
          <p className="text-sm text-muted-foreground">
            {" "}
            I can create interactive site using<Code>Javascript</Code> and I'm
            interested by<Code>React.js</Code> to master user experience.
          </p>
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <GoLangIcon size={50} />
          <h3 className="text-xl font-bold tracking-tight ">Golang</h3>
          <p className="text-sm text-muted-foreground">
            I use<Code>Golang</Code> as my first backend language.
          </p>
        </div>
      </div>
    </Section>
  );
};
