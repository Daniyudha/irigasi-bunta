'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { newsArticles } from '@/types/news';

export default function NewsArticlePage() {
  const params = useParams();
  const articleId = params.id as string;

  const article = newsArticles.find(article => article.id === articleId);

  if (!article) {
    return (
      <div className="min-h-screen py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Article Not Found</h1>
          <p className="text-xl text-gray-600 mb-8">
            The news article you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/news"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to News
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-blue-600">Home</Link>
            </li>
            <li className="before:content-['/'] before:mx-2">
              <Link href="/news" className="hover:text-blue-600">News</Link>
            </li>
            <li className="before:content-['/'] before:mx-2">
              <span className="text-gray-800">{article.title}</span>
            </li>
          </ol>
        </nav>

        {/* Article Header */}
        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          {article.imageUrl ? (
            <div className="h-64 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">News Image</span>
            </div>
          ) : (
            <div className="h-64 bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
              <span className="text-white text-4xl">📰</span>
            </div>
          )}

          <div className="p-8">
            {/* Article Meta */}
            <div className="flex flex-wrap items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                  {article.category}
                </span>
                <span className="text-sm text-gray-500">{article.readTime} min read</span>
              </div>
              <span className="text-sm text-gray-500">{formatDate(article.publishDate)}</span>
            </div>

            {/* Article Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              {article.title}
            </h1>

            {/* Author */}
            <div className="flex items-center mb-8">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                <span className="text-gray-600">👤</span>
              </div>
              <div>
                <p className="font-medium text-gray-800">By {article.author}</p>
              </div>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-gray-700 leading-relaxed">
                {article.content}
              </p>
            </div>

            {/* Tags */}
            {article.tags.length > 0 && (
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Back to News Link */}
            <div className="border-t border-gray-200 pt-6">
              <Link
                href="/news"
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
              >
                ← Back to News
              </Link>
            </div>
          </div>
        </article>

        {/* Related Articles (placeholder) */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {newsArticles
              .filter(a => a.id !== article.id && a.category === article.category)
              .slice(0, 2)
              .map((relatedArticle) => (
                <Link
                  key={relatedArticle.id}
                  href={`/news/${relatedArticle.id}`}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {relatedArticle.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {relatedArticle.excerpt}
                  </p>
                  <span className="text-blue-600 text-sm font-medium">
                    Read more →
                  </span>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}