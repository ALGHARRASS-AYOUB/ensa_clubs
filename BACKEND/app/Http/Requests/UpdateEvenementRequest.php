<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

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
               if($method=='PUT'){
                   return [
                       'name'=>['required','sometimes'],
                       'description'=>['required','sometimes'],
                       'startAt'=>['required','sometimes','date_format:Y-m-d H:i:s','before_or_equal:endAt'],
                       'endAt'=>['date_format:Y-m-d H:i:s','after_or_equal:startAt'],
                       'image'=>['image','mimes:png,jpg,jpeg','max:500000'],
                   ];
               }else{
                   return [
                       'name'=>['sometimes'],
                       'description'=>['sometimes'],
                       'startAt'=>['sometimes','date_format:Y-m-d H:i:s','before_or_equal:endAt'],
                       'endAt'=>['date_format:Y-m-d H:i:s','after_or_equal:startAt'],

                   ];
               }

    }

    public function prepareForValidation()
    {

        if( $this->startAt && $this->endAt){
            return $this->merge([

                'start_at'=>$this->startAt,
                'end_at'=>$this->endAt,
            ]);
        }
    }
}
