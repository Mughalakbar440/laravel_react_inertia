<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "name"=> ["required","max:255"],
            "description"=>["string"],
            'image' => ['nullable', 'image', 'max:2000'],
            "due_date"=>["date"],
            'project_id'=>['required','exists:projects,id'],
            'assigned_user_id'=>['required','exists:users,id'],
            "status"=>["required",Rule::in(['in_progres','completed','pending'])],
            "priority"=>["required",Rule::in(['low','medium','high'])]      
    ];
    }
}
