export interface MoodHistoryItem {
  datetime: Date;
  moods: string[];
}

export interface TransformedHistory {
  [date: string]: {
    [datetime: string]: string[];
  };
};

export type HistoryPageTab = 'list' | 'graph';
