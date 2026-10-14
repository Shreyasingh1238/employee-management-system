
function EmployeeTable({
  employees,
  loading,
  onEdit,
  onDelete,
  page,
  pageSize,
  totalEmployees,
  onPageChange,
}) {
  const totalPages = Math.max(1, Math.ceil(totalEmployees / pageSize));

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 px-6 py-6 sm:px-8">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            Employee directory
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Manage and review your team members.
          </p>
        </div>

        <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
          {totalEmployees} {totalEmployees === 1 ? "employee" : "employees"}
        </span>
      </div>

      {loading ? (
        <div className="flex min-h-56 items-center justify-center gap-3 text-sm text-slate-500">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
          Loading employees...
        </div>
      ) : employees.length === 0 ? (
        <div className="px-6 py-16 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
            👥
          </div>
          <h3 className="font-bold text-slate-800">No employees found</h3>
          <p className="mt-2 text-sm text-slate-500">
            Try another search or add a new employee.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-6 py-4 font-bold">Employee</th>
                <th className="px-6 py-4 font-bold">Email address</th>
                <th className="px-6 py-4 font-bold">Job role</th>
                <th className="px-6 py-4 text-right font-bold">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {employees.map((employee) => (
                <tr
                  key={employee.id}
                  className="transition hover:bg-slate-50/80"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 font-bold text-blue-700">
                        {employee.name?.trim().charAt(0).toUpperCase() || "?"}
                      </div>

                      <div>
                        <p className="font-bold text-slate-800">
                          {employee.name}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          ID #{employee.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-slate-600">
                    {employee.email}
                  </td>

                  <td className="px-6 py-4">
                    <span className="inline-flex rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700">
                      {employee.role}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => onEdit(employee)}
                        className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                        aria-label={`Edit ${employee.name}`}
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => onDelete(employee)}
                        className="rounded-lg border border-red-100 px-3 py-2 text-xs font-bold text-red-600 transition hover:bg-red-50"
                        aria-label={`Delete ${employee.name}`}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && totalEmployees > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 px-6 py-4 sm:px-8">
          <p className="text-xs text-slate-500">
            Page {page} of {totalPages}
          </p>

          <div className="flex gap-2">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => onPageChange(page - 1)}
              className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40"
            >
              Previous
            </button>
            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => onPageChange(page + 1)}
              className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default EmployeeTable;
