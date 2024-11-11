
//FOR NOT EXHAUSTING THE DATABASE WITH QUERIES IN EVERY SINGLE KEYSTROKE IN SEARCH BAR 
//FOR DELAYING 
import { useEffect,useState } from "react";

export function useDebounce<T>(value: T, delay?:number): T {
    const[debounceValue, setDebounceValue] = useState<T>(value);

    useEffect(() => {
      const timer = setTimeout(() => {
        setDebounceValue(value)}, delay || 500);

        return () => {
            clearTimeout(timer)
        }

    }, [value, delay]);

    return debounceValue;

}