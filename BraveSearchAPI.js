/**
 * @module brave-search
 */

/**
 * @classdesc A class that represents the Brave Search library
 */
export class BraveSearch {
  /**
   * Creates an instance of BraveSearch
   * @param {string} apiKey - The API key to access the Brave Search API
   */
  constructor(apiKey) {
    // Save the API key as an instance property
    this.apiKey = apiKey;
    // Define the base URL of the API as a static property of the class
    this.baseUrl = "https://api.search.brave.com/res/v1/web/search";
    // Define the base URL of the Suggest Search API as a static property of the class
    this.suggestUrl = "https://api.search.brave.com/res/v1/suggest/search";
    // Define the base URL of the Spell Check Search API as a static property of the class
    this.spellcheckUrl = "https://api.search.brave.com/res/v1/spellcheck/search";
  }

  /**
   * Builds the query URL from the given parameters
   * @param {string} query - The search term
   * @param {Object} [options] - The optional search options
   * @param {string} [options.language] - The language code for the search. Must be one of the supported codes by the API (see https://api.search.brave.com/app/documentation/language-codes). Defaults to 'en'.
   * @param {string} [options.country] - The country code for the search. Must be one of the supported codes by the API (see https://api.search.brave.com/app/documentation/country-codes). Defaults to 'us'.
   * @param {number} [options.size] - The number of results per page to get. Must be a number between 1 and 100. Defaults to 10.
   * @param {number} [options.offset] - The page number to get. Must be a number greater or equal to 0. Defaults to 0.
   * @param {string} [options.filters] - The search filters to apply. Must be a string with one or more filters separated by commas. The available filters are: 'image', 'video', 'news', 'map', 'shopping', 'social'. Defaults to no filters.
   * @returns {string} The query URL
   */
  buildQueryUrl(query, options) {
    // Initialize the URL with the base URL
    let url = this.baseUrl;
    // Add the mandatory parameter q with the search term
    url += "?q=" + encodeURIComponent(query);
    // Add the optional parameters if specified
    if (options) {
      // Add the parameter language with the language code
      if (options.language) {
        url += "&search_lang=" + encodeURIComponent(options.language);
      }
      // Add the parameter country with the country code
      if (options.country) {
        url += "&country=" + encodeURIComponent(options.country);
      }
      // Add the parameter size with the number of results per page
      if (options.size) {
        url += "&count=" + encodeURIComponent(options.size);
      }
      // Add the parameter offset with the page number
      if (options.offset) {
        url += "&offset=" + encodeURIComponent(options.offset);
      }
      // Add the parameter filters with the search filters
      if (options.filters) {
        url += "&result_filter=" + encodeURIComponent(options.filters);
      }
    }
    // Return the built URL
    return url;
  }

