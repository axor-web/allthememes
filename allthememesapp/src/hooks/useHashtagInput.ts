import { useState, MutableRefObject, useRef, useEffect } from "react";

export function useHashtagInput() {
  const [rerender, setRerender] = useState(false);
  const [isInputActive, setIsInputActive] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [currentLine, setCurrentLineRaw] = useState(0);
  const [isInvalid, setisInvalid] = useState(false);

  return;
}