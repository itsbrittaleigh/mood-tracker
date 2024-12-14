import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { moods } from '../data/moods';
import { MoodHistoryItem } from '../types';
import { CategoryScale } from 'chart.js';
import { getDay, getTime } from '../utils';

interface GraphViewProps {
  moodHistory: MoodHistoryItem[];
}

Chart.register(CategoryScale);
const GraphView = ({ moodHistory }: GraphViewProps) => {
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

  if (data.length === 0) return <p>No history.</p>

  return (
    <Line
      data={chartData}
    />
  )
};

export default GraphView;
