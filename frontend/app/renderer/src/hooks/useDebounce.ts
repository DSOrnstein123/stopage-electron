import { useEffect, useState } from "react";

function useDebounce<T>(value: T, delay: number): T {
  const [debounce, setDebounce] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounce(value)
    }, delay)

    return () => clearTimeout(handler)
  }, [value, delay])

  return debounce
}
 
export default useDebounce;