import { useEffect, useState } from 'react'
import Alert from '../components/Alert'

const useFetch = (fetchFn, initialValue, params = []) => {
    const [isFetching, setIsFetching] = useState()
    const [fetchedData, setFetchedData] = useState(initialValue)

    useEffect(() => {
        async function fetchData() {
            setIsFetching(true);
            try {
                const data = await fetchFn(...params);
                setFetchedData(data);
            } catch (error) {
                Alert('error', error.message || 'Failed to fetch data.');
            }

            setIsFetching(false);
        }

        fetchData();
    }, [fetchFn]);

    return {
        isFetching,
        fetchedData,
        setFetchedData,
        setIsFetching
    }
}

export default useFetch
