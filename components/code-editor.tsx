"use client";

import type { BundledLanguage, CodeOptionsMultipleThemes } from "@/components/ui/kibo-ui/code-block";
import {
  CodeBlock,
  CodeBlockBody,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockFilename,
  CodeBlockFiles,
  CodeBlockHeader,
  CodeBlockItem,
} from "@/components/ui/kibo-ui/code-block";

const code = [
  {
    language: "jsx",
    filename: "MyComponent.jsx",
    code: `function MyComponent(props) {
  return (
    <div>
      <h1>Hello, {props.name}!</h1>
      <p>This is an example React component.</p>
    </div>
  );
}`,
  },
  {
    language: "tsx",
    filename: "MyComponent.tsx",
    code: `function MyComponent(props: { name: string }) {
  return (
    <div>
      <h1>Hello, {props.name}!</h1>
      <p>This is an example React component.</p>
    </div>
  );
}`,
  },
];

const Example = () => (
  <CodeBlock data={code} defaultValue={code[0].language}>
    <CodeBlockHeader>
      <CodeBlockFiles>
        {(item) => (
          <CodeBlockFilename key={item.language} value={item.language}>
            {item.filename}
          </CodeBlockFilename>
        )}
      </CodeBlockFiles>
      <CodeBlockCopyButton
        onCopy={() => console.log("Copied code to clipboard")}
        onError={() => console.error("Failed to copy code to clipboard")}
      />
    </CodeBlockHeader>
    <CodeBlockBody>
      {(item) => (
        <CodeBlockItem key={item.language} value={item.language}>
          <CodeBlockContent language={item.language as BundledLanguage}>
            {item.code}
          </CodeBlockContent>
        </CodeBlockItem>
      )}
    </CodeBlockBody>
  </CodeBlock>
);

interface CodeProps {
  code: string;
  filename?: string;
  language?: BundledLanguage;
  lineNumbers?: boolean;
  themes?: CodeOptionsMultipleThemes["themes"];
}

const Code = ({ code, filename, language = "typescript", lineNumbers = true, themes }: CodeProps) => {
  const codeData = [
    {
      language: language,
      filename: filename || `${language}`,
      code: code.trim(),
    },
  ];

  return (
    <CodeBlock data={codeData} defaultValue={language}>
      {filename && (
        <CodeBlockHeader>
          <CodeBlockFiles>
            {(item) => (
              <CodeBlockFilename key={item.language} value={item.language}>
                {item.filename}
              </CodeBlockFilename>
            )}
          </CodeBlockFiles>
          <CodeBlockCopyButton
            onCopy={() => console.log("Copied code to clipboard")}
            onError={() => console.error("Failed to copy code to clipboard")}
          />
        </CodeBlockHeader>
      )}
      <CodeBlockBody>
        {(item) => (
          <CodeBlockItem key={item.language} value={item.language} lineNumbers={lineNumbers}>
            <CodeBlockContent language={item.language as BundledLanguage} themes={themes}>
              {item.code}
            </CodeBlockContent>
          </CodeBlockItem>
        )}
      </CodeBlockBody>
    </CodeBlock>
  );
};

export default Example;
export { Example as CodeEditor, Code };
