<?php

namespace Tests\Feature;

use Tests\TestCase;

class UserCanCreateRouterTest extends TestCase
{
    public function test_user_can_create_router()
    {
        $user = User::factory()->create();
        $this->actingAs($user)
            ->post(route('mikrotik.store'), ['router' => 'R1'])
            ->assertRedirect()
            ->assertSessionHasNoErrors();
    }

}
