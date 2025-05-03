import axios from "axios";

const API_KEY = "77270507adfd42cb9f7e69339a259417"; 
const BASE_URL = 'https://newsapi.org/v2/top-headlines';

export const fetchTopHeadlines = async (country = "in") => {
  const { data } = await axios.get(
    `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${API_KEY}`
  );
  return data.articles;
};

export const fetchNewsByKeyword = async (keyword) => {
  const { data } = await axios.get(
    `https://newsapi.org/v2/everything?q=${keyword}&apiKey=${API_KEY}`
  );
  return data.articles;
};

export const fetchNewsByCategory = async (category, country = "in") => {
  const { data } = await axios.get(
    `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${API_KEY}`
  );
  return data.articles;
};
