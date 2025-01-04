import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { moods } from '../data/moods';
import { MoodHistoryItem } from '../types';
import { CategoryScale } from 'chart.js';
import { getDay, getTime } from '../utils';
import { NoHistory } from '../components/NoHistory';
import { Divider } from '../styles/Divider';
import { CollapsibleItem } from '../styles/CollapsibleItem';

interface GraphViewProps {
  moodHistory: MoodHistoryItem[];
  archivedMoodHistory: MoodHistoryItem[];
}

Chart.register(CategoryScale);
const GraphView = ({ moodHistory, archivedMoodHistory }: GraphViewProps) => {
  const data = moodHistory.map((log) => {
    const logMoods = log.moods.map((mood) => {
      return moods.find(m => m.name.toLocaleLowerCase() === mood);
    });

    const totalPleasantness = logMoods.reduce((sum, m) => sum + (m?.pleasantnessLevel ?? 0), 0);
    const averagePleasantness = totalPleasantness / logMoods.length;

    const totalEnergy = logMoods.reduce((sum, m) => sum + (m?.energyLevel ?? 0), 0);
    const averageEnergy = totalEnergy / logMoods.length;

    return {
      date: `${getDay(log.datetime)} ${getTime(log.datetime)}`,
      averageEnergy,
      averagePleasantness,
    };
  });

  const archivedData = archivedMoodHistory.map((log) => {
    const logMoods = log.moods.map((mood) => {
      return moods.find(m => m.name.toLocaleLowerCase() === mood);
    });

    const totalPleasantness = logMoods.reduce((sum, m) => sum + (m?.pleasantnessLevel ?? 0), 0);
    const averagePleasantness = totalPleasantness / logMoods.length;

    const totalEnergy = logMoods.reduce((sum, m) => sum + (m?.energyLevel ?? 0), 0);
    const averageEnergy = totalEnergy / logMoods.length;

    return {
      date: `${getDay(log.datetime)} ${getTime(log.datetime)}`,
      averageEnergy,
      averagePleasantness,
    };
  });

  const chartData = {
    labels: data.map((data) => data.date), 
    datasets: [
      {
        label: 'Energy',
        data: data.map(data => data.averageEnergy),
        backgroundColor: '#FFC145',
      },
      {
        label: 'Pleasantness',
        data: data.map(data => data.averagePleasantness),
        backgroundColor: '#FF6B6C',
      },
    ],
  };

  const archivedChartData = {
    labels: archivedData.map((data) => data.date),
    datasets: [
      {
        label: 'Energy',
        data: archivedData.map(data => data.averageEnergy),
        backgroundColor: '#FFC145',
      },
      {
        label: 'Pleasantness',
        data: archivedData.map(data => data.averagePleasantness),
        backgroundColor: '#FF6B6C',
      },
    ],
  };

  if (data.length === 0 && archivedData.length === 0) return <NoHistory />

  return (
    <>
      {data.length > 0 ? (
        <Line data={chartData} />
      ) : (
        <NoHistory />
      )}
      <Divider />
      <CollapsibleItem>
        <summary>Archives</summary>
        <Line data={archivedChartData} />
      </CollapsibleItem>
    </>
  );
};

export default GraphView;
