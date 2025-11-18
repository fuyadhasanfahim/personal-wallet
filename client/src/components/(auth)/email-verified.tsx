'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/auth-client';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

export default function EmailVerified() {
    const router = useRouter();
    const { data: session, isPending } = useSession();
    console.log(useSession())

    useEffect(() => {
        if (!isPending && session) {
            router.push('/dashboard');
        }
    }, [session, isPending, router]);

    return (
        <Card className="max-w-md mx-auto text-center mt-20">
            <CardHeader>
                <CardTitle className="text-xl font-sans">
                    Email Verified Successfully
                </CardTitle>
                <CardDescription className="font-serif">
                    Completing sign...
                </CardDescription>
            </CardHeader>

            <CardContent>
                If you are not redirected automatically,{' '}
                <Link href={'/dashboard'} className="underline">
                    click here
                </Link>
            </CardContent>
        </Card>
    );
}
