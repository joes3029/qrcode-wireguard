import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, Link } from '@inertiajs/react';
import NavLink from "@/Components/NavLink.jsx";

export default function Dashboard() {
    const {auth, routers = [] } = usePage().props;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">Manage your routers from here</div>
                        {routers.length? (
                            <>
                            <ul className='divide-y'>
                                {routers.map(router => (
                                    <li key={router.id} className='py-2 flex justify-between items-center'>
                                        <Link href={route('mikrotik.show', router.id)} className='text-indigo-600 hover:underline'>
                                            {router.router}
                                        </Link>
                                        <span className='text-sm text-gray-500'>{router.publicKey}</span>
                                    </li>
                                ))}
                            </ul>
                            <Link
                                href={route('mikrotik.index')}
                                className='inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition'
                            >
                                View routers
                            </Link>
                            </>
                        ) : (
                            <p className="text-gray-600 px-2">No routers yet: <Link
                                    href={route('mikrotik.index')}
                                    className="inline-block px-4 ms-2 mb-2 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">Add one</Link>
                            </p>
                        )}


                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
