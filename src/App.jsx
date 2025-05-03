import { useEffect, useState } from "react";
import { fetchTopHeadlines, fetchNewsByKeyword } from "./services/newsAPI";
import { motion } from "framer-motion";
import { Search, Clock, User, ExternalLink, ChevronRight, Bookmark, Share2 } from "lucide-react";



function App() {
  const [news, setNews] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("general");
  const [darkMode, setDarkMode] = useState(false);
  
  useEffect(() => {
    fetchTopHeadlines(category).then((articles) => {
      setNews(articles);
      setLoading(false);
    });
  }, [category]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (search.trim() === "") return;
    setLoading(true);
    const results = await fetchNewsByKeyword(search);
    setNews(results);
    setLoading(false);
  };

  const categories = ["general", "business", "technology", "entertainment", "sports", "science", "health"];

  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-300`}>
      {/* Header */}
      <header className={`py-6 px-6 sm:px-10 lg:px-16 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md sticky top-0 z-10`}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 sm:mb-0">
            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: 10 }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
            >
              <span className="text-3xl">📰</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-2xl md:text-3xl font-bold tracking-tight"
            >
              <span className={`${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>Buzz</span>
              <span>Brief</span>
            </motion.h1>
          </div>
          
          <form
            onSubmit={handleSearch}
            className="relative w-full sm:w-96"
          >
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for news..."
              className={`w-full pl-10 pr-4 py-2 rounded-full ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 focus:ring-blue-400 text-white' 
                  : 'bg-gray-100 border-gray-200 focus:ring-blue-500 text-gray-900'
              } border focus:outline-none focus:ring-2 transition-all`}
            />
            <Search className={`absolute left-3 top-2.5 h-5 w-5 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`} />
            <button
              type="submit"
              className={`absolute right-1 top-1 px-4 py-1 ${
                darkMode 
                  ? 'bg-blue-600 hover:bg-blue-700' 
                  : 'bg-blue-500 hover:bg-blue-600'
              } text-white rounded-full transition-colors`}
            >
              Search
            </button>
          </form>
          
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className={`hidden sm:block ml-4 p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'}`}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      {/* Category Tabs */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} sticky top-20 z-10 shadow-sm mb-8`}>
        <div className="max-w-7xl mx-auto px-6 py-2 overflow-x-auto">
          <div className="flex space-x-2 md:space-x-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 text-sm md:text-base capitalize whitespace-nowrap rounded-full transition-all ${
                  category === cat
                    ? darkMode 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-blue-500 text-white'
                    : darkMode 
                      ? 'text-gray-300 hover:bg-gray-700' 
                      : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Featured Article - Only show for desktop and if there are news items */}
        {!loading && news.length > 0 && (
          <motion.div 
            className="hidden lg:block mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
              Featured Story
            </h2>
            <div className={`grid grid-cols-2 gap-8 rounded-xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg p-6`}>
              {news[0]?.urlToImage && (
                <div className="rounded-xl overflow-hidden h-96">
                  <img
                    src={news[0].urlToImage}
                    alt="featured news"
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-700"
                  />
                </div>
              )}
              <div className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-700'}`}>
                      {category.toUpperCase()}
                    </span>
                    <span className={`flex items-center text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      <Clock className="h-3 w-3 mr-1" />
                      {news[0]?.publishedAt && formatDate(news[0].publishedAt)}
                    </span>
                    {news[0]?.author && (
                      <span className={`flex items-center text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        <User className="h-3 w-3 mr-1" /> 
                        {news[0].author}
                      </span>
                    )}
                  </div>
                  <h2 className="text-3xl font-bold mb-4 leading-tight">
                    {news[0]?.title}
                  </h2>
                  <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {news[0]?.description}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <a
                    href={news[0]?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'} font-semibold`}
                  >
                    Read Full Article <ChevronRight className="ml-1 h-4 w-4" />
                  </a>
                  <div className="flex space-x-2">
                    <button className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                      <Bookmark className="h-5 w-5" />
                    </button>
                    <button className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                      <Share2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center mt-20">
            <div className={`animate-spin h-12 w-12 mb-4 border-4 ${darkMode ? 'border-blue-400 border-t-transparent' : 'border-blue-600 border-t-transparent'} rounded-full`}></div>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-lg font-medium`}>
              Loading latest news...
            </p>
          </div>
        ) : news.length === 0 ? (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-6xl mb-4">😕</div>
            <h3 className="text-2xl font-bold mb-2">No articles found</h3>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-6`}>
              Try searching with different keywords or browse another category.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setCategory("general");
                setLoading(true);
                fetchTopHeadlines("general").then((articles) => {
                  setNews(articles);
                  setLoading(false);
                });
              }}
              className={`px-6 py-2 rounded-full ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white transition-colors`}
            >
              Return to Headlines
            </button>
          </motion.div>
        ) : (
          <>
            <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
              Latest News
            </h2>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.07 } },
              }}
            >
              {/* Skip the first news item in larger screens as it's used in the featured section */}
              {news.slice(window.innerWidth >= 1024 ? 1 : 0).map((article, index) => (
                <motion.div
                  key={index}
                  className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl shadow-sm hover:shadow-lg transition-all overflow-hidden flex flex-col h-full`}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                  }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="relative">
                    {article.urlToImage ? (
                      <div className="h-52 overflow-hidden">
                        <img
                          src={article.urlToImage}
                          alt={article.title || "news"}
                          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ) : (
                      <div className={`h-48 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} flex items-center justify-center`}>
                        <span className="text-4xl">📰</span>
                      </div>
                    )}
                    <div className="absolute top-3 left-3 flex space-x-2">
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-700'}`}>
                        {category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex items-center space-x-2 mb-3">
                      <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} flex items-center`}>
                        <Clock className="inline h-3 w-3 mr-1" />
                        {article.publishedAt && formatDate(article.publishedAt)}
                      </span>
                      {article.author && (
                        <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} flex items-center truncate max-w-28`}>
                          <User className="inline h-3 w-3 mr-1" />
                          {article.author}
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-3 line-clamp-2">
                      {article.title}
                    </h3>
                    
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm mb-4 line-clamp-3 flex-grow`}>
                      {article.description || "No description available."}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-200 dark:border-gray-700">
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'} text-sm font-medium flex items-center`}
                      >
                        Read more <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                      
                      <div className="flex space-x-1">
                        <button className={`p-1 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                          <Bookmark className="h-4 w-4" />
                        </button>
                        <button className={`p-1 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                          <Share2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className={`mt-12 py-8 ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'}`}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="mb-2">© {new Date().getFullYear()} BuzzBrief. All rights reserved.</p>
          <p className="text-sm">
            Developed By <a href="https://www.abhisheksoni.tech/">AbhishekSoni.tech</a><br /> <button onClick={() => setDarkMode(!darkMode)} className="underline">
              Toggle {darkMode ? 'Light' : 'Dark'} Mode
            </button>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;