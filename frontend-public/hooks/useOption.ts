import { useState, useEffect } from "react";

function useOption(n: number, selected: number) {
  const [options, setOption] = useState(
    Array.from({ length: n }, (_, i) => i + 1 === selected)
  );
  const [active, setActive] = useState(
    selected >= 1 && selected <= n ? selected : null
  );

  useEffect(() => {
    if (selected == null || selected < 1 || selected > n) {
      setOption(Array(n).fill(false));
      setActive(null);
    } else {
      setOption(Array.from({ length: n }, (_, i) => i + 1 === selected));
      setActive(selected);
    }
  }, [n, selected]);

  const select = (index: number | null) => {
    if (index == null || index < 1 || index > n) {
      setOption(Array(n).fill(false));
      setActive(null);
    } else {
      setOption(Array.from({ length: n }, (_, i) => i + 1 === index));
      setActive(index);
    }
  };

  const factory = (func: (i: number) => any) => {
    return (i:number) => func(i)
  }

  return { options, select, active, factory };
}

export default useOption;
