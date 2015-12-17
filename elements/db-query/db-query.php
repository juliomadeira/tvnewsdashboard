<?php
include_once("../../database/dbConnection.php");
$connection = new DatabaseConnection();
$queryId = $_GET['queryId'];

// Remove queryId from $_GET
unset($_GET['queryId']);

//Create data array
$data = array(
    'data' => array(),
);

//Connect to the DB
$connection->openConn();

//Execute query
$sql = "SELECT QUERY FROM `queries` WHERE QUERY_ID = '$queryId'";
$result = $connection->runQuery($sql);

//Get SQL Query
if (!$result) {
    echo 'Could not run query: ' . mysql_error();
    exit;
}
else {
	$sql = mysql_fetch_row($result)[0];
}

//Get attributes to be replaced on SQL query
$attributeAdded = false;
foreach ($_GET as $key => $attribute) {
	if (strpos($sql,$key) === false) {
		//If the attribute is not found on the query, append it to the end of the SQL
		$sql .= " `".$key."` = '".$attribute."' AND";
		$attributeAdded = true;
	}
	else {
		//Replace the string variable with the actual attribute
		$tempSql = $sql;
		$pos = strpos($sql,$key);
		$sqlVariable = "%$key%";
		$tempSql = str_replace($sqlVariable, $attribute, $sql);
		$sql = $tempSql;
	}
}
//If attribute was added, remove last 'AND' from the SQL
if ($attributeAdded) {
	$sql = substr($sql, 0, strrpos($sql,'AND'));
}

//Execute query
$result = $connection->runQuery($sql);

//Close Connection
$connection->closeConn();



//Retrieve results and populate the array
if(mysql_num_rows($result) > 0) {
    while($row = mysql_fetch_assoc($result)) {
        $data['data'][] = $row;
    }
}
//Output $data array as JSON
header('Content-Type: application/json; charset=utf8');
echo json_encode($data);
?>