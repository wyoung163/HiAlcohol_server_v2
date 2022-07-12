const selectTestResult = async (answers) => {
    var ei = parseInt(answers[0]) + parseInt(answers[4]) + parseInt(answers[8]);
	var ns = parseInt(answers[1]) + parseInt(answers[5]) + parseInt(answers[9]);
	var tf = parseInt(answers[2]) + parseInt(answers[6]) + parseInt(answers[10]);
	var pj = parseInt(answers[3]) + parseInt(answers[7]) + parseInt(answers[11]);
	var result = '';
	var cockId = '';
  
    if (ei <= 4)
		result += 'e';
	else result += 'i';
	
    if (ns <= 4)
		result += 'n';
	else result += 's';
	
    if (tf <= 4)
			result += 't';
	else result += 'f';
	
    if (pj <= 4)
		result += 'p';
	else result += 'j';
	
    var mbti = result;
	if(mbti == 'istj'){
		cockId = 26;
    }
	else if(mbti == 'istp'){
		cockId = 36;
    }
	else if(mbti == 'isfj'){
		cockId = 37;
    }
	else if(mbti == 'isfp'){
		cockId = 32;
    }
	else if(mbti == 'intj'){
		cockId = 29;
    }
	else if(mbti == 'intp'){
		cockId = 7;
    }
	else if(mbti == 'infj'){
		cockId = 21;
    }
	else if(mbti == 'infp'){
		cockId = 39;
    }
	
	else if(mbti == 'estj'){
		cockId = 34;
    }
	else if(mbti == 'estp'){
		cockId = 19;
    }
	else if(mbti == 'esfj'){
		cockId = 38;
    }
	else if(mbti == 'esfp'){
		cockId = 9;
    }
	else if(mbti == 'entj'){
		cockId = 27;
    }
	else if(mbti == 'entp'){
		cockId = 3;
    }
	else if(mbti == 'enfj'){
		cockId = 24;
    }
	else if(mbti == 'enfp'){
		cockId = 25;
    }

    return { mbti, cockId };
}

export { selectTestResult };