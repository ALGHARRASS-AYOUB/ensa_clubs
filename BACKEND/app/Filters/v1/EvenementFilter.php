<?php

namespace App\Filters\v1;

use App\Filters\ApiFilter;

class EvenementFilter extends ApiFilter
{
    protected $safeParms=[
        'name'=>['eq'],
        'isApprouved'=>['eq'],
        'dateEvent'=>['eq','gt','lt'],
        'clubId'=>['eq','gt','lt'],
    ];
    protected $columnMap=[
        'dateEvent'=>'date_event',
        'clubId'=>'club_id',
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
