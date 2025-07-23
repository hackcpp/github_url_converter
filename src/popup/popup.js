function showStatus(message, isError = false) {
  const status = document.getElementById('status');
  status.textContent = message;
  status.style.color = isError ? 'red' : 'green';
  setTimeout(() => status.textContent = '', 3000);
}

document.getElementById('deepwiki-btn').addEventListener('click', () => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.runtime.sendMessage({
      action: 'convertToDeepWiki',
      url: tabs[0].url
    }, (response) => {
      if (chrome.runtime.lastError || !response?.success) {
        showStatus('转换失败: ' + (response?.error || chrome.runtime.lastError?.message), true);
      } else {
        showStatus('正在跳转到DeepWiki...');
      }
    });
  });
});

document.getElementById('github1s-btn').addEventListener('click', () => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.runtime.sendMessage({
      action: 'convertToGitHub1s',
      url: tabs[0].url
    }, (response) => {
      if (chrome.runtime.lastError || !response?.success) {
        showStatus('转换失败: ' + (response?.error || chrome.runtime.lastError?.message), true);
      } else {
        showStatus('正在跳转到GitHub1s...');
      }
    });
  });
});

document.getElementById('github-btn').addEventListener('click', () => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.runtime.sendMessage({
      action: 'convertToGitHub',
      url: tabs[0].url
    }, (response) => {
      if (chrome.runtime.lastError || !response?.success) {
        showStatus('转换失败: ' + (response?.error || chrome.runtime.lastError?.message), true);
      } else {
        showStatus('正在跳转到GitHub...');
      }
    });
  });
});