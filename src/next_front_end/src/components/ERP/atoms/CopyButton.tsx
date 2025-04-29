'use client'

import CopyToClipboard from "@/src/features/Teams/useCopyClipboard"


type CopyButtonProps = {
    text: string;
    icon: React.ReactNode;
  };
  
  export default function CopyButton({ text, icon }: CopyButtonProps) {
    const click = () => {
      CopyToClipboard(text);
    };
  
    return (
      <span
        className="cursor-pointer"
        title={text}
        onClick={click}
      >
        {icon}
      </span>
    );
  }