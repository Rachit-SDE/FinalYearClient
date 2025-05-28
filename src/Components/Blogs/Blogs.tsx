import React from 'react';

const Blog: React.FC = () => {
  const posts = [
    {
      id: 1,
      title: 'Introducing Live Bus Tracking Across All Routes',
      date: 'May 20, 2025',
      description:
        'Our newest update adds real-time tracking to every bus. Stay informed about arrival times and delays — right from your phone.',
    },
    {
      id: 2,
      title: 'How to Book a Seat in Under 60 Seconds',
      date: 'April 28, 2025',
      description:
        'Learn how to quickly reserve your seat using our mobile app or website with this easy step-by-step guide.',
    },
    {
      id: 3,
      title: 'New Routes Added to Our Intercity Network',
      date: 'April 15, 2025',
      description:
        'We’ve expanded! Now covering 10+ more cities, making travel easier and more connected for our users.',
    },
  ];

  return (
    <section className="bg-gray-100 py-[60px] px-6 md:px-20 lg:px-32">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 h-[55px] mb-6 border-b-[1px]">Latest Updates & Blogs</h2>
        <p className="text-lg text-gray-600  h-[60px]">
          Stay informed with our latest announcements, travel tips, and feature releases.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition"
            >
              <p className="text-sm text-gray-500 mb-2">{post.date}</p>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h3>
              <p className="text-gray-600">{post.description}</p>
              <button className="mt-4 text-blue-600 font-medium hover:underline">
                Read More →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
