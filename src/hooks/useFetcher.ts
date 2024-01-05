import { useEffect, useState } from "react";

const useFetcher = <T>(
    callBack: () => Promise<T>,
    defaultData: T
): [data: T, isLoading: boolean, err: Error | undefined] => {
    const [data, setData] = useState<T>(defaultData);
    const [isloading, setIsLoading] = useState(true);
    const [err, setErr] = useState<Error>();

    useEffect(() => {
        callBack()
            .then(setData)
            .catch(setErr)
            .finally(() => setIsLoading(false));
    }, []);

    return [data, isloading, err];
};

export default useFetcher;
