import Header from '../components/Header';
import { localStorageToken } from '../consts';
import { MoodHistoryItem } from '../types';

const History = () => {
  const historyItems = localStorage.getItem(localStorageToken);
  const parsedItems = JSON.parse(historyItems ?? '""');
  const moodHistory: MoodHistoryItem[] = parsedItems.moodHistory ?? [];

  return (
    <>
      <Header />
      <ul>
        {moodHistory.map(({ datetime, moods }) => (
          <li key={datetime.toLocaleString()}>
            {datetime.toLocaleString()}: {moods.join(', ')}
          </li>
        ))}
      </ul>
    </>
  );
};

export default History;
