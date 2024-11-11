import { useEffect, useState } from 'react';
import './App.css';
import styles from './extension.module.scss';
import {
  getTextContentFromPage,
  highlightKeywordsOnPage,
} from './utils/helpers';
import SkillCard from './components/SkillCard';
import { constants } from './config/constants';

const { API_ROUTES } = constants;

export interface JobData {
  companyName: string;
  jobRole: string;
  jobDescription: string;
  hardSkills: string[];
  softSkills: string[];
  skills: string[];
}

function App() {
  const [jobData, setJobData] = useState<JobData>({
    companyName: '',
    jobRole: '',
    jobDescription: '',
    hardSkills: [],
    softSkills: [],
    skills: [],
  });
  const [isFormAvailable, setIsFormAvailable] = useState<boolean>(false);
  const [isAutofilling, setIsAutofilling] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getAuthCookie = (): Promise<string | undefined> =>
    new Promise((resolve) => {
      chrome.cookies.get(
        { url: 'http://localhost:3000', name: 'sunday-morning-user' },
        (cookie) => {
          if (cookie) {
            resolve(cookie.value);
          } else {
            console.warn('No auth token found in cookies');
            resolve(undefined);
          }
        }
      );
    });

  useEffect(() => {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.local.get(['jobData', 'storedUrl'], (result) => {
        if (result.jobData && result.storedUrl) {
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const activeTab = tabs[0];
            if (activeTab?.url === result.storedUrl) {
              setJobData(result.jobData);
            } else {
              chrome.storage.local.remove(['jobData', 'storedUrl']);
            }
          });
        }
      });
    } else {
      console.warn('Chrome storage is not available. Make sure you are in a Chrome extension context.');
    }

    if (typeof chrome !== 'undefined' && chrome.tabs) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];
        if (activeTab?.id) {
          chrome.scripting.executeScript(
            {
              target: { tabId: activeTab.id },
              func: checkForFormOnPage,
            },
            (injectionResults) => {
              const formDetected = injectionResults && injectionResults[0]?.result;
              console.log('Form detected on page:', formDetected);
              setIsFormAvailable(!!formDetected);
            }
          );
        }
      });
    } else {
      console.warn(
        "Chrome API is not available. Make sure you're in a Chrome extension context."
      );
    }
  }, []);

  const handleScanJob = async () => {
    setIsLoading(true);
    const authCookie = await getAuthCookie();
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
                  body: JSON.stringify({ text: pageText, userId: authCookie }),
                  headers: {
                    'Content-Type': 'application/json',
                  },
                });

                if (!response.ok) throw new Error('Failed to fetch data from backend');

                const { data } = await response.json();
                console.log('Received Data:', data);

                if (data) {
                  const jobData = {
                    companyName: data.company_name || '',
                    jobRole: data.job_role || '',
                    jobDescription: data.job_description || '',
                    hardSkills: data.hard_skills || [],
                    softSkills: data.soft_skills || [],
                    skills: [...(data.hard_skills || []), ...(data.soft_skills || [])],
                  };
                  setJobData(jobData);

                  chrome.storage.local.set({
                    jobData: jobData,
                    storedUrl: activeTab.url,
                  });
                }

                chrome.scripting.executeScript(
                  {
                    target: { tabId: activeTab.id as number },
                    func: highlightKeywordsOnPage,
                    args: [data.hard_skills.concat(data.soft_skills)],
                  },
                  () => console.log('Keywords highlighted on the page.')
                );
              } catch (error) {
                console.error('Error fetching skills:', error);
              } finally {
                setIsLoading(false);
              }
            } else {
              console.error('Failed to retrieve text content from page.');
              setIsLoading(false);
            }
          }
        );
      }
    });
  };

  const handleAutofillForm = async () => {
    setIsAutofilling(true);
    const authCookie = await getAuthCookie();

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      if (activeTab?.id) {
        chrome.scripting.executeScript(
          {
            target: { tabId: activeTab.id },
            func: extractFormDetails,
          },
          async (injectionResults) => {
            const formDetails = injectionResults[0]?.result;

            if (formDetails) {
              try {
                const response = await fetch(API_ROUTES.autofill, {
                  method: 'POST',
                  body: JSON.stringify({ formDetails, userId: authCookie }),
                  headers: {
                    'Content-Type': 'application/json',
                  },
                });

                if (!response.ok) throw new Error('Failed to fetch autofill data from backend');

                const data = await response.json();
                console.log('Received Autofill Data:', data);

                if (data && typeof data === 'object') {
                  const fileDataMap: { [key: string]: { file: File; fieldName: string } } = {};

                  for (const [name, value] of Object.entries(data.data)) {
                    if (typeof value === 'string' && value.startsWith('http')) {
                      try {
                        const response = await fetch(value, {
                          credentials: 'include',
                        });
                        if (!response.ok) {
                          throw new Error(`Failed to fetch file from ${value}`);
                        }
                        const blob = await response.blob();
                        const fileName = value.split('/').pop() || 'file.pdf';
                        const file = new File([blob], fileName, { type: blob.type });
                        fileDataMap[name] = { file, fieldName: name };
                      } catch (error) {
                        console.error('Error fetching file:', error);
                      }
                    }
                  }

                  chrome.scripting.executeScript(
                    {
                      target: { tabId: activeTab.id as number },
                      func: autofillFormFields,
                      args: [data.data, fileDataMap],
                    },
                    () => setIsAutofilling(false)
                  );
                } else {
                  console.error('Unexpected response format', data);
                  setIsAutofilling(false);
                }
              } catch (error) {
                console.error('Error fetching autofill data:', error);
                setIsAutofilling(false);
              }
            } else {
              console.error('No form detected on the page.');
              setIsFormAvailable(false);
              setIsAutofilling(false);
            }
          }
        );
      } else {
        setIsAutofilling(false);
      }
    });
  };

  return (
    <div className={styles.component}>
      <SkillCard
        jobData={jobData}
        onJobScan={handleScanJob}
        onHandleAutofillForm={handleAutofillForm}
        isLoading={isLoading}
        isAutofilling={isAutofilling}
        isFormAvailable={isFormAvailable}
      />
    </div>
  );
}

