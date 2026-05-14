"use client";

import React, { useState, useRef, useEffect } from "react";
import { HiChevronDown } from "react-icons/hi2";

interface AccordionProps {
  question: string;
  answer: string;
}

export default function Accordion({ question, answer }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState("0px");
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
    }
  }, [isOpen]);

  return (
    <div
      className={`group rounded-2xl transition-all duration-100 ${
        isOpen
          ? "border border-[#006a61] bg-white shadow-sm"
          : "border border-[#c6c6cd] bg-white hover:border-[#006a61]"
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full cursor-pointer items-center justify-between p-6 text-left focus:outline-none"
      >
        <span
          className={`text-lg font-bold transition-colors duration-200 font-headline text-[#0b1c30]`}
        >
          {question}
        </span>
        <span
          className={`ml-4 shrink-0 transition-transform duration-500 text-[#006a61] ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <HiChevronDown size={24} />
        </span>
      </button>

      <div
        style={{ height: contentHeight }}
        className="overflow-hidden transition-all duration-500 ease-in-out"
      >
        <div ref={contentRef} className="px-6 pb-6 pt-0">
          <p className="text-base leading-relaxed text-[#45464d] font-sans">{answer}</p>
        </div>
      </div>
    </div>
  );
}
