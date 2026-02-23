import AppLayout from '@/layouts/app-layout'
import { Head, router } from '@inertiajs/react'
import { dashboard } from '@/routes'
import { type BreadcrumbItem } from '@/types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Edit, Trash2, PlusCircle } from 'lucide-react'

interface User {
    id: number
    name: string
    email: string
    roles: Array<{ id: number; name: string }>
}

interface Props {
    users: User[]
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin', href: '/admin/dashboard' },
    { title: 'Users', href: dashboard().url },
]

export default function Index({ users = [] }: Props) {
    const handleDelete = (id: number) => {
        if (confirm('Yakin mau hapus user ini?')) {
            router.delete(`/admin/UsersRole/${id}`)
        }
    }

    const handleCreate = () => {
        router.get('/admin/UsersRole/create')
    }

    const handleEdit = (id: number) => {
        router.get(`/admin/UsersRole/${id}/edit`)
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manajemen Users" />

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Manajemen Users</h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Total users: {users.length}
                        </p>
                    </div>

                    <Button
                        onClick={handleCreate}
                        aria-label="Tambah user baru"
                        className="gap-2"
                    >
                        <PlusCircle className="h-4 w-4" />
                        Tambah User
                    </Button>
                </div>

                <div className="border rounded-lg overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-12">No</TableHead>
                                <TableHead>Nama</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead className="w-32 text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.length > 0 ? (
                                users.map((user, index) => (
                                    <TableRow key={user.id}>
                                        <TableCell className="font-medium">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell className="text-sm text-muted-foreground">
                                            {user.email}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-wrap gap-1">
                                                {user.roles && user.roles.length > 0 ? (
                                                    user.roles.map((role) => (
                                                        <Badge
                                                            key={role.id}
                                                            variant="secondary"
                                                            className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                                        >
                                                            {role.name}
                                                        </Badge>
                                                    ))
                                                ) : (
                                                    <span className="text-sm text-muted-foreground">
                                                        -
                                                    </span>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center justify-end gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleEdit(user.id)}
                                                    aria-label={`Edit user ${user.name}`}
                                                    title={`Edit ${user.name}`}
                                                >
                                                    <Edit className="h-4 w-4" />
                                                    <span className="sr-only">Edit</span>
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleDelete(user.id)}
                                                    aria-label={`Hapus user ${user.name}`}
                                                    title={`Hapus ${user.name}`}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                    <span className="sr-only">Hapus</span>
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-8">
                                        <div className="flex flex-col items-center justify-center gap-2">
                                            <p className="text-muted-foreground">
                                                Tidak ada users
                                            </p>
                                            <Button
                                                onClick={handleCreate}
                                                variant="outline"
                                                size="sm"
                                                aria-label="Tambah user baru"
                                            >
                                                Tambah User Pertama
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    )
}
