import { z } from 'zod';

export const editProfileSchema = z.object({
    nama_lengkap: z
        .string()
        .min(6, 'Nama lengkap minimal 6 karakter')
        .regex(/^[A-Za-z\s]+$/, 'Hanya huruf dan spasi yang diperbolehkan'),

    rekening: z.string().min(1, 'Nama lengkap minimal 1 karakter'),

    nomor_telepon: z
        .string()
        .min(10, 'Nomor telepon minimal 10 digit')
        .regex(/^\d+$/, 'Nomor telepon hanya boleh angka'),

    nomor_rekening: z
        .string()
        .min(10, 'Nomor rekening minimal 10 digit')
        .regex(/^\d+$/, 'Nomor rekening hanya boleh angka'),

    foto_profil: z.string(),

    username: z
        .string()
        .min(4, 'Username minimal 4 karakter')
        .regex(/^[a-z0-9_]+$/, 'Gunakan huruf kecil, angka, atau underscore'),

    alamat: z
        .string()
        .min(20, 'Alamat minimal 20 karakter')
        .regex(/^[A-Za-z\s]/, 'Gunakan huruf kecil, angka, atau underscore'),

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

export type EditProfileSchema = z.infer<typeof editProfileSchema>;
