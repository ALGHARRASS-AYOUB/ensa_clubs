<?php

namespace App\Filters\v1;

use App\Filters\ApiFilter;

class SalleFilter extends ApiFilter
{
    protected $safeParms=[
        'name'=>['eq'],
        'isDisponible'=>['eq'],


    ];
    protected $columnMap=[

    ];
    protected $operatorMap=[
        'eq'=>'=',
        'ne'=>'!=',
        'lt'=>'<',
        'gt'=>'>',
        'lte'=>'<=',
        'gte'=>'>=',
    ];
}
