<?php
namespace App\Filters;
use Illuminate\http\Request;

class ApiFilter{
    protected $safeParms=[];
    protected $columnMap=[];
    protected $operatorMap=[];

    public function transform(Request $request){
        $eleQuery=[]; // [column,operator,value]

        foreach ($this->safeParms as $parm=>$operators){
            $query=$request->query($parm);
            if(!isset($query))
                continue;
            $column=$this->columnMap[$parm]?? $parm;
            foreach ($operators as $operator){
                if(isset($query[$operator]))
                    $eleQuery[]=[$column,$this->operatorMap[$operator],$query[$operator]];
            }
        }

        return $eleQuery;
    }


}
