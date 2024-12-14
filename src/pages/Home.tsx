import { BaseSyntheticEvent } from 'react';
import Header from '../components/Header';
import { moods } from '../data/moods';
import { useForm } from 'react-hook-form';
import { moodLocalStorageToken } from '../consts';
import { MoodHistoryItem } from '../types';
import styled from 'styled-components';

const ButtonContainer = styled.div`
  position: fixed;
  width: 100vw;
  bottom: 0;
  background-color: white;
  display: flex;
  padding: 1rem;
  justify-content: flex-end;
  border-top: 1px solid var(--gray);
`;

const Button = styled.button`
  padding: 1rem 1.5rem;
  background-color: var(--accent);
  border-radius: 3px;
  color: white;
  outline: none;
  border-width: 0px;
`;

const Checkboxes = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  overflow-x: scroll;
  gap: 0.5rem;
  margin-bottom: 6rem;
`;

const CheckboxContainer = styled.label`
  padding: 2rem 1rem;
  background-color: var(--gray);
  display: flex;
  align-items: center;
  justify-content: center;

  &:has(input:checked) {
    background-color: var(--dark-gray);
  }
`;

const Checkbox = styled.input`
  height: 0;
  width: 0;
  margin: 0;
`;

interface MoodForm {
  moods: string[];
}

const Home = () => {
  const { register, handleSubmit, reset } = useForm<MoodForm>();

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit(submitForm)}>
        <Checkboxes>
          {moods.map(({ name }) => (
            <CheckboxContainer key={name.toLocaleLowerCase()}>
              <Checkbox
                {...register('moods')}
                type="checkbox"
                value={name.toLocaleLowerCase()}
              />
              {name}
            </CheckboxContainer>
          ))}
        </Checkboxes>
        <ButtonContainer>
          <Button type="submit">Submit</Button>
        </ButtonContainer>
      </form>
    </>
  );

  function submitForm(data: MoodForm, event?: BaseSyntheticEvent) {
    event?.preventDefault();
    const moodHistory = localStorage.getItem(moodLocalStorageToken);
    
    const now = new Date();
    const historyItem: MoodHistoryItem = {
      datetime: now,
      moods: data.moods,
    };
    
    if (moodHistory) {
      const parsedHistory = JSON.parse(moodHistory).moodHistory;
      if(Array.isArray(parsedHistory)) {
        parsedHistory.push(historyItem);
        localStorage.setItem(
          moodLocalStorageToken, 
          JSON.stringify({ moodHistory: parsedHistory })
        );
      } else {
        localStorage.setItem(
          moodLocalStorageToken, 
          JSON.stringify({ moodHistory: [historyItem] })
        );
      }
    } else {
      localStorage.setItem(
        moodLocalStorageToken, 
        JSON.stringify({ moodHistory: [historyItem] })
      );
    }

    reset();
  }
};

export default Home;
