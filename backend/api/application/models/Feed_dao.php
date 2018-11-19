<?php
class Feed_dao extends MY_Model {

	function __construct() {
		parent::__construct();

		// initialize table name
		parent::set_table_name('feed');

		
	}

	function query_all($data){
		// select
		$this -> db -> select('_m.*');
		$this -> db -> select('fo.name, fo.kind, fo.amount');
		// join
		$this -> ajax_from_join($data);

		// search always
		$this -> search_always($data);

		// order
		// $this -> db -> order_by('_m.time', 'desc');
		// query results
		$query = $this -> db -> get();
		return $query -> result();
	}

	function count_feed_pages($data){	
		$this -> db -> select('_m.id');	
		// join
		$this -> ajax_from_join($data);

		// search always
		$this -> search_always($data);

		$cnt = $this->db->count_all_results();
		$limit = $data['limit'];
		$pages = ceil($cnt / $limit);

		return $pages;
	}

	function search_always($data) {

		// limit
		$limit = $data['limit'];
		$start = $data['page'] * $limit;
		if(empty($data['page_disabled'])){
			$this -> db -> limit($limit, $start);
		}

		// condition
		if(!empty($data['user_id'])){
			$this -> db -> where("_m.user_id", $data['user_id']);
		}

			// food
			// what food
		if(!empty($data['what_food'])){
			$this -> db -> select('SUM(fo.amount) as total_amount', false);
			$this -> db -> group_by('fo.name');
			$this -> db -> order_by('total_amount', 'desc');		
		}

		// what kind of food
		if(!empty($data['kind_food'])){
			$this -> db -> select('SUM(fo.amount) as total_amount', false);
			$this -> db -> group_by('fo.kind');
			$this -> db -> order_by('total_amount', 'desc');		
		}
		
		// what time
		if(!empty($data['what_time'])){
			$this -> db -> select('COUNT(_m.time) as total_cnt');
			$this -> db -> select('SUBSTRING(_m.time, 12, 5) as what_time');
			$this -> db -> group_by('TIME(_m.time)');
			$this -> db -> order_by('what_time', 'asc');
		}

		// where
		if(!empty($data['where'])){
			$this -> db -> select('SUM(_m.numbers) as total_numbers', false);
			$this -> db -> group_by('_m.park');
			$this -> db -> order_by('total_numbers', 'desc');		
		}

		// user contribution
		if(!empty($data['contribution'])){
			$this -> db -> select('COUNT(_m.user_id) as total_cnt');			
			$this -> db -> select('u.name as user_name');
			$this -> db -> group_by('_m.user_id');
			$this -> db -> order_by('total_cnt', 'desc');			
		}
	}

	function ajax_from_join($data) {
		// join
		$this -> db -> from("$this->table_name as _m");
		$this -> db -> join("food fo", "fo.feed_id = _m.id", "left");
		
		// contribution
		if(!empty($data['contribution'])){
			$this -> db -> join("users u", "u.id = _m.user_id", "left");
		}
	}



}
?>
