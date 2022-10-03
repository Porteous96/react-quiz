import axios, { Method } from 'axios';
import { useEffect, useRef, useState } from 'react';

const useAxios = (
  url: string,
  method: Method,
  params?: unknown,
  payload?: unknown) => {

  const [data, setData] = useState<null | unknown>(null);
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);

  const controllerRef = useRef(new AbortController());

  const cancel = () => {
    controllerRef.current.abort();
  };

  useEffect(() => {
    const request = async () => {
      try {
        const response = await axios.request({
          data: payload,
          signal: controllerRef.current.signal,
          method,
          url,
          params: params
        });

        setData(response.data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          // eslint-disable-next-line no-console
          console.error(error);
        }
      } finally {
        setLoaded(true);
      }
    };

    request();

    // Clean up function should cancel requests
    // return () => controllerRef.current.abort();
  }, []);
  

  return { cancel, data, error, loaded };
};

export default useAxios;