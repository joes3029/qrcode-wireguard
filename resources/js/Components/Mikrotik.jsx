import React, { useState } from "react";
import Dropdown from '@/Components/Dropdown.jsx';
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import { useForm, usePage } from '@inertiajs/react';

export default function Mikrotik({ mikrotik }) {
    const { auth } = usePage().props;
    const [editing, setEditing] = useState(false);
    const { data, setData, patch, clearErrors, reset, errors } = useForm({
        router: mikrotik.router,
        publicKey: mikrotik.publicKey,
    });
    const submit = (e) => {
        e.preventDefault();
        patch(route('mikrotik.update', mikrotik.id), { onSuccess: () => setEditing(false )});
    };

    return (
        <div className="p-6 flex space-x-2">
            <div className="flex-1">
                <div className="flex justify-between items-center">
                    <div className="">
                        <a href={'/mikrotik/'+mikrotik.id}>
                        <span className="text-gray-800">{mikrotik.user.name}</span>
                            <small
                                className="ml-2 text-sm text-gray-600">{new Date(mikrotik.created_at).toLocaleString()}</small>
                        </a>
                    </div>
                    {mikrotik.user.id === auth.user.id &&
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400"
                                         viewBox="0 0 20 20" fill="currentColor">
                                        <path
                                            d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"/>
                                    </svg>
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                <button
                                    className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 transition duration-150 ease-in-out"
                                    onClick={() => setEditing(true)}>
                                    Edit
                                </button>
                                <Dropdown.Link as="button" href={route('mikrotik.destroy', mikrotik.id)} method="delete">
                                    Delete
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    }
                </div>

                {editing
                    ? (<form onSubmit={submit}>
                        <input
                            type='text'
                            id={'router_'+mikrotik.id}
                            value={data.router}
                            className="mt-4 w-full text-gray-900 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                            onChange={e => setData('router', e.target.value)}
                        />
                        <InputError message={errors.router} className="mt-2"/>
                        <input
                            type='text'
                            id={'publicKey_'+mikrotik.id}
                            value={data.publicKey}
                            className="mt-4 w-full text-gray-900 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                            onChange={e => setData('publicKey', e.target.value)}
                        />
                        <InputError message={errors.publicKey} className="mt-2"/>
                        <PrimaryButton className="mt-4">Update</PrimaryButton>
                    </form>)
                    : (
                        <a href={'/mikrotik/' + mikrotik.id}>
                            <p className="mt-8 text-lg large-gray-900">{mikrotik.router}</p>
                            <p className="mt-4 text-lg large-gray-900">{mikrotik.publicKey}</p>
                        </a>
                    )}
            </div>
</div>
)
    ;
}
