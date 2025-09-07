
export default function AboutPage() {
  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Tentang Kantor Pemantauan Irigasi Bunta</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Berdedikasi untuk manajemen air berkelanjutan dan keunggulan irigasi di wilayah Bunta sejak 2010.
          </p>
        </div>

        {/* Office Profile Section */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-blue-800 mb-6">Profil Kantor</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Sejarah Kami</h3>
                <p className="text-gray-700 mb-4">
                  Didirikan pada tahun 2010, Kantor Pemantauan Irigasi Bunta dibuat untuk memenuhi kebutuhan yang semakin meningkat 
                  akan manajemen air yang efisien di sektor pertanian wilayah ini. Selama 15 tahun terakhir, kami telah 
                  melayani lebih dari 250 petani dan mengelola irigasi untuk lebih dari 1.200 hektar lahan pertanian.
                </p>
                <p className="text-gray-700">
                  Kantor kami beroperasi di bawah Kementerian Pertanian dan memainkan peran penting dalam memastikan penggunaan air yang berkelanjutan sambil mendukung petani lokal dalam mengoptimalkan praktik irigasi mereka.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Wilayah Tanggung Jawab</h3>
                <p className="text-gray-700 mb-4">
                  Kami mencakup seluruh wilayah Bunta, termasuk:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Kecamatan Bunta - 650 hektar</li>
                  <li>Kecamatan lainnya - 580 hektar</li>
                  <li>Area pertanian sekitarnya</li>
                  <li>Saluran irigasi utama dan waduk</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-8 text-center">Visi & Misi</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">👁️</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Visi Kami</h3>
                <p className="text-blue-100">
                  Menjadi kantor manajemen irigasi terkemuka yang memastikan sumber daya air berkelanjutan
                  dan mendukung keunggulan pertanian di wilayah Bunta.
                </p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🎯</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Misi Kami</h3>
                <p className="text-blue-100">
                  Menyediakan pemantauan irigasi yang andal, wawasan berbasis data, dan dukungan teknis
                  kepada petani sambil mempromosikan konservasi air dan praktik pertanian berkelanjutan.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Main Tasks Section */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-green-800 mb-8">Tugas & Fungsi Utama</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-green-50 p-6 rounded-lg">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-xl">💧</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-green-800">Pemantauan Air</h3>
                <p className="text-gray-700 text-sm">
                  Pemantauan 24/7 level air, laju aliran, dan kualitas di semua saluran irigasi.
                </p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-xl">📊</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-green-800">Analisis Data</h3>
                <p className="text-gray-700 text-sm">
                  Mengumpulkan dan menganalisis data irigasi untuk memberikan wawasan yang dapat ditindaklanjuti bagi petani.
                </p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-xl">👨‍🌾</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-green-800">Dukungan Petani</h3>
                <p className="text-gray-700 text-sm">
                  Bantuan teknis dan program pelatihan untuk petani tentang praktik terbaik irigasi.
                </p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-xl">🔄</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-green-800">Pemeliharaan Infrastruktur</h3>
                <p className="text-gray-700 text-sm">
                  Pemeliharaan rutin dan peningkatan infrastruktur irigasi serta peralatan pemantauan.
                </p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-xl">🌍</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-green-800">Perlindungan Lingkungan</h3>
                <p className="text-gray-700 text-sm">
                  Menerapkan praktik manajemen air berkelanjutan untuk melindungi ekosistem lokal.
                </p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-xl">📋</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-green-800">Pelaporan</h3>
                <p className="text-gray-700 text-sm">
                  Pelaporan komprehensif kepada pemangku kepentingan dan instansi pemerintah tentang kinerja irigasi.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Organization Structure Section */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-purple-800 mb-8">Struktur Organisasi</h2>
            <div className="bg-gray-100 rounded-lg p-6">
              <div className="text-center mb-8">
                <div className="bg-purple-600 text-white p-4 rounded-lg mx-auto max-w-md">
                  <h3 className="text-xl font-semibold">Kepala Kantor</h3>
                  <p className="text-purple-100">Ir. Budi Santoso, M.Sc.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white p-4 rounded-lg shadow text-center">
                  <h4 className="font-semibold text-blue-800 mb-2">Divisi Pemantauan</h4>
                  <p className="text-sm text-gray-600">3 Petugas Lapangan</p>
                  <p className="text-sm text-gray-600">2 Analis Data</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow text-center">
                  <h4 className="font-semibold text-green-800 mb-2">Dukungan Teknis</h4>
                  <p className="text-sm text-gray-600">2 Insinyur Irigasi</p>
                  <p className="text-sm text-gray-600">1 Teknisi Pemeliharaan</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow text-center">
                  <h4 className="font-semibold text-orange-800 mb-2">Administrasi</h4>
                  <p className="text-sm text-gray-600">1 Manajer Kantor</p>
                  <p className="text-sm text-gray-600">1 Akuntan</p>
                </div>
              </div>

              <div className="text-center">
                <div className="bg-gray-200 p-3 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-1">Dukungan Lapangan</h4>
                  <p className="text-sm text-gray-600">5 Asisten Lapangan Musiman</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="bg-blue-50 rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-blue-800 mb-6">Informasi Kontak</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-black mb-2">Alamat Kantor</h3>
              <p className="text-gray-700">Jl. Raya Bunta No. 123<br />Kecamatan Bunta, Sulawesi Tengah</p>
            </div>
            <div>
              <h3 className="font-semibold text-black mb-2">Detail Kontak</h3>
              <p className="text-gray-700">Telepon: +62 812-3456-7890<br />Email: info@bunta-irrigation.go.id</p>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="font-semibold text-black mb-2">Jam Kerja</h3>
            <p className="text-gray-700">Senin - Jumat: 08:00 - 16:00 WIB<br />Sabtu: 08:00 - 12:00 WIB</p>
          </div>
        </section>
      </div>
    </div>
  );
}