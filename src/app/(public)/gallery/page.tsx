'use client';

import { useState, useMemo } from 'react';
import Lightbox from '@/components/gallery/Lightbox';
import { galleryItems, galleryCategories, GalleryCategory } from '@/types/gallery';

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>('All');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageType, setSelectedImageType] = useState<'image' | 'video'>('image');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Filter items based on category
  const filteredItems = useMemo(() => {
    return selectedCategory === 'All'
      ? galleryItems
      : galleryItems.filter(item => item.category === selectedCategory);
  }, [selectedCategory]);

  const handleImageClick = (imageUrl: string, type: 'image' | 'video') => {
    setSelectedImage(imageUrl);
    setSelectedImageType(type);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setSelectedImage(null);
  };

  const getSelectedImageData = () => {
    if (!selectedImage) return null;
    return galleryItems.find(item => item.imageUrl === selectedImage);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Galeri</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Jelajahi koleksi foto kami yang menampilkan kegiatan irigasi, infrastruktur, dan acara komunitas.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {galleryCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-center">
          <p className="text-gray-600">
            Menampilkan {filteredItems.length} item{filteredItems.length !== 1 ? '' : ''}
            {selectedCategory !== 'All' && ` dalam ${selectedCategory}`}
          </p>
        </div>

        {/* Gallery Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-300"
                onClick={() => handleImageClick(item.imageUrl, item.type)}
              >
                {item.type === 'image' ? (
                  <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center group-hover:opacity-90 transition-opacity">
                    <span className="text-white text-4xl">📷</span>
                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center group-hover:opacity-90 transition-opacity relative">
                    <span className="text-white text-4xl">▶️</span>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center opacity-80">
                        <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-2 line-clamp-1">{item.title}</h3>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{formatDate(item.date)}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                        {item.category}
                      </span>
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-full">
                        {item.type}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* No Results Message */
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📷</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Tidak ada gambar ditemukan</h3>
            <p className="text-gray-600">
              Coba pilih kategori lain untuk melihat lebih banyak konten.
            </p>
          </div>
        )}

        {/* Features Information */}
        <div className="bg-blue-50 rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-4 text-blue-800">Fitur Galeri</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Galeri gambar interaktif dengan filter kategori</li>
            <li>Fungsi lightbox untuk melihat gambar ukuran penuh</li>
            <li>Gambar berkualitas tinggi infrastruktur irigasi dan kegiatan</li>
            <li>Dokumentasi acara komunitas dan kegiatan petani</li>
            <li>Desain responsif untuk tampilan mobile dan desktop</li>
            <li>Navigasi mudah antar kategori galeri</li>
          </ul>
        </div>

        {/* Lightbox */}
        <Lightbox
          isOpen={isLightboxOpen}
          onClose={closeLightbox}
          imageUrl={selectedImage || ''}
          title={getSelectedImageData()?.title || ''}
          description={getSelectedImageData()?.description || ''}
          type={selectedImageType}
        />
      </div>
    </div>
  );
}