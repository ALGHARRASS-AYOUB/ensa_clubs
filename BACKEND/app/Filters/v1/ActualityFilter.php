<?php

namespace App\Filters\v1;

use App\Filters\ApiFilter;

class ActualityFilter extends ApiFilter
{
    protected $safeParms=[
        'startAt'=>['eq','lt','gt','lte','gte'],
        'endAt'=>['eq','lt','gt','lte','gte'],


    ];
    protected $columnMap=[
        'startAt'=>'start_at',
        'endAt'=>'end_at',
        'createdAt'=>'end_at',
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
