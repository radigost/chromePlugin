import _ from 'lodash'
import axios from 'axios'
const gis = axios.create({
  baseURL:'https://catalog.api.2gis.ru/3.0'
})


document.addEventListener('DOMContentLoaded', function() {
    var checkPageButton = document.getElementById('checkPage');
    checkPageButton.addEventListener('click', ()=> {
      chrome.tabs.getSelected(null, async (tab)=> {
        // const url = tab.url;

        var url = document.createElement('a');
        url.href = tab.url;
        console.log(url.hostname);

        const params={
          viewpoint1:'37.26768463769532,55.80977031955012',
          viewpoint2:'37.93647736230469,55.69384154898953',
          page:'1',
          page_size:'12',
          q:url.hostname,
          region_id:'32',
          type:"street,adm_div.city,foreign_city,crossroad,route,branch,adm_div.settlement,station,gate,building,adm_div.district,road,adm_div.division,adm_div.living_area,attraction,adm_div.place,adm_div,parking",
          fields:"request_type,items.adm_div,items.attribute_groups,items.contact_groups,items.flags,items.address,items.rubrics,items.name_ex,items.point,items.geometry.centroid,items.region_id,items.external_content,items.org,items.group,items.schedule,items.ads.options,items.stat,items.reviews,items.purpose,search_type,context_rubrics,search_attributes,widgets,filters",
          key:'rutnpt3272'
        }
       const res = await gis.get('/items',{params});
       console.log(res.data);
       const resultDiv = document.getElementById('result')
      //  resultDiv.innerText=JSON.stringify(res.data.result.items);
       res.data.result.items.forEach(element => {
        var node = document.createElement("LI"); 
        var textnode = document.createTextNode(element.name); 
        node.appendChild(textnode);   
        resultDiv.appendChild(node);                            // Append the text to <li>
       });
       
      });
    }, false);
  }, false);