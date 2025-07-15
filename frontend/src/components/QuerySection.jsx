import { useEffect, useState, useContext } from 'react';
import API, { setAuthToken } from '../utils/api';
import { AuthContext } from '../context/AuthContext';

const QuerySection = ({ eventId, eventCreator }) => {
  const { user, token } = useContext(AuthContext);
  const [queries, setQueries] = useState([]);
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState({});

  // ✅ Move fetchQueries up here
  const fetchQueries = async () => {
    try {
      const res = await API.get(`/queries/${eventId}`);
      setQueries(res.data);
    } catch (err) {
      console.error('Failed to fetch queries', err);
    }
  };

  // ✅ Use fetchQueries after it's defined
  useEffect(() => {
    fetchQueries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId]);

  const handleAsk = async () => {
    if (!question.trim()) return;
    try {
      setAuthToken(token);
      await API.post(`/queries/${eventId}`, { question });
      setQuestion('');
      fetchQueries();
    } catch (err) {
      console.error('Failed to post query', err);
    }
  };

  const handleAnswer = async (queryId) => {
    const answer = answers[queryId];
    if (!answer.trim()) return;
    try {
      setAuthToken(token);
      await API.put(`/queries/answer/${queryId}`, { answer });
      setAnswers(prev => ({ ...prev, [queryId]: '' }));
      fetchQueries();
    } catch (err) {
      console.error('Failed to post answer', err);
    }
  };

  return (
    <div className="mt-10">
      <h3 className="text-xl font-bold mb-4 text-purple-700 dark:text-purple-300">💬 Ask Me Queries</h3>

      {user._id !== eventCreator && (
        <div className="mb-6 flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="Type your question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="flex-1 p-3 border rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600"
          />
          <button
            onClick={handleAsk}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md"
          >
            Ask
          </button>
        </div>
      )}

      <div className="space-y-4">
        {queries.map(query => (
          <div
            key={query._id}
            className="bg-gray-100 dark:bg-gray-800 dark:text-white p-4 rounded-lg shadow-sm border border-gray-300 dark:border-gray-700"
          >
            <p className="font-medium text-gray-800 dark:text-gray-200">
              🙋‍♂️ <strong>{query.askedBy.name}</strong> asked:
            </p>
            <p className="ml-2 mt-1 text-gray-700 dark:text-gray-300">{query.question}</p>

            {query.answer ? (
              <p className="mt-2 text-green-700 dark:text-green-400">
                💬 <strong>Answer:</strong> {query.answer}
              </p>
            ) : user._id === eventCreator && (
              <div className="mt-4 flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  placeholder="Write an answer..."
                  value={answers[query._id] || ''}
                  onChange={(e) => setAnswers(prev => ({ ...prev, [query._id]: e.target.value }))}
                  className="flex-1 p-2 border rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600"
                />
                <button
                  onClick={() => handleAnswer(query._id)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
                >
                  Reply
                </button>
              </div>
            )}
          </div>
        ))}

        {queries.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400">No queries asked yet.</p>
        )}
      </div>
    </div>
  );
};

export default QuerySection;
