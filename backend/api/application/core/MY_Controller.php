<?php
class MY_Base_Controller extends CI_Controller {

	function __construct() {
		parent::__construct();
		// $this -> load -> helper('common');

		// disable cache for back button
		header("Cache-Control: no-store, no-cache, must-revalidate");
		// date_default_timezone_set("Asia/Taipei");

	}

	function get_post($key) {
		return $this -> input -> post($key);
	}

	function get_get($key) {
		return $this -> input -> get($key);
	}

	function get_get_post($key) {
		$val = $this -> get_get($key);
		if ($val === FALSE) {
			$val = $this -> get_post($key);
		}
		return $val;
	}

	function to_json($json_data) {
		header('Content-Type: application/json; charset=utf-8');
		echo json_encode($json_data);
	}

	public function get_posts($post_array, $bypass_empty = FALSE) {
		$i_data = array();
		foreach ($post_array as $each) {
			if($bypass_empty) {
				if(!empty($this -> get_post($each))) {
					$i_data[$each] = $this -> get_post($each);
				}
			} else {
				$i_data[$each] = $this -> get_post($each);
			}
		}
		return $i_data;
	}

	public function get_gets($post_array) {
		$i_data = array();
		foreach ($post_array as $each) {
			$i_data[$each] = $this -> get_get($each);
		}
		return $i_data;
	}

	public function get_get_posts($post_array) {
		$i_data = array();
		foreach ($post_array as $each) {
			$val = $this -> get_get_post($each);
			if (!($val === FALSE)) {
				$i_data[$each] = $val;
			}
		}
		return $i_data;
	}

	// resize
	public function resize($img_path, $width = 500, $height = 500) {
		$config['image_library'] = 'gd2';
		$config['source_image'] = $img_path;
		$config['create_thumb'] = FALSE;
		$config['maintain_ratio'] = TRUE;
		$config['width'] = $width;
		$config['height'] = $height;

		$this -> load -> library('image_lib', $config);

		$this -> image_lib -> resize();
	}

	public function check_dir($dir) {
		if (!file_exists($dir)) {
			mkdir($dir);
		}
	}

	public function setup_user_data($data) {
		$user_id = $this -> session -> userdata('user_id');
		if(empty($user_id) && empty($data['allow_store_login'])) {
			if ($this -> input ->is_ajax_request()) {
				echo "<script>window.location.reload();</script>";
			} else {
				redirect("");
			}
		} else {
			$data['login_user_id'] = $user_id;
		}

		// setup store data
		if(!empty($data['allow_store_login'])) {
			$data = $this -> setup_store_data($data);
		}
		return $data;
	}

	//store
	public function setup_store_data($data) {
		$store_id = $this -> session -> userdata('store_id');
		if(empty($store_id)) {
			if ($this -> input ->is_ajax_request()) {
				echo "<script>window.location.reload();</script>";
			} else {
				redirect("/loginS");
			}
		}
		$data['login_store_id'] = $store_id;

		return $data;
	}
}

/**
* api
*/
class MY_Api_Controller extends MY_Base_Controller {
	function __construct() {
		parent::__construct();

		header('Access-Control-Allow-Origin: *');
		header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
		header("Access-Control-Allow-Headers: Content-Type, Content-Length, Accept-Encoding");
	}

	public function get_member_city_district($member_id)
	{
		$this -> load -> model('Members_dao','m_dao');

		if(!empty($this -> m_dao -> find_by_id($member_id))){
			$m = $this -> m_dao -> find_by_id($member_id);
			return array("city"=>$m->city,"district"=>$m->district);
		}else{
			return NULL;
		}

	}

}

/**
 * nne to check session
 */
class MY_Mgmt_Controller extends MY_Base_Controller {
	function __construct() {
		parent::__construct();

		$this -> load -> model('Users_dao','users_dao_my_controller');

		$user_id = $this -> session -> userdata('user_id');
		if(strpos($_SERVER['PATH_INFO'], '/app/mgmt') == 0 && empty($user_id)) {
			echo "<script>window.location='../login';</script>";
			exit;
		}
	}

	//由區域管理者登入時 插入city district
	public function update_city_district_by_local_mgmt($id){
		if(!empty($this -> get_login_user())){
			$user = $this -> get_login_user();

			$city = '';
			$district = '';
			if($user -> role_id == 2){//區域管理者
				$city = $user -> city;
				$district = $user -> district;
			}
			$this -> dao -> update(array("city"=>$city,"district"=>$district),$id);
		}
	}
	public function get_login_user(){
		$q_data = $this -> get_posts(array(
			'length',
			'start',
			'columns',
			'search',
			'order'
		));
		$q_data['start'] = 0;
		$q_data['length'] = 1;
		$user_id = $this -> session -> userdata('user_id');
		$q_data['id'] = $user_id;

		$items = $this -> users_dao_my_controller -> query_ajax($q_data);
		if(count($items) > 0){
			$user = $items[0];
			return $user;
		}else{
			return NULL;
		}
	}

	public function is_admin(){
		$is_admin = false;
		if(!empty($this->get_login_user())){
			$user = $this -> get_login_user();
			if(empty($user->city) && empty($user->district)){
				$is_admin = true;
			}
		}
		return $is_admin;
	}

	public function get_login_user_city_district()
	{
		$user = $this -> get_login_user();
		if(!empty($user)){
			return array("city"=>$user->city,"district"=>$user->district);
		}else{
			return NULL;
		}

	}

}
?>
