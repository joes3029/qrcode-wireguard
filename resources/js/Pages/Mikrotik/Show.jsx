import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import Mikrotik from "@/Components/Mikrotik.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import { useForm, Head } from '@inertiajs/react';
import Dropdown from "@/Components/Dropdown.jsx";
import QRCode from "react-qr-code";

export default function Show({ auth, mikrotik }) {
    const { data, setData, post, processing, reset, errors } =      useForm({
        clientIp: '',
        clientPrivateKey: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('mikrotik.store'), { onSuccess: () => reset() });
    };

    const wireguardConfig = `
[Interface]
PrivateKey = ${data.clientPrivateKey}
Address = ${data.clientIp}
DNS = 192.168.100.1

[Peer]
PublicKey = ${mikrotik.publicKey}
Endpoint = ${mikrotik.router}
AllowedIPs = 0.0.0.0/0, ::/0
PersistentKeepalive = 25
`

    return (
        <AuthenticatedLayout user={auth}>
            <Head title={`Mikrotik Router - ${mikrotik.router}`} />

            <div className="p-6 bg-white rounded shadow m-20 border-2 border-slate-800">
                <div className="mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Router: {mikrotik.router}
                    </h2>
                    <p className="text-gray-600">Endpoint: {mikrotik.endpoint}</p>
                    <p className="text-gray-600">Public Key: {mikrotik.publicKey}</p>
                    <small className="text-gray-500">
                        Created At: {new Date(mikrotik.created_at).toLocaleString()}
                    </small>
                </div>

                <form onSubmit={submit}>
                    <div className="mb-4">
                        <label htmlFor="clientIp" className="block text-sm font-medium text-gray-700">
                            Client IP Address
                        </label>
                        <input
                            type="text"
                            id="clientIp"
                            value={data.clientIp}
                            placeholder="192.168.100.X/32"
                            onChange={e => setData('clientIp', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                        {errors.clientIp && <InputError message={errors.clientIp} />}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="clientPrivateKey" className="block text-sm font-medium text-gray-700">
                            Client Private Key
                        </label>
                        <input
                            type="text"
                            id="clientPrivateKey"
                            value={data.clientPrivateKey}
                            onChange={e => setData('clientPrivateKey', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                        {errors.clientPrivateKey && <InputError message={errors.clientPrivateKey} />}
                    </div>
                </form>

                {data.clientIp && data.clientPrivateKey && (
                    <div className="mt-6">
                        <div className="flex justify-center">
                            <div className="pb-10">
                                <h3 className="text-lg font-semibold text-gray-800">Wireguard Config:</h3>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <div className="mt-4">
                                <QRCode value={wireguardConfig}/>
                            </div>
                            <pre className="p- bg-gray-100 rounded ms-20 overflow-x-auto">
                                {wireguardConfig}
                            </pre>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}

