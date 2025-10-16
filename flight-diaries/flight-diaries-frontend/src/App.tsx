import axios, { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { DiaryEntry, Visibility, Weather } from "./types"
import { NewDiaryForm } from "./components/NewDiaryForm"
import { Diaries } from "./components/Diaries"
import { addDiary, fetchDiaries } from "./services/diaryService"

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    fetchDiaries().then(fetchedDiaries => {
      setDiaries(fetchedDiaries)
    })
  }, [])

  const setErrorMessageWithTimeout = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const diaryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    const target = event.target as typeof event.target & {
      date: { value: string };
      visibility: { value: Visibility };
      weather: { value: Weather };
      comment: { value: string };
    };

    const newEntry = {
      date: String(target.date.value),
      visibility: target.visibility.value,
      weather: target.weather.value,
      comment: target.comment.value
    }

    try {
      const returnedDiary = await addDiary(newEntry);
      setDiaries(diaries.concat(returnedDiary));
    } catch (e) {
      const error = e as AxiosError;
      if (axios.isAxiosError(error)) {
        let errorMessage = 'Unknown error';
        interface ErrorResponse {
          error: { message: string }[];
        }
        if (
          error.response &&
          error.response.data &&
          typeof error.response.data === 'object' &&
          'error' in error.response.data &&
          Array.isArray((error.response.data as ErrorResponse).error) &&
          (error.response.data as ErrorResponse).error[0]?.message
        ) {
          errorMessage = (error.response.data as ErrorResponse).error[0].message;
        }
        setErrorMessageWithTimeout(`Error: ${errorMessage}`);
      } else {
        setErrorMessageWithTimeout('An unknown error occurred');
      }
    }
  };

  return (
    <>
      <h1>Add new entry</h1>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      <NewDiaryForm diaryCreation={diaryCreation} />
      <h2>Diary entries</h2>
      <Diaries diaries={diaries} />
    </>
  )
}

export default App