import axios from 'axios'
const gis = axios.create({
    // baseURL:'https://catalog.api.2gis.ru/3.0'
    baseURL:'http://localhost:3000'
  })

export const gisService = {
    async getSites(url){
        const params={
            hostname:url.hostname
        }
        const res = await gis.get('/gis',{params});
        console.log(res);

        return res;
    }
}