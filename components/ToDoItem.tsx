import block from 'bem-css-modules';
import styles from './ToDoItem.module.scss';

const b = block(styles);

type ToDoItemProps = {
  id: string;
  text: string;
  onDelete: (id: string) => void;
};

export default function ToDoItem({ id, text, onDelete }: ToDoItemProps) {
  return (
    <li className={b('item')}>
      <span className={b('text')}>{text}</span>
      <button
        onClick={() => onDelete(id)}
        className={b('button', { delete: true })}
      >
        ✕
      </button>
    </li>
  );
}
