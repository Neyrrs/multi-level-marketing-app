import { z } from 'zod';

export const editProfileSchema = z.object({
    name: z
        .string()
        .min(6, 'Nama lengkap minimal 6 karakter')
        .regex(/^[A-Za-z\s]+$/, 'Hanya huruf dan spasi yang diperbolehkan'),


    phone: z
        .string()
        .min(10, 'Nomor telepon minimal 10 digit')
        .regex(/^\d+$/, 'Nomor telepon hanya boleh angka'),

    alamat: z
        .string()
        .min(20, 'Alamat minimal 20 karakter')
        .regex(/^[A-Za-z\s]/, 'Gunakan huruf kecil, angka, atau underscore'),

    email: z.string().email('Format email tidak valid'),
});

export type EditProfileSchema = z.infer<typeof editProfileSchema>;
