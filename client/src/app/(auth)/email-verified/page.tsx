import EmailVerified from '@/components/(auth)/email-verified';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Email Verified | Personal Wallet',
};

export default function page() {
    return (
        <div className="py-20">
            <EmailVerified />
        </div>
    );
}
