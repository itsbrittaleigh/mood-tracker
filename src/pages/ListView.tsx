import { MoodHistoryItem, TransformedHistory } from '../types';
import { getDate, getTime } from '../utils';
import { CollapsibleItem } from '../styles/CollapsibleItem';
import { Divider } from '../styles/Divider';
import { NoHistory } from '../components/NoHistory';

interface ListViewProps {
  moodHistory: MoodHistoryItem[];
  archivedMoodHistory: MoodHistoryItem[];
}

const ListView = ({ moodHistory, archivedMoodHistory }: ListViewProps) => {
  if (moodHistory.length === 0 && archivedMoodHistory.length === 0) return <NoHistory />;
  
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

  const transformedArchivedHistory = archivedMoodHistory
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

  const sortedArchivedHistory: TransformedHistory = {};
  Object.keys(transformedArchivedHistory)
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
    .forEach((date) => {
      sortedArchivedHistory[date] = transformedArchivedHistory[date];
    });

  return (
    <>
      {moodHistory.length > 0 ? Object.entries(sortedHistory).map(([date, dateData], index) => (
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
      )) : (
        <NoHistory />
      )}
      <Divider />
      <CollapsibleItem>
        <summary>Archives</summary>
        {Object.entries(sortedArchivedHistory).map(([date, dateData], index) => (
          <CollapsibleItem key={date} open={index === 0} $indented>
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
        ))}
      </CollapsibleItem>
    </>
  );
};

export default ListView;
