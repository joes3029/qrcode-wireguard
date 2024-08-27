import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import Mikrotik from "@/Components/Mikrotik.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import { useForm, Head } from '@inertiajs/react';

export default function Index({ auth, mikrotik }) {
    const { data, setData, post, processing, reset, errors } =      useForm({
        router: '',
        publicKey: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('mikrotik.store'), { onSuccess: () => reset() });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title='Mikrotik' />

            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 bg-white shadow-sm rounded-lg">
                <form onSubmit={submit}>
                    <input
                        type='text'
                        id="router"
                        value={data.router}
                        placeholder="Router Address"
                        className="block w-full space-y-2 border-gray-300 mb-2 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={e => setData('router', e.target.value)}
                    />
                    <InputError message={errors.router} className="mt-2"/>
                    <input
                        type='text'
                        id="publicKey"
                        value={data.publicKey}
                        placeholder="Public Key"
                        className="block w-full space-y-2 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={e => setData('publicKey', e.target.value)}
                    />
                    <InputError message={errors.publicKey} className="mt-2"/>
                    <PrimaryButton className="mt-4" disabled={processing}>Update</PrimaryButton>
                </form>

                <div className="rounded-lg divide-y border-2 border-slate-800 ">
                    {mikrotik.map(mikrotik =>
                        <div className="border-1 border-slate-800 ">
                            <Mikrotik key={mikrotik.id} mikrotik={mikrotik} />
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

