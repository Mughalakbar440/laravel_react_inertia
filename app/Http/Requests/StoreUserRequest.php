<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
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
            "name" => ["required", "string", "max:255"], // Ensures name is required, a string, and max 255 characters
            "email" => ["required", "email", "max:255","unique:users,email"], // Ensures email is required, in a valid email format, and max 255 characters
            "password" => ["required", "string", "min:8", "confirmed"], // Ensures password is required, at least 8 characters, and matches the confirm_password field
        ];
        
    }
}
