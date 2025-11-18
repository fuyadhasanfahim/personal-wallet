import { SignupForm } from '@/components/(auth)/sign-up';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Sign Up | Oallet',
};

export default function SigninPage() {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <SignupForm />
            </div>
        </div>
    );
}
