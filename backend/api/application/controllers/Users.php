<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Users extends MY_Api_Controller {

	function __construct() {
		parent::__construct();
		$this -> load -> model('Users_dao','dao');		
	}

	// user add data
	public function signup()
	{
		$res = array();
		$error_code = array();

		$data = $this -> get_posts(array(
			"name",
			"email",
			"password"
		));


		foreach($data as $key => $each){
			if(empty($each)){
				$error_code[] = $key.'_required';
			}
		}


		if(count($error_code) > 0){
			$res['error_code'] = $error_code;
		}else{
      $user = $this -> dao -> find_by('email', $data['email']);
      if(empty($user)){
        $user_id = $this -> dao -> insert($data);
        $user = $this -> dao -> find_by_id($user_id);
        unset($user -> password);
        $res['user'] = $user;
        $res['token'] = jwt_helper::create($user_id);;			
      }else{
        $error_code[] = 'email_exist';
      }          
		}

    if(count($error_code) > 0){
      $res['error_code'] = $error_code;
    }

		$this -> to_json($res);
	}

  public function login(){
    $res = array();
    $error_code = array();

    $email = $this -> get_post('email');
    $password = $this -> get_post('password');

    if(!empty($email)){
      $user = $this -> dao -> find_by('email', $email);
      if(!empty($user)){
        // check if password correct
        if($user -> password == $password){
          $user_id = $user -> id;
          $user = $this -> dao -> find_by_id($user_id);
          unset($user -> password);
          $res['user'] = $user;
          $res['token'] = jwt_helper::create($user_id);
        }
      }else{
        $error_code[] = 'user_not_found';
      }
    }else{
      $error_code[] = 'email_required';
    }

    if(count($error_code) > 0){
      $res['error_code'] = $error_code;
    }

    $this -> to_json($res);
  }

  public function check_token(){
    $res = array();
    $token = $this -> get_post('token');
    $valid = jwt_helper::validate($token);
    if($valid){
      $decode = jwt_helper::decode($token);
      $user_id = $decode -> userId;
      $user = $this -> dao -> find_by_id($user_id);
      unset($user -> password);
      $res['user'] = $user;
      $res['user_id'] = $user_id;
    }
    

    $res['valid'] = $valid;
    $this -> to_json($res);
  }

  
}