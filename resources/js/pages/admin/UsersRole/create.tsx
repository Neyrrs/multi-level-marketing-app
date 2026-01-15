import AppLayout from '@/layouts/app-layout'
import { Head, useForm } from '@inertiajs/react'

export default function Create({ roles }: any) {
    const { data, setData, post, errors } = useForm({
        name: '',
        email: '',
        password: '',
        role: '',
    })

    const submit = (e: any) => {
        e.preventDefault()
        post('/admin/UsersRole')
    }

    return (
        <AppLayout>
            <Head title="Tambah User" />

            <form onSubmit={submit} className="max-w-xl space-y-4 rounded border p-4">
                <input placeholder="Nama" onChange={e => setData('name', e.target.value)} className="w-full border p-2" />
                <input placeholder="Email" onChange={e => setData('email', e.target.value)} className="w-full border p-2" />
                <input type="password" placeholder="Password" onChange={e => setData('password', e.target.value)} className="w-full border p-2" />

                <select onChange={e => setData('role', e.target.value)} className="w-full border p-2">
                    <option value="">Pilih Role</option>
                    {roles.map((r: any) => (
                        <option key={r.id} value={r.name}>{r.name}</option>
                    ))}
                </select>

                <button className="bg-blue-600 px-4 py-2 text-white">
                    Simpan
                </button>
            </form>
        </AppLayout>
    )
}
