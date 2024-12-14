import { BaseSyntheticEvent } from 'react';
import Header from '../components/Header';
import { moods } from '../data/moods';
import { useForm } from 'react-hook-form';

interface MoodForm {
  mood: string[];
}

const Home = () => {
  const { register, handleSubmit } = useForm<MoodForm>();

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit(submitForm)}>
        {moods.map(({ name }) => (
          <div key={name.toLocaleLowerCase()}>
            <label>
              <input
                {...register('mood')}
                type="checkbox"
                value={name.toLocaleLowerCase()}
              />
              {name}
            </label>
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </>
  );

  function submitForm(data: MoodForm, event?: BaseSyntheticEvent) {
    event?.preventDefault();
    console.log(data);
  }
};

export default Home;
