import { Button } from '@/components/ui/button';
import { useAppearance } from '@/hooks/use-appearance';
import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Moon, Sun } from 'lucide-react';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage<SharedData>().props;
    const { updateAppearance, appearance } = useAppearance();

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
                {appearance == 'dark' ? (
                    <Button onClick={() => updateAppearance('light')}><Sun/></Button>
                ) : (
                    <Button onClick={() => updateAppearance('dark')}><Moon /></Button>
                )}
        </>
    );
}
