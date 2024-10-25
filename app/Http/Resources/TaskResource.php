<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class TaskResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d'),
            'due_date' => (new Carbon($this->due_date))->format('Y-m-d'),
            'status' => $this->status,
            'priority' => $this->priority,
           'image_path' => $this->image_path ? Storage::url($this->image_path) : 'https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=1024x1024&w=is&k=20&c=qNeCdQEGR07rW2FnwvIuuMaVmy0HkHPxdpYeJxLi3UE=',
           'project_id'=>$this->project_id,
           'assigned_user_id'=>$this->assigned_user_id,
            'project' => new ProjectResource($this->project),// big mistake that you do the capital its help to join the table 
            'createdBy' => new UserResource($this->createdBy) ,
            'assignedUser' => $this->assignedUser? new UserResource($this->assignedUser) :null,
            'updatedBy' => new UserResource($this->updatedBy),
        ];
    }
}
