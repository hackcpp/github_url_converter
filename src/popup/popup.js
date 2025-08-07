function showStatus(message, isError = false) {
  const status = document.getElementById('status');
  status.textContent = message;
  status.style.color = isError ? 'red' : 'green';
  setTimeout(() => status.textContent = '', 3000);
}

function disableButton(buttonId) {
  const button = document.getElementById(buttonId);
  button.disabled = true;
  button.style.opacity = '0.5';
  button.style.cursor = 'not-allowed';
}

// 页面加载时检查当前URL并禁用相应按钮
chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
  const url = tabs[0]?.url;
  if (!url) return;

  const hostname = new URL(url).hostname;
  if (hostname === 'github.com') {
    disableButton('github-btn');
  } else if (hostname.includes('github1s.com')) {
    disableButton('github1s-btn');
  } else if (hostname.includes('deepwiki.com')) {
    disableButton('deepwiki-btn');
  } else {
    // 其他页面禁用所有按钮
    disableButton('github-btn');
    disableButton('github1s-btn');
    disableButton('deepwiki-btn');
  }
});

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