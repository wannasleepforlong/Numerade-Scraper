//⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⣀⣤⣄⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
//⠀⠀⠀⠀⠀⠀⢀⣠⣴⠞⠛⠉⠉⠉⠈⠈⠉⠉⠛⠷⣦⣄⡀⠀⠀⠀⠀⠀
//⠀⠀⠀⠀⢀⣴⠟⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ⠀⠙⢻⣦⡀⠀⠀⠀
//⠀⠀⢀⣾⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀  ⠀⠘⢷⣆⠀⠀
//⠀⢀⣴⡟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ⠀⠘⢷⣆⠀
//⢀⣾⠏⠀⠀⢀⣀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⣀⡀⠀⠀  ⢻⣆⠀
//⣾⡏⠀⣤⠾⠛⣉⡉⠛⢷⣤⠀⠀⠀⠀⢀⣶⠟⠛⣉⡙⠻⢷⣄ ⠈⢿⡆
//⢰⣿⠀⣼⠋⣴⣿⣿⣿⣷⡄⢹⣧⠀⠀⢠⣿⢃⣴⣿⣿⣿⣷⡈⢿⡄⢸⣧
//⢸⣿⠀⣿⡘⣿⣿⣿⣿⣿⡟⢠⣿⠀⠀⢸⣧⠸⣿⣿⣿⣿⣿⡇⢸⡇⢸⡗
//⠘⣿⡆⠹⣧⡙⠻⠿⠿⠛⢁⣼⠃⠀⠀⠀⢻⣆⠙⠿⠿⠿⠋⣠⡿⠁⣸⡇
//⠀⢹⣷⠀⠈⠛⠷⠶⠶⠞⠛⠁⠀⠀⠀⠀⠀⠘⠻⠶⠶⠶⠞⠋⠀⢠⡿⠁
//⠀⠀⢻⣷⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀  ⠀⣸⣿⠃⠀
//⠀⠀⠀⠹⣿⣄⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⢀⣤⣾⠿⠁⠀⠀
//⠀⠀⠀⠀⠈⠙⠷⣦⣤⣠⡀⠀⠀⠀⠀⠀⠀⠀⣀⣀⣴⡿⠟⠁⠀⠀⠀⠀
//⠀⠀⠀⠀⠀⠀⠀⠈⠙⠛⠻⢾⣿⣶⣴⣿⡿⠿⠟⠛⠉⠀⠀⠀⠀⠀⠀⠀
//⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀

// What the heck are you doing here??!! Are you from the other side?? Or maybe you just want to steal code ಠ_ಠ

// Well feel free UwU I myself have referred from countless places including but not limited to github, chatgpt, stackoverflow, chrome webstore etc etc.

// Quoting what has been said by our forefathers, copy-and-Paste was programmed by programmers for programmers

chrome.browserAction.onClicked.addListener(function (tab) {
  // Get the page source content using the chrome.tabs API
  chrome.tabs.executeScript(tab.id, { code: 'document.documentElement.outerHTML' }, function (result) {
    if (chrome.runtime.lastError || !result || result.length === 0) {
      alert('Unable to copy the URL. Please try again.');
      return;
    }

    const sourceCode = result[0];
    const imageURL = findImageURL(sourceCode, 'https://cdn.numerade.com/ask_previews/');

    if (imageURL) {
      const transformedURL = transformImageURL(imageURL);;

      // Open a new tab with the transformed URL
      chrome.tabs.create({ url: transformedURL });

      // Notify the user
      alert('Opening the solution media.');
    } else {
      // Notify the user
      alert('Sorry! Not able to access the answer from Numerade.');
    }
  });
});

// Function to find the image URL pattern and extract the URL
function findImageURL(sourceCode, baseURL) {
  const regex = new RegExp(baseURL + '[^"\' ]+', 'i');
  const match = sourceCode.match(regex);

  return match ? match[0] : null;
}

// Function to transform the image URL to the specified format
function transformImageURL(imageURL) {
  const encoded = 'encoded/';
  const webm = '.webm';

  const startIndex = imageURL.indexOf('ask_previews/');
  const endIndex = imageURL.lastIndexOf('_large.jpg');

  if (startIndex !== -1 && endIndex !== -1) {
    const encodedURL = imageURL.slice(0, startIndex) + encoded;
    const webmURL = imageURL.slice(endIndex + '_large.jpg'.length) + webm;

    return encodedURL + imageURL.slice(startIndex + 'ask_previews/'.length, endIndex) + webmURL;
  }

  return imageURL;
}

// Function to copy text to the clipboard
function copyToClipboard(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);
}
