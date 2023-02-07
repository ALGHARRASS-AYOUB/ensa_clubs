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
            'startAt'=>['required','date_format:Y-m-d H:i:s','before_or_equal:endAt'],
            'endAt'=>['required','date_format:Y-m-d H:i:s','after_or_equal:startAt'],
            'image'=>['image','mimes:png,jpg,jpeg','max:2048'],
        ];
    }

    public function prepareForValidation()
    {
        if($this->dateEvent && $this->startAt && $this->endAt){
            return $this->merge([
                'date_event'=>$this->dateEvent,
                'start_at'=>$this->startAt,
                'end_at'=>$this->endAt,
            ]);
        }
    }
}
