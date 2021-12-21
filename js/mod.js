let modInfo = {
	name: "献祭树 - The Sarifice tree",
	id: "SarificeTree9effect",
	author: "辉影神秘",
	pointsName: "血",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1,
}

// Set your version in num and name
let VERSION = {
	num: "9 effect",
	name: "献祭",
}

let changelog = `<h3  class="red">你的更新日志被献祭了`

let winText = `<h1  class="red">很好,下一个献祭的是?你...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	if(player.e.effect1.eq(1)){gain = gain.mul(8)}
	if(player.e.effect1.eq(0)){gain = gain.div(8)}
	if(player.e.effect7.eq(1)){gain = gain.mul(player.points.pow(0.002).mul(0.68).add(1))}
	if(player.e.effect7.eq(0)){gain = gain.div(player.points.pow(0.002).mul(0.68).add(1))}
	if(hasUpgrade("s",11)){gain = gain.mul(upgradeEffect("s",11))}
	if(hasUpgrade("s",12)){gain = gain.mul(upgradeEffect("s",12))}
	if(hasUpgrade("s",25)){gain = gain.mul(upgradeEffect("s",25))}
	gain = gain.mul(buyableEffect("s",11))
	if(hasUpgrade("s",21)){gain = gain.pow(upgradeEffect("s",21).add(1))}
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.e.stage.eq(new Decimal("0"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}