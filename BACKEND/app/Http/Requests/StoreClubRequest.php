<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class StoreClubRequest extends FormRequest
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
            'activityDomaine'=>['required'],
            'email'=>['email'],
            'bureauMembersFile'=>['required','file','mimes:doc,docx,pdf,csv,xlx,xls,txt','max:2048'],
            'logo'=>['image','mimes:png,jpg,jpeg','max:2048'],
        ];
    }

    protected function prepareForValidation()
    {
        if($this->bureauMembersFile && $this->activityDomaine){
            $this->merge([
                'activity_domaine'=>$this->activityDomaine,
                'bureau_members_file'=> $this->bureauMembersFile,
            ]);
        }
    }
}
