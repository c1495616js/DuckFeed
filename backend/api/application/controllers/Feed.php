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
		if(!$this -> jwt_auth()) return;
		$res = array();
		$res['success'] = true;
		$error_code = array();

		$feed_data = $this -> get_posts(array(
			"park",
			"numbers",
			"time",
			"user_id",			
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
			$feed_data['is_regular'] = $this -> get_post('is_regular');
			$feed_id = $this -> dao -> insert($feed_data);
			$food_data['feed_id'] = $feed_id;
			$this -> food_dao -> insert($food_data);			
		}

		$this -> to_json($res);
	}


	// get feed data
	public function list_feed() {
		if(!$this -> jwt_auth()) return;
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
			"where",
			// contribution
			"contribution",
			"need_pages",
			// search
			"search_park",
			"search_time_range",
			"search_food",
			"search_kind",
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

		if(!empty($data['need_pages'])){
			$data['page_disabled'] = true;
			$res['pages'] = $this -> dao -> count_feed_pages($data); 
		}
		
		$this -> to_json($res);
	}

	// searchbar options for select-option
	public function list_all_options() {
		if(!$this -> jwt_auth()) return;
		$res = array();		
		$res['success'] = true;

		$data = array(
			"page_disabled" => true,
			"limit" => 10,
			"page" => 0
		);

		// park
		$where_data = array_merge($data, array("where" => true));
		$res['option_park'] = $this -> dao -> query_all($where_data);
		// food name
		$food_data = array_merge($data, array("what_food" => true));
		$res['option_food'] = $this -> dao -> query_all($food_data);
		// food kind
		$kind_data = array_merge($data, array("kind_food" => true));
		$res['option_kind'] = $this -> dao -> query_all($kind_data);

		
		$this -> to_json($res);

	}

	// crontab for repeating schedule
	public function check_repeating() {
		$res = array();
		$res['success'] = true;

		$list = $this -> dao -> find_all_where(array(
			"is_regular" => 1,
			"had_regular" => 0
		));

		foreach($list as $each){
			$feed_id = $each -> id;
			$food = $this -> food_dao -> find_by('feed_id', $feed_id);
			// new time
			$new_time = new DateTime($each -> time);
			$new_time = $new_time -> modify('+1 day') -> format('Y-m-d H:i:s');
			// insert feed
			$i_data = array(
				"user_id" => $each -> user_id,
				"park" => $each -> park,
				"numbers" => $each -> numbers,
				"is_regular" => 1,
				"time" => $new_time
			);			
			$res['new_feed_id'] = $new_feed_id = $this -> dao -> insert($i_data);

			// insert food
			$i_food_data = array(
				"feed_id" => $new_feed_id,
				"name" => $food -> name,
				"kind" => $food -> kind,
				"amount" => $food -> amount,
			);

			$res['new_food_id'] = $this -> food_dao -> insert($i_food_data);

			// update old feed had_regular to 1
			$this -> dao -> update(array("had_regular" => 1), $feed_id);
		}

		$this -> to_json($res);
	}

}