import AppLayout from '@/layouts/app-layout'
import { Head, router } from '@inertiajs/react'
import { dashboard } from '@/routes'
import { type BreadcrumbItem } from '@/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Edit } from 'lucide-react'

interface Role {
    id: number
    name: string
    guard_name?: string
    created_at?: string
}

interface Props {
    role: Role
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin', href: '/admin/dashboard' },
    { title: 'Roles', href: dashboard().url },
    { title: 'Detail', href: '#' },
]

export default function Show({ role }: Props) {
    const handleBack = () => {
        router.get('/admin/UsersRole')
    }

    const handleEdit = () => {
        router.get(`/admin/UsersRole/${role.id}/edit`)
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Detail Role - ${role.name}`} />

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Detail Role</h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Informasi lengkap role: <span className="font-medium">{role.name}</span>
                        </p>
                    </div>

                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            onClick={handleBack}
                            aria-label="Kembali ke daftar roles"
                            className="gap-2"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Kembali
                        </Button>
                        <Button
                            onClick={handleEdit}
                            aria-label={`Edit role ${role.name}`}
                            className="gap-2"
                        >
                            <Edit className="h-4 w-4" />
                            Edit
                        </Button>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Informasi Role</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* Name */}
                        <div className="border-b pb-4">
                            <p className="text-xs text-muted-foreground font-medium">NAMA ROLE</p>
                            <p className="text-lg font-semibold">{role.name}</p>
                        </div>

                        {/* Guard Name */}
                        {role.guard_name && (
                            <div className="border-b pb-4">
                                <p className="text-xs text-muted-foreground font-medium">
                                    GUARD NAME
                                </p>
                                <Badge variant="secondary">{role.guard_name}</Badge>
                            </div>
                        )}

                        {/* Created At */}
                        {role.created_at && (
                            <div className="border-b pb-4">
                                <p className="text-xs text-muted-foreground font-medium">
                                    DIBUAT PADA
                                </p>
                                <p className="text-sm">
                                    {new Date(role.created_at).toLocaleString('id-ID')}
                                </p>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex gap-2 pt-4">
                            <Button
                                onClick={handleEdit}
                                aria-label={`Edit role ${role.name}`}
                            >
                                Edit Role
                            </Button>
                            <Button
                                variant="outline"
                                onClick={handleBack}
                                aria-label="Kembali ke daftar roles"
                            >
                                Kembali
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}
