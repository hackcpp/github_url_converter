document.getElementById('deepwiki-btn').addEventListener('click', () => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.runtime.sendMessage({
      action: 'convertToDeepWiki',
      url: tabs[0].url
    });
  });
});

document.getElementById('github1s-btn').addEventListener('click', () => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.runtime.sendMessage({
      action: 'convertToGitHub1s',
      url: tabs[0].url
    });
  });
});

document.getElementById('github-btn').addEventListener('click', () => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.runtime.sendMessage({
      action: 'convertToGitHub',
      url: tabs[0].url
    });
  });
});