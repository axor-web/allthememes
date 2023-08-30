import { StatusHead } from '@/components/StatusHead/StatusHead';
import { Search } from '@/components/Search/Search';
import { MemesList } from '@/components/MemesList/MemesList';
import styles from './page.module.css'

export default function Home() {
  return (
    <>
      <StatusHead></StatusHead>
      <Search></Search>
      <MemesList></MemesList>
    </>
  );
}
