<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Models\Project;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Models\Task;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

       
        $query = Project::query();
        $sortField = request("sort_field","created_at");
        $sortDirection = request("sort_direction","desc");

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        if (request("status")) {
            $query->where("status", "=", request("status"));
        }
        $projects = $query->orderBy($sortField,$sortDirection)->paginate(10)->onEachSide(1);
        return inertia("Project/Index", [
            "projects" => ProjectResource::collection($projects),
            "querParams" => request()->query() ?: null,
            'success'=>session('success'),
        ]);
    }
    

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        return inertia("Project/create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        $data = $request->validated();

        // Handle file upload
        if ($request->hasFile('image_path')) {
            $file = $request->file('image_path');
          
            $filePath = $file->store('images/projects', 'public');
            $data['image_path'] = $filePath;  

        }

        $data['created_by'] = Auth::user()->id;
        $data['updated_by'] = Auth::user()->id;

        Project::create($data);

        return to_route('project.index')->with('success','Project was Created');
    }


    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {   
   

         $query = $project->tasks();
        $sortField = request("sort_field","created_at");
        $sortDirection = request("sort_direction","desc");

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        if (request("status")) {
            $query->where("status", "=", request("status"));
        }
        $Tasks = $query->orderBy($sortField,$sortDirection)->paginate(10)->onEachSide(1);    
        
        return inertia("Project/Show", [
            'project'=>new ProjectResource($project),
            'Tasks' =>   TaskResource::collection($Tasks),
            "querParams" => request()->query() ?: null
            ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        return inertia('Project/Edit',[
            'project'=> new ProjectResource($project),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        $data = $request->validated();
        $data['updated_by'] = Auth::user()->id;
    
        if ($request->hasFile('image_path')) {

            if ($project->image_path && Storage::disk('public')->exists($project->image_path)) {
                Storage::disk('public')->delete($project->image_path);
            }
    
            // Store the new image and update the 'image_path' field
            $file = $request->file('image_path');
            $filePath = $file->store('images/projects', 'public');
            $data['image_path'] = $filePath;
        }
    
        $project->update($data);
    
        return to_route('project.index')->with('success', 'Item updated successfully');
    }
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        $name = $project->name;
        if ($project->image_path && Storage::disk('public')->exists($project->image_path)) {
                Storage::disk('public')->delete($project->image_path);
            }
    
        $project->delete();
        return to_route('project.index')->with('success',$name.' item deleted successfully');

    }
}
