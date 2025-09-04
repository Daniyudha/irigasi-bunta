
export default function AboutPage() {
  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">About Bunta Irrigation Monitoring Office</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Dedicated to sustainable water management and irrigation excellence in the Bunta region since 2010.
          </p>
        </div>

        {/* Office Profile Section */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-blue-800 mb-6">Office Profile</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Our History</h3>
                <p className="text-gray-700 mb-4">
                  Established in 2010, the Bunta Irrigation Monitoring Office was created to address the growing 
                  need for efficient water management in the region&apos;s agricultural sector. Over the past 15 years, we&apos;ve 
                  served over 250 farmers and managed irrigation for more than 1,200 hectares of farmland.
                </p>
                <p className="text-gray-700">
                  Our office operates under the Ministry of Agriculture and plays a crucial role in ensuring sustainable 
                  water usage while supporting local farmers in optimizing their irrigation practices.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Area of Responsibility</h3>
                <p className="text-gray-700 mb-4">
                  We cover the entire Bunta region, including:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Bunta District - 650 hectares</li>
                  <li> District - 580 hectares</li>
                  <li>Surrounding agricultural areas</li>
                  <li>Main irrigation channels and reservoirs</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-8 text-center">Vision & Mission</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">👁️</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Our Vision</h3>
                <p className="text-blue-100">
                  To become a leading irrigation management office that ensures sustainable water resources 
                  and supports agricultural excellence in the Bunta region.
                </p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🎯</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
                <p className="text-blue-100">
                  To provide reliable irrigation monitoring, data-driven insights, and technical support 
                  to farmers while promoting water conservation and sustainable agricultural practices.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Main Tasks Section */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-green-800 mb-8">Main Tasks & Functions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-green-50 p-6 rounded-lg">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-xl">💧</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-green-800">Water Monitoring</h3>
                <p className="text-gray-700 text-sm">
                  24/7 monitoring of water levels, flow rates, and quality across all irrigation channels.
                </p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-xl">📊</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-green-800">Data Analysis</h3>
                <p className="text-gray-700 text-sm">
                  Collecting and analyzing irrigation data to provide actionable insights for farmers.
                </p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-xl">👨‍🌾</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-green-800">Farmer Support</h3>
                <p className="text-gray-700 text-sm">
                  Technical assistance and training programs for farmers on irrigation best practices.
                </p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-xl">🔄</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-green-800">Infrastructure Maintenance</h3>
                <p className="text-gray-700 text-sm">
                  Regular maintenance and upgrades of irrigation infrastructure and monitoring equipment.
                </p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-xl">🌍</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-green-800">Environmental Protection</h3>
                <p className="text-gray-700 text-sm">
                  Implementing sustainable water management practices to protect local ecosystems.
                </p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-xl">📋</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-green-800">Reporting</h3>
                <p className="text-gray-700 text-sm">
                  Comprehensive reporting to stakeholders and government agencies on irrigation performance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Organization Structure Section */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-purple-800 mb-8">Organization Structure</h2>
            <div className="bg-gray-100 rounded-lg p-6">
              <div className="text-center mb-8">
                <div className="bg-purple-600 text-white p-4 rounded-lg mx-auto max-w-md">
                  <h3 className="text-xl font-semibold">Office Head</h3>
                  <p className="text-purple-100">Ir. Budi Santoso, M.Sc.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white p-4 rounded-lg shadow text-center">
                  <h4 className="font-semibold text-blue-800 mb-2">Monitoring Division</h4>
                  <p className="text-sm text-gray-600">3 Field Officers</p>
                  <p className="text-sm text-gray-600">2 Data Analysts</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow text-center">
                  <h4 className="font-semibold text-green-800 mb-2">Technical Support</h4>
                  <p className="text-sm text-gray-600">2 Irrigation Engineers</p>
                  <p className="text-sm text-gray-600">1 Maintenance Technician</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow text-center">
                  <h4 className="font-semibold text-orange-800 mb-2">Administration</h4>
                  <p className="text-sm text-gray-600">1 Office Manager</p>
                  <p className="text-sm text-gray-600">1 Accountant</p>
                </div>
              </div>

              <div className="text-center">
                <div className="bg-gray-200 p-3 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-1">Field Support</h4>
                  <p className="text-sm text-gray-600">5 Seasonal Field Assistants</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="bg-blue-50 rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-blue-800 mb-6">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-black mb-2">Office Address</h3>
              <p className="text-gray-700">Jl. Raya Bunta No. 123<br />Bunta District, Central Sulawesi</p>
            </div>
            <div>
              <h3 className="font-semibold text-black mb-2">Contact Details</h3>
              <p className="text-gray-700">Phone: +62 812-3456-7890<br />Email: info@bunta-irrigation.go.id</p>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="font-semibold text-black mb-2">Office Hours</h3>
            <p className="text-gray-700">Monday - Friday: 8:00 AM - 4:00 PM<br />Saturday: 8:00 AM - 12:00 PM</p>
          </div>
        </section>
      </div>
    </div>
  );
}