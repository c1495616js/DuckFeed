<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Feed extends MY_Api_Controller {

	function __construct() {
		parent::__construct();
		$this -> load -> model('Feed_dao','dao');
		$this -> load -> model('Food_dao','food_dao');
	}

	// user add data
	public function add_feed()
	{
		$res = array();
		$res['success'] = true;
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
			$feed_id = $this -> dao -> insert($feed_data);
			$food_data['feed_id'] = $feed_id;
			$this -> food_dao -> insert($food_data);			
		}

		$this -> to_json($res);
	}


	// get feed data
	public function list_feed() {
		$res = array();		
		$res['success'] = true;

		$data = $this -> get_posts(array(
			// later
			"user_id",
			"page_disabled",
			// food
			"what_food",
			"kind_food",
			// basic
			"what_time",
			"where"
		));

		$limit = $this -> get_post('limit');
		if(empty($limit)){
			$limit = 10;
		}
		$data['limit'] = $limit;

		$page = $this -> get_post('page');
		if(empty($page)){
			$page = 0;
		}
		$data['page'] = $page;

		$list = $this -> dao -> query_all($data);
		$res['list'] = $list;
		$this -> to_json($res);
	}

}