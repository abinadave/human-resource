<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePayrollempsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('payrollemps', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('pid');
            $table->integer('emp_id');
            $table->double('hrs_work', 10, 2);
            $table->double('phil', 10, 2);
            $table->double('sss', 10, 2);
            $table->double('advances', 10, 2);
            $table->timestamps();
        });

        Schema::table('payrollemps', function (Blueprint $table) {
            $table->double('rpd', 10, 2);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('payrollemps');
    }
}
