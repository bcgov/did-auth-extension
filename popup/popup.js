var api = typeof browser == 'object' ? browser : chrome;

function onRadioClick1() {

	api.storage.local.set({ 'didnr': 0 });
}

function onRadioClick2() {

	api.storage.local.set({ 'didnr': 1 });
}

function onRadioClick3() {

	api.storage.local.set({ 'didnr': 2 });
}

function onCheckBoxClick1() {

	var vc1 = document.getElementById("vc1");
	api.storage.local.set({ 'vc1': vc1.checked });
}

function onCheckboxClick2() {

	var vc2 = document.getElementById("vc2");
	api.storage.local.set({ 'vc2': vc2.checked });
}

window.addEventListener("load", init, false);

function init() {

	var did1 = document.getElementById("did1");
	var did2 = document.getElementById("did2");
	var did3 = document.getElementById("did3");
	var vc1 = document.getElementById("vc1");
	var vc2 = document.getElementById("vc2");
	did1.addEventListener("click", onRadioClick1, false);
	did2.addEventListener("click", onRadioClick2, false);
	did3.addEventListener("click", onRadioClick3, false);
	vc1.addEventListener("click", onCheckBoxClick1, false);
	vc2.addEventListener("click", onCheckboxClick2, false);

	api.storage.local.get('didnr').then(function(value) {

		if (value.didnr == 0) did1.checked = true; else did1.checked = false;
		if (value.didnr == 1) did2.checked = true; else did2.checked = false;
		if (value.didnr == 2) did3.checked = true; else did3.checked = false;
	});

	api.storage.local.get('vc1').then(function(value) {

		if (value.vc1 === true) vc1.checked = true; else vc2.checked = false;
	});

	api.storage.local.get('vc2').then(function(value) {

		if (value.vc2 === true) vc2.checked = true; else vc2.checked = false;
	});
};
