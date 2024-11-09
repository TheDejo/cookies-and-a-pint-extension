import { useState } from 'react';
import './App.css';
import styles from './extension.module.scss';
import { getTextContentFromPage, highlightKeywordsOnPage } from './utils/helpers';
import SkillCard from './components/SkillCard';
import { constants } from './config/constants';


const { API_ROUTES } = constants;

function App() {
  const [skills, setSkills] = useState<string[]>([]);

  const handleHighlightKeywords = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      if (activeTab?.id) {
        chrome.scripting.executeScript(
          {
            target: { tabId: activeTab.id },
            func: getTextContentFromPage,
          },
          async (injectionResults) => {
            const pageText = injectionResults[0]?.result;

            if (pageText) {
              try {
                const response = await fetch(API_ROUTES.extractSkills, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ text: pageText }),
                });

                if (!response.ok) throw new Error('Failed to fetch data from backend');

                const data = await response.json();
                console.log('Received Data:', data);

                if (data && Array.isArray(data.data)) {
                  setSkills(data.data);

                  chrome.scripting.executeScript(
                    {
                      target: { tabId: activeTab.id as number },
                      func: highlightKeywordsOnPage,
                      args: [data.data],
                    },
                    () => console.log("Keywords highlighted on the page.")
                  );
                } else {
                  console.error("Unexpected response format", data);
                }
              } catch (error) {
                console.error("Error fetching skills:", error);
              }
            } else {
              console.error("Failed to retrieve text content from page.");
            }
          }
        );
      }
    });
  };

  return (
    <div className={styles.component}>
      <SkillCard
        skills={skills}
        onHighlightClick={handleHighlightKeywords}
      />
    </div>
  );
}

export default App;
