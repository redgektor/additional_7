module.exports = function solveSudoku(matrix) {
  var arrayDone = [1,2,3,4,5,6,7,8,9];
	var arrayRow = [];
	var arrayCol = [];
	var arrayBox = [];
	var previusChoose = [];
	var changed = -1;
	var n = 3;
	var dataChoose;

	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			if (matrix[i][j] == 0) {
				arrayRow = matrix[i];
				arrayCol = foundCol(i , j);
				arrayBox = foundBox(i , j);

				uniceuArray = whoIsAbsant(arrayRow,arrayCol,arrayBox);

				// if uniceuArray.length == 0) error = true;

				if (uniceuArray.length == 1) {
					matrix[i][j] = uniceuArray[0];
					saveElementData(i,j);
					changed++;
				} else if (uniceuArray.length > 1) {
					saveElementData(i,j);
					changed++;
					matrix[i][j] = previusChoose[changed][3];
					

					

					// var keyName = String(i) + String(j);
					// previusChoose[element] = new Array(i,j);
					// element++;
				} else {
					checkPreviusChoose();
				}
			}
		}
	}
	return matrix;

	function saveElementData(i,j) {
		dataChoose = [i , j, 3];
		dataChoose = dataChoose.concat(uniceuArray);
		previusChoose.push(dataChoose);
	}
	
	function checkPreviusChoose() {
			i = previusChoose[changed][0];
			j = previusChoose[changed][1];
			n = previusChoose[changed][2];

		if (previusChoose[changed].length == 4) {
			matrix[i][j] = 0;
			previusChoose.pop(); // Удаляем данные 
			changed--;
			checkPreviusChoose();
		} else if ( n < previusChoose[changed].length-1) {
			n++;
			matrix[i][j] = previusChoose[changed][n];
			previusChoose[changed][2] = n;
		} else {
			matrix[i][j] = 0;
			// previusChoose[changed][2] = 3;
			previusChoose.pop();
			changed--;
			checkPreviusChoose();
		}

	}

	function foundBox(i , j) {
		var i0 = Math.floor(i/3)*3;
		var j0 = Math.floor(j/3)*3;
		var result = [];
		for (var i = i0; i <= i0 + 2; i++) {
			for (var j = j0; j <= j0 + 2; j++) {
				result.push(matrix[i][j]);
			}
		}
		return result;
	}

	function foundCol(i,j) {
		var result = [];
		for (var k = 0; k < 9; k++) {
			result.push(matrix[k][j]);
		}
		return result;
	}

	function whoIsAbsant(arrayRow, arrayCol, arrayBox) {
		let array = [], result = [];
		array = array.concat(arrayRow,arrayCol,arrayBox);
		var unicue = {};
		for (var i = 0; i < array.length; i++) {
			var index = array[i];
			unicue[index] = true; //Object.keys(unicue)
		}
		for (var i = 0; i < arrayDone.length; i++) {
			if (!unicue[i+1]) result.push(i+1); 
		}
		return result;

	}
}
