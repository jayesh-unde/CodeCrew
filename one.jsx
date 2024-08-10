import React, { useState, useEffect } from 'react';

const CodeEditor = () => {
  const [code, setCode] = useState('');

  // Load saved code from localStorage when the component mounts
  useEffect(() => {
    const savedCode = localStorage.getItem('codeEditorContent');
    if (savedCode) {
      setCode(savedCode);
    }
  }, []);

  // Save code to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('codeEditorContent', code);
  }, [code]);

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  return (
    <textarea
      value={code}
      onChange={handleCodeChange}
      placeholder="Start coding..."
      style={{ width: '100%', height: '300px' }}
    />
  );
};

export default CodeEditor;