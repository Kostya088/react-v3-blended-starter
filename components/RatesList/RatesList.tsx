import styles from './RatesList.module.css';

interface Rate {
  key: string;
  value: string;
}

interface RateListProps {
  rates: Rate[];
}

export default function RatesList({ rates }: RateListProps) {
  return (
    <ul className={styles.list}>
      {rates.map(({ key, value }) => (
        <li className={styles.item} key={key}>
          <p className={styles.text}>
            1 {key} = {value}
          </p>
        </li>
      ))}
    </ul>
  );
}
