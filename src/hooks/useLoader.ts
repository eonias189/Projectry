import { useEffect, useState } from "react";

interface Loader {
    load(callBack: () => Promise<void>): void;
}

const useLoader = <T>(): [isLoading: boolean, loader: Loader] => {
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState<Error>();
    const loader = {
        load(callBack: () => Promise<void>) {
            setIsLoading(true);
            callBack()
                .then(() => setIsLoading(false))
                .catch(setErr);
        },
    };
    return [isLoading, loader];
};

export default useLoader;
