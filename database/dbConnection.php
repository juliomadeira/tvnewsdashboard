<?php
	//define("DB_HOST", "localhost");		//connection host to MySQL
	define("DB_HOST", "localhost");		//connection host to MySQL
	define("DB_USERNAME", "<username>");		//username to connect to MySQL
	define("DB_PASSWORD", "<password>");		//password to connect to MySQL
	define("DB_DATABASENAME", "<db_name>");	//database name to be accessed
	//define("DB_DATABASENAME", "temp");	//database name to be accessed
		
	class DatabaseConnection {
		var $connection;
		var $query;
		var $replaceArray  = array("\r\n", "\n", "\r", " ", ".", "\\", "~", "/","'");
		var $teamAliasArray  = array("\r\n", "\n", "\r", " ", ".", "\\", "~", "/","'","<",">","-");
		
		function openConn() {
			$this->connection = mysql_connect(DB_HOST, DB_USERNAME, DB_PASSWORD)
			or die ("Connection to database failed");
			mysql_select_db(DB_DATABASENAME, $this->connection)
			or die ("Not able to select database");
		}
		
		function closeConn() {
			mysql_close($this->connection);
		}
		
		function runQuery($expression) {
			$this->query = mysql_query($expression, $this->connection);
			if (!$this->query) {
				echo 'Error to execute query: ' . mysql_error();
				return $this->query;
			}
			return $this->query;
		}
	}		
?>