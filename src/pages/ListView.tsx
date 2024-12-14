import styled from 'styled-components';
import { MoodHistoryItem } from '../types';
import { getDate, getTime } from '../utils';

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
            {getDate(datetime)} {getTime(datetime)}  
          </strong>
          : {moods.join(', ')}
        </li>
      ))}
    </List>
  );
};

export default ListView;
