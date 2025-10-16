interface TotalProps {
  exerciseCount: number;
}

export const Total = (props: TotalProps) => {
  return (
    <p>
      Number of exercises {props.exerciseCount}
    </p>
  );
};
