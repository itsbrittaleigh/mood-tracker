import { BaseSyntheticEvent } from 'react';
import Header from '../components/Header';
import { moods } from '../data/moods';
import { useForm } from 'react-hook-form';
import { localStorageToken } from '../consts';
import { MoodHistoryItem } from '../types';

interface MoodForm {
  moods: string[];
}

const Home = () => {
  const { register, handleSubmit, reset } = useForm<MoodForm>();

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit(submitForm)}>
        {moods.map(({ name }) => (
          <div key={name.toLocaleLowerCase()}>
            <label>
              <input
                {...register('moods')}
                type="checkbox"
                value={name.toLocaleLowerCase()}
              />
              {name}
            </label>
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </>
  );

  function submitForm(data: MoodForm, event?: BaseSyntheticEvent) {
    event?.preventDefault();
    const moodHistory = localStorage.getItem(localStorageToken);
    
    const now = new Date();
    const historyItem: MoodHistoryItem = {
      datetime: now,
      moods: data.moods,
    };
    
    if (moodHistory) {
      const parsedHistory = JSON.parse(moodHistory).moodHistory;
      if(Array.isArray(parsedHistory)) {
        parsedHistory.push(historyItem);
        localStorage.setItem(
          localStorageToken, 
          JSON.stringify({ moodHistory: parsedHistory })
        );
      } else {
        localStorage.setItem(
          localStorageToken, 
          JSON.stringify({ moodHistory: [historyItem] })
        );
      }
    } else {
      localStorage.setItem(
        localStorageToken, 
        JSON.stringify({ moodHistory: [historyItem] })
      );
    }

    reset();
  }
};

export default Home;
