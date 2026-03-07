'use client';

import { Wave } from 'react-animated-text';

import Container from '@/components/Container/Container';
import Section from '@/components/Section/Section';
import Heading from '@/components/Heading/Heading';

import css from './RatesPage.module.css';
import { useCurrencyStore } from '@/lib/stores/currencyStore';
import { useEffect, useMemo } from 'react';
import Filter from '@/components/Filter/Filter';
import RatesList from '@/components/RatesList/RatesList';
import Loader from '@/components/Loader/Loader';
import { latestRates } from '@/lib/service/exchangeAPI';

export default function RatesPage() {
  const isError = useCurrencyStore((state) => state.isError);
  const isLoading = useCurrencyStore((state) => state.isLoading);
  const rates = useCurrencyStore((state) => state.rates);
  const filter = useCurrencyStore((state) => state.filter);
  const baseCurrency = useCurrencyStore((state) => state.baseCurrency);
  const setIsLoading = useCurrencyStore((state) => state.setIsLoading);
  const setIsError = useCurrencyStore((state) => state.setIsError);
  const setRates = useCurrencyStore((state) => state.setRates);

  const filteredRates = useMemo(() => {
    return rates
      .filter(([key]) => key !== baseCurrency && key.toLowerCase().includes(filter.toLowerCase()))
      .map(([key, value]) => ({ key, value: (1 / value).toFixed(2) }));
  }, [baseCurrency, filter, rates]);

  useEffect(() => {
    if (!baseCurrency) return;

    setIsLoading(true);
    latestRates(baseCurrency)
      .then((data) => {
        setRates(data);
      })
      .catch((err) => {
        setIsError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [baseCurrency, setIsError, setIsLoading, setRates]);

  return (
    <main className={css.main}>
      <Section>
        <Container>
          <Heading
            info
            bottom
            title={
              <Wave
                text={`$ $ $ Current exchange rate for 1 ${baseCurrency} $ $ $`}
                effect="fadeOut"
                effectChange={4.0}
              />
            }
          />
          {rates.length > 0 && <Filter />}
          {filteredRates.length > 0 && <RatesList rates={filteredRates} />}
          {isLoading && <Loader />}
          {isError && (
            <Heading error title="Something went wrong...😐 We cannot show current rates!" />
          )}
        </Container>
      </Section>
    </main>
  );
}
