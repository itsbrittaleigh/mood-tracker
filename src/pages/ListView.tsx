import styled from 'styled-components';
import { MoodHistoryItem, TransformedHistory } from '../types';
import { getDate, getTime } from '../utils';

interface ListViewProps {
  moodHistory: MoodHistoryItem[];
}

const CollapsibleItem = styled.details`
  margin-bottom: 1rem;
`;

const ListView = ({ moodHistory }: ListViewProps) => {
  if (moodHistory.length === 0) return <p>No history.</p>
  
  const transformedHistory = moodHistory
    .reduce((acc, curr) => {
      const date = getDate(curr.datetime);
      const time = getTime(curr.datetime);

      if (!acc[date]) acc[date] = {};
      if (!acc[date][time]) acc[date][time] = [];

      curr.moods.map((mood) => acc[date][time].push(mood));

      return acc;
    }, 
    {} as TransformedHistory,
  );

  const sortedHistory: TransformedHistory = {};
  Object.keys(transformedHistory)
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
    .forEach((date) => {
      sortedHistory[date] = transformedHistory[date];
    });

  return Object.entries(sortedHistory).map(([date, dateData], index) => (
    <CollapsibleItem key={date} open={index === 0}>
      <summary>{date}</summary>
      <ul>
        {Object.entries(dateData).map(([datetime, moods]) => (
          <li key={datetime}>
            {datetime}
            <ul>
              {moods.map((mood) => (
                <li key={mood}>{mood}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </CollapsibleItem>
  ));
};

export default ListView;
