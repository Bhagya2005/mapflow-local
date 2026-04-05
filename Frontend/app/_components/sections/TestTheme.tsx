"use client";
import React from "react";

interface TestThemeProps {
  isDarkTheme: boolean;
}

const TestTheme: React.FC<TestThemeProps> = ({ isDarkTheme }) => {
  return (
    <div 
      style={{
        backgroundColor: isDarkTheme ? '#000000' : '#ffffff',
        color: isDarkTheme ? '#ffffff' : '#000000',
        padding: '20px',
        margin: '20px',
        border: `2px solid ${isDarkTheme ? '#ffffff' : '#000000'}`
      }}
    >
      <h2>Test Theme Component</h2>
      <p>Current theme: {isDarkTheme ? 'DARK' : 'LIGHT'}</p>
      <p>Background: {isDarkTheme ? 'Black' : 'White'}</p>
      <p>Text: {isDarkTheme ? 'White' : 'Black'}</p>
    </div>
  );
};

export default TestTheme;
