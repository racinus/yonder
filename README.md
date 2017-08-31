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
There are some other elements here like the global game object you also have to specify yourself, which will be explained later.

You write the story and the game logic in a javascript file that is imported into the engine by a script tag. Because you can use all of javascript to script your game and interact with the scene and game object, you can do some powerful stuff. The downside is that there is not much safety. If you do something wrong you may not get a nice error message.

To use yonder it is recommended you know some javascript.

## Make your story

More to come here...
