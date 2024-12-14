import { useState } from 'react';
import Header from '../components/Header';
import { moodLocalStorageToken } from '../consts';
import { Button, ButtonContainer } from '../styles/Button';
import { MoodHistoryItem } from '../types';

const History = () => {
  const [historyItems, setHistoryItems] = useState(localStorage.getItem(moodLocalStorageToken));
  const parsedItems = JSON.parse(historyItems ?? '""');
  const moodHistory: MoodHistoryItem[] = parsedItems.moodHistory ?? [];

  return (
    <>
      <Header />
      <ul>
        {moodHistory.map(({ datetime, moods }) => (
          <li key={datetime.toString()}>
            <strong>
              {new Date(datetime).toLocaleDateString(undefined, {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })} {new Date(datetime).toLocaleTimeString(undefined, {
                hour: 'numeric', 
                minute: '2-digit', 
                hour12: true 
              })}  
            </strong>
            : {moods.join(', ')}
          </li>
        ))}
      </ul>
      <ButtonContainer>
        <Button $destructive onClick={clearHistory}>Clear history</Button>
      </ButtonContainer>
    </>
  );

  function clearHistory() {
    localStorage.removeItem(moodLocalStorageToken);
    setHistoryItems(localStorage.getItem(moodLocalStorageToken));
  }
};

export default History;
