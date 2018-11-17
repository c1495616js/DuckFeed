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
		$this -> ajax_from_join();

		// search always
		$this -> search_always($data);

		// order
		$this -> db -> order_by('_m.time', 'desc');
		// query results
		$query = $this -> db -> get();
		return $query -> result();
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
		
	}

	function ajax_from_join() {
		// join
		$this -> db -> from("$this->table_name as _m");
		$this -> db -> join("food fo", "fo.feed_id = _m.id", "left");
		
	}



}
?>
