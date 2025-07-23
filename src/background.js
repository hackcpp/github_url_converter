console.log('Background service worker loaded');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Received message:', request);
  try {
    if (request.action === 'convertToDeepWiki') {
      const url = convertToDeepWiki(request.url);
      console.log('Converted URL:', url);
      chrome.tabs.update({ url });
    } else if (request.action === 'convertToGitHub1s') {
      const url = convertToGitHub1s(request.url);
      console.log('Converted URL:', url);
      chrome.tabs.update({ url });
    } else if (request.action === 'convertToGitHub') {
      const url = convertToGitHub(request.url);
      console.log('Converted URL:', url);
      chrome.tabs.update({ url });
    }
    sendResponse({success: true});
  } catch (error) {
    console.error('URL conversion failed:', error);
    sendResponse({success: false, error: error.message});
  }
  return true; // 保持消息通道开放
});

function convertToDeepWiki(url) {
    if (url.includes('github.com')) {
    return url.replace('github.com', 'deepwiki.com');
  } else if (url.includes('github1s.com')) {
    return url.replace('github1s.com', 'deepwiki.com');
  }
  return url;
}

function convertToGitHub1s(url) {
  if (url.includes('github.com')) {
    return url.replace('github.com', 'github1s.com');
  } else if (url.includes('deepwiki.com')) {
    return url.replace('deepwiki.com', 'github1s.com');
  }
  return url;
}

function convertToGitHub(url) {
  if (url.includes('github1s.com')) {
    return url.replace('github1s.com', 'github.com');
  } else if (url.includes('deepwiki.com')) {
    return url.replace('deepwiki.com', 'github.com');
  }
  return url;
}