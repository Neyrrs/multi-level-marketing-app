import { z } from 'zod';

export const registerSchema = z.object({
    nama_lengkap: z
        .string()
        .min(6, 'Nama lengkap minimal 6 karakter')
        .regex(/^[A-Za-z\s]+$/, 'Hanya huruf dan spasi yang diperbolehkan'),

    username: z
        .string()
        .min(4, 'Username minimal 4 karakter')
        .regex(/^[a-z0-9_]+$/, 'Gunakan huruf kecil, angka, atau underscore'),

    email: z.string().email('Format email tidak valid'),

    password: z
        .string()
        .min(8, 'Password minimal 8 karakter')
        .regex(
            /^(?=.*[A-Za-z])(?=.*\d)\S+$/,
            'Password harus mengandung huruf dan angka',
        ),

    jenis_kelamin: z.string().min(1, 'Jenis kelamin wajib dipilih'),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