export default App;

function checkForFormOnPage() {
  const forms = document.querySelectorAll('form');
  console.log(`Found ${forms.length} form(s) on the page.`);
  if (forms.length > 0) {
    return true;
  }

  const iframes = document.querySelectorAll('iframe');
  console.log(`Found ${iframes.length} iframe(s) on the page.`);
  for (let i = 0; i < iframes.length; i++) {
    try {
      const iframeDocument =
        iframes[i].contentDocument || iframes[i].contentWindow?.document;
      if (iframeDocument) {
        const iframeForms = iframeDocument.querySelectorAll('form');
        console.log(`Iframe ${i}: Found ${iframeForms.length} form(s).`);
        if (iframeForms.length > 0) {
          return true;
        }
      }
    } catch (e) {
      console.warn('Cannot access iframe due to cross-origin restrictions:', e);
    }
  }

  return false;
}

function extractFormDetails() {
  function extractFormFields(form: HTMLFormElement) {
    const formFields: { label: string; name: string | null; type: string }[] = [];

    Array.from(form.elements).forEach((element) => {
      if (
        element instanceof HTMLInputElement ||
        element instanceof HTMLTextAreaElement ||
        element instanceof HTMLSelectElement
      ) {
        const fieldType = element.type.toLowerCase();

        if (['submit', 'button', 'reset', 'hidden'].includes(fieldType)) return;

        const fieldLabel =
          (element.labels && element.labels[0]?.innerText) ||
          element.getAttribute('placeholder') ||
          element.name ||
          element.id ||
          'Unknown Field';

        formFields.push({
          label: fieldLabel.trim(),
          name: element.name || element.id || null,
          type: fieldType,
        });
      }
    });

    return formFields.length ? formFields : null;
  }

  const forms = document.querySelectorAll('form');
  if (forms.length > 0) {
    return extractFormFields(forms[0]);
  }

  const iframes = document.querySelectorAll('iframe');
  for (let i = 0; i < iframes.length; i++) {
    try {
      const iframeDocument =
        iframes[i].contentDocument || iframes[i].contentWindow?.document;
      if (iframeDocument) {
        const iframeForms = iframeDocument.querySelectorAll('form');
        if (iframeForms.length > 0) {
          return extractFormFields(iframeForms[0]);
        }
      }
    } catch (e) {
      console.warn(`Cannot access iframe ${i} due to cross-origin restrictions:`, e);
    }
  }
  return null;
}

async function autofillFormFields(
  autofillData: { [key: string]: any },
  fileDataMap: { [key: string]: { file: File; fieldName: string } }
) {
  const form = document.querySelector('form');
  if (!form) return;

  for (const [name, value] of Object.entries(autofillData)) {
    const input = form.querySelector(`[name="${name}"], [id="${name}"]`);
    if (
      input instanceof HTMLInputElement ||
      input instanceof HTMLTextAreaElement ||
      input instanceof HTMLSelectElement
    ) {
      if (input.type === 'file') {
        const fileData = fileDataMap[name];
        if (fileData && fileData.file) {
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(fileData.file);
          (input as any).files = dataTransfer.files;
          input.dispatchEvent(new Event('change', { bubbles: true }));
        } else {
          console.error(`No file data found for field "${name}"`);
        }
      } else if (input.type === 'checkbox' || input.type === 'radio') {
        if (input.value === value) {
          (input as any).checked = true;
          input.dispatchEvent(new Event('change', { bubbles: true }));
        }
      } else {
        input.value = value;
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
      }
    } else if (input instanceof HTMLSelectElement) {
      input.value = value;
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }
}
