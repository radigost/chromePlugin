import _ from 'lodash'
import axios from 'axios'
document.addEventListener('DOMContentLoaded', function() {
    var checkPageButton = document.getElementById('checkPage');
    checkPageButton.addEventListener('click', function() {
        
      chrome.tabs.getSelected(null, async (tab)=> {
        const url = tab.url;
        console.log({url});
    //    const res = await axios.get('http://google.com/');
       alert(_.join(['Hello', 'webpack'], ' '));
      });
    }, false);
  }, false);