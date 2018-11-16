<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Api extends MY_Api_Controller {

	function __construct() {
		parent::__construct();
		$this -> load -> model('Feed_dao','feed_dao');
		$this -> load -> model('Food_dao','food_dao');
	}

	// user add data
	public function add_feed()
	{
		$res = array();
		$error_code = array();

		$feed_data = $this -> get_posts(array(
			"park",
			"numbers",
			"time",
			"user_id"
		));

		$food_data = $this -> get_posts(array(
			"name",
			"kind",
			"amount"
		));

		foreach($feed_data as $key => $each){
			if(empty($each)){
				$error_code[] = $key.'_required';
			}
		}

		foreach($food_data as $key => $each){
			if(empty($each)){
				$error_code[] = $key.'_required';
			}
		}

		if(count($error_code) > 0){
			$res['error_code'] = $error_code;
		}else{
			$feed_id = $this -> feed_dao -> insert($feed_data);
			$food_data['feed_id'] = $feed_id;
			$this -> food_dao -> insert($food_data);
			$res['success'] = true;
		}

		$this -> to_json($res);
	}


}