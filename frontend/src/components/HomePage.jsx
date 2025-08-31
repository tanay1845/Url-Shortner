import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import {toast} from "react-toastify"

const HomePage = () => {
  const [url, setUrl] = useState("")
  const [shortId, setShortId] = useState(null)

  const navigate = useNavigate()



  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post("http://localhost:3000/api/shorturl/url", {
        url
      }, {
        withCredentials: true
      })
      setShortId(response.data)
      console.log(response.data)
    } catch (error) {
      console.log("Error while sendig data", error)
      toast.error(error.response.data.message)
    }
  }

  return (<>
    <div className="w-full min-h-[100vh] bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex flex-col items-center justify-start pt-16 px-4">
  {/* Title */}
  <div className="text-center mb-10 mt-20">
    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-3">
      🔗 URL Shortener
    </h1>
    <p className="text-lg md:text-xl text-gray-600 font-medium">
      Paste a long URL and get a tiny one in seconds!
    </p>
  </div>

  {/* Form */}
  <form
    onSubmit={handleSubmit}
    className="bg-white w-full max-w-2xl rounded-xl shadow-2xl px-6 py-8 flex flex-col gap-6"
  >
    {/* Input Field */}
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
      <label className="font-semibold text-lg sm:text-xl text-gray-700">
        Enter URL:
      </label>
      <input
        className="border-2 rounded-md px-4 py-2 w-full sm:w-[70%] focus:outline-none focus:ring-2 focus:ring-purple-500"
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://example.com"
      />
    </div>

    {/* Short URL Display */}
    {shortId && (
      <div className="bg-indigo-300 px-4 py-3 rounded-md text-center break-all border-l-4 border-indigo-500 shadow-sm">
        <a
          href={`http://localhost:3000/${shortId.newUrl.shortId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-black font-medium underline"
        >
          http://localhost:3000/{shortId.newUrl.shortId}
        </a>
        {
          shortId.qrCodeImg && (
            <img src={shortId.qrCodeImg} alt="Generated QR COde" 
            className='mt-5 mx-auto'
            />
          )
        }
      </div>
    )}

    {/* Submit Button */}
    <button
      type="submit"
      className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-md mx-auto transition duration-300 shadow-md w-full sm:w-[50%]"
    >
      Shorten URL
    </button>
  </form>
</div>


  </>
  )
}

export default HomePage
