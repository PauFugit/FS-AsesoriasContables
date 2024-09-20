export default function ClientDashboard() {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Client Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Project Status</h2>
            <p>View the status of your ongoing projects.</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Support Tickets</h2>
            <p>Manage your support tickets and requests.</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Billing Information</h2>
            <p>Access your billing details and invoices.</p>
          </div>
        </div>
      </div>
    )
  }