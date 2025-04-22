"use client";
import { useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null); // For success messages
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    setMessage(null); // Clear previous messages
    try {
      // Sign in with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch user data from Firestore
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        throw new Error('User data not found in database.');
      }

      const userData = userDoc.data();
      const userRole = userData.role;

      // Check user role
      if (userRole === 'admin') {
        router.push('/admin'); // Redirect to admin page
      } else {
        await auth.signOut(); // Sign out if not an admin
        throw new Error('Access denied: You do not have admin privileges.');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err.message.includes('wrong-password')) {
          setError('Incorrect password. Please try again.');
        } else if (err.message.includes('user-not-found')) {
          setError('No user found with this email.');
        } else {
          setError(err.message || 'Failed to log in. Please check your credentials.');
        }
      } else {
        setError('An unexpected error occurred during login.');
      }
    }
  };

  const handlePasswordReset = async () => {
    setError(null); // Clear previous errors
    setMessage(null); // Clear previous messages
    if (!email) {
      setError('Please enter your email to reset your password.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent! Please check your inbox.');
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err.message.includes('user-not-found')) {
          setError('No user found with this email.');
        } else {
          setError(err.message || 'Failed to send password reset email.');
        }
      } else {
        setError('An unexpected error occurred while sending the password reset email.');
      }
    }
  };

  return (
    <div className="px-6 py-20 my-20 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {message && <p className="text-green-500">{message}</p>}
        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
      <button
        type="button"
        onClick={handlePasswordReset}
        className="mt-2 text-blue-600 hover:underline"
      >
        Forgot Password?
      </button>
    </div>
  );
}