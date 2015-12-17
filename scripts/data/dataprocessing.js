/** This class was created to hold common data functions
 * 	Methods are going to be created as required  
 */

/** 
This methods returns a sub store from origStore 
containing only the attributes in "attributeList" and the values queried by "query".
@origStore
	The dojo store to be used as base for the new store.
	Use getStore(pageURL) to get the original store
@attributeList
	The list of attributes that will be copied from the original
	store to the new store. E.g.: var attributeList = ["Attr A", "Attr B"];
@query
	String containing a query. It will be evaluated as javascript,
	so the evaluation should be javascript compatible and contain the work "entry"
	for each attribute being queried. 
	E.g.: query = "entry.ID > 10 && entry.CPU < 90"
**/
function getSubStore(origStore, attributeList, query) {
	var newData = [];
	for (var key in data.data[0]) {
		if (count == 0) {
			this.columns.push({"label": key, "type": "string"});
			count++;
		}
		else {
			this.columns.push({"label": key, "type": "number"});
		}
	}
	
	
	
	
	origStore.objectStore.query(function(entry) {
			if (query == null) {
				return true;
			}
			return eval(query);
		}		
	).forEach(function(row){
	   var newRow = [];
	   for (column in row) {
		  if (attributeList.indexOf(column) != -1) {
			 newRow[column] = row[column];
		  }
	   }
	   newData.push(newRow);
	});
	return new dojo.data.ObjectStore({ objectStore: new dojo.store.Memory(
			{ data: newData, identifier: origStore.identifier, idProperty: origStore.objectStore.idProperty, 
					label: origStore.objectStore.label, value: origStore.objectStore.value }
		)}
	);
}

/** 
This methods returns a sub store from origStore 
containing only the attributes in "attributeList" and the values queried by "query".
@origStore
	The dojo store to be used as base for the new store.
	Use getStore(pageURL) to get the original store
@attributeList
	The list of attributes that will be copied from the original
	store to the new store. E.g.: var attributeList = ["Attr A", "Attr B"];
**/
function filterColumns(origStore, attributeList) {
	var newData = [];
	origStore.objectStore.data.forEach(function(row){
	   var newRow = [];
	   for (entry in row) {
		  if (attributeList.indexOf(entry) >= 0) {
			  newRow[entry] = row[entry];      
		  }
	   }
	   newData.push(newRow);
	});
	
	return new dojo.data.ObjectStore({ objectStore: new dojo.store.Memory(
			{ data: newData, identifier: origStore.identifier, idProperty: origStore.objectStore.idProperty, 
					label: origStore.objectStore.label, value: origStore.objectStore.value }
		)}
	);
}

/** 
This methods queries dataStore using the string contained on "query" argument.
@dataStore
	The dojo store to be used as base for the new store.
	Use getStore(pageURL) to get the original store
@query
	String containing a query. It will be evaluated as javascript,
	so the evaluation should be javascript compatible and contain the work "entry"
	for each attribute being queried. 
	E.g.: query = "entry.ID > 10 && entry.CPU < 90"
**/
function queryStore(dataStore, query) {
	var newData = [];
	dataStore.objectStore.query(function(entry) {
			if (query == null) {
				return true;
			}
			return eval(query);
		}		
	).forEach(function(row){
	   newData.push(row);  
	});
	
	return new dojo.data.ObjectStore({ objectStore: new dojo.store.Memory(
			{ data: newData, identifier: dataStore.identifier, idProperty: dataStore.objectStore.idProperty, 
					label: dataStore.objectStore.label, value: dataStore.objectStore.value }
		)}
	);
}

/** 
This methods returns a sub store from origStore 
containing only the attributes in "attributeList" and the values queried by "query".
@origStore
	The dojo store to be used as base for the new store.
	Use getStore(pageURL) to get the original store
@attributeList
	The list of attributes that will be copied from the original
	store to the new store. E.g.: var attributeList = ["Attr A", "Attr B"];
@query
	String containing a query. It will be evaluated as javascript,
	so the evaluation should be javascript compatible and contain the work "entry"
	for each attribute being queried. 
	E.g.: query = "entry.ID > 10 && entry.CPU < 90"
**/
function getUniqueValues(origStore, attributeList) {
	var newData = [];
	var queryArr = [];
	//var attributeList = ['ATTEMPTS_COUNT', 'ACTIVE_USER', 'RES_TIME_MIN'];
	var origData = origStore.objectStore.data;
	var unique = {};
	
	for (attr in attributeList) {
		for(var i in origData ){
			if( typeof(unique[origData[i][attributeList[attr]]]) == "undefined"){
				newData.push(origData[i]);
			}
			unique[origData[i][attributeList[attr]]] = 0;
		}
	}	
	return new dojo.data.ObjectStore({ objectStore: new dojo.store.Memory(
			{ data: newData, identifier: origStore.identifier, idProperty: origStore.objectStore.idProperty, 
					label: origStore.objectStore.label, value: origStore.objectStore.value }
		)}
	);
}

