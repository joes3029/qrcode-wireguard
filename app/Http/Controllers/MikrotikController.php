<?php

namespace App\Http\Controllers;

use App\Models\Mikrotik;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class MikrotikController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $user = Auth::user();
        return Inertia::render('Mikrotik/Index', [
            'mikrotik' => Mikrotik::where('user_id', $user->id)->with('user:id,name')->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'router' => 'required|string|max:255',
            'publicKey' => 'required|string|max:255',
        ]);

        $request->user()->mikrotik()->create($validated);

        return redirect(route('mikrotik.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Mikrotik $mikrotik): Response
    {
        $user = Auth::user();
        if ($mikrotik->user_id !== $user->id) {
            abort(403, 'Unauthorised');
        }
        return Inertia::render('Mikrotik/Show', [
            'mikrotik' => $mikrotik,
        ]);
        //view('mikrotik.show', compact('mikrotik'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Mikrotik $mikrotik)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Mikrotik $mikrotik): RedirectResponse
    {
        Gate::authorize('update', $mikrotik);
        $validated = $request->validate([
            'router' => 'required|string|max:255',
            'publicKey' => 'required|string|max:255',
        ]);
        $mikrotik->update($validated);
        return redirect(route('mikrotik.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Mikrotik $mikrotik): RedirectResponse
    {
        Gate::authorize('delete', $mikrotik);
        $mikrotik->delete();
        return redirect(route('mikrotik.index'));
    }
}
