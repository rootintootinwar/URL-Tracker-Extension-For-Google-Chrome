let myleads = []
const inputbox = document.getElementById("inputt")
const savebtn = document.getElementById("save")
const savetbbtn = document.getElementById("savetb")
const deletebtn = document.getElementById("delete")
const ul = document.getElementById("ule")
const leadsfromLS = JSON.parse(localStorage.getItem("myleads"))

if(leadsfromLS){
	myleads = leadsfromLS
	render(myleads)
}

function render(leads){
	let listItems = ""
	for (var i = 0; i < leads.length; i++) {
		listItems += `
			<li>
				<a target='_blank' href='${leads[i]}'>
					${leads[i]}
				</a>
			</li>
			`
	}
	ul.innerHTML = listItems
}

savebtn.addEventListener("click",function(){
	myleads.push(inputbox.value)
	inputbox.value = ""
	localStorage.setItem("myleads",JSON.stringify(myleads))
	render(myleads)
})

savetbbtn.addEventListener("click",function(){
	chrome.tabs.query({active: true, currentWindow: true},function(tabs){
		myleads.push(tabs[0].url)
		localStorage.setItem("myleads",JSON.stringify(myleads))
		render(myleads)
	})
})

deletebtn.addEventListener("click",function(){
	localStorage.clear()
	myleads = []
	render(myleads)
})


