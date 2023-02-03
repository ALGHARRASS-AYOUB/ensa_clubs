<?php

namespace App\Filters\v1;

use App\Filters\ApiFilter;

class ClubFilter extends ApiFilter
{
    protected $safeParms=[
        'name'=>['eq'],
        'supervisor'=>['eq'],
        'email'=>['eq'],
        'verified'=>['eq'],
        'suspended'=>['eq'],
        'slugon'=>['eq'],

    ];
    protected $columnMap=[
        //'postalCode'=>'postal_code',
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
