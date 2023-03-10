<?php

namespace App\Filters\v1;

use App\Filters\ApiFilter;

class UserFilter extends ApiFilter
{
    protected $safeParms=[
        'firstName'=>['eq'],
        'lastName'=>['eq'],
        'email'=>['eq'],


    ];
    protected $columnMap=[
        'firstName'=>'first_name',
        'lastName'=>'last_name',
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
