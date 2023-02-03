<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'first_name'=>['required'],
            'last_name'=>['required'],
            'role'=>['required',Rule::in(['president','admin'])],
            'email'=>['required','email'],
            'password'=>['required'],
            'cpassword'=>['required','same:password'],
        ];

    }

    protected function prepareForValidation()
    {
        if($this->firstName && $this->lastName){
            $this->merge([
                'first_name'=>$this->firstName,
                'last_name'=> $this->lastName,
            ]);
        }
    }
}
