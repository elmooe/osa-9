import { DiaryEntry } from "../types";

export const Diaries = (props: { diaries: DiaryEntry[] }) => {
  return (
    <div>
      {props.diaries.map(diary => (
        <div key={diary.date}>
          <h3>{diary.date}</h3>
          <div>visibility: {diary.visibility}</div>
          <div>weather: {diary.weather}</div>
        </div>
      ))}
    </div>
  );
};