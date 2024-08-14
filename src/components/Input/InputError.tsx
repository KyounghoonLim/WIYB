import { useEffect, useRef, useState } from 'react';

interface InputErrorProps {
  errorMessage: string;
}

export default function InputError({ errorMessage }: InputErrorProps) {
  const inputErrorRef = useRef<HTMLParagraphElement>(null);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    if (!inputErrorRef.current) return;
    else {
      const h = inputErrorRef.current.clientHeight;
      setHeight(h ? h + 8 : 0);
    }
  }, [inputErrorRef.current, errorMessage]);

  return (
    <div
      className="overflow-hidden transition-[height] delay-75 duration-[450ms] ease-out"
      style={{ height: height + 'px' }}
    >
      <p ref={inputErrorRef} className="caption-01 my-1 w-full text-system-red-400">
        {errorMessage}
      </p>
    </div>
  );
}
