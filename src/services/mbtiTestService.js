import {  } from "../models/mbtiTest.js";
import fs from 'fs';
// import testResult from "../../config/result.json";

const selectTestResult = async (answers) => {
    const testResult = JSON.parse(fs.readFileSync("././config/result.json"));
    console.log(testResult.enfp)

    // const checkingMaterials = await selectTestResult(answers);
    var ei = parseInt(answers[0]) + parseInt(answers[4]) + parseInt(answers[8]);
	var ns = parseInt(answers[1]) + parseInt(answers[5]) + parseInt(answers[9]);
	var tf = parseInt(answers[2]) + parseInt(answers[6]) + parseInt(answers[10]);
	var pj = parseInt(answers[3]) + parseInt(answers[7]) + parseInt(answers[11]);
	var result = '';
	var cockId = '';
    let testResultInfo = '';
	
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
        testResultInfo = testResult.istj;
    }
	else if(mbti == 'istp'){
		cockId = 36;
        testResultInfo = testResult.istp;
    }
	else if(mbti == 'isfj'){
		cockId = 37;
        testResultInfo = testResult.isfj;
    }
	else if(mbti == 'isfp'){
		cockId = 32;
        testResultInfo = testResult.isfp;
    }
	else if(mbti == 'intj'){
		cockId = 29;
        testResultInfo = testResult.intj;
    }
	else if(mbti == 'intp'){
		cockId = 7;
        testResultInfo = testResult.intp;
    }
	else if(mbti == 'infj'){
		cockId = 21;
        testResultInfo = testResult.infj;
    }
	else if(mbti == 'infp'){
		cockId = 39;
        testResultInfo = testResult.infp;
    }
	
	else if(mbti == 'estj'){
		cockId = 34;
        testResultInfo = testResult.estj;
    }
	else if(mbti == 'estp'){
		cockId = 19;
        testResultInfo = testResult.estp;
    }
	else if(mbti == 'esfj'){
		cockId = 38;
        testResultInfo = testResult.esfj;
    }
	else if(mbti == 'esfp'){
		cockId = 9;
        testResultInfo = testResult.at(11);
    }

	else if(mbti == 'entj'){
		cockId = 27;
        testResultInfo = testResult.entj;
    }
	else if(mbti == 'entp'){
		cockId = 3;
        testResultInfo = testResult.entp;
    }
	else if(mbti == 'enfj'){
		cockId = 24;
        testResultInfo = testResult.enfj;
    }
	else if(mbti == 'enfp'){
		cockId = 25;
        testResultInfo = testResult.enfp;
    }

    return { mbti, cockId, testResultInfo };
}

export { selectTestResult };