  /**
   * Performs a request to the API and returns a promise with the response
   * @param {string} query - The search term
   * @param {Object} [options] - The optional search options (see buildQueryUrl for details)
   * @returns {Promise<Object>} A promise that resolves with a response object that contains the search results or rejects with an error message
   */
  search(query, options) {
    // Build the query URL
    let url = this.buildQueryUrl(query, options);
    console.log('\n',url,'\n');
    // Create a promise that resolves with the response from the API
    return new Promise((resolve, reject) => {
      // Use fetch to perform the request with the GET method and the URL
      fetch(url, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Accept-Encoding": "gzip",
          "X-Subscription-Token": this.apiKey
        },
      })
        .then((response) => {
          // Check if the status code is 200 (OK)
          if (response.ok) {
            // Return the response as a JSON object
            return response.json();
          } else {
            // Reject the promise with the status code and error message
            reject(response.status + ": " + response.statusText);
          }
        })
        .then((data) => {
          // Resolve the promise with the data object
          resolve(data);
        })
        .catch((error) => {
          // Reject the promise with the error message
          reject(error.message);
        });
    });
  }

  /**
   * Builds the suggest URL from the given parameters
   * @param {string} query - The search term
   * @param {Object} [options] - The optional suggest options
   * @param {string} [options.language] - The language code for the suggestions. Must be one of the supported codes by the API (see https://api.search.brave.com/app/documentation/language-codes). Defaults to 'en'.
   * @param {string} [options.country] - The country code for the suggestions. Must be one of the supported codes by the API (see https://api.search.brave.com/app/documentation/country-codes). Defaults to 'us'.
   * @returns {string} The suggest URL
   */
  buildSuggestUrl(query, options) {
    // Initialize the URL with the base URL
    let url = this.suggestUrl;
    // Add the mandatory parameter q with the search term
    url += "?q=" + encodeURIComponent(query);
    // Add the optional parameters if specified
    if (options) {
      // Add the parameter language with the language code
      if (options.language) {
        url += "&language=" + encodeURIComponent(options.language);
      }
      // Add the parameter country with the country code
      if (options.country) {
        url += "&country=" + encodeURIComponent(options.country);
      }
    }
    // Return the built URL
    return url;
  }

  /**
   * Performs a request to the Suggest Search API and returns a promise with the response
   * @param {string} query - The search term
   * @param {Object} [options] - The optional suggest options (see buildSuggestUrl for details)
   * @returns {Promise<Object>} A promise that resolves with a response object that contains the search suggestions or rejects with an error message
   */
  suggest(query, options) {
    // Build the suggest URL
    let url = this.buildSuggestUrl(query, options);
    // Create a promise that resolves with the response from the API
    return new Promise((resolve, reject) => {
      // Use fetch to perform the request with the GET method and the URL
      fetch(url, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Accept-Encoding": "gzip",
          "X-Subscription-Token": this.apiKey
        },
      })
        .then((response) => {
          // Check if the status code is 200 (OK)
          if (response.ok) {
            // Return the response as a JSON object
            return response.json();
          } else {
            // Reject the promise with the status code and error message
            reject(response.status + ": " + response.statusText);
          }
        })
        .then((data) => {
          // Resolve the promise with the data object
          resolve(data);
        })
        .catch((error) => {
          // Reject the promise with the error message
          reject(error.message);
        });
    });
  }

  /**
   * Builds the spellcheck URL from the given parameters
   * @param {string} query - The search term
   * @param {Object} [options] - The optional spellcheck options
   * @param {string} [options.language] - The language code for the spellcheck. Must be one of the supported codes by the API (see https://api.search.brave.com/app/documentation/language-codes). Defaults to 'en'.
   * @returns {string} The spellcheck URL
   */
  buildSpellcheckUrl(query, options) {
    // Initialize the URL with the base URL
    let url = this.spellcheckUrl;
    // Add the mandatory parameter q with the search term
    url += "?q=" + encodeURIComponent(query);
    // Add the optional parameters if specified
    if (options) {
      // Add the parameter language with the language code
      if (options.language) {
        url += "&language=" + encodeURIComponent(options.language);
      }
    }
    // Return the built URL
    return url;
  }

  /**
   * Performs a request to the Spell Check Search API and returns a promise with the response
   * @param {string} query - The search term
   * @param {Object} [options] - The optional spellcheck options (see buildSpellcheckUrl for details)
   * @returns {Promise<Object>} A promise that resolves with a response object that contains the spelling corrections or rejects with an error message
   */
  spellcheck(query, options) {
    // Build the spellcheck URL
    let url = this.buildSpellcheckUrl(query, options);
    // Create a promise that resolves with the response from the API
    return new Promise((resolve, reject) => {
      // Use fetch to perform the request with the GET method and the URL
      fetch(url, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Accept-Encoding": "gzip",
          "X-Subscription-Token": this.apiKey
        },
      })
        .then((response) => {
          // Check if the status code is 200 (OK)
          if (response.ok) {
            // Return the response as a JSON object
            return response.json();
          } else {
            // Reject the promise with the status code and error message
            reject(response.status + ": " + response.statusText);
          }
        })
        .then((data) => {
          // Resolve the promise with the data object
          resolve(data);
        })
        .catch((error) => {
          // Reject the promise with the error message
          reject(error.message);
        });
    });
  }
}
