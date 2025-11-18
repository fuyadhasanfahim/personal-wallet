import VerifyEmail from '@/components/(auth)/verify-email';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Verify Email| Personal Wallet',
};

export default function page() {
    return (
        <div className="py-20">
            <VerifyEmail />
        </div>
    );
}
