import React from 'react'

function Login() {
  return (
    <div class="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
    <div class="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h2 class="text-2xl font-bold text-center text-gray-900 dark:text-white">Login to Your Account</h2>
        <form class="space-y-6" action="#" method="POST">
            <div>
                <label class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300" for="email">Email</label>
                <input type="email" id="email" name="email" required="" class="block w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="you@example.com"/>
            </div>
            <div>
                <label class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300" for="password">Password</label>
                <input type="password" id="password" name="password" required="" class="block w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="••••••••"/>
            </div>
            <button type="submit" class="w-full px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"><a href="/page" className='w-full px-10 py-5'>Login</a></button>
        </form>
        <p class="text-sm font-light text-center text-gray-500 dark:text-gray-400">
            Don’t have an account? <a href="/signup" class="font-medium text-blue-600 hover:underline dark:text-blue-500">Sign up</a>
        </p>
    </div>
</div>
  )
}

export default Login