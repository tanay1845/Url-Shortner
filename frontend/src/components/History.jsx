import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useLocation } from 'react-router';

const History = () => {

  const [data, setData] = useState([]);
  const location = useLocation()


  useEffect(() => {
    const fetchUrl = async () => {
      try {
        await axios.get("http://localhost:3000/api/shorturl", { withCredentials: true })
          .then((res) => {
            setData(res.data.urls)
            // console.log(res.data.urls)
          })
          .catch((err) => {
            console.log("failed to get item from database", err)
          })
      } catch (error) {
        console.error("Failed to get URLs from database", error);
      }
    }
    fetchUrl()
  }, [location])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-100 py-10 px-4">
  <h2 className="text-4xl font-bold text-center text-indigo-700 mb-10 mt-20">📊 URL Analytics Dashboard</h2>

  <div className="w-full overflow-x-auto">
    <div className="min-w-[600px] max-w-7xl mx-auto bg-white shadow-xl rounded-lg">
      <table className="w-full text-sm sm:text-base table-auto">
        <thead className="bg-indigo-600 text-white">
          <tr>
            <th className="px-4 sm:px-6 py-4 text-left font-semibold">Original URL</th>
            <th className="px-4 sm:px-6 py-4 text-left font-semibold">Short URL</th>
            <th className="px-4 sm:px-6 py-4 text-left font-semibold">QR Code</th>
            <th className="px-4 sm:px-6 py-4 text-center font-semibold">Total Clicks</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {data.map((url, index) => (
            <tr
              key={url._id}
              className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-indigo-50 transition-colors`}
            >
              <td className="px-4 sm:px-6 py-4 max-w-[250px] sm:max-w-[350px] truncate">
                <a
                  href={url.originalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline break-words"
                  title={url.originalUrl}
                >
                  {url.originalUrl}
                </a>
              </td>
              <td className="px-4 sm:px-6 py-4 break-all">
                <a
                  href={`http://localhost:3000/${url.shortId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  http://localhost:3000/{url.shortId}
                </a>
              </td>
              <td>
                {url.qrCodeImg?<img src={url.qrCodeImg} alt="QRCode" /> : "Not Generated"}
              </td>
              <td className="px-4 sm:px-6 py-4 text-center font-semibold text-indigo-700">
                {url.visitHistory.length}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>
  )
}

export default History
