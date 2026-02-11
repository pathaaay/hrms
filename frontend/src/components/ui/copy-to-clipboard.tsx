import { useState, type ReactNode } from "react";

import { Copy } from "lucide-react";

import { Button } from "@/components/ui/button";

interface CopyToClipboardButtonProps extends React.ComponentProps<
  typeof Button
> {
  text: string;
  btnTextCopied?: string | ReactNode;
  btnText?: string | ReactNode;
  onCopy: () => void;
}

export function CopyToClipboardButton({
  text,
  btnText,
  btnTextCopied,
  onCopy,
  className,
  ...props
}: Readonly<CopyToClipboardButtonProps>) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      if (!text) {
        console.error("No text to copy");
        return;
      }

      let textContent = text;
      await navigator.clipboard.writeText(textContent);
      setCopied(true);
      onCopy();
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className={className}
      onClick={copyToClipboard}
      {...props}
    >
      {/* <Copy className="mr-2 h-4 w-4" /> */}
      {copied ? btnTextCopied || "Copied!" : btnText || "Copy"}
    </Button>
  );
}
