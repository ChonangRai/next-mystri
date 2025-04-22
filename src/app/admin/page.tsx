"use client";
import { useState, useEffect } from 'react';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { User } from 'firebase/auth';

interface HomePageContent {
  hero: {
    mainText: string;
    ctaText: string;
    ctaSubText: string;
    reassuranceText: string;
  };
  stats: Array<{
    number: string;
    text: string;
  }>;
}

export default function Admin() {
  const [content, setContent] = useState<HomePageContent>({
    hero: {
      mainText: "",
      ctaText: "",
      ctaSubText: "",
      reassuranceText: "",
    },
    stats: [
      { number: "", text: "" },
      { number: "", text: "" },
      { number: "", text: "" },
    ],
  });
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        fetchContent();
      } else {
        router.push('/admin/login');
      }
    });
    return () => unsubscribe();
  }, [router]);

  const fetchContent = async () => {
    try {
      const docRef = doc(db, 'pages', 'home');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setContent(docSnap.data() as HomePageContent);
      } else {
        console.log('No such document!');
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      console.error('Error fetching content:', errorMessage);
    }
  };

  const handleSave = async () => {
    try {
      const docRef = doc(db, 'pages', 'home');
      await setDoc(docRef, content);
      alert('Content updated!');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      alert('Failed to save content: ' + errorMessage);
    }
  };

  const handleStatChange = (
    index: number,
    field: 'number' | 'text',
    value: string
  ) => {
    const newStats = [...content.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    setContent({ ...content, stats: newStats });
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Homepage Content</h1>
      <div className="mb-6">
        <h2 className="text-xl mb-2">Hero Section</h2>
        <label className="block mb-1">Main Text</label>
        <input
          type="text"
          value={content.hero.mainText}
          onChange={(e) =>
            setContent({
              ...content,
              hero: { ...content.hero, mainText: e.target.value },
            })
          }
          className="w-full p-2 border"
          placeholder="e.g., We Fix. You Relax."
        />
        <label className="block mb-1 mt-4">CTA Text</label>
        <textarea
          value={content.hero.ctaText}
          onChange={(e) =>
            setContent({
              ...content,
              hero: { ...content.hero, ctaText: e.target.value },
            })
          }
          className="w-full p-2 border"
          placeholder="e.g., All-in-One Handyman Services..."
        />
        <label className="block mb-1 mt-4">CTA Sub Text</label>
        <textarea
          value={content.hero.ctaSubText}
          onChange={(e) =>
            setContent({
              ...content,
              hero: { ...content.hero, ctaSubText: e.target.value },
            })
          }
          className="w-full p-2 border"
          placeholder="e.g., Let us handle your handyman needs..."
        />
        <label className="block mb-1 mt-4">Reassurance Text</label>
        <input
          type="text"
          value={content.hero.reassuranceText}
          onChange={(e) =>
            setContent({
              ...content,
              hero: { ...content.hero, reassuranceText: e.target.value },
            })
          }
          className="w-full p-2 border"
          placeholder="e.g., Don't worry, we only ask..."
        />
      </div>
      <div className="mb-6">
        <h2 className="text-xl mb-2">Stats</h2>
        {content.stats.map((stat, index) => (
          <div key={index} className="mb-4">
            <label className="block mb-1">Stat {index + 1} Number</label>
            <input
              type="text"
              value={stat.number}
              onChange={(e) =>
                handleStatChange(index, 'number', e.target.value)
              }
              className="w-full p-2 border"
              placeholder="e.g., 5+"
            />
            <label className="block mb-1 mt-2">Stat {index + 1} Text</label>
            <input
              type="text"
              value={stat.text}
              onChange={(e) =>
                handleStatChange(index, 'text', e.target.value)
              }
              className="w-full p-2 border"
              placeholder="e.g., Years"
            />
          </div>
        ))}
      </div>
      <button
        onClick={handleSave}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Save
      </button>
      <button
        onClick={() => auth.signOut()}
        className="ml-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}