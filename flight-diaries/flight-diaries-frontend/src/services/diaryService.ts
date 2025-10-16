import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "../types";

export const fetchDiaries = () => {
  return axios
    .get<DiaryEntry[]>('http://localhost:3000/api/diaries')
    .then(res => res.data) 
}

export const addDiary = (obj: NewDiaryEntry) => {
  return axios
    .post<DiaryEntry>('http://localhost:3000/api/diaries', obj)
    .then(res => res.data)
}