<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RemovedEmployee extends Model
{
    protected $table = 'removed_employees';
    protected $primaryKey = 'id';
}
