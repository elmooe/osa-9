import React from 'react';
import { Visibility, Weather } from '../types';

interface NewDiaryFormProps {
  diaryCreation: (event: React.SyntheticEvent) => void;
}

export const NewDiaryForm = ({ diaryCreation }: NewDiaryFormProps) => {
  return (
    <form onSubmit={diaryCreation}>
      <div>
        date
        <input type="date" name="date" />
      </div>
      <div>
          <h3>visibility</h3>
          {Object.values(Visibility).map(v => (
            <div key={v}>
              <input type="radio" id={`visibility-${v}`} name="visibility" value={v} />
              <label htmlFor={`visibility-${v}`}>{v}</label>
            </div>
          ))}
      </div>
      <div>
          <h3>weather</h3>
          {Object.values(Weather).map(w => (
            <div key={w}>
              <input type="radio" id={`weather-${w}`} name="weather" value={w} />
              <label htmlFor={`weather-${w}`}>{w}</label>
            </div>
          ))}
      </div>
      <div>
        comment
        <input type="text" name="comment" />
      </div>
      <button type="submit">add</button>
    </form>
  );
};