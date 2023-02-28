<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateClubRequest extends FormRequest
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

                'name'=>['required'],
                'activityDomaine'=>['required'],
                'email'=>['email'],
                'bureauMembersFile'=>['required','file','mimes:doc,docx,pdf,csv,xlx,xls,txt','max:2048'],
                'logo'=>['image','mimes:png,jpg,jpeg','max:2048'],
            ];
        }else{
            return [

                'name'=>['required','sometimes'],
                'activityDomaine'=>['required','sometimes'],
                'email'=>['email'],
                'bureauMembersFile'=>['required','sometimes','file','mimes:doc,docx,pdf,csv,xlx,xls,txt','max:2048'],
                'logo'=>['image','mimes:png,jpg,jpeg','max:2048'],
            ];
        }

    }

    protected function prepareForValidation()
    {
        if($this->bureauMembersFile){
            $this->merge([
                'bureau_members_file'=> $this->bureauMembersFile,
            ]);
        }

        if($this->activityDomaine){
            $this->merge([
                'activity_domaine'=>$this->activityDomaine,

            ]);
        }
    }
}
