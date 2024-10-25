<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule; // Correct import of Rule

class UpdateUserRequest extends FormRequest
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
        // Get the current user's ID from the route
        $userId = $this->route('user');

        return [
            "name" => ["required", "string", "max:255"], // Name validation
            "email" => [
                "required",
                "email",
                "max:255",
                Rule::unique('users')->ignore($userId), // Exclude current user from unique email check
            ],
            "password" => ["nullable", "string", "min:8", "confirmed"], // Optional password validation
        ];
    }
}
