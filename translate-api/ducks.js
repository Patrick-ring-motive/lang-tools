async function getDDGSuggestions(query) {
  const url = `https://duckduckgo.com/ac/?q=${encodeURIComponent(query)}&type=list`;

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0' // Some endpoints prefer a standard browser UA
      }
    });

    if (!response.ok) throw new Error('Network response was not ok');

    const data = await response.json();

    // DDG returns [original_query, [suggestions]]
    const suggestions = data[1] || [];

    // Filter out the exact query if it's already in the suggestions
    return suggestions.filter(s => s.toLowerCase() !== query.toLowerCase());
  } catch (error) {
    console.error("Suggestion error:", error);
    return [];
  }
}
