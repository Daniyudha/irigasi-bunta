export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white py-30"
        style={{
          backgroundImage: 'url(/images/hero-bg.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Konten */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Sistem Irigasi Bunta
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Informasi lengkap manajemen air dan irigasi untuk petani dan pemangku kepentingan di wilayah Bunta.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Lihat Level Air
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Pelajari Lebih Lanjut
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Layanan Kami
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💧</span>
              </div>
              <h3 className="text-xl font-semibold text-black mb-3">Pemantauan Level Air</h3>
              <p className="text-gray-600">
                Pemantauan real-time level air di saluran irigasi dengan analisis data historis.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold text-black mb-3">Analisis Data</h3>
              <p className="text-gray-600">
                Analisis data komprehensif dan visualisasi untuk pengambilan keputusan yang tepat dalam manajemen air.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌾</span>
              </div>
              <h3 className="text-xl font-semibold text-black mb-3">Dukungan Petani</h3>
              <p className="text-gray-600">
                Dukungan dan sumber daya khusus untuk petani dalam mengoptimalkan irigasi dan meningkatkan hasil panen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">250+</div>
              <div className="text-gray-600">Petani Dilayani</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">1,200+</div>
              <div className="text-gray-600">Hektar Tercover</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-gray-600">Pemantauan</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">15+</div>
              <div className="text-gray-600">Tahun Pengalaman</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ada Keluhan Dengan Jaringan Irigasi di Bunta?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Diskusikan dengan kami untuk mendapatkan pelayanan yang baik dan andal.
          </p>
          <a href="http://wa.me/6289696862326" target="_blank" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-400 hover:text-white cursor-pointer transition duration-300">
            Mulai Sekarang
          </a>
        </div>
      </section>
    </div>
  );
}
