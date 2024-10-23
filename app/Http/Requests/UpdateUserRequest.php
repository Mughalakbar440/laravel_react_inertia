<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

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
        $userId = $this->user()->id; // Get the current user's ID;
        return [
            "name" => ["required", "string", "max:255"], // Ensures name is required, a string, and max 255 characters
            "email" => [
                "required",
                "email",
                "max:255",
                "unique:users,email," . $userId // Ensure the email is unique, excluding the current user's email
            ],
            "password" => ["nullable", "string", "min:8", "confirmed"], // Password is optional for updates
        ];
        
    }
}
