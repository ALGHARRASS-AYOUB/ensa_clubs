<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEvenementRequest extends FormRequest
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
            'name'=>['required'],
            'description'=>['required'],
            'dateEvent'=>['required','date_format:Y-m-d H:i:s'],
            'isApprouved'=>['required','boolean'],
            'image'=>['image','mimes:png,jpg,jpeg','size:2048'],
        ];
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
