import React, { useState } from 'react';
import { marked } from 'marked';
import './App.css';

marked.use({ gfm: true, breaks: true });

function App() {
  const [markdown, setMarkdown] = useState(`# Hello World 

**Bold** and _italic_ and ~~strikethrough~~

## Lists
- Item one
- Item two
  - Nested item

## Code
\`\`\`js
function greet(name) {
  return 'Hello, ' + name + '!';
}
\`\`\`

## Quote
> "Simplicity is the soul of efficiency."

## Table
| Feature | Supported |
|---------|-----------|
| Tables  | ✓ |
| Code    | ✓ |
`);

  const wordCount = markdown.trim() === '' ? 0 : markdown.trim().split(/\s+/).length;
  const charCount = markdown.length;

  const handleCopy = () => {
    navigator.clipboard.writeText(markdown);
    alert('Copied to clipboard!');
  };

  const handleDownload = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="app">
      <div className="header">
        <h1> Markdown Previewer</h1>
        <p className="subtitle">Type markdown on the left, see the magic on the right</p>
      </div>

      <div className="editor-row">
        {/* Left Panel */}
        <div className="panel">
          <div className="panel-header left-header">
            <span>Markdown Input</span>
            <div className="stats">
              <span>{wordCount} words</span>
              <span>{charCount} chars</span>
            </div>
          </div>
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="Type your markdown here..."
          />
          <div className="btn-row">
            <button className="btn btn-clear" onClick={() => setMarkdown('')}>🗑️ Clear</button>
            <button className="btn btn-copy" onClick={handleCopy}>Copy</button>
            <button className="btn btn-download" onClick={handleDownload}> Download</button>
          </div>
        </div>

        {/* Right Panel */}
        <div className="panel">
          <div className="panel-header right-header">
            <span>Preview</span>
          </div>
          <div
            className="preview"
            dangerouslySetInnerHTML={{ __html: marked.parse(markdown) }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;