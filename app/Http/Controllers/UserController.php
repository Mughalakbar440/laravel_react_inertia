<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = User::query();
        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        $projects = $query->paginate(10)->onEachSide(1);
        return inertia("User/Index", [
            "users" => UserResource::collection($projects),
            "querParams" => request()->query() ?: null,
            'success'=>session('success'),
        ]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("User/create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        $data['email_verified_at'] = time();
        User::create($data);
        return to_route('user.index')->with('success','User Add Successfully');

    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return inertia('User/Edit', [
            'user'=> new UserResource($user),
        ]);
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {   
        $data = $request->validated();
        $password = $data['password'];
            if(!$password){
                unset($data['password']);
            }
         $user->update($data);
        return to_route('user.index')->with('success','Data successfully updated');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $name = $user->name;
        $user->delete();
        return to_route('user.index')->with('success',$name.' is deleted successfully');
    }
}
