'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { toast } from 'sonner';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { Loader } from 'lucide-react';
import { signIn } from '@/lib/auth-client';

const signinFormSchema = z.object({
    email: z.email('Please enter a valid email.'),
    password: z.string().min(1, 'Password is required.'),
});

export function SigninForm({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(signinFormSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const [showPass, setShowPass] = useState(false);

    const onSubmit = async (data: z.infer<typeof signinFormSchema>) => {
        try {
            const res = await signIn.email(data);

            if (res.data) {
                toast.success('Sign in successfully.');
            } else {
                toast.error(res.error.message || 'Failed to sign in.');
            }
        } catch (error) {
            console.error('Sign in error:', error);
            toast.error((error as Error).message || 'Failed to sign in.');
        }
    };

    return (
        <div className={cn('flex flex-col gap-6', className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl font-sans">
                        Sign in to your account
                    </CardTitle>
                    <CardDescription>
                        Enter your email below to sign in to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    className="font-mono"
                                    {...register('email')}
                                />
                                {errors.email && (
                                    <p className="text-sm text-red-500">
                                        {String(errors.email.message)}
                                    </p>
                                )}
                            </div>

                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <Link
                                        href="/forget-password"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </Link>
                                </div>

                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPass ? 'text' : 'password'}
                                        placeholder="********"
                                        className="font-mono"
                                        {...register('password')}
                                    />

                                    <Button
                                        type="button"
                                        variant={'link'}
                                        size={'sm'}
                                        className="absolute right-0 top-0.5 font-serif"
                                        onClick={() => setShowPass(!showPass)}
                                    >
                                        {showPass ? 'Hide' : 'Show'}
                                    </Button>
                                </div>

                                {errors.password && (
                                    <p className="text-sm text-red-500">
                                        {String(errors.password.message)}
                                    </p>
                                )}
                            </div>

                            <div className="grid gap-3 mt-2">
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <Loader className="animate-spin" />
                                    ) : (
                                        'Sign In'
                                    )}
                                </Button>

                                <p className="text-center text-sm text-muted-foreground">
                                    Don’t have an account?{' '}
                                    <Link href="/sign-up" className="underline">
                                        Sign up
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
