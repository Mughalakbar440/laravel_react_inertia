<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Http\Resources\UserResource;
use App\Models\Project;
use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth; 
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Task::query();
        $sortField = request("sort_field","created_at");
        $sortDirection = request("sort_direction","desc");

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        if (request("status")) {
            $query->where("status", "=", request("status"));
        }
        $Tasks = $query->orderBy($sortField,$sortDirection)->paginate(10)->onEachSide(1);
        return Inertia::render("Task/Index", [
            "Tasks" => TaskResource::collection($Tasks),
            "querParams" => request()->query() ?: null,
            "success"=>session("success"),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $projects = Project::query()->orderBy('name')->get();
        $user = User::query()->orderBy('name')->get();
        return inertia("Task/create",[
            "projects"=>ProjectResource::collection($projects),
            "users"=>UserResource::collection($user),
        ]);
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('image_path')) {
            $file = $request->file('image_path');
          
            $filePath = $file->store('images/tasks', 'public');
            $data['image_path'] = $filePath;  

        }

        $data['created_by'] = Auth::user()->id;
        $data['updated_by'] = Auth::user()->id;

        Task::create($data);

        return to_route('task.index')->with('success','Task was Created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {   
        return inertia("Task/Show", [
            'task'=>new TaskResource($task),
            ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        $projects = Project::query()->orderBy('name')->get();
        $user = User::query()->orderBy('name')->get();
        return inertia('Task/Edit',[
            'task'=> new TaskResource($task),
            'projects'=> TaskResource::collection($projects),
            'users'=> UserResource::collection($user),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $data = $request->validated();
        $data['updated_by'] = Auth::user()->id;
    
        if ($request->hasFile('image_path')) {

            if ($task->image_path && Storage::disk('public')->exists($task->image_path)) {
                Storage::disk('public')->delete($task->image_path);
            }
    
            // Store the new image and update the 'image_path' field
            $file = $request->file('image_path');
            $filePath = $file->store('images/tasks', 'public');
            $data['image_path'] = $filePath;
        }
        $task->update($data);
        return to_route('task.index')->with('success', 'Item updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $name = $task->name;
        if ($task->image_path && Storage::disk('public')->exists($task->image_path)) {
                Storage::disk('public')->delete($task->image_path);
            }
    
        $task->delete();
        return to_route('task.index')->with('success',$name.' item deleted successfully');
    }
    public function my_task(){
        $user = Auth::user();
        $query = Task::query()->where('assigned_user_id',$user->id);
        $sortField = request("sort_field","created_at");
        $sortDirection = request("sort_direction","desc");

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        if (request("status")) {
            $query->where("status", "=", request("status"));
        }
        $Tasks = $query->orderBy($sortField,$sortDirection)->paginate(10)->onEachSide(1);
        return Inertia::render("Task/Index", [
            "Tasks" => TaskResource::collection($Tasks),
            "querParams" => request()->query() ?: null,
            "success"=>session("success"),
        ]);
    }


}
