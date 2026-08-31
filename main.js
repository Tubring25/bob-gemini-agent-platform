
// Internal dict
var LANGUAGE_NAMES = {
  "zh-Hans": "Simplified Chinese",
  "zh-Hant": "Traditional Chinese",
  "en": "English",
  "ja": "Japanese",
  "ko": "Korean",
  "fr": "French",
  "de": "German",
  "es": "Spanish",
  "it": "Italian",
  "ru": "Russian",
  "pt": "Portuguese",
  "pt-pt": "European Portuguese",
  "pt-br": "Brazilian Portuguese",
  "nl": "Dutch",
  "pl": "Polish",
  "ar": "Arabic"
};

/**
 * Declare the languages support
 */
function supportLanguages() {
  return [
    "auto",
    "zh-Hans",
    "zh-Hant",
    "en",
    "ja",
    "ko",
    "fr",
    "de",
    "es",
    "it",
    "ru",
    "pt",
    "pt-pt",
    "pt-br",
    "nl",
    "pl",
    "ar"
  ];
}

function getSourceLanguage(query) {
  var detectFrom = query.detectFrom;
  var from = query.from;
  return detectFrom || from;
}

function getTargetLanguage(query) {
  var detectTo = query.detectTo;
  var to = query.to;
  return detectTo || to;
}

function validateOptions() {
  var apiKey = $option.apiKey;
  var projectId = $option.projectId;

  if (!apiKey || apiKey.trim() === "") {
    return { type: "secretKey", message: "请填写 Google Cloud Authorization Key" };
  }

  if (!projectId || projectId.trim() === "") {
    return { type: "param", message: "请填写 Google Cloud Project ID" };
  }

  return null;
}
