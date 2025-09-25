import { Apps } from './components/apps';
import { Attribution } from './components/attribution';
import { Hero } from './components/hero';

export const generateMetadata = async () => {
  return {
    title: 'Tech Stack',
  };
};

const Stack = async () => (
  <>
    <Hero />
    <Apps />
    <Attribution />
  </>
);

export default Stack;
