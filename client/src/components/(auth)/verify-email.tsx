'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { sendVerificationEmail } from '@/lib/auth-client';
import { toast } from 'sonner';
import { Loader } from 'lucide-react';

export default function VerifyEmail() {
    const searchParams = useSearchParams();
    const email = searchParams.get('email');
    const [loading, setLoading] = useState(false);
    const [resent, setResent] = useState(false);

    async function handleResend() {
        setLoading(true);

        try {
            const res = await sendVerificationEmail({
                email: email as string,
            });

            if (res.error) {
                toast.error(
                    res.error.message || 'Failed to send verification email.'
                );
            } else {
                setResent(true);
                toast.success('Verification email send.');
            }
        } catch (error) {
            toast.error(
                (error as Error).message || 'Failed to send verification email.'
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <Card className="max-w-md mx-auto text-center mt-10">
            <CardHeader>
                <CardTitle className="text-xl font-sans">
                    Verify Your Email
                </CardTitle>

                <CardDescription className="font-serif text-sm">
                    A verification link has been sent to{' '}
                    <span className="font-bold">{email}</span>. Please check
                    your inbox and click the link to verify your account.
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm">
                    Didn’t receive the email?
                </p>

                {!resent ? (
                    <Button onClick={handleResend} disabled={loading}>
                        {loading ? (
                            <Loader className="animate-spin" />
                        ) : (
                            'Resend Verification Email'
                        )}
                    </Button>
                ) : (
                    <p className="text-green-600 text-sm font-medium font-sans">
                        A new verification email has been sent!
                    </p>
                )}

                <p className="text-sm mt-6">
                    Already verified?
                    <Link href="/sign-in" className="underline">
                        Sign in here
                    </Link>
                </p>
            </CardContent>
        </Card>
    );
}
