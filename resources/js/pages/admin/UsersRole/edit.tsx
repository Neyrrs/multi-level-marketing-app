import AppLayout from '@/layouts/app-layout'
import { Head, useForm } from '@inertiajs/react'

export default function Edit({ user, roles }: any) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        password: '',
        role: user.roles.length ? user.roles[0].name : '',
    })

    const submit = (e: any) => {
        e.preventDefault()
        put(`/admin/UsersRole/${user.id}`)
    }

    return (
        <AppLayout>
            <Head title="Edit User" />

            <div className="max-w-xl rounded border p-4">
                <h1 className="mb-4 text-lg font-bold">Edit User</h1>

                <form onSubmit={submit} className="space-y-4">

                    {/* NAME */}
                    <div>
                        <label>Nama</label>
                        <input
                            className="w-full border p-2"
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                        />
                        {errors.name && <p className="text-red-500">{errors.name}</p>}
                    </div>

                    {/* EMAIL */}
                    <div>
                        <label>Email</label>
                        <input
                            className="w-full border p-2"
                            value={data.email}
                            onChange={e => setData('email', e.target.value)}
                        />
                        {errors.email && <p className="text-red-500">{errors.email}</p>}
                    </div>

                    {/* PASSWORD */}
                    <div>
                        <label>Password (kosongkan jika tidak diubah)</label>
                        <input
                            type="password"
                            className="w-full border p-2"
                            value={data.password}
                            onChange={e => setData('password', e.target.value)}
                        />
                        {errors.password && <p className="text-red-500">{errors.password}</p>}
                    </div>

                    {/* ROLE */}
                    <div>
                        <label>Role</label>
                        <select
                            className="w-full border p-2"
                            value={data.role}
                            onChange={e => setData('role', e.target.value)}
                        >
                            <option value="">-- pilih role --</option>
                            {roles.map((r: any) => (
                                <option key={r.id} value={r.name}>
                                    {r.name}
                                </option>
                            ))}
                        </select>
                        {errors.role && <p className="text-red-500">{errors.role}</p>}
                    </div>

                    <button
                        disabled={processing}
                        className="bg-blue-600 px-4 py-2 text-white"
                    >
                        Update
                    </button>

                </form>
            </div>
        </AppLayout>
    )
}
