import Select, { SingleValue } from 'react-select';

import symbols from './symbols.json';

import './ReactSelect.css';
import styles from './SelectRates.module.css';
import { useCurrencyStore } from '@/lib/stores/currencyStore';

interface OptionType {
  value: string;
  label: string;
}

interface SelectRateProps {
  baseCurrency: string;
}

export default function SelectRates({ baseCurrency }: SelectRateProps) {
  const setBaseCurrency = useCurrencyStore((state) => state.setBaseCurrency);

  const handleChange = (selectedOption: SingleValue<OptionType>) => {
    if (selectedOption) {
      setBaseCurrency(selectedOption.value);
    }
  };

  return (
    <div className={styles.box}>
      <p className={styles.text}>Your base currency:&nbsp;</p>
      <Select
        className={styles.select}
        classNamePrefix="react-select"
        value={{ label: baseCurrency, value: baseCurrency }}
        isSearchable
        options={symbols}
        onChange={handleChange}
      />
    </div>
  );
}
