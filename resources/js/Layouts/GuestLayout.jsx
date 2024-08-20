import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div id='background' className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-cover" style={{ backgroundImage: 'url(/images/background.webp)' }}>
            <div>
                <Link href="/">
                    <ApplicationLogo className="w-60 h-60 fill-current text-gray-500" />
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                    {children}
            </div>
        </div>
);
}
