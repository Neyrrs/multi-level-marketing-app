import AppLayout from '@/layouts/app-layout'
import { Head, router, useForm } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'
import { type BreadcrumbItem } from '@/types'

interface Role {
    id: number
    name: string
}

interface Props {
    roles: Role[]
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin', href: '/admin/dashboard' },
    { title: 'Users', href: '/admin/UsersRole' },
    { title: 'Tambah', href: '#' },
]

export default function Create({ roles = [] }: Props) {
    const { data, setData, post, errors, processing } = useForm({
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        role: '',
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        post('/admin/UsersRole', {
            onSuccess: () => {
                router.visit('/admin/UsersRole')
            },
        })
    }

    const handleBack = () => {
        router.get('/admin/UsersRole')
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah User" />

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Tambah User Baru</h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Isi form di bawah untuk menambah user baru
                        </p>
                    </div>

                    <Button
                        variant="outline"
                        onClick={handleBack}
                        aria-label="Kembali ke daftar users"
                        className="gap-2"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Kembali
                    </Button>
                </div>

                <Card className="max-w-2xl">
                    <CardHeader>
                        <CardTitle>Informasi User</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* NAME FIELD */}
                            <div className="space-y-2">
                                <Label htmlFor="name">Nama Lengkap</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Masukkan nama lengkap"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    aria-label="Nama lengkap user"
                                    aria-invalid={!!errors.name}
                                    aria-describedby={errors.name ? 'name-error' : undefined}
                                    required
                                />
                                {errors.name && (
                                    <p id="name-error" className="text-sm text-red-500">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            {/* EMAIL FIELD */}
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Masukkan email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    aria-label="Email user"
                                    aria-invalid={!!errors.email}
                                    aria-describedby={errors.email ? 'email-error' : undefined}
                                    required
                                />
                                {errors.email && (
                                    <p id="email-error" className="text-sm text-red-500">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* PASSWORD FIELD */}
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Masukkan password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    aria-label="Password user"
                                    aria-invalid={!!errors.password}
                                    aria-describedby={
                                        errors.password ? 'password-error' : undefined
                                    }
                                    required
                                />
                                {errors.password && (
                                    <p id="password-error" className="text-sm text-red-500">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            {/* PHONE FIELD */}
                            <div className="space-y-2">
                                <Label htmlFor="phone">No. Telepon</Label>
                                <Input
                                    id="phone"
                                    type="text"
                                    placeholder="Masukkan no. telepon"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    aria-label="No telepon user"
                                    aria-invalid={!!errors.phone}
                                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                                />
                                {errors.phone && (
                                    <p id="phone-error" className="text-sm text-red-500">
                                        {errors.phone}
                                    </p>
                                )}
                            </div>

                            {/* ADDRESS FIELD */}
                            <div className="space-y-2">
                                <Label htmlFor="address">Alamat</Label>
                                <textarea
                                    id="address"
                                    placeholder="Masukkan alamat lengkap"
                                    value={data.address}
                                    onChange={(e) => setData('address', e.target.value)}
                                    className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs"
                                />
                                {errors.address && (
                                    <p className="text-sm text-red-500">{errors.address}</p>
                                )}
                            </div>

                            {/* ROLE FIELD */}
                            <div className="space-y-2">
                                <Label htmlFor="role">Role</Label>
                                <Select value={data.role} onValueChange={(value) => setData('role', value)}>
                                    <SelectTrigger
                                        id="role"
                                        aria-label="Pilih role user"
                                        aria-invalid={!!errors.role}
                                        aria-describedby={errors.role ? 'role-error' : undefined}
                                    >
                                        <SelectValue placeholder="Pilih role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {roles.map((role) => (
                                            <SelectItem key={role.id} value={role.name}>
                                                {role.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.role && (
                                    <p id="role-error" className="text-sm text-red-500">
                                        {errors.role}
                                    </p>
                                )}
                            </div>

                            {/* ACTION BUTTONS */}
                            <div className="flex gap-3 pt-4">
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    aria-label="Simpan user baru"
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan'}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleBack}
                                    aria-label="Batal dan kembali ke daftar users"
                                >
                                    Batal
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}
