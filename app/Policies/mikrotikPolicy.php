<?php

namespace App\Policies;

use App\Models\Mikrotik;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class mikrotikPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        //
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Mikrotik $mikrotik): bool
    {
        //
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        //
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Mikrotik $mikrotik): bool
    {
        return $mikrotik->user()->is($user);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Mikrotik $mikrotik): bool
    {
        return $this->update($user, $mikrotik);
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Mikrotik $mikrotik): bool
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Mikrotik $mikrotik): bool
    {
        //
    }
}
