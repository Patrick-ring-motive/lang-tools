# Paraphrase Translation API

A simple API that paraphrases English text by translating it to another language and back, helping to rephrase content while preserving meaning.

## Overview

This API uses double translation (English → Target Language → English) to paraphrase text. It includes built-in caching to improve performance for repeated requests.

## Base URL

```
https://your-script.google.com/macros/s/{SCRIPT_ID}/exec
```

## Endpoints

### GET /

Paraphrase text using query parameters.

**Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `text` | string | Yes | - | The English text to paraphrase |
| `lang` | string | No | `fr` | Intermediate language for translation (e.g., `fr`, `es`, `de`) |
| `altLang` | string | No | Same as `lang` | Alternative language code. Use `detect` for auto-detection |
| `pass` | string | No | - | Set to `one-way` for single translation (from specified language to English) |
| `cacheDisabled` | boolean | No | `false` | Set to `true` to bypass cache |

**Example Request:**

```javascript
const params = { text: 'I dont talk gud anymer', lang: 'fr' };
const queryString = encodeURIComponent(JSON.stringify(params));

const response = await fetch(`https://your-script.google.com/macros/s/{SCRIPT_ID}/exec?queryString=${queryString}`);
const result = await response.text();
console.log(result);
```

### POST /

Paraphrase text using POST body.

**Content-Type:** `application/json` or `text/plain`

**Request Body:**

```json
{
  "text": "I dont talk gud anymer",
  "lang": "fr",
  "altLang": "fr",
  "pass": "rephrase",
  "cacheDisabled": false
}
```

**Example Request:**

```javascript
const response = await fetch('https://your-script.google.com/macros/s/{SCRIPT_ID}/exec', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    text: 'I dont talk gud anymer',
    lang: 'fr'
  })
});

const result = await response.text();
console.log(result);
```

## Response

**Content-Type:** `text/plain`

Returns the paraphrased text as plain text.

**Example Response:**

```
I don't speak well anymore
```

## Usage Modes

### Standard Paraphrase (Default)

Translates English → Target Language → English to rephrase the text.

```javascript
const response = await fetch('https://your-script.google.com/macros/s/{SCRIPT_ID}/exec', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    text: 'I dont talk gud anymer',
    lang: 'fr'
  })
});

const result = await response.text();
console.log(result);
```

### One-Way Translation

Translates from a specified language to English (set `pass: "one-way"`).

```javascript
const response = await fetch('https://your-script.google.com/macros/s/{SCRIPT_ID}/exec', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    text: 'Je ne parle plus bien',
    lang: 'fr',
    pass: 'one-way'
  })
});

const result = await response.text();
console.log(result);
```

### Language Auto-Detection

Use `"detect"` for automatic language detection:

```javascript
const response = await fetch('https://your-script.google.com/macros/s/{SCRIPT_ID}/exec', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    text: 'Hola mundo',
    lang: 'detect',
    pass: 'one-way'
  })
});

const result = await response.text();
console.log(result);
```

## Supported Languages

The API supports any language code supported by Google Translate, including:

- `fr` - French
- `es` - Spanish
- `de` - German
- `it` - Italian
- `pt` - Portuguese
- `ja` - Japanese
- `zh` - Chinese
- `ru` - Russian
- `ar` - Arabic
- `la` - Latin

[See full list of language codes](https://cloud.google.com/translate/docs/languages)

## Caching

The API automatically caches results to improve performance. The cache key is based on the language and input text. To bypass the cache, set `cacheDisabled: true`.

## Error Handling

If translation fails, the API returns the original input text. Errors are logged but do not cause request failures.

```javascript
try {
  const response = await fetch('https://your-script.google.com/macros/s/{SCRIPT_ID}/exec', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: 'Hello world', lang: 'es' })
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const result = await response.text();
  console.log(result);
} catch (error) {
  console.error('Error:', error);
}
```

## Rate Limits

Rate limits depend on your Google Apps Script quotas. See [Google Apps Script quotas](https://developers.google.com/apps-script/guides/services/quotas) for details.

## Examples

### Basic Paraphrase (GET)

```javascript
const params = { text: 'The quick brown fox', lang: 'es' };
const queryString = encodeURIComponent(JSON.stringify(params));

const response = await fetch(`https://your-script.google.com/macros/s/{SCRIPT_ID}/exec?queryString=${queryString}`);
const result = await response.text();
console.log(result);
```

### Basic Paraphrase (POST)

```javascript
const response = await fetch('https://your-script.google.com/macros/s/{SCRIPT_ID}/exec', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    text: 'The quick brown fox',
    lang: 'es'
  })
});

const result = await response.text();
console.log(result);
```

### Translate Foreign Text to English

```javascript
const response = await fetch('https://your-script.google.com/macros/s/{SCRIPT_ID}/exec', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    text: 'Bonjour le monde',
    lang: 'fr',
    pass: 'one-way'
  })
});

const result = await response.text();
console.log(result);
```

### Disable Cache

```javascript
const response = await fetch('https://your-script.google.com/macros/s/{SCRIPT_ID}/exec', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    text: 'Hello world',
    lang: 'de',
    cacheDisabled: true
  })
});

const result = await response.text();
console.log(result);
```

### Reusable Function

```javascript
async function paraphraseText(text, lang = 'fr') {
  try {
    const response = await fetch('https://your-script.google.com/macros/s/{SCRIPT_ID}/exec', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, lang })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.text();
    return result;
  } catch (error) {
    console.error('Error paraphrasing text:', error);
    return text; // Return original text on error
  }
}

// Usage
const paraphrased = await paraphraseText('I dont talk gud anymer', 'fr');
console.log(paraphrased);
```

### Batch Processing

```javascript
async function paraphraseBatch(texts, lang = 'fr') {
  const results = [];
  
  for (const text of texts) {
    try {
      const response = await fetch('https://your-script.google.com/macros/s/{SCRIPT_ID}/exec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, lang })
      });
      
      const result = await response.text();
      results.push(result);
    } catch (error) {
      console.error(`Error paraphrasing "${text}":`, error);
      results.push(text); // Keep original on error
    }
  }
  
  return results;
}

// Usage
const texts = [
  'I dont talk gud anymer',
  'This sentence needs fixing',
  'Another text to rephrase'
];

const paraphrased = await paraphraseBatch(texts, 'es');
console.log(paraphrased);
```

## Deployment

1. Create a new Google Apps Script project
2. Paste the provided code
3. Deploy as a web app (Deploy → New deployment)
4. Set "Execute as" to your account
5. Set "Who has access" to "Anyone"
6. Copy the deployment URL

## License

This API uses Google Apps Script's LanguageApp service, which is subject to Google's terms of service.