import styled from 'styled-components';
import { MoodHistoryItem } from '../types';

const List = styled.ul`
  padding: 0 14px;
`;

interface ListViewProps {
  moodHistory: MoodHistoryItem[];
}

const ListView = ({ moodHistory }: ListViewProps) => {
  if (moodHistory.length === 0) return <p>No history.</p>

  return (
    <List>
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
    </List>
  );
};

export default ListView;
