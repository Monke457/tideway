var pop = document.getElementById("pop");
var popVal = document.getElementById("popVal");
var rain = document.getElementById("rain");
var rainVal = document.getElementById("rainVal");
var pore = document.getElementById("pore");
var poreVal = document.getElementById("poreVal");
var totalB = document.getElementById("totalB");
var overB = document.getElementById("overB");
var stormB = document.getElementById("stormB");
var stormT = document.getElementById("stormT");
var wasteB = document.getElementById("wasteB");
var wasteT = document.getElementById("wasteT");
var rDef = document.getElementById("rDef");

var catchment = 1572000000 * 0.3;

popVal.innerHTML = (pop.value * 0.2).toFixed(1);
rainVal.innerHTML = (rain.value * 0.5).toFixed(1);
poreVal.innerHTML = pore.value;

var capacity = 426730000;
var capacityNew = capacity + 1600000000;
var popLiter = pop.value * 0.2 * 9375000;
var rainLiter = rain.value * 0.5 * catchment * ((100 - pore.value) / 100);

total.innerHTML = display(popLiter + rainLiter);
overB.innerHTML = display(Math.abs(capacity - (popLiter + rainLiter)));

calcStorm((popLiter + rainLiter), (Math.abs(capacity - (popLiter + rainLiter))), 0);
calcWaste((popLiter + rainLiter), (Math.abs(capacity - (popLiter + rainLiter))), 0);

pop.oninput = function() {
    p = this.value * 0.2;
	popVal.innerHTML = p.toFixed(1);
	tot = parseInt(p * 9375000 + (rain.value * 0.5 * catchment * ((100 - pore.value) / 100)));
	total.innerHTML = display(tot);

    overflowB = calcOverflowB(tot);
    overflowT = calcOverflowT(tot);

    overB.innerHTML = display(overflowB);
    overT.innerHTML = display(overflowT);

    calcStorm(tot, overflowB, overflowT);
    calcWaste(tot, overflowB, overflowT);
}

rain.oninput = function() {
    r = this.value * 0.5;
    rainLabel(r);
    rainVal.innerHTML = r;
    tot = parseInt((r * catchment * ((100 - pore.value) / 100)) + (pop.value * 0.2 * 9375000));
    total.innerHTML = display(tot);

    overflowB = calcOverflowB(tot);
    overflowT = calcOverflowT(tot);

    overB.innerHTML = display(overflowB);
    overT.innerHTML = display(overflowT);

    calcStorm(tot, overflowB, overflowT);
    calcWaste(tot, overflowB, overflowT);
}

pore.oninput = function() {
	poreVal.innerHTML = this.value;
	tot = parseInt(rain.value * 0.5 * catchment * ((100 - this.value) / 100) + (pop.value * 0.2 * 9375000));
	total.innerHTML = display(tot);

	overflowB = calcOverflowB(tot);
    overflowT = calcOverflowT(tot);

    overB.innerHTML = display(overflowB);
    overT.innerHTML = display(overflowT);

	calcStorm(tot, overflowB, overflowT);
    calcWaste(tot, overflowB, overflowT);
}

function rainLabel(n) {
    if(n < 50) {
        rDef.innerHTML = "schwerer Regenguss";
        if(n < 12) {
            rDef.innerHTML = "sehr starker Regen";
            if(n < 8) {
                rDef.innerHTML = "starker Regen";
                if(n < 4) {
                    rDef.innerHTML = "mässiger Regen";
                    if(n < 0.5) {
                        rDef.innerHTML = "leichter Regen";
                        if(n == 0) {
                            rDef.innerHTML = "kein Regen";
                        }
                    }
                }
            }
        }
    } else {
        rDef.innerHTML = "heftiger Regenguss";
    }
}

function calcStorm(tot, b, t) {
    r = rain.value * 0.5 * catchment * ((100 - pore.value) / 100);
    stormB.innerHTML = 0;
    stormT.innerHTML = 0;
    if(tot > capacity) {
        stormB.innerHTML = display((b * (r / tot)).toFixed(0)) + " (" + (r / tot * 100).toFixed(1) + "%)";
    }
    if(tot > capacityNew) {
        stormT.innerHTML = display((t * (r / tot)).toFixed(0)) + " (" + (r / tot * 100).toFixed(1) + "%)";
    }
}

function calcWaste(tot, b, t) {
	p = pop.value * 0.2 * 9375000;
    wasteB.innerHTML = 0;
    wasteT.innerHTML = 0;
    if(tot > capacity) {
        wasteB.innerHTML = display((b * (p / tot)).toFixed(0)) + " (" + (p / tot * 100).toFixed(1) + "%)";
    }
    if(tot > capacityNew) {
        wasteT.innerHTML = display((t * (p / tot)).toFixed(0)) + " (" + (p / tot * 100).toFixed(1) + "%)";
    }
}

function calcOverflowB(tot) {
    var overflow = 0;
    if(tot > capacity) {
        overflow += Math.abs(capacity - tot);
    }
    return overflow;
}

function calcOverflowT(tot) {
    var overflow = 0;
    if(tot > capacityNew) {
        overflow += Math.abs(capacityNew - tot);
    }
    return overflow;
}

function display(n) {
	len = n.toString().length;
	suff = "";
	if(len > 6) {
		suff = " Mio.";
		if(len > 9) {
			n = n/1000;
			suff = " Mia.";
		}
		n = (n/1000000).toFixed(2);
	}
	return n + suff;
}
