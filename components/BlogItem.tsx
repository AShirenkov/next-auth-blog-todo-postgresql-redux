import Link from 'next/link';
import block from 'bem-css-modules';

import styles from './BlogItem.module.scss';

type BlogItemProps = {
  id: number;
  title: string;
};

export default function BlogItem({ id, title }: BlogItemProps) {
  const b = block(styles);

  return (
    <div className={b('')}>
      <h2 className={b('title')}>
        <Link href={`/blogs/${id}`}>{title}</Link>
      </h2>
    </div>
  );
}
