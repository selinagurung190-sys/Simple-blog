
import React, { useState, useEffect } from 'react';
import { getDailyQuote } from '../services/geminiService';

const DailyMotivation: React.FC = () => {
  const [quote, setQuote] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuote = async () => {
      const today = new Date().toISOString().split('T')[0];
      const storedData = localStorage.getItem('dailyMotivation');
      
      if (storedData) {
        try {
          const { date, quote: storedQuote } = JSON.parse(storedData);
          if (date === today) {
            setQuote(storedQuote);
            setIsLoading(false);
            return;
          }
        } catch (error) {
          console.error("Failed to parse daily motivation from localStorage", error);
        }
      }

      setIsLoading(true);
      const newQuote = await getDailyQuote();
      setQuote(newQuote);
      localStorage.setItem('dailyMotivation', JSON.stringify({ date: today, quote: newQuote }));
      setIsLoading(false);
    };

    fetchQuote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-gradient-to-r from-purple-300 to-pink-300 p-6 rounded-2xl shadow-lg mb-8 text-white text-center">
      <h3 className="font-bold text-lg mb-2">Daily Motivation</h3>
      {isLoading ? (
        <p className="italic">Fetching a fresh thought for you...</p>
      ) : (
        <p className="text-lg italic">"{quote}"</p>
      )}
    </div>
  );
};

export default DailyMotivation;
