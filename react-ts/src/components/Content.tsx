import { Part } from "./Part";

interface ContentProps {
  parts: {
    name: string;
    exerciseCount: number;
    kind: "basic" | "group" | "background" | "special";
    description?: string;
    backgroundMaterial?: string;
    groupProjectCount?: number;
  }[];
}

export const Content = (props: ContentProps) => {
  return (
    <div>
      {props.parts.map(part => (
        <Part key={part.name} {...part} />
      ))}
    </div>
  );
};
