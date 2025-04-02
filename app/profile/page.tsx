'use client'

import { useState } from 'react'

export default function ProfilePage() {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    address: '123 Futuristic St, Neon City, 12345'
  })

  const [isEditing, setIsEditing] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Here you would typically send the updated user data to your server
    setIsEditing(false)
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold mb-8 text-blue-300">Your Profile</h1>
      <div className="bg-blue-800/30 p-6 rounded-lg max-w-md mx-auto">
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-blue-300 mb-2">Name</label>
              <input
                type="text"
                id="name"
                value={user.name}
                onChange={(e) => setUser({...user, name: e.target.value})}
                className="w-full px-3 py-2 bg-blue-900/50 rounded-md text-white"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-blue-300 mb-2">Email</label>
              <input
                type="email"
                id="email"
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
                className="w-full px-3 py-2 bg-blue-900/50 rounded-md text-white"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block text-sm font-medium text-blue-300 mb-2">Address</label>
              <textarea
                id="address"
                value={user.address}
                onChange={(e) => setUser({...user, address: e.target.value})}
                className="w-full px-3 py-2 bg-blue-900/50 rounded-md text-white"
              />
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-colors">
              Save Changes
            </button>
          </form>
        ) : (
          <div>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Address:</strong> {user.address}</p>
            <button onClick={() => setIsEditing(true)} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-colors">
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

