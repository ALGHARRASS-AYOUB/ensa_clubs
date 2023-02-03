<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateClubRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return false;
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

                'name'=>['required'],
                'activity_domaine'=>['required'],
                'email'=>['email'],
                'president'=>['required','int'],
                'bureau_members_file'=>['required'],
            ];
        }else{
            return [

                'name'=>['required','sometimes'],
                'activity_domaine'=>['required','sometimes'],
                'email'=>['email'],
                'president'=>['required','sometimes','int'],
                'bureau_members_file'=>['required','sometimes'],
            ];
        }

    }

    protected function prepareForValidation()
    {
        if($this->bureauMembersFile && $this->activityDomaine){
            $this->merge([
                'activity_domaine'=>$this->bureauMembersFile,
                'bureau_members_file'=> $this->activityDomaine,
            ]);
        }
    }
}
