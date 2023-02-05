<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEvenementRequest extends FormRequest
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
        $method=$this->method();
        if($method=='PUT')
            return [
                'name'=>['required'],
                'description'=>['required'],
                'dateEvent'=>['required','date_format:Y-m-d H:i:s'],
                'isApprouved'=>['required','boolean'],
                'image'=>['image','mimes:png,jpg,jpeg','size:2048'],
            ];
        else{
            return [
                'name'=>['required','sometimes'],
                'description'=>['required','sometimes'],
                'dateEvent'=>['required','sometimes','date_format:Y-m-d H:i:s'],
                'isApprouved'=>['required','sometimes','boolean'],
                'image'=>['image','mimes:png,jpg,jpeg','size:2048'],
            ];
        }
    }

    public function prepareForValidation()
    {
        if($this->dateEvent){
            return $this->merge([
                'date_event'=>$this->dateEvent,
            ]);
        }
    }
}
