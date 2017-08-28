/*
* setup, is a function that is run before anything is displayed
* title, is the title that is shown on the page
* text, is the text that is shown on the page
* choices.display, can be "none", "disabled" and otherwise
* choices.text, is the link text
* choices.action, is a function that is executed when that action is taken.
*/

function init(global) {
	global["you"] = {
		name: "Medory",
		sex: "?",
		class: "?",

		stealth: 0,
		combat: 0,
		talk: 0,

		gold: 500,
		health: 10
	}
}

function renderStats(global) {
	var y = global["you"];
	var html =
	'<b>Info</b>' +
	'<ul>' +
	 '<li>Name: '+y.name+'</li>' +
	 '<li>Sex: '+y.sex+'</li>' +
	 '<li>class: '+y.class+'</li>' +
	'</ul>' +
	'<b>Stats</b>' +
	'<ul>' +
	 '<li>stealth: '+y.stealth+'</li>' +
	 '<li>combat: '+y.combat+'</li>' +
	 '<li>talk: '+y.talk+'</li>' +
	'</ul>' +
	'<ul>' +
	 '<li>gold: '+y.gold+'</li>' +
	 '<li>health: '+y.health+'</li>' +
	'</ul>';

	return html;
}


function check(ability, difficulty) {
	var diff = {
		hard: 1,
		moderate: 2,
		easy:3
	}

	var d = diff[difficulty];
	for(var i=0; i<d; i++) {
		var r = Math.floor((Math.random() * 10)+1);
		if(r < ability) {
			return true;
		}
	}
	return false;
}

function statInc(val) {
	if(val >= 10) {
		return 10;
	}
	if(val >= 7) {
		return val + 1;
	}
	return val + 2;
}

function statIncNum(val) {
	if(val >= 10) {
		return 0;
	}
	if(val >= 7) {
		return 1;
	}
	return 2;
}

stages["start"] = {
	start: {
		setup: function(thisScene, global) {/* Do setup here */},
		title: "Start",
		text: "Your king have asked you to find the hero sword. He want to use it to conquer the neighboring country to stop their raids on your farms. As one of the king's most trusted people you will go to the <i>Bone Desert</i> to find it.\nWhat is your function in the king's court:",
		choices: [
			{
				text: "I am a warrior",
				action: function(global) {
					global.you.class = "warrior";
					global.you.combat = 8;
					global.you.stealth = 5;
					global.you.talk = 5;
					return "trainig";
				}
			},
			{
				text: "I am a spy",
				action: function(global) {
					global.you.class = "spy";
					global.you.combat = 5;
					global.you.stealth = 8;
					global.you.talk = 5;
					return "trainig";
				}
			},
			{
				text: "I am a diplomat",
				action: function(global) {
					global.you.class = "diplomat";
					global.you.combat = 5;
					global.you.stealth = 5;
					global.you.talk = 8;
					return "trainig";
				}
			}
		]
	},
	trainig: {
		setup: function(scene, g) {
			var c = scene.choices
			c[0].text = c[0].text + " (increase "+ statIncNum(g.you.combat)+")";
			c[1].text = c[1].text + " (increase "+ statIncNum(g.you.stealth)+")";
			c[2].text = c[2].text + " (increase "+ statIncNum(g.you.talk)+")";
		},
		title: "Extra training",
		text: "You are the kings trusted ${you.class}.\n<b>Your stats are:</b><br>Combat: ${you.combat}<br>Talk: ${you.talk}<br>stealth: ${you.stealth} \nYou have the change to do some extra training",
		choices: [
			{
				text: "Train combat",
				action: function(global) {
					global.you.combat = statInc(global.you.combat);
					return "choose_sex";
				}
			},
			{
				text: "Train stealth",
				action: function(global) {
					global.you.stealth = statInc(global.you.stealth);
					return "choose_sex";
				}
			},
			{
				text: "Train talking",
				action: function(global) {
					global.you.talk = statInc(global.you.talk);
					return "choose_sex";
				}
			}
		]
	},
	choose_sex: {
		title: "Choose sex",
		text: "What is your sex?",
		choices: [
			{
				text: "male",
				action: function(g) {
					g.you.sex = "male";
					return "start_adventure";
				}
			},
			{
				text: "female",
				action: function(g) {
					g.you.sex = "female";
					return "start_adventure";
				}
			}
		]
	},
	start_adventure: {
		title: "Start the adventure",
		text: "<b>Your current stats are:</b><br>Sex: ${you.sex}<br>Combat: ${you.combat}<br>Talk: ${you.talk}<br>stealth: ${you.stealth} \nYou choose to go directly south, which is the shortest way to the desert. After you have traveled a day you come to the <i>Talking Forest</i>. Normally you would have a handful of guards when you go through the forest because a lot of robbers have base there, but his time you are on your own.",
		choices: [
			{
				text: "Continue into the forest",
				action: function(global) {
					global.you.class = "warrior";
					return ["talking_forest", "into_the_forest"];
				}
			}
		]
	}
}

stages["talking_forest"] = {
	into_the_forest : {
		title: "In the forest",
		text: "In the beginning it is nice to walk between the trees, but then you begin to feel uneasy. You try to stay as quiet as possible. Then you hear voices to the east, deep among the trees. You can not hear what they say but there is definitely someone there, and for what you know about the forest, it is probably not nice people.\nWhat do you do:",
		choices: [
			{
				text: "Sneak past, and get on my way (stealth: easy)",
				action: function(global) {
					if(check(global.you.stealth, "easy")) {
						return "sneak_past_success";
					} else {
						return "sneak_past_failure";
					}
				}
			},
			{
				text: "Sneak in between the trees to see who they are (stealth: moderate)",
				action: function(global) {
					if(check(global.you.stealth, "moderate")) {
						return "sneak_near_success";
					} else {
						return "sneak_near_failure";
					}
				}
			},
			{
				text: "Shout out to them to get them to show themself",
				action: function() {

				}
			}
		]
	},
	sneak_past_success: {
		title: "You sneak past unnotices",
		text: "You walk quiretly along the path. You can hear the voices near you, but they do not notice you it does not take long before you are past whomever they where",
		choices: [
			{
				text: "Continue through the forest",
				action: function() {
					return ["marsh_land", "entry"];
				}
			}
		]
	},
	sneak_past_failure: {
		title: "You try to sneak past",
		text: "You try to be as quiretly at possible, but it is not good enought. ",
		choices: [
			{
				text: "bla",
				action: function() {
					return "out_of_the_forest";
				}
			}
		]
	},
	sneak_near_success: {
		title: "Get closer",
		text: "You sneak closer with great care. You manage to get unnoticed up behind the people who are walking deeper into the forest. When you see them you are not in any doubt they are bandits. They stop for a moment to check one of their hideouts. You hide behind a tree, and now you can hear what they are tallking about.\n'... I wish we could get a catch like yesterday again. Then we don't have to do anything for a year with all that treasure', the first one say.\n'Don't get your hopes up. It is not every day a noble caravan come through the forest with only two guards. '",
		choices: [
			{
				text: "bla",
				action: function() {
					return "out_of_the_forest";
				}
			}
		]
	},
	sneak_near_failure: {
		title: "Get closer - failure",
		text: "You sneak closer, but not good enough",
		choices: [
			{
				text: "bla",
				action: function() {
					return "out_of_the_forest";
				}
			}
		]
	}
};

stages["marsh_land"] = {
	entry : {
		title: "The old ruin",
		text: "You get out of the forest and into a marsh land covered in white mist. You follow the safe path ",
		choices: [
			{
				text: "look around",
				action: function() {

				}
			}
		]
	}
};
