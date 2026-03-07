import axios from 'axios';

interface Coords {
  latitude: number;
  longitude: number;
}

interface OpenCageCurrency {
  iso_code: string;
  name: string;
  symbol: string;
}

interface OpenCageResult {
  annotations: { currency: OpenCageCurrency };
}

interface OpenCageResponce {
  results: OpenCageResult[];
}

export const getUserInfo = async ({ latitude, longitude }: Coords): Promise<OpenCageResponce> => {
  const apiKey = process.env.NEXT_PUBLIC_OPENCAGE_API_KEY;
  const urlPosition = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}`;

  const { data } = await axios.get<OpenCageResponce>(urlPosition, {
    params: {
      key: apiKey,
      language: 'en',
    },
  });

  return data;
};
