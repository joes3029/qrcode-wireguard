import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document.getElementById('screenshot-container')?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document.getElementById('docs-card-content')?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <Head title="Welcome" />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                <img
                    id="background"
                    className="absolute bg-cover min-h-full max-h-full min-w-full"
                    src="/images/background.webp"
                />
                <div className="relative min-h-screen flex flex-col items-center justify-top selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <header className="grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-3">
                            <div className="flex lg:justify-center lg:col-start-2">
                                <img
                                    id='mikrotik'
                                    src="/images/Mikrotik.svg"
                                    className="max-w-64"
                                />
                                <img
                                    id='symphony'
                                    src="/images/Symphony%20PC%20-%20Satweb%20Logo50.png"
                                    className="max-h-64 mx-5"
                                />
                                <img
                                    id='wireguard'
                                    src="/images/wireguard.svg"
                                    className="max-w-64"
                                />
                            </div>
                            <nav className="-mx-3 flex flex-1 justify-end">
                                {auth.user ? (
                                    <Link
                                        href={route('mikrotik.index')}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white bg-slate-800/50"
                                    >
                                        Routers
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white bg-slate-800/50"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="rounded-md px-3 ms-4 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white bg-slate-800/50"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </header>

                        <main className="">
                            <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
                                <div className="relative flex items-center gap-6 lg:items-end">
                                    <div id="docs-card-content" className="flex items-start gap-6 lg:flex-col">
                                        <div className="bg-slate-800/[.8] p-6 rounded-md">
                                            <h2 className="text-xl font-semibold text-black dark:text-white">
                                                Wireguard QR Code Generator
                                            </h2>

                                            <p className="mt-4 text-md/relaxed text-black dark:text-zinc-200">
                                                Save your router public key and endpoint. Provide your client IP and
                                                private key. Scan your QR Code or copy the config.
                                                It's that easy.
                                            </p>
                                            <p className="mt-4 text-md/relaxed text-black dark:text-zinc-200">
                                                QR Code generation happens in the browser, so your private key is never sent to the server.
                                            </p>
                                            <div className="flex flex-1 justify-end">
                                                <Link
                                                    href={route('register')}
                                                    className="rounded-md px-3 ms-4 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white bg-zinc-200/50"
                                                >
                                                    Get started now
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </main>

                        <footer className="py-16 text-center text-md text-white dark:text-white/90">
                            <a href="https://symphonypc.com">Symphony PC</a>
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}
