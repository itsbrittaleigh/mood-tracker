import { useState } from 'react';
import Header from '../components/Header';
import { moodLocalStorageArchivedToken, moodLocalStorageToken } from '../consts';
import { Button, ButtonContainer } from '../styles/Button';
import { MoodHistoryItem } from '../types';
import styled from 'styled-components';
import ListView from './ListView';
import GraphView from './GraphView';

const Tabs = styled.div`
  display: inline-flex;
  margin: 0 1rem 1rem;
  border-radius: 3px;
`;

const Tab = styled.button<{ $active: boolean; }>`
  background-color: ${props => props.$active ? "var(--accent)" : "var(--gray)"};
  color: ${props => props.$active ? "white" : "var(--black)"};
  border-width: 0px;
  padding: 1rem 2rem;
  overflow: hidden;
  border-radius: 3px 0 0 3px;

  &:last-of-type {
    border-radius: 0 3px 3px 0;
  }
`;

const ContentContainer = styled.div`
  margin: 0 1rem;
`;

const History = () => {
  const [activeTab, setActiveTab] = useState<'list' | 'graph'>('list');
  const [historyItems, setHistoryItems] = useState(localStorage.getItem(moodLocalStorageToken));
  const [archivedItems, setArchivedItems] = useState(localStorage.getItem(moodLocalStorageArchivedToken));
  const parsedItems = JSON.parse(historyItems ?? '""');
  const parsedArchivedItems = JSON.parse(archivedItems ?? '""');
  const moodHistory: MoodHistoryItem[] = parsedItems.moodHistory ?? [];
  const archivedMoodHistory: MoodHistoryItem[] = parsedArchivedItems.moodHistory ?? [];

  return (
    <>
      <Header />
      <Tabs>
        <Tab
          $active={activeTab === 'list'}
          onClick={() => setActiveTab('list')}
        >
          List
        </Tab>
        <Tab
          $active={activeTab === 'graph'}
          onClick={() => setActiveTab('graph')}
        >
          Graph
        </Tab>
      </Tabs>
      <ContentContainer>
        {activeTab === 'list' ? (
          <ListView
            moodHistory={moodHistory}
            archivedMoodHistory={archivedMoodHistory}
          />
        ) : (
          <GraphView
            moodHistory={moodHistory}
            archivedMoodHistory={archivedMoodHistory}
          />
        )}
      </ContentContainer>
      <ButtonContainer>
        <Button $destructive $ghost onClick={archiveHistory}>Archive history</Button>
        <Button $destructive onClick={clearHistory}>Clear history</Button>
      </ButtonContainer>
    </>
  );

  function clearHistory() {
    localStorage.removeItem(moodLocalStorageToken);
    setHistoryItems(localStorage.getItem(moodLocalStorageToken));
  }

  function archiveHistory() {
    const itemsToArchive = moodHistory.concat(archivedMoodHistory);
    localStorage.setItem(moodLocalStorageArchivedToken, JSON.stringify({ moodHistory: itemsToArchive }));
    clearHistory();
    setArchivedItems(localStorage.getItem(moodLocalStorageArchivedToken));
  }
};

export default History;
