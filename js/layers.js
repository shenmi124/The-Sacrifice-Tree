addLayer("s", {
    name: "sacrifice",
    symbol: "献祭",
    position: 1,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "red",
    requires:function(){
		let req = new Decimal(10)
		if(player.e.effect3.eq(1)){req = req.div(4)}
		if(player.e.effect3.eq(0)){req = req.mul(4)}
		if(hasUpgrade("s",13)){req = req.div(upgradeEffect("s",13))}
		return req
	},
    resource: "献祭点",
    baseResource: "血",
    baseAmount() {return player.points},
    type: "normal",
    exponent:function(){
		let exp = new Decimal(1)
		if(hasUpgrade("s",14)){exp = exp.add(upgradeEffect("s",14))}
		if(hasUpgrade("s",15)){exp = exp.add(upgradeEffect("s",15))}
		if(player.e.effect2.eq(1)){exp = exp.mul(2)}
		if(player.e.effect2.eq(0)){exp = exp.div(2)}
		if(player.e.effect8.eq(1)){exp = exp.mul(player.s.points.pow(0.001).pow(0.001).mul(0.22).add(1))}
		if(player.e.effect8.eq(0)){exp = exp.div(player.s.points.pow(0.001).pow(0.001).mul(0.22).add(1))}
		exp = exp.add(buyableEffect("s",12))
		return exp
	},
    gainMult() {
        mult = new Decimal(1)
        return mult
    },
    gainExp() {
        return new Decimal(1)
    },
    row: 1,
	update(diff) {
	},
    layerShown(){return true},
		doReset(resettingLayer) {
			let keep = [];
			if (layers[resettingLayer].row > this.row) layerDataReset("s", keep);
		},
	upgrades:{
		11:{
			title: "11 自我加强",
			description: "血提升血获取",
			cost:function(){
				let cost = new Decimal(1)
				if(player.e.effect5.eq(1)){cost = cost.div(3)}
				if(player.e.effect5.eq(0)){cost = cost.mul(3)}
				return cost
			},
			effect(){
				let eff = new Decimal.min(Decimal.max((player.points).pow(0.5).mul(0.47),1),85)
				if(player.e.effect4.eq(1)){eff = eff.mul(2)}
				if(player.e.effect4.eq(0)){eff = eff.div(2)}
				if(hasUpgrade("s",23)){eff = eff.mul(upgradeEffect("s",23))}
				eff = softcap(eff,new Decimal(100),0.1)
				return eff
			},
			effectDisplay() { return "*"+format(upgradeEffect(this.layer, this.id))+"血获取" },
			unlocked(){return true},
		},
		12:{
			title: "12 自刀",
			description: "血获取提升2.2倍",
			cost:function(){
				let cost = new Decimal(2)
				if(player.e.effect5.eq(1)){cost = cost.div(3)}
				if(player.e.effect5.eq(0)){cost = cost.mul(3)}
				return cost
			},
			effect(){
				let eff = new Decimal(2.2)
				if(player.e.effect4.eq(1)){eff = eff.mul(2)}
				if(player.e.effect4.eq(0)){eff = eff.div(2)}
				if(hasUpgrade("s",22)){eff = eff.mul(upgradeEffect("s",22))}
				return eff
			},
			effectDisplay() { return "*"+format(upgradeEffect(this.layer, this.id))+"血获取" },
			unlocked(){return true},
		},
		13:{
			title: "13 杀人",
			description: "献祭底数/2.2",
			cost:function(){
				let cost = new Decimal(3)
				if(player.e.effect5.eq(1)){cost = cost.div(3)}
				if(player.e.effect5.eq(0)){cost = cost.mul(3)}
				return cost
			},
			effect(){
				let eff = new Decimal(2.2)
				if(player.e.effect4.eq(1)){eff = eff.mul(2)}
				if(player.e.effect4.eq(0)){eff = eff.div(2)}
				if(hasUpgrade("s",23)){eff = eff.mul(upgradeEffect("s",23))}
				return eff
			},
			effectDisplay() { return "/"+format(upgradeEffect(this.layer, this.id))+"献祭底数" },
			unlocked(){return true},
		},
		14:{
			title: "14 被杀",
			description: "献祭指数+0.1",
			cost:function(){
				let cost = new Decimal(5)
				if(player.e.effect5.eq(1)){cost = cost.div(3)}
				if(player.e.effect5.eq(0)){cost = cost.mul(3)}
				return cost
			},
			effect(){
				let eff = new Decimal(0.1)
				if(player.e.effect4.eq(1)){eff = eff.mul(2)}
				if(player.e.effect4.eq(0)){eff = eff.div(2)}
				if(hasUpgrade("s",22)){eff = eff.mul(upgradeEffect("s",22))}
				return eff
			},
			effectDisplay() { return "+"+format(upgradeEffect(this.layer, this.id))+"献祭底数" },
			unlocked(){return true},
		},
		15:{
			title: "15 <em>自我献祭",
			description: "献祭根据献祭加强指数",
			cost:function(){
				let cost = new Decimal(8)
				if(player.e.effect5.eq(1)){cost = cost.div(3)}
				if(player.e.effect5.eq(0)){cost = cost.mul(3)}
				return cost
			},
			effect(){
				let eff = new Decimal.min((player.s.points).pow(0.55).pow(0.55).mul(0.01),1.85)
				if(player.e.effect4.eq(1)){eff = eff.mul(2)}
				if(player.e.effect4.eq(0)){eff = eff.div(2)}
				if(hasUpgrade("s",22)){eff = eff.mul(upgradeEffect("s",22))}
				eff = softcap(eff,new Decimal(1),0.1)
				return eff
			},
			effectDisplay() { return "+"+format(upgradeEffect(this.layer, this.id))+"献祭指数" },
			unlocked(){return true},
		},
		21:{
			title: "21 <em>自我献祭",
			description: "血根据献祭加强指数",
			cost:function(){
				let cost = new Decimal(8)
				if(player.e.effect5.eq(1)){cost = cost.div(3)}
				if(player.e.effect5.eq(0)){cost = cost.mul(3)}
				return cost
			},
			effect(){
				let eff = new Decimal.min((player.s.points).pow(0.35).pow(0.35).mul(0.003),1.85)
				if(player.e.effect4.eq(1)){eff = eff.mul(2)}
				if(player.e.effect4.eq(0)){eff = eff.div(2)}
				if(hasUpgrade("s",23)){eff = eff.mul(upgradeEffect("s",23))}
				eff = softcap(eff,new Decimal(1),0.1)
				return eff
			},
			effectDisplay() { return "+"+format(upgradeEffect(this.layer, this.id))+"献祭指数" },
			unlocked(){return true},
		},
		22:{
			title: "22 献祭献祭",
			description: "献祭加强12,14,15升级",
			cost:function(){
				let cost = new Decimal(4500)
				if(player.e.effect5.eq(1)){cost = cost.div(3)}
				if(player.e.effect5.eq(0)){cost = cost.mul(3)}
				return cost
			},
			effect(){
				let eff = new Decimal(1).add(Decimal.add(1).add(player.s.points).pow(0.018).log(9))
				if(player.e.effect4.eq(1)){eff = eff.mul(2)}
				if(player.e.effect4.eq(0)){eff = eff.div(2)}
				eff = softcap(eff,new Decimal(1.5),0.01)
				if(eff < 1){eff = new Decimal(1)}
				return eff
			},
			effectDisplay() { return "*"+format(upgradeEffect(this.layer, this.id))+"升级效果" },
			unlocked(){return true},
		},
		23:{
			title: "23 血液血液",
			description: "血加强11,13,21升级",
			cost:function(){
				let cost = new Decimal(4500)
				if(player.e.effect5.eq(1)){cost = cost.div(3)}
				if(player.e.effect5.eq(0)){cost = cost.mul(3)}
				return cost
			},
			effect(){
				let eff = new Decimal(1).add(Decimal.add(1).add(player.points).pow(0.012).log(7))
				if(player.e.effect4.eq(1)){eff = eff.mul(2)}
				if(player.e.effect4.eq(0)){eff = eff.div(2)}
				eff = softcap(eff,new Decimal(1.5),0.01)
				if(eff < 1){eff = new Decimal(1)}
				return eff
			},
			effectDisplay() { return "*"+format(upgradeEffect(this.layer, this.id))+"升级效果" },
			unlocked(){return true},
		},
		24:{
			title: "24 被迫",
			description: "献祭提升需求/10",
			cost:function(){
				let cost = new Decimal(50000)
				if(player.e.effect5.eq(1)){cost = cost.div(3)}
				if(player.e.effect5.eq(0)){cost = cost.mul(3)}
				return cost
			},
			effect(){
				let eff = new Decimal(1)
				if(hasUpgrade("s",24)){eff = new Decimal(10)}
				if(player.e.effect4.eq(1)){eff = eff.mul(2)}
				if(player.e.effect4.eq(0)){eff = eff.div(2)}
				return eff
			},
			effectDisplay() { return "/"+format(upgradeEffect(this.layer, this.id))+"献祭提升需求" },
			unlocked(){return true},
		},
		25:{
			title: "25 放弃",
			description: "血获取*1000",
			cost:function(){
				let cost = new Decimal(80000)
				if(player.e.effect5.eq(1)){cost = cost.div(3)}
				if(player.e.effect5.eq(0)){cost = cost.mul(3)}
				return cost
			},
			effect(){
				let eff = new Decimal(1000)
				if(player.e.effect4.eq(1)){eff = eff.mul(2)}
				if(player.e.effect4.eq(0)){eff = eff.div(2)}
				return eff
			},
			effectDisplay() { return "*"+format(upgradeEffect(this.layer, this.id))+"血获取" },
			unlocked(){return true},
		},
	},
	buyables:{
		11: {
			cost(x) { 
				return new Decimal(x).pow(Decimal.add(x).mul(0.45)).mul(0.198).div(Decimal.add(x).add(1).mul(1.1)).add(x).add(1)
			},
			title:"血增益",
			display() { 
				let start = "增加血获取<br><br>"+"需要:"+format(this.cost(),0)+"献祭<br>目前数量:"+format(getBuyableAmount(this.layer, this.id),0)+"个<br>"
				let effect =  "目前效果:<br>*"+format(buyableEffect(this.layer, this.id))+"血获取<br>"
				return start + effect
			},
			canAfford() { return player[this.layer].points.gte(this.cost()) },
			buy() {
				player[this.layer].points = player[this.layer].points.sub(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
			effect(x) {
				let eff = new Decimal.max(Decimal.add(2).pow(x).div(Decimal.add(x).mul(3).add(1)),1)
				if(player.e.effect9.eq(1)){eff = eff.pow(1.2)}
				if(player.e.effect9.eq(0)){eff = eff.pow(0.8)}
				eff = softcap(eff,new Decimal(5),0.1)
				eff = softcap(eff,new Decimal(50),0.01)
				eff = softcap(eff,new Decimal(500),0.001)
				return eff
			},
			unlocked(){return true},
		},
		12: {
			cost(x) { 
				return new Decimal(x).pow(x).mul(0.098).add(1).div(Decimal.add(x).add(1).mul(1.1)).add(x).add(1)
			},
			title:"献祭增益",
			display() { 
				let start = "增加献祭获取指数<br><br>"+"需要:"+format(this.cost(),0)+"献祭<br>目前数量:"+format(getBuyableAmount(this.layer, this.id),0)+"个<br>"
				let effect =  "目前效果:<br>+"+format(buyableEffect(this.layer, this.id))+"献祭基础<br>"
				return start + effect
			},
			canAfford() { return player[this.layer].points.gte(this.cost()) },
			buy() {
				player[this.layer].points = player[this.layer].points.sub(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
			effect(x) {
				let eff = new Decimal(x).mul(0.001)
				if(player.e.effect9.eq(1)){eff = eff.pow(1.2)}
				if(player.e.effect9.eq(0)){eff = eff.pow(0.8)}
				return eff
			},
			unlocked(){return true},
		},
	},
	clickables:{
		1000:{
			title() {return `阶级晋升</s><br><em>献祭</em>`},
			display() {return `<h3>当你凝视深渊,深渊也在凝视你`},
			canClick(){return player.e.effect6.eq(1) ? player.s.points.mul(upgradeEffect("s",24)).gte(10000) : player.s.points.mul(upgradeEffect("s",24)).gte(1000000)},
			unlocked(){return player.e.sacrifice.eq(0)},
			onClick(){
				player.e.stage = player.e.stage.sub(1)
				player.e.sacrifice = new Decimal(1)
				return
			},
		},
		1:{
			title(){return player.e.effect1.eq(1) ? `<em>献祭</em>` : `<em class="red">献祭</em>`},
			display() {return player.e.effect1.eq(1) ? "<s>血生产*8" : `<em class="red">血生产/8`},
			canClick(){return player.e.effect1.eq(1)},
			unlocked(){return player.e.sacrifice.eq(1)},
			onClick(){
				player.e.effect1 = new Decimal(0)
				player.e.sacrifice = new Decimal(0)
				layerDataReset("s")
				player.points = new Decimal(0)
				return
			},
		},
		2:{
			title(){return player.e.effect2.eq(1) ? `<em>献祭</em>` : `<em class="red">献祭</em>`},
			display() {return player.e.effect2.eq(1) ? "<s>献祭指数*2" : `<em class="red">献祭指数/2`},
			canClick(){return player.e.effect2.eq(1)},
			unlocked(){return player.e.sacrifice.eq(1)},
			onClick(){
				player.e.effect2 = new Decimal(0)
				player.e.sacrifice = new Decimal(0)
				layerDataReset("s")
				player.points = new Decimal(0)
				return
			},
		},
		3:{
			title(){return player.e.effect3.eq(1) ? `<em>献祭</em>` : `<em class="red">献祭</em>`},
			display() {return player.e.effect3.eq(1) ? "<s>献祭底数/4" : `<em class="red">献祭底数*4`},
			canClick(){return player.e.effect3.eq(1)},
			unlocked(){return player.e.sacrifice.eq(1)},
			onClick(){
				player.e.effect3 = new Decimal(0)
				player.e.sacrifice = new Decimal(0)
				layerDataReset("s")
				player.points = new Decimal(0)
				return
			},
		},
		4:{
			title(){return player.e.effect4.eq(1) ? `<em>献祭</em>` : `<em class="red">献祭</em>`},
			display() {return player.e.effect4.eq(1) ? "<s>升级效果*2" : `<em class="red">升级效果/2`},
			canClick(){return player.e.effect4.eq(1)},
			unlocked(){return player.e.sacrifice.eq(1)},
			onClick(){
				player.e.effect4 = new Decimal(0)
				player.e.sacrifice = new Decimal(0)
				layerDataReset("s")
				player.points = new Decimal(0)
				return
			},
		},
		5:{
			title(){return player.e.effect5.eq(1) ? `<em>献祭</em>` : `<em class="red">献祭</em>`},
			display() {return player.e.effect5.eq(1) ? "<s>升级消耗/3" : `<em class="red">升级消耗*3`},
			canClick(){return player.e.effect5.eq(1)},
			unlocked(){return player.e.sacrifice.eq(1)},
			onClick(){
				player.e.effect5 = new Decimal(0)
				player.e.sacrifice = new Decimal(0)
				layerDataReset("s")
				player.points = new Decimal(0)
				return
			},
		},
		6:{
			title(){return player.e.effect6.eq(1) ? `<em>献祭</em>` : `<em class="red">献祭</em>`},
			display() {return player.e.effect6.eq(1) ? "<s>阶级需求/10" : `<em class="red">阶级需求*10`},
			canClick(){return player.e.effect6.eq(1)},
			unlocked(){return player.e.sacrifice.eq(1)},
			onClick(){
				player.e.effect6 = new Decimal(0)
				player.e.sacrifice = new Decimal(0)
				layerDataReset("s")
				player.points = new Decimal(0)
				return
			},
		},
		7:{
			title(){return player.e.effect7.eq(1) ? `<em>献祭</em>` : `<em class="red">献祭</em>`},
			display() {return player.e.effect7.eq(1) ? "<s>血根据血提升产量" : `<em class="red">血根据血降低产量`},
			canClick(){return player.e.effect7.eq(1)},
			unlocked(){return player.e.sacrifice.eq(1)},
			onClick(){
				player.e.effect7 = new Decimal(0)
				player.e.sacrifice = new Decimal(0)
				layerDataReset("s")
				player.points = new Decimal(0)
				return
			},
		},
		8:{
			title(){return player.e.effect8.eq(1) ? `<em>献祭</em>` : `<em class="red">献祭</em>`},
			display() {return player.e.effect8.eq(1) ? "<s>献祭根据献祭提升指数" : `<em class="red">献祭根据献祭提升指数`},
			canClick(){return player.e.effect8.eq(1)},
			unlocked(){return player.e.sacrifice.eq(1)},
			onClick(){
				player.e.effect8 = new Decimal(0)
				player.e.sacrifice = new Decimal(0)
				layerDataReset("s")
				player.points = new Decimal(0)
				return
			},
		},
		9:{
			title(){return player.e.effect9.eq(1) ? `<em>献祭</em>` : `<em class="red">献祭</em>`},
			display() {return player.e.effect9.eq(1) ? "<s>血购买项效果指数+0.2" : `<em class="red">血购买项效果指数-0.2`},
			canClick(){return player.e.effect9.eq(1)},
			unlocked(){return player.e.sacrifice.eq(1)},
			onClick(){
				player.e.effect9 = new Decimal(0)
				player.e.sacrifice = new Decimal(0)
				layerDataReset("s")
				player.points = new Decimal(0)
				return
			},
		},
	},
	tabFormat: {
		"blood":{
			content:[
			"main-display",
			"prestige-button",
			"blank",
			"blank",
			"upgrades",
			"blank",
			"buyables",
			],
		},
		"sacrifice":{
			content:[
			"blank",
			['display-text',function(){return player.e.effect6.eq(1) ? `<h3>获得 <h3 class="red">`+format(Decimal.add(10000).div(upgradeEffect("s",24)),0)+`</h3>  献祭点跳转到下一阶级<br></h3><h6>你还有 `+format(player.e.stage,0)+` 阶级来赢得游戏</h6>` : `<h3>获得 <h3 class="red">`+format(Decimal.add(1000000).div(upgradeEffect("s",24)),0)+`</h3>  献祭点跳转到下一阶级<br></h3><h6>你还有 `+format(player.e.stage,0)+` 阶级来赢得游戏</h6>`}],
			"blank",
			"blank",
			"blank",
			["row", [["clickable", 1000]]],
			["row", [["clickable", 1],["clickable", 2],["clickable", 3]]],
			["row", [["clickable", 4],["clickable", 5],["clickable", 6]]],
			["row", [["clickable", 7],["clickable", 8],["clickable", 9]]],
			],
		},
		"effect":{
			content:[
			['display-text',function(){return player.e.effect1.eq(1) ? `<h4>血生产*8</h4>` : `<h3 class="red"><em>血生产/8`}],
			['display-text',function(){return player.e.effect2.eq(1) ? `<h4>献祭指数*2</h4>` : `<h3 class="red"><em>献祭指数/2`}],
			['display-text',function(){return player.e.effect3.eq(1) ? `<h4>献祭底数/4</h4>` : `<h3 class="red"><em>献祭底数*4`}],
			['display-text',function(){return player.e.effect4.eq(1) ? `<h4>升级效果*2</h4>` : `<h3 class="red"><em>升级效果/2`}],
			['display-text',function(){return player.e.effect5.eq(1) ? `<h4>升级消耗/3</h4>` : `<h3 class="red"><em>升级消耗*3`}],
			['display-text',function(){return player.e.effect6.eq(1) ? `<h4>阶级需求/10</h4>` : `<h3 class="red"><em>阶级需求*10`}],
			['display-text',function(){return player.e.effect7.eq(1) ? `<h4>血根据血提升产量</h4>` : `<h3 class="red"><em>血根据血降低产量`}],
			['display-text',function(){return player.e.effect8.eq(1) ? `<h4>献祭根据献祭提升指数</h4>` : `<h3 class="red"><em>献祭根据献祭降低指数`}],
			['display-text',function(){return player.e.effect9.eq(1) ? `<h4>血购买项效果指数+0.2</h4>` : `<h3 class="red"><em>血购买项效果指数-0.2`}],
			],
		},
	},
})

addLayer("e", {
    name: "effect",
    symbol: "效果",
    position: 1,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
		effect1: new Decimal(1),//血生产*10
		effect2: new Decimal(1),//献祭指数*3
		effect3: new Decimal(1),//献祭底数/5
		effect4: new Decimal(1),//升级效果*2
		effect5: new Decimal(1),//升级消耗/3
		effect6: new Decimal(1),//阶级需求/10
		effect7: new Decimal(1),//血根据血提升产量
		effect8: new Decimal(1),//献祭根据献祭提升指数
		effect9: new Decimal(1),//血购买项效果指数+0.2
		stagecost: new Decimal(10000),
		sacrifice: new Decimal(0),
		stage: new Decimal(9),
    }},
    color: "red",
    type: "none",
    row: 2,
	update(diff) {
	},
    layerShown(){return false},
})