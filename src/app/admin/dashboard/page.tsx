'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  // Mock data for demonstration
  const stats = {
    totalVisitors: 1250,
    newsArticles: 45,
    pendingMessages: 3,
    activeUsers: 12
  };

  const recentActivity = [
    {
      type: 'content',
      icon: '📰',
      title: 'New article published',
      time: '2 minutes ago',
      colorClass: 'bg-green-100 text-green-800 border-green-200'
    },
    {
      type: 'security',
      icon: '👤',
      title: 'User login',
      time: '15 minutes ago',
      colorClass: 'bg-blue-100 text-blue-800 border-blue-200'
    },
    {
      type: 'data',
      icon: '📊',
      title: 'Data import completed',
      time: '1 hour ago',
      colorClass: 'bg-purple-100 text-purple-800 border-purple-200'
    }
  ];
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to the Bunta Bella Irrigation System administration panel</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <span className="text-2xl">👥</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">{stats.totalVisitors.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Visitors</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
              <span className="text-2xl">📰</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{stats.newsArticles}</div>
              <div className="text-sm text-gray-600">News Articles</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
              <span className="text-2xl">✉️</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">{stats.pendingMessages}</div>
              <div className="text-sm text-gray-600">Pending Messages</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
              <span className="text-2xl">👤</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">{stats.activeUsers}</div>
              <div className="text-sm text-gray-600">Active Users</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white">📝</span>
                </div>
                <div className="text-left">
                  <div className="font-medium text-blue-800">Create News</div>
                  <div className="text-sm text-blue-600">Publish new article</div>
                </div>
              </button>

              <button className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white">💧</span>
                </div>
                <div className="text-left">
                  <div className="font-medium text-green-800">Input Data</div>
                  <div className="text-sm text-green-600">Water level data</div>
                </div>
              </button>

              <button className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white">📊</span>
                </div>
                <div className="text-left">
                  <div className="font-medium text-purple-800">View Stats</div>
                  <div className="text-sm text-purple-600">Analytics dashboard</div>
                </div>
              </button>

              <button className="flex items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white">⚙️</span>
                </div>
                <div className="text-left">
                  <div className="font-medium text-orange-800">Settings</div>
                  <div className="text-sm text-orange-600">System configuration</div>
                </div>
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => {
                // Determine icon background and text color based on activity type
                let iconBgClass = 'bg-gray-100';
                let iconTextClass = 'text-gray-600';
                
                if (activity.type === 'content') {
                  iconBgClass = 'bg-green-100';
                  iconTextClass = 'text-green-600';
                } else if (activity.type === 'security') {
                  iconBgClass = 'bg-blue-100';
                  iconTextClass = 'text-blue-600';
                } else if (activity.type === 'data') {
                  iconBgClass = 'bg-purple-100';
                  iconTextClass = 'text-purple-600';
                }

                return (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className={`w-8 h-8 ${iconBgClass} rounded-full flex items-center justify-center mr-3`}>
                        <span className={`${iconTextClass} text-sm`}>{activity.icon}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{activity.title}</p>
                        <p className="text-sm text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                    <span className={`${activity.colorClass} text-xs px-2 py-1 rounded-full capitalize`}>
                      {activity.type}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">System Status</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">API Server</span>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Online</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Database</span>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Connected</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Storage</span>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">2.3GB/10GB</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Last Backup</span>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Today 08:00</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Quick Links</h2>
            <div className="space-y-2">
              <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                View Public Website
              </button>
              <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                Documentation
              </button>
              <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                Support Center
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}