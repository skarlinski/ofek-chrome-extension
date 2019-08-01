chrome.extension.sendMessage({}, function(response) {
    function selectTaskPage(unseenOnly) {
        if(unseenOnly) {
            const unseen = document.getElementById('source_notseen')
            if ( ! unseen) {return;}
            if( ! unseen.checked) {
                unseen.click();
            }
        }
        const ul = document.getElementById('questions_difficulty')
        if ( ! ul) {return}
        const li = ul.querySelectorAll('li');
        let selected = false;
        for (let i=1; i<li.length; i++) {
            const input = li[i].querySelector('input')
            
            if(! selected && parseInt(li[i].getAttribute('total')) > 0) {
                input.click();                
                selected = true;
            }
			else {
				input.checked = false;
			}
			
        } 
        document.getElementById('tag_all').click();
    }
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);
        //chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
        //    var url = tabs[0].url;
        //});
        const url = window.location.toString();     
        if(url.includes('Launcher')) {
            selectTaskPage(false);
        }
        else if( url.includes('summary')) {
            const urlParams = new URLSearchParams(window.location.search);
            const assignment = urlParams.get('assignment');
             const arr = Array.prototype.slice.call(document.querySelectorAll('a'))
             for(let i=0; i< arr.length;i++){
                el = arr[i];
                if(el.text === 'Return to Main page') {
                    el.style.display = 'block';
                    const a = document.createElement('a');
                    a.style.fontWeight = '400';
                    a.class = 'hover-underline';
                    a.href = '/platform/ofekgmat/Launcher?assignment=' + assignment;
                    t = document.createTextNode('Back to question selection')
                    a.appendChild(t);
                    el.parentElement.appendChild(a);                
                }
            }
        }

             
	   	// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log("Hello. This message was sent from scripts/inject.js");
		// ----------------------------------------------------------

	}
	}, 10);
});
