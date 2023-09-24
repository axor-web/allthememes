import { MemePage } from '@/components/MemePage/MemePage';
import styles from './page.module.css';

export default function Page({ params }: { params: { id: string } }) {
  return (
    <section className={styles['meme-section']}>
      <MemePage memeId={params.id} />
    </section>
  );
}
