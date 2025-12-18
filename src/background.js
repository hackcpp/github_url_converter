console.log('Background service worker loaded');

// 监听全局快捷键命令
chrome.commands.onCommand.addListener((command) => {
  console.log('Command received:', command);
  
  // 获取当前活动标签页
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    if (tabs.length === 0) return;
    
    const currentTab = tabs[0];
    const url = currentTab.url;
    
    try {
      let newUrl;
      switch (command) {
        case 'convert-to-deepwiki':
          newUrl = convertToDeepWiki(url);
          break;
        case 'convert-to-github1s':
          newUrl = convertToGitHub1s(url);
          break;
        case 'convert-to-github':
          newUrl = convertToGitHub(url);
          break;
        default:
          return;
      }
      
      if (newUrl !== url) {
        chrome.tabs.update(currentTab.id, { url: newUrl });
      }
    } catch (error) {
      console.error('URL conversion failed:', error);
    }
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Received message:', request);
  try {
    if (request.action === 'convertToDeepWiki') {
      const url = convertToDeepWiki(request.url);
      console.log('Converted URL:', url);
      chrome.tabs.update({ url }, (tab) => {
        if (chrome.runtime.lastError) {
          sendResponse({success: false, error: chrome.runtime.lastError.message});
        } else {
          sendResponse({success: true});
        }
      });
    } else if (request.action === 'convertToGitHub1s') {
      const url = convertToGitHub1s(request.url);
      console.log('Converted URL:', url);
      chrome.tabs.update({ url }, (tab) => {
        if (chrome.runtime.lastError) {
          sendResponse({success: false, error: chrome.runtime.lastError.message});
        } else {
          sendResponse({success: true});
        }
      });
    } else if (request.action === 'convertToGitHub') {
      const url = convertToGitHub(request.url);
      console.log('Converted URL:', url);
      chrome.tabs.update({ url }, (tab) => {
        if (chrome.runtime.lastError) {
          sendResponse({success: false, error: chrome.runtime.lastError.message});
        } else {
          sendResponse({success: true});
        }
      });
    }
  } catch (error) {
    console.error('URL conversion failed:', error);
    sendResponse({success: false, error: error.message});
  }
  return true; // 保持消息通道开放
});

function convertToDeepWiki(url) {
  const urlObj = new URL(url);
  if (urlObj.hostname.includes('github.com') || urlObj.hostname.includes('github1s.com')) {
    const pathParts = urlObj.pathname.split('/').slice(1, 3); // 获取owner/repo部分
    return `https://deepwiki.com/${pathParts.join('/')}`;
  }
  return url;
}

function convertToGitHub1s(url) {
  const urlObj = new URL(url);
  if (urlObj.hostname.includes('github.com') || urlObj.hostname.includes('deepwiki.com')) {
    const pathParts = urlObj.pathname.split('/').slice(1, 3); // 获取owner/repo部分
    return `https://github1s.com/${pathParts.join('/')}`;
  }
  return url;
}

function convertToGitHub(url) {
  const urlObj = new URL(url);
  if (urlObj.hostname.includes('github1s.com') || urlObj.hostname.includes('deepwiki.com')) {
    const pathParts = urlObj.pathname.split('/').slice(1, 3); // 获取owner/repo部分
    return `https://github.com/${pathParts.join('/')}`;
  }
  return url;
}