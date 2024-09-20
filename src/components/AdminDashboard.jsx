export default function AdminDashboard() {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">User Management</h2>
            <p>Manage all users and their roles.</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">System Settings</h2>
            <p>Configure global system settings.</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Analytics</h2>
            <p>View system-wide analytics and reports.</p>
          </div>
        </div>
      </div>
    )
  }