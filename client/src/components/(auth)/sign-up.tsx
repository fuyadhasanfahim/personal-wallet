'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { Loader } from 'lucide-react';
import { toast } from 'sonner';
import { signUp } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

const signupFormSchema = z.object({
    name: z.string().min(1, 'Name is required.'),
    email: z.email('Please enter a valid email.'),
    password: z.string().min(6, 'Password must be at least 6 characters long.'),
});

export function SignupForm({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        resolver: zodResolver(signupFormSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
    });

    const [showPass, setShowPass] = useState(false);
    const router = useRouter();

    const onSubmit = async (data: z.infer<typeof signupFormSchema>) => {
        try {
            const res = await signUp.email({
                ...data,
                callbackURL: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/email-verified`,
            });

            if (res.data) {
                router.push(
                    `/verify-email?email=${encodeURIComponent(data.email)}`
                );
                toast.success('Account created successfully!');
                reset();
            } else {
                toast.error(res.error.message || 'Failed to sign up.');
            }
        } catch (error) {
            console.error('Sign up error:', error);
            toast.error(
                (error as Error).message || 'Failed to create account.'
            );
        }
    };

    return (
        <div className={cn('flex flex-col gap-6', className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl font-sans">
                        Create your account
                    </CardTitle>
                    <CardDescription>
                        Fill out your information to create a new account
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="John Doe"
                                    className="font-mono"
                                    {...register('name')}
                                />
                                {errors.name && (
                                    <p className="text-sm text-red-500">
                                        {String(errors.name.message)}
                                    </p>
                                )}
                            </div>

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
                                <Label htmlFor="password">Password</Label>

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
                                        variant="link"
                                        size="sm"
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
                                        'Sign Up'
                                    )}
                                </Button>

                                <p className="text-center text-sm text-muted-foreground">
                                    Already have an account?{' '}
                                    <Link href="/sign-in" className="underline">
                                        Sign in
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
