<?php

namespace App\Http\Controllers\api\v1;

use App\Filters\v1\ClubFilter;
use App\Http\Requests\StoreClubRequest;
use App\Http\Requests\UpdateClubRequest;
use App\Http\Resources\api\v1\ClubCollection;
use App\Http\Resources\api\v1\ClubResource;
use App\Models\Club;
use Cloudinary\Cloudinary;
use http\Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ClubController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request )
    {
        $filter=new ClubFilter();
        $queryItems=$filter->transform($request);
        $includeUser=$request->query('includeUser');

        if(count($queryItems)==0){
            $clubs= ($includeUser)?Club::with('user')->paginate():Club::paginate();
            return  new ClubCollection($clubs);
        }
        else{
            $clubs= ($includeUser)?Club::with('user')->where($queryItems)->paginate():Club::where($queryItems)->paginate();
            return  new ClubCollection($clubs->appends($request->query()));
        }
    }



    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreClubRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreClubRequest $request)
    {
        $logo=null;
        try {
//            $logo=cloudinary()->upload($request->file('logo')->getRealPath())->getSecurePath();
//            $bureauMemeberFile=cloudinary()->upload($request->file('bureauMembersFile')->getRealPath())->getSecurePath();

        //storing in the local folder app/storage/public/logos and app/storage/public/files
            if($request->hasFile('logo')){
                $logoName=time().'.'.$request->file('logo')->getClientOriginalExtension();
                $logoLocalPath=$request->file('logo')->storeAs('/public/logos',$logoName);
//                $logo=env('APP_URL').Storage::url($logoLocalPath);
                $logo=Storage::url($logoLocalPath);
            }

            if($request->hasFile('bureauMembersFile')){
                $bureauMemeberFileName=time().'.'.$request->file('bureauMembersFile')->getClientOriginalExtension();
                $bureauMemeberFileLocalPath=$request->file('bureauMembersFile')->storeAs('/public/files',$bureauMemeberFileName);
//                $bureauMemeberFile=env('APP_URL').Storage::url($bureauMemeberFileLocalPath);
                $bureauMemeberFile=Storage::url($bureauMemeberFileLocalPath);
            }

        }catch (Exception $e){
            return response()->json('failed to download');
        }

        $clubToStore=[
             'name'=>$request->name,
            'activity_domaine'=>$request->activityDomaine,
            'supervisor'=>$request->supervisor,
            'bureau_members_file'=>$bureauMemeberFile,
            'email'=>$request->email,
            'slugon'=>$request->slugon,
            'logo'=>$logo,
            'description'=>$request->description,
            'user_id'=>Auth::user()->id,
    ];


        return new ClubResource(Club::create($clubToStore));
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Club  $club
     * @return \Illuminate\Http\Response
     */
    public function show(Club $club)
    {
        $club=Club::with('user')->findOrFail($club->id);
        return  new ClubResource($club  );
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateClubRequest  $request
     * @param  \App\Models\Club  $club
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateClubRequest $request, Club $club)
    {
        if($club->user_id!=auth()->user()->id && auth()->user()->role!='admin')
            return response()->json(['error' => 'Not authorized.'],403);

        try {
            if($request->hasFile('logo')){
                $logoIn=trim(str_replace('/storage/','',$club->logo));
                //dd('/storage/app/'.$file,'/storage/app/'.$logo);
                if(Storage::has('public/'.$logoIn))
                    Storage::delete('public/'.$logoIn);

                $logoName=time().'.'.$request->file('logo')->getClientOriginalExtension();
                $logoLocalPath=$request->file('logo')->storeAs('/public/logos',$logoName);
//                $logo=env('APP_URL').Storage::url($logoLocalPath);
                 $logo=Storage::url($logoLocalPath);
                 $request->logo=$logo;
            }

            if($request->hasFile('bureauMembersFile')){

                $fileIn=trim(str_replace('/storage/','',$club->bureau_members_file));
                Storage::delete('public/'.$fileIn);
                $bureauMemeberFileName=time().'.'.$request->file('bureauMembersFile')->getClientOriginalExtension();
                $bureauMemeberFileLocalPath=$request->file('bureauMembersFile')->storeAs('/public/files',$bureauMemeberFileName);
//                $bureauMemeberFile=env('APP_URL').Storage::url($bureauMemeberFileLocalPath);
                 $bureauMemeberFile=Storage::url($bureauMemeberFileLocalPath);
                 $request->bureau_members_file=$bureauMemeberFile;
            }
            }catch (Exception $e){
                return response()->json('failed to download');
            }
//        $clubToUpdate=[
//            'name'=>$request->name??$club->name,
//            'activity_domaine'=>$request->activityDomaine??$club->activity_domaine,
//            'supervisor'=>$request->supervisor??$club->supervisor,
//            'bureau_members_file'=>$bureauMemeberFile??$club->$bureauMemeberFile,
//            'email'=>$request->email??$club->email,
//            'slugon'=>$request->slugon??$club->slugon,
//            'logo'=>$logo??$club->logo,
//            'description'=>$request->description??$club->description,
//            'user_id'=>Auth::user()->id,
//        ];
//        $club->update($clubToUpdate);
        $club->update($request->all());
        return new ClubResource(Club::with('user')->findOrFail($club->id));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Club  $club
     * @return \Illuminate\Http\Response
     */
    public function destroy(Club $club)
    {

         $file=trim(str_replace('/storage/','',$club->bureau_members_file));
         $logo=trim(str_replace('/storage/','',$club->logo));
         //dd('/storage/app/'.$file,'/storage/app/'.$logo);
        if(Storage::has('public/'.$logo))
            Storage::delete('public/'.$logo);
         Storage::delete('public/'.$file);
         if($club->user_id==auth()->user()->id || auth()->user()->role=='admin')
             $club->delete();
        else
            return response()->json(['error' => 'Not authorized.'],403);
         return true;

    }
}
