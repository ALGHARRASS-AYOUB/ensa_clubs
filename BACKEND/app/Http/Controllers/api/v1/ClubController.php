<?php

namespace App\Http\Controllers\api\v1;

use App\Filters\v1\ClubFilter;
use App\Http\Requests\StoreClubRequest;
use App\Http\Requests\UpdateClubRequest;
use App\Http\Resources\api\v1\ClubCollection;
use App\Http\Resources\api\v1\ClubResource;
use App\Models\Club;
use Cloudinary\Cloudinary;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
        try {
            $logo=cloudinary()->upload($request->file('bureauMembersFile')->getRealPath())->getSecurePath();
            $bureauMemeberFile=cloudinary()->upload($request->file('logo')->getRealPath())->getSecurePath();
        }catch (Exception $e){
            return response()->json('failed to upload');
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
        $club->delete();
    }
}
