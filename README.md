# yonder

Yonder is a very simple engine for creating choose-your-own-adventure games, written in a few hundred lines of javascript. You write your story by constructing a javascript object with the text of your story, and javascript functions for scripting the game logic.

A story object looks like this:

```js
stages["start"] = {
	start: {
		setup: function(thisScene, global) {/* function to setup the scene*/},
		text: "description of the scene",
		choices: [
			{
				text: "choice 1",
				action: function(global) {
					// ...
					return "scene2"
				}
			}, {
				text: "choice 2",
				action: function(global) {
					// ...
					return "scene3"
				}
			}
		]
	},
	scene2: {
		// ...
	},
	scene3: {
		// ...
	}
}
```
The story object is organizes into a number of statges that each have one or more scenes. A scene describe one page of description and choices. How the scenes are organozed into stages are upto you, the writer, to decide on. You can for example have a stage for each location  and/or for each time period of the story. 

The information in a scene is contained in that scene. If you want save data across scenes you should put them in the "global" object. Also all data in the global object will be saved when you save the game. As you can see above, the setup and action function will get passed the global object as a parameter. From the start the glopal object is empty.

You write the story and the game logic in a javascript file that is imported into the engine by a script tag. Because you can use all of javascript to script your game and interact with the scene and game object, you can do some powerful stuff. The downside is that there is not much safety. If you do something wrong you may not get a nice error message.

To use yonder it is recommended you know some javascript.

## Make your story

First make an empty javascript file. You can call it what you want. In start.html find `<script src="story.js"></script>` and change the "src" to load your story file. If you want to split your story into multiple files, you can just list multiple script tag here with your files.

### Init function

Before anything else the engine will call a function named "init" in your story script, So start by adding this to your script:

```js
function init(gloabl) {
	// initialize global object here
}
```
The init function will be passed the global object as a argument. The engine does not use the global object for anything - it is only for data you want to keep track of. In the init function the global object is empty, so you can populate it as you want. 
