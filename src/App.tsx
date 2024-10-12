import './App.css'

function App() {
  const onClick = async () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      chrome.scripting.executeScript(
        {
          target: { tabId: activeTab.id! },
          func: () => {
            alert('Hello from cookies and a pint');
          },
        },
      );
    });
  }

  return (
    <>
      <button onClick={onClick}>
        Alert me
      </button>
    </>
  )
}

export default App
