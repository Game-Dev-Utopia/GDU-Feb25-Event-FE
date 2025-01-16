import React from 'react'

const Login = () => {
  return (
    <div
      className="flex justify-center items-center min-h-screen"
      style={{
        backgroundImage: `url('/images/background_img2.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div
        className="bg-black bg-opacity-90 px-10 py-10 rounded-3xl border-2 border-yellow-500 shadow-lg max-w-md w-full md:w-1/2 mx-5"
        style={{ fontFamily: 'HarryP' }}
      >
        <h1
          className="text-5xl md:text-5xl font-semibold text-center text-yellow-400 mb-6"
          style={{ fontFamily: 'HarryP' }}
        >
          GLITCHED
        </h1>

        <div className="mt-8">
          <div className="mb-6">
            <label className="text-2xl font-medium text-yellow-400">Email</label>
            <input
              className="w-full border-2 border-gray-300 rounded-xl p-4 mt-1 bg-transparent focus:outline-none focus:border-blue-500 text-yellow-200"
              type="text"
              placeholder="Enter the email"
            />
          </div>

          <div>
            <label className="text-2xl font-medium text-yellow-400">Password</label>
            <input
              className="w-full border-2 border-gray-300 rounded-xl p-4 mt-1 bg-transparent focus:outline-none focus:border-blue-500 text-yellow-200"
              type="password"
              placeholder="Enter the password"
            />
          </div>

          <div className="mt-8 flex flex-col gap-y-4">
            <button className="active:scale-[.98] active:duration-75 hover:scale-[1.1] transition-all py-3 rounded-xl bg-deepCrimson text-silver text-2xl font-bold button hover:bg-burntOrange transition-colors">
              LOGIN
            </button>
          </div>
        </div>
      </div>
    </div>
  
  )
}

export default Login
