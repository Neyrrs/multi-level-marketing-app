import AppLayout from '@/layouts/app-layout'
import { Head, Link, router } from '@inertiajs/react'
import { dashboard } from '@/routes'
import { type BreadcrumbItem } from '@/types'

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Users', href: dashboard().url },
]

export default function Index({ users }: any) {
    const handleDelete = (id: number) => {
        if (confirm('Yakin mau hapus user ini?')) {
            router.delete(`/admin/UsersRole/${id}`)
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />

            <div className="rounded-xl border p-4">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-lg font-semibold">Users</h1>

                    <Link
                        href="/admin/UsersRole/create"
                        className="rounded-md bg-primary px-4 py-2 text-sm text-white"
                    >
                        + Tambah User
                    </Link>
                </div>

                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b text-left">
                            <th className="py-2">#</th>
                            <th>Nama</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user: any, i: number) => (
                            <tr key={user.id} className="border-b">
                                <td className="py-2">{i + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>

                                <td>
                                    {user.roles.length
                                        ? user.roles.map((role: any) => (
                                              <span
                                                  key={role.id}
                                                  className="mr-1 rounded bg-gray-200 px-2 py-1 text-xs"
                                              >
                                                  {role.name}
                                              </span>
                                          ))
                                        : '-'}
                                </td>

                                <td className="space-x-3">
                                    <Link
                                        href={`/admin/UsersRole/${user.id}/edit`}
                                        className="text-yellow-600"
                                    >
                                        Edit
                                    </Link>

                                    <button
                                        onClick={() => handleDelete(user.id)}
                                        className="text-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AppLayout>
    )
}
