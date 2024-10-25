<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashbordController extends Controller
{
    public function index(){

        $user_id = Auth::user()->id;
        $totalpendingTask = Task::query()->where('status','pending')->count();
        $mytaskPending = Task::query()
                        ->where('status','pending')
                        ->where('assigned_user_id',$user_id)
                        ->count();
        $totalProgressTask = Task::query()->where('status','in_progres')->count();
        $mytaskProgress = Task::query()
                        ->where('status','in_progres')
                        ->where('assigned_user_id',$user_id)
                        ->count();
        $totalCompeletedTask = Task::query()->where('status','completed')->count();
        $mytaskCompeleted = Task::query()
                        ->where('status','completed')
                        ->where('assigned_user_id',$user_id)
                        ->count();
        return Inertia::render('Dashboard',[
            "TotalPendingTask"=>$totalpendingTask,
            "MyTaskPending"=>$mytaskPending,
            "TotalProgressTask"=>$totalProgressTask,
            "MyTaksProgress"=>$mytaskProgress,
            "TotalCompelted"=>$totalCompeletedTask,
            "MytaskCompeted"=>$mytaskCompeleted
        ]);
    }
}
