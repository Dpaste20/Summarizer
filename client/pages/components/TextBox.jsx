import React, { useState,useEffect } from 'react';
import styles from './textbox.module.css';

export default function TextBox() {
    // Apply the class to the body when the component mounts
    useEffect(() => {
      document.body.classList.add(styles.bodyAqua);
  
      // Clean up the class when the component unmounts
      return () => {
        document.body.classList.remove(styles.bodyAqua);
      };
    }, []);
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSummarize = async () => {
    try {
      setLoading(true);

      const response = await fetch('http://localhost:8080/api/home', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      setSummary(data.message);
    } catch (error) {
      console.error('Error:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
   
    // Create a textarea element to hold the text
    const textarea = document.createElement('textarea');
    textarea.value = summary;

    // Append the textarea to the DOM
    document.body.appendChild(textarea);

    // Select the text in the textarea
    textarea.select();

    // Copy the selected text to the clipboard
    document.execCommand('copy');

    // Remove the textarea from the DOM
    document.body.removeChild(textarea);

    setCopied(true); // Set copied state to true when text is copied

    // Reset copied state after a brief period (e.g., 3 seconds)
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <>
      <div className={styles.page}>
        <h1>Paste here 👇</h1>
        <textarea
          className={styles.text}
          name="text-box"
          placeholder="Paste your text here"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />

        <button className={styles.btn} onClick={handleSummarize}>
          Summarise
        </button>
      </div>
      <div>
        {loading ? (
          <p className={styles.para} >Cooking your summary...</p>
        ) : (
          <p className={styles.para}>{summary}</p>
        )}
      </div>

      <button className={styles.copy_btn} onClick={copyToClipboard}>
        <img className={styles.copy} src="/copy.svg" alt="" />
      </button>
      <div className={styles.copyMsg_Div}>
      {copied && <p className={styles.copyMessage}>Copied!✅</p>} {/* Render message when copied */}
      </div>
     
    </>
  );
}
