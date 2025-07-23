chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'convertToDeepWiki') {
    const url = convertToDeepWiki(request.url);
    chrome.tabs.update({ url });
  } else if (request.action === 'convertToGitHub1s') {
    const url = convertToGitHub1s(request.url);
    chrome.tabs.update({ url });
  } else if (request.action === 'convertToGitHub') {
    const url = convertToGitHub(request.url);
    chrome.tabs.update({ url });
  }
});

function convertToDeepWiki(url) {
  const u = new URL(url);
  const [owner, repo, , branch, ...pathParts] = u.pathname.split('/');
  const path = pathParts.join('/');
  return `https://deepwiki.com/${owner}/${repo}?path=${encodeURIComponent(path)}&branch=${branch}`;
}

function convertToGitHub1s(url) {
  return url.replace('github.com', 'github1s.com');
}

function convertToGitHub(url) {
  if (url.includes('github1s.com')) {
    return url.replace('github1s.com', 'github.com');
  } else if (url.includes('deepwiki.com')) {
    const u = new URL(url);
    const [owner, repo] = u.pathname.split('/').filter(Boolean);
    const branch = u.searchParams.get('branch');
    const path = u.searchParams.get('path');
    return `https://github.com/${owner}/${repo}/blob/${branch}/${path}`;
  }
  return url;
}