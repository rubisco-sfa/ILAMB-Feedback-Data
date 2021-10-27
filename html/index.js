Survey
    .StylesManager
    .applyTheme("modern");

var total_time = 0;
setInterval(myTimer, 1000);
function myTimer() {
    total_time += 1;
}

var num_questions = 20;
var imgs = ["gpp_bcc-csm1-1.png","gpp_BCC-CSM2-MR.png","gpp_CanESM2.png","gpp_CanESM5.png","gpp_CESM1-BGC.png","gpp_CESM2.png","gpp_GFDL-ESM2G.png","gpp_GFDL-ESM4.png","gpp_IPSL-CM5A-LR.png","gpp_IPSL-CM6A-LR.png","gpp_MeanCMIP5.png","gpp_MeanCMIP6.png","gpp_MIROC-ESM.png","gpp_MIROC-ESM2L.png","gpp_MPI-ESM-LR.png","gpp_MPI-ESM1.2-LR.png","gpp_NorESM1-ME.png","gpp_NorESM2-LM.png","gpp_UK-HadGEM2-ES.png","gpp_UKESM1-0-LL.png","hfss_bcc-csm1-1.png","hfss_BCC-CSM2-MR.png","hfss_CanESM2.png","hfss_CanESM5.png","hfss_CESM1-BGC.png","hfss_CESM2.png","hfss_GFDL-ESM2G.png","hfss_GFDL-ESM4.png","hfss_IPSL-CM5A-LR.png","hfss_IPSL-CM6A-LR.png","hfss_MeanCMIP5.png","hfss_MeanCMIP6.png","hfss_MIROC-ESM.png","hfss_MIROC-ESM2L.png","hfss_MPI-ESM-LR.png","hfss_MPI-ESM1.2-LR.png","hfss_NorESM1-ME.png","hfss_NorESM2-LM.png","hfss_UK-HadGEM2-ES.png","hfss_UKESM1-0-LL.png","tas_bcc-csm1-1.png","tas_BCC-CSM2-MR.png","tas_CanESM2.png","tas_CanESM5.png","tas_CESM1-BGC.png","tas_CESM2.png","tas_GFDL-ESM2G.png","tas_GFDL-ESM4.png","tas_IPSL-CM5A-LR.png","tas_IPSL-CM6A-LR.png","tas_MeanCMIP5.png","tas_MeanCMIP6.png","tas_MIROC-ESM.png","tas_MIROC-ESM2L.png","tas_MPI-ESM-LR.png","tas_MPI-ESM1.2-LR.png","tas_NorESM1-ME.png","tas_NorESM2-LM.png","tas_UK-HadGEM2-ES.png","tas_UKESM1-0-LL.png"];
var b = [0.238398,0.023313,0.060080,0.730258,0.379408,0.054223,1.260268,0.176618,1.179687,0.110926,0.574045,0.129020,0.395970,0.011143,1.359974,0.724827,0.386171,0.082802,0.601991,0.386968,1.993613,2.316083,0.257161,8.789989,9.070770,1.851282,11.056122,13.048542,2.378710,5.962783,4.938938,6.519378,1.757786,15.904000,6.063304,2.431458,9.739746,2.305719,6.646531,8.185110,0.349840,0.405627,0.636276,0.143252,0.259818,0.845833,0.821724,0.902607,1.145594,1.284204,0.411704,0.102076,0.686551,1.203626,0.043556,0.240517,1.308410,0.700234,1.057988,1.118262];
var bs = [0.483930,0.479008,0.387891,0.449369,0.425939,0.457762,0.376755,0.495428,0.326719,0.547139,0.493713,0.571736,0.462772,0.408651,0.402253,0.408812,0.387213,0.443321,0.389085,0.436139,0.523909,0.529615,0.555949,0.511856,0.554260,0.620040,0.486125,0.490338,0.469625,0.612361,0.594592,0.617259,0.494925,0.424667,0.465396,0.464418,0.515820,0.621445,0.556381,0.561951,0.678781,0.715207,0.668865,0.677094,0.687950,0.727436,0.660794,0.694076,0.649822,0.661289,0.718648,0.764464,0.646614,0.648616,0.708719,0.685228,0.629330,0.693471,0.682015,0.686776];
var num_models = imgs.length/3;

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var elements = [];
var q;
for (q=0; q<num_questions; q++){
    i1 = randomIntFromInterval(0,num_models-1);
    i2 = randomIntFromInterval(0,num_models-1);
    while(i1==i2){
	i2 = randomIntFromInterval(0,num_models-1);
    }
    i3 = randomIntFromInterval(0,2);
    A = i3*num_models+i1;
    B = i3*num_models+i2;
    elements.push({
        "type": "imagepicker",
        "name": "q" + q,
        "title": " ",
	"imageWidth": 750,
	"imageHeight":488,
        "choices": [
            {
                "value": A,
                "imageLink": imgs[A]
            }, {
                "value": B,
                "imageLink": imgs[B]
            }
        ]
    })
};

var json = {
    "elements": elements
};

window.survey = new Survey.Model(json);

survey
    .onComplete
    .add(function (result) {
	var num_questions_answered = 0;
	var num_bias_right = 0;
	var num_score_right = 0;
	var str = ""
	for (var prop in result.data) {
	    var q = parseInt(prop.replace("q",""));
	    var choice = result.data[prop];
	    var other = json.elements[q]["choices"][0]["value"];
	    if(other == choice){
		var other = json.elements[q]["choices"][1]["value"];
	    }
	    str = str + " " + json.elements[q]["choices"][0]["value"];
	    str = str + " " + json.elements[q]["choices"][1]["value"];
	    str = str + " " + choice;
	    if(b[choice] < b[other]) num_bias_right += 1;
	    if(bs[choice] > bs[other]) num_score_right += 1;
	    num_questions_answered += 1;
	}

	var num_bias_right  = Math.round(num_bias_right /num_questions_answered*100.0);
	var num_score_right = Math.round(num_score_right/num_questions_answered*100.0);

	$.ajax({
		type: 'POST',
		url: "write_line.php",
		dataType: "json",
		data: {line: str + " " + num_bias_right + " " + num_score_right + " " + total_time + '\n'},
		success:function(result){
		    console.log(result.status);
		}
	    });
	
	var str = "Thanks for your help in making ILAMB better. The pairs you evaluated were given to you at random from 20 different models. You may reload this page and take the quiz as many times as you like.\n\n";
	str = str + "Percentage Bias Correct: " + num_bias_right + "%\n";
        str = str + "In ILAMB we provide a globally integrated bias. This percentage reflects the fraction of model pairs in which your choice matched the model with the lower absolute globally integrated bias.\n\n";
	str = str + "Percentage Bias Score Correct: " + num_score_right + "%\n";
        str = str + "In ILAMB we also score the bias and provide a globally integrated bias score. This percentage reflects the fraction of model pairs in which your choice matched the model with the higher globally integrated bias score.";
        document
            .querySelector('#surveyResult')
            .textContent = str

    });

$("#surveyElement").Survey({model: survey});
