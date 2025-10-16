interface CoursePart {
  kind: "basic" | "group" | "background" | "special";
  description?: string;
  backgroundMaterial?: string;
  groupProjectCount?: number;
  name: string;
  exerciseCount: number;
  requirements?: string[];
}

export const Part = (props: CoursePart) => {
  switch (props.kind) {
    case "basic":
      return (
        <div>
          <h3>{props.name} {props.exerciseCount}</h3>
          <p><i>{props.description}</i></p>
        </div>
      );
    case "group":
      return (
        <div>
          <h3>{props.name} {props.exerciseCount}</h3>
          <p>Project exercises: {props.groupProjectCount}</p>
        </div>
      );
    case "background":
      return (
        <div>
          <h3>{props.name} {props.exerciseCount}</h3>
          <p><i>{props.description}</i></p>
          <p>Background material: {props.backgroundMaterial}</p>
        </div>
      );
    case "special":
      return (
        <div>
          <h3>{props.name} {props.exerciseCount}</h3>
          <p><i>{props.description}</i></p>
          <p>Required skills: {props.requirements?.join(", ")}</p>
        </div>
      );
    default:
      return assertNever(props.kind);
  }
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};