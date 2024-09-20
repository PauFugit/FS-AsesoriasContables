export default function TeamDashboard() {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Team Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Task Management</h2>
            <p>View and manage your assigned tasks.</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Team Calendar</h2>
            <p>Access the team's shared calendar.</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Project Updates</h2>
            <p>Get the latest updates on ongoing projects.</p>
          </div>
        </div>
      </div>
    )
  }